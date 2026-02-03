import { db } from '@/db/client';
import {
  users,
  mentorProfile,
  menteeProfile,
  mentorAdditionalExperiences,
  mentorLeadershipExperiences,
  menteeAdditionalExperiences,
  menteeLeadershipExperiences,
  additionalExperience,
  leadershipExperience,
  matches,
} from '@/db/schema';
import { eq, and, inArray, ne, or, isNull, sql } from 'drizzle-orm';
import type { MatchResult, MatchingFilters, MenteeWithProfile, User } from './types';

export class MentorshipMatcher {
  /**
   * Find mentor matches for a mentee using GIN-optimized queries
   */
  async findMatches(
    menteeId: string | number,
    options?: {
      limit?: number;
      filters?: MatchingFilters;
    }
  ): Promise<MatchResult[]> {
    const { limit = 10, filters = {} } = options || {};

    // 1. Fetch mentee with full profile
    const mentee = await this.getMenteeWithProfile(menteeId);
    if (!mentee) throw new Error('Mentee not found');

    // 2. Fetch potential mentors with basic filters
    const candidates = await db
      .select({
        user: users,
        profile: mentorProfile,
      })
      .from(users)
      .innerJoin(mentorProfile, eq(users.id, mentorProfile.userId))
      .where(
        and(
          ne(users.id, mentee.id),
          or(eq(users.role, 'MENTOR'), eq(users.role, 'BOTH')),
          eq(mentorProfile.active, true),
          sql`${users.gcbLevel} >= ${mentee.gcbLevel}`,
          or(
            isNull(mentorProfile.maxMentees),
            sql`${mentorProfile.currentMentees} < ${mentorProfile.maxMentees}`
          )
        )
      )
      .limit(limit * 5); // Get more candidates for filtering and scoring

    // 3. Filter by language overlap in JavaScript (uses GIN index on read)
    const menteeLanguages: string[] = Array.isArray(mentee.languages)
      ? mentee.languages
      : [];
    const filteredCandidates = candidates.filter(({ user }) => {
      if (menteeLanguages.length === 0) return true;
      const userLanguages: string[] = Array.isArray(user.languages)
        ? user.languages
        : [];
      return menteeLanguages.some((lang: string) =>
        userLanguages.includes(lang)
      );
    });

    // 4. Apply location and business area filters
    const finalCandidates = filteredCandidates.filter(({ user }) => {
      if (filters.respectSameLocation && mentee.menteeProfile?.sameLocation) {
        if (user.location !== mentee.location) return false;
      }
      if (
        filters.respectSameBusinessArea &&
        mentee.menteeProfile?.sameBusinessArea
      ) {
        if (user.businessAreaId !== mentee.businessAreaId) return false;
      }
      return true;
    });

    // 5. Fetch experiences for all candidates in batch
    const candidateIds = finalCandidates.map((c) => String(c.user.id));
    const candidatesWithExperiences =
      await this.enrichWithExperiences(candidateIds);

    // 6. Score each candidate
    const scoredMatches = finalCandidates.map(({ user, profile }) => {
      const experiences = candidatesWithExperiences[user.id.toString()] || {
        additional: [],
        leadership: [],
      };

      return this.scoreMatch(mentee, user, profile, experiences, filters);
    });

    // 7. Filter and sort
    return scoredMatches
      .filter((match) => match.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  }


  /**
   * Fetch mentee with complete profile
   */
  private async getMenteeWithProfile(
    menteeId: string | number
  ): Promise<MenteeWithProfile | null> {
    const result = await db
      .select({
        user: users,
        profile: menteeProfile,
      })
      .from(users)
      .innerJoin(menteeProfile, eq(users.id, menteeProfile.userId))
      .where(eq(users.id, typeof menteeId === 'string' ? BigInt(menteeId) : menteeId))
      .limit(1);

    if (result.length === 0) return null;

    const { user, profile } = result[0];

    // Fetch mentee's experiences
    const [additionalExp, leadershipExp] = await Promise.all([
      db
        .select({ name: additionalExperience.name })
        .from(menteeAdditionalExperiences)
        .innerJoin(
          additionalExperience,
          eq(
            menteeAdditionalExperiences.additionalExperienceId,
            additionalExperience.id
          )
        )
        .where(
          eq(
            menteeAdditionalExperiences.menteeId,
            typeof menteeId === 'string' ? BigInt(menteeId) : menteeId
          )
        ),

      db
        .select({ name: leadershipExperience.name })
        .from(menteeLeadershipExperiences)
        .innerJoin(
          leadershipExperience,
          eq(
            menteeLeadershipExperiences.leadershipExperienceId,
            leadershipExperience.id
          )
        )
        .where(
          eq(
            menteeLeadershipExperiences.menteeId,
            typeof menteeId === 'string' ? BigInt(menteeId) : menteeId
          )
        ),
    ]);

    return {
      ...user,
      menteeProfile: {
        ...profile,
        additionalExperiences: additionalExp.map((e) => e.name),
        leadershipExperiences: leadershipExp.map((e) => e.name),
      },
    };
  }

  /**
   * Batch fetch experiences for multiple mentors
   */
  private async enrichWithExperiences(mentorIds: string[]) {
    if (mentorIds.length === 0) return {};

    // Convert string IDs to BigInt for database query
    const mentorIdsBigInt = mentorIds.map((id) => BigInt(id));

    const [additionalExp, leadershipExp] = await Promise.all([
      db
        .select({
          mentorId: mentorAdditionalExperiences.mentorId,
          name: additionalExperience.name,
        })
        .from(mentorAdditionalExperiences)
        .innerJoin(
          additionalExperience,
          eq(
            mentorAdditionalExperiences.additionalExperienceId,
            additionalExperience.id
          )
        )
        .where(inArray(mentorAdditionalExperiences.mentorId, mentorIdsBigInt)),

      db
        .select({
          mentorId: mentorLeadershipExperiences.mentorId,
          name: leadershipExperience.name,
        })
        .from(mentorLeadershipExperiences)
        .innerJoin(
          leadershipExperience,
          eq(
            mentorLeadershipExperiences.leadershipExperienceId,
            leadershipExperience.id
          )
        )
        .where(inArray(mentorLeadershipExperiences.mentorId, mentorIdsBigInt)),
    ]);

    // Group by mentor ID
    const experiences: Record<
      string,
      { additional: string[]; leadership: string[] }
    > = {};

    for (const exp of additionalExp) {
      const mentorIdStr = exp.mentorId.toString();
      if (!experiences[mentorIdStr]) {
        experiences[mentorIdStr] = { additional: [], leadership: [] };
      }
      experiences[mentorIdStr].additional.push(exp.name);
    }

    for (const exp of leadershipExp) {
      const mentorIdStr = exp.mentorId.toString();
      if (!experiences[mentorIdStr]) {
        experiences[mentorIdStr] = { additional: [], leadership: [] };
      }
      experiences[mentorIdStr].leadership.push(exp.name);
    }

    return experiences;
  }

  /**
   * Score a mentor match - business logic lives here
   */
  private scoreMatch(
    mentee: MenteeWithProfile,
    mentor: User,
    profile: any,
    experiences: { additional: string[]; leadership: string[] },
    filters: MatchingFilters
  ): MatchResult {
    let totalScore = 0;
    const reasons: string[] = [];

    // Score weights (total = 100)
    const WEIGHTS = {
      location: 15,
      businessArea: 10,
      language: 15,
      seniority: 20,
      learningGoals: 25,
      experiences: 15,
    };

    const breakdown = {
      location: 0,
      businessArea: 0,
      language: 0,
      seniority: 0,
      learningGoals: 0,
      experiences: 0,
    };

    // 1. Location match
    if (mentor.location && mentee.location && mentor.location === mentee.location) {
      breakdown.location = WEIGHTS.location;
      totalScore += WEIGHTS.location;
      reasons.push(`Same location: ${mentor.location}`);
    }

    // 2. Business area match
    if (
      mentor.businessAreaId &&
      mentee.businessAreaId &&
      mentor.businessAreaId === mentee.businessAreaId
    ) {
      breakdown.businessArea = WEIGHTS.businessArea;
      totalScore += WEIGHTS.businessArea;
      reasons.push('Same business area');
    }

    // 3. Language overlap
    const menteeLanguages: string[] = Array.isArray(mentee.languages)
      ? (mentee.languages as string[])
      : [];
    const mentorLanguages: string[] = Array.isArray(mentor.languages)
      ? (mentor.languages as string[])
      : [];
    const matchedLanguages = menteeLanguages.filter((lang: string) =>
      mentorLanguages.includes(lang)
    );

    if (matchedLanguages.length > 0 && menteeLanguages.length > 0) {
      const langScore =
        (matchedLanguages.length / menteeLanguages.length) * WEIGHTS.language;
      breakdown.language = langScore;
      totalScore += langScore;
      reasons.push(`Common languages: ${matchedLanguages.join(', ')}`);
    }

    // 4. Seniority gap scoring
    const mentorGcbLevel = mentor.gcbLevel || 0;
    const menteeGcbLevel = mentee.gcbLevel || 0;
    const seniorityGap = mentorGcbLevel - menteeGcbLevel;

    if (seniorityGap > 0) {
      let seniorityScore = 0;
      if (seniorityGap === 1) seniorityScore = 1.0;
      else if (seniorityGap === 2) seniorityScore = 0.9;
      else if (seniorityGap === 3) seniorityScore = 0.7;
      else seniorityScore = 0.5;

      breakdown.seniority = seniorityScore * WEIGHTS.seniority;
      totalScore += breakdown.seniority;
      reasons.push(`Seniority gap: ${seniorityGap} levels`);
    }

    // 5. Learning goals match (mentor experiences vs mentee goals)
    const learningGoals = Array.isArray(mentee.menteeProfile?.learningGoals)
      ? mentee.menteeProfile.learningGoals
      : [];
    const mentorAllExperiences = [
      ...experiences.additional,
      ...experiences.leadership,
    ];

    const matchedGoals = learningGoals.filter((goal: string) =>
      mentorAllExperiences.some((exp: string) => this.fuzzyMatch(goal, exp))
    );

    if (matchedGoals.length > 0 && learningGoals.length > 0) {
      const goalsScore =
        (matchedGoals.length / learningGoals.length) * WEIGHTS.learningGoals;
      breakdown.learningGoals = goalsScore;
      totalScore += goalsScore;
      reasons.push(`Matched ${matchedGoals.length} learning goals`);
    }

    // 6. Experience overlap
    const menteeExperiences = [
      ...(mentee.menteeProfile?.additionalExperiences || []),
      ...(mentee.menteeProfile?.leadershipExperiences || []),
    ];

    const matchedExperiences = experiences.additional.filter((exp) =>
      menteeExperiences.some((menteeExp) => this.fuzzyMatch(exp, menteeExp))
    );

    const matchedLeadership = experiences.leadership.filter((exp) =>
      (mentee.menteeProfile?.leadershipExperiences || []).some((menteeExp) =>
        this.fuzzyMatch(exp, menteeExp)
      )
    );

    const totalMatchedExp = matchedExperiences.length + matchedLeadership.length;
    if (totalMatchedExp > 0) {
      const expScore =
        Math.min(1, totalMatchedExp / 3) * WEIGHTS.experiences;
      breakdown.experiences = expScore;
      totalScore += expScore;
      reasons.push(`${totalMatchedExp} shared experiences`);
    }

    // Build frontend-friendly result
    const mentorTitle = profile?.bio ? profile.bio.split('\n')[0] : 'Mentor';
    const expertise = [
      ...experiences.additional,
      ...experiences.leadership,
    ].slice(0, 3); // Top 3 experiences

    const finalScore = Math.round(totalScore);

    // Convert bigint ID to string for frontend
    const mentorIdStr = String(mentor.id);
    const frontendMentorLanguages = Array.isArray(mentor.languages)
      ? mentor.languages
      : [];

    return {
      // Frontend fields
      id: mentorIdStr,
      name: mentor.name,
      title: mentorTitle,
      expertise,
      location: mentor.location || 'Remote',
      languages: frontendMentorLanguages,
      matchScore: finalScore,

      // Metadata for backend
      mentorId: mentorIdStr,
      gcbLevel: mentor.gcbLevel || 0,
      businessAreaId: mentor.businessAreaId || null,

      // Detailed scoring (optional, for advanced views)
      breakdown,
      matchedItems: {
        languages: matchedLanguages,
        experiences: [...matchedExperiences, ...matchedLeadership],
        leadershipExperiences: matchedLeadership,
      },
      reasons,
    };
  }

  /**
   * Fuzzy string matching for goals/experiences
   */
  private fuzzyMatch(str1: string, str2: string): boolean {
    const normalize = (s: string) => s.toLowerCase().trim();
    const s1 = normalize(str1);
    const s2 = normalize(str2);

    // Exact match
    if (s1 === s2) return true;

    // Substring match
    if (s1.includes(s2) || s2.includes(s1)) return true;

    // Could add Levenshtein distance here if needed
    return false;
  }

  /**
   * Save matches to database
   */
  async saveMatches(
    menteeId: string | number,
    matchResults: MatchResult[]
  ): Promise<void> {
    const menteeIdBigInt =
      typeof menteeId === 'string' ? BigInt(menteeId) : menteeId;

    const matchRecords = matchResults.map((match) => ({
      mentorId: BigInt(match.mentorId),
      menteeId: menteeIdBigInt,
      matchScore: match.matchScore.toString(),
      status: 'PENDING' as const,
    }));

    // Upsert matches
    await db
      .insert(matches)
      .values(matchRecords as any)
      .onConflictDoUpdate({
        target: [matches.mentorId, matches.menteeId],
        set: {
          matchScore: sql`EXCLUDED.match_score`,
          updatedAt: sql`NOW()`,
        },
      });
  }
}

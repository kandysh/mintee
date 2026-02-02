import { InferSelectModel } from 'drizzle-orm';
import { users, mentorProfile, menteeProfile } from '@/db/schema';

export type User = InferSelectModel<typeof users>;
export type MentorProfile = InferSelectModel<typeof mentorProfile>;
export type MenteeProfile = InferSelectModel<typeof menteeProfile>;

export interface MentorWithProfile extends User {
  mentorProfile: MentorProfile & {
    additionalExperiences: string[];
    leadershipExperiences: string[];
  };
}

export interface MenteeWithProfile extends User {
  menteeProfile: MenteeProfile & {
    additionalExperiences: string[];
    leadershipExperiences: string[];
  };
}

export interface MatchResult {
  mentorId: string | number;
  mentor: {
    name: string;
    location: string | null;
    gcbLevel: number | null;
    languages: string[];
    businessAreaId: number | null;
  };
  matchScore: number;
  breakdown: {
    location: number;
    businessArea: number;
    language: number;
    seniority: number;
    learningGoals: number;
    experiences: number;
  };
  matchedItems: {
    languages: string[];
    experiences: string[];
    leadershipExperiences: string[];
  };
  reasons: string[];
}

export interface MatchingFilters {
  respectSameLocation?: boolean;
  respectSameBusinessArea?: boolean;
  minLanguageOverlap?: number;
  minSeniorityGap?: number;
  minExperienceOverlap?: number;
}

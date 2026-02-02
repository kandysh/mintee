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

/**
 * Frontend-friendly match result
 * Flattened structure for easy rendering in UI
 */
export interface MatchResult {
  id: string | number;
  name: string;
  title: string;
  expertise: string[];
  location: string;
  languages: string[];
  matchScore: number;

  // Additional metadata for advanced features
  mentorId: string | number;
  gcbLevel: number;
  businessAreaId: number | null;

  // Detailed scoring info (optional, for detailed views)
  breakdown?: {
    location: number;
    businessArea: number;
    language: number;
    seniority: number;
    learningGoals: number;
    experiences: number;
  };

  matchedItems?: {
    languages: string[];
    experiences: string[];
    leadershipExperiences: string[];
  };

  reasons?: string[];
}

export interface MatchingFilters {
  respectSameLocation?: boolean;
  respectSameBusinessArea?: boolean;
  minLanguageOverlap?: number;
  minSeniorityGap?: number;
  minExperienceOverlap?: number;
}

/**
 * Internal scoring details (used during matching calculation)
 */
export interface MatchScoring {
  location: number;
  businessArea: number;
  language: number;
  seniority: number;
  learningGoals: number;
  experiences: number;
}

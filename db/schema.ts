import {
  pgTable,
  bigserial,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  text as textArray,
  numeric,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// ==================== USERS TABLE ====================
export const users = pgTable('users', {
  id: bigserial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }),
  languages: textArray('languages').default(sql`ARRAY[]::text[]`),
  gcbLevel: integer('gcb_level').default(0),
  gcbTenure: integer('gcb_tenure').default(0),
  businessAreaId: integer('business_area_id'),
  role: varchar('role', { length: 50 }).default('USER'), // USER, MENTOR, MENTEE, BOTH
  active: boolean('active').default(true),
  createdAt: timestamp('created_at').default(sql`NOW()`),
  updatedAt: timestamp('updated_at').default(sql`NOW()`),
});

// ==================== MENTOR PROFILE ====================
export const mentorProfile = pgTable('mentor_profile', {
  id: bigserial('id').primaryKey(),
  userId: bigserial('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  bio: text('bio'),
  maxMentees: integer('max_mentees'),
  currentMentees: integer('current_mentees').default(0),
  active: boolean('active').default(true),
  additionalExperiences: textArray('additional_experiences').default(
    sql`ARRAY[]::text[]`
  ),
  leadershipExperiences: textArray('leadership_experiences').default(
    sql`ARRAY[]::text[]`
  ),
  createdAt: timestamp('created_at').default(sql`NOW()`),
  updatedAt: timestamp('updated_at').default(sql`NOW()`),
});

// ==================== MENTEE PROFILE ====================
export const menteeProfile = pgTable('mentee_profile', {
  id: bigserial('id').primaryKey(),
  userId: bigserial('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  sameLocation: boolean('same_location').default(false),
  sameBusinessArea: boolean('same_business_area').default(false),
  learningGoals: textArray('learning_goals').default(sql`ARRAY[]::text[]`),
  jobCapabilities: textArray('job_capabilities').default(
    sql`ARRAY[]::text[]`
  ),
  createdAt: timestamp('created_at').default(sql`NOW()`),
  updatedAt: timestamp('updated_at').default(sql`NOW()`),
});

// ==================== ADDITIONAL EXPERIENCE ====================
export const additionalExperience = pgTable('additional_experience', {
  id: bigserial('id').primaryKey(),
  name: varchar('name', { length: 255 }).unique().notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').default(sql`NOW()`),
});

// ==================== LEADERSHIP EXPERIENCE ====================
export const leadershipExperience = pgTable('leadership_experience', {
  id: bigserial('id').primaryKey(),
  name: varchar('name', { length: 255 }).unique().notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').default(sql`NOW()`),
});

// ==================== MENTOR ADDITIONAL EXPERIENCES ====================
export const mentorAdditionalExperiences = pgTable(
  'mentor_additional_experiences',
  {
    id: bigserial('id').primaryKey(),
    mentorId: bigserial('mentor_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
    additionalExperienceId: bigserial('additional_experience_id').references(
      () => additionalExperience.id,
      { onDelete: 'cascade' }
    ),
    createdAt: timestamp('created_at').default(sql`NOW()`),
  }
);

// ==================== MENTOR LEADERSHIP EXPERIENCES ====================
export const mentorLeadershipExperiences = pgTable(
  'mentor_leadership_experiences',
  {
    id: bigserial('id').primaryKey(),
    mentorId: bigserial('mentor_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
    leadershipExperienceId: bigserial('leadership_experience_id').references(
      () => leadershipExperience.id,
      { onDelete: 'cascade' }
    ),
    createdAt: timestamp('created_at').default(sql`NOW()`),
  }
);

// ==================== MENTEE ADDITIONAL EXPERIENCES ====================
export const menteeAdditionalExperiences = pgTable(
  'mentee_additional_experiences',
  {
    id: bigserial('id').primaryKey(),
    menteeId: bigserial('mentee_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
    additionalExperienceId: bigserial('additional_experience_id').references(
      () => additionalExperience.id,
      { onDelete: 'cascade' }
    ),
    createdAt: timestamp('created_at').default(sql`NOW()`),
  }
);

// ==================== MENTEE LEADERSHIP EXPERIENCES ====================
export const menteeLeadershipExperiences = pgTable(
  'mentee_leadership_experiences',
  {
    id: bigserial('id').primaryKey(),
    menteeId: bigserial('mentee_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
    leadershipExperienceId: bigserial('leadership_experience_id').references(
      () => leadershipExperience.id,
      { onDelete: 'cascade' }
    ),
    createdAt: timestamp('created_at').default(sql`NOW()`),
  }
);

// ==================== MATCHES TABLE ====================
export const matches = pgTable('matches', {
  id: bigserial('id').primaryKey(),
  mentorId: bigserial('mentor_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  menteeId: bigserial('mentee_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  matchScore: numeric('match_score', { precision: 10, scale: 2 }),
  status: varchar('status', { length: 50 }).default('PENDING'), // PENDING, ACCEPTED, REJECTED, ACTIVE, COMPLETED
  createdAt: timestamp('created_at').default(sql`NOW()`),
  updatedAt: timestamp('updated_at').default(sql`NOW()`),
});

// ==================== RELATIONS ====================
export const usersRelations = relations(users, ({ one, many }) => ({
  mentorProfile: one(mentorProfile, {
    fields: [users.id],
    references: [mentorProfile.userId],
  }),
  menteeProfile: one(menteeProfile, {
    fields: [users.id],
    references: [menteeProfile.userId],
  }),
  mentorMatches: many(matches, {
    relationName: 'mentorMatches',
  }),
  menteeMatches: many(matches, {
    relationName: 'menteeMatches',
  }),
}));

export const mentorProfileRelations = relations(
  mentorProfile,
  ({ one, many }) => ({
    user: one(users, {
      fields: [mentorProfile.userId],
      references: [users.id],
    }),
    additionalExperiences: many(mentorAdditionalExperiences),
    leadershipExperiences: many(mentorLeadershipExperiences),
  })
);

export const menteeProfileRelations = relations(
  menteeProfile,
  ({ one, many }) => ({
    user: one(users, {
      fields: [menteeProfile.userId],
      references: [users.id],
    }),
    additionalExperiences: many(menteeAdditionalExperiences),
    leadershipExperiences: many(menteeLeadershipExperiences),
  })
);

export const matchesRelations = relations(matches, ({ one }) => ({
  mentor: one(users, {
    fields: [matches.mentorId],
    references: [users.id],
    relationName: 'mentorMatches',
  }),
  mentee: one(users, {
    fields: [matches.menteeId],
    references: [users.id],
    relationName: 'menteeMatches',
  }),
}));

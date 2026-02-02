-- Add GIN indexes for array operations on languages
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_languages_gin
  ON users USING GIN (languages);

-- Indexes for common filtering columns
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_location
  ON users(location);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_gcb_level
  ON users(gcb_level);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_business_area
  ON users(business_area_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_role
  ON users(role);

-- Composite index for mentor profile queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_mentor_profile_active_capacity
  ON mentor_profile(active, max_mentees, current_mentees);

-- Indexes for relationship lookups
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_mentor_profile_user_id
  ON mentor_profile(user_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_mentee_profile_user_id
  ON mentee_profile(user_id);

-- Indexes for many-to-many lookups
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_mentor_additional_experiences_mentor_id
  ON mentor_additional_experiences(mentor_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_mentor_leadership_experiences_mentor_id
  ON mentor_leadership_experiences(mentor_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_mentee_additional_experiences_mentee_id
  ON mentee_additional_experiences(mentee_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_mentee_leadership_experiences_mentee_id
  ON mentee_leadership_experiences(mentee_id);

-- Index for matches table
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_matches_mentor_mentee
  ON matches(mentor_id, mentee_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_matches_mentee_id
  ON matches(mentee_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_matches_status
  ON matches(status);

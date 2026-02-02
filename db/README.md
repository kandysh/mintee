# Database Setup Guide

This directory contains the Drizzle ORM schema, client configuration, and migrations for the Mintee mentorship platform.

## Quick Setup

### 1. Environment Variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mintee
```

### 2. Install Dependencies

```bash
npm install drizzle-orm pg
```

### 3. Create Database

```bash
# Using createdb (macOS/Linux)
createdb mintee

# Or using psql
psql postgres -c "CREATE DATABASE mintee;"
```

### 4. Apply Migrations

```bash
# Run the GIN indexes migration for optimal performance
psql $DATABASE_URL < db/migrations/add-gin-indexes.sql

# Or using any PostgreSQL client
```

## Schema Overview

### Core Tables

#### `users`
Main user table for both mentors and mentees.

```typescript
{
  id: bigserial (PK)
  email: varchar(255) - unique
  name: varchar(255)
  location: varchar(255)
  languages: text[] - array of spoken languages (GIN indexed)
  gcb_level: integer - career level (0-10)
  gcb_tenure: integer - years at current level
  business_area_id: integer - foreign key to business areas
  role: varchar(50) - USER | MENTOR | MENTEE | BOTH
  active: boolean
  created_at: timestamp
  updated_at: timestamp
}
```

#### `mentor_profile`
Profile information specific to mentors.

```typescript
{
  id: bigserial (PK)
  user_id: bigserial (FK users.id)
  bio: text
  max_mentees: integer
  current_mentees: integer
  active: boolean
  additional_experiences: text[] - array of experience names
  leadership_experiences: text[] - array of leadership roles
  created_at: timestamp
  updated_at: timestamp
}
```

#### `mentee_profile`
Profile information specific to mentees.

```typescript
{
  id: bigserial (PK)
  user_id: bigserial (FK users.id)
  same_location: boolean - preference for same location mentor
  same_business_area: boolean - preference for same business area
  learning_goals: text[] - what they want to learn
  job_capabilities: text[] - capabilities they want to develop
  created_at: timestamp
  updated_at: timestamp
}
```

### Experience Tables

#### `additional_experience`
Lookup table for experiences.

```typescript
{
  id: bigserial (PK)
  name: varchar(255) - unique
  description: text
  created_at: timestamp
}
```

#### `leadership_experience`
Lookup table for leadership roles.

```typescript
{
  id: bigserial (PK)
  name: varchar(255) - unique
  description: text
  created_at: timestamp
}
```

### Junction Tables (Many-to-Many)

#### `mentor_additional_experiences`
Links mentors to their experiences.

#### `mentor_leadership_experiences`
Links mentors to their leadership roles.

#### `mentee_additional_experiences`
Links mentees to desired experiences.

#### `mentee_leadership_experiences`
Links mentees to desired leadership roles.

### Matching Table

#### `matches`
Tracks mentor-mentee matches and their status.

```typescript
{
  id: bigserial (PK)
  mentor_id: bigserial (FK users.id)
  mentee_id: bigserial (FK users.id)
  match_score: numeric(10,2)
  status: varchar(50) - PENDING | ACCEPTED | REJECTED | ACTIVE | COMPLETED
  created_at: timestamp
  updated_at: timestamp
}
```

## File Structure

```
db/
├── schema.ts                    # Drizzle ORM schema definitions
├── client.ts                    # Database client singleton
├── migrations/
│   └── add-gin-indexes.sql     # Performance indexes
└── README.md                    # This file
```

## Schema Definition

The `schema.ts` file contains all table definitions using Drizzle ORM:

```typescript
import { pgTable, bigserial, varchar, text, ... } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: bigserial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  // ... other fields
});
```

### Benefits of Drizzle

- ✅ Type-safe database operations
- ✅ IntelliSense for database fields
- ✅ Compile-time SQL validation
- ✅ No migrations files needed (schema is the source of truth)
- ✅ Works with existing databases

## Using the Database Client

### Server-Side

```typescript
import { db } from '@/db/client';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Query
const user = await db
  .select()
  .from(users)
  .where(eq(users.id, 123))
  .limit(1);

// Insert
await db.insert(users).values({
  email: 'john@example.com',
  name: 'John Doe',
  // ... other fields
});

// Update
await db
  .update(users)
  .set({ name: 'Jane Doe' })
  .where(eq(users.id, 123));

// Delete
await db.delete(users).where(eq(users.id, 123));
```

### Type Safety

```typescript
// Types are automatically inferred
type User = InferSelectModel<typeof users>;
type NewUser = typeof users.$inferInsert;

const user: User = await db.select().from(users).limit(1);
```

## Indexes

The migration creates optimized indexes for:

1. **Array Operations (GIN)**
   - `languages` - Fast array intersection for language matching

2. **Filtering**
   - `location` - Location-based queries
   - `gcb_level` - Seniority filtering
   - `business_area_id` - Business area filtering
   - `role` - User role filtering

3. **Capacity Checks**
   - `mentor_profile(active, max_mentees, current_mentees)`

4. **Relationships**
   - Foreign key lookups

5. **Match Tracking**
   - Mentor-mentee lookups
   - Status filtering

### GIN Index Performance

GIN (Generalized Inverted Index) is optimized for:
- Array containment (`@>`)
- Array overlap (`&&`)
- Array element search

For 13K users with language arrays, queries typically complete in **50-150ms**.

## Migrations

### Create Migration

For schema changes, use Drizzle Kit:

```bash
npm install -D drizzle-kit
npx drizzle-kit generate:pg
```

### Run Migrations

The GIN indexes migration is run manually:

```bash
psql $DATABASE_URL < db/migrations/add-gin-indexes.sql
```

## Relations

Drizzle relations are defined for:

```typescript
// One-to-one
user -> mentorProfile
user -> menteeProfile

// One-to-many
user -> mentorMatches
user -> menteeMatches
mentorProfile -> additionalExperiences
mentorProfile -> leadershipExperiences
menteeProfile -> additionalExperiences
menteeProfile -> leadershipExperiences
```

Usage with relations:

```typescript
const userWithProfile = await db.query.users.findFirst({
  where: eq(users.id, 123),
  with: {
    mentorProfile: true,
  },
});
```

## Accessing the Client

The client is a singleton exported from `client.ts`:

```typescript
import { db } from '@/db/client';

// Use db everywhere
const users = await db.select().from(users);
```

## Common Operations

### Find Mentor by ID with Experiences

```typescript
import { db } from '@/db/client';
import { users, mentorProfile, mentorAdditionalExperiences } from '@/db/schema';
import { eq } from 'drizzle-orm';

const mentor = await db
  .select()
  .from(users)
  .innerJoin(mentorProfile, eq(users.id, mentorProfile.userId))
  .where(eq(users.id, mentorId))
  .limit(1);

const experiences = await db
  .select()
  .from(mentorAdditionalExperiences)
  .where(eq(mentorAdditionalExperiences.mentorId, mentorId));
```

### Find Mentors with Language Overlap

```typescript
// Uses GIN index for fast performance
const mentorsWithLanguage = await db
  .select()
  .from(users)
  .where(
    sql`${users.languages} && ${['English', 'Spanish']}`
  );
```

### Count Mentees for a Mentor

```typescript
const menteeCount = await db
  .select({ count: count() })
  .from(matches)
  .where(
    and(
      eq(matches.mentorId, mentorId),
      eq(matches.status, 'ACTIVE')
    )
  );
```

## Best Practices

1. **Always use the client singleton** (`db` from `client.ts`)
2. **Use proper types** - leverage TypeScript inference
3. **Use relations** for nested queries instead of multiple queries
4. **Index strategically** - GIN for arrays, B-tree for scalars
5. **Batch operations** - Use Promise.all for parallel queries
6. **Connection pooling** - Handled automatically by postgres-js

## Troubleshooting

### Connection Refused

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

- Ensure PostgreSQL is running
- Check `DATABASE_URL` is correct
- Verify database exists

### Permission Denied

```
Error: permission denied for schema public
```

- Ensure user has proper permissions
- Grant permissions: `GRANT ALL ON SCHEMA public TO user;`

### Slow Queries

- Run migrations to create indexes
- Check index usage with `EXPLAIN ANALYZE`
- Monitor with `pg_stat_statements`

## Environment Variables

```env
# PostgreSQL connection string
DATABASE_URL=postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]

# Examples:
DATABASE_URL=postgresql://localhost/mintee
DATABASE_URL=postgresql://user:password@localhost:5432/mintee
DATABASE_URL=postgresql://localhost/mintee?sslmode=disable
```

## Related Files

- **Matching System**: `lib/matching/README.md`
- **Original SQL Matching**: `matcher.sql`
- **API Routes**: `app/api/`
- **React Hooks**: `hooks/`

## License

Part of the Mintee mentorship platform.

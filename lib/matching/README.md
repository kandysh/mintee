# Mentorship Matching System

A production-ready modular matching engine for the Mintee mentorship platform. This system intelligently matches mentees with mentors using multiple dimensions: location, business area, languages, seniority levels, learning goals, and experiences.

## Overview

The matching system is built with:
- **Drizzle ORM** for type-safe database operations
- **PostgreSQL** with GIN indexes for fast array operations
- **Modular architecture** for easy testing and extensibility
- **Type safety** with full TypeScript support

## Architecture

### File Structure

```
lib/matching/
├── types.ts          # TypeScript interfaces and types
├── matcher.ts        # Core matching engine
├── index.ts          # Public exports
└── README.md         # This file

db/
├── schema.ts         # Drizzle ORM schema definitions
├── client.ts         # Database client setup
└── migrations/
    └── add-gin-indexes.sql  # Performance indexes
```

## Quick Start

### 1. Setup Database Connection

Create a `.env.local` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mintee
```

### 2. Run Migrations

Apply the GIN indexes for optimal performance:

```bash
# Using psql
psql $DATABASE_URL < db/migrations/add-gin-indexes.sql

# Or using your preferred database tool
```

### 3. Use the Matcher

#### Server-Side Usage

```typescript
import { MentorshipMatcher } from '@/lib/matching';

const matcher = new MentorshipMatcher();

// Find matches for a mentee
const matches = await matcher.findMatches('mentee-123', {
  limit: 10,
  filters: {
    respectSameLocation: true,
    respectSameBusinessArea: false,
  },
});

// Save matches to database
await matcher.saveMatches('mentee-123', matches);

console.log(matches);
// [
//   {
//     mentorId: 'mentor-456',
//     matchScore: 87,
//     reasons: ['Same location: London', 'Common languages: English', ...]
//   }
// ]
```

#### Client-Side Usage (React Hook)

```typescript
'use client';

import { useMatching } from '@/hooks/useMatching';

export function MentorSearch({ menteeId }) {
  const { matches, loading, error, fetchMatches } = useMatching({
    menteeId,
    limit: 10,
    autoFetch: true, // Fetch automatically on mount
  });

  if (loading) return <div>Finding mentors...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {matches.map((match) => (
        <div key={match.mentorId}>
          <h3>{match.mentor.name}</h3>
          <p>Match Score: {match.matchScore}/100</p>
          <ul>
            {match.reasons.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

#### API Endpoint

```bash
curl -X POST http://localhost:3000/api/matching \
  -H "Content-Type: application/json" \
  -d '{
    "menteeId": "mentee-123",
    "limit": 10,
    "filters": {
      "respectSameLocation": true
    },
    "saveToDb": false
  }'
```

Response:
```json
{
  "success": true,
  "total": 3,
  "matches": [
    {
      "mentorId": "mentor-456",
      "mentor": {
        "name": "John Doe",
        "location": "London",
        "gcbLevel": 3,
        "languages": ["English", "Spanish"],
        "businessAreaId": 1
      },
      "matchScore": 87,
      "breakdown": {
        "location": 15,
        "businessArea": 0,
        "language": 15,
        "seniority": 20,
        "learningGoals": 25,
        "experiences": 12
      },
      "matchedItems": {
        "languages": ["English"],
        "experiences": ["Leadership", "Team Management"],
        "leadershipExperiences": ["Leadership"]
      },
      "reasons": [
        "Same location: London",
        "Common languages: English",
        "Matched 2 learning goals",
        "3 shared experiences"
      ]
    }
  ]
}
```

## Matching Dimensions

The system scores matches across 6 dimensions (weights total 100):

### 1. Location (15 points)
- Bonus points if mentor and mentee are in the same location
- Respects mentee's `sameLocation` preference

### 2. Business Area (10 points)
- Bonus points if mentor and mentee work in the same business area
- Respects mentee's `sameBusinessArea` preference

### 3. Languages (15 points)
- Scores based on overlap of spoken languages
- Uses GIN index for fast array intersection

### 4. Seniority (20 points)
- Mentor must be at same level or more senior than mentee
- Scoring:
  - 1 level gap: 20 points (100%)
  - 2 level gap: 18 points (90%)
  - 3 level gap: 14 points (70%)
  - 4+ level gap: 10 points (50%)

### 5. Learning Goals (25 points)
- Highest weight: matches mentee's learning goals to mentor's experiences
- Fuzzy matching on goal names vs mentor experiences

### 6. Experiences (15 points)
- Bonus for shared experiences and leadership overlap
- Includes both additional and leadership experiences

## Hard Filters

All candidates must pass these filters:

```
✓ Mentor role (MENTOR or BOTH)
✓ Mentor profile is active
✓ At least one common language (GIN index optimized)
✓ Mentor is same or more senior than mentee
✓ If mentee tenure ≤ 2 years, mentor must have ≥ 3 years tenure
✓ If mentee wants same location, mentor must match
✓ If mentee wants same business area, mentor must match
✓ Mentor has capacity (current_mentees < max_mentees)
```

## Performance

Expected performance (with GIN indexes):
- **13K users**: 50-150ms per match query
- **Large language arrays**: Fast (GIN index)
- **Batch scoring**: ~10ms per 100 candidates

### Database Indexes

The migration creates optimized indexes:

```sql
-- Critical: Language array intersection (GIN)
idx_users_languages_gin

-- Filtering
idx_users_location
idx_users_gcb_level
idx_users_business_area
idx_users_role

-- Capacity check
idx_mentor_profile_active_capacity

-- Relationships
idx_mentor_profile_user_id
idx_mentee_profile_user_id

-- Many-to-many lookups
idx_mentor_additional_experiences_mentor_id
idx_mentor_leadership_experiences_mentor_id
idx_mentee_additional_experiences_mentee_id
idx_mentee_leadership_experiences_mentee_id

-- Match tracking
idx_matches_mentor_mentee
idx_matches_mentee_id
idx_matches_status
```

## Types

All types are defined in `types.ts` and auto-exported from `index.ts`:

```typescript
// Match result
interface MatchResult {
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

// Filtering options
interface MatchingFilters {
  respectSameLocation?: boolean;
  respectSameBusinessArea?: boolean;
  minLanguageOverlap?: number;
  minSeniorityGap?: number;
  minExperienceOverlap?: number;
}
```

## Extending the System

### Add New Matching Dimensions

1. Update `scoreMatch()` in `matcher.ts`:

```typescript
// Add new weight
const WEIGHTS = {
  // ... existing weights
  newDimension: 10,
};

// Add scoring logic
const newScore = calculateNewScore(...);
breakdown.newDimension = newScore;
totalScore += newScore;
```

2. Add to `MatchResult` breakdown and reasons

### Customize Weights

Modify the `WEIGHTS` object in `scoreMatch()`:

```typescript
const WEIGHTS = {
  location: 15,      // Adjust these
  businessArea: 10,
  language: 15,
  seniority: 20,
  learningGoals: 25,
  experiences: 15,
};
```

### Change Scoring Algorithm

The `scoreMatch()` method is isolated - modify it without affecting other parts:

```typescript
private scoreMatch(
  mentee: MenteeWithProfile,
  mentor: User,
  profile: any,
  experiences: { additional: string[]; leadership: string[] },
  filters: MatchingFilters
): MatchResult {
  // Your custom scoring logic here
}
```

## Testing

Example unit tests:

```typescript
import { MentorshipMatcher } from '@/lib/matching';

describe('MentorshipMatcher', () => {
  const matcher = new MentorshipMatcher();

  it('should find matches for a mentee', async () => {
    const matches = await matcher.findMatches('mentee-123');
    expect(matches).toBeDefined();
    expect(Array.isArray(matches)).toBe(true);
  });

  it('should respect location filter', async () => {
    const matches = await matcher.findMatches('mentee-123', {
      filters: { respectSameLocation: true },
    });
    // Verify all matches have same location
    matches.forEach((match) => {
      expect(match.breakdown.location).toBeGreaterThan(0);
    });
  });
});
```

## Troubleshooting

### Slow Queries

- Ensure GIN indexes are created: `db/migrations/add-gin-indexes.sql`
- Run `ANALYZE` on tables after migrations
- Check PostgreSQL query plans with `EXPLAIN ANALYZE`

### No Matches Found

Check hard filters:
- Is mentor active? (`mentor_profile.active = true`)
- Do they have a common language?
- Is mentor senior enough?
- Does mentor have capacity?

### Database Connection Issues

Verify `DATABASE_URL` in `.env.local`:
```
postgresql://user:password@host:port/database
```

## Related Files

- **Database Schema**: `db/schema.ts`
- **Drizzle Client**: `db/client.ts`
- **React Hook**: `hooks/useMatching.ts`
- **API Route**: `app/api/matching/route.ts`
- **Original SQL**: `matcher.sql`

## License

This matching system is part of the Mintee mentorship platform.

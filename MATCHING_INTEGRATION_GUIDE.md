# Matching System Integration Guide

This guide shows you how to integrate the new production-ready matching system into the Mintee platform.

## 📁 What Was Added

```
NEW FILES CREATED:
├── db/
│   ├── schema.ts                    # Drizzle ORM schema for all tables
│   ├── client.ts                    # Database client singleton
│   ├── README.md                    # Database documentation
│   └── migrations/
│       └── add-gin-indexes.sql     # Performance indexes
├── lib/matching/
│   ├── types.ts                    # Type definitions
│   ├── matcher.ts                  # Core matching engine
│   ├── index.ts                    # Exports
│   └── README.md                   # Matching system documentation
├── hooks/
│   └── useMatching.ts              # React hook for client-side usage
├── app/api/matching/
│   └── route.ts                    # API endpoint for matching
└── MATCHING_INTEGRATION_GUIDE.md   # This file

DEPENDENCIES INSTALLED:
├── drizzle-orm                     # ORM
└── pg                              # PostgreSQL driver
```

## 🚀 Getting Started

### Step 1: Set Up Environment

Create `.env.local`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mintee
```

### Step 2: Create Database

```bash
createdb mintee
```

### Step 3: Apply Migrations

```bash
psql $DATABASE_URL < db/migrations/add-gin-indexes.sql
```

### Step 4: Verify Setup

```bash
# Test database connection
node -e "
const { db } = require('./db/client.ts');
db.select().from(db.schema.users).limit(1).then(r => console.log('Connected!'));
"
```

## 📚 Integration Examples

### Example 1: Update Matches Page

**Current File**: `app/matches/page.tsx`

Replace the hardcoded mock data with real matching:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useMatching } from '@/hooks/useMatching';

export default function MatchesPage() {
  const [menteeId, setMenteeId] = useState<string | null>(null);
  const { matches, loading, error, fetchMatches } = useMatching({
    menteeId: menteeId || undefined,
    limit: 10,
  });

  useEffect(() => {
    // Get current user's mentee ID (replace with actual auth)
    const id = localStorage.getItem('mentee_id');
    if (id) {
      setMenteeId(id);
      fetchMatches(id);
    }
  }, []);

  if (!menteeId) return <div>Please log in</div>;
  if (loading) return <div>Finding your mentor matches...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h1>Your Mentor Matches</h1>
      {matches.length === 0 ? (
        <div>No matches found yet</div>
      ) : (
        matches.map((match) => (
          <div
            key={match.mentorId}
            className="border rounded-lg p-4 space-y-2"
          >
            <h2 className="text-xl font-bold">{match.mentor.name}</h2>

            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">
                {match.matchScore}%
              </span>
              <div className="text-sm text-gray-600 space-y-1">
                <p>📍 {match.mentor.location || 'Remote'}</p>
                <p>🎓 Level {match.mentor.gcbLevel}</p>
              </div>
            </div>

            <div className="bg-gray-100 p-3 rounded">
              <h3 className="font-semibold mb-2">Why this match:</h3>
              <ul className="space-y-1 text-sm">
                {match.reasons.map((reason, i) => (
                  <li key={i}>✓ {reason}</li>
                ))}
              </ul>
            </div>

            {match.matchedItems.languages.length > 0 && (
              <div className="flex gap-2">
                <span className="text-xs font-semibold">Languages:</span>
                {match.matchedItems.languages.map((lang) => (
                  <span
                    key={lang}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            )}

            <div className="text-xs text-gray-500 grid grid-cols-3 gap-2">
              <div>
                Location: {match.breakdown.location.toFixed(0)} pts
              </div>
              <div>
                Language: {match.breakdown.language.toFixed(0)} pts
              </div>
              <div>
                Seniority: {match.breakdown.seniority.toFixed(0)} pts
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded">
              Connect with {match.mentor.name.split(' ')[0]}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
```

### Example 2: Server-Side Match Computation

Create a server action for periodic match recomputation:

**File**: `app/actions/recomputeMatches.ts`

```typescript
'use server';

import { MentorshipMatcher } from '@/lib/matching';
import { db } from '@/db/client';
import { menteeProfile } from '@/db/schema';

export async function recomputeMatchesForMentee(menteeId: string) {
  try {
    const matcher = new MentorshipMatcher();

    // Get mentee's preferences
    const menteePrefs = await db
      .select()
      .from(menteeProfile)
      .where(eq(menteeProfile.userId, BigInt(menteeId)))
      .limit(1);

    const filters = {
      respectSameLocation: menteePrefs[0]?.sameLocation,
      respectSameBusinessArea: menteePrefs[0]?.sameBusinessArea,
    };

    // Find and save matches
    const matches = await matcher.findMatches(menteeId, {
      limit: 20,
      filters,
    });

    await matcher.saveMatches(menteeId, matches);

    return {
      success: true,
      matchCount: matches.length,
      topMatch: matches[0],
    };
  } catch (error) {
    console.error('Failed to recompute matches:', error);
    throw error;
  }
}
```

Use it in a page:

```typescript
'use client';

import { recomputeMatchesForMentee } from '@/app/actions/recomputeMatches';
import { useState } from 'react';

export function RefreshMatches({ menteeId }: { menteeId: string }) {
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const result = await recomputeMatchesForMentee(menteeId);
      alert(`Found ${result.matchCount} matches!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {loading ? 'Refreshing...' : 'Refresh Matches'}
    </button>
  );
}
```

### Example 3: Integration with Mentor Dashboard

**File**: `app/dashboard/mentor/page.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/db/client';
import { matches, users } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export default function MentorDashboard() {
  const [incomingMatches, setIncomingMatches] = useState([]);
  const mentorId = '123'; // From auth

  useEffect(() => {
    const fetchMatches = async () => {
      // Get all matches for this mentor
      const matchList = await db
        .select({
          match: matches,
          mentee: users,
        })
        .from(matches)
        .innerJoin(users, eq(matches.menteeId, users.id))
        .where(
          and(
            eq(matches.mentorId, BigInt(mentorId)),
            eq(matches.status, 'PENDING')
          )
        );

      setIncomingMatches(matchList);
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <h2>Incoming Match Requests ({incomingMatches.length})</h2>
      {incomingMatches.map(({ match, mentee }) => (
        <div key={match.id} className="border p-4 rounded mb-4">
          <p className="font-bold">{mentee.name}</p>
          <p className="text-sm text-gray-600">
            Match Score: {match.matchScore}
          </p>
          <div className="mt-2 space-x-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded">
              Accept
            </button>
            <button className="px-4 py-2 bg-gray-400 text-white rounded">
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Example 4: Automated Daily Recomputation

Create a cron job (using your preferred scheduler):

**File**: `lib/matching/scheduler.ts`

```typescript
import { db } from '@/db/client';
import { menteeProfile } from '@/db/schema';
import { MentorshipMatcher } from './matcher';

export async function recomputeAllMatches() {
  const matcher = new MentorshipMatcher();

  // Get all mentees
  const mentees = await db.select().from(menteeProfile);

  console.log(`Recomputing matches for ${mentees.length} mentees...`);

  for (const mentee of mentees) {
    try {
      const matches = await matcher.findMatches(mentee.userId, {
        limit: 20,
      });

      await matcher.saveMatches(mentee.userId, matches);

      console.log(
        `✓ Computed ${matches.length} matches for mentee ${mentee.userId}`
      );
    } catch (error) {
      console.error(`✗ Failed for mentee ${mentee.userId}:`, error);
    }
  }

  console.log('Done!');
}

// Run with: node -e "import('./scheduler.ts').then(m => m.recomputeAllMatches())"
```

## 🔗 API Endpoint Usage

The API is available at `POST /api/matching`:

### Request

```json
{
  "menteeId": "123",
  "limit": 10,
  "filters": {
    "respectSameLocation": true,
    "respectSameBusinessArea": false
  },
  "saveToDb": true
}
```

### Response

```json
{
  "success": true,
  "total": 3,
  "matches": [
    {
      "mentorId": "456",
      "mentor": {
        "name": "Alice Smith",
        "location": "London",
        "gcbLevel": 4,
        "languages": ["English", "French"],
        "businessAreaId": 1
      },
      "matchScore": 92,
      "breakdown": {
        "location": 15,
        "businessArea": 0,
        "language": 15,
        "seniority": 20,
        "learningGoals": 22,
        "experiences": 15
      },
      "matchedItems": {
        "languages": ["English", "French"],
        "experiences": ["Tech Leadership", "Mentoring"],
        "leadershipExperiences": ["Tech Leadership"]
      },
      "reasons": [
        "Same location: London",
        "Common languages: English, French",
        "Matched 3 learning goals",
        "3 shared experiences"
      ]
    }
  ]
}
```

## 📊 Understanding Match Scores

Each match has a breakdown showing how the 100-point score is distributed:

```
┌─────────────────────────────────────────┐
│ Match Score Breakdown (max 100 points)  │
├─────────────────────────────────────────┤
│ Location:      15 pts (same city bonus) │
│ Business Area: 10 pts (same field bonus)│
│ Languages:     15 pts (overlap %        │
│ Seniority:     20 pts (gap adjusted)    │
│ Learning Goals:25 pts (match quality)   │
│ Experiences:   15 pts (overlap count)   │
└─────────────────────────────────────────┘
```

## 🛠 Customization

### Change Match Score Weights

**File**: `lib/matching/matcher.ts` - `scoreMatch()` method

```typescript
const WEIGHTS = {
  location: 15,        // Change these
  businessArea: 10,
  language: 15,
  seniority: 20,
  learningGoals: 25,
  experiences: 15,     // Total must = 100
};
```

### Add Custom Filters

**File**: `lib/matching/matcher.ts` - `buildWhereConditions()` method

```typescript
// Add in the conditions array
if (filters.customFilter) {
  conditions.push(
    // Your custom condition using Drizzle SQL
  );
}
```

### Adjust Hard Filters

**File**: `lib/matching/matcher.ts` - `buildWhereConditions()` method

```typescript
// Modify these conditions
const conditions = [
  ne(users.id, mentee.id),
  // ... change thresholds here
  sql`${users.gcbLevel} >= ${mentee.gcbLevel}`, // Adjust seniority requirement
];
```

## 🧪 Testing

### Test the API Locally

```bash
curl -X POST http://localhost:3000/api/matching \
  -H "Content-Type: application/json" \
  -d '{
    "menteeId": "1",
    "limit": 5,
    "filters": {"respectSameLocation": true}
  }'
```

### Test with Server Action

```typescript
import { MentorshipMatcher } from '@/lib/matching';

const matcher = new MentorshipMatcher();
const matches = await matcher.findMatches('1', { limit: 5 });
console.log(matches);
```

## 📋 Checklist for Implementation

- [ ] Set `DATABASE_URL` in `.env.local`
- [ ] Create PostgreSQL database
- [ ] Run migration: `psql $DATABASE_URL < db/migrations/add-gin-indexes.sql`
- [ ] Update `/app/matches/page.tsx` to use real matching
- [ ] Update `/app/dashboard/mentor/page.tsx` for incoming matches
- [ ] Add `/app/dashboard/mentee/page.tsx` with match display
- [ ] Integrate `useMatching` hook in components
- [ ] Set up cron job for periodic recomputation (optional)
- [ ] Add tests for matcher
- [ ] Deploy and monitor performance

## 🚨 Troubleshooting

### "DATABASE_URL is not set"
Set it in `.env.local` and restart the dev server

### "Mentee not found"
Make sure the mentee ID exists and has a menteeProfile record

### "No matches found"
Check the hard filters - mentee may be too specific or mentors may not have language overlap

### Slow queries
Run the migration to create GIN indexes:
```bash
psql $DATABASE_URL < db/migrations/add-gin-indexes.sql
```

## 📚 Additional Resources

- **Matching System Details**: `lib/matching/README.md`
- **Database Schema**: `db/README.md`
- **Original SQL**: `matcher.sql`
- **Drizzle Docs**: https://orm.drizzle.team/docs/overview

## 🎯 Next Steps

1. **Connect Auth**: Replace placeholder user IDs with real auth
2. **Add UI Components**: Build beautiful match cards
3. **Implement Actions**: Add accept/reject/connect functionality
4. **Monitor**: Track match quality metrics
5. **Iterate**: Adjust weights based on user feedback

Happy matching! 🎉

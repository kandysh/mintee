import { NextRequest, NextResponse } from 'next/server';
import { MentorshipMatcher } from '@/lib/matching/matcher';

export async function POST(req: NextRequest) {
  try {
    const { menteeId, limit = 10, filters, saveToDb = false } = await req.json();

    if (!menteeId) {
      return NextResponse.json(
        { error: 'menteeId is required' },
        { status: 400 }
      );
    }

    const matcher = new MentorshipMatcher();

    // Find matches
    const matches = await matcher.findMatches(menteeId, {
      limit,
      filters,
    });

    // Optionally save to database
    if (saveToDb && matches.length > 0) {
      await matcher.saveMatches(menteeId, matches);
    }

    return NextResponse.json({
      success: true,
      matches,
      total: matches.length,
    });
  } catch (error) {
    console.error('Matching error:', error);
    return NextResponse.json(
      {
        error: 'Failed to find matches',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

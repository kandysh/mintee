'use client';

import { useState, useCallback } from 'react';
import type { MatchResult, MatchingFilters } from '@/lib/matching/types';

interface UseMatchingOptions {
  menteeId?: string | number;
  limit?: number;
  filters?: MatchingFilters;
  autoFetch?: boolean;
}

interface UseMatchingState {
  matches: MatchResult[];
  loading: boolean;
  error: string | null;
}

export function useMatching(options: UseMatchingOptions = {}) {
  const { menteeId, limit = 10, filters, autoFetch = false } = options;
  const [state, setState] = useState<UseMatchingState>({
    matches: [],
    loading: false,
    error: null,
  });

  const fetchMatches = useCallback(
    async (id?: string | number) => {
      const targetId = id || menteeId;

      if (!targetId) {
        setState((prev) => ({
          ...prev,
          error: 'menteeId is required',
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const response = await fetch('/api/matching', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            menteeId: targetId,
            limit,
            filters,
            saveToDb: false,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch matches');
        }

        const data = await response.json();

        setState({
          matches: data.matches || [],
          loading: false,
          error: null,
        });

        return data.matches;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error occurred';

        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));

        console.error('Error fetching matches:', error);
      }
    },
    [menteeId, limit, filters]
  );

  // Auto-fetch on mount if enabled
  if (autoFetch && menteeId && !state.loading && state.matches.length === 0) {
    fetchMatches(menteeId);
  }

  return {
    ...state,
    fetchMatches,
  };
}

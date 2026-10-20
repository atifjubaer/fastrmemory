import { QueryClient } from '@tanstack/react-query';
import { ApiError } from './api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // 4xx responses will not fix themselves; network blips and 5xx get two retries.
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) return false;
        return failureCount < 2;
      },
    },
  },
});

/** Query keys are centralised so live-sync invalidation and mutations stay consistent. */
export const qk = {
  status: ['status'] as const,
  memories: ['memories'] as const,
  search: (p: object) => ['search', p] as const,
  memory: (id: string) => ['memory', id] as const,
  history: (id: string) => ['memory', id, 'history'] as const,
  traps: (files: string[]) => ['traps', files] as const,
  actions: ['actions'] as const,
  conflicts: ['conflicts'] as const,
  timeline: (limit: number) => ['timeline', limit] as const,
  graph: (file?: string) => ['graph', file ?? ''] as const,
  entities: ['entities'] as const,
  explain: (q: string) => ['explain', q] as const,
  health: ['health'] as const,
};

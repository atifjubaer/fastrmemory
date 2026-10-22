import { useMemo } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { api, type SearchParams } from '@/lib/api';
import { qk } from '@/lib/query-client';
import { applyConflictOps, applyMemoryOps, usePendingOps } from '@/lib/pending-ops';

export function useStatus() {
  return useQuery({ queryKey: qk.status, queryFn: ({ signal }) => api.status(signal) });
}

/** All active memories with pending (undoable) operations applied on top. */
export function useMemories() {
  const ops = usePendingOps();
  const query = useQuery({ queryKey: qk.memories, queryFn: ({ signal }) => api.memories(signal) });
  const data = useMemo(() => (query.data ? applyMemoryOps(query.data, ops) : undefined), [query.data, ops]);
  return { ...query, data };
}

export function useSearch(params: SearchParams) {
  const ops = usePendingOps();
  const query = useQuery({
    queryKey: qk.search(params),
    queryFn: ({ signal }) => api.search(params, signal),
    placeholderData: keepPreviousData,
  });
  const data = useMemo(
    () => (query.data ? { ...query.data, results: applyMemoryOps(query.data.results, ops) } : undefined),
    [query.data, ops]
  );
  return { ...query, data };
}

export function useMemoryDetail(id: string | null) {
  return useQuery({
    queryKey: qk.memory(id ?? ''),
    queryFn: ({ signal }) => api.memory(id!, signal),
    enabled: Boolean(id),
  });
}

export function useMemoryHistory(id: string | null) {
  return useQuery({
    queryKey: qk.history(id ?? ''),
    queryFn: ({ signal }) => api.history(id!, signal),
    enabled: Boolean(id),
  });
}

export function useTraps(files: string[]) {
  const ops = usePendingOps();
  const query = useQuery({
    queryKey: qk.traps(files),
    queryFn: ({ signal }) => api.traps(files, signal),
    placeholderData: keepPreviousData,
  });
  const data = useMemo(
    () => (query.data ? { ...query.data, traps: applyMemoryOps(query.data.traps, ops) } : undefined),
    [query.data, ops]
  );
  return { ...query, data };
}

export function useActions() {
  return useQuery({ queryKey: qk.actions, queryFn: ({ signal }) => api.actions(signal) });
}

export function useConflicts() {
  const ops = usePendingOps();
  const query = useQuery({ queryKey: qk.conflicts, queryFn: ({ signal }) => api.conflicts(signal) });
  const data = useMemo(() => (query.data ? applyConflictOps(query.data, ops) : undefined), [query.data, ops]);
  return { ...query, data };
}

export function useTimeline(limit = 30) {
  return useQuery({ queryKey: qk.timeline(limit), queryFn: ({ signal }) => api.timeline(limit, signal) });
}

export function useReplay(from: string, to: string) {
  return useQuery({
    queryKey: qk.replay(from, to),
    queryFn: ({ signal }) => api.replay(from, to, signal),
    enabled: Boolean(from && to),
  });
}

export function useGraph(file?: string) {
  return useQuery({
    queryKey: qk.graph(file),
    queryFn: ({ signal }) => api.graph(file, signal),
    placeholderData: keepPreviousData,
  });
}

export function useEntities() {
  return useQuery({ queryKey: qk.entities, queryFn: ({ signal }) => api.entities(signal) });
}

export function useExplain(q: string) {
  return useQuery({
    queryKey: qk.explain(q),
    // React Query aborts the previous request when the key changes, which fixes the stale-response race.
    queryFn: ({ signal }) => api.explain(q, signal),
    enabled: q.trim().length > 0,
    placeholderData: keepPreviousData,
  });
}

export function useHealth() {
  return useQuery({ queryKey: qk.health, queryFn: ({ signal }) => api.health(signal), staleTime: 30_000 });
}

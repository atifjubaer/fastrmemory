/**
 * Deterministic evaluation split.
 *
 * The split is derived from a SHA-256 of the case id and never from the case content,
 * question type, or result. Sorting by that hash and cutting at the midpoint produces an
 * exactly balanced 60/60 split for a 120-case slice and is stable across machines, Node
 * versions, and runs.
 *
 * Tuning happens on `dev` only. The `test` half is reported but never used to choose a
 * default, a threshold, or a fusion weight.
 */

import { createHash } from 'node:crypto';

export type BenchSplitName = 'dev' | 'test';

export interface SplitCase {
  id: string;
}

export function splitKey(id: string): string {
  return createHash('sha256').update(id, 'utf8').digest('hex');
}

/**
 * Partitions cases into dev/test halves. The ordering of the input never matters: both
 * halves are returned in the input order, but membership is decided by the hash rank.
 */
export function splitCases<T extends SplitCase>(cases: T[], devFraction = 0.5): {
  dev: T[];
  test: T[];
} {
  if (cases.length === 0) return { dev: [], test: [] };
  const ranked = [...cases].sort((a, b) => {
    const ka = splitKey(a.id);
    const kb = splitKey(b.id);
    return ka < kb ? -1 : ka > kb ? 1 : 0;
  });
  const devCount = Math.round(ranked.length * devFraction);
  const devIds = new Set(ranked.slice(0, devCount).map((item) => item.id));
  return {
    dev: cases.filter((item) => devIds.has(item.id)),
    test: cases.filter((item) => !devIds.has(item.id))
  };
}

export function selectSplit<T extends SplitCase>(cases: T[], split: BenchSplitName | 'all'): T[] {
  if (split === 'all') return cases;
  return splitCases(cases)[split];
}

/**
 * Takes the first `perType` cases of every category, in dataset order. This is the
 * documented slice rule: first 20 answerable questions per question_type x 6 types.
 */
export function slicePerType<T extends { category: string }>(cases: T[], perType: number): T[] {
  const counts = new Map<string, number>();
  const selected: T[] = [];
  for (const item of cases) {
    const current = counts.get(item.category) ?? 0;
    if (current >= perType) continue;
    counts.set(item.category, current + 1);
    selected.push(item);
  }
  return selected;
}

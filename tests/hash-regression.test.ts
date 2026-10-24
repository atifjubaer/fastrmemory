import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  evaluatePublicEngine,
  loadPublicDataset,
  prepareEmbeddings,
  PUBLIC_ENGINES
} from '../src/bench/public-harness.js';
import type { PublicDataset } from '../src/bench/public-datasets.js';

/**
 * P0 regression guard: the feature-hash vectorizer is opt-in.
 *
 * Before P0, `enableVector` defaulted to true and the FNV hash provider was always
 * available, so every default query ran a lexical duplicate of BM25 through RRF and lost
 * rank. This fixture is a reduced LongMemEval slice with the affected cases; it is
 * self-contained so CI never needs the 277 MB corpus.
 *
 * The fixture records the expected rank per case as measured on this reduced corpus. If the
 * hash stream becomes part of the default path again, the `default_config` comparison below
 * fails on the degraded cases.
 */

const FIXTURE = path.join(process.cwd(), 'bench', 'fixtures', 'hash-regression.json');

interface FixtureCase {
  id: string;
  projectId: string;
  category: string;
  query: string;
  goldIds: string[];
  split: 'dev' | 'test';
  expected: 'degraded' | 'unchanged';
  bm25Rank: number;
  hashRank: number;
}

interface FixtureMemory {
  id: string;
  projectId: string;
  title: string;
  content: string;
  validFrom: string;
}

interface Fixture {
  schemaVersion: number;
  source: { reducedFixture?: { cases: number; memories: number; degraded: number; unchanged: number } };
  engines: Record<'bm25' | 'hash', Record<string, unknown>>;
  cases: FixtureCase[];
  memories: FixtureMemory[];
}

function loadFixture(): Fixture {
  return JSON.parse(fs.readFileSync(FIXTURE, 'utf-8')) as Fixture;
}

function toDataset(fixture: Fixture): PublicDataset {
  return {
    name: 'hash-regression',
    examples: fixture.cases.length,
    skippedCases: 0,
    cases: fixture.cases.map((item) => ({
      id: item.id,
      projectId: item.projectId,
      query: item.query,
      category: item.category,
      goldIds: item.goldIds,
      goldCount: item.goldIds.length,
      missingGoldCount: 0
    })),
    memories: fixture.memories
  };
}

function engine(name: string) {
  const found = PUBLIC_ENGINES.find((item) => item.name === name);
  if (!found) throw new Error(`Unknown engine: ${name}`);
  return found;
}

describe('BM25 vs feature-hash regression fixture', () => {
  const fixture = loadFixture();
  const dataset = toDataset(fixture);

  async function evaluate(name: string, withEmbeddings = false) {
    const loaded = loadPublicDataset(dataset);
    try {
      const selected = engine(name);
      if (withEmbeddings) {
        await prepareEmbeddings(loaded.db, loaded.repo, dataset, selected);
      }
      return await evaluatePublicEngine(loaded.db, dataset, selected);
    } finally {
      loaded.db.close();
    }
  }

  it('captures both degraded and unchanged cases from the public slice', () => {
    expect(fixture.schemaVersion).toBe(1);
    expect(fixture.cases.length).toBe(20);
    expect(fixture.cases.filter((item) => item.expected === 'degraded').length).toBeGreaterThanOrEqual(10);
    expect(fixture.cases.filter((item) => item.expected === 'unchanged').length).toBeGreaterThan(0);
    expect(fixture.source.reducedFixture).toEqual({
      cases: fixture.cases.length,
      memories: fixture.memories.length,
      degraded: fixture.cases.filter((item) => item.expected === 'degraded').length,
      unchanged: fixture.cases.filter((item) => item.expected === 'unchanged').length
    });
  });

  it('reproduces the recorded ranks for both streams', async () => {
    const bm25 = await evaluate('bm25_only');
    const hash = await evaluate('full_hash', true);

    const bm25Ranks = new Map(bm25.cases.map((item) => [item.caseId, item.rank]));
    const hashRanks = new Map(hash.cases.map((item) => [item.caseId, item.rank]));

    for (const item of fixture.cases) {
      expect({ id: item.id, rank: bm25Ranks.get(item.id) }).toEqual({ id: item.id, rank: item.bm25Rank });
      expect({ id: item.id, rank: hashRanks.get(item.id) }).toEqual({ id: item.id, rank: item.hashRank });
    }
  });

  it('never lets the hash stream outrank BM25 and keeps degraded cases degraded', async () => {
    const bm25 = await evaluate('bm25_only');
    const hash = await evaluate('full_hash', true);
    const bm25Ranks = new Map(bm25.cases.map((item) => [item.caseId, item.rank]));
    const hashRanks = new Map(hash.cases.map((item) => [item.caseId, item.rank]));

    for (const item of fixture.cases) {
      const bm25Rank = bm25Ranks.get(item.id) ?? 0;
      const hashRank = hashRanks.get(item.id) ?? 0;

      // Zero means "not found". A miss must never be treated as better than a hit.
      const normalized = (rank: number) => (rank === 0 ? Number.POSITIVE_INFINITY : rank);
      expect(normalized(hashRank)).toBeGreaterThanOrEqual(normalized(bm25Rank));

      if (item.expected === 'degraded') {
        expect(hashRank).toBeGreaterThan(bm25Rank);
      } else {
        expect(hashRank).toBe(bm25Rank);
      }
    }

    // The fixture must keep enough separation to detect a silent re-enable.
    expect(bm25.overall.hitAt1 - hash.overall.hitAt1).toBeGreaterThanOrEqual(40);
  });

  it('keeps hash-tagged rows inert for the shipped default configuration', async () => {
    // A database written while hash mode was on is the realistic upgrade path: the rows are
    // already tagged with the hash model id. Default recall must ignore them.
    const hashDb = loadPublicDataset(dataset);
    try {
      await prepareEmbeddings(hashDb.db, hashDb.repo, dataset, engine('full_hash'));
      const withHashRows = await evaluatePublicEngine(hashDb.db, dataset, engine('default_config'));

      const bm25 = await evaluate('bm25_only');
      const bm25Ranks = new Map(bm25.cases.map((item) => [item.caseId, item.rank]));

      for (const item of withHashRows.cases) {
        expect({ id: item.caseId, rank: item.rank }).toEqual({ id: item.caseId, rank: bm25Ranks.get(item.caseId) });
      }
      expect(withHashRows.overall.hitAt1).toBe(bm25.overall.hitAt1);
    } finally {
      hashDb.db.close();
    }
  });
});

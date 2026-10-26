import { describe, it, expect } from 'vitest';
import { detectAggregateIntent, aggregateContentTerms } from '../src/search/aggregate.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';
import { loadPublicDataset } from '../src/bench/public-harness.js';
import type { PublicDataset } from '../src/bench/public-datasets.js';

/**
 * Aggregate coverage. A counting question is answered by finding every session that
 * mentions the activity; the question's own scaffolding words are frequent across the
 * corpus and outvote that activity under FTS5's OR semantics, so they are removed from
 * the lexical query and the original query is fused back in to keep its precision.
 */

const PROJECT = 'agg_demo';

/** Three sessions about baking, and five decoys that only share scaffolding words. */
const MEMORIES = [
  { id: 'mem_bake_1', title: 'Sourdough starter', content: 'I baked a loaf of sourdough bread this morning and it finally rose properly.' },
  { id: 'mem_bake_2', title: 'Cookie batch', content: 'I baked two dozen chocolate cookies for the neighbour party on Saturday.' },
  { id: 'mem_bake_3', title: 'Birthday cake', content: 'I baked a lemon birthday cake for my sister and decorated it with berries.' },
  { id: 'mem_decoy_1', title: 'Busy at work', content: 'The past few weeks have been busy with many meetings and travel.' },
  { id: 'mem_decoy_2', title: 'Reflection', content: 'I have thought many times about the past and how quickly the weeks pass.' },
  { id: 'mem_decoy_3', title: 'Commute notes', content: 'Many times over the past weeks the train was late and I missed the connection.' },
  { id: 'mem_decoy_4', title: 'Garden log', content: 'The past weeks were dry, so I watered the garden many times in the evening.' },
  { id: 'mem_decoy_5', title: 'Reading list', content: 'I read many books in the past weeks, mostly history and a few novels.' }
];

function dataset(): PublicDataset {
  return {
    name: 'aggregate-fixture',
    examples: 1,
    skippedCases: 0,
    cases: [],
    memories: MEMORIES.map((memory) => ({
      id: memory.id,
      projectId: PROJECT,
      title: memory.title,
      content: memory.content,
      validFrom: '2023-05-20T10:00:00.000Z'
    }))
  };
}

const AGGREGATE_QUERY = 'How many times did I bake something in the past two weeks?';
const BAKING = ['mem_bake_1', 'mem_bake_2', 'mem_bake_3'];

async function search(query: string, aggregateCoverage: boolean, limit = 3) {
  const loaded = loadPublicDataset(dataset());
  try {
    return await searchMemories(loaded.db, {
      projectId: PROJECT,
      query,
      limit,
      budgetTokens: 100_000,
      backfill: false,
      retrieval: {
        enableBm25: true,
        enableVector: false,
        enableGraph: false,
        trapBoost: 1,
        verifiedBoost: 1,
        aggregateCoverage
      }
    });
  } finally {
    loaded.db.close();
  }
}

describe('detectAggregateIntent', () => {
  it('recognises counting and enumeration phrasings', () => {
    for (const query of [
      'How many projects have I led?',
      'How much total money have I spent on bike repairs?',
      'How often did I travel last year?',
      'How many hours have I spent playing games in total?',
      'List all the books I read',
      'What did I do across all of the trips?'
    ]) {
      expect(detectAggregateIntent(query).detected, query).toBe(true);
    }
  });

  it('leaves ordinary questions alone', () => {
    for (const query of [
      'Where is the auth middleware defined?',
      'Why does the migration fail on Postgres?',
      'Summarise the caching decision'
    ]) {
      expect(detectAggregateIntent(query).detected, query).toBe(false);
    }
  });

  it('keeps only the content terms', () => {
    expect(aggregateContentTerms(AGGREGATE_QUERY)).toEqual(['bake']);
    expect(aggregateContentTerms('How many model kits have I worked on or bought?')).toEqual([
      'model',
      'kits',
      'worked',
      'bought'
    ]);
  });
});

describe('aggregate retrieval', () => {
  it('finds every session that mentions the activity', async () => {
    const result = await search(AGGREGATE_QUERY, true);
    const ids = result.memories.map((item) => item.memory.id);
    expect(ids.slice(0, 3).sort()).toEqual([...BAKING].sort());
    expect(result.aggregate).toEqual({ detected: true, limit: 20 });
  });

  it('without the pass, scaffolding words outrank the activity', async () => {
    const result = await search(AGGREGATE_QUERY, false);
    const ids = result.memories.map((item) => item.memory.id);
    expect(ids.slice(0, 3).every((id) => BAKING.includes(id))).toBe(false);
    expect(result.aggregate).toBeUndefined();
  });

  it('returns up to the aggregate limit so a caller can count', async () => {
    const result = await search(AGGREGATE_QUERY, true, 3);
    expect(result.memories.length).toBeGreaterThan(3);
    expect(result.memories.length).toBeLessThanOrEqual(20);
  });

  it('never widens a normal query', async () => {
    const query = 'sourdough bread';
    const withPass = await search(query, true, 3);
    const withoutPass = await search(query, false, 3);
    expect(withPass.memories.length).toBeLessThanOrEqual(3);
    expect(withPass.memories.map((item) => item.memory.id)).toEqual(
      withoutPass.memories.map((item) => item.memory.id)
    );
  });

  it('keeps the original rank-1 when both lexical passes agree', async () => {
    // "model kits worked bought" keeps its own wording; the fused list must not reorder
    // the head of the ranking just because a second pass ran.
    const query = 'How many model kits have I worked on?';
    const result = await search(query, true);
    expect(result.memories.length).toBeGreaterThan(0);
    expect(result.memories[0].bm25Rank).toBe(1);
  });
});

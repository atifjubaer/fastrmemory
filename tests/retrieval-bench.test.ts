import { describe, it, expect } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { buildBenchmarkCorpus, summarizeCorpus } from '../src/bench/corpus.js';
import { setupCorpusDatabase, evaluateSearchEngine } from '../src/bench/harness.js';

describe('Retrieval benchmark corpus', () => {
  it('has 240 cases, 120 memories, and a 20% held-out split', () => {
    const corpus = buildBenchmarkCorpus();
    const summary = summarizeCorpus(corpus);

    expect(summary.memories).toBe(120);
    expect(summary.cases).toBe(240);
    expect(summary.train).toBe(192);
    expect(summary.holdout).toBe(48);
    expect(summary.holdout / summary.cases).toBeCloseTo(0.2, 5);

    for (const counts of Object.values(summary.byCategory)) {
      expect(counts.holdout / counts.total).toBeCloseTo(0.2, 5);
    }
  });

  it('keeps every fifth case in the held-out split', () => {
    const corpus = buildBenchmarkCorpus();
    const holdoutNumbers = corpus.cases
      .filter((c) => c.split === 'holdout')
      .map((c) => Number(c.id.split('_').at(-1)))
      .filter((n) => Number.isFinite(n));

    expect(holdoutNumbers.length).toBeGreaterThan(0);
    for (const n of holdoutNumbers) {
      expect((n - 1) % 5).toBe(4);
    }
  });

  it('evaluates queries on an isolated in-memory database', async () => {
    const corpus = buildBenchmarkCorpus();
    const db = new DatabaseSync(':memory:');
    try {
      setupCorpusDatabase(db, corpus, 'bench_test_proj');
      const exactCases = corpus.cases.filter(
        (c) => c.split === 'train' && c.category === 'exact_keyword'
      );
      const sample = { ...corpus, cases: exactCases.slice(0, 5) };
      const result = await evaluateSearchEngine(
        db,
        'bench_test_proj',
        sample,
        'train',
        {
          name: 'bm25_only',
          description: 'test ablation',
          retrieval: {
            enableBm25: true,
            enableVector: false,
            enableGraph: false,
            trapBoost: 1,
            verifiedBoost: 1
          }
        },
        5
      );

      expect(result.overall.count).toBe(5);
      expect(result.overall.hitAt1).toBeGreaterThan(0);
      expect(result.overall.avgTokens).toBeLessThanOrEqual(250);
      expect(result.cases.every((c) => c.rank >= 1 && c.rank <= 5)).toBe(true);
    } finally {
      db.close();
    }
  });
});

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { runBenchmarks, formatBenchmarkMarkdown } from '../src/bench/benchmark.js';

describe('FastrMemory Benchmark Suite', () => {
  let db: DatabaseSync;

  beforeEach(() => {
    db = new DatabaseSync(':memory:');
  });

  afterEach(() => {
    db.close();
  });

  it('runs benchmark cases and returns comparative engine scores', async () => {
    const report = await runBenchmarks(db, 'test_bench_proj');

    expect(report.totalCases).toBeGreaterThanOrEqual(8);
    expect(report.engines.length).toBe(3);

    const fastr = report.engines.find((e) => e.name.includes('FastrMemory'))!;
    const bm25 = report.engines.find((e) => e.name.includes('BM25'))!;

    expect(fastr).toBeDefined();
    expect(bm25).toBeDefined();

    // FastrMemory should achieve high Hit@5 and Trap recall
    expect(fastr.hitAt5).toBeGreaterThanOrEqual(75);
    expect(fastr.trapRecallRate).toBe(100);
    expect(fastr.avgLatencyMs).toBeLessThan(100); // Sub-100ms in in-memory test

    const md = formatBenchmarkMarkdown(report);
    expect(md).toContain('FastrMemory Retrieval Benchmark Suite');
    expect(md).toContain('Triple-Stream RRF');
  });
});

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
    expect(report.engines.length).toBeGreaterThanOrEqual(3);

    const fastr = report.engines.find((e) => e.name.includes('FastrMemory'))!;
    const bm25 = report.engines.find((e) => e.name.includes('BM25'))!;
    const memoria = report.engines.find((e) => e.name.includes('Memoria'))!;

    expect(fastr).toBeDefined();
    expect(bm25).toBeDefined();
    expect(memoria).toBeDefined();

    // FastrMemory should achieve high Hit@5 and Trap recall
    expect(fastr.hitAt5).toBeGreaterThanOrEqual(75);
    expect(fastr.trapRecallRate).toBe(100);
    expect(fastr.avgLatencyMs).toBeLessThan(100); // Sub-100ms in in-memory test

    const md = formatBenchmarkMarkdown(report);
    expect(md).toContain('FastrMemory Cognitive Retrieval Benchmark Suite');
    expect(md).toContain('Triple-Stream RRF');
  });
});

describe('Benchmark honesty & isolation', () => {
  it('runs on its own in-memory DB and labels competitor rows as simulated baselines', async () => {
    const { runIsolatedBenchmarks, BENCHMARK_CASES } = await import('../src/bench/benchmark.js');
    const report = await runIsolatedBenchmarks();
    const others = report.engines.filter((e) => !e.name.includes('FastrMemory'));
    expect(others.length).toBe(3);
    for (const e of others) expect(e.name).toContain('simulated baseline (not the real project)');

    // Hippo-style baseline now really uses BM25 MATCH, so it finds keyword cases
    const hippo = report.engines.find((e) => e.name.includes('Hippo'))!;
    expect(hippo.hitAt5).toBeGreaterThan(0);

    const md = formatBenchmarkMarkdown(report);
    expect(md).not.toMatch(/real-world/i);
    expect(md).toContain('NOT SWE-bench or LongMemEval data');
    for (const c of BENCHMARK_CASES) {
      expect(c.query).not.toMatch(/SWE-bench|LongMemEval/);
    }
  });

  it('bench CLI does not pass the user database to the benchmark', async () => {
    const fs = await import('node:fs');
    const src = fs.readFileSync(new URL('../bin/fastr.ts', import.meta.url), 'utf-8');
    const block = src.slice(src.indexOf(".command('bench')"), src.indexOf(".command('bench')") + 1200);
    expect(block).not.toContain('ctx.db');
    expect(block).toContain('runIsolatedBenchmarks');
  });
});

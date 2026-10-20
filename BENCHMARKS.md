# Benchmark Methodology

**Last run:** 2026-10-20T14:21:41Z
**Commit:** `d9446e1167540320164de1b107ed678fd127bbec`
**Command:** `npx tsx scripts/capture-bench.ts`
**Raw JSON:** [`bench/results/latest.json`](bench/results/latest.json)
**Corpus size:** 12 hand-written synthetic cases

## Hardware and runtime

- CPU: AMD Ryzen 7 7700 (8 cores / 16 threads)
- RAM: 15.1 GB
- OS: Windows 10 Pro 10.0.19045 (x64)
- Node.js: v24.15.0
- SQLite: Node built-in `node:sqlite` (in-memory database for the benchmark)

## What is measured

Each case calls `searchMemories()` with a budget of 1,500 tokens (`TOKEN_LEVELS.L2_TASK_RECALL`) and, where the case defines one, a target file path. The expected memory must appear in the returned list; rank determines Hit@1/3/5 and MRR. Tokens are estimated from the packed result text with `estimateTokens()`. Latency wraps only the in-process search call and excludes Node startup, model download/load, and CLI overhead.

## Results

| Engine | Hit@1 | Hit@3 | Hit@5 | MRR | Latency (mean) | Trap recall | Avg tokens |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| FastrMemory (triple-stream RRF) | 75% | 92% | 100% | 0.850 | 0.67 ms | 100% | 124 |
| BM25 — simulated baseline | 92% | 92% | 100% | 0.933 | 0.20 ms | 100% | 84 |
| Memoria-style — simulated baseline | 100% | 100% | 100% | 1.000 | 0.05 ms | 100% | 161 |
| Static flat dump — simulated baseline | 42% | 58% | 67% | 0.507 | 0.03 ms | 75% | 274 |

## Caveats

1. **These are synthetic cases.** They were written by hand for this repository; they are not SWE-bench, LongMemEval, or LoCoMo data. Twelve cases means one case is 8.3 percentage points.
2. **The BM25, Memoria-style, and static rows are simulations implemented in `src/bench/benchmark.ts`**, not the real projects. They must never be cited as competitor measurements.
3. **The simulated BM25 baseline currently beats FastrMemory on Hit@1** (92% vs 75%). That is the honest result and the reason retrieval tuning is the next milestone.
4. **Latency is not end-to-end.** CLI cold start is measured separately in `docs/audit/2026-10-20-baseline.md`; expect a Node process startup cost on every CLI invocation.
5. **Token counts are estimates**, not tokenizer-exact counts, and the benchmark corpus is small enough that packing behavior dominates.
6. **The vector stream is optional.** By default, backfill uses deterministic hash vectors (lexical n-grams), which overlap with BM25; semantic embeddings require an explicit model install. See `src/search/backfill.ts` and `src/search/embeddings.ts`.
7. **No confidence intervals are reported for this run.** With 12 cases they would be too wide to be useful. The 240+ case harness adds bootstrap 95% CIs.

## Reproduce

```bash
npm ci
npx tsx scripts/capture-bench.ts
```

The script writes `bench/results/latest.json` and prints the commit and case count. Running it on a different machine will change latency but should not change the accuracy columns (same seed and fixed corpus).

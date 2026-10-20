### FastrMemory Retrieval Benchmark — 12 Synthetic Cases

> **Read this first.** These are **12 hand-written synthetic cases**, not SWE-bench or LongMemEval data. The BM25, Memoria-style, and static rows are **simulated baselines implemented inside `src/bench/benchmark.ts`** — they are *not* the real projects and say nothing about those projects' actual performance. The simulated BM25 row currently scores **higher Hit@1 (92%) than FastrMemory (75%)**. This table is not evidence of superiority.

- **Date:** 2026-10-20
- **Commit:** `d9446e1`
- **Command:** `npx tsx scripts/capture-bench.ts`
- **Raw JSON:** [`bench/results/latest.json`](../bench/results/latest.json)

| Engine | Hit@1 | Hit@3 | Hit@5 | MRR | Latency | Trap Recall | Avg Tokens |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| FastrMemory (triple-stream RRF) | 75% | 92% | 100% | 0.850 | 0.67 ms | 100% | 124 t |
| BM25 — simulated baseline (not the real project) | 92% | 92% | 100% | 0.933 | 0.20 ms | 100% | 84 t |
| Memoria-style — simulated baseline (not the real project) | 100% | 100% | 100% | 1.000 | 0.05 ms | 100% | 161 t |
| Static flat dump — simulated baseline (not the real project) | 42% | 58% | 67% | 0.507 | 0.03 ms | 75% | 274 t |

Latency is measured in-process around `searchMemories()` on an in-memory SQLite database; it excludes CLI process startup and model loading. **Token counts** are estimates from `estimateTokens()` over the packed result text, not tokenizer-exact counts.

#### Error trap recall

```text
FastrMemory (Triple-Stream RRF)                                  ████████████████████ 100%
BM25 — simulated baseline                                        ████████████████████ 100%
Memoria-style — simulated baseline                               ████████████████████ 100%
Static flat dump — simulated baseline                            ███████████████░░░░░  75%
```

#### Context token economy (lower is better)

```text
FastrMemory (Triple-Stream RRF)                                  █░░░░░░░░░░░░░░░░░░░ 124 tokens
BM25 — simulated baseline                                        █░░░░░░░░░░░░░░░░░░░  84 tokens
Memoria-style — simulated baseline                               █░░░░░░░░░░░░░░░░░░░ 161 tokens
Static flat dump — simulated baseline                            ██░░░░░░░░░░░░░░░░░░ 274 tokens
```

## What this run does not prove

- It does not cover 240+ cases, paraphrase-heavy queries, temporal supersession at scale, or multi-hop retrieval.
- It does not compare against a real competitor build; all non-Fastr rows are local approximations.
- It does not measure end-to-end agent task accuracy, only retrieval rank and packed tokens on this corpus.
- It does not establish statistical significance; with 12 cases, one case is 8.3 percentage points.

The next benchmark phase (240+ cases with a 20% held-out split, real pinned baselines, bootstrap confidence intervals) is described in [`../ROADMAP.md`](../ROADMAP.md).

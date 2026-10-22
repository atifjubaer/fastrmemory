# External Retrieval Baselines

**Run date:** 2026-10-21 local
**Code commit:** `b220067` (external harness)
**Raw JSON:** [`external-minisearch-longmemeval.json`](../bench/results/external-minisearch-longmemeval.json), [`external-mcp-longmemeval.json`](../bench/results/external-mcp-longmemeval.json), [`external-minisearch-locomo.json`](../bench/results/external-minisearch-locomo.json), [`external-mcp-locomo.json`](../bench/results/external-mcp-locomo.json)
**Command:** `npx tsx scripts/eval-external.ts <dataset> --engine <minisearch|mcp-memory>`

These are **ranked-retrieval baselines only**. They do not generate answers, judge answer correctness, or reproduce official LongMemEval or LoCoMo QA scores. The external engines receive the same parsed memories and cases as the internal public harness, and no dataset-specific tuning was performed.

## Engines and pins

| Engine | Pin | Role | Integrity |
|---|---|---|---|
| MiniSearch | `7.2.0` exact devDependency | Strong generic in-memory full-text baseline | `sha512-dqT2XBYUOZOiC5t2HRnwADjhNS2cecp9u+TJRiJ1Qp/f5qjkeT5APcGPjHw+bz89Ms8Jp+cG4AlE+QZ/QnDglg==` |
| MCP reference memory server | `@modelcontextprotocol/server-memory@2.0.0` | Literal external memory engine, driven over stdio | `sha512-h+oxQCpK6FOuhlPB9hAcSihAAahcnijuGTZGcXStGOL4UzFYB4ap+pvtSelxchkZlz7tnpY/e0sONaAs24Rurw==`; `dist/index.js` SHA-256 `8A4D2E89A6058B5FFA7CAA567BD185BE2087A57D23DDF1E609884C9A25FD38FD` |

The MCP server is installed outside the package and is not a runtime dependency:

```bash
npm install --prefix bench/external --no-save --no-package-lock \
  @modelcontextprotocol/server-memory@2.0.0
```

`bench/external/` is gitignored. The runner checks the server version and records the `dist/index.js` hash. MiniSearch is installed by `npm ci` from the committed lockfile.

## Dataset pins

The external runs use the same files and hashes as [`docs/PUBLIC_BENCHMARKS.md`](PUBLIC_BENCHMARKS.md):

| Dataset | File | Revision | SHA-256 |
|---|---|---|---|
| LongMemEval `longmemeval_s` | `longmemeval_s.json` | `2ec2a557f339b6c0369619b1ed5793734cc87533` | `08D8DAD4BE43EE2049A22FF5674EB86725D0CE5FF434CDE2627E5E8E7E117894` |
| LoCoMo `locomo10` | `locomo10.json` | `3eb6f2c585f5e1699204e3c3bdf7adc5c28cb376` | `79FA87E90F04081343B8C8DEBECB80A9A6842B76A7AA537DC9FDF651EA698FF4` |

## Adapter rules

### MiniSearch

- One index per project; no cross-project index.
- Fields: `title` and `content`; title boost `2`.
- Prefix matching on, fuzzy matching off, `OR` combination.
- The engine returns every match, so the runner slices the ranked list to the top 10.
- No memory extraction, consolidation, graph scoring, or agent workflow.

### MCP reference memory server

- One fresh server process and one JSONL memory file per project.
- One entity per memory unit; observations are `title`, `content`, and `validFrom`.
- Query adapter: lowercase content tokens, length at least 3, stopwords removed, unique, capped at 8.
- One `search_nodes` call per token; an entity scores by the number of distinct query tokens it matches, then by first-seen order; top 10.
- The server's search is substring-based and has no relevance score. The coverage ranking is benchmark adapter code, not a server feature.
- No LLM extraction, relation inference, consolidation, or agent workflow.

Both adapters collapse duplicate memory ids with last-occurrence-wins to match the internal harness's `INSERT OR REPLACE` behavior. LongMemEval has 23,882 session rows and 23,869 unique ids.

## Results

The internal row is the default BM25-only configuration. Full-engine and per-category public results are in [`docs/PUBLIC_BENCHMARKS.md`](PUBLIC_BENCHMARKS.md).

### LongMemEval `longmemeval_s`

| Engine | Cases | Hit@1 | Hit@5 | Hit@10 | MRR | Evidence recall@5 | Full recall@5 | Tokens | p50 | p95 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| FastrMemory BM25-only | 500 | 87.8% | 97.6% | 99.0% | 0.920 | 0.926 | 86.0% | 31,459 | 70.86 ms | 82.68 ms |
| MiniSearch 7.2.0 | 500 | 61.8% | 87.2% | 94.0% | 0.727 | 0.765 | 65.8% | 36,816 | 1.85 ms | 4.41 ms |
| MCP memory 2.0.0 | 500 | 67.2% | 86.6% | 92.4% | 0.752 | 0.772 | 67.4% | 33,031 | 38.42 ms | 58.02 ms |

FastrMemory is **+10.4pp Hit@5** over MiniSearch and **+11.0pp** over the MCP server. The roadmap's `+5pp` target is met on LongMemEval against both external baselines.

### LoCoMo `locomo10`

| Engine | Cases | Hit@1 | Hit@5 | Hit@10 | MRR | Evidence recall@5 | Full recall@5 | Tokens | p50 | p95 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| FastrMemory BM25-only | 1,981 | 33.0% | 56.0% | 64.9% | 0.428 | 0.510 | 46.9% | 579 | 3.11 ms | 5.59 ms |
| MiniSearch 7.2.0 | 1,981 | 31.1% | 51.6% | 59.9% | 0.399 | 0.472 | 44.0% | 549 | 0.67 ms | 1.98 ms |
| MCP memory 2.0.0 | 1,981 | 33.1% | 53.7% | 62.0% | 0.419 | 0.491 | 45.7% | 479 | 9.83 ms | 16.67 ms |

FastrMemory is **+4.4pp Hit@5** over MiniSearch and **+2.3pp** over the MCP server. The `+5pp` target is **not met on LoCoMo**. FastrMemory's Hit@1 is 0.1pp below the MCP adapter on this set (33.0% vs 33.1%), and its MRR lead is small (+0.009). Do not describe the result as uniform retrieval superiority.

## What the numbers mean

- LongMemEval is session-level retrieval over long sessions. FastrMemory's lead is large and consistent across Hit@1, Hit@5, and MRR.
- LoCoMo is turn-level retrieval over short, lexically sparse dialogue turns. The external engines are close, and the `+5pp` gate misses. This is the weakest public result and the main reason Phase 2 remains Partial.
- The MCP server is a literal external memory engine, but its search is a substring scan, not a scored retrieval model. The keyword-coverage adapter is necessary to obtain a usable ranking; the adapter is part of the benchmark, not the server.
- MiniSearch is a generic search engine, not a memory manager. It has no extraction, consolidation, graph, temporal, or feedback behavior. The comparison isolates lexical ranking quality, not the full product category.
- Latency excludes index build and, for the MCP engine, server startup. The MCP per-project process model would add substantial startup cost in a real session. These numbers are not end-to-end agent latency.
- Token counts estimate retrieved content at four characters per token. They are not tokenizer-exact and are not formatted-context counts.
- The internal engine is measured inside the FastrMemory harness with SQLite and graph/BM25 machinery; the external engines are in-process or per-project indexes. Treat latency as a directional retrieval-cost comparison, not a system benchmark.

## Gate status

| Target | Result | Status |
|---|---|---|
| One pinned external memory engine runs and records raw output and caveats | MCP memory server 2.0.0, 500 LongMemEval + 1,981 LoCoMo cases | **Done** |
| `+5pp Hit@5` over the external baseline | LongMemEval `+10.4pp` / `+11.0pp`; LoCoMo `+4.4pp` / `+2.3pp` | **Partial** |

Phase 2.2 is Done. The Phase 2 retrieval-superiority gate remains **Partial** because the LoCoMo target is missed and the frozen-holdout rerun (2.3) is still Partial.

## Reproduce

```bash
npm ci

# MiniSearch baselines
npx tsx scripts/eval-external.ts longmemeval --engine minisearch --out bench/results/external-minisearch-longmemeval.json
npx tsx scripts/eval-external.ts locomo --engine minisearch --out bench/results/external-minisearch-locomo.json

# MCP reference memory server baseline
npm install --prefix bench/external --no-save --no-package-lock \
  @modelcontextprotocol/server-memory@2.0.0
npx tsx scripts/eval-external.ts longmemeval --engine mcp-memory --out bench/results/external-mcp-longmemeval.json
npx tsx scripts/eval-external.ts locomo --engine mcp-memory --out bench/results/external-mcp-locomo.json
```

Reruns are reproducibility checks. Do not tune retrieval weights, adapter tokens, or top-k on these public sets.

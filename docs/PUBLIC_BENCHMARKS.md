# Public Retrieval Benchmarks

**Run date:** 2026-10-21
**Code commit:** `d708e3a` (internal harness), retrieval defaults unchanged
**External baseline commit:** `b220067` (pinned external harness)
**Raw JSON:** [`bench/results/longmemeval.json`](../bench/results/longmemeval.json), [`bench/results/locomo.json`](../bench/results/locomo.json), [`bench/results/repo-history.json`](../bench/results/repo-history.json), [`bench/results/external-minisearch-longmemeval.json`](../bench/results/external-minisearch-longmemeval.json), [`bench/results/external-mcp-longmemeval.json`](../bench/results/external-mcp-longmemeval.json), [`bench/results/external-minisearch-locomo.json`](../bench/results/external-minisearch-locomo.json), [`bench/results/external-mcp-locomo.json`](../bench/results/external-mcp-locomo.json)
**Command:** `npx tsx scripts/eval-public.ts <dataset> --embeddings hash`; external baselines use `npx tsx scripts/eval-external.ts <dataset> --engine <minisearch|mcp-memory>`

These harnesses measure **ranked retrieval only**. They do not generate answers, judge answer correctness, or reproduce the official QA scores of either dataset. Do not compare the numbers below with published LongMemEval or LoCoMo QA leaderboards.

## What is measured

| Dataset | Unit indexed | Query | Gold | Cases |
|---|---|---|---|---:|
| LongMemEval `longmemeval_s` | One haystack session per memory, one project per question | Question text | `answer_session_ids` | 500 |
| LoCoMo `locomo10` | One dialogue turn per memory, one project per conversation | Question text | `evidence` dialogue ids | 1,981 |
| Real repository | One text file at the pinned revision | Commit subject | Files changed by that commit | 114 |

Metrics are computed at the top 10:

- **Hit@k** — at least one gold id appears in the top `k`.
- **MRR** — mean reciprocal rank of the first gold id, capped at 10.
- **Evidence recall@5** — share of gold ids found in the top 5.
- **Full recall@5** — share of cases where every gold id is in the top 5.

The search budget is set to 1,000,000 tokens so the top 10 are never truncated. The reported token count is the packed context cost of those 10 results, not a tuned budget.

## Dataset pins

The runner verifies the SHA-256 before a run and writes the revision, hash, file size, and case counts into the raw JSON. Datasets are not committed; `bench/data/` is gitignored. Check the upstream licenses before redistributing any dataset file.

| Dataset | Revision | File | SHA-256 |
|---|---|---|---|
| LongMemEval (cleaned) | `98d7416c24c778c2fee6e6f3006e7a073259d48f` | `longmemeval_s_cleaned.json` (277,383,467 bytes) | `D6F21EA9D60A0D56F34A05B609C79C88A451D2AE03597821EA3D5A9678C3A442` |
| LongMemEval (deprecated file, pre-cleaned) | `2ec2a557f339b6c0369619b1ed5793734cc87533` | `longmemeval_s` (278,025,796 bytes) | `08D8DAD4BE43EE2049A22FF5674EB86725D0CE5FF434CDE2627E5E8E7E117894` |
| LoCoMo | `3eb6f2c585f5e1699204e3c3bdf7adc5c28cb376` | `data/locomo10.json` (2,805,274 bytes) | `79FA87E90F04081343B8C8DEBECB80A9A6842B76A7AA537DC9FDF651EA698FF4` |
| FastrMemory repository | `d708e3aad437c82168ef37b4039bd87ef1731c59` | tracked text files at that commit | n/a |

Download commands:

```bash
mkdir -p bench/data
curl -L --fail https://huggingface.co/datasets/xiaowu0162/longmemeval-cleaned/resolve/98d7416c24c778c2fee6e6f3006e7a073259d48f/longmemeval_s_cleaned.json -o bench/data/longmemeval_s_cleaned.json
curl -L --fail https://raw.githubusercontent.com/snap-research/locomo/3eb6f2c585f5e1699204e3c3bdf7adc5c28cb376/data/locomo10.json -o bench/data/locomo10.json
```

The 500-case LongMemEval tables below were measured on the deprecated pre-cleaned file with the hash engine explicitly enabled. New runs use the cleaned file; the pinned runner rejects a file whose SHA-256 does not match.

## Results

### LongMemEval

| Engine | Cases | Hit@1 | Hit@5 | Hit@10 | MRR | Evidence recall@5 | Full recall@5 | Tokens | p50 | p95 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| BM25-only | 500 | 87.8% | 97.6% | 99.0% | 0.920 | 0.926 | 86.0% | 31,459 | 70.86 ms | 82.68 ms |
| Full + hash vectors | 500 | 83.6% | 97.6% | 99.0% | 0.893 | 0.925 | 86.0% | 31,483 | 71.81 ms | 83.90 ms |

| Question type | Cases | Hit@1 | Hit@5 | MRR |
|---|---:|---:|---:|---:|
| knowledge-update | 78 | 93.6% | 100% | 0.966 |
| multi-session | 133 | 91.0% | 98.5% | 0.942 |
| single-session-assistant | 56 | 100% | 100% | 1.000 |
| single-session-preference | 30 | 56.7% | 83.3% | 0.700 |
| single-session-user | 70 | 87.1% | 100% | 0.920 |
| temporal-reasoning | 133 | 83.5% | 96.2% | 0.887 |

The 500 questions index 23,882 sessions. No question was skipped and no gold session id was missing.

#### Cleaned file, 120-case slice (2026-10-24)

The cleaned file changes the case set, so the numbers above are not directly comparable. This slice takes the first 20 cases of each `question_type` in dataset order: 66 single-gold, 31 two-gold, 13 three-gold, 8 four-gold, 1 five-gold, and 1 six-gold case. Splits are assigned by a stable SHA-256 of the question id before any tuning: the first 60 sorted hashes are `dev`, the rest are `test`.

| Engine | Cases | Hit@1 | Hit@5 | Hit@10 | MRR | Evidence recall@5 | Full recall@5 | Tokens | p50 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| BM25-only | 120 | 89.2% | 96.7% | 99.2% | 0.923 | 0.935 | 89.2% | 31,427 | 17.75 ms |
| Default config (pre-P3) | 120 | 89.2% | 96.7% | 99.2% | 0.923 | 0.935 | 89.2% | 31,427 | 18.11 ms |
| Default config (current) | 120 | 90.0% | 96.7% | 99.2% | 0.931 | 0.940 | 90.0% | 43,876 | 22.03 ms |
| Full + hash vectors (opt-in) | 120 | 81.7% | 96.7% | 99.2% | 0.874 | 0.932 | 89.2% | 31,453 | 18.38 ms |

`dev` only (n = 60, the split used for tuning): BM25-only 91.7% Hit@1, default config 91.7%, full hash 81.7%. The `test` split was not used for any decision in this change.

The feature-hash vectorizer is opt-in (`FASTR_VECTOR_MODE=hash`). On this slice the hash stream degrades 11 cases, improves none, and leaves 109 unchanged. `bench/fixtures/hash-regression.json` pins 20 of those cases (10 degraded, 10 unchanged) so a regression test fails if hash vectors become the default again.

The default configuration is no longer byte-identical to BM25-only: it also runs the aggregate-coverage pass described below. On the 120-case slice that moves Hit@1 from 89.2% to 90.0%, strict@5 from 89.2% to 90.0%, and strict@10 from 95.8% to 97.5%, and raises the average packed context from 31,427 to 43,876 tokens because counting questions return up to 20 rows instead of 10.

#### Aggregate coverage and temporal windows (P3/P4, 2026-10-26)

Counting questions ("how many projects have I led?") are not topical queries. FTS5 ORs every
term, so scaffolding words that are frequent across the whole corpus (`how`, `many`, `times`,
`past`, `two`, `weeks`) outvote the one content word that identifies the activity being counted.
Two changes address this:

1. **Aggregate coverage** (on by default). When the query matches a counting or enumeration
   pattern, a second lexical pass runs over the content terms only and is fused with the
   original pass using the same reciprocal-rank rule the streams use. A document found by both
   passes outranks a document found by only one, so the original query keeps its precision
   while the deeper rows become reachable. Aggregate questions return up to 20 rows
   (`retrieval.aggregateLimit`), which is what a caller needs in order to count.
2. **Temporal windows** (opt-in, `retrieval.temporalFilter`). Relative and absolute date ranges
   are parsed into an absolute interval using the dataset's `question_date`, then applied as a
   filter on `valid_from` before ranking. When the window excludes every candidate, retrieval
   falls back to the unfiltered set and reports `temporalFallback: true`.

Both are measured with `npx tsx scripts/gate-aggregate-temporal.ts --split <dev|test>`, which
writes `bench/results/gate-aggregate-temporal-<split>.json` with per-case rows, Wilson intervals,
paired bootstrap deltas, and exact McNemar p-values.

Dev split (tuning), n=60:

| Engine | Hit@1 | strict@5 | strict@10 | 4-gold strict@10 | Temporal strict@5 | Preference strict@5 |
|---|---:|---:|---:|---:|---:|---:|
| BM25 only | 91.7% (55/60) | 90.0% (54/60) | 98.3% (59/60) | 66.7% (2/3) | 90.9% (10/11) | 66.7% (4/6) |
| + aggregate | 91.7% (55/60) | 91.7% (55/60) | 98.3% (59/60) | 66.7% (2/3) | 90.9% (10/11) | 66.7% (4/6) |
| + temporal | 91.7% (55/60) | 90.0% (54/60) | 98.3% (59/60) | 66.7% (2/3) | 90.9% (10/11) | 66.7% (4/6) |

Held-out test split (reported once), n=60:

| Engine | Hit@1 | strict@5 | strict@10 | 4-gold strict@10 | Temporal strict@5 | Preference strict@5 |
|---|---:|---:|---:|---:|---:|---:|
| BM25 only | 85.0% (51/60) | 88.3% (53/60) | 93.3% (56/60) | 40.0% (2/5) | 77.8% (7/9) | 85.7% (12/14) |
| + aggregate | 88.3% (53/60) | 88.3% (53/60) | 96.7% (58/60) | 80.0% (4/5) | 77.8% (7/9) | 85.7% (12/14) |
| + temporal | 85.0% (51/60) | 88.3% (53/60) | 93.3% (56/60) | 40.0% (2/5) | 77.8% (7/9) | 85.7% (12/14) |

Aggregate coverage against BM25-only, paired per case:

| Split | Hit@1 | strict@5 | strict@10 | 4-gold strict@10 |
|---|---|---|---|---|
| dev (n=60) | +0.0 pp (0 fixed / 0 broken) | +1.7 pp (1 fixed / 0 broken) | +0.0 pp (0 / 0) | +0.0 pp (0 / 0) |
| test (n=60) | +3.3 pp (2 fixed / 0 broken) | +0.0 pp (0 / 0) | +3.3 pp (2 fixed / 0 broken) | +40.0 pp (2 fixed / 0 broken) |

**The aggregate delta is inside its confidence interval.** Combined over all 120 cases it fixes
4 cases and breaks none (Hit@1 106/120 → 108/120, strict@10 115/120 → 117/120). With zero
broken cases the exact McNemar p-value is 0.5 on two discordant pairs and 1.0 on one, so this is
reported as a **non-regressive mechanism with a measured direction**, not as a demonstrated win.
What it does establish is the aggregate slice itself: 4-gold strict@10 rises from 50.0% (4/8)
to 75.0% (6/8), which clears the 60% target on that reading.

Two sub-targets on the same slice are **not** met and are published as misses:

- **4-gold strict@5 stays at 25.0% (2/8).** Getting all four gold sessions into the top five
  needs a ranking change, not a candidate change; the aggregate pass moves two cases from
  outside the top ten to inside it, and none from outside the top five to inside it.
- **Temporal strict@5 stays at 85.0% (17/20).** This one is structural on this dataset. Every
  LongMemEval-s haystack is clustered within roughly ten days of the question date, so "past two
  weeks", "past few months", and "since the start of the year" all cover 100% of the corpus.
  Measured ranges: `gpt4_15e38248` spans 2023-05-20 to 2023-05-29 for a 2023-05-30 question,
  `88432d0a` spans 2023-05-20 to 2023-05-30, `gpt4_d84a3211` spans a single day. The filter is
  correct and its unit tests pin the boundaries, but on this dataset it removes nothing, so it
  cannot move the metric. It stays opt-in rather than default-on for that reason.
- **Preference strict@5 stays at 80.0% (16/20)** and **Hit@5 stays at 96.7% (116/120)**; neither
  change targets those cells.

One 4-gold case is a genuine semantic gap rather than a lexical one: `gpt4_15e38248` asks about
"pieces of furniture I bought, assembled, sold, or fixed", and its fourth gold session describes
a mattress, a coffee table, and throw pillows without using the word "furniture" or any of those
verbs. No term-level method reaches it; that is the case for the optional semantic tier, which
fixes one case and breaks one across the same 120 cases (see above).

Disclosure: the mechanism was identified by inspecting all 120 cases, so the dev split was not
the only source of insight. No parameter was chosen from a test-split outcome; `aggregateLimit`
(20) and the scaffolding word list were fixed before the test split was run. The test split was
run twice: once for the first gate, and once after unit tests found two date-parsing defects
(a month subtraction that rolled 2023-05-30 minus three months to 2023-03-02 instead of
2023-02-28, and an unparsed "since the start of the year"). Both runs produced identical
retrieval metrics.

### LoCoMo

| Engine | Cases | Hit@1 | Hit@5 | Hit@10 | MRR | Evidence recall@5 | Full recall@5 | Tokens | p50 | p95 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| BM25-only | 1,981 | 33.0% | 56.0% | 64.9% | 0.428 | 0.510 | 46.9% | 579 | 3.11 ms | 5.59 ms |
| Full + hash vectors | 1,981 | 32.7% | 55.8% | 64.8% | 0.425 | 0.508 | 46.7% | 580 | 6.77 ms | 10.73 ms |

| Raw category | Cases | Hit@1 | Hit@5 | MRR |
|---|---:|---:|---:|---:|
| category_1 | 282 | 20.2% | 49.3% | 0.325 |
| category_2 | 320 | 45.6% | 64.1% | 0.540 |
| category_3 | 92 | 18.5% | 37.0% | 0.258 |
| category_4 | 841 | 38.6% | 62.0% | 0.485 |
| category_5 | 446 | 24.4% | 47.1% | 0.339 |

Five questions were skipped because no evidence id matched an indexed turn; among the remaining cases, four evidence ids were absent from the indexed turns. The numeric categories are the dataset's own labels, not renamed by this harness.

### Real repository

The query is the commit subject and the gold set is the files changed by that commit. Files are indexed at the pinned revision, so a commit that changed a file which no longer exists at that revision contributes only its remaining files. This is a self-repository run, not an external project.

| Engine | Cases | Hit@1 | Hit@5 | Hit@10 | MRR | Evidence recall@5 | Full recall@5 | Tokens | p50 | p95 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| BM25-only | 114 | 54.4% | 86.0% | 91.2% | 0.676 | 0.519 | 32.5% | 37,036 | 2.12 ms | 3.05 ms |
| Full + hash vectors | 114 | 52.6% | 86.0% | 91.2% | 0.668 | 0.515 | 32.5% | 36,535 | 4.61 ms | 7.08 ms |

The revision contains 291 tracked files, 280 of which are indexed text files under the extension and size limits. The 114 cases come from 115 commits; 168 changed files were outside the index and are counted as missing gold, not silently dropped.

### Pinned external baselines

Two pinned external engines were run on LongMemEval and LoCoMo: **MiniSearch `7.2.0`**, a generic full-text engine, and the **official MCP reference memory server `2.0.0`**, driven over stdio. The internal row is the default BM25-only configuration.

| Dataset | Engine | Cases | Hit@1 | Hit@5 | Hit@10 | MRR | Tokens | p50 | p95 |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| LongMemEval | FastrMemory BM25-only | 500 | 87.8% | 97.6% | 99.0% | 0.920 | 31,459 | 70.86 ms | 82.68 ms |
| LongMemEval | MiniSearch 7.2.0 | 500 | 61.8% | 87.2% | 94.0% | 0.727 | 36,816 | 1.85 ms | 4.41 ms |
| LongMemEval | MCP memory 2.0.0 | 500 | 67.2% | 86.6% | 92.4% | 0.752 | 33,031 | 38.42 ms | 58.02 ms |
| LoCoMo | FastrMemory BM25-only | 1,981 | 33.0% | 56.0% | 64.9% | 0.428 | 579 | 3.11 ms | 5.59 ms |
| LoCoMo | MiniSearch 7.2.0 | 1,981 | 31.1% | 51.6% | 59.9% | 0.399 | 549 | 0.67 ms | 1.98 ms |
| LoCoMo | MCP memory 2.0.0 | 1,981 | 33.1% | 53.7% | 62.0% | 0.419 | 479 | 9.83 ms | 16.67 ms |

FastrMemory clears the `+5pp Hit@5` target on LongMemEval (`+10.4pp` vs MiniSearch, `+11.0pp` vs MCP) but **misses it on LoCoMo** (`+4.4pp` vs MiniSearch, `+2.3pp` vs MCP). On LoCoMo, FastrMemory Hit@1 is 0.1pp below the MCP adapter. The external comparison is not uniform superiority.

The MCP adapter is keyword-coverage ranking over the server's substring search, not a native relevance score. Full adapter rules, pins, install commands, and caveats are in [`docs/EXTERNAL_BASELINE.md`](EXTERNAL_BASELINE.md). The self-repository runner was not repeated against an external engine.

## Static semantic tier (P1 gate)

The optional semantic tier is a pure-TypeScript model2vec lookup table: `minishlab/potion-base-8M`
at revision `bf8b056651a2c21b8d2565580b8569da283cab23`, 256 dimensions, `model.safetensors`
30,236,760 bytes (SHA-256 `f65d0f32...223de2`). It adds no runtime dependency and no native binary;
`fastr model install` downloads it explicitly, verifies the hash, and `fastr model remove` deletes it.

Two correctness gates run before any quality number is trusted:

| Gate | Result |
|---|---|
| Tokenizer vs HuggingFace `tokenizers` (20 edge cases: casing, accents, CJK, emoji, tabs/newlines, over-long words) | 20/20 exact token-id match |
| Mean-pooled embedding vs NumPy reference (20 cases, 256 dims) | max abs diff `2.98e-8`, min cosine `1.0` |

Retrieval uses the tier as a **bounded reranker**: cosine similarity is blended into the BM25
score with a coefficient that caps the bonus at 15% of a rank-1 BM25 hit, and only BM25 candidates
are scored. The first implementation fused the static stream through free RRF at the semantic
weight (3.0) and lost **10.0 pp** Hit@1 on dev (91.7% → 81.7%, n=60). That is a fusion bug, not a
model result: a reranker must not outvote the first stage.

Dev split (tuning), n=60, Wilson 95% CI:

| Engine | Hit@1 | 95% CI | Hit@5 | MRR | Fixed / broken | Backfill |
|---|---:|---|---:|---:|---|---:|
| BM25 only | 91.7% | 81.9–96.4 | 96.7% | 0.939 | — | — |
| + potion, title only, blend 0.15 | 91.7% | 81.9–96.4 | 96.7% | 0.939 | 0 / 0 | 0.07 ms/doc |
| + potion, title+content, blend 0.10 | 91.7% | 81.9–96.4 | 96.7% | 0.939 | 0 / 0 | 2.12 ms/doc |
| + potion, title+content, blend 0.15 | 93.3% | 84.1–97.4 | 96.7% | 0.948 | 1 / 0 | 2.12 ms/doc |
| + potion, title+content, blend 0.30 | 91.7% | 81.9–96.4 | 95.0% | 0.939 | 1 / 1 | 2.12 ms/doc |
| + potion, title+content, blend 0.60 | 90.0% | 79.9–95.3 | 96.7% | 0.929 | 1 / 2 | 2.12 ms/doc |
| + potion, title+content, blend 1.00 | 86.7% | 75.8–93.1 | 96.7% | 0.912 | 1 / 4 | 2.12 ms/doc |

Held-out test split (reported once, never used to choose the blend), n=60:

| Engine | Hit@1 | 95% CI | Hit@5 | MRR | Fixed / broken |
|---|---:|---|---:|---:|---|
| BM25 only | 85.0% | 73.9–91.9 | 96.7% | 0.901 | — |
| + potion, title+content, blend 0.15 | 85.0% | 73.9–91.9 | 96.7% | 0.901 | 0 / 0 |

**Negative result.** Across both halves the tier fixes 1 case and breaks 1 (107/120 vs 106/120,
+0.8 pp). With one discordant pair in each direction, an exact McNemar test gives p = 1.00: there is
no detectable difference. The static model does **not** deliver a measurable accuracy win on this
slice, and it is not claimed as one. What it does deliver is a non-regressive semantic option: the
bounded blend removes the 10 pp regression the free-RRF fusion caused, and the tier stays inert
unless the asset is installed and the vector mode resolves to `semantic`. Backfill is deferred
(2.0 ms/doc, background only), so ingestion cost is unchanged.

Reproduce (needs the pinned 277 MB dataset and the 30 MB model):

```bash
python scripts/potion-golden.py bench/external/potion-base-8M
npx tsx scripts/gate-static-model.ts --split dev
npx tsx scripts/gate-static-model.ts --split test
```

## Environment

- CPU: AMD Ryzen 7 7700, 8 cores / 16 threads
- RAM: 15.1 GB
- OS: Windows 10 Pro 10.0.19045 (x64)
- Node.js: v24.15.0
- SQLite: Node built-in `node:sqlite`, in-memory database
- Embeddings: deterministic feature-hash vectors; MiniLM was not loaded for these runs

## Caveats

1. **Retrieval only.** No answer is generated. LongMemEval and LoCoMo publish QA metrics that require an answer model and judge; these numbers are not those metrics.
2. **Hash vectors duplicate BM25.** The full engine does not beat BM25-only on these sets, and it lowers LongMemEval Hit@1 from 87.8% to 83.6%. The raw JSON keeps both engines so the gap is visible.
3. **LongMemEval session granularity.** A hit means the right session was retrieved, not that the right sentence was ranked first. Single-session-preference questions are the weakest type at 56.7% Hit@1.
4. **LoCoMo turn granularity.** Turns are short and lexically sparse, so absolute scores are lower than session-level retrieval. The official LoCoMo protocol also includes answer generation and adversarial handling.
5. **Self-repository bias.** The repository runner is demonstrated on FastrMemory's own history. It has not been run on an external project.
6. **No tuning on these sets.** The public harness uses the existing default retrieval configurations. No weight, threshold, or budget was changed after seeing these results, and the frozen 48-case synthetic holdout was not reused or tuned.
7. **Provenance.** Internal raw JSON records the code commit `d708e3a`; external raw JSON records `b220067`. Both record dataset revisions, hashes, hardware, and per-case retrieved and gold ids. A rerun on the same commits and files should reproduce the tables.
8. **External latency is retrieval-only.** It excludes index build and MCP server startup. The MCP engine uses one fresh process per project, so its real session startup cost is not represented.

## Reproduction

```bash
# Datasets must exist in bench/data; hashes are checked by the runner.
npx tsx scripts/eval-public.ts longmemeval --out bench/results/longmemeval.json
npx tsx scripts/eval-public.ts locomo --out bench/results/locomo.json
npx tsx scripts/eval-public.ts repo --revision HEAD --max-cases 200 --out bench/results/repo-history.json

# Parser and harness tests
npx vitest run tests/public-bench.test.ts
```

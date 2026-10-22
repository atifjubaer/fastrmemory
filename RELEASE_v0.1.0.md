# FastrMemory v0.1.0 — Historical Release Notes

> **Status: historical (released 2026-10-19; superseded by v0.2.1 and v0.3.0).** These notes describe the v0.1.0 tarball, not the current commit. Several claims below were marketing copy and have not been independently verified. Current numbers and evidence live in [`CLAIMS.md`](CLAIMS.md) and [`BENCHMARKS.md`](BENCHMARKS.md).
>
> **Current state (2026-10-23):** the canonical npm release is `fastrmemory@0.3.0`; the latest GitHub release asset remains `v0.2.1`, and the old scoped `@atifjubaer/fastrmemory@0.2.1` npm entry was removed on 2026-10-23. The `0.3.0` release registers **41 tools, 2 prompts, and 5 resources**, ships **10 Agent Skills**, and has **276 tests across 51 files**. Verify current counts with `npm run check:docs`.

**High-Performance Cognitive Agent Memory • Zero Daemon • Native Node 22/24 `node:sqlite` WAL • Bi-Temporal Git Sync • Triple-Stream RRF • Official MCP v2**

---

## What shipped in v0.1.0

1. **Zero daemon**: native Node `node:sqlite` in WAL mode, no background service and no open network ports for the default CLI/MCP path.
2. **Bi-temporal storage**: `valid_from` / `valid_to` timestamps plus Markdown mirrors in `.fastr/pages/*.md`; supersession keeps history instead of deleting it.
3. **Hybrid retrieval**: SQLite FTS5 BM25 + optional local embeddings + a file/entity graph fused with reciprocal rank fusion (k=60 in the v0.1.0 design; the current default is k=20). Error traps receive a conditional 2.0× multiplier for trap-intent or file-scoped queries.
4. **Local dashboard** (`fastrmemory ui`) and **39 MCP tools** (the v0.1.0 release shipped fewer tools; the 39-tool catalog was current `main` when v0.2.0 was prepared; the published `0.3.0` release has 41).
5. **MCP + CLI integration** for Claude Code (MCP config plus lifecycle hooks) and Cursor (MCP config plus skills) via native installers; other clients connect over MCP or HTTP.

---

## Corrections to the original v0.1.0 notes

- Removed the claim that FastrMemory was the "world's first" agent memory architecture; no evidence supports a first-ever claim.
- The original notes reported **56/56 tests**. That number was accurate only for the v0.1.0 snapshot and is not re-verified here. The current suite count is reported in [`CLAIMS.md`](CLAIMS.md).
- Earlier release notes included unverified external-engine comparisons. They have been removed.
- Earlier release notes also included unverified platform claims about external engines. They have been removed.
- The original benchmark table was generated from 12 synthetic cases with simulated baselines. It is superseded by [`docs/benchmark-report.md`](docs/benchmark-report.md) and the raw 240-case results in [`bench/results/minilm.json`](bench/results/minilm.json) and [`bench/results/hash.json`](bench/results/hash.json).

---

## Install the historical tarball

```bash
npm install -g ./atifjubaer-fastrmemory-0.1.0.tgz
```

The historical tarball is kept in the local repository root for archival reproducibility; it is **not** committed to Git and is **not** the recommended install path. Use the canonical `fastrmemory@0.3.0` npm package or the historical v0.2.1 GitHub Release asset; the README documents both.

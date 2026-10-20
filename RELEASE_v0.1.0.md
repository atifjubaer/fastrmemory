# FastrMemory v0.1.0 — Historical Release Notes

> **Status: historical (released 2026-10-19, superseded by the current `main` branch).** These notes describe the v0.1.0 tarball, not the current commit. Several claims below were marketing copy and have not been independently verified. Current numbers and evidence live in [`CLAIMS.md`](CLAIMS.md) and [`BENCHMARKS.md`](BENCHMARKS.md).

**High-Performance Cognitive Agent Memory • Zero Daemon • Native Node 22/24 `node:sqlite` WAL • Bi-Temporal Git Sync • Triple-Stream RRF • Official MCP v2**

---

## What shipped in v0.1.0

1. **Zero daemon**: native Node `node:sqlite` in WAL mode, no background service and no open network ports for the default CLI/MCP path.
2. **Bi-temporal storage**: `valid_from` / `valid_to` timestamps plus Markdown mirrors in `.fastr/pages/*.md`; supersession keeps history instead of deleting it.
3. **Hybrid retrieval**: SQLite FTS5 BM25 + optional local embeddings + a file/entity graph fused with reciprocal rank fusion (k=60). Error traps receive a 2.0× multiplier.
4. **Local dashboard** (`fastrmemory ui`) and **39 MCP tools** (the v0.1.0 release shipped fewer tools; the 39-tool catalog is the current `main` branch).
5. **MCP + CLI integration** for Claude Code and Cursor via native config/hook installers; other clients connect over MCP or HTTP.

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

The tarball is tracked in the repository root for archival reproducibility. It is **not** the recommended install path; use the GitHub install in the README until an npm release exists.

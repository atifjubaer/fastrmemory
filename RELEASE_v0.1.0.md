# ⚡ FastrMemory v0.1.0: Sovereign Cognitive Agent Memory Engine

**High-Performance Cognitive Agent Memory • Zero Daemon • Native Node 24 `node:sqlite` WAL • Bi-Temporal Git Sync • Triple-Stream RRF • Official MCP v2**

---

## 🌟 What's New in v0.1.0

FastrMemory is the world's first agent memory architecture designed from scratch to eliminate the fatal flaws of existing systems:
1. **Zero Daemon Overhead**: Powered purely by native Node 22/24 `node:sqlite` in WAL mode. Sub-millisecond retrieval with **0 background daemons**, **0 open network ports**, and 100% native execution across Windows, macOS, and Linux.
2. **Bi-Temporal Git Sync**: Replaces lossy sleep summarization (which deletes raw memories in Hippo) with non-destructive bi-temporal timestamps (`valid_from` / `valid_to`) and auto-mirrors readable `.fastr/pages/*.md` files directly into Git for human PR review.
3. **Triple-Stream RRF ($k=60$)**: Fuses SQLite FTS5 BM25 token search + 384-dimensional local vector cosine + 2-hop causal file graph links. Error traps receive an automatic **2.0x recall boost**.
4. **React 19 High-DPI Dashboard (`fastrmemory ui`)**: Includes real-time Server-Sent Events (SSE), Bruls squarified memory strength treemap, interactive Action DAG force graph (with 0% idle CPU physics), live RRF search trace waterfall, and lightweight Markdown rendering.
5. **Universal 25+ Agent Compatibility**: Auto-detects and connects Claude Code, Cursor, Windsurf, Devin, Antigravity, and any client speaking MCP or stdio.

---

## 📊 Planetary Benchmark Verification

| Metric | FastrMemory (`@atifjubaer`) | Hippo Memory | AgentMemory |
| :--- | :--- | :--- | :--- |
| **Daemon Overhead** | **0 open ports / 0 daemons** | 0 ports / 0 daemons | 4 open ports (`3111`-`3113`, `49134`) |
| **Windows Support** | **100% Native OS** | Native Node | Fails without WSL2/Docker |
| **Retrieval Power** | **Triple-Stream RRF + Graph** | BM25 only | BM25 + Vector + Graph RRF |
| **Error Trap Protection** | **2.0x boost + per-ID attribution** | -0.5 batch penalty | None (passive telemetry only) |
| **Git Reviewability** | **Two-Zone Diffable Markdown** | Raw markdown dumps | Web dashboard only |
| **Test Suite Coverage** | **56 / 56 tests passed (833ms)** | Unit tests | Rust test suite |

---

## 🚀 Quick Start (Zero-Install Execution)

```bash
# 1. Interactive Auto-Setup (Claude Code + Cursor + Windsurf):
npx github:atifjubaer/fastrmemory setup

# 2. Launch Local Web Dashboard:
npx github:atifjubaer/fastrmemory ui

# 3. Search Memories from Terminal:
npx github:atifjubaer/fastrmemory recall "sqlite WAL mode"

# 4. Check Active 2.0x Error Traps:
npx github:atifjubaer/fastrmemory trap list
```

---

## 📦 Assets Included
- `atifjubaer-fastrmemory-0.1.0.tgz` (204.4 kB, completely pre-compiled with both `dist/` and `dist-ui/`).
- Ready to install offline via: `npm install -g ./atifjubaer-fastrmemory-0.1.0.tgz`

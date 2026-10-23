# Contributing to FastrMemory

Thank you for your interest in contributing to **FastrMemory**!

FastrMemory is an open-source, high-performance cognitive agent memory engine built on Node 22+ native SQLite, Bi-Temporal Git mirroring, and the official Model Context Protocol (MCP) v2.

---

## 📜 Ground Rules

- **License**: All contributions are licensed under the [Apache-2.0 License](./LICENSE).
- **Developer Certificate of Origin (DCO)**: Please sign off on your commits with `git commit -s`.
- **Code Quality**: Strict TypeScript (`tsc --noEmit`), zero external daemon dependencies, and 100% test passing (`npm test`).
- **Clean Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`).

---

## 🛠️ Local Development Setup

### Prerequisites
- **Node.js**: `>= 22.16.0` (required for native `node:sqlite` `DatabaseSync`).
- **Git**
- **Operating System**: Windows, macOS, or Linux.

### Steps

1. **Fork & Clone**:
   ```bash
   git clone https://github.com/<your-username>/fastrmemory.git
   cd fastrmemory
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build TypeScript**:
   ```bash
   npm run build
   ```

4. **Run Test Suite**:
   ```bash
   npm test
   ```
   All tests in `tests/` run against real, temporary SQLite databases (no mock DBs).

5. **Link CLI Locally**:
   ```bash
   npm link
   fastr status
   ```

---

## 🧱 Architectural Guardrails

Before submitting a PR, verify that your changes adhere to FastrMemory's **7 Core Principles**:

1. **Zero External Daemon**: Never introduce persistent background daemons (like Rust or Python processes). The engine runs entirely inside standard Node.js using native WAL SQLite.
2. **No Lossy Sleep Merging**: Never delete or blend raw observations during consolidation. Store raw observations in `raw_events` and link summarized memories via `source_event_ids`.
3. **Bi-Temporal Validity Over Decay**: Do not use time decay half-lives that cause rarely accessed architectural rules to disappear. All memories use `valid_from` / `valid_to` timestamps.
4. **Per-ID Outcome Feedback**: Always attribute feedback to specific memory IDs (`[mem_xxxx]`). Never penalize entire batches of innocent memories.
5. **Two-Zone Git Mirroring**: Any write or supersession must update human-readable `.fastr/pages/<module>.md` with `## Compiled Truth` (top) and `## Append-Only Timeline` (bottom).
6. **No Silent Data Loss**: Never delete raw events or hard-delete memories in a migration. Supersede, tombstone, and keep the history exportable. If a change touches retention, add a test that proves the old row still exists.
7. **Official MCP v2 Only**: Use `@modelcontextprotocol/server` v2 SDK (`server.registerTool`, `server.registerResource`). Never use legacy v1 imports.

---

## 🌟 Contributors

Thanks to **[@the-arizul](https://github.com/the-arizul)** for PRs #1 through #11, covering loopback security, atomic JSON config merges, SQLite recovery, retrieval calibration, MCP hardening, the skills suite, the VS Code extension, benchmark harnesses, and the dashboard.

---

## 📬 Pull Request Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feat/add-windsurf-hooks
   # or for bug fixes:
   git checkout -b fix/sqlite-busy-retry
   ```
2. Write unit tests in `tests/` covering new behavior.
3. Verify that all 293 tests pass and all packages compile:
   ```bash
   npm run build:all && npm test
   ```
   Keep text files LF. The repository enforces this through `.gitattributes` and `.editorconfig`; a CRLF TypeScript test file fails Vitest on Windows.
4. Verify no active error traps are regressed:
   ```bash
   node dist/bin/fastr.js guard --strict
   ```
5. Commit with a DCO sign-off:
   ```bash
   git commit -s -m "feat(installer): add windsurf auto-hook integration"
   ```
6. Push to your fork and submit a Pull Request to `main`.

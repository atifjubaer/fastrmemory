# Security Policy

**Last reviewed:** 2026-10-23
**Supported release:** `0.4.0` (published 2026-10-23 07:32 UTC from tag `v0.4.0`; npm `latest`; GitHub Actions OIDC provenance). `0.3.1` and `0.3.0` remain published historical versions.
**Previous release:** `0.3.1` was superseded by `0.4.0` and remains published historical; `0.3.0` remains historical; `0.2.1` is historical, its GitHub Release remains for rollback, and its npm entry was removed on 2026-10-23.

FastrMemory is a local-first memory engine. It stores plaintext SQLite and Markdown files, runs as the current OS user, and does not provide multi-user authentication. The security model assumes a trusted local account and treats repository content, imported files, and recalled memories as untrusted data.

## 1. Local data boundaries

| Path | Contents | Notes |
|---|---|---|
| `.fastr/fastr.db` | Memories, events, snapshots, feedback, branches, conflicts | Plaintext SQLite, WAL mode |
| `.fastr/fastr.db-wal`, `.fastr/fastr.db-shm` | SQLite write-ahead log and shared memory | Copy with the database while stopped |
| `.fastr/pages/*.md` | Human-readable two-zone memory mirrors | May be committed to Git |
| `.fastr/spool/pending.jsonl` | Fallback queue when SQLite is busy | Plaintext JSONL |
| `.fastr/project.json` | Project id and display name | No secrets expected |
| `~/.fastr/global.db` | Federated global memories | Shared across projects for this OS user |
| Agent config files | MCP and hook registration | Written by `fastrmemory hook install` / `fastr setup` |

`FASTR_HOME` overrides the global home directory for tests and sandboxes. It does not encrypt data.

## 2. Network behavior

- **Default path:** no outbound network call. CLI, MCP stdio, SQLite, and Markdown mirroring are local.
- **Optional embeddings:** setting `FASTR_EMBEDDINGS_MODEL=1`, or running the embedding benchmark, may download `Xenova/all-MiniLM-L6-v2` weights from Hugging Face on first use. Normal recall does not download unless the model is explicitly enabled.
- **Dashboard:** `fastr ui` binds `127.0.0.1` by default and rejects non-loopback `Host` and `Origin` values, cross-origin reads, and non-JSON mutations. It sends no CORS headers. There is no login: any local process that can reach the loopback port can call the API.
- **Daemon:** the optional REST/SSE service is local-only and is not required for the default path.
- **Benchmarks:** public harnesses download pinned datasets only when explicitly run; datasets are not shipped in the package.
- **Telemetry:** none.

## 3. Secret handling

`src/privacy/scrubber.ts` redacts common credentials before writes, including private-key blocks, `<private>...</private>` blocks, OpenAI/Anthropic/Stripe/Google/Slack/GitHub/AWS tokens, JWTs, bearer tokens, basic-auth headers, URL-embedded passwords, and quoted or unquoted key/secret assignments. Feedback notes and git-learned memories are scrubbed as well.

This is **best-effort redaction, not encryption**:

- Unknown secret formats can pass through.
- Memory content is plaintext at rest.
- `.fastr/pages/*.md` can expose memory content in Git history.
- Use `<private>...</private>` for content that must not be stored, and do not paste live credentials into prompts or memory titles.
- Use full-disk encryption and OS file permissions where the threat model requires it.

## 4. Trust boundaries and threats

### In scope

| Threat | Mitigation |
|---|---|
| A malicious website reaches the dashboard through DNS rebinding or CORS | Loopback `Host`/`Origin` checks; no CORS headers; JSON-only mutations |
| A repository or imported Markdown injects instructions into recall | Recalled text is data, not instructions; review imported rules; use trusted sources |
| A secret is accidentally written to memory or a Markdown mirror | Best-effort scrubbing; `<private>` tags; review before commit |
| An installer corrupts an agent config | JSON configs get a one-time `<file>.fastr.bak` and atomic temp-file + rename; `AGENTS.md` is appended only when the marker is absent |
| A stale or orphaned memory misleads an agent | `fastr hygiene`, conflict reports, confidence tiers, replay/diff, explicit forget |
| A dependency advisory affects the runtime | Three runtime dependencies; `npm audit --omit=dev`; pinned lockfile |

### Out of scope

- An attacker who already controls the same OS account, home directory, or terminal.
- A compromised npm registry, GitHub account, or local package cache.
- Multi-user isolation. The dashboard and MCP server do not authenticate users.
- Prompt injection that a host agent chooses to follow despite the data/instruction boundary.
- Power-loss durability. The crash test kills the process; SQLite runs with `synchronous=NORMAL` in WAL mode.

## 5. Agent and MCP hardening

- The default MCP surface is 41 tools; use `--profile core` for the 12-tool daily loop when a client does not need branch, replay, or admin tools.
- Treat tool permissions as security boundaries. A client that can call `fastr_forget`, `fastr_merge`, or conflict resolution can mutate memory.
- Keep MCP configuration files reviewed and committed intentionally.
- Do not expose the dashboard port through a reverse proxy, tunnel, or container port publish.
- Re-run `fastrmemory hook install` after upgrades so hook formats and MCP commands match the installed version.

## 6. Reporting a vulnerability

Do **not** open a public issue with exploit details or secrets.

Use GitHub private vulnerability reporting:

`https://github.com/atifjubaer/fastrmemory/security/advisories/new`

Include:

1. Affected version or commit.
2. Minimal reproduction steps.
3. Impact and required attacker position.
4. Whether the issue affects the CLI, MCP server, dashboard, installer, or packaging.
5. Redacted logs. Never include live tokens, private keys, or customer data.

No bug bounty or fixed response SLA is claimed. Maintainers will use the advisory thread to confirm scope and coordinate disclosure.

## 7. Known limitations

- `npm audit` on 2026-10-21 reports 9 advisories in dev-only dependencies (`@huggingface/transformers`, `vitest`); the three runtime dependencies are separate. This is not a claim that the dev tree is risk-free.
- The dashboard has loopback/origin checks but no authentication.
- Secret scrubbing is pattern-based and can miss custom formats.
- The Apple Silicon macOS job is absent from the CI matrix.
- Live Gemini and Copilot hook execution is not locally verified; Copilot CLI is not installed in the test environment.

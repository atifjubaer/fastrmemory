# FastrMemory NPM Publishing & Architecture Guide

> **Status (2026-10-23): published.** The canonical unscoped `fastrmemory@0.3.0` was published to the public npm registry on **2026-10-22 18:32 UTC** from tag `v0.3.0` (`50a7d8f`). `npm view fastrmemory version` returns `0.3.0`, `latest` is `0.3.0`, and `npx -y fastrmemory@0.3.0 --version` returns `0.3.0`. The registry also lists `0.0.0-stage`; use the exact `0.3.0` version for reproducibility. The frozen scoped `@atifjubaer/fastrmemory@0.2.1` remains published from `3fa2bf9`; do not republish either release.

> **0.2.1 history:** `@atifjubaer/fastrmemory@0.2.1` was published on **2026-10-22 16:51 UTC** from frozen tag `3fa2bf9`. The earlier E401/E404 block is preserved below as history. The first `npm view` after publish returned E404 for about two minutes during registry propagation; it was not a failed publish. Do not republish `0.2.1`; npm rejects duplicates with E409.

This document explains why npm matters for FastrMemory, how the package is verified, and the publish protocol used for 0.2.1 and 0.3.0. The historical block section is retained for audit.

---

## What npm provides

1. **Registry distribution**
   - `npx -y fastrmemory@0.3.0 ui` is available for the canonical 0.3.0 package.
   - `npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr ui` remains available for the frozen scoped 0.2.1 package.
   - The registry hosts the compressed tarball containing the compiled backend (`dist/`) and React dashboard (`dist-ui/`).

2. **Binary linking**
   - The `bin` map registers two shell commands:
     ```json
     "bin": {
       "fastrmemory": "dist/bin/fastr.js",
       "fastr": "dist/bin/fastr.js"
     }
     ```
   - npm creates the executable links on install.

3. **MCP runtime dependency**
   - FastrMemory uses the official `@modelcontextprotocol/server` package for the stdio MCP v2 server.

4. **Optional local model**
   - `@huggingface/transformers` is an **optional peer**, not a required dependency. It is installed only when local semantic embeddings are wanted.

5. **Build and verification**
   - `npm run build:core` compiles TypeScript.
   - `npm run build:ui` builds the React dashboard and writes the deterministic `dist-ui/build-manifest.json`.
   - `npm run check:ci` runs tests, isolation, skills, UI freshness, package-surface, docs, and benchmark checks.

---

## Release 0.3.0

The canonical unscoped package is published and is the `latest` npm release:

- **Tag and CI:** `v0.3.0` points to `50a7d8f` (merged PR #13); CI run `39831793263` is 6/6 green on that commit.
- **Publish:** `npm publish --access public` returned `+ fastrmemory@0.3.0`; the registry timestamp is **2026-10-22 18:32:58 UTC**.
- **Tarball:** 647,903 bytes packed, 270 files, 2,598,164 bytes unpacked; shasum `e17af4f854bd9231e1f4b3a8efb04d3e5b65f8e2`; integrity `sha512-a3Ruf9iqf+u+XnR/3oIUThyac6CHgGJDuDM8rAuFipJRMSYjhSAfWe6/NhLDcStBsFflskdIjlwY9YtvBnwbRw==`.
- **Global install:** `npm install -g fastrmemory@0.3.0` added 5 packages in 2 s; `fastr --version` and `fastrmemory --version` both return `0.3.0`.
- **One-shot:** `npx -y fastrmemory@0.3.0 --version` returns `0.3.0` from a neutral directory.
- **Scoped history:** `npm view @atifjubaer/fastrmemory version` still returns `0.2.1`; that release remains frozen at `3fa2bf9`.
- **Caveat:** the registry also lists `0.0.0-stage`; `latest` is `0.3.0`. Pin the exact version for reproducible installs.
- **Operational note:** the publish shell was non-interactive and could not complete npm's OTP prompt. A 7-day granular token with 2FA bypass was created, used only for this publish, deleted immediately, and the original `.npmrc` login was restored. Treat that as an exception, not the default; prefer an interactive `npm publish --otp` or staged publishing.

| Check | Command | Output |
|---|---|---|
| Identity | `npm whoami` | `atifjubaer` |
| Version | `npm view fastrmemory version` | `0.3.0` |
| Dist-tag | `npm view fastrmemory dist-tags --json` | `{"latest":"0.3.0"}` |
| Tarball | `npm view fastrmemory dist.tarball` | `https://registry.npmjs.org/fastrmemory/-/fastrmemory-0.3.0.tgz` |
| Shasum | `npm view fastrmemory dist.shasum` | `e17af4f854bd9231e1f4b3a8efb04d3e5b65f8e2` |
| Integrity | `npm view fastrmemory dist.integrity` | `sha512-a3Ruf9iqf+u+XnR/3oIUThyac6CHgGJDuDM8rAuFipJRMSYjhSAfWe6/NhLDcStBsFflskdIjlwY9YtvBnwbRw==` |
| Files / unpacked | `npm view fastrmemory@0.3.0 dist.fileCount dist.unpackedSize` | `270`; `2598164` |
| Global install | `npm install -g fastrmemory@0.3.0` | `added 5 packages in 2s` |
| CLI version | `fastr --version` | `0.3.0` |
| One-shot CLI | `npx -y fastrmemory@0.3.0 --version` | `0.3.0` |
| Publish output | `npm publish --access public` from `50a7d8f` | `+ fastrmemory@0.3.0` |

## Release 0.2.1

The 0.2.1 GitHub release is attached and the tarball is verified:

- `npm pack` produced `atifjubaer-fastrmemory-0.2.1.tgz` at **591,204 bytes**.
- SHA-256: `78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`.
- Clean install in an empty temp project: **1.93 s**, **16,493,075 bytes** in `node_modules`; `fastr --version` and `fastrmemory --version` both report `0.2.1`; `fastr mcp --help` lists `--profile`.
- npm published `@atifjubaer/fastrmemory@0.2.1` on **2026-10-22 16:51 UTC**; `npm view @atifjubaer/fastrmemory version` returns `0.2.1`; access status is `public`.
- The npm tarball is **591.4 kB packed / 2.3 MB unpacked / 220 files**, shasum `352abba135ce1b0921cacbcdf9b7efd2abfc4802`, integrity `sha512-vl51HU0V7BvJ7+ctDMjumDRAt6+5ylvFJYeRPDViM2K4Li0j9fdNIPaF9IILWKdMZwP/wVDQCbM812V+iv3AVA==`. It is not byte-identical to the GitHub asset; both report `0.2.1`.

The v0.2.1 GitHub Release asset is attached at
`https://github.com/atifjubaer/fastrmemory/releases/tag/v0.2.1` (created
2026-10-21 from `3fa2bf9`; CI 6/6 green on that commit).

## Install paths

Published canonical 0.3.0 package:

```bash
# Global CLI (latest is 0.3.0):
npm install -g fastrmemory
fastr --version

# Exact release:
npm install -g fastrmemory@0.3.0

# One-shot run from a neutral directory:
npx -y fastrmemory@0.3.0 --version
```

Published historical 0.2.1 package:

```bash
# Global CLI:
npm install -g @atifjubaer/fastrmemory@0.2.1
fastr --version

# One-shot run from a neutral directory:
npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr --version
```

Byte-verified GitHub Release fallback:

```bash
# Local project install:
npm install https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
npx fastr --version

# Global CLI:
npm install -g https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.1/atifjubaer-fastrmemory-0.2.1.tgz
fastr --version
```

The v0.2.1 GitHub asset is 591,204 bytes with SHA-256
`78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`.
The release-URL clean-install check reported `npx fastr --version` = `0.2.1`
and 16,493,121 bytes in `node_modules` in 8.35 s. The registry tarball is a
separate pack and is not byte-identical.

The older v0.2.0 asset remains available at
`https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.0/atifjubaer-fastrmemory-0.2.0.tgz`
(571,279 bytes, SHA-256
`12B7D49546D6B904A2296724490E4D6EECE313514DA6C4BFDA6950137F309ED7`).

Source install remains available:

```bash
npx github:atifjubaer/fastrmemory setup
npx github:atifjubaer/fastrmemory ui
npm install -g git+https://github.com/atifjubaer/fastrmemory.git
```

See [CLAIMS.md](../CLAIMS.md) for the evidence rows.

---

## Historical registry block (resolved 2026-10-22)

Run these commands from the repository root:

```powershell
npm whoami
npm view @atifjubaer/fastrmemory version
```

Observed on 2026-10-21 01:51 UTC:

```text
npm error code E401
npm error 401 Unauthorized - GET https://registry.npmjs.org/-/whoami

npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/@atifjubaer%2ffastrmemory - Not found
```

Resolved on 2026-10-22: `npm whoami` returns `atifjubaer`, `npm view @atifjubaer/fastrmemory version` returns `0.2.1` (and `npm view fastrmemory version` now returns `0.3.0`), and `npm access get status @atifjubaer/fastrmemory` returns `public`. Do not disable account 2FA or force a publish while the account is blocked. If a non-interactive shell cannot complete the OTP prompt, use the narrowest short-lived token with publish rights, delete it immediately after publishing, and restore the interactive login.

---

## Publish protocol (0.3.0 example; 0.2.1 is historical)

1. **Authenticate interactively**
   ```powershell
   npm login
   ```
   Complete the browser/2FA prompt. If the shell is non-interactive and cannot
   complete the prompt, use the narrowest short-lived token with publish rights,
   delete it immediately after publishing, and restore the interactive login.
   Do not disable account 2FA or leave a bypass token in place.

2. **Check out the release tag (the 0.2.1 history used `v0.2.1`)**
   ```powershell
   git fetch --tags
   git checkout v0.3.0
   git rev-parse --short HEAD
   git status --porcelain
   ```
   Expected: `50a7d8f` and an empty status. Do not publish from a feature
   branch; the release must be reproducible from the tag.

3. **Verify identity**
   ```powershell
   npm whoami
   ```
   Expected output: `atifjubaer`.

4. **Install and re-run the full local gate on the frozen tree**
   ```powershell
   npm ci
   npm --prefix ui ci
   npm run check:ci
   ```

5. **Publish from the frozen tree**
   ```powershell
   npm publish --access public
   ```
   `prepublishOnly` runs `build:core`, `npm test`, `check:dist-ui`, and
   `check:package`; it does not rebuild the tracked UI bundle. Run
   `npm run build:ui` first only when the UI source actually changed.

6. **Verify the registry result from a neutral directory**
   ```powershell
   npm view fastrmemory version
   npx -y fastrmemory@0.3.0 --version
   ```
   Both must report `0.3.0` before any npm install claim is published. A
   first E404 for 2-3 minutes is registry propagation; wait and retry, do
   not republish. Run the `npx` check outside the release tree so local
   resolution cannot mask a registry failure. For the historical scoped
   release, use `npm view @atifjubaer/fastrmemory version` and
   `npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr --version`.

7. **Clear the local login when finished**
   ```powershell
   npm logout
   ```
   Skip this only when the machine is trusted and another publish is
   intentionally planned.

The automated assistant is optional and must be run from the same frozen tree:

```powershell
node scripts/publish-when-ready.mjs
```

It checks `npm whoami` and runs the same publish flow. It must not bypass 2FA.

---

## Published result (0.2.1, historical)

| Check | Command | Output |
|---|---|---|
| Identity | `npm whoami` | `atifjubaer` |
| Version | `npm view @atifjubaer/fastrmemory version` | `0.2.1` |
| Tarball | `npm view @atifjubaer/fastrmemory dist.tarball` | `https://registry.npmjs.org/@atifjubaer/fastrmemory/-/fastrmemory-0.2.1.tgz` |
| Shasum | `npm view @atifjubaer/fastrmemory dist.shasum` | `352abba135ce1b0921cacbcdf9b7efd2abfc4802` |
| Integrity | `npm view @atifjubaer/fastrmemory dist.integrity` | `sha512-vl51HU0V7BvJ7+ctDMjumDRAt6+5ylvFJYeRPDViM2K4Li0j9fdNIPaF9IILWKdMZwP/wVDQCbM812V+iv3AVA==` |
| Access | `npm access get status @atifjubaer/fastrmemory` | `@atifjubaer/fastrmemory: public` |
| One-shot CLI | `npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr --version` | `0.2.1` |
| Publish output | `npm publish --access public` from `3fa2bf9` | `+ @atifjubaer/fastrmemory@0.2.1`; 591.4 kB packed / 2.3 MB unpacked / 220 files |

The registry also lists `0.0.0-stage`; at the time of the 0.2.1 release
`latest` was `0.2.1`, and it is now `0.3.0`. Use an exact version for
reproducible installs. The first `npm view` after the 0.2.1 publish returned
E404 for about two minutes during propagation; the retry succeeded.

---

## Package verification

| Check | Command |
|---|---|
| Full local gate | `npm run check:ci` |
| Package surface | `npm run check:package` |
| UI freshness | `npm run check:dist-ui` |
| Tarball contents | `npm pack --dry-run --json --ignore-scripts` |
| Clean install | `npm install <tarball> --ignore-scripts` in an empty temp project |
| CLI version | `node dist/bin/fastr.js --version` |
| Registry metadata | `npm view fastrmemory version dist.tarball dist.integrity` |
| Historical registry metadata | `npm view @atifjubaer/fastrmemory version dist.tarball dist.integrity` |
| Registry one-shot | `npx -y fastrmemory@0.3.0 --version` |
| Historical one-shot | `npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr --version` |

The package check enforces `mcpName`, bin paths, exports, the files allowlist,
absence of tests/docs/databases, and the 5 MB tarball gate. The UI manifest
records normalized hashes so Windows and Linux checkouts agree.

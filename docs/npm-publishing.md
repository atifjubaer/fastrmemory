# FastrMemory NPM Publishing & Architecture Guide

> **Status (2026-10-22): published.** `@atifjubaer/fastrmemory@0.2.1` was published to the public npm registry on **2026-10-22 16:51 UTC** from frozen tag `3fa2bf9`. `npm view @atifjubaer/fastrmemory version` returns `0.2.1`; `npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr --version` returns `0.2.1`; access status is `public`. The earlier E401/E404 block is preserved below as history. The first `npm view` after publish returned E404 for about two minutes during registry propagation; it was not a failed publish. Do not republish `0.2.1`; npm rejects duplicates with E409.

This document explains why npm matters for FastrMemory, how the package is verified, and the publish protocol used for 0.2.1. The historical block section is retained for audit.

---

## What npm provides

1. **Registry distribution**
   - `npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr ui` is available for the published 0.2.1 package.
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

Published npm package:

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

Resolved on 2026-10-22: `npm whoami` returns `atifjubaer`, `npm view @atifjubaer/fastrmemory version` returns `0.2.1`, and `npm access get status @atifjubaer/fastrmemory` returns `public`. Do not create an automation token, disable 2FA, or otherwise bypass the account security flow to force a publish. Restore the account first.

---

## Publish protocol (0.2.1 example; adapt the tag for future releases)

1. **Authenticate interactively**
   ```powershell
   npm login
   ```
   Complete the browser/2FA prompt. Do not use an automation token as a workaround.

2. **Check out the frozen release tree (the 0.2.1 example uses `v0.2.1`)**
   ```powershell
   git worktree add ..\fastrmemory-v0.2.1 v0.2.1
   Set-Location ..\fastrmemory-v0.2.1
   git rev-parse --short HEAD
   git status --porcelain
   ```
   Expected: `3fa2bf9` and an empty status. Do not publish from
   `feat/0.3.0`; its code is unreleased even though `package.json` still
   says `0.2.1`.

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
   npm view @atifjubaer/fastrmemory version
   npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr --version
   ```
   Both must report `0.2.1` before any npm install claim is published. A
   first E404 for 2-3 minutes is registry propagation; wait and retry, do
   not republish. Run the `npx` check outside the frozen package tree so
   local resolution cannot mask a registry failure.

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

## Published result (0.2.1)

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

The registry also lists `0.0.0-stage`; `latest` is `0.2.1`. Use an exact
version for reproducible installs. The first `npm view` after publish returned
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
| Registry metadata | `npm view @atifjubaer/fastrmemory version dist.tarball dist.integrity` |
| Registry one-shot | `npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr --version` |

The package check enforces `mcpName`, bin paths, exports, the files allowlist,
absence of tests/docs/databases, and the 5 MB tarball gate. The UI manifest
records normalized hashes so Windows and Linux checkouts agree.

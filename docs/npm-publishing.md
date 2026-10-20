# FastrMemory NPM Publishing & Architecture Guide

> **Status (2026-10-21): npm publication is blocked until the temporary suspension lifts.** npm Support states the account will return to normal on **2026-10-21 22:42 UTC** (**2026-10-22 04:42 Asia/Dhaka**) after a recovery-code login triggered a 72-hour security suspension. `npm whoami` returns **E401 Unauthorized** and `npm view @atifjubaer/fastrmemory version` returns **E404**, so the npm registry package has never been published. If the recovery-code login was legitimate, no action is required; wait for the automatic return. **Do not bypass npm security checks, 2FA, or the suspension.** Use the GitHub Release tarball or the GitHub source install until the account is restored.

This document explains why npm matters for FastrMemory, how the package is verified, and the exact resume protocol. It is a resume plan, not a workaround.

---

## What npm provides

1. **Registry distribution**
   - `npx @atifjubaer/fastrmemory ui` becomes available only after a successful publish.
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

## Current interim distribution

The verified v0.2.0 tarball is published as a GitHub Release asset:

```bash
# Local project install:
npm install https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.0/atifjubaer-fastrmemory-0.2.0.tgz
npx fastr --version

# Global CLI:
npm install -g https://github.com/atifjubaer/fastrmemory/releases/download/v0.2.0/atifjubaer-fastrmemory-0.2.0.tgz
fastr --version
```

Source install remains available:

```bash
npx github:atifjubaer/fastrmemory setup
npx github:atifjubaer/fastrmemory ui
npm install -g git+https://github.com/atifjubaer/fastrmemory.git
```

The release tarball is 571,279 bytes with SHA-256
`12B7D49546D6B904A2296724490E4D6EECE313514DA6C4BFDA6950137F309ED7`.
The clean-install check reported `npx fastr --version` = `0.2.0`,
`npx fastrmemory --version` = `0.2.0`, and 16,397,409 bytes in `node_modules`.
See [CLAIMS.md](../CLAIMS.md) for the evidence rows.

---

## Registry block evidence

Run these commands from the repository root:

```powershell
npm whoami
npm view @atifjubaer/fastrmemory version
```

Observed on 2026-10-20:

```text
npm error code E401
npm error 401 Unauthorized - GET https://registry.npmjs.org/-/whoami

npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/@atifjubaer%2ffastrmemory - Not found
```

Do not create an automation token, disable 2FA, or otherwise bypass the account security flow to force a publish. Restore the account first.

---

## Resume protocol

When the npm account is restored:

1. **Authenticate interactively**
   ```powershell
   npm login
   ```
   Complete the browser/2FA prompt. Do not use an automation token as a workaround.

2. **Verify identity**
   ```powershell
   npm whoami
   ```
   Expected output: `atifjubaer`.

3. **Re-run the full local gate**
   ```powershell
   npm run check:ci
   npm run build:core
   npm run check:dist-ui
   npm run check:package
   ```

4. **Publish**
   ```powershell
   npm publish --access public
   ```
   `prepublishOnly` runs `build:core`, `npm test`, `check:dist-ui`, and
   `check:package`; it does not rebuild the tracked UI bundle. Run
   `npm run build:ui` first only when the UI source actually changed.

5. **Verify the registry result**
   ```powershell
   npm view @atifjubaer/fastrmemory version
   npx @atifjubaer/fastrmemory@latest --version
   ```
   Both must report `0.2.0` before any npm install claim is published.

The automated assistant is optional:

```powershell
node scripts/publish-when-ready.mjs
```

It checks `npm whoami` and runs the same publish flow. It must not bypass 2FA.

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

The package check enforces `mcpName`, bin paths, exports, the files allowlist,
absence of tests/docs/databases, and the 5 MB tarball gate. The UI manifest
records normalized hashes so Windows and Linux checkouts agree.

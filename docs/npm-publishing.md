# 📦 FastrMemory NPM Publishing & Architecture Guide

> **Status (2026-10-20): publication is blocked.** `npm view @atifjubaer/fastrmemory version` returns **E404**, so the package has never been published. The npm account has an unresolved security suspension/2FA issue. **Do not bypass npm security checks, 2FA, or the suspension.** Until the account is restored, use the GitHub install path and treat `npx @atifjubaer/fastrmemory` as unavailable. Steps below are a resume plan, not a workaround.

This document explains why NPM is used in FastrMemory, how package publishing works, and what to do during the temporary 72-hour account cooldown.

---

## 💡 What is NPM and Why is it Required on This Project?

NPM (Node Package Manager) serves 5 critical roles for FastrMemory:

1. **Global Package Registry & Distribution**:
   - Allows any developer or autonomous agent anywhere in the world to execute FastrMemory with zero installation:
     ```bash
     npx @atifjubaer/fastrmemory ui
     ```
   - When published to the public registry, NPM hosts the compressed tarball containing both the pre-compiled backend (`dist/`) and React dashboard (`dist-ui/`).

2. **Binary CLI Linking**:
   - In `package.json`, the `"bin"` map registers two shell commands:
     ```json
     "bin": {
       "fastrmemory": "dist/bin/fastr.js",
       "fastr": "dist/bin/fastr.js"
     }
     ```
   - When installed globally (`npm install -g @atifjubaer/fastrmemory`) or linked locally (`npm link`), NPM automatically creates executable symlinks on the user's system `$PATH` (e.g. `C:\Users\ATIF\AppData\Roaming\npm\fastrmemory`).

3. **Standard Model Context Protocol (MCP) Runtime**:
   - FastrMemory implements the official Model Context Protocol v2 using `@modelcontextprotocol/server`. NPM manages this dependency and ensures version compatibility.

4. **Optional In-Process AI Dependency**:
   - FastrMemory can compute 384-dimensional semantic embeddings locally using `@huggingface/transformers` without external APIs. The model and its ONNX runtime are an **optional peer**, not part of the default install; install them explicitly when semantic vectors are wanted.

5. **Build & Test Automation**:
   - `npm run build`: Bundles the React 19 UI via Vite and compiles TypeScript via `tsc`.
   - `npm test`: runs the Vitest suite (226 tests across 38 files as of 2026-10-20); it does not enforce a coverage threshold.

---

## ⏳ Handling the 72-Hour NPM Cooldown

NPM occasionally places temporary 72-hour holds on accounts (e.g. after password resets, 2FA reconfigurations, or new organization creation) to prevent unauthorized automated token generation.

### What Works Right Now (Zero NPM Registry Dependency)

Anyone worldwide can run, install, and use FastrMemory immediately via GitHub:

```bash
# 1. Instant execution directly from GitHub:
npx github:atifjubaer/fastrmemory setup
npx github:atifjubaer/fastrmemory ui

# 2. Global installation from GitHub:
npm install -g git+https://github.com/atifjubaer/fastrmemory.git

# 3. Local machine global access (already active):
fastrmemory status
fastrmemory trap list
fastrmemory ui
```

---

## 🚀 Post-Cooldown Publishing Checklist (Once 72h Expires)

When the 72-hour hold lifts:

1. **Log in to your NPM account in your terminal**:
   ```powershell
   npm login
   ```
   *(Enter username, password, and approve the browser OTP notification)*

2. **Verify your active session**:
   ```powershell
   npm whoami
   ```
   *(Expected output: `atifjubaer`)*

3. **Run the automated publisher assistant**:
   ```powershell
   node scripts/publish-when-ready.mjs
   ```

4. **Or publish directly**:
   ```powershell
   npm publish --access public
   ```

Once published, FastrMemory will be universally accessible via `npx @atifjubaer/fastrmemory`.

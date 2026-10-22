# FastrMemory NPM Publishing & Troubleshooting Guide

> **Status (2026-10-23): resolved and published.** The canonical `fastrmemory@0.3.0` is live on npm (`npm view fastrmemory version` returns **0.3.0**; `latest` is **0.3.0**). The old scoped `@atifjubaer/fastrmemory@0.2.1` npm entry was removed on 2026-10-23; its GitHub release remains historical. **Do not disable account 2FA or bypass npm security.** The steps below are a historical incident log from the temporary suspension; they are not a workaround. The current publish protocol is in [npm-publishing.md](npm-publishing.md).

> Reference guide documenting all publishing errors, root causes, fixes applied, and the historical resume protocol for `@atifjubaer/fastrmemory`.

---

## Historical Resume Protocol (Completed 2026-10-22)

The 0.2.1 publish completed with these steps. Keep them for future releases:

### Step 1: Confirm the suspension and wait for automatic return
1. Open the email inbox registered with npm and find the notice from `support@npmjs.com`.
2. Historical notice: a recovery-code login on 2026-10-19 triggered a 72-hour suspension. The account returned to normal on **2026-10-21 22:42 UTC** (**2026-10-22 04:42 Asia/Dhaka**). The restriction was lifted before the successful 2026-10-22 publish.
3. If a future recovery-code login was not yours, contact npm Support immediately and treat the account as compromised.
4. Do not retry `npm login` or `npm publish` repeatedly while suspended. Wait for the return time, then refresh [https://www.npmjs.com](https://www.npmjs.com) and confirm the red banner is gone.

### Step 2: Restore 2FA / publish access (1 min)
1. Navigate to: **https://www.npmjs.com/settings/tokens**
2. Complete the security challenge npm asks for. **Do not create an automation token to bypass 2FA.**
3. If npm requires a token, use a short-lived granular token scoped to this package and revoke it after publishing.

### Step 3: Publish from Terminal (historical 0.2.1 run)
```powershell
# Authenticate interactively; complete the 2FA prompt when npm asks.
npm login
npm whoami

# Re-run the local evidence gate on the frozen release tree.
npm run check:ci
npm run build:core
npm run check:package

# Publish with public access
npm publish --access public

# Historical 0.2.1 verification; this npm entry was removed on 2026-10-23.
npm view @atifjubaer/fastrmemory version
npx --yes --package @atifjubaer/fastrmemory@0.2.1 fastr --version

# Clear the local session when finished.
npm logout
```

The 0.2.1 run published from `3fa2bf9`: 235 tests / 43 files passed,
`check:package` reported 220 files / 577.6 kB, and npm reported
`+ @atifjubaer/fastrmemory@0.2.1` with a 591.4 kB tarball.

---

## Incident & Error Log (All Errors Faced & Solved)

### 1. `EJSONPARSE` in `package.json`
- **Location**: `package.json:1`
- **Error**: `Unexpected non-whitespace character after JSON at position 8 (line 1 column 9)`
- **Cause**: Opening curly brace `{` was missing from line 1 during file edit.
- **Fix Applied**: Added `{` back to line 1. Verified via `npm run build`.

---

### 2. `EEXIST` During `npm link`
- **Location**: `C:\Users\ATIF\AppData\Roaming\npm\fastrmemory`
- **Error**: `EEXIST: file already exists`
- **Cause**: Windows global npm directory already had a previous symlink from an earlier build.
- **Fix Applied**: Ran `npm link --force` to overwrite existing symlink. Dual commands `fastrmemory` and `fastr` now resolve globally.

---

### 3. NPM Invalid Bin Script Warning
- **Location**: `package.json` `"bin"` mapping
- **Error**: `npm warn publish "bin[fastrmemory]" script name dist/bin/fastr.js was invalid and removed`
- **Cause**: Paths were written as `"./dist/bin/fastr.js"`. NPM publishing specification requires `"dist/bin/fastr.js"` (no leading `./`).
- **Fix Applied**: Ran `npm pkg fix` to normalize paths. Verified clean output with `npm pack --dry-run` (0 warnings).

---

### 4. Tarball Bloat (Raw Tests & Local Databases)
- **Location**: NPM Tarball package contents
- **Issue**: `npm pack` was bundling `tests/`, `.fastr/fastr.db`, and other non-package files (100 files, ~400 KB).
- **Fix Applied**: Added a `"files"` allowlist to `package.json` and a package-surface check. The current v0.2.1 pack is **591,204 bytes / 220 files** (577.3 KiB packed, 2.2 MB unpacked), containing compiled runtime code, the tracked UI bundle, skills, and plugin manifests. Tests, docs, databases, and local state are excluded. SHA-256: `78F1535E87A7148272824C0B0D31F21D4AD385D9EEAA2EF8A40D41DCD0ACA63B`.

---

### 5. CLI Web Auth `404 Not Found` Timeout
- **Location**: `GET https://registry.npmjs.org/-/v1/done?authId=...`
- **Error**: `npm error code E404`
- **Cause**: `npm publish` prompted to press Enter to open browser auth. The polling session timed out before browser confirmation was completed.
- **Fix Applied**: Configured publish flow to use non-interactive npm Access Tokens (`npm config set //registry.npmjs.org/:_authToken ...`) instead of web polling.

---

### 6. Granular Token Scope Dropdown Missing Package
- **Location**: `npmjs.com/settings/tokens/create` (Granular Access Token)
- **Issue**: In "Only select packages and scopes", `fastrmemory` was not listed under "Packages".
- **Cause**: `fastrmemory` has not been published yet, so npm only lists existing published packages (`fluentcart-developer`).
- **Fix**: Select either the **`All packages`** radio button or choose **`@atifjubaer`** under the "Scopes" section of the dropdown.

---

### 7. Account Temporary Security Suspension
- **Location**: Red banner at top of npmjs.com
- **Error**: `Your account has been temporarily suspended due to a recent security-sensitive action.`
- **Cause**: Rapid successive login attempts and invalid OTP string submissions triggered npm's automated rate-limiting security shield.
- **Resolution**: Check the registered npm account email for the unlock confirmation email from `support@npmjs.com` and click the link to restore standard access.

---

## Distribution Health Verification

The 0.2.1 publish ran and verified:
1. `npm run check:ci` (235 tests across 43 files at `3fa2bf9`; isolation, skills, UI freshness, package surface, docs, and benchmarks)
2. `npm run build:core` (`tsc` with 0 errors)
3. Whitelisted distribution payload:
   - `dist/` (compiled runtime & CLI)
   - `dist-ui/` (tracked React dashboard and deterministic manifest)
   - `skills/` (10 agent memory skills)
   - `.claude-plugin/` & `.cursor/` (IDE manifests)
   - `README.md` & `LICENSE` (Apache-2.0)
4. Historical registry verification: `npm view @atifjubaer/fastrmemory version` was `0.2.1`; `npm access get status` was `public`; registry shasum `352abba135ce1b0921cacbcdf9b7efd2abfc4802`; `npx` returned `0.2.1`. The npm entry was removed on 2026-10-23.

The earlier 2026-10-20 E404 state is historical. The 0.2.1 package was public from 2026-10-22 16:51 UTC until its removal on 2026-10-23.

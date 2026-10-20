# FastrMemory NPM Publishing & Troubleshooting Guide

> **Status (2026-10-20): publication is blocked.** `npm view @atifjubaer/fastrmemory version` returns **E404**. The account suspension/2FA issue is unresolved. **Do not bypass npm security, 2FA, or the suspension.** The steps below are a historical incident log and a resume plan; they are not a workaround.

> Reference guide documenting all publishing errors, root causes, fixes applied, and the exact resume protocol for `@atifjubaer/fastrmemory`.

---

## 📋 Resume Protocol (When You Return)

Follow these 3 steps once you're ready to publish:

### Step 1: Confirm the suspension and wait for automatic return
1. Open the email inbox registered with npm and find the notice from `support@npmjs.com`.
2. Current notice: a recovery-code login on 2026-10-19 triggered a 72-hour suspension. The account returns to normal on **2026-10-21 22:42 UTC** (**2026-10-22 04:42 Asia/Dhaka**).
3. If the recovery-code login was yours, no action is required. If it was not, contact npm Support immediately and treat the account as compromised.
4. Do not retry `npm login` or `npm publish` repeatedly while suspended. Wait for the return time, then refresh [https://www.npmjs.com](https://www.npmjs.com) and confirm the red banner is gone.

### Step 2: Restore 2FA / publish access (1 min)
1. Navigate to: **https://www.npmjs.com/settings/tokens**
2. Complete the security challenge npm asks for. **Do not create an automation token to bypass 2FA.**
3. If npm requires a token, use a short-lived granular token scoped to this package and revoke it after publishing.

### Step 3: Publish from Terminal (30 sec)
```powershell
# Authenticate interactively; complete the 2FA prompt when npm asks.
npm login
npm whoami

# Re-run the local evidence gate before publishing.
npm run check:ci
npm run build:core
npm run check:package

# Publish with public access
npm publish --access public
```

---

## 🛠️ Incident & Error Log (All Errors Faced & Solved)

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
- **Fix Applied**: Added a `"files"` allowlist to `package.json` and a package-surface check. The current v0.2.1 pack is **591,213 bytes / 220 files** (577.4 KiB packed, 2.3 MB unpacked), containing compiled runtime code, the tracked UI bundle, skills, and plugin manifests. Tests, docs, databases, and local state are excluded. SHA-256: `994A2DB4379FA97761DBD65E9982C97C4B140E3793FAA3FAC1CCE66FEB47CFBA`.

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

## 📦 Distribution Health Verification

Before publishing, this pipeline automatically runs and verifies:
1. `npm run check:ci` (234 tests across 42 files, isolation, skills, UI freshness, package surface, docs, and benchmarks)
2. `npm run build:core` (`tsc` with 0 errors)
3. Whitelisted distribution payload:
   - `dist/` (compiled runtime & CLI)
   - `dist-ui/` (tracked React dashboard and deterministic manifest)
   - `skills/` (10 agent memory skills)
   - `.claude-plugin/` & `.cursor/` (IDE manifests)
   - `README.md` & `LICENSE` (Apache-2.0)

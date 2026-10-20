# FastrMemory NPM Publishing & Troubleshooting Guide

> **Status (2026-10-20): publication is blocked.** `npm view @atifjubaer/fastrmemory version` returns **E404**. The account suspension/2FA issue is unresolved. **Do not bypass npm security, 2FA, or the suspension.** The steps below are a historical incident log and a resume plan; they are not a workaround.

> Reference guide documenting all publishing errors, root causes, fixes applied, and the exact resume protocol for `@atifjubaer/fastrmemory`.

---

## 📋 Resume Protocol (When You Return)

Follow these 3 steps once you're ready to publish:

### Step 1: Unlock Your NPM Account (1 min)
1. Open your email inbox registered with npm.
2. Find the email from `support@npmjs.com` ("Security alert" / "Verify security action").
3. Click the unlock link inside.
4. Refresh [https://www.npmjs.com](https://www.npmjs.com) to confirm the red suspension banner is gone.

### Step 2: Restore 2FA / publish access (1 min)
1. Navigate to: **https://www.npmjs.com/settings/tokens**
2. Complete the security challenge npm asks for. **Do not create an automation token to bypass 2FA.**
3. If npm requires a token, use a short-lived granular token scoped to this package and revoke it after publishing.

### Step 3: Publish from Terminal (30 sec)
```powershell
# Authenticate interactively; complete the 2FA prompt when npm asks.
npm login
npm whoami

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
- **Fix Applied**: Added `"files"` whitelist to `package.json`:
  ```json
  "files": [
    "dist",
    "skills",
    ".claude-plugin",
    ".cursor"
  ]
  ```
  Package size reduced to **43.1 KB** containing strictly compiled binaries, skills, and plugin manifests.

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
1. `npm run build` (`tsc` compile with 0 errors)
2. `npm test` (221 tests across 37 files as of 2026-10-20)
3. Whitelisted distribution payload:
   - `dist/` (compiled runtime & CLI)
   - `skills/` (7 agent memory skills)
   - `.claude-plugin/` & `.cursor/` (IDE manifests)
   - `README.md` & `LICENSE` (Apache-2.0)

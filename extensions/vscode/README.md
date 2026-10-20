# FastrMemory Guardian (VS Code & Cursor)

Native cognitive status bar pill and error trap guardian extension for **VS Code** and **Cursor**.

![FastrMemory](https://img.shields.io/badge/FastrMemory-Active-brightgreen)
![Status Bar](https://img.shields.io/badge/Status%20Bar-⚡%20Active%20Traps-amber)

---

## Features

1. **⚡ Status Bar Pill**:
   - Shows active trap count in the IDE status bar: `⚡ 3 Traps Active` or `⚡ 1 Trap on File`.
   - Clicking opens an interactive QuickPick listing all active traps, their lessons, and 2.0x boost weights.
   - Active traps include both **verified** and **staging** traps (e.g. ones produced by `fastrmemory learn`); staging traps are labelled `[STAGING]` and reported as Information rather than Warning diagnostics. Superseded, dormant and closed (`valid_to` set) traps are hidden.
   - Selecting a trap and choosing **Open Protected File** opens the linked file in an editor.
2. **Amber Code Underlines**:
   - Files protected by an active `[TRAP]` are underlined in amber.
   - Hovering over line 0 reveals the trap reason, governing lesson, and mitigation protocol.
3. **IDE Problems Integration**:
   - Active error traps appear as non-blocking Warning diagnostics in the VS Code / Cursor Problems panel.
4. **Zero-Daemon Architecture**:
   - Reads directly from local `.fastr/fastr.db` via `node:sqlite` (read-only). No background daemons or cloud servers required.
   - Refreshes automatically when `.fastr/fastr.db` changes or a file is saved.
   - `node:sqlite` needs an extension host running **Node >= 22.5** (unflagged from Node 22.13). On older VS Code / Cursor builds the extension still activates: it shows a one-time notice and falls back to `fastrmemory trap list` through the CLI. In that mode trap counts and the trap list work, but the CLI does not report file links, so per-file underlines and diagnostics are unavailable.
5. **Pre-Merge Trap Guardian**:
   - `FastrMemory: Run Pre-Merge Trap Guardian` runs `fastrmemory guard --base <fastrmemory.guardBaseBranch>` in the workspace folder (via `execFile`, no shell) and shows the report in the **FastrMemory Guardian** output channel. Only traps linked to files changed against the base branch are reported.
6. **3D Brain Observatory Deep Link**:
   - 1-click command `FastrMemory: Open 3D Brain Observatory` opens the Three.js constellation galaxy directly in your browser.

---

## Installation

### For Cursor & VS Code:
```bash
# Package extension into .vsix
npx @vscode/vsce package --no-dependencies

# Install in Cursor / VS Code
code --install-extension fastrmemory-vscode-0.1.0.vsix
# or in Cursor
cursor --install-extension fastrmemory-vscode-0.1.0.vsix
```

---

## CLI Detection

The Guardian command and the `node:sqlite` fallback spawn the FastrMemory CLI. It is located in this order:

1. The `fastrmemory.cliPath` setting (a binary, or a `.js` entry point run with the system `node`).
2. `<workspace>/node_modules/fastrmemory/dist/bin/fastr.js` (run with the system `node`).
3. On Windows, a global npm install found via `fastrmemory.cmd` on `PATH` (its `node_modules/fastrmemory/dist/bin/fastr.js` is run with `node`, since `.cmd` shims need a shell).
4. `fastrmemory` on `PATH`.

The CLI itself requires Node >= 22.5 on the system `node`.

---

## Commands

- `FastrMemory: Show Active Error Traps` (`fastrmemory.showTraps`)
- `FastrMemory: Open 3D Brain Observatory` (`fastrmemory.openDashboard`)
- `FastrMemory: Run Pre-Merge Trap Guardian` (`fastrmemory.guardWorkspace`)

---

## Configuration

In `settings.json`:
```json
{
  "fastrmemory.enableUnderlines": true,
  "fastrmemory.serverPort": 4242,
  "fastrmemory.cliPath": "",
  "fastrmemory.guardBaseBranch": "origin/main"
}
```

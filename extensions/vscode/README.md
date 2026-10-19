# FastrMemory Guardian (VS Code & Cursor)

Native cognitive status bar pill and error trap guardian extension for **VS Code** and **Cursor**.

![FastrMemory](https://img.shields.io/badge/FastrMemory-Active-brightgreen)
![Status Bar](https://img.shields.io/badge/Status%20Bar-⚡%20Active%20Traps-amber)

---

## Features

1. **⚡ Status Bar Pill**:
   - Shows active trap count in the IDE status bar: `⚡ 3 Traps Active` or `⚡ 1 Trap on File`.
   - Clicking opens an interactive QuickPick listing all active traps, their lessons, and 2.0x boost weights.
2. **Amber Code Underlines**:
   - Files protected by an active `[TRAP]` are underlined in amber.
   - Hovering over line 0 reveals the trap reason, governing lesson, and mitigation protocol.
3. **IDE Problems Integration**:
   - Active error traps appear as non-blocking Warning diagnostics in the VS Code / Cursor Problems panel.
4. **Zero-Daemon Architecture**:
   - Reads directly from local `.fastr/fastr.db` via `node:sqlite`. No background daemons or cloud servers required.
5. **3D Brain Observatory Deep Link**:
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
  "fastrmemory.serverPort": 4242
}
```

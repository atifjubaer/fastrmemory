/**
 * Hook install/uninstall lifecycle.
 *
 * The promise being tested is narrow and checkable: `install` then `uninstall` must leave a
 * project exactly as it was, `uninstall` must never remove a user entry, and both commands must
 * be safe to run twice. A benchmark or a doc claim is only as good as the setup path an agent
 * runs first, so this file pins the setup path.
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {
  HOOK_CLIENTS,
  installHookClients,
  parseHookClients,
  uninstallHookClients
} from '../src/installer/hooks.js';
import { isFastrHookCommand } from '../src/installer/json-config.js';

let dir: string;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-hooks-'));
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

/** Every file under `root`, with its bytes, skipping the one-time install backups. */
function snapshot(root: string): Record<string, string> {
  const output: Record<string, string> = {};
  const walk = (current: string): void => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (entry.name.endsWith('.fastr.bak')) continue;
      output[path.relative(root, full).replace(/\\/g, '/')] = fs.readFileSync(full, 'utf-8');
    }
  };
  walk(root);
  return output;
}

function writeJson(rel: string, value: unknown): void {
  const file = path.join(dir, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, 'utf-8');
}

function readJson(rel: string): any {
  return JSON.parse(fs.readFileSync(path.join(dir, rel), 'utf-8'));
}

describe('parseHookClients', () => {
  it('accepts all, a single id, and a comma-separated list', () => {
    expect(parseHookClients('all')).toEqual(HOOK_CLIENTS);
    expect(parseHookClients(undefined)).toEqual(HOOK_CLIENTS);
    expect(parseHookClients('claude')).toEqual(['claude']);
    expect(parseHookClients('claude, opencode')).toEqual(['claude', 'opencode']);
    expect(parseHookClients('claude,claude')).toEqual(['claude']);
  });

  it('rejects an unknown id instead of silently ignoring it', () => {
    expect(() => parseHookClients('claude,vscode')).toThrow(/unknown client vscode/);
  });
});

describe('hook install/uninstall round trip', () => {
  it('leaves an empty project empty', () => {
    const before = snapshot(dir);
    const installed = installHookClients(dir, HOOK_CLIENTS);
    expect(installed.clients.every((client) => client.status === 'updated')).toBe(true);
    expect(Object.keys(snapshot(dir)).length).toBeGreaterThan(0);

    const removed = uninstallHookClients(dir, HOOK_CLIENTS);
    expect(removed.changed).toBe(true);
    expect(removed.clients.every((client) => client.status === 'removed')).toBe(true);
    expect(snapshot(dir)).toEqual(before);
    // Directories created only for the integration are pruned as well.
    expect(fs.readdirSync(dir)).toEqual([]);
  });

  it('preserves user entries in every shared config file', () => {
    writeJson('.mcp.json', { mcpServers: { other: { command: 'node', args: ['other.js'] } } });
    writeJson('.claude/settings.json', {
      permissions: { allow: ['Bash(npm test)'] },
      hooks: { SessionStart: [{ hooks: [{ type: 'command', command: 'echo user' }] }] }
    });
    writeJson('.cursor/mcp.json', { mcpServers: { other: { command: 'node', args: ['cursor.js'] } } });
    writeJson('.gemini/settings.json', {
      theme: 'dark',
      mcpServers: { other: { command: 'node', args: ['gemini.js'] } },
      hooks: { BeforeTool: [{ matcher: 'write_file', hooks: [{ name: 'user-check', type: 'command', command: 'node user.js' }] }] }
    });
    writeJson('.github/mcp.json', { mcpServers: { other: { type: 'local', command: 'node', args: ['copilot.js'] } } });
    writeJson('.github/hooks/fastrmemory.json', {
      version: 1,
      hooks: { sessionStart: [{ type: 'command', command: 'node user-start.js' }] }
    });
    writeJson('opencode.json', { theme: 'dark', mcp: { servers: { other: { type: 'remote', url: 'https://example.test' } } } });
    fs.writeFileSync(path.join(dir, 'AGENTS.md'), '# Project\n\nRules that must survive.\n', 'utf-8');

    const before = snapshot(dir);
    installHookClients(dir, HOOK_CLIENTS);
    const removed = uninstallHookClients(dir, HOOK_CLIENTS);

    expect(removed.changed).toBe(true);
    const after = snapshot(dir);
    for (const [file, content] of Object.entries(before)) {
      if (file === 'AGENTS.md') {
        expect(after[file]).toBe(content);
        continue;
      }
      expect(JSON.parse(after[file])).toEqual(JSON.parse(content));
    }

    // No FastrMemory residue anywhere.
    const raw = Object.values(after).join('\n');
    expect(raw).not.toMatch(/fastrmemory/i);
  });

  it('is idempotent in both directions', () => {
    const first = installHookClients(dir, HOOK_CLIENTS);
    expect(first.clients.every((client) => client.status === 'updated')).toBe(true);

    const second = installHookClients(dir, HOOK_CLIENTS);
    expect(second.clients.every((client) => client.status === 'present')).toBe(true);
    expect(second.agentsMdUpdated).toBe(false);
    const installed = snapshot(dir);

    const third = installHookClients(dir, HOOK_CLIENTS);
    expect(third.clients.every((client) => client.status === 'present')).toBe(true);
    expect(snapshot(dir)).toEqual(installed);

    uninstallHookClients(dir, HOOK_CLIENTS);
    const removed = snapshot(dir);
    const again = uninstallHookClients(dir, HOOK_CLIENTS);
    expect(again.changed).toBe(false);
    expect(again.agentsMdRemoved).toBe(false);
    expect(again.clients.every((client) => client.status === 'absent')).toBe(true);
    expect(snapshot(dir)).toEqual(removed);
  });

  it('scopes install and uninstall to the requested clients', () => {
    installHookClients(dir, ['claude'], { agentsMd: false });
    expect(fs.existsSync(path.join(dir, '.mcp.json'))).toBe(true);
    expect(fs.existsSync(path.join(dir, '.claude', 'settings.json'))).toBe(true);
    expect(fs.existsSync(path.join(dir, '.cursor'))).toBe(false);
    expect(fs.existsSync(path.join(dir, '.gemini'))).toBe(false);
    expect(fs.existsSync(path.join(dir, '.github'))).toBe(false);
    expect(fs.existsSync(path.join(dir, 'opencode.json'))).toBe(false);
    expect(fs.existsSync(path.join(dir, 'AGENTS.md'))).toBe(false);

    // Uninstalling a different client is a no-op, not a removal.
    const other = uninstallHookClients(dir, ['cursor'], { agentsMd: false });
    expect(other.changed).toBe(false);
    expect(fs.existsSync(path.join(dir, '.mcp.json'))).toBe(true);

    uninstallHookClients(dir, ['claude'], { agentsMd: false });
    expect(fs.readdirSync(dir)).toEqual([]);
  });

  it('does not create a backup while uninstalling', () => {
    installHookClients(dir, ['claude'], { agentsMd: false });
    uninstallHookClients(dir, ['claude'], { agentsMd: false });
    expect(fs.readdirSync(dir).filter((name) => name.endsWith('.fastr.bak'))).toEqual([]);
  });
});

describe('hook uninstall safety', () => {
  it('never removes a user-owned OpenCode plugin', () => {
    const pluginPath = path.join(dir, '.opencode', 'plugins', 'fastrmemory', 'index.ts');
    fs.mkdirSync(path.dirname(pluginPath), { recursive: true });
    fs.writeFileSync(pluginPath, '// user plugin\nexport default {}\n', 'utf-8');

    installHookClients(dir, ['opencode'], { agentsMd: false });
    uninstallHookClients(dir, ['opencode'], { agentsMd: false });

    expect(fs.readFileSync(pluginPath, 'utf-8')).toBe('// user plugin\nexport default {}\n');
  });

  it('leaves a JSONC OpenCode config byte-identical', () => {
    const jsoncPath = path.join(dir, 'opencode.jsonc');
    const original = '{\n  // keep this comment\n  "theme": "dark"\n}\n';
    fs.writeFileSync(jsoncPath, original, 'utf-8');

    const installed = installHookClients(dir, ['opencode'], { agentsMd: false });
    expect(installed.clients[0].status).toBe('updated');
    const removed = uninstallHookClients(dir, ['opencode'], { agentsMd: false });
    expect(removed.clients[0].details.join(' ')).toContain('JSONC');

    expect(fs.readFileSync(jsoncPath, 'utf-8')).toBe(original);
    expect(fs.existsSync(path.join(dir, 'opencode.json'))).toBe(false);
  });

  it('refuses to touch an unparseable config and still cleans the other clients', () => {
    const broken = '{"mcpServers": {';
    fs.writeFileSync(path.join(dir, '.mcp.json'), broken, 'utf-8');

    const installed = installHookClients(dir, HOOK_CLIENTS);
    const claude = installed.clients.find((client) => client.client === 'claude')!;
    expect(claude.status).toBe('error');
    expect(installed.clients.filter((client) => client.status === 'updated').length).toBe(HOOK_CLIENTS.length - 1);

    const removed = uninstallHookClients(dir, HOOK_CLIENTS);
    expect(removed.clients.find((client) => client.client === 'claude')!.status).toBe('error');
    expect(fs.readFileSync(path.join(dir, '.mcp.json'), 'utf-8')).toBe(broken);
  });

  it('removes the legacy bare-string Claude hook form', () => {
    writeJson('.claude/settings.json', {
      hooks: {
        SessionStart: 'fastrmemory hook run SessionStart',
        PreCompact: 'echo user-hook'
      }
    });

    uninstallHookClients(dir, ['claude'], { agentsMd: false });
    const config = readJson('.claude/settings.json');
    expect(config.hooks.SessionStart).toBeUndefined();
    expect(config.hooks.PreCompact).toBe('echo user-hook');
  });

  it('keeps a Copilot hook file that still holds user hooks', () => {
    writeJson('.github/hooks/fastrmemory.json', {
      version: 1,
      hooks: { sessionStart: [{ type: 'command', command: 'node user-start.js' }] }
    });

    installHookClients(dir, ['copilot'], { agentsMd: false });
    uninstallHookClients(dir, ['copilot'], { agentsMd: false });

    const hooks = readJson('.github/hooks/fastrmemory.json');
    expect(hooks.version).toBe(1);
    expect(hooks.hooks.sessionStart).toEqual([{ type: 'command', command: 'node user-start.js' }]);
    const commands = JSON.stringify(hooks);
    expect(isFastrHookCommand(commands)).toBe(false);
  });

  it('deletes the Copilot hook file when only the version key is left', () => {
    installHookClients(dir, ['copilot'], { agentsMd: false });
    uninstallHookClients(dir, ['copilot'], { agentsMd: false });
    expect(fs.existsSync(path.join(dir, '.github', 'hooks', 'fastrmemory.json'))).toBe(false);
    expect(fs.existsSync(path.join(dir, '.github', 'mcp.json'))).toBe(false);
  });

  it('deletes AGENTS.md when the discipline block was its only content', () => {
    installHookClients(dir, ['claude'], { agentsMd: true });
    expect(fs.readFileSync(path.join(dir, 'AGENTS.md'), 'utf-8')).toContain('<!-- fastrmemory:start -->');
    uninstallHookClients(dir, ['claude'], { agentsMd: true });
    expect(fs.existsSync(path.join(dir, 'AGENTS.md'))).toBe(false);
  });

  it('restores AGENTS.md text around the block without touching other lines', () => {
    const original = '# Project\n\n- rule one\n- rule two\n';
    fs.writeFileSync(path.join(dir, 'AGENTS.md'), original, 'utf-8');
    installHookClients(dir, [], { agentsMd: true });
    expect(fs.readFileSync(path.join(dir, 'AGENTS.md'), 'utf-8').startsWith(original.trimEnd())).toBe(true);
    uninstallHookClients(dir, [], { agentsMd: true });
    expect(fs.readFileSync(path.join(dir, 'AGENTS.md'), 'utf-8')).toBe(original);
  });

  it('removes every hook command it wrote and nothing else', () => {
    writeJson('.claude/settings.json', {
      hooks: {
        PreToolUse: [
          { matcher: 'Edit', hooks: [{ type: 'command', command: 'node user-guard.js' }] },
          { matcher: 'Write', hooks: [{ type: 'command', command: 'fastrmemory hook run PreToolUse' }] }
        ]
      }
    });

    installHookClients(dir, ['claude'], { agentsMd: false });
    uninstallHookClients(dir, ['claude'], { agentsMd: false });

    const config = readJson('.claude/settings.json');
    const groups = config.hooks.PreToolUse;
    expect(groups).toHaveLength(1);
    expect(groups[0].hooks).toEqual([{ type: 'command', command: 'node user-guard.js' }]);
  });
});

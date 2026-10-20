import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import {
  ConfigParseError,
  isFastrHookCommand,
  mergeClaudeHooks,
  updateJsonConfig,
  upsertMcpServer,
} from '../src/installer/json-config.js';
import { buildHookCommand, claudeHookSpecs, installAgentHooks } from '../src/installer/hooks.js';
import { resolveMcpCommand } from '../src/installer/setup.js';
import { extractTargetFiles, toClaudeHookStdout } from '../src/hooks/runner.js';

describe('Installer config safety', () => {
  let dir: string;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-installer-'));
  });

  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('refuses to overwrite a config file it cannot parse', () => {
    const file = path.join(dir, 'settings.json');
    const original = '{\n  // user comment\n  "theme": "dark",\n}\n';
    fs.writeFileSync(file, original);

    expect(() => updateJsonConfig(file, (c) => upsertMcpServer(c, 'fastrmemory', { command: 'x', args: [] })))
      .toThrow(ConfigParseError);
    expect(fs.readFileSync(file, 'utf-8')).toBe(original);
  });

  it('merges into existing config, keeps other keys, and writes a one-time backup', () => {
    const file = path.join(dir, 'claude.json');
    const original = { numStartups: 42, mcpServers: { other: { command: 'other', args: ['serve'] } } };
    fs.writeFileSync(file, JSON.stringify(original));

    const res = updateJsonConfig(file, (c) => upsertMcpServer(c, 'fastrmemory', { command: 'node', args: ['cli.js', 'mcp'] }));
    expect(res.changed).toBe(true);
    expect(res.backupPath && JSON.parse(fs.readFileSync(res.backupPath, 'utf-8'))).toEqual(original);

    const written = JSON.parse(fs.readFileSync(file, 'utf-8'));
    expect(written.numStartups).toBe(42);
    expect(written.mcpServers.other).toEqual(original.mcpServers.other);
    expect(written.mcpServers.fastrmemory.args).toEqual(['cli.js', 'mcp']);
    expect(fs.readdirSync(dir).some((f) => f.endsWith('.tmp'))).toBe(false);

    // Second identical run is a no-op
    const again = updateJsonConfig(file, (c) => upsertMcpServer(c, 'fastrmemory', { command: 'node', args: ['cli.js', 'mcp'] }));
    expect(again.changed).toBe(false);
  });

  it('writes Claude Code hooks in the nested schema and preserves user hooks', () => {
    const config: Record<string, any> = {
      hooks: {
        SessionStart: [{ hooks: [{ type: 'command', command: 'echo user-hook' }] }],
        // Invalid bare-string form written by older fastrmemory versions
        PreCompact: 'fastrmemory hook run PreCompact',
      },
    };
    mergeClaudeHooks(config, claudeHookSpecs('linux'));
    mergeClaudeHooks(config, claudeHookSpecs('linux')); // idempotent

    for (const event of ['SessionStart', 'PreToolUse', 'PreCompact', 'SessionEnd']) {
      const groups = config.hooks[event];
      expect(Array.isArray(groups)).toBe(true);
      for (const group of groups) {
        expect(Array.isArray(group.hooks)).toBe(true);
        for (const h of group.hooks) {
          expect(h.type).toBe('command');
          expect(typeof h.command).toBe('string');
        }
      }
      const ours = groups.flatMap((g: any) => g.hooks).filter((h: any) => isFastrHookCommand(h.command));
      expect(ours).toHaveLength(1);
    }

    const sessionStartCommands = config.hooks.SessionStart.flatMap((g: any) => g.hooks.map((h: any) => h.command));
    expect(sessionStartCommands).toContain('echo user-hook');
    expect(config.hooks.PreToolUse[0].matcher).toContain('Edit');
    expect(config.hooks.SessionEnd[0].hooks[0].timeout).toBeGreaterThan(1.5);
  });

  it('recognises hook commands from every install form', () => {
    expect(isFastrHookCommand('fastrmemory hook run SessionStart')).toBe(true);
    expect(isFastrHookCommand('node "C:/a b/dist/bin/fastr.js" hook run PreToolUse')).toBe(true);
    expect(isFastrHookCommand('npx -y @atifjubaer/fastrmemory hook run SessionEnd')).toBe(true);
    expect(isFastrHookCommand('echo hook run')).toBe(false);
    const cmd = buildHookCommand('SessionStart', 'linux');
    expect(cmd).toMatch(/hook run SessionStart$/);
    expect(cmd).not.toContain('\\'); // backslashes would be eaten by Git Bash on Windows
    expect(isFastrHookCommand(cmd)).toBe(true);
  });

  it('never points MCP clients at the bare .cmd shim on Windows', () => {
    const target = resolveMcpCommand('win32');
    expect(target.command === 'node' || target.command === 'cmd').toBe(true);
    expect(target.args).toContain('mcp');
  });

  it('installAgentHooks writes project-scoped .mcp.json and .claude/settings.json only', () => {
    const settingsPath = path.join(dir, '.claude', 'settings.json');
    fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
    fs.writeFileSync(settingsPath, JSON.stringify({ permissions: { allow: ['Bash(npm test)'] } }));

    const res = installAgentHooks(dir);
    expect(res.claudeCodeUpdated).toBe(true);

    const mcp = JSON.parse(fs.readFileSync(path.join(dir, '.mcp.json'), 'utf-8'));
    expect(mcp.mcpServers.fastrmemory.args).toContain('mcp');

    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
    expect(settings.permissions.allow).toEqual(['Bash(npm test)']);
    expect(settings.mcpServers).toBeUndefined();
    expect(Array.isArray(settings.hooks.SessionStart)).toBe(true);
  });
});

describe('Claude Code hook I/O', () => {
  it('reads absolute tool_input.file_path from Claude hook stdin as a project-relative path', () => {
    const root = path.resolve(os.tmpdir(), 'proj');
    const files = extractTargetFiles(
      { hook_event_name: 'PreToolUse', tool_name: 'Edit', tool_input: { file_path: path.join(root, 'src', 'auth', 'jwt.ts') } },
      root
    );
    expect(files).toEqual(['src/auth/jwt.ts']);
    expect(extractTargetFiles({ files: ['src\\a.ts'] }, root)).toEqual(['src/a.ts']);
  });

  it('formats PreToolUse warnings as additionalContext JSON and SessionStart as plain text', () => {
    const pre = toClaudeHookStdout('PreToolUse', { output: 'TRAP!' });
    expect(JSON.parse(pre!)).toEqual({ hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: 'TRAP!' } });
    expect(toClaudeHookStdout('SessionStart', { output: 'hello' })).toBe('hello');
    expect(toClaudeHookStdout('SessionEnd', { output: 'x' })).toBeNull();
    expect(toClaudeHookStdout('PreToolUse', {})).toBeNull();
  });
});

describe('runInteractiveSetup in a sandbox', () => {
  it('connects present clients, skips absent ones, and never clobbers an unparseable ~/.claude.json', async () => {
    const { runInteractiveSetup } = await import('../src/installer/setup.js');
    const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-setup-'));
    const home = path.join(sandbox, 'home');
    const project = path.join(sandbox, 'project');
    fs.mkdirSync(path.join(home, '.claude'), { recursive: true });
    fs.mkdirSync(project, { recursive: true });
    const brokenClaudeJson = '{"projects": {'; // torn write while Claude Code was saving
    fs.writeFileSync(path.join(home, '.claude.json'), brokenClaudeJson);

    const logs: string[] = [];
    const origLog = console.log;
    console.log = (...args: any[]) => { logs.push(args.join(' ')); };
    try {
      runInteractiveSetup({ homeDir: home, projectRoot: project });
    } finally {
      console.log = origLog;
      // Release the project DB before cleanup on Windows
    }

    try {
      expect(fs.readFileSync(path.join(home, '.claude.json'), 'utf-8')).toBe(brokenClaudeJson);
      expect(logs.some((l) => l.includes('Claude Code') && l.includes('Refusing to modify'))).toBe(true);
      expect(logs.some((l) => l.includes('Windsurf') && l.includes('Skipped'))).toBe(true);
      expect(fs.existsSync(path.join(home, '.codeium'))).toBe(false);
      const cursor = JSON.parse(fs.readFileSync(path.join(project, '.cursor', 'mcp.json'), 'utf-8'));
      expect(cursor.mcpServers.fastrmemory.args).toContain('mcp');
    } finally {
      try { fs.rmSync(sandbox, { recursive: true, force: true }); } catch {}
    }
  });
});

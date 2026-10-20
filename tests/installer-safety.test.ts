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
import { installGemini } from '../src/installer/gemini.js';
import { installOpenCode } from '../src/installer/opencode.js';
import { resolveMcpCommand } from '../src/installer/setup.js';
import { extractTargetFiles, toClaudeHookStdout, toGeminiHookStdout } from '../src/hooks/runner.js';

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

    const gemini = buildHookCommand('SessionStart', 'linux', 'gemini');
    expect(gemini).toMatch(/hook run SessionStart --format gemini$/);
    expect(gemini).not.toContain(' mcp ');
    expect(isFastrHookCommand(gemini)).toBe(true);
  });

  it('never points MCP clients at the bare .cmd shim on Windows', () => {
    const target = resolveMcpCommand('win32');
    expect(target.command === 'node' || target.command === 'cmd').toBe(true);
    expect(target.args).toContain('mcp');
  });

  it('installAgentHooks writes project-scoped MCP config and Claude hooks', () => {
    const settingsPath = path.join(dir, '.claude', 'settings.json');
    fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
    fs.writeFileSync(settingsPath, JSON.stringify({ permissions: { allow: ['Bash(npm test)'] } }));

    const res = installAgentHooks(dir);
    expect(res.claudeCodeUpdated).toBe(true);
    expect(res.geminiUpdated).toBe(true);
    expect(res.openCodeUpdated).toBe(true);

    const mcp = JSON.parse(fs.readFileSync(path.join(dir, '.mcp.json'), 'utf-8'));
    expect(mcp.mcpServers.fastrmemory.args).toContain('mcp');

    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
    expect(settings.permissions.allow).toEqual(['Bash(npm test)']);
    expect(settings.mcpServers).toBeUndefined();
    expect(Array.isArray(settings.hooks.SessionStart)).toBe(true);

    const gemini = JSON.parse(fs.readFileSync(path.join(dir, '.gemini', 'settings.json'), 'utf-8'));
    expect(gemini.mcpServers.fastrmemory.args).toContain('mcp');
    expect(gemini.hooks.BeforeTool[0].matcher).toBe('write_file|replace');
    expect(gemini.hooks.SessionStart.flatMap((group: any) => group.hooks)
      .some((hook: any) => hook.command.includes('--format gemini'))).toBe(true);

    const openCode = JSON.parse(fs.readFileSync(path.join(dir, 'opencode.json'), 'utf-8'));
    expect(openCode.mcp.servers.fastrmemory.command).toContain('mcp');
    expect(fs.existsSync(path.join(dir, '.opencode', 'plugins', 'fastrmemory', 'index.ts'))).toBe(true);

    const again = installAgentHooks(dir);
    expect(again.geminiUpdated).toBe(false);
    expect(again.openCodeUpdated).toBe(false);
  });

  it('writes Gemini CLI settings idempotently and preserves user hooks', () => {
    const settingsPath = path.join(dir, '.gemini', 'settings.json');
    fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
    fs.writeFileSync(settingsPath, JSON.stringify({
      theme: 'dark',
      mcpServers: { other: { command: 'other', args: ['serve'] } },
      hooks: {
        BeforeTool: [{
          matcher: 'write_file',
          hooks: [
            { name: 'user-check', type: 'command', command: 'node user-check.js' },
            { name: 'old-fastr', type: 'command', command: 'fastrmemory hook run PreToolUse' }
          ]
        }],
        SessionStart: 'fastrmemory hook run SessionStart'
      }
    }));

    const first = installGemini(dir, { command: 'node', args: ['cli.js', 'mcp'] });
    expect(first.changed).toBe(true);
    const second = installGemini(dir, { command: 'node', args: ['cli.js', 'mcp'] });
    expect(second.changed).toBe(false);

    const config = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
    expect(config.theme).toBe('dark');
    expect(config.mcpServers.other).toEqual({ command: 'other', args: ['serve'] });
    expect(config.mcpServers.fastrmemory).toEqual({ command: 'node', args: ['cli.js', 'mcp'] });

    const beforeToolHooks = config.hooks.BeforeTool.flatMap((group: any) => group.hooks);
    expect(beforeToolHooks.filter((hook: any) => isFastrHookCommand(hook.command))).toHaveLength(1);
    expect(beforeToolHooks.some((hook: any) => hook.name === 'user-check')).toBe(true);
    expect(beforeToolHooks.filter((hook: any) => isFastrHookCommand(hook.command))[0].command)
      .toContain('--format gemini');
    expect(config.hooks.BeforeTool[0].matcher).toBe('write_file');

    const sessionStartHooks = config.hooks.SessionStart.flatMap((group: any) => group.hooks);
    expect(sessionStartHooks.filter((hook: any) => isFastrHookCommand(hook.command))).toHaveLength(1);
    expect(sessionStartHooks[0].name).toBe('fastrmemory-session-start');
  });

  it('writes an OpenCode V2 MCP server and managed plugin without touching other settings', () => {
    const configPath = path.join(dir, 'opencode.json');
    fs.writeFileSync(configPath, JSON.stringify({
      theme: 'dark',
      plugins: ['company-plugin'],
      mcp: { servers: { other: { type: 'remote', url: 'https://mcp.example.com' } } }
    }));

    const res = installOpenCode(dir, { command: 'node', args: ['cli.js', 'mcp'] });
    expect(res.changed).toBe(true);
    expect(res.configSkipped).toBeUndefined();

    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(config.theme).toBe('dark');
    expect(config.plugins).toEqual(['company-plugin']);
    expect(config.mcp.servers.other).toEqual({ type: 'remote', url: 'https://mcp.example.com' });
    expect(config.mcp.servers.fastrmemory).toEqual({
      type: 'local',
      command: ['node', 'cli.js', 'mcp']
    });

    const plugin = fs.readFileSync(path.join(dir, '.opencode', 'plugins', 'fastrmemory', 'index.ts'), 'utf-8');
    expect(plugin.startsWith('// fastrmemory:managed')).toBe(true);
    expect(plugin).toContain('ctx.session.hook("context"');
    expect(plugin).toContain('ctx.session.hook("compaction"');
    expect(plugin).toContain('"hook", "run", event');
    expect(plugin).toContain('const FASTR_COMMAND = ["node","cli.js"]');
    expect(plugin).not.toContain('const FASTR_COMMAND = ["node","cli.js","mcp"]');

    const again = installOpenCode(dir, { command: 'node', args: ['cli.js', 'mcp'] });
    expect(again.changed).toBe(false);
  });

  it('does not overwrite a user-owned OpenCode plugin', () => {
    const pluginPath = path.join(dir, '.opencode', 'plugins', 'fastrmemory', 'index.ts');
    fs.mkdirSync(path.dirname(pluginPath), { recursive: true });
    fs.writeFileSync(pluginPath, '// custom user plugin\nexport default {}\n');

    const res = installOpenCode(dir, { command: 'node', args: ['cli.js', 'mcp'] });
    expect(res.pluginChanged).toBe(false);
    expect(res.pluginSkipped).toContain('not overwritten');
    expect(fs.readFileSync(pluginPath, 'utf-8')).toBe('// custom user plugin\nexport default {}\n');
  });

  it('never rewrites an OpenCode JSONC config it cannot parse', () => {
    const jsoncPath = path.join(dir, 'opencode.jsonc');
    const original = '{\n  // keep this comment\n  "theme": "dark"\n}\n';
    fs.writeFileSync(jsoncPath, original);

    const res = installOpenCode(dir, { command: 'node', args: ['cli.js', 'mcp'] });
    expect(res.configSkipped).toContain('JSONC');
    expect(fs.readFileSync(jsoncPath, 'utf-8')).toBe(original);
    expect(fs.existsSync(path.join(dir, 'opencode.json'))).toBe(false);
    expect(res.pluginChanged).toBe(true);
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

  it('formats Gemini hook output as strict JSON', () => {
    const session = JSON.parse(toGeminiHookStdout('SessionStart', { output: 'context' })!);
    expect(session).toEqual({
      hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: 'context' }
    });

    const pre = JSON.parse(toGeminiHookStdout('PreToolUse', { output: 'TRAP!' })!);
    expect(pre.systemMessage).toBe('TRAP!');
    expect(pre.hookSpecificOutput).toEqual({
      hookEventName: 'BeforeTool',
      additionalContext: 'TRAP!'
    });

    expect(JSON.parse(toGeminiHookStdout('PreToolUse', { message: 'safe' })!)).toEqual({});
    expect(JSON.parse(toGeminiHookStdout('PreCompact', { message: 'snapshot' })!))
      .toEqual({ systemMessage: 'snapshot' });
    expect(JSON.parse(toGeminiHookStdout('SessionEnd', { message: 'done' })!))
      .toEqual({ systemMessage: 'done' });
    expect(toGeminiHookStdout('UnknownEvent', { output: 'x' })).toBeNull();
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

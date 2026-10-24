import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { execFileSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {
  PROJECT_ALL_CLIENTS,
  USER_ALL_CLIENTS,
  buildLocalMcpEntry,
  buildRegistryMcpEntry,
  formatMcpInitResult,
  initMcpClients,
  isPortableRegistryEntry,
  parseMcpClients,
  parseMcpSource,
} from '../src/installer/mcp-init.js';
import { PACKAGE_VERSION } from '../src/version.js';
import { ConfigParseError } from '../src/installer/json-config.js';

describe('shadcn-style MCP init', () => {
  let dir: string;
  let home: string;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-mcp-init-'));
    home = path.join(dir, 'home');
    fs.mkdirSync(home, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('builds a portable latest entry for every package runner', () => {
    expect(buildRegistryMcpEntry({ channel: 'latest', runner: 'npx', platform: 'linux' })).toEqual({
      command: 'npx',
      args: ['-y', 'fastrmemory@latest', 'mcp', '--profile', 'core'],
    });
    expect(buildRegistryMcpEntry({ channel: 'latest', runner: 'pnpm', platform: 'linux' })).toEqual({
      command: 'pnpm',
      args: ['dlx', 'fastrmemory@latest', 'mcp', '--profile', 'core'],
    });
    expect(buildRegistryMcpEntry({ channel: 'latest', runner: 'yarn', platform: 'linux' })).toEqual({
      command: 'yarn',
      args: ['dlx', 'fastrmemory@latest', 'mcp', '--profile', 'core'],
    });
    expect(buildRegistryMcpEntry({ channel: 'latest', runner: 'bunx', platform: 'linux' })).toEqual({
      command: 'bunx',
      args: ['fastrmemory@latest', 'mcp', '--profile', 'core'],
    });
  });

  it('pins the full profile explicitly when requested', () => {
    expect(buildRegistryMcpEntry({ runner: 'npx', profile: 'full', platform: 'linux' })).toEqual({
      command: 'npx',
      args: ['-y', 'fastrmemory@latest', 'mcp', '--profile', 'full'],
    });
    expect(buildLocalMcpEntry({ platform: 'linux', cliPath: '/opt/fastr.js', profile: 'full' })).toEqual({
      command: 'node',
      args: ['/opt/fastr.js', 'mcp', '--profile', 'full'],
    });
  });

  it('pins the exact package and appends the core profile when requested', () => {
    const entry = buildRegistryMcpEntry({
      channel: 'pinned',
      runner: 'npx',
      profile: 'core',
      platform: 'linux',
    });
    expect(entry).toEqual({
      command: 'npx',
      args: ['-y', `fastrmemory@${PACKAGE_VERSION}`, 'mcp', '--profile', 'core'],
    });
    expect(isPortableRegistryEntry(entry)).toBe(true);
  });

  it('builds a local entry from the active CLI and appends the core profile', () => {
    expect(buildLocalMcpEntry({ platform: 'linux', cliPath: '/opt/fastr.js', profile: 'core' })).toEqual({
      command: 'node',
      args: ['/opt/fastr.js', 'mcp', '--profile', 'core'],
    });
  });

  it('falls back to the registry when the active CLI is an ephemeral npx copy', () => {
    const entry = buildLocalMcpEntry({
      platform: 'linux',
      cliPath: '/tmp/_npx/abc/node_modules/fastrmemory/dist/bin/fastr.js',
    });
    expect(entry.command).toBe('npx');
    expect(entry.args).toContain(`fastrmemory@${PACKAGE_VERSION}`);
  });

  it('parses registry and local sources and rejects unknown values', () => {
    expect(parseMcpSource('registry')).toBe('registry');
    expect(parseMcpSource('local')).toBe('local');
    expect(() => parseMcpSource('github')).toThrow(/Source must be/);
  });

  it('writes a local source config with the active CLI and absolute project root', () => {
    const results = initMcpClients({
      clients: ['claude'],
      scope: 'project',
      source: 'local',
      cliPath: '/opt/fastr.js',
      projectRoot: dir,
      homeDir: home,
      platform: 'linux',
      profile: 'core',
    });
    expect(results[0].source).toBe('local');
    expect(results[0].entry.command).toBe('node');
    expect(results[0].entry.args).toContain('--project');
    expect(results[0].entry.args).toContain(path.resolve(dir));
    expect(results[0].entry.args).toContain('--profile');

    const config = JSON.parse(fs.readFileSync(path.join(dir, '.mcp.json'), 'utf-8'));
    expect(config.mcpServers.fastrmemory).toEqual(results[0].entry);
  });

  it('wraps every package runner in cmd /c on Windows', () => {
    const entry = buildRegistryMcpEntry({ channel: 'latest', runner: 'pnpm', platform: 'win32' });
    expect(entry).toEqual({
      command: 'cmd',
      args: ['/c', 'pnpm', 'dlx', 'fastrmemory@latest', 'mcp', '--profile', 'core'],
    });
  });

  it('expands all clients by scope and rejects unknown ids', () => {
    expect(parseMcpClients('all', 'project')).toEqual(PROJECT_ALL_CLIENTS);
    expect(parseMcpClients('all', 'user')).toEqual(USER_ALL_CLIENTS);
    expect(parseMcpClients('claude, cursor,claude', 'project')).toEqual(['claude', 'cursor']);
    expect(() => parseMcpClients('unknown', 'project')).toThrow(/Unknown client/);
  });

  it('writes project configs for every supported client and preserves unrelated keys', () => {
    fs.writeFileSync(path.join(dir, '.mcp.json'), JSON.stringify({
      permissions: { allow: ['Bash(npm test)'] },
      mcpServers: { other: { command: 'other', args: ['serve'] } },
    }));
    fs.mkdirSync(path.join(dir, '.vscode'), { recursive: true });
    fs.writeFileSync(path.join(dir, '.vscode', 'mcp.json'), JSON.stringify({
      inputs: [{ id: 'token', type: 'promptString' }],
      servers: { other: { command: 'other', args: ['serve'] } },
    }));
    fs.writeFileSync(path.join(dir, 'opencode.json'), JSON.stringify({
      theme: 'dark',
      mcp: { servers: { other: { type: 'remote', url: 'https://example.test/mcp' } } },
    }));

    const clients = PROJECT_ALL_CLIENTS;
    const first = initMcpClients({
      clients,
      scope: 'project',
      projectRoot: dir,
      homeDir: home,
      platform: 'linux',
    });
    expect(first.every((result) => result.changed)).toBe(true);

    const claude = JSON.parse(fs.readFileSync(path.join(dir, '.mcp.json'), 'utf-8'));
    expect(claude.permissions.allow).toEqual(['Bash(npm test)']);
    expect(claude.mcpServers.other).toEqual({ command: 'other', args: ['serve'] });
    expect(claude.mcpServers.fastrmemory).toEqual({
      command: 'npx',
      args: ['-y', 'fastrmemory@latest', 'mcp', '--profile', 'core'],
    });

    const cursor = JSON.parse(fs.readFileSync(path.join(dir, '.cursor', 'mcp.json'), 'utf-8'));
    expect(cursor.mcpServers.fastrmemory.command).toBe('npx');

    const vscode = JSON.parse(fs.readFileSync(path.join(dir, '.vscode', 'mcp.json'), 'utf-8'));
    expect(vscode.inputs).toEqual([{ id: 'token', type: 'promptString' }]);
    expect(vscode.servers.other).toEqual({ command: 'other', args: ['serve'] });
    expect(vscode.servers.fastrmemory.args).toContain('mcp');

    const opencode = JSON.parse(fs.readFileSync(path.join(dir, 'opencode.json'), 'utf-8'));
    expect(opencode.theme).toBe('dark');
    expect(opencode.mcp.servers.other).toEqual({ type: 'remote', url: 'https://example.test/mcp' });
    expect(opencode.mcp.servers.fastrmemory).toEqual({
      type: 'local',
      command: ['npx', '-y', 'fastrmemory@latest', 'mcp', '--profile', 'core'],
    });

    const gemini = JSON.parse(fs.readFileSync(path.join(dir, '.gemini', 'settings.json'), 'utf-8'));
    expect(gemini.mcpServers.fastrmemory.command).toBe('npx');

    const copilot = JSON.parse(fs.readFileSync(path.join(dir, '.github', 'mcp.json'), 'utf-8'));
    expect(copilot.mcpServers.fastrmemory).toEqual({
      type: 'local',
      command: 'npx',
      args: ['-y', 'fastrmemory@latest', 'mcp', '--profile', 'core'],
    });

    const second = initMcpClients({
      clients,
      scope: 'project',
      projectRoot: dir,
      homeDir: home,
      platform: 'linux',
    });
    expect(second.every((result) => !result.changed)).toBe(true);
  });

  it('writes user configs with an explicit project root and prints Codex TOML', () => {
    const project = path.join(dir, 'project with spaces');
    fs.mkdirSync(project);
    const clients = ['claude', 'cursor', 'vscode', 'gemini', 'windsurf', 'antigravity', 'claude-desktop', 'codex'] as const;
    const results = initMcpClients({
      clients: [...clients],
      scope: 'user',
      projectRoot: project,
      homeDir: home,
      platform: 'linux',
      channel: 'pinned',
    });

    const expectedProject = path.resolve(project);
    for (const result of results) {
      expect(result.entry.args).toContain('--project');
      expect(result.entry.args[result.entry.args.indexOf('--project') + 1]).toBe(expectedProject);
    }

    const claude = JSON.parse(fs.readFileSync(path.join(home, '.claude.json'), 'utf-8'));
    expect(claude.mcpServers.fastrmemory.args).toContain(expectedProject);
    const cursor = JSON.parse(fs.readFileSync(path.join(home, '.cursor', 'mcp.json'), 'utf-8'));
    expect(cursor.mcpServers.fastrmemory.args).toContain(expectedProject);
    const vscode = JSON.parse(fs.readFileSync(path.join(home, '.config', 'Code', 'User', 'mcp.json'), 'utf-8'));
    expect(vscode.servers.fastrmemory.args).toContain(expectedProject);
    const gemini = JSON.parse(fs.readFileSync(path.join(home, '.gemini', 'settings.json'), 'utf-8'));
    expect(gemini.mcpServers.fastrmemory.args).toContain(expectedProject);
    expect(fs.existsSync(path.join(home, '.codeium', 'windsurf', 'mcp_config.json'))).toBe(true);
    expect(fs.existsSync(path.join(home, '.gemini', 'antigravity', 'mcp_config.json'))).toBe(true);
    const desktop = results.find((result) => result.client === 'claude-desktop');
    expect(desktop && fs.existsSync(desktop.filePath)).toBe(true);

    const codex = results.find((result) => result.client === 'codex');
    expect(codex?.manual).toContain('[mcp_servers.fastrmemory]');
    expect(codex?.manual).toContain(`fastrmemory@${PACKAGE_VERSION}`);
    expect(codex?.manual).toContain(expectedProject.replace(/\\/g, '\\\\'));
    expect(fs.existsSync(path.join(home, '.codex', 'config.toml'))).toBe(false);
  });

  it('rejects scope combinations a client cannot support', () => {
    expect(() => initMcpClients({ clients: ['opencode'], scope: 'user', projectRoot: dir, homeDir: home }))
      .toThrow(/does not support user-scoped/);
    expect(() => initMcpClients({ clients: ['copilot'], scope: 'user', projectRoot: dir, homeDir: home }))
      .toThrow(/does not support user-scoped/);
    expect(() => initMcpClients({ clients: ['windsurf'], scope: 'project', projectRoot: dir, homeDir: home }))
      .toThrow(/does not support project-scoped/);
    expect(() => initMcpClients({ clients: ['codex'], scope: 'project', projectRoot: dir, homeDir: home }))
      .toThrow(/does not support project-scoped/);
    expect(() => initMcpClients({ clients: ['claude', 'opencode'], scope: 'user', projectRoot: dir, homeDir: home }))
      .toThrow(/does not support user-scoped/);
    expect(fs.existsSync(path.join(home, '.claude.json'))).toBe(false);
  });

  it('does not overwrite invalid JSON and does not write during a dry run', () => {
    const file = path.join(dir, '.mcp.json');
    const original = '{\n  // user comment\n  "mcpServers": {}\n}\n';
    fs.writeFileSync(file, original);
    expect(() => initMcpClients({ clients: ['claude'], projectRoot: dir, homeDir: home }))
      .toThrow(ConfigParseError);
    expect(fs.readFileSync(file, 'utf-8')).toBe(original);

    const dry = initMcpClients({ clients: ['cursor'], projectRoot: dir, homeDir: home, dryRun: true });
    expect(dry[0].dryRun).toBe(true);
    expect(fs.existsSync(path.join(dir, '.cursor', 'mcp.json'))).toBe(false);
    expect(formatMcpInitResult(dry[0])).toContain('would write');
  });

  it('skips an OpenCode JSONC config instead of rewriting it', () => {
    const jsonc = path.join(dir, 'opencode.jsonc');
    const original = '{\n  // keep this comment\n  "theme": "dark"\n}\n';
    fs.writeFileSync(jsonc, original);

    const [result] = initMcpClients({ clients: ['opencode'], projectRoot: dir, homeDir: home });
    expect(result.skipped).toContain('JSONC');
    expect(fs.readFileSync(jsonc, 'utf-8')).toBe(original);
    expect(fs.existsSync(path.join(dir, 'opencode.json'))).toBe(false);
  });

  it('formats a readable result for a manual Codex snippet', () => {
    const [result] = initMcpClients({ clients: ['codex'], scope: 'user', projectRoot: dir, homeDir: home });
    const text = formatMcpInitResult(result);
    expect(text).toContain('add this to');
    expect(text).toContain('[mcp_servers.fastrmemory]');
  });

  it('parses the subcommand --project option without the parent mcp option consuming it', () => {
    const tsx = path.resolve('node_modules', 'tsx', 'dist', 'cli.mjs');
    const output = execFileSync(
      process.execPath,
      [tsx, path.resolve('bin', 'fastr.ts'), 'mcp', 'init', '--client', 'claude', '--project', dir, '--dry-run', '--json'],
      { encoding: 'utf8' }
    );
    const parsed = JSON.parse(output);
    expect(parsed.results[0].filePath).toBe(path.join(dir, '.mcp.json'));
    expect(parsed.results[0].dryRun).toBe(true);
  });
});

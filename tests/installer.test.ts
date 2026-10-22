import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { getAntigravityConfigPath, getClaudeDesktopConfigPath, resolveMcpCommand } from '../src/installer/setup.js';
import { PACKAGE_VERSION } from '../src/version.js';

describe('Installer & MCP Multi-Client Configuration', () => {
  it('correctly resolves Antigravity configuration path', () => {
    const agPath = getAntigravityConfigPath();
    expect(agPath).toContain('.gemini');
    expect(agPath).toContain('antigravity');
    expect(agPath.endsWith('mcp_config.json')).toBe(true);
  });

  it('correctly resolves Claude Desktop configuration path per platform', () => {
    const cdPath = getClaudeDesktopConfigPath();
    expect(cdPath).toContain('Claude');
    expect(cdPath.endsWith('claude_desktop_config.json')).toBe(true);
  });

  it('resolves valid MCP command invocation target', () => {
    const target = resolveMcpCommand();
    expect(target).toHaveProperty('command');
    expect(target).toHaveProperty('args');
    expect(Array.isArray(target.args)).toBe(true);
    expect(target.args).toContain('mcp');
  });

  it('pins the ephemeral npx fallback to the registry package version', () => {
    const npxCli = '/home/user/.npm/_npx/abc123/node_modules/fastrmemory/dist/bin/fastr.js';
    const target = resolveMcpCommand('linux', npxCli);
    expect(target).toEqual({
      command: 'npx',
      args: ['-y', `fastrmemory@${PACKAGE_VERSION}`, 'mcp']
    });
    expect(target.args.join(' ')).not.toContain('github:');
  });

  it('wraps the ephemeral npx fallback in cmd /c on Windows', () => {
    const npxCli = 'C:\\Users\\user\\AppData\\Local\\npm-cache\\_npx\\abc123\\node_modules\\fastrmemory\\dist\\bin\\fastr.js';
    const target = resolveMcpCommand('win32', npxCli);
    expect(target).toEqual({
      command: 'cmd',
      args: ['/c', 'npx', '-y', `fastrmemory@${PACKAGE_VERSION}`, 'mcp']
    });
  });

  it('safely serializes mcpServers object into config files without destroying existing tools', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-test-mcp-'));
    const configPath = path.join(tmpDir, 'mcp_config.json');

    // Simulate existing config with other-memory
    const existing = {
      mcpServers: {
        'other-memory': { command: 'other-memory', args: ['mcp'] },
      },
    };
    fs.writeFileSync(configPath, JSON.stringify(existing, null, 2), 'utf-8');

    // Inject fastrmemory
    const parsed = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    parsed.mcpServers.fastrmemory = {
      command: 'fastrmemory',
      args: ['mcp'],
    };
    fs.writeFileSync(configPath, JSON.stringify(parsed, null, 2), 'utf-8');

    const result = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(result.mcpServers['other-memory']).toBeDefined();
    expect(result.mcpServers['fastrmemory']).toBeDefined();
    expect(result.mcpServers['fastrmemory'].command).toBe('fastrmemory');

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('locates planetary skills directory and installs all skills', async () => {
    const { findSkillsDir, installSkills } = await import('../src/installer/setup.js');
    const skillsDir = findSkillsDir();
    expect(skillsDir).not.toBeNull();
    expect(fs.existsSync(skillsDir!)).toBe(true);

    // Install into a sandbox: running the suite must never write into the developer's real ~/.claude or ~/.gemini.
    const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-test-skills-'));
    try {
      const counts = installSkills({ homeDir: path.join(sandbox, 'home'), projectRoot: path.join(sandbox, 'project') });
      expect(counts.antigravityCount).toBeGreaterThanOrEqual(9);
      expect(counts.claudeCount).toBeGreaterThanOrEqual(9);
      expect(counts.cursorCount).toBeGreaterThanOrEqual(9);
      expect(fs.existsSync(path.join(sandbox, 'home', '.claude', 'skills', 'fastr-memory', 'SKILL.md'))).toBe(true);
    } finally {
      fs.rmSync(sandbox, { recursive: true, force: true });
    }
  });
});



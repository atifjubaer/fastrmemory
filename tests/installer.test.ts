import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { getAntigravityConfigPath, getClaudeDesktopConfigPath, resolveMcpCommand } from '../src/installer/setup.js';

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

  it('safely serializes mcpServers object into config files without destroying existing tools', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-test-mcp-'));
    const configPath = path.join(tmpDir, 'mcp_config.json');

    // Simulate existing config with hippo-memory
    const existing = {
      mcpServers: {
        'hippo-memory': { command: 'hippo', args: ['mcp'] },
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
    expect(result.mcpServers['hippo-memory']).toBeDefined();
    expect(result.mcpServers['fastrmemory']).toBeDefined();
    expect(result.mcpServers['fastrmemory'].command).toBe('fastrmemory');

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('locates planetary skills directory and installs 12+ skills', async () => {
    const { findSkillsDir, installSkills } = await import('../src/installer/setup.js');
    const skillsDir = findSkillsDir();
    expect(skillsDir).not.toBeNull();
    expect(fs.existsSync(skillsDir!)).toBe(true);

    const counts = installSkills();
    expect(counts.antigravityCount).toBeGreaterThanOrEqual(12);
    expect(counts.claudeCount).toBeGreaterThanOrEqual(12);
    expect(counts.cursorCount).toBeGreaterThanOrEqual(12);
  });
});


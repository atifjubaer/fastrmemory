import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {
  installUniversalFastrSkill,
  uninstallUniversalFastrSkill,
  fastrCommandTargets,
  generateFastrCommand
} from '../src/installer/skills.js';

describe('Universal /fastr Slash-Command Skill Generator', () => {
  let tempDir: string;
  let homeDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-skill-project-'));
    homeDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-skill-home-'));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
    fs.rmSync(homeDir, { recursive: true, force: true });
  });

  it('generates native command targets across 7 AI client formats', () => {
    const targets = fastrCommandTargets(tempDir, homeDir);
    expect(targets.length).toBe(7);
    const clients = targets.map((t) => t.client);
    expect(clients).toContain('claude');
    expect(clients).toContain('cursor');
    expect(clients).toContain('codex');
    expect(clients).toContain('opencode');
    expect(clients).toContain('gemini');
    expect(clients).toContain('copilot');
    expect(clients).toContain('windsurf');
  });

  it('generates valid command content with managed marker', () => {
    const claudeCmd = generateFastrCommand('claude');
    expect(claudeCmd).toContain('<!-- fastrmemory:managed command v1 -->');
    expect(claudeCmd).toContain('name: fastr');
    expect(claudeCmd).toContain('fastr_trap_recall');
    expect(claudeCmd).toContain('fastr_recall');

    const geminiCmd = generateFastrCommand('gemini');
    expect(geminiCmd).toContain('# fastrmemory:managed command v1');
    expect(geminiCmd).toContain('description = "FastrMemory');
    expect(geminiCmd).toContain('prompt = """');
  });

  it('installs slash commands into project files and uninstalls cleanly', () => {
    // 1. Install
    const installResults = installUniversalFastrSkill({
      projectRoot: tempDir,
      homeDir,
      scope: 'project'
    });

    expect(installResults.length).toBeGreaterThanOrEqual(6);
    for (const r of installResults) {
      expect(r.action).toBe('created');
      expect(fs.existsSync(r.targetPath)).toBe(true);
    }

    // 2. Re-install is idempotent
    const secondInstall = installUniversalFastrSkill({
      projectRoot: tempDir,
      homeDir,
      scope: 'project'
    });
    for (const r of secondInstall) {
      expect(r.action).toBe('unchanged');
    }

    // 3. Uninstall removes managed files
    const uninstallResults = uninstallUniversalFastrSkill({
      projectRoot: tempDir,
      homeDir,
      scope: 'project'
    });
    for (const r of uninstallResults) {
      expect(fs.existsSync(r.targetPath)).toBe(false);
    }
  });

  it('refuses to overwrite unmanaged user files without force', () => {
    const claudeCmdPath = path.join(tempDir, '.claude', 'commands', 'fastr.md');
    fs.mkdirSync(path.dirname(claudeCmdPath), { recursive: true });
    fs.writeFileSync(claudeCmdPath, '# Custom user command', 'utf8');

    // Attempt install without force
    const res = installUniversalFastrSkill({
      projectRoot: tempDir,
      homeDir,
      clients: ['claude'],
      force: false
    });

    expect(res[0].action).toBe('skipped');
    expect(res[0].reason).toContain('User file exists without FastrMemory managed marker');
    expect(fs.readFileSync(claudeCmdPath, 'utf8')).toBe('# Custom user command');

    // Attempt install with force
    const forceRes = installUniversalFastrSkill({
      projectRoot: tempDir,
      homeDir,
      clients: ['claude'],
      force: true
    });

    expect(forceRes[0].action).toBe('updated');
    expect(fs.readFileSync(claudeCmdPath, 'utf8')).toContain('<!-- fastrmemory:managed command v1 -->');
  });
});

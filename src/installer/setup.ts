import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { fileURLToPath } from 'node:url';
import { createFastrServerContext } from '../mcp/server.js';
import { McpServerEntry, updateJsonConfig, upsertMcpServer } from './json-config.js';
import { resolveMcpCommand, withProjectRoot } from './mcp-command.js';

export { findOwnCliPath, resolveMcpCommand, withProjectRoot } from './mcp-command.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface SetupOptions {
  autoInstall?: boolean;
  /** Overrides the home directory (tests, sandboxes). Defaults to `os.homedir()`. */
  homeDir?: string;
  /** Project the per-workspace configs (.cursor/, AGENTS.md) are written into. Defaults to `process.cwd()`. */
  projectRoot?: string;
}

export const AGENTS_DISCIPLINE_BLOCK = `
<!-- fastrmemory:start -->
## ⚡ FastrMemory Autonomous Agent Discipline

Every AI coding agent operating in this repository MUST follow these 3 cognitive rules:
1. **Pre-Edit Error Check**: Before editing or creating files, call \`fastr_trap_recall\` with your target file paths to check for active \`[TRAP]\` warnings.
2. **Immediate Trap Logging**: The moment you diagnose a test failure, syntax bug, or library incompatibility, call \`fastr_trap_log\` to save the lesson with a 2.0x recall boost.
3. **Session Verification**: When milestones are completed, call \`fastr_handoff\` with \`verifyStaging: true\` to graduate staging memories into verified rules.
<!-- fastrmemory:end -->
`;

export function getAntigravityConfigPath(homeDir: string = os.homedir()): string {
  return path.join(homeDir, '.gemini', 'antigravity', 'mcp_config.json');
}

export function getClaudeDesktopConfigPath(homeDir: string = os.homedir()): string {
  if (process.platform === 'win32') {
    const appData = homeDir === os.homedir() && process.env.APPDATA
      ? process.env.APPDATA
      : path.join(homeDir, 'AppData', 'Roaming');
    return path.join(appData, 'Claude', 'claude_desktop_config.json');
  } else if (process.platform === 'darwin') {
    return path.join(homeDir, 'Library', 'Application Support', 'Claude', 'claude_desktop_config.json');
  } else {
    return path.join(homeDir, '.config', 'Claude', 'claude_desktop_config.json');
  }
}

interface ClientTarget {
  label: string;
  filePath: string;
  /** Only wire the client when this directory already exists (i.e. the client is installed). */
  requireDir?: string;
}

function wireMcpClient(target: ClientTarget, entry: McpServerEntry): string {
  if (target.requireDir && !fs.existsSync(target.requireDir)) {
    return 'Skipped (not installed)';
  }
  try {
    const res = updateJsonConfig(target.filePath, (config) => upsertMcpServer(config, 'fastrmemory', entry));
    if (!res.changed) return `Already connected (${target.filePath})`;
    const backup = res.backupPath ? `, backup: ${path.basename(res.backupPath)}` : '';
    return `Connected (${target.filePath}${backup})`;
  } catch (err: any) {
    return `Failed (${err.message})`;
  }
}

export function ensureAgentsDiscipline(projectRoot: string): 'added' | 'present' {
  const agentsPath = path.join(projectRoot, 'AGENTS.md');
  const current = fs.existsSync(agentsPath) ? fs.readFileSync(agentsPath, 'utf-8') : '';
  if (current.includes('<!-- fastrmemory:start -->')) return 'present';
  fs.writeFileSync(agentsPath, (current ? current.trimEnd() + '\n' : '') + AGENTS_DISCIPLINE_BLOCK, 'utf-8');
  return 'added';
}

/**
 * Removes the discipline block this installer appended, leaving every other line of AGENTS.md
 * exactly as the user wrote it. Deletes the file when the block was its only content.
 *
 * Returns true when a block was found and removed.
 */
export function removeAgentsDiscipline(projectRoot: string): boolean {
  const agentsPath = path.join(projectRoot, 'AGENTS.md');
  if (!fs.existsSync(agentsPath)) return false;
  const current = fs.readFileSync(agentsPath, 'utf-8');
  const startMarker = '<!-- fastrmemory:start -->';
  const endMarker = '<!-- fastrmemory:end -->';
  const start = current.indexOf(startMarker);
  if (start < 0) return false;
  const end = current.indexOf(endMarker, start);
  if (end < 0) return false;

  let before = current.slice(0, start);
  const after = current.slice(end + endMarker.length);
  // install() writes `content.trimEnd() + '\n'` before a block that starts with '\n'.
  if (before.endsWith('\n\n')) before = before.slice(0, -1);
  const remainder = (before + after.replace(/^\r?\n/, '')).replace(/\s+$/, '');

  if (!remainder) {
    fs.unlinkSync(agentsPath);
    return true;
  }
  fs.writeFileSync(agentsPath, `${remainder}\n`, 'utf-8');
  return true;
}

export function runInteractiveSetup(options: SetupOptions = {}): void {
  const homeDir = options.homeDir ?? os.homedir();
  const projectRoot = path.resolve(options.projectRoot ?? process.cwd());

  console.log('\n=================================================');
  console.log('⚡ FastrMemory: Interactive Agent Setup Wizard');
  console.log('   High-Performance Cognitive Agent Memory Engine');
  console.log('=================================================\n');

  // 1. Initialize local project database
  try {
    const ctx = createFastrServerContext(projectRoot);
    console.log(`[1/8] Local project initialized:`);
    console.log(`      - Project ID: ${ctx.config.projectId}`);
    console.log(`      - Database:   ${ctx.config.dbPath}`);
    console.log(`      - Pages:      ${ctx.config.pagesDir}\n`);
  } catch (err: any) {
    console.log(`[1/8] Project init note: ${err.message}\n`);
  }

  const projectMcpTarget = resolveMcpCommand();
  const globalMcpTarget = withProjectRoot(projectMcpTarget, projectRoot);
  const antigravityPath = getAntigravityConfigPath(homeDir);
  const claudeDesktopPath = getClaudeDesktopConfigPath(homeDir);

  // 2-6. Wire MCP clients. Existing configs are merged (never replaced), backed up once, and written atomically.
  // User-scoped clients get an explicit --project so their launch directory cannot select the wrong database.
  const clients: Array<[string, ClientTarget, McpServerEntry]> = [
    ['[2/8] Antigravity IDE:', { label: 'Antigravity', filePath: antigravityPath, requireDir: path.dirname(path.dirname(antigravityPath)) }, globalMcpTarget],
    ['[3/8] Claude Desktop: ', { label: 'Claude Desktop', filePath: claudeDesktopPath, requireDir: path.dirname(claudeDesktopPath) }, globalMcpTarget],
    ['[4/8] Cursor IDE:     ', { label: 'Cursor', filePath: path.join(projectRoot, '.cursor', 'mcp.json') }, projectMcpTarget],
    // Claude Code reads user-scoped MCP servers from ~/.claude.json (it ignores mcpServers in settings.json).
    ['[5/8] Claude Code:    ', { label: 'Claude Code', filePath: path.join(homeDir, '.claude.json'), requireDir: path.join(homeDir, '.claude') }, globalMcpTarget],
    ['[6/8] Windsurf:       ', { label: 'Windsurf', filePath: path.join(homeDir, '.codeium', 'windsurf', 'mcp_config.json'), requireDir: path.join(homeDir, '.codeium', 'windsurf') }, globalMcpTarget],
  ];
  for (const [prefix, target, entry] of clients) {
    console.log(`${prefix} ${wireMcpClient(target, entry)}`);
  }

  // 7. Wire Autonomous Agent Discipline in AGENTS.md
  let agentStatus: string;
  try {
    agentStatus = ensureAgentsDiscipline(projectRoot) === 'added'
      ? 'Injected rules into AGENTS.md'
      : 'Discipline rules already present in AGENTS.md';
  } catch (err: any) {
    agentStatus = `Notice: ${err.message}`;
  }
  console.log(`[7/8] Agent Rules:     ${agentStatus}`);

  // 8. Auto-Install Planetary Skills Suite into IDEs & Global Agent Environments
  let skillsStatus: string;
  try {
    const counts = installSkills({ homeDir, projectRoot });
    skillsStatus = `Installed (${counts.antigravityCount} to Antigravity, ${counts.claudeCount} to Claude, ${counts.cursorCount} to Cursor)`;
  } catch (err: any) {
    skillsStatus = `Notice: ${err.message}`;
  }
  console.log(`[8/8] Skills Suite:    ${skillsStatus}\n`);

  console.log('-------------------------------------------------');
  console.log('✅ Setup Complete! FastrMemory is connected.');
  console.log('   Restart your agents so they pick up the new');
  console.log('   MCP server. Run `fastrmemory hook install` in');
  console.log('   a project to add Claude Code lifecycle hooks.');
  console.log('-------------------------------------------------\n');
  console.log('Quick verification commands:');
  console.log('  fastrmemory status    # Inspect database health');
  console.log('  fastrmemory trap list # Check active 2.0x error traps');
  console.log('  fastrmemory daemon    # Manage background daemon');
  console.log('  fastrmemory ui        # Launch local Web Dashboard\n');
}

export function findSkillsDir(): string | null {
  const candidates = [
    path.resolve(__dirname, '../../skills'),
    path.resolve(__dirname, '../../../skills'),
    path.resolve(process.cwd(), 'skills'),
  ];
  for (const cand of candidates) {
    if (fs.existsSync(cand) && (fs.existsSync(path.join(cand, 'skills.json')) || fs.existsSync(path.join(cand, 'fastr-discipline')))) {
      return cand;
    }
  }
  return null;
}

export interface SkillInstallOptions {
  homeDir?: string;
  projectRoot?: string;
}

/** Skills shipped by earlier versions and since merged into the current set. */
export const RETIRED_SKILLS = [
  'fastr-architecture', 'fastr-before-coding', 'fastr-blame', 'fastr-commit', 'fastr-conflicts',
  'fastr-discipline', 'fastr-handoff', 'fastr-learn', 'fastr-mcp', 'fastr-recall',
  'fastr-remember', 'fastr-trap', 'fastr-trap-logger',
];

/**
 * Removes skills an earlier install copied that no longer exist, so upgraded users don't keep
 * stale instructions with wrong tool parameters. Only the exact retired names are touched.
 */
export function removeRetiredSkills(dir: string): string[] {
  const removed: string[] = [];
  for (const name of RETIRED_SKILLS) {
    const skillDir = path.join(dir, name);
    if (fs.existsSync(path.join(skillDir, 'SKILL.md'))) {
      fs.rmSync(skillDir, { recursive: true, force: true });
      removed.push(name);
    }
  }
  return removed;
}

export function installSkills(options: SkillInstallOptions = {}): {
  antigravityCount: number;
  claudeCount: number;
  cursorCount: number;
} {
  const homeDir = options.homeDir ?? os.homedir();
  const projectRoot = options.projectRoot ?? process.cwd();
  const skillsDir = findSkillsDir();
  const counts = { antigravityCount: 0, claudeCount: 0, cursorCount: 0 };
  if (!skillsDir) return counts;

  const skillEntries = fs.readdirSync(skillsDir, { withFileTypes: true });
  const skillDirs = skillEntries.filter((e) => e.isDirectory()).map((e) => e.name);

  const targets = [
    { dir: path.join(homeDir, '.gemini', 'config', 'skills'), key: 'antigravityCount' as const },
    { dir: path.join(homeDir, '.claude', 'skills'), key: 'claudeCount' as const },
    { dir: path.join(projectRoot, '.cursor', 'skills'), key: 'cursorCount' as const },
  ];

  for (const target of targets) {
    // The skills source and destination are the same folder when running inside this repo's checkout.
    if (path.resolve(target.dir) === path.resolve(skillsDir)) continue;
    try {
      if (!fs.existsSync(target.dir)) {
        fs.mkdirSync(target.dir, { recursive: true });
      }
      removeRetiredSkills(target.dir);
      for (const skillName of skillDirs) {
        const srcSkill = path.join(skillsDir, skillName);
        const destSkill = path.join(target.dir, skillName);
        if (!fs.existsSync(destSkill)) {
          fs.mkdirSync(destSkill, { recursive: true });
        }
        const files = fs.readdirSync(srcSkill);
        for (const file of files) {
          const srcFile = path.join(srcSkill, file);
          const destFile = path.join(destSkill, file);
          if (fs.statSync(srcFile).isFile()) {
            fs.copyFileSync(srcFile, destFile);
          }
        }
        counts[target.key]++;
      }
    } catch {
      // Continue for best effort across environments
    }
  }

  return counts;
}

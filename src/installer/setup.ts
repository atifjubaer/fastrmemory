import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { fileURLToPath } from 'node:url';
import { createFastrServerContext } from '../mcp/server.js';
import { indexProjectSymbols, isIndexableProjectRoot } from '../code/indexer.js';
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
## FastrMemory Autonomous Agent Discipline

Every AI coding agent operating in this repository MUST follow these cognitive rules:
1. **Pre-Edit Error Check & Trap Recall**: Before editing or creating files, call \`fastr_trap_recall\` with your target file paths (set \`includeNeighbors: true\`) to check for active \`[TRAP]\` warnings and 1-hop call-graph dependencies.
2. **Cognitive Recall**: At the start of ANY task, call \`fastr_recall\` with your query or objective to load relevant architectural decisions, active rules, and past lessons.
3. **Immediate Trap Logging**: The moment you diagnose a test failure, syntax bug, or library incompatibility, immediately call \`fastr_trap_log\` to save the lesson with a 2.0x recall boost.
4. **Session Verification**: When milestones are completed, call \`fastr_handoff\` with \`verifyStaging: true\` to graduate staging memories into verified rules.
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
 * Ensures FastrMemory's autonomous cognitive rules are wired into every major AI assistant
 * environment in the project:
 * - Claude Code: .claude/rules/fastrmemory.md
 * - Cursor: .cursor/rules/fastrmemory.mdc (alwaysApply: true)
 * - Copilot: .github/copilot-instructions.md
 * - Windsurf: .windsurf/rules/fastrmemory.md
 * - Gemini CLI: GEMINI.md
 * - AGENTS.md (for Codex, OpenCode, Devin, Aider)
 */
export function ensureAgentRulesAcrossClients(projectRoot: string): {
  agentsMd: 'added' | 'present';
  claudeRule: 'added' | 'present';
  cursorRule: 'added' | 'present';
  copilotRule: 'added' | 'present';
  windsurfRule: 'added' | 'present';
  geminiRule: 'added' | 'present';
} {
  const result = {
    agentsMd: ensureAgentsDiscipline(projectRoot),
    claudeRule: 'present' as 'added' | 'present',
    cursorRule: 'present' as 'added' | 'present',
    copilotRule: 'present' as 'added' | 'present',
    windsurfRule: 'present' as 'added' | 'present',
    geminiRule: 'present' as 'added' | 'present',
  };

  // 1. Claude Code (.claude/rules/fastrmemory.md)
  const claudeRulePath = path.join(projectRoot, '.claude', 'rules', 'fastrmemory.md');
  if (!fs.existsSync(claudeRulePath)) {
    try {
      fs.mkdirSync(path.dirname(claudeRulePath), { recursive: true });
      fs.writeFileSync(claudeRulePath, AGENTS_DISCIPLINE_BLOCK.trim() + '\n', 'utf-8');
      result.claudeRule = 'added';
    } catch {}
  }

  // 2. Cursor (.cursor/rules/fastrmemory.mdc) with alwaysApply: true
  const cursorRulePath = path.join(projectRoot, '.cursor', 'rules', 'fastrmemory.mdc');
  if (!fs.existsSync(cursorRulePath)) {
    try {
      fs.mkdirSync(path.dirname(cursorRulePath), { recursive: true });
      const cursorRule = [
        '---',
        'description: FastrMemory autonomous cognitive protocol for active error trap recall and memory search',
        'globs: *',
        'alwaysApply: true',
        '---',
        '',
        AGENTS_DISCIPLINE_BLOCK.trim(),
        ''
      ].join('\n');
      fs.writeFileSync(cursorRulePath, cursorRule, 'utf-8');
      result.cursorRule = 'added';
    } catch {}
  }

  // 3. GitHub Copilot (.github/copilot-instructions.md)
  const copilotPath = path.join(projectRoot, '.github', 'copilot-instructions.md');
  const existingCopilot = fs.existsSync(copilotPath) ? fs.readFileSync(copilotPath, 'utf-8') : '';
  if (!existingCopilot.includes('<!-- fastrmemory:start -->')) {
    try {
      fs.mkdirSync(path.dirname(copilotPath), { recursive: true });
      fs.writeFileSync(copilotPath, (existingCopilot ? existingCopilot.trimEnd() + '\n' : '') + AGENTS_DISCIPLINE_BLOCK, 'utf-8');
      result.copilotRule = 'added';
    } catch {}
  }

  // 4. Windsurf (.windsurf/rules/fastrmemory.md)
  const windsurfPath = path.join(projectRoot, '.windsurf', 'rules', 'fastrmemory.md');
  if (!fs.existsSync(windsurfPath)) {
    try {
      fs.mkdirSync(path.dirname(windsurfPath), { recursive: true });
      fs.writeFileSync(windsurfPath, AGENTS_DISCIPLINE_BLOCK.trim() + '\n', 'utf-8');
      result.windsurfRule = 'added';
    } catch {}
  }

  // 5. Gemini CLI (GEMINI.md)
  const geminiPath = path.join(projectRoot, 'GEMINI.md');
  const existingGemini = fs.existsSync(geminiPath) ? fs.readFileSync(geminiPath, 'utf-8') : '';
  if (!existingGemini.includes('<!-- fastrmemory:start -->')) {
    try {
      fs.writeFileSync(geminiPath, (existingGemini ? existingGemini.trimEnd() + '\n' : '') + AGENTS_DISCIPLINE_BLOCK, 'utf-8');
      result.geminiRule = 'added';
    } catch {}
  }

  return result;
}

function pruneEmptyDir(dir: string): void {
  try {
    if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
    }
  } catch {}
}

/**
 * Removes the discipline block this installer appended, leaving every other line of AGENTS.md
 * exactly as the user wrote it. Also removes any client-specific rule files created by
 * ensureAgentRulesAcrossClients (.claude/rules/fastrmemory.md, .cursor/rules/fastrmemory.mdc, etc.)
 *
 * Returns true when a block or rule file was found and removed.
 */
export function removeAgentsDiscipline(projectRoot: string): boolean {
  let changed = false;

  // 1. Clean AGENTS.md
  const agentsPath = path.join(projectRoot, 'AGENTS.md');
  if (fs.existsSync(agentsPath)) {
    const current = fs.readFileSync(agentsPath, 'utf-8');
    const startMarker = '<!-- fastrmemory:start -->';
    const endMarker = '<!-- fastrmemory:end -->';
    const start = current.indexOf(startMarker);
    if (start >= 0) {
      const end = current.indexOf(endMarker, start);
      if (end >= 0) {
        let before = current.slice(0, start);
        const after = current.slice(end + endMarker.length);
        if (before.endsWith('\n\n')) before = before.slice(0, -1);
        const remainder = (before + after.replace(/^\r?\n/, '')).replace(/\s+$/, '');
        if (!remainder) {
          fs.unlinkSync(agentsPath);
        } else {
          fs.writeFileSync(agentsPath, `${remainder}\n`, 'utf-8');
        }
        changed = true;
      }
    }
  }

  // 2. Clean Claude Code rule (.claude/rules/fastrmemory.md)
  const claudeRule = path.join(projectRoot, '.claude', 'rules', 'fastrmemory.md');
  if (fs.existsSync(claudeRule)) {
    try {
      fs.unlinkSync(claudeRule);
      pruneEmptyDir(path.join(projectRoot, '.claude', 'rules'));
      pruneEmptyDir(path.join(projectRoot, '.claude'));
      changed = true;
    } catch {}
  }

  // 3. Clean Cursor rule (.cursor/rules/fastrmemory.mdc)
  const cursorRule = path.join(projectRoot, '.cursor', 'rules', 'fastrmemory.mdc');
  if (fs.existsSync(cursorRule)) {
    try {
      fs.unlinkSync(cursorRule);
      pruneEmptyDir(path.join(projectRoot, '.cursor', 'rules'));
      pruneEmptyDir(path.join(projectRoot, '.cursor'));
      changed = true;
    } catch {}
  }

  // 4. Clean Copilot instructions (.github/copilot-instructions.md)
  const copilot = path.join(projectRoot, '.github', 'copilot-instructions.md');
  if (fs.existsSync(copilot)) {
    try {
      const current = fs.readFileSync(copilot, 'utf-8');
      const startMarker = '<!-- fastrmemory:start -->';
      const endMarker = '<!-- fastrmemory:end -->';
      const start = current.indexOf(startMarker);
      if (start >= 0) {
        const end = current.indexOf(endMarker, start);
        if (end >= 0) {
          let before = current.slice(0, start);
          const after = current.slice(end + endMarker.length);
          if (before.endsWith('\n\n')) before = before.slice(0, -1);
          const remainder = (before + after.replace(/^\r?\n/, '')).replace(/\s+$/, '');
          if (!remainder) {
            fs.unlinkSync(copilot);
            pruneEmptyDir(path.join(projectRoot, '.github'));
          } else {
            fs.writeFileSync(copilot, `${remainder}\n`, 'utf-8');
          }
          changed = true;
        }
      }
    } catch {}
  }

  // 5. Clean Windsurf rule (.windsurf/rules/fastrmemory.md)
  const windsurf = path.join(projectRoot, '.windsurf', 'rules', 'fastrmemory.md');
  if (fs.existsSync(windsurf)) {
    try {
      fs.unlinkSync(windsurf);
      pruneEmptyDir(path.join(projectRoot, '.windsurf', 'rules'));
      pruneEmptyDir(path.join(projectRoot, '.windsurf'));
      changed = true;
    } catch {}
  }

  // 6. Clean Gemini instructions (GEMINI.md)
  const gemini = path.join(projectRoot, 'GEMINI.md');
  if (fs.existsSync(gemini)) {
    try {
      const current = fs.readFileSync(gemini, 'utf-8');
      const startMarker = '<!-- fastrmemory:start -->';
      const endMarker = '<!-- fastrmemory:end -->';
      const start = current.indexOf(startMarker);
      if (start >= 0) {
        const end = current.indexOf(endMarker, start);
        if (end >= 0) {
          let before = current.slice(0, start);
          const after = current.slice(end + endMarker.length);
          if (before.endsWith('\n\n')) before = before.slice(0, -1);
          const remainder = (before + after.replace(/^\r?\n/, '')).replace(/\s+$/, '');
          if (!remainder) fs.unlinkSync(gemini);
          else fs.writeFileSync(gemini, `${remainder}\n`, 'utf-8');
          changed = true;
        }
      }
    } catch {}
  }

  return changed;
}

export function runInteractiveSetup(options: SetupOptions = {}): void {
  const homeDir = options.homeDir ?? os.homedir();
  const projectRoot = path.resolve(options.projectRoot ?? process.cwd());

  console.log('\n=================================================');
  console.log('⚡ FastrMemory: Interactive Agent Setup Wizard');
  console.log('   High-Performance Cognitive Agent Memory Engine');
  console.log('=================================================\n');

  // 1. Initialize local project database
  let setupContext: ReturnType<typeof createFastrServerContext> | null = null;
  try {
    const ctx = createFastrServerContext(projectRoot);
    setupContext = ctx;
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

  // 7. Wire Autonomous Agent Discipline across all AI assistants (Claude Code, Cursor, Copilot, Windsurf, Gemini, AGENTS.md)
  let agentStatus: string;
  try {
    ensureAgentRulesAcrossClients(projectRoot);
    agentStatus = 'Wired rules into Claude Code, Cursor, Copilot, Windsurf, Gemini, and AGENTS.md';
  } catch (err: any) {
    agentStatus = `Notice: ${err.message}`;
  }
  console.log(`[7/8] Agent Rules:     ${agentStatus}`);

  // Index once at setup time when this is a real project, so the call graph is never
  // silently empty. The home directory and folders without a project marker are skipped.
  if (setupContext && process.env.FASTR_AUTO_INDEX !== '0') {
    if (isIndexableProjectRoot(projectRoot)) {
      try {
        const index = indexProjectSymbols(
          setupContext.db,
          setupContext.config.projectId,
          setupContext.config.projectRoot
        );
        console.log(`      Code graph:      ${index.symbols} symbols, ${index.callEdges ?? 0} call edges, ${index.importEdges ?? 0} import edges`);
      } catch (err: any) {
        console.log(`      Code graph:      skipped (${err.message})`);
      }
    } else {
      console.log('      Code graph:      skipped (not a project root)');
    }
  }

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

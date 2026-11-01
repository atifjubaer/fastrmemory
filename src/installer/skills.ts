import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { PACKAGE_VERSION } from '../version.js';

export const FASTR_COMMAND_CLIENTS = [
  'claude',
  'cursor',
  'codex',
  'opencode',
  'gemini',
  'copilot',
  'windsurf'
] as const;

export type FastrCommandClient = (typeof FASTR_COMMAND_CLIENTS)[number];

export type SkillScope = 'project' | 'user';

export interface FastrCommandTarget {
  client: FastrCommandClient;
  label: string;
  projectPath?: string;
  userPath?: string;
  format: 'markdown' | 'toml';
}

export interface UniversalSkillInstallOptions {
  projectRoot: string;
  homeDir?: string;
  clients?: readonly FastrCommandClient[];
  scope?: SkillScope;
  force?: boolean;
  dryRun?: boolean;
}

export interface InstalledSkillFile {
  client: FastrCommandClient;
  targetPath: string;
  action: 'created' | 'updated' | 'unchanged' | 'skipped';
  reason?: string;
}

const MANAGED_MARKER = '<!-- fastrmemory:managed command v1 -->';
const TOML_MANAGED_MARKER = '# fastrmemory:managed command v1';

/**
 * Returns destination paths for native slash command files per client.
 */
export function fastrCommandTargets(
  projectRoot: string,
  homeDir: string = os.homedir()
): FastrCommandTarget[] {
  return [
    {
      client: 'claude',
      label: 'Claude Code',
      projectPath: path.join(projectRoot, '.claude', 'commands', 'fastr.md'),
      userPath: path.join(homeDir, '.claude', 'commands', 'fastr.md'),
      format: 'markdown'
    },
    {
      client: 'cursor',
      label: 'Cursor IDE',
      projectPath: path.join(projectRoot, '.cursor', 'rules', 'fastr.mdc'),
      userPath: path.join(homeDir, '.cursor', 'rules', 'fastr.mdc'),
      format: 'markdown'
    },
    {
      client: 'codex',
      label: 'Codex CLI',
      projectPath: path.join(projectRoot, '.codex', 'prompts', 'fastr.md'),
      userPath: path.join(homeDir, '.codex', 'prompts', 'fastr.md'),
      format: 'markdown'
    },
    {
      client: 'opencode',
      label: 'OpenCode',
      projectPath: path.join(projectRoot, '.opencode', 'command', 'fastr.md'),
      userPath: path.join(homeDir, '.config', 'opencode', 'command', 'fastr.md'),
      format: 'markdown'
    },
    {
      client: 'gemini',
      label: 'Gemini CLI',
      projectPath: path.join(projectRoot, '.gemini', 'commands', 'fastr.toml'),
      userPath: path.join(homeDir, '.gemini', 'commands', 'fastr.toml'),
      format: 'toml'
    },
    {
      client: 'copilot',
      label: 'GitHub Copilot CLI',
      projectPath: path.join(projectRoot, '.github', 'prompts', 'fastr.prompt.md'),
      format: 'markdown'
    },
    {
      client: 'windsurf',
      label: 'Windsurf',
      projectPath: path.join(projectRoot, '.windsurf', 'workflows', 'fastr.md'),
      format: 'markdown'
    }
  ];
}

/**
 * Generates the native prompt/command body for `/fastr`.
 */
export function generateFastrCommand(
  client: FastrCommandClient,
  version: string = PACKAGE_VERSION
): string {
  if (client === 'gemini') {
    return [
      TOML_MANAGED_MARKER,
      'description = "FastrMemory: Recall rules, verify error traps, and check code knowledge graph"',
      'prompt = """',
      'You are operating with FastrMemory v' + version + ' cognitive agent protection.',
      '',
      '1. PRE-EDIT ERROR CHECK: Before editing or inspecting files, call `fastr_trap_recall` with target file paths to check for active [TRAP] warnings and 1-hop call-graph risks.',
      '2. COGNITIVE RECALL: Call `fastr_recall` with your current task or query to load active rules and architectural decisions.',
      '3. KNOWLEDGE GRAPH: Call `fastr_god_nodes` or `fastr_graph_query` to inspect core architectural hubs and blast radius.',
      '4. TRAP LOGGING: The moment you diagnose a test failure or compiler crash, call `fastr_trap_log` to record the lesson.',
      '5. FINALIZE: Run `fastr_session_commit` upon milestone completion.',
      '"""',
      ''
    ].join('\n');
  }

  const frontmatter = [
    MANAGED_MARKER,
    '---',
    'name: fastr',
    'description: FastrMemory cognitive agent commands: pre-edit trap checks, hybrid recall, call-graph inspection, and session verification',
    '---',
    ''
  ].join('\n');

  const body = [
    '# /fastr — FastrMemory Cognitive Agent Shield (v' + version + ')',
    '',
    'When this command is invoked or when working on tasks in this project, execute this cognitive discipline:',
    '',
    '1. **Pre-Edit Error Check**: Before editing or creating files, call `fastr_trap_recall` with `{ "files": ["<target_file>"], "includeNeighbors": true }`. Treat every returned `[TRAP]` as an unbreakable constraint.',
    '2. **Targeted Recall**: Call `fastr_recall` with `{ "query": "$ARGUMENTS", "budgetTokens": 1500 }` to load relevant architectural decisions and active rules.',
    '3. **Architectural Hubs**: Call `fastr_god_nodes` or `fastr_graph_query` when working with core abstractions to understand caller dependencies.',
    '4. **Rapid Trap Logging**: The moment you diagnose a test failure or bug, immediately call `fastr_trap_log` to record the root cause and workaround with a 2.0x recall boost.',
    '5. **Session Verification**: When milestones are completed, call `fastr_handoff` with `verifyStaging: true`.',
    ''
  ].join('\n');

  return frontmatter + body;
}

/**
 * Installs native `/fastr` slash command files across requested AI clients.
 */
export function installUniversalFastrSkill(
  options: UniversalSkillInstallOptions
): InstalledSkillFile[] {
  const homeDir = options.homeDir ?? os.homedir();
  const projectRoot = options.projectRoot;
  const scope = options.scope ?? 'project';
  const selectedClients = options.clients ?? FASTR_COMMAND_CLIENTS;
  const force = Boolean(options.force);
  const dryRun = Boolean(options.dryRun);

  const targets = fastrCommandTargets(projectRoot, homeDir);
  const results: InstalledSkillFile[] = [];

  for (const target of targets) {
    if (!selectedClients.includes(target.client)) continue;

    const destPath = scope === 'user' ? target.userPath : target.projectPath;
    if (!destPath) continue;

    const content = generateFastrCommand(target.client);
    const exists = fs.existsSync(destPath);

    if (exists && !force) {
      let existingContent = '';
      try {
        existingContent = fs.readFileSync(destPath, 'utf8');
      } catch {}
      const isManaged = existingContent.includes(MANAGED_MARKER) || existingContent.includes(TOML_MANAGED_MARKER);
      if (!isManaged) {
        results.push({
          client: target.client,
          targetPath: destPath,
          action: 'skipped',
          reason: 'User file exists without FastrMemory managed marker. Use --force to overwrite.'
        });
        continue;
      }
      if (existingContent === content) {
        results.push({
          client: target.client,
          targetPath: destPath,
          action: 'unchanged'
        });
        continue;
      }
    }

    if (!dryRun) {
      try {
        fs.mkdirSync(path.dirname(destPath), { recursive: true });
        fs.writeFileSync(destPath, content, 'utf8');
        results.push({
          client: target.client,
          targetPath: destPath,
          action: exists ? 'updated' : 'created'
        });
      } catch (err: any) {
        results.push({
          client: target.client,
          targetPath: destPath,
          action: 'skipped',
          reason: err.message
        });
      }
    } else {
      results.push({
        client: target.client,
        targetPath: destPath,
        action: exists ? 'updated' : 'created'
      });
    }
  }

  return results;
}

/**
 * Removes FastrMemory managed `/fastr` slash command files across clients.
 */
export function uninstallUniversalFastrSkill(
  options: UniversalSkillInstallOptions
): InstalledSkillFile[] {
  const homeDir = options.homeDir ?? os.homedir();
  const projectRoot = options.projectRoot;
  const scope = options.scope ?? 'project';
  const selectedClients = options.clients ?? FASTR_COMMAND_CLIENTS;
  const dryRun = Boolean(options.dryRun);

  const targets = fastrCommandTargets(projectRoot, homeDir);
  const results: InstalledSkillFile[] = [];

  for (const target of targets) {
    if (!selectedClients.includes(target.client)) continue;

    const destPath = scope === 'user' ? target.userPath : target.projectPath;
    if (!destPath || !fs.existsSync(destPath)) continue;

    let content = '';
    try {
      content = fs.readFileSync(destPath, 'utf8');
    } catch {}

    const isManaged = content.includes(MANAGED_MARKER) || content.includes(TOML_MANAGED_MARKER);
    if (!isManaged) {
      results.push({
        client: target.client,
        targetPath: destPath,
        action: 'skipped',
        reason: 'Unmanaged file. FastrMemory will not delete user-owned files.'
      });
      continue;
    }

    if (!dryRun) {
      try {
        fs.unlinkSync(destPath);
        results.push({
          client: target.client,
          targetPath: destPath,
          action: 'created' // Deleted
        });
      } catch (err: any) {
        results.push({
          client: target.client,
          targetPath: destPath,
          action: 'skipped',
          reason: err.message
        });
      }
    } else {
      results.push({
        client: target.client,
        targetPath: destPath,
        action: 'created'
      });
    }
  }

  return results;
}

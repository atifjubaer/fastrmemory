import * as fs from 'node:fs';
import * as path from 'node:path';
import {
  ClaudeHookSpec,
  deleteJsonConfigIfTrivial,
  McpServerEntry,
  mergeClaudeHooks,
  removeClaudeHooks,
  removeMcpServer,
  updateJsonConfig,
  upsertMcpServer
} from './json-config.js';
import { ensureAgentsDiscipline, removeAgentsDiscipline, resolveMcpCommand } from './setup.js';
import { installOpenCode, uninstallOpenCode } from './opencode.js';
import { installGemini, uninstallGemini } from './gemini.js';
import { installCopilot, uninstallCopilot } from './copilot.js';
import { buildHookCommand } from './commands.js';

export { buildHookCommand } from './commands.js';

/**
 * The five project-scoped clients `fastr hook install` can wire up. Each one is installed and
 * removed by the same registry entry, so an uninstall cannot drift away from what install wrote.
 */
export type HookClient = 'claude' | 'cursor' | 'opencode' | 'gemini' | 'copilot';

export const HOOK_CLIENTS: HookClient[] = ['claude', 'cursor', 'opencode', 'gemini', 'copilot'];

export type HookStatus = 'updated' | 'present' | 'removed' | 'absent' | 'skipped' | 'error';

export interface HookClientReport {
  client: HookClient;
  status: HookStatus;
  /** Every file this client's install or uninstall touched, relative to the project root. */
  files: string[];
  details: string[];
  error?: string;
}

export interface HookInstallResult {
  claudeCodeUpdated: boolean;
  cursorUpdated: boolean;
  geminiUpdated: boolean;
  copilotUpdated: boolean;
  openCodeUpdated: boolean;
  agentsMdUpdated: boolean;
  details: string[];
  clients: HookClientReport[];
}

export interface HookUninstallResult {
  /** True when at least one client file changed. */
  changed: boolean;
  agentsMdRemoved: boolean;
  details: string[];
  clients: HookClientReport[];
}

export function claudeHookSpecs(platform: NodeJS.Platform = process.platform): ClaudeHookSpec[] {
  return [
    // Plain stdout from SessionStart is added to Claude's context (prior handoff, frontier tasks).
    { event: 'SessionStart', command: buildHookCommand('SessionStart', platform) },
    // Warn about active error traps before Claude edits a file (returned as additionalContext).
    { event: 'PreToolUse', matcher: 'Edit|Write|MultiEdit|NotebookEdit', command: buildHookCommand('PreToolUse', platform), timeout: 10 },
    { event: 'PreCompact', command: buildHookCommand('PreCompact', platform), timeout: 15 },
    // SessionEnd hooks default to a 1.5s timeout; flushing the spool and mirroring pages can take longer.
    { event: 'SessionEnd', command: buildHookCommand('SessionEnd', platform), timeout: 15 },
  ];
}

/** Parses `--client claude,cursor` / `--client all`. Throws on an unknown id instead of ignoring it. */
export function parseHookClients(spec: string | undefined): HookClient[] {
  const raw = (spec ?? 'all').trim().toLowerCase();
  if (raw === 'all' || raw === '') return [...HOOK_CLIENTS];
  const parts = raw.split(',').map((part) => part.trim()).filter(Boolean);
  const unknown = parts.filter((part) => !HOOK_CLIENTS.includes(part as HookClient));
  if (unknown.length > 0) {
    throw new Error(`unknown client ${unknown.join(', ')}; expected ${HOOK_CLIENTS.join(', ')}, or all`);
  }
  return [...new Set(parts as HookClient[])];
}

function relative(projectRoot: string, filePath: string): string {
  return path.relative(projectRoot, filePath) || path.basename(filePath);
}

function describe(projectRoot: string, label: string, res: { filePath: string; changed: boolean; backupPath?: string }): string {
  const rel = relative(projectRoot, res.filePath);
  if (!res.changed) return `${label}: already up to date (${rel})`;
  return `${label}: updated ${rel}${res.backupPath ? ` (backup: ${path.basename(res.backupPath)})` : ''}`;
}

/** Removes empty directories that install may have created, deepest first. */
function pruneEmptyDirs(dirs: string[]): string[] {
  const removed: string[] = [];
  for (const dir of dirs) {
    try {
      if (fs.existsSync(dir) && fs.statSync(dir).isDirectory() && fs.readdirSync(dir).length === 0) {
        fs.rmdirSync(dir);
        removed.push(dir);
      }
    } catch {
      // A non-empty or locked directory is not an uninstall failure.
    }
  }
  return removed;
}

interface JsonRemoval {
  changed: boolean;
  removed: boolean;
  deleted: boolean;
  filePath: string;
}

/** Removes FastrMemory entries from one JSON file, then deletes the file if nothing is left. */
function removeFromJsonFile(filePath: string, mutate: (config: Record<string, any>) => boolean): JsonRemoval {
  if (!fs.existsSync(filePath)) return { changed: false, removed: false, deleted: false, filePath };
  let removed = false;
  const res = updateJsonConfig(filePath, (config) => {
    removed = mutate(config);
  }, { backup: false });
  const deleted = deleteJsonConfigIfTrivial(filePath);
  return { changed: res.changed || deleted, removed, deleted, filePath };
}

function installClaude(projectRoot: string, mcpEntry: McpServerEntry): HookClientReport {
  const details: string[] = [];
  const files = ['.mcp.json', path.join('.claude', 'settings.json')];
  let changed = false;
  try {
    const mcp = updateJsonConfig(path.join(projectRoot, '.mcp.json'), (config) => upsertMcpServer(config, 'fastrmemory', mcpEntry));
    details.push(describe(projectRoot, 'Claude Code MCP server', mcp));
    changed ||= mcp.changed;
    const hooks = updateJsonConfig(path.join(projectRoot, '.claude', 'settings.json'), (config) => mergeClaudeHooks(config, claudeHookSpecs()));
    details.push(describe(projectRoot, 'Claude Code hooks', hooks));
    changed ||= hooks.changed;
    return { client: 'claude', status: changed ? 'updated' : 'present', files, details };
  } catch (err: any) {
    return { client: 'claude', status: 'error', files, details: [...details, `Failed to update Claude Code: ${err.message}`], error: err.message };
  }
}

function uninstallClaude(projectRoot: string): HookClientReport {
  const files = ['.mcp.json', path.join('.claude', 'settings.json')];
  const details: string[] = [];
  let changed = false;
  try {
    const mcp = removeFromJsonFile(path.join(projectRoot, '.mcp.json'), (config) => removeMcpServer(config, 'fastrmemory'));
    changed ||= mcp.changed;
    details.push(mcp.removed ? 'Claude Code MCP server: removed' : 'Claude Code MCP server: not configured');

    const hooks = removeFromJsonFile(path.join(projectRoot, '.claude', 'settings.json'), (config) => removeClaudeHooks(config) > 0);
    changed ||= hooks.changed;
    details.push(hooks.removed ? 'Claude Code hooks: removed' : 'Claude Code hooks: not configured');

    const pruned = pruneEmptyDirs([path.join(projectRoot, '.claude')]);
    for (const dir of pruned) details.push(`Removed empty directory ${relative(projectRoot, dir)}`);
    return { client: 'claude', status: changed ? 'removed' : 'absent', files, details };
  } catch (err: any) {
    return { client: 'claude', status: 'error', files, details: [`Failed to clean Claude Code: ${err.message}`], error: err.message };
  }
}

function installCursor(projectRoot: string, mcpEntry: McpServerEntry): HookClientReport {
  const files = [path.join('.cursor', 'mcp.json')];
  try {
    const cursor = updateJsonConfig(path.join(projectRoot, '.cursor', 'mcp.json'), (config) => upsertMcpServer(config, 'fastrmemory', mcpEntry));
    return {
      client: 'cursor',
      status: cursor.changed ? 'updated' : 'present',
      files,
      details: [describe(projectRoot, 'Cursor MCP server', cursor)]
    };
  } catch (err: any) {
    return { client: 'cursor', status: 'error', files, details: [`Failed to update Cursor MCP: ${err.message}`], error: err.message };
  }
}

function uninstallCursor(projectRoot: string): HookClientReport {
  const files = [path.join('.cursor', 'mcp.json')];
  try {
    const cursor = removeFromJsonFile(path.join(projectRoot, '.cursor', 'mcp.json'), (config) => removeMcpServer(config, 'fastrmemory'));
    const details = [cursor.removed ? 'Cursor MCP server: removed' : 'Cursor MCP server: not configured'];
    const pruned = pruneEmptyDirs([path.join(projectRoot, '.cursor')]);
    for (const dir of pruned) details.push(`Removed empty directory ${relative(projectRoot, dir)}`);
    return { client: 'cursor', status: cursor.changed ? 'removed' : 'absent', files, details };
  } catch (err: any) {
    return { client: 'cursor', status: 'error', files, details: [`Failed to clean Cursor MCP: ${err.message}`], error: err.message };
  }
}

function installGeminiClient(projectRoot: string, mcpEntry: McpServerEntry): HookClientReport {
  const files = [path.join('.gemini', 'settings.json')];
  try {
    const gemini = installGemini(projectRoot, mcpEntry);
    return {
      client: 'gemini',
      status: gemini.changed ? 'updated' : 'present',
      files,
      details: [describe(projectRoot, 'Gemini CLI MCP + hooks', gemini)]
    };
  } catch (err: any) {
    return { client: 'gemini', status: 'error', files, details: [`Failed to update Gemini CLI: ${err.message}`], error: err.message };
  }
}

function uninstallGeminiClient(projectRoot: string): HookClientReport {
  const files = [path.join('.gemini', 'settings.json')];
  try {
    const res = uninstallGemini(projectRoot);
    const details = [
      res.removedMcp ? 'Gemini CLI MCP server: removed' : 'Gemini CLI MCP server: not configured',
      res.removedHooks > 0 ? `Gemini CLI hooks: removed ${res.removedHooks}` : 'Gemini CLI hooks: not configured'
    ];
    const pruned = pruneEmptyDirs([path.join(projectRoot, '.gemini')]);
    for (const dir of pruned) details.push(`Removed empty directory ${relative(projectRoot, dir)}`);
    return { client: 'gemini', status: res.changed ? 'removed' : 'absent', files, details };
  } catch (err: any) {
    return { client: 'gemini', status: 'error', files, details: [`Failed to clean Gemini CLI: ${err.message}`], error: err.message };
  }
}

function installCopilotClient(projectRoot: string, mcpEntry: McpServerEntry): HookClientReport {
  const files = [path.join('.github', 'mcp.json'), path.join('.github', 'hooks', 'fastrmemory.json')];
  try {
    const copilot = installCopilot(projectRoot, mcpEntry);
    return {
      client: 'copilot',
      status: copilot.changed ? 'updated' : 'present',
      files,
      details: [
        describe(projectRoot, 'Copilot CLI MCP', copilot.mcp),
        describe(projectRoot, 'Copilot CLI hooks', copilot.hooks)
      ]
    };
  } catch (err: any) {
    return { client: 'copilot', status: 'error', files, details: [`Failed to update Copilot CLI: ${err.message}`], error: err.message };
  }
}

function uninstallCopilotClient(projectRoot: string): HookClientReport {
  const files = [path.join('.github', 'mcp.json'), path.join('.github', 'hooks', 'fastrmemory.json')];
  try {
    const res = uninstallCopilot(projectRoot);
    const details = [
      res.removedMcp ? 'Copilot CLI MCP: removed' : 'Copilot CLI MCP: not configured',
      res.removedHooks > 0 ? `Copilot CLI hooks: removed ${res.removedHooks}` : 'Copilot CLI hooks: not configured'
    ];
    const pruned = pruneEmptyDirs([path.join(projectRoot, '.github', 'hooks'), path.join(projectRoot, '.github')]);
    for (const dir of pruned) details.push(`Removed empty directory ${relative(projectRoot, dir)}`);
    return { client: 'copilot', status: res.changed ? 'removed' : 'absent', files, details };
  } catch (err: any) {
    return { client: 'copilot', status: 'error', files, details: [`Failed to clean Copilot CLI: ${err.message}`], error: err.message };
  }
}

function installOpenCodeClient(projectRoot: string, mcpEntry: McpServerEntry): HookClientReport {
  const files = ['opencode.json', path.join('.opencode', 'plugins', 'fastrmemory', 'index.ts')];
  try {
    const openCode = installOpenCode(projectRoot, mcpEntry);
    return {
      client: 'opencode',
      status: openCode.changed ? 'updated' : 'present',
      files,
      details: openCode.details
    };
  } catch (err: any) {
    return { client: 'opencode', status: 'error', files, details: [`Failed to update OpenCode: ${err.message}`], error: err.message };
  }
}

function uninstallOpenCodeClient(projectRoot: string): HookClientReport {
  const files = ['opencode.json', path.join('.opencode', 'plugins', 'fastrmemory', 'index.ts')];
  try {
    const res = uninstallOpenCode(projectRoot);
    return { client: 'opencode', status: res.changed ? 'removed' : 'absent', files, details: res.details };
  } catch (err: any) {
    return { client: 'opencode', status: 'error', files, details: [`Failed to clean OpenCode: ${err.message}`], error: err.message };
  }
}

/**
 * Wires FastrMemory into the selected project-scoped clients. Re-running is idempotent: every
 * file is merged, not replaced, and a run that changes nothing reports `present`.
 *
 * Claude Code reads project MCP servers from `.mcp.json` and hooks from `.claude/settings.json`;
 * Gemini CLI reads both from `.gemini/settings.json`; Copilot CLI reads `.github/mcp.json` and
 * `.github/hooks/*.json`; OpenCode reads `opencode.json(c)` plus a managed plugin.
 */
export function installHookClients(
  projectRoot: string = process.cwd(),
  clients: HookClient[] = [...HOOK_CLIENTS],
  options: { agentsMd?: boolean } = {}
): HookInstallResult {
  const mcpEntry = resolveMcpCommand();
  const reports: HookClientReport[] = [];
  for (const client of clients) {
    if (client === 'claude') reports.push(installClaude(projectRoot, mcpEntry));
    else if (client === 'cursor') reports.push(installCursor(projectRoot, mcpEntry));
    else if (client === 'opencode') reports.push(installOpenCodeClient(projectRoot, mcpEntry));
    else if (client === 'gemini') reports.push(installGeminiClient(projectRoot, mcpEntry));
    else reports.push(installCopilotClient(projectRoot, mcpEntry));
  }

  const details = reports.flatMap((report) => report.details);
  let agentsMdUpdated = false;
  if (options.agentsMd !== false) {
    try {
      agentsMdUpdated = ensureAgentsDiscipline(projectRoot) === 'added';
      details.push(agentsMdUpdated
        ? 'Appended Autonomous Memory Discipline block to AGENTS.md'
        : 'AGENTS.md already contains FastrMemory autonomous discipline block');
    } catch (err: any) {
      details.push(`Failed to update AGENTS.md: ${err.message}`);
    }
  }

  const statusOf = (client: HookClient): boolean =>
    reports.find((report) => report.client === client)?.status === 'updated';

  return {
    claudeCodeUpdated: statusOf('claude'),
    cursorUpdated: statusOf('cursor'),
    geminiUpdated: statusOf('gemini'),
    copilotUpdated: statusOf('copilot'),
    openCodeUpdated: statusOf('opencode'),
    agentsMdUpdated,
    details,
    clients: reports
  };
}

/**
 * Removes exactly what `installHookClients` added: the `fastrmemory` MCP entry, every hook
 * command this installer wrote, the managed OpenCode plugin, and the AGENTS.md discipline block.
 * Files and directories that end up empty are removed. User entries in the same files survive.
 *
 * Idempotent: a second run reports `absent` and writes nothing.
 */
export function uninstallHookClients(
  projectRoot: string = process.cwd(),
  clients: HookClient[] = [...HOOK_CLIENTS],
  options: { agentsMd?: boolean } = {}
): HookUninstallResult {
  const reports: HookClientReport[] = [];
  for (const client of clients) {
    if (client === 'claude') reports.push(uninstallClaude(projectRoot));
    else if (client === 'cursor') reports.push(uninstallCursor(projectRoot));
    else if (client === 'opencode') reports.push(uninstallOpenCodeClient(projectRoot));
    else if (client === 'gemini') reports.push(uninstallGeminiClient(projectRoot));
    else reports.push(uninstallCopilotClient(projectRoot));
  }

  const details = reports.flatMap((report) => report.details);
  let agentsMdRemoved = false;
  if (options.agentsMd !== false) {
    try {
      agentsMdRemoved = removeAgentsDiscipline(projectRoot);
      details.push(agentsMdRemoved
        ? 'Removed Autonomous Memory Discipline block from AGENTS.md'
        : 'AGENTS.md contains no FastrMemory discipline block');
    } catch (err: any) {
      details.push(`Failed to clean AGENTS.md: ${err.message}`);
    }
  }

  return {
    changed: agentsMdRemoved || reports.some((report) => report.status === 'removed'),
    agentsMdRemoved,
    details,
    clients: reports
  };
}

/** Backwards-compatible wrapper used by the setup wizard. Installs every client plus AGENTS.md. */
export function installAgentHooks(projectRoot: string = process.cwd()): HookInstallResult {
  return installHookClients(projectRoot, [...HOOK_CLIENTS]);
}

import * as path from 'node:path';
import { ClaudeHookSpec, mergeClaudeHooks, updateJsonConfig, upsertMcpServer } from './json-config.js';
import { ensureAgentsDiscipline, resolveMcpCommand } from './setup.js';

export interface HookInstallResult {
  claudeCodeUpdated: boolean;
  cursorUpdated: boolean;
  agentsMdUpdated: boolean;
  details: string[];
}

function quoteArg(arg: string): string {
  // Hooks may run under Git Bash on Windows, where unquoted backslashes are eaten. Node accepts
  // forward slashes on every platform, so normalise paths and always quote them.
  if (/[\\/]/.test(arg)) return `"${arg.replace(/\\/g, '/').replace(/"/g, '\\"')}"`;
  return /[\s"]/.test(arg) ? `"${arg.replace(/"/g, '\\"')}"` : arg;
}

/** Shell command Claude Code runs for a lifecycle event, using the same entry point as the MCP server. */
export function buildHookCommand(event: string, platform: NodeJS.Platform = process.platform): string {
  const target = resolveMcpCommand(platform);
  // Hook commands run through a shell, so npx needs no `cmd /c` wrapper here.
  const base = target.command === 'cmd' ? target.args.slice(1) : [target.command, ...target.args];
  const withoutMcp = base[base.length - 1] === 'mcp' ? base.slice(0, -1) : base;
  return [...withoutMcp, 'hook', 'run', event].map(quoteArg).join(' ');
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

/**
 * Wires FastrMemory into the current project for Claude Code and Cursor.
 *
 * Claude Code reads project MCP servers from `.mcp.json` and hooks from `.claude/settings.json`
 * (both shareable with the team). Existing servers and hooks are preserved; files are backed up
 * once and written atomically; unparseable files are left untouched and reported.
 */
export function installAgentHooks(projectRoot: string = process.cwd()): HookInstallResult {
  const details: string[] = [];
  let claudeCodeUpdated = false;
  let cursorUpdated = false;
  let agentsMdUpdated = false;
  const mcpEntry = resolveMcpCommand();

  const describe = (label: string, res: { filePath: string; changed: boolean; backupPath?: string }) => {
    const rel = path.relative(projectRoot, res.filePath) || res.filePath;
    if (!res.changed) return `${label}: already up to date (${rel})`;
    return `${label}: updated ${rel}${res.backupPath ? ` (backup: ${path.basename(res.backupPath)})` : ''}`;
  };

  // 1. Claude Code: project-scoped MCP server + lifecycle hooks
  try {
    const mcp = updateJsonConfig(path.join(projectRoot, '.mcp.json'), (config) => upsertMcpServer(config, 'fastrmemory', mcpEntry));
    details.push(describe('Claude Code MCP server', mcp));
    const hooks = updateJsonConfig(path.join(projectRoot, '.claude', 'settings.json'), (config) => mergeClaudeHooks(config, claudeHookSpecs()));
    details.push(describe('Claude Code hooks', hooks));
    claudeCodeUpdated = mcp.changed || hooks.changed;
  } catch (err: any) {
    details.push(`Failed to update Claude Code: ${err.message}`);
  }

  // 2. Cursor MCP Configuration (.cursor/mcp.json)
  try {
    const cursor = updateJsonConfig(path.join(projectRoot, '.cursor', 'mcp.json'), (config) => upsertMcpServer(config, 'fastrmemory', mcpEntry));
    details.push(describe('Cursor MCP server', cursor));
    cursorUpdated = cursor.changed;
  } catch (err: any) {
    details.push(`Failed to update Cursor MCP: ${err.message}`);
  }

  // 3. Autonomous Memory Discipline in AGENTS.md
  try {
    agentsMdUpdated = ensureAgentsDiscipline(projectRoot) === 'added';
    details.push(agentsMdUpdated
      ? 'Appended Autonomous Memory Discipline block to AGENTS.md'
      : 'AGENTS.md already contains FastrMemory autonomous discipline block');
  } catch (err: any) {
    details.push(`Failed to update AGENTS.md: ${err.message}`);
  }

  return {
    claudeCodeUpdated,
    cursorUpdated,
    agentsMdUpdated,
    details,
  };
}

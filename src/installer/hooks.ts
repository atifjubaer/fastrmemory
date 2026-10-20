import * as path from 'node:path';
import { ClaudeHookSpec, mergeClaudeHooks, updateJsonConfig, upsertMcpServer } from './json-config.js';
import { ensureAgentsDiscipline, resolveMcpCommand } from './setup.js';
import { installOpenCode } from './opencode.js';
import { installGemini } from './gemini.js';
import { installCopilot } from './copilot.js';
import { buildHookCommand } from './commands.js';

export { buildHookCommand } from './commands.js';

export interface HookInstallResult {
  claudeCodeUpdated: boolean;
  cursorUpdated: boolean;
  geminiUpdated: boolean;
  copilotUpdated: boolean;
  openCodeUpdated: boolean;
  agentsMdUpdated: boolean;
  details: string[];
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
 * Wires FastrMemory into the current project for Claude Code, Cursor, Gemini CLI, Copilot CLI,
 * and OpenCode.
 *
 * Claude Code reads project MCP servers from `.mcp.json` and hooks from `.claude/settings.json`;
 * Gemini CLI reads both from `.gemini/settings.json`; Copilot CLI reads `.github/mcp.json` and
 * `.github/hooks/*.json` (all shareable with the team). Existing servers and hooks are preserved;
 * files are backed up once and written atomically; unparseable files are left untouched and
 * reported.
 */
export function installAgentHooks(projectRoot: string = process.cwd()): HookInstallResult {
  const details: string[] = [];
  let claudeCodeUpdated = false;
  let cursorUpdated = false;
  let geminiUpdated = false;
  let copilotUpdated = false;
  let openCodeUpdated = false;
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

  // 3. Gemini CLI: project MCP server + lifecycle hooks
  try {
    const gemini = installGemini(projectRoot, mcpEntry);
    details.push(describe('Gemini CLI MCP + hooks', gemini));
    geminiUpdated = gemini.changed;
  } catch (err: any) {
    details.push(`Failed to update Gemini CLI: ${err.message}`);
  }

  // 4. GitHub Copilot CLI: project MCP config + lifecycle hooks
  try {
    const copilot = installCopilot(projectRoot, mcpEntry);
    details.push(describe('Copilot CLI MCP', copilot.mcp));
    details.push(describe('Copilot CLI hooks', copilot.hooks));
    copilotUpdated = copilot.changed;
  } catch (err: any) {
    details.push(`Failed to update Copilot CLI: ${err.message}`);
  }

  // 5. OpenCode V2: project MCP server + auto-loaded context plugin
  try {
    const openCode = installOpenCode(projectRoot, mcpEntry);
    details.push(...openCode.details);
    openCodeUpdated = openCode.changed;
  } catch (err: any) {
    details.push(`Failed to update OpenCode: ${err.message}`);
  }

  // 6. Autonomous Memory Discipline in AGENTS.md
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
    geminiUpdated,
    copilotUpdated,
    openCodeUpdated,
    agentsMdUpdated,
    details,
  };
}

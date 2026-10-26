import * as fs from 'node:fs';
import * as path from 'node:path';
import { deleteJsonConfigIfTrivial, JsonUpdateResult, McpServerEntry, updateJsonConfig } from './json-config.js';

export interface OpenCodeInstallResult {
  changed: boolean;
  config?: JsonUpdateResult;
  configSkipped?: string;
  pluginPath: string;
  pluginChanged: boolean;
  pluginSkipped?: string;
  details: string[];
}

export interface OpenCodeConfigTarget {
  filePath: string;
  jsonc: boolean;
}

/**
 * Pick the OpenCode config file that already exists, preferring parsable JSON over JSONC.
 * When none exists, create `opencode.json` at the project root.
 */
export function resolveOpenCodeConfigPath(projectRoot: string): OpenCodeConfigTarget {
  const candidates = [
    path.join(projectRoot, 'opencode.json'),
    path.join(projectRoot, '.opencode', 'opencode.json'),
    path.join(projectRoot, 'opencode.jsonc'),
    path.join(projectRoot, '.opencode', 'opencode.jsonc')
  ];
  const existing = candidates.find((filePath) => fs.existsSync(filePath));
  if (existing) {
    return { filePath: existing, jsonc: existing.endsWith('.jsonc') };
  }
  return { filePath: candidates[0], jsonc: false };
}

/** Adds or replaces the FastrMemory server under OpenCode V2's `mcp.servers` map. */
export function upsertOpenCodeMcpServer(config: Record<string, any>, entry: McpServerEntry): void {
  if (!config.mcp || typeof config.mcp !== 'object' || Array.isArray(config.mcp)) {
    config.mcp = {};
  }
  if (!config.mcp.servers || typeof config.mcp.servers !== 'object' || Array.isArray(config.mcp.servers)) {
    config.mcp.servers = {};
  }
  config.mcp.servers.fastrmemory = {
    type: 'local',
    command: [entry.command, ...entry.args]
  };
}

const MANAGED_MARKER = '// fastrmemory:managed';

/** The OpenCode V2 plugin that injects session context and captures pre-compaction snapshots. */
export function buildOpenCodePlugin(command: string[]): string {
  return [
    MANAGED_MARKER,
    'import { spawn } from "node:child_process"',
    'import { Plugin } from "@opencode/plugin"',
    '',
    `const FASTR_COMMAND = ${JSON.stringify(command)}`,
    '',
    'function runFastr(event, payload, cwd) {',
    '  return new Promise((resolve) => {',
    '    const child = spawn(FASTR_COMMAND[0], [...FASTR_COMMAND.slice(1), "hook", "run", event], {',
    '      cwd,',
    '      stdio: ["pipe", "pipe", "pipe"],',
    '      windowsHide: true,',
    '    })',
    '    let stdout = ""',
    '    const timer = setTimeout(() => { child.kill(); resolve("") }, 15000)',
    '    child.stdout.on("data", (chunk) => { stdout += chunk.toString() })',
    '    child.stdin.on("error", () => {})',
    '    child.on("error", () => { clearTimeout(timer); resolve("") })',
    '    child.on("close", (code) => {',
    '      clearTimeout(timer)',
    '      resolve(code === 0 ? stdout.trim() : "")',
    '    })',
    '    child.stdin.end(payload ? JSON.stringify(payload) : "")',
    '  })',
    '}',
    '',
    'export default Plugin.define({',
    '  id: "fastrmemory",',
    '  async setup(ctx) {',
    '    const cwd = ctx.location.project?.canonical ?? ctx.location.directory',
    '    const started = new Set()',
    '',
    '    await ctx.session.hook("context", async (event) => {',
    '      if (started.has(event.sessionID)) return',
    '      started.add(event.sessionID)',
    '      const text = await runFastr("SessionStart", { cwd, session_id: event.sessionID }, cwd)',
    '      if (text) event.system.push({ type: "text", text })',
    '    })',
    '',
    '    await ctx.session.hook("compaction", async (event) => {',
    '      await runFastr("PreCompact", { cwd, session_id: event.sessionID }, cwd)',
    '    })',
    '  },',
    '})',
    ''
  ].join('\n');
}

function writeManagedPlugin(projectRoot: string, content: string): { filePath: string; changed: boolean; skipped?: string } {
  const filePath = path.join(projectRoot, '.opencode', 'plugins', 'fastrmemory', 'index.ts');
  if (fs.existsSync(filePath)) {
    const current = fs.readFileSync(filePath, 'utf-8');
    if (!current.includes(MANAGED_MARKER)) {
      return { filePath, changed: false, skipped: 'existing user-owned plugin was not overwritten' };
    }
    if (current === content) {
      return { filePath, changed: false };
    }
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
  return { filePath, changed: true };
}

/**
 * Wire FastrMemory into OpenCode V2: an MCP server in `opencode.json(c)` and an auto-loaded
 * plugin for session-start context and pre-compaction snapshots.
 */
export function installOpenCode(projectRoot: string, mcpEntry: McpServerEntry): OpenCodeInstallResult {
  const details: string[] = [];
  const target = resolveOpenCodeConfigPath(projectRoot);
  let config: JsonUpdateResult | undefined;
  let configSkipped: string | undefined;

  if (target.jsonc) {
    configSkipped = `OpenCode config is JSONC (${path.relative(projectRoot, target.filePath)}); add the fastrmemory MCP server manually`;
    details.push(`OpenCode MCP server: ${configSkipped}`);
  } else {
    config = updateJsonConfig(target.filePath, (draft) => upsertOpenCodeMcpServer(draft, mcpEntry));
    const rel = path.relative(projectRoot, config.filePath) || config.filePath;
    details.push(config.changed
      ? `OpenCode MCP server: updated ${rel}${config.backupPath ? ` (backup: ${path.basename(config.backupPath)})` : ''}`
      : `OpenCode MCP server: already up to date (${rel})`);
  }

  const hookCommand = [mcpEntry.command, ...mcpEntry.args];
  if (hookCommand[hookCommand.length - 1] === 'mcp') {
    hookCommand.pop();
  }
  const pluginContent = buildOpenCodePlugin(hookCommand);
  const plugin = writeManagedPlugin(projectRoot, pluginContent);
  const pluginRel = path.relative(projectRoot, plugin.filePath) || plugin.filePath;
  if (plugin.skipped) {
    details.push(`OpenCode plugin: ${plugin.skipped} (${pluginRel})`);
  } else {
    details.push(plugin.changed
      ? `OpenCode plugin: updated ${pluginRel}`
      : `OpenCode plugin: already up to date (${pluginRel})`);
  }

  return {
    changed: Boolean(config?.changed) || plugin.changed,
    config,
    configSkipped,
    pluginPath: plugin.filePath,
    pluginChanged: plugin.changed,
    pluginSkipped: plugin.skipped,
    details
  };
}

/** Removes the `mcp.servers.fastrmemory` entry and prunes the containers it leaves empty. */
export function removeOpenCodeMcpServer(config: Record<string, any>): boolean {
  const mcp = config.mcp;
  if (!mcp || typeof mcp !== 'object' || Array.isArray(mcp)) return false;
  const servers = mcp.servers;
  if (!servers || typeof servers !== 'object' || Array.isArray(servers)) return false;
  if (!Object.prototype.hasOwnProperty.call(servers, 'fastrmemory')) return false;

  delete servers.fastrmemory;
  if (Object.keys(servers).length === 0) delete mcp.servers;
  if (Object.keys(mcp).length === 0) delete config.mcp;
  return true;
}

/** Removes the managed OpenCode plugin, and only when it still carries the managed marker. */
export function removeManagedPlugin(projectRoot: string): { filePath: string; deleted: boolean; skipped?: string } {
  const filePath = path.join(projectRoot, '.opencode', 'plugins', 'fastrmemory', 'index.ts');
  if (!fs.existsSync(filePath)) return { filePath, deleted: false };
  const current = fs.readFileSync(filePath, 'utf-8');
  if (!current.includes(MANAGED_MARKER)) {
    return { filePath, deleted: false, skipped: 'existing user-owned plugin was not removed' };
  }
  fs.unlinkSync(filePath);
  // Remove only the directories this installer created, and only while they are empty.
  for (const dir of [
    path.dirname(filePath),
    path.join(projectRoot, '.opencode', 'plugins'),
    path.join(projectRoot, '.opencode')
  ]) {
    try {
      if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
    } catch {
      // A non-empty or locked directory is not an uninstall failure.
    }
  }
  return { filePath, deleted: true };
}

export interface OpenCodeUninstallResult {
  changed: boolean;
  removedMcp: boolean;
  configDeleted: boolean;
  pluginDeleted: boolean;
  configSkipped?: string;
  details: string[];
}

/** Removes the OpenCode MCP server and managed plugin, leaving every other setting untouched. */
export function uninstallOpenCode(projectRoot: string): OpenCodeUninstallResult {
  const details: string[] = [];
  const target = resolveOpenCodeConfigPath(projectRoot);
  let removedMcp = false;
  let configDeleted = false;
  let configSkipped: string | undefined;

  if (!fs.existsSync(target.filePath)) {
    details.push('OpenCode MCP server: not configured');
  } else if (target.jsonc) {
    configSkipped = `OpenCode config is JSONC (${path.relative(projectRoot, target.filePath)}); remove the fastrmemory MCP server manually`;
    details.push(`OpenCode MCP server: ${configSkipped}`);
  } else {
    updateJsonConfig(target.filePath, (draft) => {
      removedMcp = removeOpenCodeMcpServer(draft);
    }, { backup: false });
    configDeleted = deleteJsonConfigIfTrivial(target.filePath);
    const rel = path.relative(projectRoot, target.filePath) || target.filePath;
    details.push(removedMcp ? `OpenCode MCP server: removed from ${rel}` : `OpenCode MCP server: not present in ${rel}`);
  }

  const plugin = removeManagedPlugin(projectRoot);
  const pluginRel = path.relative(projectRoot, plugin.filePath) || plugin.filePath;
  if (plugin.skipped) details.push(`OpenCode plugin: ${plugin.skipped} (${pluginRel})`);
  else details.push(plugin.deleted ? `OpenCode plugin: removed ${pluginRel}` : 'OpenCode plugin: not present');

  return {
    changed: removedMcp || configDeleted || plugin.deleted,
    removedMcp,
    configDeleted,
    pluginDeleted: plugin.deleted,
    configSkipped,
    details
  };
}

import * as fs from 'node:fs';
import * as path from 'node:path';
import { JsonUpdateResult, McpServerEntry, updateJsonConfig } from './json-config.js';

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

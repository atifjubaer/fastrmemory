import * as path from 'node:path';
import { buildHookCommand } from './commands.js';
import { isFastrHookCommand, JsonUpdateResult, McpServerEntry, updateJsonConfig } from './json-config.js';

export interface CopilotHookSpec {
  event: string;
  command: string;
  matcher?: string;
  timeoutSec: number;
}

export interface CopilotInstallResult {
  changed: boolean;
  mcp: JsonUpdateResult;
  hooks: JsonUpdateResult;
}

/**
 * Copilot CLI reads project MCP servers from `.github/mcp.json` and project hooks from
 * `.github/hooks/*.json`. Hook events are camelCase; preToolUse can only allow/deny/ask, so an
 * active trap becomes an `ask` decision with the trap text as the reason.
 */
export function copilotHookSpecs(platform: NodeJS.Platform = process.platform): CopilotHookSpec[] {
  return [
    {
      event: 'sessionStart',
      command: buildHookCommand('SessionStart', platform, 'copilot'),
      timeoutSec: 10
    },
    {
      event: 'preToolUse',
      matcher: 'edit|create|str_replace_editor|apply_patch',
      command: buildHookCommand('PreToolUse', platform, 'copilot'),
      timeoutSec: 10
    },
    {
      event: 'preCompact',
      command: buildHookCommand('PreCompact', platform, 'copilot'),
      timeoutSec: 15
    },
    {
      event: 'sessionEnd',
      command: buildHookCommand('SessionEnd', platform, 'copilot'),
      timeoutSec: 15
    }
  ];
}

function isFastrCopilotHook(entry: any): boolean {
  return [entry?.command, entry?.bash, entry?.powershell, entry?.exec]
    .some((value) => isFastrHookCommand(value));
}

/** Merges FastrMemory hooks into a Copilot hook file while preserving user-owned entries. */
export function mergeCopilotHooks(config: Record<string, any>, specs: CopilotHookSpec[]): void {
  if (config.version === undefined) config.version = 1;
  if (config.version !== 1) {
    throw new Error(`Refusing to modify Copilot hooks: unsupported version ${JSON.stringify(config.version)}`);
  }
  if (!config.hooks || typeof config.hooks !== 'object' || Array.isArray(config.hooks)) {
    config.hooks = {};
  }

  for (const spec of specs) {
    const current = config.hooks[spec.event];
    if (current !== undefined && !Array.isArray(current)) {
      throw new Error(`Refusing to modify Copilot hooks: ${spec.event} is not an array`);
    }
    const kept = (current ?? []).filter((entry: any) => !isFastrCopilotHook(entry));
    const entry: Record<string, any> = {
      type: 'command',
      command: spec.command,
      timeoutSec: spec.timeoutSec
    };
    if (spec.matcher !== undefined) entry.matcher = spec.matcher;
    kept.push(entry);
    config.hooks[spec.event] = kept;
  }
}

/**
 * Adds or replaces the `fastrmemory` server in Copilot's project MCP file. Copilot accepts both
 * `mcpServers` and a bare top-level map; keep whichever shape the project already uses.
 */
export function upsertCopilotMcpServer(config: Record<string, any>, entry: McpServerEntry): void {
  const server: Record<string, any> = {
    type: 'local',
    command: entry.command,
    args: entry.args
  };
  if (entry.env) server.env = entry.env;

  if (config.mcpServers !== undefined) {
    if (!config.mcpServers || typeof config.mcpServers !== 'object' || Array.isArray(config.mcpServers)) {
      throw new Error('Refusing to modify Copilot MCP config: mcpServers is not an object');
    }
    config.mcpServers.fastrmemory = server;
    return;
  }

  const hasBareServers = Object.keys(config).some((key) => {
    const value = config[key];
    return value && typeof value === 'object' && !Array.isArray(value)
      && (typeof value.command === 'string' || typeof value.url === 'string');
  });
  if (hasBareServers) {
    config.fastrmemory = server;
    return;
  }

  config.mcpServers = { fastrmemory: server };
}

/** Writes project-scoped Copilot MCP and hook files, preserving unrelated settings and hooks. */
export function installCopilot(projectRoot: string, mcpEntry: McpServerEntry): CopilotInstallResult {
  const mcp = updateJsonConfig(path.join(projectRoot, '.github', 'mcp.json'), (config) => {
    upsertCopilotMcpServer(config, mcpEntry);
  });
  const hooks = updateJsonConfig(path.join(projectRoot, '.github', 'hooks', 'fastrmemory.json'), (config) => {
    mergeCopilotHooks(config, copilotHookSpecs());
  });
  return { changed: mcp.changed || hooks.changed, mcp, hooks };
}

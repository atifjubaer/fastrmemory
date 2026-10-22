import * as path from 'node:path';
import { buildHookCommand } from './commands.js';
import { isFastrHookCommand, JsonUpdateResult, McpServerEntry, updateJsonConfig, upsertMcpServer } from './json-config.js';

export interface GeminiHookSpec {
  event: string;
  command: string;
  name: string;
  matcher?: string;
  timeout?: number;
}

/**
 * Gemini CLI's project settings contract: MCP servers live under `mcpServers`, while lifecycle
 * hooks live under `hooks.<Event>` with `{ matcher, hooks: [{ type, command }] }` groups.
 */
export function geminiHookSpecs(platform: NodeJS.Platform = process.platform): GeminiHookSpec[] {
  const command = (event: string) => buildHookCommand(event, platform, 'gemini');
  return [
    {
      event: 'SessionStart',
      matcher: '*',
      name: 'fastrmemory-session-start',
      command: command('SessionStart'),
      timeout: 10000
    },
    {
      event: 'BeforeTool',
      matcher: 'write_file|replace',
      name: 'fastrmemory-trap-check',
      command: command('PreToolUse'),
      timeout: 10000
    },
    {
      event: 'PreCompress',
      matcher: '*',
      name: 'fastrmemory-pre-compress',
      command: command('PreCompact'),
      timeout: 15000
    },
    {
      event: 'SessionEnd',
      matcher: '*',
      name: 'fastrmemory-session-end',
      command: command('SessionEnd'),
      timeout: 15000
    }
  ];
}

/**
 * Merges FastrMemory's command hooks into Gemini's settings shape. User hooks are preserved;
 * hooks previously written by this installer are replaced so re-running is idempotent.
 */
export function mergeGeminiHooks(config: Record<string, any>, specs: GeminiHookSpec[]): void {
  if (!config.hooks || typeof config.hooks !== 'object' || Array.isArray(config.hooks)) {
    config.hooks = {};
  }

  for (const spec of specs) {
    const current = config.hooks[spec.event];
    let groups: any[] = Array.isArray(current) ? current.slice() : [];
    if (typeof current === 'string' && !isFastrHookCommand(current)) {
      groups = [{ hooks: [{ type: 'command', command: current }] }];
    }

    groups = groups
      .map((group) => {
        if (!group || !Array.isArray(group.hooks)) return group;
        const kept = group.hooks.filter((hook: any) => {
          if (isFastrHookCommand(hook?.command)) return false;
          return !/^fastrmemory(?:[-_:]|$)/i.test(String(hook?.name ?? ''));
        });
        return { ...group, hooks: kept };
      })
      .filter((group) => !group || !Array.isArray(group.hooks) || group.hooks.length > 0);

    const hook: Record<string, any> = {
      name: spec.name,
      type: 'command',
      command: spec.command
    };
    if (spec.timeout !== undefined) hook.timeout = spec.timeout;
    const group: Record<string, any> = { hooks: [hook] };
    if (spec.matcher !== undefined) group.matcher = spec.matcher;
    groups.push(group);
    config.hooks[spec.event] = groups;
  }
}

/** Writes project-scoped Gemini CLI MCP and hook settings, preserving unrelated settings. */
export function installGemini(projectRoot: string, mcpEntry: McpServerEntry): JsonUpdateResult {
  return updateJsonConfig(path.join(projectRoot, '.gemini', 'settings.json'), (config) => {
    upsertMcpServer(config, 'fastrmemory', mcpEntry);
    mergeGeminiHooks(config, geminiHookSpecs());
  });
}

import * as fs from 'node:fs';
import * as path from 'node:path';
import { buildHookCommand } from './commands.js';
import {
  deleteJsonConfigIfTrivial,
  isFastrHookCommand,
  JsonUpdateResult,
  McpServerEntry,
  removeMcpServer,
  updateJsonConfig,
  upsertMcpServer
} from './json-config.js';

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

/** True for a hook entry this installer owns, matched by command or by its `fastrmemory-*` name. */
export function isFastrGeminiHook(hook: any): boolean {
  if (isFastrHookCommand(hook?.command)) return true;
  return /^fastrmemory(?:[-_:]|$)/i.test(String(hook?.name ?? ''));
}

/** Removes this installer's Gemini hooks and prunes empty events. Returns hooks removed. */
export function removeGeminiHooks(config: Record<string, any>): number {
  const hooks = config.hooks;
  if (!hooks || typeof hooks !== 'object' || Array.isArray(hooks)) return 0;

  let removed = 0;
  for (const event of Object.keys(hooks)) {
    const current = hooks[event];
    if (typeof current === 'string') {
      if (isFastrHookCommand(current)) {
        delete hooks[event];
        removed++;
      }
      continue;
    }
    if (!Array.isArray(current)) continue;

    const keptGroups: any[] = [];
    for (const group of current) {
      if (!group || !Array.isArray(group.hooks)) {
        keptGroups.push(group);
        continue;
      }
      const kept = group.hooks.filter((hook: any) => {
        if (!isFastrGeminiHook(hook)) return true;
        removed++;
        return false;
      });
      if (kept.length > 0) keptGroups.push({ ...group, hooks: kept });
    }

    if (keptGroups.length === 0) delete hooks[event];
    else hooks[event] = keptGroups;
  }

  if (Object.keys(hooks).length === 0) delete config.hooks;
  return removed;
}

export interface GeminiUninstallResult {
  filePath: string;
  changed: boolean;
  removedHooks: number;
  removedMcp: boolean;
  fileDeleted: boolean;
}

/** Removes the FastrMemory MCP server and hooks from Gemini CLI project settings. */
export function uninstallGemini(projectRoot: string): GeminiUninstallResult {
  const filePath = path.join(projectRoot, '.gemini', 'settings.json');
  if (!fs.existsSync(filePath)) {
    return { filePath, changed: false, removedHooks: 0, removedMcp: false, fileDeleted: false };
  }
  let removedHooks = 0;
  let removedMcp = false;
  const result = updateJsonConfig(filePath, (config) => {
    removedMcp = removeMcpServer(config, 'fastrmemory');
    removedHooks = removeGeminiHooks(config);
  }, { backup: false });
  const fileDeleted = deleteJsonConfigIfTrivial(filePath);
  return { filePath, changed: result.changed, removedHooks, removedMcp, fileDeleted };
}

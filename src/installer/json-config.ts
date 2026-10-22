import * as fs from 'node:fs';
import * as path from 'node:path';

export class ConfigParseError extends Error {
  constructor(public filePath: string, cause: string) {
    super(`Refusing to modify ${filePath}: it is not valid JSON (${cause}). Fix or remove it and re-run.`);
  }
}

export interface JsonUpdateResult {
  filePath: string;
  created: boolean;
  changed: boolean;
  backupPath?: string;
}

/**
 * Safely read-modify-write a JSON config file owned by another tool (Claude Code, Cursor, ...).
 *
 * - Never overwrites a file it cannot parse (a torn read or a JSONC comment must not wipe the user's config).
 * - Writes a one-time `<file>.fastr.bak` copy of the original before the first change.
 * - Writes atomically (temp file + rename) so a concurrent reader never sees a half-written file.
 * - Skips the write entirely when the mutation produces no change.
 */
export function updateJsonConfig(filePath: string, mutate: (config: Record<string, any>) => void): JsonUpdateResult {
  const exists = fs.existsSync(filePath);
  let original = '';
  let config: Record<string, any> = {};

  if (exists) {
    original = fs.readFileSync(filePath, 'utf-8');
    if (original.trim()) {
      try {
        config = JSON.parse(original);
      } catch (err: any) {
        throw new ConfigParseError(filePath, err.message);
      }
      if (config === null || typeof config !== 'object' || Array.isArray(config)) {
        throw new ConfigParseError(filePath, 'top-level value is not an object');
      }
    }
  }

  mutate(config);
  const next = JSON.stringify(config, null, 2) + '\n';
  if (exists && original.trim() && JSON.stringify(JSON.parse(original)) === JSON.stringify(config)) {
    return { filePath, created: false, changed: false };
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  let backupPath: string | undefined;
  if (exists && original.trim()) {
    backupPath = `${filePath}.fastr.bak`;
    if (!fs.existsSync(backupPath)) {
      fs.writeFileSync(backupPath, original, 'utf-8');
    }
  }

  const tmpPath = `${filePath}.fastr-${process.pid}.tmp`;
  fs.writeFileSync(tmpPath, next, 'utf-8');
  try {
    fs.renameSync(tmpPath, filePath);
  } catch (err) {
    try { fs.unlinkSync(tmpPath); } catch {}
    throw err;
  }

  return { filePath, created: !exists, changed: true, backupPath };
}

export interface McpServerEntry {
  command: string;
  args: string[];
  env?: Record<string, string>;
}

/** Adds or replaces the `fastrmemory` entry under `mcpServers`, leaving every other server untouched. */
export function upsertMcpServer(config: Record<string, any>, name: string, entry: McpServerEntry): void {
  if (!config.mcpServers || typeof config.mcpServers !== 'object' || Array.isArray(config.mcpServers)) {
    config.mcpServers = {};
  }
  config.mcpServers[name] = entry;
}

export interface ClaudeHookSpec {
  event: string;
  command: string;
  matcher?: string;
  timeout?: number;
}

/**
 * Recognises hook commands this installer wrote (now or in older versions), e.g.
 * `fastrmemory hook run SessionStart`, `node "/x/dist/bin/fastr.js" hook run PreToolUse`,
 * `npx -y fastrmemory@0.3.0 hook run SessionEnd`.
 */
export function isFastrHookCommand(command: unknown): boolean {
  return typeof command === 'string' && /fastr[\w./\\@-]*"?\s+hook\s+run\b/i.test(command);
}

/**
 * Merges command hooks into Claude Code's settings in its documented shape:
 *   hooks: { <Event>: [ { matcher?, hooks: [ { type: "command", command, timeout? } ] } ] }
 *
 * Existing user hooks are preserved. Entries previously written by fastrmemory (including the
 * invalid bare-string form written by older versions) are replaced, so re-running is idempotent.
 */
export function mergeClaudeHooks(config: Record<string, any>, specs: ClaudeHookSpec[]): void {
  if (!config.hooks || typeof config.hooks !== 'object' || Array.isArray(config.hooks)) {
    config.hooks = {};
  }

  for (const spec of specs) {
    const current = config.hooks[spec.event];
    let groups: any[] = Array.isArray(current) ? current : [];
    // Older fastrmemory versions wrote `"SessionStart": "fastrmemory hook run SessionStart"`, which Claude Code rejects.
    if (typeof current === 'string' && !isFastrHookCommand(current)) {
      groups = [{ hooks: [{ type: 'command', command: current }] }];
    }

    groups = groups
      .map((group) => {
        if (!group || !Array.isArray(group.hooks)) return group;
        const kept = group.hooks.filter((h: any) => !isFastrHookCommand(h?.command));
        return { ...group, hooks: kept };
      })
      .filter((group) => !group || !Array.isArray(group.hooks) || group.hooks.length > 0);

    const hook: Record<string, any> = { type: 'command', command: spec.command };
    if (spec.timeout !== undefined) hook.timeout = spec.timeout;
    const group: Record<string, any> = { hooks: [hook] };
    if (spec.matcher !== undefined) group.matcher = spec.matcher;
    groups.push(group);

    config.hooks[spec.event] = groups;
  }
}

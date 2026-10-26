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
export function updateJsonConfig(
  filePath: string,
  mutate: (config: Record<string, any>) => void,
  options: { backup?: boolean } = {}
): JsonUpdateResult {
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
  // Uninstall passes backup: false so removing an entry never overwrites the recovery point
  // that install wrote, and never creates one for a file it is about to delete.
  if (options.backup !== false && exists && original.trim()) {
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

/**
 * Removes one server entry and prunes the containers it leaves empty, so an uninstall returns
 * the file to the shape the user had before install instead of leaving `{"mcpServers": {}}`.
 * Returns true when an entry was actually removed.
 */
export function removeMcpServer(config: Record<string, any>, name: string): boolean {
  const servers = config.mcpServers;
  if (!servers || typeof servers !== 'object' || Array.isArray(servers)) return false;
  if (!Object.prototype.hasOwnProperty.call(servers, name)) return false;
  delete servers[name];
  if (Object.keys(servers).length === 0) delete config.mcpServers;
  return true;
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

/**
 * Removes every hook group this installer wrote and prunes the events and the `hooks` object
 * that are left empty. User hooks in the same file survive untouched.
 *
 * Returns the number of command hooks removed.
 */
export function removeClaudeHooks(config: Record<string, any>): number {
  const hooks = config.hooks;
  if (!hooks || typeof hooks !== 'object' || Array.isArray(hooks)) return 0;

  let removed = 0;
  for (const event of Object.keys(hooks)) {
    const current = hooks[event];
    if (typeof current === 'string') {
      // Legacy bare-string form written by older versions.
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
        if (!isFastrHookCommand(hook?.command)) return true;
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

/**
 * Deletes a JSON file when the mutation left nothing of the user's own in it, so an uninstall
 * does not leave a `{}` file behind in a project that had no such config before install.
 *
 * Deliberately does not touch the one-time `.fastr.bak` that install may have written: the
 * backup is a recovery point, and restoring it here could resurrect keys the user deleted
 * after installing.
 */
export function deleteJsonConfigIfTrivial(
  filePath: string,
  isTrivial: (config: Record<string, any>) => boolean = (config) => Object.keys(config).length === 0
): boolean {
  if (!fs.existsSync(filePath)) return false;
  const raw = fs.readFileSync(filePath, 'utf-8');
  if (!raw.trim()) return false;
  let config: Record<string, any>;
  try {
    config = JSON.parse(raw);
  } catch {
    return false;
  }
  if (config === null || typeof config !== 'object' || Array.isArray(config)) return false;
  if (!isTrivial(config)) return false;
  fs.unlinkSync(filePath);
  return true;
}

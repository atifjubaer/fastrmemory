// Pure helpers for the FastrMemory VS Code extension.
// This module must NOT import 'vscode' (or 'node:sqlite') so it can be unit tested under plain Node.
import * as path from 'node:path';

export type TrapStatus = 'verified' | 'staging';

export interface ActiveTrap {
  id: string;
  title: string;
  content: string;
  module: string;
  reward_score: number;
  status: TrapStatus;
  filePaths: string[];
}

/**
 * Active error traps: verified + staging (e.g. freshly produced by `fastrmemory learn`),
 * excluding superseded/dormant and bi-temporally closed rows. Mirrors repository.listTraps().
 */
export const ACTIVE_TRAPS_SQL = `
  SELECT m.id, m.title, m.content, m.module, m.reward_score, m.status, fl.file_path
  FROM memories m
  LEFT JOIN file_links fl ON m.id = fl.memory_id
  WHERE m.kind = 'error_trap'
    AND m.valid_to IS NULL
    AND m.status IN ('verified', 'staging')
`;

export interface TrapRow {
  id: string;
  title: string;
  content: string;
  module: string;
  reward_score: number | null;
  status: string;
  file_path: string | null;
}

/**
 * Normalize a path (DB-stored or editor fsPath) to a workspace-relative, forward-slash key.
 * Absolute paths inside `root` are made relative; case is folded on Windows only.
 */
export function normalizeTrapPath(p: string, root: string | undefined, platform: NodeJS.Platform = process.platform): string {
  const pathApi = platform === 'win32' ? path.win32 : path.posix;
  let s = p.trim();
  if (root && pathApi.isAbsolute(s)) {
    const rel = pathApi.relative(root, s);
    if (rel && !rel.startsWith('..') && !pathApi.isAbsolute(rel)) s = rel;
  }
  s = s.replace(/\\/g, '/').replace(/^(\.\/)+/, '').replace(/\/{2,}/g, '/');
  return platform === 'win32' ? s.toLowerCase() : s;
}

export interface TrapIndex {
  traps: ActiveTrap[];
  byFile: Map<string, ActiveTrap[]>;
}

export function buildTrapIndex(rows: TrapRow[], root: string | undefined, platform: NodeJS.Platform = process.platform): TrapIndex {
  const distinct = new Map<string, ActiveTrap>();
  const byFile = new Map<string, ActiveTrap[]>();

  for (const r of rows) {
    let trap = distinct.get(r.id);
    if (!trap) {
      trap = {
        id: String(r.id),
        title: String(r.title ?? ''),
        content: String(r.content ?? ''),
        module: String(r.module ?? 'general'),
        reward_score: Number(r.reward_score || 2.0),
        status: r.status === 'staging' ? 'staging' : 'verified',
        filePaths: [],
      };
      distinct.set(trap.id, trap);
    }
    if (r.file_path) {
      if (!trap.filePaths.includes(r.file_path)) trap.filePaths.push(r.file_path);
      const key = normalizeTrapPath(r.file_path, root, platform);
      const list = byFile.get(key) ?? [];
      if (!list.includes(trap)) list.push(trap);
      byFile.set(key, list);
    }
  }

  return { traps: Array.from(distinct.values()), byFile };
}

/**
 * Parse the text output of `fastrmemory trap list`, used when node:sqlite is unavailable in the
 * extension host. Line format: `- [<id>] [<STATUS>] "<title>" (<module>) • Recall Boost: 2.0x`.
 * The CLI does not print file links, so traps parsed this way have no `filePaths`.
 */
export function parseTrapListOutput(text: string): ActiveTrap[] {
  const out: ActiveTrap[] = [];
  const re = /^\s*-\s*\[([^\]]+)\]\s*\[([A-Za-z_]+)\]\s*"(.*)"\s*\(([^)]*)\)/;
  for (const line of text.split(/\r?\n/)) {
    const m = re.exec(line);
    if (!m) continue;
    const status = m[2].toLowerCase();
    if (status !== 'verified' && status !== 'staging') continue;
    out.push({
      id: m[1],
      title: m[3],
      content: '',
      module: m[4],
      reward_score: 2.0,
      status,
      filePaths: [],
    });
  }
  return out;
}

export interface CliInvocation {
  command: string;
  args: string[];
}

export interface CliResolveOptions {
  /** User-configured `fastrmemory.cliPath` (a binary on PATH, an absolute binary path, or a .js entry point). */
  configuredPath?: string;
  workspaceRoot?: string;
  platform?: NodeJS.Platform;
  envPath?: string;
  exists: (p: string) => boolean;
  /** Returns the `name` field of the package.json at the given path, or undefined. */
  packageName?: (pkgJsonPath: string) => string | undefined;
}

const CLI_ENTRY = ['dist', 'bin', 'fastr.js'];

/**
 * Work out how to spawn the FastrMemory CLI with execFile (no shell).
 * On Windows, npm shims are `.cmd` files that cannot be run without a shell, so we locate the
 * real JS entry point and run it with the system `node` instead.
 */
export function resolveCliInvocation(opts: CliResolveOptions): CliInvocation {
  const platform = opts.platform ?? process.platform;
  const pathApi = platform === 'win32' ? path.win32 : path.posix;
  const node = platform === 'win32' ? 'node.exe' : 'node';
  const configured = opts.configuredPath?.trim();

  if (configured) {
    if (/\.(c|m)?js$/i.test(configured)) return { command: node, args: [configured] };
    return { command: configured, args: [] };
  }

  if (opts.workspaceRoot) {
    const local = pathApi.join(opts.workspaceRoot, 'node_modules', 'fastrmemory', ...CLI_ENTRY);
    if (opts.exists(local)) return { command: node, args: [local] };

    // Working inside the fastrmemory repo itself (built).
    const self = pathApi.join(opts.workspaceRoot, ...CLI_ENTRY);
    if (opts.exists(self) && opts.packageName?.(pathApi.join(opts.workspaceRoot, 'package.json')) === 'fastrmemory') {
      return { command: node, args: [self] };
    }
  }

  if (platform === 'win32') {
    for (const dir of (opts.envPath ?? '').split(';').filter(Boolean)) {
      if (opts.exists(pathApi.join(dir, 'fastrmemory.cmd'))) {
        const entry = pathApi.join(dir, 'node_modules', 'fastrmemory', ...CLI_ENTRY);
        if (opts.exists(entry)) return { command: node, args: [entry] };
      }
    }
  }

  return { command: 'fastrmemory', args: [] };
}

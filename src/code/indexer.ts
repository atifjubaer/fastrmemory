import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import { extractSymbols, detectLanguage } from './symbol-extractor.js';
import type { CodeSymbol } from './types.js';

/** Extensions worth indexing. Anything else is skipped without reading the file. */
const INDEXED_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.mts', '.cts', '.py', '.go', '.rs']);

const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'dist-ui', 'build', 'coverage', '.fastr',
  'vendor', 'target', '.next', '.turbo', '.venv', '__pycache__'
]);

/** A generated bundle is not a codebase; skip anything implausibly large. */
const MAX_FILE_BYTES = 1_000_000;

export interface IndexResult {
  files: number;
  symbols: number;
  removed: number;
  skipped: number;
}

/** Stable ids make re-indexing idempotent: the same declaration always maps to one row. */
export function symbolId(projectId: string, filePath: string, name: string, kind: string): string {
  return `sym_${crypto.createHash('sha256').update(`${projectId}:${filePath}:${name}:${kind}`).digest('hex').slice(0, 12)}`;
}

/** file_links and symbols both store repo-relative POSIX paths. */
export function toRepoPath(filePath: string): string {
  return String(filePath ?? '').replace(/\\/g, '/').replace(/^\.\//, '').trim();
}

function signatureHash(signature: string): string {
  return crypto.createHash('sha256').update(signature).digest('hex').slice(0, 16);
}

/**
 * Replaces the symbols recorded for one file. Declarations that no longer exist are deleted,
 * so a rename inside the file leaves no stale row behind.
 */
export function indexFileSymbols(
  db: DatabaseSync,
  projectId: string,
  filePath: string,
  content: string
): { symbols: number; removed: number } {
  const rel = toRepoPath(filePath);
  const extracted = extractSymbols(content, rel);
  const now = new Date().toISOString();

  const existing = db
    .prepare('SELECT id, name, kind FROM symbols WHERE project_id = ? AND file_path = ?')
    .all(projectId, rel) as Array<{ id: string; name: string; kind: string }>;

  const keep = new Set(extracted.map((symbol) => `${symbol.name}::${symbol.kind}`));
  const stale = existing.filter((row) => !keep.has(`${row.name}::${row.kind}`));

  db.exec('SAVEPOINT fastr_index_file');
  try {
    const remove = db.prepare('DELETE FROM symbols WHERE id = ?');
    for (const row of stale) remove.run(row.id);

    const upsert = db.prepare(`
      INSERT INTO symbols (
        id, project_id, file_path, name, kind, line_start, line_end, exported, signature_hash, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        line_start = excluded.line_start,
        line_end = excluded.line_end,
        exported = excluded.exported,
        signature_hash = excluded.signature_hash,
        updated_at = excluded.updated_at
    `);

    for (const symbol of extracted) {
      upsert.run(
        symbolId(projectId, rel, symbol.name, symbol.kind),
        projectId,
        rel,
        symbol.name,
        symbol.kind,
        symbol.lineStart,
        symbol.lineEnd,
        symbol.exported ? 1 : 0,
        signatureHash(symbol.signature),
        now
      );
    }

    db.exec('RELEASE fastr_index_file');
  } catch (err) {
    db.exec('ROLLBACK TO fastr_index_file');
    db.exec('RELEASE fastr_index_file');
    throw err;
  }

  return { symbols: extracted.length, removed: stale.length };
}

function samePath(a: string, b: string): boolean {
  const left = path.resolve(a);
  const right = path.resolve(b);
  return process.platform === 'win32' ? left.toLowerCase() === right.toLowerCase() : left === right;
}

/**
 * Tracked files from git, or null when the directory is not the root of a git repository.
 * A subdirectory of a repo is rejected on purpose: `git ls-files` would answer with paths
 * relative to the repository root, not to the directory being indexed.
 */
function gitTrackedFiles(projectRoot: string): string[] | null {
  try {
    const top = execFileSync('git', ['rev-parse', '--show-toplevel'], {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    if (!top || !samePath(top, projectRoot)) return null;

    // --cached --others covers tracked files plus new files that are not ignored, so a
    // file created seconds ago is indexed without waiting for a commit.
    const listed = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
    return listed.split('\0').filter(Boolean);
  } catch {
    return null;
  }
}

function walkFiles(projectRoot: string): string[] {
  const found: string[] = [];

  const visit = (dir: string, prefix: string): void => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue;
        visit(path.join(dir, entry.name), rel);
      } else if (entry.isFile()) {
        found.push(rel);
      }
    }
  };

  visit(projectRoot, '');
  return found;
}

/** Files eligible for indexing, repo-relative and POSIX-separated. */
export function listIndexableFiles(projectRoot: string): string[] {
  const candidates = gitTrackedFiles(projectRoot) ?? walkFiles(projectRoot);
  return candidates.filter((rel) => {
    if (!INDEXED_EXTENSIONS.has(path.extname(rel).toLowerCase())) return false;
    return !rel.split('/').some((segment) => SKIP_DIRS.has(segment));
  });
}

/**
 * Indexes every eligible file. Safe to run repeatedly: unchanged files produce identical
 * rows, and files that no longer exist keep their old rows until removed on a full rebuild.
 */
export function indexProjectSymbols(
  db: DatabaseSync,
  projectId: string,
  projectRoot: string,
  options: { files?: string[] } = {}
): IndexResult {
  const files = options.files ?? listIndexableFiles(projectRoot);
  const result: IndexResult = { files: 0, symbols: 0, removed: 0, skipped: 0 };

  for (const rel of files) {
    if (!detectLanguage(rel)) {
      result.skipped++;
      continue;
    }

    const absolute = path.join(projectRoot, rel);
    let stat: fs.Stats;
    try {
      stat = fs.statSync(absolute);
    } catch {
      result.skipped++;
      continue;
    }
    if (!stat.isFile() || stat.size > MAX_FILE_BYTES) {
      result.skipped++;
      continue;
    }

    let content: string;
    try {
      content = fs.readFileSync(absolute, 'utf8');
    } catch {
      result.skipped++;
      continue;
    }
    if (content.includes('\0')) {
      result.skipped++;
      continue;
    }

    const indexed = indexFileSymbols(db, projectId, rel, content);
    result.files++;
    result.symbols += indexed.symbols;
    result.removed += indexed.removed;
  }

  return result;
}

/** Symbols declared in one file, in source order. */
export function getSymbolsForFile(db: DatabaseSync, projectId: string, filePath: string): CodeSymbol[] {
  try {
    return db.prepare(`
      SELECT * FROM symbols
      WHERE project_id = ? AND file_path = ?
      ORDER BY line_start ASC
    `).all(projectId, toRepoPath(filePath)) as unknown as CodeSymbol[];
  } catch {
    return [];
  }
}

/** Name lookup, exact matches first, then substring matches. */
export function findSymbolsByName(
  db: DatabaseSync,
  projectId: string,
  query: string,
  limit: number = 20
): CodeSymbol[] {
  const trimmed = String(query ?? '').trim();
  if (!trimmed) return [];
  try {
    return db.prepare(`
      SELECT * FROM symbols
      WHERE project_id = ? AND (name = ? OR name LIKE ?)
      ORDER BY CASE WHEN name = ? THEN 0 ELSE 1 END, name ASC
      LIMIT ?
    `).all(projectId, trimmed, `%${trimmed}%`, trimmed, Math.max(1, Math.floor(limit))) as unknown as CodeSymbol[];
  } catch {
    return [];
  }
}

/** The innermost symbol whose line range contains `line` (1-based). */
export function getSymbolAtLine(
  db: DatabaseSync,
  projectId: string,
  filePath: string,
  line: number
): CodeSymbol | null {
  const target = Math.floor(Number(line));
  if (!Number.isFinite(target) || target < 1) return null;
  try {
    const row = db.prepare(`
      SELECT * FROM symbols
      WHERE project_id = ? AND file_path = ? AND line_start <= ? AND line_end >= ?
      ORDER BY (line_end - line_start) ASC
      LIMIT 1
    `).get(projectId, toRepoPath(filePath), target, target) as CodeSymbol | undefined;
    return row ?? null;
  } catch {
    return null;
  }
}

/** Number of indexed symbols for a project. */
export function countSymbols(db: DatabaseSync, projectId: string): number {
  try {
    const row = db.prepare('SELECT COUNT(*) AS c FROM symbols WHERE project_id = ?').get(projectId) as
      | { c?: number }
      | undefined;
    return Number(row?.c ?? 0);
  } catch {
    return 0;
  }
}

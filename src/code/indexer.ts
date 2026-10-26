import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import { extractSymbols, detectLanguage } from './symbol-extractor.js';
import type { CodeSymbol, SymbolKind } from './types.js';

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
  /** Links re-pointed at a symbol that moved to another file. */
  followed: number;
  /** Links dropped because the symbol they named no longer exists. */
  unlinked: number;
}

/** Stable ids make re-indexing idempotent: the same declaration always maps to one row. */
export function symbolId(projectId: string, filePath: string, name: string, kind: string): string {
  return `sym_${crypto.createHash('sha256').update(`${projectId}:${filePath}:${name}:${kind}`).digest('hex').slice(0, 12)}`;
}

/**
 * Identity of a declaration independent of its name and its file.
 *
 * This is what a memory anchors to. A path-based id breaks when the file moves and a
 * name-based id breaks when the symbol is renamed; a hash of the body with the symbol's
 * own name masked out survives both.
 */
export function declarationId(kind: string, normalizedBody: string): string {
  return `decl_${crypto.createHash('sha256').update(`${kind}:${normalizedBody}`).digest('hex').slice(0, 16)}`;
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
        id, project_id, file_path, name, kind, line_start, line_end, exported, signature_hash,
        declaration_id, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        line_start = excluded.line_start,
        line_end = excluded.line_end,
        exported = excluded.exported,
        signature_hash = excluded.signature_hash,
        declaration_id = excluded.declaration_id,
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
        declarationId(symbol.kind, symbol.normalizedBody),
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
 * Removes symbol rows for files that no longer exist on disk.
 *
 * A moved file leaves its old row behind, because the indexer only visits files it can
 * read. Pruning by what is actually on disk keeps the index an accurate view of the
 * project rather than an accumulating history of where things used to be.
 */
export function pruneMissingSymbols(
  db: DatabaseSync,
  projectId: string,
  projectRoot: string
): number {
  let removed = 0;
  try {
    const rows = db.prepare('SELECT DISTINCT file_path FROM symbols WHERE project_id = ?').all(projectId) as Array<{
      file_path: string;
    }>;

    const remove = db.prepare('DELETE FROM symbols WHERE project_id = ? AND file_path = ?');
    for (const row of rows) {
      const absolute = path.join(projectRoot, row.file_path);
      if (fs.existsSync(absolute)) continue;
      remove.run(projectId, row.file_path);
      removed++;
    }
  } catch {
    return removed;
  }
  return removed;
}

/**
 * Indexes every eligible file. Safe to run repeatedly: unchanged files produce identical
 * rows, and files that no longer exist have their rows pruned.
 */
export function indexProjectSymbols(
  db: DatabaseSync,
  projectId: string,
  projectRoot: string,
  options: { files?: string[] } = {}
): IndexResult {
  const files = options.files ?? listIndexableFiles(projectRoot);
  const result: IndexResult = { files: 0, symbols: 0, removed: 0, skipped: 0, followed: 0, unlinked: 0 };

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

  // Pruning happens before reconciliation. A row for a file that no longer exists would
  // otherwise win the declaration match and point the link at a symbol that is gone.
  result.removed += pruneMissingSymbols(db, projectId, projectRoot);

  // Links are re-pointed after the whole index is current, so a symbol that moved from one
  // file to another is matched against its final location rather than an intermediate one.
  const reconciled = reconcileSymbolLinks(db, projectId);
  result.followed = reconciled.followed;
  result.unlinked = reconciled.unlinked;

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

export interface ResolvedSymbol {
  symbolId: string;
  declarationId: string;
  name: string;
  kind: SymbolKind;
  filePath: string;
}

/**
 * Finds the indexed symbol a memory should anchor to.
 *
 * Exact name in the named file wins. Failing that, an exact name anywhere in the project is
 * used, which is what lets a caller anchor to a symbol it only knows by name. A partial
 * match is the last resort because two symbols can share a substring.
 */
export function resolveSymbolId(
  db: DatabaseSync,
  projectId: string,
  filePath: string | undefined,
  symbolName: string,
  options: { schema?: 'main' | 'global_db' } = {}
): ResolvedSymbol | null {
  const name = String(symbolName ?? '').trim();
  if (!name) return null;

  const table = options.schema === 'global_db' ? 'global_db.symbols' : 'symbols';

  const toResolved = (row: any): ResolvedSymbol => ({
    symbolId: row.id,
    declarationId: row.declaration_id,
    name: row.name,
    kind: row.kind,
    filePath: row.file_path
  });

  try {
    const rel = toRepoPath(filePath ?? '');
    if (rel) {
      const exact = db.prepare(`
        SELECT * FROM ${table} WHERE project_id = ? AND file_path = ? AND name = ?
        ORDER BY line_start ASC LIMIT 1
      `).get(projectId, rel, name) as any;
      if (exact) return toResolved(exact);
    }

    const anywhere = db.prepare(`
      SELECT * FROM ${table} WHERE project_id = ? AND name = ?
      ORDER BY file_path ASC, line_start ASC LIMIT 1
    `).get(projectId, name) as any;
    if (anywhere) return toResolved(anywhere);

    const partial = db.prepare(`
      SELECT * FROM ${table} WHERE project_id = ? AND name LIKE ?
      ORDER BY file_path ASC, line_start ASC LIMIT 1
    `).get(projectId, `%${name}%`) as any;
    return partial ? toResolved(partial) : null;
  } catch {
    return null;
  }
}

/**
 * Re-points memory links whose symbol moved or was renamed.
 *
 * A link keeps its `declaration_id` even when the symbol is gone, so a rename is followed
 * by matching the declaration id against the new index. When the declaration is gone for
 * good, the link is dropped rather than left pointing at a path that no longer holds it.
 */
export function reconcileSymbolLinks(
  db: DatabaseSync,
  projectId: string,
  options: { schema?: 'main' | 'global_db' } = {}
): { followed: number; unlinked: number } {
  const schema = options.schema ?? 'main';
  const links = schema === 'global_db' ? 'global_db.file_links' : 'file_links';
  const symbols = schema === 'global_db' ? 'global_db.symbols' : 'symbols';

  let followed = 0;
  let unlinked = 0;

  try {
    const rows = db.prepare(`
      SELECT rowid AS rid, memory_id, file_path, symbol_name, symbol_id, declaration_id
      FROM ${links}
      WHERE symbol_name IS NOT NULL AND symbol_name != ''
    `).all() as any[];

    const update = db.prepare(`
      UPDATE ${links}
      SET file_path = ?, symbol_name = ?, symbol_id = ?, declaration_id = ?
      WHERE rowid = ?
    `);
    const drop = db.prepare(`DELETE FROM ${links} WHERE rowid = ?`);

    db.exec('SAVEPOINT fastr_reconcile_links');
    try {
      for (const row of rows) {
        const declaration = row.declaration_id
          ? (db.prepare(`
              SELECT * FROM ${symbols} WHERE project_id = ? AND declaration_id = ?
              ORDER BY file_path ASC, line_start ASC LIMIT 1
            `).get(projectId, row.declaration_id) as any)
          : null;

        if (declaration) {
          if (declaration.id !== row.symbol_id || declaration.file_path !== row.file_path) followed++;
          update.run(
            declaration.file_path,
            declaration.name,
            declaration.id,
            declaration.declaration_id,
            row.rid
          );
          continue;
        }

        // The declaration is gone. Keep the link only if the symbol still exists by name in
        // the same file; otherwise the anchor is meaningless and the link is removed.
        const stillThere = db.prepare(`
          SELECT id FROM ${symbols}
          WHERE project_id = ? AND file_path = ? AND name = ?
          LIMIT 1
        `).get(projectId, row.file_path, row.symbol_name) as any;

        if (stillThere) {
          update.run(row.file_path, row.symbol_name, stillThere.id, row.declaration_id, row.rid);
        } else {
          drop.run(row.rid);
          unlinked++;
        }
      }
      db.exec('RELEASE fastr_reconcile_links');
    } catch (err) {
      db.exec('ROLLBACK TO fastr_reconcile_links');
      db.exec('RELEASE fastr_reconcile_links');
      throw err;
    }
  } catch {
    return { followed, unlinked };
  }

  return { followed, unlinked };
}

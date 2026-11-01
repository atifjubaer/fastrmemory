import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import { extractSymbols, detectLanguage, extractImports, extractCallReferences } from './symbol-extractor.js';
import type { CodeSymbol, SymbolKind } from './types.js';
import type { CodeEdgeType } from '../db/schema.js';

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
  callEdges?: number;
  importEdges?: number;
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

/** Deterministic ID for code relationship edges (calls, imports). */
export function codeEdgeId(
  projectId: string,
  edgeType: CodeEdgeType,
  sourceId: string,
  targetId: string
): string {
  return `edge_${edgeType.slice(0, 4)}_${crypto
    .createHash('sha256')
    .update(`${projectId}:${edgeType}:${sourceId}:${targetId}`)
    .digest('hex')
    .slice(0, 16)}`;
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

    // Extract & record import edges for this file
    const imports = extractImports(content, rel);
    try {
      db.prepare("DELETE FROM code_edges WHERE project_id = ? AND source_id = ? AND edge_type = 'imports'").run(projectId, rel);
      const insertImport = db.prepare(`
        INSERT OR IGNORE INTO code_edges (id, project_id, source_id, target_id, edge_type, weight, created_at)
        VALUES (?, ?, ?, ?, 'imports', 1.0, ?)
      `);
      for (const imp of imports) {
        insertImport.run(codeEdgeId(projectId, 'imports', rel, imp), projectId, rel, imp, now);
      }
    } catch {
      // Table may not exist yet in legacy mock tests; ignore gracefully
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

/** Files that mark a directory as a code project worth indexing automatically. */
const PROJECT_MARKERS = [
  '.git',
  'package.json',
  'pyproject.toml',
  'requirements.txt',
  'go.mod',
  'Cargo.toml',
  'pom.xml',
  'build.gradle',
  'build.gradle.kts',
  'Gemfile',
  'composer.json',
  'mix.exs',
  'pubspec.yaml'
];

/**
 * Auto-indexing must never walk a home directory or an arbitrary folder that happens to
 * be the current working directory. The home directory is always rejected, and the
 * remaining candidates need at least one project marker.
 */
export function isIndexableProjectRoot(projectRoot: string): boolean {
  try {
    if (samePath(projectRoot, os.homedir())) return false;
    return PROJECT_MARKERS.some((marker) => fs.existsSync(path.join(projectRoot, marker)));
  } catch {
    return false;
  }
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

  // Build cross-symbol call graph
  const validFiles = files.filter((f) => fs.existsSync(path.join(projectRoot, f)));
  result.callEdges = indexProjectCalls(db, projectId, projectRoot, validFiles);
  result.importEdges = countCodeEdges(db, projectId).imports;

  return result;
}

/**
 * Scans function/method bodies of all indexed symbols in the project to extract
 * call relationships ('calls' edges) in code_edges.
 */
export function indexProjectCalls(
  db: DatabaseSync,
  projectId: string,
  projectRoot: string,
  files: string[]
): number {
  try {
    const allSymbols = db.prepare(`
      SELECT id, file_path, name, kind, line_start, line_end FROM symbols WHERE project_id = ?
    `).all(projectId) as Array<{ id: string; file_path: string; name: string; kind: string; line_start: number; line_end: number }>;

    if (allSymbols.length === 0) return 0;

    const byName = new Map<string, Array<{ id: string; file_path: string; kind: string }>>();
    const knownNames = new Set<string>();
    for (const s of allSymbols) {
      knownNames.add(s.name);
      const list = byName.get(s.name) ?? [];
      list.push({ id: s.id, file_path: s.file_path, kind: s.kind });
      byName.set(s.name, list);
    }

    const importRows = db.prepare(`
      SELECT source_id, target_id FROM code_edges WHERE project_id = ? AND edge_type = 'imports'
    `).all(projectId) as Array<{ source_id: string; target_id: string }>;

    const importsByFile = new Map<string, Set<string>>();
    for (const row of importRows) {
      const set = importsByFile.get(row.source_id) ?? new Set<string>();
      set.add(row.target_id);
      importsByFile.set(row.source_id, set);
    }

    // Incremental callers pass only the files they touched. Delete those files' outgoing
    // call edges, then drop edges whose source or target symbol no longer exists. A full
    // index passes every file, which stays equivalent to the previous project-wide delete.
    const deleteFileCalls = db.prepare(`
      DELETE FROM code_edges
      WHERE project_id = ? AND edge_type = 'calls'
        AND source_id IN (SELECT id FROM symbols WHERE project_id = ? AND file_path = ?)
    `);
    for (const rel of files) deleteFileCalls.run(projectId, projectId, rel);
    db.prepare(`
      DELETE FROM code_edges
      WHERE project_id = ? AND edge_type = 'calls'
        AND (
          source_id NOT IN (SELECT id FROM symbols WHERE project_id = ?)
          OR target_id NOT IN (SELECT id FROM symbols WHERE project_id = ?)
        )
    `).run(projectId, projectId, projectId);

    const insertCall = db.prepare(`
      INSERT OR IGNORE INTO code_edges (id, project_id, source_id, target_id, edge_type, weight, created_at)
      VALUES (?, ?, ?, ?, 'calls', 1.0, ?)
    `);

    const now = new Date().toISOString();
    let createdCount = 0;

    for (const rel of files) {
      const fileSymbols = allSymbols.filter(
        (s) => s.file_path === rel && (s.kind === 'function' || s.kind === 'method')
      );
      if (fileSymbols.length === 0) continue;

      const absPath = path.join(projectRoot, rel);
      let content = '';
      try {
        content = fs.readFileSync(absPath, 'utf8');
      } catch {
        continue;
      }
      const lines = content.split(/\r?\n/);
      const fileImports = importsByFile.get(rel);

      for (const sym of fileSymbols) {
        const bodyLines = lines.slice(sym.line_start - 1, sym.line_end);
        const bodyText = bodyLines.join('\n');
        const calledNames = extractCallReferences(bodyText, knownNames, sym.name);

        for (const calleeName of calledNames) {
          const candidates = byName.get(calleeName);
          if (!candidates || candidates.length === 0) continue;

          let target = candidates.find((c) => c.file_path === rel);
          if (!target && fileImports) {
            target = candidates.find(
              (c) => fileImports.has(c.file_path) || Array.from(fileImports).some((imp) => c.file_path.startsWith(imp))
            );
          }
          if (!target && candidates.length === 1) {
            target = candidates[0];
          }

          if (target && target.id !== sym.id) {
            const edgeId = codeEdgeId(projectId, 'calls', sym.id, target.id);
            insertCall.run(edgeId, projectId, sym.id, target.id, now);
            createdCount++;
          }
        }
      }
    }

    return createdCount;
  } catch {
    return 0;
  }
}

export interface IndexFileResult {
  indexed: boolean;
  symbols: number;
  removed: number;
  callEdges: number;
}

/**
 * Re-indexes one file in place. Session hooks use this so the call graph follows edits
 * without rescanning the project. Import edges are refreshed by `indexFileSymbols`; call
 * edges are rebuilt only for this file.
 */
export function indexFile(
  db: DatabaseSync,
  projectId: string,
  projectRoot: string,
  filePath: string
): IndexFileResult {
  const empty: IndexFileResult = { indexed: false, symbols: 0, removed: 0, callEdges: 0 };
  try {
    const rel = toRepoPath(
      path.isAbsolute(filePath) ? path.relative(projectRoot, filePath) : filePath
    );
    if (!rel || !detectLanguage(rel)) return empty;

    const absolute = path.join(projectRoot, rel);
    let stat: fs.Stats;
    try {
      stat = fs.statSync(absolute);
    } catch {
      return empty;
    }
    if (!stat.isFile() || stat.size > MAX_FILE_BYTES) return empty;

    let content: string;
    try {
      content = fs.readFileSync(absolute, 'utf8');
    } catch {
      return empty;
    }
    if (content.includes('\0')) return empty;

    const indexed = indexFileSymbols(db, projectId, rel, content);
    if (indexed.removed > 0) {
      try {
        reconcileSymbolLinks(db, projectId);
      } catch {}
    }
    const callEdges = indexProjectCalls(db, projectId, projectRoot, [rel]);
    return { indexed: true, symbols: indexed.symbols, removed: indexed.removed, callEdges };
  } catch {
    return empty;
  }
}

export interface EnsureIndexResult {
  indexed: boolean;
  symbols: number;
  callEdges: number;
  importEdges: number;
}

/**
 * First-run index for a project. It runs only when the project has no symbols, or when
 * symbols exist but the call graph was never built (a database from before 0.9.0). Set
 * `FASTR_AUTO_INDEX=0` to disable it.
 */
export function ensureProjectIndexed(
  db: DatabaseSync,
  projectId: string,
  projectRoot: string
): EnsureIndexResult {
  const empty: EnsureIndexResult = { indexed: false, symbols: 0, callEdges: 0, importEdges: 0 };
  if (process.env.FASTR_AUTO_INDEX === '0') return empty;
  if (!isIndexableProjectRoot(projectRoot)) return empty;

  try {
    const symbols = countSymbols(db, projectId);
    if (symbols === 0) {
      const result = indexProjectSymbols(db, projectId, projectRoot);
      return {
        indexed: true,
        symbols: result.symbols,
        callEdges: result.callEdges ?? 0,
        importEdges: result.importEdges ?? 0
      };
    }

    const edges = countCodeEdges(db, projectId);
    return { ...empty, callEdges: edges.calls, importEdges: edges.imports };
  } catch {
    return empty;
  }
}

/** Counts code relationship edges by type. */
export function countCodeEdges(
  db: DatabaseSync,
  projectId: string
): { calls: number; imports: number; total: number } {
  try {
    const rows = db.prepare(`
      SELECT edge_type, COUNT(*) AS c FROM code_edges WHERE project_id = ? GROUP BY edge_type
    `).all(projectId) as Array<{ edge_type: string; c: number }>;

    let calls = 0;
    let imports = 0;
    for (const r of rows) {
      if (r.edge_type === 'calls') calls = Number(r.c);
      else if (r.edge_type === 'imports') imports = Number(r.c);
    }
    return { calls, imports, total: calls + imports };
  } catch {
    return { calls: 0, imports: 0, total: 0 };
  }
}

/** Finds callers of the given symbol IDs. */
export function getCallersForSymbols(
  db: DatabaseSync,
  projectId: string,
  symbolIds: string[]
): Array<{ callerSymbolId: string; callerFilePath: string; callerName: string; calleeSymbolId: string }> {
  if (symbolIds.length === 0) return [];
  try {
    const placeholders = symbolIds.map(() => '?').join(',');
    return db.prepare(`
      SELECT ce.source_id AS callerSymbolId, s.file_path AS callerFilePath, s.name AS callerName, ce.target_id AS calleeSymbolId
      FROM code_edges ce
      JOIN symbols s ON s.id = ce.source_id
      WHERE ce.project_id = ? AND ce.edge_type = 'calls' AND ce.target_id IN (${placeholders})
    `).all(projectId, ...symbolIds) as any[];
  } catch {
    return [];
  }
}

/** Finds callees of the given symbol IDs. */
export function getCalleesForSymbols(
  db: DatabaseSync,
  projectId: string,
  symbolIds: string[]
): Array<{ calleeSymbolId: string; calleeFilePath: string; calleeName: string; callerSymbolId: string }> {
  if (symbolIds.length === 0) return [];
  try {
    const placeholders = symbolIds.map(() => '?').join(',');
    return db.prepare(`
      SELECT ce.target_id AS calleeSymbolId, s.file_path AS calleeFilePath, s.name AS calleeName, ce.source_id AS callerSymbolId
      FROM code_edges ce
      JOIN symbols s ON s.id = ce.target_id
      WHERE ce.project_id = ? AND ce.edge_type = 'calls' AND ce.source_id IN (${placeholders})
    `).all(projectId, ...symbolIds) as any[];
  } catch {
    return [];
  }
}

/** Returns the top architectural hub nodes ('God Nodes' with highest in-degree / caller count). */
export function getGodNodes(
  db: DatabaseSync,
  projectId: string,
  limit: number = 10
): Array<{ symbolId: string; name: string; filePath: string; kind: string; inDegree: number }> {
  try {
    return db.prepare(`
      SELECT ce.target_id AS symbolId, s.name, s.file_path AS filePath, s.kind, COUNT(*) AS inDegree
      FROM code_edges ce
      JOIN symbols s ON s.id = ce.target_id
      WHERE ce.project_id = ? AND ce.edge_type = 'calls'
      GROUP BY ce.target_id
      ORDER BY inDegree DESC, s.name ASC
      LIMIT ?
    `).all(projectId, limit) as any[];
  } catch {
    return [];
  }
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

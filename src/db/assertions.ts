import * as fs from 'node:fs';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import type { Memory } from './schema.js';

/**
 * Memory assertions.
 *
 * A memory records something an agent learned. Most stay true forever. Some describe a
 * specific defect that someone later fixes: "never call Date.now() for JWT expiry in
 * src/auth/jwt.ts". Once that call is gone the memory is not wrong, it is *spent* — but
 * until now nothing noticed, so it kept its 2.0x trap boost and kept being injected into
 * every prompt for a bug that no longer exists.
 *
 * An assertion is the condition that makes a memory still relevant. It is checked lazily
 * (on recall and on heal); when it stops holding, the memory is dormant.
 *
 * The grammar is deliberately tiny and literal — no regular expressions, no shell, and no
 * SQL beyond a symbol lookup, so a memory can never turn into executable code:
 *
 *   text_present:<path>::<text>     the file still contains <text>
 *   symbol_present:<path>::<name>   the symbol index still lists <name> in <path>
 *   file_present:<path>             the file still exists
 *
 * All three are "present" checks on purpose: the assertion describes what keeps the memory
 * alive, so the memory retires when the thing it describes is gone.
 */

export type AssertionKind = 'text_present' | 'symbol_present' | 'file_present';

export interface ParsedAssertion {
  kind: AssertionKind;
  /** Repo-relative path the assertion is evaluated against. */
  file: string;
  /** Literal text or symbol name. Absent for `file_present`. */
  needle?: string;
  /** The original string, echoed back in reports. */
  raw: string;
}

/** A check that could not be evaluated is not a failure; the memory stays as it was. */
export type AssertionVerdict = 'holds' | 'fails' | 'unknown';

export interface AssertionResult {
  verdict: AssertionVerdict;
  /** One line explaining the verdict, for the doctor and CLI output. */
  reason: string;
}

const MAX_FILE_BYTES = 2_000_000;
const MAX_CACHED_FILES = 128;

/**
 * Parses an assertion string. Returns null for anything malformed, so a bad assertion is a
 * missing assertion rather than a crash or a false dormancy.
 */
export function parseAssertion(raw: string | null | undefined): ParsedAssertion | null {
  if (!raw || typeof raw !== 'string') return null;
  const text = raw.trim();
  if (!text) return null;

  const colon = text.indexOf(':');
  if (colon <= 0) return null;
  const kind = text.slice(0, colon).trim() as AssertionKind;
  const rest = text.slice(colon + 1);

  if (kind === 'file_present') {
    const file = rest.trim();
    return file ? { kind, file, raw: text } : null;
  }

  if (kind === 'text_present' || kind === 'symbol_present') {
    // The path cannot contain "::", the needle can, so split on the first one only.
    const separator = rest.indexOf('::');
    if (separator <= 0) return null;
    const file = rest.slice(0, separator).trim();
    const needle = rest.slice(separator + 2).trim();
    if (!file || !needle) return null;
    return { kind, file, needle, raw: text };
  }

  return null;
}

/** Resolves a repo-relative assertion path, refusing anything outside the project. */
function resolveInside(projectRoot: string, file: string): string | null {
  const root = path.resolve(projectRoot);
  const target = path.resolve(root, file);
  const relative = path.relative(root, target);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) return null;
  return target;
}

interface CachedFile {
  path: string;
  mtimeMs: number;
  content: string | null;
}

const fileCache: CachedFile[] = [];

/**
 * Reads a file, cached by path and modification time.
 *
 * Recall checks assertions on every call, so this avoids re-reading the same handful of
 * source files over and over. The mtime is part of the key, so an edit is always seen.
 * Returns null when the file cannot be read for any reason.
 */
function readCached(absolutePath: string): string | null {
  let stat: fs.Stats;
  try {
    stat = fs.statSync(absolutePath);
  } catch {
    return null;
  }
  if (!stat.isFile() || stat.size > MAX_FILE_BYTES) return null;

  const cached = fileCache.find((entry) => entry.path === absolutePath);
  if (cached && cached.mtimeMs === stat.mtimeMs) return cached.content;

  let content: string | null;
  try {
    content = fs.readFileSync(absolutePath, 'utf-8');
  } catch {
    content = null;
  }

  const next: CachedFile = { path: absolutePath, mtimeMs: stat.mtimeMs, content };
  if (cached) {
    fileCache[fileCache.indexOf(cached)] = next;
  } else {
    fileCache.push(next);
    if (fileCache.length > MAX_CACHED_FILES) fileCache.shift();
  }
  return content;
}

/** Test hook: forget cached file contents. */
export function clearAssertionCache(): void {
  fileCache.length = 0;
}

/**
 * Evaluates one assertion against the working tree.
 *
 * `unknown` is returned whenever the check cannot be made — no project root, an
 * unresolvable path, an unindexed project, an unreadable file. A memory is only ever
 * retired on a positive `fails`, so a missing checkout or an unbuilt symbol index can
 * never silently drop every trap a project has.
 */
export function evaluateAssertion(
  db: DatabaseSync,
  projectId: string,
  projectRoot: string | undefined,
  assertion: ParsedAssertion
): AssertionResult {
  if (!projectRoot) {
    return { verdict: 'unknown', reason: 'no project root available' };
  }

  const absolute = resolveInside(projectRoot, assertion.file);
  if (!absolute) {
    return { verdict: 'unknown', reason: `path escapes the project: ${assertion.file}` };
  }

  if (assertion.kind === 'symbol_present') {
    try {
      // An index that has never run for this project is not evidence of absence.
      const indexed = db.prepare('SELECT COUNT(*) AS c FROM symbols WHERE project_id = ?').get(projectId) as
        | { c?: number }
        | undefined;
      if (Number(indexed?.c ?? 0) === 0) {
        return { verdict: 'unknown', reason: 'the symbol index is empty; run `fastr index`' };
      }
      const row = db.prepare(`
        SELECT 1 AS present FROM symbols
        WHERE project_id = ? AND file_path = ? AND name = ?
        LIMIT 1
      `).get(projectId, assertion.file.replace(/\\/g, '/').replace(/^\.\//, ''), assertion.needle as string) as
        | { present?: number }
        | undefined;
      return row
        ? { verdict: 'holds', reason: `${assertion.needle} is still declared in ${assertion.file}` }
        : { verdict: 'fails', reason: `${assertion.needle} is no longer declared in ${assertion.file}` };
    } catch {
      return { verdict: 'unknown', reason: 'symbol lookup failed' };
    }
  }

  if (assertion.kind === 'file_present') {
    try {
      return fs.existsSync(absolute)
        ? { verdict: 'holds', reason: `${assertion.file} still exists` }
        : { verdict: 'fails', reason: `${assertion.file} no longer exists` };
    } catch {
      return { verdict: 'unknown', reason: 'file lookup failed' };
    }
  }

  // text_present
  const content = readCached(absolute);
  if (content === null) {
    return { verdict: 'unknown', reason: `${assertion.file} could not be read` };
  }
  return content.includes(assertion.needle as string)
    ? { verdict: 'holds', reason: `${assertion.file} still contains the asserted text` }
    : { verdict: 'fails', reason: `${assertion.file} no longer contains the asserted text` };
}

/** Evaluates a memory's assertion. A memory without one always holds. */
export function evaluateMemoryAssertion(
  db: DatabaseSync,
  memory: Pick<Memory, 'project_id' | 'assertion'>,
  projectRoot: string | undefined
): AssertionResult {
  const parsed = parseAssertion(memory.assertion);
  if (!parsed) return { verdict: 'holds', reason: 'no assertion' };
  return evaluateAssertion(db, memory.project_id, projectRoot, parsed);
}

/**
 * Drops memories whose assertion has stopped holding.
 *
 * This is the read-side half of the feature: a spent trap stops being surfaced the moment
 * its premise disappears, without the recall path writing anything. Persisting the dormant
 * status is the heal path's job.
 */
export function filterByAssertion<T extends Pick<Memory, 'project_id' | 'assertion'>>(
  db: DatabaseSync,
  memories: T[],
  projectRoot: string | undefined
): T[] {
  if (memories.length === 0 || !projectRoot) return memories;
  const active = memories.filter(
    (memory) => evaluateMemoryAssertion(db, memory, projectRoot).verdict !== 'fails'
  );
  return active.length === memories.length ? memories : active;
}

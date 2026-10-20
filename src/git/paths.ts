import * as path from 'node:path';

/**
 * Normalizes a file path to a repo-relative, forward-slash, lowercase form so that
 * trap file links and changed/staged files can be compared exactly.
 */
export function normalizeRepoPath(filePath: string, projectRoot?: string): string {
  let p = (filePath || '').trim();
  if (!p) return '';
  if (projectRoot && path.isAbsolute(p)) {
    p = path.relative(path.resolve(projectRoot), p);
  }
  p = p.replace(/\\/g, '/');
  p = path.posix.normalize(p);
  p = p.replace(/^(?:\.\/)+/, '').replace(/\/+$/, '');
  if (p === '.') return '';
  return p.toLowerCase();
}

/**
 * True when `changedFile` is the same file as `linkedPath`, or lives inside the
 * directory `linkedPath` (e.g. a trap linked to `src/auth` governs `src/auth/jwt.ts`).
 * Never matches on basename or substring alone.
 */
export function repoPathMatches(changedFile: string, linkedPath: string, projectRoot?: string): boolean {
  const a = normalizeRepoPath(changedFile, projectRoot);
  const b = normalizeRepoPath(linkedPath, projectRoot);
  if (!a || !b) return false;
  return a === b || a.startsWith(`${b}/`);
}

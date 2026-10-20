import * as path from 'node:path';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import { findProjectRoot, loadConfig } from '../config.js';
import { initDatabase } from '../db/schema.js';
import { FastrRepository } from '../db/repository.js';
import { SpoolManager } from '../db/spool.js';
import { repoPathMatches } from './paths.js';

export interface CognitiveBlameResult {
  filePath: string;
  lineNumber: number;
  lineContent: string;
  commitHash: string;
  author: string;
  authorTime: string;
  summary: string;
  governingTraps: Array<{ id: string; title: string; module: string }>;
  associatedMemories: Array<{ id: string; title: string; kind: string; module: string }>;
  cognitiveRationale?: string;
}

export function parseGitBlamePorcelain(blameOutput: string): {
  commitHash: string;
  author: string;
  authorTime: string;
  summary: string;
  lineContent: string;
} {
  const lines = blameOutput.split('\n');
  const firstLine = lines[0] || '';
  const commitHash = firstLine.split(' ')[0] || 'unknown';

  let author = 'unknown';
  let authorTime = '';
  let summary = '';
  let lineContent = '';

  for (const line of lines) {
    if (line.startsWith('author ')) {
      author = line.slice(7).trim();
    } else if (line.startsWith('author-time ')) {
      const epoch = parseInt(line.slice(12).trim(), 10);
      if (!isNaN(epoch)) {
        authorTime = new Date(epoch * 1000).toISOString();
      }
    } else if (line.startsWith('summary ')) {
      summary = line.slice(8).trim();
    } else if (line.startsWith('\t')) {
      lineContent = line.slice(1);
    }
  }

  return { commitHash, author, authorTime, summary, lineContent };
}

/**
 * Splits `path:line` targets. The line number is taken from the LAST colon only when
 * it is purely numeric, so Windows drive letters (`C:\repo\a.ts:42`) survive intact.
 */
export function parseBlameTarget(target: string): { filePath: string; line?: number } {
  const idx = target.lastIndexOf(':');
  if (idx > 0) {
    const suffix = target.slice(idx + 1);
    if (/^\d+$/.test(suffix)) {
      return { filePath: target.slice(0, idx), line: parseInt(suffix, 10) };
    }
  }
  return { filePath: target };
}

export function cognitiveBlame(
  target: string,
  lineArg?: number,
  projectRoot?: string
): CognitiveBlameResult {
  const root = projectRoot ? path.resolve(projectRoot) : findProjectRoot();

  const parsedTarget = parseBlameTarget(target);
  const targetPath = parsedTarget.filePath;
  const targetLine = lineArg || parsedTarget.line || 1;
  if (!Number.isInteger(targetLine) || targetLine < 1) {
    throw new Error(`Invalid line number: ${targetLine}`);
  }

  const relativeFile = path.isAbsolute(targetPath)
    ? path.relative(root, targetPath).replace(/\\/g, '/')
    : targetPath.replace(/\\/g, '/');

  // Run git blame porcelain on the target line
  let blameRaw = '';
  try {
    blameRaw = execFileSync(
      'git',
      ['blame', '-L', `${targetLine},${targetLine}`, '--porcelain', '--', relativeFile],
      { cwd: root, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }
    );
  } catch (err: any) {
    throw new Error(`Git blame failed for ${relativeFile}:${targetLine}. Ensure file is tracked by git.`);
  }

  const { commitHash, author, authorTime, summary, lineContent } = parseGitBlamePorcelain(blameRaw);

  // Connect to FastrMemory database to pull cognitive context
  const config = loadConfig(root);
  const db = initDatabase(config.dbPath);
  const spool = new SpoolManager(config.spoolPath);
  const repo = new FastrRepository(db, spool);

  // 1. Find active error traps protecting this file
  const allTraps = repo.listTraps(config.projectId);
  const governingTraps = allTraps
    .filter((t) => {
      const files = repo.getFilesForMemory(t.id);
      if (files.length === 0) return false;
      return files.some((f) => repoPathMatches(relativeFile, f, root));
    })
    .map((t) => ({ id: t.id, title: t.title, module: t.module }));

  // 2. Find associated memories relating to this file or commit
  const activeMemories = repo.listActiveMemories(config.projectId);
  const associatedMemories = activeMemories
    .filter((m) => {
      const files = repo.getFilesForMemory(m.id);
      const fileMatch = files.some((f) => repoPathMatches(relativeFile, f, root));
      const contentMatch = summary.length > 4 && m.content.toLowerCase().includes(summary.toLowerCase().slice(0, 15));
      return fileMatch || contentMatch;
    })
    .slice(0, 3)
    .map((m) => ({ id: m.id, title: m.title, kind: m.kind, module: m.module }));
  db.close();

  // 3. Synthesize cognitive rationale
  let cognitiveRationale = `Committed in "${summary}" by ${author}.`;
  if (governingTraps.length > 0) {
    cognitiveRationale += ` Protected by ${governingTraps.length} active error trap(s): "${governingTraps[0].title}".`;
  }
  if (associatedMemories.length > 0) {
    cognitiveRationale += ` Bound to memory rule [${associatedMemories[0].id}] "${associatedMemories[0].title}".`;
  }

  return {
    filePath: relativeFile,
    lineNumber: targetLine,
    lineContent,
    commitHash,
    author,
    authorTime,
    summary,
    governingTraps,
    associatedMemories,
    cognitiveRationale
  };
}

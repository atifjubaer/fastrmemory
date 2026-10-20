import * as path from 'node:path';
import { execFileSync } from 'node:child_process';
import { findProjectRoot, loadConfig } from '../config.js';
import { initDatabase } from '../db/schema.js';
import { FastrRepository } from '../db/repository.js';
import { SpoolManager } from '../db/spool.js';
import { repoPathMatches } from './paths.js';

export interface TrapMatch {
  trapId: string;
  trapTitle: string;
  module: string;
  matchedFile: string;
}

export interface CommitResult {
  commitHash: string;
  summary: string;
  stagedFiles: string[];
  trapsChecked: number;
  trapWarnings: TrapMatch[];
}

export class TrapBlockedError extends Error {
  readonly trapWarnings: TrapMatch[];
  constructor(message: string, trapWarnings: TrapMatch[]) {
    super(message);
    this.name = 'TrapBlockedError';
    this.trapWarnings = trapWarnings;
  }
}

export function getStagedFiles(cwd?: string): string[] {
  const root = cwd ? path.resolve(cwd) : findProjectRoot();
  try {
    const raw = execFileSync('git', ['diff', '--cached', '--name-only'], {
      cwd: root,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
    return raw
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

/** Opens the project's FastrMemory repository for the duration of `fn`, always closing the DB handle. */
function withRepo<T>(root: string, fn: (repo: FastrRepository, projectId: string) => T): T {
  const config = loadConfig(root);
  const db = initDatabase(config.dbPath);
  try {
    const spool = new SpoolManager(config.spoolPath);
    return fn(new FastrRepository(db, spool), config.projectId);
  } finally {
    db.close();
  }
}

export function checkStagedTraps(stagedFiles: string[], projectRoot?: string): TrapMatch[] {
  if (stagedFiles.length === 0) return [];
  const root = projectRoot ? path.resolve(projectRoot) : findProjectRoot();
  return withRepo(root, (repo, projectId) => {
    const traps = repo.listTraps(projectId);
    const matches: TrapMatch[] = [];

    for (const file of stagedFiles) {
      for (const trap of traps) {
        const files = repo.getFilesForMemory(trap.id);
        if (files.length > 0) {
          const hit = files.some((f) => repoPathMatches(file, f, root));
          if (hit) {
            matches.push({
              trapId: trap.id,
              trapTitle: trap.title,
              module: trap.module,
              matchedFile: file
            });
          }
        }
      }
    }

    return matches;
  });
}

export function synthesizeCommitMessage(stagedFiles: string[], projectRoot?: string): string {
  const root = projectRoot ? path.resolve(projectRoot) : findProjectRoot();

  // Check active frontier tasks matching staged files
  const frontier = withRepo(root, (repo, projectId) => repo.getFrontier(projectId));
  const matchingTask = frontier.find((task) => {
    if (task.description && stagedFiles.some((f) => task.description.includes(f))) return true;
    if (task.title && stagedFiles.some((f) => task.title.toLowerCase().includes(f.toLowerCase()))) return true;
    return false;
  });

  if (matchingTask) {
    return `feat(core): ${matchingTask.title.toLowerCase()}`;
  }

  // Determine scope based on files
  let scope = 'core';
  if (stagedFiles.some((f) => f.startsWith('ui/'))) scope = 'ui';
  else if (stagedFiles.some((f) => f.startsWith('skills/'))) scope = 'skills';
  else if (stagedFiles.some((f) => f.includes('mcp'))) scope = 'mcp';
  else if (stagedFiles.some((f) => f.includes('daemon'))) scope = 'daemon';

  return `feat(${scope}): update ${stagedFiles.length} file(s) with memory provenance`;
}

export function executeMemoryCommit(options: {
  message?: string;
  force?: boolean;
  projectRoot?: string;
} = {}): CommitResult {
  const root = options.projectRoot ? path.resolve(options.projectRoot) : findProjectRoot();
  const staged = getStagedFiles(root);

  if (staged.length === 0) {
    throw new Error('No changes staged for commit. Stage files first with "git add".');
  }

  // 1. Trap check: active error traps on staged files block the commit unless forced
  const trapWarnings = checkStagedTraps(staged, root);
  if (trapWarnings.length > 0 && !options.force) {
    const trapDetails = trapWarnings.map((w) => `  - [TRAP ${w.trapId}] "${w.trapTitle}" on ${w.matchedFile}`).join('\n');
    throw new TrapBlockedError(
      `Commit blocked: ${trapWarnings.length} active error trap(s) govern staged files:\n${trapDetails}\n` +
      'Review the traps above, then re-run with --force to commit anyway.',
      trapWarnings
    );
  }

  // 2. Synthesize message if not provided
  const commitMessage = options.message || synthesizeCommitMessage(staged, root);

  // 3. Commit (argv form: the message is never interpreted by a shell)
  execFileSync('git', ['commit', '-m', commitMessage], {
    cwd: root,
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe']
  });

  const commitHash = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf-8' }).trim();

  // 4. Record provenance in FastrMemory
  try {
    withRepo(root, (repo, projectId) => repo.insertRawEvent({
      id: `evt_commit_${commitHash.slice(0, 8)}`,
      project_id: projectId,
      session_id: `commit_${commitHash.slice(0, 8)}`,
      agent_id: 'fastr_cli',
      event_type: 'git_commit',
      tool_name: 'git_commit',
      raw_payload: JSON.stringify({ commitHash, commitMessage, stagedFiles: staged, trapWarningsCount: trapWarnings.length }),
    }));
  } catch {}

  return {
    commitHash,
    summary: commitMessage,
    stagedFiles: staged,
    trapsChecked: staged.length,
    trapWarnings
  };
}

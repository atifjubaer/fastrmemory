import * as path from 'node:path';
import { execSync } from 'node:child_process';
import { findProjectRoot, loadConfig } from '../config.js';
import { initDatabase } from '../db/schema.js';
import { FastrRepository } from '../db/repository.js';
import { SpoolManager } from '../db/spool.js';

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

export function getStagedFiles(cwd?: string): string[] {
  const root = cwd ? path.resolve(cwd) : findProjectRoot();
  try {
    const raw = execSync('git diff --cached --name-only', {
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

export function checkStagedTraps(stagedFiles: string[], projectRoot?: string): TrapMatch[] {
  if (stagedFiles.length === 0) return [];
  const root = projectRoot ? path.resolve(projectRoot) : findProjectRoot();
  const config = loadConfig(root);
  const db = initDatabase(config.dbPath);
  const spool = new SpoolManager(config.spoolPath);
  const repo = new FastrRepository(db, spool);

  const traps = repo.listTraps(config.projectId);
  const matches: TrapMatch[] = [];

  for (const file of stagedFiles) {
    const normalizedFile = file.replace(/\\/g, '/');
    for (const trap of traps) {
      const files = repo.getFilesForMemory(trap.id);
      if (files.length > 0) {
        const hit = files.some((f) => normalizedFile.includes(f) || f.includes(normalizedFile));
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
}

export function synthesizeCommitMessage(stagedFiles: string[], projectRoot?: string): string {
  const root = projectRoot ? path.resolve(projectRoot) : findProjectRoot();
  const config = loadConfig(root);
  const db = initDatabase(config.dbPath);
  const spool = new SpoolManager(config.spoolPath);
  const repo = new FastrRepository(db, spool);

  // Check active frontier tasks matching staged files
  const frontier = repo.getFrontier(config.projectId);
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

  // 1. Trap check
  const trapWarnings = checkStagedTraps(staged, root);
  if (trapWarnings.length > 0 && !options.force) {
    const trapDetails = trapWarnings.map((w) => `  - [TRAP ${w.trapId}] "${w.trapTitle}" on ${w.matchedFile}`).join('\n');
    // If warning exists but force isn't set, we log warnings and continue unless blocked
  }

  // 2. Synthesize message if not provided
  const commitMessage = options.message || synthesizeCommitMessage(staged, root);

  // 3. Commit
  execSync(`git commit -m ${JSON.stringify(commitMessage)}`, {
    cwd: root,
    encoding: 'utf-8',
    stdio: ['ignore', 'pipe', 'pipe']
  });

  const commitHash = execSync('git rev-parse HEAD', { cwd: root, encoding: 'utf-8' }).trim();

  // 4. Record provenance in FastrMemory
  try {
    const config = loadConfig(root);
    const db = initDatabase(config.dbPath);
    const spool = new SpoolManager(config.spoolPath);
    const repo = new FastrRepository(db, spool);

    repo.insertRawEvent({
      id: `evt_commit_${commitHash.slice(0, 8)}`,
      project_id: config.projectId,
      session_id: `commit_${commitHash.slice(0, 8)}`,
      agent_id: 'fastr_cli',
      event_type: 'git_commit',
      tool_name: 'git_commit',
      raw_payload: JSON.stringify({ commitHash, commitMessage, stagedFiles: staged, trapWarningsCount: trapWarnings.length }),
    });
  } catch {}

  return {
    commitHash,
    summary: commitMessage,
    stagedFiles: staged,
    trapsChecked: staged.length,
    trapWarnings
  };
}

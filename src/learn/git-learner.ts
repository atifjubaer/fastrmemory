import { execFileSync } from 'node:child_process';
import { FastrRepository } from '../db/repository.js';
import { scrubSecrets } from '../privacy/scrubber.js';

export interface LearnResult {
  commitsInspected: number;
  trapsExtracted: number;
  lessons: Array<{
    commitHash: string;
    title: string;
    module: string;
    files: string[];
  }>;
}

/** Stable marker embedded in learned trap content so re-runs can be deduplicated by commit hash. */
export function gitCommitMarker(hash: string): string {
  return `[git:${hash}]`;
}

function collectLearnedHashes(repo: FastrRepository, projectId: string): { full: Set<string>; short: Set<string> } {
  const full = new Set<string>();
  const short = new Set<string>();
  for (const trap of repo.listTraps(projectId)) {
    const content = trap.content || '';
    for (const m of content.matchAll(/\[git:([0-9a-f]{7,64})\]/gi)) {
      full.add(m[1].toLowerCase());
    }
    // Legacy format (before markers existed): "Extracted from git fix commit abcd1234:"
    const legacy = /^Extracted from git fix commit ([0-9a-f]{7,64})\b/i.exec(content);
    if (legacy) short.add(legacy[1].toLowerCase());
  }
  return { full, short };
}

export function learnFromGitHistory(
  repo: FastrRepository,
  projectId: string,
  options: { limit?: number; days?: number; cwd?: string } = {}
): LearnResult {
  const limit = Math.max(1, Math.floor(Number(options.limit) || 30));
  const cwd = options.cwd || process.cwd();
  const lessons: LearnResult['lessons'] = [];

  let gitLogOutput = '';
  try {
    const args = ['log', '-n', String(limit), '--format=%H|%s'];
    const days = Number(options.days);
    if (options.days && Number.isFinite(days) && days > 0) {
      args.push(`--since=${Math.floor(days)} days ago`);
    }
    gitLogOutput = execFileSync('git', args, {
      cwd,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return { commitsInspected: 0, trapsExtracted: 0, lessons: [] };
  }

  const lines = gitLogOutput.trim().split('\n').filter(Boolean);
  const fixKeywords = ['fix', 'bug', 'patch', 'resolve', 'prevent', 'revert', 'error', 'trap'];
  const learned = collectLearnedHashes(repo, projectId);

  for (const line of lines) {
    const [hash, ...rest] = line.split('|');
    const subject = rest.join('|').trim();
    if (!hash || !subject || !/^[0-9a-f]{7,64}$/i.test(hash)) continue;

    const lowerHash = hash.toLowerCase();
    if (learned.full.has(lowerHash) || learned.short.has(lowerHash.slice(0, 8))) continue;

    const lowerSubject = subject.toLowerCase();
    const isFixCommit = fixKeywords.some((kw) => lowerSubject.includes(kw));

    if (isFixCommit) {
      // Get changed files for this commit
      let changedFiles: string[] = [];
      try {
        const diffFiles = execFileSync('git', ['show', '--name-only', '--format=', hash], {
          cwd,
          encoding: 'utf-8',
          stdio: ['ignore', 'pipe', 'ignore'],
        });
        changedFiles = diffFiles.trim().split('\n').map((f) => f.trim()).filter((f) => f && !f.includes('node_modules') && !f.startsWith('.'));
      } catch {
        changedFiles = [];
      }

      if (changedFiles.length > 0) {
        // Derive module name from primary file
        const primaryFile = changedFiles[0];
        const parts = primaryFile.split(/[\/\\]/);
        const moduleName = parts.length > 1 && parts[0] === 'src' ? parts[1] : parts[0] || 'general';

        const scrubbedTitle = scrubSecrets(subject);
        const scrubbedContent = scrubSecrets(
          `Extracted from git fix commit ${hash.slice(0, 8)} ${gitCommitMarker(lowerHash)}:\n${subject}\nAffected files: ${changedFiles.join(', ')}`
        );

        repo.insertMemory({
          projectId,
          module: moduleName,
          kind: 'error_trap',
          title: scrubbedTitle,
          content: scrubbedContent,
          files: changedFiles,
          verified: false // Goes to staging for developer review
        });
        learned.full.add(lowerHash);

        lessons.push({
          commitHash: hash.slice(0, 8),
          title: scrubbedTitle,
          module: moduleName,
          files: changedFiles,
        });
      }
    }
  }

  return {
    commitsInspected: lines.length,
    trapsExtracted: lessons.length,
    lessons,
  };
}

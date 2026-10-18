import { execSync } from 'node:child_process';
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

export function learnFromGitHistory(
  repo: FastrRepository,
  projectId: string,
  options: { limit?: number; days?: number; cwd?: string } = {}
): LearnResult {
  const limit = options.limit || 30;
  const cwd = options.cwd || process.cwd();
  const lessons: LearnResult['lessons'] = [];

  let gitLogOutput = '';
  try {
    const sinceArg = options.days ? `--since="${options.days} days ago"` : '';
    gitLogOutput = execSync(`git log -n ${limit} ${sinceArg} --format="%H|%s"`, {
      cwd,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return { commitsInspected: 0, trapsExtracted: 0, lessons: [] };
  }

  const lines = gitLogOutput.trim().split('\n').filter(Boolean);
  const fixKeywords = ['fix', 'bug', 'patch', 'resolve', 'prevent', 'revert', 'error', 'trap'];

  for (const line of lines) {
    const [hash, ...rest] = line.split('|');
    const subject = rest.join('|').trim();
    if (!hash || !subject) continue;

    const lowerSubject = subject.toLowerCase();
    const isFixCommit = fixKeywords.some((kw) => lowerSubject.includes(kw));

    if (isFixCommit) {
      // Get changed files for this commit
      let changedFiles: string[] = [];
      try {
        const diffFiles = execSync(`git show --name-only --format="" ${hash}`, {
          cwd,
          encoding: 'utf-8',
          stdio: ['ignore', 'pipe', 'ignore'],
        });
        changedFiles = diffFiles.trim().split('\n').filter((f) => f && !f.includes('node_modules') && !f.startsWith('.'));
      } catch {
        changedFiles = [];
      }

      if (changedFiles.length > 0) {
        // Derive module name from primary file
        const primaryFile = changedFiles[0];
        const parts = primaryFile.split(/[\/\\]/);
        const moduleName = parts.length > 1 && parts[0] === 'src' ? parts[1] : parts[0] || 'general';

        const scrubbedTitle = scrubSecrets(subject);
        const scrubbedContent = `Extracted from git fix commit ${hash.slice(0, 8)}:\n${subject}\nAffected files: ${changedFiles.join(', ')}`;

        const mem = repo.insertMemory({
          projectId,
          module: moduleName,
          kind: 'error_trap',
          title: scrubbedTitle,
          content: scrubbedContent,
          files: changedFiles,
          verified: false // Goes to staging for developer review
        });

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

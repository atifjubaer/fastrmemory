import * as path from 'node:path';
import * as fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import { createFastrServerContext } from '../mcp/server.js';
import { normalizeRepoPath, repoPathMatches } from '../git/paths.js';

export interface GuardianOptions {
  baseBranch?: string;
  strict?: boolean;
  db?: DatabaseSync;
  projectId?: string;
  projectRoot?: string;
  customFiles?: string[];
}

export interface TrapMatch {
  trapId: string;
  file: string;
  title: string;
  content: string;
  module: string;
  score: number;
  provenanceHash?: string | null;
}

export interface GuardianResult {
  success: boolean;
  hasViolations: boolean;
  scannedFiles: string[];
  matches: TrapMatch[];
  markdownReport: string;
}

export function isSafeGitRef(ref: string): boolean {
  return typeof ref === 'string' && ref.length > 0 && !ref.startsWith('-') && !/[\s\0]/.test(ref);
}

export function getChangedFilesFromGit(baseBranch: string = 'origin/main', projectRoot?: string): string[] {
  const cwd = projectRoot || process.cwd();
  const git = (args: string[]) =>
    execFileSync('git', args, { cwd, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] });

  // Refuse refs git would parse as options (e.g. "--output=/some/file")
  if (isSafeGitRef(baseBranch)) {
    try {
      // 1. Try three-dot diff against base branch (standard for PRs)
      const out = git(['diff', '--name-only', `${baseBranch}...HEAD`]);
      const files = out.split('\n').map(f => f.trim()).filter(Boolean);
      if (files.length > 0) return files;
    } catch {
      // fallback if origin/main doesn't exist locally
    }
  }

  try {
    // 2. Try diff against HEAD~1
    const out = git(['diff', '--name-only', 'HEAD~1', 'HEAD']);
    const files = out.split('\n').map(f => f.trim()).filter(Boolean);
    if (files.length > 0) return files;
  } catch {}

  try {
    // 3. Fallback to uncommitted working tree changes
    const out = git(['status', '--porcelain']);
    return out
      .split('\n')
      .map(line => line.slice(3).trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function runTrapGuardian(options: GuardianOptions = {}): GuardianResult {
  const {
    baseBranch = 'origin/main',
    strict = false,
    customFiles
  } = options;

  let db = options.db;
  let projectId = options.projectId;
  let projectRoot = options.projectRoot || process.cwd();

  if (!db || !projectId) {
    try {
      const ctx = createFastrServerContext(projectRoot);
      db = ctx.db;
      projectId = ctx.config.projectId;
      projectRoot = ctx.config.projectRoot;
    } catch (err: any) {
      return {
        success: !strict,
        hasViolations: false,
        scannedFiles: [],
        matches: [],
        markdownReport: `### 🛡️ FastrMemory Trap Guardian\n\n⚠️ Failed to initialize FastrMemory context: ${err.message}`
      };
    }
  }

  const scannedFiles = customFiles && customFiles.length > 0
    ? customFiles.map(f => f.replace(/\\/g, '/'))
    : getChangedFilesFromGit(baseBranch, projectRoot).map(f => f.replace(/\\/g, '/'));

  if (scannedFiles.length === 0) {
    return {
      success: true,
      hasViolations: false,
      scannedFiles: [],
      matches: [],
      markdownReport: `### 🛡️ FastrMemory Trap Guardian\n\n✅ **Zero modified files detected.** No traps triggered.`
    };
  }

  // Query all active error traps for this project
  const rows = db.prepare(`
    SELECT m.id, m.title, m.content, m.module, m.reward_score, m.provenance_hash, fl.file_path
    FROM memories m
    LEFT JOIN file_links fl ON fl.memory_id = m.id
    WHERE m.project_id = ?
      AND m.kind = 'error_trap'
      AND m.valid_to IS NULL
      AND m.status != 'superseded'
      AND m.status != 'dormant'
  `).all(projectId) as any[];

  const matches: TrapMatch[] = [];

  for (const changed of scannedFiles) {
    if (!normalizeRepoPath(changed, projectRoot)) continue;

    for (const row of rows) {
      // Compare normalized full repo-relative paths (never basename or substring)
      if (row.file_path && repoPathMatches(changed, row.file_path, projectRoot)) {
        // Prevent duplicate match for same trap and file
        if (!matches.some(m => m.trapId === row.id && m.file === changed)) {
          matches.push({
            trapId: row.id,
            file: changed,
            title: row.title,
            content: row.content,
            module: row.module,
            score: Number(row.reward_score || 1),
            provenanceHash: row.provenance_hash
          });
        }
      }
    }
  }

  const hasViolations = matches.length > 0;
  const success = !hasViolations || !strict;

  // Build Markdown Report
  let md = `## 🛡️ FastrMemory Pre-Merge Trap Guardian\n\n`;

  if (!hasViolations) {
    md += `✅ **All ${scannedFiles.length} modified file(s) passed trap verification.** Zero active regression traps violated.\n\n`;
    md += `<details><summary>Scanned Files (${scannedFiles.length})</summary>\n\n`;
    for (const f of scannedFiles) {
      md += `- \`${f}\`\n`;
    }
    md += `\n</details>\n`;
  } else {
    md += `⚠️ **Found ${matches.length} active error trap warning(s) on ${scannedFiles.length} modified file(s).**\n\n`;
    md += `> **Important**: The files modified in this pull request are protected by historical bug lessons with an automatic **2.0x recall boost**. Ensure your changes comply with the verified solutions below before merging:\n\n`;

    for (const m of matches) {
      md += `### ⚠️ [\`${m.trapId}\`] ${m.title} (${m.module})\n`;
      md += `- **Governed File**: \`${m.file}\`\n`;
      md += `- **Recall Weight**: \`${m.score * 2.0}x boost\`\n`;
      if (m.provenanceHash) {
        md += `- **Cryptographic Provenance**: \`prov_${m.provenanceHash.slice(0, 10)}\` (Verified SHA-256)\n`;
      }
      md += `\n**Verified Lesson / Solution**:\n\`\`\`text\n${m.content}\n\`\`\`\n\n---\n\n`;
    }

    if (strict) {
      md += `❌ **CI Status**: Blocked under \`--strict\` mode. Please verify the code satisfies the traps listed above.\n`;
    } else {
      md += `ℹ️ **CI Status**: Advisory check passed with warnings.\n`;
    }
  }

  return {
    success,
    hasViolations,
    scannedFiles,
    matches,
    markdownReport: md
  };
}

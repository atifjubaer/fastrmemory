import * as fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';

export type LocalImportKind = 'rule' | 'decision' | 'error_trap' | 'workflow';

export interface LocalMemoryDraft {
  title: string;
  content: string;
}

export interface MarkdownImportOptions {
  projectId: string;
  module?: string;
  kind?: LocalImportKind;
  verified?: boolean;
  dryRun?: boolean;
}

export interface MarkdownImportResult {
  total: number;
  imported: number;
  skipped: number;
  dryRun: boolean;
}

const FRONTMATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;
const HEADING = /^(#{1,6})\s+(.+?)\s*$/;
const TOP_LEVEL_BULLET = /^[-*+]\s+(.+)$/;

function cleanTitle(raw: string): string {
  const title = raw
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[.:;]+$/, '');
  return title.length > 160 ? `${title.slice(0, 157)}...` : title;
}

function normalize(text: string): string {
  return text.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '').trim();
}

function draft(title: string, content: string): LocalMemoryDraft | null {
  const normalizedTitle = cleanTitle(title);
  const normalizedContent = normalize(content);
  if (!normalizedTitle || !normalizedContent) return null;
  return { title: normalizedTitle, content: normalizedContent };
}

function collectHeadingSections(markdown: string): LocalMemoryDraft[] {
  const sections: LocalMemoryDraft[] = [];
  let current: { level: number; title: string; body: string[] } | null = null;
  let inFence = false;

  const flush = () => {
    if (!current) return;
    // A level-1 heading is normally the document title, not a rule.
    if (current.level >= 2) {
      const item = draft(current.title, current.body.join('\n'));
      if (item) sections.push(item);
    }
    current = null;
  };

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      if (current) current.body.push(line);
      continue;
    }
    const heading = inFence ? null : line.match(HEADING);
    if (heading) {
      flush();
      current = { level: heading[1].length, title: heading[2], body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  flush();
  return sections;
}

function collectBullets(markdown: string): LocalMemoryDraft[] {
  const items: string[] = [];
  let current: string[] | null = null;
  let inFence = false;

  const flush = () => {
    if (!current) return;
    const text = current.join('\n').trim();
    if (text) items.push(text);
    current = null;
  };

  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      if (current) current.push(line);
      continue;
    }
    const bullet = inFence ? null : line.match(TOP_LEVEL_BULLET);
    if (bullet) {
      flush();
      current = [bullet[1].trim()];
    } else if (current && /^\s{2,}\S/.test(line)) {
      current.push(line.trim());
    } else if (current && line.trim() === '') {
      current.push('');
    } else if (current) {
      flush();
    }
  }
  flush();

  return items
    .map((item) => {
      const firstLine = item.split('\n')[0].trim();
      return draft(firstLine, item);
    })
    .filter((item): item is LocalMemoryDraft => item !== null);
}

function collectParagraphs(markdown: string): LocalMemoryDraft[] {
  return markdown
    .split(/\n{2,}/)
    .map((paragraph) => draft(paragraph.split('\n')[0], paragraph))
    .filter((item): item is LocalMemoryDraft => item !== null);
}

/**
 * Parse Markdown rules into importable memory drafts. Level 2-6 headings are preferred;
 * bullet lists and then paragraphs are fallbacks for files such as AGENTS.md.
 */
export function parseMarkdownMemories(markdown: string): LocalMemoryDraft[] {
  const source = markdown.replace(FRONTMATTER, '');
  let drafts = collectHeadingSections(source);

  if (drafts.length === 0) {
    drafts = collectBullets(source);
  }
  if (drafts.length === 0) {
    drafts = collectParagraphs(source);
  }

  const seen = new Set<string>();
  return drafts.filter((item) => {
    const key = `${item.title}\u0000${item.content}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function existsInProject(db: DatabaseSync, projectId: string, title: string, content: string): boolean {
  const row = db.prepare(`
    SELECT id FROM memories
    WHERE project_id = ? AND title = ? AND content = ? AND status != 'superseded'
    LIMIT 1
  `).get(projectId, title, content) as { id: string } | undefined;
  return Boolean(row);
}

/** Import Markdown-derived memories with exact-title/content idempotency. */
export function importMarkdownMemories(
  repo: FastrRepository,
  db: DatabaseSync,
  markdown: string,
  options: MarkdownImportOptions
): MarkdownImportResult {
  const drafts = parseMarkdownMemories(markdown);
  const seen = new Set<string>();
  let imported = 0;
  let skipped = 0;

  for (const item of drafts) {
    const key = `${item.title}\u0000${item.content}`;
    if (seen.has(key) || existsInProject(db, options.projectId, item.title, item.content)) {
      skipped++;
      continue;
    }
    seen.add(key);

    if (!options.dryRun) {
      repo.insertMemory({
        projectId: options.projectId,
        module: options.module || 'imported',
        kind: options.kind || 'rule',
        title: item.title,
        content: item.content,
        verified: options.verified ?? false
      });
    }
    imported++;
  }

  return { total: drafts.length, imported, skipped, dryRun: Boolean(options.dryRun) };
}

export function importMarkdownFile(
  repo: FastrRepository,
  db: DatabaseSync,
  filePath: string,
  options: MarkdownImportOptions
): MarkdownImportResult {
  return importMarkdownMemories(repo, db, fs.readFileSync(filePath, 'utf8'), options);
}

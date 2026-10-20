import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { importMarkdownMemories, parseMarkdownMemories } from '../src/import/local.js';

const P = 'proj_local_import';

function countMemories(db: DatabaseSync): number {
  const row = db.prepare('SELECT COUNT(*) AS count FROM memories WHERE project_id = ?').get(P) as { count: number };
  return row.count;
}

describe('Local Markdown import', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    db.close();
  });

  it('parses level 2+ headings and strips frontmatter and the document title', () => {
    const markdown = `---
description: local rules
---
# Project rules

## Auth
Always use integer seconds for JWT expiration.

### Database
Enable WAL mode for concurrent readers.

## Unrelated
Never use inline CSS.`;

    expect(parseMarkdownMemories(markdown)).toEqual([
      { title: 'Auth', content: 'Always use integer seconds for JWT expiration.' },
      { title: 'Database', content: 'Enable WAL mode for concurrent readers.' },
      { title: 'Unrelated', content: 'Never use inline CSS.' }
    ]);
  });

  it('does not treat headings inside fenced code as sections', () => {
    const markdown = `## Real rule
Use WAL mode.

\`\`\`md
## Not a heading
\`\`\``;

    expect(parseMarkdownMemories(markdown)).toEqual([
      {
        title: 'Real rule',
        content: 'Use WAL mode.\n\n```md\n## Not a heading\n```'
      }
    ]);
  });

  it('falls back to top-level bullets when the file has no usable headings', () => {
    const markdown = `- Always use integer seconds for JWT expiration.
  This prevents millisecond drift.
- Never use inline CSS in components.`;

    expect(parseMarkdownMemories(markdown)).toEqual([
      {
        title: 'Always use integer seconds for JWT expiration',
        content: 'Always use integer seconds for JWT expiration.\nThis prevents millisecond drift.'
      },
      {
        title: 'Never use inline CSS in components',
        content: 'Never use inline CSS in components.'
      }
    ]);
  });

  it('falls back to paragraphs when there are no headings or bullets', () => {
    const markdown = 'Use WAL mode for concurrent readers.\n\nNever use inline CSS.';
    expect(parseMarkdownMemories(markdown)).toHaveLength(2);
  });

  it('does not write during a dry run', () => {
    const markdown = `## Auth
Always use integer seconds for JWT expiration.

## Database
Enable WAL mode for concurrent readers.`;

    const result = importMarkdownMemories(repo, db, markdown, {
      projectId: P,
      module: 'rules',
      kind: 'rule',
      verified: true,
      dryRun: true
    });

    expect(result).toEqual({ total: 2, imported: 2, skipped: 0, dryRun: true });
    expect(countMemories(db)).toBe(0);
  });

  it('imports once and skips exact duplicates on re-import', () => {
    const markdown = `## Auth
Always use integer seconds for JWT expiration.

## Database
Enable WAL mode for concurrent readers.`;

    const first = importMarkdownMemories(repo, db, markdown, {
      projectId: P,
      module: 'rules',
      kind: 'decision',
      verified: true
    });
    expect(first).toEqual({ total: 2, imported: 2, skipped: 0, dryRun: false });
    expect(countMemories(db)).toBe(2);

    const memories = db.prepare('SELECT module, kind, title, content, status FROM memories WHERE project_id = ? ORDER BY title').all(P) as any[];
    expect(memories).toHaveLength(2);
    expect(memories[0]).toMatchObject({ module: 'rules', kind: 'decision', status: 'verified' });
    expect(memories[0].content).toContain('Always use integer seconds');

    const second = importMarkdownMemories(repo, db, markdown, {
      projectId: P,
      module: 'rules',
      kind: 'decision',
      verified: true
    });
    expect(second).toEqual({ total: 2, imported: 0, skipped: 2, dryRun: false });
    expect(countMemories(db)).toBe(2);
  });
});

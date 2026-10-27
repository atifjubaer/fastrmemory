import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { syncTeamMemory, parseActivePageCards, parseSupersededIds } from '../src/mirror/team-sync.js';

const PROJECT_ID = 'proj_team_sync_test';

describe('Team Memory Sync (Git-Backed)', () => {
  let tempDir: string;
  let projectRoot: string;
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-teamsync-'));
    projectRoot = path.join(tempDir, 'repo');
    fs.mkdirSync(projectRoot, { recursive: true });
    db = initDatabase(path.join(tempDir, 'test.db'));
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    try { db.close(); } catch {}
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('parses active memory cards from markdown', () => {
    const md = `
# Module: auth

## Compiled Truth (Active Rules & Traps)

### [mem_test123] [TRAP] Use bcrypt with work factor 12
- **Kind**: \`error_trap\`
- **Status**: \`verified\` (Reward Score: 1)
- **Linked Files**: \`src/auth.ts\`, \`src/hash.ts\`
- **Active Since**: \`2026-10-27T12:00:00Z\`

Always use work factor 12 or higher when hashing user passwords.

---

## Append-Only Timeline (History & Superseded)

### [EXPIRED 2026-10-20 -> 2026-10-25] [mem_old123] Old MD5 rule
`;

    const cards = parseActivePageCards(md, 'auth');
    expect(cards.length).toBe(1);
    expect(cards[0].id).toBe('mem_test123');
    expect(cards[0].kind).toBe('error_trap');
    expect(cards[0].title).toBe('Use bcrypt with work factor 12');
    expect(cards[0].files).toEqual(['src/auth.ts', 'src/hash.ts']);
    expect(cards[0].content).toContain('Always use work factor 12');

    const superseded = parseSupersededIds(md);
    expect(superseded).toEqual(['mem_old123']);
  });

  it('ingests pulled teammate markdown pages into local SQLite database', () => {
    const pagesDir = path.join(projectRoot, '.fastr', 'pages');
    fs.mkdirSync(pagesDir, { recursive: true });

    const teammatePage = `
# Module: db

## Compiled Truth (Active Rules & Traps)

### [mem_pool_trap] [TRAP] Always release client in finally
- **Kind**: \`error_trap\`
- **Status**: \`verified\` (Reward Score: 1)
- **Linked Files**: \`src/db.ts\`
- **Active Since**: \`2026-10-27T10:00:00Z\`

Call client.release() inside a finally block to prevent connection leaks.

---

## Append-Only Timeline (History & Superseded)
`;

    fs.writeFileSync(path.join(pagesDir, 'db.md'), teammatePage, 'utf8');

    // Initially local DB has no such memory
    expect(repo.getMemory('mem_pool_trap')).toBeNull();

    // Run team sync
    const res = syncTeamMemory(db, projectRoot, PROJECT_ID);
    expect(res.pagesRead).toBe(1);
    expect(res.newMemoriesIngested).toBe(1);
    expect(res.ingestedIds).toEqual(['mem_pool_trap']);

    // Now memory is queryable in SQLite!
    const mem = repo.getMemory('mem_pool_trap');
    expect(mem).toBeDefined();
    expect(mem?.kind).toBe('error_trap');
    expect(mem?.title).toBe('Always release client in finally');
    expect(mem?.content).toContain('Call client.release() inside a finally block');

    // Linked files were inserted
    const files = repo.getFilesForMemory('mem_pool_trap');
    expect(files).toContain('src/db.ts');

    // Re-running sync is idempotent
    const second = syncTeamMemory(db, projectRoot, PROJECT_ID);
    expect(second.newMemoriesIngested).toBe(0);
  });
});

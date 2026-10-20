import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase, applySchema } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { SpoolManager } from '../src/db/spool.js';
import { diagnoseDatabase, healDatabase } from '../src/db/doctor.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';

const projectId = 'core-db-proj';
let tempDir: string;
const openDbs: DatabaseSync[] = [];

function open(file: string): DatabaseSync {
  const db = initDatabase(file);
  openDbs.push(db);
  return db;
}

function rule(repo: FastrRepository, title: string, extra: Record<string, any> = {}) {
  return repo.insertMemory({ projectId, kind: 'rule', module: 'core', title, content: `${title} content`, verified: true, ...extra });
}

beforeEach(() => {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-core-db-'));
});

afterEach(() => {
  while (openDbs.length) {
    try { openDbs.pop()!.close(); } catch {}
  }
  try { fs.rmSync(tempDir, { recursive: true, force: true }); } catch {}
});

describe('attachGlobalDatabase', () => {
  it('binds the path as a parameter (apostrophes and injection payloads are just filenames)', () => {
    const db = open(path.join(tempDir, 'project.db'));
    const repo = new FastrRepository(db);
    rule(repo, 'Local rule survives');

    const nasty = path.join(tempDir, "it's x.db' AS g; DROP TABLE memories; --.db");
    expect(repo.attachGlobalDatabase(nasty)).toBe(true);
    expect(repo.hasGlobalDb()).toBe(true);

    const attached = (db.prepare('PRAGMA database_list').all() as any[]).find((d) => d.name === 'global_db');
    expect(path.resolve(attached.file)).toBe(path.resolve(nasty));
    expect(fs.existsSync(nasty)).toBe(true);
    expect((db.prepare('SELECT COUNT(*) AS c FROM main.memories').get() as any).c).toBe(1);
  });

  it('re-attaches when asked for a different global database file', () => {
    const db = open(path.join(tempDir, 'project.db'));
    const repo = new FastrRepository(db);
    const first = path.join(tempDir, 'g1.db');
    const second = path.join(tempDir, 'g2.db');

    expect(repo.attachGlobalDatabase(first)).toBe(true);
    expect(repo.attachGlobalDatabase(first)).toBe(true);
    expect(repo.attachGlobalDatabase(second)).toBe(true);

    const attached = (db.prepare('PRAGMA database_list').all() as any[]).find((d) => d.name === 'global_db');
    expect(path.resolve(attached.file)).toBe(path.resolve(second));
  });
});

describe('doctor FTS rebuild', () => {
  it('rebuilds a wiped FTS index so recall works again', async () => {
    const db = open(path.join(tempDir, 'doctor.db'));
    const repo = new FastrRepository(db);
    rule(repo, 'Kubernetes ingress annotations');
    rule(repo, 'Postgres vacuum schedule');
    repo.insertMemory({ projectId, scope: 'global', kind: 'rule', title: 'Org wide rule', content: 'global row' });

    // Like-for-like counts: a 'global' project row must not cause a permanent warning.
    expect(diagnoseDatabase(db, projectId).issues.some((i) => i.category === 'fts5')).toBe(false);

    db.exec('DELETE FROM memories_fts');
    expect(diagnoseDatabase(db, projectId).issues.some((i) => i.category === 'fts5')).toBe(true);
    const ftsHits = () => (db.prepare("SELECT COUNT(*) AS c FROM memories_fts WHERE memories_fts MATCH 'kubernetes'").get() as any).c;
    expect(ftsHits()).toBe(0);

    const heal = healDatabase(db, projectId);
    expect(heal.reportAfter!.issues.some((i) => i.category === 'fts5')).toBe(false);
    expect((db.prepare('SELECT COUNT(*) AS c FROM memories_fts').get() as any).c).toBe(3);
    expect(ftsHits()).toBe(1);

    const after = await searchMemories(db, { projectId, query: 'kubernetes ingress' });
    expect(after.memories.some((m) => m.memory.title.includes('Kubernetes'))).toBe(true);
  });

  it('detects and removes duplicate FTS rows', () => {
    const db = open(path.join(tempDir, 'dup.db'));
    const repo = new FastrRepository(db);
    const mem = rule(repo, 'Duplicate me');
    db.prepare('INSERT INTO memories_fts (id, title, module, content) VALUES (?, ?, ?, ?)').run(mem.id, mem.title, mem.module, mem.content);

    expect(diagnoseDatabase(db, projectId).issues.some((i) => i.category === 'fts5')).toBe(true);
    healDatabase(db, projectId);
    expect((db.prepare('SELECT COUNT(*) AS c FROM memories_fts').get() as any).c).toBe(1);
  });
});

describe('spool fallback & drain', () => {
  it('spools a raw event when another connection holds the write lock', () => {
    const dbPath = path.join(tempDir, 'busy.db');
    const db = open(dbPath);
    db.exec('PRAGMA busy_timeout = 0');
    const spool = new SpoolManager(path.join(tempDir, 'pending.jsonl'));
    const repo = new FastrRepository(db, spool);

    const locker = new DatabaseSync(dbPath);
    openDbs.push(locker);
    locker.exec('BEGIN IMMEDIATE');

    const ev = repo.insertRawEvent({ id: 'ev_locked', project_id: projectId, session_id: 's1', agent_id: 'a', event_type: 'tool_use', raw_payload: '{}' });
    expect(ev.id).toBe('ev_locked');
    expect(spool.pendingCount()).toBe(1);
    expect(repo.getStatus(projectId).pendingSpoolCount).toBe(1);

    locker.exec('COMMIT');
    expect(spool.drain(db)).toBe(1);
    expect(repo.getRawEvent('ev_locked')).not.toBeNull();
    expect(repo.getStatus(projectId).pendingSpoolCount).toBe(0);
  });

  it('counts pending lines, ingests complete lines and keeps an unparseable partial tail', () => {
    const db = open(path.join(tempDir, 'drain.db'));
    const spoolPath = path.join(tempDir, 'pending.jsonl');
    const spool = new SpoolManager(spoolPath);
    for (let i = 0; i < 3; i++) {
      spool.append({ id: `ev_${i}`, project_id: projectId, session_id: 's', event_type: 'tool_use', raw_payload: `p${i}`, content_hash: `h${i}` });
    }
    expect(spool.pendingCount()).toBe(3);
    fs.appendFileSync(spoolPath, '{"id":"ev_partial","project_');

    expect(spool.drain(db)).toBe(3);
    expect((db.prepare('SELECT COUNT(*) AS c FROM raw_events').get() as any).c).toBe(3);
    expect(fs.readFileSync(spoolPath, 'utf-8')).toBe('{"id":"ev_partial","project_\n');
    expect(fs.readdirSync(tempDir).some((f) => f.endsWith('.draining'))).toBe(false);

    // Appends made after the rename land in the fresh spool file and are drained next time.
    spool.append({ id: 'ev_late', project_id: projectId, session_id: 's', event_type: 'tool_use', raw_payload: 'late', content_hash: 'hl' });
    expect(spool.drain(db)).toBe(1);
    expect((db.prepare("SELECT COUNT(*) AS c FROM raw_events WHERE id = 'ev_late'").get() as any).c).toBe(1);
  });

  it('restores spooled events when the database insert fails', () => {
    const db = open(path.join(tempDir, 'fail.db'));
    const spoolPath = path.join(tempDir, 'pending.jsonl');
    const spool = new SpoolManager(spoolPath);
    spool.append({ id: 'ev_keep', project_id: projectId, session_id: 's', event_type: 'tool_use', raw_payload: 'x', content_hash: 'h' });
    db.exec('DROP TABLE raw_events');

    expect(() => spool.drain(db)).toThrow();
    expect(spool.pendingCount()).toBe(1);
    expect(fs.readdirSync(tempDir).some((f) => f.endsWith('.draining'))).toBe(false);
  });
});

describe('concurrent writers on the same file', () => {
  it('a second supersede of the same memory fails instead of forking the chain', () => {
    const dbPath = path.join(tempDir, 'chain.db');
    const repoA = new FastrRepository(open(dbPath));
    const repoB = new FastrRepository(open(dbPath));
    const base = rule(repoA, 'Original rule');

    repoA.supersedeMemory(base.id, 'Version A', 'from A', 'A edit');
    expect(() => repoB.supersedeMemory(base.id, 'Version B', 'from B', 'B edit')).toThrow(/no longer active/);

    const heads = repoA.listActiveMemories(projectId);
    expect(heads.map((m) => m.title)).toEqual(['Version A']);
  });

  it('two agents never claim the same action', () => {
    const dbPath = path.join(tempDir, 'dag.db');
    const repoA = new FastrRepository(open(dbPath));
    const repoB = new FastrRepository(open(dbPath));
    repoA.createAction({ projectId, title: 'Task 1', priority: 9 });
    repoA.createAction({ projectId, title: 'Task 2', priority: 5 });

    const a = repoA.getNextAction(projectId, 'agent-a')!;
    const b = repoB.getNextAction(projectId, 'agent-b')!;
    expect(a.id).not.toBe(b.id);
    expect(a.assigned_to).toBe('agent-a');
    expect(b.assigned_to).toBe('agent-b');

    // Nothing left to claim for a third agent; an agent asking again gets its own task back.
    expect(repoB.getNextAction(projectId, 'agent-c')).toBeNull();
    expect(repoA.getNextAction(projectId, 'agent-a')!.id).toBe(a.id);
  });
});

describe('federated (global_db) memory writes', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    db = open(path.join(tempDir, 'project.db'));
    repo = new FastrRepository(db);
    expect(repo.attachGlobalDatabase(path.join(tempDir, 'global.db'))).toBe(true);
  });

  const globalRule = () =>
    repo.insertMemory({ projectId, scope: 'global', kind: 'rule', module: 'sec', title: 'Rotate signing keys', content: 'Rotate keys quarterly', verified: true });

  it('indexes a global memory exactly once in global FTS', () => {
    const g = globalRule();
    expect((db.prepare('SELECT COUNT(*) AS c FROM global_db.memories_fts WHERE id = ?').get(g.id) as any).c).toBe(1);
  });

  it('routes supersede, feedback, pin and forget to global_db', () => {
    const g = globalRule();

    repo.pinMemory(g.id, true);
    expect(repo.getMemory(g.id)!.pinned).toBe(1);

    const fb = repo.updateFeedback(g.id, 'good');
    expect(repo.getMemory(g.id)!.reward_score).toBe(fb.reward_score);

    const { newMemory } = repo.supersedeMemory(g.id, 'Rotate signing keys monthly', 'Monthly now', 'policy change');
    expect((db.prepare('SELECT COUNT(*) AS c FROM main.memories').get() as any).c).toBe(0);
    expect((db.prepare('SELECT status FROM global_db.memories WHERE id = ?').get(g.id) as any).status).toBe('superseded');
    expect((db.prepare('SELECT 1 AS x FROM global_db.memories WHERE id = ?').get(newMemory.id) as any)?.x).toBe(1);

    expect(repo.forgetMemory(newMemory.id).success).toBe(true);
    expect(repo.listGlobalMemories()).toHaveLength(0);
  });

  it('snapshot/rollback never copies global rows into the local database', () => {
    rule(repo, 'Local only');
    globalRule();
    const snap = repo.createSnapshot(projectId, 'v1');
    expect(snap.memoryCount).toBe(1);

    const later = rule(repo, 'Added later');
    repo.rollbackToSnapshot(projectId, snap.id);

    expect((db.prepare("SELECT COUNT(*) AS c FROM main.memories WHERE project_id = 'global'").get() as any).c).toBe(0);
    const titles = repo.listActiveMemories(projectId).map((m) => m.title).sort();
    expect(titles).toEqual(['Local only', 'Rotate signing keys']);
    expect(repo.getMemory(later.id)!.status).toBe('superseded');
  });
});

describe('rollback restores a clean chain head', () => {
  it('clears superseded_by_id / superseded_reason on restored rows', () => {
    const db = open(path.join(tempDir, 'rb.db'));
    const repo = new FastrRepository(db);
    const base = rule(repo, 'Before');
    const snap = repo.createSnapshot(projectId, 'v1');
    repo.supersedeMemory(base.id, 'After', 'after', 'edit');

    repo.rollbackToSnapshot(projectId, snap.id);
    const restored = repo.getMemory(base.id)!;
    expect(restored.valid_to).toBeNull();
    expect(restored.superseded_by_id).toBeNull();
    expect(restored.superseded_reason).toBeNull();
  });
});

describe('memories_au trigger', () => {
  it('does not re-index FTS on counter updates but does on content edits', () => {
    const db = open(path.join(tempDir, 'trig.db'));
    const repo = new FastrRepository(db);
    const mem = rule(repo, 'Trigger target');
    rule(repo, 'Later row so a re-index cannot reuse the same rowid');
    const ftsRowid = () => (db.prepare('SELECT rowid AS r FROM memories_fts WHERE id = ?').get(mem.id) as any).r;
    const before = ftsRowid();

    repo.incrementRetrieval([mem.id]);
    repo.updateFeedback(mem.id, 'good');
    expect(ftsRowid()).toBe(before);

    db.prepare('UPDATE memories SET title = ? WHERE id = ?').run('Renamed target', mem.id);
    expect(ftsRowid()).not.toBe(before);
    expect((db.prepare('SELECT title FROM memories_fts WHERE id = ?').get(mem.id) as any).title).toBe('Renamed target');
  });

  it('migrates the legacy unconditional trigger idempotently', () => {
    const db = new DatabaseSync(path.join(tempDir, 'legacy.db'));
    openDbs.push(db);
    applySchema(db);
    db.exec('DROP TRIGGER memories_au');
    db.exec(`CREATE TRIGGER memories_au AFTER UPDATE ON memories BEGIN
      DELETE FROM memories_fts WHERE id = old.id;
      INSERT INTO memories_fts(id, title, module, content) VALUES (new.id, new.title, new.module, new.content);
    END;`);

    applySchema(db);
    applySchema(db);
    const sql = (db.prepare("SELECT sql FROM sqlite_master WHERE type = 'trigger' AND name = 'memories_au'").get() as any).sql;
    expect(sql).toMatch(/AFTER UPDATE OF title, module, content/);
  });
});

describe('pin / forget / resolveConflict results', () => {
  it('reports failure for unknown ids', () => {
    const repo = new FastrRepository(open(path.join(tempDir, 'pin.db')));
    expect(repo.pinMemory('mem_missing', true).success).toBe(false);
    expect(repo.forgetMemory('mem_missing').success).toBe(false);

    const mem = rule(repo, 'Pinnable');
    expect(repo.pinMemory(mem.id, true)).toEqual({ success: true, pinned: true });
    expect(repo.forgetMemory(mem.id)).toEqual({ success: true });
  });

  it('floors a weakened conflict loser at 0.1 like feedback does', () => {
    const db = open(path.join(tempDir, 'conf.db'));
    const repo = new FastrRepository(db);
    const a = rule(repo, 'Winner');
    const b = rule(repo, 'Loser');
    db.prepare('UPDATE memories SET reward_score = 0.2 WHERE id = ?').run(b.id);
    const res = db.prepare(`
      INSERT INTO memory_conflicts (project_id, memory_a_id, memory_b_id, reason, score) VALUES (?, ?, ?, 'test', 0.9)
    `).run(projectId, a.id, b.id);

    repo.resolveConflict(Number(res.lastInsertRowid), a.id, false);
    expect(repo.getMemory(b.id)!.reward_score).toBeCloseTo(0.1);
  });
});

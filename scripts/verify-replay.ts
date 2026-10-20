// Reproducible Phase 3/4 evidence capture.
// Run: npx tsx scripts/verify-replay.ts
//
// The script builds deterministic in-memory databases, exercises replay,
// hashed JSONL round-trips, non-lossy consolidation, and the Memory CI gate.
// It writes the raw result to bench/results/replay-evidence.json.
import * as fs from 'node:fs';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { diffSnapshots, formatDiffMarkdown, replayAt } from '../src/replay/snapshot.js';
import { exportSnapshotJsonl, importSnapshotJsonl, snapshotFromJsonl } from '../src/replay/jsonl.js';
import { consolidateMemories } from '../src/db/consolidate.js';
import { runMemoryCi } from '../src/ci/memory-ci.js';

const P = 'proj_evidence';
const AT = '2026-01-04T00:00:00.000Z';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function insertMemory(
  db: DatabaseSync,
  id: string,
  module: string,
  title: string,
  content: string,
  validFrom: string,
  validTo: string | null,
  status: string,
  supersededBy: string | null,
  sourceEventIds: string[] = []
): void {
  db.prepare(`
    INSERT INTO memories (
      id, project_id, agent_id, module, kind, title, content, status, pinned,
      reward_score, retrieval_count, valid_from, valid_to, superseded_by_id,
      superseded_reason, source_event_ids, embedding, embedded, created_at,
      last_recalled_at, provenance_hash
    ) VALUES (?, ?, 'evidence', ?, 'rule', ?, ?, ?, 0, 1, 0, ?, ?, ?, ?, ?, NULL, 0, ?, NULL, NULL)
  `).run(
    id, P, module, title, content, status, validFrom, validTo, supersededBy,
    status === 'superseded' ? 'evidence supersession' : null,
    JSON.stringify(sourceEventIds), validFrom
  );
}

function buildReplayDb(): DatabaseSync {
  const db = initDatabase(':memory:');
  const repo = new FastrRepository(db);
  repo.insertRawEvent({
    id: 'evt_evidence_1',
    project_id: P,
    session_id: 'evidence',
    agent_id: 'evidence',
    event_type: 'user_prompt',
    raw_payload: 'original observation retained by the event log'
  });
  db.prepare('UPDATE raw_events SET created_at = ? WHERE id = ?').run('2026-01-01T00:00:00.000Z', 'evt_evidence_1');

  insertMemory(db, 'mem_evidence_a', 'db', 'Use WAL', 'Enable WAL mode.', '2026-01-01T00:00:00.000Z', '2026-01-02T00:00:00.000Z', 'superseded', 'mem_evidence_b', ['evt_evidence_1']);
  insertMemory(db, 'mem_evidence_b', 'db', 'Use WAL plus busy timeout', 'Enable WAL and set a busy timeout for concurrent writers.', '2026-01-02T00:00:00.000Z', null, 'verified', null);
  insertMemory(db, 'mem_evidence_c', 'api', 'Idempotency keys', 'Require idempotency keys on retried writes.', '2026-01-03T00:00:00.000Z', null, 'verified', null);
  return db;
}

function buildConsolidationDb(): DatabaseSync {
  const db = initDatabase(':memory:');
  insertMemory(db, 'mem_consolidate_a', 'payments', 'Retry idempotently', 'Stripe retries need an idempotency key.', '2026-01-01T00:00:00.000Z', null, 'verified', null, ['evt_consolidate_a']);
  insertMemory(db, 'mem_consolidate_b', 'payments', 'Refund window', 'Refunds are allowed for 30 days.', '2026-01-02T00:00:00.000Z', null, 'verified', null, ['evt_consolidate_b']);
  db.prepare(`
    INSERT INTO raw_events (id, project_id, session_id, agent_id, event_type, raw_payload, content_hash, created_at)
    VALUES ('evt_consolidate_a', ?, 'evidence', 'evidence', 'tool_error', 'first observation', 'hash-a', '2026-01-01T00:00:00.000Z')
  `).run(P);
  db.prepare(`
    INSERT INTO raw_events (id, project_id, session_id, agent_id, event_type, raw_payload, content_hash, created_at)
    VALUES ('evt_consolidate_b', ?, 'evidence', 'evidence', 'git_commit', 'second observation', 'hash-b', '2026-01-02T00:00:00.000Z')
  `).run(P);
  return db;
}

function buildMemoryCiSnapshots(): { base: string; head: string } {
  const baseDb = initDatabase(':memory:');
  insertMemory(baseDb, 'mem_ci_old', 'db', 'Use WAL', 'Enable WAL mode.', '2026-01-01T00:00:00.000Z', null, 'verified', null);
  const base = exportSnapshotJsonl(baseDb, P, AT).jsonl;
  baseDb.close();

  const headDb = initDatabase(':memory:');
  importSnapshotJsonl(headDb, base);
  headDb.prepare(`
    UPDATE memories SET valid_to = ?, status = 'superseded', superseded_by_id = 'mem_ci_new', superseded_reason = 'busy timeout added' WHERE id = 'mem_ci_old'
  `).run('2026-01-02T00:00:00.000Z');
  insertMemory(headDb, 'mem_ci_new', 'db', 'Use WAL plus busy timeout', 'Enable WAL and set a busy timeout.', '2026-01-02T00:00:00.000Z', null, 'verified', null);
  insertMemory(headDb, 'mem_ci_trap', 'db', 'Do not hold a write transaction open', 'Long write transactions starve readers.', '2026-01-03T00:00:00.000Z', null, 'verified', null);
  headDb.prepare("UPDATE memories SET kind = 'error_trap' WHERE id = 'mem_ci_trap'").run();
  const head = exportSnapshotJsonl(headDb, P, AT).jsonl;
  headDb.close();
  return { base, head };
}

function main(): void {
  const replayDb = buildReplayDb();
  const t1 = replayAt(replayDb, P, '2026-01-01T12:00:00Z');
  const t2 = replayAt(replayDb, P, '2026-01-02T12:00:00Z');
  const t3 = replayAt(replayDb, P, '2026-01-03T12:00:00Z');
  const t1Again = replayAt(replayDb, P, '2026-01-01T12:00:00.000Z');

  assert(t1.memories.map((m) => m.id).join(',') === 'mem_evidence_a', 't1 active set mismatch');
  assert(t2.memories.map((m) => m.id).join(',') === 'mem_evidence_b', 't2 active set mismatch');
  assert(t3.memories.map((m) => m.id).join(',') === 'mem_evidence_b,mem_evidence_c', 't3 active set mismatch');
  assert(t1.contentHash === t1Again.contentHash, 'replay hash is not stable');
  assert(t1.history.length === 0 && t2.history.length === 1 && t3.history.length === 1, 'history mismatch');

  const exported = exportSnapshotJsonl(replayDb, P, AT);
  const importedDb = initDatabase(':memory:');
  const imported = importSnapshotJsonl(importedDb, exported.jsonl);
  const reExported = exportSnapshotJsonl(importedDb, P, AT);
  assert(imported.memories === 3 && imported.events === 1, 'import counts mismatch');
  assert(reExported.contentHash === exported.contentHash, 'JSONL round-trip hash mismatch');
  const importedState = snapshotFromJsonl(exported.jsonl);
  assert(importedState.memories.length === 2, 'JSONL active state mismatch');

  const diff = diffSnapshots(t1, t2);
  assert(diff.added[0]?.id === 'mem_evidence_b', 'diff added mismatch');
  assert(diff.superseded[0]?.id === 'mem_evidence_a', 'diff superseded mismatch');
  assert(diff.superseded[0]?.superseded_by_id === 'mem_evidence_b', 'supersession link mismatch');

  const consolidationDb = buildConsolidationDb();
  const consolidationRepo = new FastrRepository(consolidationDb);
  const consolidation = consolidateMemories(consolidationDb, consolidationRepo, { projectId: P, module: 'payments' });
  assert(consolidation.sourceMemoryIds.length === 2, 'consolidation source count mismatch');
  assert(consolidation.rawEventCountBefore === consolidation.rawEventCountAfter, 'consolidation lost raw events');
  assert(consolidation.activeMemoryCountAfter === consolidation.activeMemoryCountBefore + 1, 'consolidation did not add exactly one summary');
  assert(consolidationDb.prepare('SELECT COUNT(*) AS count FROM memories WHERE id IN (?, ?)').get('mem_consolidate_a', 'mem_consolidate_b')!.count === 2, 'consolidation mutated originals');

  const memoryCiInput = buildMemoryCiSnapshots();
  const memoryCi = runMemoryCi({
    baseJsonl: memoryCiInput.base,
    headJsonl: memoryCiInput.head,
    failOnNewTraps: true
  });
  assert(memoryCi.failed && memoryCi.newTrapIds.includes('mem_ci_trap'), 'Memory CI did not catch the new trap');
  assert(memoryCi.diff.superseded[0]?.superseded_by_id === 'mem_ci_new', 'Memory CI supersession link mismatch');

  const evidence = {
    schemaVersion: 1,
    generatedFor: 'Phase 3/4 evidence',
    projectId: P,
    replay: [
      { at: t1.at, active: t1.memories.map((m) => m.id), history: t1.history.map((m) => m.id), events: t1.events.length, hash: t1.contentHash },
      { at: t2.at, active: t2.memories.map((m) => m.id), history: t2.history.map((m) => m.id), events: t2.events.length, hash: t2.contentHash },
      { at: t3.at, active: t3.memories.map((m) => m.id), history: t3.history.map((m) => m.id), events: t3.events.length, hash: t3.contentHash }
    ],
    jsonl: {
      records: exported.records,
      memories: exported.memories,
      events: exported.events,
      contentHash: exported.contentHash,
      imported,
      reExportedHash: reExported.contentHash,
      roundTrip: reExported.contentHash === exported.contentHash
    },
    diff: diff,
    diffMarkdown: formatDiffMarkdown(diff),
    consolidation: {
      summaryKind: 'workflow',
      summaryTitle: consolidation.summaryTitle,
      sourceMemoryIds: consolidation.sourceMemoryIds,
      sourceEventIds: consolidation.sourceEventIds,
      activeMemoryCountBefore: consolidation.activeMemoryCountBefore,
      activeMemoryCountAfter: consolidation.activeMemoryCountAfter,
      rawEventCountBefore: consolidation.rawEventCountBefore,
      rawEventCountAfter: consolidation.rawEventCountAfter
    },
    memoryCi: {
      newTrapIds: memoryCi.newTrapIds,
      failed: memoryCi.failed,
      exitCode: memoryCi.exitCode,
      markdown: memoryCi.markdown
    }
  };

  const outFile = path.resolve('bench/results/replay-evidence.json');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, `${JSON.stringify(evidence, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(evidence, null, 2));
  console.log(`\nWrote ${outFile}`);

  replayDb.close();
  importedDb.close();
  consolidationDb.close();
}

main();

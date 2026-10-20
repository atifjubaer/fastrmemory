// Deterministic memory-hygiene gate.
//
// Seeds a temporary database with known orphan, duplicate, and stale rows,
// runs the same inspector exposed by `fastr hygiene`, and asserts the raw counts.
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { applySchema } from '../src/db/schema.js';
import { inspectMemoryHygiene } from '../src/db/hygiene.js';

const P = 'proj_hygiene_gate';
const NOW = new Date('2026-10-21T00:00:00.000Z');
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-hygiene-'));
const dbPath = path.join(tempDir, 'hygiene.db');
const errors = [];

function fail(message) {
  errors.push(message);
}

function memory(id, title, content, options = {}) {
  db.prepare(`
    INSERT INTO memories (
      id, project_id, module, kind, title, content, status, pinned,
      valid_from, valid_to, superseded_by_id, created_at, last_recalled_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    P,
    options.module ?? 'general',
    options.kind ?? 'rule',
    title,
    content,
    options.status ?? 'verified',
    options.pinned ?? 0,
    options.createdAt ?? '2026-10-20T00:00:00Z',
    options.validTo ?? null,
    options.supersededBy ?? null,
    options.createdAt ?? '2026-10-20T00:00:00Z',
    options.lastRecalledAt === undefined ? '2026-10-20T00:00:00Z' : options.lastRecalledAt
  );
}

let db;
try {
  db = new DatabaseSync(dbPath);
  applySchema(db);
  db.exec('PRAGMA foreign_keys = OFF');

  memory('mem_alpha_1', 'Alpha Rule', 'First unique body');
  memory('mem_alpha_2', ' alpha rule ', 'Second unique body');
  memory('mem_beta', 'Beta Rule', 'Shared exact body');
  memory('mem_gamma', 'Gamma Rule', 'Shared exact body');
  memory('mem_stale', 'Stale Rule', 'Old body', {
    createdAt: '2020-01-01T00:00:00Z',
    lastRecalledAt: null
  });
  memory('mem_pinned', 'Pinned Rule', 'Pinned body', {
    pinned: 1,
    createdAt: '2020-01-01T00:00:00Z',
    lastRecalledAt: null
  });
  memory('mem_superseded', 'Superseded Rule', 'History body', {
    status: 'superseded',
    validTo: '2020-01-02T00:00:00Z',
    createdAt: '2020-01-01T00:00:00Z',
    lastRecalledAt: null
  });
  memory('mem_dormant', 'Dormant Rule', 'Dormant body', {
    status: 'dormant',
    createdAt: '2020-01-01T00:00:00Z',
    lastRecalledAt: null
  });
  memory('mem_existing', 'Existing Rule', 'Existing body');

  db.prepare('INSERT INTO file_links (memory_id, file_path, symbol_name) VALUES (?, ?, ?)')
    .run('mem_missing_link', 'src/orphan.ts', '');
  db.prepare(`
    INSERT INTO memory_conflicts (project_id, memory_a_id, memory_b_id, reason, score)
    VALUES (?, ?, ?, ?, ?)
  `).run(P, 'mem_missing_conflict', 'mem_existing', 'orphan conflict', 0.9);
  db.prepare(`
    INSERT INTO memory_feedback (
      id, project_id, memory_id, outcome, note, reward_before, reward_after,
      status_before, status_after, confidence_tier, bad_streak
    ) VALUES (?, ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?)
  `).run('fb_orphan', P, 'mem_missing_feedback', 'good', 1.0, 1.2, 'verified', 'verified', 'medium', 0);

  const report = inspectMemoryHygiene(db, P, { staleAfterDays: 30, now: NOW });
  const expected = {
    activeMemories: 7,
    pinnedMemories: 1,
    neverRecalled: 2,
    orphanFileLinks: 1,
    orphanConflicts: 1,
    orphanFeedback: 1,
    duplicateTitleGroups: 1,
    duplicateTitleRows: 1,
    duplicateContentGroups: 1,
    duplicateContentRows: 1,
    staleMemories: 1
  };

  for (const [key, value] of Object.entries(expected)) {
    if (report.counts[key] !== value) {
      fail(`expected ${key}=${value}, got ${report.counts[key]}`);
    }
  }
  if (report.healthy) fail('fixture should report hygiene issues');
  const categories = report.issues.map((issue) => issue.category).join(',');
  if (categories !== 'orphan,duplicate,duplicate,stale') {
    fail(`expected orphan,duplicate,duplicate,stale issues, got ${categories}`);
  }

  if (errors.length > 0) {
    for (const error of errors) console.error(`ERROR: ${error}`);
    process.exitCode = 1;
  } else {
    console.log(
      `Hygiene gate passed: active=${report.counts.activeMemories}, ` +
        `orphans=${report.counts.orphanFileLinks + report.counts.orphanConflicts + report.counts.orphanFeedback} ` +
        `(file_links=${report.counts.orphanFileLinks}, conflicts=${report.counts.orphanConflicts}, feedback=${report.counts.orphanFeedback}), ` +
        `duplicate_title=${report.counts.duplicateTitleGroups}g/${report.counts.duplicateTitleRows}r, ` +
        `duplicate_content=${report.counts.duplicateContentGroups}g/${report.counts.duplicateContentRows}r, ` +
        `stale=${report.counts.staleMemories}, pinned_excluded=${report.counts.pinnedMemories}.`
    );
  }
} catch (err) {
  console.error(`ERROR: ${err instanceof Error ? err.message : String(err)}`);
  process.exitCode = 1;
} finally {
  db?.close();
  fs.rmSync(tempDir, { recursive: true, force: true });
}

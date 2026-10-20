#!/usr/bin/env node
/**
 * Lists (and optionally removes) the synthetic rows that older test runs wrote
 * into the real user-level store. Nothing is deleted unless both --apply and
 * --yes are passed.
 *
 *   node scripts/clean-test-junk.mjs --dry-run
 *   node scripts/clean-test-junk.mjs --apply --yes
 */
import { DatabaseSync } from 'node:sqlite';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

const TITLE = 'Global Security Invariant';
const dbPath = path.join(os.homedir(), '.fastr', 'global.db');
const apply = process.argv.includes('--apply');
const confirmed = process.argv.includes('--yes');
const dryRun = process.argv.includes('--dry-run') || !apply;

if (apply && !confirmed) {
  console.error('Refusing to delete: pass --apply --yes to confirm.');
  process.exit(2);
}

if (!fs.existsSync(dbPath)) {
  console.log(`No global store at ${dbPath}. Nothing to clean.`);
  process.exit(0);
}

const db = new DatabaseSync(dbPath, { readOnly: dryRun });
try {
  const rows = db.prepare(
    'SELECT id, project_id, created_at FROM memories WHERE title = ? ORDER BY created_at'
  ).all(TITLE);
  const total = db.prepare('SELECT COUNT(*) AS c FROM memories').get().c;

  console.log(`Global store: ${dbPath}`);
  console.log(`Total memories: ${total}`);
  console.log(`Matching "${TITLE}": ${rows.length}`);
  for (const row of rows.slice(0, 5)) {
    console.log(`  ${row.id}  ${row.created_at}  project=${row.project_id}`);
  }
  if (rows.length > 5) console.log(`  ... and ${rows.length - 5} more`);

  if (dryRun) {
    console.log('\nDry run only. Re-run with --apply --yes to delete these rows.');
    process.exit(0);
  }

  if (rows.length === 0) {
    console.log('\nNothing to delete.');
    process.exit(0);
  }

  const ids = rows.map((row) => row.id);
  const placeholders = ids.map(() => '?').join(',');
  db.exec('BEGIN IMMEDIATE');
  try {
    db.prepare(`DELETE FROM file_links WHERE memory_id IN (${placeholders})`).run(...ids);
    db.prepare(`DELETE FROM graph_edges WHERE source_id IN (${placeholders})`).run(...ids);
    db.prepare(`DELETE FROM memory_conflicts WHERE memory_a_id IN (${placeholders}) OR memory_b_id IN (${placeholders})`).run(...ids, ...ids);
    const result = db.prepare(`DELETE FROM memories WHERE id IN (${placeholders}) AND title = ?`).run(...ids, TITLE);
    db.exec('COMMIT');
    console.log(`\nDeleted ${result.changes} rows and their dependent links.`);
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
} finally {
  db.close();
}

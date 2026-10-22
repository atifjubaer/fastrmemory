import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import {
  createBackup,
  defaultBackupPath,
  readBackupManifest,
  restoreBackup,
  verifyBackup
} from '../src/replay/backup.js';

const P = 'proj_backup';
const AT = '2026-01-04T00:00:00.000Z';

describe('portable backups with provenance', () => {
  let source: DatabaseSync;
  let target: DatabaseSync;
  let tempDir: string;

  beforeEach(() => {
    source = initDatabase(':memory:');
    target = initDatabase(':memory:');
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-backup-'));
  });

  afterEach(() => {
    source.close();
    target.close();
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('creates, verifies, and restores a manifest-backed snapshot', () => {
    const repo = new FastrRepository(source);
    const event = repo.insertRawEvent({
      id: 'evt_backup_1',
      project_id: P,
      session_id: 's1',
      agent_id: 'agent',
      event_type: 'tool_error',
      tool_name: 'shell',
      file_path: 'src/db/schema.ts',
      raw_payload: 'SQLITE_BUSY from a concurrent write'
    });
    source.prepare('UPDATE raw_events SET created_at = ? WHERE id = ?').run('2026-01-01T00:00:00.000Z', event.id);

    const memory = repo.insertMemory({
      projectId: P,
      module: 'db',
      kind: 'error_trap',
      title: 'Retry SQLITE_BUSY',
      content: 'Use a bounded busy timeout.',
      files: ['src/db/schema.ts'],
      sourceEventIds: [event.id],
      verified: true
    });
    source.prepare('UPDATE memories SET valid_from = ? WHERE id = ?').run('2026-01-01T00:00:00.000Z', memory.id);

    const backupPath = path.join(tempDir, 'backup.jsonl');
    const created = createBackup(source, P, backupPath, { at: AT, sourceDbPath: ':memory:' });

    expect(created.manifest.schemaVersion).toBe(1);
    expect(created.manifest.kind).toBe('fastrmemory-backup');
    expect(created.manifest.projectId).toBe(P);
    expect(created.manifest.createdAt).toBe(AT);
    expect(created.manifest.backup.memories).toBe(1);
    expect(created.manifest.backup.events).toBe(1);
    expect(created.manifest.backup.fileLinks).toBe(1);
    expect(created.manifest.backup.records).toBe(3);
    expect(created.manifest.backup.bytes).toBeGreaterThan(0);
    expect(created.manifest.backup.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(created.manifest.backup.contentHash).toBe(created.export.contentHash);
    expect(created.manifest.source.integrity).toBe('ok');
    expect(created.manifest.scope).toContain('memories');

    const verified = verifyBackup(backupPath);
    expect(verified.header.contentHash).toBe(created.manifest.backup.contentHash);
    expect(verified.header.recordCount).toBe(3);

    const restored = restoreBackup(target, backupPath);
    expect(restored.dryRun).toBe(false);
    expect(restored.memories).toBe(1);
    expect(restored.events).toBe(1);
    expect(restored.fileLinks).toBe(1);
    expect(restored.contentHash).toBe(created.export.contentHash);

    const targetRepo = new FastrRepository(target);
    expect(targetRepo.getMemory(memory.id)?.title).toBe('Retry SQLITE_BUSY');
    expect(targetRepo.getRawEvent(event.id)?.raw_payload).toContain('SQLITE_BUSY');
  });

  it('rejects a tampered backup before restoring rows', () => {
    const repo = new FastrRepository(source);
    repo.insertMemory({
      projectId: P,
      module: 'db',
      kind: 'rule',
      title: 'Original title',
      content: 'Original content',
      verified: true
    });
    const backupPath = path.join(tempDir, 'tampered.jsonl');
    createBackup(source, P, backupPath, { at: AT });
    const original = fs.readFileSync(backupPath, 'utf8');
    fs.writeFileSync(backupPath, original.replace('Original title', 'Tampered title'), 'utf8');

    expect(() => verifyBackup(backupPath)).toThrow(/SHA-256 mismatch/);
    expect(() => restoreBackup(target, backupPath)).toThrow(/SHA-256 mismatch/);
    const count = target.prepare('SELECT COUNT(*) AS count FROM memories').get() as { count: number };
    expect(Number(count.count)).toBe(0);
  });

  it('rejects a missing manifest and refuses accidental overwrite', () => {
    const repo = new FastrRepository(source);
    repo.insertMemory({ projectId: P, module: 'db', kind: 'rule', title: 'Rule', content: 'Body', verified: true });

    const backupPath = path.join(tempDir, 'missing-manifest.jsonl');
    createBackup(source, P, backupPath, { at: AT });
    fs.rmSync(`${backupPath}.manifest.json`);
    expect(() => readBackupManifest(backupPath)).toThrow(/manifest not found/);
    expect(() => verifyBackup(backupPath)).toThrow(/manifest not found/);

    const secondPath = path.join(tempDir, 'second.jsonl');
    createBackup(source, P, secondPath, { at: AT });
    expect(() => createBackup(source, P, secondPath, { at: AT })).toThrow(/already exists/);
    expect(() => createBackup(source, P, secondPath, { at: AT, force: true })).not.toThrow();
  });

  it('supports a dry-run restore and builds a timestamped default path', () => {
    const repo = new FastrRepository(source);
    repo.insertMemory({ projectId: P, module: 'db', kind: 'rule', title: 'Rule', content: 'Body', verified: true });
    const backupPath = path.join(tempDir, 'dry.jsonl');
    createBackup(source, P, backupPath, { at: AT });

    const dry = restoreBackup(target, backupPath, { dryRun: true });
    expect(dry.dryRun).toBe(true);
    expect(dry.memories).toBe(1);
    const count = target.prepare('SELECT COUNT(*) AS count FROM memories').get() as { count: number };
    expect(Number(count.count)).toBe(0);

    const defaultPath = defaultBackupPath(tempDir, AT);
    expect(defaultPath).toContain(path.join('.fastr', 'backups'));
    expect(defaultPath.endsWith('.jsonl')).toBe(true);
    expect(defaultPath).toContain('2026-01-04');
  });
});

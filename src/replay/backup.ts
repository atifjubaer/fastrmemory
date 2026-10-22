import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { PACKAGE_VERSION } from '../version.js';
import {
  ExportJsonlResult,
  ImportJsonlResult,
  JsonlHeader,
  exportSnapshotJsonl,
  importSnapshotJsonl,
  parseSnapshotJsonl
} from './jsonl.js';

export const BACKUP_MANIFEST_SCHEMA_VERSION = 1;

export interface BackupManifest {
  schemaVersion: 1;
  kind: 'fastrmemory-backup';
  createdAt: string;
  projectId: string;
  scope: Array<'memories' | 'raw_events' | 'file_links' | 'memory_conflicts'>;
  tool: {
    name: string;
    version: string;
  };
  environment: {
    node: string;
    platform: string;
    arch: string;
  };
  source: {
    databaseFile: string;
    databaseBytes: number;
    integrity: string;
    provenanceHashes: number;
  };
  backup: {
    file: string;
    bytes: number;
    sha256: string;
    contentHash: string;
    records: number;
    memories: number;
    events: number;
    fileLinks: number;
    conflicts: number;
  };
}

export interface CreateBackupOptions {
  at?: string;
  force?: boolean;
  sourceDbPath?: string;
}

export interface CreateBackupResult {
  backupPath: string;
  manifestPath: string;
  manifest: BackupManifest;
  export: ExportJsonlResult;
}

export interface VerifyBackupResult {
  backupPath: string;
  manifestPath: string;
  manifest: BackupManifest;
  header: JsonlHeader;
}

export interface RestoreBackupResult extends ImportJsonlResult {
  backupPath: string;
  manifestPath: string;
}

function sha256(data: string | Buffer): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function integrityOf(db: DatabaseSync): string {
  try {
    const row = db.prepare('PRAGMA integrity_check').get() as Record<string, unknown> | undefined;
    return String(row?.integrity_check ?? Object.values(row ?? {})[0] ?? 'unknown');
  } catch {
    return 'unknown';
  }
}

function provenanceCount(db: DatabaseSync, projectId: string): number {
  try {
    const row = db.prepare(
      'SELECT COUNT(*) AS count FROM memories WHERE project_id = ? AND provenance_hash IS NOT NULL'
    ).get(projectId) as { count?: number } | undefined;
    return Number(row?.count ?? 0);
  } catch {
    return 0;
  }
}

function sourceSize(sourceDbPath?: string): number {
  if (!sourceDbPath || sourceDbPath === ':memory:') return 0;
  try {
    return fs.statSync(sourceDbPath).size;
  } catch {
    return 0;
  }
}

function manifestPathFor(backupPath: string): string {
  return `${backupPath}.manifest.json`;
}

function assertWritable(target: string, force: boolean): void {
  if (fs.existsSync(target) && !force) {
    throw new Error(`${target} already exists. Pass --force to overwrite.`);
  }
}

export function defaultBackupPath(projectRoot: string, at = new Date().toISOString()): string {
  const stamp = new Date(at).toISOString().replaceAll(':', '-').replaceAll('.', '-');
  return path.join(projectRoot, '.fastr', 'backups', `fastrmemory-${stamp}.jsonl`);
}

/**
 * Writes a portable JSONL snapshot plus a sidecar provenance manifest.
 * The backup covers memories, raw events, file links, and conflicts; it is not a
 * physical SQLite copy and does not include the WAL file.
 */
export function createBackup(
  db: DatabaseSync,
  projectId: string,
  backupPath: string,
  options: CreateBackupOptions = {}
): CreateBackupResult {
  const target = path.resolve(backupPath);
  const manifestPath = manifestPathFor(target);
  assertWritable(target, options.force === true);
  assertWritable(manifestPath, options.force === true);

  const createdAt = options.at ? new Date(options.at).toISOString() : new Date().toISOString();
  const exported = exportSnapshotJsonl(db, projectId, createdAt);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, exported.jsonl, 'utf8');

  const bytes = Buffer.byteLength(exported.jsonl, 'utf8');
  const manifest: BackupManifest = {
    schemaVersion: BACKUP_MANIFEST_SCHEMA_VERSION,
    kind: 'fastrmemory-backup',
    createdAt,
    projectId,
    scope: ['memories', 'raw_events', 'file_links', 'memory_conflicts'],
    tool: {
      name: 'fastrmemory',
      version: PACKAGE_VERSION
    },
    environment: {
      node: process.version,
      platform: process.platform,
      arch: process.arch
    },
    source: {
      databaseFile: options.sourceDbPath ? path.basename(options.sourceDbPath) : ':memory:',
      databaseBytes: sourceSize(options.sourceDbPath),
      integrity: integrityOf(db),
      provenanceHashes: provenanceCount(db, projectId)
    },
    backup: {
      file: path.basename(target),
      bytes,
      sha256: sha256(exported.jsonl),
      contentHash: exported.contentHash,
      records: exported.records,
      memories: exported.memories,
      events: exported.events,
      fileLinks: exported.fileLinks,
      conflicts: exported.conflicts
    }
  };

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return { backupPath: target, manifestPath, manifest, export: exported };
}

export function readBackupManifest(backupPath: string): BackupManifest {
  const manifestPath = manifestPathFor(path.resolve(backupPath));
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Backup manifest not found: ${manifestPath}`);
  }
  let parsed: BackupManifest;
  try {
    parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as BackupManifest;
  } catch (error) {
    throw new Error(`Invalid backup manifest: ${error instanceof Error ? error.message : String(error)}`);
  }
  if (parsed.kind !== 'fastrmemory-backup' || parsed.schemaVersion !== BACKUP_MANIFEST_SCHEMA_VERSION) {
    throw new Error('Unsupported backup manifest kind or schema version');
  }
  return parsed;
}

/**
 * Verifies the sidecar manifest, the file SHA-256, and the JSONL content hash
 * before any restore writes a row.
 */
export function verifyBackup(backupPath: string): VerifyBackupResult {
  const target = path.resolve(backupPath);
  if (!fs.existsSync(target)) {
    throw new Error(`Backup file not found: ${target}`);
  }
  const manifest = readBackupManifest(target);
  const manifestPath = manifestPathFor(target);
  const buffer = fs.readFileSync(target);
  if (buffer.byteLength !== manifest.backup.bytes) {
    throw new Error(`Backup size mismatch: manifest ${manifest.backup.bytes}, actual ${buffer.byteLength}`);
  }
  const fileHash = sha256(buffer);
  if (fileHash !== manifest.backup.sha256) {
    throw new Error('Backup file SHA-256 mismatch');
  }

  const { header, records } = parseSnapshotJsonl(buffer.toString('utf8'));
  if (header.projectId !== manifest.projectId) {
    throw new Error(`Backup project mismatch: manifest ${manifest.projectId}, header ${header.projectId}`);
  }
  if (header.contentHash !== manifest.backup.contentHash) {
    throw new Error('Backup content hash does not match the manifest');
  }
  if (header.recordCount !== manifest.backup.records || records.length !== manifest.backup.records) {
    throw new Error('Backup record count does not match the manifest');
  }

  return { backupPath: target, manifestPath, manifest, header };
}

/** Verifies first, then imports the portable snapshot into the target database. */
export function restoreBackup(
  db: DatabaseSync,
  backupPath: string,
  options: { dryRun?: boolean } = {}
): RestoreBackupResult {
  const verified = verifyBackup(backupPath);
  const imported = importSnapshotJsonl(db, fs.readFileSync(verified.backupPath, 'utf8'), {
    dryRun: options.dryRun === true
  });
  return {
    ...imported,
    backupPath: verified.backupPath,
    manifestPath: verified.manifestPath
  };
}

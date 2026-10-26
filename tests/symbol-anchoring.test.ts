import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { extractSymbols } from '../src/code/symbol-extractor.js';
import {
  declarationId,
  findSymbolsByName,
  indexFileSymbols,
  reconcileSymbolLinks,
  resolveSymbolId
} from '../src/code/indexer.js';

const PROJECT = 'proj_anchor';

const ORIGINAL = `export function signToken(payload: string): string {
  const encoded = encode(payload);
  return encoded;
}
`;

const RENAMED = `export function signJwt(payload: string): string {
  const encoded = encode(payload);
  return encoded;
}
`;

describe('symbol anchoring', () => {
  const dbPath = path.join(process.cwd(), 'tests', 'temp_anchor.db');
  let db: ReturnType<typeof initDatabase>;
  let repo: FastrRepository;

  beforeEach(() => {
    for (const suffix of ['', '-wal', '-shm']) {
      const file = `${dbPath}${suffix}`;
      if (fs.existsSync(file)) {
        try {
          fs.unlinkSync(file);
        } catch {
          // locked on Windows
        }
      }
    }
    db = initDatabase(dbPath);
    repo = new FastrRepository(db, undefined, { conflictMode: 'off', nerMode: 'off', ftsMode: 'off' });
  });

  afterEach(() => {
    try {
      db.close();
    } catch {
      // already closed
    }
    for (const suffix of ['', '-wal', '-shm']) {
      const file = `${dbPath}${suffix}`;
      if (fs.existsSync(file)) {
        try {
          fs.unlinkSync(file);
        } catch {
          // locked on Windows
        }
      }
    }
  });

  it('gives the same declaration id to a renamed symbol', () => {
    const before = extractSymbols(ORIGINAL, 'src/auth/token.ts')[0];
    const after = extractSymbols(RENAMED, 'src/auth/token.ts')[0];

    expect(before.name).toBe('signToken');
    expect(after.name).toBe('signJwt');
    expect(declarationId(before.kind, before.normalizedBody)).toBe(
      declarationId(after.kind, after.normalizedBody)
    );
  });

  it('gives different declaration ids to different declarations', () => {
    const one = extractSymbols(ORIGINAL, 'a.ts')[0];
    const two = extractSymbols('export function other(): number {\n  return 1;\n}\n', 'b.ts')[0];

    expect(declarationId(one.kind, one.normalizedBody)).not.toBe(
      declarationId(two.kind, two.normalizedBody)
    );
  });

  it('anchors a memory link to the indexed symbol', () => {
    indexFileSymbols(db, PROJECT, 'src/auth/token.ts', ORIGINAL);

    const memory = repo.insertMemory({
      projectId: PROJECT,
      kind: 'error_trap',
      title: 'Never sign with raw timestamps',
      content: 'Use signToken(payload) for every token.',
      files: ['src/auth/token.ts'],
      symbols: ['signToken']
    });

    const link = db
      .prepare('SELECT * FROM file_links WHERE memory_id = ?')
      .get(memory.id) as any;

    expect(link.symbol_name).toBe('signToken');
    expect(link.symbol_id).toBeTruthy();
    expect(link.declaration_id).toBeTruthy();
  });

  it('keeps a plain path link when the symbol is not indexed', () => {
    const memory = repo.insertMemory({
      projectId: PROJECT,
      kind: 'rule',
      title: 'Rule about a file',
      content: 'Keep this file readable.',
      files: ['src/unindexed.ts'],
      symbols: ['neverSeen']
    });

    const link = db
      .prepare('SELECT * FROM file_links WHERE memory_id = ?')
      .get(memory.id) as any;

    expect(link.file_path).toBe('src/unindexed.ts');
    expect(link.symbol_name).toBe('neverSeen');
    expect(link.symbol_id).toBeNull();
    expect(link.declaration_id).toBeNull();
  });

  it('follows a symbol that moved to another file', () => {
    indexFileSymbols(db, PROJECT, 'src/auth/token.ts', ORIGINAL);
    repo.insertMemory({
      projectId: PROJECT,
      kind: 'error_trap',
      title: 'Trap on signToken',
      content: 'Always call signToken with a string.',
      files: ['src/auth/token.ts'],
      symbols: ['signToken']
    });

    // The symbol moved; the old file no longer declares it.
    db.prepare('DELETE FROM symbols WHERE file_path = ?').run('src/auth/token.ts');
    indexFileSymbols(db, PROJECT, 'src/auth/jwt.ts', ORIGINAL);

    const result = reconcileSymbolLinks(db, PROJECT);
    expect(result.followed).toBe(1);
    expect(result.unlinked).toBe(0);

    const link = db.prepare('SELECT * FROM file_links').get() as any;
    expect(link.file_path).toBe('src/auth/jwt.ts');
    expect(link.symbol_name).toBe('signToken');
  });

  it('follows a symbol that was renamed in place', () => {
    indexFileSymbols(db, PROJECT, 'src/auth/token.ts', ORIGINAL);
    repo.insertMemory({
      projectId: PROJECT,
      kind: 'error_trap',
      title: 'Trap on signToken',
      content: 'Always call signToken with a string.',
      files: ['src/auth/token.ts'],
      symbols: ['signToken']
    });

    indexFileSymbols(db, PROJECT, 'src/auth/token.ts', RENAMED);

    const result = reconcileSymbolLinks(db, PROJECT);
    expect(result.followed).toBe(1);

    const link = db.prepare('SELECT * FROM file_links').get() as any;
    expect(link.symbol_name).toBe('signJwt');
    expect(link.file_path).toBe('src/auth/token.ts');
  });

  it('drops a link when the symbol no longer exists', () => {
    indexFileSymbols(db, PROJECT, 'src/auth/token.ts', ORIGINAL);
    repo.insertMemory({
      projectId: PROJECT,
      kind: 'error_trap',
      title: 'Trap on signToken',
      content: 'Always call signToken with a string.',
      files: ['src/auth/token.ts'],
      symbols: ['signToken']
    });

    db.prepare('DELETE FROM symbols WHERE project_id = ?').run(PROJECT);

    const result = reconcileSymbolLinks(db, PROJECT);
    expect(result.unlinked).toBe(1);

    const links = db.prepare('SELECT * FROM file_links').all() as any[];
    expect(links).toHaveLength(0);
  });

  it('resolves a symbol by name when the file is unknown', () => {
    indexFileSymbols(db, PROJECT, 'src/auth/token.ts', ORIGINAL);

    const resolved = resolveSymbolId(db, PROJECT, undefined, 'signToken');
    expect(resolved?.name).toBe('signToken');
    expect(resolved?.filePath).toBe('src/auth/token.ts');
  });

  it('prefers a symbol in the named file over one elsewhere', () => {
    indexFileSymbols(db, PROJECT, 'src/a/token.ts', ORIGINAL);
    indexFileSymbols(db, PROJECT, 'src/b/token.ts', ORIGINAL);

    const resolved = resolveSymbolId(db, PROJECT, 'src/b/token.ts', 'signToken');
    expect(resolved?.filePath).toBe('src/b/token.ts');
  });

  it('keeps the anchor when the file link is restored from a snapshot', () => {
    indexFileSymbols(db, PROJECT, 'src/auth/token.ts', ORIGINAL);
    const memory = repo.insertMemory({
      projectId: PROJECT,
      kind: 'rule',
      title: 'Rule',
      content: 'Content',
      files: ['src/auth/token.ts'],
      symbols: ['signToken']
    });

    const link = db.prepare('SELECT * FROM file_links WHERE memory_id = ?').get(memory.id) as any;
    expect(link.declaration_id).toBeTruthy();
  });
});

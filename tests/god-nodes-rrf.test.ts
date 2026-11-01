import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';
import { indexProjectSymbols, getGodNodes } from '../src/code/indexer.js';

const PROJECT_ID = 'proj_god_nodes_test';

describe('God-Node Fragility Weighting in RRF Retrieval', () => {
  let tempDir: string;
  let db: DatabaseSync;
  let repo: FastrRepository;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-godnodes-'));
    const srcDir = path.join(tempDir, 'src');
    fs.mkdirSync(srcDir, { recursive: true });

    // God-Node file: core database engine called by 3 services
    fs.writeFileSync(
      path.join(srcDir, 'engine.ts'),
      `export function runEngine(cmd: string): any { return cmd; }`,
      'utf8'
    );

    // Caller 1
    fs.writeFileSync(
      path.join(srcDir, 'serviceA.ts'),
      `import { runEngine } from './engine.ts';\nexport function doA() { return runEngine("A"); }`,
      'utf8'
    );

    // Caller 2
    fs.writeFileSync(
      path.join(srcDir, 'serviceB.ts'),
      `import { runEngine } from './engine.ts';\nexport function doB() { return runEngine("B"); }`,
      'utf8'
    );

    // Caller 3
    fs.writeFileSync(
      path.join(srcDir, 'serviceC.ts'),
      `import { runEngine } from './engine.ts';\nexport function doC() { return runEngine("C"); }`,
      'utf8'
    );

    // Peripheral file: isolated utility
    fs.writeFileSync(
      path.join(srcDir, 'peripheral.ts'),
      `export function formatLabel(str: string): string { return str.trim(); }`,
      'utf8'
    );

    db = initDatabase(path.join(tempDir, 'test.db'));
    repo = new FastrRepository(db, undefined, { projectRoot: tempDir });

    indexProjectSymbols(db, PROJECT_ID, tempDir, {
      files: ['src/engine.ts', 'src/serviceA.ts', 'src/serviceB.ts', 'src/serviceC.ts', 'src/peripheral.ts']
    });
  });

  afterEach(() => {
    try { db.close(); } catch {}
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('identifies runEngine as the top God-Node by in-degree', () => {
    const godNodes = getGodNodes(db, PROJECT_ID, 5);
    expect(godNodes.length).toBeGreaterThan(0);
    expect(godNodes[0].name).toBe('runEngine');
    expect(godNodes[0].inDegree).toBeGreaterThanOrEqual(3);
  });

  it('boosts memory linked to a God-Node in RRF retrieval', async () => {
    // Memory 1: linked to God-Node runEngine
    const memGod = repo.insertMemory({
      projectId: PROJECT_ID,
      module: 'core',
      kind: 'rule',
      title: 'Always flush buffers before runEngine',
      content: 'Buffer flush prevents command corruption in the database engine.',
      files: ['src/engine.ts'],
      symbols: ['runEngine'],
      verified: true
    });

    // Memory 2: linked to peripheral utility
    const memPeripheral = repo.insertMemory({
      projectId: PROJECT_ID,
      module: 'utils',
      kind: 'rule',
      title: 'Always trim labels in formatLabel',
      content: 'Buffer format prevents label corruption in the database engine.',
      files: ['src/peripheral.ts'],
      symbols: ['formatLabel'],
      verified: true
    });

    // Query matching both memories on content
    const res = await searchMemories(db, {
      projectId: PROJECT_ID,
      query: 'database engine buffer',
      backfill: false,
      retrieval: { enableVector: false, enableGraph: false }
    });

    expect(res.memories.length).toBeGreaterThanOrEqual(2);
    // God-Node memory should rank higher due to godNodeMultiplier
    const godIndex = res.memories.findIndex((m) => m.memory.id === memGod.id);
    const peripheralIndex = res.memories.findIndex((m) => m.memory.id === memPeripheral.id);

    expect(godIndex).toBeLessThan(peripheralIndex);
  });
});

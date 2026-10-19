import { describe, it, expect, beforeEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { tagVisionAsset, searchVisionAssets } from '../src/vision/assets.js';

describe('Multimodal Visual Memory Engine', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;
  const projectId = 'test-proj-vision';

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  it('tags and persists screenshot with description and OCR text', async () => {
    const mem = repo.insertMemory({
      projectId,
      agentId: 'agent-vision',
      module: 'ui',
      kind: 'error_trap',
      title: 'Modal Auth Crash',
      content: 'Modal crashes on unauthenticated 401 response'
    });

    const asset = await tagVisionAsset(db, {
      projectId,
      filePath: 'tests/fixtures/modal-error.png',
      description: 'Modal error dialog showing HTTP 401 Unauthorized alert',
      ocrText: 'HTTP 401 Unauthorized. Access token expired.',
      memoryId: mem.id
    });

    expect(asset.id).toMatch(/^img_[0-9a-f]{8}$/);
    expect(asset.description).toContain('Modal error dialog');
    expect(asset.memory_id).toBe(mem.id);
    expect(asset.embedding).toBeDefined();

    // Verify row in database
    const row = db.prepare('SELECT * FROM vision_assets WHERE id = ?').get(asset.id) as any;
    expect(row).toBeDefined();
    expect(row.file_path).toContain('modal-error.png');
  });

  it('performs semantic and keyword visual search across tagged screenshots', async () => {
    await tagVisionAsset(db, {
      projectId,
      filePath: 'tests/fixtures/login-screen.png',
      description: 'Dark mode user login form with OAuth Google and GitHub buttons',
      ocrText: 'Sign in to FastrMemory'
    });

    await tagVisionAsset(db, {
      projectId,
      filePath: 'tests/fixtures/architecture-dag.png',
      description: 'System architectural diagram showing SQLite WAL and MCP protocol stream',
      ocrText: 'Architecture Flowchart Node.js'
    });

    // Search for login
    const loginResults = await searchVisionAssets(db, projectId, 'login oauth google form');
    expect(loginResults.length).toBeGreaterThanOrEqual(1);
    expect(loginResults[0].filePath).toContain('login-screen.png');
    expect(loginResults[0].score).toBeGreaterThan(0);

    // Search for architecture
    const archResults = await searchVisionAssets(db, projectId, 'architecture sqlite flow');
    expect(archResults.length).toBeGreaterThanOrEqual(1);
    expect(archResults[0].filePath).toContain('architecture-dag.png');
  });

  it('filters visual search by linked memory ID', async () => {
    const mem1 = repo.insertMemory({
      projectId,
      agentId: 'agent-1',
      module: 'auth',
      kind: 'rule',
      title: 'Auth Rule',
      content: 'Rule'
    });

    const mem2 = repo.insertMemory({
      projectId,
      agentId: 'agent-1',
      module: 'db',
      kind: 'rule',
      title: 'DB Rule',
      content: 'Rule'
    });

    await tagVisionAsset(db, {
      projectId,
      filePath: 'tests/fixtures/auth-spec.png',
      description: 'Auth specification wireframe',
      memoryId: mem1.id
    });

    await tagVisionAsset(db, {
      projectId,
      filePath: 'tests/fixtures/db-schema.png',
      description: 'Database schema ER diagram',
      memoryId: mem2.id
    });

    const scoped = await searchVisionAssets(db, projectId, 'wireframe diagram', { memoryId: mem1.id });
    expect(scoped.length).toBe(1);
    expect(scoped[0].filePath).toContain('auth-spec.png');
  });
});

import { describe, it, expect, beforeEach } from 'vitest';
import { FastrRepository } from '../src/db/repository.js';
import { initDatabase } from '../src/db/schema.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';

describe('Spreading Activation Graph Search', () => {
  let db: any;
  let repo: FastrRepository;

  beforeEach(() => {
    db = initDatabase(':memory:');
    repo = new FastrRepository(db);
  });

  it('spreads activation across shared entity nodes to surface 2-hop connected rules', async () => {
    const projectId = 'p_spreading_test';

    // 1. Memory A establishes the cryptographic standard for FastrAuthService
    const memA = repo.insertMemory({
      projectId,
      kind: 'rule',
      title: 'Cryptographic Standard',
      content: 'Always use Ed25519 signature verification in FastrAuthService for JWT tokens.',
      verified: true
    });

    // 2. Memory B describes endpoint route guards linking to FastrAuthService
    const memB = repo.insertMemory({
      projectId,
      kind: 'rule',
      title: 'Protected API Endpoints',
      content: 'Protected HTTP endpoints must validate session headers through FastrAuthService.',
      verified: true
    });

    // Verify entities were extracted
    const entities = repo.getEntities(projectId);
    const names = entities.map((e) => e.name.toLowerCase());
    expect(names).toContain('fastrauthservice');

    // 3. Query explicitly for "Ed25519"
    // Memory A matches keyword and entity.
    // Activation spreads to FastrAuthService, and from FastrAuthService to Memory B!
    const results = await searchMemories(db, {
      projectId,
      query: 'Ed25519',
      includeHistory: false,
      retrieval: { graphSeedFromCandidates: true }
    });

    const returnedIds = results.memories.map((m) => m.memory.id);
    expect(returnedIds).toContain(memA.id);
    expect(returnedIds).toContain(memB.id);
  });
});

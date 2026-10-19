import { describe, it, expect } from 'vitest';
import { computeFeatureHashVector, computeEmbedding, cosineSimilarity } from '../src/search/embeddings.js';

describe('In-Process Offline Feature Hashing Vectorizer', () => {
  it('generates 384-dimensional unit L2 normalized vectors', () => {
    const text = 'Always use Math.floor(Date.now() / 1000) for JWT expiration claims.';
    const vec = computeFeatureHashVector(text, 384);

    expect(vec.length).toBe(384);

    // Verify L2 norm is approximately 1.0
    let norm = 0;
    for (let i = 0; i < vec.length; i++) {
      norm += vec[i] * vec[i];
    }
    expect(Math.sqrt(norm)).toBeCloseTo(1.0, 4);
  });

  it('differentiates semantically related vs unrelated phrases', () => {
    const query = 'JWT token expiration validation';
    const related = 'JWT auth token expires in seconds';
    const unrelated = 'Database postgres table schema migration index';

    const vQuery = computeFeatureHashVector(query);
    const vRelated = computeFeatureHashVector(related);
    const vUnrelated = computeFeatureHashVector(unrelated);

    const simRelated = cosineSimilarity(vQuery, vRelated);
    const simUnrelated = cosineSimilarity(vQuery, vUnrelated);

    expect(simRelated).toBeGreaterThan(0.40);
    expect(simUnrelated).toBeLessThan(0.28);
    expect(simRelated).toBeGreaterThan(simUnrelated * 1.8);
  });

  it('executes in under 0.1ms per string', () => {
    const text = 'High performance cognitive agent memory engine with bi-temporal SQLite WAL.';
    const iterations = 1000;

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      computeFeatureHashVector(text);
    }
    const elapsed = performance.now() - start;
    const perCallMs = elapsed / iterations;

    expect(perCallMs).toBeLessThan(0.1); // Sub-0.1ms requirement
  });

  it('computeEmbedding seamlessly falls back to offline vector without null', async () => {
    const vec = await computeEmbedding('Test fallback vector generation');
    expect(vec).not.toBeNull();
    expect(vec.length).toBe(384);
  });
});

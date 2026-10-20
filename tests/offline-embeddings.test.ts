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

  it('stays within a generous per-call ceiling', () => {
    const text = 'High performance cognitive agent memory engine with bi-temporal SQLite WAL.';
    const iterations = 1000;

    // Warm the JIT before sampling.
    for (let i = 0; i < 100; i++) {
      computeFeatureHashVector(text);
    }

    // This is a loose regression ceiling, not a benchmark. The 240-case
    // benchmark gate owns performance evidence; shared CI timing is noisy.
    const samples: number[] = [];
    for (let sample = 0; sample < 5; sample++) {
      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        computeFeatureHashVector(text);
      }
      samples.push((performance.now() - start) / iterations);
    }

    samples.sort((a, b) => a - b);
    const medianMs = samples[Math.floor(samples.length / 2)];
    expect(Number.isFinite(medianMs)).toBe(true);
    expect(medianMs).toBeLessThan(5);
  });

  it('computeEmbedding seamlessly falls back to offline vector without null', async () => {
    const vec = await computeEmbedding('Test fallback vector generation');
    expect(vec).not.toBeNull();
    expect(vec.length).toBe(384);
  });
});

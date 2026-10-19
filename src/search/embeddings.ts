/**
 * Embeddings & Vector Utilities for FastrMemory.
 * Uses local Xenova/all-MiniLM-L6-v2 (384-dim) via @huggingface/transformers.
 * Gracefully falls back to null if dependencies are missing or offline.
 */

let featureExtractor: any = null;
let initAttempted = false;

export async function getExtractor(): Promise<any | null> {
  // Never hang unit tests downloading 90MB weights unless explicitly enabled
  if (process.env.NODE_ENV === 'test' && process.env.FASTR_ENABLE_TEST_EMBEDDINGS !== '1') {
    return null;
  }

  if (initAttempted) {
    return featureExtractor;
  }
  initAttempted = true;

  try {
    const { pipeline } = await import('@huggingface/transformers');
    featureExtractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
      dtype: 'fp32'
    });
  } catch (err) {
    // Graceful fallback to keyword-only when offline or model not cached
    featureExtractor = null;
  }

  return featureExtractor;
}

/**
 * Deterministic in-process feature hashing vectorizer (384-dim).
 * Uses character 3-grams and sub-word tokens with FNV-1a projection and L2 normalization.
 * Executes in <0.05ms with ZERO external dependencies or network downloads.
 */
export function computeFeatureHashVector(text: string, dimensions: number = 384): Float32Array {
  const vec = new Float32Array(dimensions);
  if (!text || text.trim().length === 0) {
    return vec;
  }

  const normalized = text.toLowerCase();
  const words = normalized.split(/[\s,._\-:;/\\'"()\[\]{}]+/).filter((w) => w.length > 0);

  const tokenCounts = new Map<string, number>();

  for (const w of words) {
    // 1. Full word token (higher weight)
    tokenCounts.set(`w:${w}`, (tokenCounts.get(`w:${w}`) || 0) + 2.5);

    // 2. Character 3-grams (captures sub-word morphology: e.g. "auth", "authenticat", "authoriz")
    if (w.length >= 3) {
      for (let i = 0; i <= w.length - 3; i++) {
        const tri = `t:${w.slice(i, i + 3)}`;
        tokenCounts.set(tri, (tokenCounts.get(tri) || 0) + 1.0);
      }
    }
  }

  // FNV-1a 32-bit hash
  function fnv1a(str: string): number {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
  }

  // Project into bounded vector with sub-linear damping and sign hashing
  for (const [token, count] of tokenCounts) {
    const h = fnv1a(token);
    const bucket = h % dimensions;
    const sign = (h & 0x80000000) === 0 ? 1 : -1;
    const weight = 1 + Math.log(count);
    vec[bucket] += sign * weight;
  }

  // L2 unit normalization
  let norm = 0;
  for (let i = 0; i < dimensions; i++) {
    norm += vec[i] * vec[i];
  }

  if (norm > 0) {
    const invNorm = 1 / Math.sqrt(norm);
    for (let i = 0; i < dimensions; i++) {
      vec[i] *= invNorm;
    }
  }

  return vec;
}

export async function computeEmbedding(text: string): Promise<Float32Array> {
  const extractor = await getExtractor();
  if (extractor) {
    try {
      const output = await extractor(text, { pooling: 'mean', normalize: true });
      return new Float32Array(output.data);
    } catch {
      // Fallback to deterministic offline vector if inference fails
    }
  }

  // Always guaranteed to return deterministic offline vector
  return computeFeatureHashVector(text, 384);
}

export function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  if (a.length !== b.length || a.length === 0) {
    return 0;
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function bufferToFloat32Array(buffer: Buffer): Float32Array {
  return new Float32Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Float32Array.BYTES_PER_ELEMENT);
}

export function float32ArrayToBuffer(array: Float32Array): Buffer {
  return Buffer.from(array.buffer, array.byteOffset, array.byteLength);
}

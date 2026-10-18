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

export async function computeEmbedding(text: string): Promise<Float32Array | null> {
  const extractor = await getExtractor();
  if (!extractor) {
    return null;
  }

  try {
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    return new Float32Array(output.data);
  } catch {
    return null;
  }
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

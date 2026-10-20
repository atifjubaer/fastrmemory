/**
 * Embeddings & Vector Utilities for FastrMemory.
 * Uses local Xenova/all-MiniLM-L6-v2 (384-dim) via @huggingface/transformers.
 * Gracefully falls back to null if dependencies are missing or offline.
 */

let featureExtractor: any = null;
let initAttempted = false;

/** Test seam: lets tests inject a mock model loader so nothing is ever downloaded. */
let modelLoader: (() => Promise<any>) | null = null;
export function __setModelLoaderForTests(loader: (() => Promise<any>) | null): void {
  modelLoader = loader;
  featureExtractor = null;
  initAttempted = false;
  modelLoadPromise = null;
}

let modelLoadPromise: Promise<any | null> | null = null;

/** True only when the transformer model is already resident in memory (never triggers a load). */
export function isModelLoaded(): boolean {
  return featureExtractor !== null;
}

/**
 * Opt-in, fire-and-forget model warmup. Only starts loading the transformer model when
 * FASTR_EMBEDDINGS_MODEL=1 is set; recall never awaits this promise.
 */
export function warmupEmbeddingModel(): void {
  if (process.env.FASTR_EMBEDDINGS_MODEL !== '1' || initAttempted || modelLoadPromise) return;
  modelLoadPromise = getExtractor().catch(() => null);
}

/**
 * Explicitly loads the local MiniLM model. Used by `fastr embed install` and the
 * offline benchmark runner; normal recall never calls this and never downloads.
 */
export async function ensureEmbeddingModel(): Promise<boolean> {
  process.env.FASTR_EMBEDDINGS_MODEL = '1';
  const extractor = await getExtractor();
  return extractor !== null;
}

export async function getExtractor(): Promise<any | null> {
  // Never hang unit tests downloading 90MB weights unless explicitly enabled
  if (!modelLoader && process.env.NODE_ENV === 'test' && process.env.FASTR_ENABLE_TEST_EMBEDDINGS !== '1') {
    return null;
  }

  if (initAttempted) {
    return featureExtractor;
  }
  initAttempted = true;

  try {
    if (modelLoader) {
      featureExtractor = await modelLoader();
    } else {
      const { pipeline } = await import('@huggingface/transformers');
      featureExtractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        dtype: 'fp32'
      });
    }
  } catch (err) {
    // Graceful fallback to keyword-only when offline or model not cached
    featureExtractor = null;
  }

  return featureExtractor;
}

/**
 * FNV-1a 32-bit hash used by the in-process feature hashing vectorizer.
 * Kept at module scope so the hot path does not allocate a closure per call.
 */
function fnv1a(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * Deterministic in-process feature hashing vectorizer (384-dim).
 * Uses character 3-grams and sub-word tokens with FNV-1a projection and L2 normalization.
 * Zero external dependencies or network downloads.
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

// ---------------------------------------------------------------------------
// Model-tagged embedding blobs
//
// Stored memory vectors carry a 4-byte header: 'F' 'V' <format version> <model id>,
// followed by raw little-endian float32 values. The header is exactly one float32
// wide so the payload stays 4-byte aligned and can be passed through the existing
// `repo.updateEmbedding(Float32Array)` API unchanged. Vectors are only ever compared
// against a query vector produced by the SAME model id; untagged (legacy) blobs are
// treated as unknown-model and ignored by recall (and re-embedded by backfill).
// ---------------------------------------------------------------------------

export const EMBEDDING_MODEL_IDS = {
  FEATURE_HASH_384: 1,
  MINILM_L6_V2: 2
} as const;
export type EmbeddingModelId = (typeof EMBEDDING_MODEL_IDS)[keyof typeof EMBEDDING_MODEL_IDS];

const HEADER_MAGIC_0 = 0x46; // 'F'
const HEADER_MAGIC_1 = 0x56; // 'V'
const HEADER_VERSION = 1;
export const EMBEDDING_HEADER_BYTES = 4;

export function embeddingHeader(modelId: number): Buffer {
  return Buffer.from([HEADER_MAGIC_0, HEADER_MAGIC_1, HEADER_VERSION, modelId & 0xff]);
}

/** Encodes a vector into a model-tagged Float32Array (header packed into element 0). */
export function encodeTaggedEmbedding(vec: Float32Array, modelId: number): Float32Array {
  const out = new Float32Array(vec.length + 1);
  out.set(vec, 1);
  const bytes = new Uint8Array(out.buffer);
  bytes.set(embeddingHeader(modelId), 0);
  return out;
}

/** Decodes a stored blob. Returns null for legacy/untagged or malformed blobs. */
export function decodeTaggedEmbedding(buf: Uint8Array | null | undefined): { modelId: number; vector: Float32Array } | null {
  if (!buf || buf.byteLength <= EMBEDDING_HEADER_BYTES || buf.byteLength % 4 !== 0) return null;
  if (buf[0] !== HEADER_MAGIC_0 || buf[1] !== HEADER_MAGIC_1 || buf[2] !== HEADER_VERSION) return null;
  const modelId = buf[3];
  // Copy into an aligned buffer (SQLite blobs may come back at arbitrary offsets)
  const payload = new Uint8Array(buf.byteLength - EMBEDDING_HEADER_BYTES);
  payload.set(buf.subarray(EMBEDDING_HEADER_BYTES));
  return { modelId, vector: new Float32Array(payload.buffer) };
}

export interface EmbeddingProvider {
  modelId: EmbeddingModelId;
  embed(text: string): Promise<Float32Array>;
}

const featureHashProvider: EmbeddingProvider = {
  modelId: EMBEDDING_MODEL_IDS.FEATURE_HASH_384,
  embed: async (text: string) => computeFeatureHashVector(text, 384)
};

/**
 * Returns an embedding provider WITHOUT ever triggering a model download:
 * the transformer model is used only if it is already loaded in this process;
 * otherwise the deterministic offline feature-hash vectorizer is used.
 */
export function getAvailableEmbeddingProvider(): EmbeddingProvider {
  const extractor = featureExtractor;
  if (extractor) {
    return {
      modelId: EMBEDDING_MODEL_IDS.MINILM_L6_V2,
      embed: async (text: string) => {
        const output = await extractor(text, { pooling: 'mean', normalize: true });
        return new Float32Array(output.data);
      }
    };
  }
  return featureHashProvider;
}

/** Returns a provider for a specific model id if usable right now (no downloads), else null. */
export function getProviderForModel(modelId: number): EmbeddingProvider | null {
  if (modelId === EMBEDDING_MODEL_IDS.FEATURE_HASH_384) return featureHashProvider;
  if (modelId === EMBEDDING_MODEL_IDS.MINILM_L6_V2 && featureExtractor) return getAvailableEmbeddingProvider();
  return null;
}

/** Minimum cosine similarity for a vector hit to count as a real match, per model. */
export const VECTOR_SIMILARITY_THRESHOLDS: Record<number, number> = {
  [EMBEDDING_MODEL_IDS.FEATURE_HASH_384]: 0.35,
  [EMBEDDING_MODEL_IDS.MINILM_L6_V2]: 0.35
};

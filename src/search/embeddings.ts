/**
 * Embeddings & Vector Utilities for FastrMemory.
 * Uses local Xenova/all-MiniLM-L6-v2 (384-dim) via @huggingface/transformers.
 * Gracefully falls back to null if dependencies are missing or offline.
 */

import type { StaticModel } from './static-model.js';
import { loadStaticModel } from './static-model.js';
import { staticModelStatus } from './static-model-install.js';

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
  MINILM_L6_V2: 2,
  STATIC_POTION_256: 3
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

// ---------------------------------------------------------------------------
// Vector mode resolution
//
// The feature-hash vectorizer is a lexical duplicate of BM25: it never adds
// independent signal, and on the shipped evaluation slice it costs 3.33 pp
// Hit@1. It must therefore never run unless the operator asks for it.
// The default is "semantic when a real model is already loaded, otherwise off".
// ---------------------------------------------------------------------------

export type VectorMode = 'off' | 'hash' | 'semantic';

/**
 * The optional pure-TypeScript static model (model2vec `potion-base-8M`). It is loaded
 * explicitly, never downloaded during recall, and is preferred over the feature-hash
 * vectorizer because it carries real semantic signal.
 */
let staticModel: StaticModel | null = null;

export function setStaticModel(model: StaticModel | null): void {
  staticModel = model;
}

/** Loads a model2vec directory; returns false (and stays hash-only) when it is absent. */
export function loadStaticModelFromDir(dir: string): boolean {
  try {
    staticModel = loadStaticModel(dir);
    return true;
  } catch {
    staticModel = null;
    return false;
  }
}

/** True when a real semantic embedding provider is resident right now. */
export function hasSemanticProvider(): boolean {
  return featureExtractor !== null || staticModel !== null;
}

let staticLoadAttempted = false;

/**
 * Loads the installed static model once. Returns true when it is resident.
 * Never downloads and never runs in tests: CI has no model and must stay hermetic.
 */
export function ensureInstalledStaticModel(homeDir?: string): boolean {
  if (staticModel) return true;
  if (staticLoadAttempted) return false;
  staticLoadAttempted = true;
  if (process.env.NODE_ENV === 'test') return false;
  if (process.env.FASTR_DISABLE_STATIC_MODEL === '1') return false;
  const mode = (process.env.FASTR_VECTOR_MODE ?? '').trim().toLowerCase();
  if (mode === 'off' || mode === 'hash') return false;

  const status = staticModelStatus(homeDir);
  if (!status.installed) return false;
  return loadStaticModelFromDir(status.dir);
}

/** Test seam: forget the one-shot load attempt. */
export function __resetStaticModelForTests(): void {
  staticModel = null;
  staticLoadAttempted = false;
}

/**
 * Resolves the active vector mode.
 *
 * Precedence:
 *   1. `override` passed by the caller (benchmark/ablation config).
 *   2. FASTR_VECTOR_MODE env var: 'hash' | 'semantic' | 'off'.
 *   3. Default: 'semantic' only when a semantic provider is already loaded.
 */
export function resolveVectorMode(override?: string, env: NodeJS.ProcessEnv = process.env): VectorMode {
  const raw = (override ?? env.FASTR_VECTOR_MODE ?? '').trim().toLowerCase();
  if (raw === 'hash' || raw === 'feature' || raw === 'feature-hash') return 'hash';
  if (raw === 'off' || raw === 'none' || raw === 'disabled') return 'off';
  if (raw === 'semantic' || raw === 'model' || raw === 'minilm' || raw === 'static') {
    return hasSemanticProvider() ? 'semantic' : 'off';
  }
  return hasSemanticProvider() ? 'semantic' : 'off';
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
  if (staticModel) {
    return {
      modelId: EMBEDDING_MODEL_IDS.STATIC_POTION_256,
      embed: async (text: string) => staticModel!.embed(text)
    };
  }
  return featureHashProvider;
}

/**
 * Returns a provider for a specific model id if usable right now (no downloads), else null.
 * `allowHash` is false on the production recall path: feature-hash vectors are an explicit
 * opt-in (FASTR_VECTOR_MODE=hash), never a silent fallback.
 */
export function getProviderForModel(modelId: number, allowHash = true): EmbeddingProvider | null {
  if (modelId === EMBEDDING_MODEL_IDS.FEATURE_HASH_384) return allowHash ? featureHashProvider : null;
  if (modelId === EMBEDDING_MODEL_IDS.MINILM_L6_V2 && featureExtractor) return getAvailableEmbeddingProvider();
  if (modelId === EMBEDDING_MODEL_IDS.STATIC_POTION_256 && staticModel) return getAvailableEmbeddingProvider();
  return null;
}

/** Minimum cosine similarity for a vector hit to count as a real match, per model. */
export const VECTOR_SIMILARITY_THRESHOLDS: Record<number, number> = {
  [EMBEDDING_MODEL_IDS.FEATURE_HASH_384]: 0.35,
  [EMBEDDING_MODEL_IDS.MINILM_L6_V2]: 0.35,
  // The static tier reranks only the BM25 candidate set, so every candidate is scored;
  // the threshold just drops degenerate (zero-norm) vectors.
  [EMBEDDING_MODEL_IDS.STATIC_POTION_256]: 0
};

// ---------------------------------------------------------------------------
// Query-vector LRU
//
// Agents repeat the same query inside a session (retry, re-render, tool loop), and
// embedding a query costs the same as embedding a document. A small process-wide LRU
// makes repeats free without letting memory grow with the number of distinct queries.
// ---------------------------------------------------------------------------

export const QUERY_VECTOR_CACHE_LIMIT = 256;
const queryVectorCache = new Map<string, Float32Array>();

/** Embeds a query through the cache. Recency is refreshed on every hit. */
export async function embedQueryCached(provider: EmbeddingProvider, query: string): Promise<Float32Array> {
  const key = `${provider.modelId}\u0000${query}`;
  const hit = queryVectorCache.get(key);
  if (hit) {
    queryVectorCache.delete(key);
    queryVectorCache.set(key, hit);
    return hit;
  }

  const vector = await provider.embed(query);
  queryVectorCache.set(key, vector);
  while (queryVectorCache.size > QUERY_VECTOR_CACHE_LIMIT) {
    const oldest = queryVectorCache.keys().next().value;
    if (oldest === undefined) break;
    queryVectorCache.delete(oldest);
  }
  return vector;
}

export function queryVectorCacheSize(): number {
  return queryVectorCache.size;
}

export function clearQueryVectorCache(): void {
  queryVectorCache.clear();
}

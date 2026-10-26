import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { createHash } from 'node:crypto';
import {
  createBertTokenizer,
  loadStaticModel,
  normalizeBertText,
  preTokenizeBert,
  readSafetensorsTensor,
  wordPieceTokenize
} from '../src/search/static-model.js';
import {
  clearQueryVectorCache,
  decodeTaggedEmbedding,
  EMBEDDING_MODEL_IDS,
  embedQueryCached,
  encodeTaggedEmbedding,
  getProviderForModel,
  QUERY_VECTOR_CACHE_LIMIT,
  queryVectorCacheSize,
  setStaticModel,
  __resetStaticModelForTests,
  type EmbeddingProvider
} from '../src/search/embeddings.js';
import { staticModelStatus, removeStaticModel } from '../src/search/static-model-install.js';
import { DatabaseSync } from 'node:sqlite';
import { applySchema } from '../src/db/schema.js';
import { FastrRepository } from '../src/db/repository.js';
import { searchMemories } from '../src/search/hybrid-rrf.js';

/**
 * The static semantic tier is optional and never shipped in the package. These tests
 * exercise the pure-TypeScript implementation against committed fixtures and synthetic
 * weights, so CI stays hermetic: no 30 MB download, no network.
 */

const GOLDEN = path.join(process.cwd(), 'bench', 'fixtures', 'potion-golden.json');

interface GoldenCase {
  text: string;
  tokens: string[];
  ids: number[];
}

function loadGolden(): { cases: GoldenCase[] } {
  return JSON.parse(fs.readFileSync(GOLDEN, 'utf-8')) as { cases: GoldenCase[] };
}

/** Builds a tiny safetensors file: header length, JSON header, float32 payload. */
function writeSafetensors(file: string, tensor: Float32Array, shape: number[]): void {
  const header = JSON.stringify({
    embeddings: { dtype: 'F32', shape, data_offsets: [0, tensor.byteLength] }
  });
  const headerBytes = Buffer.from(header, 'utf8');
  const prefix = Buffer.alloc(8);
  prefix.writeBigUInt64LE(BigInt(headerBytes.byteLength));
  fs.writeFileSync(file, Buffer.concat([prefix, headerBytes, Buffer.from(tensor.buffer)]));
}

describe('static model tokenizer', () => {
  it('reproduces the HuggingFace reference token ids for every golden case', () => {
    // The fixture carries the reference ids and a reduced vocabulary containing exactly
    // the pieces they use, so the tokenizer is checked without the 30 MB model.
    const golden = loadGolden();
    const subset = JSON.parse(fs.readFileSync(
      path.join(process.cwd(), 'bench', 'fixtures', 'potion-vocab-subset.json'),
      'utf-8'
    )) as {
      continuingPrefix: string;
      maxCharsPerWord: number;
      vocab: Record<string, number>;
    };
    const tokenize = createBertTokenizer({
      model: {
        type: 'WordPiece',
        vocab: subset.vocab,
        continuing_subword_prefix: subset.continuingPrefix,
        max_input_chars_per_word: subset.maxCharsPerWord
      }
    });

    expect(golden.cases.length).toBe(20);
    for (const item of golden.cases) {
      expect(tokenize(item.text), JSON.stringify(item.text)).toEqual(item.ids);
    }
  });

  it('normalizes whitespace, casing, accents and CJK the way BERT does', () => {
    expect(normalizeBertText('  A\tB\nC  ')).toBe('  a b c  ');
    expect(normalizeBertText('café')).toBe('cafe');
    expect(normalizeBertText('数据')).toBe(' 数  据 ');
  });

  it('isolates punctuation and drops control characters', () => {
    expect(preTokenizeBert(normalizeBertText('a,b (c)'))).toEqual(['a', ',', 'b', '(', 'c', ')']);
  });

  it('falls back to [UNK] for a word longer than max_input_chars_per_word', () => {
    const vocab = { vocab: new Map([['[UNK]', 1], ['a', 2]]), unkId: 1, continuingPrefix: '##', maxCharsPerWord: 5 };
    expect(wordPieceTokenize('abcdefgh', vocab)).toEqual([1]);
    expect(wordPieceTokenize('a', vocab)).toEqual([2]);
  });
});

describe('static model embeddings', () => {
  let dir: string;

  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-static-'));
  });

  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
    __resetStaticModelForTests();
  });

  function writeModel(): string {
    // 4 tokens x 3 dims: [PAD], [UNK], 'a', 'b'.
    const weights = new Float32Array([
      0, 0, 0,
      9, 9, 9,
      1, 0, 0,
      0, 1, 0
    ]);
    const tokenizer = {
      model: {
        type: 'WordPiece',
        vocab: { '[PAD]': 0, '[UNK]': 1, a: 2, b: 3 },
        continuing_subword_prefix: '##',
        max_input_chars_per_word: 100
      }
    };
    writeSafetensors(path.join(dir, 'model.safetensors'), weights, [4, 3]);
    fs.writeFileSync(path.join(dir, 'tokenizer.json'), JSON.stringify(tokenizer));
    return dir;
  }

  it('reads a safetensors tensor and mean-pools known tokens', () => {
    const model = loadStaticModel(writeModel());
    // "a b" -> rows (1,0,0) and (0,1,0), mean (0.5,0.5,0), normalized.
    const vec = model.embed('a b');
    const inv = 1 / Math.sqrt(0.5);
    expect(vec.length).toBe(3);
    expect(vec[0]).toBeCloseTo(0.5 * inv, 6);
    expect(vec[1]).toBeCloseTo(0.5 * inv, 6);
    expect(vec[2]).toBeCloseTo(0, 6);
  });

  it('drops [UNK] rows and returns a zero vector when nothing survives', () => {
    const model = loadStaticModel(writeModel());
    const mixed = model.embed('a zzz');
    expect(mixed[0]).toBeCloseTo(1, 6);
    expect(mixed[1]).toBeCloseTo(0, 6);

    const unknown = model.embed('zzz qqq');
    expect(Array.from(unknown)).toEqual([0, 0, 0]);
  });

  it('rejects a truncated safetensors header', () => {
    expect(() => readSafetensorsTensor(Buffer.from([1, 2, 3]))).toThrow(/truncated/);
  });

  it('round-trips the model tag through the embedding header', () => {
    const encoded = encodeTaggedEmbedding(new Float32Array([1, 2, 3]), EMBEDDING_MODEL_IDS.STATIC_POTION_256);
    const decoded = decodeTaggedEmbedding(new Uint8Array(encoded.buffer));
    expect(decoded?.modelId).toBe(3);
    expect(Array.from(decoded!.vector)).toEqual([1, 2, 3]);
  });
});

describe('query vector cache', () => {
  beforeEach(() => clearQueryVectorCache());

  it('returns the cached vector and calls the provider once', async () => {
    let calls = 0;
    const provider: EmbeddingProvider = {
      modelId: EMBEDDING_MODEL_IDS.STATIC_POTION_256,
      embed: async () => {
        calls++;
        return new Float32Array([calls, 0, 0]);
      }
    };

    const first = await embedQueryCached(provider, 'same query');
    const second = await embedQueryCached(provider, 'same query');
    expect(calls).toBe(1);
    expect(second).toBe(first);
  });

  it(`evicts the least recently used entry beyond ${QUERY_VECTOR_CACHE_LIMIT}`, async () => {
    let calls = 0;
    const provider: EmbeddingProvider = {
      modelId: EMBEDDING_MODEL_IDS.STATIC_POTION_256,
      embed: async (text: string) => {
        calls++;
        return new Float32Array([text.length, 0, 0]);
      }
    };

    for (let i = 0; i < QUERY_VECTOR_CACHE_LIMIT; i++) {
      await embedQueryCached(provider, `q${i}`);
    }
    expect(queryVectorCacheSize()).toBe(QUERY_VECTOR_CACHE_LIMIT);

    // Touch q0 so q1 becomes the least recently used entry.
    await embedQueryCached(provider, 'q0');
    await embedQueryCached(provider, 'overflow');
    expect(queryVectorCacheSize()).toBe(QUERY_VECTOR_CACHE_LIMIT);

    const before = calls;
    await embedQueryCached(provider, 'q0');
    expect(calls).toBe(before); // still cached
    await embedQueryCached(provider, 'q1');
    expect(calls).toBe(before + 1); // evicted
  });

  it('keys the cache by model id so providers never share vectors', async () => {
    let calls = 0;
    const make = (modelId: number): EmbeddingProvider => ({
      modelId: modelId as EmbeddingProvider['modelId'],
      embed: async () => {
        calls++;
        return new Float32Array([1, 0, 0]);
      }
    });

    await embedQueryCached(make(EMBEDDING_MODEL_IDS.MINILM_L6_V2), 'q');
    await embedQueryCached(make(EMBEDDING_MODEL_IDS.STATIC_POTION_256), 'q');
    expect(calls).toBe(2);
  });
});

describe('static tier ranking', () => {
  let db: DatabaseSync;
  let repo: FastrRepository;
  const projectId = 'proj_static_test';

  beforeEach(() => {
    db = new DatabaseSync(':memory:');
    applySchema(db);
    repo = new FastrRepository(db);
  });

  afterEach(() => {
    setStaticModel(null);
    db.close();
  });

  it('only reranks BM25 candidates and never introduces new ones', async () => {
    const ids: string[] = [];
    for (let i = 0; i < 5; i++) {
      const memory = repo.insertMemory({
        projectId,
        module: 'test',
        kind: 'decision',
        title: `alpha memory ${i}`,
        content: `alpha content ${i}`,
        sourceEventIds: []
      });
      ids.push(memory.id);
      repo.updateEmbedding(memory.id, encodeTaggedEmbedding(
        new Float32Array([i === 4 ? 1 : 0, i === 4 ? 0 : 1, 0]),
        EMBEDDING_MODEL_IDS.STATIC_POTION_256
      ));
    }

    const reranked = await searchMemories(db, {
      projectId,
      query: 'alpha',
      retrieval: { enableBm25: true, vectorMode: 'semantic', enableGraph: false, trapBoost: 1, verifiedBoost: 1 }
    });
    expect(reranked.memories.length).toBeGreaterThan(0);
    expect(reranked.memories.every((item) => ids.includes(item.memory.id))).toBe(true);
  });

  it('is inert without a loaded provider', async () => {
    const memory = repo.insertMemory({
      projectId,
      module: 'test',
      kind: 'decision',
      title: 'beta fact',
      content: 'beta content',
      sourceEventIds: []
    });
    repo.updateEmbedding(memory.id, encodeTaggedEmbedding(
      new Float32Array([1, 0, 0]),
      EMBEDDING_MODEL_IDS.STATIC_POTION_256
    ));

    const result = await searchMemories(db, {
      projectId,
      query: 'beta',
      retrieval: { enableBm25: true, vectorMode: 'semantic', enableGraph: false, trapBoost: 1, verifiedBoost: 1 }
    });
    expect(result.memories.map((item) => item.memory.id)).toEqual([memory.id]);
    expect(getProviderForModel(EMBEDDING_MODEL_IDS.STATIC_POTION_256, false)).toBeNull();
  });
});

describe('static model installer', () => {
  let home: string;

  beforeEach(() => {
    home = fs.mkdtempSync(path.join(os.tmpdir(), 'fastr-home-'));
  });

  afterEach(() => {
    fs.rmSync(home, { recursive: true, force: true });
  });

  it('reports a missing model without touching the network', () => {
    const status = staticModelStatus(home);
    expect(status.installed).toBe(false);
    expect(status.missing).toEqual(['model.safetensors', 'tokenizer.json']);
  });

  it('rejects a file whose size does not match the pin', () => {
    const dir = path.join(home, '.fastr', 'models', 'potion-base-8M');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'model.safetensors'), 'too small');
    const status = staticModelStatus(home);
    expect(status.installed).toBe(false);
    expect(status.missing).toContain('model.safetensors');
  });

  it('removes an installed directory idempotently', () => {
    const dir = path.join(home, '.fastr', 'models', 'potion-base-8M');
    fs.mkdirSync(dir, { recursive: true });
    expect(removeStaticModel(home)).toBe(true);
    expect(removeStaticModel(home)).toBe(false);
    expect(fs.existsSync(dir)).toBe(false);
  });
});

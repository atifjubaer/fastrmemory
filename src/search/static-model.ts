/**
 * Pure-TypeScript static embedding model (model2vec / potion).
 *
 * A model2vec model is a lookup table: one 256-dim vector per WordPiece token, plus the
 * tokenizer. Inference is mean pooling over the token rows followed by L2 normalization,
 * exactly as `model2vec.StaticModel.encode` does it: no special tokens, unknown tokens
 * dropped, no Zipf weighting at inference (that is a training-time re-regularization).
 *
 * This module reads `model.safetensors` and `tokenizer.json` directly, so the semantic tier
 * needs no native binary and no extra runtime dependency.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

export const POTION_BASE_8M = {
  name: 'minishlab/potion-base-8M',
  revision: 'bf8b056651a2c21b8d2565580b8569da283cab23',
  modelFile: 'model.safetensors',
  modelBytes: 30_236_760,
  modelSha256: 'f65d0f325faadc1e121c319e2faa41170d3fa07d8c89abd48ca5358d9a223de2',
  tokenizerFile: 'tokenizer.json',
  tokenizerBytes: 683_666,
  tokenizerSha256: 'e67e803f624fb4d67dea1c730d06e1067e1b14d830e2c2202569e3ef0f70bb50',
  dim: 256,
  vocabSize: 29_528
} as const;

export interface StaticModel {
  readonly name: string;
  readonly dim: number;
  readonly vocabSize: number;
  /** WordPiece token ids for a string, with special tokens omitted. */
  tokenize(text: string): number[];
  /** Mean-pooled, L2-normalized embedding. */
  embed(text: string): Float32Array;
}

interface WordPieceVocab {
  vocab: Map<string, number>;
  unkId: number;
  continuingPrefix: string;
  maxCharsPerWord: number;
}

/** Parses the `model` section of a HuggingFace `tokenizer.json`. */
export function parseWordPieceVocab(tokenizerJson: unknown): WordPieceVocab {
  const model = (tokenizerJson as { model?: Record<string, unknown> })?.model;
  if (!model || model.type !== 'WordPiece') {
    throw new Error('tokenizer.json does not contain a WordPiece model');
  }
  const raw = model.vocab as Record<string, number> | undefined;
  if (!raw) throw new Error('tokenizer.json is missing the WordPiece vocabulary');

  const vocab = new Map<string, number>();
  for (const [token, id] of Object.entries(raw)) {
    if (typeof id === 'number') vocab.set(token, id);
  }

  const unkId = vocab.get('[UNK]');
  if (unkId === undefined) throw new Error('WordPiece vocabulary is missing [UNK]');

  return {
    vocab,
    unkId,
    continuingPrefix: typeof model.continuing_subword_prefix === 'string'
      ? model.continuing_subword_prefix
      : '##',
    maxCharsPerWord: typeof model.max_input_chars_per_word === 'number'
      ? model.max_input_chars_per_word
      : 100
  };
}

/** True for the Unicode code points BERT's `handle_chinese_chars` surrounds with spaces. */
function isChineseChar(code: number): boolean {
  return (
    (code >= 0x4e00 && code <= 0x9fff) ||
    (code >= 0x3400 && code <= 0x4dbf) ||
    (code >= 0x20000 && code <= 0x2a6df) ||
    (code >= 0x2a700 && code <= 0x2b73f) ||
    (code >= 0x2b740 && code <= 0x2b81f) ||
    (code >= 0x2b920 && code <= 0x2ceaf) ||
    (code >= 0xf900 && code <= 0xfaff) ||
    (code >= 0x2f800 && code <= 0x2fa1f)
  );
}

/** BERT punctuation: ASCII ranges plus every Unicode `P*` code point. */
function isPunctuation(char: string): boolean {
  const code = char.codePointAt(0) ?? 0;
  if (
    (code >= 33 && code <= 47) ||
    (code >= 58 && code <= 64) ||
    (code >= 91 && code <= 96) ||
    (code >= 123 && code <= 126)
  ) {
    return true;
  }
  return /\p{P}/u.test(char);
}

function isControlOrReplacement(char: string): boolean {
  const code = char.codePointAt(0) ?? 0;
  if (code === 0 || code === 0xfffd) return true;
  return /\p{Cc}|\p{Cf}/u.test(char);
}

/**
 * `BertNormalizer` with the flags this model ships: clean_text, handle_chinese_chars,
 * lowercase, and strip_accents (which BERT defaults to the lowercase flag when unset).
 */
export function normalizeBertText(text: string): string {
  let out = '';
  for (const char of text) {
    // Whitespace becomes a single space before the control-character filter: the
    // reference tokenizer treats tabs/newlines as word delimiters, not as noise.
    if (/\s/u.test(char)) {
      out += ' ';
      continue;
    }
    if (isControlOrReplacement(char)) continue;
    if (isChineseChar(char.codePointAt(0) ?? 0)) {
      out += ` ${char} `;
      continue;
    }
    out += char;
  }
  return out.toLowerCase().normalize('NFD').replace(/\p{Mn}/gu, '');
}

/** `BertPreTokenizer`: whitespace-delimited words with punctuation isolated. */
export function preTokenizeBert(normalized: string): string[] {
  const pieces: string[] = [];
  let current = '';
  const flush = () => {
    if (current) pieces.push(current);
    current = '';
  };
  for (const char of normalized) {
    if (char === ' ') {
      flush();
      continue;
    }
    if (isPunctuation(char)) {
      flush();
      pieces.push(char);
      continue;
    }
    current += char;
  }
  flush();
  return pieces;
}

/** Greedy longest-match-first WordPiece, with whole-word `[UNK]` on failure. */
export function wordPieceTokenize(word: string, vocab: WordPieceVocab): number[] {
  if (word.length === 0) return [];
  if (word.length > vocab.maxCharsPerWord) return [vocab.unkId];

  const ids: number[] = [];
  let start = 0;
  while (start < word.length) {
    let end = word.length;
    let match = -1;
    while (start < end) {
      const piece = start > 0
        ? `${vocab.continuingPrefix}${word.slice(start, end)}`
        : word.slice(start, end);
      const id = vocab.vocab.get(piece);
      if (id !== undefined) {
        match = id;
        break;
      }
      end--;
    }
    if (match < 0) return [vocab.unkId];
    ids.push(match);
    start = end;
  }
  return ids;
}

export function createBertTokenizer(tokenizerJson: unknown): (text: string) => number[] {
  const vocab = parseWordPieceVocab(tokenizerJson);
  return (text: string): number[] => {
    const ids: number[] = [];
    for (const piece of preTokenizeBert(normalizeBertText(text))) {
      for (const id of wordPieceTokenize(piece, vocab)) ids.push(id);
    }
    return ids;
  };
}

export interface SafetensorsTensor {
  data: Float32Array;
  shape: number[];
}

/** Reads a single 2-D float32 tensor from a safetensors file buffer. */
export function readSafetensorsTensor(buffer: Buffer, name?: string): SafetensorsTensor {
  if (buffer.byteLength < 9) throw new Error('safetensors file is truncated');
  const headerLength = Number(buffer.readBigUInt64LE(0));
  const headerEnd = 8 + headerLength;
  if (headerEnd > buffer.byteLength) throw new Error('safetensors header exceeds file size');

  const header = JSON.parse(buffer.subarray(8, headerEnd).toString('utf8')) as Record<
    string,
    { dtype?: string; shape?: number[]; data_offsets?: [number, number] }
  >;

  const key = name ?? Object.keys(header).find((candidate) => candidate !== '__metadata__');
  if (!key) throw new Error('safetensors file has no tensors');
  const info = header[key];
  if (!info || info.dtype !== 'F32' || !info.shape || !info.data_offsets) {
    throw new Error(`safetensors tensor ${key} is not a float32 tensor`);
  }

  const [start, end] = info.data_offsets;
  if (headerEnd + end > buffer.byteLength) throw new Error('safetensors tensor exceeds file size');

  const length = (end - start) / Float32Array.BYTES_PER_ELEMENT;
  const data = new Float32Array(length);
  new Uint8Array(data.buffer).set(buffer.subarray(headerEnd + start, headerEnd + end));
  return { data, shape: info.shape };
}

/**
 * Loads a model2vec directory (`model.safetensors` + `tokenizer.json`).
 * Throws when either file is missing or malformed; callers decide whether that is fatal.
 */
export function loadStaticModel(modelDir: string): StaticModel {
  const modelPath = path.join(modelDir, POTION_BASE_8M.modelFile);
  const tokenizerPath = path.join(modelDir, POTION_BASE_8M.tokenizerFile);

  const tokenizerJson = JSON.parse(fs.readFileSync(tokenizerPath, 'utf8'));
  const tokenize = createBertTokenizer(tokenizerJson);
  const vocab = parseWordPieceVocab(tokenizerJson);

  const tensor = readSafetensorsTensor(fs.readFileSync(modelPath));
  if (tensor.shape.length !== 2) {
    throw new Error(`expected a 2-D embedding matrix, got shape [${tensor.shape.join(', ')}]`);
  }
  const [vocabSize, dim] = tensor.shape;
  const matrix = tensor.data;

  return {
    name: POTION_BASE_8M.name,
    dim,
    vocabSize,
    tokenize,
    embed(text: string): Float32Array {
      const ids = tokenize(text);
      const out = new Float32Array(dim);
      let count = 0;
      for (const id of ids) {
        if (id === vocab.unkId) continue;
        if (id < 0 || id >= vocabSize) continue;
        const offset = id * dim;
        for (let i = 0; i < dim; i++) out[i] += matrix[offset + i];
        count++;
      }
      if (count === 0) return out;

      let norm = 0;
      for (let i = 0; i < dim; i++) {
        out[i] /= count;
        norm += out[i] * out[i];
      }
      if (norm > 0) {
        const inv = 1 / Math.sqrt(norm);
        for (let i = 0; i < dim; i++) out[i] *= inv;
      }
      return out;
    }
  };
}

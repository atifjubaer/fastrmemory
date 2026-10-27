import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';
import { encodeTaggedEmbedding, embeddingHeader, EMBEDDING_MODEL_IDS, getAvailableEmbeddingProvider } from './embeddings.js';

export interface BackfillOptions {
  /** Max memories embedded per call (keeps each batch small and bounded). */
  limit?: number;
}

/**
 * Embeds memories that have no vector yet (or whose stored vector was produced by a
 * different / unknown model) using the embedding provider that is available RIGHT NOW.
 * It never triggers a model download: without a loaded transformer model the offline
 * feature-hash vectorizer is used. Vectors are stored model-tagged via repo.updateEmbedding.
 * Returns the number of memories embedded.
 */
export async function backfillEmbeddings(
  db: DatabaseSync,
  repo: FastrRepository,
  projectId: string,
  opts: BackfillOptions = {}
): Promise<number> {
  const limit = Math.max(0, Math.floor(opts.limit ?? 25));
  if (limit === 0) return 0;

  const provider = getAvailableEmbeddingProvider();
  const header = embeddingHeader(provider.modelId);

  const rows = db.prepare(`
    SELECT id, title, content, module FROM memories
    WHERE project_id IN (?, 'global')
      AND (embedded = 0 OR embedding IS NULL OR substr(embedding, 1, 4) != ?)
    ORDER BY embedded ASC, created_at DESC
    LIMIT ?
  `).all(projectId, header, limit) as unknown as Array<{ id: string; title: string; content: string; module: string }>;

  let count = 0;
  for (const row of rows) {
    // Titles are the curated semantic summary of a memory. Include the module
    // as explicit scope text: titles often omit or abbreviate it, while queries
    // frequently name the module. Keep the full body out so long templates do
    // not dilute the concept signal that BM25 already covers.
    // The static tier is the exception: its cosine only reranks BM25 candidates, so it
    // needs the body text to distinguish candidates that share a title stem.
    const text = provider.modelId === EMBEDDING_MODEL_IDS.STATIC_POTION_256
      ? `${row.title}\n${row.content}`
      : `${row.title}. module: ${row.module}`;
    const vec = await provider.embed(text);
    // The embedding write takes SQLite's single write lock. If another agent holds it,
    // skip this row rather than stalling the recall that scheduled the backfill; the
    // memory is picked up on a later pass.
    try {
      repo.updateEmbedding(row.id, encodeTaggedEmbedding(vec, provider.modelId));
      count++;
    } catch (err) {
      if (isBusyError(err)) break;
      throw err;
    }
  }
  return count;
}

/** True when the error is SQLite's lock contention rather than a real failure. */
function isBusyError(err: any): boolean {
  const code = typeof err?.errcode === 'number' ? err.errcode & 0xff : -1;
  if (code === 5 || code === 6) return true;
  const message = String(err?.message ?? '');
  return message.includes('SQLITE_BUSY')
    || message.includes('database is locked')
    || message.includes('database table is locked');
}

const inFlight = new WeakMap<DatabaseSync, boolean>();

/**
 * Opportunistic, non-blocking backfill scheduled after a recall. Runs on a later tick,
 * at most one batch per database at a time, and swallows every error (e.g. the DB was
 * closed in the meantime) so recall latency and correctness are never affected.
 */
export function scheduleBackfill(db: DatabaseSync, projectId: string, limit: number = 25): void {
  if (process.env.FASTR_DISABLE_BACKFILL === '1' || inFlight.get(db)) return;
  inFlight.set(db, true);
  setImmediate(() => {
    backfillEmbeddings(db, new FastrRepository(db), projectId, { limit })
      .catch(() => {})
      .finally(() => inFlight.delete(db));
  });
}

import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';
import { encodeTaggedEmbedding, embeddingHeader, getAvailableEmbeddingProvider } from './embeddings.js';

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
    SELECT id, title, content FROM memories
    WHERE project_id IN (?, 'global')
      AND (embedded = 0 OR embedding IS NULL OR substr(embedding, 1, 4) != ?)
    ORDER BY embedded ASC, created_at DESC
    LIMIT ?
  `).all(projectId, header, limit) as unknown as Array<{ id: string; title: string; content: string }>;

  let count = 0;
  for (const row of rows) {
    const vec = await provider.embed(`${row.title}\n${row.content}`);
    repo.updateEmbedding(row.id, encodeTaggedEmbedding(vec, provider.modelId));
    count++;
  }
  return count;
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

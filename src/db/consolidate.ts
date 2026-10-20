import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from './repository.js';
import { Memory } from './schema.js';

export interface ConsolidateOptions {
  projectId: string;
  module?: string;
  title?: string;
  dryRun?: boolean;
}

export interface ConsolidateResult {
  dryRun: boolean;
  summaryId: string | null;
  summaryTitle: string;
  summaryContent: string;
  sourceMemoryIds: string[];
  sourceEventIds: string[];
  activeMemoryCountBefore: number;
  activeMemoryCountAfter: number;
  rawEventCountBefore: number;
  rawEventCountAfter: number;
}

function parseEventIds(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : [];
  } catch {
    return [];
  }
}

function activeCount(db: DatabaseSync, projectId: string, module?: string): number {
  const row = module
    ? db.prepare(`
        SELECT COUNT(*) AS count FROM memories
        WHERE project_id = ? AND module = ? AND valid_to IS NULL AND status != 'dormant'
      `).get(projectId, module) as any
    : db.prepare(`
        SELECT COUNT(*) AS count FROM memories
        WHERE project_id = ? AND valid_to IS NULL AND status != 'dormant'
      `).get(projectId) as any;
  return Number(row?.count ?? 0);
}

function rawEventCount(db: DatabaseSync, projectId: string): number {
  const row = db.prepare('SELECT COUNT(*) AS count FROM raw_events WHERE project_id = ?').get(projectId) as any;
  return Number(row?.count ?? 0);
}

/**
 * Non-lossy consolidation. Writes one summary memory that links back to every
 * source memory and raw event, but never deletes, merges, or mutates the
 * originals. The summary itself is a normal memory in the bi-temporal store.
 */
export function consolidateMemories(
  db: DatabaseSync,
  repo: FastrRepository,
  opts: ConsolidateOptions
): ConsolidateResult {
  const module = opts.module?.trim().toLowerCase();
  // Project-wide counts make the non-loss guarantee visible even when the
  // summary itself is scoped to one module.
  const beforeMemories = activeCount(db, opts.projectId);
  const beforeEvents = rawEventCount(db, opts.projectId);

  const rows = (module
    ? db.prepare(`
        SELECT * FROM memories
        WHERE project_id = ? AND module = ? AND valid_to IS NULL AND status != 'dormant'
        ORDER BY created_at ASC, id ASC
      `).all(opts.projectId, module)
    : db.prepare(`
        SELECT * FROM memories
        WHERE project_id = ? AND valid_to IS NULL AND status != 'dormant'
        ORDER BY created_at ASC, id ASC
      `).all(opts.projectId)) as unknown as Memory[];

  const summaryTitle = opts.title?.trim() || `Consolidated memory: ${module ?? 'all modules'}`;
  const sourceMemoryIds = rows.map((row) => row.id);
  const sourceEventIds = [...new Set(rows.flatMap((row) => parseEventIds(row.source_event_ids)))];

  const body = rows.length === 0
    ? 'No active memories matched this consolidation scope.'
    : [
        `Consolidated ${rows.length} active memory item${rows.length === 1 ? '' : 's'}.`,
        'Every original memory and raw event remains stored and queryable.',
        '',
        ...rows.map((row) => {
          const excerpt = row.content.replace(/\s+/g, ' ').trim().slice(0, 240);
          return `- [${row.id}] ${row.title} (${row.kind}, ${row.module})${excerpt ? `: ${excerpt}` : ''}`;
        })
      ].join('\n');

  if (opts.dryRun) {
    return {
      dryRun: true,
      summaryId: null,
      summaryTitle,
      summaryContent: body,
      sourceMemoryIds,
      sourceEventIds,
      activeMemoryCountBefore: beforeMemories,
      activeMemoryCountAfter: beforeMemories,
      rawEventCountBefore: beforeEvents,
      rawEventCountAfter: beforeEvents
    };
  }

  const summary = repo.insertMemory({
    projectId: opts.projectId,
    module: module ?? 'general',
    kind: 'workflow',
    title: summaryTitle,
    content: body,
    sourceEventIds,
    verified: true
  });

  // insertMemory caps source_event_ids at 32 for write safety. Consolidation is
  // the one place where the full provenance union is the point, so store it all.
  if (sourceEventIds.length > 32) {
    db.prepare('UPDATE memories SET source_event_ids = ? WHERE id = ?')
      .run(JSON.stringify(sourceEventIds), summary.id);
  }

  return {
    dryRun: false,
    summaryId: summary.id,
    summaryTitle,
    summaryContent: body,
    sourceMemoryIds,
    sourceEventIds,
    activeMemoryCountBefore: beforeMemories,
    activeMemoryCountAfter: activeCount(db, opts.projectId),
    rawEventCountBefore: beforeEvents,
    rawEventCountAfter: rawEventCount(db, opts.projectId)
  };
}

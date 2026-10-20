import { DatabaseSync } from 'node:sqlite';

export type HygieneCategory = 'orphan' | 'duplicate' | 'stale';

export interface HygieneIssue {
  category: HygieneCategory;
  count: number;
  description: string;
}

export interface HygieneCounts {
  activeMemories: number;
  pinnedMemories: number;
  neverRecalled: number;
  orphanFileLinks: number;
  orphanConflicts: number;
  orphanFeedback: number;
  duplicateTitleGroups: number;
  duplicateTitleRows: number;
  duplicateContentGroups: number;
  duplicateContentRows: number;
  staleMemories: number;
}

export interface HygieneReport {
  healthy: boolean;
  projectId: string;
  timestamp: string;
  thresholds: {
    staleAfterDays: number;
  };
  counts: HygieneCounts;
  issues: HygieneIssue[];
}

export interface HygieneOptions {
  staleAfterDays?: number;
  now?: Date;
}

const DEFAULT_STALE_AFTER_DAYS = 90;
const ACTIVE_STATUSES = "('staging', 'verified')";

function count(db: DatabaseSync, sql: string, ...params: Array<string | number>): number {
  const row = db.prepare(sql).get(...params) as { c?: number } | undefined;
  return Number(row?.c || 0);
}

function tableExists(db: DatabaseSync, name: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(name)
  );
}

function sumExtraRows(groups: Array<{ count?: number }>): number {
  return groups.reduce((total, group) => total + Math.max(0, Number(group.count || 0) - 1), 0);
}

function plural(count: number, singular: string, pluralForm = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}

/**
 * Inspects one project for memory hygiene problems without mutating the database.
 *
 * - Orphans: local links or audit rows that point at missing memories.
 * - Duplicates: active rows sharing a module/kind/normalized title or exact content.
 * - Stale: unpinned active rows whose last recall (or creation time) is older than the threshold.
 */
export function inspectMemoryHygiene(
  db: DatabaseSync,
  projectId: string,
  options: HygieneOptions = {}
): HygieneReport {
  const staleAfterDays = Math.max(1, Math.floor(options.staleAfterDays ?? DEFAULT_STALE_AFTER_DAYS));
  const now = options.now ?? new Date();
  const cutoff = new Date(now.getTime() - staleAfterDays * 86_400_000).toISOString();

  const activeMemories = count(
    db,
    `SELECT COUNT(*) AS c FROM memories
     WHERE project_id = ? AND valid_to IS NULL AND status IN ${ACTIVE_STATUSES}`,
    projectId
  );
  const pinnedMemories = count(
    db,
    `SELECT COUNT(*) AS c FROM memories
     WHERE project_id = ? AND valid_to IS NULL AND status IN ${ACTIVE_STATUSES} AND pinned = 1`,
    projectId
  );
  const neverRecalled = count(
    db,
    `SELECT COUNT(*) AS c FROM memories
     WHERE project_id = ? AND valid_to IS NULL AND status IN ${ACTIVE_STATUSES}
       AND (last_recalled_at IS NULL OR last_recalled_at = '')`,
    projectId
  );

  const orphanFileLinks = tableExists(db, 'file_links')
    ? count(
        db,
        `SELECT COUNT(*) AS c FROM file_links
         WHERE memory_id NOT IN (SELECT id FROM memories)`,
      )
    : 0;
  const orphanConflicts = tableExists(db, 'memory_conflicts')
    ? count(
        db,
        `SELECT COUNT(*) AS c FROM memory_conflicts
         WHERE memory_a_id NOT IN (SELECT id FROM memories)
            OR memory_b_id NOT IN (SELECT id FROM memories)`,
      )
    : 0;
  const orphanFeedback = tableExists(db, 'memory_feedback')
    ? count(
        db,
        `SELECT COUNT(*) AS c FROM memory_feedback
         WHERE memory_id NOT IN (SELECT id FROM memories)`,
      )
    : 0;

  const duplicateTitleGroups = db.prepare(`
    SELECT module, kind, lower(trim(title)) AS normalized_title, COUNT(*) AS count
    FROM memories
    WHERE project_id = ? AND valid_to IS NULL AND status IN ${ACTIVE_STATUSES}
    GROUP BY module, kind, lower(trim(title))
    HAVING COUNT(*) > 1
  `).all(projectId) as Array<{ count: number }>;
  const duplicateContentGroups = db.prepare(`
    SELECT module, kind, content, COUNT(*) AS count
    FROM memories
    WHERE project_id = ? AND valid_to IS NULL AND status IN ${ACTIVE_STATUSES}
    GROUP BY module, kind, content
    HAVING COUNT(*) > 1
  `).all(projectId) as Array<{ count: number }>;

  const staleMemories = count(
    db,
    `SELECT COUNT(*) AS c FROM memories
     WHERE project_id = ? AND valid_to IS NULL AND status IN ${ACTIVE_STATUSES}
       AND pinned = 0
       AND COALESCE(NULLIF(last_recalled_at, ''), created_at) < ?`,
    projectId,
    cutoff
  );

  const duplicateTitleRows = sumExtraRows(duplicateTitleGroups);
  const duplicateContentRows = sumExtraRows(duplicateContentGroups);
  const orphanCount = orphanFileLinks + orphanConflicts + orphanFeedback;

  const issues: HygieneIssue[] = [];
  if (orphanCount > 0) {
    issues.push({
      category: 'orphan',
      count: orphanCount,
      description:
        `Found ${orphanCount} orphaned records ` +
        `(file_links=${orphanFileLinks}, conflicts=${orphanConflicts}, feedback=${orphanFeedback}).`
    });
  }
  if (duplicateTitleRows > 0) {
    issues.push({
      category: 'duplicate',
      count: duplicateTitleRows,
      description:
        `Found ${plural(duplicateTitleGroups.length, 'active title group')} with ` +
        `${plural(duplicateTitleRows, 'extra row')}.`
    });
  }
  if (duplicateContentRows > 0) {
    issues.push({
      category: 'duplicate',
      count: duplicateContentRows,
      description:
        `Found ${plural(duplicateContentGroups.length, 'active exact-content group')} with ` +
        `${plural(duplicateContentRows, 'extra row')}.`
    });
  }
  if (staleMemories > 0) {
    issues.push({
      category: 'stale',
      count: staleMemories,
      description:
        `Found ${plural(staleMemories, 'unpinned active memory', 'unpinned active memories')} ` +
        `older than ${staleAfterDays} days without a recent recall.`
    });
  }

  return {
    healthy: issues.length === 0,
    projectId,
    timestamp: now.toISOString(),
    thresholds: { staleAfterDays },
    counts: {
      activeMemories,
      pinnedMemories,
      neverRecalled,
      orphanFileLinks,
      orphanConflicts,
      orphanFeedback,
      duplicateTitleGroups: duplicateTitleGroups.length,
      duplicateTitleRows,
      duplicateContentGroups: duplicateContentGroups.length,
      duplicateContentRows,
      staleMemories
    },
    issues
  };
}

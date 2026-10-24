import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from './repository.js';

export interface DiagnosticIssue {
  category: 'integrity' | 'fts5' | 'file_links' | 'actions' | 'storage';
  severity: 'error' | 'warning' | 'info';
  description: string;
  fixable: boolean;
  affectedCount: number;
}

export interface DiagnosticReport {
  healthy: boolean;
  timestamp: string;
  totalIssues: number;
  fixableIssues: number;
  issues: DiagnosticIssue[];
  metrics: {
    memoryCount: number;
    ftsRowCount: number;
    fileLinkCount: number;
    actionCount: number;
    walMode: string;
    pendingConflicts: number;
    pendingFts: number;
  };
}

export interface HealResult {
  dryRun: boolean;
  fixedCount: number;
  actionsTaken: string[];
  remainingIssues: number;
  conflictsDrained?: number;
  conflictsCreated?: number;
  entitiesDrained?: number;
  ftsDrained?: number;
  reportBefore: DiagnosticReport;
  reportAfter?: DiagnosticReport;
}

export function diagnoseDatabase(db: DatabaseSync, projectId: string): DiagnosticReport {
  const issues: DiagnosticIssue[] = [];

  // 1. SQLite B-Tree Integrity
  let integrityOk = false;
  try {
    const integrityRow = db.prepare('PRAGMA integrity_check').get() as { integrity_check?: string } | undefined;
    const checkVal = integrityRow?.integrity_check || Object.values(integrityRow || {})[0];
    if (checkVal === 'ok') {
      integrityOk = true;
    } else {
      issues.push({
        category: 'integrity',
        severity: 'error',
        description: `SQLite integrity check failed: ${checkVal}`,
        fixable: false,
        affectedCount: 1
      });
    }
  } catch (err: any) {
    issues.push({
      category: 'integrity',
      severity: 'error',
      description: `Integrity check error: ${err.message}`,
      fixable: false,
      affectedCount: 1
    });
  }

  // 2. FTS5 Index Consistency (the triggers index every memories row, so compare whole tables)
  let memoryCount = 0;
  let ftsRowCount = 0;
  try {
    const memRow = db.prepare('SELECT COUNT(*) as c FROM memories WHERE project_id = ?').get(projectId) as any;
    memoryCount = Number(memRow?.c || 0);

    const totalRow = db.prepare('SELECT COUNT(*) as c FROM main.memories').get() as any;
    const totalMemories = Number(totalRow?.c || 0);

    const ftsRow = db.prepare('SELECT COUNT(*) as c FROM main.memories_fts').get() as any;
    ftsRowCount = Number(ftsRow?.c || 0);

    const missingRow = db.prepare(`
      SELECT COUNT(*) as c FROM main.memories m
      WHERE NOT EXISTS (SELECT 1 FROM main.memories_fts f WHERE f.id = m.id)
        AND NOT EXISTS (SELECT 1 FROM main.memory_fts_queue q WHERE q.memory_id = m.id)
    `).get() as any;
    const missing = Number(missingRow?.c || 0);
    const staleRow = db.prepare(`
      SELECT COUNT(*) as c FROM main.memories_fts f
      WHERE NOT EXISTS (SELECT 1 FROM main.memories m WHERE m.id = f.id)
    `).get() as any;
    const stale = Number(staleRow?.c || 0);
    const duplicates = Math.max(0, ftsRowCount - stale - (totalMemories - missing));

    if (totalMemories > 0 && ftsRowCount === 0) {
      issues.push({
        category: 'fts5',
        severity: 'error',
        description: `FTS5 fulltext search index is empty (${ftsRowCount} rows) but memories table has ${totalMemories} records.`,
        fixable: true,
        affectedCount: totalMemories
      });
    } else if (missing > 0 || stale > 0 || duplicates > 0) {
      issues.push({
        category: 'fts5',
        severity: 'warning',
        description: `FTS5 index out of sync with memories table (${ftsRowCount} index rows vs ${totalMemories} memories: ${missing} missing, ${stale} stale, ${duplicates} duplicate).`,
        fixable: true,
        affectedCount: missing + stale + duplicates
      });
    }
  } catch (err: any) {
    issues.push({
      category: 'fts5',
      severity: 'error',
      description: `FTS5 check error: ${err.message}`,
      fixable: true,
      affectedCount: 1
    });
  }

  // 3. Orphaned File Links
  let fileLinkCount = 0;
  try {
    const flRow = db.prepare('SELECT COUNT(*) as c FROM file_links').get() as any;
    fileLinkCount = Number(flRow?.c || 0);

    const orphanRow = db.prepare(`
      SELECT COUNT(*) as c
      FROM file_links
      WHERE memory_id NOT IN (SELECT id FROM memories)
    `).get() as any;
    const orphanCount = Number(orphanRow?.c || 0);

    if (orphanCount > 0) {
      issues.push({
        category: 'file_links',
        severity: 'warning',
        description: `Found ${orphanCount} orphaned file_links referencing nonexistent memories.`,
        fixable: true,
        affectedCount: orphanCount
      });
    }
  } catch (err: any) {
    issues.push({
      category: 'file_links',
      severity: 'warning',
      description: `File links check error: ${err.message}`,
      fixable: false,
      affectedCount: 0
    });
  }

  // 4. Action DAG Consistency
  let actionCount = 0;
  try {
    const actRow = db.prepare('SELECT COUNT(*) as c FROM actions WHERE project_id = ?').get(projectId) as any;
    actionCount = Number(actRow?.c || 0);

    const orphanEdges = db.prepare(`
      SELECT COUNT(*) as c
      FROM action_edges
      WHERE source_action_id NOT IN (SELECT id FROM actions)
         OR target_action_id NOT IN (SELECT id FROM actions)
    `).get() as any;
    const orphanEdgeCount = Number(orphanEdges?.c || 0);

    if (orphanEdgeCount > 0) {
      issues.push({
        category: 'actions',
        severity: 'warning',
        description: `Found ${orphanEdgeCount} action edges referencing nonexistent actions.`,
        fixable: true,
        affectedCount: orphanEdgeCount
      });
    }
  } catch (err: any) {
    // actions or action_edges table might be empty or optional
  }

  // 5. Storage & WAL Health
  let walMode = 'unknown';
  try {
    const walRow = db.prepare('PRAGMA journal_mode').get() as any;
    walMode = String(Object.values(walRow || {})[0] || 'unknown');
    if (walMode.toLowerCase() !== 'wal') {
      issues.push({
        category: 'storage',
        severity: 'warning',
        description: `Database journal mode is "${walMode}" instead of recommended "wal".`,
        fixable: true,
        affectedCount: 1
      });
    }
  } catch {}

  const fixableIssues = issues.filter(i => i.fixable).length;

  let pendingConflicts = 0;
  let pendingFts = 0;
  try {
    const queueRow = db.prepare('SELECT COUNT(*) AS c FROM memory_conflict_queue').get() as any;
    pendingConflicts = Number(queueRow?.c || 0);
    if (pendingConflicts > 0) {
      issues.push({
        category: 'integrity',
        severity: 'info',
        description: `${pendingConflicts} memories are queued for deferred conflict analysis.`,
        fixable: true,
        affectedCount: pendingConflicts
      });
    }
  } catch {}

  try {
    const ftsQueueRow = db.prepare('SELECT COUNT(*) AS c FROM memory_fts_queue').get() as any;
    pendingFts = Number(ftsQueueRow?.c || 0);
    if (pendingFts > 0) {
      issues.push({
        category: 'fts5',
        severity: 'info',
        description: `${pendingFts} memories are queued for deferred full-text indexing (readers index them on demand).`,
        fixable: true,
        affectedCount: pendingFts
      });
    }
  } catch {}

  return {
    healthy: issues.filter(i => i.severity === 'error').length === 0,
    timestamp: new Date().toISOString(),
    totalIssues: issues.length,
    fixableIssues,
    issues,
    metrics: {
      memoryCount,
      ftsRowCount,
      fileLinkCount,
      actionCount,
      walMode,
      pendingConflicts,
      pendingFts
    }
  };
}

export function healDatabase(
  db: DatabaseSync,
  projectId: string,
  options: { dryRun?: boolean; drainConflicts?: boolean; conflictBatchSize?: number } = {}
): HealResult {
  const { dryRun = false } = options;
  const reportBefore = diagnoseDatabase(db, projectId);
  const actionsTaken: string[] = [];
  let fixedCount = 0;
  let conflictsDrained = 0;
  let conflictsCreated = 0;
  let entitiesDrained = 0;
  let ftsDrained = 0;

  if (dryRun) {
    return {
      dryRun: true,
      fixedCount: 0,
      actionsTaken: reportBefore.issues.filter(i => i.fixable).map(i => `[DRY-RUN WOULD FIX] ${i.description}`),
      remainingIssues: reportBefore.totalIssues,
      reportBefore
    };
  }

  // 1. Rebuild FTS5 if needed
  const ftsIssue = reportBefore.issues.find(i => i.category === 'fts5');
  if (ftsIssue) {
    try {
      const indexed = rebuildMemoriesFts(db);
      actionsTaken.push(`Rebuilt FTS5 BM25 search index from ${indexed} memories.`);
      fixedCount += ftsIssue.affectedCount;
    } catch (err: any) {
      actionsTaken.push(`Failed to rebuild FTS5 index: ${err.message}`);
    }
  }

  // 2. Prune Orphaned File Links
  const linkIssue = reportBefore.issues.find(i => i.category === 'file_links');
  if (linkIssue) {
    try {
      const res = db.prepare(`
        DELETE FROM file_links
        WHERE memory_id NOT IN (SELECT id FROM memories)
      `).run() as any;
      const count = Number(res?.changes || linkIssue.affectedCount);
      actionsTaken.push(`Pruned ${count} orphaned file_links.`);
      fixedCount += count;
    } catch (err: any) {
      actionsTaken.push(`Failed to prune orphaned file_links: ${err.message}`);
    }
  }

  // 3. Fix Action DAG Prerequisites
  const actIssue = reportBefore.issues.find(i => i.category === 'actions');
  if (actIssue) {
    try {
      const res = db.prepare(`
        DELETE FROM action_edges
        WHERE source_action_id NOT IN (SELECT id FROM actions)
           OR target_action_id NOT IN (SELECT id FROM actions)
      `).run() as any;
      const count = Number(res?.changes || actIssue.affectedCount);
      actionsTaken.push(`Pruned ${count} invalid action_edges across action DAG.`);
      fixedCount += count;
    } catch (err: any) {
      actionsTaken.push(`Failed to prune invalid action_edges: ${err.message}`);
    }
  }

  // 4. Ensure WAL Mode & Checkpoint
  const storageIssue = reportBefore.issues.find(i => i.category === 'storage');
  if (storageIssue) {
    try {
      db.prepare('PRAGMA journal_mode = WAL').run();
      actionsTaken.push('Configured database journal mode to WAL.');
      fixedCount += 1;
    } catch {}
  }

  // Reclaim pages
  try {
    db.prepare('PRAGMA wal_checkpoint(TRUNCATE)').run();
    actionsTaken.push('Executed PRAGMA wal_checkpoint(TRUNCATE).');
  } catch {}

  // 5. Drain the deferred analysis queues in bounded batches.
  if (options.drainConflicts) {
    const batchSize = Math.max(1, Math.floor(options.conflictBatchSize ?? 20));
    const repo = new FastrRepository(db);
    let guard = 0;
    while (guard++ < 10_000) {
      const result = repo.drainAnalysis(batchSize);
      conflictsDrained += result.conflictsDrained;
      conflictsCreated += result.conflictsCreated;
      entitiesDrained += result.entitiesDrained;
      ftsDrained += result.ftsDrained;
      if (
        result.conflictsDrained === 0 &&
        result.entitiesDrained === 0 &&
        result.ftsDrained === 0
      ) break;
    }
    actionsTaken.push(
      `Drained ${conflictsDrained} queued conflict checks (${conflictsCreated} conflicts recorded), ` +
        `${entitiesDrained} queued entity extractions, and ${ftsDrained} queued full-text index rows.`
    );
    fixedCount += conflictsDrained + entitiesDrained + ftsDrained;
  }

  const reportAfter = diagnoseDatabase(db, projectId);

  return {
    dryRun: false,
    fixedCount,
    actionsTaken,
    remainingIssues: reportAfter.totalIssues,
    conflictsDrained,
    conflictsCreated,
    entitiesDrained,
    ftsDrained,
    reportBefore,
    reportAfter
  };
}

/**
 * memories_fts is a regular (content-storing) FTS5 table, so the 'rebuild' command is a no-op
 * for it. Repopulate it from the memories table instead.
 */
export function rebuildMemoriesFts(db: DatabaseSync): number {
  db.exec('BEGIN IMMEDIATE');
  try {
    db.exec('DELETE FROM main.memories_fts');
    const res = db.prepare(`
      INSERT INTO main.memories_fts (id, title, module, content)
      SELECT id, title, module, content FROM main.memories
    `).run();
    // Everything is indexed now, so the pending queue is redundant.
    db.exec('DELETE FROM main.memory_fts_queue');
    db.exec('COMMIT');
    return Number(res.changes);
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

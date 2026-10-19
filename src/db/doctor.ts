import { DatabaseSync } from 'node:sqlite';

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
  };
}

export interface HealResult {
  dryRun: boolean;
  fixedCount: number;
  actionsTaken: string[];
  remainingIssues: number;
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

  // 2. FTS5 Index Consistency
  let memoryCount = 0;
  let ftsRowCount = 0;
  try {
    const memRow = db.prepare('SELECT COUNT(*) as c FROM memories WHERE project_id = ?').get(projectId) as any;
    memoryCount = Number(memRow?.c || 0);

    const ftsRow = db.prepare('SELECT COUNT(*) as c FROM memories_fts').get() as any;
    ftsRowCount = Number(ftsRow?.c || 0);

    // If FTS row count differs by more than 10% or is missing active memories
    if (memoryCount > 0 && ftsRowCount === 0) {
      issues.push({
        category: 'fts5',
        severity: 'error',
        description: `FTS5 fulltext search index is empty (${ftsRowCount} rows) but memories table has ${memoryCount} records.`,
        fixable: true,
        affectedCount: memoryCount
      });
    } else if (Math.abs(memoryCount - ftsRowCount) > 0) {
      issues.push({
        category: 'fts5',
        severity: 'warning',
        description: `FTS5 index count (${ftsRowCount}) differs from memories table count (${memoryCount}).`,
        fixable: true,
        affectedCount: Math.abs(memoryCount - ftsRowCount)
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
      walMode
    }
  };
}

export function healDatabase(
  db: DatabaseSync,
  projectId: string,
  options: { dryRun?: boolean } = {}
): HealResult {
  const { dryRun = false } = options;
  const reportBefore = diagnoseDatabase(db, projectId);
  const actionsTaken: string[] = [];
  let fixedCount = 0;

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
      db.prepare("INSERT INTO memories_fts(memories_fts) VALUES('rebuild')").run();
      actionsTaken.push('Rebuilt FTS5 BM25 search index from active memories.');
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

  const reportAfter = diagnoseDatabase(db, projectId);

  return {
    dryRun: false,
    fixedCount,
    actionsTaken,
    remainingIssues: reportAfter.totalIssues,
    reportBefore,
    reportAfter
  };
}

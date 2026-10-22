import * as crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';
import { Memory } from '../db/schema.js';

export interface BranchRecord {
  id: string;
  project_id: string;
  name: string;
  base_snapshot_id: string;
  head_snapshot_id: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  memoryCount: number;
  snapshotTag: string;
  lastMergedAt: string | null;
}

export interface BranchMemorySummary {
  id: string;
  title: string;
  module: string;
  kind: string;
  status: string;
  pinned: number;
  valid_from: string;
  content: string;
}

export type BranchConflictType = 'content' | 'logical' | 'inactive_on_target';

export interface BranchMergeConflict {
  type: BranchConflictType;
  reason: string;
  branch_memory: BranchMemorySummary;
  target_memory: BranchMemorySummary | null;
}

export interface BranchMergeReport {
  branch: {
    id: string;
    name: string;
    snapshotId: string;
    snapshotTag: string;
    createdAt: string;
  };
  target: {
    projectId: string;
    activeCount: number;
  };
  dryRun: boolean;
  applied: boolean;
  strategy: 'target' | 'branch';
  counts: {
    branchMemories: number;
    targetMemories: number;
    added: number;
    unchanged: number;
    conflicts: number;
    preserved: number;
    applied: number;
  };
  added: BranchMemorySummary[];
  unchanged: BranchMemorySummary[];
  conflicts: BranchMergeConflict[];
  preserved: BranchMemorySummary[];
  appliedMemories: Array<{
    branch_memory_id: string;
    new_memory_id: string;
    action: 'added' | 'superseded' | 'reinserted';
  }>;
}

interface SnapshotState {
  memories?: Memory[];
  fileLinks?: Array<{ memory_id: string; file_path: string; symbol_name?: string }>;
}

interface MergeBranchOptions {
  dryRun?: boolean;
  force?: boolean;
  strategy?: 'target' | 'branch';
}

function validateBranchName(input: string): string {
  const name = input.trim();
  if (!name) throw new Error('Branch name must not be empty.');
  if (name.length > 64) throw new Error('Branch name must be 64 characters or fewer.');
  if (
    !/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(name) ||
    name.includes('..') ||
    name.startsWith('/') ||
    name.endsWith('/')
  ) {
    throw new Error('Branch names may contain letters, numbers, dots, underscores, and slashes, and must start with a letter or number.');
  }
  return name;
}

function parseEventIds(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string') : [];
  } catch {
    return [];
  }
}

function isActive(memory: Memory): boolean {
  return memory.valid_to === null && memory.status !== 'superseded' && memory.status !== 'dormant';
}

function logicalKey(memory: Pick<Memory, 'module' | 'kind' | 'title'>): string {
  return [
    String(memory.module ?? 'general').trim().toLowerCase(),
    String(memory.kind ?? 'rule').trim().toLowerCase(),
    String(memory.title ?? '').trim().toLowerCase()
  ].join('::');
}

function sameContent(a: Pick<Memory, 'title' | 'content' | 'module' | 'kind'>, b: Pick<Memory, 'title' | 'content' | 'module' | 'kind'>): boolean {
  return (
    a.title.trim() === b.title.trim() &&
    a.content.trim() === b.content.trim() &&
    String(a.module ?? '').trim().toLowerCase() === String(b.module ?? '').trim().toLowerCase() &&
    a.kind === b.kind
  );
}

function summary(memory: Memory): BranchMemorySummary {
  return {
    id: memory.id,
    title: memory.title,
    module: memory.module,
    kind: memory.kind,
    status: memory.status,
    pinned: Number(memory.pinned ?? 0),
    valid_from: memory.valid_from,
    content: memory.content
  };
}

function mapBranch(row: any): BranchRecord {
  return {
    id: String(row.id),
    project_id: String(row.project_id),
    name: String(row.name),
    base_snapshot_id: String(row.base_snapshot_id),
    head_snapshot_id: String(row.head_snapshot_id),
    description: row.description == null ? null : String(row.description),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
    memoryCount: Number(row.memory_count ?? 0),
    snapshotTag: String(row.snapshot_tag ?? ''),
    lastMergedAt: row.last_merged_at == null ? null : String(row.last_merged_at)
  };
}

const BRANCH_SELECT = `
  SELECT b.*, s.tag AS snapshot_tag, s.memory_count AS memory_count,
    (SELECT MAX(m.created_at) FROM memory_branch_merges m WHERE m.branch_id = b.id) AS last_merged_at
  FROM memory_branches b
  JOIN memory_snapshots s ON s.id = b.head_snapshot_id
`;

export function createBranch(
  db: DatabaseSync,
  repo: FastrRepository,
  projectId: string,
  nameInput: string,
  options: { fromSnapshotId?: string; description?: string } = {}
): BranchRecord {
  const name = validateBranchName(nameInput);
  const existing = db.prepare('SELECT id FROM memory_branches WHERE project_id = ? AND name = ? COLLATE NOCASE').get(projectId, name);
  if (existing) throw new Error(`Branch already exists: ${name}`);

  let snapshotId: string;
  let snapshotTag: string;
  let memoryCount: number;

  if (options.fromSnapshotId) {
    const snapshot = repo.getSnapshot(options.fromSnapshotId);
    if (!snapshot) throw new Error(`Snapshot not found: ${options.fromSnapshotId}`);
    if (snapshot.project_id !== projectId) {
      throw new Error(`Snapshot ${options.fromSnapshotId} belongs to a different project.`);
    }
    snapshotId = String(snapshot.id);
    snapshotTag = String(snapshot.tag);
    memoryCount = Number(snapshot.memory_count ?? 0);
  } else {
    const snapshot = repo.createSnapshot(
      projectId,
      `branch/${name}`,
      options.description ?? `Memory branch ${name}`
    );
    snapshotId = snapshot.id;
    snapshotTag = snapshot.tag;
    memoryCount = snapshot.memoryCount;
  }

  const id = `br_${crypto.randomBytes(4).toString('hex')}`;
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO memory_branches (
      id, project_id, name, base_snapshot_id, head_snapshot_id, description, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, projectId, name, snapshotId, snapshotId, options.description ?? null, now, now);

  const branch = getBranch(db, projectId, name);
  if (!branch) throw new Error(`Failed to read newly created branch: ${name}`);
  return { ...branch, snapshotTag, memoryCount };
}

export function getBranch(db: DatabaseSync, projectId: string, name: string): BranchRecord | null {
  const row = db.prepare(`
    ${BRANCH_SELECT}
    WHERE b.project_id = ? AND b.name = ? COLLATE NOCASE
  `).get(projectId, name) as any | undefined;
  return row ? mapBranch(row) : null;
}

export function listBranches(db: DatabaseSync, projectId: string): BranchRecord[] {
  const rows = db.prepare(`
    ${BRANCH_SELECT}
    WHERE b.project_id = ?
    ORDER BY b.created_at DESC
  `).all(projectId) as any[];
  return rows.map(mapBranch);
}

function recordMerge(db: DatabaseSync, projectId: string, report: BranchMergeReport): void {
  db.prepare(`
    INSERT INTO memory_branch_merges (
      id, project_id, branch_id, branch_name, source_snapshot_id, strategy, applied,
      added_count, conflict_count, report_json, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    `merge_${crypto.randomBytes(4).toString('hex')}`,
    projectId,
    report.branch.id,
    report.branch.name,
    report.branch.snapshotId,
    report.strategy,
    report.applied ? 1 : 0,
    report.appliedMemories.filter((entry) => entry.action === 'added').length,
    report.counts.conflicts,
    JSON.stringify(report),
    new Date().toISOString()
  );
}

function insertBranchMemory(
  repo: FastrRepository,
  projectId: string,
  memory: Memory,
  files: string[]
): string {
  const inserted = repo.insertMemory({
    projectId,
    agentId: memory.agent_id,
    module: memory.module,
    kind: memory.kind,
    title: memory.title,
    content: memory.content,
    files,
    verified: memory.status === 'verified',
    pinned: Boolean(memory.pinned),
    sourceEventIds: parseEventIds(memory.source_event_ids)
  });
  return inserted.id;
}

/**
 * Merges a branch head snapshot into the current active set. The branch is immutable, so the
 * merge is one-way: branch-only memories are added, target-only memories are preserved, and
 * same-identity changes are reported as conflicts. Conflict resolution never deletes history;
 * branch-favored conflicts supersede the target row and insert a fresh version.
 */
export function mergeBranch(
  db: DatabaseSync,
  repo: FastrRepository,
  projectId: string,
  nameInput: string,
  options: MergeBranchOptions = {}
): BranchMergeReport {
  const name = validateBranchName(nameInput);
  const strategy = options.strategy ?? 'target';
  if (strategy !== 'target' && strategy !== 'branch') {
    throw new Error(`Unknown merge strategy: ${strategy}`);
  }

  const branch = getBranch(db, projectId, name);
  if (!branch) throw new Error(`Branch not found: ${name}`);

  const snapshot = repo.getSnapshot(branch.head_snapshot_id);
  if (!snapshot) throw new Error(`Branch snapshot not found: ${branch.head_snapshot_id}`);
  const state = JSON.parse(String(snapshot.state_json)) as SnapshotState;
  const branchMemories = (state.memories ?? []).filter(
    (memory) => memory.project_id === projectId && isActive(memory)
  );
  const filesByMemory = new Map<string, string[]>();
  for (const link of state.fileLinks ?? []) {
    const list = filesByMemory.get(link.memory_id) ?? [];
    list.push(link.file_path);
    filesByMemory.set(link.memory_id, list);
  }

  const targetRows = db.prepare(`
    SELECT * FROM memories
    WHERE project_id = ?
      AND valid_to IS NULL
      AND status NOT IN ('superseded', 'dormant')
    ORDER BY created_at ASC, id ASC
  `).all(projectId) as unknown as Memory[];
  const targetAllRows = db.prepare(`
    SELECT * FROM memories
    WHERE project_id = ?
    ORDER BY created_at ASC, id ASC
  `).all(projectId) as unknown as Memory[];

  const targetById = new Map(targetRows.map((memory) => [memory.id, memory]));
  const targetByKey = new Map<string, Memory[]>();
  for (const memory of targetRows) {
    const key = logicalKey(memory);
    const list = targetByKey.get(key) ?? [];
    list.push(memory);
    targetByKey.set(key, list);
  }
  const historyById = new Map(targetAllRows.map((memory) => [memory.id, memory]));
  const historyByKey = new Map<string, Memory>();
  for (const memory of targetAllRows) {
    const key = logicalKey(memory);
    if (!historyByKey.has(key)) historyByKey.set(key, memory);
  }

  const added: BranchMemorySummary[] = [];
  const unchanged: BranchMemorySummary[] = [];
  const conflicts: BranchMergeConflict[] = [];
  const matchedTargetIds = new Set<string>();
  const plan = new Map<string, { action: 'add' | 'unchanged' | 'conflict'; target?: Memory; conflictType?: BranchConflictType; reason?: string }>();

  for (const branchMemory of branchMemories) {
    const exactTarget = targetById.get(branchMemory.id);
    if (exactTarget) {
      matchedTargetIds.add(exactTarget.id);
      if (sameContent(branchMemory, exactTarget)) {
        unchanged.push(summary(branchMemory));
        plan.set(branchMemory.id, { action: 'unchanged', target: exactTarget });
      } else {
        const reason = 'same memory id but different content';
        conflicts.push({
          type: 'content',
          reason,
          branch_memory: summary(branchMemory),
          target_memory: summary(exactTarget)
        });
        plan.set(branchMemory.id, { action: 'conflict', target: exactTarget, conflictType: 'content', reason });
      }
      continue;
    }

    const logicalTarget = targetByKey.get(logicalKey(branchMemory))?.[0];
    if (logicalTarget) {
      matchedTargetIds.add(logicalTarget.id);
      if (sameContent(branchMemory, logicalTarget)) {
        unchanged.push(summary(branchMemory));
        plan.set(branchMemory.id, { action: 'unchanged', target: logicalTarget });
      } else {
        const reason = 'same logical identity but different content or memory id';
        conflicts.push({
          type: 'logical',
          reason,
          branch_memory: summary(branchMemory),
          target_memory: summary(logicalTarget)
        });
        plan.set(branchMemory.id, { action: 'conflict', target: logicalTarget, conflictType: 'logical', reason });
      }
      continue;
    }

    const historical = historyById.get(branchMemory.id) ?? historyByKey.get(logicalKey(branchMemory));
    if (historical) {
      const activeHead = historical.superseded_by_id
        ? targetById.get(historical.superseded_by_id)
        : undefined;
      if (activeHead) matchedTargetIds.add(activeHead.id);
      const conflictTarget = activeHead ?? historical;
      const reason = activeHead
        ? `branch memory was superseded on target by ${activeHead.id}`
        : historical.superseded_by_id
          ? `branch memory is inactive on target (superseded by ${historical.superseded_by_id})`
          : `branch memory is inactive on target (${historical.status})`;
      conflicts.push({
        type: 'inactive_on_target',
        reason,
        branch_memory: summary(branchMemory),
        target_memory: summary(conflictTarget)
      });
      plan.set(branchMemory.id, { action: 'conflict', target: conflictTarget, conflictType: 'inactive_on_target', reason });
      continue;
    }

    added.push(summary(branchMemory));
    plan.set(branchMemory.id, { action: 'add' });
  }

  const preserved = targetRows
    .filter((memory) => !matchedTargetIds.has(memory.id))
    .map(summary);

  const hasConflicts = conflicts.length > 0;
  const canApply = !options.dryRun && (!hasConflicts || options.force === true);
  const appliedMemories: BranchMergeReport['appliedMemories'] = [];

  if (canApply) {
    for (const branchMemory of branchMemories) {
      const branchPlan = plan.get(branchMemory.id);
      if (!branchPlan || branchPlan.action === 'unchanged') continue;
      const files = filesByMemory.get(branchMemory.id) ?? [];

      if (branchPlan.action === 'add') {
        const newId = insertBranchMemory(repo, projectId, branchMemory, files);
        appliedMemories.push({ branch_memory_id: branchMemory.id, new_memory_id: newId, action: 'added' });
        continue;
      }

      if (strategy === 'target') continue;

      if (branchPlan.target && targetById.has(branchPlan.target.id)) {
        const result = repo.supersedeMemory(
          branchPlan.target.id,
          branchMemory.title,
          branchMemory.content,
          `Merged branch ${branch.name}: ${branchPlan.reason ?? 'branch conflict'}`,
          files
        );
        appliedMemories.push({
          branch_memory_id: branchMemory.id,
          new_memory_id: result.newMemory.id,
          action: 'superseded'
        });
      } else {
        const newId = insertBranchMemory(repo, projectId, branchMemory, files);
        appliedMemories.push({
          branch_memory_id: branchMemory.id,
          new_memory_id: newId,
          action: 'reinserted'
        });
      }
    }
  }

  const report: BranchMergeReport = {
    branch: {
      id: branch.id,
      name: branch.name,
      snapshotId: branch.head_snapshot_id,
      snapshotTag: branch.snapshotTag,
      createdAt: branch.created_at
    },
    target: {
      projectId,
      activeCount: targetRows.length
    },
    dryRun: options.dryRun === true,
    applied: canApply,
    strategy,
    counts: {
      branchMemories: branchMemories.length,
      targetMemories: targetRows.length,
      added: added.length,
      unchanged: unchanged.length,
      conflicts: conflicts.length,
      preserved: preserved.length,
      applied: appliedMemories.length
    },
    added,
    unchanged,
    conflicts,
    preserved,
    appliedMemories
  };

  if (!options.dryRun) {
    recordMerge(db, projectId, report);
  }

  return report;
}

export function formatBranchMergeMarkdown(report: BranchMergeReport): string {
  const list = (entries: BranchMemorySummary[]) => entries.length === 0
    ? '_None._'
    : entries.map((entry) => `- [${entry.id}] ${entry.title} (${entry.module}, ${entry.kind})`).join('\n');
  const lines = [
    `## FastrMemory branch merge: ${report.branch.name}`,
    '',
    `**Branch snapshot:** [${report.branch.snapshotId}] ${report.branch.snapshotTag}`,
    `**Target:** ${report.target.projectId} (${report.target.activeCount} active memories)`,
    `**Strategy:** ${report.strategy} | **Dry run:** ${report.dryRun ? 'yes' : 'no'} | **Applied:** ${report.applied ? 'yes' : 'no'}`,
    '',
    `### Added (${report.counts.added})`,
    list(report.added),
    '',
    `### Unchanged (${report.counts.unchanged})`,
    list(report.unchanged),
    '',
    `### Conflicts (${report.counts.conflicts})`,
    report.conflicts.length === 0
      ? '_None._'
      : report.conflicts
          .map((conflict) => `- [${conflict.type}] ${conflict.branch_memory.title}: ${conflict.reason}`)
          .join('\n'),
    '',
    `### Preserved target-only (${report.counts.preserved})`,
    list(report.preserved),
    '',
    `**Applied writes:** ${report.counts.applied}`
  ];
  if (report.conflicts.length > 0 && !report.applied) {
    lines.push(
      '',
      'No memory changes were applied. Re-run with `--force` to apply non-conflicting additions, or `--force --strategy branch` to resolve conflicts in favor of the branch (history is preserved).'
    );
  } else if (report.conflicts.length > 0 && report.strategy === 'target') {
    lines.push('', 'Conflicts were skipped; the target versions were kept.');
  } else if (report.conflicts.length > 0 && report.strategy === 'branch') {
    lines.push('', 'Conflicts were resolved in favor of the branch; superseded target rows remain in history.');
  }
  return lines.join('\n');
}

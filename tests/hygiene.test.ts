import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DatabaseSync } from 'node:sqlite';
import { applySchema } from '../src/db/schema.js';
import { inspectMemoryHygiene } from '../src/db/hygiene.js';

const P = 'proj_hygiene';
const NOW = new Date('2026-10-21T00:00:00.000Z');

describe('memory hygiene inspection', () => {
  let db: DatabaseSync;

  beforeEach(() => {
    db = new DatabaseSync(':memory:');
    applySchema(db);
    db.exec('PRAGMA foreign_keys = OFF');
  });

  afterEach(() => {
    db.close();
  });

  function memory(
    id: string,
    title: string,
    content: string,
    options: {
      status?: string;
      pinned?: number;
      createdAt?: string;
      lastRecalledAt?: string | null;
      validTo?: string | null;
      supersededBy?: string | null;
      module?: string;
      kind?: string;
    } = {}
  ) {
    db.prepare(`
      INSERT INTO memories (
        id, project_id, module, kind, title, content, status, pinned,
        valid_from, valid_to, superseded_by_id, created_at, last_recalled_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      P,
      options.module ?? 'general',
      options.kind ?? 'rule',
      title,
      content,
      options.status ?? 'verified',
      options.pinned ?? 0,
      options.createdAt ?? '2026-10-20T00:00:00Z',
      options.validTo ?? null,
      options.supersededBy ?? null,
      options.createdAt ?? '2026-10-20T00:00:00Z',
      options.lastRecalledAt === undefined ? '2026-10-20T00:00:00Z' : options.lastRecalledAt
    );
  }

  it('reports a clean project as healthy with zero counts', () => {
    const report = inspectMemoryHygiene(db, P, { staleAfterDays: 30, now: NOW });
    expect(report.healthy).toBe(true);
    expect(report.issues).toEqual([]);
    expect(report.counts).toEqual({
      activeMemories: 0,
      pinnedMemories: 0,
      neverRecalled: 0,
      orphanFileLinks: 0,
      orphanConflicts: 0,
      orphanFeedback: 0,
      duplicateTitleGroups: 0,
      duplicateTitleRows: 0,
      duplicateContentGroups: 0,
      duplicateContentRows: 0,
      staleMemories: 0
    });
  });

  it('detects orphaned file links, conflicts, and feedback rows', () => {
    memory('mem_existing', 'Existing rule', 'Existing content');
    db.prepare('INSERT INTO file_links (memory_id, file_path, symbol_name) VALUES (?, ?, ?)')
      .run('mem_missing_link', 'src/orphan.ts', '');
    db.prepare(`
      INSERT INTO memory_conflicts (project_id, memory_a_id, memory_b_id, reason, score)
      VALUES (?, ?, ?, ?, ?)
    `).run(P, 'mem_missing_conflict', 'mem_existing', 'orphan conflict', 0.9);
    db.prepare(`
      INSERT INTO memory_feedback (
        id, project_id, memory_id, outcome, note, reward_before, reward_after,
        status_before, status_after, confidence_tier, bad_streak
      ) VALUES (?, ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?)
    `).run('fb_orphan', P, 'mem_missing_feedback', 'good', 1.0, 1.2, 'verified', 'verified', 'medium', 0);

    const report = inspectMemoryHygiene(db, P, { staleAfterDays: 30, now: NOW });
    expect(report.healthy).toBe(false);
    expect(report.counts.orphanFileLinks).toBe(1);
    expect(report.counts.orphanConflicts).toBe(1);
    expect(report.counts.orphanFeedback).toBe(1);
    expect(report.counts.duplicateTitleRows).toBe(0);
    expect(report.counts.duplicateContentRows).toBe(0);
    expect(report.counts.staleMemories).toBe(0);
    expect(report.issues).toHaveLength(1);
    expect(report.issues[0]).toMatchObject({ category: 'orphan', count: 3 });
  });

  it('detects duplicate active memories and stale rows while excluding pinned and inactive history', () => {
    memory('mem_alpha_1', 'Alpha Rule', 'First unique body');
    memory('mem_alpha_2', ' alpha rule ', 'Second unique body');
    memory('mem_beta', 'Beta Rule', 'Shared exact body');
    memory('mem_gamma', 'Gamma Rule', 'Shared exact body');
    memory('mem_stale', 'Stale Rule', 'Old body', {
      createdAt: '2020-01-01T00:00:00Z',
      lastRecalledAt: null
    });
    memory('mem_pinned', 'Pinned Rule', 'Pinned body', {
      pinned: 1,
      createdAt: '2020-01-01T00:00:00Z',
      lastRecalledAt: null
    });
    memory('mem_superseded', 'Superseded Rule', 'History body', {
      status: 'superseded',
      validTo: '2020-01-02T00:00:00Z',
      createdAt: '2020-01-01T00:00:00Z',
      lastRecalledAt: null
    });
    memory('mem_dormant', 'Dormant Rule', 'Dormant body', {
      status: 'dormant',
      createdAt: '2020-01-01T00:00:00Z',
      lastRecalledAt: null
    });

    const report = inspectMemoryHygiene(db, P, { staleAfterDays: 30, now: NOW });
    expect(report.healthy).toBe(false);
    expect(report.counts.activeMemories).toBe(6);
    expect(report.counts.pinnedMemories).toBe(1);
    expect(report.counts.neverRecalled).toBe(2);
    expect(report.counts.duplicateTitleGroups).toBe(1);
    expect(report.counts.duplicateTitleRows).toBe(1);
    expect(report.counts.duplicateContentGroups).toBe(1);
    expect(report.counts.duplicateContentRows).toBe(1);
    expect(report.counts.staleMemories).toBe(1);
    expect(report.issues.map((issue) => issue.category)).toEqual([
      'duplicate',
      'duplicate',
      'stale'
    ]);
  });
});

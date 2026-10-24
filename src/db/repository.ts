import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { RawEvent, Memory, FileLink, Handoff, Entity, GraphEdge, MemoryConflict, Prediction, Action, ActionEdge, MemorySlot, applySchema, configurePragmas } from './schema.js';
import { SpoolManager } from './spool.js';
import { extractEntities } from '../learn/ner.js';
import { detectConflict } from '../learn/conflicts.js';
import { calculateBaserate, PredictionBaserate } from '../learn/planning-fallacy.js';
import { computeProvenanceHash, verifyProvenanceHash } from './provenance.js';
import { confidenceTier, ConfidenceTier } from './confidence.js';
import { scrubSecrets } from '../privacy/scrubber.js';
import { globalBroadcaster } from '../ui/sse.js';
import { resolveConflictMode, resolveNerMode, resolveFtsMode, type ConflictMode, type NerMode, type FtsMode } from '../config.js';
import { drainFtsQueue, indexMemoryFtsNow, pendingFtsCount } from './fts-queue.js';

export interface CreateMemoryParams {
  projectId: string;
  scope?: 'project' | 'global';
  agentId?: string;
  module?: string;
  kind: 'rule' | 'decision' | 'error_trap' | 'workflow';
  title: string;
  content: string;
  files?: string[];
  symbols?: string[];
  verified?: boolean;
  pinned?: boolean;
  sourceEventIds?: string[];
}

export interface ProjectStatus {
  projectId: string;
  activeCount: number;
  stagingCount: number;
  supersededCount: number;
  dormantCount: number;
  rawEventCount: number;
  pendingSpoolCount: number;
  embeddingCoveragePercent: number;
  pendingConflictCount: number;
  pendingNerCount: number;
  pendingFtsCount: number;
}

export interface RepositoryOptions {
  /** Overrides write.conflictMode. Used by tests and the sync/deferred equivalence suite. */
  conflictMode?: ConflictMode;
  /** Overrides write.nerMode. 'sync' restores entity extraction inside insertMemory(). */
  nerMode?: NerMode;
  /** Overrides write.ftsMode. 'sync' restores inline FTS indexing inside insertMemory(). */
  ftsMode?: FtsMode;
}

export class FastrRepository {
  private db: DatabaseSync;
  private spool?: SpoolManager;
  private conflictMode: ConflictMode;
  private nerMode: NerMode;
  private ftsMode: FtsMode;

  constructor(db: DatabaseSync, spool?: SpoolManager, options: RepositoryOptions = {}) {
    this.db = db;
    this.spool = spool;
    this.conflictMode = options.conflictMode ?? resolveConflictMode();
    this.nerMode = options.nerMode ?? resolveNerMode();
    this.ftsMode = options.ftsMode ?? resolveFtsMode();
  }

  /** Active conflict-analysis mode for this repository instance. */
  getConflictMode(): ConflictMode {
    return this.conflictMode;
  }

  /** Active entity-extraction mode for this repository instance. */
  getNerMode(): NerMode {
    return this.nerMode;
  }

  /** Active full-text indexing mode for this repository instance. */
  getFtsMode(): FtsMode {
    return this.ftsMode;
  }

  hasGlobalDb(): boolean {
    try {
      const list = this.db.prepare('PRAGMA database_list').all() as any[];
      return list.some((d) => d.name === 'global_db');
    } catch {
      return false;
    }
  }

  attachGlobalDatabase(globalDbPath: string): boolean {
    try {
      if (globalDbPath !== ':memory:') {
        const dir = path.dirname(globalDbPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const gDb = new DatabaseSync(globalDbPath);
        configurePragmas(gDb);
        applySchema(gDb);
        gDb.close();
      }

      const list = this.db.prepare('PRAGMA database_list').all() as Array<{ name: string; file: string }>;
      const existing = list.find((d) => d.name === 'global_db');
      if (existing) {
        if (sameDbFile(existing.file, globalDbPath)) return true;
        // Attached to a different file: switch over instead of silently keeping the old one.
        this.db.exec('DETACH DATABASE global_db');
      }

      this.db.prepare('ATTACH DATABASE ? AS global_db').run(globalDbPath);
      this.db.exec('PRAGMA busy_timeout = 5000;');
      return true;
    } catch {
      return false;
    }
  }

  /** Resolves which schema-qualified memories table holds the given id. */
  private locateMemoryTable(id: string): 'memories' | 'global_db.memories' | null {
    if (this.db.prepare('SELECT 1 FROM main.memories WHERE id = ?').get(id)) return 'memories';
    if (this.hasGlobalDb() && this.db.prepare('SELECT 1 FROM global_db.memories WHERE id = ?').get(id)) {
      return 'global_db.memories';
    }
    return null;
  }

  // --- RAW EVENTS ---

  insertRawEvent(event: Omit<RawEvent, 'content_hash'> & { content_hash?: string }): RawEvent {
    const hash =
      event.content_hash ||
      crypto.createHash('sha256').update(event.raw_payload).digest('hex');

    const fullEvent: RawEvent = {
      ...event,
      content_hash: hash,
      agent_id: event.agent_id || 'default'
    };

    try {
      this.db.prepare(`
        INSERT OR IGNORE INTO raw_events (
          id, project_id, session_id, agent_id, event_type, tool_name, file_path, raw_payload, content_hash
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        fullEvent.id,
        fullEvent.project_id,
        fullEvent.session_id,
        fullEvent.agent_id,
        fullEvent.event_type,
        fullEvent.tool_name || null,
        fullEvent.file_path || null,
        fullEvent.raw_payload,
        fullEvent.content_hash
      );
    } catch (err: any) {
      if (this.spool && isBusyError(err)) {
        this.spool.append(fullEvent);
        return fullEvent;
      }
      throw err;
    }

    return fullEvent;
  }

  getRawEvent(id: string): RawEvent | null {
    const row = this.db.prepare('SELECT * FROM raw_events WHERE id = ?').get(id) as RawEvent | undefined;
    return row || null;
  }

  getRawEventsForMemory(memoryId: string): RawEvent[] {
    const mem = this.getMemory(memoryId);
    if (!mem) return [];

    let eventIds: string[] = [];
    try {
      eventIds = JSON.parse(mem.source_event_ids);
    } catch {
      return [];
    }

    if (!Array.isArray(eventIds) || eventIds.length === 0) return [];

    const placeholders = eventIds.map(() => '?').join(',');
    const rows = this.db.prepare(`
      SELECT * FROM raw_events WHERE id IN (${placeholders}) ORDER BY created_at ASC
    `).all(...eventIds) as unknown as RawEvent[];

    return rows;
  }

  // --- MEMORIES ---

  insertMemory(params: CreateMemoryParams): Memory {
    const id = `mem_${crypto.randomBytes(4).toString('hex')}`;
    const module = params.module?.trim().toLowerCase() || 'general';
    const kind = params.kind || 'rule';
    const status = params.verified ? 'verified' : 'staging';
    const pinned = params.pinned ? 1 : 0;
    const sourceIds = JSON.stringify(params.sourceEventIds?.slice(-32) || []);
    const isGlobal = params.scope === 'global';
    const targetProject = isGlobal ? 'global' : params.projectId;
    const targetTable = (isGlobal && this.hasGlobalDb()) ? 'global_db.memories' : 'memories';
    const agentId = params.agentId || 'default';
    const nowIso = new Date().toISOString();

    const provenanceHash = computeProvenanceHash({
      projectId: targetProject,
      agentId,
      module,
      kind,
      title: params.title,
      content: params.content,
      createdAt: nowIso
    });

    // Durability: the memory row and its deferred conflict job are committed together.
    // Nothing else (file links, NER, conflict scan) is allowed to delay this write.
    this.db.exec('SAVEPOINT fastr_memory_insert');
    try {
      this.db.prepare(`
        INSERT INTO ${targetTable} (
          id, project_id, agent_id, module, kind, title, content, status, pinned, source_event_ids, created_at, provenance_hash
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id,
        targetProject,
        agentId,
        module,
        kind,
        params.title,
        params.content,
        status,
        pinned,
        sourceIds,
        nowIso,
        provenanceHash
      );

      if (this.conflictMode === 'deferred' && !isGlobal) {
        this.db.prepare(`
          INSERT INTO memory_conflict_queue (project_id, memory_id, created_at)
          VALUES (?, ?, ?)
        `).run(targetProject, id, nowIso);
      }
      if (this.nerMode === 'deferred') {
        this.db.prepare(`
          INSERT INTO memory_ner_queue (project_id, memory_id, created_at)
          VALUES (?, ?, ?)
        `).run(params.projectId, id, nowIso);
      }
      this.db.exec('RELEASE fastr_memory_insert');
    } catch (err) {
      this.db.exec('ROLLBACK TO fastr_memory_insert');
      this.db.exec('RELEASE fastr_memory_insert');
      throw err;
    }

    // Full-text indexing: the insert trigger queued this row. 'sync' pays the tokenization
    // cost before returning; 'deferred' (default) leaves it for the next reader or drain.
    if (this.ftsMode === 'sync') {
      try {
        indexMemoryFtsNow(this.db, id, isGlobal && this.hasGlobalDb() ? 'global_db' : 'main');
      } catch {
        // Indexing failure must never lose a committed memory.
      }
    }

    // Explicit file links
    if (params.files && params.files.length > 0) {
      this.linkFiles(id, params.files, params.symbols, isGlobal && this.hasGlobalDb());
    }

    // 1. Zero-LLM Fast-Path Named Entity Extraction (NER)
    // Deferred by default: entity + graph writes are analysis, not durability.
    if (this.nerMode === 'sync') {
      try {
        this.extractEntitiesForMemory(id, params.projectId, params.title, params.content, params.files);
      } catch {
        // Non-blocking NER failure protection
      }
    }

    // 2. Proactive Contradiction & Conflict Detection
    // 'deferred' (default) queued a job in the insert transaction above; the scan runs in
    // drainConflicts(). 'sync' reproduces the historical inline behaviour for tests and for
    // operators who explicitly want conflicts resolved before the call returns.
    if (this.conflictMode === 'sync') {
      try {
        this.recordConflicts(id, targetProject, params.title, params.content);
      } catch {
        // Non-blocking conflict check protection
      }
    }

    const createdMemory = this.getMemory(id)!;
    globalBroadcaster.broadcast('memory_created', createdMemory);
    if (createdMemory.kind === 'error_trap') {
      globalBroadcaster.broadcast('trap_logged', {
        memoryId: createdMemory.id,
        title: createdMemory.title,
        module: createdMemory.module,
        agentId: createdMemory.agent_id,
        files: params.files || [],
        timestamp: new Date().toISOString()
      });
    }

    return createdMemory;
  }

  /**
   * The historical conflict window: the 50 most recent active memories in the project that
   * were inserted before the target row. Ordering by rowid makes the window reproducible
   * later: drainConflicts() sees exactly the rows that existed when the memory was written,
   * even if more memories arrived in the meantime.
   */
  private conflictCandidates(memoryId: string, projectId: string): Array<{ id: string; title: string; content: string }> {
    const row = this.db.prepare('SELECT rowid AS rid FROM main.memories WHERE id = ?').get(memoryId) as
      | { rid: number }
      | undefined;
    if (!row) return [];
    return this.db.prepare(`
      SELECT id, title, content FROM main.memories
      WHERE project_id = ? AND valid_to IS NULL AND rowid < ?
      ORDER BY created_at DESC, rowid DESC LIMIT 50
    `).all(projectId, row.rid) as unknown as Array<{ id: string; title: string; content: string }>;
  }

  /** Runs detectConflict() over the historical window and records new conflict rows. */
  private recordConflicts(memoryId: string, projectId: string, title: string, content: string): number {
    let created = 0;
    for (const candidate of this.conflictCandidates(memoryId, projectId)) {
      const check = detectConflict(title, content, candidate.title, candidate.content);
      if (!check.hasConflict) continue;
      const result = this.db.prepare(`
        INSERT INTO memory_conflicts (project_id, memory_a_id, memory_b_id, reason, score)
        SELECT ?, ?, ?, ?, ?
        WHERE NOT EXISTS (
          SELECT 1 FROM memory_conflicts WHERE memory_a_id = ? AND memory_b_id = ?
        )
      `).run(projectId, memoryId, candidate.id, check.reason, check.score, memoryId, candidate.id);
      created += Number(result.changes ?? 0);
    }
    return created;
  }

  /** Extracts entities and writes entity + graph rows for one memory. */
  private extractEntitiesForMemory(
    memoryId: string,
    projectId: string,
    title: string,
    content: string,
    files?: string[]
  ): void {
    const extracted = extractEntities(`${title} ${content}`);
    if (extracted.length === 0) return;

    const existingLinks = this.db
      .prepare('SELECT COUNT(*) AS c FROM file_links WHERE memory_id = ?')
      .get(memoryId) as { c?: number } | undefined;
    const hasExplicitFiles = (files && files.length > 0) || Number(existingLinks?.c ?? 0) > 0;
    const autoFiles: string[] = [];

    for (const ent of extracted) {
      const entId = `ent_${crypto.createHash('sha256').update(`${projectId}:${ent.name.toLowerCase()}`).digest('hex').slice(0, 12)}`;

      this.db.prepare(`
        INSERT INTO entities (id, project_id, name, entity_type)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(id) DO NOTHING
      `).run(entId, projectId, ent.name, ent.type);

      const edgeId = `edge_${crypto.randomBytes(6).toString('hex')}`;
      this.db.prepare(`
        INSERT INTO graph_edges (id, project_id, source_id, target_id, edge_type, weight)
        VALUES (?, ?, ?, ?, 'entity_link', 1.0)
        ON CONFLICT(id) DO NOTHING
      `).run(edgeId, projectId, memoryId, entId);

      if (ent.type === 'file' && !hasExplicitFiles) {
        autoFiles.push(ent.name);
      }
    }

    if (autoFiles.length > 0) {
      this.linkFiles(memoryId, autoFiles.slice(0, 5));
    }
  }

  /** Number of memories waiting for entity extraction. */
  pendingNerCount(projectId?: string): number {
    const row = projectId
      ? this.db.prepare('SELECT COUNT(*) AS c FROM memory_ner_queue WHERE project_id = ?').get(projectId)
      : this.db.prepare('SELECT COUNT(*) AS c FROM memory_ner_queue').get();
    return Number((row as { c?: number } | undefined)?.c ?? 0);
  }

  /** Drains the deferred entity-extraction queue in one transaction. */
  drainNer(batchSize: number = 20): { drained: number } {
    const limit = Math.max(0, Math.floor(batchSize));
    if (limit === 0) return { drained: 0 };

    const rows = this.db.prepare(`
      SELECT id, project_id, memory_id FROM memory_ner_queue ORDER BY id ASC LIMIT ?
    `).all(limit) as unknown as Array<{ id: number; project_id: string; memory_id: string }>;
    if (rows.length === 0) return { drained: 0 };

    this.db.exec('SAVEPOINT fastr_drain_ner');
    try {
      for (const row of rows) {
        const memory = this.db.prepare('SELECT title, content FROM main.memories WHERE id = ?').get(row.memory_id) as
          | { title: string; content: string }
          | undefined;
        if (memory) {
          try {
            this.extractEntitiesForMemory(row.memory_id, row.project_id, memory.title, memory.content);
          } catch {
            // Non-blocking: a bad row must never stall the queue.
          }
        }
        this.db.prepare('DELETE FROM memory_ner_queue WHERE id = ?').run(row.id);
      }
      this.db.exec('RELEASE fastr_drain_ner');
    } catch (err) {
      this.db.exec('ROLLBACK TO fastr_drain_ner');
      this.db.exec('RELEASE fastr_drain_ner');
      throw err;
    }

    return { drained: rows.length };
  }

  /** Number of memories waiting for full-text indexing. */
  pendingFtsCount(): number {
    return pendingFtsCount(this.db, 'main');
  }

  /** Indexes queued memories in one transaction. Idempotent. */
  drainFts(batchSize: number = 500): { drained: number } {
    return drainFtsQueue(this.db, { limit: batchSize, schema: 'main' });
  }

  /** Drains both deferred queues. This is what the maintenance loop calls. */
  drainAnalysis(batchSize: number = 20): {
    conflictsDrained: number;
    conflictsCreated: number;
    entitiesDrained: number;
    ftsDrained: number;
  } {
    const conflicts = this.drainConflicts(batchSize);
    const entities = this.drainNer(batchSize);
    const fts = this.drainFts(Math.max(batchSize, 500));
    return {
      conflictsDrained: conflicts.drained,
      conflictsCreated: conflicts.created,
      entitiesDrained: entities.drained,
      ftsDrained: fts.drained
    };
  }

  /** Number of memories waiting for conflict analysis. */
  pendingConflictCount(projectId?: string): number {
    const row = projectId
      ? this.db.prepare('SELECT COUNT(*) AS c FROM memory_conflict_queue WHERE project_id = ?').get(projectId)
      : this.db.prepare('SELECT COUNT(*) AS c FROM memory_conflict_queue').get();
    return Number((row as { c?: number } | undefined)?.c ?? 0);
  }

  /**
   * Drains the deferred conflict queue in one transaction. Each drained memory is compared
   * against the same 50-row window the synchronous path would have used, so 'sync' and
   * 'deferred' converge on identical memory_conflicts rows.
   */
  drainConflicts(batchSize: number = 20): { drained: number; created: number } {
    const limit = Math.max(0, Math.floor(batchSize));
    if (limit === 0) return { drained: 0, created: 0 };

    const rows = this.db.prepare(`
      SELECT id, project_id, memory_id FROM memory_conflict_queue
      ORDER BY id ASC LIMIT ?
    `).all(limit) as unknown as Array<{ id: number; project_id: string; memory_id: string }>;
    if (rows.length === 0) return { drained: 0, created: 0 };

    let created = 0;
    this.db.exec('SAVEPOINT fastr_drain_conflicts');
    try {
      for (const row of rows) {
        const memory = this.db.prepare('SELECT title, content FROM main.memories WHERE id = ?').get(row.memory_id) as
          | { title: string; content: string }
          | undefined;
        if (memory) {
          created += this.recordConflicts(row.memory_id, row.project_id, memory.title, memory.content);
        }
        this.db.prepare('DELETE FROM memory_conflict_queue WHERE id = ?').run(row.id);
      }
      this.db.exec('RELEASE fastr_drain_conflicts');
    } catch (err) {
      this.db.exec('ROLLBACK TO fastr_drain_conflicts');
      this.db.exec('RELEASE fastr_drain_conflicts');
      throw err;
    }

    return { drained: rows.length, created };
  }

  getMemory(id: string): Memory | null {
    let row = this.db.prepare('SELECT * FROM memories WHERE id = ?').get(id) as unknown as Memory | undefined;
    if (!row && this.hasGlobalDb()) {
      row = this.db.prepare('SELECT * FROM global_db.memories WHERE id = ?').get(id) as unknown as Memory | undefined;
    }
    return row || null;
  }

  listActiveMemories(projectId: string, module?: string): Memory[] {
    let query = `
      SELECT * FROM memories
      WHERE (project_id = ? OR project_id = 'global')
        AND valid_to IS NULL
        AND status != 'superseded'
        AND status != 'dormant'
    `;
    const params: any[] = [projectId];

    if (module) {
      query += ' AND module = ?';
      params.push(module.trim().toLowerCase());
    }

    if (this.hasGlobalDb()) {
      let gQuery = `
        UNION ALL
        SELECT * FROM global_db.memories
        WHERE valid_to IS NULL
          AND status != 'superseded'
          AND status != 'dormant'
      `;
      if (module) {
        gQuery += ' AND module = ?';
        params.push(module.trim().toLowerCase());
      }
      query += gQuery;
    }

    query += ' ORDER BY pinned DESC, reward_score DESC, created_at DESC';

    return this.db.prepare(query).all(...params) as unknown as Memory[];
  }

  listTraps(projectId: string): Memory[] {
    let query = `
      SELECT * FROM memories
      WHERE (project_id = ? OR project_id = 'global')
        AND kind = 'error_trap'
        AND valid_to IS NULL
        AND status != 'superseded'
        AND status != 'dormant'
    `;
    if (this.hasGlobalDb()) {
      query += `
        UNION ALL
        SELECT * FROM global_db.memories
        WHERE kind = 'error_trap'
          AND valid_to IS NULL
          AND status != 'superseded'
          AND status != 'dormant'
      `;
    }
    query += ' ORDER BY reward_score DESC, created_at DESC';
    return this.db.prepare(query).all(projectId) as unknown as Memory[];
  }

  supersedeMemory(
    oldMemoryId: string,
    newTitle: string,
    newContent: string,
    reason: string,
    files?: string[]
  ): { oldMemory: Memory; newMemory: Memory } {
    const newId = `mem_${crypto.randomBytes(4).toString('hex')}`;
    const nowIso = new Date().toISOString();

    // IMMEDIATE takes the write lock up front so the read below cannot go stale.
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const table = this.locateMemoryTable(oldMemoryId);
      const oldMem = table ? this.getMemory(oldMemoryId) : null;
      if (!table || !oldMem) {
        throw new Error(`Memory not found: ${oldMemoryId}`);
      }
      const inGlobal = table === 'global_db.memories';

      // 1. Mark old memory as superseded (only if it is still the live head of its chain)
      const res = this.db.prepare(`
        UPDATE ${table}
        SET valid_to = ?,
            status = 'superseded',
            superseded_by_id = ?,
            superseded_reason = ?
        WHERE id = ? AND valid_to IS NULL
      `).run(nowIso, newId, reason, oldMemoryId);
      if (Number(res.changes) === 0) {
        throw new Error(
          `Memory ${oldMemoryId} is no longer active (already superseded by ${oldMem.superseded_by_id ?? 'another update'}); supersede the current version instead.`
        );
      }

      // 2. Insert new memory with verified status and authentic cryptographic provenance
      const provHash = computeProvenanceHash({
        projectId: oldMem.project_id,
        agentId: oldMem.agent_id,
        module: oldMem.module,
        kind: oldMem.kind,
        title: newTitle,
        content: newContent,
        createdAt: nowIso
      });

      this.db.prepare(`
        INSERT INTO ${table} (
          id, project_id, agent_id, module, kind, title, content, status, pinned, reward_score, source_event_ids, created_at, provenance_hash
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'verified', ?, ?, ?, ?, ?)
      `).run(
        newId,
        oldMem.project_id,
        oldMem.agent_id,
        oldMem.module,
        oldMem.kind,
        newTitle,
        newContent,
        oldMem.pinned,
        oldMem.reward_score,
        oldMem.source_event_ids,
        nowIso,
        provHash
      );

      // 3. Link files
      const targetFiles = files && files.length > 0 ? files : this.getFilesForMemory(oldMemoryId);
      if (targetFiles.length > 0) {
        this.linkFiles(newId, targetFiles, undefined, inGlobal);
      }

      this.db.exec('COMMIT');

      const oldMemory = this.getMemory(oldMemoryId)!;
      const newMemory = this.getMemory(newId)!;

      globalBroadcaster.broadcast('memory_updated', { id: oldMemoryId, status: 'superseded', superseded_by: newId });
      globalBroadcaster.broadcast('memory_created', newMemory);

      return {
        oldMemory,
        newMemory
      };
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  updateFeedback(
    memoryId: string,
    outcome: 'good' | 'bad',
    note?: string
  ): {
    reward_score: number;
    status: string;
    confidence_tier: ConfidenceTier;
    bad_streak: number;
    dormant: boolean;
  } {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const table = this.locateMemoryTable(memoryId);
      const mem = table ? this.getMemory(memoryId) : null;
      if (!table || !mem) {
        throw new Error(`Memory not found: ${memoryId}`);
      }

      const rewardBefore = Number(mem.reward_score);
      const statusBefore = mem.status;
      let newScore = rewardBefore;
      let badStreak = 0;

      if (outcome === 'good') {
        newScore = Math.min(3.0, Number((rewardBefore + 0.2).toFixed(2)));
      } else {
        newScore = Math.max(0.1, Number((rewardBefore - 0.5).toFixed(2)));
        // Count consecutive bad outcomes from the append-only feedback log.
        const recent = this.db.prepare(`
          SELECT outcome FROM memory_feedback
          WHERE memory_id = ?
          ORDER BY created_at DESC, rowid DESC
          LIMIT 2
        `).all(memoryId) as Array<{ outcome: string }>;
        badStreak = 1;
        for (const row of recent) {
          if (row.outcome !== 'bad') break;
          badStreak += 1;
        }
      }

      let newStatus: Memory['status'] = statusBefore;
      if (outcome === 'bad' && badStreak >= 3 && statusBefore !== 'superseded') {
        newStatus = 'dormant';
      }

      const res = this.db.prepare(`
        UPDATE ${table}
        SET reward_score = ?, status = ?
        WHERE id = ?
      `).run(newScore, newStatus, memoryId);
      if (Number(res.changes) === 0) {
        throw new Error(`Memory not found: ${memoryId}`);
      }

      const tier = confidenceTier({ status: newStatus, reward_score: newScore });
      this.db.prepare(`
        INSERT INTO memory_feedback (
          id, project_id, memory_id, outcome, note, reward_before, reward_after,
          status_before, status_after, confidence_tier, bad_streak, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        `fb_${crypto.randomBytes(4).toString('hex')}`,
        mem.project_id,
        memoryId,
        outcome,
        note ? scrubSecrets(note) : null,
        rewardBefore,
        newScore,
        statusBefore,
        newStatus,
        tier,
        badStreak,
        new Date().toISOString()
      );

      this.db.exec('COMMIT');
      return {
        reward_score: newScore,
        status: newStatus,
        confidence_tier: tier,
        bad_streak: badStreak,
        dormant: newStatus === 'dormant'
      };
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  pinMemory(memoryId: string, pinned: boolean): { success: boolean; pinned: boolean; error?: string } {
    const table = this.locateMemoryTable(memoryId);
    if (!table) return { success: false, pinned, error: `Memory not found: ${memoryId}` };
    const res = this.db.prepare(`
      UPDATE ${table}
      SET pinned = ?
      WHERE id = ?
    `).run(pinned ? 1 : 0, memoryId);
    if (Number(res.changes) === 0) return { success: false, pinned, error: `Memory not found: ${memoryId}` };
    return { success: true, pinned };
  }

  forgetMemory(memoryId: string, reason: string = 'User requested forget via dashboard'): { success: boolean; error?: string } {
    const table = this.locateMemoryTable(memoryId);
    if (!table) return { success: false, error: `Memory not found: ${memoryId}` };
    const nowIso = new Date().toISOString();
    const res = this.db.prepare(`
      UPDATE ${table}
      SET status = 'superseded', valid_to = ?, superseded_reason = ?
      WHERE id = ? AND valid_to IS NULL
    `).run(nowIso, reason, memoryId);
    if (Number(res.changes) === 0) return { success: false, error: `Memory ${memoryId} is already inactive` };
    return { success: true };
  }

  verifyStaging(projectId: string): number {
    const res = this.db.prepare(`
      UPDATE memories
      SET status = 'verified'
      WHERE project_id = ? AND status = 'staging'
    `).run(projectId);

    return Number(res.changes);
  }

  incrementRetrieval(memoryIds: string[]): void {
    if (memoryIds.length === 0) return;
    const nowIso = new Date().toISOString();
    const placeholders = memoryIds.map(() => '?').join(',');
    this.db.prepare(`
      UPDATE memories
      SET retrieval_count = retrieval_count + 1,
          last_recalled_at = ?
      WHERE id IN (${placeholders})
    `).run(nowIso, ...memoryIds);
  }

  updateEmbedding(memoryId: string, embedding: Float32Array): void {
    const buffer = Buffer.from(embedding.buffer, embedding.byteOffset, embedding.byteLength);
    this.db.prepare(`
      UPDATE memories
      SET embedding = ?, embedded = 1
      WHERE id = ?
    `).run(buffer, memoryId);
  }

  // --- FILE LINKS ---

  linkFiles(memoryId: string, files: string[], symbols?: string[], inGlobal: boolean = false): void {
    const table = inGlobal && this.hasGlobalDb() ? 'global_db.file_links' : 'file_links';
    const stmt = this.db.prepare(`
      INSERT OR IGNORE INTO ${table} (memory_id, file_path, symbol_name)
      VALUES (?, ?, ?)
    `);

    const symbolList = symbols && symbols.length > 0 ? symbols : [''];
    for (const f of files) {
      const normalized = f.replace(/\\/g, '/').trim();
      if (!normalized) continue;
      for (const s of symbolList) {
        stmt.run(memoryId, normalized, s);
      }
    }
  }

  getFilesForMemory(memoryId: string): string[] {
    let rows = this.db.prepare(`
      SELECT DISTINCT file_path FROM file_links WHERE memory_id = ?
    `).all(memoryId) as { file_path: string }[];
    if (rows.length === 0 && this.hasGlobalDb()) {
      rows = this.db.prepare(`
        SELECT DISTINCT file_path FROM global_db.file_links WHERE memory_id = ?
      `).all(memoryId) as { file_path: string }[];
    }
    return rows.map((r) => r.file_path);
  }

  getMemoriesForFile(projectId: string, filePath: string): Memory[] {
    const targetPath = filePath.replace(/\\/g, '/').trim();
    let innerQuery = `
      SELECT m.*
      FROM memories m
      JOIN file_links fl ON fl.memory_id = m.id
      WHERE (m.project_id = ? OR m.project_id = 'global')
        AND fl.file_path = ?
        AND m.valid_to IS NULL
        AND m.status != 'superseded'
        AND m.status != 'dormant'
    `;
    const params: any[] = [projectId, targetPath];

    if (this.hasGlobalDb()) {
      innerQuery += `
        UNION ALL
        SELECT gm.*
        FROM global_db.memories gm
        JOIN global_db.file_links gfl ON gfl.memory_id = gm.id
        WHERE gfl.file_path = ?
          AND gm.valid_to IS NULL
          AND gm.status != 'superseded'
          AND gm.status != 'dormant'
      `;
      params.push(targetPath);
    }

    const query = `SELECT * FROM (${innerQuery}) ORDER BY kind = 'error_trap' DESC, reward_score DESC`;
    const rows = this.db.prepare(query).all(...params) as unknown as Memory[];

    return rows;
  }

  listGlobalMemories(): Memory[] {
    if (this.hasGlobalDb()) {
      return this.db.prepare(`
        SELECT * FROM global_db.memories
        WHERE valid_to IS NULL AND status != 'superseded'
        ORDER BY reward_score DESC, created_at DESC
      `).all() as unknown as Memory[];
    }
    return this.db.prepare(`
      SELECT * FROM memories
      WHERE project_id = 'global' AND valid_to IS NULL AND status != 'superseded'
      ORDER BY reward_score DESC, created_at DESC
    `).all() as unknown as Memory[];
  }

  getTimeline(projectId: string, options: { module?: string; limit?: number } = {}): Array<{
    id: string;
    kind: string;
    title: string;
    module: string;
    status: string;
    rewardScore: number;
    createdAt: string;
    validTo: string | null;
    supersededById: string | null;
    supersededReason: string | null;
    linkedFiles: string[];
  }> {
    const limit = options.limit || 50;
    let query = `
      SELECT id, kind, title, module, status, reward_score, created_at, valid_to, superseded_by_id, superseded_reason
      FROM memories
      WHERE project_id = ?
    `;
    const params: any[] = [projectId];

    if (options.module) {
      query += ` AND module = ?`;
      params.push(options.module.trim().toLowerCase());
    }

    query += ` ORDER BY created_at DESC LIMIT ?`;
    params.push(limit);

    const rows = this.db.prepare(query).all(...params) as any[];

    return rows.map((r) => ({
      id: r.id,
      kind: r.kind,
      title: r.title,
      module: r.module,
      status: r.status,
      rewardScore: r.reward_score,
      createdAt: r.created_at,
      validTo: r.valid_to,
      supersededById: r.superseded_by_id,
      supersededReason: r.superseded_reason,
      linkedFiles: this.getFilesForMemory(r.id),
    }));
  }

  queryGraph(projectId: string, options: { startFilePath?: string; depth?: number } = {}): {
    nodes: Array<{ id: string; label: string; type: 'file' | 'memory' | 'entity'; kind?: string; module?: string; score?: number }>;
    edges: Array<{ source: string; target: string; relation: string }>;
  } {
    const { startFilePath, depth = 2 } = options;

    if (startFilePath) {
      // 1-hop: memories directly linked to this file
      const initialMemories = this.getMemoriesForFile(projectId, startFilePath);
      const memoryIds = new Set(initialMemories.map((m) => m.id));
      const filePaths = new Set<string>([startFilePath]);

      // 2-hop: other files linked to these memories
      if (depth >= 2) {
        for (const mId of memoryIds) {
          const files = this.getFilesForMemory(mId);
          for (const f of files) {
            filePaths.add(f);
          }
        }
        // and memories linked to those discovered files
        for (const f of filePaths) {
          const mems = this.getMemoriesForFile(projectId, f);
          for (const m of mems) {
            memoryIds.add(m.id);
          }
        }
      }

      const nodes: Array<{ id: string; label: string; type: 'file' | 'memory'; kind?: string; module?: string; score?: number }> = [];
      const edges: Array<{ source: string; target: string; relation: string }> = [];

      for (const f of filePaths) {
        nodes.push({ id: f, label: f, type: 'file' });
      }

      for (const mId of memoryIds) {
        const mem = this.getMemory(mId);
        if (mem) {
          nodes.push({ id: mem.id, label: mem.title, type: 'memory', kind: mem.kind, module: mem.module, score: mem.reward_score });
          const linkedFiles = this.getFilesForMemory(mem.id);
          for (const lf of linkedFiles) {
            if (filePaths.has(lf)) {
              edges.push({ source: mem.id, target: lf, relation: 'links' });
            }
          }
        }
      }

      return { nodes, edges };
    }

    // Complete graph
    const memories = this.listActiveMemories(projectId);
    const fileLinks = this.db.prepare(`
      SELECT fl.memory_id, fl.file_path, m.title, m.kind, m.module, m.reward_score
      FROM file_links fl
      JOIN memories m ON m.id = fl.memory_id
      WHERE m.project_id = ? AND m.valid_to IS NULL
    `).all(projectId) as any[];

    const nodesMap = new Map<string, { id: string; label: string; type: 'file' | 'memory' | 'entity'; kind?: string; module?: string; score?: number }>();
    const edges: Array<{ source: string; target: string; relation: string }> = [];

    for (const m of memories) {
      nodesMap.set(m.id, { id: m.id, label: m.title, type: 'memory', kind: m.kind, module: m.module, score: m.reward_score });
    }

    for (const fl of fileLinks) {
      if (!nodesMap.has(fl.file_path)) {
        nodesMap.set(fl.file_path, { id: fl.file_path, label: fl.file_path, type: 'file' });
      }
      edges.push({ source: fl.memory_id, target: fl.file_path, relation: 'links' });
    }

    const entities = this.getEntities(projectId);
    for (const ent of entities) {
      if (!nodesMap.has(ent.id)) {
        nodesMap.set(ent.id, { id: ent.id, label: ent.name, type: 'entity', kind: ent.entity_type });
      }
    }

    const graphEdges = this.db.prepare(`
      SELECT source_id, target_id, edge_type FROM graph_edges WHERE project_id = ?
    `).all(projectId) as Array<{ source_id: string; target_id: string; edge_type: string }>;
    for (const ge of graphEdges) {
      edges.push({ source: ge.source_id, target: ge.target_id, relation: ge.edge_type });
    }

    return {
      nodes: Array.from(nodesMap.values()),
      edges,
    };
  }

  // --- HANDOFFS ---

  saveHandoff(handoff: Handoff): Handoff {
    const activeFilesJson = typeof handoff.active_files === 'string'
      ? handoff.active_files
      : JSON.stringify(handoff.active_files || []);

    const res = this.db.prepare(`
      INSERT INTO handoffs (project_id, session_id, task_title, summary, next_step, active_files)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      handoff.project_id,
      handoff.session_id,
      handoff.task_title,
      handoff.summary,
      handoff.next_step,
      activeFilesJson
    );

    return {
      ...handoff,
      id: Number(res.lastInsertRowid),
      created_at: new Date().toISOString()
    };
  }

  getLatestHandoff(projectId: string): Handoff | null {
    const row = this.db.prepare(`
      SELECT * FROM handoffs WHERE project_id = ? ORDER BY id DESC LIMIT 1
    `).get(projectId) as unknown as Handoff | undefined;

    return row || null;
  }

  // --- STATUS ---

  getStatus(projectId: string): ProjectStatus {
    const counts = this.db.prepare(`
      SELECT
        COUNT(CASE WHEN valid_to IS NULL AND status = 'verified' THEN 1 END) as activeCount,
        COUNT(CASE WHEN valid_to IS NULL AND status = 'staging' THEN 1 END) as stagingCount,
        COUNT(CASE WHEN status = 'superseded' THEN 1 END) as supersededCount,
        COUNT(CASE WHEN status = 'dormant' THEN 1 END) as dormantCount,
        COUNT(CASE WHEN embedded = 1 THEN 1 END) as embeddedCount,
        COUNT(*) as totalMemories
      FROM memories
      WHERE project_id = ?
    `).get(projectId) as any;

    const rawEvents = this.db.prepare(`
      SELECT COUNT(*) as count FROM raw_events WHERE project_id = ?
    `).get(projectId) as any;

    const total = counts.totalMemories || 0;
    const embedded = counts.embeddedCount || 0;
    const coverage = total > 0 ? Math.round((embedded / total) * 100) : 100;

    const pendingSpool = this.spool ? this.spool.pendingCount() : 0;

    return {
      projectId,
      activeCount: counts.activeCount || 0,
      stagingCount: counts.stagingCount || 0,
      supersededCount: counts.supersededCount || 0,
      dormantCount: counts.dormantCount || 0,
      rawEventCount: rawEvents.count || 0,
      pendingSpoolCount: pendingSpool,
      embeddingCoveragePercent: coverage,
      pendingConflictCount: this.pendingConflictCount(projectId),
      pendingNerCount: this.pendingNerCount(projectId),
      pendingFtsCount: this.pendingFtsCount()
    };
  }

  // --- SNAPSHOTS & TIME TRAVEL ---

  createSnapshot(projectId: string, tag: string, description?: string): { id: string; tag: string; memoryCount: number; createdAt: string } {
    const id = `snap_${crypto.randomBytes(4).toString('hex')}`;
    // Only this project's local rows: rollback rewrites main.memories, so global/federated rows
    // must never be captured (they would be copied into the local DB on restore).
    const memories = this.db.prepare(`
      SELECT * FROM main.memories
      WHERE project_id = ? AND valid_to IS NULL
      ORDER BY pinned DESC, reward_score DESC, created_at DESC
    `).all(projectId) as unknown as Memory[];
    for (const m of memories) m.embedding = null;
    const fileLinks = this.db.prepare(`
      SELECT fl.* FROM main.file_links fl
      JOIN main.memories m ON m.id = fl.memory_id
      WHERE m.project_id = ? AND m.valid_to IS NULL
    `).all(projectId);

    const state = {
      memories,
      fileLinks,
      timestamp: new Date().toISOString()
    };

    const stateJson = JSON.stringify(state);
    const createdAt = new Date().toISOString();

    this.db.prepare(`
      INSERT INTO memory_snapshots (id, project_id, tag, description, memory_count, state_json, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, projectId, tag, description || null, memories.length, stateJson, createdAt);

    return { id, tag, memoryCount: memories.length, createdAt };
  }

  listSnapshots(projectId: string): Array<{ id: string; tag: string; description: string | null; memoryCount: number; createdAt: string }> {
    const rows = this.db.prepare(`
      SELECT id, tag, description, memory_count as memoryCount, created_at as createdAt
      FROM memory_snapshots
      WHERE project_id = ?
      ORDER BY created_at DESC
    `).all(projectId) as any[];

    return rows;
  }

  getSnapshot(snapshotId: string): any | null {
    const row = this.db.prepare(`
      SELECT * FROM memory_snapshots WHERE id = ?
    `).get(snapshotId) as any | undefined;

    return row || null;
  }

  rollbackToSnapshot(projectId: string, snapshotId: string): { restoredCount: number; snapshotTag: string } {
    const snap = this.getSnapshot(snapshotId);
    if (!snap) {
      throw new Error(`Snapshot not found: ${snapshotId}`);
    }

    const state = JSON.parse(snap.state_json);
    // Older snapshots may contain global rows; never restore those into this project.
    const targetMemories: Memory[] = (state.memories || []).filter((m: Memory) => m.project_id === projectId);
    const restoredIds = new Set(targetMemories.map((m) => m.id));
    const targetLinks: any[] = state.fileLinks || [];

    this.db.exec('BEGIN TRANSACTION');
    try {
      // 1. Mark all current active memories valid_to = now (superseded by rollback)
      const nowIso = new Date().toISOString();
      this.db.prepare(`
        UPDATE memories
        SET valid_to = ?, status = 'superseded', superseded_reason = ?
        WHERE project_id = ? AND valid_to IS NULL
      `).run(nowIso, `Rollback to snapshot ${snap.tag} (${snap.id})`, projectId);

      // 2. Re-insert or restore the snapshot memories
      for (const m of targetMemories) {
        this.db.prepare(`
          INSERT INTO memories (
            id, project_id, agent_id, module, kind, title, content, status, pinned, reward_score,
            source_event_ids, valid_from, valid_to, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?)
          ON CONFLICT(id) DO UPDATE SET
            valid_to = NULL,
            status = excluded.status,
            pinned = excluded.pinned,
            reward_score = excluded.reward_score,
            superseded_by_id = NULL,
            superseded_reason = NULL
        `).run(
          m.id,
          m.project_id,
          m.agent_id,
          m.module,
          m.kind,
          m.title,
          m.content,
          m.status,
          m.pinned,
          m.reward_score,
          m.source_event_ids,
          nowIso,
          m.created_at
        );
      }

      // 3. Restore file links
      for (const fl of targetLinks) {
        if (!restoredIds.has(fl.memory_id)) continue;
        this.db.prepare(`
          INSERT OR IGNORE INTO file_links (memory_id, file_path, symbol_name)
          VALUES (?, ?, ?)
        `).run(fl.memory_id, fl.file_path, fl.symbol_name || '');
      }

      this.db.exec('COMMIT');
      return { restoredCount: targetMemories.length, snapshotTag: snap.tag };
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  // --- CONFLICTS & NER ---

  listConflicts(projectId: string, status: 'open' | 'resolved' | 'ignored' = 'open'): MemoryConflict[] {
    const rows = this.db.prepare(`
      SELECT * FROM memory_conflicts
      WHERE project_id = ? AND status = ?
      ORDER BY id DESC
    `).all(projectId, status) as unknown as MemoryConflict[];
    return rows;
  }

  resolveConflict(
    conflictId: number,
    keepMemoryId: string,
    forgetLoser: boolean = false,
    reason?: string
  ): { success: boolean; keptId: string; loserId: string } {
    const conflict = this.db.prepare('SELECT * FROM memory_conflicts WHERE id = ?').get(conflictId) as unknown as MemoryConflict | undefined;
    if (!conflict) {
      throw new Error(`Conflict ${conflictId} not found`);
    }
    if (conflict.status !== 'open') {
      throw new Error(`Conflict ${conflictId} is already ${conflict.status}`);
    }
    if (keepMemoryId !== conflict.memory_a_id && keepMemoryId !== conflict.memory_b_id) {
      throw new Error(`Memory ${keepMemoryId} is not part of conflict ${conflictId}`);
    }

    const loserId = conflict.memory_a_id === keepMemoryId ? conflict.memory_b_id : conflict.memory_a_id;
    const nowIso = new Date().toISOString();
    const resolutionReason = reason || `Resolved conflict #${conflictId} in favor of ${keepMemoryId}`;
    const loserTable = this.locateMemoryTable(loserId) ?? 'memories';

    this.db.exec('BEGIN TRANSACTION');
    try {
      // 1. Mark conflict as resolved
      this.db.prepare(`
        UPDATE memory_conflicts
        SET status = 'resolved', resolved_winner_id = ?, resolved_at = ?
        WHERE id = ?
      `).run(keepMemoryId, nowIso, conflictId);

      // 2. Handle loser memory
      if (forgetLoser) {
        // Soft-delete / supersede loser
        this.db.prepare(`
          UPDATE ${loserTable}
          SET valid_to = ?, status = 'superseded', superseded_by_id = ?, superseded_reason = ?
          WHERE id = ? AND valid_to IS NULL
        `).run(nowIso, keepMemoryId, resolutionReason, loserId);
      } else {
        // Weaken loser reward score by -0.4 (same 0.1 floor as updateFeedback)
        this.db.prepare(`
          UPDATE ${loserTable}
          SET reward_score = MAX(0.1, reward_score - 0.4)
          WHERE id = ?
        `).run(loserId);
      }

      this.db.exec('COMMIT');
      return { success: true, keptId: keepMemoryId, loserId };
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  getEntities(projectId: string): Entity[] {
    const rows = this.db.prepare(`
      SELECT * FROM entities WHERE project_id = ? ORDER BY name ASC
    `).all(projectId) as unknown as Entity[];
    return rows;
  }

  // --- PREDICTIONS & PLANNING FALLACY ---

  createPrediction(params: {
    projectId: string;
    classTag: string;
    claimText: string;
    estimateValue?: number | null;
    estimateUnit?: string | null;
  }): Prediction {
    const res = this.db.prepare(`
      INSERT INTO predictions (project_id, class_tag, claim_text, estimate_value, estimate_unit)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      params.projectId,
      params.classTag.trim().toLowerCase(),
      params.claimText,
      params.estimateValue ?? null,
      params.estimateUnit ?? null
    );

    const row = this.db.prepare('SELECT * FROM predictions WHERE id = ?').get(res.lastInsertRowid) as unknown as Prediction;
    return row;
  }

  closePrediction(id: number, actualValue: number): Prediction {
    const nowIso = new Date().toISOString();
    this.db.prepare(`
      UPDATE predictions
      SET actual_value = ?, closure_state = 'closed', closed_at = ?
      WHERE id = ?
    `).run(actualValue, nowIso, id);

    const row = this.db.prepare('SELECT * FROM predictions WHERE id = ?').get(id) as unknown as Prediction | undefined;
    if (!row) throw new Error(`Prediction #${id} not found`);
    return row;
  }

  listPredictions(projectId: string, options?: { classTag?: string; state?: 'open' | 'closed' | 'closed-unknown' }): Prediction[] {
    let sql = 'SELECT * FROM predictions WHERE project_id = ?';
    const params: any[] = [projectId];

    if (options?.classTag) {
      sql += ' AND class_tag = ?';
      params.push(options.classTag.trim().toLowerCase());
    }
    if (options?.state) {
      sql += ' AND closure_state = ?';
      params.push(options.state);
    }

    sql += ' ORDER BY id DESC';
    return this.db.prepare(sql).all(...params) as unknown as Prediction[];
  }

  getPredictionBaserate(projectId: string, classTag: string): PredictionBaserate | null {
    const normalizedTag = classTag.trim().toLowerCase();
    const rows = this.db.prepare(`
      SELECT estimate_value, actual_value
      FROM predictions
      WHERE project_id = ? AND class_tag = ? AND closure_state = 'closed'
    `).all(projectId, normalizedTag) as Array<{ estimate_value: number | null; actual_value: number | null }>;

    return calculateBaserate(normalizedTag, rows);
  }

  // --- MULTI-AGENT ACTION DAG ---

  createAction(params: {
    id?: string;
    projectId: string;
    title: string;
    description?: string;
    priority?: number;
    assignedTo?: string | null;
    requires?: string[];
    conflictsWith?: string[];
  }): Action {
    const actionId = params.id || `act_${crypto.randomUUID().slice(0, 12)}`;
    const priority = params.priority ?? 5;
    const description = params.description ?? '';
    const assignedTo = params.assignedTo ?? null;

    this.db.exec('BEGIN TRANSACTION');
    try {
      this.db.prepare(`
        INSERT INTO actions (id, project_id, title, description, status, priority, assigned_to)
        VALUES (?, ?, ?, ?, 'pending', ?, ?)
      `).run(actionId, params.projectId, params.title, description, priority, assignedTo);

      if (params.requires && params.requires.length > 0) {
        const stmt = this.db.prepare(`
          INSERT OR IGNORE INTO action_edges (source_action_id, target_action_id, edge_type)
          VALUES (?, ?, 'requires')
        `);
        for (const req of params.requires) {
          stmt.run(actionId, req);
        }
      }

      if (params.conflictsWith && params.conflictsWith.length > 0) {
        const stmt = this.db.prepare(`
          INSERT OR IGNORE INTO action_edges (source_action_id, target_action_id, edge_type)
          VALUES (?, ?, 'conflicts_with')
        `);
        for (const conf of params.conflictsWith) {
          stmt.run(actionId, conf);
        }
      }

      this.db.exec('COMMIT');
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }

    const created = this.getAction(actionId)!;
    globalBroadcaster.broadcast('action_created', created);
    return created;
  }

  getAction(id: string): (Action & { requires: string[]; unlocks: string[]; conflictsWith: string[] }) | null {
    const action = this.db.prepare('SELECT * FROM actions WHERE id = ?').get(id) as Action | undefined;
    if (!action) return null;

    const requiresRows = this.db.prepare(`
      SELECT target_action_id FROM action_edges WHERE source_action_id = ? AND edge_type = 'requires'
    `).all(id) as Array<{ target_action_id: string }>;

    const unlocksRows = this.db.prepare(`
      SELECT source_action_id FROM action_edges WHERE target_action_id = ? AND edge_type = 'requires'
    `).all(id) as Array<{ source_action_id: string }>;

    const conflictsRows = this.db.prepare(`
      SELECT target_action_id FROM action_edges WHERE source_action_id = ? AND edge_type = 'conflicts_with'
      UNION
      SELECT source_action_id FROM action_edges WHERE target_action_id = ? AND edge_type = 'conflicts_with'
    `).all(id, id) as Array<{ target_action_id: string }>;

    return {
      ...action,
      requires: requiresRows.map((r) => r.target_action_id),
      unlocks: unlocksRows.map((r) => r.source_action_id),
      conflictsWith: conflictsRows.map((r) => (r as any).target_action_id),
    };
  }

  updateAction(id: string, opts: {
    status?: 'pending' | 'active' | 'done' | 'blocked' | 'cancelled';
    assignedTo?: string | null;
    crystallizedInto?: string | null;
    priority?: number;
    description?: string;
  }): Action | null {
    const existing = this.db.prepare('SELECT * FROM actions WHERE id = ?').get(id) as Action | undefined;
    if (!existing) return null;

    const sets: string[] = [];
    const params: any[] = [];

    if (opts.status !== undefined) {
      sets.push('status = ?');
      params.push(opts.status);
      if (opts.status === 'done') {
        sets.push('completed_at = ?');
        params.push(new Date().toISOString());
      }
    }
    if (opts.assignedTo !== undefined) {
      sets.push('assigned_to = ?');
      params.push(opts.assignedTo);
    }
    if (opts.crystallizedInto !== undefined) {
      sets.push('crystallized_into = ?');
      params.push(opts.crystallizedInto);
    }
    if (opts.priority !== undefined) {
      sets.push('priority = ?');
      params.push(opts.priority);
    }
    if (opts.description !== undefined) {
      sets.push('description = ?');
      params.push(opts.description);
    }

    if (sets.length > 0) {
      params.push(id);
      this.db.prepare(`UPDATE actions SET ${sets.join(', ')} WHERE id = ?`).run(...params);
    }

    const updated = this.getAction(id);
    if (updated) {
      if (opts.assignedTo !== undefined && opts.assignedTo !== existing.assigned_to) {
        globalBroadcaster.broadcast('action_claimed', {
          actionId: id,
          title: updated.title,
          claimedBy: opts.assignedTo,
          claimedAt: new Date().toISOString()
        });
      }
      if (opts.status === 'done') {
        globalBroadcaster.broadcast('action_completed', {
          actionId: id,
          title: updated.title,
          crystallizedInto: updated.crystallized_into
        });
      }
      globalBroadcaster.broadcast('action_updated', updated);
    }

    return updated;
  }

  listActions(projectId: string, filter?: { status?: 'pending' | 'active' | 'done' | 'blocked' | 'cancelled'; assignedTo?: string }): Action[] {
    let sql = 'SELECT * FROM actions WHERE project_id = ?';
    const params: any[] = [projectId];

    if (filter?.status) {
      sql += ' AND status = ?';
      params.push(filter.status);
    }
    if (filter?.assignedTo) {
      sql += ' AND assigned_to = ?';
      params.push(filter.assignedTo);
    }

    sql += ' ORDER BY priority DESC, created_at ASC';
    return this.db.prepare(sql).all(...params) as unknown as Action[];
  }

  getFrontier(projectId: string): Action[] {
    const query = `
      SELECT a.*
      FROM actions a
      WHERE a.project_id = ?
        AND a.status IN ('pending', 'active')
        AND NOT EXISTS (
          SELECT 1
          FROM action_edges e
          JOIN actions prereq ON prereq.id = e.target_action_id
          WHERE e.source_action_id = a.id
            AND e.edge_type = 'requires'
            AND prereq.status != 'done'
        )
        AND NOT EXISTS (
          SELECT 1
          FROM action_edges e
          JOIN actions conf ON (
            (e.source_action_id = a.id AND conf.id = e.target_action_id)
            OR
            (e.target_action_id = a.id AND conf.id = e.source_action_id)
          )
          WHERE e.edge_type = 'conflicts_with'
            AND conf.status = 'active'
            AND conf.id != a.id
        )
      ORDER BY a.priority DESC, a.created_at ASC
    `;
    return this.db.prepare(query).all(projectId) as unknown as Action[];
  }

  getNextAction(projectId: string, agentId?: string): Action | null {
    if (!agentId) {
      const frontier = this.getFrontier(projectId);
      return frontier.length > 0 ? frontier[0] : null;
    }

    let claimedId: string | null = null;
    let ownActive: Action | null = null;
    // Hold the write lock across read + claim so two agents can never claim the same action.
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const claim = this.db.prepare(`
        UPDATE actions SET status = 'active', assigned_to = ?
        WHERE id = ? AND status = 'pending'
      `);
      for (const candidate of this.getFrontier(projectId)) {
        if (candidate.status === 'active') {
          if (candidate.assigned_to === agentId) {
            ownActive = candidate;
            break;
          }
          continue; // claimed by another agent
        }
        if (Number(claim.run(agentId, candidate.id).changes) > 0) {
          claimedId = candidate.id;
          break;
        }
      }
      this.db.exec('COMMIT');
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }

    if (ownActive) return ownActive;
    if (!claimedId) return null;

    const claimed = this.getAction(claimedId);
    if (claimed) {
      globalBroadcaster.broadcast('action_claimed', {
        actionId: claimedId,
        title: claimed.title,
        claimedBy: agentId,
        claimedAt: new Date().toISOString()
      });
      globalBroadcaster.broadcast('action_updated', claimed);
    }
    return claimed;
  }

  // --- BOUNDED WORKING MEMORY SLOTS ---

  setSlot(projectId: string, slotKey: string, content: string, sizeLimit: number = 4000): MemorySlot {
    const normalizedKey = slotKey.trim().toLowerCase();
    if (content.length > sizeLimit) {
      throw new Error(`Content length (${content.length}) exceeds slot size limit (${sizeLimit} chars). Summarize before storing.`);
    }

    const nowIso = new Date().toISOString();
    this.db.prepare(`
      INSERT INTO memory_slots (project_id, slot_key, content, size_limit, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(project_id, slot_key) DO UPDATE SET
        content = excluded.content,
        size_limit = excluded.size_limit,
        updated_at = excluded.updated_at
    `).run(projectId, normalizedKey, content, sizeLimit, nowIso);

    return this.getSlot(projectId, normalizedKey)!;
  }

  getSlot(projectId: string, slotKey: string): MemorySlot | null {
    const normalizedKey = slotKey.trim().toLowerCase();
    const row = this.db.prepare(`
      SELECT * FROM memory_slots WHERE project_id = ? AND slot_key = ?
    `).get(projectId, normalizedKey) as unknown as MemorySlot | undefined;
    return row ?? null;
  }

  listSlots(projectId: string): MemorySlot[] {
    return this.db.prepare(`
      SELECT * FROM memory_slots WHERE project_id = ? ORDER BY slot_key ASC
    `).all(projectId) as unknown as MemorySlot[];
  }

  deleteSlot(projectId: string, slotKey: string): boolean {
    const normalizedKey = slotKey.trim().toLowerCase();
    const res = this.db.prepare(`
      DELETE FROM memory_slots WHERE project_id = ? AND slot_key = ?
    `).run(projectId, normalizedKey);
    return res.changes > 0;
  }

  // --- CRYPTOGRAPHIC PROVENANCE VERIFICATION ---

  verifyMemoryProvenance(memoryId: string): {
    id: string;
    verified: boolean;
    signature: string | null;
    agentId: string;
    createdAt: string;
    reason: string;
  } {
    const mem = this.getMemory(memoryId);
    if (!mem) {
      return {
        id: memoryId,
        verified: false,
        signature: null,
        agentId: 'unknown',
        createdAt: '',
        reason: 'Memory not found'
      };
    }

    if (!mem.provenance_hash) {
      return {
        id: mem.id,
        verified: false,
        signature: null,
        agentId: mem.agent_id,
        createdAt: mem.created_at,
        reason: 'Legacy unsigned memory (no cryptographic provenance record)'
      };
    }

    const isValid = verifyProvenanceHash(mem.provenance_hash, {
      projectId: mem.project_id,
      agentId: mem.agent_id,
      module: mem.module,
      kind: mem.kind,
      title: mem.title,
      content: mem.content,
      createdAt: mem.created_at
    });

    return {
      id: mem.id,
      verified: isValid,
      signature: mem.provenance_hash,
      agentId: mem.agent_id,
      createdAt: mem.created_at,
      reason: isValid
        ? 'Signature valid: Authenticated author and unmodified canonical content'
        : 'Signature mismatch: Payload content, project, or author modified post-creation'
    };
  }
}

/** node:sqlite reports SQLITE_BUSY (5) / SQLITE_LOCKED (6) via errcode, possibly as an extended code. */
function isBusyError(err: any): boolean {
  const code = typeof err?.errcode === 'number' ? err.errcode & 0xff : -1;
  if (code === 5 || code === 6) return true;
  const msg = String(err?.message ?? '');
  return msg.includes('SQLITE_BUSY') || msg.includes('database is locked') || msg.includes('database table is locked');
}

function sameDbFile(attachedFile: string, requested: string): boolean {
  if (requested === ':memory:' || requested === '') return attachedFile === '';
  if (!attachedFile) return false;
  const a = path.resolve(attachedFile);
  const b = path.resolve(requested);
  return process.platform === 'win32' ? a.toLowerCase() === b.toLowerCase() : a === b;
}

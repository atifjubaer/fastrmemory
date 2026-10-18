import * as crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { RawEvent, Memory, FileLink, Handoff } from './schema.js';
import { SpoolManager } from './spool.js';

export interface CreateMemoryParams {
  projectId: string;
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
}

export class FastrRepository {
  private db: DatabaseSync;
  private spool?: SpoolManager;

  constructor(db: DatabaseSync, spool?: SpoolManager) {
    this.db = db;
    this.spool = spool;
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
      if (err.message && err.message.includes('SQLITE_BUSY') && this.spool) {
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
    const status = params.verified ? 'verified' : 'staging';
    const pinned = params.pinned ? 1 : 0;
    const sourceIds = JSON.stringify(params.sourceEventIds?.slice(-32) || []);

    this.db.prepare(`
      INSERT INTO memories (
        id, project_id, agent_id, module, kind, title, content, status, pinned, source_event_ids
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      params.projectId,
      params.agentId || 'default',
      module,
      params.kind,
      params.title,
      params.content,
      status,
      pinned,
      sourceIds
    );

    if (params.files && params.files.length > 0) {
      this.linkFiles(id, params.files, params.symbols);
    }

    return this.getMemory(id)!;
  }

  getMemory(id: string): Memory | null {
    const row = this.db.prepare('SELECT * FROM memories WHERE id = ?').get(id) as unknown as Memory | undefined;
    return row || null;
  }

  listActiveMemories(projectId: string, module?: string): Memory[] {
    let query = `
      SELECT * FROM memories
      WHERE project_id = ?
        AND valid_to IS NULL
        AND status != 'superseded'
        AND status != 'dormant'
    `;
    const params: any[] = [projectId];

    if (module) {
      query += ' AND module = ?';
      params.push(module.trim().toLowerCase());
    }

    query += ' ORDER BY pinned DESC, reward_score DESC, created_at DESC';

    return this.db.prepare(query).all(...params) as unknown as Memory[];
  }

  listTraps(projectId: string): Memory[] {
    const query = `
      SELECT * FROM memories
      WHERE project_id = ?
        AND kind = 'error_trap'
        AND valid_to IS NULL
        AND status != 'superseded'
        AND status != 'dormant'
      ORDER BY reward_score DESC, created_at DESC
    `;
    return this.db.prepare(query).all(projectId) as unknown as Memory[];
  }

  supersedeMemory(
    oldMemoryId: string,
    newTitle: string,
    newContent: string,
    reason: string,
    files?: string[]
  ): { oldMemory: Memory; newMemory: Memory } {
    const oldMem = this.getMemory(oldMemoryId);
    if (!oldMem) {
      throw new Error(`Memory not found: ${oldMemoryId}`);
    }

    const newId = `mem_${crypto.randomBytes(4).toString('hex')}`;
    const nowIso = new Date().toISOString();

    this.db.exec('BEGIN TRANSACTION');
    try {
      // 1. Mark old memory as superseded
      this.db.prepare(`
        UPDATE memories
        SET valid_to = ?,
            status = 'superseded',
            superseded_by_id = ?,
            superseded_reason = ?
        WHERE id = ?
      `).run(nowIso, newId, reason, oldMemoryId);

      // 2. Insert new memory with verified status
      this.db.prepare(`
        INSERT INTO memories (
          id, project_id, agent_id, module, kind, title, content, status, pinned, reward_score, source_event_ids
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'verified', ?, ?, ?)
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
        oldMem.source_event_ids
      );

      // 3. Link files
      const targetFiles = files && files.length > 0 ? files : this.getFilesForMemory(oldMemoryId);
      if (targetFiles.length > 0) {
        this.linkFiles(newId, targetFiles);
      }

      this.db.exec('COMMIT');

      return {
        oldMemory: this.getMemory(oldMemoryId)!,
        newMemory: this.getMemory(newId)!
      };
    } catch (err) {
      this.db.exec('ROLLBACK');
      throw err;
    }
  }

  updateFeedback(memoryId: string, outcome: 'good' | 'bad', note?: string): { reward_score: number; status: string } {
    const mem = this.getMemory(memoryId);
    if (!mem) {
      throw new Error(`Memory not found: ${memoryId}`);
    }

    let newScore = mem.reward_score;
    let newStatus = mem.status;

    if (outcome === 'good') {
      newScore = Math.min(3.0, Number((mem.reward_score + 0.2).toFixed(2)));
    } else {
      newScore = Math.max(0.1, Number((mem.reward_score - 0.5).toFixed(2)));
      // If reward drops to floor and was already low, quarantine as dormant
      if (newScore <= 0.2) {
        newStatus = 'dormant';
      }
    }

    this.db.prepare(`
      UPDATE memories
      SET reward_score = ?, status = ?
      WHERE id = ?
    `).run(newScore, newStatus, memoryId);

    return { reward_score: newScore, status: newStatus };
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

  linkFiles(memoryId: string, files: string[], symbols?: string[]): void {
    const stmt = this.db.prepare(`
      INSERT OR IGNORE INTO file_links (memory_id, file_path, symbol_name)
      VALUES (?, ?, ?)
    `);

    const symbolList = symbols && symbols.length > 0 ? symbols : [''];
    for (const f of files) {
      for (const s of symbolList) {
        stmt.run(memoryId, f, s);
      }
    }
  }

  getFilesForMemory(memoryId: string): string[] {
    const rows = this.db.prepare(`
      SELECT DISTINCT file_path FROM file_links WHERE memory_id = ?
    `).all(memoryId) as { file_path: string }[];
    return rows.map((r) => r.file_path);
  }

  getMemoriesForFile(projectId: string, filePath: string): Memory[] {
    const rows = this.db.prepare(`
      SELECT m.*
      FROM memories m
      JOIN file_links fl ON fl.memory_id = m.id
      WHERE m.project_id = ?
        AND fl.file_path = ?
        AND m.valid_to IS NULL
        AND m.status != 'superseded'
        AND m.status != 'dormant'
      ORDER BY m.kind = 'error_trap' DESC, m.reward_score DESC
    `).all(projectId, filePath) as unknown as Memory[];

    return rows;
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

    let pendingSpool = 0;
    if (this.spool && this.spool.hasPending()) {
      pendingSpool = 1;
    }

    return {
      projectId,
      activeCount: counts.activeCount || 0,
      stagingCount: counts.stagingCount || 0,
      supersededCount: counts.supersededCount || 0,
      dormantCount: counts.dormantCount || 0,
      rawEventCount: rawEvents.count || 0,
      pendingSpoolCount: pendingSpool,
      embeddingCoveragePercent: coverage
    };
  }
}

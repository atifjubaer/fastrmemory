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
    nodes: Array<{ id: string; label: string; type: 'file' | 'memory'; kind?: string; module?: string; score?: number }>;
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

    const nodesMap = new Map<string, { id: string; label: string; type: 'file' | 'memory'; kind?: string; module?: string; score?: number }>();
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

  // --- SNAPSHOTS & TIME TRAVEL (Memoria parity) ---

  createSnapshot(projectId: string, tag: string, description?: string): { id: string; tag: string; memoryCount: number; createdAt: string } {
    const id = `snap_${crypto.randomBytes(4).toString('hex')}`;
    const memories = this.listActiveMemories(projectId);
    const fileLinks = this.db.prepare(`
      SELECT fl.* FROM file_links fl
      JOIN memories m ON m.id = fl.memory_id
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
    const targetMemories: Memory[] = state.memories || [];
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
            reward_score = excluded.reward_score
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
}

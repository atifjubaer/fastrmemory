import * as fs from 'node:fs';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';
import { syncAllModulePages } from './markdown-pages.js';

export interface IngestedPageMemory {
  id: string;
  kind: 'rule' | 'decision' | 'error_trap' | 'workflow';
  title: string;
  content: string;
  status: 'staging' | 'verified';
  module: string;
  files: string[];
  validFrom: string;
}

export interface SyncResult {
  pagesRead: number;
  newMemoriesIngested: number;
  supersededUpdated: number;
  pagesWritten: number;
  ingestedIds: string[];
}

/**
 * Parses an active memory card from Zone 1 of a Two-Zone Markdown page.
 * Format:
 *   ### [mem_xxx] [TRAP|RULE] Title
 *   - **Kind**: `error_trap`
 *   - **Status**: `verified` (Reward Score: 1)
 *   - **Linked Files**: `file1`, `file2`
 *   - **Active Since**: `2026-10-27T13:19:06Z`
 *
 *   Content...
 */
export function parseActivePageCards(content: string, defaultModule: string): IngestedPageMemory[] {
  // Only parse Zone 1 (Compiled Truth)
  const zone1End = content.indexOf('## Append-Only Timeline');
  const zone1 = zone1End >= 0 ? content.slice(0, zone1End) : content;

  const cards: IngestedPageMemory[] = [];
  const sections = zone1.split(/(?=^###\s+\[mem_[a-zA-Z0-9_\-]+\])/m);

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed.startsWith('### [')) continue;

    const lines = trimmed.split(/\r?\n/);
    const headerMatch = lines[0].match(/^###\s+\[(mem_[a-zA-Z0-9_\-]+)\]\s+\[([A-Z_]+)\]\s+(.+)$/);
    if (!headerMatch) continue;

    const id = headerMatch[1];
    const rawKind = headerMatch[2].toLowerCase();
    const title = headerMatch[3].trim();

    let kind: 'rule' | 'decision' | 'error_trap' | 'workflow' = 'rule';
    if (rawKind === 'trap' || rawKind === 'error_trap') kind = 'error_trap';
    else if (rawKind === 'decision') kind = 'decision';
    else if (rawKind === 'workflow') kind = 'workflow';

    let status: 'staging' | 'verified' = 'verified';
    let files: string[] = [];
    let validFrom = new Date().toISOString();
    let bodyStartIndex = 1;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('- **Kind**:')) {
        const m = line.match(/`([^`]+)`/);
        if (m && ['rule', 'decision', 'error_trap', 'workflow'].includes(m[1])) {
          kind = m[1] as any;
        }
        bodyStartIndex = i + 1;
      } else if (line.startsWith('- **Status**:')) {
        if (line.includes('staging')) status = 'staging';
        bodyStartIndex = i + 1;
      } else if (line.startsWith('- **Linked Files**:')) {
        const matches = line.matchAll(/`([^`]+)`/g);
        files = Array.from(matches, (m) => m[1]).filter((f) => f !== 'None');
        bodyStartIndex = i + 1;
      } else if (line.startsWith('- **Active Since**:')) {
        const m = line.match(/`([^`]+)`/);
        if (m) validFrom = m[1];
        bodyStartIndex = i + 1;
      } else if (line === '' || line === '---') {
        bodyStartIndex = i + 1;
      } else {
        // Body starts here
        bodyStartIndex = i;
        break;
      }
    }

    const bodyLines = lines.slice(bodyStartIndex).filter((l) => l.trim() !== '---');
    const cardContent = bodyLines.join('\n').trim();

    cards.push({
      id,
      kind,
      title,
      content: cardContent || title,
      status,
      module: defaultModule,
      files,
      validFrom
    });
  }

  return cards;
}

/**
 * Extracts superseded memory IDs from Zone 2 (Append-Only Timeline).
 */
export function parseSupersededIds(content: string): string[] {
  const zone2Start = content.indexOf('## Append-Only Timeline');
  if (zone2Start < 0) return [];
  const zone2 = content.slice(zone2Start);

  const ids: string[] = [];
  const regex = /###\s+\[EXPIRED[^\]]*\]\s+\[(mem_[a-zA-Z0-9_\-]+)\]/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(zone2)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

/**
 * Bidirectional Team Memory Sync.
 * 1. Reads all `.fastr/pages/*.md` in the repository.
 * 2. Ingests any newly pulled teammate memories into local SQLite.
 * 3. Updates superseded memories according to the timeline.
 * 4. Re-renders clean synchronized module pages.
 */
export function syncTeamMemory(
  db: DatabaseSync,
  projectRoot: string,
  projectId: string
): SyncResult {
  const repo = new FastrRepository(db);
  const pagesDir = path.join(projectRoot, '.fastr', 'pages');
  if (!fs.existsSync(pagesDir)) {
    const written = syncAllModulePages(db, projectRoot, projectId);
    return { pagesRead: 0, newMemoriesIngested: 0, supersededUpdated: 0, pagesWritten: written.length, ingestedIds: [] };
  }

  const pageFiles = fs.readdirSync(pagesDir).filter((f) => f.endsWith('.md'));
  let newMemoriesIngested = 0;
  let supersededUpdated = 0;
  const ingestedIds: string[] = [];

  for (const file of pageFiles) {
    const filePath = path.join(pagesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract module name from header `# Module: <name>` or file name
    const headerMatch = content.match(/^#\s+Module:\s+([a-zA-Z0-9_\-]+)/m);
    const moduleName = headerMatch ? headerMatch[1].trim() : path.basename(file, '.md').split('-')[0];

    // 1. Ingest active cards
    const activeCards = parseActivePageCards(content, moduleName);
    for (const card of activeCards) {
      const existing = repo.getMemory(card.id);
      if (!existing) {
        db.exec('SAVEPOINT sync_card');
        try {
          db.prepare(`
            INSERT INTO memories (
              id, project_id, agent_id, module, kind, title, content, status, pinned,
              reward_score, retrieval_count, valid_from, valid_to, created_at
            ) VALUES (?, ?, 'git_sync', ?, ?, ?, ?, ?, 0, 1.0, 0, ?, NULL, ?)
          `).run(
            card.id,
            projectId,
            card.module,
            card.kind,
            card.title,
            card.content,
            card.status,
            card.validFrom,
            card.validFrom
          );

          // Insert linked files
          for (const f of card.files) {
            db.prepare(`
              INSERT OR IGNORE INTO file_links (memory_id, file_path, symbol_name)
              VALUES (?, ?, '')
            `).run(card.id, f);
          }

          db.exec('RELEASE sync_card');
          newMemoriesIngested++;
          ingestedIds.push(card.id);
        } catch {
          db.exec('ROLLBACK TO sync_card');
        }
      }
    }

    // 2. Sync superseded history
    const supersededIds = parseSupersededIds(content);
    for (const id of supersededIds) {
      const existing = repo.getMemory(id);
      if (existing && existing.status !== 'superseded') {
        db.prepare(`
          UPDATE memories
          SET status = 'superseded', valid_to = COALESCE(valid_to, ?)
          WHERE id = ? AND project_id = ?
        `).run(new Date().toISOString(), id, projectId);
        supersededUpdated++;
      }
    }
  }

  // Re-render pages
  const pagesWritten = syncAllModulePages(db, projectRoot, projectId);

  return {
    pagesRead: pageFiles.length,
    newMemoriesIngested,
    supersededUpdated,
    pagesWritten: pagesWritten.length,
    ingestedIds
  };
}

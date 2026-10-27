import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';
import { scrubSecrets } from '../privacy/scrubber.js';

export interface DistilledTrap {
  id: string;
  title: string;
  module: string;
  files: string[];
  errorExcerpt: string;
}

export interface DistillationResult {
  inspectedErrors: number;
  distilledCount: number;
  traps: DistilledTrap[];
}

/**
 * Passive Cognitive Distillation.
 *
 * Silently extracts actionable draft error traps from session execution history:
 * When an agent encounters tool failures/stack traces followed by edits on target files,
 * this synthesizes a candidate error trap in `staging` status linked to the source events.
 */
export function distillSessionTraps(
  db: DatabaseSync,
  projectId: string,
  sessionId?: string
): DistillationResult {
  const repo = new FastrRepository(db);

  // 1. Find recent tool_error events for this project and optional session
  let query = `
    SELECT id, session_id, tool_name, file_path, raw_payload, created_at
    FROM raw_events
    WHERE project_id = ? AND event_type = 'tool_error'
  `;
  const params: any[] = [projectId];
  if (sessionId) {
    query += ' AND session_id = ?';
    params.push(sessionId);
  }
  query += ' ORDER BY id DESC LIMIT 20';

  const errorRows = db.prepare(query).all(...params) as Array<{
    id: string;
    session_id: string;
    tool_name: string | null;
    file_path: string | null;
    raw_payload: string;
    created_at: string;
  }>;

  if (errorRows.length === 0) {
    return { inspectedErrors: 0, distilledCount: 0, traps: [] };
  }

  // 2. Fetch recent file edits in this project
  const editRows = db.prepare(`
    SELECT DISTINCT file_path, session_id
    FROM file_edits
    WHERE project_id = ?
    ORDER BY id DESC LIMIT 20
  `).all(projectId) as Array<{ file_path: string; session_id: string }>;

  const existingTraps = repo.listTraps(projectId);
  const existingTitles = new Set(existingTraps.map((t) => t.title.toLowerCase().trim()));
  const distilled: DistilledTrap[] = [];

  for (const errRow of errorRows) {
    let payload: any = {};
    try {
      payload = JSON.parse(errRow.raw_payload);
    } catch {
      payload = { error: errRow.raw_payload };
    }

    const rawError = String(payload.error || payload.message || 'Execution failure').trim();
    if (!rawError || rawError.length < 5) continue;

    // First line of error message is the title candidate
    const firstLine = rawError.split(/\r?\n/)[0].replace(/^error:\s*/i, '').trim();
    const cleanTitle = `Prevent: ${firstLine.slice(0, 120)}`;
    if (existingTitles.has(cleanTitle.toLowerCase())) continue;

    // Associate with files edited in the same session, or the error's file_path
    const sessionEdits = editRows
      .filter((e) => e.session_id === errRow.session_id && e.file_path)
      .map((e) => e.file_path);

    const relatedFiles = Array.from(new Set([
      ...(errRow.file_path ? [errRow.file_path] : []),
      ...sessionEdits
    ])).filter(Boolean);

    if (relatedFiles.length === 0) continue;

    // Determine module from first related file
    const primaryFile = relatedFiles[0];
    const parts = primaryFile.split(/[\/\\]/);
    const moduleName = parts.length > 1 && parts[0] === 'src' ? parts[1] : parts[0] || 'general';

    const scrubbedTitle = scrubSecrets(cleanTitle);
    const scrubbedContent = scrubSecrets(
      `Diagnosed from tool error [${errRow.id}] in ${errRow.tool_name || 'tool'}:\n` +
      `${rawError.slice(0, 800)}\n\n` +
      `Affected files: ${relatedFiles.join(', ')}`
    );

    const mem = repo.insertMemory({
      projectId,
      module: moduleName,
      kind: 'error_trap',
      title: scrubbedTitle,
      content: scrubbedContent,
      files: relatedFiles,
      sourceEventIds: [errRow.id],
      verified: false // Goes to staging for developer or test review
    });

    existingTitles.add(cleanTitle.toLowerCase());
    distilled.push({
      id: mem.id,
      title: scrubbedTitle,
      module: moduleName,
      files: relatedFiles,
      errorExcerpt: firstLine.slice(0, 100)
    });
  }

  return {
    inspectedErrors: errorRows.length,
    distilledCount: distilled.length,
    traps: distilled
  };
}

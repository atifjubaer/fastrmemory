import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { VisionAsset } from '../db/schema.js';
import {
  computeEmbedding,
  cosineSimilarity,
  float32ArrayToBuffer,
  bufferToFloat32Array
} from '../search/embeddings.js';

export interface TagVisionParams {
  projectId: string;
  filePath: string;
  description: string;
  ocrText?: string;
  memoryId?: string;
  taskId?: string;
  /** Asset must exist inside this directory; relative paths resolve against it. Defaults to process.cwd(). */
  projectRoot?: string;
}

export interface VisionSearchResult {
  id: string;
  filePath: string;
  description: string;
  ocrText: string | null;
  memoryId: string | null;
  taskId: string | null;
  score: number;
  createdAt: string;
}

/**
 * Resolves an asset path against the project root and verifies it is an existing
 * regular file that (after resolving symlinks) lies inside that root.
 */
export function resolveProjectAssetPath(filePath: string, projectRoot: string = process.cwd()): string {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('Vision asset filePath is required');
  }
  const root = path.resolve(projectRoot);
  const resolved = path.resolve(root, filePath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Vision asset not found: ${filePath}`);
  }
  const realRoot = fs.realpathSync(root);
  const realFile = fs.realpathSync(resolved);
  const rel = path.relative(realRoot, realFile);
  if (!rel || rel === '..' || rel.startsWith(`..${path.sep}`) || path.isAbsolute(rel)) {
    throw new Error(`Vision asset must be inside the project root (${root}): ${filePath}`);
  }
  if (!fs.statSync(realFile).isFile()) {
    throw new Error(`Vision asset is not a regular file: ${filePath}`);
  }
  return realFile;
}

export async function tagVisionAsset(
  db: DatabaseSync,
  params: TagVisionParams
): Promise<VisionAsset> {
  const id = `img_${crypto.randomBytes(4).toString('hex')}`;
  const resolvedPath = resolveProjectAssetPath(params.filePath, params.projectRoot);
  const now = new Date().toISOString();

  // Compute 384-dim embedding over description + OCR text
  const textToEmbed = `${params.description} ${params.ocrText || ''}`.trim();
  const vec = await computeEmbedding(textToEmbed);
  const embeddingBuf = float32ArrayToBuffer(vec);

  db.prepare(`
    INSERT INTO vision_assets (
      id, project_id, file_path, description, ocr_text,
      memory_id, task_id, embedding, created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    params.projectId,
    resolvedPath,
    params.description,
    params.ocrText || null,
    params.memoryId || null,
    params.taskId || null,
    embeddingBuf,
    now
  );

  return {
    id,
    project_id: params.projectId,
    file_path: resolvedPath,
    description: params.description,
    ocr_text: params.ocrText || null,
    memory_id: params.memoryId || null,
    task_id: params.taskId || null,
    embedding: embeddingBuf,
    created_at: now
  };
}

export async function searchVisionAssets(
  db: DatabaseSync,
  projectId: string,
  query: string,
  options: { limit?: number; memoryId?: string } = {}
): Promise<VisionSearchResult[]> {
  const { limit = 10, memoryId } = options;

  let sql = 'SELECT * FROM vision_assets WHERE project_id = ?';
  const queryParams: any[] = [projectId];

  if (memoryId) {
    sql += ' AND memory_id = ?';
    queryParams.push(memoryId);
  }

  const rows = db.prepare(sql).all(...queryParams) as any[];
  if (rows.length === 0) {
    return [];
  }

  const queryVec = await computeEmbedding(query);
  const lowerQuery = query.toLowerCase();
  const queryTokens = lowerQuery.split(/\s+/).filter(Boolean);

  const scored: VisionSearchResult[] = rows.map(r => {
    let score = 0;

    // Vector similarity score
    if (r.embedding) {
      try {
        const rowVec = bufferToFloat32Array(r.embedding);
        const sim = cosineSimilarity(queryVec, rowVec);
        score += sim * 0.7;
      } catch {}
    }

    // Keyword overlap score
    const combinedText = `${r.description} ${r.ocr_text || ''}`.toLowerCase();
    let keywordHits = 0;
    for (const t of queryTokens) {
      if (combinedText.includes(t)) {
        keywordHits++;
      }
    }
    const keywordScore = queryTokens.length > 0 ? (keywordHits / queryTokens.length) : 0;
    score += keywordScore * 0.3;

    return {
      id: r.id,
      filePath: r.file_path,
      description: r.description,
      ocrText: r.ocr_text,
      memoryId: r.memory_id,
      taskId: r.task_id,
      score: Math.round(score * 1000) / 1000,
      createdAt: r.created_at
    };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

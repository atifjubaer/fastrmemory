import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';

export interface PredictRiskParams {
  targetFiles: string[];
  module?: string;
}

export interface PredictRiskResult {
  riskScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  trapCount: number;
  historicalBugCount: number;
  linkedRuleCount: number;
  summary: string;
  recommendations: string[];
}

export function predictFileBaseRate(
  db: DatabaseSync,
  repo: FastrRepository,
  projectId: string,
  params: PredictRiskParams
): PredictRiskResult {
  const targetFiles = params.targetFiles || [];
  let totalTraps = 0;
  let totalRules = 0;
  let totalSuperseded = 0;
  const trapTitles: string[] = [];

  for (const f of targetFiles) {
    const mems = repo.getMemoriesForFile(projectId, f);
    for (const m of mems) {
      if (m.kind === 'error_trap') {
        totalTraps++;
        trapTitles.push(`[${m.id}] ${m.title}`);
      } else {
        totalRules++;
      }
    }

    // Check superseded history for this file (historical bug fixes / reversions)
    const normalized = f.replace(/\\/g, '/').trim();
    const superseded = db.prepare(`
      SELECT count(*) as count
      FROM memories m
      JOIN file_links fl ON fl.memory_id = m.id
      WHERE (m.project_id = ? OR m.project_id = 'global')
        AND fl.file_path = ?
        AND m.status = 'superseded'
    `).get(projectId, normalized) as { count: number };

    totalSuperseded += superseded?.count || 0;
  }

  // Base-rate calculation: traps have 0.4 weight, historical bugs have 0.2 weight
  const totalRelevant = totalTraps + totalRules + totalSuperseded;
  let riskScore = 0.05; // baseline low risk

  if (totalRelevant > 0) {
    const raw = (totalTraps * 0.45 + totalSuperseded * 0.25) / Math.max(1, totalRelevant);
    riskScore = Number(Math.min(0.99, Math.max(0.05, raw)).toFixed(2));
  }

  let riskLevel: 'low' | 'moderate' | 'high' = 'low';
  if (riskScore >= 0.6) {
    riskLevel = 'high';
  } else if (riskScore >= 0.3) {
    riskLevel = 'moderate';
  }

  const recommendations: string[] = [];
  if (totalTraps > 0) {
    recommendations.push(`Pre-edit error traps detected: Review active traps (${trapTitles.slice(0, 3).join(', ')}) before saving changes.`);
  }
  if (totalSuperseded > 2) {
    recommendations.push(`High historical churn: This file has been superseded ${totalSuperseded} times. Write unit tests for new edge cases.`);
  }
  if (recommendations.length === 0) {
    recommendations.push('Clean baseline: No active traps or recurring bug patterns recorded for these files.');
  }

  const summary = `Base-Rate Failure Risk: ${(riskScore * 100).toFixed(0)}% (${riskLevel.toUpperCase()}) across ${targetFiles.length} inspected file(s). Traps: ${totalTraps}, Historical bug fixes: ${totalSuperseded}.`;

  return {
    riskScore,
    riskLevel,
    trapCount: totalTraps,
    historicalBugCount: totalSuperseded,
    linkedRuleCount: totalRules,
    summary,
    recommendations,
  };
}

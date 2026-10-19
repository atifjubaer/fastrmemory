import { DatabaseSync } from 'node:sqlite';
import { FastrRepository } from '../db/repository.js';
import { searchMemories } from '../search/hybrid-rrf.js';
import { estimateTokens } from '../search/budget.js';

export interface AssembleParams {
  taskDescription: string;
  targetFiles?: string[];
  module?: string;
  budgetTokens?: number;
  agentId?: string;
}

export interface AssembleResult {
  contextXml: string;
  totalTokens: number;
  trapCount: number;
  ruleCount: number;
  frontierCount: number;
}

export async function assemblePromptContext(
  db: DatabaseSync,
  repo: FastrRepository,
  projectId: string,
  params: AssembleParams
): Promise<AssembleResult> {
  const budget = params.budgetTokens || 2000;
  const targetFiles = params.targetFiles || [];
  const agentId = params.agentId || 'default';

  // 1. Collect Active Error Traps for target files (Highest Priority)
  const fileTraps: any[] = [];
  const seenTrapIds = new Set<string>();

  for (const f of targetFiles) {
    const mems = repo.getMemoriesForFile(projectId, f);
    for (const m of mems) {
      if (m.kind === 'error_trap' && !seenTrapIds.has(m.id)) {
        seenTrapIds.add(m.id);
        fileTraps.push(m);
      }
    }
  }

  // 2. Search task-relevant rules via Triple-Stream RRF
  const searchBudget = Math.floor(budget * 0.6);
  const searchRes = await searchMemories(db, {
    projectId,
    query: params.taskDescription,
    files: targetFiles,
    module: params.module,
    budgetTokens: searchBudget,
  });

  // Filter out any traps already captured in fileTraps to avoid duplication
  const uniqueRules = searchRes.memories.filter((sm) => !seenTrapIds.has(sm.memory.id));

  // 3. Fetch Ready Frontier Tasks from Action DAG
  const frontier = repo.getFrontier(projectId);

  // 4. Fetch Latest Session Handoff
  const latestHandoff = repo.getLatestHandoff(projectId);

  // 5. Construct Structured Context XML Block
  const xmlLines: string[] = [];
  xmlLines.push(`<fastr_context project="${projectId}" agent="${agentId}">`);

  // Section A: Active Error Traps
  if (fileTraps.length > 0) {
    xmlLines.push(`  <critical_error_traps count="${fileTraps.length}" notice="Active 2.0x recall boost warnings for target files">`);
    for (const t of fileTraps) {
      xmlLines.push(`    <trap id="${t.id}" module="${t.module}" title="${escapeXml(t.title)}">`);
      xmlLines.push(`      ${escapeXml(t.content)}`);
      xmlLines.push(`    </trap>`);
    }
    xmlLines.push(`  </critical_error_traps>`);
  }

  // Section B: Recalled Architectural Rules & Decisions
  if (uniqueRules.length > 0) {
    xmlLines.push(`  <architectural_rules count="${uniqueRules.length}">`);
    for (const r of uniqueRules) {
      const m = r.memory;
      xmlLines.push(`    <rule id="${m.id}" kind="${m.kind}" module="${m.module}" score="${r.score.toFixed(2)}" title="${escapeXml(m.title)}">`);
      xmlLines.push(`      ${escapeXml(m.content)}`);
      xmlLines.push(`    </rule>`);
    }
    xmlLines.push(`  </architectural_rules>`);
  }

  // Section C: Ready Frontier Tasks
  if (frontier.length > 0) {
    xmlLines.push(`  <frontier_tasks count="${frontier.length}">`);
    for (const task of frontier.slice(0, 5)) {
      xmlLines.push(`    <task id="${task.id}" priority="${task.priority}" title="${escapeXml(task.title)}" status="${task.status}" />`);
    }
    xmlLines.push(`  </frontier_tasks>`);
  }

  // Section D: Latest Session Handoff
  if (latestHandoff) {
    xmlLines.push(`  <last_handoff title="${escapeXml(latestHandoff.task_title)}">`);
    xmlLines.push(`    <summary>${escapeXml(latestHandoff.summary)}</summary>`);
    xmlLines.push(`    <next_step>${escapeXml(latestHandoff.next_step)}</next_step>`);
    xmlLines.push(`  </last_handoff>`);
  }

  xmlLines.push(`</fastr_context>`);

  const contextXml = xmlLines.join('\n');
  const totalTokens = estimateTokens(contextXml);

  return {
    contextXml,
    totalTokens,
    trapCount: fileTraps.length,
    ruleCount: uniqueRules.length,
    frontierCount: frontier.length,
  };
}

function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

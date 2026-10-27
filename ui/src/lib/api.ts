/**
 * Typed fetchers for the FastrMemory dashboard API. Every call checks `res.ok` and throws an
 * ApiError carrying the server's `{ error }` message so React Query can surface it and retry.
 */

export type MemoryKind = 'rule' | 'decision' | 'error_trap' | 'workflow';
export type MemoryStatus = 'staging' | 'verified' | 'superseded' | 'dormant';

export interface Memory {
  id: string;
  project_id: string;
  agent_id: string;
  module: string;
  kind: MemoryKind;
  title: string;
  content: string;
  status: MemoryStatus;
  pinned: number;
  reward_score: number;
  retrieval_count: number;
  valid_from: string;
  valid_to: string | null;
  superseded_by_id: string | null;
  superseded_reason: string | null;
  source_event_ids: string;
  embedded: number;
  created_at: string;
  last_recalled_at: string | null;
  provenance_hash: string | null;
  linked_files: string[];
  linked_symbols?: string[];
  assertion: string | null;
  assertion_verdict?: 'holds' | 'fails' | 'unknown' | null;
}

export interface SearchHit extends Memory {
  score: number | null;
  ranks: { bm25: number | null; vector: number | null; graph: number | null } | null;
}

export interface SearchResponse {
  mode: 'list' | 'search';
  query: string;
  total: number;
  fallback: boolean;
  tookMs: number;
  results: SearchHit[];
}

export interface SearchParams {
  q?: string;
  module?: string;
  kind?: string;
  status?: string;
  pinned?: '' | '1' | '0';
  limit?: number;
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

export interface McpServerEntry {
  command: string;
  args: string[];
}

export interface FastrStatus {
  projectId: string;
  projectName: string;
  projectRoot: string;
  dbPath: string;
  version: string;
  platform: string;
  isHomeProject: boolean;
  mcp: McpServerEntry;
  mcpSource: 'source' | 'installed' | 'registry';
  status: ProjectStatus;
  trapsCount: number;
  activeCount: number;
  modulesCount: number;
  modules: string[];
  graphNodesCount: number;
  graphEdgesCount: number;
  actionsCount: number;
  frontierCount: number;
  conflictsCount: number;
  entitiesCount: number;
  spoolPending: boolean;
}

export interface Provenance {
  id: string;
  verified: boolean;
  signature: string | null;
  agentId: string;
  createdAt: string;
  reason: string;
}

export interface MemoryDetail extends Memory {
  provenance: Provenance;
  assertion_result?: { verdict: 'holds' | 'fails' | 'unknown'; reason: string } | null;
}

export interface MemoryHistory {
  id: string;
  currentIndex: number;
  chain: Memory[];
}

export type ActionStatus = 'pending' | 'active' | 'blocked' | 'done' | 'cancelled';

export interface ActionItem {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: ActionStatus;
  priority: number;
  assigned_to: string | null;
  crystallized_into?: string | null;
  isFrontier: boolean;
  requires: string[];
  unlocks: string[];
  conflictsWith: string[];
  created_at: string;
  completed_at: string | null;
}

export interface ActionEdge {
  source_action_id: string;
  target_action_id: string;
  edge_type: string;
}

export interface ActionsResponse {
  actions: ActionItem[];
  edges: ActionEdge[];
  frontierCount: number;
  totalCount: number;
}

export interface Conflict {
  id: number;
  project_id: string;
  memory_a_id: string;
  memory_b_id: string;
  reason: string;
  score: number;
  status: 'open' | 'resolved' | 'ignored';
  created_at: string;
  memory_a?: Memory | null;
  memory_b?: Memory | null;
}

export interface TimelineEntry {
  id: string;
  kind: MemoryKind;
  title: string;
  module: string;
  status: MemoryStatus;
  rewardScore: number;
  createdAt: string;
  validTo: string | null;
  supersededById: string | null;
  supersededReason: string | null;
  linkedFiles: string[];
}

export interface ReplayMemoryView {
  id: string;
  title: string;
  module: string;
  kind: string;
  status: string;
  rewardScore: number;
  validFrom: string;
  validTo: string | null;
  supersededById: string | null;
  files: string[];
}

export interface ReplaySnapshotView {
  at: string;
  tokenCount: number;
  contentHash: string;
  active: ReplayMemoryView[];
  historyCount: number;
  eventCount: number;
  conflictCount: number;
}

export interface ReplayConflictView {
  id: number;
  memoryAId: string;
  memoryBId: string;
  reason: string;
  score: number;
  status: string;
}

export interface ReplayDiffEntry {
  id: string;
  title: string;
  module: string;
  kind: string;
  status: string;
  validFrom: string;
  validTo: string | null;
  supersededById: string | null;
}

export interface ReplayDiffView {
  fromAt: string;
  toAt: string;
  added: ReplayDiffEntry[];
  superseded: ReplayDiffEntry[];
  stillActive: ReplayDiffEntry[];
  changed: ReplayDiffEntry[];
  conflicts: ReplayConflictView[];
  tokenDelta: number;
  newTrapIds: string[];
}

export interface ReplayResponse {
  from: ReplaySnapshotView;
  to: ReplaySnapshotView;
  diff: ReplayDiffView;
  markdown: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'file' | 'memory' | 'entity';
  kind?: string;
  module?: string;
  score?: number;
}

export interface GraphResponse {
  nodes: GraphNode[];
  edges: Array<{ source: string; target: string; relation: string }>;
}

export interface Entity {
  id: string;
  project_id: string;
  name: string;
  entity_type: string;
  created_at?: string;
}

export interface EntitiesResponse {
  entities: Entity[];
  edges: Array<{ source_id: string; target_id: string; edge_type: string }>;
  count: number;
}

export interface ExplainResponse {
  query: string;
  totalTimeMs: number;
  totalTokens: number;
  results: Array<{
    id: string;
    title: string;
    kind: MemoryKind;
    module: string;
    score: number;
    rankA: number;
    rankB: number;
    rankC: number;
  }>;
}

export interface TrapMatch extends Memory {
  matched_files: string[];
}

export interface TrapsResponse {
  files: string[];
  traps: TrapMatch[];
}

export interface DiagnosticIssue {
  category: 'integrity' | 'fts5' | 'file_links' | 'actions' | 'storage';
  severity: 'error' | 'warning' | 'info';
  description: string;
  fixable: boolean;
  affectedCount: number;
}

export interface DiagnosticReport {
  healthy: boolean;
  timestamp: string;
  totalIssues: number;
  fixableIssues: number;
  issues: DiagnosticIssue[];
  metrics: { memoryCount: number; ftsRowCount: number; fileLinkCount: number; actionCount: number; walMode: string };
}

export interface HealthResponse {
  report: DiagnosticReport;
  status: ProjectStatus;
  spool: { pending: boolean; path: string };
  dbPath: string;
}

export interface HealResult {
  dryRun: boolean;
  fixedCount: number;
  actionsTaken: string[];
  remainingIssues: number;
  reportBefore: DiagnosticReport;
  reportAfter?: DiagnosticReport;
}

export interface VersionResponse {
  version: string;
  dataVersion: number;
  totalChanges: number;
  counts: Record<string, number | string>;
  spoolPending: boolean;
  serverTime: string;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, { ...init, headers: { Accept: 'application/json', ...(init.headers || {}) } });
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') throw err;
    throw new ApiError(0, 'Cannot reach the FastrMemory server. Is `fastrmemory ui` still running?');
  }
  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body?.error) message = String(body.error);
    } catch {
      // non-JSON error body
    }
    throw new ApiError(res.status, message);
  }
  return (await res.json()) as T;
}

function post<T>(path: string, body: unknown, keepalive = false): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive,
  });
}

function qs(params: Record<string, string | number | undefined | null>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') sp.set(k, String(v));
  }
  const s = sp.toString();
  return s ? `?${s}` : '';
}

export const api = {
  status: (signal?: AbortSignal) => request<FastrStatus>('/api/status', { signal }),
  memories: (signal?: AbortSignal) => request<Memory[]>('/api/memories', { signal }),
  search: (p: SearchParams, signal?: AbortSignal) =>
    request<SearchResponse>(`/api/search${qs({ ...p })}`, { signal }),
  memory: (id: string, signal?: AbortSignal) => request<MemoryDetail>(`/api/memories/${encodeURIComponent(id)}`, { signal }),
  history: (id: string, signal?: AbortSignal) =>
    request<MemoryHistory>(`/api/memories/${encodeURIComponent(id)}/history`, { signal }),
  traps: (files: string[], signal?: AbortSignal) =>
    request<TrapsResponse>(`/api/traps${qs({ files: files.join(',') })}`, { signal }),
  actions: (signal?: AbortSignal) => request<ActionsResponse>('/api/actions', { signal }),
  conflicts: (signal?: AbortSignal) => request<Conflict[]>('/api/conflicts', { signal }),
  timeline: (limit = 30, signal?: AbortSignal) => request<TimelineEntry[]>(`/api/timeline${qs({ limit })}`, { signal }),
  replay: (from: string, to: string, signal?: AbortSignal) =>
    request<ReplayResponse>(`/api/replay${qs({ from, to })}`, { signal }),
  graph: (file?: string, signal?: AbortSignal) => request<GraphResponse>(`/api/graph${qs({ file })}`, { signal }),
  entities: (signal?: AbortSignal) => request<EntitiesResponse>('/api/entities', { signal }),
  explain: (q: string, signal?: AbortSignal) => request<ExplainResponse>(`/api/search/explain${qs({ q })}`, { signal }),
  health: (signal?: AbortSignal) => request<HealthResponse>('/api/health', { signal }),
  version: (signal?: AbortSignal) => request<VersionResponse>('/api/version', { signal }),

  heal: (dryRun: boolean) => post<HealResult>('/api/health/heal', { dryRun }),
  syncTeam: () => post<{ ok: boolean; result: { pagesRead: number; newMemoriesIngested: number; supersededUpdated: number; pagesWritten: number; ingestedIds: string[] } }>('/api/sync', {}),
  distill: (sessionId?: string) => post<{ ok: boolean; result: { inspectedErrors: number; distilledCount: number; traps: Array<{ id: string; title: string; module: string; files: string[] }> } }>('/api/distill', { sessionId }),
  updateAssertion: (memoryId: string, assertion: string | null) =>
    post<{ success: boolean; memoryId: string; assertion: string | null }>('/api/memories/assertion', { memoryId, assertion }),
  createMemory: (body: { title: string; content: string; module: string; kind: MemoryKind; files: string[]; assertion?: string }) =>
    post<Memory>('/api/memories', body),
  pin: (memoryId: string, pinned: boolean, keepalive = false) =>
    post<{ success: boolean; pinned: boolean }>('/api/memories/pin', { memoryId, pinned }, keepalive),
  forget: (memoryId: string, keepalive = false) =>
    post<{ success: boolean }>('/api/memories/forget', { memoryId, reason: 'User requested forget via Fastr Dashboard' }, keepalive),
  resolveConflict: (conflictId: number, keepMemoryId: string, forgetLoser: boolean, keepalive = false) =>
    post<{ success: boolean; keptId: string; loserId: string }>(
      '/api/conflicts/resolve',
      { conflictId, keepMemoryId, forgetLoser, reason: 'Resolved via Fastr Dashboard' },
      keepalive
    ),
  seedActions: () => post<{ seeded: ActionItem[]; alreadySeeded?: boolean }>('/api/actions/seed', {}),
};

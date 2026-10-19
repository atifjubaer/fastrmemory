export interface FastrStatus {
  projectId: string;
  projectName: string;
  dbPath: string;
  status: {
    projectId: string;
    activeCount: number;
    stagingCount: number;
    supersededCount: number;
    dormantCount: number;
    rawEventCount: number;
    pendingSpoolCount: number;
    embeddingCoveragePercent: number;
  };
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

export interface MemoryItem {
  id: string;
  project_id: string;
  agent_id: string;
  module: string;
  kind: 'rule' | 'error_trap' | 'decision';
  title: string;
  content: string;
  reward_score: number;
  access_count: number;
  status: 'staging' | 'verified' | 'superseded' | 'dormant';
  pinned: number;
  created_at: string;
  valid_to: string | null;
  superseded_by_id?: string | null;
  superseded_reason?: string | null;
  linked_files: string[];
}

export interface ActionItem {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'blocked' | 'done' | 'cancelled';
  priority: number;
  assigned_to: string | null;
  isFrontier: boolean;
  requires?: string[];
  unlocks?: string[];
  conflictsWith?: string[];
  created_at: string;
  completed_at: string | null;
}

export interface ConflictItem {
  id: number;
  project_id: string;
  memory_a_id: string;
  memory_b_id: string;
  reason: string;
  score: number;
  status: 'open' | 'resolved' | 'ignored';
  created_at: string;
}

export interface GraphData {
  nodes: Array<{
    id: string;
    label: string;
    type: 'memory' | 'file' | 'entity';
    kind?: string;
    score?: number;
    status?: string;
  }>;
  edges: Array<{
    source: string;
    target: string;
    weight?: number;
    type?: string;
  }>;
}

export interface RrfTraceItem {
  query: string;
  totalTimeMs: number;
  streams: {
    fts5: { hits: number; timeMs: number; topScores: number[] };
    vector: { hits: number; timeMs: number; topScores: number[] };
    graph: { hits: number; timeMs: number; topScores: number[] };
  };
  results: Array<{
    id: string;
    title: string;
    kind: string;
    finalScore: number;
    rankFts5?: number;
    rankVector?: number;
    rankGraph?: number;
    trapMultiplier: number;
    verifiedMultiplier: number;
  }>;
}

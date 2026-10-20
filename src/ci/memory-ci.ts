import { diffSnapshots, formatDiffMarkdown, SnapshotDiff } from '../replay/snapshot.js';
import { snapshotFromJsonl } from '../replay/jsonl.js';

export interface MemoryCiOptions {
  baseJsonl: string;
  headJsonl: string;
  failOnNewTraps?: boolean;
}

export interface MemoryCiResult {
  diff: SnapshotDiff;
  markdown: string;
  newTrapIds: string[];
  failed: boolean;
  exitCode: 0 | 1;
}

/**
 * PR-level memory review. Base and head are portable JSONL snapshots, so the
 * check works in CI without shipping the SQLite database or its WAL files.
 */
export function runMemoryCi(opts: MemoryCiOptions): MemoryCiResult {
  const base = snapshotFromJsonl(opts.baseJsonl);
  const head = snapshotFromJsonl(opts.headJsonl);
  const diff = diffSnapshots(base, head);
  const markdown = formatDiffMarkdown(diff);
  const failed = opts.failOnNewTraps === true && diff.newTrapIds.length > 0;

  return {
    diff,
    markdown,
    newTrapIds: diff.newTrapIds,
    failed,
    exitCode: failed ? 1 : 0
  };
}

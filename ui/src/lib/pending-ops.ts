import { useSyncExternalStore } from 'react';
import { toast } from 'sonner';
import { api, type Conflict, type Memory } from './api';
import { queryClient } from './query-client';

/**
 * Undoable operations. An op is applied optimistically on top of whatever the server returns
 * (see applyMemoryOps / applyConflictOps) until it has been committed *and* the refetch that
 * follows has settled. Because the overlay is re-applied to every fetch, an SSE- or poll-triggered
 * refetch during the undo window can no longer "resurrect" a forgotten memory.
 */
export type PendingOp =
  | { id: string; type: 'pin'; memoryIds: string[]; pinned: boolean; label: string }
  | { id: string; type: 'forget'; memoryIds: string[]; label: string }
  | { id: string; type: 'resolve'; conflictId: number; keepMemoryId: string; forgetLoser: boolean; label: string };

type Phase = 'waiting' | 'committing';
interface Entry {
  op: PendingOp;
  phase: Phase;
  timer: ReturnType<typeof setTimeout> | null;
}

const UNDO_WINDOW_MS = 6000;
const entries = new Map<string, Entry>();
let snapshot: PendingOp[] = [];
const listeners = new Set<() => void>();

function emit() {
  snapshot = Array.from(entries.values()).map((e) => e.op);
  listeners.forEach((l) => l());
}

function commitRequests(op: PendingOp, keepalive = false): Promise<unknown> {
  switch (op.type) {
    case 'pin':
      return Promise.all(op.memoryIds.map((id) => api.pin(id, op.pinned, keepalive)));
    case 'forget':
      return Promise.all(op.memoryIds.map((id) => api.forget(id, keepalive)));
    case 'resolve':
      return api.resolveConflict(op.conflictId, op.keepMemoryId, op.forgetLoser, keepalive);
  }
}

async function commit(id: string) {
  const entry = entries.get(id);
  if (!entry || entry.phase === 'committing') return;
  entry.phase = 'committing';
  entry.timer = null;
  try {
    await commitRequests(entry.op);
    await queryClient.invalidateQueries();
  } catch (err) {
    toast.error(`Could not apply: ${entry.op.label}`, { description: (err as Error).message });
  } finally {
    entries.delete(id);
    emit();
  }
}

let counter = 0;

/** Omit that distributes over the PendingOp union so each variant keeps its own fields. */
type NewOp = PendingOp extends infer T ? (T extends PendingOp ? Omit<T, 'id'> : never) : never;

export function scheduleOp(op: NewOp): string {
  const id = `op_${Date.now().toString(36)}_${(counter++).toString(36)}`;
  const full = { ...op, id } as PendingOp;
  entries.set(id, { op: full, phase: 'waiting', timer: setTimeout(() => void commit(id), UNDO_WINDOW_MS) });
  emit();
  toast(full.label, {
    id,
    duration: UNDO_WINDOW_MS,
    description: 'Applies in 6 seconds. Press Ctrl+Z to undo.',
    action: { label: 'Undo', onClick: () => undoOp(id) },
  });
  return id;
}

export function undoOp(id: string): boolean {
  const entry = entries.get(id);
  if (!entry || entry.phase !== 'waiting') return false;
  if (entry.timer) clearTimeout(entry.timer);
  entries.delete(id);
  emit();
  toast.dismiss(id);
  toast.success(`Undone: ${entry.op.label}`, { duration: 2500 });
  return true;
}

export function undoLatest(): boolean {
  const waiting = Array.from(entries.values()).filter((e) => e.phase === 'waiting');
  const last = waiting[waiting.length - 1];
  return last ? undoOp(last.op.id) : false;
}

/** Commits everything still waiting, used when the page is being closed so no confirmed action is lost. */
export function flushPendingOps() {
  for (const entry of entries.values()) {
    if (entry.phase !== 'waiting') continue;
    if (entry.timer) clearTimeout(entry.timer);
    entry.phase = 'committing';
    void commitRequests(entry.op, true).catch(() => undefined);
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function usePendingOps(): PendingOp[] {
  return useSyncExternalStore(subscribe, () => snapshot, () => snapshot);
}

export function applyMemoryOps<T extends Pick<Memory, 'id' | 'pinned'>>(rows: T[] | undefined, ops: PendingOp[]): T[] {
  if (!rows) return [];
  if (ops.length === 0) return rows;
  const forgotten = new Set<string>();
  const pinOverride = new Map<string, number>();
  for (const op of ops) {
    if (op.type === 'forget') op.memoryIds.forEach((id) => forgotten.add(id));
    if (op.type === 'pin') op.memoryIds.forEach((id) => pinOverride.set(id, op.pinned ? 1 : 0));
  }
  const out: T[] = [];
  for (const row of rows) {
    if (forgotten.has(row.id)) continue;
    const pinned = pinOverride.get(row.id);
    out.push(pinned === undefined ? row : { ...row, pinned });
  }
  return out;
}

export function applyConflictOps(rows: Conflict[] | undefined, ops: PendingOp[]): Conflict[] {
  if (!rows) return [];
  const resolved = new Set<number>();
  const forgotten = new Set<string>();
  for (const op of ops) {
    if (op.type === 'resolve') resolved.add(op.conflictId);
    if (op.type === 'forget') op.memoryIds.forEach((id) => forgotten.add(id));
  }
  if (resolved.size === 0 && forgotten.size === 0) return rows;
  return rows.filter((c) => !resolved.has(c.id) && !forgotten.has(c.memory_a_id) && !forgotten.has(c.memory_b_id));
}

export function isPendingForget(ops: PendingOp[], memoryId: string): boolean {
  return ops.some((op) => op.type === 'forget' && op.memoryIds.includes(memoryId));
}

export function pendingPinned(ops: PendingOp[], memoryId: string): boolean | undefined {
  let value: boolean | undefined;
  for (const op of ops) if (op.type === 'pin' && op.memoryIds.includes(memoryId)) value = op.pinned;
  return value;
}

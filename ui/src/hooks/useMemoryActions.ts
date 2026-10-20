import { useCallback } from 'react';
import { scheduleOp } from '@/lib/pending-ops';
import type { Memory } from '@/lib/api';
import { pluralize } from '@/lib/format';

/** Pin / forget through the undoable op queue so every change gets a 6s undo toast. */
export function useMemoryActions() {
  const setPinned = useCallback((memories: Array<Pick<Memory, 'id' | 'title'>>, pinned: boolean) => {
    if (memories.length === 0) return;
    const label =
      memories.length === 1
        ? `${pinned ? 'Pinned' : 'Unpinned'} "${memories[0].title}"`
        : `${pinned ? 'Pinned' : 'Unpinned'} ${pluralize(memories.length, 'memory', 'memories')}`;
    scheduleOp({ type: 'pin', memoryIds: memories.map((m) => m.id), pinned, label });
  }, []);

  const forget = useCallback((memories: Array<Pick<Memory, 'id' | 'title'>>) => {
    if (memories.length === 0) return;
    const label =
      memories.length === 1 ? `Forgot "${memories[0].title}"` : `Forgot ${pluralize(memories.length, 'memory', 'memories')}`;
    scheduleOp({ type: 'forget', memoryIds: memories.map((m) => m.id), label });
  }, []);

  const resolveConflict = useCallback((conflictId: number, keepMemoryId: string, forgetLoser: boolean, label: string) => {
    scheduleOp({ type: 'resolve', conflictId, keepMemoryId, forgetLoser, label });
  }, []);

  return { setPinned, forget, resolveConflict };
}

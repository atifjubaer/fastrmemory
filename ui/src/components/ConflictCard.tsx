import { Check, ShieldAlert, Split } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyButton } from './CopyButton';
import { SideBySideDiff } from './WordDiff';
import { useConfirm } from './ConfirmDialog';
import { useMemoryActions } from '@/hooks/useMemoryActions';
import { openMemory } from '@/lib/router';
import { relativeTime } from '@/lib/format';
import type { Conflict, Memory } from '@/lib/api';
import { cn } from '@/lib/utils';

function short(m: Memory | null | undefined, id: string) {
  return m ? `"${m.title}"` : id;
}

export function ConflictCard({
  conflict,
  memoryA,
  memoryB,
  compact = false,
  onResolved,
}: {
  conflict: Conflict;
  memoryA?: Memory | null;
  memoryB?: Memory | null;
  compact?: boolean;
  onResolved?: () => void;
}) {
  const { resolveConflict } = useMemoryActions();
  const { confirm, element } = useConfirm();
  const a = memoryA ?? conflict.memory_a ?? null;
  const b = memoryB ?? conflict.memory_b ?? null;

  const resolve = (keep: 'a' | 'b' | 'both') => {
    const keepId = keep === 'b' ? conflict.memory_b_id : conflict.memory_a_id;
    const loser = keep === 'b' ? a : b;
    const loserId = keep === 'b' ? conflict.memory_a_id : conflict.memory_b_id;
    const keeper = keep === 'b' ? b : a;
    confirm({
      title: keep === 'both' ? 'Keep both memories?' : `Keep memory ${keep.toUpperCase()}?`,
      description:
        keep === 'both' ? (
          <>
            Both stay active. The reward score of {short(b, conflict.memory_b_id)} drops by 0.4 so A ranks higher in recall.
          </>
        ) : (
          <>
            {short(keeper, keepId)} stays active. {short(loser, loserId)} is marked superseded by it and stops being recalled.
            You can undo for 6 seconds.
          </>
        ),
      confirmLabel: keep === 'both' ? 'Keep both' : `Keep ${keep.toUpperCase()}`,
      destructive: keep !== 'both',
      onConfirm: () => {
        resolveConflict(
          conflict.id,
          keepId,
          keep !== 'both',
          keep === 'both' ? `Kept both sides of conflict #${conflict.id}` : `Resolved conflict #${conflict.id} (kept ${keep.toUpperCase()})`
        );
        onResolved?.();
      },
    });
  };

  return (
    <article className={cn('rounded-xl border border-l-4 border-l-risk bg-card shadow-xs', compact ? 'p-3' : 'p-4 sm:p-5')}>
      <header className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <Badge variant="risk">
            <ShieldAlert aria-hidden /> Conflict #{conflict.id}
          </Badge>
          <Badge variant="muted" className="font-mono">
            {(conflict.score * 100).toFixed(0)}% similar
          </Badge>
          <span className="text-sm font-medium">{conflict.reason}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span title={conflict.created_at}>{relativeTime(conflict.created_at)}</span>
          <CopyButton
            text={`# Conflict ${conflict.id}\nMemory A: ${conflict.memory_a_id}\nMemory B: ${conflict.memory_b_id}\nReason: ${conflict.reason}`}
            description="Copy conflict report"
            variant="ghost"
          />
        </div>
      </header>

      <SideBySideDiff
        left={a?.content ?? '(memory A is no longer available)'}
        right={b?.content ?? '(memory B is no longer available)'}
        leftLabel={
          <MemoryLabel side="A" id={conflict.memory_a_id} memory={a} />
        }
        rightLabel={
          <MemoryLabel side="B" id={conflict.memory_b_id} memory={b} />
        }
      />

      <footer className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => resolve('a')}>
          <Check aria-hidden /> Keep A
        </Button>
        <Button size="sm" variant="outline" onClick={() => resolve('b')}>
          <Check aria-hidden /> Keep B
        </Button>
        <Button size="sm" variant="ghost" onClick={() => resolve('both')}>
          <Split aria-hidden /> Keep both
        </Button>
      </footer>
      {element}
    </article>
  );
}

function MemoryLabel({ side, id, memory }: { side: 'A' | 'B'; id: string; memory: Memory | null }) {
  return (
    <span className="flex min-w-0 flex-wrap items-center gap-1.5">
      <span className="font-semibold text-foreground">{side}</span>
      <button
        type="button"
        onClick={() => openMemory(id)}
        className="min-w-0 truncate text-left text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        {memory?.title ?? id}
      </button>
      <code className="font-mono text-[10px]">{id}</code>
    </span>
  );
}

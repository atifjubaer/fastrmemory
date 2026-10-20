import * as React from 'react';
import { diffStats, wordDiff, type DiffOp } from '@/lib/diff';
import { cn } from '@/lib/utils';

const ADDED = 'rounded-sm bg-success-weak text-success underline decoration-success/60 decoration-1 underline-offset-2';
const REMOVED = 'rounded-sm bg-risk-weak text-risk line-through decoration-risk/70';

/** Unified inline word diff: removed words struck through, added words underlined. */
export function InlineWordDiff({ before, after, className }: { before: string; after: string; className?: string }) {
  const ops = React.useMemo(() => wordDiff(before, after), [before, after]);
  const stats = React.useMemo(() => diffStats(ops), [ops]);
  return (
    <div className={className}>
      <div className="mb-2 flex gap-3 font-mono text-xs">
        <span className="text-success">+{stats.added} words</span>
        <span className="text-risk">-{stats.removed} words</span>
      </div>
      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
        {ops.map((op, i) => (
          <DiffSpan key={i} op={op} />
        ))}
      </p>
    </div>
  );
}

function DiffSpan({ op }: { op: DiffOp }) {
  if (op.type === 'same') return <span>{op.text}</span>;
  if (op.type === 'added')
    return (
      <ins className={ADDED}>
        <span className="sr-only">[added: </span>
        {op.text}
        <span className="sr-only">]</span>
      </ins>
    );
  return (
    <del className={REMOVED}>
      <span className="sr-only">[removed: </span>
      {op.text}
      <span className="sr-only">]</span>
    </del>
  );
}

/** Side-by-side word diff: left shows A with removals highlighted, right shows B with additions highlighted. */
export function SideBySideDiff({
  left,
  right,
  leftLabel,
  rightLabel,
}: {
  left: string;
  right: string;
  leftLabel: React.ReactNode;
  rightLabel: React.ReactNode;
}) {
  const ops = React.useMemo(() => wordDiff(left, right), [left, right]);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <DiffPane label={leftLabel}>
        {ops.map((op, i) =>
          op.type === 'added' ? null : op.type === 'removed' ? <DiffSpan key={i} op={op} /> : <span key={i}>{op.text}</span>
        )}
      </DiffPane>
      <DiffPane label={rightLabel}>
        {ops.map((op, i) =>
          op.type === 'removed' ? null : op.type === 'added' ? <DiffSpan key={i} op={op} /> : <span key={i}>{op.text}</span>
        )}
      </DiffPane>
    </div>
  );
}

function DiffPane({ label, children, className }: { label: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('min-w-0 rounded-lg border bg-muted/40 p-3', className)}>
      <div className="mb-2 text-xs font-medium text-muted-foreground">{label}</div>
      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{children}</p>
    </div>
  );
}

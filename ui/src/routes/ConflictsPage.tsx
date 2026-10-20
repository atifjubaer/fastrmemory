import { ShieldCheck, Swords } from 'lucide-react';
import { EmptyState, ErrorState, PageHeader, SkeletonRows, Term } from '@/components/common';
import { ConflictCard } from '@/components/ConflictCard';
import { useConflicts } from '@/hooks/queries';
import { pluralize } from '@/lib/format';

export function ConflictsPage() {
  const conflicts = useConflicts();
  const list = conflicts.data ?? [];
  return (
    <div>
      <PageHeader
        icon={Swords}
        title="Conflicts"
        description={
          <>
            Pairs of active memories that contradict each other. Agents may follow either one until you decide.{' '}
            <Term k="conflict">How resolution works</Term>
          </>
        }
      />
      {conflicts.isLoading || (conflicts.isFetching && list.length === 0) ? (
        <SkeletonRows rows={4} />
      ) : conflicts.isError ? (
        <ErrorState error={conflicts.error} onRetry={() => conflicts.refetch()} />
      ) : list.length === 0 ? (
        <EmptyState icon={ShieldCheck} title="No open conflicts">
          FastrMemory compares each new memory with recent ones in the same module. Contradictions show up here with a word-level
          diff.
        </EmptyState>
      ) : (
        <>
          <p className="mb-3 text-sm text-muted-foreground" aria-live="polite">
            {pluralize(list.length, 'open conflict')}
          </p>
          <div className="flex flex-col gap-4">
            {list.map((c) => (
              <ConflictCard key={c.id} conflict={c} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

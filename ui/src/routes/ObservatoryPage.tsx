import * as React from 'react';
import { Orbit } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyState, ErrorState, PageHeader, SkeletonRows } from '@/components/common';
import { BrainObservatory3D, type ObservatoryFilter } from '@/components/BrainObservatory3D';
import { useConflicts, useMemories } from '@/hooks/queries';
import { buildHash, openMemory } from '@/lib/router';

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function ObservatoryPage() {
  const memories = useMemories();
  const conflicts = useConflicts();
  const [filter, setFilter] = React.useState<ObservatoryFilter>('all');
  const webgl = React.useMemo(supportsWebGL, []);
  const list = memories.data ?? [];
  const traps = list.filter((m) => m.kind === 'error_trap').length;

  return (
    <div>
      <PageHeader
        icon={Orbit}
        title="3D Observatory"
        description={
          <>
            Every active memory as a star, clustered by module. Amber halos are error traps, red wires are open conflicts. Drag to orbit,
            scroll to zoom, click a star to open it. The <a className="underline underline-offset-4" href={buildHash('memories')}>Memories</a>{' '}
            list shows the same data in an accessible table.
          </>
        }
      />
      <Tabs value={filter} onValueChange={(v) => setFilter(v as ObservatoryFilter)} className="mb-3">
        <TabsList>
          <TabsTrigger value="all">All ({list.length})</TabsTrigger>
          <TabsTrigger value="rules">Rules ({list.length - traps})</TabsTrigger>
          <TabsTrigger value="traps">Traps ({traps})</TabsTrigger>
          <TabsTrigger value="conflicts">Conflicts ({conflicts.data?.length ?? 0})</TabsTrigger>
        </TabsList>
      </Tabs>
      {memories.isLoading ? (
        <SkeletonRows rows={6} />
      ) : memories.isError ? (
        <ErrorState error={memories.error} onRetry={() => memories.refetch()} />
      ) : !webgl ? (
        <EmptyState icon={Orbit} title="3D view unavailable">
          This browser has WebGL turned off. Use the Graph or Memories pages instead.
        </EmptyState>
      ) : list.length === 0 ? (
        <EmptyState icon={Orbit} title="No memories to show">
          The galaxy fills up as agents record rules and traps.
        </EmptyState>
      ) : (
        <BrainObservatory3D memories={list} conflicts={conflicts.data ?? []} filter={filter} onSelect={openMemory} />
      )}
    </div>
  );
}

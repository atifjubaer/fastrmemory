import * as React from 'react';
import { LayoutGrid } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmptyState, ErrorState, PageHeader, SkeletonRows } from '@/components/common';
import { TreemapCanvas, type TreemapSize } from '@/components/TreemapCanvas';
import { useMemories } from '@/hooks/queries';
import { openMemory } from '@/lib/router';

export default function TreemapPage() {
  const memories = useMemories();
  const [size, setSize] = React.useState<TreemapSize>('count');
  const list = memories.data ?? [];
  return (
    <div>
      <PageHeader
        icon={LayoutGrid}
        title="Treemap"
        description="Where knowledge concentrates: modules as blocks, memories as tiles. Faded tiles are still in staging."
        actions={
          <Tabs value={size} onValueChange={(v) => setSize(v as TreemapSize)}>
            <TabsList>
              <TabsTrigger value="count">Size: equal</TabsTrigger>
              <TabsTrigger value="recalls">Size: recalls</TabsTrigger>
            </TabsList>
          </Tabs>
        }
      />
      {memories.isLoading ? (
        <SkeletonRows rows={6} />
      ) : memories.isError ? (
        <ErrorState error={memories.error} onRetry={() => memories.refetch()} />
      ) : list.length === 0 ? (
        <EmptyState icon={LayoutGrid} title="Nothing to map yet">Memories appear here grouped by module.</EmptyState>
      ) : (
        <div className="rounded-xl border bg-card p-2">
          <TreemapCanvas memories={list} size={size} onSelect={openMemory} />
          <div className="flex flex-wrap gap-x-4 gap-y-1 px-1 pt-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-sm bg-brand" aria-hidden /> Rule</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-sm bg-trap" aria-hidden /> Trap</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-sm bg-pinned" aria-hidden /> Decision</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-sm bg-success" aria-hidden /> Workflow</span>
          </div>
        </div>
      )}
    </div>
  );
}

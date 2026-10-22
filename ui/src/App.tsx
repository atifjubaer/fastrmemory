import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppShell } from '@/components/layout/AppShell';
import { MemoryDetailSheet } from '@/components/MemoryDetailSheet';
import { LiveSyncProvider } from '@/hooks/useLiveSync';
import { queryClient } from '@/lib/query-client';
import { ThemeProvider } from '@/lib/theme';
import { useRoute, type RouteName } from '@/lib/router';
import { flushPendingOps } from '@/lib/pending-ops';
import { SkeletonRows } from '@/components/common';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { HomePage } from '@/routes/HomePage';
import { MemoriesPage } from '@/routes/MemoriesPage';
import { TrapsPage } from '@/routes/TrapsPage';
import { ConflictsPage } from '@/routes/ConflictsPage';
import { HealthPage } from '@/routes/HealthPage';
import { SettingsPage } from '@/routes/SettingsPage';
import { SearchLabPage } from '@/routes/SearchLabPage';
import { ReplayPage } from '@/routes/ReplayPage';

// Canvas/WebGL views are split out of the main bundle; three.js only loads when the 3D view opens.
const ActionsPage = React.lazy(() => import('@/routes/ActionsPage'));
const GraphPage = React.lazy(() => import('@/routes/GraphPage'));
const ObservatoryPage = React.lazy(() => import('@/routes/ObservatoryPage'));
const TreemapPage = React.lazy(() => import('@/routes/TreemapPage'));

const PAGES: Record<RouteName, React.ComponentType> = {
  home: HomePage,
  memories: MemoriesPage,
  traps: TrapsPage,
  conflicts: ConflictsPage,
  actions: ActionsPage,
  graph: GraphPage,
  observatory: ObservatoryPage,
  treemap: TreemapPage,
  search: SearchLabPage,
  replay: ReplayPage,
  health: HealthPage,
  settings: SettingsPage,
};

function CurrentPage() {
  const route = useRoute();
  const Page = PAGES[route.name];
  return (
    <ErrorBoundary resetKey={route.name}>
      <React.Suspense fallback={<SkeletonRows rows={8} />}>
        <Page />
      </React.Suspense>
    </ErrorBoundary>
  );
}

export function App() {
  // Commit undoable actions that are still waiting if the tab closes during the 6s window.
  React.useEffect(() => {
    const onHide = () => flushPendingOps();
    window.addEventListener('pagehide', onHide);
    return () => window.removeEventListener('pagehide', onHide);
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={250}>
          <LiveSyncProvider>
            <AppShell>
              <CurrentPage />
            </AppShell>
            <MemoryDetailSheet />
            <Toaster position="bottom-right" closeButton />
          </LiveSyncProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

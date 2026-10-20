import * as React from 'react';
import { Command as CommandIcon, Menu, Monitor, Moon, Plus, RefreshCw, Sun, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateMemoryDialog } from '@/components/CreateMemoryDialog';
import { CommandPalette } from './CommandPalette';
import { NAV } from './nav';
import { useStatus } from '@/hooks/queries';
import { useLiveSync } from '@/hooks/useLiveSync';
import { buildHash, useRoute } from '@/lib/router';
import { useTheme, type ThemeMode } from '@/lib/theme';
import { undoLatest } from '@/lib/pending-ops';
import { relativeTime } from '@/lib/format';
import { cn, isEditableTarget } from '@/lib/utils';

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const route = useRoute();
  const { data: status } = useStatus();
  return (
    <nav aria-label="Main" className="flex flex-col gap-5 px-3 py-4">
      {NAV.map((group) => (
        <div key={group.label}>
          <div className="mb-1.5 px-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">{group.label}</div>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = route.name === item.route;
              const count = status && item.count ? item.count(status) : undefined;
              const Icon = item.icon;
              return (
                <li key={item.route}>
                  <a
                    href={buildHash(item.route)}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex h-8 items-center gap-2.5 rounded-md px-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50',
                      active
                        ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground'
                    )}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    <span className="truncate">{item.label}</span>
                    {count !== undefined && (
                      <span
                        className={cn(
                          'ml-auto font-mono text-xs tabular-nums',
                          count > 0 && item.tone === 'trap' && 'text-trap',
                          count > 0 && item.tone === 'risk' && 'text-risk',
                          !(count > 0 && item.tone) && 'text-muted-foreground'
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Brand() {
  const { data: status } = useStatus();
  return (
    <a href={buildHash('home')} className="flex min-w-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
        <Zap className="size-4" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-sm leading-tight font-semibold">FastrMemory</span>
        <span className="block truncate font-mono text-[11px] leading-tight text-muted-foreground">
          {status?.projectName ?? 'Loading…'}
        </span>
      </span>
    </a>
  );
}

function LiveIndicator() {
  const sync = useLiveSync();
  const label = { live: 'Live', stale: 'Stale', connecting: 'Connecting', paused: 'Paused' }[sync.health];
  const dot = { live: 'bg-success', stale: 'bg-risk', connecting: 'bg-trap', paused: 'bg-muted-foreground' }[sync.health];
  const detail =
    sync.health === 'stale'
      ? `No update from the server${sync.lastSyncAt ? ` since ${relativeTime(new Date(sync.lastSyncAt).toISOString())}` : ''}${sync.lastError ? `: ${sync.lastError}` : ''}. Click to resync.`
      : sync.health === 'paused'
        ? 'Background polling is paused (tab hidden or disabled in Settings). Click to resync now.'
        : `Watching the database for changes from agents, the CLI and this dashboard${sync.lastChangeAt ? ` · last change ${relativeTime(new Date(sync.lastChangeAt).toISOString())}` : ''}. Click to resync.`;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="sm" onClick={sync.resync} aria-label={`Sync status: ${label}. Resync`} className="gap-2">
          <span className="relative flex size-2">
            {sync.health === 'live' && (
              <span className={cn('absolute inline-flex size-full animate-ping rounded-full opacity-60 motion-reduce:hidden', dot)} />
            )}
            <span className={cn('relative inline-flex size-2 rounded-full', dot)} />
          </span>
          <span className="hidden sm:inline">{label}</span>
          {sync.health === 'stale' && <RefreshCw className="size-3.5" aria-hidden />}
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-72">{detail}</TooltipContent>
    </Tooltip>
  );
}

function ThemeMenu() {
  const { mode, resolved, setMode } = useTheme();
  const Icon = mode === 'system' ? Monitor : resolved === 'dark' ? Moon : Sun;
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Change theme">
              <Icon aria-hidden />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Theme</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={mode} onValueChange={(v) => setMode(v as ThemeMode)}>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const route = useRoute();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [createOpen, setCreateOpen] = React.useState(false);
  const mainRef = React.useRef<HTMLElement>(null);

  // Global shortcuts. Typing in a field never triggers them, and Ctrl+Z keeps its native meaning there.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (isEditableTarget(e.target)) return;
      if (mod && !e.shiftKey && e.key.toLowerCase() === 'z') {
        if (undoLatest()) e.preventDefault();
        return;
      }
      if (!mod && !e.altKey && e.key === '/') {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Move focus to the page on navigation so keyboard and screen reader users land on the new content.
  React.useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
    mainRef.current?.scrollTo?.({ top: 0 });
  }, [route.name]);

  return (
    <div className="flex h-dvh overflow-hidden bg-canvas text-foreground">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
        className="sr-only z-50 rounded-md bg-background px-3 py-2 focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Skip to content
      </a>

      <aside className="hidden w-60 shrink-0 flex-col border-r bg-sidebar md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Brand />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <SidebarNav />
        </div>
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 gap-0 bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">Dashboard sections</SheetDescription>
          <div className="flex h-14 items-center border-b px-4">
            <Brand />
          </div>
          <div className="overflow-y-auto">
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur sm:px-5">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>
            <Menu aria-hidden />
          </Button>
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border bg-card px-3 text-left text-sm text-muted-foreground shadow-xs outline-none hover:bg-accent/50 focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:max-w-md"
          >
            <CommandIcon className="size-4 shrink-0" aria-hidden />
            <span className="truncate">Search memories, jump to a page…</span>
            <kbd className="ml-auto hidden rounded border bg-muted px-1.5 font-mono text-[10px] sm:inline">Ctrl K</kbd>
          </button>
          <div className="ml-auto flex items-center gap-1.5">
            <LiveIndicator />
            <ThemeMenu />
            <Button size="sm" onClick={() => setCreateOpen(true)} aria-label="New memory">
              <Plus aria-hidden />
              <span className="hidden sm:inline">New memory</span>
            </Button>
          </div>
        </header>

        <main
          id="main"
          ref={mainRef}
          tabIndex={-1}
          className="min-h-0 flex-1 overflow-y-auto outline-none"
        >
          <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6">{children}</div>
        </main>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} onCreate={() => setCreateOpen(true)} />
      <CreateMemoryDialog open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}

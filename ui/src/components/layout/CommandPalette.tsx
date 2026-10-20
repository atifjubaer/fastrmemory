import * as React from 'react';
import { Moon, Plus, RefreshCw, Sun } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { KindBadge } from '@/components/common';
import { ALL_NAV_ITEMS } from './nav';
import { useSearch } from '@/hooks/queries';
import { useDebounced } from '@/hooks/useDebounced';
import { useLiveSync } from '@/hooks/useLiveSync';
import { navigate, openMemory } from '@/lib/router';
import { useTheme } from '@/lib/theme';

/** Ctrl/Cmd+K palette: jump to pages, search memories server-side, run common actions. */
export function CommandPalette({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: () => void;
}) {
  const [query, setQuery] = React.useState('');
  const debounced = useDebounced(query.trim(), 200);
  const search = useSearch({ q: debounced, limit: 8 });
  const { resolved, setMode } = useTheme();
  const { resync } = useLiveSync();

  React.useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const run = (fn: () => void) => {
    onOpenChange(false);
    // Let the dialog close (and return focus) before navigating or opening another dialog.
    requestAnimationFrame(fn);
  };

  const hits = debounced ? (search.data?.results ?? []) : [];
  const pages = ALL_NAV_ITEMS.filter((i) => !debounced || i.label.toLowerCase().includes(debounced.toLowerCase()));

  // Results arrive asynchronously (server-side search), so keep the highlight on the first item;
  // otherwise cmdk has nothing selected and Enter does nothing.
  const firstValue = hits[0] ? `memory-${hits[0].id}` : pages[0] ? `page-${pages[0].route}` : !debounced ? 'action-create' : '';
  const [active, setActive] = React.useState(firstValue);
  React.useEffect(() => setActive(firstValue), [firstValue]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command palette"
      description="Search memories or jump to a page"
      commandProps={{ shouldFilter: false, value: active, onValueChange: setActive }}
    >
      <CommandInput placeholder="Search memories or type a page name…" value={query} onValueChange={setQuery} />
      <CommandList>
        <CommandEmpty>{search.isFetching ? 'Searching…' : 'No matches.'}</CommandEmpty>
        {hits.length > 0 && (
          <CommandGroup heading="Memories">
            {hits.map((m) => (
              <CommandItem key={m.id} value={`memory-${m.id}`} onSelect={() => run(() => openMemory(m.id))}>
                <KindBadge kind={m.kind} />
                <span className="truncate">{m.title}</span>
                <span className="ml-auto shrink-0 font-mono text-[11px] text-muted-foreground">{m.module}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {pages.length > 0 && (
          <CommandGroup heading="Pages">
            {pages.map((item) => (
              <CommandItem key={item.route} value={`page-${item.route}`} onSelect={() => run(() => navigate(item.route))}>
                <item.icon aria-hidden />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {!debounced && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem value="action-create" onSelect={() => run(onCreate)}>
                <Plus aria-hidden /> New memory
              </CommandItem>
              <CommandItem value="action-resync" onSelect={() => run(resync)}>
                <RefreshCw aria-hidden /> Resync with the database
              </CommandItem>
              <CommandItem value="action-theme" onSelect={() => run(() => setMode(resolved === 'dark' ? 'light' : 'dark'))}>
                {resolved === 'dark' ? <Sun aria-hidden /> : <Moon aria-hidden />} Switch to {resolved === 'dark' ? 'light' : 'dark'} theme
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}

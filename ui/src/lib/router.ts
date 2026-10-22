import { useSyncExternalStore } from 'react';

/** Hash routes: `#/memories/<id>`, `#/traps?m=<id>`, ... Hash routing keeps deep links working on the static server. */
export type RouteName =
  | 'home'
  | 'memories'
  | 'traps'
  | 'conflicts'
  | 'actions'
  | 'graph'
  | 'observatory'
  | 'treemap'
  | 'search'
  | 'replay'
  | 'health'
  | 'settings';

export const ROUTE_NAMES: RouteName[] = [
  'home',
  'memories',
  'traps',
  'conflicts',
  'actions',
  'graph',
  'observatory',
  'treemap',
  'search',
  'replay',
  'health',
  'settings',
];

/** Legacy v1 tab ids keep working as deep links. */
const LEGACY: Record<string, RouteName> = { overview: 'home', dag: 'actions', rrf: 'search' };

export interface Route {
  name: RouteName;
  /** Path parameter, e.g. the memory id in `#/memories/<id>` or action id in `#/actions/<id>`. */
  id: string | null;
  query: URLSearchParams;
  /** Memory opened in the detail sheet on any page (`#/memories/<id>` or `?m=<id>`). */
  memoryId: string | null;
}

function parse(hash: string): Route {
  const raw = hash.replace(/^#\/?/, '');
  const [pathPart, queryPart = ''] = raw.split('?');
  const segments = pathPart.split('/').filter(Boolean).map((s) => {
    try {
      return decodeURIComponent(s);
    } catch {
      return s;
    }
  });
  const head = segments[0] || 'home';
  const name: RouteName = (ROUTE_NAMES as string[]).includes(head) ? (head as RouteName) : LEGACY[head] ?? 'home';
  const query = new URLSearchParams(queryPart);
  const id = segments[1] ?? null;
  const memoryId = name === 'memories' && id ? id : query.get('m');
  return { name, id, query, memoryId };
}

let cachedHash: string | null = null;
let cachedRoute: Route = parse('');

function getSnapshot(): Route {
  const hash = window.location.hash;
  if (hash !== cachedHash) {
    cachedHash = hash;
    cachedRoute = parse(hash);
  }
  return cachedRoute;
}

function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
}

export function useRoute(): Route {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function buildHash(name: RouteName, id?: string | null, query?: Record<string, string | null | undefined>): string {
  let h = `#/${name === 'home' ? '' : name}`;
  if (id) h += `/${encodeURIComponent(id)}`;
  if (query) {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) if (v) sp.set(k, v);
    const s = sp.toString();
    if (s) h += `?${s}`;
  }
  return h;
}

export function navigate(name: RouteName, id?: string | null, query?: Record<string, string | null | undefined>) {
  const next = buildHash(name, id, query);
  if (window.location.hash !== next) window.location.hash = next;
}

/** Opens the memory detail sheet without leaving the current page (canonical link on the Memories page). */
export function openMemory(memoryId: string) {
  const route = getSnapshot();
  if (route.name === 'memories') {
    navigate('memories', memoryId, Object.fromEntries(route.query));
  } else {
    const q = Object.fromEntries(route.query);
    navigate(route.name, route.id, { ...q, m: memoryId });
  }
}

export function closeMemory() {
  const route = getSnapshot();
  const q = Object.fromEntries(route.query);
  delete q.m;
  if (route.name === 'memories') navigate('memories', null, q);
  else navigate(route.name, route.id, q);
}

export function memoryPermalink(memoryId: string): string {
  return `${window.location.origin}${window.location.pathname}${buildHash('memories', memoryId)}`;
}

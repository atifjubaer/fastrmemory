import {
  Activity,
  Boxes,
  GitFork,
  HeartPulse,
  Home,
  LayoutGrid,
  Library,
  type LucideIcon,
  Orbit,
  Search,
  Settings,
  ShieldAlert,
  Swords,
} from 'lucide-react';
import type { FastrStatus } from '@/lib/api';
import type { RouteName } from '@/lib/router';

export interface NavItem {
  route: RouteName;
  label: string;
  icon: LucideIcon;
  /** Live count shown next to the label, read from /api/status. */
  count?: (s: FastrStatus) => number;
  /** Count colour when non-zero (traps/conflicts draw attention). */
  tone?: 'trap' | 'risk';
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  { label: 'Overview', items: [{ route: 'home', label: 'Home', icon: Home }] },
  {
    label: 'Knowledge',
    items: [
      { route: 'memories', label: 'Memories', icon: Library, count: (s) => s.activeCount },
      { route: 'traps', label: 'Traps', icon: ShieldAlert, count: (s) => s.trapsCount, tone: 'trap' },
      { route: 'conflicts', label: 'Conflicts', icon: Swords, count: (s) => s.conflictsCount, tone: 'risk' },
    ],
  },
  {
    label: 'Work',
    items: [{ route: 'actions', label: 'Actions', icon: GitFork, count: (s) => s.actionsCount }],
  },
  {
    label: 'Explore',
    items: [
      { route: 'graph', label: 'Graph', icon: Boxes, count: (s) => s.graphNodesCount },
      { route: 'observatory', label: '3D Observatory', icon: Orbit },
      { route: 'treemap', label: 'Treemap', icon: LayoutGrid },
      { route: 'search', label: 'Search Lab', icon: Search },
    ],
  },
  {
    label: 'System',
    items: [
      { route: 'health', label: 'Health', icon: HeartPulse },
      { route: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

export const ALL_NAV_ITEMS: NavItem[] = NAV.flatMap((g) => g.items);

export const ACTIVITY_ICON = Activity;

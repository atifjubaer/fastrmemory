import * as React from 'react';
import { AlertTriangle, HelpCircle, RefreshCw, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { GLOSSARY, type GlossaryKey } from '@/lib/glossary';
import { KIND_LABEL } from '@/lib/format';
import type { MemoryKind, MemoryStatus } from '@/lib/api';
import { cn } from '@/lib/utils';

/** Inline glossary term: dotted underline + tooltip explanation. */
export function Term({ k, children, className }: { k: GlossaryKey; children?: React.ReactNode; className?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex cursor-help items-center gap-1 rounded-sm underline decoration-muted-foreground/50 decoration-dotted underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
            className
          )}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-72">{GLOSSARY[k]}</TooltipContent>
    </Tooltip>
  );
}

export function HelpTip({ k, label }: { k: GlossaryKey; label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`What is ${label}?`}
          className="inline-flex size-5 items-center justify-center rounded-full text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <HelpCircle className="size-3.5" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-72">{GLOSSARY[k]}</TooltipContent>
    </Tooltip>
  );
}

export function KindBadge({ kind, className }: { kind: MemoryKind; className?: string }) {
  const variant = kind === 'error_trap' ? 'trap' : kind === 'decision' ? 'pinned' : kind === 'workflow' ? 'success' : 'brand';
  return (
    <Badge variant={variant} className={cn('font-mono text-[10px] tracking-wide uppercase', className)}>
      {KIND_LABEL[kind] ?? kind}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: MemoryStatus }) {
  const variant = status === 'verified' ? 'success' : status === 'staging' ? 'trap' : status === 'superseded' ? 'muted' : 'secondary';
  return (
    <Badge variant={variant} className="text-[10px] capitalize">
      {status}
    </Badge>
  );
}

export function PageHeader({
  title,
  description,
  actions,
  icon: Icon,
}: {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          {Icon && <Icon className="size-5 text-brand" aria-hidden />}
          {title}
        </h1>
        {description && <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  children,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-12 text-center', className)}>
      <div className="flex size-11 items-center justify-center rounded-full bg-muted">
        <Icon className="size-5 text-muted-foreground" aria-hidden />
      </div>
      <div className="max-w-md">
        <h3 className="font-medium">{title}</h3>
        {children && <div className="mt-1 text-sm text-muted-foreground">{children}</div>}
      </div>
      {action}
    </div>
  );
}

export function ErrorState({ error, onRetry, className }: { error: unknown; onRetry?: () => void; className?: string }) {
  const message = error instanceof Error ? error.message : String(error ?? 'Unknown error');
  return (
    <div
      role="alert"
      className={cn('flex flex-col items-center justify-center gap-3 rounded-xl border border-risk/40 bg-risk-weak px-6 py-10 text-center', className)}
    >
      <AlertTriangle className="size-6 text-risk" aria-hidden />
      <div>
        <h3 className="font-medium">Could not load this data</h3>
        <p className="mt-1 text-sm break-all text-muted-foreground">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw aria-hidden /> Retry
        </Button>
      )}
    </div>
  );
}

export function SkeletonRows({ rows = 6, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-2', className)} aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-10 w-full" />
      ))}
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
  tone = 'default',
  onClick,
  loading,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
  tone?: 'default' | 'trap' | 'risk' | 'success' | 'brand';
  onClick?: () => void;
  loading?: boolean;
}) {
  const toneClass = {
    default: 'text-foreground',
    trap: 'text-trap',
    risk: 'text-risk',
    success: 'text-success',
    brand: 'text-brand',
  }[tone];
  const content = (
    <>
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      {loading ? (
        <Skeleton className="mt-2 h-7 w-16" />
      ) : (
        <div className={cn('mt-1 font-mono text-2xl font-semibold tabular-nums', toneClass)}>{value}</div>
      )}
      {hint && <div className="mt-1 truncate text-xs text-muted-foreground">{hint}</div>}
    </>
  );
  // Clickable tiles render as a button, so their label must be plain text (no nested buttons like <Term>).
  const base = 'min-w-0 rounded-xl border bg-card p-4 text-left shadow-xs';
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(base, 'transition-colors outline-none hover:bg-accent/50 focus-visible:ring-[3px] focus-visible:ring-ring/50')}
      >
        {content}
      </button>
    );
  }
  return <div className={base}>{content}</div>;
}

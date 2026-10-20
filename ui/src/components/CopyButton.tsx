import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

interface CopyButtonProps {
  text: string;
  /** Visible label. When omitted the button is icon-only and `description` becomes its accessible name. */
  label?: string;
  description?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'icon-sm';
  variant?: 'outline' | 'ghost' | 'secondary';
}

export function CopyButton({ text, label, description, className, size, variant = 'outline' }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const accessible = description ?? (label ? `Copy ${label}` : 'Copy to clipboard');

  const onClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const ok = await copyText(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } else {
      toast.error('Clipboard is not available in this browser');
    }
  };

  const button = (
    <Button
      type="button"
      variant={variant}
      size={size ?? (label ? 'xs' : 'icon-sm')}
      onClick={onClick}
      aria-label={label ? undefined : accessible}
      className={cn(copied && 'text-success', className)}
    >
      {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
      {label && <span>{copied ? 'Copied' : label}</span>}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </Button>
  );

  if (label) return button;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent>{accessible}</TooltipContent>
    </Tooltip>
  );
}

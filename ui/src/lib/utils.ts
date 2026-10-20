import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True when a keyboard event originates from a field where typing must not trigger global shortcuts. */
export function isEditableTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.tagName) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
}

/** True when the event target is an interactive control that handles Enter/Space itself. */
export function isInteractiveTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el || !el.closest) return false;
  return Boolean(el.closest('button, a, [role="button"], [role="menuitem"], [role="option"], [role="checkbox"], [role="tab"], [role="dialog"], input, textarea, select'));
}

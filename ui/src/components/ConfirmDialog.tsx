import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';

export interface ConfirmRequest {
  title: string;
  description: React.ReactNode;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
}

/** Imperative-friendly confirm: render once, pass a request object (or null to close). */
export function ConfirmDialog({ request, onOpenChange }: { request: ConfirmRequest | null; onOpenChange: (open: boolean) => void }) {
  return (
    <AlertDialog open={request !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{request?.title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>{request?.description}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={request?.destructive ? buttonVariants({ variant: 'destructive' }) : undefined}
            onClick={() => request?.onConfirm()}
          >
            {request?.confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function useConfirm() {
  const [request, setRequest] = React.useState<ConfirmRequest | null>(null);
  const element = <ConfirmDialog request={request} onOpenChange={(open) => !open && setRequest(null)} />;
  return { confirm: setRequest, element };
}

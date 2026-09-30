import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { RiCloseLine } from '@remixicon/react';
import { cn } from '../../lib/cn';
import { IconButton } from './IconButton';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/** Native modal supplies top-layer placement, background inertness, Escape and focus restoration. */
export function Dialog({ open, onClose, title, description, children, footer, className }: DialogProps) {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  if (typeof document === 'undefined') return null;
  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      className={cn('mt-dialog fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-mt-card bg-mt-surface p-0 text-mt-text shadow-mt-elevated border border-mt-border/60', className)}
    >
      {open ? <>
        <header className="flex items-start justify-between gap-4 px-5 pt-5">
          <div className="flex flex-col gap-1">
            <h2 id={titleId} className="text-xl font-bold tracking-tight text-mt-text">{title}</h2>
            {description ? <p id={descId} className="text-sm text-mt-text-secondary">{description}</p> : null}
          </div>
          <IconButton label="Close" icon={<RiCloseLine />} onClick={onClose} size="sm" />
        </header>
        <div className="px-5 py-5">{children}</div>
        {footer ? <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-mt-border/40 px-5 py-3.5">{footer}</footer> : null}
      </> : null}
    </dialog>, document.body,
  );
}

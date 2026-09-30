import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: ReactNode;
  error?: ReactNode;
  optional?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { id, label, hint, error, optional, className, rows, ...rest },
    ref,
  ) {
    const reactId = useId();
    const inputId = id ?? reactId;
    const describedBy = error
      ? `${inputId}-error`
      : hint
        ? `${inputId}-hint`
        : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-mt-label text-mt-text-secondary"
        >
          <span>{label}</span>
          {optional ? (
            <span className="text-[10px] tracking-mt-label text-mt-text-secondary normal-case">
              optional
            </span>
          ) : null}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={rows ?? 3}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full resize-y rounded-mt-link bg-mt-interactive px-3.5 py-2.5 text-base sm:text-sm text-mt-text placeholder:text-mt-text-secondary',
            'border border-mt-border/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
            'transition-[border-color,box-shadow] duration-150 ease-out',
            'hover:border-mt-text-secondary/60 focus:outline-none focus:border-mt-green focus:shadow-[0_0_0_2px_rgba(127,238,100,0.35)]',
            Boolean(error) && 'border-mt-red focus:border-mt-red focus:shadow-[0_0_0_2px_rgba(243,114,127,0.35)]',
            className,
          )}
          {...rest}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-mt-red">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="text-xs text-mt-text-secondary">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

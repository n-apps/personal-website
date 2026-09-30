import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

type IconButtonVariant = 'solid' | 'ghost';
type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
}

const sizes: Record<IconButtonSize, string> = {
  sm: 'h-11 w-11 sm:h-10 sm:w-10 [&_svg]:size-4',
  md: 'h-11 w-11 [&_svg]:size-5',
  lg: 'h-12 w-12 [&_svg]:size-6',
};

const variants: Record<IconButtonVariant, string> = {
  solid:
    'bg-mt-green text-mt-bg hover:bg-mt-green/90 hover:shadow-[0_8px_24px_rgba(127,238,100,0.25)]',
  ghost:
    'bg-transparent text-mt-text-secondary hover:text-mt-text hover:bg-mt-interactive/70',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { className, icon, label, variant = 'ghost', size = 'md', type, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type ?? 'button'}
        aria-label={label}
        title={label}
        className={cn(
          'inline-flex items-center justify-center rounded-mt-circle ' +
            'transition-[transform,background-color,color,box-shadow] duration-200 ease-out ' +
            'cursor-pointer active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50',
          sizes[size],
          variants[variant],
          className,
        )}
        {...rest}
      >
        {icon}
      </button>
    );
  },
);

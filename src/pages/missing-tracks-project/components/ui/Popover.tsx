import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../lib/cn';

type TriggerProps = {
  onClick?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  ref?: React.Ref<HTMLElement>;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-haspopup'?: boolean | 'menu' | 'dialog' | 'listbox' | 'tree' | 'grid';
  id?: string;
};

export interface PopoverProps {
  trigger: ReactElement<TriggerProps>;
  children: ReactNode | ((api: { close: () => void }) => ReactNode);
  align?: 'start' | 'end';
  className?: string;
}

export function Popover({ trigger, children, align = 'end', className }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const focusLast = useRef(false);

  useEffect(() => {
    if (!open) return;
    const items = () => Array.from(contentRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)') ?? []);
    const firstItems = items();
    (focusLast.current ? firstItems[firstItems.length - 1] : firstItems[0])?.focus();
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        contentRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus?.();
      } else if (e.key === 'Tab') {
        setOpen(false);
        // Return to the trigger before the browser performs normal Tab navigation.
        triggerRef.current?.focus();
      } else if (contentRef.current?.contains(e.target as Node) && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
        const list = items();
        const index = list.indexOf(document.activeElement as HTMLElement);
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 :
          (index + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length;
        list[next]?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!isValidElement(trigger)) return null;

  const originalOnClick = trigger.props.onClick;

  const triggerWithProps = cloneElement(trigger, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
    },
    'aria-expanded': open,
    'aria-haspopup': 'menu',
    'aria-controls': open ? `${id}-menu` : undefined,
    id,
    onClick: (e) => {
      originalOnClick?.(e);
      focusLast.current = false;
      setOpen((v) => !v);
    },
    onKeyDown: (e) => {
      trigger.props.onKeyDown?.(e);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        focusLast.current = e.key === 'ArrowUp';
        setOpen(true);
      }
    },
  } satisfies TriggerProps);

  const content = typeof children === 'function' ? children({ close: () => { setOpen(false); triggerRef.current?.focus(); } }) : children;

  return (
    <span className="relative inline-flex">
      {triggerWithProps}
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={contentRef}
            role="menu"
            id={`${id}-menu`}
            aria-labelledby={id}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute top-[calc(100%+6px)] z-[200] min-w-[180px] rounded-mt-link bg-mt-surface',
              'border border-mt-border/60 p-1 shadow-mt-elevated',
              align === 'end' ? 'right-0' : 'left-0',
              className,
            )}
          >
            {content}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </span>
  );
}

export interface PopoverItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  destructive?: boolean;
  leadingIcon?: ReactNode;
}

export function PopoverItem({
  destructive,
  leadingIcon,
  className,
  children,
  type,
  ...rest
}: PopoverItemProps) {
  return (
    <button
      type={type ?? 'button'}
      role="menuitem"
      tabIndex={-1}
      className={cn(
        'flex min-h-11 w-full cursor-pointer items-center gap-2.5 rounded-[6px] px-2.5 py-2 text-left text-sm',
        'text-mt-text transition-colors duration-150',
        'hover:bg-mt-interactive focus:bg-mt-interactive focus:outline-none',
        destructive && 'text-mt-red hover:bg-mt-red/10 focus:bg-mt-red/10',
        className,
      )}
      {...rest}
    >
      {leadingIcon ? (
        <span className="inline-flex shrink-0 text-mt-text-secondary [&_svg]:size-4" aria-hidden="true">
          {leadingIcon}
        </span>
      ) : null}
      <span className="flex-1 truncate">{children}</span>
    </button>
  );
}

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { InfoIcon, TipIcon, WarnIcon, CheckIcon } from './icons';

// ------------------------------------------------------------------ Button

const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const buttonVariants = {
  primary:
    'bg-accent text-accent-fg hover:bg-accent-hover shadow-[0_1px_2px_rgba(0,0,0,.08)] hover:shadow-[0_6px_20px_-6px_var(--accent-ring)] active:translate-y-px',
  secondary:
    'bg-surface text-fg border border-border hover:border-border-strong hover:bg-bg-muted active:translate-y-px',
  ghost: 'text-fg-muted hover:text-fg hover:bg-bg-muted',
  soft: 'bg-accent-soft text-accent-soft-fg hover:brightness-105 active:translate-y-px',
} as const;

const buttonSizes = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-[15px]',
} as const;

interface ButtonStyleProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}

export const buttonClass = ({
  variant = 'primary',
  size = 'md',
}: ButtonStyleProps = {}) =>
  cn(buttonBase, buttonVariants[variant], buttonSizes[size]);

export function Button({
  variant,
  size,
  className,
  ...props
}: ButtonStyleProps & ComponentProps<'button'>) {
  return (
    <button className={cn(buttonClass({ variant, size }), className)} {...props} />
  );
}

export function LinkButton({
  variant,
  size,
  className,
  href,
  external,
  children,
  'data-track': dataTrack,
  ...props
}: ButtonStyleProps &
  Omit<ComponentProps<typeof Link>, 'href'> & {
    href: string;
    external?: boolean;
    /** CTA label recorded by the DanixSoft analytics tracker on click. */
    'data-track'?: string;
  }) {
  const classes = cn(buttonClass({ variant, size }), className);
  if (external || href.startsWith('http')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        data-track={dataTrack}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} data-track={dataTrack} {...props}>
      {children}
    </Link>
  );
}

// ------------------------------------------------------------------- Badge

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode;
  tone?: 'neutral' | 'accent' | 'success' | 'warning';
  className?: string;
}) {
  const tones = {
    neutral: 'bg-bg-muted text-fg-muted border-border',
    accent: 'bg-accent-soft text-accent-soft-fg border-transparent',
    success: 'bg-success-soft text-success border-transparent',
    warning: 'bg-warning-soft text-warning border-transparent',
  } as const;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

// -------------------------------------------------------------------- Card

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface',
        interactive &&
          'transition-all duration-200 hover:border-accent/40 hover:shadow-[0_10px_30px_-14px_var(--accent-ring)] hover:-translate-y-0.5',
        className,
      )}
    >
      {children}
    </div>
  );
}

// ----------------------------------------------------------------- Callout

const calloutTones = {
  info: {
    icon: InfoIcon,
    wrap: 'border-accent/25 bg-accent-soft/40',
    accent: 'text-accent',
  },
  tip: {
    icon: TipIcon,
    wrap: 'border-success/25 bg-success-soft/40',
    accent: 'text-success',
  },
  warn: {
    icon: WarnIcon,
    wrap: 'border-warning/30 bg-warning-soft/40',
    accent: 'text-warning',
  },
  success: {
    icon: CheckIcon,
    wrap: 'border-success/25 bg-success-soft/40',
    accent: 'text-success',
  },
} as const;

export type CalloutTone = keyof typeof calloutTones;

export function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: CalloutTone;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, wrap, accent } = calloutTones[tone];
  return (
    <div className={cn('my-6 flex gap-3 rounded-xl border p-4', wrap)}>
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', accent)} />
      <div className="min-w-0 text-[15px] leading-relaxed text-fg-muted">
        {title && (
          <p className={cn('mb-1 font-semibold text-fg', accent)}>{title}</p>
        )}
        {children}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ Section

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={cn(
        'mb-10 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-2xl font-bold tracking-tight text-fg sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-fg-muted">
          {description}
        </p>
      )}
    </div>
  );
}

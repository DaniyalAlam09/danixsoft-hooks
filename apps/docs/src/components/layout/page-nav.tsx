import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/icons';

interface NavTarget {
  title: string;
  href: string;
  hint?: string;
}

/** Previous / next footer links — keeps readers moving through the docs. */
export default function PageNav({
  previous,
  next,
}: {
  previous?: NavTarget;
  next?: NavTarget;
}) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={previous.href}
          rel="prev"
          className="group rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
        >
          <span className="mb-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle">
            <ChevronLeftIcon className="h-3.5 w-3.5" />
            Previous
          </span>
          <span className="block font-mono text-sm font-semibold text-fg group-hover:text-accent">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next && (
        <Link
          href={next.href}
          rel="next"
          className="group rounded-xl border border-border bg-surface p-4 text-right transition-all hover:-translate-y-0.5 hover:border-accent/40 sm:col-start-2"
        >
          <span className="mb-1 flex items-center justify-end gap-1 text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle">
            Next
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </span>
          <span className="block font-mono text-sm font-semibold text-fg group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}

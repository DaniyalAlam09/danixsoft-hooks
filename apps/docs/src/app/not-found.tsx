import Link from 'next/link';
import type { Metadata } from 'next';
import { hooks } from '@/lib/hooks-registry';
import { LinkButton } from '@/components/ui/primitives';
import { ArrowRightIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="mb-4 font-mono text-6xl font-bold text-accent">404</p>
      <h1 className="mb-3 text-balance text-2xl font-bold tracking-tight text-fg sm:text-3xl">
        We could not find that page
      </h1>
      <p className="mb-8 text-pretty text-[15.5px] leading-relaxed text-fg-muted">
        The link may be out of date. Everything is reachable from the hook
        directory, and <kbd className="rounded border border-border bg-bg-muted px-1.5 py-0.5 font-sans text-xs">⌘K</kbd>{' '}
        opens search from any page.
      </p>

      <div className="mb-12 flex flex-wrap justify-center gap-3">
        <LinkButton href="/hooks">
          Browse all {hooks.length} hooks
          <ArrowRightIcon className="h-4 w-4" />
        </LinkButton>
        <LinkButton href="/" variant="secondary">
          Back to home
        </LinkButton>
      </div>

      <div className="w-full text-left">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-fg-subtle">
          Popular hooks
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {['use-local-storage', 'use-debounce', 'use-click-outside', 'use-media-query'].map(
            (slug) => {
              const hook = hooks.find((entry) => entry.slug === slug);
              if (!hook) return null;
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:border-accent/40"
                >
                  <p className="font-mono text-sm font-semibold text-fg">
                    {hook.name}
                  </p>
                  <p className="text-[13px] text-fg-muted">{hook.summary}</p>
                </Link>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}

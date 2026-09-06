import type { Metadata } from 'next';
import Link from 'next/link';
import { guides } from '@/content/guides';
import { readingTime } from '@/lib/article';
import { buildMetadata, breadcrumbSchema, itemListSchema, jsonLdGraph } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import JsonLd from '@/components/ui/json-ld';
import { Badge } from '@/components/ui/primitives';
import { ArrowRightIcon, ClockIcon } from '@/components/ui/icons';

export const metadata: Metadata = buildMetadata({
  title: 'React Hooks Guides — Tutorials, Patterns and Fixes',
  description:
    'In-depth guides on React hooks: SSR safety in Next.js, debounce vs throttle, localStorage persistence, stale closures and custom hook best practices.',
  path: '/guides',
  keywords: [
    'react hooks tutorial',
    'react hooks guides',
    'react patterns',
    'nextjs hooks guide',
    'react best practices',
  ],
});

export default function GuidesIndex() {
  const schema = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Guides', path: '/guides' },
    ]),
    itemListSchema(
      'React hooks guides',
      guides.map((guide) => ({
        name: guide.title,
        path: `/guides/${guide.slug}`,
        description: guide.description,
      })),
    ),
  );

  return (
    <>
      <JsonLd data={schema} />

      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          trail={[
            { name: 'Home', path: '/' },
            { name: 'Guides', path: '/guides' },
          ]}
        />

        <header className="mb-12 max-w-2xl">
          <Badge tone="accent">Guides</Badge>
          <h1 className="mt-4 mb-4 text-balance text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            React hooks, explained properly
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-fg-muted">
            Deep dives into the problems that come up once you move past{' '}
            <code className="rounded border border-border bg-bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-accent-soft-fg">
              useState
            </code>
            : hydration mismatches, stale closures, rate limiting and the
            patterns that make custom hooks maintainable. Every guide is written
            against real code, not toy examples.
          </p>
        </header>

        <div className="space-y-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group block rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_14px_36px_-20px_var(--accent-ring)]"
            >
              <div className="mb-2 flex flex-wrap items-center gap-3 text-[13px] text-fg-subtle">
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="h-3.5 w-3.5" />
                  {readingTime(guide.blocks)} min read
                </span>
                <time dateTime={guide.dateModified ?? guide.datePublished}>
                  Updated{' '}
                  {new Date(
                    guide.dateModified ?? guide.datePublished,
                  ).toLocaleDateString('en-GB', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>

              <h2 className="mb-2 flex items-start gap-2 text-xl font-bold tracking-tight text-fg group-hover:text-accent">
                {guide.heading}
                <ArrowRightIcon className="mt-1.5 h-4 w-4 shrink-0 text-accent opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </h2>

              <p className="text-pretty text-[15px] leading-relaxed text-fg-muted">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-bg-subtle p-6">
          <h2 className="mb-2 text-lg font-bold text-fg">
            Comparing hook libraries?
          </h2>
          <p className="mb-4 text-[15px] leading-relaxed text-fg-muted">
            We keep honest comparisons against usehooks-ts, react-use, ahooks
            and @mantine/hooks — including when the other library is the better
            choice.
          </p>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            Read the comparisons
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

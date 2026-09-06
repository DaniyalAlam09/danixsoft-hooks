import type { Metadata } from 'next';
import Link from 'next/link';
import { comparisons } from '@/content/comparisons';
import { buildMetadata, breadcrumbSchema, itemListSchema, jsonLdGraph } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import JsonLd from '@/components/ui/json-ld';
import { Badge, Callout } from '@/components/ui/primitives';
import { ArrowRightIcon, ScaleIcon } from '@/components/ui/icons';

export const metadata: Metadata = buildMetadata({
  title: 'React Hooks Library Comparisons — Honest Side-by-Sides',
  description:
    'How @danixsoft/hooks compares to usehooks-ts, react-use, ahooks and @mantine/hooks — including when each alternative is the better choice for your project.',
  path: '/compare',
  keywords: [
    'best react hooks library',
    'react hooks library comparison',
    'usehooks-ts alternative',
    'react-use alternative',
    'ahooks alternative',
  ],
});

export default function CompareIndex() {
  const schema = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Compare', path: '/compare' },
    ]),
    itemListSchema(
      'React hooks library comparisons',
      comparisons.map((comparison) => ({
        name: comparison.title,
        path: `/compare/${comparison.slug}`,
        description: comparison.description,
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
            { name: 'Compare', path: '/compare' },
          ]}
        />

        <header className="mb-10 max-w-2xl">
          <Badge tone="accent">
            <ScaleIcon className="h-3 w-3" />
            Comparisons
          </Badge>
          <h1 className="mt-4 mb-4 text-balance text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            How we compare to the alternatives
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-fg-muted">
            There are several good React hooks libraries. These pages explain
            the real differences in design decisions — dependencies, typing,
            scope, maintenance — and say plainly when another library is the
            better fit for you.
          </p>
        </header>

        <Callout tone="info" title="Our bias, stated up front">
          We maintain @danixsoft/hooks, so read these with that in mind. We have
          tried to make them useful rather than flattering: every page includes
          a section on when to choose the other library, and we avoid comparing
          hook counts and bundle sizes because those change with every release.
        </Callout>

        <div className="mt-8 space-y-4">
          {comparisons.map((comparison) => (
            <Link
              key={comparison.slug}
              href={`/compare/${comparison.slug}`}
              className="group block rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_14px_36px_-20px_var(--accent-ring)]"
            >
              <h2 className="mb-2 flex items-start gap-2 text-xl font-bold tracking-tight text-fg group-hover:text-accent">
                {comparison.heading}
                <ArrowRightIcon className="mt-1.5 h-4 w-4 shrink-0 text-accent opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </h2>
              <p className="text-pretty text-[15px] leading-relaxed text-fg-muted">
                {comparison.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

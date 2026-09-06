import type { Metadata } from 'next';
import Link from 'next/link';
import { faqGroups, allFaqs } from '@/content/faq';
import { siteConfig } from '@/lib/site';
import {
  buildMetadata,
  breadcrumbSchema,
  faqSchema,
  jsonLdGraph,
} from '@/lib/seo';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import TableOfContents from '@/components/layout/table-of-contents';
import JsonLd from '@/components/ui/json-ld';
import { Badge } from '@/components/ui/primitives';
import { slugifyHeading } from '@/lib/article';
import { ArrowRightIcon } from '@/components/ui/icons';

export const metadata: Metadata = buildMetadata({
  title: `FAQ — ${siteConfig.package} React Hooks Library`,
  description: `Answers about ${siteConfig.package}: React and Next.js compatibility, bundle size, SSR, licensing, React Native support and AI coding assistants.`,
  path: '/faq',
  keywords: [
    'react hooks library faq',
    'danixsoft hooks questions',
    'react hooks bundle size',
    'react hooks ssr',
    'react hooks licence',
  ],
});

export default function FaqPage() {
  const toc = faqGroups.map((group) => ({
    id: slugifyHeading(group.title),
    text: group.title,
    level: 2 as const,
  }));

  const schema = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'FAQ', path: '/faq' },
    ]),
    faqSchema(allFaqs),
  );

  return (
    <>
      <JsonLd data={schema} />

      <div className="mx-auto flex w-full max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <Breadcrumbs
            trail={[
              { name: 'Home', path: '/' },
              { name: 'FAQ', path: '/faq' },
            ]}
          />

          <header className="mb-10 max-w-2xl">
            <Badge tone="accent">FAQ</Badge>
            <h1 className="mt-4 mb-4 text-balance text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              Frequently asked questions
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-fg-muted">
              {allFaqs.length} answers about compatibility, bundle size, server
              rendering, licensing and working with AI assistants. If yours is
              not here,{' '}
              <a
                href={siteConfig.links.issues}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-[3px]"
              >
                ask on GitHub
              </a>
              .
            </p>
          </header>

          {faqGroups.map((group) => (
            <section
              key={group.title}
              id={slugifyHeading(group.title)}
              className="mb-12 scroll-mt-24"
            >
              <h2 className="mb-4 border-t border-border pt-8 text-xl font-bold tracking-tight text-fg">
                {group.title}
              </h2>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-xl border border-border bg-surface px-5 py-4 open:border-accent/30"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-fg marker:hidden">
                      <h3 className="text-[15px] font-semibold">
                        {item.question}
                      </h3>
                      <span
                        aria-hidden
                        className="shrink-0 text-accent transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}

          <div className="rounded-xl border border-border bg-bg-subtle p-6">
            <h2 className="mb-2 text-lg font-bold text-fg">Still stuck?</h2>
            <p className="mb-4 text-[15px] leading-relaxed text-fg-muted">
              The guides cover the harder problems in depth — hydration
              mismatches, stale closures, and the patterns that keep custom
              hooks maintainable.
            </p>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              Read the guides
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <aside className="sticky top-[calc(var(--header-h)+2rem)] hidden h-fit w-56 shrink-0 xl:block">
          <TableOfContents entries={toc} />
        </aside>
      </div>
    </>
  );
}

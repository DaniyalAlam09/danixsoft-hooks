import type { Metadata } from 'next';
import { Suspense } from 'react';
import { hookCategories, hooks, hooksByCategory } from '@/lib/hooks-registry';
import {
  buildMetadata,
  breadcrumbSchema,
  itemListSchema,
  jsonLdGraph,
  faqSchema,
} from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import JsonLd from '@/components/ui/json-ld';
import Link from 'next/link';
import HooksDirectory from '@/components/docs/hooks-directory';

/** "Which hook do I need?": the common tasks, mapped to hooks. */
const TASKS: { task: string; slugs: string[] }[] = [
  { task: 'Persist state across reloads', slugs: ['use-local-storage', 'use-session-storage', 'use-cookie'] },
  { task: 'Respond to screen size or user preferences', slugs: ['use-media-query', 'use-window-size'] },
  { task: 'Close a menu or modal on an outside click', slugs: ['use-click-outside'] },
  { task: 'Wait for typing to stop before searching', slugs: ['use-debounce'] },
  { task: 'Know when an element scrolls into view', slugs: ['use-intersection-observer', 'use-on-screen', 'use-infinite-scroll'] },
  { task: 'Run code on a timer', slugs: ['use-interval', 'use-timeout', 'use-countdown'] },
  { task: 'Fetch data with loading and error state', slugs: ['use-fetch'] },
  { task: 'Manage a form with validation', slugs: ['use-form'] },
  { task: 'Avoid hydration mismatches in Next.js', slugs: ['use-is-client', 'use-isomorphic-layout-effect'] },
];

export const metadata: Metadata = buildMetadata({
  title: `All ${hooks.length} React Hooks — Complete Directory | @danixsoft/hooks`,
  description: `Browse all ${hooks.length} React hooks: state and storage, forms and data, DOM and browser, timers and lifecycle, sensors and device. Typed, SSR-safe, dependency-free.`,
  path: '/hooks',
  keywords: [
    'react hooks list',
    'all react hooks',
    'react hooks directory',
    'react hooks library',
    'typescript react hooks',
  ],
});

const faqs = [
  {
    question: `How many hooks are in ${siteConfig.package}?`,
    answer: `There are ${hooks.length} hooks, grouped into ${hookCategories.length} categories: ${hookCategories.map((category) => `${category.title} (${hooksByCategory(category.id).length})`).join(', ')}.`,
  },
  {
    question: 'Do I have to install all of them?',
    answer:
      'No. The package is tree-shakeable with sideEffects set to false, so your bundler includes only the hooks you actually import. Importing one hook costs roughly the size of that one hook.',
  },
  {
    question: 'Are all of these hooks SSR-safe?',
    answer:
      'Yes. Every hook that touches a browser API guards it behind a typeof window check and returns a stable value during server rendering, so they work in Next.js and Remix without hydration mismatches.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Nothing. The library is free and open source under the MIT licence, for personal and commercial use alike.',
  },
];

export default function HooksIndex() {
  const schema = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Hooks', path: '/hooks' },
    ]),
    itemListSchema(
      `All ${hooks.length} React hooks in ${siteConfig.package}`,
      hooks.map((hook) => ({
        name: hook.name,
        path: `/${hook.slug}`,
        description: hook.summary,
      })),
    ),
    faqSchema(faqs),
  );

  return (
    <>
      <JsonLd data={schema} />

      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          trail={[
            { name: 'Home', path: '/' },
            { name: 'Hooks', path: '/hooks' },
          ]}
        />

        <header className="mb-8 max-w-2xl">
          <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            All {hooks.length} React hooks
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-fg-muted">
            The complete catalogue, grouped by what you are trying to do. Every
            hook has a live demo, a copy-paste example and its full TypeScript
            signature — and every one is dependency-free and SSR-safe.
          </p>
        </header>

        <section aria-labelledby="which-hook" className="mb-10">
          <h2 id="which-hook" className="mb-4 text-xl font-bold tracking-tight text-fg">
            Which hook do I need?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead className="bg-bg-subtle text-fg">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-semibold">I want to…</th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">Use</th>
                </tr>
              </thead>
              <tbody className="text-fg-muted">
                {TASKS.map(({ task, slugs }) => (
                  <tr key={task} className="border-t border-border align-top">
                    <th scope="row" className="px-4 py-2.5 font-normal">{task}</th>
                    <td className="px-4 py-2.5">
                      {slugs
                        .map((slug) => hooks.find((hook) => hook.slug === slug))
                        .filter((hook) => hook !== undefined)
                        .map((hook, index) => (
                          <span key={hook.slug}>
                            {index > 0 && ', '}
                            <Link
                              href={`/${hook.slug}`}
                              className="font-mono text-[13px] text-accent underline decoration-accent/30 underline-offset-[3px]"
                            >
                              {hook.name}
                            </Link>
                          </span>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Suspense fallback={<div className="h-32" />}>
          <HooksDirectory />
        </Suspense>

        <section className="mt-16 border-t border-border pt-10">
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-fg">
            Common questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-border bg-surface px-5 py-4 open:border-accent/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-fg marker:hidden">
                  <span className="text-[15px]">{faq.question}</span>
                  <span
                    aria-hidden
                    className="shrink-0 text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

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
import HooksDirectory from '@/components/docs/hooks-directory';

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

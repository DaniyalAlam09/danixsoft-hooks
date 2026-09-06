import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  getCategory,
  getHook,
  hookNeighbours,
  relatedHooks,
} from '@/lib/hooks-registry';
import { siteConfig, absoluteUrl } from '@/lib/site';
import {
  breadcrumbSchema,
  jsonLdGraph,
  techArticleSchema,
  faqSchema,
} from '@/lib/seo';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import PageNav from '@/components/layout/page-nav';
import TableOfContents from '@/components/layout/table-of-contents';
import JsonLd from '@/components/ui/json-ld';
import { Badge } from '@/components/ui/primitives';
import { ArrowRightIcon, GitHubIcon, ShieldIcon } from '@/components/ui/icons';
import { apiReferencePath } from '@/lib/api-reference';
import CodeBlock from './code-block';

const TOC = [
  { id: 'overview', text: 'Overview', level: 2 as const },
  { id: 'demo', text: 'Live demo', level: 2 as const },
  { id: 'usage', text: 'Usage example', level: 2 as const },
  { id: 'import', text: 'Import', level: 2 as const },
  { id: 'signature', text: 'Type signature', level: 2 as const },
  { id: 'when-to-use', text: 'When to use it', level: 2 as const },
  { id: 'related', text: 'Related hooks', level: 2 as const },
];

/**
 * Shared chrome for every /use-* route.
 *
 * The route's own page.tsx keeps only its interactive demo and code sample;
 * everything an indexable documentation page needs — heading, description,
 * signature, structured data, internal links — lives here so all 44 pages
 * stay consistent.
 */
export default function HookPage({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const hook = getHook(slug);
  if (!hook) {
    throw new Error(`No registry entry for hook "${slug}"`);
  }

  const category = getCategory(hook.category);
  const related = relatedHooks(slug);
  const { previous, next } = hookNeighbours(slug);
  const path = `/${hook.slug}`;
  // Not every export is a function — useIsomorphicLayoutEffect is a variable —
  // so ask where TypeDoc actually put it.
  const apiPath = apiReferencePath(hook.name);

  const faqs = [
    {
      question: `What does ${hook.name} do?`,
      answer: hook.description,
    },
    {
      question: `How do I install ${hook.name}?`,
      answer: `Run npm install ${siteConfig.package}, then import it with: import { ${hook.name} } from '${siteConfig.package}'. The package is tree-shakeable, so only ${hook.name} is added to your bundle.`,
    },
    {
      question: `Is ${hook.name} safe to use with server-side rendering?`,
      answer: `Yes. ${hook.name} guards every browser-only API behind a typeof window check and returns a stable value during server rendering, so it works in Next.js, Remix and any other SSR setup without hydration mismatches.`,
    },
    {
      question: `Does ${hook.name} have any dependencies?`,
      answer: `No. ${siteConfig.package} ships with zero runtime dependencies — ${hook.name} is built entirely on React primitives and standard browser APIs.`,
    },
  ];

  const schema = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Hooks', path: '/hooks' },
      { name: hook.name, path },
    ]),
    techArticleSchema({
      headline: `${hook.name} — React Hook`,
      description: hook.description,
      path,
      datePublished: '2025-01-15',
      dateModified: new Date().toISOString().split('T')[0],
      keywords: [hook.name, ...hook.keywords],
    }),
    faqSchema(faqs),
  );

  return (
    <>
      <JsonLd data={schema} />

      <div className="mx-auto flex w-full max-w-[100rem] gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <article className="min-w-0 flex-1 xl:max-w-3xl">
          <Breadcrumbs
            trail={[
              { name: 'Home', path: '/' },
              { name: 'Hooks', path: '/hooks' },
              { name: hook.name, path },
            ]}
          />

          <header id="overview" className="scroll-mt-24">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Link href={`/hooks#${category.slug}`}>
                <Badge tone="accent">{category.title}</Badge>
              </Link>
              {hook.ssrSafe && (
                <Badge tone="success">
                  <ShieldIcon className="h-3 w-3" />
                  SSR safe
                </Badge>
              )}
              <Badge>Zero deps</Badge>
            </div>

            <h1 className="mb-3 font-mono text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {hook.name}
            </h1>
            <p className="text-pretty text-lg leading-relaxed text-fg-muted">
              {hook.summary}
            </p>
          </header>

          <p className="mt-5 text-pretty text-[15.5px] leading-[1.75] text-fg-muted">
            {hook.description}
          </p>

          <h2
            id="demo"
            className="anchor-heading mt-12 mb-4 border-t border-border pt-10 text-2xl font-bold tracking-tight text-fg"
          >
            Live demo
          </h2>
          <p className="mb-5 text-[15.5px] leading-relaxed text-fg-muted">
            Interact with the example below — it runs the real{' '}
            <code className="rounded border border-border bg-bg-muted px-1.5 py-0.5 font-mono text-[13px] text-accent-soft-fg">
              {hook.name}
            </code>{' '}
            hook from the published package, not a simulation.
          </p>

          {children}

          <h2
            id="import"
            className="anchor-heading mt-14 mb-4 border-t border-border pt-10 text-2xl font-bold tracking-tight text-fg"
          >
            Import
          </h2>
          <p className="mb-1 text-[15.5px] leading-relaxed text-fg-muted">
            Every hook is a named export from the package root. Tree shaking
            removes whatever you do not import.
          </p>
          <CodeBlock
            code={`import { ${hook.name} } from '${siteConfig.package}';`}
            language="tsx"
            title={null}
            showLineNumbers={false}
          />

          <h2
            id="signature"
            className="anchor-heading mt-14 mb-4 border-t border-border pt-10 text-2xl font-bold tracking-tight text-fg"
          >
            Type signature
          </h2>
          <p className="mb-1 text-[15.5px] leading-relaxed text-fg-muted">
            The full generated types, including every generic parameter, live in
            the{' '}
            <Link
              href={apiPath ?? '/api-reference'}
              className="font-medium text-accent underline decoration-accent/30 underline-offset-[3px]"
            >
              API reference
            </Link>
            .
          </p>
          <CodeBlock
            code={hook.signature}
            language="typescript"
            title={null}
            showLineNumbers={false}
          />

          <h2
            id="when-to-use"
            className="anchor-heading mt-14 mb-4 border-t border-border pt-10 text-2xl font-bold tracking-tight text-fg"
          >
            When to use it
          </h2>
          <ul className="mb-6 space-y-2.5">
            {hook.keywords.map((keyword) => (
              <li
                key={keyword}
                className="flex gap-3 text-[15.5px] leading-[1.7] text-fg-muted"
              >
                <span
                  aria-hidden
                  className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60"
                />
                <span className="first-letter:uppercase">{keyword}</span>
              </li>
            ))}
          </ul>

          <div className="my-8 space-y-3">
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

          {related.length > 0 && (
            <>
              <h2
                id="related"
                className="anchor-heading mt-14 mb-4 border-t border-border pt-10 text-2xl font-bold tracking-tight text-fg"
              >
                Related hooks
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/${entry.slug}`}
                    className="group rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_10px_30px_-16px_var(--accent-ring)]"
                  >
                    <p className="mb-1 flex items-center gap-1.5 font-mono text-sm font-semibold text-fg">
                      {entry.name}
                      <ArrowRightIcon className="h-3.5 w-3.5 text-accent opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </p>
                    <p className="text-[13px] leading-relaxed text-fg-muted">
                      {entry.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-bg-subtle p-5">
            <p className="min-w-0 flex-1 text-sm text-fg-muted">
              Spotted a problem with this page, or want an example added?
            </p>
            <a
              href={`${siteConfig.links.issues}/new?title=${encodeURIComponent(`Docs: ${hook.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              <GitHubIcon className="h-4 w-4" />
              Open an issue
            </a>
          </div>

          <PageNav
            previous={
              previous
                ? { title: previous.name, href: `/${previous.slug}` }
                : undefined
            }
            next={next ? { title: next.name, href: `/${next.slug}` } : undefined}
          />
        </article>

        <aside className="sticky top-[calc(var(--header-h)+2rem)] hidden h-fit w-56 shrink-0 xl:block">
          <TableOfContents
            entries={related.length > 0 ? TOC : TOC.filter((e) => e.id !== 'related')}
          />

          <div className="mt-8 border-t border-border pt-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-fg">
              This hook
            </p>
            <dl className="space-y-2 text-[13px]">
              <div className="flex justify-between gap-2">
                <dt className="text-fg-subtle">Category</dt>
                <dd className="text-right text-fg-muted">{category.title}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-fg-subtle">Dependencies</dt>
                <dd className="text-fg-muted">0</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-fg-subtle">SSR</dt>
                <dd className="text-fg-muted">Safe</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-fg-subtle">Licence</dt>
                <dd className="text-fg-muted">MIT</dd>
              </div>
            </dl>
          </div>

          <a
            href={`${siteConfig.links.github}/blob/main/packages/hooks/src/${hook.name}.ts`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center gap-2 text-[13px] text-fg-muted transition-colors hover:text-accent"
          >
            <GitHubIcon className="h-4 w-4" />
            View source
          </a>
        </aside>
      </div>
    </>
  );
}

/** Shared canonical URL builder for the per-hook layouts. */
export const hookPath = (slug: string) => absoluteUrl(`/${slug}`);

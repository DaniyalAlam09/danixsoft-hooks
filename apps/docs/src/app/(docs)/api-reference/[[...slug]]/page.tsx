import fs from 'fs';
import path from 'path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import Link from 'next/link';
import { buildMetadata, breadcrumbSchema, jsonLdGraph } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import { getHookByName } from '@/lib/hooks-registry';
import { apiReferenceRoutes, resolveApiHref } from '@/lib/api-reference';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import JsonLd from '@/components/ui/json-ld';
import { Badge } from '@/components/ui/primitives';
import { ArrowRightIcon } from '@/components/ui/icons';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content/api-reference');

/**
 * Prerender the whole reference. TypeDoc output only changes at build time, so
 * serving it statically makes every symbol page fast and reliably indexable.
 */
export function generateStaticParams() {
  return [
    { slug: [] as string[] },
    ...apiReferenceRoutes().map((route) => ({ slug: route.split('/') })),
  ];
}

export const dynamicParams = false;

const resolveFile = (slug: string[]) => {
  const joined = slug.join('/').replace(/\.md$/, '');
  const file = joined
    ? path.join(CONTENT_ROOT, `${joined}.md`)
    : path.join(CONTENT_ROOT, 'README.md');

  // Keep resolution inside the content root even if a slug tries to escape.
  const resolved = path.resolve(file);
  if (!resolved.startsWith(path.resolve(CONTENT_ROOT))) return null;
  return fs.existsSync(resolved) ? resolved : null;
};

const titleFor = (slug: string[]) =>
  slug.length === 0 ? 'API Reference' : slug[slug.length - 1];

const kindFor = (slug: string[]) => {
  const group = slug[0];
  if (group === 'functions') return 'Function';
  if (group === 'interfaces') return 'Interface';
  if (group === 'type-aliases') return 'Type alias';
  if (group === 'variables') return 'Variable';
  return 'Reference';
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const name = titleFor(slug);

  if (slug.length === 0) {
    return buildMetadata({
      title: `API Reference — ${siteConfig.package}`,
      description: `Complete TypeScript API reference for ${siteConfig.package}, generated from source: every hook signature, parameter, return type and interface.`,
      path: '/api-reference',
      keywords: ['react hooks api reference', 'typescript signatures'],
    });
  }

  const hook = getHookByName(name);

  return buildMetadata({
    title: `${name} — API Reference | ${siteConfig.package}`,
    description: hook
      ? `Full TypeScript signature, parameters and return type for ${name}. ${hook.summary}`
      : `Full TypeScript definition of ${name} in ${siteConfig.package}, generated from source.`,
    path: `/api-reference/${slug.join('/')}`,
    keywords: [name, `${name} typescript`, `${name} signature`],
  });
}

export default async function ApiReferencePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const file = resolveFile(slug);
  if (!file) notFound();

  const content = fs.readFileSync(file, 'utf8');
  const name = titleFor(slug);
  const isIndex = slug.length === 0;
  const hook = isIndex ? undefined : getHookByName(name);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'API Reference', path: '/api-reference' },
    ...(isIndex ? [] : [{ name, path: `/api-reference/${slug.join('/')}` }]),
  ];

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(trail))} />

      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs trail={trail} />

        <header className="mb-8">
          {!isIndex && <Badge tone="accent">{kindFor(slug)}</Badge>}
          <h1
            className={`mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl ${
              isIndex ? '' : 'font-mono'
            }`}
          >
            {isIndex ? `${siteConfig.package} API reference` : name}
          </h1>
          <p className="mt-3 text-[15.5px] leading-relaxed text-fg-muted">
            {isIndex
              ? 'Generated directly from the TypeScript source on every release, so these signatures always match the published package.'
              : (hook?.summary ??
                'Generated from the TypeScript source of the published package.')}
          </p>

          {hook && (
            <Link
              href={`/${hook.slug}`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3.5 py-2 text-sm font-medium text-fg-muted transition-colors hover:border-accent/40 hover:text-fg"
            >
              See {hook.name} with a live demo
              <ArrowRightIcon className="h-4 w-4 text-accent" />
            </Link>
          )}
        </header>

        <div className="markdown-body max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            components={{
              // TypeDoc emits relative links like `functions/useAudio.md`;
              // rewrite them to real routes, and send external links out.
              a: ({ href, ref: _ref, node: _node, ...props }) => {
                if (!href) return <a {...props} />;

                if (href.startsWith('http')) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  );
                }

                return <Link href={resolveApiHref(href, slug)} {...props} />;
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}

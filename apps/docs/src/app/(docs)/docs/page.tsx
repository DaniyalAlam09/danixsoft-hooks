import type { Metadata } from 'next';
import { docsBlocks } from '@/content/docs';
import { buildToc } from '@/lib/article';
import { siteConfig } from '@/lib/site';
import { hooks } from '@/lib/hooks-registry';
import {
  buildMetadata,
  breadcrumbSchema,
  howToSchema,
  jsonLdGraph,
  techArticleSchema,
} from '@/lib/seo';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import TableOfContents from '@/components/layout/table-of-contents';
import PageNav from '@/components/layout/page-nav';
import JsonLd from '@/components/ui/json-ld';
import ArticleRenderer from '@/components/docs/article-renderer';
import InstallTabs from '@/components/docs/install-tabs';
import { Badge } from '@/components/ui/primitives';

export const metadata: Metadata = buildMetadata({
  title: `Getting Started — Install ${siteConfig.package} in React & Next.js`,
  description: `Install and use ${siteConfig.package} in any React 18+ project. Covers npm, pnpm, yarn and bun, TypeScript inference, server-side rendering, tree shaking and testing.`,
  path: '/docs',
  keywords: [
    'install react hooks library',
    'danixsoft hooks getting started',
    'react hooks setup',
    'nextjs hooks installation',
    'react hooks typescript setup',
  ],
});

export default function DocsPage() {
  const toc = buildToc(docsBlocks);

  const schema = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Documentation', path: '/docs' },
    ]),
    techArticleSchema({
      headline: `Getting started with ${siteConfig.package}`,
      description: `Install and configure ${siteConfig.package} in a React or Next.js project.`,
      path: '/docs',
      datePublished: '2025-01-15',
      dateModified: new Date().toISOString().split('T')[0],
      keywords: ['react hooks', 'installation', 'typescript', 'ssr'],
    }),
    howToSchema({
      name: `How to install ${siteConfig.package}`,
      description: `Add ${hooks.length} production-ready React hooks to a project in three steps.`,
      steps: [
        {
          name: 'Install the package',
          text: `Run npm install ${siteConfig.package} in your project root. The package has no runtime dependencies.`,
        },
        {
          name: 'Import the hook you need',
          text: `Every hook is a named export from the package root, for example: import { useLocalStorage } from '${siteConfig.package}'.`,
        },
        {
          name: 'Call it inside a Client Component',
          text: 'Hooks run in the browser. In the Next.js App Router, add the "use client" directive to the file that calls the hook.',
        },
      ],
    }),
  );

  return (
    <>
      <JsonLd data={schema} />

      <div className="mx-auto flex w-full max-w-[100rem] gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <article className="min-w-0 flex-1 xl:max-w-3xl">
          <Breadcrumbs
            trail={[
              { name: 'Home', path: '/' },
              { name: 'Documentation', path: '/docs' },
            ]}
          />

          <header className="mb-8">
            <Badge tone="accent">Getting started</Badge>
            <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              Install {siteConfig.package}
            </h1>
          </header>

          <InstallTabs className="mb-10" />

          <ArticleRenderer blocks={docsBlocks} />

          <PageNav
            next={{ title: `All ${hooks.length} hooks`, href: '/hooks' }}
          />
        </article>

        <aside className="sticky top-[calc(var(--header-h)+2rem)] hidden h-fit w-56 shrink-0 xl:block">
          <TableOfContents entries={toc} />
        </aside>
      </div>
    </>
  );
}

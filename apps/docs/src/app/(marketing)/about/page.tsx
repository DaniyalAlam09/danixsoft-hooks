import type { Metadata } from 'next';
import Link from 'next/link';
import { getDanixSoftFamily } from '@/lib/danixsoft-family';
import { siteConfig } from '@/lib/site';
import { buildMetadata, breadcrumbSchema, jsonLdGraph, organizationSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import JsonLd from '@/components/ui/json-ld';
import { Badge } from '@/components/ui/primitives';

const PATH = '/about';
const DESCRIPTION = `Who makes ${siteConfig.package}, how it is built and tested, and how to report a problem. An open-source React hooks library by DanixSoft, Lahore.`;

export const metadata: Metadata = buildMetadata({
  title: `About ${siteConfig.package}`,
  description: DESCRIPTION,
  path: PATH,
  keywords: ['danixsoft hooks maintainer', 'who makes danixsoft hooks', 'danixsoft', 'react hooks library maintainer'],
});

export default async function AboutPage() {
  const { company } = await getDanixSoftFamily('danixsoft-hooks');

  const schema = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'About', path: PATH },
    ]),
    organizationSchema(),
    {
      '@type': 'AboutPage',
      '@id': `${siteConfig.url}${PATH}#page`,
      url: `${siteConfig.url}${PATH}`,
      name: `About ${siteConfig.package}`,
      description: DESCRIPTION,
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      publisher: {
        '@type': 'Organization',
        name: company.name,
        url: company.url,
        founder: { '@type': 'Person', name: company.founder.name, url: company.founder.url },
      },
    },
  );

  const link = 'font-medium text-accent underline decoration-accent/30 underline-offset-[3px]';

  return (
    <>
      <JsonLd data={schema} />
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          trail={[
            { name: 'Home', path: '/' },
            { name: 'About', path: PATH },
          ]}
        />
        <header className="mb-10">
          <Badge tone="accent">About</Badge>
          <h1 className="mt-4 mb-4 text-balance text-3xl font-bold tracking-tight text-fg sm:text-4xl">About {siteConfig.package}</h1>
          <p className="text-pretty text-lg leading-relaxed text-fg-muted">
            {siteConfig.package} is an open-source React hooks library: {siteConfig.hookCount} hooks with zero dependencies, full TypeScript types and
            SSR safety, free under the MIT licence. It is built and maintained by{' '}
            <a href={company.url} className={link}>
              {company.name}
            </a>
            , a software studio in Lahore, Pakistan, founded by{' '}
            <a href={company.founder.url} className={link}>
              {company.founder.name}
            </a>
            .
          </p>
        </header>

        <div className="space-y-8 text-[15px] leading-relaxed text-fg-muted">
          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-fg">Why it exists</h2>
            <p>
              Most React applications end up writing the same hooks: persisting to localStorage, debouncing a value, detecting a click outside a menu,
              watching a media query. Each one has an edge case that breaks server rendering. This library collects the common ones, written once with the
              server-rendering case handled, so you do not rewrite them in every project.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-fg">How it is built</h2>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Written in TypeScript; the type declarations ship with the package.</li>
              <li>No runtime dependencies; React 18 or later is a peer dependency.</li>
              <li>Published as ES modules with sideEffects: false, so bundlers keep only the hooks you import.</li>
              <li>The hooks are covered by tests in the repository, and each documentation page carries an SSR note.</li>
            </ul>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-fg">Source, issues and changes</h2>
            <p>
              The source is on{' '}
              <a href={siteConfig.links.github} className={link}>
                GitHub
              </a>
              , releases are on{' '}
              <a href={siteConfig.links.npm} className={link}>
                npm
              </a>
              , and every change is in the{' '}
              <a href={siteConfig.links.changelog} className={link}>
                changelog
              </a>
              . Report a bug or ask for a hook on the{' '}
              <a href={siteConfig.links.issues} className={link}>
                issue tracker
              </a>
              , or email {siteConfig.author.email}.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-xl font-semibold tracking-tight text-fg">More from {company.name}</h2>
            <p>
              {company.name} also builds and runs software products for businesses.{' '}
              <Link href="/more-from-danixsoft" className={link}>
                See the other products
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

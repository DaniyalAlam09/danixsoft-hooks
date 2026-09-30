import type { Metadata } from 'next';
import { getDanixSoftFamily } from '@/lib/danixsoft-family';
import { siteConfig } from '@/lib/site';
import { buildMetadata, breadcrumbSchema, jsonLdGraph, organizationSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import JsonLd from '@/components/ui/json-ld';
import { Badge } from '@/components/ui/primitives';

const PATH = '/more-from-danixsoft';

export const metadata: Metadata = buildMetadata({
  title: 'More from DanixSoft',
  description: `${siteConfig.package} is built and maintained by DanixSoft. The other products DanixSoft designs, builds and runs.`,
  path: PATH,
  keywords: ['danixsoft', 'danixsoft products', 'danixsoft hooks maker'],
});

/**
 * DanixSoft and its other products. The footer links here rather than listing
 * every product on every page. The list comes from danixsoft.com/products.json
 * (see src/lib/danixsoft-family.ts), so new products appear without code changes.
 */
export default async function MoreFromDanixSoftPage() {
  const { company, products } = await getDanixSoftFamily('danixsoft-hooks');

  const schema = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'More from DanixSoft', path: PATH },
    ]),
    organizationSchema(),
    {
      '@type': 'CollectionPage',
      '@id': `${siteConfig.url}${PATH}#page`,
      url: `${siteConfig.url}${PATH}`,
      name: `More from ${company.name}`,
      isPartOf: { '@id': `${siteConfig.url}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: products.length,
        itemListElement: products.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.name,
          url: p.url,
        })),
      },
    },
  );

  return (
    <>
      <JsonLd data={schema} />

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumbs
          trail={[
            { name: 'Home', path: '/' },
            { name: 'More from DanixSoft', path: PATH },
          ]}
        />

        <header id="more-from-danixsoft" className="mb-10 max-w-2xl scroll-mt-24">
          <Badge tone="accent">The maker</Badge>
          <h1 className="mt-4 mb-4 text-balance text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            More from {company.name}
          </h1>
          <p className="text-pretty text-lg leading-relaxed text-fg-muted">
            {siteConfig.package} is built and maintained by {company.name}. {company.about}
          </p>
          <p className="mt-4 text-sm text-fg-subtle">
            <a
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-[3px]"
            >
              Visit {company.name} ↗
            </a>
            <span aria-hidden> · </span>
            Founded by{' '}
            <a
              href={company.founder.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted underline underline-offset-2 transition-colors hover:text-accent"
            >
              {company.founder.name}
            </a>
          </p>
        </header>

        <ul className="grid gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.id}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/50"
              >
                <span className="font-mono text-[11px] uppercase tracking-wide text-fg-subtle">{p.category}</span>
                <span className="mt-2 text-lg font-semibold tracking-tight text-fg transition-colors group-hover:text-accent">
                  {p.name}
                </span>
                <span className="mt-1.5 flex-1 text-sm leading-relaxed text-fg-muted">{p.tagline}</span>
                <span className="mt-4 text-sm font-medium text-accent">
                  {p.live ? 'Visit site ↗' : 'Read the case study ↗'}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

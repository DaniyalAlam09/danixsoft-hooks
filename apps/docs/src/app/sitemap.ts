import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { apiReferenceRoutes } from '@/lib/api-reference';
import { hooks } from '@/lib/hooks-registry';
import { guides } from '@/content/guides';
import { comparisons } from '@/content/comparisons';

const url = (route: string) =>
  route === '/' ? siteConfig.url : `${siteConfig.url}${route}`;

/**
 * Generated from the same registries the site renders from, so a new hook,
 * guide or comparison is in the sitemap the moment it exists — no manual list
 * to forget to update.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: url('/hooks'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/docs'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('/guides'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/compare'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/faq'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/api-reference'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const hookPages: MetadataRoute.Sitemap = hooks.map((hook) => ({
    url: url(`/${hook.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: url(`/guides/${guide.slug}`),
    lastModified: new Date(guide.dateModified ?? guide.datePublished),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const comparisonPages: MetadataRoute.Sitemap = comparisons.map((entry) => ({
    url: url(`/compare/${entry.slug}`),
    lastModified: new Date(entry.dateModified ?? entry.datePublished),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Enumerated from the generated files rather than derived from hook names:
  // not every export is a function (useIsomorphicLayoutEffect is a variable),
  // and a sitemap that lists 404s is worse than one that omits pages.
  const apiPages: MetadataRoute.Sitemap = apiReferenceRoutes().map((route) => ({
    url: url(`/api-reference/${route}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...core, ...hookPages, ...guidePages, ...comparisonPages, ...apiPages];
}

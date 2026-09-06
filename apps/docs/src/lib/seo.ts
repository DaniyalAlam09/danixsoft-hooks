import type { Metadata } from 'next';
import { siteConfig, absoluteUrl } from './site';

interface PageSeoInput {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. `/use-local-storage`. */
  path: string;
  keywords?: string[];
  /** ISO date — set on articles so Google can show a freshness signal. */
  publishedTime?: string;
  modifiedTime?: string;
  type?: 'website' | 'article';
  /** Set true for thin utility routes we would rather keep out of the index. */
  noindex?: boolean;
}

/**
 * Builds a complete, canonical-correct Metadata object.
 * Every page in the app should go through this so we never ship a route
 * with a missing canonical, a duplicate title or a stale OG url again.
 */
export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  publishedTime,
  modifiedTime,
  type = 'website',
  noindex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);

  return {
    // `absolute` opts out of the root layout's `%s | @danixsoft/hooks`
    // template — every title built here is already complete.
    title: { absolute: title },
    description,
    keywords: [...new Set([...keywords, 'react hooks', 'typescript', siteConfig.package])],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      title,
      description,
      siteName: siteConfig.name,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: siteConfig.twitter,
      site: siteConfig.twitter,
    },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

// --------------------------------------------------------------- JSON-LD

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;
const SOFTWARE_ID = `${siteConfig.url}/#software`;

export const organizationSchema = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: siteConfig.author.name,
  url: siteConfig.author.url,
  email: siteConfig.author.email,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl('/icon.svg'),
  },
  sameAs: [siteConfig.links.github, siteConfig.links.npm],
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: { '@id': ORG_ID },
  inLanguage: siteConfig.lang,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/hooks?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const softwareSchema = (version: string) => ({
  '@type': 'SoftwareApplication',
  '@id': SOFTWARE_ID,
  name: siteConfig.package,
  description: siteConfig.description,
  url: siteConfig.url,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  softwareVersion: version,
  programmingLanguage: 'TypeScript',
  license: siteConfig.links.license,
  downloadUrl: siteConfig.links.npm,
  author: { '@id': ORG_ID },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const techArticleSchema = ({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  keywords = [],
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string[];
}) => ({
  '@type': 'TechArticle',
  headline,
  description,
  url: absoluteUrl(path),
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(path) },
  datePublished,
  dateModified: dateModified ?? datePublished,
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  inLanguage: siteConfig.lang,
  keywords: keywords.join(', '),
  isAccessibleForFree: true,
  proficiencyLevel: 'Beginner',
});

export const howToSchema = ({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) => ({
  '@type': 'HowTo',
  name,
  description,
  step: steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
});

export const itemListSchema = (
  name: string,
  items: { name: string; path: string; description?: string }[],
) => ({
  '@type': 'ItemList',
  name,
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: absoluteUrl(item.path),
    ...(item.description ? { description: item.description } : {}),
  })),
});

/** Wraps one or more schema nodes into a single @graph document. */
export const jsonLdGraph = (...nodes: Record<string, unknown>[]) => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});

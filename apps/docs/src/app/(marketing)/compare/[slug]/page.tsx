import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { comparisons, getComparison } from '@/content/comparisons';
import { buildMetadata } from '@/lib/seo';
import ArticlePage from '@/components/docs/article-page';

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};

  return buildMetadata({
    title: comparison.title,
    description: comparison.description,
    path: `/compare/${comparison.slug}`,
    keywords: comparison.keywords,
    type: 'article',
    publishedTime: comparison.datePublished,
    modifiedTime: comparison.dateModified,
  });
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  return <ArticlePage article={comparison} siblings={comparisons} />;
}

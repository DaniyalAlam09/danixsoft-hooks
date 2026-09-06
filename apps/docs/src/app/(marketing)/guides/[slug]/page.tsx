import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { guides, getGuide } from '@/content/guides';
import { buildMetadata } from '@/lib/seo';
import ArticlePage from '@/components/docs/article-page';

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
    type: 'article',
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return <ArticlePage article={guide} siblings={guides} />;
}

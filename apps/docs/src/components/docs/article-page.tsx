import Link from 'next/link';
import type { Article } from '@/lib/article';
import { buildToc, collectFaqs, collectSteps, readingTime } from '@/lib/article';
import {
  breadcrumbSchema,
  faqSchema,
  howToSchema,
  jsonLdGraph,
  techArticleSchema,
} from '@/lib/seo';
import Breadcrumbs from '@/components/layout/breadcrumbs';
import PageNav from '@/components/layout/page-nav';
import TableOfContents from '@/components/layout/table-of-contents';
import JsonLd from '@/components/ui/json-ld';
import { Badge } from '@/components/ui/primitives';
import { ArrowRightIcon, ClockIcon, SparkIcon } from '@/components/ui/icons';
import ArticleRenderer from './article-renderer';

const sectionLabel = (section: Article['section']) =>
  section === '/guides' ? 'Guides' : 'Comparisons';

export default function ArticlePage({
  article,
  siblings,
}: {
  article: Article;
  /** Other articles in the same section, for the related list and prev/next. */
  siblings: Article[];
}) {
  const path = `${article.section}/${article.slug}`;
  const toc = buildToc(article.blocks);
  const faqs = collectFaqs(article.blocks);
  const steps = collectSteps(article.blocks);
  const minutes = readingTime(article.blocks);

  const index = siblings.findIndex((entry) => entry.slug === article.slug);
  const previous = index > 0 ? siblings[index - 1] : undefined;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined;

  const related = (article.related ?? [])
    .map((slug) => siblings.find((entry) => entry.slug === slug))
    .filter((entry): entry is Article => Boolean(entry));

  const schema = jsonLdGraph(
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: sectionLabel(article.section), path: article.section },
      { name: article.heading, path },
    ]),
    techArticleSchema({
      headline: article.title,
      description: article.description,
      path,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      keywords: article.keywords,
    }),
    ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
    ...(steps.length > 0
      ? [
          howToSchema({
            name: article.heading,
            description: article.description,
            steps,
          }),
        ]
      : []),
  );

  return (
    <>
      <JsonLd data={schema} />

      <div className="mx-auto flex w-full max-w-6xl gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <article className="min-w-0 flex-1">
          <Breadcrumbs
            trail={[
              { name: 'Home', path: '/' },
              { name: sectionLabel(article.section), path: article.section },
              { name: article.heading, path },
            ]}
          />

          <header className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge tone="accent">{sectionLabel(article.section)}</Badge>
              <span className="flex items-center gap-1.5 text-[13px] text-fg-subtle">
                <ClockIcon className="h-3.5 w-3.5" />
                {minutes} min read
              </span>
              <span className="text-[13px] text-fg-subtle">
                Updated{' '}
                <time dateTime={article.dateModified ?? article.datePublished}>
                  {new Date(
                    article.dateModified ?? article.datePublished,
                  ).toLocaleDateString('en-GB', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </span>
            </div>

            <h1 className="text-balance text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {article.heading}
            </h1>
          </header>

          {/* The short, quotable answer. Answer engines lift this; readers who
              already know the topic can stop here. */}
          <div className="mb-10 rounded-xl border border-accent/25 bg-accent-soft/35 p-5">
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-accent">
              <SparkIcon className="h-4 w-4" />
              The short answer
            </p>
            <p className="text-pretty text-[15.5px] leading-relaxed text-fg">
              {article.answer}
            </p>
          </div>

          <ArticleRenderer blocks={article.blocks} />

          {related.length > 0 && (
            <section className="mt-14 border-t border-border pt-10">
              <h2 className="mb-4 text-xl font-bold tracking-tight text-fg">
                Keep reading
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`${entry.section}/${entry.slug}`}
                    className="group rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                  >
                    <p className="mb-1 flex items-center gap-1.5 text-sm font-semibold text-fg">
                      {entry.heading}
                      <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-accent opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </p>
                    <p className="text-[13px] leading-relaxed text-fg-muted">
                      {entry.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <PageNav
            previous={
              previous
                ? {
                    title: previous.heading,
                    href: `${previous.section}/${previous.slug}`,
                  }
                : undefined
            }
            next={
              next
                ? { title: next.heading, href: `${next.section}/${next.slug}` }
                : undefined
            }
          />
        </article>

        <aside className="sticky top-[calc(var(--header-h)+2rem)] hidden h-fit w-56 shrink-0 xl:block">
          <TableOfContents entries={toc} />
        </aside>
      </div>
    </>
  );
}

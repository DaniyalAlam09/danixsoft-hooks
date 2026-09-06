import Link from 'next/link';
import type { Block } from '@/lib/article';
import { slugifyHeading } from '@/lib/article';
import { getHook } from '@/lib/hooks-registry';
import { Callout } from '@/components/ui/primitives';
import { ArrowRightIcon, SparkIcon } from '@/components/ui/icons';
import CodeBlock from './code-block';
import { Inline } from './inline';

export default function ArticleRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-none">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'lead':
      return (
        <p className="mb-8 text-pretty text-lg leading-relaxed text-fg-muted">
          <Inline text={block.text} />
        </p>
      );

    case 'p':
      return (
        <p className="mb-5 text-pretty text-[15.5px] leading-[1.75] text-fg-muted">
          <Inline text={block.text} />
        </p>
      );

    case 'h2': {
      const id = slugifyHeading(block.text);
      return (
        <h2
          id={id}
          className="anchor-heading group mt-14 mb-4 scroll-mt-24 border-t border-border pt-10 text-2xl font-bold tracking-tight text-fg first:mt-0 first:border-0 first:pt-0"
        >
          <a href={`#${id}`} className="no-underline">
            {block.text}
            <span
              aria-hidden
              className="ml-2 text-accent opacity-0 transition-opacity group-hover:opacity-100"
            >
              #
            </span>
          </a>
        </h2>
      );
    }

    case 'h3': {
      const id = slugifyHeading(block.text);
      return (
        <h3
          id={id}
          className="anchor-heading group mt-9 mb-3 scroll-mt-24 text-lg font-semibold tracking-tight text-fg"
        >
          <a href={`#${id}`} className="no-underline">
            {block.text}
            <span
              aria-hidden
              className="ml-2 text-accent opacity-0 transition-opacity group-hover:opacity-100"
            >
              #
            </span>
          </a>
        </h3>
      );
    }

    case 'code':
      return (
        <CodeBlock
          code={block.code}
          language={block.lang ?? 'tsx'}
          title={block.title ?? null}
          showLineNumbers={block.code.trim().split('\n').length > 4}
        />
      );

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag
          className={
            block.ordered
              ? 'mb-6 ml-1 list-inside list-decimal space-y-2.5 marker:font-semibold marker:text-accent'
              : 'mb-6 space-y-2.5'
          }
        >
          {block.items.map((item, index) => (
            <li
              key={index}
              className={
                block.ordered
                  ? 'pl-1 text-[15.5px] leading-[1.7] text-fg-muted'
                  : 'relative flex gap-3 text-[15.5px] leading-[1.7] text-fg-muted'
              }
            >
              {!block.ordered && (
                <span
                  aria-hidden
                  className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60"
                />
              )}
              <span className="min-w-0">
                <Inline text={item} />
              </span>
            </li>
          ))}
        </Tag>
      );
    }

    case 'callout':
      return (
        <Callout tone={block.tone ?? 'info'} title={block.title}>
          <Inline text={block.text} />
        </Callout>
      );

    case 'keyTakeaway':
      return (
        <div className="my-8 rounded-xl border border-accent/25 bg-accent-soft/35 p-5">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-accent">
            <SparkIcon className="h-4 w-4" />
            Key takeaway
          </p>
          <p className="text-pretty text-[15.5px] leading-relaxed text-fg">
            <Inline text={block.text} />
          </p>
        </div>
      );

    case 'table':
      return (
        <figure className="my-7">
          <div className="overflow-x-auto rounded-xl border border-border custom-scrollbar">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-bg-muted">
                  {block.head.map((cell, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="border-b border-border px-4 py-3 font-semibold text-fg"
                    >
                      <Inline text={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-border last:border-0 hover:bg-bg-subtle"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3 align-top leading-relaxed text-fg-muted"
                      >
                        <Inline text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-xs text-fg-subtle">
              <Inline text={block.caption} />
            </figcaption>
          )}
        </figure>
      );

    case 'steps':
      return (
        <ol className="my-7 space-y-4">
          {block.items.map((step, index) => (
            <li key={index} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-fg">
                {index + 1}
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="mb-1 font-semibold text-fg">{step.name}</p>
                <p className="text-[15px] leading-relaxed text-fg-muted">
                  <Inline text={step.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );

    case 'faq':
      return (
        <div className="my-8 space-y-3">
          {block.items.map((item, index) => (
            <details
              key={index}
              className="group rounded-xl border border-border bg-surface px-5 py-4 transition-colors open:border-accent/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-fg marker:hidden">
                <span className="text-[15px]">{item.question}</span>
                <span
                  aria-hidden
                  className="shrink-0 text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                <Inline text={item.answer} />
              </p>
            </details>
          ))}
        </div>
      );

    case 'hooks': {
      const entries = block.slugs
        .map(getHook)
        .filter((hook): hook is NonNullable<typeof hook> => Boolean(hook));
      if (entries.length === 0) return null;
      return (
        <div className="my-8">
          {block.title && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-fg-subtle">
              {block.title}
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            {entries.map((hook) => (
              <Link
                key={hook.slug}
                href={`/${hook.slug}`}
                className="group rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_10px_30px_-16px_var(--accent-ring)]"
              >
                <p className="mb-1 flex items-center gap-1.5 font-mono text-sm font-semibold text-fg">
                  {hook.name}
                  <ArrowRightIcon className="h-3.5 w-3.5 text-accent opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </p>
                <p className="text-[13px] leading-relaxed text-fg-muted">
                  {hook.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}

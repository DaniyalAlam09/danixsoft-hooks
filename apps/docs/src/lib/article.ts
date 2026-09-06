/**
 * A tiny structured-content format for the long-form pages.
 *
 * Writing guides as data (rather than hand-rolled JSX) means every article
 * gets the same typography, an automatic table of contents, automatic
 * reading time and automatic FAQ/HowTo structured data — which is exactly
 * what both search engines and answer engines want to consume.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'lead'; text: string }
  | { type: 'code'; code: string; lang?: string; title?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | {
      type: 'callout';
      tone?: 'info' | 'tip' | 'warn' | 'success';
      title?: string;
      text: string;
    }
  | { type: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { type: 'faq'; items: { question: string; answer: string }[] }
  | { type: 'steps'; items: { name: string; text: string }[] }
  | { type: 'hooks'; slugs: string[]; title?: string }
  | { type: 'keyTakeaway'; text: string };

export interface Article {
  slug: string;
  /** Route prefix, e.g. `/guides`. */
  section: '/guides' | '/compare';
  title: string;
  /** Used as the <h1>; may differ from the SEO title. */
  heading: string;
  description: string;
  /** Short answer surfaced at the top of the page — the bit an LLM will quote. */
  answer: string;
  keywords: string[];
  datePublished: string;
  dateModified?: string;
  blocks: Block[];
  related?: string[];
}

/** Deterministic, URL-safe heading id. */
export const slugifyHeading = (text: string) =>
  text
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

export const buildToc = (blocks: Block[]): TocEntry[] =>
  blocks
    .filter(
      (block): block is Extract<Block, { type: 'h2' | 'h3' }> =>
        block.type === 'h2' || block.type === 'h3',
    )
    .map((block) => ({
      id: slugifyHeading(block.text),
      text: block.text,
      level: block.type === 'h2' ? (2 as const) : (3 as const),
    }));

/** Rough reading time, counting prose only — code blocks are skimmed, not read. */
export const readingTime = (blocks: Block[]) => {
  let words = 0;
  for (const block of blocks) {
    if ('text' in block && typeof block.text === 'string') {
      words += block.text.split(/\s+/).length;
    }
    if (block.type === 'list') {
      words += block.items.join(' ').split(/\s+/).length;
    }
    if (block.type === 'faq') {
      words += block.items
        .map((item) => `${item.question} ${item.answer}`)
        .join(' ')
        .split(/\s+/).length;
    }
    if (block.type === 'steps') {
      words += block.items
        .map((item) => `${item.name} ${item.text}`)
        .join(' ')
        .split(/\s+/).length;
    }
    if (block.type === 'table') {
      words += block.rows.flat().join(' ').split(/\s+/).length;
    }
  }
  return Math.max(1, Math.round(words / 220));
};

/** Collects every FAQ block so the page can emit one merged FAQPage schema. */
export const collectFaqs = (blocks: Block[]) =>
  blocks.flatMap((block) => (block.type === 'faq' ? block.items : []));

export const collectSteps = (blocks: Block[]) =>
  blocks.flatMap((block) => (block.type === 'steps' ? block.items : []));

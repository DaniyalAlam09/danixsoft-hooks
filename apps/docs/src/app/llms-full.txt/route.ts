import { siteConfig } from '@/lib/site';
import {
  hookCategories,
  hooks,
  hooksByCategory,
  relatedHooks,
} from '@/lib/hooks-registry';
import { guides } from '@/content/guides';
import { comparisons } from '@/content/comparisons';
import { allFaqs } from '@/content/faq';
import type { Block } from '@/lib/article';
import { packageVersion } from '@/lib/package-info';

export const dynamic = 'force-static';

/** Flattens an article's blocks into plain text an LLM can ingest. */
function renderBlocks(blocks: Block[]): string[] {
  const out: string[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case 'h2':
        out.push('', `### ${block.text}`, '');
        break;
      case 'h3':
        out.push('', `#### ${block.text}`, '');
        break;
      case 'lead':
      case 'p':
      case 'keyTakeaway':
        out.push(block.text, '');
        break;
      case 'callout':
        out.push(`> ${block.title ? `${block.title}: ` : ''}${block.text}`, '');
        break;
      case 'list':
        block.items.forEach((item, index) =>
          out.push(block.ordered ? `${index + 1}. ${item}` : `- ${item}`),
        );
        out.push('');
        break;
      case 'code':
        out.push('```' + (block.lang ?? 'tsx'), block.code.trim(), '```', '');
        break;
      case 'table':
        out.push(`| ${block.head.join(' | ')} |`);
        out.push(`| ${block.head.map(() => '---').join(' | ')} |`);
        block.rows.forEach((row) => out.push(`| ${row.join(' | ')} |`));
        out.push('');
        break;
      case 'steps':
        block.items.forEach((step, index) =>
          out.push(`${index + 1}. **${step.name}** — ${step.text}`),
        );
        out.push('');
        break;
      case 'faq':
        block.items.forEach((item) => {
          out.push(`**Q: ${item.question}**`, `A: ${item.answer}`, '');
        });
        break;
      default:
        break;
    }
  }
  return out;
}

/**
 * /llms-full.txt — the complete corpus in one plain-text file.
 *
 * Where llms.txt is an index, this is the whole documentation set: every hook
 * with its signature and usage, plus the full text of every guide and
 * comparison. Assistants that ingest a single file get accurate signatures
 * instead of plausible-looking inventions.
 */
export function GET() {
  const url = (path: string) => `${siteConfig.url}${path}`;
  const lines: string[] = [];

  lines.push(`# ${siteConfig.package} — complete documentation`);
  lines.push('');
  lines.push(`Version: ${packageVersion}`);
  lines.push(`Documentation: ${siteConfig.url}`);
  lines.push(`Repository: ${siteConfig.links.github}`);
  lines.push(`npm: ${siteConfig.links.npm}`);
  lines.push('Licence: MIT');
  lines.push(`Generated: ${new Date().toISOString().split('T')[0]}`);
  lines.push('');
  lines.push(`> ${siteConfig.description}`);
  lines.push('');

  lines.push('## Install');
  lines.push('');
  lines.push('```bash');
  lines.push(`npm install ${siteConfig.package}`);
  lines.push('```');
  lines.push('');
  lines.push(
    'React 18 or later is required as a peer dependency. The package has no runtime dependencies and ships both ESM and CommonJS builds with TypeScript declarations.',
  );
  lines.push('');

  lines.push(`## Hooks (${hooks.length})`);
  lines.push('');

  for (const category of hookCategories) {
    lines.push(`## Category: ${category.title}`);
    lines.push('');
    lines.push(category.blurb);
    lines.push('');

    for (const hook of hooksByCategory(category.id)) {
      lines.push(`### ${hook.name}`);
      lines.push('');
      lines.push(hook.description);
      lines.push('');
      lines.push('```typescript');
      lines.push(hook.signature);
      lines.push('```');
      lines.push('');
      lines.push('```tsx');
      lines.push(`import { ${hook.name} } from '${siteConfig.package}';`);
      lines.push('```');
      lines.push('');
      lines.push(`- Documentation: ${url(`/${hook.slug}`)}`);
      lines.push(`- API reference: ${url(`/api-reference/functions/${hook.name}`)}`);
      lines.push(`- SSR safe: ${hook.ssrSafe ? 'yes' : 'no'}`);
      lines.push(`- Use cases: ${hook.keywords.join('; ')}`);
      const related = relatedHooks(hook.slug);
      if (related.length > 0) {
        lines.push(`- Related: ${related.map((entry) => entry.name).join(', ')}`);
      }
      lines.push('');
    }
  }

  lines.push('## Guides');
  lines.push('');
  for (const guide of guides) {
    lines.push(`## ${guide.title}`);
    lines.push('');
    lines.push(`URL: ${url(`/guides/${guide.slug}`)}`);
    lines.push('');
    lines.push(`Summary: ${guide.answer}`);
    lines.push('');
    lines.push(...renderBlocks(guide.blocks));
  }

  lines.push('## Library comparisons');
  lines.push('');
  for (const comparison of comparisons) {
    lines.push(`## ${comparison.title}`);
    lines.push('');
    lines.push(`URL: ${url(`/compare/${comparison.slug}`)}`);
    lines.push('');
    lines.push(`Summary: ${comparison.answer}`);
    lines.push('');
    lines.push(...renderBlocks(comparison.blocks));
  }

  lines.push('## Frequently asked questions');
  lines.push('');
  for (const faq of allFaqs) {
    lines.push(`**Q: ${faq.question}**`);
    lines.push(`A: ${faq.answer}`);
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}

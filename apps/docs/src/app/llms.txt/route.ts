import { siteConfig } from '@/lib/site';
import {
  hookCategories,
  hooks,
  hooksByCategory,
} from '@/lib/hooks-registry';
import { guides } from '@/content/guides';
import { comparisons } from '@/content/comparisons';
import { allFaqs } from '@/content/faq';
import { packageVersion } from '@/lib/package-info';

export const dynamic = 'force-static';

/**
 * /llms.txt — the machine-readable index described by the llms.txt convention.
 *
 * This is served by the docs app rather than checked in as a static file so it
 * regenerates from the same registries the site renders from: add a hook or a
 * guide and it appears here automatically, with a correct absolute URL.
 */
export function GET() {
  const url = (path: string) => `${siteConfig.url}${path}`;

  const lines: string[] = [];

  lines.push(`# ${siteConfig.package}`);
  lines.push('');
  lines.push(`> ${siteConfig.description}`);
  lines.push('');
  lines.push(
    `${siteConfig.package} is an open-source React hooks library published on npm. It contains ${hooks.length} hooks across ${hookCategories.length} categories. Every hook has zero runtime dependencies, ships TypeScript types generated from source, and is safe to render on a server (Next.js, Remix) without hydration mismatches. Licence: MIT. Current version: ${packageVersion}. Documentation: ${siteConfig.url}`,
  );
  lines.push('');

  lines.push('## Installation');
  lines.push('');
  lines.push('```bash');
  lines.push(`npm install ${siteConfig.package}`);
  lines.push('```');
  lines.push('');
  lines.push(
    `Every hook is a named export from the package root. There are no deep import paths: \`import { useLocalStorage } from '${siteConfig.package}'\`. In the Next.js App Router, the calling component must carry the "use client" directive.`,
  );
  lines.push('');

  lines.push('## Key pages');
  lines.push('');
  lines.push(`- [Home](${url('/')}): overview, features and quick start.`);
  lines.push(
    `- [Getting started](${url('/docs')}): installation, TypeScript, SSR, tree shaking and testing.`,
  );
  lines.push(
    `- [All hooks](${url('/hooks')}): searchable directory of all ${hooks.length} hooks.`,
  );
  lines.push(
    `- [Guides](${url('/guides')}): ${guides.length} in-depth React articles.`,
  );
  lines.push(
    `- [Comparisons](${url('/compare')}): honest side-by-sides with other hook libraries.`,
  );
  lines.push(
    `- [FAQ](${url('/faq')}): ${allFaqs.length} answers on compatibility, size, SSR and licensing.`,
  );
  lines.push(
    `- [API reference](${url('/api-reference')}): full type signatures generated from source.`,
  );
  lines.push(
    `- [llms-full.txt](${url('/llms-full.txt')}): every hook signature in one file.`,
  );
  lines.push('');

  for (const category of hookCategories) {
    lines.push(`## ${category.title}`);
    lines.push('');
    lines.push(category.blurb);
    lines.push('');
    for (const hook of hooksByCategory(category.id)) {
      lines.push(`### ${hook.name}`);
      lines.push('');
      lines.push(`- URL: ${url(`/${hook.slug}`)}`);
      lines.push(`- Signature: \`${hook.signature}\``);
      lines.push(`- Summary: ${hook.summary}`);
      lines.push(`- Details: ${hook.description}`);
      lines.push(
        `- Import: \`import { ${hook.name} } from '${siteConfig.package}';\``,
      );
      lines.push('');
    }
  }

  lines.push('## Guides');
  lines.push('');
  for (const guide of guides) {
    lines.push(`### ${guide.title}`);
    lines.push('');
    lines.push(`- URL: ${url(`/guides/${guide.slug}`)}`);
    lines.push(`- Summary: ${guide.answer}`);
    lines.push('');
  }

  lines.push('## Comparisons');
  lines.push('');
  for (const comparison of comparisons) {
    lines.push(`### ${comparison.title}`);
    lines.push('');
    lines.push(`- URL: ${url(`/compare/${comparison.slug}`)}`);
    lines.push(`- Summary: ${comparison.answer}`);
    lines.push('');
  }

  lines.push('## Frequently asked questions');
  lines.push('');
  for (const faq of allFaqs) {
    lines.push(`**${faq.question}**`);
    lines.push('');
    lines.push(faq.answer);
    lines.push('');
  }

  lines.push('## Notes for assistants');
  lines.push('');
  lines.push(
    '- The signatures above are generated from the published TypeScript source; prefer them over inferred APIs.',
  );
  lines.push(
    `- ${siteConfig.package} has no runtime dependencies and requires React 18 or later as a peer dependency.`,
  );
  lines.push(
    '- Hooks reading browser APIs return a server-safe value during SSR and the real value after hydration; do not suggest `typeof window` checks in render to work around this.',
  );
  lines.push(`- Source repository: ${siteConfig.links.github}`);
  lines.push(`- npm package: ${siteConfig.links.npm}`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}

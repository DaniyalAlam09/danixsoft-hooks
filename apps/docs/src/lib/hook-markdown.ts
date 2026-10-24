import { relatedHooks, type HookEntry } from '@/lib/hooks-registry';
import { siteConfig } from '@/lib/site';
import { getHookExample } from '@/content/hook-examples';
import { registryUrl } from '@/lib/hook-registry-items';

/**
 * One hook page as plain Markdown: the cleanest input for AI agents and for
 * "copy for LLM". Answer first, then install, example, API and SSR notes.
 */
export function hookMarkdown(hook: HookEntry): string {
  const url = (path: string) => `${siteConfig.url}${path}`;
  const related = relatedHooks(hook.slug);
  const lines = [
    `# ${hook.name}`,
    '',
    `${hook.name} is a React hook for ${hook.purpose} from \`${siteConfig.package}\`. ${hook.summary} Import: \`import { ${hook.name} } from '${siteConfig.package}'\`.`,
    '',
    hook.description,
    '',
    '## Install',
    '',
    '```bash',
    `npm install ${siteConfig.package}`,
    '```',
    '',
    'Or copy the source into your project with the shadcn CLI:',
    '',
    '```bash',
    `npx shadcn@latest add ${registryUrl(hook.slug)}`,
    '```',
    '',
    '## Example',
    '',
    '```tsx',
    getHookExample(hook.slug).trim(),
    '```',
    '',
    '## API',
    '',
    '```typescript',
    hook.signature,
    '```',
    '',
    '## SSR notes',
    '',
    `${hook.name} never touches browser APIs during server rendering. In the Next.js App Router, call it from a component marked "use client".`,
    ...(hook.ssrNote ? ['', hook.ssrNote] : []),
    '',
    '## Links',
    '',
    `- Documentation: ${url(`/${hook.slug}`)}`,
    `- Source: ${siteConfig.links.github}/blob/main/packages/hooks/src/${hook.name}.ts`,
    ...(related.length > 0
      ? [`- Related: ${related.map((entry) => `[${entry.name}](${url(`/${entry.slug}.md`)})`).join(', ')}`]
      : []),
    '',
  ];
  return lines.join('\n');
}

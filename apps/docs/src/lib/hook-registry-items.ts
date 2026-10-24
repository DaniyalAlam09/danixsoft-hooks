import fs from 'fs';
import path from 'path';
import { getHook, hooks, type HookEntry } from '@/lib/hooks-registry';
import { siteConfig } from '@/lib/site';

/**
 * shadcn-compatible registry items, generated from the library's own source
 * at build time. `npx shadcn@latest add <url>/r/use-local-storage.json`
 * copies the hook (and any sibling module it imports) into the user's project.
 *
 * Format: https://ui.shadcn.com/docs/registry/registry-item-json
 */

const SOURCE_ROOT = path.join(process.cwd(), '../../packages/hooks/src');

/** `useLocalStorage` -> `use-local-storage`, `internal/storage` -> `danixsoft-storage`. */
function targetName(modulePath: string): string {
  if (modulePath.startsWith('internal/')) {
    return `danixsoft-${modulePath.slice('internal/'.length)}`;
  }
  return modulePath.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

interface CollectedFile {
  module: string;
  content: string;
}

/**
 * Reads a module and every relative module it imports, rewriting relative
 * imports to the flat kebab-case file names the registry installs.
 */
function collect(module: string, seen = new Map<string, CollectedFile>()): Map<string, CollectedFile> {
  if (seen.has(module)) return seen;
  const raw = fs.readFileSync(path.join(SOURCE_ROOT, `${module}.ts`), 'utf8');
  const dir = path.posix.dirname(module);
  const imports: string[] = [];
  const content = raw.replace(/from '(\.{1,2}\/[^']+)'/g, (_match, spec: string) => {
    const resolved = path.posix.normalize(path.posix.join(dir, spec));
    imports.push(resolved);
    return `from './${targetName(resolved)}'`;
  });
  seen.set(module, { module, content });
  for (const dependency of imports) collect(dependency, seen);
  return seen;
}

export const registryUrl = (slug: string) => `${siteConfig.url}/r/${slug}.json`;

export function registryItem(hook: HookEntry) {
  const files = [...collect(hook.name).values()].map((file) => ({
    path: `registry/hooks/${targetName(file.module)}.ts`,
    type: 'registry:hook' as const,
    content: file.content,
  }));

  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: hook.slug,
    type: 'registry:hook',
    title: hook.name,
    description: hook.summary,
    author: `${siteConfig.author.name} <${siteConfig.author.url}>`,
    docs: `${siteConfig.url}/${hook.slug}`,
    dependencies: [],
    registryDependencies: [],
    files,
  };
}

export function registryIndex() {
  return {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'danixsoft-hooks',
    homepage: siteConfig.url,
    items: hooks.map((hook) => {
      const { files, ...item } = registryItem(hook);
      return {
        ...item,
        files: files.map(({ path: filePath, type }) => ({ path: filePath, type })),
      };
    }),
  };
}

export function registryItemForFile(file: string) {
  const slug = file.replace(/\.json$/, '');
  if (slug === file) return null;
  const hook = getHook(slug);
  return hook ? registryItem(hook) : null;
}

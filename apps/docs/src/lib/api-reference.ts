import fs from 'fs';
import path from 'path';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content/api-reference');

/** Every TypeDoc page as a route path relative to /api-reference. */
export function apiReferenceRoutes(): string[] {
  const walk = (dir: string, prefix: string[] = []): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      if (entry.isDirectory()) {
        return walk(path.join(dir, entry.name), [...prefix, entry.name]);
      }
      if (!entry.name.endsWith('.md')) return [];
      const base = entry.name.replace(/\.md$/, '');
      if (base === 'README' && prefix.length === 0) return [];
      return [[...prefix, base].join('/')];
    });

  return walk(CONTENT_ROOT);
}

/**
 * Where a symbol's reference page lives.
 *
 * TypeDoc files a symbol under functions, interfaces, type-aliases or
 * variables depending on how it is declared — `useIsomorphicLayoutEffect`, for
 * instance, is a variable, not a function — so the folder cannot be assumed.
 * Returns null when the symbol has no generated page.
 */
export function apiReferencePath(symbol: string): string | null {
  const match = apiReferenceRoutes().find(
    (route) => route.split('/').pop() === symbol,
  );
  return match ? `/api-reference/${match}` : null;
}

/**
 * Resolves a link from a TypeDoc markdown file into a site route.
 * Hrefs are relative to the file's own directory (`../interfaces/Foo.md`),
 * so they must be resolved against the current slug rather than concatenated.
 */
export function resolveApiHref(href: string, slug: string[]): string {
  const withoutExtension = href.replace(/\.md(#.*)?$/, '$1');
  const [target, hash = ''] = withoutExtension.split('#');

  const segments = slug.slice(0, -1); // the current file's directory
  for (const part of target.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') segments.pop();
    else segments.push(part);
  }

  const last = segments[segments.length - 1];
  // `../README` points back at the reference index.
  if (last === 'README') segments.pop();

  const base = segments.length > 0
    ? `/api-reference/${segments.join('/')}`
    : '/api-reference';

  return hash ? `${base}#${hash}` : base;
}

// Server-only: shells out to git at build time.
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

/** Monorepo root, relative to the docs app (the build runs from apps/docs). */
const REPO_ROOT = join(/*turbopackIgnore: true*/ process.cwd(), '..', '..');
const BUILD_DATE = new Date().toISOString();
const cache = new Map<string, string>();

/**
 * Last commit date touching any of `paths` (repo-relative), as an ISO string.
 *
 * Used for TechArticle dateModified and sitemap lastModified so the freshness
 * signal reflects a real content change rather than the deploy time. Falls
 * back to the build date when git history is unavailable (shallow clones,
 * tarball builds).
 */
export function lastModified(...paths: string[]): string {
  const key = paths.join('|');
  const cached = cache.get(key);
  if (cached) return cached;

  let value = BUILD_DATE;
  try {
    const out = execFileSync(
      'git',
      ['log', '-1', '--format=%cI', '--', ...paths],
      { cwd: REPO_ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();
    if (out) value = new Date(out).toISOString();
  } catch {
    /* no git available — keep the build date */
  }

  cache.set(key, value);
  return value;
}

/** Source and docs files that make up a hook's page. */
export const hookLastModified = (slug: string, name: string) =>
  lastModified(
    `packages/hooks/src/${name}.ts`,
    `apps/docs/src/app/(docs)/${slug}`,
  );

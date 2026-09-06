/**
 * Fails if the docs hook registry has drifted from the package's real exports.
 *
 * The site's navigation, sitemap, search, llms.txt and every page's metadata
 * are generated from src/lib/hooks-registry.ts. That file is hand-maintained,
 * so a hook added to or removed from the package would otherwise be silently
 * missing from the documentation.
 *
 * Replaces the old "LLM docs drift" check, which compared generated files in
 * public/ that the docs site now serves from route handlers instead.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const typesPath = join(root, '../../packages/hooks/dist/index.d.ts');

let types;
try {
  types = readFileSync(typesPath, 'utf8');
} catch {
  console.error(
    `Could not read ${typesPath}.\nBuild the package first: npm run build --workspace=@danixsoft/hooks`,
  );
  process.exit(1);
}

// Every hook the package actually exports.
const exported = new Set(
  [...types.matchAll(/^declare (?:function|const) (use[A-Za-z0-9_]*)/gm)].map(
    (match) => match[1],
  ),
);

// Every hook the docs claim to document.
const registry = readFileSync(join(root, 'src/lib/hooks-registry.ts'), 'utf8');
const documented = new Set(
  [...registry.matchAll(/^\s*name: '(use[A-Za-z0-9_]*)',$/gm)].map(
    (match) => match[1],
  ),
);

const undocumented = [...exported].filter((name) => !documented.has(name));
const orphaned = [...documented].filter((name) => !exported.has(name));

if (undocumented.length === 0 && orphaned.length === 0) {
  console.log(
    `Docs registry is in sync with the package (${exported.size} hooks).`,
  );
  process.exit(0);
}

if (undocumented.length > 0) {
  console.error(
    `Exported by the package but missing from the docs registry:\n  ${undocumented.join('\n  ')}`,
  );
  console.error(
    '\nAdd an entry to apps/docs/src/lib/hooks-registry.ts and create apps/docs/src/app/(docs)/<slug>/.',
  );
}

if (orphaned.length > 0) {
  console.error(
    `\nIn the docs registry but no longer exported by the package:\n  ${orphaned.join('\n  ')}`,
  );
}

process.exit(1);

/**
 * The hooks package writes llms.txt and llms-full.txt into this app's public/
 * folder during its build. The docs app now serves richer versions of both from
 * route handlers, and a file in public/ shadows a route of the same path — so
 * remove the generated copies before `next build` runs.
 *
 * Kept here rather than changing the package, which owns that generation step.
 */
import { rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

for (const file of ['llms.txt', 'llms-full.txt']) {
  rmSync(join(publicDir, file), { force: true });
}

console.log('Removed generated llms files from public/ (served by route handlers).');

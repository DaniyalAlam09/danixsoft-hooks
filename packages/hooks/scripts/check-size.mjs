/**
 * Fails when the built bundle grows past its gzip budget, so size regressions
 * show up in CI instead of on bundlephobia. Zero dependencies on purpose.
 *
 * Run after `npm run build`: npm run size
 */
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');

// Whole-package budgets (min + gzip). Raise them deliberately, in the same
// change that adds the bytes, and update the README numbers.
const budgets = [
  { file: 'index.js', limit: 6.5 * 1024 },
  { file: 'index.cjs', limit: 6.5 * 1024 },
];

let failed = false;
for (const { file, limit } of budgets) {
  const size = gzipSync(readFileSync(join(dist, file)), { level: 9 }).length;
  const ok = size <= limit;
  failed ||= !ok;
  console.log(
    `${ok ? 'ok  ' : 'FAIL'} ${file}: ${(size / 1024).toFixed(2)} kB gzip (budget ${(limit / 1024).toFixed(2)} kB)`,
  );
}
process.exit(failed ? 1 : 0);

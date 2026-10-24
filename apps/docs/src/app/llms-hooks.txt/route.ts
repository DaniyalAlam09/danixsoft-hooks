import { buildCorpus } from '@/lib/llms-corpus';

export const dynamic = 'force-static';

/** /llms-hooks.txt — part of /llms-full.txt, for agents that truncate long files. */
export function GET() {
  return new Response(buildCorpus('hooks'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}

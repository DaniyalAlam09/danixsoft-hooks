import type { Instrumentation } from 'next';

// Server errors (pages, route handlers, server actions, proxy) are reported
// to the DanixSoft admin: admin.danixsoft.com → danixsoft-hooks → Errors. Browser
// errors come from the analytics script. Reporting never affects the
// response: it is time-boxed and every failure is swallowed.
export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  if (process.env.NODE_ENV !== 'production') return;
  const e = err as Error & { digest?: string };
  try {
    await fetch('https://admin.danixsoft.com/api/error', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        s: 'danixsoft-hooks',
        src: 'server',
        m: String(e?.message || e || 'Unknown error').slice(0, 1000),
        st: e?.stack ? String(e.stack).slice(0, 6000) : null,
        u: request.path,
        r: context.routePath,
        k: context.routeType,
        d: e?.digest ?? null,
      }),
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // Never let error reporting cause another error.
  }
};

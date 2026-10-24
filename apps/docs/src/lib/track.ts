/**
 * Custom events for the DanixSoft admin analytics (admin.danixsoft.com/t.js).
 *
 * The tracker loads after hydration and may be blocked, so every call is a
 * silent no-op until `window.danixsoft.track` exists. Client-side only.
 *
 * Events: copy_install, copy_code { hook? }, open_sandbox { hook? }.
 */
type TrackProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    danixsoft?: { track?: (name: string, props?: TrackProps) => void };
  }
}

export function track(name: string, props?: TrackProps): void {
  try {
    window.danixsoft?.track?.(name, props);
  } catch {
    /* analytics must never break the page */
  }
}

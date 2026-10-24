---
"@danixsoft/hooks": minor
---

Environment hooks without first-paint flicker, a more capable `useFetch`, and StrictMode fixes.

- `useMediaQuery`, `useWindowSize`, `useOnlineState`, `useScreen` and `useWindowScroll` are built on `useSyncExternalStore`. Client-only renders get the real value on the first render; server rendering and hydration use the documented server value, so there is no mismatch. `useMediaQuery` takes `{ defaultValue }` for the server/hydration value.
- `useFetch`: accepts a `null` URL and `enabled: false` to skip, returns `refetch()`, takes an optional `parse(response)`, and compares options by value (inline objects no longer refetch).
- `useUpdateEffect` no longer fires on mount under React StrictMode.
- `useCountdown` calls `onEnd` exactly once (it fired up to four times under StrictMode) and no longer restarts its interval when given an inline options object.
- `useAudio` resets `playing` when `play()` is rejected (autoplay policy) instead of leaving an unhandled rejection.
- `useEvent` updates its handler in a layout effect, so effects always call the latest handler.
- `useWindowScroll` returns a stable `scrollTo`.
- `useClickAnywhere` is exported as an alias of `useClickAnyWhere` (conventional casing). The handler is kept in a ref, so an inline function no longer re-subscribes every render.

---
"@danixsoft/hooks": minor
---

Storage and cookie hooks are now SSR-correct. `useLocalStorage`, `useSessionStorage` and `useCookie` are rebuilt on `useSyncExternalStore` with a server snapshot, so they no longer cause hydration mismatches in Next.js or Remix when a value is stored.

- `useLocalStorage` / `useSessionStorage`: stable `setValue`; functional updates use the latest stored value (several updates in one tick all apply); new third tuple item `removeValue()`; optional `{ serializer, deserializer }`; cross-tab removals and `clear()` are followed; corrupt JSON falls back to `initialValue`; writes that fail (quota, private mode) are kept in memory instead of being lost.
- `useCookie`: optional `{ path, domain, sameSite, secure }`; values are URI-encoded on write and decoded on read; cookie names are matched exactly (no regex injection, no suffix matches); all hooks for the same cookie stay in sync.

**Behaviour change:** after a server render, the first (hydration) render now shows `initialValue` / `null` and the stored value is applied immediately after. Client-only renders still read the stored value on the first render.

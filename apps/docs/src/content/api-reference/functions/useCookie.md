[**@danixsoft/hooks**](../README.md)

***

> **useCookie**(`cookieName`, `options?`): readonly \[`string` \| `null`, (`newValue`, `days`) => `void`, () => `void`\]

A single browser cookie as React state, shared by every component that
uses the same cookie name.

SSR-safe: renders `null` on the server and during hydration, then the real
cookie value right after, so there is no hydration mismatch. Values are
URI-encoded on write and decoded on read.

## Parameters

### cookieName

`string`

### options?

[`CookieOptions`](../interfaces/CookieOptions.md) = `{}`

## Returns

readonly \[`string` \| `null`, (`newValue`, `days`) => `void`, () => `void`\]

`[value, updateCookie, deleteCookie]`.

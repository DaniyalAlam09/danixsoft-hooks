[**@danixsoft/hooks**](../README.md)

***

> **useMediaQuery**(`query`, `options?`): `boolean`

Subscribes to a CSS media query.

Built on useSyncExternalStore: client-only renders get the real value on the
first render (no flash), while server rendering and hydration use
`defaultValue` so there is never a hydration mismatch.

## Parameters

### query

`string`

### options?

[`UseMediaQueryOptions`](../interfaces/UseMediaQueryOptions.md) = `{}`

## Returns

`boolean`

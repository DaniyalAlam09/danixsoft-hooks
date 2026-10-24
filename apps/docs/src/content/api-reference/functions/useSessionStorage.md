[**@danixsoft/hooks**](../README.md)

***

> **useSessionStorage**\<`T`\>(`key`, `initialValue`, `options?`): readonly \[`T`, [`SetStorageValue`](../type-aliases/SetStorageValue.md)\<`T`\>, () => `void`\]

State persisted to `window.sessionStorage` (one browser tab, cleared when
the tab closes) and shared by every component using the same key.

SSR-safe: the server and the hydrating client render `initialValue`, then
the stored value is applied right after hydration.

## Type Parameters

### T

`T`

## Parameters

### key

`string`

### initialValue

`T`

### options?

[`StorageOptions`](../interfaces/StorageOptions.md)\<`T`\>

## Returns

readonly \[`T`, [`SetStorageValue`](../type-aliases/SetStorageValue.md)\<`T`\>, () => `void`\]

`[value, setValue, removeValue]`. `setValue` is stable and accepts
a value or an updater function.

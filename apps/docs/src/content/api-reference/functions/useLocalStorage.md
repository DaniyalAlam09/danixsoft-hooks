[**@danixsoft/hooks**](../README.md)

***

> **useLocalStorage**\<`T`\>(`key`, `initialValue`, `options?`): readonly \[`T`, [`SetStorageValue`](../type-aliases/SetStorageValue.md)\<`T`\>, () => `void`\]

State persisted to `window.localStorage` and kept in sync across every
component and browser tab that uses the same key.

SSR-safe: the server and the hydrating client render `initialValue`, then
the stored value is applied right after hydration, so there is no
hydration mismatch. Client-only renders read the stored value immediately.

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
a value or an updater function; `removeValue` deletes the key and falls
back to `initialValue`.

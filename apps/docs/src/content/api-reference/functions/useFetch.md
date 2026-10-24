[**@danixsoft/hooks**](../README.md)

***

> **useFetch**\<`T`\>(`url`, `options?`): [`UseFetchResult`](../interfaces/UseFetchResult.md)\<`T`\>

Fetches `url` and tracks data, error and loading state.

- Pass `null` as the URL, or `enabled: false`, to skip the request.
- In-flight requests are aborted when the URL or options change and on unmount.
- Options are compared by value (JSON), so inline objects don't refetch
  every render; pass a memoised object if it holds non-JSON values.

For caching, deduplication and background revalidation, use a data library
such as TanStack Query; this hook deliberately stays small.

## Type Parameters

### T

`T` = `unknown`

## Parameters

### url

`string` \| `null`

### options?

[`UseFetchOptions`](../interfaces/UseFetchOptions.md)\<`T`\>

## Returns

[`UseFetchResult`](../interfaces/UseFetchResult.md)\<`T`\>

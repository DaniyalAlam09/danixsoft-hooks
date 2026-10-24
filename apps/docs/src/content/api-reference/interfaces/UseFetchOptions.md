[**@danixsoft/hooks**](../README.md)

***

## Extends

- `RequestInit`

## Type Parameters

### T

`T`

## Properties

### body?

> `optional` **body?**: `BodyInit` \| `null`

A BodyInit object or null to set request's body.

#### Inherited from

`RequestInit.body`

***

### cache?

> `optional` **cache?**: `RequestCache`

A string indicating how the request will interact with the browser's cache to set request's cache.

#### Inherited from

`RequestInit.cache`

***

### credentials?

> `optional` **credentials?**: `RequestCredentials`

A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.

#### Inherited from

`RequestInit.credentials`

***

### enabled?

> `optional` **enabled?**: `boolean`

Set to false to skip the request (for example until an id is known). Defaults to true.

***

### headers?

> `optional` **headers?**: `HeadersInit`

A Headers object, an object literal, or an array of two-item arrays to set request's headers.

#### Inherited from

`RequestInit.headers`

***

### integrity?

> `optional` **integrity?**: `string`

A cryptographic hash of the resource to be fetched by request. Sets request's integrity.

#### Inherited from

`RequestInit.integrity`

***

### keepalive?

> `optional` **keepalive?**: `boolean`

A boolean to set request's keepalive.

#### Inherited from

`RequestInit.keepalive`

***

### method?

> `optional` **method?**: `string`

A string to set request's method.

#### Inherited from

`RequestInit.method`

***

### mode?

> `optional` **mode?**: `RequestMode`

A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.

#### Inherited from

`RequestInit.mode`

***

### parse?

> `optional` **parse?**: (`response`) => `Promise`\<`T`\>

Reads the response body. Defaults to `response.json()`.

#### Parameters

##### response

`Response`

#### Returns

`Promise`\<`T`\>

***

### priority?

> `optional` **priority?**: `RequestPriority`

#### Inherited from

`RequestInit.priority`

***

### redirect?

> `optional` **redirect?**: `RequestRedirect`

A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.

#### Inherited from

`RequestInit.redirect`

***

### referrer?

> `optional` **referrer?**: `string`

A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.

#### Inherited from

`RequestInit.referrer`

***

### referrerPolicy?

> `optional` **referrerPolicy?**: `ReferrerPolicy`

A referrer policy to set request's referrerPolicy.

#### Inherited from

`RequestInit.referrerPolicy`

***

### signal?

> `optional` **signal?**: `AbortSignal` \| `null`

An AbortSignal to set request's signal.

#### Inherited from

`RequestInit.signal`

***

### window?

> `optional` **window?**: `null`

Can only be null. Used to disassociate request from any Window.

#### Inherited from

`RequestInit.window`

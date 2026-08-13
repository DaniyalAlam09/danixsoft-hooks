[**@danixsoft/hooks**](../README.md)

***

## Call Signature

> **useEventListener**\<`K`\>(`eventName`, `handler`, `element?`, `options?`): `void`

### Type Parameters

#### K

`K` *extends* keyof `WindowEventMap`

### Parameters

#### eventName

`K`

#### handler

(`event`) => `void`

#### element?

`undefined`

#### options?

`boolean` \| `AddEventListenerOptions`

### Returns

`void`

## Call Signature

> **useEventListener**\<`K`, `T`\>(`eventName`, `handler`, `element`, `options?`): `void`

### Type Parameters

#### K

`K` *extends* keyof `HTMLElementEventMap`

#### T

`T` *extends* `HTMLElement` = `HTMLDivElement`

### Parameters

#### eventName

`K`

#### handler

(`event`) => `void`

#### element

`RefObject`\<`T`\>

#### options?

`boolean` \| `AddEventListenerOptions`

### Returns

`void`

## Call Signature

> **useEventListener**\<`K`\>(`eventName`, `handler`, `element`, `options?`): `void`

### Type Parameters

#### K

`K` *extends* keyof `DocumentEventMap`

### Parameters

#### eventName

`K`

#### handler

(`event`) => `void`

#### element

`Document`

#### options?

`boolean` \| `AddEventListenerOptions`

### Returns

`void`

[**@danixsoft/hooks**](../README.md)

***

## Type Parameters

### T

`T`

## Properties

### deserializer?

> `optional` **deserializer?**: (`raw`) => `T`

Turns the stored string back into a value. Defaults to JSON.parse.

#### Parameters

##### raw

`string`

#### Returns

`T`

***

### serializer?

> `optional` **serializer?**: (`value`) => `string`

Turns a value into the string written to storage. Defaults to JSON.stringify.

#### Parameters

##### value

`T`

#### Returns

`string`

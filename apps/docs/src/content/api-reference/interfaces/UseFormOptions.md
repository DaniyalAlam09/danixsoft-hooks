[**@danixsoft/hooks**](../README.md)

***

## Type Parameters

### TValues

`TValues`

## Properties

### initialValues

> **initialValues**: `TValues`

***

### onSubmit?

> `optional` **onSubmit?**: (`values`) => `void` \| `Promise`\<`void`\>

#### Parameters

##### values

`TValues`

#### Returns

`void` \| `Promise`\<`void`\>

***

### validate?

> `optional` **validate?**: (`values`) => `Partial`\<`Record`\<keyof `TValues`, `string`\>\>

#### Parameters

##### values

`TValues`

#### Returns

`Partial`\<`Record`\<keyof `TValues`, `string`\>\>

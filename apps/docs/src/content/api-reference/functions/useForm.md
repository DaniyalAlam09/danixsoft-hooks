[**@danixsoft/hooks**](../README.md)

***

> **useForm**\<`TValues`\>(`__namedParameters`): `object`

## Type Parameters

### TValues

`TValues` *extends* `Record`\<`string`, `any`\>

## Parameters

### \_\_namedParameters

[`UseFormOptions`](../interfaces/UseFormOptions.md)\<`TValues`\>

## Returns

`object`

### errors

> **errors**: `Partial`\<`Record`\<keyof `TValues`, `string`\>\>

### handleBlur

> **handleBlur**: (`e`) => `void`

#### Parameters

##### e

`FocusEvent`\<`HTMLInputElement` \| `HTMLTextAreaElement` \| `HTMLSelectElement`\>

#### Returns

`void`

### handleChange

> **handleChange**: (`e`) => `void`

#### Parameters

##### e

`ChangeEvent`\<`HTMLInputElement` \| `HTMLTextAreaElement` \| `HTMLSelectElement`\>

#### Returns

`void`

### handleSubmit

> **handleSubmit**: (`e`) => `Promise`\<`void`\>

#### Parameters

##### e

`FormEvent`\<`HTMLFormElement`\>

#### Returns

`Promise`\<`void`\>

### isSubmitting

> **isSubmitting**: `boolean`

### resetForm

> **resetForm**: () => `void`

#### Returns

`void`

### setErrors

> **setErrors**: `Dispatch`\<`SetStateAction`\<`Partial`\<`Record`\<keyof `TValues`, `string`\>\>\>\>

### setValues

> **setValues**: `Dispatch`\<`SetStateAction`\<`TValues`\>\>

### touched

> **touched**: `Partial`\<`Record`\<keyof `TValues`, `boolean`\>\>

### values

> **values**: `TValues`

[**@danixsoft/hooks**](../README.md)

***

> **usePagination**\<`T`\>(`data`, `itemsPerPage`): `object`

## Type Parameters

### T

`T`

## Parameters

### data

`T`[]

### itemsPerPage

`number`

## Returns

`object`

### currentData

> **currentData**: `T`[]

### currentPage

> **currentPage**: `number`

### itemsPerPage

> **itemsPerPage**: `number`

### jump

> **jump**: (`page`) => `void`

#### Parameters

##### page

`number`

#### Returns

`void`

### next

> **next**: () => `void`

#### Returns

`void`

### prev

> **prev**: () => `void`

#### Returns

`void`

### totalPages

> **totalPages**: `number`

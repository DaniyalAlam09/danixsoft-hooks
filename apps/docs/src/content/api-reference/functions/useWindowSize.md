[**@danixsoft/hooks**](../README.md)

***

> **useWindowSize**(): [`WindowSize`](../interfaces/WindowSize.md)

The browser window's inner width and height, updated on resize.

Returns `{ width: undefined, height: undefined }` on the server and during
hydration (so there is no mismatch); client-only renders get the real size
on the first render.

## Returns

[`WindowSize`](../interfaces/WindowSize.md)

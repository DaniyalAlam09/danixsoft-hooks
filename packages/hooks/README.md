<div align="center">
  <h1>@danixsoft/hooks</h1>
  <p><strong>The ultimate collection of 42+ beautiful, robust, and zero-dependency React hooks.</strong></p>
  
  [![NPM Version](https://img.shields.io/npm/v/@danixsoft/hooks.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/@danixsoft/hooks)
  [![NPM Downloads](https://img.shields.io/npm/dt/@danixsoft/hooks.svg?style=flat-square)](https://www.npmjs.com/package/@danixsoft/hooks)
  [![Bundle Size](https://img.shields.io/bundlephobia/minzip/@danixsoft/hooks?style=flat-square&label=minzipped%20size)](https://bundlephobia.com/package/@danixsoft/hooks)
  [![Build Status](https://img.shields.io/github/actions/workflow/status/DaniyalAlam09/danixsoft-hooks/ci.yml?style=flat-square)](https://github.com/DaniyalAlam09/danixsoft-hooks/actions)
  [![codecov](https://codecov.io/gh/DaniyalAlam09/danixsoft-hooks/graph/badge.svg)](https://codecov.io/gh/DaniyalAlam09/danixsoft-hooks)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
</div>

<br />

📖 **[Read the Official Documentation & Interactive Demos](https://react-hooks.danixsoft.com/)**

Stop copying and pasting the same utility functions across projects. Get instant access to a battle-tested library of essential, high-performance React hooks designed for modern web applications. Fully compatible with Next.js, Remix, Vite, and standard React setups.

## 🌟 Key Features

* **🌳 Tree-shakeable:** Import only what you need. Your final bundle size remains microscopic.
* **🛡️ TypeScript First:** Written entirely in TypeScript. Enjoy full autocomplete and type safety.
* **🪶 Zero Dependencies:** We don't rely on any third-party libraries. Built entirely on React primitives.
* **🚀 SSR Compatible:** Works flawlessly with Next.js and Remix Server-Side Rendering (no `window is not defined` errors).
* **⚡ Highly Optimized:** Uses `useRef` callbacks to prevent stale closures and unnecessary re-renders.

## ⚖️ Why @danixsoft/hooks?

| Feature | `@danixsoft/hooks` | `usehooks-ts` | `react-use` |
|---------|--------------------|---------------|-------------|
| **Bundle Size (total)** | **~3.5 kB** | ~8.0 kB | ~31 kB |
| **Dependencies** | **0** | 0 | 11 |
| **SSR / Next.js Ready** | ✅ **Native** (no hydration mismatch) | ⚠️ Requires configuration | ⚠️ Prone to window errors |
| **Tree-shakeable** | ✅ **100%** granular exports | ✅ Yes | ⚠️ Varies |
| **TypeScript Type-safety**| ✅ **Strictly Typed** | ✅ Yes | ⚠️ Legacy Types |

## 📦 Installation

Install the library in your project via your favorite package manager:

**npm**
```bash
npm install @danixsoft/hooks
```

**yarn**
```bash
yarn add @danixsoft/hooks
```

**pnpm**
```bash
pnpm add @danixsoft/hooks
```

> **Note for Next.js App Router Users:**
> All hooks in this library interact with React state or browser APIs. When using them in the App Router, ensure you add the `"use client"` directive at the top of your file.

## 🛠️ Quick Usage

Every hook is exported from the main package. Simply import them by name.

```tsx
import { useToggle, useLocalStorage, useWindowSize } from '@danixsoft/hooks';

function App() {
  const [isOpen, toggle] = useToggle(false);
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const { width } = useWindowSize();

  return (
    <div>
      <p>Window width: {width}px</p>
      <button onClick={toggle}>
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  );
}
```

## 📚 42+ Available Hooks

We have carefully categorized our hooks for maximum developer experience.

### State & Storage
* `useBoolean` - Robust boolean state manager with absolute setters.
* `useCounter` - Number counter with bounds and step increments.
* `useMap` - React-friendly wrapper for native Map.
* `useLocalStorage` - Persist state to `window.localStorage`.
* `useSessionStorage` - Persist state to `window.sessionStorage`.
* `useCookie` - Read and update browser cookies.
* `useDebounce` - Delay the execution of state updates.
* `useToggle` - A simple boolean state toggler.
* `usePrevious` - Store the previous state or prop value.
* `useStep` - Manage wizard/multi-step flows easily.

### Forms & Data
* `useForm` - Lightweight form state and validation manager.
* `usePagination` - Client-side array pagination logic.
* `useInfiniteScroll` - Easily implement infinite scrolling.
* `useFetch` - Fetch API data with loading and error states.

### DOM & Browser
* `useClickOutside` - Detect clicks outside of a referenced component.
* `useClickAnyWhere` - Listen for clicks anywhere on the document.
* `useMediaQuery` - Subscribe to CSS media queries in React.
* `useOnScreen` - Detect if an element is visible in the viewport.
* `useIntersectionObserver` - Track elements entering or leaving the viewport.
* `useWindowSize` - Track the dimensions of the browser window.
* `useWindowScroll` - Track and manipulate window scroll position.
* `useDocumentTitle` - Dynamically update the document title.
* `useEventListener` - Safely bind event listeners to DOM elements.
* `useHover` - Detect if a specific element is being hovered.
* `useScreen` - Access the native Window.screen object.
* `useMutationObserver` - Observe changes to the DOM tree.
* `useScript` - Dynamically load and inject external scripts.

### Timers & Lifecycle
* `useInterval` - Declarative setInterval for React.
* `useTimeout` - Declarative setTimeout for React.
* `useCountdown` - Manage countdown timers.
* `useIsMounted` - Determine if a component is currently mounted.
* `useIsClient` - Safely determine if code is running on the client.
* `useUnmount` - Run code only when a component unmounts.
* `useUpdateEffect` - Like useEffect, but ignores the first render.
* `useEvent` - Create a stable, memoized callback function.
* `useIsomorphicLayoutEffect` - `useLayoutEffect` that does not throw warnings in SSR.

### Advanced Sensors
* `useCopyToClipboard` - Copy text to the clipboard safely.
* `useOnlineState` - Track network status of the user.
* `useGeolocation` - Track device location via Geolocation API.
* `useAudio` - Easily play and control audio files.
* `useMouse` - Track mouse coordinates.
* `useTouch` - Track multi-touch events on screens.
* `useSwipe` - Detect directional swipe gestures.
* `useScrollLock` - Lock scrolling on the document body.

## 🤝 Contributing

We welcome contributions! Please check our GitHub issues and submit a pull request.

## 📄 License
MIT © DanixSoft

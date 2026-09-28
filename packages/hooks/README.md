<div align="center">
  <h1>@danixsoft/hooks</h1>
  <p><strong>44 production-ready, zero-dependency, SSR-safe React hooks for TypeScript.</strong></p>
  
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

Built and maintained by [DanixSoft](https://www.danixsoft.com).

Stop copying and pasting the same utility functions across projects. Get instant access to a battle-tested library of essential, high-performance React hooks designed for modern web applications. Fully compatible with Next.js, Remix, Vite, and standard React setups.

## 🌟 Key Features

* **44 hooks** for state, storage, forms, DOM, timers, lifecycle and device sensors.

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

## 📚 All 44 Hooks

Every hook links to its documentation page: install command, copy-paste example, API table and SSR notes.

### State & Storage
* [`useBoolean`](https://react-hooks.danixsoft.com/use-boolean) - Robust boolean state manager with absolute setters.
* [`useCounter`](https://react-hooks.danixsoft.com/use-counter) - Number counter with bounds and step increments.
* [`useMap`](https://react-hooks.danixsoft.com/use-map) - React-friendly wrapper for native Map.
* [`useLocalStorage`](https://react-hooks.danixsoft.com/use-local-storage) - Persist state to `window.localStorage`.
* [`useSessionStorage`](https://react-hooks.danixsoft.com/use-session-storage) - Persist state to `window.sessionStorage`.
* [`useCookie`](https://react-hooks.danixsoft.com/use-cookie) - Read and update browser cookies.
* [`useDebounce`](https://react-hooks.danixsoft.com/use-debounce) - Delay the execution of state updates.
* [`useToggle`](https://react-hooks.danixsoft.com/use-toggle) - A simple boolean state toggler.
* [`usePrevious`](https://react-hooks.danixsoft.com/use-previous) - Store the previous state or prop value.
* [`useStep`](https://react-hooks.danixsoft.com/use-step) - Manage wizard/multi-step flows easily.

### Forms & Data
* [`useForm`](https://react-hooks.danixsoft.com/use-form) - Lightweight form state and validation manager.
* [`usePagination`](https://react-hooks.danixsoft.com/use-pagination) - Client-side array pagination logic.
* [`useInfiniteScroll`](https://react-hooks.danixsoft.com/use-infinite-scroll) - Easily implement infinite scrolling.
* [`useFetch`](https://react-hooks.danixsoft.com/use-fetch) - Fetch API data with loading and error states.

### DOM & Browser
* [`useClickOutside`](https://react-hooks.danixsoft.com/use-click-outside) - Detect clicks outside of a referenced component.
* [`useClickAnyWhere`](https://react-hooks.danixsoft.com/use-click-any-where) - Listen for clicks anywhere on the document.
* [`useMediaQuery`](https://react-hooks.danixsoft.com/use-media-query) - Subscribe to CSS media queries in React.
* [`useOnScreen`](https://react-hooks.danixsoft.com/use-on-screen) - Detect if an element is visible in the viewport.
* [`useIntersectionObserver`](https://react-hooks.danixsoft.com/use-intersection-observer) - Track elements entering or leaving the viewport.
* [`useWindowSize`](https://react-hooks.danixsoft.com/use-window-size) - Track the dimensions of the browser window.
* [`useWindowScroll`](https://react-hooks.danixsoft.com/use-window-scroll) - Track and manipulate window scroll position.
* [`useDocumentTitle`](https://react-hooks.danixsoft.com/use-document-title) - Dynamically update the document title.
* [`useEventListener`](https://react-hooks.danixsoft.com/use-event-listener) - Safely bind event listeners to DOM elements.
* [`useHover`](https://react-hooks.danixsoft.com/use-hover) - Detect if a specific element is being hovered.
* [`useScreen`](https://react-hooks.danixsoft.com/use-screen) - Access the native Window.screen object.
* [`useMutationObserver`](https://react-hooks.danixsoft.com/use-mutation-observer) - Observe changes to the DOM tree.
* [`useScript`](https://react-hooks.danixsoft.com/use-script) - Dynamically load and inject external scripts.

### Timers & Lifecycle
* [`useInterval`](https://react-hooks.danixsoft.com/use-interval) - Declarative setInterval for React.
* [`useTimeout`](https://react-hooks.danixsoft.com/use-timeout) - Declarative setTimeout for React.
* [`useCountdown`](https://react-hooks.danixsoft.com/use-countdown) - Manage countdown timers.
* [`useIsMounted`](https://react-hooks.danixsoft.com/use-is-mounted) - Determine if a component is currently mounted.
* [`useIsClient`](https://react-hooks.danixsoft.com/use-is-client) - Safely determine if code is running on the client.
* [`useUnmount`](https://react-hooks.danixsoft.com/use-unmount) - Run code only when a component unmounts.
* [`useUpdateEffect`](https://react-hooks.danixsoft.com/use-update-effect) - Like useEffect, but ignores the first render.
* [`useEvent`](https://react-hooks.danixsoft.com/use-event) - Create a stable, memoized callback function.
* [`useIsomorphicLayoutEffect`](https://react-hooks.danixsoft.com/use-isomorphic-layout-effect) - `useLayoutEffect` that does not throw warnings in SSR.

### Advanced Sensors
* [`useCopyToClipboard`](https://react-hooks.danixsoft.com/use-copy-to-clipboard) - Copy text to the clipboard safely.
* [`useOnlineState`](https://react-hooks.danixsoft.com/use-online-state) - Track network status of the user.
* [`useGeolocation`](https://react-hooks.danixsoft.com/use-geolocation) - Track device location via Geolocation API.
* [`useAudio`](https://react-hooks.danixsoft.com/use-audio) - Easily play and control audio files.
* [`useMouse`](https://react-hooks.danixsoft.com/use-mouse) - Track mouse coordinates.
* [`useTouch`](https://react-hooks.danixsoft.com/use-touch) - Track multi-touch events on screens.
* [`useSwipe`](https://react-hooks.danixsoft.com/use-swipe) - Detect directional swipe gestures.
* [`useScrollLock`](https://react-hooks.danixsoft.com/use-scroll-lock) - Lock scrolling on the document body.

## 🔗 Documentation

* [Getting started](https://react-hooks.danixsoft.com/docs) — installation, TypeScript, SSR and tree shaking.
* [All hooks](https://react-hooks.danixsoft.com/hooks) — searchable directory.
* [Guides](https://react-hooks.danixsoft.com/guides) and [comparisons](https://react-hooks.danixsoft.com/compare) with other hook libraries.
* [API reference](https://react-hooks.danixsoft.com/api-reference) — types generated from source.
* [llms.txt](https://react-hooks.danixsoft.com/llms.txt) / [llms-full.txt](https://react-hooks.danixsoft.com/llms-full.txt) — machine-readable docs for AI assistants.

## 🤝 Contributing

We welcome contributions! Please check our GitHub issues and submit a pull request.

## 📄 License
MIT © [DanixSoft](https://www.danixsoft.com)

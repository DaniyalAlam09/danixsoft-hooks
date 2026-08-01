# @danixsoft/hooks 🚀

[![NPM Version](https://img.shields.io/npm/v/@danixsoft/hooks.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/@danixsoft/hooks)
[![NPM Downloads](https://img.shields.io/npm/dt/@danixsoft/hooks.svg?style=flat-square)](https://www.npmjs.com/package/@danixsoft/hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

**A collection of beautiful, robust, and dependency-free React hooks.**

Stop copying and pasting the same utility functions across projects. Get instant access to a battle-tested library of essential hooks.

## 🌟 Key Features
* **🌳 Tree-shakeable:** Import only what you need. Your final bundle size remains microscopic.
* **🛡️ TypeScript First:** Written entirely in TypeScript. Enjoy full autocomplete and type safety.
* **🪶 Zero Dependencies:** We don't rely on any third-party libraries. Built entirely on React primitives.
* **🚀 SSR Compatible:** Works flawlessly with Next.js and Remix Server-Side Rendering.

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

## 🛠️ Quick Usage

Every hook is exported from the main package. Simply import them by name.

```tsx
import { useToggle, useLocalStorage } from '@danixsoft/hooks';

function App() {
  const [isOpen, toggle] = useToggle(false);
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  return (
    <div>
      <button onClick={toggle}>
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  );
}
```

## 📚 Available Hooks

* `useLocalStorage` - Persist state to `window.localStorage`.
* `useDebounce` - Delay the execution of state updates.
* `useToggle` - A simple boolean state toggler.
* `usePrevious` - Store the previous state or prop value.
* `useForm` - Lightweight form state and validation manager.
* `usePagination` - Client-side array pagination logic.
* `useInfiniteScroll` - Easily implement infinite scrolling with an intersection observer.
* `useFetch` - A simple hook for fetching API data with loading and error states.
* `useClickOutside` - Detect clicks outside of a referenced component.
* `useMediaQuery` - Subscribe to CSS media queries in React.
* `useOnScreen` - Detect if an element is visible in the viewport.
* `useWindowSize` - Track the dimensions of the browser window.

## 📄 License
MIT © Daniyal Alam

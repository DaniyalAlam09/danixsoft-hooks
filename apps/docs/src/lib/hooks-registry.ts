/**
 * Central registry of every documented hook.
 *
 * This is the single source of truth for the sidebar, the command palette,
 * the /hooks directory, the sitemap and every page's metadata + JSON-LD.
 * Adding a hook here wires it into all of them at once.
 */

export type HookCategoryId =
  | 'state'
  | 'forms-data'
  | 'dom'
  | 'lifecycle'
  | 'sensors';

export interface HookCategory {
  id: HookCategoryId;
  title: string;
  slug: string;
  blurb: string;
  icon: string;
}

export interface HookEntry {
  /** Route slug, e.g. `use-local-storage` -> /use-local-storage */
  slug: string;
  /** Camel-cased hook name, e.g. `useLocalStorage` */
  name: string;
  category: HookCategoryId;
  /** Short one-liner used in cards, sidebar tooltips and meta descriptions. */
  summary: string;
  /** What the hook is for, completing "React hook for …" in the page title. */
  purpose: string;
  /** Longer, keyword-rich paragraph used for the page description + GEO answers. */
  description: string;
  /** TypeScript signature shown in the directory and used in llms.txt. */
  signature: string;
  /** Extra search/SEO keywords beyond the hook name. */
  keywords: string[];
  /** Slugs of related hooks, used for internal linking. */
  related: string[];
  /** True when the hook touches browser-only APIs and needs SSR guards. */
  ssrSafe: boolean;
  /** Hook-specific server-rendering caveat, shown in the page's SSR notes. */
  ssrNote?: string;
}

export const hookCategories: HookCategory[] = [
  {
    id: 'state',
    title: 'State & Storage',
    slug: 'state-and-storage',
    blurb:
      'Hooks that hold, derive and persist state — booleans, counters, maps, and storage that survives a reload.',
    icon: 'database',
  },
  {
    id: 'forms-data',
    title: 'Forms & Data',
    slug: 'forms-and-data',
    blurb:
      'Form state with validation, paginated lists, infinite scrolling and declarative data fetching.',
    icon: 'form',
  },
  {
    id: 'dom',
    title: 'DOM & Browser',
    slug: 'dom-and-browser',
    blurb:
      'Read and react to the document: clicks, media queries, visibility, size, scroll and mutations.',
    icon: 'browser',
  },
  {
    id: 'lifecycle',
    title: 'Timers & Lifecycle',
    slug: 'timers-and-lifecycle',
    blurb:
      'Safe intervals, timeouts and countdowns, plus lifecycle helpers that avoid stale-closure bugs.',
    icon: 'clock',
  },
  {
    id: 'sensors',
    title: 'Sensors & Device',
    slug: 'sensors-and-device',
    blurb:
      'Device and input signals — clipboard, network status, geolocation, audio, pointer, touch and swipe.',
    icon: 'sensor',
  },
];

export const hooks: HookEntry[] = [
  // ---------------------------------------------------------------- state
  {
    slug: 'use-boolean',
    name: 'useBoolean',
    category: 'state',
    purpose: 'boolean state',
    summary: 'Boolean state with setTrue, setFalse and toggle helpers.',
    description:
      'useBoolean is a React hook for managing boolean state with named actions instead of raw setState calls. It returns the current value plus stable setTrue, setFalse, toggle and setValue callbacks, so modals, dropdowns and disclosure widgets read clearly at the call site.',
    signature: 'useBoolean(defaultValue?: boolean): UseBooleanReturn',
    keywords: ['boolean state', 'toggle state', 'modal open state', 'setTrue setFalse'],
    related: ['use-toggle', 'use-counter', 'use-step'],
    ssrSafe: true,
  },
  {
    slug: 'use-counter',
    name: 'useCounter',
    category: 'state',
    purpose: 'bounded counters',
    summary: 'Numeric counter with min, max and step bounds.',
    description:
      'useCounter is a React hook for numeric state with built-in bounds. Pass min, max and step options and it clamps every increment, decrement and set, so quantity pickers, ratings and stepper inputs never leave their valid range.',
    signature:
      'useCounter(initialValue?: number, options?: UseCounterOptions): UseCounterReturn',
    keywords: ['counter hook', 'increment decrement', 'clamped number', 'quantity picker'],
    related: ['use-boolean', 'use-step', 'use-previous'],
    ssrSafe: true,
  },
  {
    slug: 'use-map',
    name: 'useMap',
    category: 'state',
    purpose: 'reactive Map state',
    summary: 'Reactive Map with set, delete, reset and clear actions.',
    description:
      'useMap gives you a JavaScript Map backed by React state. Reads go through a read-only Map interface while set, setAll, remove, reset and clear trigger re-renders, which makes it ideal for keyed selections, per-row form state and caches.',
    signature:
      "useMap<K, V>(initialState?: Iterable<readonly [K, V]>): [Omit<Map<K, V>, 'set' | 'clear' | 'delete'>, MapActions<K, V>]",
    keywords: ['react map state', 'keyed state', 'selection state', 'Map hook'],
    related: ['use-local-storage', 'use-boolean', 'use-form'],
    ssrSafe: true,
  },
  {
    slug: 'use-local-storage',
    name: 'useLocalStorage',
    category: 'state',
    purpose: 'persistent localStorage state',
    summary: 'State synced to localStorage, across tabs and components.',
    description:
      'useLocalStorage persists React state to window.localStorage and keeps every component and browser tab in sync through storage events. It serialises with JSON, guards against SSR by falling back to the initial value on the server, and never throws when storage is unavailable or full.',
    signature:
      'useLocalStorage<T>(key: string, initialValue: T): readonly [T, (value: T | ((val: T) => T)) => void]',
    keywords: [
      'localStorage react hook',
      'persist state react',
      'react localStorage ssr',
      'sync state across tabs',
    ],
    related: ['use-session-storage', 'use-cookie', 'use-is-client'],
    ssrSafe: true,
    ssrNote:
      'The initial state is read from localStorage on the first client render, while the server renders initialValue. If the stored value changes the markup, render that part after hydration (for example behind useIsClient) to avoid a hydration mismatch.',
  },
  {
    slug: 'use-session-storage',
    name: 'useSessionStorage',
    category: 'state',
    purpose: 'sessionStorage state',
    summary: 'State scoped to a single browser tab session.',
    description:
      'useSessionStorage mirrors useLocalStorage but writes to sessionStorage, so values live only for the current tab and are cleared when it closes. Use it for multi-step form drafts, one-off dismissals and anything that should not outlive the session.',
    signature:
      'useSessionStorage<T>(key: string, initialValue: T): readonly [T, (value: T | ((val: T) => T)) => void]',
    keywords: ['sessionStorage hook', 'tab scoped state', 'form draft state'],
    related: ['use-local-storage', 'use-cookie', 'use-form'],
    ssrSafe: true,
    ssrNote:
      'The initial state is read from sessionStorage on the first client render, while the server renders initialValue. If the stored value changes the markup, render that part after hydration (for example behind useIsClient) to avoid a hydration mismatch.',
  },
  {
    slug: 'use-cookie',
    name: 'useCookie',
    category: 'state',
    purpose: 'reading and writing cookies',
    summary: 'Read, write and delete a browser cookie as state.',
    description:
      'useCookie exposes a single document cookie as React state. It returns the current value plus setter and delete callbacks, accepts an expiry in days, and encodes values safely — handy for consent banners, locale preferences and anything the server also needs to read.',
    signature:
      'useCookie(cookieName: string): readonly [string | null, (newValue: string, days?: number) => void, () => void]',
    keywords: ['react cookie hook', 'document.cookie', 'consent banner', 'locale cookie'],
    related: ['use-local-storage', 'use-session-storage', 'use-is-client'],
    ssrSafe: true,
    ssrNote:
      'Returns null on the server because document.cookie is unavailable there; the first client render reads the real cookie. Gate cookie-dependent markup behind useIsClient, or read the cookie on the server, to avoid a hydration mismatch.',
  },
  {
    slug: 'use-debounce',
    name: 'useDebounce',
    category: 'state',
    purpose: 'debouncing values',
    summary: 'Delay a fast-changing value until it settles.',
    description:
      'useDebounce returns a copy of a value that only updates after it has stopped changing for the given delay. Wrap a search input, a resize measurement or an autosave payload with it to cut network requests and expensive renders dramatically.',
    signature: 'useDebounce<T>(value: T, delay: number): T',
    keywords: [
      'debounce react hook',
      'search input debounce',
      'throttle vs debounce',
      'reduce api calls',
    ],
    related: ['use-timeout', 'use-fetch', 'use-window-size'],
    ssrSafe: true,
  },
  {
    slug: 'use-toggle',
    name: 'useToggle',
    category: 'state',
    purpose: 'toggling booleans',
    summary: 'One-call boolean flip with explicit on and off.',
    description:
      'useToggle returns a boolean and a stable toggle function, plus explicit on and off setters. It is the smallest possible answer to "open/closed" state and keeps event handlers free of inline arrow functions that break memoisation.',
    signature:
      'useToggle(initialValue?: boolean): readonly [boolean, () => void, () => void, () => void]',
    keywords: ['toggle hook react', 'show hide state', 'accordion state'],
    related: ['use-boolean', 'use-scroll-lock', 'use-click-outside'],
    ssrSafe: true,
  },
  {
    slug: 'use-previous',
    name: 'usePrevious',
    category: 'state',
    purpose: 'tracking the previous value',
    summary: 'Remember the value a prop or state had last render.',
    description:
      'usePrevious stores the value from the previous render in a ref and returns it. Compare it against the current value to run transition-only effects, animate direction of change, or log exactly what a prop changed from and to.',
    signature: 'usePrevious<T>(value: T): T | undefined',
    keywords: ['previous value hook', 'compare prev props', 'usePrevious react'],
    related: ['use-update-effect', 'use-counter', 'use-event'],
    ssrSafe: true,
  },
  {
    slug: 'use-step',
    name: 'useStep',
    category: 'state',
    purpose: 'multi-step wizards',
    summary: 'Wizard step state with next, previous and canGo flags.',
    description:
      'useStep manages a bounded step index for wizards, onboarding flows and carousels. Alongside the current step it returns goToNextStep, goToPrevStep, reset, setStep and canGoToNextStep / canGoToPrevStep booleans for disabling controls.',
    signature: 'useStep(maxStep: number): [number, { goToNextStep; goToPrevStep; reset; setStep; canGoToNextStep: boolean; canGoToPrevStep: boolean }]',
    keywords: ['wizard hook', 'multi step form', 'onboarding steps', 'stepper react'],
    related: ['use-counter', 'use-form', 'use-pagination'],
    ssrSafe: true,
  },

  // ----------------------------------------------------------- forms & data
  {
    slug: 'use-form',
    name: 'useForm',
    category: 'forms-data',
    purpose: 'form state and validation',
    summary: 'Controlled form state with validation and submit handling.',
    description:
      'useForm is a dependency-free form hook: it tracks values, errors, touched fields and isSubmitting, runs your validate function on change and submit, and hands you handleChange, handleBlur and handleSubmit to wire onto inputs, plus resetForm, setValues and setErrors. No schema library required.',
    signature:
      'useForm<TValues>(options: UseFormOptions<TValues>): { values: TValues; errors: Partial<Record<keyof TValues, string>>; touched: Partial<Record<keyof TValues, boolean>>; isSubmitting: boolean; handleChange; handleBlur; handleSubmit; resetForm; setValues; setErrors }',
    keywords: [
      'react form hook',
      'form validation without library',
      'controlled form state',
      'react hook form alternative',
    ],
    related: ['use-debounce', 'use-step', 'use-session-storage'],
    ssrSafe: true,
  },
  {
    slug: 'use-pagination',
    name: 'usePagination',
    category: 'forms-data',
    purpose: 'client-side pagination',
    summary: 'Slice an array into pages with navigation helpers.',
    description:
      'usePagination takes an array and a page size and returns currentData — the slice for the active page — plus currentPage, totalPages and next, prev and jump helpers. It is pure client-side pagination for data you already have in memory: tables, galleries and search results.',
    signature: 'usePagination<T>(data: T[], itemsPerPage: number): { currentData: T[]; currentPage: number; totalPages: number; itemsPerPage: number; next: () => void; prev: () => void; jump: (page: number) => void }',
    keywords: ['pagination hook', 'paginate array react', 'table pagination', 'page size'],
    related: ['use-infinite-scroll', 'use-step', 'use-fetch'],
    ssrSafe: true,
  },
  {
    slug: 'use-infinite-scroll',
    name: 'useInfiniteScroll',
    category: 'forms-data',
    purpose: 'infinite scrolling',
    summary: 'Fire a callback when a sentinel element scrolls into view.',
    description:
      'useInfiniteScroll returns a ref you attach to a sentinel element at the end of your list. When that element enters the viewport the hook calls your loader, giving you IntersectionObserver-based infinite scrolling without scroll listeners or layout thrash.',
    signature:
      'useInfiniteScroll<T extends HTMLElement>(callback: () => void, options?: IntersectionObserverInit): RefObject<T>',
    keywords: [
      'infinite scroll react hook',
      'load more on scroll',
      'IntersectionObserver list',
      'endless scrolling',
    ],
    related: ['use-intersection-observer', 'use-on-screen', 'use-pagination'],
    ssrSafe: true,
  },
  {
    slug: 'use-fetch',
    name: 'useFetch',
    category: 'forms-data',
    purpose: 'data fetching',
    summary: 'Declarative fetch with data, error and loading state.',
    description:
      'useFetch wraps the Fetch API in a hook that returns data, error and loading. It aborts in-flight requests when the URL changes or the component unmounts, so you never set state on an unmounted component or render a stale response.',
    signature: 'useFetch<T = unknown>(url: string, options?: RequestInit): FetchState<T>',
    keywords: [
      'react fetch hook',
      'data fetching hook',
      'abort controller react',
      'loading error state',
    ],
    related: ['use-debounce', 'use-pagination', 'use-is-mounted'],
    ssrSafe: true,
  },

  // ------------------------------------------------------------ dom/browser
  {
    slug: 'use-click-outside',
    name: 'useClickOutside',
    category: 'dom',
    purpose: 'detecting outside clicks',
    summary: 'Run a handler when a click lands outside an element.',
    description:
      'useClickOutside watches for mouse and touch events outside a ref and calls your handler. It is the standard way to dismiss dropdowns, popovers and modals, and it listens on both mousedown and touchstart so mobile behaves like desktop.',
    signature:
      'useClickOutside<T extends HTMLElement>(ref: RefObject<T>, handler: (event: MouseEvent | TouchEvent) => void): void',
    keywords: [
      'click outside hook',
      'close dropdown on outside click',
      'dismiss modal react',
      'outside click detection',
    ],
    related: ['use-click-any-where', 'use-event-listener', 'use-toggle'],
    ssrSafe: true,
  },
  {
    slug: 'use-click-any-where',
    name: 'useClickAnyWhere',
    category: 'dom',
    purpose: 'document-wide clicks',
    summary: 'Handle every click on the document.',
    description:
      'useClickAnyWhere attaches a document-level click handler that is cleaned up automatically. Use it for analytics, dismissing global overlays, or closing a command palette regardless of where the user clicked.',
    signature: 'useClickAnyWhere(handler: (event: MouseEvent) => void): void',
    keywords: ['document click hook', 'global click listener', 'click anywhere react'],
    related: ['use-click-outside', 'use-event-listener', 'use-mouse'],
    ssrSafe: true,
  },
  {
    slug: 'use-media-query',
    name: 'useMediaQuery',
    category: 'dom',
    purpose: 'CSS media queries',
    summary: 'Subscribe to a CSS media query from JavaScript.',
    description:
      'useMediaQuery evaluates a CSS media query with matchMedia and re-renders when it changes. Read breakpoints, prefers-color-scheme or prefers-reduced-motion in JavaScript, with an SSR-safe false on the server so hydration stays clean.',
    signature: 'useMediaQuery(query: string): boolean',
    keywords: [
      'useMediaQuery react',
      'matchMedia hook',
      'responsive breakpoint hook',
      'prefers-color-scheme react',
    ],
    related: ['use-window-size', 'use-screen', 'use-is-client'],
    ssrSafe: true,
  },
  {
    slug: 'use-on-screen',
    name: 'useOnScreen',
    category: 'dom',
    purpose: 'element visibility',
    summary: 'Boolean that tells you whether an element is visible.',
    description:
      'useOnScreen returns true while the referenced element intersects the viewport. It is the simplest way to trigger scroll-reveal animations, lazy-load images or start a video only when the user can actually see it.',
    signature:
      'useOnScreen<T extends Element>(ref: RefObject<T>, rootMargin?: string): boolean',
    keywords: ['element in viewport hook', 'scroll reveal react', 'lazy load on visible'],
    related: ['use-intersection-observer', 'use-infinite-scroll', 'use-window-scroll'],
    ssrSafe: true,
  },
  {
    slug: 'use-intersection-observer',
    name: 'useIntersectionObserver',
    category: 'dom',
    purpose: 'IntersectionObserver',
    summary: 'Full IntersectionObserverEntry for an element.',
    description:
      'useIntersectionObserver gives you the raw IntersectionObserverEntry — intersectionRatio, boundingClientRect and all — with threshold, root, rootMargin and a freezeOnceVisible option. Reach for it when a plain boolean is not enough.',
    signature:
      'useIntersectionObserver(elementRef: RefObject<Element | null>, options?: Args): IntersectionObserverEntry | undefined',
    keywords: [
      'IntersectionObserver react hook',
      'intersection ratio',
      'freeze once visible',
      'scroll spy react',
    ],
    related: ['use-on-screen', 'use-infinite-scroll', 'use-mutation-observer'],
    ssrSafe: true,
  },
  {
    slug: 'use-window-size',
    name: 'useWindowSize',
    category: 'dom',
    purpose: 'window width and height',
    summary: 'Live viewport width and height.',
    description:
      'useWindowSize tracks window.innerWidth and innerHeight through a resize listener and returns them as state. Combine it with useDebounce for expensive layout maths, and rely on its undefined-on-server values to keep SSR output stable.',
    signature: 'useWindowSize(): WindowSize',
    keywords: ['window size hook', 'viewport dimensions react', 'resize listener hook'],
    related: ['use-media-query', 'use-screen', 'use-debounce'],
    ssrSafe: true,
  },
  {
    slug: 'use-window-scroll',
    name: 'useWindowScroll',
    category: 'dom',
    purpose: 'window scroll position',
    summary: 'Current window scroll offset, plus a scrollTo helper.',
    description:
      'useWindowScroll reports the page scroll position as x and y state and returns a scrollTo function that takes a y offset and an optional x. Use it to build sticky headers that shrink, back-to-top buttons and scroll progress indicators.',
    signature: 'useWindowScroll(): [{ x: number; y: number }, (y: number, x?: number) => void]',
    keywords: ['scroll position hook', 'scroll progress react', 'back to top button'],
    related: ['use-on-screen', 'use-scroll-lock', 'use-event-listener'],
    ssrSafe: true,
    ssrNote:
      'Returns { x: 0, y: 0 } on the server and the real scroll offset on the first client render. Render offset-dependent markup after hydration if the page can load already scrolled.',
  },
  {
    slug: 'use-document-title',
    name: 'useDocumentTitle',
    category: 'dom',
    purpose: 'setting the document title',
    summary: 'Set document.title declaratively from a component.',
    description:
      'useDocumentTitle writes to document.title while a component is mounted. It is useful in client-rendered apps and modal flows where the framework has not already produced a title through metadata.',
    signature: 'useDocumentTitle(title: string): void',
    keywords: ['document title hook', 'set page title react', 'dynamic tab title'],
    related: ['use-is-client', 'use-unmount', 'use-update-effect'],
    ssrSafe: true,
  },
  {
    slug: 'use-event-listener',
    name: 'useEventListener',
    category: 'dom',
    purpose: 'typed event listeners',
    summary: 'Typed addEventListener that cleans itself up.',
    description:
      'useEventListener attaches a strongly typed listener to window, document or a ref and removes it on unmount. Handlers are kept in a ref so you always run the latest closure without re-binding the listener on every render.',
    signature:
      'useEventListener<K extends keyof WindowEventMap>(eventName: K, handler: (event: WindowEventMap[K]) => void, element?: RefObject<HTMLElement> | Document | Window, options?: boolean | AddEventListenerOptions): void',
    keywords: [
      'addEventListener react hook',
      'typed event listener',
      'keyboard shortcut hook',
      'cleanup event listener',
    ],
    related: ['use-click-outside', 'use-event', 'use-window-scroll'],
    ssrSafe: true,
  },
  {
    slug: 'use-hover',
    name: 'useHover',
    category: 'dom',
    purpose: 'hover state',
    summary: 'Ref plus a boolean for pointer-over state.',
    description:
      'useHover returns a ref to attach and a boolean that is true while the pointer is over the element. It handles mouseenter and mouseleave for you, which keeps tooltips and hover previews out of render-blocking CSS hacks.',
    signature:
      'useHover<T extends HTMLElement = HTMLElement>(): [RefObject<T | null>, boolean]',
    keywords: ['hover state hook', 'mouse enter leave react', 'tooltip trigger hook'],
    related: ['use-mouse', 'use-event-listener', 'use-touch'],
    ssrSafe: true,
  },
  {
    slug: 'use-screen',
    name: 'useScreen',
    category: 'dom',
    purpose: 'screen information',
    summary: 'The window.screen object as reactive state.',
    description:
      'useScreen exposes window.screen — width, height, availWidth, colorDepth and orientation — as state that updates on resize. It returns null during server rendering so your markup never depends on a value the server cannot know.',
    signature: 'useScreen(): Screen | null',
    keywords: ['window.screen hook', 'screen resolution react', 'device screen size'],
    related: ['use-window-size', 'use-media-query', 'use-is-client'],
    ssrSafe: true,
    ssrNote:
      'Returns null on the server and window.screen on the first client render. Render screen-dependent markup after hydration (for example behind useIsClient) to avoid a hydration mismatch.',
  },
  {
    slug: 'use-mutation-observer',
    name: 'useMutationObserver',
    category: 'dom',
    purpose: 'watching DOM mutations',
    summary: 'Watch DOM changes inside an element.',
    description:
      'useMutationObserver runs a callback whenever the observed subtree changes — attributes, child nodes or character data. It is the escape hatch for integrating third-party widgets and portals that mutate the DOM outside React.',
    signature:
      'useMutationObserver(ref: RefObject<HTMLElement | null>, callback: MutationCallback, options?: MutationObserverInit): void',
    keywords: [
      'MutationObserver react hook',
      'watch dom changes',
      'observe attribute changes',
    ],
    related: ['use-intersection-observer', 'use-event-listener', 'use-script'],
    ssrSafe: true,
  },
  {
    slug: 'use-script',
    name: 'useScript',
    category: 'dom',
    purpose: 'loading external scripts',
    summary: 'Load an external script and track its status.',
    description:
      'useScript injects a third-party script tag once, deduplicates repeat calls for the same src, and reports idle, loading, ready or error. Gate analytics, payment SDKs and map libraries on the ready state instead of guessing with timeouts.',
    signature: "useScript(src: string): 'idle' | 'loading' | 'ready' | 'error'",
    keywords: [
      'load external script react',
      'third party script hook',
      'script loading status',
      'stripe sdk react',
    ],
    related: ['use-mutation-observer', 'use-is-client', 'use-fetch'],
    ssrSafe: true,
  },

  // -------------------------------------------------------- timers/lifecycle
  {
    slug: 'use-interval',
    name: 'useInterval',
    category: 'lifecycle',
    purpose: 'intervals without stale closures',
    summary: 'setInterval that never goes stale, pausable with null.',
    description:
      'useInterval runs a callback on a fixed interval and always calls the latest version of it, solving the classic stale-closure bug. Pass null as the delay to pause the timer, and it clears itself on unmount.',
    signature: 'useInterval(callback: () => void, delay: number | null): void',
    keywords: [
      'setInterval react hook',
      'stale closure interval',
      'polling hook react',
      'pause interval',
    ],
    related: ['use-timeout', 'use-countdown', 'use-event'],
    ssrSafe: true,
  },
  {
    slug: 'use-timeout',
    name: 'useTimeout',
    category: 'lifecycle',
    purpose: 'declarative timeouts',
    summary: 'Declarative setTimeout with automatic cleanup.',
    description:
      'useTimeout schedules a callback once after a delay, cancels it when the component unmounts, and restarts when the delay changes. Pass null to cancel — ideal for toast auto-dismiss and delayed tooltips.',
    signature: 'useTimeout(callback: () => void, delay: number | null): void',
    keywords: ['setTimeout react hook', 'delayed callback react', 'auto dismiss toast'],
    related: ['use-interval', 'use-debounce', 'use-countdown'],
    ssrSafe: true,
  },
  {
    slug: 'use-countdown',
    name: 'useCountdown',
    category: 'lifecycle',
    purpose: 'countdown timers',
    summary: 'Countdown timer with start, stop and reset.',
    description:
      'useCountdown counts down from a starting value at a configurable interval and exposes start, pause and reset controls plus an isCounting flag. Build OTP resend timers, checkout holds, quiz clocks and launch countdowns without hand-rolling interval bookkeeping.',
    signature:
      'useCountdown(initialCount: number, options?: UseCountdownOptions): { count: number; isCounting: boolean; start: () => void; pause: () => void; reset: () => void }',
    keywords: ['countdown timer hook', 'otp resend timer', 'react countdown', 'timer hook'],
    related: ['use-interval', 'use-timeout', 'use-counter'],
    ssrSafe: true,
  },
  {
    slug: 'use-is-mounted',
    name: 'useIsMounted',
    category: 'lifecycle',
    purpose: 'checking if a component is mounted',
    summary: 'Callback that reports whether the component is still mounted.',
    description:
      'useIsMounted returns a stable function you can call inside async code to check whether the component is still on screen. Guard a setState after an await with it and the "state update on unmounted component" warning disappears.',
    signature: 'useIsMounted(): () => boolean',
    keywords: [
      'is mounted hook',
      'avoid setState on unmounted',
      'async cleanup react',
      'memory leak warning',
    ],
    related: ['use-unmount', 'use-is-client', 'use-fetch'],
    ssrSafe: true,
  },
  {
    slug: 'use-is-client',
    name: 'useIsClient',
    category: 'lifecycle',
    purpose: 'client-only rendering',
    summary: 'False during SSR, true after hydration.',
    description:
      'useIsClient returns false on the server and on the first client render, then true. Use it to defer browser-only UI until after hydration so React never reports a mismatch between server and client markup.',
    signature: 'useIsClient(): boolean',
    keywords: [
      'ssr safe hook',
      'hydration mismatch fix',
      'client only render nextjs',
      'typeof window undefined',
    ],
    related: ['use-is-mounted', 'use-isomorphic-layout-effect', 'use-media-query'],
    ssrSafe: true,
  },
  {
    slug: 'use-unmount',
    name: 'useUnmount',
    category: 'lifecycle',
    purpose: 'unmount cleanup',
    summary: 'Run a function exactly once, on unmount.',
    description:
      'useUnmount runs cleanup when the component leaves the tree, always calling the latest callback. Flush analytics, abort a stream or release a lock without an empty-dependency useEffect whose closure has gone stale.',
    signature: 'useUnmount(callback: () => void): void',
    keywords: ['on unmount hook', 'componentWillUnmount react hook', 'cleanup on unmount'],
    related: ['use-is-mounted', 'use-update-effect', 'use-event'],
    ssrSafe: true,
  },
  {
    slug: 'use-update-effect',
    name: 'useUpdateEffect',
    category: 'lifecycle',
    purpose: 'skipping the first effect run',
    summary: 'useEffect that skips the first render.',
    description:
      'useUpdateEffect behaves exactly like useEffect but does not fire on mount. It is the right tool for reacting to a change — saving a filter the user edited, for instance — without firing on the initial value.',
    signature: 'useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void',
    keywords: [
      'skip first render effect',
      'useEffect not on mount',
      'update only effect react',
    ],
    related: ['use-previous', 'use-unmount', 'use-event'],
    ssrSafe: true,
  },
  {
    slug: 'use-event',
    name: 'useEvent',
    category: 'lifecycle',
    purpose: 'stable event callbacks',
    summary: 'A stable callback that always sees fresh state.',
    description:
      'useEvent returns a function whose identity never changes but whose body always reads the latest props and state. Pass it to memoised children and effect dependency arrays to stop needless re-renders without introducing stale closures.',
    signature: 'useEvent<T extends (...args: never[]) => unknown>(fn: T): T',
    keywords: [
      'useEvent react',
      'stable callback reference',
      'useCallback alternative',
      'stale closure fix',
    ],
    related: ['use-update-effect', 'use-interval', 'use-event-listener'],
    ssrSafe: true,
  },
  {
    slug: 'use-isomorphic-layout-effect',
    name: 'useIsomorphicLayoutEffect',
    category: 'lifecycle',
    purpose: 'SSR-safe layout effects',
    summary: 'useLayoutEffect on the client, useEffect on the server.',
    description:
      'useIsomorphicLayoutEffect picks useLayoutEffect in the browser and useEffect during server rendering, which removes the "useLayoutEffect does nothing on the server" warning while keeping synchronous DOM measurement where it matters.',
    signature: 'useIsomorphicLayoutEffect: typeof useEffect',
    keywords: [
      'useLayoutEffect ssr warning',
      'isomorphic layout effect',
      'nextjs layout effect warning',
    ],
    related: ['use-is-client', 'use-window-size', 'use-hover'],
    ssrSafe: true,
  },

  // ---------------------------------------------------------------- sensors
  {
    slug: 'use-copy-to-clipboard',
    name: 'useCopyToClipboard',
    category: 'sensors',
    purpose: 'copying to the clipboard',
    summary: 'Copy text to the clipboard and read back what you copied.',
    description:
      'useCopyToClipboard returns the last copied value and an async copy function built on the Clipboard API. It resolves to a boolean so you can show a "Copied!" state, and fails gracefully when the page lacks clipboard permission.',
    signature: 'useCopyToClipboard(): [CopiedValue, CopyFn]',
    keywords: [
      'copy to clipboard react',
      'clipboard api hook',
      'copy button react',
      'navigator.clipboard',
    ],
    related: ['use-toggle', 'use-timeout', 'use-is-client'],
    ssrSafe: true,
  },
  {
    slug: 'use-online-state',
    name: 'useOnlineState',
    category: 'sensors',
    purpose: 'online/offline status',
    summary: 'Track whether the browser is online.',
    description:
      'useOnlineState reads navigator.onLine and subscribes to the online and offline events. Show an offline banner, queue mutations, or pause polling the moment connectivity drops.',
    signature: 'useOnlineState(): boolean',
    keywords: [
      'navigator.onLine hook',
      'offline detection react',
      'network status hook',
      'pwa offline banner',
    ],
    related: ['use-fetch', 'use-event-listener', 'use-is-client'],
    ssrSafe: true,
    ssrNote:
      'Returns true on the server and navigator.onLine on the first client render, so an offline visitor can see a hydration mismatch if the status changes the markup.',
  },
  {
    slug: 'use-geolocation',
    name: 'useGeolocation',
    category: 'sensors',
    purpose: 'geolocation',
    summary: 'Watch the device position with loading and error state.',
    description:
      'useGeolocation subscribes to the Geolocation API and returns coordinates, accuracy, timestamp, loading and error. It accepts the standard PositionOptions and clears its watcher on unmount, so permission prompts and battery drain stay under control.',
    signature: 'useGeolocation(options?: PositionOptions): GeolocationState',
    keywords: [
      'geolocation react hook',
      'get user location react',
      'watchPosition hook',
      'gps coordinates react',
    ],
    related: ['use-online-state', 'use-is-client', 'use-screen'],
    ssrSafe: true,
  },
  {
    slug: 'use-audio',
    name: 'useAudio',
    category: 'sensors',
    purpose: 'audio playback',
    summary: 'Control an audio element with play, pause and volume.',
    description:
      'useAudio creates and manages an HTMLAudioElement, returning playing and volume state alongside play, pause, toggle and setVolume controls plus the underlying audio element. Build a compact player without wiring media events by hand.',
    signature: 'useAudio(src: string): { playing: boolean; toggle: () => void; play: () => void; pause: () => void; volume: number; setVolume: (v: number) => void; audio: HTMLAudioElement | null }',
    keywords: ['react audio hook', 'html5 audio player react', 'play pause hook', 'sound effects react'],
    related: ['use-interval', 'use-is-client', 'use-event-listener'],
    ssrSafe: true,
  },
  {
    slug: 'use-mouse',
    name: 'useMouse',
    category: 'sensors',
    purpose: 'mouse position',
    summary: 'Pointer position, page-wide or relative to an element.',
    description:
      'useMouse tracks the cursor and returns both page coordinates and element-relative coordinates when you pass a ref. It powers spotlight effects, custom cursors, tooltips that follow the pointer and drag previews.',
    signature: 'useMouse(ref?: RefObject<HTMLElement | null>): MouseState',
    keywords: ['mouse position hook', 'cursor tracking react', 'spotlight effect react'],
    related: ['use-hover', 'use-touch', 'use-window-scroll'],
    ssrSafe: true,
  },
  {
    slug: 'use-touch',
    name: 'useTouch',
    category: 'sensors',
    purpose: 'touch events',
    summary: 'Raw touch state for an element.',
    description:
      'useTouch reports whether the element is being touched and where, tracking touchstart, touchmove and touchend. Use it when you need finer control than a swipe abstraction gives you — drawing surfaces, sliders and pinch targets.',
    signature: 'useTouch(ref?: RefObject<HTMLElement | null>): TouchState',
    keywords: ['touch events react hook', 'mobile gesture react', 'touchmove hook'],
    related: ['use-swipe', 'use-mouse', 'use-hover'],
    ssrSafe: true,
  },
  {
    slug: 'use-swipe',
    name: 'useSwipe',
    category: 'sensors',
    purpose: 'swipe gestures',
    summary: 'Detect swipe direction and distance on touch devices.',
    description:
      'useSwipe turns raw touch events into a direction and distance once a movement crosses your threshold. Wire it to carousels, dismissible cards, mobile drawers and tab strips in a couple of lines.',
    signature: 'useSwipe(ref?: RefObject<HTMLElement | null>, threshold?: number): SwipeState',
    keywords: [
      'swipe gesture react hook',
      'carousel swipe react',
      'mobile swipe detection',
      'swipe to dismiss',
    ],
    related: ['use-touch', 'use-mouse', 'use-scroll-lock'],
    ssrSafe: true,
  },
  {
    slug: 'use-scroll-lock',
    name: 'useScrollLock',
    category: 'sensors',
    purpose: 'locking body scroll',
    summary: 'Freeze body scrolling while an overlay is open.',
    description:
      'useScrollLock disables scrolling on the document body and compensates for the scrollbar so the page does not shift. Toggle it with a boolean argument to keep modals, drawers and mobile menus from scrolling the content behind them.',
    signature: 'useScrollLock(lock?: boolean): void',
    keywords: [
      'prevent body scroll react',
      'modal scroll lock',
      'disable scrolling hook',
      'scrollbar shift fix',
    ],
    related: ['use-toggle', 'use-window-scroll', 'use-media-query'],
    ssrSafe: true,
  },
];

// ------------------------------------------------------------------ helpers

export const hooksByCategory = (category: HookCategoryId) =>
  hooks.filter((hook) => hook.category === category);

export const getHook = (slug: string) => hooks.find((hook) => hook.slug === slug);

export const getHookByName = (name: string) =>
  hooks.find((hook) => hook.name.toLowerCase() === name.toLowerCase());

export const getCategory = (id: HookCategoryId) =>
  hookCategories.find((category) => category.id === id)!;

/** Hooks in sidebar order: grouped by category, alphabetical is intentionally avoided. */
export const orderedHooks = hookCategories.flatMap((category) =>
  hooksByCategory(category.id),
);

export const hookCount = hooks.length;

export const relatedHooks = (slug: string) => {
  const hook = getHook(slug);
  if (!hook) return [];
  return hook.related
    .map(getHook)
    .filter((entry): entry is HookEntry => Boolean(entry));
};

/** Previous / next entry for in-page pagination, following sidebar order. */
export const hookNeighbours = (slug: string) => {
  const index = orderedHooks.findIndex((hook) => hook.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? orderedHooks[index - 1] : undefined,
    next: index < orderedHooks.length - 1 ? orderedHooks[index + 1] : undefined,
  };
};

/**
 * Copy-pasteable usage example for every hook, keyed by route slug.
 *
 * Kept out of the route files so the example is rendered (and syntax
 * highlighted) on the server by HookPage — it is in the initial HTML for
 * crawlers and answer engines, costs no client JavaScript, and is reused
 * verbatim in /llms-full.txt.
 */
export const hookExamples: Record<string, string> = {
  'use-audio': `
import { useAudio } from '@danixsoft/hooks';

function Example() {
  const { playing, toggle } = useAudio('/sound.mp3');
  
  return <button onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>;
}
  `,
  'use-boolean': `
import { useBoolean } from '@danixsoft/hooks';

function Checkbox() {
  const { value, toggle, setTrue, setFalse } = useBoolean(false);

  return (
    <div>
      <p>State: {value.toString()}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Set True</button>
      <button onClick={setFalse}>Set False</button>
    </div>
  );
}
  `,
  'use-click-any-where': `
import { useClickAnyWhere } from '@danixsoft/hooks';

function Example() {
  useClickAnyWhere(() => {
    console.log('Clicked anywhere!');
  });
  
  return <div>Click anywhere!</div>;
}
  `,
  'use-click-outside': `
import { useRef, useState } from 'react';
import { useClickOutside } from '@danixsoft/hooks';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(true)}>Open</button>
      
      {isOpen && (
        <div ref={ref} style={{ position: 'absolute' }}>
          Dropdown Menu! Click outside to close.
        </div>
      )}
    </div>
  );
}
  `,
  'use-cookie': `
import { useCookie } from '@danixsoft/hooks';

function Example() {
  const [value, updateCookie, deleteCookie] = useCookie('my-cookie');
  
  return (
    <div>
      <p>Cookie Value: {value}</p>
    </div>
  );
}
  `,
  'use-copy-to-clipboard': `
import { useCopyToClipboard } from '@danixsoft/hooks';

function Example() {
  const [copiedText, copy] = useCopyToClipboard();
  
  return (
    <div>
      <button onClick={() => copy('Hello')}>Copy Hello</button>
      <p>Copied: {copiedText}</p>
    </div>
  );
}
  `,
  'use-countdown': `
import { useCountdown } from '@danixsoft/hooks';

export default function App() {
  const { count, start, pause, reset } = useCountdown(60, { interval: 1000 });
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#1e1e1e', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: '4rem', margin: '0 0 2rem' }}>{count}</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={start} style={btnStyle}>Start</button>
        <button onClick={pause} style={btnStyle}>Pause</button>
        <button onClick={reset} style={btnStyle}>Reset</button>
      </div>
    </div>
  );
}

const btnStyle = { padding: '10px 20px', fontSize: '1rem', cursor: 'pointer', borderRadius: '6px', border: 'none', backgroundColor: '#3b82f6', color: 'white', fontWeight: 'bold' };
  `,
  'use-counter': `
import { useCounter } from '@danixsoft/hooks';

function Counter() {
  const { count, increment, decrement, reset } = useCounter(0, {
    min: -10,
    max: 10,
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
  `,
  'use-debounce': `
import { useState, useEffect } from 'react';
import { useDebounce } from '@danixsoft/hooks';

function SearchComponent() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // Call your API here
      console.log('Searching for:', debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input 
      value={search} 
      onChange={(e) => setSearch(e.target.value)} 
      placeholder="Search..."
    />
  );
}
  `,
  'use-document-title': `
import { useDocumentTitle } from '@danixsoft/hooks';

function Example() {
  useDocumentTitle('New Page Title');
  
  return <div>Look at the tab!</div>;
}
  `,
  'use-event': `
import type { MouseEvent } from 'react';
import { useEvent } from '@danixsoft/hooks';

function Example({ onClick }: { onClick: (e: MouseEvent) => void }) {
  // Always stable reference, but always executes the latest onClick
  const handleClick = useEvent((e: MouseEvent) => {
    onClick(e);
  });
  
  return <button onClick={handleClick}>Click Me</button>;
}
  `,
  'use-event-listener': `
import { useEventListener } from '@danixsoft/hooks';

function Example() {
  useEventListener('keydown', (e) => console.log(e.key));
  
  return <div>Press any key!</div>;
}
  `,
  'use-fetch': `
import { useFetch } from '@danixsoft/hooks';

function TodoItem() {
  const { data, error, isLoading } = useFetch('https://jsonplaceholder.typicode.com/todos/1');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{JSON.stringify(data)}</div>;
}
  `,
  'use-form': `
import { useForm } from '@danixsoft/hooks';

function ContactForm() {
  const { values, handleChange, handleSubmit, errors } = useForm({
    initialValues: { email: '', name: '' },
    validate: (vals) => {
      const errs: Partial<Record<'email' | 'name', string>> = {};
      if (!vals.email.includes('@')) errs.email = 'Invalid email';
      if (vals.name.length < 3) errs.name = 'Name too short';
      return errs;
    },
    onSubmit: (vals) => alert(JSON.stringify(vals))
  });

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={values.name} onChange={handleChange} />
      {errors.name && <span>{errors.name}</span>}

      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}
  `,
  'use-geolocation': `
import { useGeolocation } from '@danixsoft/hooks';

function Example() {
  const state = useGeolocation();
  
  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>Error: {state.error.message}</p>;
  
  return <p>{state.latitude}, {state.longitude}</p>;
}
  `,
  'use-hover': `
import { useHover } from '@danixsoft/hooks';

function Example() {
  const [ref, isHovered] = useHover<HTMLDivElement>();

  return <div ref={ref}>{isHovered ? 'Hovered' : 'Not hovered'}</div>;
}
  `,
  'use-infinite-scroll': `
import { useState } from 'react';
import { useInfiniteScroll } from '@danixsoft/hooks';

function Feed() {
  const [items, setItems] = useState([1, 2, 3]);
  
  const loadMore = () => {
    // Fetch more items...
    setItems(prev => [...prev, 4, 5, 6]);
  };
  
  // Attach this ref to the element at the bottom of your list
  const bottomRef = useInfiniteScroll<HTMLDivElement>(loadMore);

  return (
    <div style={{ height: '400px', overflow: 'auto' }}>
      {items.map(i => <div key={i}>Item {i}</div>)}
      
      <div ref={bottomRef}>Loading more...</div>
    </div>
  );
}
  `,
  'use-intersection-observer': `
import { useRef } from 'react';
import { useIntersectionObserver } from '@danixsoft/hooks';

function Example() {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.5 });

  return <div ref={ref}>{entry?.isIntersecting ? 'Visible' : 'Observe me!'}</div>;
}
  `,
  'use-interval': `
import { useInterval } from '@danixsoft/hooks';

function Example() {
  useInterval(() => {
    console.log('Tick!');
  }, 1000);
  
  return <div>Check console</div>;
}
  `,
  'use-is-client': `
import { useIsClient } from '@danixsoft/hooks';

function Example() {
  const isClient = useIsClient();
  
  return <div>Client: {isClient ? 'Yes' : 'No'}</div>;
}
  `,
  'use-is-mounted': `
import { useIsMounted } from '@danixsoft/hooks';

function Example() {
  const isMounted = useIsMounted();
  
  return <div>Mounted: {isMounted() ? 'Yes' : 'No'}</div>;
}
  `,
  'use-isomorphic-layout-effect': `
import { useIsomorphicLayoutEffect } from '@danixsoft/hooks';

function Example() {
  // Acts as useLayoutEffect on client, and useEffect on server
  useIsomorphicLayoutEffect(() => {
    console.log('Layout effect executed');
  }, []);
  
  return <div>Check console</div>;
}
  `,
  'use-local-storage': `
import { useLocalStorage } from '@danixsoft/hooks';

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Current Theme: {theme}
    </button>
  );
}
  `,
  'use-map': `
import { useMap } from '@danixsoft/hooks';

function Example() {
  const [map, actions] = useMap<string, string>(new Map());
  
  return (
    <div>
      <button onClick={() => actions.set('hello', 'world')}>Set Value</button>
    </div>
  );
}
  `,
  'use-media-query': `
import { useMediaQuery } from '@danixsoft/hooks';

export default function App() {
  const isDesktop = useMediaQuery('(min-width: 800px)');

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: isDesktop ? '#eff6ff' : '#1e1e1e',
      color: isDesktop ? '#1e3a8a' : 'white',
      fontFamily: 'sans-serif',
      transition: 'all 0.5s ease'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          {isDesktop ? '🖥️' : '📱'}
        </div>
        <h2 style={{ margin: 0 }}>
          {isDesktop ? 'Desktop View' : 'Mobile/Tablet View'}
        </h2>
        <p>Resize the sandbox preview pane to see it change!</p>
      </div>
    </div>
  );
}
  `,
  'use-mouse': `
import { useMouse } from '@danixsoft/hooks';

export default function App() {
  const { x, y } = useMouse();
  
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e1e1e', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '2rem', backgroundColor: '#2d2d2d', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 1rem' }}>Mouse Tracker</h2>
        <p style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>X: {x}</p>
        <p style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>Y: {y}</p>
      </div>
    </div>
  );
}
  `,
  'use-mutation-observer': `
import { useMutationObserver } from '@danixsoft/hooks';
import { useRef, useState } from 'react';

function Example() {
  const ref = useRef<HTMLDivElement>(null);
  const [mutations, setMutations] = useState(0);

  useMutationObserver(
    ref,
    (mutationList) => {
      setMutations((m) => m + mutationList.length);
    },
    { childList: true, subtree: true }
  );

  return (
    <div>
      <div ref={ref}>
        <button onClick={() => ref.current?.append(document.createElement('div'))}>
          Mutate DOM
        </button>
      </div>
      <p>Mutations count: {mutations}</p>
    </div>
  );
}
  `,
  'use-on-screen': `
import { useRef } from 'react';
import { useOnScreen } from '@danixsoft/hooks';

function LazyImage() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <div ref={ref}>
      {isVisible ? <img src="huge-image.jpg" /> : <p>Loading image...</p>}
    </div>
  );
}
  `,
  'use-online-state': `
import { useOnlineState } from '@danixsoft/hooks';

function Example() {
  const isOnline = useOnlineState();
  
  return <div>You are {isOnline ? 'online' : 'offline'}</div>;
}
  `,
  'use-pagination': `
import { usePagination } from '@danixsoft/hooks';

const data = ['A', 'B', 'C', 'D', 'E']; // Lots of data

function PaginatedList() {
  const { currentData, currentPage, totalPages, next, prev } = usePagination(data, 10);

  return (
    <div>
      {currentData.map(item => <div key={item}>{item}</div>)}
      
      <button onClick={prev} disabled={currentPage === 1}>Prev</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={next} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
}
  `,
  'use-previous': `
import { useState } from 'react';
import { usePrevious } from '@danixsoft/hooks';

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Now: {count}, Before: {prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
  `,
  'use-screen': `
import { useScreen } from '@danixsoft/hooks';

function Example() {
  const screen = useScreen();
  
  return <div>Width: {screen?.width}</div>;
}
  `,
  'use-script': `
import { useScript } from '@danixsoft/hooks';

function Example() {
  const status = useScript('https://code.jquery.com/jquery-3.6.0.min.js');

  return (
    <div>
      <p>Script status: {status}</p>
      {status === 'ready' && <p>jQuery is ready!</p>}
    </div>
  );
}
  `,
  'use-scroll-lock': `
import { useScrollLock } from '@danixsoft/hooks';

function Example() {
  useScrollLock(true);
  
  return <p>The body is locked!</p>;
}
  `,
  'use-session-storage': `
import { useSessionStorage } from '@danixsoft/hooks';

function Example() {
  const [value, setValue] = useSessionStorage('my-key', 'default');
  
  return (
    <div>
      <p>Value: {value}</p>
    </div>
  );
}
  `,
  'use-step': `
import { useStep } from '@danixsoft/hooks';

function Example() {
  const [currentStep, { goToNextStep }] = useStep(5);
  
  return (
    <div>
      <p>Step: {currentStep}</p>
      <button onClick={goToNextStep}>Next</button>
    </div>
  );
}
  `,
  'use-swipe': `
import { useSwipe } from '@danixsoft/hooks';

export default function App() {
  const { direction, swiping } = useSwipe();
  
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1e1e1e', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '4rem', border: '2px dashed #4b5563', borderRadius: '12px', textAlign: 'center', userSelect: 'none', width: '80%', maxWidth: '400px' }}>
        <h2>Swipe Here!</h2>
        <p style={{ fontSize: '1.5rem', marginTop: '1rem', color: swiping ? '#60a5fa' : '#9ca3af' }}>
          {swiping ? \`Swiping \${direction}...\` : (direction ? \`Last swipe: \${direction}\` : 'No swipe yet')}
        </p>
      </div>
    </div>
  );
}
  `,
  'use-timeout': `
import { useTimeout } from '@danixsoft/hooks';

function Example() {
  useTimeout(() => {
    console.log('Timeout!');
  }, 3000);
  
  return <div>Wait 3 seconds...</div>;
}
  `,
  'use-toggle': `
import { useToggle } from '@danixsoft/hooks';

function Modal() {
  const [isOpen, toggleModal, openModal, closeModal] = useToggle(false);

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <h2>Hello World</h2>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </>
  );
}
  `,
  'use-touch': `
import { useTouch } from '@danixsoft/hooks';

function Example() {
  const state = useTouch();
  
  return <p>Touches: {state.touches?.length || 0}</p>;
}
  `,
  'use-unmount': `
import { useUnmount } from '@danixsoft/hooks';

function Example() {
  useUnmount(() => console.log('Unmounted!'));
  
  return <div>Hello</div>;
}
  `,
  'use-update-effect': `
import { useUpdateEffect } from '@danixsoft/hooks';

function Example({ count }: { count: number }) {
  useUpdateEffect(() => {
    console.log('Count updated!', count);
  }, [count]);
  
  return <div>Check console on update</div>;
}
  `,
  'use-window-scroll': `
import { useWindowScroll } from '@danixsoft/hooks';

function Example() {
  const [{ x, y }, scrollTo] = useWindowScroll();
  
  return <div>Scrolled to {x}, {y}</div>;
}
  `,
  'use-window-size': `
import { useWindowSize } from '@danixsoft/hooks';

function Dimensions() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window is {width}px by {height}px
    </div>
  );
}
  `,
};

/** Hooks whose route has no interactive demo, so HookPage skips that section. */
export const hooksWithoutDemo = new Set<string>([
  'use-audio',
  'use-copy-to-clipboard',
  'use-event',
  'use-geolocation',
  'use-interval',
  'use-is-client',
  'use-is-mounted',
  'use-isomorphic-layout-effect',
  'use-mutation-observer',
  'use-online-state',
  'use-script',
  'use-scroll-lock',
  'use-timeout',
  'use-touch',
  'use-unmount',
  'use-update-effect',
]);

/**
 * Hooks demonstrated with an editable Sandpack sandbox (their example is a
 * full App component). HookPage renders the sandbox lazily, on request.
 */
export const hooksWithSandbox = new Set<string>([
  'use-countdown',
  'use-media-query',
  'use-mouse',
  'use-swipe',
]);

export const getHookExample = (slug: string) => hookExamples[slug]?.trim() ?? '';

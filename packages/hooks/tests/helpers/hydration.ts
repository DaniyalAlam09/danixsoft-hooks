import React from 'react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot, type Root } from 'react-dom/client';
import { act } from '@testing-library/react';
import { vi } from 'vitest';

/**
 * Renders `element` the way a server would: with no `window` or `document`
 * (jsdom provides both, which would hide SSR bugs).
 */
export function renderOnServer(element: React.ReactElement): string {
  const win = globalThis.window;
  const doc = globalThis.document;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = globalThis as any;
  g.window = undefined;
  g.document = undefined;
  try {
    return renderToString(element);
  } finally {
    g.window = win;
    g.document = doc;
  }
}

/**
 * Server-renders `element` (without window/document), then hydrates that markup in jsdom and returns
 * the console.error calls React made (hydration mismatches are reported
 * there) plus the container, so tests can assert on the final DOM.
 */
export async function hydrate(element: React.ReactElement) {
  const serverHtml = renderOnServer(element);
  const container = document.createElement('div');
  container.innerHTML = serverHtml;
  document.body.appendChild(container);

  const errors: unknown[][] = [];
  const spy = vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    errors.push(args);
  });
  let root: Root | undefined;
  try {
    await act(async () => {
      root = hydrateRoot(container, element, {
        onRecoverableError: (error) => errors.push([error]),
      });
    });
  } finally {
    spy.mockRestore();
  }

  return {
    serverHtml,
    container,
    errors,
    cleanup: () => {
      act(() => root?.unmount());
      container.remove();
    },
  };
}

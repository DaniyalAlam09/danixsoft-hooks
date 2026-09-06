'use client';

import { useSyncExternalStore } from 'react';

const neverChanges = () => () => {};

/**
 * False during server rendering and the hydrating render, true afterwards.
 *
 * Uses useSyncExternalStore rather than a mount effect so React drives the
 * transition itself — no setState in an effect, and no cascading render.
 */
export const useHydrated = () =>
  useSyncExternalStore(
    neverChanges,
    () => true,
    () => false,
  );

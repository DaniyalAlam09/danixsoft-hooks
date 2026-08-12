# Changelog

All notable changes to this project will be documented in this file.

## [0.2.1] - 2026-08-04
### Added
- Exported `useWindowScroll` in the main entry point (`index.ts`).
- Added documentation for `useEvent`, `useIsomorphicLayoutEffect`, `useMutationObserver`, and `useScript`.
- Updated documentation with accurate hook counts (42+ hooks).

## [0.2.0] - 2026-08-03
### Added
- **Major Expansion**: Added 32 new essential, high-performance hooks.
- **State & Storage**: `useBoolean`, `useCounter`, `useMap`, `useSessionStorage`, `useCookie`, `useStep`.
- **Forms & Data**: `useForm`, `usePagination`, `useInfiniteScroll`, `useFetch`.
- **DOM & Browser**: `useClickAnyWhere`, `useMediaQuery`, `useOnScreen`, `useIntersectionObserver`, `useWindowScroll`, `useDocumentTitle`, `useHover`, `useScreen`, `useMutationObserver`, `useScript`.
- **Timers & Lifecycle**: `useCountdown`, `useIsMounted`, `useIsClient`, `useUnmount`, `useUpdateEffect`, `useEvent`, `useIsomorphicLayoutEffect`.
- **Advanced Sensors**: `useCopyToClipboard`, `useOnlineState`, `useGeolocation`, `useAudio`, `useMouse`, `useTouch`, `useSwipe`, `useScrollLock`.
- Full SSR compatibility and Next.js hydration safety.
- Complete documentation site with interactive demos for all hooks.

## [0.1.1] - 2026-08-01
### Fixed
- Addressed minor package configuration issues.

## [0.1.0] - 2026-08-01
### Added
- Initial release with basic core hooks: `useToggle`, `useLocalStorage`, `useDebounce`, `usePrevious`, `useClickOutside`, `useWindowSize`, `useEventListener`, `useInterval`, `useTimeout`.

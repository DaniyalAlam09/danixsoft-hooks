# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Boilerplate entries for upcoming changes.

## [0.2.2] - 2026-08-12
### Added
- Added `LICENSE` file (MIT) to the package and repository root.
- Added Next.js `"use client"` directive guidance to the README.

### Changed
- Updated package `description` to accurately reflect the 42+ hooks count.
- Added `license: "MIT"` field to `package.json`.

## [0.2.1] - 2026-08-04
### Added
- Added missing documentation pages and interactive sandboxes for `useEvent`, `useIsomorphicLayoutEffect`, `useMutationObserver`, and `useScript`.
- Exported `useWindowScroll` in the package's main entry point.

### Changed
- Updated README.md and documentation counts to correctly state "42+ Available Hooks".

## [0.2.0] - 2026-08-03
### Added
- **Major Expansion**: Added 32 new essential, high-performance hooks.
- **State & Storage**: `useBoolean`, `useCounter`, `useMap`, `useSessionStorage`, `useCookie`, `useStep`.
- **Forms & Data**: `useForm`, `usePagination`, `useInfiniteScroll`, `useFetch`.
- **DOM & Browser**: `useClickAnyWhere`, `useMediaQuery`, `useOnScreen`, `useIntersectionObserver`, `useWindowScroll`, `useDocumentTitle`, `useHover`, `useScreen`, `useMutationObserver`, `useScript`.
- **Timers & Lifecycle**: `useCountdown`, `useIsMounted`, `useIsClient`, `useUnmount`, `useUpdateEffect`, `useEvent`, `useIsomorphicLayoutEffect`.
- **Advanced Sensors**: `useCopyToClipboard`, `useOnlineState`, `useGeolocation`, `useAudio`, `useMouse`, `useTouch`, `useSwipe`, `useScrollLock`.
- Full SSR compatibility and Next.js hydration safety.
- Complete documentation site built with Next.js App Router featuring interactive demos.

## [0.1.1] - 2026-08-01
### Fixed
- Fixed minor NPM package distribution and configuration issues.

## [0.1.0] - 2026-08-01
### Added
- Initial release with basic core hooks: `useToggle`, `useLocalStorage`, `useDebounce`, `usePrevious`, `useClickOutside`, `useWindowSize`, `useEventListener`, `useInterval`, `useTimeout`.

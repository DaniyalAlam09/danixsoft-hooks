/** Tiny classname joiner — falsy values are dropped. */
export const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');

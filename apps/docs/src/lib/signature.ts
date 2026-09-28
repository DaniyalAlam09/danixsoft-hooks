export interface SignatureParam {
  name: string;
  type: string;
  optional: boolean;
}

export interface ParsedSignature {
  params: SignatureParam[];
  returns: string;
}

const OPEN = '(<[{';
const CLOSE = ')>]}';

/** Splits on `separator` only at bracket depth 0 (ignores `=>` arrows). */
function splitTopLevel(input: string, separator: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (OPEN.includes(char)) depth++;
    else if (CLOSE.includes(char) && !(char === '>' && input[i - 1] === '=')) depth--;
    if (char === separator && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

/**
 * Turns a registry signature such as
 * `useDebounce<T>(value: T, delay: number): T` into rows for the API table.
 * Returns null for anything that is not a plain function signature (e.g.
 * `useIsomorphicLayoutEffect: typeof useEffect`) so the page falls back to
 * showing the signature alone.
 */
export function parseSignature(signature: string): ParsedSignature | null {
  // First `(` outside the generic parameter list: `useEvent<T extends (...) => U>(fn: T)`.
  let open = -1;
  let angle = 0;
  for (let i = 0; i < signature.length; i++) {
    const char = signature[i];
    if (char === '<') angle++;
    else if (char === '>' && signature[i - 1] !== '=') angle--;
    else if (char === '(' && angle === 0) {
      open = i;
      break;
    }
  }
  if (open === -1) return null;

  let depth = 0;
  let close = -1;
  for (let i = open; i < signature.length; i++) {
    const char = signature[i];
    if (char === '(') depth++;
    if (char === ')') depth--;
    if (depth === 0) {
      close = i;
      break;
    }
  }
  if (close === -1) return null;

  const rest = signature.slice(close + 1).trim();
  if (!rest.startsWith(':')) return null;

  const params = splitTopLevel(signature.slice(open + 1, close), ',').map(
    (part) => {
      const colon = part.indexOf(':');
      const rawName = colon === -1 ? part : part.slice(0, colon);
      const optional = rawName.trim().endsWith('?');
      return {
        name: rawName.replace('?', '').trim(),
        type: colon === -1 ? 'unknown' : part.slice(colon + 1).trim(),
        optional,
      };
    },
  );

  return { params, returns: rest.slice(1).trim() };
}

export const THEME_STORAGE_KEY = 'danixsoft-theme';

/**
 * Runs synchronously while the browser parses <head>, before first paint,
 * so the correct theme class is on <html> and there is never a flash of the
 * wrong colours. See the Next.js "preventing flash before hydration" guide.
 */
const script = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'light' || stored === 'dark' ? stored : null;
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    var root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function ThemeScript() {
  return (
    <script
      // The class is applied before React hydrates, so the server HTML and the
      // DOM legitimately differ on <html>; suppress the warning at that node.
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}

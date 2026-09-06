'use client';

import { useTheme, type Theme } from '@/components/theme/theme-provider';
import { MonitorIcon, MoonIcon, SunIcon } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

const options: { value: Theme; label: string; Icon: typeof SunIcon }[] = [
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
  { value: 'system', label: 'System', Icon: MonitorIcon },
];

/** Segmented light / dark / system control. */
export function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme, mounted } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-lg border border-border bg-bg-subtle p-0.5',
        className,
      )}
    >
      {options.map(({ value, label, Icon }) => {
        // Before hydration we cannot know the stored preference, so no option
        // is marked active — this avoids a wrong highlight on first paint.
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${label} theme`}
            title={`${label} theme`}
            onClick={() => setTheme(value)}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              active
                ? 'bg-surface text-accent shadow-[var(--shadow-sm)]'
                : 'text-fg-subtle hover:text-fg',
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}

/** Compact single-button toggle for the mobile header. */
export function ThemeToggleButton({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
      className={cn(
        'rounded-lg border border-border bg-surface p-2 text-fg-muted transition-colors hover:text-fg',
        className,
      )}
    >
      {mounted && resolvedTheme === 'dark' ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </button>
  );
}

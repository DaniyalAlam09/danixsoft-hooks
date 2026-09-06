export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden role="img">
      <defs>
        <linearGradient id="dxh-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-400)" />
          <stop offset="100%" stopColor="var(--color-brand-600)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#dxh-logo)" />
      {/* A stylised "hook": the fishing-hook curve doubling as a lowercase h. */}
      <path
        d="M11 8v11.5a4.5 4.5 0 0 0 9 0V17"
        fill="none"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="20" cy="12.5" r="2.1" fill="white" />
    </svg>
  );
}

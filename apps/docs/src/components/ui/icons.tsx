import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

export const SearchIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const SunIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

export const MonitorIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="2" y="4" width="20" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ChevronRightIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m15 5-7 7 7 7" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m5 9 7 7 7-7" />
  </svg>
);

export const CopyIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const GitHubIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
    />
  </svg>
);

export const NpmIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M1.763 0h20.474C23.21 0 24 .79 24 1.763v20.474c0 .973-.79 1.763-1.763 1.763H1.763A1.763 1.763 0 0 1 0 22.237V1.763C0 .79.79 0 1.763 0Zm3.3 5.3v13.4h6.7V8.65h3.35v10.05h3.35V5.3H5.063Z" />
  </svg>
);

export const SparkIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M3 12h3M18 12h3M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    <circle cx="12" cy="12" r="3.2" />
  </svg>
);

export const BoltIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5Z" />
  </svg>
);

export const ShieldIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.3 7.5 9.5 4.4-1.2 7.5-4.9 7.5-9.5V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const LeafIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 20c0-8 5-13 16-13 0 9-5 13-11.5 13H4Z" />
    <path d="M4 20c3-6 6.5-9 11-11" />
  </svg>
);

export const ServerIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5h.01M7 16.5h.01" />
  </svg>
);

export const DatabaseIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <ellipse cx="12" cy="5.5" rx="8" ry="3" />
    <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13" />
    <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </svg>
);

export const FormIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 9h10M7 13h6" />
  </svg>
);

export const BrowserIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M6.5 6.5h.01M9.5 6.5h.01" />
  </svg>
);

export const ClockIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 2" />
  </svg>
);

export const SensorIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="2.5" />
    <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 19.1a10 10 0 0 0 0-14.2" />
  </svg>
);

export const BookIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
    <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19v3H6.5A2.5 2.5 0 0 1 4 20.5Z" />
  </svg>
);

export const ScaleIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M12 4v16M7 20h10M6 8h12l-3 5a3 3 0 0 1-6 0l-3-5Z" />
    <path d="M9 6.5 12 5l3 1.5" />
  </svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const ExternalIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M14 4h6v6M20 4l-8.5 8.5" />
    <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
  </svg>
);

export const InfoIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

export const WarnIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M10.3 4.3 2.6 17.6A2 2 0 0 0 4.3 20.7h15.4a2 2 0 0 0 1.7-3.1L13.7 4.3a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9.5v4M12 17h.01" />
  </svg>
);

export const TipIcon = (props: IconProps) => (
  <svg {...base} {...props}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6h5.4c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z" />
  </svg>
);

export const listIcon = (name: string) => {
  const map: Record<string, (props: IconProps) => React.ReactElement> = {
    database: DatabaseIcon,
    form: FormIcon,
    browser: BrowserIcon,
    clock: ClockIcon,
    sensor: SensorIcon,
  };
  return map[name] ?? SparkIcon;
};

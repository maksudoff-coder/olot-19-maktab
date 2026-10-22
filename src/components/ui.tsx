import React, { useEffect, useId } from 'react';
import { X } from 'lucide-react';

/** Buxoro koshinlaridagi sakkiz qirrali yulduz (xotam) naqshi. Rang — currentColor. */
export const TilePattern: React.FC<{ className?: string; size?: number; strokeWidth?: number }> = ({
  className = '',
  size = 56,
  strokeWidth = 1.2,
}) => {
  const id = useId().replace(/:/g, '');
  const c = size / 2;
  const a = size * 0.25; // kvadrat yarim tomoni
  const d = a * Math.SQRT2; // romb radiusi
  return (
    <svg className={className} aria-hidden="true" width="100%" height="100%">
      <defs>
        <pattern id={`tile-${id}`} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
            <rect x={c - a} y={c - a} width={a * 2} height={a * 2} />
            <polygon points={`${c},${c - d} ${c + d},${c} ${c},${c + d} ${c - d},${c}`} />
            <path d={`M0 0 L${c - d * 0.71} ${c - d * 0.71} M${size} 0 L${c + d * 0.71} ${c - d * 0.71} M0 ${size} L${c - d * 0.71} ${c + d * 0.71} M${size} ${size} L${c + d * 0.71} ${c + d * 0.71}`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#tile-${id})`} />
    </svg>
  );
};

/** Maktab belgisi: xotam yulduzi ichida raqam */
export const Emblem: React.FC<{ number: string; className?: string; tone?: 'dark' | 'light' }> = ({
  number,
  className = 'w-11 h-11',
  tone = 'dark',
}) => {
  const fill = tone === 'dark' ? 'var(--color-lapis-800)' : '#ffffff';
  const text = tone === 'dark' ? '#ffffff' : 'var(--color-lapis-800)';
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect x="18" y="18" width="64" height="64" fill={fill} />
      <rect x="18" y="18" width="64" height="64" fill={fill} transform="rotate(45 50 50)" />
      <rect x="25" y="25" width="50" height="50" fill="none" stroke="var(--color-firuza-500)" strokeWidth="2.5" />
      <rect x="25" y="25" width="50" height="50" fill="none" stroke="var(--color-firuza-500)" strokeWidth="2.5" transform="rotate(45 50 50)" />
      <text
        x="50"
        y="51"
        textAnchor="middle"
        dominantBaseline="central"
        fill={text}
        style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: number.length > 2 ? 24 : 30 }}
      >
        {number}
      </text>
    </svg>
  );
};

/** Bo'lim sarlavhasi: sarlavha + bitta izoh jumla */
export const SectionHead: React.FC<{
  title: string;
  intro?: string;
  action?: React.ReactNode;
  dark?: boolean;
}> = ({ title, intro, action, dark }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
    <div className="max-w-2xl">
      <h2 className={`text-2xl sm:text-[2rem] leading-tight font-semibold ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {intro && <p className={`mt-3 text-[1.0625rem] ${dark ? 'text-lapis-100/80' : 'text-muted'}`}>{intro}</p>}
    </div>
    {action}
  </div>
);

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

/** Kiritilmagan qiymat uchun aniq ko'rinadigan belgi */
export const Missing: React.FC<{ label?: string; dark?: boolean }> = ({ label = 'kiritilmagan', dark }) => (
  <span
    className={`inline-block rounded px-1.5 py-px text-[0.8125rem] italic border border-dashed ${
      dark ? 'border-white/30 text-white/60' : 'border-oltin-500/60 text-[#8a5d00] bg-[#fff8e6]'
    }`}
  >
    {label}
  </span>
);

export function show<T>(v: T | null | undefined, dark?: boolean, label?: string): React.ReactNode {
  if (v === null || v === undefined || v === '') return <Missing dark={dark} label={label} />;
  return v as unknown as React.ReactNode;
}

export const initials = (name: string | null, fallback: string) => {
  const src = name ?? fallback;
  return src
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
};

export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}> = ({ open, onClose, title, children, wide }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-lapis-950/60 backdrop-blur-[2px] sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`modal-in bg-white w-full ${wide ? 'sm:max-w-2xl' : 'sm:max-w-lg'} max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl shadow-2xl`}
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-line">
          <h3 className="text-lg font-semibold leading-snug">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 -mr-2 p-2 rounded-lg text-muted hover:bg-surface hover:text-ink"
            aria-label="Yopish"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

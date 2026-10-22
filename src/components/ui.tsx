import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Maktab logotipi: ochiq kitob sahifalarida "1" va "9", tepasida bilim chirog'i.
 * Fayl ko'rinishlari: public/logo/ (SVG va PNG).
 */
export const Emblem: React.FC<{ size?: number; className?: string; title?: string }> = ({ size = 40, className = '', title }) => (
  <svg
    viewBox="0 0 120 120"
    width={size}
    height={size}
    className={`shrink-0 ${className}`}
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
  >
    <rect width="120" height="120" rx="34" fill="var(--color-brand-800)" />
    <circle cx="60" cy="21" r="6.5" fill="var(--color-accent-300)" />
    <path d="M58 40 C48 33 33 31 19 34 L19 88 C33 85 48 87 58 94 Z" fill="#fff" />
    <path d="M62 40 C72 33 87 31 101 34 L101 88 C87 85 72 87 62 94 Z" fill="#fff" />
    <g fill="none" stroke="var(--color-brand-800)" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M33 54 L40 48 L40 78" />
      <circle cx="79" cy="57" r="8.5" />
      <path d="M87.5 57 L87.5 70 Q87.5 78 79.5 78" />
    </g>
  </svg>
);

/** Bo'lim sarlavhasi: sarlavha + bitta izoh jumla */
export const SectionHead: React.FC<{
  title: string;
  intro?: string;
  action?: React.ReactNode;
  dark?: boolean;
}> = ({ title, intro, action, dark }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
    <div className="max-w-2xl">
      <h2 className={`text-2xl sm:text-[2rem] leading-tight ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {intro && <p className={`mt-3 text-[1.0625rem] ${dark ? 'text-brand-100/80' : 'text-muted'}`}>{intro}</p>}
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-brand-950/60 backdrop-blur-[2px] sm:p-4"
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

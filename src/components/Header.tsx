import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';
import { SITE } from '../config';
import { Container, Emblem } from './ui';

const NAV = [
  { href: '#maktab-haqida', label: 'Maktab haqida' },
  { href: '#dars-jadvali', label: 'Dars jadvali' },
  { href: '#oqituvchilar', label: "O'qituvchilar" },
  { href: '#togaraklar', label: "To'garaklar" },
  { href: '#yangiliklar', label: 'Yangiliklar' },
  { href: '#aloqa', label: "Bog'lanish" },
];

export const DemoBanner: React.FC = () =>
  SITE.demo ? (
    <div className="no-print bg-[#fff3cd] text-[#5c4400] text-sm border-b border-[#f0d58a]">
      <Container className="py-2 flex flex-wrap items-center gap-x-2">
        <strong className="font-semibold">Namunaviy versiya.</strong>
        <span>Sariq belgili joylarga maktabning haqiqiy ma'lumotlari kiritiladi.</span>
      </Container>
    </div>
  ) : null;

export const Header: React.FC<{ onContact: () => void }> = ({ onContact }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? 'shadow-[0_1px_0_var(--color-line),0_6px_20px_-12px_rgba(19,42,82,.25)]' : 'shadow-[0_1px_0_var(--color-line)]'
      }`}
    >
      <Container className="flex items-center justify-between gap-4 h-[4.25rem]">
        <a href="#" className="flex items-center gap-3 shrink-0" aria-label={`${SITE.shortName}, bosh sahifa`}>
          <Emblem size={50} />
          <span className="leading-tight">
            <span className="block font-bold text-[0.95rem] text-ink whitespace-nowrap">{SITE.shortName}</span>
            <span className="block text-xs text-muted">{SITE.region}</span>
          </span>
        </a>

        <nav className="hidden xl:flex items-center text-[0.9375rem]" aria-label="Asosiy menyu">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="px-2.5 py-2 rounded-lg whitespace-nowrap text-ink/80 hover:text-brand-800 hover:bg-brand-50">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onContact}
            className="hidden sm:inline-flex whitespace-nowrap px-4 py-2.5 rounded-lg bg-brand-800 hover:bg-brand-700 text-white text-sm font-medium"
          >
            Murojaat yuborish
          </button>
          <button
            type="button"
            className="xl:hidden p-2.5 -mr-2 rounded-lg text-brand-900 hover:bg-brand-50"
            onClick={() => setOpen(true)}
            aria-label="Menyuni ochish"
            aria-expanded={open}
          >
            <Menu size={24} />
          </button>
        </div>
      </Container>

      {open && createPortal(
        <div className="xl:hidden fixed inset-0 z-50 bg-brand-950/50" onClick={() => setOpen(false)}>
          <div
            className="modal-in absolute right-0 top-0 h-full w-[min(20rem,86vw)] bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 h-[4.25rem] border-b border-line">
              <span className="font-bold text-ink">Menyu</span>
              <button type="button" className="p-2 -mr-2 rounded-lg hover:bg-surface" onClick={() => setOpen(false)} aria-label="Menyuni yopish">
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-3" aria-label="Mobil menyu">
              {[...NAV, { href: '#rahbariyat', label: "Ma'muriyat" }, { href: '#kutubxona', label: 'Kutubxona' }, { href: '#galereya', label: 'Galereya' }].map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-3 text-[1.0625rem] text-ink hover:bg-brand-50"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="p-5 border-t border-line">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onContact();
                }}
                className="w-full py-3 rounded-lg bg-brand-800 text-white font-medium"
              >
                Murojaat yuborish
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </header>
  );
};

import React, { useState } from 'react';
import { Download, FileText, ImageIcon, Send, UtensilsCrossed } from 'lucide-react';
import { SITE } from '../config';
import { BOOKS, DAYS, GALLERY, MENU, NEWS, NewsItem } from '../data/school';
import { Container, SectionHead, Modal, TilePattern } from './ui';

export const Gallery: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  if (!GALLERY.length && !SITE.demo) return null;

  const slots = GALLERY.length ? GALLERY : Array.from({ length: 5 }, (_, i) => ({ src: '', caption: `Surat ${i + 1}` }));

  return (
    <section id="galereya" className="py-16 sm:py-20">
      <Container>
        <SectionHead title="Maktab hayotidan suratlar" intro="Binolar, sinfxonalar, tadbirlar." />
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[9rem] sm:auto-rows-[11rem] gap-3">
          {slots.map((p, i) => (
            <button
              key={i}
              type="button"
              disabled={!p.src}
              onClick={() => setOpen(i)}
              className={`relative overflow-hidden rounded-xl bg-lapis-50 text-left ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              } ${p.src ? 'cursor-zoom-in' : 'cursor-default'}`}
            >
              {p.src ? (
                <>
                  <img src={p.src} alt={p.caption} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 p-3 text-sm text-white bg-gradient-to-t from-black/60 to-transparent">
                    {p.caption}
                  </span>
                </>
              ) : (
                <>
                  <TilePattern className="absolute inset-0 text-lapis-800/10" size={32} />
                  <span className="absolute inset-0 grid place-items-center text-sm text-lapis-800/70">
                    <span className="flex flex-col items-center gap-1">
                      <ImageIcon size={22} />
                      {i === 0 ? "Haqiqiy surat qo'yiladi" : ''}
                    </span>
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
      </Container>
      {open !== null && GALLERY[open] && (
        <Modal open onClose={() => setOpen(null)} title={GALLERY[open].caption} wide>
          <img src={GALLERY[open].src} alt={GALLERY[open].caption} className="w-full rounded-lg" />
        </Modal>
      )}
    </section>
  );
};

export const Library: React.FC = () => {
  const grades = Array.from(new Set(BOOKS.map((b) => b.grade))).sort((a, b) => a - b);
  const [grade, setGrade] = useState<number | 'all'>('all');
  const list = BOOKS.filter((b) => grade === 'all' || b.grade === grade);

  return (
    <section id="kutubxona" className="py-16 sm:py-20 bg-surface border-y border-line">
      <Container>
        <SectionHead title="Elektron darsliklar" intro="Darsliklarni PDF shaklida yuklab olish mumkin." />
        <div className="flex gap-1.5 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-1 mb-6">
          {(['all', ...grades] as const).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGrade(g)}
              aria-pressed={grade === g}
              className={`shrink-0 px-3.5 py-2 rounded-full text-sm ${
                grade === g ? 'bg-lapis-800 text-white' : 'bg-white border border-line text-ink/80 hover:bg-lapis-50'
              }`}
            >
              {g === 'all' ? 'Hamma sinflar' : `${g}-sinf`}
            </button>
          ))}
        </div>
        <ul className="bg-white rounded-2xl border border-line divide-y divide-line">
          {list.map((b) => (
            <li key={`${b.title}-${b.grade}`} className="flex items-center gap-4 px-4 sm:px-5 py-4">
              <FileText size={22} className="shrink-0 text-firuza-600" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold">{b.title}</div>
                <div className="text-sm text-muted">{b.grade}-sinf, {b.subject}</div>
              </div>
              {b.url ? (
                <a
                  href={b.url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-lapis-50 text-lapis-800 hover:bg-lapis-100"
                >
                  <Download size={16} /> <span className="hidden sm:inline">Yuklab olish</span>
                </a>
              ) : (
                <span className="text-sm text-muted">Fayl qo'shilmagan</span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

const CAT_STYLE: Record<NewsItem['category'], string> = {
  "E'lon": 'bg-lapis-50 text-lapis-800',
  Tadbir: 'bg-firuza-100 text-firuza-600',
  Yutuq: 'bg-[#fbefd2] text-[#7a5200]',
};

export const News: React.FC = () => {
  const [open, setOpen] = useState<NewsItem | null>(null);
  const [first, ...rest] = NEWS;

  return (
    <section id="yangiliklar" className="py-16 sm:py-20">
      <Container>
        <SectionHead
          title="Yangiliklar va e'lonlar"
          action={
            SITE.telegram ? (
              <a
                href={`https://t.me/${SITE.telegram}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-lapis-800 hover:underline"
              >
                <Send size={16} /> Telegram kanalimiz
              </a>
            ) : undefined
          }
        />
        {!first ? (
          <p className="text-muted">Hozircha yangilik yo'q.</p>
        ) : (
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8">
            <article className="group">
              <button type="button" onClick={() => setOpen(first)} className="text-left w-full">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-lapis-800">
                  {first.photo ? (
                    <img src={first.photo} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <TilePattern className="absolute inset-0 text-firuza-300/25" size={48} />
                  )}
                </div>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  <span className={`px-2 py-0.5 rounded ${CAT_STYLE[first.category]}`}>{first.category}</span>
                  <span className="text-muted">{first.date}</span>
                </div>
                <h3 className="mt-2 text-xl sm:text-2xl font-semibold group-hover:text-lapis-700">{first.title}</h3>
                <p className="mt-2 text-ink/75">{first.summary}</p>
              </button>
            </article>
            <ul className="divide-y divide-line border-y border-line self-start">
              {rest.map((n) => (
                <li key={n.title}>
                  <button type="button" onClick={() => setOpen(n)} className="group text-left w-full py-5">
                    <div className="flex items-center gap-3 text-sm">
                      <span className={`px-2 py-0.5 rounded ${CAT_STYLE[n.category]}`}>{n.category}</span>
                      <span className="text-muted">{n.date}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-lapis-700">{n.title}</h3>
                    <p className="mt-1 text-[0.9375rem] text-ink/70 line-clamp-2">{n.summary}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title ?? ''} wide>
        {open && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <span className={`px-2 py-0.5 rounded ${CAT_STYLE[open.category]}`}>{open.category}</span>
              <span className="text-muted">{open.date}</span>
            </div>
            {open.photo && <img src={open.photo} alt="" className="w-full rounded-lg" />}
            <p className="font-medium">{open.summary}</p>
            <p className="text-ink/80 whitespace-pre-line">{open.content}</p>
          </div>
        )}
      </Modal>
    </section>
  );
};

export const Canteen: React.FC = () => {
  const today = new Date().getDay();
  const [i, setI] = useState(today >= 1 && today <= 6 ? today - 1 : 0);
  const day = MENU[i];
  if (!day) return null;
  return (
    <section id="oshxona" className="py-14 bg-paxsa-100 border-y border-paxsa-300/70">
      <Container className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-3">
            <UtensilsCrossed size={24} className="text-firuza-600" /> Oshxona taomnomasi
          </h2>
          <p className="mt-2 text-ink/75">Bu hafta o'quvchilarga beriladigan issiq ovqat.</p>
          <div className="mt-5 flex gap-1 overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0 pb-1">
            {MENU.map((m, idx) => (
              <button
                key={m.day}
                type="button"
                onClick={() => setI(idx)}
                aria-pressed={i === idx}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-sm ${
                  i === idx ? 'bg-lapis-800 text-white' : 'hover:bg-white/70'
                }`}
              >
                {DAYS.includes(m.day) ? m.day.slice(0, 3) : m.day}
              </button>
            ))}
          </div>
        </div>
        <ul className="bg-white rounded-2xl border border-paxsa-300/70 divide-y divide-line">
          {day.items.map((it, k) => (
            <li key={k} className="px-5 py-3.5 flex items-center gap-3">
              <span className="octagon w-2.5 h-2.5 bg-firuza-500" />
              {it}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

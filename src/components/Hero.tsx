import React, { useEffect, useState } from 'react';
import { CalendarDays, Bell, GraduationCap, Phone } from 'lucide-react';
import { SITE } from '../config';
import { BELLS, HERO_PHOTO } from '../data/school';
import { Container } from './ui';

// ------------------------------------------------------------
// "Bugun maktabda" — qo'ng'iroqlar jadvalidan hozirgi holatni hisoblaydi
// ------------------------------------------------------------
const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];
const WEEKDAYS = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

const toMin = (t: string) => {
  const [h, m] = t.trim().split(':').map(Number);
  return h * 60 + m;
};
const parseRange = (r: string) => {
  const [a, b] = r.split(/[–-]/);
  return { start: toMin(a), end: toMin(b), startLabel: a.trim(), endLabel: b.trim() };
};

type Status = { title: string; detail: string; progress: number; active: boolean };

function shiftStatus(key: 'shift1' | 'shift2', now: Date): Status {
  if (now.getDay() === 0) return { title: 'Dam olish kuni', detail: 'Darslar dushanba kuni', progress: 0, active: false };
  const lessons = BELLS.map((b) => parseRange(b[key]));
  const m = now.getHours() * 60 + now.getMinutes();
  const first = lessons[0];
  const last = lessons[lessons.length - 1];

  if (m < first.start) return { title: 'Darslar hali boshlanmagan', detail: `1-dars ${first.startLabel} da`, progress: 0, active: false };
  if (m >= last.end) {
    const when = now.getDay() === 6 ? 'Dushanba' : 'Ertaga';
    return { title: 'Darslar tugadi', detail: `${when} ${first.startLabel} da`, progress: 1, active: false };
  }

  const total = last.end - first.start;
  const progress = (m - first.start) / total;
  for (let i = 0; i < lessons.length; i++) {
    const l = lessons[i];
    if (m >= l.start && m < l.end) {
      const left = l.end - m;
      return { title: `${i + 1}-dars ketmoqda`, detail: `${l.endLabel} da tugaydi, ${left} daqiqa qoldi`, progress, active: true };
    }
    const next = lessons[i + 1];
    if (next && m >= l.end && m < next.start) {
      return { title: 'Tanaffus', detail: `${i + 2}-dars ${next.startLabel} da`, progress, active: true };
    }
  }
  return { title: '', detail: '', progress, active: false };
}

const useNow = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  return now;
};

const TodayCard: React.FC = () => {
  const now = useNow();
  const shifts: { label: string; key: 'shift1' | 'shift2'; time: string }[] = [
    { label: SITE.shifts[0]?.name ?? '1-smena', key: 'shift1', time: SITE.shifts[0]?.time ?? '' },
    { label: SITE.shifts[1]?.name ?? '2-smena', key: 'shift2', time: SITE.shifts[1]?.time ?? '' },
  ];
  return (
    <div className="bg-white rounded-3xl border border-line shadow-[0_24px_60px_-28px_rgba(19,36,107,.35)] p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm text-muted">Bugun maktabda</div>
          <div className="text-lg font-bold">
            {WEEKDAYS[now.getDay()]}, {now.getDate()}-{MONTHS[now.getMonth()]}
          </div>
        </div>
        <span className="inline-flex items-center gap-2 text-sm text-accent-600 bg-accent-100 px-3 py-1 rounded-full font-medium tabular-nums">
          <span className="live-dot w-2 h-2 rounded-full bg-accent-500" />
          {String(now.getHours()).padStart(2, '0')}:{String(now.getMinutes()).padStart(2, '0')}
        </span>
      </div>

      <ul className="mt-6 space-y-5">
        {shifts.map((s) => {
          const st = shiftStatus(s.key, now);
          return (
            <li key={s.key}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium">{s.label}</span>
                <span className="text-muted tabular-nums">{s.time}</span>
              </div>
              <div className="mt-1.5 text-[1.0625rem] font-semibold">{st.title}</div>
              <div className="text-sm text-muted">{st.detail}</div>
              <div className="mt-2.5 h-2 rounded-full bg-brand-50 overflow-hidden" aria-hidden="true">
                <div
                  className={`h-full rounded-full transition-[width] duration-700 ${st.active ? 'bg-brand-800' : 'bg-brand-100'}`}
                  style={{ width: `${Math.round(st.progress * 100)}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <a href="#qongiroqlar" className="mt-6 inline-flex text-sm font-medium text-brand-800 hover:underline">
        Qo'ng'iroqlar jadvali
      </a>
    </div>
  );
};

export const Hero: React.FC<{ onContact: () => void }> = ({ onContact }) => (
  <section className="relative overflow-hidden bg-surface">
    <div
      aria-hidden="true"
      className="absolute -top-40 -right-40 w-[42rem] h-[42rem] rounded-full bg-[radial-gradient(closest-side,var(--color-brand-100),transparent)]"
    />
    <Container className="relative grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-center py-14 sm:py-20 lg:py-24">
      <div>
        <p className="rise text-muted font-medium" style={{ animationDelay: '0.05s' }}>
          {SITE.region}, {SITE.district}
        </p>
        <h1
          className="rise mt-3 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.5rem] text-ink"
          style={{ animationDelay: '0.12s' }}
        >
          {SITE.number}-sonli maktab
        </h1>
        <p className="rise mt-5 text-lg sm:text-xl text-ink/70 max-w-xl" style={{ animationDelay: '0.2s' }}>
          Umumiy o'rta ta'lim maktabi. Dars jadvali, o'qituvchilar, to'garaklar va e'lonlar shu yerda. Savolingiz
          bo'lsa, ma'muriyatga onlayn yozing.
        </p>
        <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '0.28s' }}>
          <a
            href="#dars-jadvali"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-brand-800 hover:bg-brand-700 text-white font-semibold"
          >
            <CalendarDays size={18} /> Dars jadvali
          </a>
          <button
            type="button"
            onClick={onContact}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-line hover:border-brand-100 hover:bg-brand-50 font-semibold"
          >
            Maktabga murojaat
          </button>
        </div>
      </div>

      <div className="rise relative" style={{ animationDelay: '0.3s' }}>
        {HERO_PHOTO ? (
          <div className="relative">
            <img src={HERO_PHOTO} alt={`${SITE.shortName} binosi`} className="w-full aspect-[4/3] object-cover rounded-3xl" />
            <div className="relative -mt-24 mx-4 sm:mx-6">
              <TodayCard />
            </div>
          </div>
        ) : (
          <TodayCard />
        )}
      </div>
    </Container>
  </section>
);

const QUICK = [
  { href: '#dars-jadvali', icon: CalendarDays, title: 'Dars jadvali', text: 'Sinf va kunni tanlang' },
  { href: '#qongiroqlar', icon: Bell, title: "Qo'ng'iroqlar", text: 'Darslar va tanaffuslar vaqti' },
  { href: '#qabul', icon: GraduationCap, title: '1-sinfga qabul', text: 'Ariza qanday topshiriladi' },
  { href: '#aloqa', icon: Phone, title: "Bog'lanish", text: 'Telefon, manzil, xarita' },
];

export const QuickLinks: React.FC = () => (
  <section aria-label="Tezkor havolalar" className="bg-white border-b border-line">
    <Container className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-6">
      {QUICK.map(({ href, icon: Icon, title, text }) => (
        <a
          key={href}
          href={href}
          className="group flex items-start gap-3 p-4 rounded-2xl hover:bg-brand-50 transition-colors"
        >
          <span className="w-11 h-11 shrink-0 grid place-items-center rounded-xl bg-brand-50 text-brand-800 group-hover:bg-brand-800 group-hover:text-white transition-colors">
            <Icon size={20} />
          </span>
          <span>
            <span className="block font-semibold text-ink">{title}</span>
            <span className="block text-sm text-muted">{text}</span>
          </span>
        </a>
      ))}
    </Container>
  </section>
);

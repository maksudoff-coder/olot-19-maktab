import React from 'react';
import { CalendarDays, Bell, GraduationCap, Phone } from 'lucide-react';
import { SITE } from '../config';
import { HERO_PHOTO } from '../data/school';
import { Container, Emblem, TilePattern } from './ui';

export const Hero: React.FC<{ onContact: () => void }> = ({ onContact }) => (
  <section className="relative overflow-hidden bg-lapis-900 text-white">
    <TilePattern className="absolute inset-0 text-firuza-300/[0.09]" size={64} />
    <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-lapis-950/50 to-transparent hidden lg:block" />

    <Container className="relative grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-end pt-12 sm:pt-16 lg:pt-20">
      <div className="pb-12 lg:pb-20">
        <p className="rise text-firuza-300 font-medium" style={{ animationDelay: '0.05s' }}>
          {SITE.region}, {SITE.district}
        </p>
        <h1
          className="rise mt-4 text-[2.25rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem] font-semibold"
          style={{ animationDelay: '0.12s' }}
        >
          {SITE.number}-sonli umumiy o'rta ta'lim maktabi
        </h1>
        <p className="rise mt-6 text-lg text-lapis-100/85 max-w-xl" style={{ animationDelay: '0.2s' }}>
          Dars jadvali, qo'ng'iroqlar vaqti, o'qituvchilar va to'garaklar haqida ma'lumot. Savolingiz bo'lsa, maktab
          ma'muriyatiga shu yerdan yozing.
        </p>

        <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: '0.28s' }}>
          <a
            href="#dars-jadvali"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-firuza-500 hover:bg-firuza-600 text-white font-medium"
          >
            <CalendarDays size={18} /> Dars jadvalini ko'rish
          </a>
          <button
            type="button"
            onClick={onContact}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/35 hover:bg-white/10 font-medium"
          >
            Maktabga murojaat
          </button>
        </div>

        <dl className="rise mt-10 grid grid-cols-2 gap-px max-w-md rounded-xl overflow-hidden bg-white/15" style={{ animationDelay: '0.36s' }}>
          {SITE.shifts.map((s) => (
            <div key={s.name} className="bg-lapis-900/90 px-4 py-3">
              <dt className="text-sm text-lapis-100/70">{s.name}</dt>
              <dd className="font-display font-medium tabular-nums mt-0.5">{s.time}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Peshtoq ramkasidagi surat yoki maktab belgisi */}
      <div className="arch-in relative mx-auto w-full max-w-[17rem] sm:max-w-[22rem] lg:max-w-none self-end">
        <div className="arch relative aspect-[4/5] overflow-hidden border-[10px] border-b-0 border-paxsa-300 bg-paxsa-100">
          {HERO_PHOTO ? (
            <img src={HERO_PHOTO} alt={`${SITE.shortName} binosi`} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <>
              <TilePattern className="absolute inset-0 text-lapis-800/[0.13]" size={44} strokeWidth={1.4} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Emblem number={SITE.number} className="w-32 h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52 drop-shadow-[0_12px_24px_rgba(19,42,82,.3)]" />
                {SITE.demo && (
                  <span className="text-xs sm:text-sm text-center text-lapis-900 bg-white/80 px-3 py-1 rounded-full mx-4">
                    Bu yerga maktab binosining surati qo'yiladi
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Container>

    {/* G'isht frizi */}
    <div className="relative h-4 bg-paxsa-300 text-lapis-800/40">
      <TilePattern size={16} strokeWidth={1} />
    </div>
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
    <Container className="grid grid-cols-2 lg:grid-cols-4">
      {QUICK.map(({ href, icon: Icon, title, text }, i) => (
        <a
          key={href}
          href={href}
          className={`group flex items-start gap-3 py-5 sm:py-6 px-1 sm:px-4 ${i % 2 === 1 ? 'pl-4 border-l border-line' : ''} ${
            i >= 2 ? 'border-t lg:border-t-0 border-line' : ''
          } ${i === 2 ? 'lg:pl-4 lg:border-l' : ''}`}
        >
          <span className="octagon w-10 h-10 shrink-0 grid place-items-center bg-firuza-100 text-firuza-600 group-hover:bg-firuza-500 group-hover:text-white transition-colors">
            <Icon size={19} />
          </span>
          <span>
            <span className="block font-semibold text-ink group-hover:text-lapis-800">{title}</span>
            <span className="block text-sm text-muted">{text}</span>
          </span>
        </a>
      ))}
    </Container>
  </section>
);

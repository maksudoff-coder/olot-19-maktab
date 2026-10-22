import React from 'react';
import { ExternalLink, Phone, School, UserRound } from 'lucide-react';
import { SITE } from '../config';
import { ABOUT_TEXT, LEADERSHIP, STATS } from '../data/school';
import { Container, SectionHead, show, initials, Missing } from './ui';

export const About: React.FC = () => {
  const facts = [
    { label: 'Tashkil topgan', value: STATS.founded, unit: '-yil' },
    { label: "O'quvchilar", value: STATS.students, unit: '' },
    { label: 'Pedagoglar', value: STATS.teachers, unit: '' },
    { label: 'Sinflar', value: STATS.classes, unit: '' },
  ];
  return (
    <section id="maktab-haqida" className="py-16 sm:py-20">
      <Container className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
        <div>
          <h2 className="text-2xl sm:text-[2rem] leading-tight font-semibold">Maktab haqida</h2>
          <div className="mt-6 space-y-4 text-[1.0625rem] text-ink/85 max-w-[65ch]">
            {ABOUT_TEXT.map((p, i) => (
              <p key={i} className={SITE.demo ? 'bg-[#fff8e6] border border-dashed border-oltin-500/50 rounded-lg px-3 py-2 text-[#5c4400]' : ''}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <dl className="grid grid-cols-2 border border-line rounded-2xl overflow-hidden">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`p-6 ${i % 2 === 1 ? 'border-l border-line' : ''} ${i >= 2 ? 'border-t border-line' : ''}`}
            >
              <dt className="text-sm text-muted">{f.label}</dt>
              <dd className="mt-2 font-display text-3xl font-semibold text-lapis-800 tabular-nums">
                {f.value !== null ? (
                  <>
                    {f.value}
                    {f.unit && <span className="text-base font-medium text-muted">{f.unit}</span>}
                  </>
                ) : (
                  <Missing />
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
};

export const Admission: React.FC = () => (
  <section id="qabul" className="bg-paxsa-100 border-y border-paxsa-300/70">
    <Container className="py-12 grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center">
      <span className="octagon w-16 h-16 grid place-items-center bg-lapis-800 text-paxsa-100">
        <School size={28} />
      </span>
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold">1-sinfga qabul</h2>
        <p className="mt-2 text-ink/80 max-w-[62ch]">
          2026-yilda ariza 135 ta tuman va shaharda davlat portali orqali onlayn topshiriladi (OneID kerak). Tumaningiz
          ro'yxatda bo'lmasa, hujjatlarni maktabga o'zingiz olib kelasiz. Qaysi tartib amal qilishini maktabdan so'rang.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row md:flex-col gap-2">
        <a
          href={SITE.firstGrade.portalUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-lapis-800 hover:bg-lapis-700 text-white font-medium"
        >
          my.gov.uz orqali ariza <ExternalLink size={16} />
        </a>
        <a
          href={SITE.firstGrade.altPortalUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-lapis-800/30 hover:bg-white text-lapis-900 font-medium"
        >
          my.maktab.uz <ExternalLink size={16} />
        </a>
      </div>
    </Container>
  </section>
);

export const Leadership: React.FC<{ onMessage: (to: string) => void }> = ({ onMessage }) => (
  <section id="rahbariyat" className="py-16 sm:py-20">
    <Container>
      <SectionHead
        title="Maktab ma'muriyati"
        intro="Har bir rahbarning qabul kunlari va xonasi. Kelishdan oldin telefon qilib yoki yozib qo'ying."
      />
      <ul className="border-t border-line">
        {LEADERSHIP.map((l, i) => (
          <li
            key={l.role}
            className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1.3fr_1fr_auto] gap-x-5 gap-y-3 items-center py-5 border-b border-line"
          >
            <span
              className={`octagon w-14 h-14 grid place-items-center font-display font-semibold ${
                i === 0 ? 'bg-lapis-800 text-white' : 'bg-lapis-50 text-lapis-800'
              }`}
            >
              {l.photo ? <img src={l.photo} alt="" className="w-full h-full object-cover" /> : l.name ? initials(l.name, l.role) : <UserRound size={24} />}
            </span>
            <div>
              <div className="text-sm text-firuza-600 font-medium">{l.role}</div>
              <div className="text-lg font-semibold mt-0.5">{show(l.name, false, 'F.I.Sh. kiritilmagan')}</div>
            </div>
            <div className="col-start-2 md:col-start-auto text-[0.9375rem] space-y-1">
              <div>
                <span className="text-muted">Qabul: </span>
                {show(l.receptionDays)}
              </div>
              <div className="flex flex-wrap gap-x-4">
                <span>
                  <span className="text-muted">Xona: </span>
                  {show(l.room)}
                </span>
                {l.phone && (
                  <a href={`tel:${l.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-1 text-lapis-800 hover:underline">
                    <Phone size={14} /> {l.phone}
                  </a>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onMessage(l.name ? `${l.role}: ${l.name}` : l.role)}
              className="col-start-2 md:col-start-auto justify-self-start md:justify-self-end px-4 py-2 rounded-lg text-sm font-medium text-lapis-800 bg-lapis-50 hover:bg-lapis-100"
            >
              Yozish
            </button>
          </li>
        ))}
      </ul>
    </Container>
  </section>
);

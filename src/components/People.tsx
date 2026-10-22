import React, { useMemo, useState } from 'react';
import { Search, Award, UserRound } from 'lucide-react';
import { ACHIEVEMENTS, CLUBS, DEPARTMENTS, INITIATIVES, TEACHERS, Department } from '../data/school';
import { Container, SectionHead, show, initials, Missing } from './ui';

export const Teachers: React.FC = () => {
  const [dept, setDept] = useState<Department | 'all'>('all');
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return TEACHERS.filter(
      (t) =>
        (dept === 'all' || t.department === dept) &&
        (!s || `${t.name ?? ''} ${t.subject}`.toLowerCase().includes(s)),
    );
  }, [dept, q]);

  return (
    <section id="oqituvchilar" className="py-16 sm:py-20">
      <Container>
        <SectionHead title="O'qituvchilar" intro="Fan yoki ism bo'yicha qidiring." />

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <div className="flex gap-1.5 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-1 md:flex-wrap">
            {[{ id: 'all' as const, label: 'Hammasi' }, ...DEPARTMENTS].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDept(d.id)}
                aria-pressed={dept === d.id}
                className={`shrink-0 px-3.5 py-2 rounded-full text-sm ${
                  dept === d.id ? 'bg-brand-800 text-white' : 'bg-surface text-ink/80 hover:bg-brand-50'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <label className="relative md:ml-auto md:w-64">
            <span className="sr-only">Qidirish</span>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Masalan, matematika"
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-line bg-white text-[0.9375rem] focus:outline-none focus:border-accent-500"
            />
          </label>
        </div>

        {list.length ? (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
            {list.map((t, i) => (
              <li key={i} className="flex items-center gap-4 py-4 border-b border-line">
                <span className="rounded-xl w-14 h-14 shrink-0 grid place-items-center bg-accent-100 text-accent-600 font-display font-semibold overflow-hidden">
                  {t.photo ? <img src={t.photo} alt="" className="w-full h-full object-cover" /> : t.name ? initials(t.name, t.subject) : <UserRound size={24} />}
                </span>
                <div className="min-w-0">
                  <div className="font-semibold leading-snug">{show(t.name, false, 'F.I.Sh. kiritilmagan')}</div>
                  <div className="text-[0.9375rem] text-brand-800">{t.subject}</div>
                  <div className="text-sm text-muted">
                    {[t.category, t.experience ? `${t.experience} yil tajriba` : null].filter(Boolean).join(', ') || <Missing label="toifa, tajriba" />}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-10 text-center text-muted">
            "{q}" bo'yicha hech kim topilmadi.{' '}
            <button type="button" className="text-brand-800 underline" onClick={() => { setQ(''); setDept('all'); }}>
              Filtrni tozalash
            </button>
          </p>
        )}
      </Container>
    </section>
  );
};

export const Clubs: React.FC<{ onJoin: (club: string) => void }> = ({ onJoin }) => (
  <section id="togaraklar" className="py-16 sm:py-20 bg-surface border-y border-line">
    <Container>
      <SectionHead
        title="To'garaklar"
        intro={`"Besh muhim tashabbus" doirasida darsdan keyin ishlaydigan to'garaklar. Farzandingizni yozdirish uchun "Yozilish"ni bosing.`}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CLUBS.map((c) => (
          <article key={c.title} className="bg-white rounded-2xl border border-line p-6 flex flex-col">
            <div className="flex items-center gap-2 text-sm text-accent-600">
              <span className="rounded-xl w-6 h-6 grid place-items-center bg-accent-600 text-white text-xs font-display font-semibold">
                {c.initiative}
              </span>
              {INITIATIVES[c.initiative]}
            </div>
            <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-ink/75 flex-1">{c.description}</p>
            <dl className="mt-4 text-sm space-y-1">
              <div><dt className="inline text-muted">Rahbar: </dt><dd className="inline">{show(c.mentor)}</dd></div>
              <div><dt className="inline text-muted">Vaqti: </dt><dd className="inline">{show(c.schedule)}</dd></div>
            </dl>
            <button
              type="button"
              onClick={() => onJoin(c.title)}
              className="mt-5 self-start px-4 py-2 rounded-lg text-sm font-medium bg-accent-100 text-accent-600 hover:bg-accent-500 hover:text-white"
            >
              Yozilish
            </button>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

const MEDAL = {
  gold: 'var(--color-oltin-500)',
  silver: 'var(--color-kumush-400)',
  bronze: 'var(--color-bronza-500)',
};

export const Achievements: React.FC = () => (
  <section id="yutuqlar" className="relative overflow-hidden py-16 sm:py-20 bg-brand-950 text-white">
    <Container className="relative">
      <SectionHead dark title="O'quvchilarimiz yutuqlari" intro="Olimpiada, tanlov va musobaqalarda o'rin olganlar." />
      <ul className="grid md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
        {ACHIEVEMENTS.map((a, i) => (
          <li key={i} className="bg-brand-950/95 p-6">
            <div className="flex items-center gap-3">
              <span
                className="rounded-xl w-11 h-11 grid place-items-center text-brand-950"
                style={{ background: a.medal ? MEDAL[a.medal] : 'var(--color-accent-300)' }}
              >
                <Award size={20} />
              </span>
              <div>
                <div className="font-display font-semibold text-lg">{a.place}</div>
                <div className="text-sm text-brand-100/60">{a.year}</div>
              </div>
            </div>
            <p className="mt-4 text-brand-100/90">{a.event}</p>
            <p className="mt-3 text-sm">
              {show(a.student, true, "o'quvchi")}
              {a.grade && <span className="text-brand-100/60">, {a.grade}</span>}
            </p>
          </li>
        ))}
      </ul>
    </Container>
  </section>
);

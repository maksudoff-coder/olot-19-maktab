import React, { useState } from 'react';
import { Printer } from 'lucide-react';
import { BELLS, DAYS, TIMETABLE } from '../data/school';
import { Container, SectionHead, Missing } from './ui';

const todayName = () => {
  const d = new Date().getDay(); // 0 = yakshanba
  return d >= 1 && d <= 6 ? DAYS[d - 1] : DAYS[0];
};

export const Timetable: React.FC = () => {
  const classes = Object.keys(TIMETABLE);
  const [cls, setCls] = useState(classes[0]);
  const [day, setDay] = useState(todayName);
  const lessons = TIMETABLE[cls]?.find((d) => d.day === day)?.lessons ?? [];

  const print = () => {
    document.body.classList.add('print-timetable');
    window.print();
    setTimeout(() => document.body.classList.remove('print-timetable'), 500);
  };

  return (
    <section id="dars-jadvali" className="py-16 sm:py-20 bg-surface border-y border-line">
      <Container>
        <SectionHead
          title="Dars jadvali"
          intro="Sinfni va hafta kunini tanlang. Bugungi kun avtomatik ochiladi."
          action={
            <button
              type="button"
              onClick={print}
              className="no-print inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-line bg-white hover:bg-lapis-50 text-sm font-medium"
            >
              <Printer size={16} /> Chop etish
            </button>
          }
        />

        <div className="grid lg:grid-cols-[1fr_20rem] gap-8 items-start">
          <div className="bg-white rounded-2xl border border-line overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-line space-y-4">
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Sinf">
                <span className="text-sm text-muted mr-1">Sinf:</span>
                {classes.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCls(c)}
                    aria-pressed={cls === c}
                    className={`min-w-14 px-3 py-2 rounded-lg text-sm font-semibold font-display ${
                      cls === c ? 'bg-lapis-800 text-white' : 'bg-lapis-50 text-lapis-800 hover:bg-lapis-100'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex gap-1 overflow-x-auto -mx-1 px-1 pb-1" role="tablist" aria-label="Hafta kuni">
                {DAYS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    role="tab"
                    aria-selected={day === d}
                    onClick={() => setDay(d)}
                    className={`shrink-0 px-3.5 py-2 rounded-lg text-sm ${
                      day === d ? 'bg-firuza-500 text-white font-medium' : 'text-ink/75 hover:bg-surface'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {lessons.length ? (
              <ol>
                {lessons.map((l, i) => {
                  const bell = BELLS[i];
                  return (
                    <li key={i} className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[2.5rem_1fr_auto] gap-x-4 gap-y-1 px-4 sm:px-5 py-4 border-b border-line last:border-0">
                      <span className="row-span-2 sm:row-span-1 font-display font-semibold text-lapis-800 text-lg tabular-nums pt-0.5">{i + 1}</span>
                      <div>
                        <div className="font-semibold">{l.subject}</div>
                        <div className="text-sm text-muted mt-0.5">
                          {l.teacher ?? <Missing label="o'qituvchi kiritilmagan" />}
                          {l.room && <span>, {l.room}</span>}
                        </div>
                      </div>
                      <div className="text-sm text-muted tabular-nums sm:text-right sm:pt-0.5">{bell?.shift1}</div>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <p className="px-5 py-10 text-center text-muted">
                {cls} sinfi uchun {day.toLowerCase()} kuni jadvali hali kiritilmagan.
              </p>
            )}
          </div>

          <aside id="qongiroqlar" className="bg-white rounded-2xl border border-line">
            <h3 className="px-5 pt-5 pb-3 text-lg font-semibold">Qo'ng'iroqlar</h3>
            <table className="w-full text-sm tabular-nums">
              <thead>
                <tr className="text-muted text-left border-y border-line">
                  <th className="font-normal py-2 pl-5 pr-2">Dars</th>
                  <th className="font-normal py-2 px-2">1-smena</th>
                  <th className="font-normal py-2 pl-2 pr-5">2-smena</th>
                </tr>
              </thead>
              <tbody>
                {BELLS.map((b) => (
                  <tr key={b.period} className="border-b border-line last:border-0">
                    <td className="py-2.5 pl-5 pr-2 font-display font-semibold text-lapis-800">{b.period}</td>
                    <td className="py-2.5 px-2">{b.shift1}</td>
                    <td className="py-2.5 pl-2 pr-5">{b.shift2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-5 py-4 text-sm text-muted border-t border-line">Har bir dars 45 daqiqa.</p>
          </aside>
        </div>
      </Container>
    </section>
  );
};

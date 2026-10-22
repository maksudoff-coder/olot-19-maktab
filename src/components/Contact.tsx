import React from 'react';
import { Clock, Mail, MapPin, Phone, Send, ExternalLink } from 'lucide-react';
import { SITE } from '../config';
import { Container, SectionHead, Emblem, show, TilePattern } from './ui';

const tel = (p: string) => `tel:${p.replace(/[^\d+]/g, '')}`;

const mapSrc = () => {
  const q = SITE.coordinates ? `${SITE.coordinates.lat},${SITE.coordinates.lng}` : SITE.mapFallbackQuery;
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${SITE.coordinates ? 16 : 13}&output=embed`;
};
const mapLink = () => {
  const q = SITE.coordinates ? `${SITE.coordinates.lat},${SITE.coordinates.lng}` : SITE.mapFallbackQuery;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
};

export const Contact: React.FC<{ onContact: () => void }> = ({ onContact }) => (
  <section id="aloqa" className="py-16 sm:py-20">
    <Container>
      <SectionHead title="Bog'lanish" intro="Qo'ng'iroq qiling, yozing yoki maktabga keling." />
      <div className="grid lg:grid-cols-[1fr_1.35fr] gap-8">
        <dl className="space-y-6">
          <Row icon={MapPin} label="Manzil">
            {show(SITE.address)}
            {SITE.landmark && <div className="text-sm text-muted mt-1">Mo'ljal: {SITE.landmark}</div>}
          </Row>
          <Row icon={Phone} label="Telefon">
            {SITE.phone ? (
              <a href={tel(SITE.phone)} className="text-lg font-semibold text-lapis-800 hover:underline tabular-nums">
                {SITE.phone}
              </a>
            ) : (
              show(null)
            )}
            {SITE.phoneSecondary && (
              <a href={tel(SITE.phoneSecondary)} className="block text-lapis-800 hover:underline tabular-nums">
                {SITE.phoneSecondary}
              </a>
            )}
          </Row>
          <Row icon={Mail} label="Elektron pochta">
            {SITE.email ? (
              <a href={`mailto:${SITE.email}`} className="text-lapis-800 hover:underline break-all">
                {SITE.email}
              </a>
            ) : (
              show(null)
            )}
          </Row>
          <Row icon={Send} label="Telegram">
            {SITE.telegram ? (
              <a href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noreferrer" className="text-lapis-800 hover:underline">
                @{SITE.telegram}
              </a>
            ) : (
              show(null)
            )}
          </Row>
          <Row icon={Clock} label="Ish vaqti">
            {SITE.workingHours}
            <div className="text-sm text-muted">Yakshanba dam olish kuni</div>
          </Row>
          <button
            type="button"
            onClick={onContact}
            className="w-full sm:w-auto px-5 py-3 rounded-lg bg-lapis-800 hover:bg-lapis-700 text-white font-medium"
          >
            Murojaat yuborish
          </button>
        </dl>

        <div className="relative rounded-2xl overflow-hidden border border-line bg-surface min-h-[22rem]">
          <iframe
            title={`${SITE.shortName} xaritada`}
            src={mapSrc()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full border-0"
          />
          <div className="absolute left-3 right-3 bottom-3 flex flex-wrap items-center justify-between gap-2">
            {!SITE.coordinates && SITE.demo && (
              <span className="text-sm bg-[#fff3cd] text-[#5c4400] px-3 py-1.5 rounded-lg shadow">
                Maktabning aniq joyi hali belgilanmagan
              </span>
            )}
            <a
              href={mapLink()}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium bg-white px-3 py-1.5 rounded-lg shadow hover:bg-lapis-50"
            >
              Xaritada ochish <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

const Row: React.FC<{ icon: React.ElementType; label: string; children: React.ReactNode }> = ({ icon: Icon, label, children }) => (
  <div className="flex gap-4">
    <span className="octagon w-10 h-10 shrink-0 grid place-items-center bg-lapis-50 text-lapis-800">
      <Icon size={18} />
    </span>
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  </div>
);

const LINKS = [
  { href: 'https://gov.uz/oz/uzedu', label: "Maktabgacha va maktab ta'limi vazirligi" },
  { href: 'https://my.maktab.uz', label: 'my.maktab.uz' },
  { href: 'https://my.gov.uz', label: 'Davlat xizmatlari portali' },
];

export const Footer: React.FC = () => (
  <footer className="relative overflow-hidden bg-lapis-950 text-lapis-100/80">
    <div className="h-4 bg-paxsa-300 text-lapis-800/40">
      <TilePattern size={16} strokeWidth={1} />
    </div>
    <Container className="py-12 grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
      <div className="flex gap-4">
        <Emblem number={SITE.number} tone="light" className="w-12 h-12 shrink-0" />
        <div>
          <div className="font-display font-semibold text-white">{SITE.shortName}</div>
          <p className="mt-2 text-sm max-w-xs">{SITE.fullName}</p>
        </div>
      </div>
      <nav aria-label="Bo'limlar" className="text-sm">
        <div className="text-white font-medium mb-3">Bo'limlar</div>
        <ul className="space-y-2">
          {[
            ['#maktab-haqida', 'Maktab haqida'],
            ['#dars-jadvali', 'Dars jadvali'],
            ['#oqituvchilar', "O'qituvchilar"],
            ['#kutubxona', 'Elektron darsliklar'],
            ['#aloqa', "Bog'lanish"],
          ].map(([h, l]) => (
            <li key={h}>
              <a href={h} className="hover:text-white">{l}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="text-sm">
        <div className="text-white font-medium mb-3">Foydali havolalar</div>
        <ul className="space-y-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer" className="hover:text-white inline-flex items-center gap-1">
                {l.label} <ExternalLink size={12} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
    <div className="border-t border-white/10">
      <Container className="py-5 text-sm flex flex-wrap justify-between gap-2">
        <span>© {new Date().getFullYear()} {SITE.shortName}</span>
        <span>{SITE.ministry} tizimida</span>
      </Container>
    </div>
  </footer>
);

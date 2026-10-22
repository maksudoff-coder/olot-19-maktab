import React, { useEffect, useState } from 'react';
import { CheckCircle2, Phone, Send } from 'lucide-react';
import { SITE } from '../config';
import { Modal, Missing } from './ui';

export type RequestType = 'Murojaat' | "To'garakka yozilish" | 'Taklif yoki savol';
const TYPES: RequestType[] = ['Murojaat', "To'garakka yozilish", 'Taklif yoki savol'];

type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'done'; code?: string } | { kind: 'error'; message: string };

export const ContactModal: React.FC<{
  open: boolean;
  onClose: () => void;
  type: RequestType;
  subject: string;
}> = ({ open, onClose, type: initialType, subject: initialSubject }) => {
  const [type, setType] = useState<RequestType>(initialType);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [trap, setTrap] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });

  useEffect(() => {
    if (open) {
      setType(initialType);
      setSubject(initialSubject);
      setState({ kind: 'idle' });
    }
  }, [open, initialType, initialSubject]);

  const phoneDigits = phone.replace(/\D/g, '');
  const valid = name.trim().length >= 3 && phoneDigits.length === 12 && (type === "To'garakka yozilish" || message.trim().length >= 10);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || state.kind === 'sending') return;
    setState({ kind: 'sending' });
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        // text/plain — Google Apps Script CORS cheklovisiz qabul qiladi
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ type, name: name.trim(), phone: phone.trim(), subject: subject.trim(), message: message.trim(), website: trap }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) throw new Error(data.error || `HTTP ${res.status}`);
      setState({ kind: 'done', code: data.code });
      setName('');
      setPhone('+998 ');
      setMessage('');
    } catch {
      setState({
        kind: 'error',
        message: "Murojaat yuborilmadi: internet aloqasini tekshirib, qayta urinib ko'ring. Bo'lmasa, maktabga qo'ng'iroq qiling.",
      });
    }
  };

  const title = type === "To'garakka yozilish" ? "To'garakka yozilish" : 'Maktabga murojaat';

  if (!SITE.formEndpoint) {
    return (
      <Modal open={open} onClose={onClose} title={title}>
        <div className="space-y-4">
          <p>Onlayn murojaat hali ulanmagan. Hozircha maktabga qo'ng'iroq qiling yoki Telegram orqali yozing.</p>
          <div className="rounded-xl bg-surface p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-brand-800" />
              {SITE.phone ? <a className="font-semibold text-brand-800" href={`tel:${SITE.phone.replace(/[^\d+]/g, '')}`}>{SITE.phone}</a> : <Missing label="telefon kiritilmagan" />}
            </div>
            <div className="flex items-center gap-2">
              <Send size={16} className="text-brand-800" />
              {SITE.telegram ? <a className="text-brand-800" href={`https://t.me/${SITE.telegram}`}>@{SITE.telegram}</a> : <Missing label="Telegram kiritilmagan" />}
            </div>
          </div>
          {SITE.demo && (
            <p className="text-sm text-[#5c4400] bg-[#fff3cd] rounded-lg p-3">
              Sayt egasi uchun: forma ishlashi uchun <code>src/config.ts</code> faylida <code>formEndpoint</code> ni to'ldiring (README → "Murojaatlarni ulash").
            </p>
          )}
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} title={title}>
      {state.kind === 'done' ? (
        <div className="text-center py-6">
          <CheckCircle2 size={48} className="mx-auto text-accent-500" />
          <h4 className="mt-4 text-lg font-semibold">Murojaat yuborildi</h4>
          <p className="mt-2 text-ink/75">
            Maktab ma'muriyati ko'rsatilgan raqamga qo'ng'iroq qiladi.
            {state.code && (
              <>
                {' '}Murojaat raqami: <strong className="font-display">{state.code}</strong>
              </>
            )}
          </p>
          <button type="button" onClick={onClose} className="mt-6 px-5 py-2.5 rounded-lg bg-brand-800 text-white font-medium">
            Yopish
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <fieldset>
            <legend className="text-sm text-muted mb-2">Murojaat turi</legend>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <label
                  key={t}
                  className={`px-3 py-2 rounded-lg text-sm cursor-pointer border ${
                    type === t ? 'bg-brand-800 text-white border-brand-800' : 'border-line hover:bg-brand-50'
                  }`}
                >
                  <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} className="sr-only" />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <Field label={type === "To'garakka yozilish" ? "O'quvchining ismi va sinfi" : 'Ismingiz'}>
            <input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={120} className={inputCls} />
          </Field>
          <Field label="Telefon raqamingiz">
            <input
              required
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              maxLength={20}
              className={inputCls}
            />
            {phone.length > 5 && phoneDigits.length !== 12 && (
              <span className="block text-sm text-[#a33] mt-1">Raqamni to'liq yozing: +998 XX XXX-XX-XX</span>
            )}
          </Field>
          <Field label={type === "To'garakka yozilish" ? "To'garak" : 'Kimga yoki mavzu (ixtiyoriy)'}>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={160} className={inputCls} />
          </Field>
          <Field label={type === "To'garakka yozilish" ? 'Izoh (ixtiyoriy)' : 'Xabar'}>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} maxLength={2000} className={inputCls} />
          </Field>
          {/* Spam botlar uchun tuzoq — odamlar ko'rmaydi */}
          <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} className="hidden" aria-hidden="true" name="website" />

          {state.kind === 'error' && <p className="text-sm text-[#a33] bg-[#fdecec] rounded-lg p-3">{state.message}</p>}

          <button
            type="submit"
            disabled={!valid || state.kind === 'sending'}
            className="w-full py-3 rounded-lg bg-brand-800 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium"
          >
            {state.kind === 'sending' ? 'Yuborilmoqda…' : 'Murojaatni yuborish'}
          </button>
          <p className="text-xs text-muted">Ma'lumotlaringiz faqat maktab ma'muriyatiga yuboriladi.</p>
        </form>
      )}
    </Modal>
  );
};

const inputCls =
  'w-full px-3.5 py-2.5 rounded-lg border border-line bg-white text-[1rem] focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100';

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="block">
    <span className="block text-sm text-muted mb-1.5">{label}</span>
    {children}
  </label>
);

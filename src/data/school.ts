/**
 * MAKTAB MA'LUMOTLARI
 * ------------------------------------------------------------
 * Bu fayldagi hamma narsa NAMUNA. Saytni ishga tushirishdan oldin
 * har bir qatorni maktabdan olingan haqiqiy ma'lumot bilan almashtiring.
 *
 * - `null` qiymatlar saytda "kiritilmagan" bo'lib ko'rinadi.
 * - O'quvchilarning to'liq ismini faqat ota-onasi roziligi bilan yozing.
 * - O'qituvchilarning shaxsiy telefonlarini emas, maktab raqamini yozing.
 */

export type Department = 'boshlangich' | 'aniq' | 'tabiiy' | 'filologiya' | 'ijtimoiy' | 'sport_sanat';

export interface Leader {
  role: string;
  name: string | null;
  receptionDays: string | null;
  room: string | null;
  phone: string | null;
  photo?: string;
}

export interface Teacher {
  name: string | null;
  subject: string;
  department: Department;
  category: 'Oliy toifa' | '1-toifa' | '2-toifa' | 'Mutaxassis' | null;
  experience: number | null;
  photo?: string;
}

export interface Lesson { subject: string; teacher: string | null; room: string | null }
export interface DaySchedule { day: string; lessons: Lesson[] }

export interface Club {
  title: string;
  initiative: 1 | 2 | 3 | 4 | 5;
  mentor: string | null;
  schedule: string | null;
  description: string;
}

export interface Achievement {
  student: string | null;
  grade: string | null;
  event: string;
  place: string;
  medal: 'gold' | 'silver' | 'bronze' | null;
  year: string;
}

export interface Book { title: string; grade: number; subject: string; url: string | null }

export interface NewsItem {
  title: string;
  category: "E'lon" | 'Tadbir' | 'Yutuq';
  date: string;
  summary: string;
  content: string;
  photo?: string;
}

export interface Photo { src: string; caption: string }

// ------------------------------------------------------------
// Raqamlar (null — saytda "—" bo'lib chiqadi)
// ------------------------------------------------------------
export const STATS = {
  founded: null as number | null,          // tashkil topgan yil
  students: null as number | null,         // o'quvchilar soni
  teachers: null as number | null,         // pedagoglar soni
  classes: null as number | null,          // sinflar soni
};

/** Maktab haqida 2–3 jumla. TODO: maktab tarixi va yo'nalishi. */
export const ABOUT_TEXT: string[] = [
  "Bu yerga maktab haqida qisqacha yozing: qachon ochilgan, nechta bino, qaysi fanlar chuqurlashtirilgan, qanday an'analari bor.",
  "Ikkinchi xatboshida ota-onalar uchun muhim narsani ayting: masalan, to'garaklar, kompyuter xonasi, sport maydoni yoki bitiruvchilar qayerda o'qiyotgani.",
];

// ------------------------------------------------------------
// Rahbariyat
// ------------------------------------------------------------
export const LEADERSHIP: Leader[] = [
  { role: 'Maktab direktori', name: null, receptionDays: null, room: null, phone: null },
  { role: "O'quv ishlari bo'yicha direktor o'rinbosari", name: null, receptionDays: null, room: null, phone: null },
  { role: "Ma'naviy-ma'rifiy ishlar bo'yicha direktor o'rinbosari", name: null, receptionDays: null, room: null, phone: null },
  { role: 'Yoshlar yetakchisi', name: null, receptionDays: null, room: null, phone: null },
  { role: 'Amaliyotchi psixolog', name: null, receptionDays: null, room: null, phone: null },
];

// ------------------------------------------------------------
// O'qituvchilar
// ------------------------------------------------------------
export const DEPARTMENTS: { id: Department; label: string }[] = [
  { id: 'boshlangich', label: "Boshlang'ich sinflar" },
  { id: 'aniq', label: 'Aniq fanlar' },
  { id: 'tabiiy', label: 'Tabiiy fanlar' },
  { id: 'filologiya', label: 'Tillar' },
  { id: 'ijtimoiy', label: 'Ijtimoiy fanlar' },
  { id: 'sport_sanat', label: "Sport va san'at" },
];

export const TEACHERS: Teacher[] = [
  { name: null, subject: "Boshlang'ich ta'lim", department: 'boshlangich', category: null, experience: null },
  { name: null, subject: 'Matematika', department: 'aniq', category: null, experience: null },
  { name: null, subject: 'Informatika', department: 'aniq', category: null, experience: null },
  { name: null, subject: 'Fizika', department: 'aniq', category: null, experience: null },
  { name: null, subject: 'Kimyo', department: 'tabiiy', category: null, experience: null },
  { name: null, subject: 'Biologiya', department: 'tabiiy', category: null, experience: null },
  { name: null, subject: 'Ona tili va adabiyot', department: 'filologiya', category: null, experience: null },
  { name: null, subject: 'Ingliz tili', department: 'filologiya', category: null, experience: null },
  { name: null, subject: 'Tarix', department: 'ijtimoiy', category: null, experience: null },
  { name: null, subject: 'Jismoniy tarbiya', department: 'sport_sanat', category: null, experience: null },
];

// ------------------------------------------------------------
// Qo'ng'iroqlar va dars jadvali
// ------------------------------------------------------------
/** TODO: maktabdagi haqiqiy qo'ng'iroqlar vaqti */
export const BELLS = [
  { period: 1, shift1: '08:00 – 08:45', shift2: '13:15 – 14:00' },
  { period: 2, shift1: '08:50 – 09:35', shift2: '14:05 – 14:50' },
  { period: 3, shift1: '09:45 – 10:30', shift2: '15:00 – 15:45' },
  { period: 4, shift1: '10:35 – 11:20', shift2: '15:50 – 16:35' },
  { period: 5, shift1: '11:30 – 12:15', shift2: '16:45 – 17:30' },
  { period: 6, shift1: '12:20 – 13:05', shift2: '17:35 – 18:20' },
];

export const DAYS = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

/**
 * Sinf → kunlar. Har bir dars tartib bo'yicha (1-dars, 2-dars ...).
 * TODO: maktab jadvalidan ko'chiring. Hozir bitta namuna sinf bor.
 */
export const TIMETABLE: Record<string, DaySchedule[]> = {
  '5-A': [
    { day: 'Dushanba', lessons: [
      { subject: 'Matematika', teacher: null, room: null },
      { subject: 'Ona tili', teacher: null, room: null },
      { subject: 'Ingliz tili', teacher: null, room: null },
      { subject: 'Tarix', teacher: null, room: null },
      { subject: 'Jismoniy tarbiya', teacher: null, room: null },
    ]},
    { day: 'Seshanba', lessons: [
      { subject: 'Adabiyot', teacher: null, room: null },
      { subject: 'Matematika', teacher: null, room: null },
      { subject: 'Tabiiy fan', teacher: null, room: null },
      { subject: 'Informatika', teacher: null, room: null },
    ]},
  ],
};

// ------------------------------------------------------------
// To'garaklar — "Besh muhim tashabbus"
// ------------------------------------------------------------
export const INITIATIVES: Record<Club['initiative'], string> = {
  1: "Musiqa va san'at",
  2: 'Jismoniy tarbiya va sport',
  3: 'Kompyuter texnologiyalari',
  4: 'Kitobxonlik',
  5: 'Kasb-hunar',
};

export const CLUBS: Club[] = [
  { title: 'Yosh dasturchilar', initiative: 3, mentor: null, schedule: null, description: "To'garak nima bilan shug'ullanishini bir-ikki jumlada yozing." },
  { title: 'Shaxmat', initiative: 2, mentor: null, schedule: null, description: "To'garak nima bilan shug'ullanishini bir-ikki jumlada yozing." },
  { title: 'Kitobxonlar klubi', initiative: 4, mentor: null, schedule: null, description: "To'garak nima bilan shug'ullanishini bir-ikki jumlada yozing." },
  { title: 'Rassomlik', initiative: 1, mentor: null, schedule: null, description: "To'garak nima bilan shug'ullanishini bir-ikki jumlada yozing." },
  { title: 'Tikuvchilik', initiative: 5, mentor: null, schedule: null, description: "To'garak nima bilan shug'ullanishini bir-ikki jumlada yozing." },
];

// ------------------------------------------------------------
// Yutuqlar
// ------------------------------------------------------------
export const ACHIEVEMENTS: Achievement[] = [
  { student: null, grade: null, event: 'Fan olimpiadasi, viloyat bosqichi', place: '1-o\'rin', medal: 'gold', year: '2025/2026' },
  { student: null, grade: null, event: 'Fan olimpiadasi, tuman bosqichi', place: '2-o\'rin', medal: 'silver', year: '2025/2026' },
  { student: null, grade: null, event: 'Tanlov yoki musobaqa nomi', place: '3-o\'rin', medal: 'bronze', year: '2025/2026' },
];

// ------------------------------------------------------------
// Elektron kutubxona
// `url` — PDF faylning havolasi (public/kitoblar/ papkasiga qo'yib "/kitoblar/fayl.pdf"
// deb yozing yoki Google Drive havolasini qo'ying). null bo'lsa tugma o'chiq turadi.
// ------------------------------------------------------------
export const BOOKS: Book[] = [
  { title: 'Matematika', grade: 5, subject: 'Matematika', url: null },
  { title: 'Ona tili', grade: 5, subject: 'Ona tili', url: null },
  { title: 'Fizika', grade: 7, subject: 'Fizika', url: null },
  { title: 'Kimyo', grade: 8, subject: 'Kimyo', url: null },
  { title: 'Informatika', grade: 9, subject: 'Informatika', url: null },
  { title: "O'zbekiston tarixi", grade: 10, subject: 'Tarix', url: null },
];

// ------------------------------------------------------------
// Yangiliklar (eng yangisi birinchi)
// ------------------------------------------------------------
export const NEWS: NewsItem[] = [
  {
    title: 'Namuna: 1-sinfga qabul haqida e\'lon',
    category: "E'lon",
    date: '—',
    summary: "Bu yerga yangilikning bir jumlali qisqa mazmunini yozing.",
    content: "Yangilikning to'liq matni. Kim, nima, qachon, qayerda — ota-onalar bilishi kerak bo'lgan hamma narsa.",
  },
  {
    title: 'Namuna: maktabda o\'tgan tadbir',
    category: 'Tadbir',
    date: '—',
    summary: "Tadbir haqida qisqacha. Rasm qo'shilsa, kartochkada ko'rinadi.",
    content: "Tadbirning to'liq tavsifi.",
  },
  {
    title: "Namuna: o'quvchilar yutug'i",
    category: 'Yutuq',
    date: '—',
    summary: "Qaysi tanlovda, qaysi o'rin. O'quvchi ismi faqat ota-ona roziligi bilan.",
    content: "Yutuq haqida to'liq matn.",
  },
];

// ------------------------------------------------------------
// Oshxona taomnomasi. TODO: haqiqiy haftalik taomnoma
// ------------------------------------------------------------
export const MENU: { day: string; items: string[] }[] = [
  { day: 'Dushanba', items: ['Birinchi taom', 'Ikkinchi taom', 'Ichimlik', 'Non, meva'] },
  { day: 'Seshanba', items: ['Birinchi taom', 'Ikkinchi taom', 'Ichimlik', 'Non, meva'] },
  { day: 'Chorshanba', items: ['Birinchi taom', 'Ikkinchi taom', 'Ichimlik', 'Non, meva'] },
  { day: 'Payshanba', items: ['Birinchi taom', 'Ikkinchi taom', 'Ichimlik', 'Non, meva'] },
  { day: 'Juma', items: ['Birinchi taom', 'Ikkinchi taom', 'Ichimlik', 'Non, meva'] },
  { day: 'Shanba', items: ['Birinchi taom', 'Ikkinchi taom', 'Ichimlik', 'Non, meva'] },
];

// ------------------------------------------------------------
// Rasmlar
// Suratlarni public/rasmlar/ papkasiga qo'ying va bu yerga yozing:
//   { src: '/rasmlar/bino.webp', caption: 'Maktab binosi' }
// HERO_PHOTO — bosh sahifadagi katta surat (maktab binosi).
// ------------------------------------------------------------
export const HERO_PHOTO: string | null = null;
export const GALLERY: Photo[] = [];

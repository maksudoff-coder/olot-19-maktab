/**
 * SAYT SOZLAMALARI
 * ------------------------------------------------------------
 * Maktab haqidagi asosiy ma'lumotlar shu yerda. Har bir qiymatni
 * maktabdan olingan haqiqiy ma'lumot bilan almashtiring.
 * `null` yoki bo'sh qoldirilgan maydonlar saytda chiqmaydi
 * yoki "kiritilmagan" deb ko'rsatiladi.
 */

export const SITE = {
  /**
   * true — sayt tepasida "namunaviy ma'lumotlar" ogohlantirishi chiqadi.
   * Hamma ma'lumot haqiqiysi bilan almashtirilgach, false qiling.
   */
  demo: true,

  fullName: "Buxoro viloyati Olot tumani 19-sonli umumiy o'rta ta'lim maktabi",
  shortName: "Olot tumani 19-maktab",
  number: "19",
  district: "Olot tumani",
  region: "Buxoro viloyati",
  ministry: "O'zbekiston Respublikasi Maktabgacha va maktab ta'limi vazirligi",
  academicYear: "2026/2027 o'quv yili",

  // TODO: haqiqiy manzil (MFY, ko'cha, uy) va mo'ljal
  address: null as string | null,
  landmark: null as string | null,

  // TODO: maktabning rasmiy telefoni, qabulxona telefoni
  phone: null as string | null,
  phoneSecondary: null as string | null,
  email: null as string | null,
  // Masalan: "olot_19_maktab" (t.me/ dan keyingi qism)
  telegram: null as string | null,
  instagram: null as string | null,

  workingHours: "Dushanba – Shanba, 08:00 – 18:00",

  /**
   * Xarita: maktab binosining aniq koordinatalari.
   * Google Maps'da binoni bosing → pastda chiqqan "39.41..., 63.80..." raqamlarini shu yerga yozing.
   * null bo'lsa, xarita tuman markazini ko'rsatadi.
   */
  coordinates: null as { lat: number; lng: number } | null,
  mapFallbackQuery: "Olot, Buxoro viloyati",

  /**
   * Murojaatlar qabul qiluvchi manzil (Google Apps Script web app URL).
   * Sozlash yo'riqnomasi: README.md → "Murojaatlarni ulash".
   * Bo'sh bo'lsa, forma o'rniga telefon raqami ko'rsatiladi.
   */
  formEndpoint: "",

  /** 1-sinfga qabul — rasmiy portallar (2026: my.gov.uz va my.maktab.uz) */
  firstGrade: {
    portalUrl: "https://my.gov.uz/ru/service/797",
    altPortalUrl: "https://my.maktab.uz",
  },

  /**
   * Smenalar. TODO: maktabdagi haqiqiy vaqt va sinflar.
   */
  shifts: [
    { name: "1-smena", time: "08:00 – 13:05", grades: "Sinflar kiritiladi" },
    { name: "2-smena", time: "13:15 – 18:20", grades: "Sinflar kiritiladi" },
  ],
};

export const hasValue = (v: unknown) => v !== null && v !== undefined && v !== "";

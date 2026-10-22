# Olot tumani 19-sonli maktab — sayt

React + Vite + Tailwind. Shrift (Onest) sayt ichida joylashgan, Google'ga bog'liq emas.

Bosh sahifadagi "Bugun maktabda" kartasi qo'ng'iroqlar jadvalidan (`BELLS`) hozirgi dars yoki tanaffusni o'zi hisoblaydi.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # tayyor sayt dist/ papkasida
```

`dist/` papkasini istalgan statik hostingga (Netlify, Vercel, Cloudflare Pages, oddiy hosting) yuklash kifoya.

---

## 1. Ma'lumotlarni kiritish (eng muhim qadam)

Saytdagi hamma ma'lumot ikki faylda:

| Fayl | Nima bor |
|---|---|
| `src/config.ts` | Manzil, telefon, email, Telegram, xarita koordinatalari, smenalar, forma manzili |
| `src/data/school.ts` | Raqamlar, maktab haqida matn, rahbariyat, o'qituvchilar, dars jadvali, qo'ng'iroqlar, to'garaklar, yutuqlar, kitoblar, yangiliklar, taomnoma, rasmlar |

- `null` qilib qoldirilgan joy saytda sariq **"kiritilmagan"** belgisi bilan chiqadi, shuning uchun nima qolganini ko'rish oson.
- Hammasi to'ldirilgach, `src/config.ts` da `demo: true` ni `demo: false` qiling. Shunda sariq ogohlantirish va namuna joylar yo'qoladi.
- **O'quvchilarning to'liq ismi** (yutuqlar, yangiliklar) faqat ota-onasi roziligi bilan yoziladi.
- O'qituvchilarning shaxsiy raqami o'rniga maktab raqamini yozing.

### Rasmlar
1. Suratlarni `public/rasmlar/` papkasiga qo'ying. Har biri 300 KB dan kichik bo'lsin: [squoosh.app](https://squoosh.app) da WebP formatga o'tkazing.
2. `src/data/school.ts` oxirida:
   ```ts
   export const HERO_PHOTO = '/rasmlar/bino.webp';
   export const GALLERY = [
     { src: '/rasmlar/sinfxona.webp', caption: 'Kompyuter xonasi' },
   ];
   ```
3. Rahbar yoki o'qituvchi suratini qo'shish uchun uning yozuviga `photo: '/rasmlar/direktor.webp'` qo'shing.

### Xarita
Google Maps'da maktab binosini bosing va pastda chiqqan koordinatalarni `src/config.ts` ga yozing:
```ts
coordinates: { lat: 39.4xxx, lng: 63.8xxx },
```

### Darsliklar
PDF fayllarni `public/kitoblar/` papkasiga qo'yib, `url: '/kitoblar/matematika-5.pdf'` deb yozing. Google Drive havolasini ham qo'ysa bo'ladi.

---

## 2. Murojaatlarni ulash (Google Sheets + Telegram)

Saytdagi "Murojaat yuborish" va "To'garakka yozilish" formalari murojaatni Google jadvalga yozadi va Telegram'ga xabar yuboradi. Server kerak emas, bepul.

1. Yangi **Google Sheets** jadvali oching (maktab akkauntida), nomi: "Sayt murojaatlari".
2. **Kengaytmalar → Apps Script** ni oching. `Code.gs` ichidagi hamma narsani o'chirib, shu loyihadagi `apps-script/Code.gs` faylini to'liq ko'chiring. Saqlang.
3. **Telegram (ixtiyoriy):**
   - Telegram'da [@BotFather](https://t.me/BotFather) → `/newbot` → token oling.
   - Botni murojaatlar keladigan guruhga qo'shing, guruhga biror xabar yozing.
   - Brauzerda `https://api.telegram.org/bot<TOKEN>/getUpdates` ni oching va `"chat":{"id":-100...}` dagi raqamni oling.
   - Apps Script'da **Project Settings (⚙) → Script properties** ga ikkita qiymat qo'shing: `TELEGRAM_TOKEN` va `TELEGRAM_CHAT_ID`.
   - Muharrirda `testTelegram` funksiyasini tanlab, **Run** bosing. Guruhga sinov xabari kelishi kerak.
4. **Deploy → New deployment → Web app**:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
   - **Deploy** → `https://script.google.com/macros/s/.../exec` manzilini nusxalang.
5. Shu manzilni `src/config.ts` dagi `formEndpoint` ga yozing va saytni qayta build qiling.

Kodni o'zgartirsangiz: **Deploy → Manage deployments → ✏️ → Version: New version**. Shunda manzil o'zgarmaydi.

`formEndpoint` bo'sh bo'lsa, forma o'rniga maktab telefoni va Telegram ko'rsatiladi. Sayt baribir ishlaydi.

---

## Tuzilishi

```
src/
  config.ts            ← asosiy sozlamalar
  data/school.ts       ← maktab ma'lumotlari
  components/
    Header.tsx         menyu (telefonda yon panel)
    Hero.tsx           bosh qism, "Bugun maktabda" kartasi, tezkor havolalar
    About.tsx          maktab haqida, 1-sinfga qabul, ma'muriyat
    Timetable.tsx      dars jadvali + qo'ng'iroqlar (chop etish mumkin)
    People.tsx         o'qituvchilar, to'garaklar, yutuqlar
    Content.tsx        yangiliklar, galereya, darsliklar, oshxona
    Contact.tsx        bog'lanish, xarita, footer
    ContactModal.tsx   murojaat formasi
    ui.tsx             umumiy qismlar (belgi, sarlavha, modal)
apps-script/Code.gs    Google Apps Script — murojaatlarni qabul qiladi
```

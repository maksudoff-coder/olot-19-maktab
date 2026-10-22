/**
 * Olot 19-maktab — saytdan kelgan murojaatlarni qabul qilish.
 *
 * Har bir murojaat:
 *   1) shu Google Sheets jadvalining "Murojaatlar" varag'iga yoziladi;
 *   2) agar sozlangan bo'lsa, Telegram guruhga/chatga xabar bo'lib keladi.
 *
 * Telegram tokeni shu yerda (Script properties) saqlanadi — saytda ko'rinmaydi.
 * O'rnatish: README.md → "Murojaatlarni ulash".
 */

const SHEET_NAME = 'Murojaatlar';
const MAX = { type: 40, name: 120, phone: 20, subject: 160, message: 2000 };

function doPost(e) {
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Spam botlar uchun tuzoq: odam bu maydonni ko'rmaydi
    if (d.website) return json({ ok: true });

    const row = {
      type: clean(d.type, MAX.type),
      name: clean(d.name, MAX.name),
      phone: clean(d.phone, MAX.phone),
      subject: clean(d.subject, MAX.subject),
      message: clean(d.message, MAX.message),
    };
    if (row.name.length < 3 || row.phone.replace(/\D/g, '').length < 9) {
      return json({ ok: false, error: 'Ism yoki telefon noto\'g\'ri' });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    let code;
    try {
      const sheet = getSheet();
      code = 'OLOT19-' + String(sheet.getLastRow() + 1000);
      sheet.appendRow([new Date(), code, cell(row.type), cell(row.name), cell(row.phone), cell(row.subject), cell(row.message), 'Yangi']);
    } finally {
      lock.releaseLock();
    }

    notifyTelegram(code, row);
    return json({ ok: true, code: code });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Sana', 'Raqam', 'Turi', 'F.I.Sh.', 'Telefon', 'Mavzu', 'Xabar', 'Holati']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notifyTelegram(code, row) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('TELEGRAM_TOKEN');
  const chatId = props.getProperty('TELEGRAM_CHAT_ID');
  if (!token || !chatId) return;

  const text = [
    '📩 Yangi murojaat: ' + code,
    'Turi: ' + row.type,
    'F.I.Sh.: ' + row.name,
    'Telefon: ' + row.phone,
    row.subject ? 'Mavzu: ' + row.subject : null,
    row.message ? '\n' + row.message : null,
  ].filter(Boolean).join('\n');

  UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'post',
    payload: { chat_id: chatId, text: text },
    muteHttpExceptions: true,
  });
}

function clean(v, max) {
  return String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
}

/** "+998..." yoki "=..." formula bo'lib qolmasligi uchun matn sifatida yozamiz */
function cell(v) {
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Sinov uchun: Apps Script muharririda shu funksiyani ishga tushiring. */
function testTelegram() {
  notifyTelegram('TEST', { type: 'Sinov', name: 'Sinov', phone: '+998 00 000-00-00', subject: '', message: 'Telegram ulanishi ishlayapti.' });
}

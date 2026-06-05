// Özdilek · 404 & Özel Gün Kampanya Sayfaları — Sunum (Inbound Design System)
// Görünüm + CRO + UX odaklı. Section section canlı mockup SS'leri (aspect korunarak).
// Sistem: build-pptx-v2.js (Kadın Hub) ile aynı marka kiti ve helper'lar.

const path = require('path');
let pptxgen;
try { pptxgen = require(path.join(process.env.HOME, '.npm-global/lib/node_modules/pptxgenjs')); }
catch (e) { pptxgen = require('pptxgenjs'); }

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';            // 13.33" × 7.5"
pres.author = 'Inbound × Özdilek';
pres.title = '404 & Özel Gün Kampanya Sayfa Tasarımı';

const C = {
  coral: 'FF7B52', coralDeep: 'E85F36', coralTint: 'FFE3D8',
  teal: '10332F', tealSoft: '1A4238', mint: 'E8F5E9',
  white: 'FFFFFF', offWhite: 'FAF8F5',
  ink: '10332F', ink2: '4A4A4A', ink3: '8A8A8A',
  line: 'E0E0E0', lineSoft: 'F0EDE8',
  red: 'D32F2F', redWash: 'FFCDD2',
  green: '2E7D32', greenWash: 'C8E6C9',
  love: 'D6336C', gold: 'F5A623',
};
const F_DISP = 'Bricolage Grotesque';
const F_BODY = 'Outfit';
const TOTAL = 25;

const ASSET_DIR = path.dirname(require.main.filename);
const ASSET = {
  oWhite: path.join(ASSET_DIR, 'inbound-o-white.png'),
  oTeal: path.join(ASSET_DIR, 'inbound-o-teal.png'),
  bigOWhite: path.join(ASSET_DIR, 'inbound-big-o-white.png'),
  wordmarkWhite: path.join(ASSET_DIR, 'inbound-wordmark-white.png'),
};
const SS = (name) => path.join(ASSET_DIR, 'sections-v2', `${name}.png`);

const SS_DIMS = {
  h404_header: { w: 1425, h: 210 }, h404_errtop: { w: 1425, h: 139 },
  h404_catcarousel: { w: 1425, h: 510 }, h404_disc: { w: 1425, h: 494 },
  h404_brands: { w: 1425, h: 232 }, h404_bestseller: { w: 1425, h: 473 },
  h404_newest: { w: 1425, h: 454 }, h404_popsearch: { w: 1425, h: 184 },
  h404_overview: { w: 1425, h: 5035 },
  camp_hero: { w: 1425, h: 516 }, camp_persona: { w: 1425, h: 339 },
  camp_gift: { w: 1425, h: 271 }, camp_rec: { w: 1425, h: 473 },
  camp_budget: { w: 1425, h: 166 }, camp_brands: { w: 1425, h: 231 },
  camp_popular: { w: 1425, h: 473 }, camp_plp: { w: 1425, h: 902 },
  camp_overview: { w: 1425, h: 5262 },
};

function fitImage(name, boxX, boxY, boxW, boxH) {
  const d = SS_DIMS[name];
  const aspect = d.w / d.h, boxAspect = boxW / boxH;
  let w, h;
  if (aspect > boxAspect) { w = boxW; h = boxW / aspect; }
  else { h = boxH; w = boxH * aspect; }
  return { x: boxX + (boxW - w) / 2, y: boxY + (boxH - h) / 2, w, h };
}

// ============ HELPERS ============
function breadcrumb(slide, section, title) {
  slide.addText([
    { text: section, options: { fontFace: F_DISP, bold: true, color: C.coral } },
    { text: '  |  ', options: { color: C.coral } },
    { text: title, options: { fontFace: F_BODY, color: C.coral } }
  ], { x: 0.4, y: 0.25, w: 12, h: 0.3, fontSize: 10, charSpacing: 0.4 });
}
function chrome(slide, page) {
  slide.addImage({ path: ASSET.oTeal, x: 0.4, y: 6.95, w: 0.35, h: 0.35 });
  slide.addText(`${String(page).padStart(2, '0')} / ${TOTAL}`, {
    x: 12.4, y: 7.0, w: 0.6, h: 0.3, fontSize: 9, color: C.teal,
    fontFace: F_DISP, bold: true, align: 'right', transparency: 50, charSpacing: 1.5
  });
}
function pill(slide, x, y, text, fill, fg) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.34 + (text.length * 0.085), h: 0.32,
    fill: { color: fill }, line: { color: fill, width: 0 }, rectRadius: 0.16
  });
  slide.addText(text, {
    x: x + 0.05, y, w: 0.3 + (text.length * 0.085), h: 0.32,
    fontSize: 11, fontFace: F_DISP, bold: true, color: fg, valign: 'middle', charSpacing: 0.5
  });
}
function liveBadge(slide, x, y, w) {
  slide.addShape(pres.shapes.RECTANGLE, { x: x + w - 1.5, y: y + 0.1, w: 1.4, h: 0.3,
    fill: { color: C.coral }, line: { color: C.coral, width: 0 }, rectRadius: 0.05 });
  slide.addText('CANLI MOCKUP', { x: x + w - 1.5, y: y + 0.1, w: 1.4, h: 0.3,
    fontSize: 9, fontFace: F_DISP, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0, charSpacing: 0.6 });
}
function frame(slide, fit) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: fit.x - 0.05, y: fit.y - 0.05, w: fit.w + 0.1, h: fit.h + 0.1,
    fill: { color: 'F5F5F5' }, line: { color: 'F5F5F5', width: 0 },
    shadow: { type: 'outer', color: '10332F', blur: 10, offset: 3, angle: 135, opacity: 0.12 }
  });
}
function buildSeparator(num, title, sub) {
  const s = pres.addSlide();
  s.background = { color: C.teal };
  s.addText(num, { x: -1.5, y: 1.5, w: 12, h: 7, fontSize: 500, fontFace: F_DISP, bold: true,
    color: C.tealSoft, valign: 'middle', margin: 0, charSpacing: -10 });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.25, y: 2.6, w: 0.8, h: 0.04, fill: { color: C.white }, line: { color: C.white, width: 0 }, rectRadius: 0.05 });
  s.addText(title, { x: 1, y: 2.9, w: 11.3, h: 1.4, fontSize: 54, fontFace: F_DISP, bold: true, color: C.white, align: 'center', valign: 'middle', charSpacing: -1.5 });
  s.addText(sub, { x: 1, y: 4.45, w: 11.3, h: 0.5, fontSize: 15, fontFace: F_BODY, color: C.white, align: 'center', transparency: 20 });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.25, y: 5.05, w: 0.8, h: 0.04, fill: { color: C.white }, line: { color: C.white, width: 0 }, rectRadius: 0.05 });
  return s;
}
// LEFT text + RIGHT aspect-correct SS (for medium-aspect crops)
function anatomyRight(o) {
  const s = pres.addSlide();
  breadcrumb(s, o.section, o.subtitle);
  s.addText(o.title, { x: 0.5, y: 0.9, w: 5.0, h: 0.95, fontSize: 25, fontFace: F_DISP, bold: true, color: C.teal, charSpacing: -0.5, valign: 'top' });
  pill(s, 0.5, 1.98, o.label, C.coralTint, C.coralDeep);
  s.addText(o.body, { x: 0.5, y: 2.5, w: 5.0, h: 2.3, fontSize: 11.5, fontFace: F_BODY, color: C.ink2, valign: 'top', lineSpacingMultiple: 1.4 });
  if (o.bullets) o.bullets.forEach((b, i) => s.addText([
    { text: '➔  ', options: { color: C.coral, bold: true } }, { text: b, options: { color: C.ink } }
  ], { x: 0.5, y: 4.95 + i * 0.42, w: 5.0, h: 0.4, fontSize: 11, fontFace: F_BODY }));
  const fit = fitImage(o.ss, 5.7, 0.9, 7.4, 5.95);
  frame(s, fit);
  s.addImage({ path: SS(o.ss), x: fit.x, y: fit.y, w: fit.w, h: fit.h });
  liveBadge(s, fit.x, fit.y, fit.w);
  chrome(s, o.page);
  return s;
}
// TOP text + full-width SS (for wide banner crops)
function anatomyWide(o) {
  const s = pres.addSlide();
  breadcrumb(s, o.section, o.subtitle);
  s.addText(o.title, { x: 0.5, y: 0.85, w: 9.0, h: 0.7, fontSize: 25, fontFace: F_DISP, bold: true, color: C.teal, charSpacing: -0.5 });
  pill(s, 10.6, 0.95, o.label, C.coralTint, C.coralDeep);
  s.addText(o.body, { x: 0.5, y: 1.62, w: 12.3, h: 0.95, fontSize: 12, fontFace: F_BODY, color: C.ink2, lineSpacingMultiple: 1.4 });
  const fit = fitImage(o.ss, 0.5, 2.75, 12.3, 2.2);
  frame(s, fit);
  s.addImage({ path: SS(o.ss), x: fit.x, y: fit.y, w: fit.w, h: fit.h });
  liveBadge(s, fit.x, fit.y, fit.w);
  let by = fit.y + fit.h + 0.32;
  if (o.bullets) o.bullets.forEach((b, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    s.addText([{ text: '➔  ', options: { color: C.coral, bold: true } }, { text: b, options: { color: C.ink } }],
      { x: 0.5 + col * 6.3, y: by + row * 0.4, w: 6.0, h: 0.38, fontSize: 11, fontFace: F_BODY });
  });
  chrome(s, o.page);
  return s;
}
// TOP text + two stacked wide strips
function anatomyStack(o) {
  const s = pres.addSlide();
  breadcrumb(s, o.section, o.subtitle);
  s.addText(o.title, { x: 0.5, y: 0.85, w: 12.3, h: 0.7, fontSize: 25, fontFace: F_DISP, bold: true, color: C.teal, charSpacing: -0.5 });
  s.addText(o.body, { x: 0.5, y: 1.6, w: 12.3, h: 0.8, fontSize: 12, fontFace: F_BODY, color: C.ink2, lineSpacingMultiple: 1.4 });
  let y = 2.55;
  o.strips.forEach(st => {
    pill(s, 0.5, y, st.label, C.coralTint, C.coralDeep);
    const fit = fitImage(st.ss, 0.5, y + 0.42, 12.3, 1.5);
    frame(s, fit);
    s.addImage({ path: SS(st.ss), x: fit.x, y: fit.y, w: fit.w, h: fit.h });
    y = fit.y + fit.h + 0.28;
  });
  chrome(s, o.page);
  return s;
}
// Full-page overview strip (left recap + right tall strip)
function overviewSlide(o) {
  const s = pres.addSlide();
  breadcrumb(s, o.section, o.subtitle);
  s.addText(o.title, { x: 0.5, y: 0.9, w: 8.4, h: 0.8, fontSize: 26, fontFace: F_DISP, bold: true, color: C.teal, charSpacing: -0.5 });
  s.addText(o.body, { x: 0.5, y: 1.75, w: 8.4, h: 1.0, fontSize: 12, fontFace: F_BODY, color: C.ink2, lineSpacingMultiple: 1.45 });
  o.bullets.forEach((b, i) => s.addText([
    { text: '✓  ', options: { color: C.green, bold: true } }, { text: b, options: { color: C.ink } }
  ], { x: 0.5, y: 3.0 + i * 0.46, w: 8.4, h: 0.42, fontSize: 11.5, fontFace: F_BODY }));
  // tall strip on right
  const fit = fitImage(o.ss, 9.3, 0.55, 3.6, 6.6);
  frame(s, fit);
  s.addImage({ path: SS(o.ss), x: fit.x, y: fit.y, w: fit.w, h: fit.h });
  s.addShape(pres.shapes.RECTANGLE, { x: fit.x, y: fit.y, w: fit.w, h: 0.32, fill: { color: C.coral }, line: { color: C.coral, width: 0 } });
  s.addText('TAM SAYFA', { x: fit.x, y: fit.y, w: fit.w, h: 0.32, fontSize: 9, fontFace: F_DISP, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0, charSpacing: 1 });
  chrome(s, o.page);
  return s;
}

// ============ 1 · COVER ============
{
  const s = pres.addSlide();
  s.background = { color: C.coral };
  s.addImage({ path: ASSET.bigOWhite, x: 8.5, y: -3.5, w: 9.5, h: 9.5, transparency: 86 });
  s.addImage({ path: ASSET.bigOWhite, x: -4.5, y: 4.5, w: 7, h: 7, transparency: 92 });
  s.addText('ÖZDİLEK × INBOUND · SAYFA TİPİ TASARIMI', { x: 1, y: 1.95, w: 11.3, h: 0.3, fontSize: 11, fontFace: F_DISP, color: C.white, align: 'center', transparency: 10, charSpacing: 4 });
  s.addText([{ text: '404 & Özel Gün', options: { breakLine: true } }, { text: 'Kampanya Sayfaları' }],
    { x: 1, y: 2.45, w: 11.3, h: 2.5, fontSize: 60, fontFace: F_DISP, bold: true, color: C.white, align: 'center', valign: 'middle', charSpacing: -2 });
  s.addText('Kurtarma odaklı hata sayfası · Evergreen kampanya sayfası · Görünüm + CRO + UX', { x: 1, y: 5.15, w: 11.3, h: 0.4, fontSize: 16, fontFace: F_BODY, color: C.white, align: 'center', transparency: 5 });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.25, y: 5.8, w: 0.8, h: 0.05, fill: { color: C.white }, line: { color: C.white, width: 0 }, rectRadius: 0.05 });
  s.addImage({ path: ASSET.wordmarkWhite, x: 5.9, y: 6.6, w: 1.5, h: 0.28 });
  s.addText('HAZİRAN 2026', { x: 5, y: 7.0, w: 3.3, h: 0.25, fontSize: 9, fontFace: F_BODY, color: C.white, align: 'center', transparency: 30, charSpacing: 3 });
}

// ============ 2 · AGENDA ============
{
  const s = pres.addSlide();
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 5.985, h: 7.5, fill: { color: C.coral }, line: { color: C.coral, width: 0 } });
  s.addText('SUNUM AKIŞI', { x: 0.6, y: 1.8, w: 5, h: 0.3, fontSize: 11, fontFace: F_DISP, color: C.white, transparency: 15, charSpacing: 3.5 });
  s.addText([{ text: 'İKİ YENİ', options: { breakLine: true } }, { text: 'SAYFA TİPİ' }],
    { x: 0.6, y: 2.2, w: 5, h: 2.4, fontSize: 52, fontFace: F_DISP, color: C.white, charSpacing: -1.5 });
  s.addText('Her iki sayfa da kadın hub ile aynı tasarım dilinde; içerik sayfa tipine göre. Canlı mockup + marka değerlendirmesi gereken gereklilikler.', { x: 0.6, y: 4.95, w: 4.7, h: 1.2, fontSize: 12.5, fontFace: F_BODY, color: C.white, transparency: 5 });
  s.addImage({ path: ASSET.oWhite, x: 0.6, y: 6.6, w: 0.35, h: 0.35 });
  const items = [
    ['01', '404 Sayfası Nedir?', 'Kurtarma odaklı hata deneyimi, mevcut vs önerilen'],
    ['02', '404: Önerilen Yapı + Mockup', 'Kompakt bant, kategori carousel, koleksiyon, ürünler'],
    ['03', 'Özel Gün Kampanya Sayfası', 'Sevgililer Günü: üstte keşif, altta PLP listeleme'],
    ['04', 'Gereklilikler & Sonraki Adımlar', 'URL/routing, CMS, SEO, performans, riskler'],
  ];
  const startY = 1.6, lineH = 1.35;
  items.forEach(([num, title, desc], i) => {
    const y = startY + i * lineH;
    s.addText(num, { x: 6.5, y, w: 0.8, h: 0.4, fontSize: 16, fontFace: F_BODY, color: C.teal, transparency: 40, margin: 0 });
    s.addText(title, { x: 6.5, y: y + 0.4, w: 6.4, h: 0.45, fontSize: 21, fontFace: F_DISP, bold: true, color: C.teal, margin: 0 });
    s.addText(desc, { x: 6.5, y: y + 0.85, w: 6.4, h: 0.35, fontSize: 11.5, fontFace: F_BODY, color: C.ink2, margin: 0 });
  });
}

// ============ 3 · SEP 01 ============
buildSeparator('01', '404 Sayfası', 'Kurtarma odaklı hata deneyimi — çıkmaz değil, yeni başlangıç');

// ============ 4 · 404 KONSEPT ============
{
  const s = pres.addSlide();
  breadcrumb(s, '404 Sayfası Nedir', 'Neden iyi bir 404?');
  s.addText('404 bir çıkmaz değil, kurtarma noktasıdır', { x: 0.5, y: 0.85, w: 12.3, h: 0.8, fontSize: 28, fontFace: F_DISP, bold: true, color: C.teal, charSpacing: -0.5 });
  s.addText('Kırık link, eski kampanya URL\'i veya yanlış yazım — kullanıcı kaçınılmaz olarak 404\'e düşer. Kötü bir 404 oturumu bitirir; iyi bir 404 kullanıcıyı saniyeler içinde tekrar akışa sokar.', { x: 0.5, y: 1.65, w: 12.3, h: 0.7, fontSize: 13, fontFace: F_BODY, color: C.ink2 });
  const cards = [
    { t: 'Dead-end = kayıp oturum', d: 'Header\'sız, linksiz bir 404 bounce\'u artırır; kullanıcı geri tuşuna basıp siteyi terk eder.', col: C.red },
    { t: 'Kurtarma = dönüşüm', d: 'Kategori, marka ve ürün önerileriyle dolu 404, kullanıcıyı doğru sayfaya yönlendirir; oturum sürer.', col: C.green },
    { t: 'SEO: soft-404 riski', d: 'Sayfa gerçek 404 döndürmeli (200 değil) ve noindex olmalı; aksi halde Google boş sayfaları indeksler.', col: C.coral },
    { t: 'Marka tutarlılığı', d: '404 da markanın parçası; aynı header/footer, ton ve tasarım dili korunmalıdır.', col: C.teal },
  ];
  const cx = [0.5, 3.7, 6.9, 10.1];
  cards.forEach((c, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: cx[i], y: 2.7, w: 2.95, h: 3.7, fill: { color: C.white }, line: { color: C.line, width: 0.5 }, rectRadius: 0.1, shadow: { type: 'outer', color: '10332F', blur: 6, offset: 2, angle: 135, opacity: 0.07 } });
    s.addShape(pres.shapes.RECTANGLE, { x: cx[i], y: 2.7, w: 2.95, h: 0.12, fill: { color: c.col }, line: { color: c.col, width: 0 } });
    s.addText(String(i + 1).padStart(2, '0'), { x: cx[i] + 0.25, y: 3.0, w: 2.4, h: 0.5, fontSize: 26, fontFace: F_DISP, bold: true, color: c.col, transparency: 25 });
    s.addText(c.t, { x: cx[i] + 0.25, y: 3.65, w: 2.5, h: 0.7, fontSize: 15, fontFace: F_DISP, bold: true, color: C.teal, valign: 'top' });
    s.addText(c.d, { x: cx[i] + 0.25, y: 4.5, w: 2.5, h: 1.7, fontSize: 10.5, fontFace: F_BODY, color: C.ink2, valign: 'top', lineSpacingMultiple: 1.35 });
  });
  s.addText('Pazar pratiği: Trendyol, Boyner ve Amazon\'un 404\'leri tam header/menü + kategori ve ürün önerileri sunar — kullanıcıyı asla boş bırakmaz.', { x: 0.5, y: 6.55, w: 12.3, h: 0.4, fontSize: 10.5, fontFace: F_BODY, italic: true, color: C.ink3 });
  chrome(s, 4);
}

// ============ 5 · MEVCUT vs ÖNERİLEN ============
{
  const s = pres.addSlide();
  breadcrumb(s, '404 Sayfası Nedir', 'Mevcut durum vs öneri');
  s.addText('Özdilekteyim\'in mevcut 404\'ü vs önerimiz', { x: 0.5, y: 0.85, w: 12.3, h: 0.8, fontSize: 28, fontFace: F_DISP, bold: true, color: C.teal, charSpacing: -0.5 });
  const colY = 2.0, colH = 4.85;
  // MEVCUT
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: colY, w: 6.0, h: colH, fill: { color: 'FBEAEA' }, line: { color: 'FBEAEA', width: 0 }, rectRadius: 0.1 });
  s.addText('MEVCUT 404', { x: 0.8, y: colY + 0.25, w: 5.4, h: 0.45, fontSize: 18, fontFace: F_DISP, bold: true, color: C.red });
  s.addText('Canlı sitedeki gerçek durum', { x: 0.8, y: colY + 0.72, w: 5.4, h: 0.35, fontSize: 11.5, fontFace: F_BODY, color: C.ink3 });
  ['Başlık "Not Found Page" — İngilizce ve jenerik', 'Header, mega menü ve footer yok — kullanıcı sıkışıp kalıyor', 'Kategori vaadi var ama hiçbir kategori/ürün gösterilmiyor', 'Öneri, marka linki veya bir sonraki adım yok', 'Marka tonundan ve tasarım dilinden kopuk'].forEach((f, i) => s.addText([
    { text: '✕  ', options: { color: C.red, bold: true } }, { text: f, options: { color: C.ink } }
  ], { x: 0.95, y: colY + 1.25 + i * 0.62, w: 5.35, h: 0.6, fontSize: 11.5, fontFace: F_BODY, valign: 'top', lineSpacingMultiple: 1.2 }));
  // ÖNERİLEN
  s.addShape(pres.shapes.RECTANGLE, { x: 6.85, y: colY, w: 6.0, h: colH, fill: { color: C.coralTint }, line: { color: C.coralTint, width: 0 }, rectRadius: 0.1 });
  s.addText('ÖNERİLEN 404', { x: 7.15, y: colY + 0.25, w: 5.4, h: 0.45, fontSize: 18, fontFace: F_DISP, bold: true, color: C.coralDeep });
  s.addText('Kurtarma odaklı, markaya uygun', { x: 7.15, y: colY + 0.72, w: 5.4, h: 0.35, fontSize: 11.5, fontFace: F_BODY, color: C.ink2 });
  ['Tam header + mega menü + footer (navigasyon geri yüklenir)', 'Kompakt, Türkçe ve markaya uygun hata mesajı', '8 üst kategoriye bölünmüş alt-kategori carousel\'leri', 'Editorial koleksiyonlar + markalar + 2 ürün carousel\'i', 'Popüler aramalar — her durumda bir sonraki adım'].forEach((f, i) => s.addText([
    { text: '✓  ', options: { color: C.green, bold: true } }, { text: f, options: { color: C.ink } }
  ], { x: 7.3, y: colY + 1.25 + i * 0.62, w: 5.4, h: 0.6, fontSize: 11.5, fontFace: F_BODY, valign: 'top', lineSpacingMultiple: 1.2 }));
  chrome(s, 5);
}

// ============ 6 · ANATOMİ: KOMPAKT HATA BANDI ============
anatomyWide({
  section: '404 · Önerilen Yapı', subtitle: 'Kompakt üst bant', page: 6,
  title: 'Kompakt hata bandı + header restore', label: 'ÜST BANT',
  body: 'Üst bant minimal: "404" yalnızca bir kez, küçük bir rozet içinde. Tek satır Türkçe açıklama ve iki net CTA (Ana Sayfa, Kampanyalar). Kocaman 404 grafiği veya sayfa-içi ikinci arama yok — header\'daki arama zaten mevcut. Amaç: özür dile, yer kaplama, hemen keşfe yönlendir.',
  ss: 'h404_errtop',
  bullets: ['Tam header + mega menü geri yüklenir', '"404" sadece bir kez, küçük rozette', 'İki CTA: Ana Sayfa + Kampanyalar', 'Gereksiz sayfa-içi ikinci arama yok'],
});

// ============ 7 · ANATOMİ: KATEGORİ CAROUSEL ============
anatomyRight({
  section: '404 · Önerilen Yapı', subtitle: 'Kategori bazlı keşif', page: 7,
  title: 'Kategoriye bölünmüş alt-kategori carousel\'leri', label: 'KATEGORİ KEŞFİ',
  body: 'Üst kategorilerin her biri (Kadın, Erkek, Çocuk, Ayakkabı, Spor & Outdoor, Ev & Yaşam, Parfüm & Kozmetik, Kampanyalar) kendi yatay alt-kategori carousel\'ine sahip. Görsel alanlar küçük tutuldu ki tek ekranda çok sayıda giriş noktası görünsün.',
  ss: 'h404_catcarousel',
  bullets: ['8 üst kategori × alt-kategori carousel\'i', 'Küçük görsel + etiket kartları', 'Ok butonları (her ekran boyutunda görünür)', 'CMS-driven: alt kategoriler güncel kalır'],
});

// ============ 8 · ANATOMİ: EDITORIAL KOLEKSİYONLAR ============
anatomyRight({
  section: '404 · Önerilen Yapı', subtitle: 'Editorial koleksiyonlar', page: 8,
  title: 'Anasayfa mizanseni: koleksiyon kartları', label: 'KOLEKSİYONLAR',
  body: 'Anasayfadaki "Sezonun Enerjisini Keşfet" mizanseni 404\'e taşındı: Ofis Şıklığı, Davet & Söz, Hafta Sonu, Spor & Active gibi an/koleksiyon kartları. Kategori tekrarından kaçınır (kategoriler zaten üstte) ve kullanıcıya ilham verir; gerçek görsel + okunabilirlik gradyanı ile.',
  ss: 'h404_disc',
  bullets: ['An/koleksiyon temalı 4 kart', 'Gerçek görsel (object-fit, sıfır bozulma)', 'Kategori tekrarı yok — ilham odaklı', 'Anasayfa tasarım diliyle tutarlı'],
});

// ============ 9 · ANATOMİ: MARKA + ÜRÜN CAROUSEL ============
anatomyRight({
  section: '404 · Önerilen Yapı', subtitle: 'Marka + ürün vitrini', page: 9,
  title: 'Markalar ve iki ürün carousel\'i', label: 'MARKA + ÜRÜN',
  body: 'Alt bölümde Popüler Markalar carousel\'i ve iki ürün carousel\'i: En Çok Satanlar ve En Yeni Ürünler. Kullanıcı aradığını bulamasa bile güçlü ürün önerileriyle alışverişe devam edebilir. Tümü sağa kaydırmalı ve ok butonlu; en altta popüler aramalar her zaman bir sonraki adımı sunar.',
  ss: 'h404_bestseller',
  bullets: ['Popüler markalar carousel\'i', 'En Çok Satanlar + En Yeni Ürünler', 'Ok butonu + kaydırma', 'Footer üstü: popüler aramalar'],
});

// ============ 10 · 404 GENEL GÖRÜNÜM ============
overviewSlide({
  section: '404 · Önerilen Yapı', subtitle: 'Tam sayfa görünüm', page: 10,
  title: '404: kullanıcı asla boşa düşmez', ss: 'h404_overview',
  body: 'Üstte kompakt özür, hemen ardından zengin navigasyon: kategori carousel\'leri, koleksiyonlar, markalar ve ürünler. Tek bir dikey akışta kullanıcı için onlarca yeni giriş noktası.',
  bullets: ['Tam header/footer ile tutarlı çerçeve', '8 kategori carousel\'i + koleksiyon kartları', 'Markalar + 2 ürün carousel\'i', 'Kompakt üst, zengin alt — dengeli boy', 'Tamamı mobil uyumlu ve kaydırmalı'],
});

// ============ 11 · SEP 02 ============
buildSeparator('02', 'Özel Gün Kampanya Sayfası', 'Sevgililer Günü örneği — üstte keşif, altta listeleme');

// ============ 12 · KAMPANYA KONSEPT ============
{
  const s = pres.addSlide();
  breadcrumb(s, 'Kampanya Sayfası', 'İki katmanlı yapı');
  s.addText('Üstte keşif, altta listeleme — tek sayfada', { x: 0.5, y: 0.85, w: 12.3, h: 0.8, fontSize: 28, fontFace: F_DISP, bold: true, color: C.teal, charSpacing: -0.5 });
  s.addText('Özel gün kampanya sayfası iki katmanlıdır. Üst katman ilham ve keşif; alt katman gerçek bir PLP listeleme. Kullanıcı ister yukarıdan ilhamla, ister aşağıdan filtreyle ilerler.', { x: 0.5, y: 1.62, w: 12.3, h: 0.7, fontSize: 13, fontFace: F_BODY, color: C.ink2 });
  const colY = 2.55, colH = 3.25;
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: colY, w: 6.0, h: colH, fill: { color: C.coralTint }, line: { color: C.coralTint, width: 0 }, rectRadius: 0.1 });
  s.addText('ÜST · KEŞİF KATMANI', { x: 0.8, y: colY + 0.22, w: 5.4, h: 0.4, fontSize: 15, fontFace: F_DISP, bold: true, color: C.coralDeep });
  ['Hero slider (3-4 temalı banner)', 'Persona: "Kime hediye?" (Kadına / Erkeğe / Eşe)', 'Hediye kategorileri sliderı', 'Özdilekteyim\'in özel önerileri', 'Bütçe segmentleri + öne çıkan markalar + popüler ürünler'].forEach((f, i) => s.addText([
    { text: '•  ', options: { color: C.coralDeep, bold: true } }, { text: f, options: { color: C.ink } }
  ], { x: 0.95, y: colY + 0.75 + i * 0.46, w: 5.4, h: 0.44, fontSize: 11, fontFace: F_BODY }));
  s.addShape(pres.shapes.RECTANGLE, { x: 6.85, y: colY, w: 6.0, h: colH, fill: { color: 'F5F5F5' }, line: { color: 'F5F5F5', width: 0 }, rectRadius: 0.1 });
  s.addText('ALT · LİSTELEME (PLP)', { x: 7.15, y: colY + 0.22, w: 5.4, h: 0.4, fontSize: 15, fontFace: F_DISP, bold: true, color: C.teal });
  ['Sol sticky filtre (canlı sitedeki facet\'ler)', 'Sevgililer Günü filtresi ön-seçili', 'Sıralama + aktif filtre çipleri', '4 sütun ürün grid + sayfalama', 'Mobilde off-canvas filtre çekmecesi'].forEach((f, i) => s.addText([
    { text: '•  ', options: { color: C.ink3, bold: true } }, { text: f, options: { color: C.ink } }
  ], { x: 7.3, y: colY + 0.75 + i * 0.46, w: 5.4, h: 0.44, fontSize: 11, fontFace: F_BODY }));
  // evergreen callout
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 6.05, w: 12.35, h: 0.85, fill: { color: C.mint }, line: { color: C.greenWash, width: 1 }, rectRadius: 0.1 });
  s.addText([
    { text: 'EVERGREEN  ', options: { fontFace: F_DISP, bold: true, color: C.green } },
    { text: 'URL kalıcıdır (/sevgililer-gunu), yıl damgası yok. Sezon dışında 404 vermez — CMS tarih kuralıyla yedek içerik gösterir; biriken SEO değeri korunur.', options: { color: C.ink, fontFace: F_BODY } }
  ], { x: 0.75, y: 6.05, w: 11.9, h: 0.85, fontSize: 11.5, valign: 'middle', lineSpacingMultiple: 1.3 });
  chrome(s, 12);
}

// ============ 13 · ANATOMİ: HERO SLIDER ============
anatomyRight({
  section: 'Kampanya · Önerilen Yapı', subtitle: 'Hero slider', page: 13,
  title: 'Özel günün duygusunu kuran hero slider', label: 'HERO SLIDER',
  body: 'Tek banner yerine 3-4 temalı slide: hediye setleri, indirim, son gün vurgusu. Otomatik döner; ok ve nokta navigasyonu var. Kampanyanın atmosferini ilk ekranda kurar ve net bir CTA ile yönlendirir.',
  ss: 'camp_hero',
  bullets: ['3-4 temalı banner, otomatik geçiş', 'Ok + nokta navigasyonu', 'Özel güne özel görsel dil (kalp/hediye)', 'Net birincil CTA'],
});

// ============ 14 · ANATOMİ: PERSONA ============
anatomyWide({
  section: 'Kampanya · Önerilen Yapı', subtitle: 'Persona — Kime hediye?', page: 14,
  title: 'Persona: "Kime hediye alıyorsunuz?"', label: 'PERSONA',
  body: 'Hediye kararını kolaylaştıran persona bloğu: Kadına, Erkeğe, Eşe. Her kart ilgili koleksiyona yönlendirir. Hediye alışverişinin en büyük sürtünmesi olan "ne alacağım?" sorusunu en başta yanıtlar.',
  ss: 'camp_persona',
  bullets: ['3 persona: Kadına / Erkeğe / Eşe', 'Her biri küratörlü koleksiyona gider', 'Karar sürtünmesini en başta azaltır', 'Özel güne göre uyarlanabilir (Anneler/Babalar Günü)'],
});

// ============ 15 · ANATOMİ: HEDİYE KATEGORİLERİ ============
anatomyWide({
  section: 'Kampanya · Önerilen Yapı', subtitle: 'Hediye kategorileri', page: 15,
  title: 'Sağa kaydırmalı hediye kategorileri', label: 'HEDİYE KATEGORİLERİ',
  body: 'Sevgiliye hediye kategorileri tek sıra, sağa kaydırmalı slider olarak: parfüm, takı, saat, çikolata, iç giyim. Küçük kartlar ve ok butonlarıyla hızlı, görsel bir hediye keşfi sağlar.',
  ss: 'camp_gift',
  bullets: ['Tek sıra, sağa kaydırmalı slider', 'Parfüm · Takı · Saat · Çikolata · İç Giyim', 'Küçük kart + ok butonu', 'Hızlı görsel keşif'],
});

// ============ 16 · ANATOMİ: ÖZEL ÖNERİLER ============
anatomyRight({
  section: 'Kampanya · Önerilen Yapı', subtitle: 'Özel öneriler', page: 16,
  title: 'Özdilekteyim\'in özel hediye önerileri', label: 'ÖZEL ÖNERİLER',
  body: '"Sevgililer Gününe Özel Özdilekteyim\'in Önerileri" — editör seçkisi ürün carousel\'i. Popüler ürünlerden ayrı, küratörlü bir öneri katmanı; özel güne özel hediye fikirleri sunarak kararsız kullanıcıyı yönlendirir.',
  ss: 'camp_rec',
  bullets: ['Küratörlü editör seçkisi', 'Popüler ürünlerden ayrı katman', 'Özel güne özgü hediye fikirleri', 'Sağa kaydırmalı + ok butonlu'],
});

// ============ 17 · ANATOMİ: BÜTÇE + MARKALAR ============
anatomyStack({
  section: 'Kampanya · Önerilen Yapı', subtitle: 'Bütçe + markalar', page: 17,
  title: 'Bütçe segmentleri ve öne çıkan markalar',
  body: '"Bütçene Göre Hediye Seç" çipleri kullanıcıyı fiyat segmentine göre yönlendirir (ör. 0-500₺, 500-1000₺, 1000₺+). Öne çıkan markalar carousel\'i ise hediye için güvenilir marka çapaları sunar.',
  strips: [
    { ss: 'camp_budget', label: 'BÜTÇEYE GÖRE' },
    { ss: 'camp_brands', label: 'ÖNE ÇIKAN MARKALAR' },
  ],
});

// ============ 18 · ANATOMİ: POPÜLER ÜRÜNLER ============
anatomyRight({
  section: 'Kampanya · Önerilen Yapı', subtitle: 'Popüler ürünler', page: 18,
  title: 'Sevgililer Gününde popüler ürünler', label: 'POPÜLER ÜRÜNLER',
  body: 'Popüler ürünler carousel\'i sosyal kanıt ve trend ürünleri öne çıkarır. Kullanıcı kararsızsa "herkesin tercih ettiği" ürünler güçlü bir yönlendirme sağlar; keşif katmanını ürünle sonlandırır.',
  ss: 'camp_popular',
  bullets: ['Sosyal kanıt + trend ürünler', 'Kararsız kullanıcı için güçlü çapa', 'Sağa kaydırmalı + ok butonlu', 'Keşif katmanını PLP\'ye bağlar'],
});

// ============ 19 · ANATOMİ: PLP LİSTELEME ============
anatomyRight({
  section: 'Kampanya · Önerilen Yapı', subtitle: 'PLP listeleme', page: 19,
  title: 'Sticky filtreli PLP listeleme', label: 'PLP + FİLTRE',
  body: 'Keşif katmanının altında gerçek bir listeleme: sol tarafta sayfayla birlikte kayan (sticky) filtre — Kampanyalar (Sevgililer Günü ön-seçili), Cinsiyet, Ürün Çeşidi, Marka, Fiyat, Renk, Beden. Üstte sıralama ve aktif filtre çipleri, sağda 4 sütun ürün grid ve sayfalama.',
  ss: 'camp_plp',
  bullets: ['Sol sticky filtre (canlı facet\'ler)', 'Sevgililer Günü filtresi ön-seçili', 'Aktif çipler + "Tümünü Temizle"', 'Mobilde off-canvas çekmece'],
});

// ============ 20 · KAMPANYA GENEL GÖRÜNÜM ============
overviewSlide({
  section: 'Kampanya · Önerilen Yapı', subtitle: 'Tam sayfa görünüm', page: 20,
  title: 'Keşiften satın almaya tek akış', ss: 'camp_overview',
  body: 'Üstte ilham ve hediye keşfi, altta tam katalog listeleme. Kullanıcı duygusal girişten (hero, persona) rasyonel filtrelemeye (PLP) kesintisiz iner.',
  bullets: ['Hero + persona + hediye + öneriler (keşif)', 'Bütçe + marka + popüler ürünler', 'Sticky filtreli PLP listeleme', 'Evergreen URL — her yıl yeniden kullanılır', 'Diğer özel günlere şablon olarak çoğaltılır'],
});

// ============ 21 · SEP 03 ============
buildSeparator('03', 'Gereklilikler & Sonraki Adımlar', 'URL/routing · CMS · SEO · performans · riskler');

// ============ 22 · 404 GEREKLİLİKLERİ ============
{
  const s = pres.addSlide();
  breadcrumb(s, 'Gereklilikler', '404 sayfası');
  s.addText('404 için marka & IT gereklilikleri', { x: 0.5, y: 0.85, w: 12.3, h: 0.8, fontSize: 26, fontFace: F_DISP, bold: true, color: C.teal, charSpacing: -0.5 });
  s.addText('404 görsel olarak markaya uygun olduğu kadar teknik olarak da doğru kurgulanmalıdır. Aksi halde SEO\'da soft-404 ve indeksleme sorunları doğar.', { x: 0.5, y: 1.7, w: 12.3, h: 0.7, fontSize: 12.5, fontFace: F_BODY, color: C.ink2, lineSpacingMultiple: 1.4 });
  const reqs = [
    ['Gerçek HTTP 404 status', 'Sunucu soft-200 değil, gerçek 404 döndürmeli — yanlış yazılmış/silinmiş URL\'ler için doğru sinyal.'],
    ['noindex (nofollow değil)', 'Sayfa noindex olmalı; böylece Google 404\'leri indekslemez ama içindeki linkleri takip eder.'],
    ['Mümkünse 301 yönlendirme', 'Kalıcı silinen ürün/kategori URL\'leri en yakın canlı sayfaya 301 ile yönlendirilmeli (404 yerine).'],
    ['CMS/feed-driven içerik', 'Kategori, marka ve ürün carousel\'leri CMS/feed\'den beslenmeli — içerik kendiliğinden güncel kalsın.'],
    ['GA4 404 izleme', '404 görüntüleme event\'i ve geldiği kırık URL (referrer) izlenmeli; en sık kırık linkler raporlanmalı.'],
    ['Paylaşılan header/footer', 'Header/footer ortak bileşenlerden gelmeli — bakım tek noktadan, tutarlılık garanti.'],
  ];
  reqs.forEach((r, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.5 + col * 6.3, y = 2.55 + row * 1.45;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 6.05, h: 1.3, fill: { color: C.white }, line: { color: C.line, width: 0.5 }, rectRadius: 0.08, shadow: { type: 'outer', color: '10332F', blur: 6, offset: 2, angle: 135, opacity: 0.06 } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.18, y: y + 0.22, w: 0.4, h: 0.4, fill: { color: C.green }, line: { color: C.green, width: 0 } });
    s.addText('✓', { x: x + 0.18, y: y + 0.22, w: 0.4, h: 0.4, fontSize: 15, fontFace: F_DISP, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
    s.addText(r[0], { x: x + 0.72, y: y + 0.22, w: 5.1, h: 0.4, fontSize: 13.5, fontFace: F_DISP, bold: true, color: C.teal });
    s.addText(r[1], { x: x + 0.25, y: y + 0.64, w: 5.6, h: 0.6, fontSize: 10, fontFace: F_BODY, color: C.ink2, valign: 'top', lineSpacingMultiple: 1.3 });
  });
  chrome(s, 22);
}

// ============ 23 · KAMPANYA GEREKLİLİKLERİ ============
{
  const s = pres.addSlide();
  breadcrumb(s, 'Gereklilikler', 'Özel gün kampanya sayfası');
  s.addText('Kampanya sayfası gereklilikleri', { x: 0.5, y: 0.85, w: 12.3, h: 0.8, fontSize: 26, fontFace: F_DISP, bold: true, color: C.teal, charSpacing: -0.5 });
  s.addText('Evergreen kampanya sayfası, yıllar içinde biriken SEO değerini koruyacak şekilde kalıcı kurgulanmalı; sezon dışı davranışı planlanmalıdır.', { x: 0.5, y: 1.7, w: 12.3, h: 0.7, fontSize: 12.5, fontFace: F_BODY, color: C.ink2, lineSpacingMultiple: 1.4 });
  const reqs = [
    ['Kalıcı, yıl-damgasız URL', '/sevgililer-gunu gibi her yıl aynı URL. Yıl içeren URL\'ler SEO değerini sıfırlar.'],
    ['Sezon dışı: asla 404 değil', 'Sezon dışında CMS tarih kuralıyla evergreen/yedek içerik gösterilmeli; sayfa 404 vermemeli.'],
    ['CMS\'den yönetilen slotlar', 'Hero, persona, hediye, öneriler slotları pazarlamanın CMS\'den güncelleyebileceği bileşenler olmalı.'],
    ['Filtre ↔ katalog senkron', 'PLP facet\'leri canlı katalogla senkron; Sevgililer Günü filtresi ön-seçili gelmeli.'],
    ['Filtre URL\'leri canonical', 'Filtre kombinasyon URL\'leri temel sayfaya canonical olmalı — index bloat\'u önlenir.'],
    ['Şema + tarih + OG', 'ItemList/BreadcrumbList şeması, kampanya başlangıç-bitiş tarihleri ve OG görseli tanımlı olmalı.'],
  ];
  reqs.forEach((r, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.5 + col * 6.3, y = 2.55 + row * 1.45;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 6.05, h: 1.3, fill: { color: C.white }, line: { color: C.line, width: 0.5 }, rectRadius: 0.08, shadow: { type: 'outer', color: '10332F', blur: 6, offset: 2, angle: 135, opacity: 0.06 } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.18, y: y + 0.22, w: 0.4, h: 0.4, fill: { color: C.love }, line: { color: C.love, width: 0 } });
    s.addText('♥', { x: x + 0.18, y: y + 0.22, w: 0.4, h: 0.4, fontSize: 12, fontFace: F_DISP, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
    s.addText(r[0], { x: x + 0.72, y: y + 0.22, w: 5.1, h: 0.4, fontSize: 13.5, fontFace: F_DISP, bold: true, color: C.teal });
    s.addText(r[1], { x: x + 0.25, y: y + 0.64, w: 5.6, h: 0.6, fontSize: 10, fontFace: F_BODY, color: C.ink2, valign: 'top', lineSpacingMultiple: 1.3 });
  });
  chrome(s, 23);
}

// ============ 24 · RİSKLER & ÖNLEMLER ============
{
  const s = pres.addSlide();
  breadcrumb(s, 'Gereklilikler', 'Riskler & önlemler');
  s.addText('Olası riskler ve önlemler', { x: 0.5, y: 0.85, w: 12.3, h: 0.8, fontSize: 26, fontFace: F_DISP, bold: true, color: C.teal, charSpacing: -0.5 });
  const risks = [
    ['Sezon dışı 404', 'Kampanya URL\'i sezon dışında 404 verirse biriken backlink/SEO değeri kaybolur. CMS tarih kuralıyla evergreen yedek içerik şart.'],
    ['Soft-404 (yanlış status)', '404 sayfası 200 döndürürse Google boş/önerili sayfaları indeksler. Gerçek 404 status + noindex döndürülmeli.'],
    ['Keşif ↔ PLP çakışması', 'Üst keşif ve alt PLP aynı ürünleri farklı sırada gösterirse kafa karıştırır. Üst = küratörlü, alt = tam katalog konumlanmalı.'],
    ['Carousel yorgunluğu', '404 ve kampanyada çok sayıda yatay carousel var; her birinin farklı amacı olmalı, aralarında farklı bileşenler yer almalı.'],
    ['Mobil performans', 'Görsel-yoğun sayfalar; WebP/AVIF, lazy load, sadece görünür kart render\'ı ve hero preload kritik. CWV haftalık izlenmeli.'],
    ['Boş içerik durumu', 'Ürün/marka carousel\'i boşsa CMS kuralıyla gizlenmeli; "yakında" placeholder marka algısını düşürür.'],
  ];
  risks.forEach((r, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.5 + col * 6.3, y = 1.95 + row * 1.6;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 6.05, h: 1.45, fill: { color: C.white }, line: { color: C.line, width: 0.5 }, rectRadius: 0.08, shadow: { type: 'outer', color: '10332F', blur: 6, offset: 2, angle: 135, opacity: 0.06 } });
    s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: y + 0.2, w: 0.4, h: 0.4, fill: { color: C.red }, line: { color: C.red, width: 0 } });
    s.addText('!', { x: x + 0.15, y: y + 0.2, w: 0.4, h: 0.4, fontSize: 16, fontFace: F_DISP, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
    s.addText(r[0], { x: x + 0.7, y: y + 0.2, w: 5.2, h: 0.4, fontSize: 13, fontFace: F_DISP, bold: true, color: C.teal });
    s.addText(r[1], { x: x + 0.25, y: y + 0.62, w: 5.65, h: 0.8, fontSize: 10, fontFace: F_BODY, color: C.ink2, valign: 'top', lineSpacingMultiple: 1.35 });
  });
  chrome(s, 24);
}

// ============ 25 · KAPANIŞ ============
{
  const s = pres.addSlide();
  s.background = { color: C.coral };
  s.addImage({ path: ASSET.bigOWhite, x: -3.5, y: -2, w: 9.5, h: 9.5, transparency: 88 });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.25, y: 2.0, w: 0.8, h: 0.05, fill: { color: C.white }, line: { color: C.white, width: 0 }, rectRadius: 0.05 });
  s.addText('Teşekkürler', { x: 0.5, y: 2.3, w: 12.3, h: 2.3, fontSize: 92, fontFace: F_DISP, bold: true, color: C.white, align: 'center', valign: 'middle', charSpacing: -3 });
  s.addText('Sorularınız ve geri bildirimleriniz için hazırız.\nSonraki adım: tasarım onayı + 404 ve kampanya sayfası faz 1 başlangıcı.', { x: 1, y: 4.7, w: 11.3, h: 0.9, fontSize: 16, fontFace: F_BODY, color: C.white, align: 'center', transparency: 5 });
  s.addText('İLETİŞİM', { x: 3.8, y: 5.95, w: 2.5, h: 0.3, fontSize: 10, fontFace: F_DISP, bold: true, color: C.white, align: 'center', transparency: 25, charSpacing: 2 });
  s.addText('welcome@inbound.com.tr', { x: 3.8, y: 6.25, w: 2.5, h: 0.3, fontSize: 12, fontFace: F_BODY, color: C.white, align: 'center' });
  s.addText('CANLI MOCKUP', { x: 7.0, y: 5.95, w: 2.5, h: 0.3, fontSize: 10, fontFace: F_DISP, bold: true, color: C.white, align: 'center', transparency: 25, charSpacing: 2 });
  s.addText('github.com/erdogan1ozdemir', { x: 7.0, y: 6.25, w: 2.5, h: 0.3, fontSize: 12, fontFace: F_BODY, color: C.white, align: 'center' });
  s.addImage({ path: ASSET.wordmarkWhite, x: 5.9, y: 6.9, w: 1.5, h: 0.28 });
}

// ============ SAVE ============
pres.writeFile({ fileName: path.join(ASSET_DIR, '404-ozelgun-sunum.pptx') }).then(name => {
  console.log('✓ Created:', name);
});

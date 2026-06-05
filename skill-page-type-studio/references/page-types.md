# Page-Type Component Checklists & CSS Patterns

These are **best-practice starting points** from competitor analysis. Adapt order/count/content to the
brand. All three pages reuse the **shared shell** (header + footer + tokens) and the shared component
CSS (`.product-card`, `.brand-carousel`, `.cat-tile`, `.search-tag`, `.section`, carousel arrows).

Shared design-token variables to define from recon (`:root`): `--primary`, `--primary-accent`,
`--primary-light`, `--text`, `--gray`, `--light`, `--ghost`, `--white`, `--bg-dark`, font family,
`--max-w`, `--r-btn`, `--r-card`, `--r-pill`, transition, shadows.

---

## A) HUB (category landing)
Top→bottom flow: keşif → vitrin → dönüşüm.
1. Top strip + Header + Mega-nav (shared) · sticky.
2. Breadcrumb + **long-tail H1** ("Kadın Giyim, Ayakkabı ve İç Giyim Modelleri").
3. **Hero slider** (3-5 themed slides, auto-rotate, dots + arrows, one CTA each).
4. **Trend chips** (horizontal scroll of quick categories).
5. **Category tile grid** (8 tiles: image + label + 3 example subcats).
6. **Brand logo carousel** (20+ brands, arrows).
7. **Editorial "discover" cards** (4 gradient/image cards — collections / page-types).
8. **Product carousels** ×3: "En Avantajlı / Çok Satan", "Yeni Sezon", "Fırsatlar" (arrows).
9. **Campaign banner row** (3 banners) OR a "favorite parts" editorial row.
10. **Loyalty block** (mobile app + membership), 2 columns.
11. **Popular searches** (25-40 long-tail link chips).
12. **Collapsible SEO content** (first paragraph visible + "Detaylı Bilgi" expander, multi-silo).
13. **FAQ accordion** (6 Q&A, native `<details>`).
14. Footer (shared).

Schema (if generating real page later): CollectionPage + BreadcrumbList + ItemList + FAQPage.

---

## B) 404 (error recovery)
**Compact + recovery-focused. Never a dead-end.**
1. Header + Mega-nav (shared) — restores navigation (the #1 gap of most real 404s).
2. **Compact error band** (horizontal): small badge with "404" mentioned **once**, one-line apology,
   2 CTAs ("Ana Sayfaya Dön" + "Kampanyaları İncele"). **No giant 404 graphic. No in-page search**
   (header already has one). Keep it ~80px tall.
3. **Per-category subcategory carousels**: one section per top category (Kadın → Elbise/Pantolon/…,
   Erkek, Çocuk, Ayakkabı, Spor & Outdoor, Ev & Yaşam, Parfüm & Kozmetik, Kampanyalar). Each = header
   (name + "Tümünü Gör") + horizontal scroll of **small subcategory cards** (image + label) with arrows.
4. **Editorial "Keşfetmeye Devam Edin" cards** (4 **image-backed** cards) — homepage-style mizansen.
   Make these **distinct "worlds"/lifestyle entry points** (e.g. Yeni Sezon Trendleri, Ev & Yaşam,
   Spor & Outdoor, Kozmetik), **not** Çok Satanlar / Yeni / İndirimli — those already exist as the two
   product carousels below, so duplicating them is a waste of a slot. Use a **real photo per card**
   (`<img class="disc-bg" object-fit:cover>` matching the card's aspect — download at the same ratio,
   e.g. 720×540 for 4/3, so there's zero distortion) + a bottom-to-top dark gradient (`::after`,
   `rgba(17,22,30,0)→.86`) + `text-shadow` for legibility, a small blurred eyebrow pill, a one-line
   desc (hide on mobile), and a thin per-world accent stripe. Avoid flat CSS gradients — they read as
   placeholders.
5. **Brand carousel** (arrows).
6. **Two product carousels**: "En Çok Satanlar" + "En Yeni Ürünler".
7. **Popular searches** chips.
8. Footer (shared).

Tech/SEO notes for the real build: server returns **HTTP 404** (not soft-200), `noindex` (but not
nofollow), GA4 404 event tracking, and where possible 301 to the nearest live category instead of 404.

CSS sketch — compact band + subcategory card:
```css
.err-top{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;
  padding:20px 26px;background:var(--primary-light);border-radius:var(--r-card);margin:16px 0 40px;}
.err-badge{display:inline-flex;align-items:center;gap:7px;background:#fff;color:var(--primary-accent);
  font-weight:700;font-size:12px;padding:7px 13px;border-radius:var(--r-pill);}
.subcat-row{display:flex;gap:14px;overflow-x:auto;padding:4px 2px 12px;scroll-snap-type:x mandatory;}
.subcat-card{flex:0 0 128px;scroll-snap-align:start;text-align:center;}
.subcat-thumb{aspect-ratio:1;border-radius:var(--r-card);overflow:hidden;margin-bottom:8px;}
```
Generate the 8 category carousels data-driven (see build-pipeline.md) to avoid hand-writing 60+ cards.

---

## C) CAMPAIGN (evergreen / seasonal)
Top discovery + bottom PLP listing.
1. Header + Mega-nav (shared).
2. Breadcrumb (Ana Sayfa > Kampanyalar > <Occasion>).
3. **Hero slider** (3-4 themed banners for the occasion; occasion accent color, e.g. `--love:#d6336c`).
4. **Persona row** ("Kime hediye?"): wide concept cards — adapt per occasion:
   Sevgililer → Kadına / Erkeğe / Eşe; Anneler → Anneye / Anneanne-Babaanneye / Eşe;
   Yılbaşı → Sevgiliye / Kendine / Ofis arkadaşına.
5. **Occasion/gift category slider** (single row, small cards): Takı, Parfüm, Saat, İç Giyim, Hediye
   Seti, Çikolata, Çanta, … (with arrows).
6. **Brand recommendations carousel** ("<Brand>'in Önerileri" — curated product row).
7. **Budget/price-segment chips** ("500 TL ve altı", "1.000 TL ve altı", …).
8. **Brand carousel** (occasion-relevant brands, arrows).
9. **Popular products carousel**.
10. **PLP LISTING**:
    - `.plp{display:grid;grid-template-columns:256px 1fr;gap:28px;align-items:start;}`
    - **Left filter sidebar** `position:sticky;top:90px`, built from the **target's real facets**
      (Kampanyalar [occasion pre-checked], Cinsiyet, Ürün Çeşidi, Markalar, Fiyat Aralığı [min-max],
      Renkler [swatches], Bedenler). Accordions via `<details>`; first 3 open.
    - Mobile: sidebar is an **off-canvas drawer** (`position:fixed;left:-100%` → `.open{left:0}`),
      toggled by a "Filtrele" button + a fixed overlay.
    - **Right:** toolbar ("842 ürün" + Filtrele[mobile] + Sırala select) → active-filter chips
      ("<Occasion> ✕", "Tümünü Temizle") → product grid (4-col desktop / 2-col mobile) → pagination.
11. Short SEO content (occasion-focused, with persona + gift-category internal links).
12. Footer (shared).

**CRITICAL bug to avoid:** the mobile filter overlay div must be `position:fixed` (and live **outside**
the `.plp` grid or be fixed-positioned), otherwise it becomes a 3rd grid item and breaks the
`[sidebar | grid]` layout on desktop. See build-pipeline.md.

Evergreen rules: permanent URL (`/sevgililer-gunu`), never year-stamped; out-of-season → CMS swaps hero
+ offers to fallback content, page never 404s; filter-combination URLs canonical to the base to avoid
index bloat (only high-value combos get their own indexable URL).

---

## Replication
- The campaign template clones to every occasion: same structure, new theme color + persona set + gift
  categories + product set.
- The hub template clones to every top category (Erkek, Çocuk, Ev, …).
- The 404 is one page, but its category carousels should be CMS-driven so they stay current.

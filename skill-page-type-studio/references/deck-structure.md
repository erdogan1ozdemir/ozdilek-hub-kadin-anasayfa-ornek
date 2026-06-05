# Presentation Structure

One deck per engagement (or per page type if the brand prefers). Use the agency/brand design system if
available (e.g. Inbound: coral `#FF7B52` + dark-teal `#10332F`, Bricolage Grotesque + Outfit, 16:9);
otherwise a clean generic deck. Build with pptxgenjs (PPTX) and/or a self-contained HTML deck.

## Slide flow (adapt count to scope)
1. **Cover** — "<Brand> <PageType(s)> Tasarımı", subtitle (Görünüm · CRO · UX · Gereklilikler).
2. **Agenda** — the sections below.
3. **Page-type concept** (one separator + content slide per type requested):
   - **404:** current 404 screenshot + its gaps (no nav, dead-end, promises categories shows none) →
     "current vs proposed".
   - **Hub:** Hub vs PLP (what a hub adds over a listing page).
   - **Campaign:** why a dedicated evergreen landing (discovery + listing in one).
4. **Competitor comparison** — thumbnails of each competitor's equivalent page (with the **page URL as a
   clickable link**) + the **görünüm + CRO + UX matrix** (✓ / ✗ / ⚠ with a legend). Close on the moat.
5. **Best-of-breed** — 1 card per competitor (what we borrow) + the brand's own strength.
6. **Proposed structure + anatomy** — for each page type:
   - A flow slide (sections top→bottom) with a short note that the order is a **recommendation**, not
     mandatory (different layouts can be designed per brand priorities).
   - **Per-section anatomy slides**: left = title + 2-3 sentence explanation + 2-3 bullets; right = the
     **mockup section screenshot** (aspect-correct, framed, never stretched).
   - A mockup-preview slide + GitHub/preview link.
7. **Requirements the brand must evaluate** (one slide each, written in full sentences — no cryptic
   shorthand): URL & routing (each carousel/tile has its own page; "Tümünü Gör" → live PLP; 200 OK),
   internal linking (anchor diversity, link pool, follow), UX & systematic flow (keşif→vitrin→eylem,
   sticky header, mobile drawer, loading/empty states), CMS slotting (every component editor-managed,
   date-scheduled campaigns), performance & mobile (WebP/AVIF, lazy load, LCP/CLS/INP, ≥44px targets),
   risks & mitigations (carousel fatigue, empty lists, stale campaign content, hub/PLP confusion).
8. **Closing** — thanks + contact + preview/repo link.

## Title style (Inbound system)
Single ink color for titles (do NOT half-color the title). Coral highlight reserved for the `.hl`
underline on a keyword. Use `-` or `&` as separators, **not** em-dashes. Arrow bullets `➔`. Keep notes
in full sentences, not cryptic fragments. Avoid accent lines under titles. Footer/source-pill bottom-left,
page number bottom-right.

## Section-crop screenshots (aspect-correct)
Render the live mockup full-page, then crop into per-section images with Pillow so deck images keep
their aspect ratio (never stretch a full-page shot into a slide box):
```python
from PIL import Image
img = Image.open('mockup-full.png'); W,H = img.size
for (y1,y2,name) in SECTIONS:   # y-ranges from the full-page screenshot at 1440px
    img.crop((0,y1,W,min(y2,H))).save(f'sections/{name}.png')
```
Then in pptxgenjs compute a fit box preserving aspect:
```js
function fit(natW,natH,boxX,boxY,boxW,boxH){var a=natW/natH,ba=boxW/boxH,w,h;
  if(a>ba){w=boxW;h=boxW/a;}else{h=boxH;w=boxH*a;}return{x:boxX+(boxW-w)/2,y:boxY+(boxH-h)/2,w:w,h:h};}
```

## QA the deck
Convert to images (LibreOffice → PDF → pdftoppm) and visually inspect for overflow, overlap, stretched
images, low contrast, leftover placeholders, before declaring done.

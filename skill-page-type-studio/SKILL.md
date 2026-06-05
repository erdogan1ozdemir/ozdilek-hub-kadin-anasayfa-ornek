---
name: page-type-studio
description: >
  Clone any e-commerce/retail website's design language and produce example mockups for three
  page types — category HUB, 404 error, and evergreen CAMPAIGN/seasonal landing — plus a competitor
  analysis, methodology notes, and a client presentation. Analyzes the target's vertical, studies
  competitors' equivalent page types (görünüm + CRO + UX focus), then builds self-contained
  responsive HTML mockups in the target's own design language.
  Use when the user wants to: design a hub/category page, design a 404 page, design a campaign or
  seasonal landing (Sevgililer Günü, Anneler Günü, Black Friday, Yılbaşı, Okula Dönüş etc.), clone a
  site and propose page designs, or prepare a page-design proposal + deck for a brand.
  Triggers (TR): "hub sayfası tasarla", "404 sayfası örneği", "kampanya sayfası mockup", "sayfa tipi
  tasarımı", "siteyi klonla ve sayfa öner", "kategori sayfası tasarımı", "özel gün sayfası", "sunum
  hazırla sayfa için".
  Triggers (EN): "page type design", "design a hub page", "404 page mockup", "campaign landing page",
  "clone site and design pages", "category landing design".
---

# Page-Type Studio

Produce **example page-type designs for any website** by cloning its design language, studying
competitors' equivalent pages, and building self-contained responsive HTML mockups — then package
methodology notes and a client presentation.

The three page types this skill specializes in:

| Type | Purpose | Core idea |
|------|---------|-----------|
| **HUB** (category landing) | Keşif giriş noktası | Editorial + product + brand discovery, then route to PLPs |
| **404** (error recovery) | Kullanıcıyı tekrar akışa sokmak | Compact apology + rich category/product navigation, never a dead-end |
| **CAMPAIGN** (evergreen/seasonal) | Sezonsal satış vitrini | Top discovery (persona/gift/budget) + bottom PLP listing with filters |

This is **flexible**, not rigid: the component lists are best-practice starting points derived from
competitor analysis. Adapt order, count, and content to the target brand and vertical.

---

## Workflow (7 phases)

Run in order. **Phase 2 (analysis) gets user sign-off before heavy building.** Track with TaskCreate.

### Phase 0 — Brief & scope
Confirm, asking only what you can't infer:
- **Target URL** (the site to clone).
- **Which page types?** Default: all three (hub, 404, campaign). User may pick a subset.
- **Campaign occasion** (if campaign requested): Sevgililer Günü / Anneler Günü / Babalar Günü /
  Yılbaşı / Black Friday / Okula Dönüş / custom. Pick a relevant default if not specified.
- **Output:** self-contained static HTML mockups (default) + methodology MD + deck. Ask if they want
  GitHub push / Vercel deploy.
- **Deck format:** if the user/agency has a design system (e.g. Inbound), use it; else a clean generic deck.

Use `AskUserQuestion` only for genuinely ambiguous choices (occasion, competitor set, deck format).

### Phase 1 — Target recon (clone the shell)
Inspect the target with Playwright MCP (or Chrome MCP / Firecrawl). Extract:
- **Design tokens:** primary/accent/text/bg colors (read CSS custom properties via
  `getComputedStyle(document.documentElement)` AND computed styles on header/buttons), font family,
  `max-width`, border-radii, shadows. Save to `notes/design-tokens.md`.
- **Header:** brand bar, logo, search, account/cart actions, mega-nav category list (with hrefs).
- **Footer:** columns, trust badges, social, app links, payment logos.
- **Product card** structure (image, brand, title, price, discount badge, add-to-cart).
- **Existing page types**, especially the **current 404** (navigate to a bad URL) — its gaps are gold
  for the presentation ("current vs proposed").
- **Real assets:** logo (SVG), category images, product images, brand logos → download to
  `mockup/img/...` then base64-embed at build time.
- Screenshots desktop (1440) + mobile (390), full-page.

Read [references/recon.md](references/recon.md) for the exact extraction snippets.

### Phase 2 — Vertical & competitor analysis (görünüm + CRO + UX)
- **Detect the vertical** from nav + products (fashion, electronics, home, grocery, cosmetics, …).
- **Pick 3-4 competitors** in the same vertical/market (ask the user or infer; for TR fashion:
  Boyner, Trendyol, Koton, M&S, LCW, Defacto…). Confirm the set with the user.
- For each competitor, analyze the **same page types** the user requested: hub layout, 404 page,
  campaign/seasonal pages. Capture screenshots; note components, internal-link layers, mobile behavior.
- Build a **comparison matrix focused on appearance + CRO + UX** — NOT a technical-SEO checklist.
  Rows = components/UX signals (editorial hero, category tiles, brand grid, product carousels in-page,
  collection cards, popular searches, loyalty area, trust badges, filter UX, mobile experience…).
- Identify **best-of-breed** patterns to adopt + gaps that are open opportunities (a "moat").
- **Present this analysis to the user and get sign-off** before building all mockups.

Read [references/competitor-analysis.md](references/competitor-analysis.md).

### Phase 3 — Build the shared shell
- Extract/rebuild the **header + footer + design-token CSS** as a reusable base, in the target's look.
- Set up the **build pipeline**: a small Python script composes each page from
  `<head> + shared CSS + page CSS + header + drawer + page content + footer + robust script`, and
  **base64-embeds every `img/` reference** so previews work in any environment.
- Copy [assets/build-pages.py](assets/build-pages.py) as a starting template and adapt.

Read [references/build-pipeline.md](references/build-pipeline.md).

### Phase 4 — Build page-type mockups
Build each requested page in the target's design language, integrating best-of-breed components.
Component checklists per type are in [references/page-types.md](references/page-types.md). Summary:

- **HUB:** breadcrumb + long-tail H1 → hero slider → trend chips → category tile grid → brand
  carousel → editorial "discover" cards → product carousels (Çok Satan / Yeni / Fırsat) → campaign
  banners → loyalty (app + membership) → popular searches → collapsible SEO content → FAQ.
- **404:** **compact** error band (small badge with "404" mentioned once, one-line message, 2 CTAs —
  NO giant 404 graphic, NO in-page search since the header already has one) → per-category subcategory
  carousels (Kadın → Elbise/Pantolon/…, Erkek, Çocuk, Ayakkabı, Spor, Ev & Yaşam, Kozmetik, Kampanya)
  → editorial "keşfetmeye devam" cards → brand carousel → **two product carousels** (En Çok Satanlar +
  En Yeni Ürünler) → popular searches. Full header/footer so the user is never stranded.
- **CAMPAIGN:** breadcrumb → **hero slider (3-4 themed banners)** → **persona row** ("Kime hediye?":
  Kadına / Erkeğe / Eşe — adapt per occasion) → occasion/gift category **slider** (small cards) →
  brand's **recommendations** carousel ("…'in Önerileri") → budget/price-segment chips → brand carousel
  → popular products carousel → **PLP listing**: sticky left filter sidebar (built from the target's
  real facets) + product grid (4-col) + sort bar + active-filter chips + pagination → short SEO content.

**Hard-won implementation rules** (apply every time):
1. **Self-contained HTML** with base64-inlined images (preview reliability across environments).
2. **Shared shell** reused across all pages (header/footer/tokens) for consistency + low effort.
3. **Generic carousel scroller**: `scrollCarousel(id, dir)` uses `firstElementChild` width — works for
   product rows, subcategory rows, brand rows alike. Add **arrow buttons** to every horizontal scroller
   (visible on desktop, swipe on mobile).
4. **PLP filter overlay must be `position: fixed`, never a direct grid child** — a static/flow overlay
   div becomes a 3rd grid item and breaks the `[sidebar | grid]` layout. The mobile filter is an
   off-canvas drawer toggled by a "Filtrele" button; desktop sidebar is `position: sticky`.
5. **404 stays brand-professional and recovery-focused** — compact top, rich navigation below.
6. **Campaign is evergreen**: permanent URL (`/sevgililer-gunu`, not year-stamped); out-of-season it
   must NOT 404 — CMS date rules swap to fallback content.
7. Verify every build at desktop + mobile via Playwright; check `img.naturalWidth` for broken images.

### Phase 5 — Methodology notes
Write `notes/<topic>-metodoloji.md`: per page type, component breakdown, **where-to-add-what**,
SEO/CRO/UX notes, risks & mitigations, and replication guidance (how to clone the campaign template to
other occasions, how the hub replicates to other category hubs). Include the **current-vs-proposed**
findings from Phase 1 (e.g. the existing 404's gaps).

### Phase 6 — Presentation
Build a deck. If a brand/agency design system is available use it; otherwise a clean generic deck.
Structure (adapt count to scope) is in [references/deck-structure.md](references/deck-structure.md):
1. Cover + agenda
2. **Page-type concept** (what it is, why it matters) — e.g. current 404 gaps, hub vs PLP
3. **Competitor comparison** (görünüm + CRO + UX matrix; link each competitor page studied)
4. **Proposed structure + anatomy** — per-section slides with the mockup screenshots (aspect-correct,
   never stretched; crop the live mockup into section images)
5. **Requirements** the brand must evaluate: URL/routing, internal linking, UX/navigation flow, CMS
   slotting, performance/mobile, risks
6. Closing

Build SS section-crops from the live mockup (Pillow) so deck images keep aspect ratio.

### Phase 7 — Deliver
- Self-contained HTML mockups + methodology MD + deck (PPTX and/or HTML).
- Offer GitHub push / Vercel deploy. Start a preview server (`.claude/launch.json` + preview_start) so
  the user can review locally.

---

## Key principles
- **Clone the look, not the bugs.** Match the target's tokens/header/footer exactly; fix its UX gaps.
- **Competitor-informed, not competitor-copied.** Adopt best-of-breed patterns; assemble a hybrid the
  competitors don't individually have.
- **Görünüm + CRO + UX first** for the comparison; keep technical-SEO claims light unless asked.
- **Flexible structure.** The component lists are recommendations; reorder/extend per brand priorities.
- **Real content, real assets.** Pull text, categories, products, brand logos from the target.
- **Always previewable.** Base64-inline images; verify at desktop + mobile before declaring done.

## References
- [references/recon.md](references/recon.md) — target inspection + token/asset extraction snippets
- [references/competitor-analysis.md](references/competitor-analysis.md) — vertical detection, competitor sets, CRO/UX matrix
- [references/page-types.md](references/page-types.md) — full component checklist + CSS patterns per page type
- [references/build-pipeline.md](references/build-pipeline.md) — shared-shell extraction + base64 build approach
- [references/deck-structure.md](references/deck-structure.md) — presentation structure + section-crop technique
- [assets/build-pages.py](assets/build-pages.py) — adaptable build script template

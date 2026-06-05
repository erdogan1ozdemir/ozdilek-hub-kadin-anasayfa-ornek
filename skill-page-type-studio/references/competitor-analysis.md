# Competitor Analysis — Vertical Detection + CRO/UX Matrix

Focus: **appearance + CRO + UX**, not a technical-SEO checklist (unless the user asks). The point is
"how do competitors lay out these page types and what converts," so the proposed mockups can adopt
best-of-breed patterns.

## 1. Detect the vertical
From the target's nav + products, classify: fashion/apparel, electronics, home & living, grocery,
cosmetics, sports, marketplace (mixed), etc. The vertical drives which competitors and which campaign
occasions matter.

## 2. Choose competitors (3-4)
Ask the user for their known competitors; otherwise infer market leaders in the same vertical + country.
Examples (TR market):
- **Fashion/apparel:** Boyner, Trendyol, Koton, LC Waikiki, Defacto, Marks & Spencer TR, Morhipo.
- **Home & living:** Karaca, English Home, Madame Coco, Özdilek.
- **Electronics:** MediaMarkt, Teknosa, Vatan, Hepsiburada.
- **Cosmetics:** Gratis, Watsons, Sephora TR, Rossmann.
- **Marketplace:** Trendyol, Hepsiburada, Amazon TR, n11.
Confirm the set with the user before deep analysis.

## 3. Analyze the same page types
For each competitor, study the page types the user requested:
- **Hub/category landing:** hero style, category tiles, brand grid, in-page product carousels,
  editorial collections, popular-search blocks, trust badges, mobile behavior.
- **404:** does it keep header/footer? does it offer categories/products/search or dead-end? tone.
- **Campaign/seasonal:** is there a dedicated landing? persona/gift/budget entry points? does it blend
  discovery + PLP listing? filter UX? evergreen vs year-stamped URL.

Capture desktop + mobile screenshots. Many sites block hotlinking/bots — use Playwright with realistic
waits; if a site 403s, note it and proceed with the others.

## 4. Build the comparison matrix (görünüm + CRO + UX)
Rows are components / UX signals; columns are Target + each competitor. Use ✓ / ✗ / ⚠ (partial) and add
a legend explaining ⚠. Example rows:

| Component / UX signal |
|---|
| Editorial hero slider |
| Category tile grid (visual) |
| Brand logo grid (hub-level) |
| In-page product carousels |
| Style/collection/editorial cards |
| Popular-search link block |
| Persona/gift entry points (campaign) |
| Budget/price-segment shortcuts (campaign) |
| Sticky filter sidebar (campaign PLP) |
| Loyalty / app promo area |
| Trust badges in-page |
| 404 keeps full nav + offers products |
| Mobile experience quality |

Close with an **insight line**: the open opportunity ("no competitor combines X + Y → moat for target").

## 5. Best-of-breed synthesis
List which pattern to borrow from whom, e.g.:
- From the editorial-strong competitor → hero slider + collection cards + popular searches.
- From the discovery-strong competitor → big category tiles + large brand grid + budget shortcuts.
- From the content-strong competitor → multi-silo SEO copy.
- From the premium-minimal competitor → clean hero + sub-brand showcase + trust row.
Then assemble a **hybrid** the competitors don't individually have, in the target's design language.

## Optional data layer
If DataForSEO / Ahrefs MCP is available, you may enrich with keyword volumes for the occasion
(e.g. "sevgililer günü hediyesi" volume) or competitor traffic — but keep the deck CRO/UX-led.

# Recon — Target Inspection & Asset Extraction

Goal: capture the target's **design tokens, header, footer, product card, nav, existing page types,
and real assets** so the mockups look native to the brand.

## Tooling preference
Chrome MCP (live, interactive) → Playwright MCP (headless screenshots + DOM) → Firecrawl → WebFetch.
Most snippets below assume Playwright's `browser_evaluate`.

## 1. Design tokens
```js
() => {
  const cs = getComputedStyle(document.documentElement);
  const vars = {};
  for (let i = 0; i < cs.length; i++) { const p = cs[i]; if (p.startsWith('--')) vars[p] = cs.getPropertyValue(p).trim(); }
  const el = (s) => document.querySelector(s);
  const comp = (s, p) => el(s) ? getComputedStyle(el(s))[p] : null;
  return {
    cssVars: vars,                                   // brands on Spartacus/SAP expose --cx-color-* etc.
    bodyFont: comp('body','fontFamily'),
    bodyColor: comp('body','color'),
    headerBg: comp('header','backgroundColor'),
    primaryGuess: vars['--cx-color-primary'] || vars['--color-primary'] || null,
    maxWidth: vars['--layout-max-width'] || vars['--max-w'] || null,
    btn: (()=>{const b=document.querySelector('button,.btn,[class*=btn]');return b?{bg:getComputedStyle(b).backgroundColor,radius:getComputedStyle(b).borderRadius}:null;})()
  };
}
```
If no CSS vars: sample colors from the header/CTA/badge with `getComputedStyle`. Record the **primary
brand color**, **ink/text color**, **font family**, **max-width**, **button radius**.

## 2. Header / nav / footer
```js
() => ({
  navItems: [...document.querySelectorAll('header nav a, [class*=nav] a')]
    .map(a => ({t:a.textContent.trim(), href:a.getAttribute('href')}))
    .filter(x => x.t && x.t.length < 30).slice(0, 25),
  footerText: document.querySelector('footer')?.innerText.slice(0, 600),
  hasSearch: !!document.querySelector('input[type=search], [class*=search] input'),
  brandSwitch: [...document.querySelectorAll('[class*=brand], [class*=store-logo]')].slice(0,4).map(e=>e.textContent.trim())
})
```
Capture the full **mega-nav category list** (this becomes the shared header). Note any **brand/store
switch** (e.g. Mağaza/Market), trust strip ("free shipping over X"), and footer columns.

## 3. Product card + listing facets
Navigate to a PLP. Extract one product card's structure and the **filter facets** (critical for the
campaign page's sidebar):
```js
() => ({
  card: document.querySelector('[class*=product-item], [class*=product-card], cx-product-list-item')?.outerHTML.slice(0,1200),
  facets: [...document.querySelectorAll('h2, [class*=facet] [class*=title], cx-facet h2')]
    .map(h=>h.textContent.trim()).filter(Boolean).slice(0,20),
  productImgPattern: document.querySelector('cx-media img, [class*=product] img')?.src
})
```
Record the facet list (e.g. Kampanyalar, Cinsiyet, Markalar, Ürün Çeşidi, Bedenler, Renkler, Fiyat
Aralığı, …) and the **product image URL pattern** (CDN resize params often need a `?context=` query).

## 4. Existing 404 (current-vs-proposed material)
Navigate to a guaranteed-bad URL (`/<random-nonexistent>`). Screenshot it and extract the copy:
```js
() => ({ title: document.title, h1: [...document.querySelectorAll('h1,h2')].map(h=>h.textContent.trim()).slice(0,5),
         body: document.body.innerText.slice(0,800), hasHeader: !!document.querySelector('header'),
         hasFooter: !!document.querySelector('footer'), hasSearch: !!document.querySelector('input[type=search]') })
```
Typical gaps to call out in the deck: no header/footer (user stranded), promises categories but shows
none, no products/brands/search, single dead-end CTA. **Reuse the brand's real 404 copy** (improved).

## 5. Real assets
- **Logo:** find the SVG/PNG in the header (`<img>` src, often a CDN/`assets` path). Download it.
- **Category/product/brand images:** scroll the homepage + a PLP to lazy-load, then collect
  `img.currentSrc` for CDN images. CDN images often need the original `?context=`/`?w=` query — keep it.
- Download to `mockup/img/{assets,hero,categories,brands,products}/...`. The build step base64-embeds them.
- If an image 403s on hotlink, retry with the original `Referer`, else fall back to a relevant Unsplash
  photo (`https://images.unsplash.com/photo-<id>?w=600&h=600&fit=crop&q=80`). Validate size > 5KB; refetch on failure.

## Output
- `notes/design-tokens.md` — colors, font, max-width, radii, header/footer structure, facet list.
- `mockup/img/...` — downloaded assets.
- Screenshots: target home, target PLP, **target current 404** (desktop + mobile).

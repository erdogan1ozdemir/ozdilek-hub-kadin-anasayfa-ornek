# Build Pipeline — Shared Shell + Base64 Composition

The reliable pattern: keep page content in editable fragment files (with `img/...` paths), and a small
Python build script composes each full page from a **shared shell** and **base64-embeds every image**
so previews work in any environment (file://, localhost, Claude preview, Vercel).

## Directory layout
```
mockup/
  build-pages.py            # composer (adapt assets/build-pages.py)
  <pagetype>-content.html   # one fragment per page: <style>page CSS</style> + <main>…</main>
  img/{assets,hero,categories,brands,subcat,campaign,...}/  # downloaded assets (jpg/webp/svg)
  *.html                    # built output (self-contained)
```

## Shared shell extraction
If you already built a hub page (or any page) with the brand's header/footer, reuse it as the shell
source. The composer:
1. Reads the shell page, extracts the **CSS** (between `<style>…</style>`) and **strips base64 from CSS
   `url('data:image…')`** (page-specific backgrounds) so the shared CSS stays small.
2. Extracts the **header block** (brand bar → `</aside>` drawer) and **footer block** — these already
   contain the base64 logo/icons.
3. For each page: `<head>(title/meta/fonts/<style>shared+page</style>)</head><body> header + drawer +
   fragment + footer + robust script </body>`.

If there is **no** prior page, first build the hub (it establishes the shell), or hand-build a minimal
shared header/footer/tokens from recon.

## Base64 embedding
For each fragment, replace `src="img/..."` and `url(img/...)` with `data:<mime>;base64,<...>`. Validate
the file exists and is > a few KB; warn on missing.

## Robust script (works without a hub hero)
```js
function scrollCarousel(id,dir){var c=document.getElementById(id);if(!c)return;
  var card=c.firstElementChild;var w=card?card.offsetWidth+14:200;
  c.scrollBy({left:dir*w*2,behavior:'smooth'});}              // GENERIC: any horizontal scroller
function toggleDrawer(){document.getElementById('mobileDrawer').classList.toggle('open');
  document.getElementById('drawerOverlay').classList.toggle('open');}
function togglePlpFilter(){var s=document.getElementById('plpSidebar'),o=document.getElementById('plpFilterOverlay');
  if(s)s.classList.toggle('open');if(o)o.classList.toggle('open');}
(function(){var s=document.getElementById('campHeroSlides');if(!s)return;            // campaign hero slider (guarded)
  var n=s.children.length,i=0,d=document.querySelectorAll('.camp-dot'),t;
  function go(x){i=(x+n)%n;s.style.transform='translateX(-'+(i*100)+'%)';for(var k=0;k<d.length;k++)d[k].classList.toggle('active',k===i);r();}
  function nx(){go(i+1);}function pv(){go(i-1);}function r(){clearInterval(t);t=setInterval(nx,6000);}
  window.campHeroGo=go;window.campHeroNext=nx;window.campHeroPrev=pv;r();
  var w=s.closest('.camp-hero-slider');if(w){w.addEventListener('mouseenter',function(){clearInterval(t);});w.addEventListener('mouseleave',r);}})();
```
Add a guarded hub-hero slider too if a hub page is built. Always guard with `if(!el)return;` so one
script works across all page types.

## Data-driven sections (avoid hand-writing 60+ cards)
For the 404 category carousels, define the data in Python and generate HTML, injected into a
`<!--CATEGORY_CAROUSELS-->` placeholder in the fragment:
```python
CAT_DATA = [("Kadın","/kadin","kadin",["Elbise","Pantolon","Tişört","Gömlek","Ceket","Çanta","Ayakkabı","İç Giyim"]), ...]
# cycle 3 images per category (img/subcat/<key>-1..3.jpg) across subcategories; build a .subcat-row per category.
```

## The PLP filter overlay bug (do NOT repeat)
Symptom: filter accordion content spans the full width and overlaps the product grid on desktop.
Cause: the mobile filter `.plp-filter-overlay` div placed as a **direct child of `.plp` grid** becomes
a 3rd grid item and shifts the 2-column `[sidebar | grid]` layout.
Fix: give the overlay `position:fixed` (base rule, all viewports) so it leaves the grid flow, and/or
place it **outside** the `.plp` container. Keep the sidebar `position:sticky` (desktop) and a fixed
off-canvas drawer (mobile).

## Verification (every build)
- Run a local server, open each page at 1440 + 390 via Playwright; full-page screenshots.
- `imgs.filter(i=>i.complete && i.naturalWidth===0).length === 0` (no broken images).
- Click the mobile "Filtrele" to confirm the drawer opens; confirm desktop sidebar sits in its column.
- Confirm carousel arrows scroll; hero slider auto-rotates.

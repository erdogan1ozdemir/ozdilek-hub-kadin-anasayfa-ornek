#!/usr/bin/env python3
"""TEMPLATE — composes page-type mockups from a shared shell + content fragments, base64-embedding
all img/ references so previews work everywhere. Adapt SHELL_SOURCE and the build() calls per project.

Layout expected (run from mockup/):
  build-pages.py
  <shell page>.html          # any prior page that has the brand header/footer (e.g. hub). SHELL_SOURCE
  <type>-content.html        # fragments: <style>page CSS</style> + <main>...</main>, img/ paths
  img/.../...                # downloaded assets
"""
import re, base64, mimetypes, pathlib

ROOT = pathlib.Path(__file__).parent
SHELL_SOURCE = "kadin-hub.html"   # <-- a page that already contains the brand header+footer+tokens

SHELL = (ROOT / SHELL_SOURCE).read_text(encoding="utf-8")

# 1) shared CSS (strip base64 backgrounds so it stays light; pages reuse the component classes)
shared_css = re.search(r"<style>(.*?)</style>", SHELL, re.DOTALL).group(1)
shared_css = re.sub(r"url\('data:image[^']*'\)", "linear-gradient(135deg,#e8e8e8,#d8d8d8)", shared_css)

# 2) header+drawer block (brand bar through the closing mobile drawer </aside>)
header_html = re.search(r"(<!-- BRAND BAR.*?</aside>)", SHELL, re.DOTALL).group(1)
# 3) footer block
footer_html = re.search(r'(<footer class="footer".*?</footer>)', SHELL, re.DOTALL).group(1)

def embed_images(html):
    def repl(m):
        attr, rel = m.group(1), m.group(2)
        p = ROOT / rel
        if not p.exists():
            print(f"  ! missing {rel}"); return m.group(0)
        mime, _ = mimetypes.guess_type(str(p))
        if mime is None:
            mime = {'.webp':'image/webp','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png'}.get(p.suffix.lower(),'application/octet-stream')
        return f'{attr}="data:{mime};base64,{base64.b64encode(p.read_bytes()).decode()}"'
    html = re.sub(r'(src)="(img/[^"]+)"', repl, html)
    def repl_css(m):
        rel = m.group(1); p = ROOT / rel
        if not p.exists(): return m.group(0)
        mime, _ = mimetypes.guess_type(str(p)) ; mime = mime or 'image/jpeg'
        return f"url(data:{mime};base64,{base64.b64encode(p.read_bytes()).decode()})"
    return re.sub(r"url\((?:'|\")?(img/[^'\")]+)(?:'|\")?\)", repl_css, html)

ROBUST_SCRIPT = """<script>
function scrollCarousel(id,dir){var c=document.getElementById(id);if(!c)return;var card=c.firstElementChild;var w=card?card.offsetWidth+14:200;c.scrollBy({left:dir*w*2,behavior:'smooth'});}
function toggleDrawer(){document.getElementById('mobileDrawer').classList.toggle('open');document.getElementById('drawerOverlay').classList.toggle('open');}
function togglePlpFilter(){var s=document.getElementById('plpSidebar'),o=document.getElementById('plpFilterOverlay');if(s)s.classList.toggle('open');if(o)o.classList.toggle('open');}
(function(){var s=document.getElementById('campHeroSlides');if(!s)return;var n=s.children.length,i=0,d=document.querySelectorAll('.camp-dot'),t;function go(x){i=(x+n)%n;s.style.transform='translateX(-'+(i*100)+'%)';for(var k=0;k<d.length;k++)d[k].classList.toggle('active',k===i);r();}function nx(){go(i+1);}function pv(){go(i-1);}function r(){clearInterval(t);t=setInterval(nx,6000);}window.campHeroGo=go;window.campHeroNext=nx;window.campHeroPrev=pv;r();var w=s.closest('.camp-hero-slider');if(w){w.addEventListener('mouseenter',function(){clearInterval(t);});w.addEventListener('mouseleave',r);}})();
</script>"""

def build(title, desc, canonical, fragment, out_name, inject=None):
    frag = (ROOT / fragment).read_text(encoding="utf-8")
    if inject:
        for k, v in inject.items(): frag = frag.replace(k, v)
    frag = embed_images(frag)
    page = f"""<!DOCTYPE html><html lang="tr"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title><meta name="description" content="{desc}"><link rel="canonical" href="{canonical}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>{shared_css}</style></head><body>
{embed_images(header_html)}
{frag}
{embed_images(footer_html)}
{ROBUST_SCRIPT}
</body></html>"""
    (ROOT / out_name).write_text(page, encoding="utf-8")
    print(f"OK {out_name}: {len(page)/1024:.0f} KB")

# ---- 404 data-driven category carousels (optional) ----
CAT_DATA = [
  ("Kadın","/kadin","kadin",["Elbise","Pantolon","Tişört","Gömlek","Ceket","Çanta","Ayakkabı","İç Giyim"]),
  # ... add the brand's top categories
]
def slugify(s):
    return s.lower().translate(str.maketrans("şŞıİğĞüÜöÖçÇ ","ssiigguuoocc-")).replace("%","yuzde").replace("&","ve").replace("'","")
def gen_category_carousels():
    out=[]
    for (name,href,key,subs) in CAT_DATA:
        cards="".join(f'<a href="{href}-{slugify(s)}" class="subcat-card"><div class="subcat-thumb"><img src="img/subcat/{key}-{(i%3)+1}.jpg" alt="{s}"></div><span class="subcat-label">{s}</span></a>' for i,s in enumerate(subs))
        out.append(f'<section class="subcat-section" aria-label="{name}"><div class="section-head"><h2 class="section-title">{name}</h2><a href="{href}" class="section-link">Tümünü Gör →</a></div><div class="product-carousel-wrap"><button class="carousel-nav carousel-nav-prev" onclick="scrollCarousel(\'subcat-{key}\',-1)">‹</button><button class="carousel-nav carousel-nav-next" onclick="scrollCarousel(\'subcat-{key}\',1)">›</button><div class="subcat-row" id="subcat-{key}">{cards}</div></div></section>')
    return "\n".join(out)

# ---- Build calls (adapt) ----
build("Sayfa Bulunamadı (404) | Brand", "404 — kategori ve ürünlerden gezinmeye devam edin.",
      "https://www.brand.com/404", "404-content.html", "404.html",
      inject={"<!--CATEGORY_CAROUSELS-->": gen_category_carousels()})

build("Sevgililer Günü Hediyeleri | Brand", "14 Şubat'a özel hediyeler ve indirimler.",
      "https://www.brand.com/sevgililer-gunu", "campaign-content.html", "sevgililer-gunu.html")

# build("Kadın Giyim ... | Brand", ..., "hub-content.html", "kadin-hub.html")  # if building the hub here

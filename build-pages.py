#!/usr/bin/env python3
"""Composes 404.html and sevgililer-gunu.html from shared kadin-hub blocks + content fragments.
Embeds all img/ references as base64 so previews work everywhere."""
import re, base64, mimetypes, pathlib

ROOT = pathlib.Path(__file__).parent
HUB = (ROOT / 'kadin-hub.html').read_text(encoding='utf-8')

# ---- 1) Extract shared CSS (between first <style> and </style>), strip base64 from CSS url() ----
m = re.search(r'<style>(.*?)</style>', HUB, re.DOTALL)
shared_css = m.group(1)
# strip base64 backgrounds from CSS (hero-slide, style-card) -> neutral gradient
shared_css = re.sub(r"url\('data:image[^']*'\)", "linear-gradient(135deg,#e8e8e8,#d8d8d8)", shared_css)

# ---- 2) Extract shared header+drawer (brand bar through </aside>) ----
hm = re.search(r'(<!-- BRAND BAR.*?</aside>)', HUB, re.DOTALL)
header_html = hm.group(1)

# ---- 3) Extract footer ----
fm = re.search(r'(<footer class="footer".*?</footer>)', HUB, re.DOTALL)
footer_html = fm.group(1)

# ---- helper: embed base64 for img/ refs in a fragment ----
def embed_images(html):
    def repl(match):
        attr, rel = match.group(1), match.group(2)
        p = ROOT / rel
        if not p.exists():
            print(f"  ! missing {rel}")
            return match.group(0)
        mime, _ = mimetypes.guess_type(str(p))
        if mime is None:
            ext = p.suffix.lower()
            mime = {'.webp':'image/webp','.svg':'image/svg+xml','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png'}.get(ext,'application/octet-stream')
        b64 = base64.b64encode(p.read_bytes()).decode()
        return f'{attr}="data:{mime};base64,{b64}"'
    # src="img/..." and background-image: url(img/...) and url('img/...')
    html = re.sub(r'(src)="(img/[^"]+)"', repl, html)
    def repl_css(match):
        rel = match.group(1)
        p = ROOT / rel
        if not p.exists(): return match.group(0)
        mime, _ = mimetypes.guess_type(str(p))
        if mime is None: mime = 'image/jpeg'
        b64 = base64.b64encode(p.read_bytes()).decode()
        return f"url(data:{mime};base64,{b64})"
    html = re.sub(r"url\((?:'|\")?(img/[^'\")]+)(?:'|\")?\)", repl_css, html)
    return html

ROBUST_SCRIPT = """<script>
function scrollCarousel(id, direction){
  var c=document.getElementById(id); if(!c)return;
  var card=c.firstElementChild; var w=card?card.offsetWidth+14:200;
  c.scrollBy({left:direction*w*2,behavior:'smooth'});
}
function toggleDrawer(){
  document.getElementById('mobileDrawer').classList.toggle('open');
  document.getElementById('drawerOverlay').classList.toggle('open');
}
function togglePlpFilter(){
  var s=document.getElementById('plpSidebar'), o=document.getElementById('plpFilterOverlay');
  if(s)s.classList.toggle('open'); if(o)o.classList.toggle('open');
}
/* Campaign hero slider (auto, guarded) */
(function(){
  var slides=document.getElementById('campHeroSlides'); if(!slides)return;
  var n=slides.children.length,i=0,dots=document.querySelectorAll('.camp-dot'),t;
  function go(x){i=(x+n)%n;slides.style.transform='translateX(-'+(i*100)+'%)';for(var k=0;k<dots.length;k++)dots[k].classList.toggle('active',k===i);reset();}
  function nx(){go(i+1);}function pv(){go(i-1);}
  function reset(){clearInterval(t);t=setInterval(nx,6000);}
  window.campHeroGo=go;window.campHeroNext=nx;window.campHeroPrev=pv;reset();
  var w=slides.closest('.camp-hero-slider');
  if(w){w.addEventListener('mouseenter',function(){clearInterval(t);});w.addEventListener('mouseleave',reset);}
})();
</script>"""

# ---- 404 category subcategory carousel generator ----
CAT_DATA = [
  ("Kadın", "/kadin", "kadin", ["Elbise","Pantolon","Tişört","Gömlek","Ceket","Çanta","Ayakkabı","İç Giyim"]),
  ("Erkek", "/erkek", "erkek", ["Tişört","Gömlek","Pantolon","Jean","Sweatshirt","Ceket","Ayakkabı","Mont"]),
  ("Çocuk", "/cocuk", "cocuk", ["Bebek","Kız Çocuk","Erkek Çocuk","Tişört","Elbise","Şort Takım","Ayakkabı","Mont"]),
  ("Ayakkabı", "/ayakkabi", "ayakkabi", ["Sneaker","Bot","Topuklu","Terlik","Sandalet","Çizme","Babet","Spor Ayakkabı"]),
  ("Spor & Outdoor", "/spor-outdoor", "spor", ["Spor Ayakkabı","Spor Giyim","Tayt","Outdoor","Kamp","Bisiklet","Fitness","Mont"]),
  ("Ev & Yaşam", "/ev-yasam", "ev", ["Mutfak","Küçük Ev Aletleri","Dekorasyon","Banyo","Aydınlatma","Saklama","Sofra","Aksesuar"]),
  ("Parfüm & Kozmetik", "/parfum-kozmetik", "kozmetik", ["Parfüm","Makyaj","Cilt Bakımı","Saç Bakımı","Erkek Bakım","Ağız Bakımı","Set","Cilt Temizleme"]),
  ("Kampanyalar", "/kampanyalar", "kampanya", ["Süper Fırsatlar","2 Al 1 Öde","Outlet","%50 İndirim","Sezon Sonu","Haftanın Fırsatı","Yeni Sezon","Çok Satanlar"]),
]

def slugify(s):
    tr = str.maketrans("şŞıİğĞüÜöÖçÇ ","ssiigguuoocc-")
    return s.lower().translate(tr).replace("%","yuzde").replace("&","ve").replace("'","")

def gen_category_carousels():
    out = []
    for (name, href, key, subs) in CAT_DATA:
        cid = f"subcat-{key}"
        cards = []
        for idx, sub in enumerate(subs):
            img = f"img/subcat/{key}-{(idx % 3) + 1}.jpg"
            sub_href = f"{href}-{slugify(sub)}"
            cards.append(
                f'<a href="{sub_href}" class="subcat-card"><div class="subcat-thumb"><img src="{img}" alt="{sub}"></div><span class="subcat-label">{sub}</span></a>'
            )
        out.append(f"""  <section class="subcat-section" aria-label="{name} kategorileri">
    <div class="section-head">
      <h2 class="section-title">{name}</h2>
      <a href="{href}" class="section-link">Tümünü Gör →</a>
    </div>
    <div class="product-carousel-wrap">
      <button class="carousel-nav carousel-nav-prev" onclick="scrollCarousel('{cid}', -1)">‹</button>
      <button class="carousel-nav carousel-nav-next" onclick="scrollCarousel('{cid}', 1)">›</button>
      <div class="subcat-row" id="{cid}">
        {''.join(cards)}
      </div>
    </div>
  </section>""")
    return "\n".join(out)

def build(title, desc, canonical, fragment_path, out_name, og_type='website', inject=None):
    frag = (ROOT / fragment_path).read_text(encoding='utf-8')
    if inject:
        for placeholder, html in inject.items():
            frag = frag.replace(placeholder, html)
    frag = embed_images(frag)
    hdr = embed_images(header_html)
    ftr = embed_images(footer_html)
    page = f"""<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{canonical}">
<meta property="og:type" content="{og_type}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>{shared_css}</style>
</head>
<body>
{hdr}
{frag}
{ftr}
{ROBUST_SCRIPT}
</body>
</html>
"""
    (ROOT / out_name).write_text(page, encoding='utf-8')
    print(f"OK {out_name}: {len(page)/1024:.0f} KB")

# Build 404
build(
  title="Sayfa Bulunamadı (404) | Özdilekteyim",
  desc="Aradığınız sayfaya ulaşılamadı. Özdilekteyim kategorileri, popüler markaları ve ürünleri arasında gezinmeye devam edebilirsiniz.",
  canonical="https://www.ozdilekteyim.com/404",
  fragment_path="404-content.html",
  out_name="404.html",
  inject={"<!--CATEGORY_CAROUSELS-->": gen_category_carousels()},
)

# Build campaign
build(
  title="Sevgililer Günü Hediyeleri ve Kampanyaları | Özdilekteyim",
  desc="14 Şubat Sevgililer Günü'ne özel hediyeler, takı, parfüm, saat ve daha fazlasında %50'ye varan indirim fırsatları Özdilekteyim'de.",
  canonical="https://www.ozdilekteyim.com/sevgililer-gunu",
  fragment_path="campaign-content.html",
  out_name="sevgililer-gunu.html",
)

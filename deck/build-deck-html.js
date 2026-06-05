// HTML önizleme deck'i — 404 & Özel Gün Kampanya Sunumu (Inbound DS)
// PPTX ile aynı içerik; tarayıcıda incelemek + görsel QA için. Flexbox layout (taşma yok).
const fs = require('fs'), path = require('path');
const DIR = path.dirname(require.main.filename);
const C = { coral:'#FF7B52', coralDeep:'#E85F36', coralTint:'#FFE3D8', teal:'#10332F', tealSoft:'#1A4238',
  mint:'#E8F5E9', ink:'#10332F', ink2:'#4A4A4A', ink3:'#8A8A8A', line:'#E0E0E0', red:'#D32F2F', green:'#2E7D32', love:'#D6336C' };
const SS = n => `sections-v2/${n}.png`;
const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;');

let slides = [];
const add = html => slides.push(`<section class="slide">${html}</section>`);
const crumb = (a,b) => `<div class="crumb"><b>${a}</b> | ${b}</div>`;
const badge = `<span class="livebadge">CANLI MOCKUP</span>`;
const pageNo = n => `<div class="pageno">${String(n).padStart(2,'0')} / 25</div>`;
const oTeal = `<img class="ologo" src="inbound-o-teal.png">`;

function anatomyRight(o){ add(`
  ${crumb(o.section,o.subtitle)}
  <div class="aRow">
    <div class="aLeft">
      <h2>${esc(o.title)}</h2>
      <span class="lbl">${o.label}</span>
      <p class="body">${esc(o.body)}</p>
      <ul class="bul">${o.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul>
    </div>
    <div class="aRight"><div class="ssframe">${badge}<img src="${SS(o.ss)}"></div></div>
  </div>${oTeal}${pageNo(o.page)}`); }

function anatomyWide(o){ add(`
  ${crumb(o.section,o.subtitle)}
  <div class="wTop"><h2>${esc(o.title)}</h2><span class="lbl">${o.label}</span></div>
  <p class="body wBody">${esc(o.body)}</p>
  <div class="ssframe wide">${badge}<img src="${SS(o.ss)}"></div>
  <ul class="bul2">${o.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul>
  ${oTeal}${pageNo(o.page)}`); }

function anatomyStack(o){ add(`
  ${crumb(o.section,o.subtitle)}
  <h2 class="stkH">${esc(o.title)}</h2>
  <p class="body">${esc(o.body)}</p>
  ${o.strips.map(st=>`<span class="lbl">${st.label}</span><div class="ssframe strip"><img src="${SS(st.ss)}"></div>`).join('')}
  ${oTeal}${pageNo(o.page)}`); }

function overview(o){ add(`
  ${crumb(o.section,o.subtitle)}
  <div class="ovRow">
    <div class="ovLeft"><h2>${esc(o.title)}</h2><p class="body">${esc(o.body)}</p>
      <ul class="bul green">${o.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul></div>
    <div class="ovRight"><div class="ssframe tall"><div class="fullbadge">TAM SAYFA</div><img src="${SS(o.ss)}"></div></div>
  </div>${oTeal}${pageNo(o.page)}`); }

function sep(n,t,s){ add(`<div class="sep"><div class="sepNum">${n}</div><div class="sepbar"></div><h1>${esc(t)}</h1><p>${esc(s)}</p><div class="sepbar"></div></div>`); }

// ---- 1 COVER ----
add(`<div class="cover">
  <div class="bigO o1"></div><div class="bigO o2"></div>
  <div class="kicker">ÖZDİLEK × INBOUND · SAYFA TİPİ TASARIMI</div>
  <h1>404 &amp; Özel Gün<br>Kampanya Sayfaları</h1>
  <p class="sub">Kurtarma odaklı hata sayfası · Evergreen kampanya sayfası · Görünüm + CRO + UX</p>
  <div class="cbar"></div><div class="wm">inbound</div><div class="date">HAZİRAN 2026</div>
</div>`);

// ---- 2 AGENDA ----
add(`<div class="agenda">
  <div class="agL"><div class="agK">SUNUM AKIŞI</div><h1>İKİ YENİ<br>SAYFA TİPİ</h1>
    <p>Her iki sayfa da kadın hub ile aynı tasarım dilinde; içerik sayfa tipine göre. Canlı mockup + marka gereklilikleri.</p><div class="agO">o</div></div>
  <div class="agR">${[
    ['01','404 Sayfası Nedir?','Kurtarma odaklı hata deneyimi, mevcut vs önerilen'],
    ['02','404: Önerilen Yapı + Mockup','Kompakt bant, kategori carousel, koleksiyon, ürünler'],
    ['03','Özel Gün Kampanya Sayfası','Sevgililer Günü: üstte keşif, altta PLP listeleme'],
    ['04','Gereklilikler & Sonraki Adımlar','URL/routing, CMS, SEO, performans, riskler'],
  ].map(([n,t,d])=>`<div class="agItem"><span class="agNum">${n}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join('')}</div>
</div>`);

// ---- 3 SEP01 ----
sep('01','404 Sayfası','Kurtarma odaklı hata deneyimi — çıkmaz değil, yeni başlangıç');

// ---- 4 KONSEPT ----
add(`${crumb('404 Sayfası Nedir','Neden iyi bir 404?')}
  <h2>404 bir çıkmaz değil, kurtarma noktasıdır</h2>
  <p class="body wBody">Kırık link, eski kampanya URL'i veya yanlış yazım — kullanıcı kaçınılmaz olarak 404'e düşer. Kötü bir 404 oturumu bitirir; iyi bir 404 kullanıcıyı saniyeler içinde tekrar akışa sokar.</p>
  <div class="cards4">${[
    ['01','Dead-end = kayıp oturum','Header\'sız, linksiz bir 404 bounce\'u artırır; kullanıcı geri tuşuna basıp siteyi terk eder.',C.red],
    ['02','Kurtarma = dönüşüm','Kategori, marka ve ürün önerileriyle dolu 404, kullanıcıyı doğru sayfaya yönlendirir; oturum sürer.',C.green],
    ['03','SEO: soft-404 riski','Sayfa gerçek 404 döndürmeli (200 değil) ve noindex olmalı; aksi halde Google boş sayfaları indeksler.',C.coral],
    ['04','Marka tutarlılığı','404 da markanın parçası; aynı header/footer, ton ve tasarım dili korunmalıdır.',C.teal],
  ].map(([n,t,d,col])=>`<div class="card"><div class="cardbar" style="background:${col}"></div><div class="cardN" style="color:${col}">${n}</div><h4>${esc(t)}</h4><p>${esc(d)}</p></div>`).join('')}</div>
  <p class="foot">Pazar pratiği: Trendyol, Boyner ve Amazon'un 404'leri tam header/menü + kategori ve ürün önerileri sunar — kullanıcıyı asla boş bırakmaz.</p>
  ${oTeal}${pageNo(4)}`);

// ---- 5 MEVCUT vs ÖNERİLEN ----
add(`${crumb('404 Sayfası Nedir','Mevcut durum vs öneri')}
  <h2>Özdilekteyim'in mevcut 404'ü vs önerimiz</h2>
  <div class="two">
    <div class="col bad"><h3>MEVCUT 404</h3><div class="csub">Canlı sitedeki gerçek durum</div>
      <ul class="x">${['Başlık "Not Found Page" — İngilizce ve jenerik','Header, mega menü ve footer yok — kullanıcı sıkışıyor','Kategori vaadi var ama hiçbir kategori/ürün yok','Öneri, marka linki veya bir sonraki adım yok','Marka tonundan ve tasarım dilinden kopuk'].map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>
    <div class="col good"><h3>ÖNERİLEN 404</h3><div class="csub">Kurtarma odaklı, markaya uygun</div>
      <ul class="ok">${['Tam header + mega menü + footer (navigasyon geri yüklenir)','Kompakt, Türkçe ve markaya uygun hata mesajı','8 üst kategoriye bölünmüş alt-kategori carousel\'leri','Editorial koleksiyonlar + markalar + 2 ürün carousel\'i','Popüler aramalar — her durumda bir sonraki adım'].map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>
  </div>${oTeal}${pageNo(5)}`);

// ---- 6-10 404 ANATOMY ----
anatomyWide({section:'404 · Önerilen Yapı',subtitle:'Kompakt üst bant',page:6,title:'Kompakt hata bandı + header restore',label:'ÜST BANT',
  body:'Üst bant minimal: "404" yalnızca bir kez, küçük bir rozet içinde. Tek satır Türkçe açıklama ve iki net CTA (Ana Sayfa, Kampanyalar). Kocaman 404 grafiği veya sayfa-içi ikinci arama yok — header\'daki arama zaten mevcut.',
  ss:'h404_errtop',bullets:['Tam header + mega menü geri yüklenir','"404" sadece bir kez, küçük rozette','İki CTA: Ana Sayfa + Kampanyalar','Gereksiz sayfa-içi ikinci arama yok']});
anatomyRight({section:'404 · Önerilen Yapı',subtitle:'Kategori bazlı keşif',page:7,title:'Kategoriye bölünmüş alt-kategori carousel\'leri',label:'KATEGORİ KEŞFİ',
  body:'Üst kategorilerin her biri (Kadın, Erkek, Çocuk, Ayakkabı, Spor & Outdoor, Ev & Yaşam, Parfüm & Kozmetik, Kampanyalar) kendi yatay alt-kategori carousel\'ine sahip. Görsel alanlar küçük tutuldu ki tek ekranda çok giriş noktası görünsün.',
  ss:'h404_catcarousel',bullets:['8 üst kategori × alt-kategori carousel\'i','Küçük görsel + etiket kartları','Ok butonları (her ekranda görünür)','CMS-driven: alt kategoriler güncel kalır']});
anatomyRight({section:'404 · Önerilen Yapı',subtitle:'Editorial koleksiyonlar',page:8,title:'Anasayfa mizanseni: koleksiyon kartları',label:'KOLEKSİYONLAR',
  body:'Anasayfadaki "Sezonun Enerjisini Keşfet" mizanseni 404\'e taşındı: Ofis Şıklığı, Davet & Söz, Hafta Sonu, Spor & Active gibi an/koleksiyon kartları. Kategori tekrarından kaçınır ve kullanıcıya ilham verir; gerçek görsel + okunabilirlik gradyanı ile.',
  ss:'h404_disc',bullets:['An/koleksiyon temalı 4 kart','Gerçek görsel (object-fit, sıfır bozulma)','Kategori tekrarı yok — ilham odaklı','Anasayfa tasarım diliyle tutarlı']});
anatomyRight({section:'404 · Önerilen Yapı',subtitle:'Marka + ürün vitrini',page:9,title:'Markalar ve iki ürün carousel\'i',label:'MARKA + ÜRÜN',
  body:'Alt bölümde Popüler Markalar carousel\'i ve iki ürün carousel\'i: En Çok Satanlar ve En Yeni Ürünler. Kullanıcı aradığını bulamasa bile güçlü ürün önerileriyle alışverişe devam edebilir. En altta popüler aramalar her zaman bir sonraki adımı sunar.',
  ss:'h404_bestseller',bullets:['Popüler markalar carousel\'i','En Çok Satanlar + En Yeni Ürünler','Ok butonu + kaydırma','Footer üstü: popüler aramalar']});
overview({section:'404 · Önerilen Yapı',subtitle:'Tam sayfa görünüm',page:10,title:'404: kullanıcı asla boşa düşmez',ss:'h404_overview',
  body:'Üstte kompakt özür, hemen ardından zengin navigasyon: kategori carousel\'leri, koleksiyonlar, markalar ve ürünler. Tek bir dikey akışta onlarca yeni giriş noktası.',
  bullets:['Tam header/footer ile tutarlı çerçeve','8 kategori carousel\'i + koleksiyon kartları','Markalar + 2 ürün carousel\'i','Kompakt üst, zengin alt — dengeli boy','Tamamı mobil uyumlu ve kaydırmalı']});

// ---- 11 SEP02 ----
sep('02','Özel Gün Kampanya Sayfası','Sevgililer Günü örneği — üstte keşif, altta listeleme');

// ---- 12 KAMPANYA KONSEPT ----
add(`${crumb('Kampanya Sayfası','İki katmanlı yapı')}
  <h2>Üstte keşif, altta listeleme — tek sayfada</h2>
  <p class="body wBody">Özel gün kampanya sayfası iki katmanlıdır. Üst katman ilham ve keşif; alt katman gerçek bir PLP listeleme. Kullanıcı ister yukarıdan ilhamla, ister aşağıdan filtreyle ilerler.</p>
  <div class="two">
    <div class="col tintc"><h3 style="color:${C.coralDeep}">ÜST · KEŞİF KATMANI</h3>
      <ul class="dot">${['Hero slider (3-4 temalı banner)','Persona: "Kime hediye?" (Kadına / Erkeğe / Eşe)','Hediye kategorileri sliderı','Özdilekteyim\'in özel önerileri','Bütçe segmentleri + markalar + popüler ürünler'].map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>
    <div class="col grayc"><h3 style="color:${C.teal}">ALT · LİSTELEME (PLP)</h3>
      <ul class="dot">${['Sol sticky filtre (canlı facet\'ler)','Sevgililer Günü filtresi ön-seçili','Sıralama + aktif filtre çipleri','4 sütun ürün grid + sayfalama','Mobilde off-canvas filtre çekmecesi'].map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div>
  </div>
  <div class="evergreen"><b>EVERGREEN</b> &nbsp;URL kalıcıdır (/sevgililer-gunu), yıl damgası yok. Sezon dışında 404 vermez — CMS tarih kuralıyla yedek içerik gösterir; biriken SEO değeri korunur.</div>
  ${oTeal}${pageNo(12)}`);

// ---- 13-19 KAMPANYA ANATOMY ----
anatomyRight({section:'Kampanya · Önerilen Yapı',subtitle:'Hero slider',page:13,title:'Özel günün duygusunu kuran hero slider',label:'HERO SLIDER',
  body:'Tek banner yerine 3-4 temalı slide: hediye setleri, indirim, son gün vurgusu. Otomatik döner; ok ve nokta navigasyonu var. Kampanyanın atmosferini ilk ekranda kurar ve net bir CTA ile yönlendirir.',
  ss:'camp_hero',bullets:['3-4 temalı banner, otomatik geçiş','Ok + nokta navigasyonu','Özel güne özel görsel dil (kalp/hediye)','Net birincil CTA']});
anatomyWide({section:'Kampanya · Önerilen Yapı',subtitle:'Persona — Kime hediye?',page:14,title:'Persona: "Kime hediye alıyorsunuz?"',label:'PERSONA',
  body:'Hediye kararını kolaylaştıran persona bloğu: Kadına, Erkeğe, Eşe. Her kart ilgili koleksiyona yönlendirir. Hediye alışverişinin en büyük sürtünmesi olan "ne alacağım?" sorusunu en başta yanıtlar.',
  ss:'camp_persona',bullets:['3 persona: Kadına / Erkeğe / Eşe','Her biri küratörlü koleksiyona gider','Karar sürtünmesini en başta azaltır','Özel güne göre uyarlanabilir']});
anatomyWide({section:'Kampanya · Önerilen Yapı',subtitle:'Hediye kategorileri',page:15,title:'Sağa kaydırmalı hediye kategorileri',label:'HEDİYE KATEGORİLERİ',
  body:'Sevgiliye hediye kategorileri tek sıra, sağa kaydırmalı slider olarak: parfüm, takı, saat, çikolata, iç giyim. Küçük kartlar ve ok butonlarıyla hızlı, görsel bir hediye keşfi sağlar.',
  ss:'camp_gift',bullets:['Tek sıra, sağa kaydırmalı slider','Parfüm · Takı · Saat · Çikolata · İç Giyim','Küçük kart + ok butonu','Hızlı görsel keşif']});
anatomyRight({section:'Kampanya · Önerilen Yapı',subtitle:'Özel öneriler',page:16,title:'Özdilekteyim\'in özel hediye önerileri',label:'ÖZEL ÖNERİLER',
  body:'"Sevgililer Gününe Özel Özdilekteyim\'in Önerileri" — editör seçkisi ürün carousel\'i. Popüler ürünlerden ayrı, küratörlü bir öneri katmanı; özel güne özel hediye fikirleri sunarak kararsız kullanıcıyı yönlendirir.',
  ss:'camp_rec',bullets:['Küratörlü editör seçkisi','Popüler ürünlerden ayrı katman','Özel güne özgü hediye fikirleri','Sağa kaydırmalı + ok butonlu']});
anatomyStack({section:'Kampanya · Önerilen Yapı',subtitle:'Bütçe + markalar',page:17,title:'Bütçe segmentleri ve öne çıkan markalar',
  body:'"Bütçene Göre Hediye Seç" çipleri kullanıcıyı fiyat segmentine göre yönlendirir (ör. 0-500₺, 500-1000₺, 1000₺+). Öne çıkan markalar carousel\'i ise hediye için güvenilir marka çapaları sunar.',
  strips:[{ss:'camp_budget',label:'BÜTÇEYE GÖRE'},{ss:'camp_brands',label:'ÖNE ÇIKAN MARKALAR'}]});
anatomyRight({section:'Kampanya · Önerilen Yapı',subtitle:'Popüler ürünler',page:18,title:'Sevgililer Gününde popüler ürünler',label:'POPÜLER ÜRÜNLER',
  body:'Popüler ürünler carousel\'i sosyal kanıt ve trend ürünleri öne çıkarır. Kullanıcı kararsızsa "herkesin tercih ettiği" ürünler güçlü bir yönlendirme sağlar; keşif katmanını ürünle sonlandırır.',
  ss:'camp_popular',bullets:['Sosyal kanıt + trend ürünler','Kararsız kullanıcı için güçlü çapa','Sağa kaydırmalı + ok butonlu','Keşif katmanını PLP\'ye bağlar']});
anatomyRight({section:'Kampanya · Önerilen Yapı',subtitle:'PLP listeleme',page:19,title:'Sticky filtreli PLP listeleme',label:'PLP + FİLTRE',
  body:'Keşif katmanının altında gerçek bir listeleme: sol tarafta sayfayla birlikte kayan (sticky) filtre — Kampanyalar (Sevgililer Günü ön-seçili), Cinsiyet, Ürün Çeşidi, Marka, Fiyat, Renk, Beden. Üstte sıralama ve aktif filtre çipleri, sağda 4 sütun ürün grid ve sayfalama.',
  ss:'camp_plp',bullets:['Sol sticky filtre (canlı facet\'ler)','Sevgililer Günü filtresi ön-seçili','Aktif çipler + "Tümünü Temizle"','Mobilde off-canvas çekmece']});
overview({section:'Kampanya · Önerilen Yapı',subtitle:'Tam sayfa görünüm',page:20,title:'Keşiften satın almaya tek akış',ss:'camp_overview',
  body:'Üstte ilham ve hediye keşfi, altta tam katalog listeleme. Kullanıcı duygusal girişten (hero, persona) rasyonel filtrelemeye (PLP) kesintisiz iner.',
  bullets:['Hero + persona + hediye + öneriler (keşif)','Bütçe + marka + popüler ürünler','Sticky filtreli PLP listeleme','Evergreen URL — her yıl yeniden kullanılır','Diğer özel günlere şablon olarak çoğaltılır']});

// ---- 21 SEP03 ----
sep('03','Gereklilikler & Sonraki Adımlar','URL/routing · CMS · SEO · performans · riskler');

// ---- 22 404 GEREKLİLİKLERİ ----
const reqGrid=(items,icon,col)=>`<div class="reqGrid">${items.map(([t,d])=>`<div class="reqCard"><div class="reqIco" style="background:${col}">${icon}</div><div><h4>${esc(t)}</h4><p>${esc(d)}</p></div></div>`).join('')}</div>`;
add(`${crumb('Gereklilikler','404 sayfası')}
  <h2>404 için marka & IT gereklilikleri</h2>
  <p class="body wBody">404 görsel olarak markaya uygun olduğu kadar teknik olarak da doğru kurgulanmalıdır. Aksi halde SEO'da soft-404 ve indeksleme sorunları doğar.</p>
  ${reqGrid([
    ['Gerçek HTTP 404 status','Sunucu soft-200 değil, gerçek 404 döndürmeli — yanlış/silinmiş URL\'ler için doğru sinyal.'],
    ['noindex (nofollow değil)','Sayfa noindex olmalı; Google 404\'leri indekslemez ama içindeki linkleri takip eder.'],
    ['Mümkünse 301 yönlendirme','Kalıcı silinen ürün/kategori URL\'leri en yakın canlı sayfaya 301 ile yönlendirilmeli.'],
    ['CMS/feed-driven içerik','Kategori, marka ve ürün carousel\'leri CMS/feed\'den beslenmeli — kendiliğinden güncel.'],
    ['GA4 404 izleme','404 event\'i ve geldiği kırık URL (referrer) izlenmeli; en sık kırık linkler raporlanmalı.'],
    ['Paylaşılan header/footer','Header/footer ortak bileşenlerden gelmeli — bakım tek noktadan, tutarlılık garanti.'],
  ],'✓',C.green)}${oTeal}${pageNo(22)}`);

// ---- 23 KAMPANYA GEREKLİLİKLERİ ----
add(`${crumb('Gereklilikler','Özel gün kampanya sayfası')}
  <h2>Kampanya sayfası gereklilikleri</h2>
  <p class="body wBody">Evergreen kampanya sayfası, yıllar içinde biriken SEO değerini koruyacak şekilde kalıcı kurgulanmalı; sezon dışı davranışı planlanmalıdır.</p>
  ${reqGrid([
    ['Kalıcı, yıl-damgasız URL','/sevgililer-gunu gibi her yıl aynı URL. Yıl içeren URL\'ler SEO değerini sıfırlar.'],
    ['Sezon dışı: asla 404 değil','Sezon dışında CMS tarih kuralıyla evergreen/yedek içerik gösterilmeli; sayfa 404 vermemeli.'],
    ['CMS\'den yönetilen slotlar','Hero, persona, hediye, öneriler slotları pazarlamanın CMS\'den güncelleyebileceği bileşenler olmalı.'],
    ['Filtre ↔ katalog senkron','PLP facet\'leri canlı katalogla senkron; Sevgililer Günü filtresi ön-seçili gelmeli.'],
    ['Filtre URL\'leri canonical','Filtre kombinasyon URL\'leri temel sayfaya canonical olmalı — index bloat\'u önlenir.'],
    ['Şema + tarih + OG','ItemList/BreadcrumbList şeması, kampanya başlangıç-bitiş tarihleri ve OG görseli tanımlı olmalı.'],
  ],'♥',C.love)}${oTeal}${pageNo(23)}`);

// ---- 24 RİSKLER ----
add(`${crumb('Gereklilikler','Riskler & önlemler')}
  <h2>Olası riskler ve önlemler</h2>
  <div class="riskGrid">${[
    ['Sezon dışı 404','Kampanya URL\'i sezon dışında 404 verirse biriken backlink/SEO değeri kaybolur. CMS tarih kuralıyla evergreen yedek içerik şart.'],
    ['Soft-404 (yanlış status)','404 sayfası 200 döndürürse Google boş/önerili sayfaları indeksler. Gerçek 404 status + noindex döndürülmeli.'],
    ['Keşif ↔ PLP çakışması','Üst keşif ve alt PLP aynı ürünleri farklı sırada gösterirse kafa karıştırır. Üst = küratörlü, alt = tam katalog konumlanmalı.'],
    ['Carousel yorgunluğu','404 ve kampanyada çok sayıda yatay carousel var; her birinin farklı amacı olmalı, aralarında farklı bileşenler yer almalı.'],
    ['Mobil performans','Görsel-yoğun sayfalar; WebP/AVIF, lazy load, sadece görünür kart render\'ı ve hero preload kritik. CWV haftalık izlenmeli.'],
    ['Boş içerik durumu','Ürün/marka carousel\'i boşsa CMS kuralıyla gizlenmeli; "yakında" placeholder marka algısını düşürür.'],
  ].map(([t,d])=>`<div class="riskCard"><div class="riskIco">!</div><div><h4>${esc(t)}</h4><p>${esc(d)}</p></div></div>`).join('')}</div>
  ${oTeal}${pageNo(24)}`);

// ---- 25 KAPANIŞ ----
add(`<div class="closing">
  <div class="bigO o3"></div><div class="cbar"></div>
  <h1>Teşekkürler</h1>
  <p class="csub">Sorularınız ve geri bildirimleriniz için hazırız.<br>Sonraki adım: tasarım onayı + 404 ve kampanya sayfası faz 1 başlangıcı.</p>
  <div class="contacts"><div><span>İLETİŞİM</span><br>welcome@inbound.com.tr</div><div><span>CANLI MOCKUP</span><br>github.com/erdogan1ozdemir</div></div>
  <div class="wm">inbound</div>
</div>`);

const css = `
*{margin:0;padding:0;box-sizing:border-box}
body{background:#33312e;font-family:'Outfit',sans-serif;padding:24px;display:flex;flex-wrap:wrap;gap:24px;justify-content:center}
.slide{position:relative;width:1280px;height:720px;background:#fff;overflow:hidden;border-radius:6px;box-shadow:0 8px 30px rgba(0,0,0,.4);padding:48px 52px;flex:0 0 auto}
h1,h2,h3,h4,.disp{font-family:'Bricolage Grotesque','Outfit',sans-serif}
.crumb{position:absolute;top:22px;left:40px;font-size:11px;color:${C.coral};letter-spacing:.4px}
.crumb b{font-family:'Bricolage Grotesque'}
.slide>h2{font-size:27px;color:${C.teal};font-weight:700;letter-spacing:-.5px;margin-top:18px}
.body{font-size:13px;color:${C.ink2};line-height:1.5}
.wBody{margin:10px 0 0;max-width:1180px}
.lbl{display:inline-block;background:${C.coralTint};color:${C.coralDeep};font-family:'Bricolage Grotesque';font-weight:700;font-size:11px;padding:4px 11px;border-radius:20px;letter-spacing:.5px}
.ologo{position:absolute;bottom:30px;left:40px;width:26px;height:26px;opacity:.85}
.pageno{position:absolute;bottom:32px;right:42px;font-family:'Bricolage Grotesque';font-weight:700;font-size:10px;color:${C.teal};opacity:.5;letter-spacing:1.5px}
.livebadge{position:absolute;top:10px;right:10px;background:${C.coral};color:#fff;font-family:'Bricolage Grotesque';font-weight:700;font-size:10px;padding:4px 9px;border-radius:4px;letter-spacing:.6px;z-index:2}
.ssframe{position:relative;background:#f5f5f5;padding:5px;border-radius:6px;box-shadow:0 6px 18px rgba(16,51,47,.14);display:inline-block;line-height:0}
.ssframe img{max-width:100%;border-radius:3px}
/* anatomy right */
.aRow{display:flex;gap:34px;margin-top:14px;align-items:flex-start}
.aLeft{flex:0 0 360px}.aLeft h2{font-size:25px;color:${C.teal};font-weight:700;line-height:1.12;margin-bottom:14px}
.aLeft .lbl{margin-bottom:12px}.aLeft .body{margin-bottom:16px}
.aRight{flex:1;display:flex;justify-content:center;align-items:flex-start}
.aRight .ssframe{max-width:760px}.aRight img{max-height:560px}
.bul{list-style:none;margin-top:4px}.bul li{font-size:12px;color:${C.ink};padding:5px 0 5px 22px;position:relative}
.bul li:before{content:'➔';position:absolute;left:0;color:${C.coral};font-weight:700}
.bul.green li:before{content:'✓';color:${C.green}}
/* wide */
.wTop{display:flex;align-items:center;gap:16px;margin-top:16px}.wTop h2{font-size:25px;color:${C.teal};font-weight:700;letter-spacing:-.5px}
.ssframe.wide{display:block;margin:18px auto 0;width:fit-content;max-width:1180px}.ssframe.wide img{max-height:240px}
.bul2{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:6px 30px;margin-top:18px;max-width:1180px}
.bul2 li{font-size:12px;color:${C.ink};padding-left:22px;position:relative}.bul2 li:before{content:'➔';position:absolute;left:0;color:${C.coral};font-weight:700}
/* stack */
.stkH{font-size:25px;color:${C.teal};font-weight:700;margin-top:16px;letter-spacing:-.5px}
.ssframe.strip{display:block;margin:8px 0 14px;width:fit-content;max-width:1180px}.ssframe.strip img{max-height:150px}
.anatomyStack .lbl{margin-top:8px}
/* overview */
.ovRow{display:flex;gap:30px;margin-top:14px}.ovLeft{flex:1}.ovLeft h2{font-size:26px;color:${C.teal};font-weight:700;margin-bottom:12px}
.ovRight{flex:0 0 300px;display:flex;justify-content:center}
.ssframe.tall{max-height:600px}.ssframe.tall img{max-height:590px}
.fullbadge{position:absolute;top:5px;left:5px;right:5px;background:${C.coral};color:#fff;text-align:center;font-family:'Bricolage Grotesque';font-weight:700;font-size:10px;padding:5px;letter-spacing:1px;z-index:2;border-radius:3px 3px 0 0}
/* sep */
.sep{position:absolute;inset:0;background:${C.teal};display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
.sepNum{position:absolute;left:-30px;top:50%;transform:translateY(-50%);font-family:'Bricolage Grotesque';font-weight:700;font-size:500px;color:${C.tealSoft};line-height:1}
.sepbar{width:64px;height:3px;background:#fff;border-radius:2px;z-index:1}
.sep h1{color:#fff;font-size:52px;font-weight:700;text-align:center;margin:22px 40px;z-index:1;letter-spacing:-1.5px}
.sep p{color:#fff;opacity:.8;font-size:15px;z-index:1;margin-bottom:22px}
/* cover */
.cover{position:absolute;inset:0;background:${C.coral};display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
.bigO{position:absolute;border-radius:50%;border:60px solid #fff;width:760px;height:760px}
.o1{right:-280px;top:-360px;opacity:.09}.o2{left:-360px;bottom:-360px;opacity:.06}.o3{left:-280px;top:-260px;opacity:.10}
.cover .kicker{color:#fff;opacity:.9;font-family:'Bricolage Grotesque';font-size:12px;letter-spacing:4px;z-index:1;margin-bottom:18px}
.cover h1{color:#fff;font-size:62px;font-weight:700;text-align:center;line-height:1.05;letter-spacing:-2px;z-index:1}
.cover .sub{color:#fff;opacity:.95;font-size:17px;margin-top:22px;z-index:1}
.cbar{width:64px;height:4px;background:#fff;border-radius:2px;margin-top:26px;z-index:1}
.wm{font-family:'Bricolage Grotesque';font-weight:700;color:#fff;font-size:20px;margin-top:30px;z-index:1;letter-spacing:-.5px}
.date{color:#fff;opacity:.4;font-size:10px;letter-spacing:3px;margin-top:14px;z-index:1}
/* agenda */
.agenda{position:absolute;inset:0;display:flex}
.agL{flex:0 0 46%;background:${C.coral};color:#fff;padding:60px 52px;display:flex;flex-direction:column;justify-content:center;position:relative}
.agK{font-family:'Bricolage Grotesque';font-size:11px;letter-spacing:3.5px;opacity:.85;margin-bottom:16px}
.agL h1{font-family:'Bricolage Grotesque';font-size:50px;line-height:1.05;letter-spacing:-1.5px;margin-bottom:26px}
.agL p{font-size:13px;opacity:.95;max-width:330px;line-height:1.5}
.agO{position:absolute;left:52px;bottom:40px;width:26px;height:26px;border:4px solid #fff;border-radius:50%}
.agR{flex:1;padding:52px 46px;display:flex;flex-direction:column;justify-content:center;gap:18px}
.agItem{border-left:0}.agNum{font-size:15px;color:${C.teal};opacity:.4}
.agItem h3{font-size:22px;color:${C.teal};font-weight:700;margin:2px 0}.agItem p{font-size:12px;color:${C.ink2}}
/* cards4 */
.cards4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:24px}
.card{position:relative;background:#fff;border:1px solid ${C.line};border-radius:10px;padding:22px 20px;box-shadow:0 4px 14px rgba(16,51,47,.07);overflow:hidden}
.cardbar{position:absolute;top:0;left:0;right:0;height:6px}
.cardN{font-family:'Bricolage Grotesque';font-weight:700;font-size:26px;opacity:.3;margin:6px 0}
.card h4{font-size:15px;color:${C.teal};margin-bottom:8px}.card p{font-size:11px;color:${C.ink2};line-height:1.4}
.foot{position:absolute;bottom:64px;left:52px;right:52px;font-size:11px;font-style:italic;color:${C.ink3}}
/* two col */
.two{display:flex;gap:24px;margin-top:20px}
.col{flex:1;border-radius:10px;padding:24px 26px}
.col.bad{background:#FBEAEA}.col.good{background:${C.coralTint}}.col.tintc{background:${C.coralTint}}.col.grayc{background:#f5f5f5}
.col h3{font-size:18px;font-weight:700;margin-bottom:4px}.col.bad h3{color:${C.red}}.col.good h3{color:${C.coralDeep}}
.csub{font-size:12px;color:${C.ink3};margin-bottom:14px}
.col ul{list-style:none}.col li{font-size:12.5px;color:${C.ink};padding:7px 0 7px 24px;position:relative;line-height:1.3}
.x li:before{content:'✕';position:absolute;left:0;color:${C.red};font-weight:700}
.ok li:before{content:'✓';position:absolute;left:0;color:${C.green};font-weight:700}
.dot li:before{content:'•';position:absolute;left:4px;font-weight:700;color:${C.coralDeep}}
.grayc .dot li:before{color:${C.ink3}}
.evergreen{margin-top:18px;background:${C.mint};border:1px solid #C8E6C9;border-radius:10px;padding:14px 18px;font-size:12.5px;color:${C.ink};line-height:1.4}
.evergreen b{font-family:'Bricolage Grotesque';color:${C.green}}
/* req grid */
.reqGrid{display:grid;grid-template-columns:1fr 1fr;gap:14px 18px;margin-top:20px}
.reqCard{display:flex;gap:14px;background:#fff;border:1px solid ${C.line};border-radius:8px;padding:16px 18px;box-shadow:0 3px 10px rgba(16,51,47,.06)}
.reqIco{flex:0 0 30px;height:30px;border-radius:50%;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px}
.reqCard h4{font-size:14px;color:${C.teal};margin-bottom:3px}.reqCard p{font-size:11px;color:${C.ink2};line-height:1.35}
/* risk */
.riskGrid{display:grid;grid-template-columns:1fr 1fr;gap:14px 18px;margin-top:18px}
.riskCard{display:flex;gap:13px;background:#fff;border:1px solid ${C.line};border-radius:8px;padding:14px 16px;box-shadow:0 3px 10px rgba(16,51,47,.06)}
.riskIco{flex:0 0 28px;height:28px;border-radius:50%;background:${C.red};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-family:'Bricolage Grotesque'}
.riskCard h4{font-size:13px;color:${C.teal};margin-bottom:3px}.riskCard p{font-size:10.5px;color:${C.ink2};line-height:1.35}
/* closing */
.closing{position:absolute;inset:0;background:${C.coral};display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
.closing h1{color:#fff;font-size:84px;font-weight:700;letter-spacing:-3px;z-index:1}
.closing .csub{color:#fff;opacity:.95;text-align:center;font-size:15px;margin-top:18px;z-index:1;line-height:1.5}
.contacts{display:flex;gap:80px;margin-top:30px;z-index:1;color:#fff;text-align:center;font-size:13px}
.contacts span{font-family:'Bricolage Grotesque';font-weight:700;font-size:10px;opacity:.7;letter-spacing:2px}
`;
const html = `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8">
<title>404 & Özel Gün Kampanya Sunumu — Önizleme</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>${css}</style></head><body>${slides.join('\n')}</body></html>`;
fs.writeFileSync(path.join(DIR,'deck-404-kampanya.html'), html);
console.log('✓ HTML preview yazıldı:', slides.length, 'slayt');

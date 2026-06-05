# 404 Sayfası & Evergreen Kampanya Sayfası — Metodoloji Notları

**Tarih:** 2026-06-05
**Kapsam:** İki yeni sayfa tipi tasarımı (404 + Sevgililer Günü kampanya), kadın hub tasarım diliyle uyumlu.

---

## 0. Mevcut Durum Bulguları (Canlı Site)

### Mevcut 404 Sayfası (`/kadin2` → "Not Found Page")
Canlı 404 sayfası tarandı. Kritik eksiklikler:

| Sorun | Detay |
|-------|-------|
| ❌ **Header yok** | Brand bar, mega nav, arama, sepet — hiçbiri yok. Kullanıcı navigasyonsuz kalıyor. |
| ❌ **Footer yok** | İletişim, kategoriler, yardım linkleri yok. |
| ❌ **Vaadini tutmuyor** | Metin "Aşağıda yer alan kategorilere göz atarak..." diyor ama **hiçbir kategori gösterilmiyor.** |
| ❌ **Ürün/marka yok** | Yönlendirici hiçbir içerik yok. |
| ❌ **Arama yok** | Kullanıcı aradığını bulamadığında tekrar arayamıyor. |
| ⚠️ **Tek CTA** | Sadece "Ana Sayfaya Gidin" — dead-end deneyim. |

**Mevcut copy (korunabilir, iyileştirildi):**
> "Aradığınız sayfa kaldırılmış ya da değiştirilmiş olabilir. Lütfen adresi kontrol edip tekrar deneyiniz."
> "Aşağıda yer alan kategorilere göz atarak binlerce ürün arasından size uygun olabilecek ürünlere göz atabilirsiniz."

### Canlı PLP Filtre Yapısı (Kampanya sayfası için baz)
`/magaza/kadin2` PLP'sinde 14 ana facet tespit edildi:

| # | Facet | Tip |
|---|-------|-----|
| 1 | Kampanyalar | Checkbox (%10/%15/%20... indirim) |
| 2 | Cinsiyet | Checkbox (Kadın, Erkek, Unisex, Çocuk...) |
| 3 | Markalar | Checkbox (Adidas, Armani, Asics...) |
| 4 | Ürün Çeşidi | Checkbox (Atlet, Ayakkabı, Bikini, Bluz...) |
| 5 | Bedenler | Checkbox |
| 6 | Renkler | Checkbox / swatch |
| 7 | Kesim Tipi | Checkbox |
| 8 | Yaka Tipi | Checkbox |
| 9 | Bel | Checkbox |
| 10 | Paça | Checkbox |
| 11 | Fiyat Aralığı | Min-Max input |
| 12 | Taban Malzemesi | Checkbox |
| 13 | Koleksiyon | Checkbox |
| 14 | Ürün Tipi / Stil | Checkbox |

---

## 1. 404 SAYFASI — Metodoloji

### Tasarım Felsefesi
404'e düştüğünü **hissettirmeden** kullanıcıyı tekrar akışa sokmak. "Yol kapandı" değil, "başka bir kapı" hissi. Profesyonel, Özdilekteyim diline uygun, **kısa** (uzun hub değil).

### Sayfa Yapısı (Yukarıdan Aşağıya)

| # | Bölüm | Amaç | Not |
|---|-------|------|-----|
| 1 | **Brand bar + Header + Mega nav** | Navigasyonu geri getir (mevcut 404'ün #1 eksiği) | Hub ile birebir aynı |
| 2 | **404 Hero** | Profesyonel bildirim + arama + 2 CTA | Sol: badge "404 · Sayfa Bulunamadı" + başlık + açıklama + arama kutusu + "Ana Sayfaya Dön" / "Kampanyaları İncele". Sağ: turuncu Ö-halkalı "404" görseli (CSS ile, marka motifi) |
| 3 | **Kategorilere Göz Atın** | Vaadi tut — kategori göster | 6 büyük tile: Kadın, Erkek, Çocuk, Ayakkabı, Ev Tekstili, Kampanyalar |
| 4 | **Popüler Markalar** | Marka arayan kullanıcıyı yakala | Logo carousel (16 marka) |
| 5 | **Bunlar İlginizi Çekebilir** | Ürüne yönlendir | 8 ürünlük yatay carousel |
| 6 | **Popüler Aramalar** | Long-tail arama yönlendirme | 15 chip link |
| 7 | **Footer** | İletişim/kurumsal/uygulama | Hub ile birebir aynı |

### Eklenmemesi Gerekenler (Kısa Tutma)
- ❌ SEO uzun içerik blokları
- ❌ FAQ
- ❌ Loyalty bölümü
- ❌ Plaj/sezon multi-component
→ 404 bir "köprü" sayfa; uzun hub değil.

### SEO/Teknik Notlar
- **HTTP status 404 dönmeli** (soft 404 olmamalı). Sayfa içeriği zengin olsa da sunucu 404 header'ı vermeli.
- **`noindex` meta** önerilir (404'lerin indexlenmemesi için), ancak `nofollow` olmamalı — iç linkler taranabilsin.
- **Arama kutusu** = kullanıcı niyetini kurtarma (en kritik kurtarma noktası).
- **Soft 404 önleme:** Eğer ürün/kategori kaldırıldıysa, mümkünse 301 ile en yakın kategoriye yönlendir; 404 son çare olsun.
- GA4'te **404 event tracking** (sayfa adı + referrer) — hangi kırık linklerin trafik aldığını görmek için.

### Eklenebilecek (Opsiyonel / Sonraki Faz)
- "Son gezdiğiniz ürünler" (kişiselleştirme — çerez/oturum bazlı)
- "En çok aranan kategoriler" (dinamik, GA4 verisinden)
- Aranan terim 404 URL'inden çıkarılıp arama kutusuna otomatik doldurulabilir (`/kadin-elbisesi` → arama: "kadın elbisesi")

### REVİZYON NOTU (v2) — Kategori Bazlı Yapı
İlk versiyondaki büyük "404" görseli + sayfa içi arama kutusu kaldırıldı (arama zaten header'da var, görsel gereksiz yer kaplıyordu). Yeni yapı **kategori bazlı keşif** odaklı:
- **Kompakt üst:** Küçük "404 · Sayfa Bulunamadı" rozeti (404 ifadesi yalnızca 1 kez, küçük) + tek satır mesaj + 2 CTA. Büyük grafik yok.
- **8 kategori carousel'ı:** Her ana kategori (Kadın, Erkek, Çocuk, Ayakkabı, Spor & Outdoor, Ev & Yaşam, Parfüm & Kozmetik, Kampanyalar) kendi başlığı altında, sağa kaydırılabilir **alt kategori kartları** (küçük görsel + etiket) sunar. Kullanıcı hangi reyona gitmek isterse o kategorinin alt kırılımına tek tıkla ulaşır.
- Alt kategori kartları küçük (~128px) tutuldu — görsel alan küçük, daha fazla component.
- Her carousel'ın "Tümünü Gör" linki → ilgili kategori hub'ına bağlanır; alt kategori kartları → alt PLP'ye.

---

## 2. KAMPANYA SAYFASI (Sevgililer Günü) — Metodoloji

### Tasarım Felsefesi
Evergreen kampanya = **keşif (üst) + listeleme (alt)** hibriti. Üstte kampanyaya özel temalı keşif (kategoriler, markalar, bütçe, popüler ürünler), altında klasik PLP (sol filtre + ürün grid). Kullanıcı hem ilham alır hem detaylı filtreleyip alışveriş yapar.

### Sayfa Yapısı (Yukarıdan Aşağıya)

| # | Bölüm | Amaç | Not |
|---|-------|------|-----|
| 1 | **Brand bar + Header + Mega nav** | Navigasyon | Hub ile aynı |
| 2 | **Breadcrumb** | Konum + SEO | Ana Sayfa > Kampanyalar > Sevgililer Günü |
| 3 | **Kampanya Hero** | Tema + indirim mesajı | Romantik pembe/kırmızı banner, "14 Şubat'a Özel" + "%50'ye varan indirim" + CTA |
| 4 | **Hediye Kategorileri** | Niyet bazlı keşif | 6 tile: Takı & Mücevher, Parfüm, Saat, İç Giyim, Hediye Setleri, Çikolata & Sürpriz |
| 5 | **Bütçene Göre Hediye Seç** | Fiyat segmenti (CRO) | 500/1.000/1.500/2.500/5.000 TL altı chip'leri |
| 6 | **Öne Çıkan Markalar** | Marka keşfi | Logo carousel (Guess, CK, Tommy, Penti, Atelier Rebul...) |
| 7 | **Popüler Ürünler** | Sosyal kanıt | Yatay ürün carousel (6+ ürün) |
| 8 | **PLP Listeleme** | Asıl alışveriş alanı | Sol sticky filtre + sağ ürün grid + sıralama + pagination |
| 9 | **SEO İçerik** | Arama görünürlüğü | Kısa, kampanya odaklı paragraf + iç linkler |
| 10 | **Footer** | Kurumsal | Hub ile aynı |

### PLP Listeleme Detayı (Canlı Filtreye Dayalı)

**Sol Filtre Sidebar (desktop sticky, mobile off-canvas drawer):**
- `position: sticky; top: 90px` — scroll ettikçe sabit kalır (talep edildiği gibi)
- Mobilde: gizli, "Filtrele" butonu ile soldan drawer açılır (canlı site pattern'ı)
- Facet'ler (`<details>` accordion): Kampanyalar (Sevgililer Günü pre-checked), Cinsiyet, Ürün Çeşidi, Markalar, Fiyat Aralığı (min-max input), Renkler (swatch), Bedenler
- İlk 3 facet açık (open), gerisi kapalı — bilişsel yük yönetimi
- "Daha Fazla Göster +" link uzun listeleri kısaltır

**Sağ Listeleme:**
- Toolbar: "842 ürün listeleniyor" + "Filtrele" (mobil) + "Sırala" dropdown (Akıllı Sıralama, Çok Satanlar, Fiyat Artan/Azalan, Yeni Gelenler)
- Aktif filtre chip'leri: "Sevgililer Günü ✕" + "Tümünü Temizle"
- Ürün grid: 4 kolon (desktop), 2 kolon (mobile) — hub'daki product-card aynen
- Pagination: ‹ Önceki / 1 2 3 … 24 / Sonraki ›

### SEO/Teknik Notlar (Evergreen Kampanya)
- **Kalıcı URL:** `/sevgililer-gunu` (her yıl aynı URL — evergreen). Yıl bazlı `/sevgililer-gunu-2026` YAPMA; otorite birikmesi için tek URL korunur.
- **Sezon dışı davranış:** Kampanya bitince sayfa 404/410 OLMAMALI. Sayfa canlı kalır; hero + indirimler "Yakında" / "Geçen yılki favoriler" / genel hediye içeriğine döner (CMS tarih kuralı). Böylece her yıl biriken backlink ve ranking korunur.
- **Schema:** `CollectionPage` + `BreadcrumbList` + `ItemList` (ürünler) + opsiyonel `Offer` (indirim). Kampanya tarihli ise `SaleEvent` schema değerlendirilebilir.
- **Filtre URL'leri:** Facet seçimleri `?kampanya=sevgililer&marka=guess` gibi parametre üretir. **Önemli:** Filtrelenmiş kombinasyonlar `canonical` ile ana `/sevgililer-gunu`'ne işaret etmeli (index bloat önleme). Yalnızca yüksek hacimli, anlamlı kombinasyonlar (örn. `/sevgililer-gunu/taki`) ayrı indexlenebilir URL olmalı.
- **İç link:** Hediye kategorisi tile'ları → alt landing'ler (`/sevgililer-gunu/parfum`). Hero CTA → `#urunler` anchor (sayfa içi).
- **Hreflang:** Çok dilli ise tr-TR tanımı.

### CRO Notları
- **Fiyat segmenti** ("Bütçene göre") = karar kolaylaştırıcı; hediye alırken en sık sorulan "ne kadar harcayayım" sorusuna cevap.
- **Sosyal kanıt** ("Popüler ürünler") = belirsizlik azaltır.
- **Geri sayım** (opsiyonel): "Sevgililer Günü'ne X gün" sayacı aciliyet yaratır (sezon aktifken).
- **Hediye paketleme** rozeti (opsiyonel): ürün kartında "Hediye paketi seçeneği" ikonu.

### REVİZYON NOTU (v2) — Kampanya Sayfası Zenginleştirme
- **Hero artık slider** (4 slide): Ana kampanya + Takı + Parfüm + Hediye Seti temalı banner'lar otomatik döner. Özel günlerde birden fazla alt-tema vurgulanabilir.
- **Persona bölümü (YENİ):** "Kime Hediye Alıyorsunuz?" — 3 büyük konsept kart: **Kadınlar İçin**, **Erkekler İçin**, **Eşe Özel** Sevgililer Günü hediyeleri. Her biri ilgili filtrelenmiş listeye (`/sevgililer-gunu/kadina` vb.) yönlendirir. Hediye alışverişinde en kritik karar (kime?) en üste taşındı.
- **Hediye kategorileri artık tek sıra slider** (sağa kaydırılabilir), daha küçük kartlarla — daha fazla kategori sığar (9 kategori), görsel alan küçültüldü.
- **Filtre layout bug'ı giderildi:** Mobil filtre overlay'i grid'in 3. elemanı olarak layout'u bozuyordu; `position:fixed` ile grid akışından çıkarılarak düzeltildi. Sol filtre artık 256px kolonda düzgün, ürünler 4 kolonlu grid'de.
- **Özel gün esnekliği:** Bu yapı her özel güne uyarlanırken hero slider'a 3-4 alt-tema, persona bölümüne ilgili hedef kitleler (Anneler Günü → "Anneye Özel" / "Anneanne & Babaanneye"; Yılbaşı → "Sevgiliye" / "Kendine" / "Ofis Arkadaşına") eklenebilir.

### Diğer Evergreen Kampanyalara Replikasyon
Aynı şablon (üst keşif + alt PLP) şunlara kopyalanabilir:
- **Anneler Günü** → Hediye kategorileri: Takı, Parfüm, Ev Tekstili, Bornoz, Kişisel Bakım
- **Babalar Günü** → Saat, Parfüm, Tıraş, Cüzdan, Spor
- **Yılbaşı** → Hediye setleri, Parti giyim, Ev dekorasyon, Çikolata
- **Black Friday / Efsane Cuma** → İndirim odaklı, fiyat segmenti vurgulu
- **Okula Dönüş** → Kırtasiye, Çocuk giyim, Çanta, Ayakkabı

Her biri: aynı yapı, farklı tema rengi + hediye kategorileri + popüler ürün seti. Tek component kütüphanesi, çoklu kampanya.

---

## 3. ORTAK NOTLAR (Her İki Sayfa)

### Tasarım Tutarlılığı
- **Header / footer / mega nav** → kadın hub ile birebir aynı (paylaşılan component)
- **Tasarım tokenleri** → Montserrat, `#ff6c0c` primary, kampanya için ek `--love: #d6336c` aksanı
- **product-card, brand-carousel, cat-tile, search-tag** → hub'dan yeniden kullanıldı (tutarlılık + geliştirme maliyeti düşük)

### CMS / Yönetim
- Her iki sayfa da **CMS slot tabanlı** olmalı:
  - 404: kategori tile'ları, ürün carousel, popüler aramalar → editör güncellenebilir
  - Kampanya: hero, hediye kategorileri, popüler ürünler, fiyat segmentleri → tarih bazlı zamanlama
- Kampanya sayfası **tarih kuralı** ile otomatik aktif/pasif (start-end). Sezon dışı yedek içerik.

### Performans
- Görseller WebP/AVIF + srcset + lazy load
- Filtre etkileşimleri client-side (anlık), sayfa yenilemeden
- 404 sayfası hafif olmalı (hızlı kurtarma)

### Ölçümleme
- 404: GA4 404 event + arama kullanım oranı + kurtarma (recovery) oranı (404'ten sonra başka sayfaya gidiş)
- Kampanya: bölüm bazlı CTR (hediye kategorisi vs fiyat segmenti vs PLP), filtre kullanım oranı, sıralama tercihi, dönüşüm

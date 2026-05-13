# Özdilekteyim Kadın Hub Sayfa Örneği

Özdilekteyim için tasarlanan kadın kategorisi hub sayfa mockup'ı.

## Deploy

Bu repository statik HTML içeriyor. Vercel'e direkt deploy edilebilir.

### Vercel CLI ile
```bash
npm i -g vercel
vercel
```

### Vercel Dashboard ile
1. https://vercel.com/new adresine git
2. Bu repository'yi import et
3. Framework Preset: **Other**
4. Build Command: boş bırak
5. Output Directory: boş bırak (varsayılan `.`)
6. Deploy

## Yerel Çalıştırma

```bash
# Python ile basit HTTP server
python3 -m http.server 8888

# Tarayıcıda aç:
# http://localhost:8888/kadin-hub.html
```

## Yapı

- `kadin-hub.html` — Ana mockup dosyası (self-contained, ~3.8MB, tüm görseller base64 inline)
- `img/` — Orijinal asset'ler (logo SVG, hero WebP, kategori WebP, marka WebP, ürün JPG)
  - `img/assets/` — Logo ve store ikonları
  - `img/hero/` — Hero slider banner'ları
  - `img/categories/` — Kategori tile görselleri
  - `img/brands/` — Marka logo görselleri

## Mockup İçeriği

Hub sayfasında 16 bölüm bulunuyor:

1. Top strip (kampanya bildirimi)
2. Header (logo + Mağaza/GustoMarket switch + arama + actions)
3. Mega navigation
4. Breadcrumb
5. Hero slider (3 slide, otomatik dönüşlü)
6. Trend Aramalar (chip carousel)
7. Kadın Kategorileri (8 tile)
8. Favori Markalar (20 marka logo)
9. Özdilek'in Farkını Keşfet (split showcase)
10. En Avantajlı Ürünler (carousel)
11. Sezonun Enerjisini Keşfet (4 koleksiyon)
12. Yeni Sezon, Yeni Stil (carousel)
13. En Favori Parçalarla Tarzın Bi' Başka! (4 editorial kart)
14. Kısa Süreli Fırsatlar! (carousel)
15. Loyalty (Mobil App + Club)
16. Popüler Aramalar + Trust + SEO collapsible + FAQ + Footer

## Tasarım Sistemi

- **Primary:** `#ff6c0c` (Özdilek turuncu)
- **Font:** Montserrat
- **Max-width:** 1344px
- **Framework:** Vanilla HTML/CSS/JS (Spartacus uyumlu)

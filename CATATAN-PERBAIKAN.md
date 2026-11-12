# Catatan perbaikan (PWA Windows 7 + versi ringan)

## Cara pasang di GitHub
1. Hapus isi lama repo, lalu upload SEMUA isi folder ini (termasuk `sw.js`, `manifest.json`, folder `vendor/` dan `fonts/`).
2. Tunggu GitHub Pages selesai (1-2 menit), buka situsnya sekali saat online.

## Di setiap PC (WAJIB sekali, karena ID aplikasi berubah)
1. Buka `chrome://apps`, klik kanan aplikasi lama, Hapus. Hapus juga shortcut desktop lama (termasuk yang berakhiran "(1)").
2. Buka situsnya di Chrome, klik tombol "Pasang/Instal Aplikasi" (atau ikon instal di kolom alamat).
3. Windows 7 butuh Chrome/Edge versi 109 (terakhir yang mendukung Win 7).

## Update otomatis
Setiap file diperiksa saat aplikasi dibuka; bila ada versi baru, halaman memuat ulang sendiri.
Jika mengedit file langsung di GitHub, tidak perlu mengubah apa pun di sw.js.

## Mode ringan Jadwal Admin
Otomatis di Windows XP-8 / PC spek rendah. Paksa: tambahkan ?lite=1 di alamat, matikan: ?lite=0.

## Tampilan 2026 (modern-2026.css)
- File baru `modern-2026.css` dimuat setelah `app.css` (1 baris <link> di index.html + daftar CORE di sw.js).
- Kembali ke tampilan lama: hapus baris <link> tersebut.
- Ringan untuk Windows 7: tanpa blur/backdrop-filter, hanya satu animasi masuk (transform/opacity).
- Upload SEMUA file (termasuk modern-2026.css, index.html, sw.js) ke GitHub.

## Tampilan PC lebar (blok "DESKTOP 2026" di akhir modern-2026.css)
- Hanya aktif di layar >= 1024px; HP/tablet kecil tidak berubah.
- Lebar halaman penuh mengikuti layar (maks 1680px), bukan lagi 1240px.
- Beranda: kartu saldo + grafik, lalu tabel (kiri) dan peringkat (kanan, menempel saat scroll).
- Ajukan Pembelian: layar terbagi (judul kiri, formulir kanan). Arisan: 2 kolom. Riwayat/Aset: grid kartu otomatis.
- app.js: tinggi baris tabel PC diperbaiki (5 Data kini benar-benar 5 baris), default 15 baris di layar >=1280px, tombol "10 Data" ditambah.
- Cabut tampilan PC baru: hapus blok DESKTOP 2026 dari modern-2026.css.

## v3 — Grafik KAS-IDX besar + kartu saldo ringkas (HP & PC)
- `modern-2026.css`: blok "v3" di akhir file (hapus blok itu untuk kembali ke tampilan sebelumnya).
- `app.js`: fungsi `initHeroChart` & `drawHeroChart` ditulis ulang: area grafik penuh di bawah baris judul, candle bergeser mulus tiap candle baru, harga live bergerak tiap 0,8 dtk, garis harga terakhir + cincin berdenyut, animasi masuk. Menghormati "kurangi gerakan".
- `sw.js`: VERSION jadi d2026pc03 supaya semua perangkat memuat versi baru.
- PC (>=900px): kartu saldo di kiri (27% lebar, 3 baris), grafik di kanan (73%, tinggi 380-580px). HP: saldo ringkas, grafik ~310-410px.

## v4 — Saldo di bawah grafik (HP & tablet)
- `modern-2026.css`: blok "v4" di akhir file. Di layar < 900px urutan jadi: grafik KAS-IDX, lalu kartu Saldo akhir / Kas masuk / Kas keluar. PC (>= 900px) tetap: saldo kiri, grafik kanan.
- `sw.js`: VERSION jadi d2026pc04 supaya semua perangkat memuat versi baru.
- Kembali ke susunan sebelumnya: hapus blok v4 dari modern-2026.css.

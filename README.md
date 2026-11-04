# JHT KAS Adm PRG

Website buku kas admin gudang — tampilan tamu (lihat saja) + dashboard admin (kelola transaksi & anggota) + alur pengajuan pembelian dengan persetujuan admin.
Dibangun dengan HTML, CSS, dan JavaScript murni (tanpa framework). Mode gelap/terang, responsif HP & PC.

## Fitur utama
- **Tabel Transaksi** ala-Excel (geser 2 arah, sticky header, filter Kas Masuk/Keluar, kontrol 5/15/Semua baris)
- **Peringkat Setoran Anggota** dengan diagram bar animasi, avatar unik bergradient, anggota nonaktif otomatis diberi tanda pudar+coret
- **Ekspor Excel & PDF** dari data transaksi (tersedia di menu ☰ / desktop)
- **Pengajuan Pembelian** — siapa saja bisa mengajukan pembelian barang/jasa (solo atau patungan beberapa admin), masuk ke dashboard admin untuk di-ACC/ditolak. Jika disetujui, otomatis tercatat sebagai transaksi kas keluar.
- **Riwayat Pengajuan** & **Aset Barang/Jasa** — dapat diakses dari menu ☰, transparan untuk semua orang
- Dashboard admin: kelola transaksi, anggota (aktif/nonaktif), histori, laporan bulanan, dan pengajuan pembelian

## Cara pakai (lokal, tanpa install apapun)
1. Extract semua file (index.html, style.css, script.js) ke **folder yang sama**, lalu buka `index.html` di browser.
2. Atau jalankan server statis sederhana supaya lebih stabil:
   ```
   npx serve .
   ```
   lalu buka `http://localhost:3000`

## Login admin (mode uji)
- Username: `admin`
- Password: `admin123`

Kredensial ini disimpan polos di localStorage — **wajib diganti dengan sistem login/backend sungguhan** sebelum website ini dipakai untuk data kas nyata secara publik, supaya orang lain tidak bisa login dari perangkat mereka sendiri.

## Penyimpanan data
Semua data (transaksi, anggota, pengajuan pembelian) disimpan di **localStorage** browser — artinya:
- Data hanya tersimpan di perangkat/browser tempat kamu membukanya.
- Kalau dibuka di HP lain / browser lain, datanya akan mulai dari data contoh (seed) lagi.
- Untuk data yang bisa diakses bersama oleh banyak orang (tamu di HP masing-masing melihat data yang sama, termasuk pengajuan pembelian dari orang lain), langkah selanjutnya adalah menyambungkan ke backend (mis. Firebase, Supabase, atau Google Sheets API) menggantikan bagian `localStorage` di `script.js`.

## Struktur file
```
index.html   -> struktur HTML halaman + sprite ikon SVG
style.css    -> semua styling (warna, layout, animasi, responsif)
script.js    -> data, logika render, dan interaksi
README.md    -> file ini
```

## Push ke GitHub
```
git init
git add .
git commit -m "JHT KAS Adm PRG - versi awal"
git branch -M main
git remote add origin <url-repo-kamu>
git push -u origin main
```
Untuk publish otomatis sebagai website (GitHub Pages): Settings → Pages → Source: branch `main`, folder `/root`.

## Mode offline & update otomatis
**Offline-first**
- Buka situs sekali saat online → seluruh aplikasi (halaman, CSS, JS, font, SDK Firebase, pustaka Excel/PDF) dan **data kas terakhir** tersimpan di perangkat.
- Setelah itu bisa dibuka tanpa internet. Pill di atas layar memberi tahu "Mode offline — data per <waktu>".
- Perubahan yang dibuat admin saat offline diantre dan **dikirim otomatis** begitu tersambung (pill "Menyinkronkan perubahan…" → "Semua perubahan sudah tersinkron ✓").
- Kalau perangkat belum pernah membuka situs saat online, layar menjelaskan hal itu dan memuat ulang sendiri begitu tersambung.

**Update otomatis (tanpa langkah manual)**
- Saat tersambung kembali, tab dibuka lagi, atau tiap 15 menit, service worker membandingkan isi file (hash) dengan versi tersimpan.
- Ada file yang berubah → disimpan dan halaman memuat ulang sendiri.
  Jika pengguna sedang mengetik / membuka dialog, muncul tombol **Perbarui** supaya isian tidak hilang.
- **Cukup upload file baru ke hosting.** Tidak wajib mengubah `version.json`, `CACHE_VERSION`, atau angka `?v=`.
- Daftar file yang disimpan dibaca otomatis dari `index.html`.

**Opsional / darurat**
- Ubah isi `version.json` → memaksa semua perangkat memperbarui.
- Naikkan `CACHE_VERSION` di `sw.js` → semua perangkat membuang cache lama sepenuhnya.
- Tambah file statis baru yang tidak dirujuk `index.html` (mis. gambar yang dimuat lewat JS) → tambahkan ke `STATIC_ASSETS` di `sw.js`.

**Catatan**
- Service worker hanya jalan di HTTPS (GitHub Pages sudah HTTPS) atau `localhost`.
- Perubahan offline hanya aman selama cache browser tidak dihapus sebelum sempat terkirim; aplikasi meminta browser agar penyimpanannya tidak dibuang otomatis.
- Bila dua admin mengedit data yang sama saat offline, berlaku pola lama aplikasi: penyimpanan terakhir yang menang.

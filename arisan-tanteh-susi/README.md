# Arisan Tanteh Susi — situs terpisah

Fitur Arisan sekarang **berdiri sendiri**, terpisah total dari situs JHT KAS
(`index.html` / `script.js` / `style.css` di folder induk). Tujuannya: situs
JHT KAS jadi lebih ringan (tidak perlu lagi memuat kode & data arisan sama
sekali), dan situs arisan bisa dikembangkan/di-cache terpisah.

## Tampilan & mesin kocok

- Palet warna: emerald gelap + brushed gold + rose (lebih kaya kontras &
  ada aksen "kilau foil" bergerak pelan di pinggir kartu tiket — satu
  sentuhan mewah, bukan efek bertebaran di mana-mana).
- **Mesin 1 — reel avatar** (gaya slot machine 3-reel), seperti sebelumnya.
- **Mesin 2 — papan pengocok huruf** (gaya split-flap/bandara): tampil
  tepat di bawah mesin reel saat kocokan berlangsung. Lampu sorot
  "mengocok" di papan A–Z, lalu di bawahnya huruf nama pemenang muncul
  satu per satu secara acak sampai lengkap.
- Kedua mesin berjalan **bersamaan** saat admin memulai kocok, dan hasil
  akhir (nama pemenang) baru diumumkan setelah keduanya selesai — supaya
  terasa seperti satu momen pengumuman, bukan dua animasi terpisah.
- Penting: kedua mesin murni **formalitas visual**. Pemenang sudah
  ditentukan di server (acak atau sesuai urutan giliran yang diatur admin)
  tepat saat tombol "Mulai Kocok" ditekan — animasi cuma memutar ulang
  hasil itu secara dramatis di layar semua orang.
- Logika kedua mesin ada di satu berkas bersama, `draw-engine.js`, dipakai
  oleh halaman publik maupun admin supaya tidak ada kode terduplikasi.

## Struktur berkas

```
arisan-tanteh-susi/
├─ index.html      halaman publik (lihat batch, countdown, daftar, live kocok, riwayat)
├─ admin.html      dashboard admin — login & kelola SENDIRI (terpisah dari admin JHT KAS)
├─ style.css       tampilan (satu tema gelap: emerald + gold + rose), tanpa framework
├─ firebase.js     lapisan data — Firebase Modular SDK (lebih ringan dari compat SDK)
├─ helpers.js      fungsi utilitas murni (format tanggal/uang, avatar, dsb — tanpa Firebase)
├─ draw-engine.js  mesin animasi kocok (reel avatar + papan huruf), dipakai bareng
├─ app.js          logika halaman publik
└─ admin.js        logika dashboard admin
```

Tidak ada file gambar/aset yang dipakai — logo dibuat dari SVG inline, jadi
folder ini tetap ringan (kode sumber ±80 KB total sebelum di-gzip — dan
setelah di-gzip oleh server/hosting biasanya turun ke puluhan KB saja,
tanpa font-weight
ekstra karena cuma memuat 2 ketebalan font Fraunces).

## Kenapa masih 1 database?

Supaya data arisan yang sudah ada tidak hilang, situs ini tetap memakai
**proyek Firebase yang sama** dengan JHT KAS — hanya dokumen `kas/arisan`
(bentuk datanya sama persis seperti sebelumnya: `{ list: [...] }`). Situs JHT
KAS sendiri sudah **tidak menyentuh** dokumen ini sama sekali lagi (lihat
`firebase-config.js` di folder induk — referensi ke arisan sudah dihapus).

Aturan keamanan Firestore (`firestore.rules` di folder induk) tidak perlu
diubah — baris `match /kas/arisan { allow read, write: if true; }` yang lama
tetap berlaku dan sudah cukup untuk situs baru ini.

## Login admin

Dashboard admin arisan (`admin.html`) memakai **akun Firebase Auth yang sama**
dengan admin JHT KAS (username `admin`), tapi sesi login-nya independen —
login di satu dashboard tidak otomatis login di dashboard lainnya, dan
sebaliknya. Kalau mau memisah akun admin arisan dari akun admin JHT KAS
sepenuhnya, cukup ubah pemetaan `MAP` di `firebase.js` (fungsi `adminEmail`)
supaya username arisan menunjuk ke email Firebase Auth yang berbeda, lalu buat
user itu di Firebase Console.

## Cara deploy

Paling sederhana: taruh folder `arisan-tanteh-susi/` **persis seperti ini**,
sebagai subfolder di dalam folder JHT KAS yang sama (baik di hosting statis
biasa, Firebase Hosting, Netlify, dsb). Dengan begitu:

- Dari JHT KAS, tombol menu "Arisan Tanteh Susi" akan membuka
  `arisan-tanteh-susi/index.html` di tab baru.
- Dari situs arisan, tombol kembali akan membuka `../index.html` (JHT KAS).

Kalau kamu menaruhnya di lokasi lain (domain/subdomain berbeda), tinggal
sesuaikan dua tautan itu:
- di `script.js` (folder induk): cari `arisan-tanteh-susi/index.html` (2 tempat)
- di `arisan-tanteh-susi/index.html`: cari `../index.html` (2 tempat)

## Fitur yang tersedia

**Halaman publik**
- Kartu batch bergaya "tiket undian" (nama, status, iuran, kuota, countdown)
- Form pendaftaran (nama + WhatsApp opsional) — langsung masuk status "pending"
- Daftar anggota aktif & yang menunggu ACC (medali koin dengan avatar warna)
- Tampilan live kocok (mesin slot 3-reel) yang tersinkron real-time — semua
  orang yang sedang membuka halaman ini di HP/PC masing-masing melihat
  animasi & hasil yang sama
- Riwayat batch yang sudah selesai

**Dashboard admin (terpisah, perlu login)**
- Buka batch pendaftaran baru (nama, iuran, kuota, tanggal kocok pertama)
- ACC / tolak / keluarkan anggota
- Ubah iuran & kuota kapan saja
- Tutup pendaftaran & mulai arisan
- Atur urutan giliran menang (opsional — kalau kosong, diundi acak)
- Mulai kocok manual, atau biarkan otomatis jalan saat tanggal kocok tiba
  (dicek tiap 20 detik selama dashboard admin terbuka)
- Konfirmasi & catat pemenang tiap ronde, riwayat otomatis tersimpan
- Hapus batch / hapus riwayat batch selesai

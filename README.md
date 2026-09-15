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
├─ draw-actions.js aksi kocok bersama (mulai & kunci pemenang) — dipakai app.js & admin.js
├─ app.js          logika halaman publik (termasuk tombol kocok publik + FAB)
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

## Update: perbaikan bug reel + performa jauh lebih ringan

**Bug reel kocok "tidak berputar" — diperbaiki.** Penyebabnya aturan CSS
`@media (prefers-reduced-motion: reduce)` versi lama yang memaksa
`transition-duration: .01ms !important` ke SEMUA elemen. Animasi reel kocok
dijalankan lewat CSS `transition` yang durasinya di-set oleh JavaScript
(bisa 40–60 detik) — begitu HP/browser preview punya setelan "kurangi
gerakan" aktif (banyak terjadi di Android/WebView secara default), transisi
itu langsung dipaksa jadi ~0 detik, sehingga reel "meloncat" ke hasil akhir
tanpa terlihat berputar sama sekali. Sekarang aturan itu dipersempit —
cuma menghentikan animasi dekoratif yang berulang terus (latar, denyut
tombol, dsb), tidak lagi menyentuh transisi reel yang justru membawa
informasi penting.

**Website dibuat jauh lebih ringan**, tanpa mengorbankan tampilan:
- Latar "aurora" senja yang bergerak dulu menganimasikan `background-position`
  langsung di `<body>` (dipaksa gambar ulang tiap frame, + `background-attachment:fixed`
  yang berat di mobile). Sekarang dipindah ke satu lapisan terpisah yang
  digerakkan lewat `transform` — cukup dipindah oleh GPU, jauh lebih hemat.
- Progress bar saat live draw dulu menganimasikan `width` (memicu reflow
  tiap frame). Sekarang pakai `transform: scaleX()` yang jauh lebih murah.
- Tombol "Mulai Kocok Sekarang" & tombol kocok mengambang (FAB) dulu
  menganimasikan `box-shadow` **selamanya** selama batch "berjalan" (bisa
  berhari-hari halaman dibiarkan terbuka). Sekarang efek denyutnya jadi
  cincin cahaya terpisah yang dianimasikan lewat `opacity`/`transform`,
  dan cuma berdenyut beberapa kali lalu diam — bukan tanpa henti.
- Blur kaca (`backdrop-filter`) di topbar yang sticky dikurangi dari 10px
  ke 6px — kombinasi sticky + blur tebal termasuk yang paling berat untuk
  discroll di HP kelas menengah ke bawah.
- Font Google yang diunduh dirampingkan (bobot 500 yang sebenarnya tidak
  dipakai di mana pun dihapus dari permintaan).

Semua perubahan ini murni teknis (tidak mengubah tampilan yang terlihat
mata secara berarti) — situsnya harus terasa jauh lebih mulus terutama di
HP dengan spesifikasi menengah ke bawah, dan reel kocok sekarang benar-benar
terlihat berputar di semua kondisi perangkat.

## Update: siapa saja boleh mengocok (bukan cuma admin)

Perubahan utama dari versi sebelumnya:

- **Halaman publik (`index.html`) sekarang punya tombol "Mulai Kocok Sekarang"
  sendiri**, tampil di kartu tiket saat status arisan "Berjalan" dan belum
  ada kocokan yang live. Siapa pun yang membuka halaman ini — anggota atau
  bukan — boleh menekannya. Begitu ditekan, semua orang yang sedang membuka
  halaman (di HP/PC masing-masing) langsung melihat live draw yang sama.
- **Tombol kocok mengambang (floating action button)** muncul di pojok kanan
  bawah, di luar alur konten utama, selama ada kocokan yang bisa/sedang
  dimulai — supaya pengunjung tidak perlu scroll mencari tombolnya.
- Tombol "Mulai Kocok Sekarang" di dashboard admin (`admin.html`) tetap ada,
  cuma sekarang sama-sama memanggil logika yang sama dengan halaman publik
  (lihat `draw-actions.js`) — tidak ada jalur khusus admin lagi.
- **Hasil kocokan dikunci otomatis** begitu animasi selesai di layar siapa
  pun yang sedang menonton (tidak perlu lagi admin klik "Konfirmasi" secara
  manual). Fungsi `finalizeDraw()` di `draw-actions.js` selalu mengambil data
  terbaru dari server dulu sebelum menulis, jadi aman dipanggil bersamaan
  dari banyak tab.
- Siapa yang MENANG tetap 100% ditentukan oleh sistem (urutan giliran yang
  diatur admin, atau acak kalau belum diatur) — tepat saat kocokan dimulai,
  bukan oleh siapa yang menekan tombolnya. Menekan tombol cuma memicu
  momennya, tidak memengaruhi hasil.
- Ini bisa dibuka untuk publik karena aturan keamanan Firestore
  (`kas/arisan`) memang sudah `allow read, write: if true` sejak awal — jadi
  secara teknis siapa pun yang tahu URL memang sudah bisa menulis data ke
  dokumen ini. Kalau ke depannya kamu ingin tombol kocok publik ini dibatasi
  lagi (mis. hanya anggota yang login), perlu ditambah lapisan otentikasi
  baru di Firestore rules + UI, bukan cuma di `app.js`.

## Fitur yang tersedia

**Halaman publik**
- Kartu batch bergaya "tiket undian" (nama, status, iuran, kuota, countdown)
- Form pendaftaran (nama + WhatsApp opsional) — langsung masuk status "pending"
- Daftar anggota aktif & yang menunggu ACC (medali koin dengan avatar warna)
- **Tombol "Mulai Kocok Sekarang" terbuka untuk siapa saja**, plus tombol
  kocok mengambang (FAB) yang selalu terlihat di pojok layar
- Tampilan live kocok (mesin slot 3-reel + papan huruf) yang tersinkron
  real-time — semua orang yang sedang membuka halaman ini di HP/PC
  masing-masing melihat animasi & hasil yang sama, dan hasilnya otomatis
  terkunci/tercatat begitu animasi selesai
- Riwayat batch yang sudah selesai

**Dashboard admin (terpisah, perlu login)**
- Buka batch pendaftaran baru (nama, iuran, kuota, tanggal kocok pertama)
- ACC / tolak / keluarkan anggota
- Ubah iuran & kuota kapan saja
- Tutup pendaftaran & mulai arisan
- Atur urutan giliran menang (opsional — kalau kosong, diundi acak)
- Mulai kocok manual (tombol yang sama juga tampil di halaman publik), atau
  biarkan otomatis jalan saat tanggal kocok tiba (dicek tiap 20 detik selama
  dashboard admin terbuka)
- Pemenang tiap ronde tercatat otomatis begitu animasi selesai, riwayat
  otomatis tersimpan
- Hapus batch / hapus riwayat batch selesai

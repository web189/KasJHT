/* ============================================================
   Arisan Tanteh Susi — aksi kocok BERSAMA (admin & publik)
   Dipakai oleh app.js (halaman publik) maupun admin.js (dashboard),
   supaya "siapa boleh menekan tombol kocok" cukup diatur SATU kali
   di sini, tidak terduplikasi di dua tempat.

   Prinsip yang tidak berubah dari desain sebelumnya:
   - Pemenang ditentukan & DIKUNCI di sini, tepat saat kocokan dimulai
     (urutan giliran kalau admin sudah mengatur, atau acak kalau belum).
     Animasi reel/huruf di layar cuma memutar ulang hasil ini secara
     dramatis — bukan yang menentukan siapa menang.
   - finalizeDraw() SELALU mengambil data terbaru dari server dulu
     sebelum menulis, dan langsung berhenti kalau ronde ini ternyata
     sudah dikunci lebih dulu oleh tab/pengunjung lain. Ini yang bikin
     aman dipakai bersamaan oleh banyak orang di banyak HP/PC.
============================================================ */
import { Arisan } from "./firebase.js";
import { eligibleMembers, todayISO, liveDrawInfo } from "./helpers.js";

export function pickWinner(batch) {
  const eligible = eligibleMembers(batch);
  if (!eligible.length) return null;
  const order = batch.winnerOrder || [];
  for (const id of order) {
    const m = eligible.find((x) => x.id === id);
    if (m) return m;
  }
  return eligible[Math.floor(Math.random() * eligible.length)];
}

/** Mulai kocokan. `list` = array batch yang sedang dipegang klien (akan
 *  dimutasi in-place lalu disimpan), `batchId` = batch yang mau dikocok,
 *  `maxDurationMs` = total durasi animasi terpanjang (reel/huruf). */
export async function beginDraw(list, batchId, maxDurationMs) {
  const batch = list.find((b) => b.id === batchId);
  if (!batch) throw new Error("Batch tidak ditemukan");
  if (batch.status !== "berjalan") throw new Error("Arisan ini belum berjalan");
  // PENTING: jangan cek batch.liveDraw.active mentah-mentah. Kalau ada sesi
  // kocok sebelumnya yang macet/ditinggal sebelum sempat finalizeDraw() (mis.
  // gara-gara bug reel yang sudah diperbaiki), flag "active" itu bisa nyangkut
  // permanen di database walau kocokannya sudah lama kelar/expired — akibatnya
  // SEMUA klik "Mulai Kocok" berikutnya cuma no-op diam-diam (toast sukses
  // muncul, tapi tidak ada kocokan baru yang benar-benar dibuat, dan mesinnya
  // tidak pernah tampil). liveDrawInfo() sudah tahu cara mendeteksi kocokan
  // yang sudah kedaluwarsa (lewat GRACE_MS) — pakai itu supaya kocokan basi
  // tidak mengunci kocokan baru selamanya.
  if (liveDrawInfo(batch)) return batch; // masih benar-benar berlangsung — sudah ada yang mulai duluan
  const winner = pickWinner(batch);
  if (!winner) throw new Error("Tidak ada anggota yang eligible untuk dikocok");
  batch.liveDraw = {
    active: true, startedAt: Date.now(), durationMs: maxDurationMs,
    winnerId: winner.id, winnerNama: winner.nama,
  };
  await Arisan.saveList(list);
  return batch;
}

/** Kunci & catat pemenang setelah animasi selesai. Aman dipanggil dari
 *  banyak tab sekaligus (publik maupun admin) — lihat catatan di atas. */
export async function finalizeDraw(batchId, winnerId, winnerNama) {
  const fresh = await Arisan.getList();
  const batch = fresh.find((b) => b.id === batchId);
  if (!batch || !batch.liveDraw || !batch.liveDraw.active || batch.liveDraw.winnerId !== winnerId) {
    return null; // sudah dikunci duluan oleh tab lain, atau datanya sudah berubah
  }
  const round = (batch.currentRound || 0) + 1;
  const m = (batch.members || []).find((x) => x.id === winnerId);
  if (m) { m.sudahMenang = true; m.menangRound = round; m.menangTgl = todayISO(); }
  batch.drawHistory = batch.drawHistory || [];
  batch.drawHistory.push({ round, tgl: todayISO(), winnerId, winnerNama });
  batch.currentRound = round;
  batch.winnerOrder = (batch.winnerOrder || []).filter((id) => id !== winnerId);
  batch.liveDraw = null;
  if (!eligibleMembers(batch).length) batch.status = "selesai";
  await Arisan.saveList(fresh);
  return batch;
}

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
   - SIAPA SAJA boleh menekan tombol "Mulai Kocok" (beginDraw) — tapi hasil
     kocokan BELUM resmi begitu animasi selesai. lockDrawResult() cuma
     memindahkan hasil dari "sedang berlangsung" (liveDraw) ke "menunggu
     keputusan admin" (pendingResult). Anggota baru benar-benar tercatat
     menang setelah admin menekan "Sahkan" lewat approveDrawResult() — atau
     dibatalkan & anggota kembali eligible lewat rejectDrawResult() kalau
     admin menekan "Tidak Sah". Jadi: tombol putar = publik, KEABSAHAN
     pemenang = mutlak keputusan admin.
   - Semua fungsi tulis SELALU mengambil data terbaru dari server dulu
     sebelum menulis, dan langsung berhenti kalau datanya sudah berubah
     duluan oleh tab/pengunjung lain. Ini yang bikin aman dipakai
     bersamaan oleh banyak orang di banyak HP/PC.
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
  if (batch.pendingResult) throw new Error("Ada hasil kocokan sebelumnya yang masih menunggu keputusan admin");
  // PENTING: jangan cek batch.liveDraw.active mentah-mentah. Kalau ada sesi
  // kocok sebelumnya yang macet/ditinggal sebelum sempat lockDrawResult()
  // (mis. gara-gara bug reel yang sudah diperbaiki), flag "active" itu bisa
  // nyangkut permanen di database walau kocokannya sudah lama kelar/expired —
  // akibatnya SEMUA klik "Mulai Kocok" berikutnya cuma no-op diam-diam (toast
  // sukses muncul, tapi tidak ada kocokan baru yang benar-benar dibuat, dan
  // mesinnya tidak pernah tampil). liveDrawInfo() sudah tahu cara mendeteksi
  // kocokan yang sudah kedaluwarsa (lewat GRACE_MS) — pakai itu supaya
  // kocokan basi tidak mengunci kocokan baru selamanya.
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

/** Dipanggil begitu animasi reel/huruf selesai di layar SIAPA PUN yang
 *  menonton (publik atau admin). Ini TIDAK mencatat siapa pun sebagai
 *  pemenang — cuma memindahkan status dari "live" ke "menunggu ACC admin"
 *  (batch.pendingResult). Aman dipanggil dari banyak tab sekaligus. */
export async function lockDrawResult(batchId, winnerId, winnerNama) {
  const fresh = await Arisan.getList();
  const batch = fresh.find((b) => b.id === batchId);
  if (!batch || !batch.liveDraw || !batch.liveDraw.active || batch.liveDraw.winnerId !== winnerId) {
    return null; // sudah dipindah ke pending duluan oleh tab lain, atau datanya sudah berubah
  }
  batch.pendingResult = { winnerId, winnerNama, round: (batch.currentRound || 0) + 1, tgl: todayISO() };
  batch.liveDraw = null;
  await Arisan.saveList(fresh);
  return batch;
}

/** ADMIN MENYATAKAN HASIL SAH — baru di titik inilah anggota benar-benar
 *  tercatat menang & masuk riwayat kocokan. */
export async function approveDrawResult(batchId) {
  const fresh = await Arisan.getList();
  const batch = fresh.find((b) => b.id === batchId);
  if (!batch || !batch.pendingResult) return null;
  const { winnerId, winnerNama, round, tgl } = batch.pendingResult;
  const m = (batch.members || []).find((x) => x.id === winnerId);
  if (m) { m.sudahMenang = true; m.menangRound = round; m.menangTgl = tgl; }
  batch.drawHistory = batch.drawHistory || [];
  batch.drawHistory.push({ round, tgl, winnerId, winnerNama });
  batch.currentRound = round;
  batch.winnerOrder = (batch.winnerOrder || []).filter((id) => id !== winnerId);
  batch.pendingResult = null;
  if (!eligibleMembers(batch).length) batch.status = "selesai";
  await Arisan.saveList(fresh);
  return batch;
}

/** ADMIN MENYATAKAN HASIL TIDAK SAH — dibatalkan, tidak ada yang tercatat
 *  menang, dan anggota yang tadi tampil sebagai pemenang otomatis kembali
 *  eligible (karena sudahMenang memang belum pernah diset). Batch siap
 *  dikocok ulang oleh siapa saja. */
export async function rejectDrawResult(batchId) {
  const fresh = await Arisan.getList();
  const batch = fresh.find((b) => b.id === batchId);
  if (!batch || !batch.pendingResult) return null;
  batch.pendingResult = null;
  await Arisan.saveList(fresh);
  return batch;
}

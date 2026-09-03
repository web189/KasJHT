import { Arisan } from "./firebase.js";
import {
  rupiah, fmtDate, fmtDateShort, escapeHtml, initials, colorFor, avatarBg,
  uid, todayISO, activeBatch, finishedBatches,
  approvedMembers, pendingMembers, eligibleMembers, nextDrawDate,
  liveDrawInfo, toast, icon,
} from "./helpers.js";
import {
  REEL_TIMING, LETTER_TOTAL_MS, runSlotSpin, renderSlotSettled,
  letterMachineHtml, runLetterReveal, renderLetterSettled,
} from "./draw-engine.js";

let LIST = [];
let countdownTimer = null;
let autoDrawTimer = null;
// Sama seperti di app.js: kunci sesi live-draw yg sudah dibind di client ini,
// supaya render() tidak menimpa ulang #content (reset animasi reel) tiap kali
// ada snapshot Firestore baru selagi kocokan masih berjalan.
let liveBoundKey = null;

/* ---------------- persistensi ---------------- */
async function persist(successMsg) {
  try {
    await Arisan.saveList(LIST);
    if (successMsg) toast(successMsg);
  } catch (err) {
    toast("Gagal menyimpan: " + err.message, true);
  }
}
function findBatch(id) { return LIST.find((b) => b.id === id); }

/* ---------------- modal helper ---------------- */
function openModal(html) {
  document.getElementById("modalBody").innerHTML = html;
  document.getElementById("modalOverlay").classList.add("open");
}
function closeModal() { document.getElementById("modalOverlay").classList.remove("open"); }
document.getElementById("modalOverlay").addEventListener("click", (e) => { if (e.target.id === "modalOverlay") closeModal(); });

/* ---------------- login ---------------- */
function renderLogin() {
  document.getElementById("content").innerHTML = `
  <div class="login-shell">
    <div class="login-card">
      <div class="brand-mark"><svg width="26" height="26"><use href="#ic-shield"/></svg></div>
      <h2>Masuk Admin</h2>
      <p>Khusus pengelola Arisan Tanteh Susi</p>
      <div class="field"><label>Username</label><input type="text" id="loginUser" placeholder="admin" autocomplete="username"></div>
      <div class="field"><label>Password</label><input type="password" id="loginPass" placeholder="••••••••" autocomplete="current-password"></div>
      <button class="btn btn-gold" id="loginBtn" style="width:100%;justify-content:center;">${icon("lock")}<span>Masuk</span></button>
    </div>
  </div>`;
  document.getElementById("logoutBtn").style.display = "none";
  const submit = async () => {
    const u = document.getElementById("loginUser").value.trim();
    const p = document.getElementById("loginPass").value;
    if (!u || !p) { toast("Username & password wajib diisi", true); return; }
    try { await Arisan.signIn(u, p); toast("Berhasil masuk"); }
    catch (err) { toast("Login gagal: username/password salah", true); }
  };
  document.getElementById("loginBtn").addEventListener("click", submit);
  document.getElementById("loginPass").addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
}

/* ---------------- dashboard ---------------- */
function statusMeta(status) {
  if (status === "pendaftaran") return { label: "Pendaftaran Dibuka", cls: "pendaftaran" };
  if (status === "berjalan") return { label: "Berjalan", cls: "berjalan" };
  return { label: "Selesai", cls: "selesai" };
}

function memRowHtml(m, batchId, kind) {
  const bg = avatarBg(colorFor(m.nama));
  let actions = "";
  if (kind === "pending") {
    actions = `
      <button class="chip-btn ok" data-act="approve" data-batch="${batchId}" data-mem="${m.id}" title="Setujui">${icon("check")}</button>
      <button class="chip-btn no" data-act="reject" data-batch="${batchId}" data-mem="${m.id}" title="Tolak">${icon("close")}</button>`;
  } else {
    actions = `<button class="chip-btn no" data-act="remove" data-batch="${batchId}" data-mem="${m.id}" title="Keluarkan">${icon("trash")}</button>`;
  }
  return `
  <div class="mem-row">
    <div class="coin-avatar" style="background:${bg}">${initials(m.nama)}</div>
    <div style="flex:1;min-width:0;">
      <div class="mm-name">${escapeHtml(m.nama)}${m.sudahMenang ? ` · <span style="color:var(--rose);">menang R${m.menangRound}</span>` : ""}</div>
      <div class="mm-sub">${m.hp ? escapeHtml(m.hp) + " · " : ""}daftar ${fmtDateShort(m.daftarAt)}</div>
    </div>
    <div class="mem-actions">${actions}</div>
  </div>`;
}

function winnerOrderHtml(batch) {
  const approved = approvedMembers(batch);
  const order = (batch.winnerOrder || []).filter((id) => approved.some((m) => m.id === id) && !approved.find((m) => m.id === id)?.sudahMenang);
  const remaining = eligibleMembers(batch).filter((m) => !order.includes(m.id));
  const full = [...order, ...remaining.map((m) => m.id)];
  if (!full.length) return `<div class="field-hint">Belum ada anggota aktif untuk diatur urutannya.</div>`;
  return full.map((id, idx) => {
    const opts = full.map((oid) => {
      const m = approved.find((x) => x.id === oid);
      return `<option value="${oid}" ${oid === id ? "selected" : ""}>${escapeHtml(m ? m.nama : "?")}</option>`;
    }).join("");
    return `<div class="order-row"><span class="order-idx">${idx + 1}</span><select data-order-idx="${idx}">${opts}</select></div>`;
  }).join("");
}

function batchPanelHtml(batch) {
  const meta = statusMeta(batch.status);
  const pending = pendingMembers(batch);
  const approved = approvedMembers(batch);
  const eligible = eligibleMembers(batch);
  const live = liveDrawInfo(batch);
  const nextDraw = nextDrawDate(batch);
  const canStartDraw = batch.status === "berjalan" && !live && eligible.length > 0;

  return `
  <div class="panel">
    <div class="panel-head">
      <div>
        <h2 class="font-display">${escapeHtml(batch.nama)}</h2>
        <div class="field-hint" style="margin-top:2px;">${rupiah(batch.biaya)}/bulan · ${batch.kuota ? `kuota ${batch.kuota}` : "kuota bebas"} · dibuat ${fmtDateShort(batch.createdAt)}</div>
      </div>
      <span class="ticket-status ${meta.cls}">${meta.label}</span>
    </div>

    <div class="actions-row">
      <button class="btn btn-sm" id="btnEditSettings">${icon("edit")}<span>Ubah Iuran/Kuota</span></button>
      ${batch.status === "pendaftaran" ? `<button class="btn btn-sm btn-gold" id="btnStartBatch" ${approved.length ? "" : "disabled"}>${icon("check")}<span>Tutup Pendaftaran &amp; Mulai</span></button>` : ""}
      ${batch.status === "berjalan" ? `<button class="btn btn-sm btn-gold" id="btnDraw" ${canStartDraw ? "" : "disabled"}>🎰<span>Mulai Kocok Sekarang</span></button>` : ""}
      <button class="btn btn-sm btn-danger" id="btnDeleteBatch">${icon("trash")}<span>Hapus Batch</span></button>
    </div>

    ${batch.status !== "pendaftaran" ? `
    <div class="countdown-cap">${live ? "🎰 Kocokan sedang berlangsung" : `Kocokan berikutnya: <b>${fmtDate(nextDraw)}</b>`}</div>` : ""}

    ${live ? `
    <div id="adLiveCard" style="margin:14px 0;">
      <div class="wheel-status" id="adLiveStatus">🔴 LIVE — reel sedang berputar…</div>
      <div class="slot-machine is-spinning" id="adLiveMachine">
        <div class="slot-inner">
          <div class="slot-reels">
            ${[0, 1, 2].map((i) => `<div class="slot-window" id="adLiveWin${i}"><span class="slot-payline"></span><div class="slot-strip" id="adLiveStrip${i}"></div></div>`).join("")}
          </div>
          <div class="slot-progress"><div class="slot-progress-fill" id="adLiveProgress"></div></div>
        </div>
      </div>
      ${letterMachineHtml("adLive")}
      <div class="draw-result" id="adLiveResult" style="display:none;">
        <div class="draw-trophy">${icon("trophy")}</div>
        <div class="draw-label">Pemenang ronde ini</div>
        <div class="draw-name" id="adLiveWinnerName"></div>
        <button class="btn btn-gold" id="btnConfirmDraw" style="margin-top:14px;">${icon("check")}<span>Konfirmasi &amp; Catat Pemenang</span></button>
      </div>
    </div>` : ""}

    <div class="group-label">Menunggu Persetujuan ${pending.length ? `<span class="badge-count">${pending.length}</span>` : ""}</div>
    ${pending.length ? `<div class="mem-grid">${pending.map((m) => memRowHtml(m, batch.id, "pending")).join("")}</div>` : `<div class="field-hint">Tidak ada pendaftar baru.</div>`}

    <div class="group-label">Anggota Aktif (${approved.length})</div>
    ${approved.length ? `<div class="mem-grid">${approved.map((m) => memRowHtml(m, batch.id, "approved")).join("")}</div>` : `<div class="field-hint">Belum ada anggota disetujui.</div>`}

    ${approved.length > 1 && batch.status !== "selesai" ? `
    <div class="group-label">Urutan Giliran Menang <span class="field-hint" style="text-transform:none;letter-spacing:0;">(opsional — kosongkan untuk acak)</span></div>
    <div id="orderEditor">${winnerOrderHtml(batch)}</div>
    <button class="btn btn-sm" id="btnSaveOrder" style="margin-top:8px;">${icon("check")}<span>Simpan Urutan</span></button>` : ""}

    ${(batch.drawHistory || []).length ? `
    <div class="group-label">Riwayat Kocokan Batch Ini</div>
    <div class="timeline">
      ${[...batch.drawHistory].reverse().map((h) => `<div class="tl-item"><span class="tl-dot"></span><div class="tl-round">Ronde ${h.round}</div><div class="tl-winner">${escapeHtml(h.winnerNama)}</div><div class="tl-date">${fmtDate(h.tgl)}</div></div>`).join("")}
    </div>` : ""}
  </div>`;
}

function newBatchPromptHtml() {
  return `
  <div class="panel" style="text-align:center;">
    <svg width="30" height="30" style="opacity:.6;"><use href="#ic-gift"/></svg>
    <h3 style="margin:12px 0 6px;">Belum ada batch aktif</h3>
    <p class="field-hint" style="margin-bottom:16px;">Buka pendaftaran baru untuk mulai menerima anggota.</p>
    <button class="btn btn-gold" id="btnNewBatch" style="margin:0 auto;">${icon("plus-circle")}<span>Buka Pendaftaran Baru</span></button>
  </div>`;
}

function historyPanelHtml() {
  const finished = finishedBatches(LIST);
  if (!finished.length) return "";
  return `
  <div class="panel">
    <div class="panel-head"><h3>${icon("history")} Batch Selesai</h3></div>
    ${finished.map((b) => `
      <div class="mem-row">
        <div class="coin-avatar" style="background:${avatarBg("#3FC6A2")}">${icon("trophy")}</div>
        <div style="flex:1;min-width:0;">
          <div class="mm-name">${escapeHtml(b.nama)}</div>
          <div class="mm-sub">${(b.members || []).filter((m) => m.sudahMenang).length} pemenang · selesai</div>
        </div>
        <div class="mem-actions"><button class="chip-btn no" data-act="deleteFinished" data-batch="${b.id}" title="Hapus riwayat">${icon("trash")}</button></div>
      </div>`).join("")}
  </div>`;
}

function render() {
  const content = document.getElementById("content");
  const batch = activeBatch(LIST);

  // Kalau kocokan LIVE yang sama sedang animasi jalan di client ini, jangan
  // render ulang #content (lihat catatan di app.js untuk alasan lengkap).
  const live = batch ? liveDrawInfo(batch) : null;
  if (live) {
    const maxDuration = Math.max(...REEL_TIMING.map((r) => r.duration));
    const maxTotal = Math.max(maxDuration, LETTER_TOTAL_MS);
    const key = `${batch.id}:${live.startedAt}`;
    if (live.elapsed < maxTotal && key === liveBoundKey) return;
  } else {
    liveBoundKey = null;
  }

  content.innerHTML = `
    <div class="panel-head" style="margin-top:6px;">
      <h1 class="font-display" style="font-size:22px;">🎁 Kelola Arisan</h1>
      ${!batch ? "" : ""}
    </div>
    ${batch ? batchPanelHtml(batch) : newBatchPromptHtml()}
    ${historyPanelHtml()}
  `;
  document.getElementById("logoutBtn").style.display = "inline-flex";
  bindDashboard(batch);
  startCountdown();
  bindLiveWidget(batch);
}

/* ---------------- aksi anggota ---------------- */
async function setMemberStatus(batchId, memberId, status) {
  const batch = findBatch(batchId);
  if (!batch) return;
  const m = batch.members.find((x) => x.id === memberId);
  if (!m) return;
  m.status = status;
  await persist(status === "approved" ? "Anggota disetujui" : "Pendaftar ditolak");
}
async function removeMember(batchId, memberId) {
  const batch = findBatch(batchId);
  if (!batch) return;
  batch.members = batch.members.filter((x) => x.id !== memberId);
  batch.winnerOrder = (batch.winnerOrder || []).filter((id) => id !== memberId);
  await persist("Anggota dikeluarkan");
}

/* ---------------- modal: buka batch baru ---------------- */
function defaultFirstDrawDate() {
  // Tanggal 05 bulan depan — mengikuti kebiasaan jadwal kocok Tanteh Susi.
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 5);
  return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}-05`;
}
function showNewBatchModal() {
  openModal(`
    <div class="modal-head"><h3>Buka Pendaftaran Baru</h3><button class="icon-btn" id="mClose">${icon("close")}</button></div>
    <div class="field"><label>Nama Batch</label><input type="text" id="nbNama" placeholder="Arisan Tanteh Susi — Batch ${new Date().getFullYear()}" value="Arisan Tanteh Susi — Batch ${new Date().toLocaleString("id-ID", { month: "long", year: "numeric" })}"></div>
    <div class="field"><label>Iuran per Bulan (Rp)</label><input type="number" id="nbBiaya" placeholder="150000" value="150000"></div>
    <div class="field"><label>Kuota Anggota <span style="font-weight:400;color:var(--ink-faint);">(0 = bebas berapa saja)</span></label><input type="number" id="nbKuota" placeholder="0" value="0"></div>
    <div class="field"><label>Tanggal Kocokan Pertama</label><input type="date" id="nbTgl" value="${defaultFirstDrawDate()}"></div>
    <button class="btn btn-gold" id="nbSubmit" style="width:100%;justify-content:center;margin-top:6px;">${icon("plus-circle")}<span>Buka Sekarang</span></button>
  `);
  document.getElementById("mClose").addEventListener("click", closeModal);
  document.getElementById("nbSubmit").addEventListener("click", async () => {
    const nama = document.getElementById("nbNama").value.trim();
    const biaya = Number(document.getElementById("nbBiaya").value) || 0;
    const kuota = Number(document.getElementById("nbKuota").value) || 0;
    const tglMulai = document.getElementById("nbTgl").value;
    if (!nama || !biaya || !tglMulai) { toast("Lengkapi semua data", true); return; }
    LIST.push({
      id: uid("arb"), nama, biaya, kuota, tglMulai, status: "pendaftaran", currentRound: 0,
      createdAt: todayISO(), members: [], drawHistory: [], winnerOrder: [], liveDraw: null,
    });
    await persist("Pendaftaran dibuka!");
    closeModal();
  });
}

/* ---------------- modal: ubah iuran/kuota ---------------- */
function showEditSettingsModal(batch) {
  openModal(`
    <div class="modal-head"><h3>Ubah Iuran &amp; Kuota</h3><button class="icon-btn" id="mClose">${icon("close")}</button></div>
    <div class="field"><label>Iuran per Bulan (Rp)</label><input type="number" id="esBiaya" value="${batch.biaya}"></div>
    <div class="field"><label>Kuota Anggota (0 = bebas)</label><input type="number" id="esKuota" value="${batch.kuota || 0}"></div>
    <button class="btn btn-gold" id="esSubmit" style="width:100%;justify-content:center;margin-top:6px;">${icon("check")}<span>Simpan</span></button>
  `);
  document.getElementById("mClose").addEventListener("click", closeModal);
  document.getElementById("esSubmit").addEventListener("click", async () => {
    batch.biaya = Number(document.getElementById("esBiaya").value) || batch.biaya;
    batch.kuota = Number(document.getElementById("esKuota").value) || 0;
    await persist("Pengaturan disimpan");
    closeModal();
  });
}

/* ---------------- aksi batch ---------------- */
async function startBatch(batch) {
  if (!approvedMembers(batch).length) { toast("Setujui minimal 1 anggota dulu", true); return; }
  batch.status = "berjalan";
  await persist("Pendaftaran ditutup, arisan dimulai!");
}
async function deleteBatch(batchId) {
  if (!confirm("Hapus batch ini beserta semua datanya? Tindakan ini tidak bisa dibatalkan.")) return;
  LIST = LIST.filter((b) => b.id !== batchId);
  await persist("Batch dihapus");
}
async function deleteFinished(batchId) {
  if (!confirm("Hapus riwayat batch ini secara permanen?")) return;
  LIST = LIST.filter((b) => b.id !== batchId);
  await persist("Riwayat dihapus");
}
async function saveWinnerOrder(batch) {
  const selects = document.querySelectorAll("#orderEditor select");
  batch.winnerOrder = Array.from(selects).map((s) => s.value);
  await persist("Urutan giliran disimpan");
}

/* ---------------- mulai & konfirmasi kocok ---------------- */
function pickWinner(batch) {
  const eligible = eligibleMembers(batch);
  const order = batch.winnerOrder || [];
  for (const id of order) {
    const m = eligible.find((x) => x.id === id);
    if (m) return m;
  }
  return eligible[Math.floor(Math.random() * eligible.length)];
}
async function startDraw(batch) {
  const winner = pickWinner(batch);
  if (!winner) { toast("Tidak ada anggota yang eligible", true); return; }
  const maxDuration = Math.max(Math.max(...REEL_TIMING.map((r) => r.duration)), LETTER_TOTAL_MS);
  batch.liveDraw = { active: true, startedAt: Date.now(), durationMs: maxDuration, winnerId: winner.id, winnerNama: winner.nama };
  await persist();
}
async function confirmDraw(batch) {
  const live = batch.liveDraw;
  if (!live) return;
  const m = batch.members.find((x) => x.id === live.winnerId);
  const round = (batch.currentRound || 0) + 1;
  if (m) { m.sudahMenang = true; m.menangRound = round; m.menangTgl = todayISO(); }
  batch.drawHistory = batch.drawHistory || [];
  batch.drawHistory.push({ round, tgl: todayISO(), winnerId: live.winnerId, winnerNama: live.winnerNama });
  batch.currentRound = round;
  batch.winnerOrder = (batch.winnerOrder || []).filter((id) => id !== live.winnerId);
  batch.liveDraw = null;
  if (!eligibleMembers(batch).length) batch.status = "selesai";
  await persist("Pemenang dicatat!");
}

function checkAutoDraw() {
  const batch = activeBatch(LIST);
  if (!batch || batch.status !== "berjalan" || batch.liveDraw) return;
  const eligible = eligibleMembers(batch);
  if (!eligible.length) return;
  if (new Date(nextDrawDate(batch) + "T00:00:00").getTime() <= Date.now()) startDraw(batch);
}

/* ---------------- binding ---------------- */
function bindDashboard(batch) {
  document.getElementById("btnNewBatch")?.addEventListener("click", showNewBatchModal);
  document.getElementById("btnEditSettings")?.addEventListener("click", () => showEditSettingsModal(batch));
  document.getElementById("btnStartBatch")?.addEventListener("click", () => startBatch(batch));
  document.getElementById("btnDraw")?.addEventListener("click", () => startDraw(batch));
  document.getElementById("btnDeleteBatch")?.addEventListener("click", () => deleteBatch(batch.id));
  document.getElementById("btnSaveOrder")?.addEventListener("click", () => saveWinnerOrder(batch));
  document.getElementById("btnConfirmDraw")?.addEventListener("click", () => confirmDraw(batch));

  document.querySelectorAll('[data-act="approve"]').forEach((b) => b.addEventListener("click", () => setMemberStatus(b.dataset.batch, b.dataset.mem, "approved")));
  document.querySelectorAll('[data-act="reject"]').forEach((b) => b.addEventListener("click", () => setMemberStatus(b.dataset.batch, b.dataset.mem, "rejected")));
  document.querySelectorAll('[data-act="remove"]').forEach((b) => b.addEventListener("click", () => removeMember(b.dataset.batch, b.dataset.mem)));
  document.querySelectorAll('[data-act="deleteFinished"]').forEach((b) => b.addEventListener("click", () => deleteFinished(b.dataset.batch)));
}

function startCountdown() {
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = setInterval(checkAutoDraw, 20000);
}

/* ---------------- widget kocok admin: dua mesin jalan bareng ---------------- */
function bindLiveWidget(batch) {
  const card = document.getElementById("adLiveCard");
  if (!card || !batch) return;
  const live = liveDrawInfo(batch);
  if (!live) return;
  const eligible = eligibleMembers(batch);
  const winner = eligible.find((m) => m.id === live.winnerId) || { id: live.winnerId, nama: live.winnerNama };
  const status = document.getElementById("adLiveStatus");
  const machine = document.getElementById("adLiveMachine");
  const maxDuration = Math.max(...REEL_TIMING.map((r) => r.duration));
  const maxTotal = Math.max(maxDuration, LETTER_TOTAL_MS);

  const showResult = () => {
    machine?.classList.remove("is-spinning");
    machine?.classList.add("is-jackpot");
    if (status) status.textContent = `🎉 Pemenangnya adalah ${winner.nama}!`;
    const result = document.getElementById("adLiveResult");
    if (result) result.style.display = "flex";
    const nameEl = document.getElementById("adLiveWinnerName");
    if (nameEl) nameEl.textContent = winner.nama;
    document.getElementById("btnConfirmDraw")?.addEventListener("click", () => confirmDraw(batch));
  };

  if (live.elapsed >= maxTotal) {
    renderSlotSettled("adLive", winner);
    renderLetterSettled("adLive", winner.nama);
    const prog = document.getElementById("adLiveProgress");
    if (prog) { prog.style.transition = "none"; prog.style.width = "100%"; }
    showResult();
    return;
  }

  const prog = document.getElementById("adLiveProgress");
  if (prog) { prog.style.transition = `width ${maxDuration - Math.min(live.elapsed, maxDuration)}ms linear`; requestAnimationFrame(() => { prog.style.width = "100%"; }); }

  // Tandai sesi live-draw ini sudah dibind di client ini (lihat app.js).
  liveBoundKey = `${batch.id}:${live.startedAt}`;

  let doneCount = 0;
  const whenBothDone = () => { doneCount++; if (doneCount === 2) showResult(); };
  runSlotSpin("adLive", eligible, winner, live.elapsed, whenBothDone, (settled, total) => {
    if (!status || settled >= total) return;
    status.textContent = settled === total - 1 ? "🔴 LIVE — reel terakhir masih berputar…" : `🔴 LIVE — reel ${settled}/${total} berhenti…`;
  });
  runLetterReveal("adLive", winner.nama, live.elapsed, whenBothDone);
}

/* ---------------- boot ---------------- */
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await Arisan.signOutAdmin();
  toast("Berhasil keluar");
});

let unsubscribeData = null;
Arisan.onAuthChange((user) => {
  if (autoDrawTimer) clearInterval(autoDrawTimer);
  if (unsubscribeData) { unsubscribeData(); unsubscribeData = null; }
  if (!user) { renderLogin(); return; }
  unsubscribeData = Arisan.subscribe(
    (list) => { LIST = list; render(); },
    (err) => toast("Gagal memuat data: " + err.message, true)
  );
});

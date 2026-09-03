import { Arisan } from "./firebase.js";
import {
  rupiah, fmtDate, escapeHtml, initials, colorFor, avatarBg, uid, todayISO,
  computeCountdown, activeBatch, finishedBatches, approvedMembers, pendingMembers,
  eligibleMembers, nextDrawDate, quotaTaken, quotaFull, liveDrawInfo, toast, icon,
} from "./helpers.js";
import {
  REEL_TIMING, LETTER_TOTAL_MS, runSlotSpin, renderSlotSettled,
  letterMachineHtml, runLetterReveal, renderLetterSettled, spawnConfetti,
} from "./draw-engine.js";

let LIST = [];
const reg = { nama: "", hp: "" };
let countdownTimer = null;
// Kunci sesi live-draw yang animasinya SUDAH dijalankan di client ini.
// Dipakai supaya render() tidak menimpa ulang #content (yang akan me-reset
// reel ke posisi 0 dan memicu animasi baru) setiap kali Firestore mengirim
// snapshot baru (mis. ada anggota lain daftar) SELAGI kocokan sedang jalan.
let liveBoundKey = null;

function statusMeta(status) {
  if (status === "pendaftaran") return { label: "Pendaftaran Dibuka", cls: "pendaftaran" };
  if (status === "berjalan") return { label: "Berjalan", cls: "berjalan" };
  return { label: "Selesai", cls: "selesai" };
}

function coinHtml(m, mode) {
  const bg = avatarBg(colorFor(m.nama));
  if (mode === "pending") {
    return `<div class="coin is-pending"><div class="coin-avatar" style="background:${bg}">${initials(m.nama)}</div><div class="coin-name">${escapeHtml(m.nama)}</div><div class="coin-tag">Menunggu ACC</div></div>`;
  }
  if (mode === "winner") {
    return `<div class="coin is-winner"><div class="coin-avatar" style="background:${bg}">${initials(m.nama)}</div><div class="coin-name">${escapeHtml(m.nama)}</div><div class="coin-tag">${icon("trophy", "")}Menang</div></div>`;
  }
  return `<div class="coin"><div class="coin-avatar" style="background:${bg}">${initials(m.nama)}</div><div class="coin-name">${escapeHtml(m.nama)}</div><div class="coin-tag">Aktif</div></div>`;
}

function countdownHtml(targetIso, idPrefix, caption) {
  const c = computeCountdown(targetIso);
  return `
  <div class="countdown-cap">${caption} <b>${fmtDate(targetIso)}</b></div>
  <div class="countdown" id="${idPrefix}Grid" data-target="${targetIso}">
    <div class="cd-box"><div class="cd-num mono">${c.d}</div><div class="cd-lbl">Hari</div></div>
    <div class="cd-box"><div class="cd-num mono">${String(c.h).padStart(2, "0")}</div><div class="cd-lbl">Jam</div></div>
    <div class="cd-box"><div class="cd-num mono">${String(c.m).padStart(2, "0")}</div><div class="cd-lbl">Menit</div></div>
    <div class="cd-box"><div class="cd-num mono">${String(c.s).padStart(2, "0")}</div><div class="cd-lbl">Detik</div></div>
  </div>`;
}

function idleSlotHtml(eligible) {
  if (!eligible.length) return "";
  const cells = eligible.slice(0, 8).map((m) => `<div class="slot-cell"><span class="slot-avatar" style="background:${avatarBg(colorFor(m.nama))}">${initials(m.nama)}</span></div>`).join("");
  return `
  <div class="slot-machine">
    <div class="slot-inner">
      <div class="wheel-status">🎰 Menunggu jadwal kocok berikutnya…</div>
      <div class="slot-window is-idle"><div class="slot-strip is-idle">${cells.slice(0, 1) || ""}</div></div>
    </div>
  </div>`;
}

function ticketHtml(batch) {
  const meta = statusMeta(batch.status);
  const approved = approvedMembers(batch);
  const pending = pendingMembers(batch);
  const winners = (batch.members || []).filter((m) => m.sudahMenang);
  const taken = quotaTaken(batch);
  const full = quotaFull(batch);
  const nextDraw = nextDrawDate(batch);
  const live = liveDrawInfo(batch);

  const regForm = (batch.status === "pendaftaran" && !full) ? `
    <div class="panel" style="margin-top:16px;">
      <div class="panel-head"><h3>${icon("gift")} Daftar Arisan Ini</h3></div>
      <p style="font-size:12.5px;color:var(--ink-faint);margin:-6px 0 14px;">Iuran ${rupiah(batch.biaya)}/bulan — isi data diri, lalu tunggu di-ACC admin.</p>
      <div class="field"><label>Nama Lengkap</label><input type="text" id="regNama" placeholder="Nama kamu" value="${escapeHtml(reg.nama)}"></div>
      <div class="field"><label>No. WhatsApp <span style="font-weight:400;color:var(--ink-faint);">(opsional)</span></label><input type="text" id="regHp" placeholder="0812xxxxxxx" value="${escapeHtml(reg.hp)}"></div>
      <button class="btn btn-gold" id="regSubmit" style="width:100%;justify-content:center;">${icon("gift")}<span>Daftar Sekarang</span></button>
    </div>` : (batch.status === "pendaftaran" ? `
    <div class="full-note" style="margin-top:16px;">${icon("alert")}<span>Kuota pendaftaran sudah penuh (${taken}/${batch.kuota}). Nantikan batch berikutnya!</span></div>` : "");

  return `
  <div class="ticket">
    <div class="ticket-head">
      <div>
        <div class="ticket-name font-display">${escapeHtml(batch.nama)}</div>
      </div>
      <span class="ticket-status ${meta.cls}">${meta.label}</span>
    </div>
    <div class="ticket-fee"><span class="label">Iuran / bulan</span><span class="val mono">${rupiah(batch.biaya)}</span></div>
    <div class="ticket-quota">${batch.kuota ? `${taken}/${batch.kuota} anggota` : `${taken} anggota terdaftar · kuota bebas berapa saja`}</div>

    <div class="perf"></div>

    ${countdownHtml(nextDraw, "arCd", batch.status === "berjalan" ? "⏱️ Kocokan berikutnya:" : "🎯 Kocokan pertama dijadwalkan:")}

    ${live ? `
    <div id="arLiveCard" style="margin-top:18px;">
      <div class="live-badge"><span class="dot"></span>LIVE — Kocokan Sedang Berlangsung</div>
      <div class="wheel-status" id="arLiveStatus">🔴 LIVE — reel sedang berputar…</div>
      <div class="slot-machine is-spinning" id="arLiveMachine">
        <div class="slot-inner">
          <div class="slot-reels">
            ${[0, 1, 2].map((i) => `<div class="slot-window" id="arLiveWin${i}"><span class="slot-payline"></span><div class="slot-strip" id="arLiveStrip${i}"></div></div>`).join("")}
          </div>
          <div class="slot-progress"><div class="slot-progress-fill" id="arLiveProgress"></div></div>
        </div>
      </div>
      ${letterMachineHtml("arLive")}
      <div class="draw-result" id="arLiveResult" style="display:none;">
        <div class="draw-trophy">${icon("trophy")}</div>
        <div class="draw-label">Selamat kepada</div>
        <div class="draw-name" id="arLiveWinnerName"></div>
      </div>
    </div>` : (batch.status === "berjalan" ? idleSlotHtml(eligibleMembers(batch)) : "")}

    ${(approved.length || pending.length) ? `
    <div class="perf"></div>
    ${approved.length ? `<div class="group-label">Anggota Aktif (${approved.length})</div><div class="coin-grid">${approved.map((m) => coinHtml(m, m.sudahMenang ? "winner" : "active")).join("")}</div>` : ""}
    ${pending.length ? `<div class="group-label">Menunggu Persetujuan Admin (${pending.length})</div><div class="coin-grid">${pending.map((m) => coinHtml(m, "pending")).join("")}</div>` : ""}
    ` : ""}

    ${regForm}
  </div>`;
}

function emptyHtml() {
  return `
  <div class="ticket">
    <div class="empty-row">
      <svg width="28" height="28"><use href="#ic-gift"/></svg>
      <div style="margin-top:10px;">Belum ada arisan yang dibuka saat ini. Nantikan pengumuman dari admin ya!</div>
    </div>
  </div>`;
}

function historyHtml(list) {
  return `
  <div class="panel">
    <div class="panel-head"><h3>${icon("history")} Riwayat Batch Selesai</h3></div>
    <div class="coin-grid">
      ${list.map((b) => `<div style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);"><span style="font-weight:600;font-size:13.5px;">${escapeHtml(b.nama)}</span><span style="font-size:12px;color:var(--ink-faint);">${(b.members || []).filter((m) => m.sudahMenang).length} pemenang</span></div>`).join("")}
    </div>
  </div>`;
}

function render() {
  const content = document.getElementById("content");
  const batch = activeBatch(LIST);
  const history = finishedBatches(LIST);

  // Cek apakah ada kocokan LIVE yang sedang berjalan & masih dalam masa
  // animasi (belum settle). Kalau sesi live-draw ini SAMA dengan yang
  // sudah kita bind sebelumnya, jangan render ulang #content — biarkan
  // animasi reel yang sedang jalan lanjut tanpa gangguan.
  const live = batch ? liveDrawInfo(batch) : null;
  if (live) {
    const maxDuration = Math.max(...REEL_TIMING.map((r) => r.duration));
    const maxTotal = Math.max(maxDuration, LETTER_TOTAL_MS);
    const key = `${batch.id}:${live.startedAt}`;
    if (live.elapsed < maxTotal && key === liveBoundKey) return;
  } else {
    liveBoundKey = null;
  }

  content.innerHTML = (batch ? ticketHtml(batch) : emptyHtml()) + (history.length ? historyHtml(history) : "");
  bindContent();
  startCountdown();
  bindLiveWidget();
}

function bindContent() {
  document.getElementById("regNama")?.addEventListener("input", (e) => { reg.nama = e.target.value; });
  document.getElementById("regHp")?.addEventListener("input", (e) => { reg.hp = e.target.value; });
  document.getElementById("regSubmit")?.addEventListener("click", async () => {
    const batch = activeBatch(LIST);
    if (!batch) return;
    if (quotaFull(batch)) { toast("Kuota sudah penuh", true); return; }
    if (!reg.nama.trim()) { toast("Nama wajib diisi", true); return; }
    batch.members = batch.members || [];
    batch.members.push({
      id: uid("am"), nama: reg.nama.trim(), hp: reg.hp.trim(), status: "pending",
      daftarAt: todayISO(), sudahMenang: false, menangRound: null, menangTgl: null,
    });
    try {
      await Arisan.saveList(LIST);
      reg.nama = ""; reg.hp = "";
      toast("Pendaftaran terkirim! Tunggu di-ACC admin ya.");
    } catch (err) {
      toast("Gagal mengirim pendaftaran: " + err.message, true);
    }
  });
}

function startCountdown() {
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = setInterval(() => {
    const grid = document.getElementById("arCdGrid");
    if (!grid) { clearInterval(countdownTimer); return; }
    const c = computeCountdown(grid.dataset.target);
    const nums = grid.querySelectorAll(".cd-num");
    if (nums.length === 4) {
      nums[0].textContent = c.d;
      nums[1].textContent = String(c.h).padStart(2, "0");
      nums[2].textContent = String(c.m).padStart(2, "0");
      nums[3].textContent = String(c.s).padStart(2, "0");
    }
  }, 1000);
}

/* ---------------- mesin kocok (reel + papan huruf), sinkron via liveDraw Firestore ---------------- */
function bindLiveWidget() {
  const card = document.getElementById("arLiveCard");
  if (!card) return;
  const batch = activeBatch(LIST);
  const live = batch ? liveDrawInfo(batch) : null;
  if (!live) return;
  const eligible = eligibleMembers(batch);
  if (!eligible.length) return;
  const winner = eligible.find((m) => m.id === live.winnerId) || { id: live.winnerId, nama: live.winnerNama };
  const status = document.getElementById("arLiveStatus");
  const machine = document.getElementById("arLiveMachine");
  const maxDuration = Math.max(...REEL_TIMING.map((r) => r.duration));
  const maxTotal = Math.max(maxDuration, LETTER_TOTAL_MS);

  const showResult = () => {
    machine?.classList.remove("is-spinning");
    machine?.classList.add("is-jackpot");
    if (status) status.textContent = `🎉 Pemenangnya adalah ${winner.nama}!`;
    const result = document.getElementById("arLiveResult");
    if (result) result.style.display = "flex";
    const nameEl = document.getElementById("arLiveWinnerName");
    if (nameEl) nameEl.textContent = winner.nama;
  };

  if (live.elapsed >= maxTotal) {
    renderSlotSettled("arLive", winner);
    renderLetterSettled("arLive", winner.nama);
    const prog = document.getElementById("arLiveProgress");
    if (prog) { prog.style.transition = "none"; prog.style.width = "100%"; }
    showResult();
    return;
  }

  const prog = document.getElementById("arLiveProgress");
  if (prog) {
    prog.style.transition = `width ${maxDuration - Math.min(live.elapsed, maxDuration)}ms linear`;
    requestAnimationFrame(() => { prog.style.width = "100%"; });
  }

  // Tandai sesi live-draw ini sudah "dibind" di client ini, supaya render()
  // tidak menimpa ulang DOM reel & me-reset animasi selama draw masih jalan.
  liveBoundKey = `${batch.id}:${live.startedAt}`;

  // dua mesin jalan bersamaan; hasil akhir (nama pemenang) baru ditampilkan
  // setelah KEDUANYA selesai supaya terasa seperti satu momen pengumuman.
  let doneCount = 0;
  const whenBothDone = () => {
    doneCount++;
    if (doneCount === 2) { showResult(); spawnConfetti(document.querySelector(".ticket")); }
  };
  runSlotSpin(
    "arLive", eligible, winner, live.elapsed, whenBothDone,
    (settled, total) => {
      if (!status || settled >= total) return;
      status.textContent = settled === total - 1 ? "🔴 LIVE — reel terakhir masih berputar… tahan napas!" : `🔴 LIVE — reel ${settled}/${total} berhenti…`;
    }
  );
  runLetterReveal("arLive", winner.nama, live.elapsed, whenBothDone);
}

/* ---------------- boot ---------------- */
async function boot() {
  Arisan.subscribe(
    (list) => { LIST = list; render(); },
    (err) => {
      document.getElementById("content").innerHTML = `<div class="panel"><div class="empty-row">${icon("alert")}<div style="margin-top:10px;">Gagal terhubung ke database.<br><span style="font-size:12px;">${escapeHtml(err.message)}</span></div></div></div>`;
    }
  );
}
boot();

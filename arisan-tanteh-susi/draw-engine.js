/* ============================================================
   Arisan Tanteh Susi — mesin kocok (dipakai bareng oleh halaman
   publik & dashboard admin). Dua mesin cuma tampilan/formalitas —
   pemenang sudah ditentukan admin (acak atau urutan giliran) SEBELUM
   animasi ini mulai; animasi cuma memutar ulang hasil itu secara
   dramatis di layar semua orang yang lagi buka halaman.
============================================================ */
import { escapeHtml, initials, colorFor, avatarBg, shortName } from "./helpers.js";

// Total durasi kocokan resmi: 60 detik (diminta jadi standar semua batch).
// Reel berhenti bertahap menjelang akhir supaya masih ada efek "satu per
// satu berhenti" walau durasinya sekarang jauh lebih panjang.
export const REEL_TIMING = [{ duration: 42000 }, { duration: 51000 }, { duration: 60000 }];
export const LETTER_TOTAL_MS = 60000;
const CELL_H = 66;
const WINDOW_H = 200;
const LETTER_ROWS = ["ABCDEFGHIJKLMN", "OPQRSTUVWXYZ"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function slotCellHtml(m) {
  return `<div class="slot-cell"><span class="slot-avatar" style="background:${avatarBg(colorFor(m.nama))}">${initials(m.nama)}</span><span class="slot-name">${escapeHtml(shortName(m.nama))}</span></div>`;
}
function randLetter() { return LETTER_ROWS[0][Math.floor(Math.random() * LETTER_ROWS[0].length)]; }

/* ---------------- mesin 1: reel avatar (slot machine) ---------------- */
// Koreografi 2 tahap: (1) berputar KENCANG & konstan (linear) untuk sebagian
// besar durasi, lalu (2) baru MELAMBAT mulus di 10 detik terakhir menuju hasil
// akhir. Hasil pemenang tetap ditentukan sebelumnya (winner) — bagian ini
// murni mengatur choreography visual, tidak mengubah logic pengundian.
const SLOT_DECEL_MS = 10000; // 10 detik terakhir baru melambat
const SLOT_DECEL_EASE = "cubic-bezier(.14,.62,.24,1)"; // kurva perlambatan halus di fase akhir
const SLOT_DECEL_CELLS = 7; // berapa sel yg "dilalui" selama fase melambat (kurva easing yg bikin makin ke akhir makin pelan)
const SLOT_FAST_PXPS = 950; // kecepatan putaran fase kencang (px/detik) — konstan, tidak tergantung durasi reel

export function runSlotSpin(idPrefix, eligible, winner, elapsedMs, onAllSettled, onReelSettle) {
  const maxDuration = Math.max(...REEL_TIMING.map((r) => r.duration));
  const others = eligible.filter((m) => m.id !== winner.id);
  let settledCount = 0;
  REEL_TIMING.forEach((cfg, i) => {
    const strip = document.getElementById(`${idPrefix}Strip${i}`);
    const win = document.getElementById(`${idPrefix}Win${i}`);
    if (!strip) return;
    const pool = others.length ? others : [winner];
    const remaining = Math.max(600, (maxDuration - elapsedMs) * (cfg.duration / maxDuration));
    const decelDistance = SLOT_DECEL_CELLS * CELL_H;
    const hasFastPhase = remaining > SLOT_DECEL_MS * 1.2;
    // Supaya kecepatan fase "kencang" tetap konstan (px/detik) berapa pun sisa
    // durasi reel ini, panjang strip (jumlah sel) dihitung dari jarak yg perlu
    // ditempuh, bukan angka tetap — reel dgn sisa waktu lebih lama otomatis
    // dapat lebih banyak sel supaya tetap terasa "kencang", bukan malah lambat.
    let seqLen;
    if (hasFastPhase) {
      const fastMs = remaining - SLOT_DECEL_MS;
      const fastDistance = (SLOT_FAST_PXPS * fastMs) / 1000;
      seqLen = Math.max(SLOT_DECEL_CELLS + 3, Math.ceil((fastDistance + decelDistance) / CELL_H) + 1);
    } else {
      seqLen = SLOT_DECEL_CELLS + 3;
    }
    let body = [];
    while (body.length < seqLen - 1) body = body.concat(shuffle(pool));
    body = body.slice(0, seqLen - 1);
    const seq = [...body, winner];
    strip.innerHTML = seq.map(slotCellHtml).join("");
    const targetY = -((seq.length - 1) * CELL_H) + (WINDOW_H / 2 - CELL_H / 2);
    strip.style.transition = "none";
    strip.style.transform = "translateY(0px)";
    // Paksa reflow supaya posisi awal ("translateY(0)" + transition:none) benar2
    // ke-render sebelum transition baru dipasang di bawah. Tanpa ini, di sebagian
    // WebView/browser dua perubahan style ini kebaca dalam frame yg sama sehingga
    // strip lompat langsung ke posisi akhir tanpa terlihat berputar sama sekali.
    void strip.offsetHeight;

    const startSpin = () => {
      if (!hasFastPhase) {
        // Waktu tersisa sudah mepet (mis. anggota baru buka halaman saat draw
        // hampir selesai) — langsung jalankan fase perlambatan saja.
        strip.style.transition = `transform ${remaining}ms ${SLOT_DECEL_EASE}`;
        strip.style.transform = `translateY(${targetY}px)`;
      } else {
        const fastMs = remaining - SLOT_DECEL_MS;
        const midY = targetY + decelDistance;
        // Fase 1: berputar KENCANG, kecepatan konstan (linear) ~950px/detik.
        strip.style.transition = `transform ${fastMs}ms linear`;
        strip.style.transform = `translateY(${midY}px)`;
        setTimeout(() => {
          void strip.offsetHeight; // reflow lagi sebelum ganti transition fase 2
          // Fase 2: 10 detik terakhir — melambat mulus ke posisi pemenang.
          strip.style.transition = `transform ${SLOT_DECEL_MS}ms ${SLOT_DECEL_EASE}`;
          strip.style.transform = `translateY(${targetY}px)`;
        }, fastMs);
      }
    };
    // Double rAF: tunggu 2 tick paint supaya state awal (transform:0) benar2
    // ter-commit sebelum transition dipasang — lebih aman lintas WebView drpd 1 rAF.
    requestAnimationFrame(() => requestAnimationFrame(startSpin));

    setTimeout(() => {
      win?.classList.add("is-settled");
      settledCount++;
      if (onReelSettle) onReelSettle(settledCount, REEL_TIMING.length);
      if (settledCount === REEL_TIMING.length && onAllSettled) onAllSettled();
    }, remaining);
  });
}

export function renderSlotSettled(idPrefix, winner) {
  REEL_TIMING.forEach((cfg, i) => {
    const strip = document.getElementById(`${idPrefix}Strip${i}`);
    const win = document.getElementById(`${idPrefix}Win${i}`);
    if (!strip) return;
    strip.innerHTML = slotCellHtml(winner);
    strip.style.transition = "none";
    strip.style.transform = `translateY(${(WINDOW_H / 2 - CELL_H / 2)}px)`;
    win?.classList.add("is-settled");
  });
}

/* ---------------- mesin 2: papan pengocok huruf (split-flap) ---------------- */
export function letterMachineHtml(idPrefix) {
  return `
  <div class="letter-machine">
    <div class="letter-machine-cap">🔤 Mesin Kocok Huruf</div>
    <div class="letter-board" id="${idPrefix}Board">
      ${LETTER_ROWS.map((row, ri) => `<div class="letter-row">${row.split("").map((ch) => `<span class="letter-key" data-ch="${ch}" data-row="${ri}">${ch}</span>`).join("")}</div>`).join("")}
    </div>
    <div class="result-strip" id="${idPrefix}Result"></div>
  </div>`;
}

function nameChars(nama) { return String(nama || "").toUpperCase().split(""); }

function buildFlapRow(idPrefix, nama) {
  const strip = document.getElementById(`${idPrefix}Result`);
  if (!strip) return [];
  const chars = nameChars(nama);
  strip.innerHTML = chars.map((ch, i) => ch === " "
    ? `<div class="result-flap is-space"></div>`
    : `<div class="result-flap" id="${idPrefix}Flap${i}"><span class="flap-char">${randLetter()}</span></div>`
  ).join("");
  return chars;
}

/** Jalankan animasi papan huruf: sorot tombol acak di keyboard terus-menerus,
 *  sementara tiap kotak huruf "mengocok" cepat lalu mengunci satu per satu
 *  di titik waktu yang tersebar merata sepanjang durasi kocokan — supaya
 *  tetap terasa hidup walau durasinya sampai 60 detik. */
export function runLetterReveal(idPrefix, winnerNama, elapsedMs, onAllSettled) {
  const chars = buildFlapRow(idPrefix, winnerNama);
  const letterIdxs = chars.map((c, i) => (c === " " ? null : i)).filter((i) => i !== null);
  const total = Math.max(1000, LETTER_TOTAL_MS - elapsedMs);

  const board = document.getElementById(`${idPrefix}Board`);
  const keys = board ? Array.from(board.querySelectorAll(".letter-key")) : [];

  if (!letterIdxs.length) { if (onAllSettled) onAllSettled(); return; }

  // sapuan lampu sorot di papan keyboard, jalan terus sampai huruf terakhir terkunci
  let prevKey = null;
  const scanTimer = keys.length ? setInterval(() => {
    if (prevKey) prevKey.classList.remove("is-scanning");
    prevKey = keys[Math.floor(Math.random() * keys.length)];
    prevKey.classList.add("is-scanning");
  }, 100) : null;

  // tiap kotak huruf terus "mengocok" cepat sampai gilirannya dikunci
  const flickerTimers = {};
  letterIdxs.forEach((i) => {
    const charEl = document.getElementById(`${idPrefix}Flap${i}`)?.querySelector(".flap-char");
    flickerTimers[i] = setInterval(() => { if (charEl) charEl.textContent = randLetter(); }, 75 + Math.random() * 45);
  });

  let settledCount = 0;
  letterIdxs.forEach((i, order) => {
    const lockAt = Math.max(500, total * (order + 1) / letterIdxs.length);
    setTimeout(() => {
      clearInterval(flickerTimers[i]);
      const ch = chars[i];
      const flap = document.getElementById(`${idPrefix}Flap${i}`);
      const charEl = flap?.querySelector(".flap-char");
      if (charEl) charEl.textContent = ch;
      flap?.classList.add("is-settled");
      const hit = keys.find((k) => k.dataset.ch === ch);
      if (hit) { hit.classList.add("is-hit"); setTimeout(() => hit.classList.remove("is-hit"), 550); }
      settledCount++;
      if (settledCount === letterIdxs.length) {
        if (scanTimer) { clearInterval(scanTimer); keys.forEach((k) => k.classList.remove("is-scanning")); }
        if (onAllSettled) onAllSettled();
      }
    }, lockAt);
  });
}

export function renderLetterSettled(idPrefix, winnerNama) {
  const chars = buildFlapRow(idPrefix, winnerNama);
  chars.forEach((ch, i) => {
    if (ch === " ") return;
    const flap = document.getElementById(`${idPrefix}Flap${i}`);
    const charEl = flap?.querySelector(".flap-char");
    if (charEl) charEl.textContent = ch;
    flap?.classList.add("is-settled");
  });
}

/* ---------------- confetti (dipakai saat kedua mesin selesai) ---------------- */
if (typeof document !== "undefined" && !document.getElementById("confettiKeyframes")) {
  const style = document.createElement("style");
  style.id = "confettiKeyframes";
  style.textContent = "@keyframes confettiFall{0%{transform:translateY(-10px) rotate(0);opacity:1;}100%{transform:translateY(120px) rotate(180deg);opacity:0;}}";
  document.head.appendChild(style);
}
export function spawnConfetti(container) {
  if (!container) return;
  const colors = ["#9B2FE0", "#C77DFF", "#E619C4", "#4B3AFF"]; // palet confetti disamakan dgn tema baru (violet/magenta/indigo)
  let html = "";
  for (let i = 0; i < 26; i++) {
    const left = Math.random() * 100, delay = (Math.random() * 0.35).toFixed(2), dur = (1.3 + Math.random() * 0.8).toFixed(2);
    const rot = Math.floor(Math.random() * 360);
    html += `<span style="position:absolute;top:0;left:${left}%;width:7px;height:11px;border-radius:2px;background:${colors[i % colors.length]};animation:confettiFall ${dur}s ease-in ${delay}s forwards;transform:rotate(${rot}deg);"></span>`;
  }
  container.innerHTML = html;
}

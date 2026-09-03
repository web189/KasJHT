/* ============================================================
   Arisan Tanteh Susi — util murni (tanpa Firebase)
============================================================ */
export const COLOR_CHOICES = [
  "#D9A83C", "#DA6E96", "#4A9484", "#A8703F", "#6B80D9",
  "#C24F42", "#4FA3BE", "#A98BDA", "#8A9C5C", "#DC8A47",
];

export function rupiah(n) {
  n = Number(n) || 0;
  return "Rp" + n.toLocaleString("id-ID");
}

export function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
}

export function fmtDateShort(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export function monthLabel(key) {
  const [y, m] = key.split("-");
  const names = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  return names[parseInt(m, 10) - 1] + " " + y.slice(2);
}

export function addMonthsISO(iso, n) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, (m - 1) + n, d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}

export function todayISO() { return new Date().toISOString().slice(0, 10); }

export function uid(prefix) { return prefix + Math.random().toString(36).slice(2, 9); }

export function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export function initials(name) {
  const words = String(name).trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  const w = words[0] || "?";
  if (w.length >= 2) return (w[0] + w[w.length - 1]).toUpperCase();
  return w.toUpperCase();
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
export function colorFor(name) { return COLOR_CHOICES[hashStr(String(name || "?")) % COLOR_CHOICES.length]; }

function shadeColor(hex, percent) {
  hex = String(hex).replace("#", "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const num = parseInt(hex, 16);
  let r = (num >> 16) + percent, g = ((num >> 8) & 0x00ff) + percent, b = (num & 0x0000ff) + percent;
  r = Math.max(Math.min(255, r), 0); g = Math.max(Math.min(255, g), 0); b = Math.max(Math.min(255, b), 0);
  return "#" + (0x1000000 + r * 0x10000 + g * 0x100 + Math.round(b)).toString(16).slice(1);
}
export function avatarBg(color) { return `linear-gradient(150deg, ${color}, ${shadeColor(color, -30)})`; }

export function shortName(nama) {
  const first = String(nama || "?").trim().split(/\s+/)[0] || "?";
  return first.length > 10 ? first.slice(0, 9) + "…" : first;
}

export function computeCountdown(targetIso) {
  const target = new Date(targetIso + "T00:00:00").getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    done: diff <= 0,
  };
}

/* -------- model batch: helper bersama publik & admin -------- */
export function activeBatch(list) {
  const open = (list || []).filter((a) => a.status !== "selesai");
  if (!open.length) return null;
  return [...open].sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
}
export function finishedBatches(list) {
  return (list || []).filter((a) => a.status === "selesai").sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export function approvedMembers(batch) { return (batch.members || []).filter((m) => m.status === "approved"); }
export function pendingMembers(batch) { return (batch.members || []).filter((m) => m.status === "pending"); }
export function eligibleMembers(batch) { return approvedMembers(batch).filter((m) => !m.sudahMenang); }
export function nextDrawDate(batch) { return addMonthsISO(batch.tglMulai, batch.currentRound); }
export function quotaTaken(batch) { return (batch.members || []).filter((m) => m.status !== "rejected").length; }
export function quotaFull(batch) { return !!batch.kuota && quotaTaken(batch) >= batch.kuota; }

export function liveDrawInfo(batch) {
  const ld = batch.liveDraw;
  if (!ld || !ld.active || !ld.startedAt) return null;
  const elapsed = Date.now() - ld.startedAt;
  const GRACE_MS = 45000;
  if (elapsed > ld.durationMs + GRACE_MS) return null;
  return { ...ld, elapsed: Math.max(0, elapsed) };
}

export function toast(msg, isErr) {
  let stack = document.querySelector(".toast-stack");
  if (!stack) { stack = document.createElement("div"); stack.className = "toast-stack"; document.body.appendChild(stack); }
  const el = document.createElement("div");
  el.className = "toast" + (isErr ? " err" : "");
  el.textContent = msg;
  stack.appendChild(el);
  setTimeout(() => {
    el.style.transition = "opacity .3s,transform .3s"; el.style.opacity = "0"; el.style.transform = "translateX(20px)";
    setTimeout(() => el.remove(), 300);
  }, 2800);
}

export function icon(name, cls) { return `<svg width="16" height="16" class="${cls || ""}"><use href="#ic-${name}"/></svg>`; }

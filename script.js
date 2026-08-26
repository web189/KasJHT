/* ============================================================
   JHT KAS Adm PRG — Aplikasi Buku Kas Admin Gudang
   Penyimpanan: localStorage (mode uji). Ganti ke backend asli
   sebelum dipakai produksi sungguhan.
============================================================ */

/* ---------------- KONSTANTA & WARNA ANGGOTA ---------------- */
const MEMBER_COLORS = {
  KARTIKA:  "#6B7280",
  RIKI:     "#3B82F6",
  KAMIL:    "#E4574C",
  DAUD:     "#7A2E2E",
  RANDHIKA: "#2E8B57",
  BUDI:     "#8B5FBF",
  TAHIR:    "#14919B",
};
const COLOR_CHOICES = ["#3B82F6","#E4574C","#7A2E2E","#2E8B57","#8B5FBF","#14919B","#F0A93A","#6B7280","#D9534F","#0EA5A5"];
const RIBA_COLOR = "#9CA3AF";

/* ---------------- SEED DATA ANGGOTA ---------------- */
const SEED_MEMBERS = [
  { id:"KARTIKA",  nama:"Kartika",  color:MEMBER_COLORS.KARTIKA,  status:"off",    sejak:"2025-09-11", offSejak:"2025-10-09", catatan:"Nonaktif — terakhir tercatat kasbon Jul 2026" },
  { id:"RIKI",     nama:"Riki",     color:MEMBER_COLORS.RIKI,     status:"active", sejak:"2025-09-11" },
  { id:"KAMIL",    nama:"Kamil",    color:MEMBER_COLORS.KAMIL,    status:"active", sejak:"2025-09-14" },
  { id:"DAUD",     nama:"Daud",     color:MEMBER_COLORS.DAUD,     status:"active", sejak:"2025-09-15" },
  { id:"RANDHIKA", nama:"Randhika", color:MEMBER_COLORS.RANDHIKA, status:"active", sejak:"2025-09-16" },
  { id:"BUDI",     nama:"Budi",     color:MEMBER_COLORS.BUDI,     status:"active", sejak:"2025-11-20" },
  { id:"TAHIR",    nama:"Tahir",    color:MEMBER_COLORS.TAHIR,    status:"active", sejak:"2025-10-02" },
];

/* ---------------- SEED DATA TRANSAKSI ----------------
   format tuple: [tanggalISO, admin, shift|null, btb(masuk), bkb(keluar), keterangan]
------------------------------------------------------------ */
const RAW_TX = [
["2025-09-11","KARTIKA","Shift 1",10000,0,"4 Box Pulpen Biru"],
["2025-09-11","RIKI","Shift 1",10000,0,"4 Box Pulpen Belang"],
["2025-09-14","KARTIKA","Shift 1",5000,0,"Sapu + kain pel + tempat sampah"],
["2025-09-14","RIKI","Shift 1",5000,0,"Kantong plastik paket PO"],
["2025-09-14","KAMIL","Shift 2",20000,0,"Staples Niceso"],
["2025-09-14","RIKI","Shift 2",20000,0,"Plastik paket PO + lakban"],
["2025-09-15","DAUD","Shift 3",20000,0,"Karet gelang + tip x"],
["2025-09-15","KARTIKA","Shift 1",5000,0,"Colokan listrik"],
["2025-09-15","RIKI","Shift 1",5000,0,""],
["2025-09-16","KARTIKA","Shift 1",2500,0,""],
["2025-09-16","RANDHIKA","Shift 1",2500,0,""],
["2025-09-18","KARTIKA","Shift 1",5000,0,""],
["2025-09-18","RIKI","Shift 1",5000,0,""],
["2025-09-19","DAUD","Shift 3",5000,0,""],
["2025-09-19","RANDHIKA","Shift 1",5000,0,""],
["2025-09-19","KARTIKA","Shift 1",5000,0,""],
["2025-09-20","RANDHIKA","Shift 1",2500,0,""],
["2025-09-20","KARTIKA","Shift 1",2500,0,""],
["2025-09-22","RANDHIKA","Shift 1",5000,0,""],
["2025-09-22","KARTIKA","Shift 1",5000,0,""],
["2025-09-26","KARTIKA","Shift 1",5000,0,""],
["2025-09-26","KAMIL","Shift 1",5000,0,""],
["2025-09-29","KARTIKA","Shift 1",5000,0,""],
["2025-09-29","KAMIL","Shift 1",5000,0,""],
["2025-09-29","RIKI","Shift 2",2500,0,""],
["2025-09-29","DAUD","Shift 2",2500,0,""],
["2025-09-30","KARTIKA","Shift 1",7500,0,""],
["2025-09-30","KAMIL","Shift 1",7500,0,""],
["2025-09-30","RIKI","Shift 2",2000,0,""],
["2025-09-30","DAUD","Shift 2",2000,0,""],
["2025-10-01","RIKI","Shift 2",1000,0,""],
["2025-10-01","DAUD","Shift 2",1000,0,""],
["2025-10-02","TAHIR","Shift 1",7500,0,""],
["2025-10-02","KARTIKA","Shift 1",7500,0,""],
["2025-10-03","RIKI","Shift 2",5000,0,""],
["2025-10-05","DAUD","Shift 2",2000,0,""],
["2025-10-09","KARTIKA","Shift 1",2500,0,""],
["2025-10-09","DAUD","Shift 1",2500,0,""],
["2025-10-27","DAUD","Shift 2",5000,0,""],
["2025-10-29","DAUD","Shift 2",5000,0,""],
["2025-11-05","RANDHIKA","Shift 1",2500,0,""],
["2025-11-05","TAHIR","Shift 1",2500,0,""],
["2025-11-05","UANG RIBA",null,10000,0,"Setoran uang riba"],
["2025-11-20","RIKI","Shift 1",2500,0,""],
["2025-11-20","BUDI","Shift 1",2500,0,""],
["2025-11-21","RIKI","Shift 1",2500,0,""],
["2025-11-21","BUDI","Shift 1",2500,0,""],
["2025-11-22","RIKI","Shift 1",2500,0,""],
["2025-11-22","BUDI","Shift 1",2500,0,""],
["2025-11-23","RIKI","Shift 1",2500,0,""],
["2025-11-23","BUDI","Shift 1",2500,0,""],
["2025-11-24","RIKI","Shift 1",2500,0,""],
["2025-11-24","BUDI","Shift 1",2500,0,""],
["2025-11-25","RIKI","Shift 1",2500,0,""],
["2025-11-25","DAUD","Shift 1",2500,0,""],
["2025-12-05","UANG RIBA",null,10000,0,"Setoran uang riba"],
["2025-12-18","RIKI",null,0,10000,"Patungan kado nikah (dari saldo kas masing2)"],
["2025-12-18","TAHIR",null,0,10000,"Patungan kado nikah (dari saldo kas masing2)"],
["2025-12-18","KAMIL",null,0,10000,"Patungan kado nikah (dari saldo kas masing2)"],
["2025-12-18","RANDHIKA",null,0,10000,"Patungan kado nikah (dari saldo kas masing2)"],
["2025-12-18","DAUD",null,0,10000,"Patungan kado nikah (dari saldo kas masing2)"],
["2025-12-18","BUDI",null,0,10000,"Patungan kado nikah (dari saldo kas masing2)"],
["2025-12-27","RIKI","Shift 1",5000,0,""],
["2025-12-27","BUDI","Shift 1",5000,0,""],
["2026-01-05","UANG RIBA",null,20000,0,"Setoran uang riba"],
["2026-01-19","BUDI","Shift 3",18000,0,""],
["2026-01-21","BUDI","Shift 3",25000,0,""],
["2026-01-24","DAUD","Shift 1",2500,0,""],
["2026-01-24","TAHIR","Shift 1",2500,0,""],
["2026-02-05","UANG RIBA",null,10000,0,"Setoran uang riba"],
["2026-02-06","RIKI","Shift 1",2500,0,""],
["2026-02-06","KAMIL","Shift 1",2500,0,""],
["2026-02-11","DAUD","Shift 3",5000,0,""],
["2026-02-12","DAUD","Shift 3",5000,0,""],
["2026-02-20","BUDI","Shift 1",20000,0,""],
["2026-02-20","DAUD","Shift 2",5000,0,""],
["2026-02-23","BUDI","Shift 1",10000,0,""],
["2026-02-25","BUDI","Shift 1",9000,0,""],
["2026-03-05","UANG RIBA",null,10000,0,"Setoran uang riba"],
["2026-03-07","TAHIR","Shift 1",2500,0,""],
["2026-03-07","DAUD","Shift 1",2500,0,""],
["2026-03-11","BUDI",null,0,80000,"Isi steples + bantal"],
["2026-03-30","DAUD",null,0,35000,"Colokan listrik"],
["2026-05-14","RANDHIKA","Shift 1",5000,0,""],
["2026-05-15","RANDHIKA","Shift 1",5000,0,""],
["2026-05-16","RANDHIKA","Shift 1",5000,0,""],
["2026-05-21","BUDI","Shift 3",30000,0,""],
["2026-05-23","TAHIR","Shift 1",5000,0,""],
["2026-06-16","BUDI","Shift 1",5000,0,""],
["2026-06-16","KAMIL","Shift 1",5000,0,""],
["2026-06-23","BUDI",null,0,30000,"Mouse pad"],
["2026-06-29","RIKI",null,0,10000,"Pulpen 6 box"],
["2026-06-29","TAHIR",null,0,10000,"Pulpen 6 box"],
["2026-06-29","RANDHIKA",null,0,10000,"Pulpen 6 box"],
["2026-06-29","BUDI",null,0,10000,"Pulpen 6 box"],
["2026-06-29","KAMIL",null,0,10000,"Pulpen 6 box"],
["2026-06-29","DAUD",null,0,10000,"Pulpen 6 box"],
["2026-06-30","RIKI","Shift 1",7500,0,""],
["2026-06-30","BUDI","Shift 1",7500,0,""],
["2026-07-01","RIKI","Shift 1",5000,0,""],
["2026-07-01","BUDI","Shift 1",5000,0,""],
["2026-07-05","KARTIKA",null,0,67500,"Kasbon 150k"],
["2026-07-11","KAMIL",null,0,10000,"Kipas CPU 2pcs"],
["2026-07-11","RANDHIKA",null,0,10000,"Kipas CPU 2pcs"],
["2026-07-11","RIKI",null,0,10000,"Kipas CPU 2pcs"],
["2026-07-11","BUDI",null,0,10000,"Kipas CPU 2pcs"],
["2026-07-11","DAUD",null,0,10000,"Kipas CPU 2pcs"],
["2026-07-11","UANG RIBA",null,0,50000,"Kasur Palembang"],
["2026-07-11","KAMIL",null,0,10000,"Kunci gembok 2pcs"],
["2026-07-12","KAMIL","Shift 2",10000,0,""],
["2026-07-13","BUDI","Shift 2",24000,0,""],
["2026-07-20","RIKI","Shift 1",3500,0,""],
["2026-07-20","BUDI","Shift 1",3500,0,""],
["2026-07-30","BUDI","Shift 1",10000,0,""],
["2026-07-31","BUDI","Shift 1",5000,0,""],
["2026-08-01","RIKI",null,0,6400,"Plastik ripack tisu"],
["2026-08-01","BUDI",null,0,6400,"Plastik ripack tisu"],
["2026-08-01","DAUD",null,0,6400,"Plastik ripack tisu"],
["2026-08-01","KAMIL",null,0,6400,"Plastik ripack tisu"],
["2026-08-01","RANDHIKA",null,0,6400,"Plastik ripack tisu"],
["2026-08-06","RANDHIKA","Shift 1",10000,0,""],
["2026-08-18","BUDI","Shift 2",25000,0,""],
["2026-08-20","KAMIL","Shift 2",8000,0,""],
["2026-08-20","BUDI","Shift 2",8000,0,""],
];

function buildSeedTransactions(){
  return RAW_TX.map((r,i)=>{
    const [tgl, admin, shift, btb, bkb, ket] = r;
    // Logika: KAS MASUK (btb) vs KAS KELUAR (bkb) — belanja barang, kasbon, uang riba, dll.
    const kat = bkb > 0 ? "pinjaman" : "kas";
    return { id:"tx"+(i+1), tgl, admin, shift: shift || "Non Shift", btb, bkb, ket, kat };
  });
}

/* ---------------- STORAGE ---------------- */
const LS_KEYS = { members:"jht_members", tx:"jht_transactions", auth:"jht_auth", theme:"jht_theme", cred:"jht_admin_cred", requests:"jht_requests" };

/* ---------------- SEED DATA: PENGAJUAN PEMBELIAN ---------------- */
const SEED_REQUESTS = [
  { id:"req1", tgl:"2026-08-15", keterangan:"Ganti selang galon dispenser", nominal:15000, mode:"solo", admins:["BUDI"], pemohon:"Budi", status:"approved", decidedAt:"2026-08-16" },
  { id:"req2", tgl:"2026-08-19", keterangan:"Sewa jasa servis printer kantor", nominal:60000, mode:"patungan", admins:["RIKI","KAMIL","DAUD","RANDHIKA","BUDI","TAHIR"], pemohon:"Riki", status:"pending", decidedAt:null },
  { id:"req3", tgl:"2026-08-10", keterangan:"Beli parfum ruangan isi ulang", nominal:25000, mode:"solo", admins:["KAMIL"], pemohon:"Kamil", status:"rejected", decidedAt:"2026-08-11", catatan:"Belum mendesak, tunda dulu" },
];

function loadDB(){
  let members = JSON.parse(localStorage.getItem(LS_KEYS.members) || "null");
  let tx = JSON.parse(localStorage.getItem(LS_KEYS.tx) || "null");
  let requests = JSON.parse(localStorage.getItem(LS_KEYS.requests) || "null");
  if(!members){ members = SEED_MEMBERS; saveMembers(members); }
  if(!tx){ tx = buildSeedTransactions(); saveTx(tx); }
  if(!requests){ requests = SEED_REQUESTS.map(r=>({...r})); saveRequests(requests); }
  if(!localStorage.getItem(LS_KEYS.cred)){
    localStorage.setItem(LS_KEYS.cred, JSON.stringify({user:"admin", pass:"admin123"}));
  }
  return { members, tx, requests };
}
function saveMembers(m){ localStorage.setItem(LS_KEYS.members, JSON.stringify(m)); }
function saveTx(t){ localStorage.setItem(LS_KEYS.tx, JSON.stringify(t)); }
function saveRequests(r){ localStorage.setItem(LS_KEYS.requests, JSON.stringify(r)); }
function isAuthed(){ return localStorage.getItem(LS_KEYS.auth) === "1"; }

let DB = loadDB();

/* ---------------- STATE APLIKASI ---------------- */
const state = {
  route: location.hash.replace("#","") || "/",
  guestTxFilter: "all",  // all | masuk | keluar
  adminSection: "dashboard",
  filterText: "",
  filterAdmin: "",
  filterMonth: "",
  adminTxFilter: "all",  // all | masuk | keluar
  viewRows: 5,           // 5 | 15 | 'all'
  visibleRows: 10,
  editingTxId: null,
  editingMemberId: null,
  mobileMenuOpen: false,
  guestFilterOpen: false, // panel filter tabel transaksi (tampilan tamu) — tersembunyi secara default
  // draft form "Pengajuan Pembelian" — dipertahankan lintas re-render
  pengajuan: { mode:"solo", soloAdmin:"", patunganSet:null, ket:"", nominal:"", pemohon:"", editingReqId:null },
};

/* ---------------- UTIL ---------------- */
function rupiah(n){
  n = Number(n)||0;
  return "Rp" + n.toLocaleString("id-ID");
}
function fmtDate(iso){
  const d = new Date(iso+"T00:00:00");
  return d.toLocaleDateString("id-ID",{weekday:"long", day:"2-digit", month:"long", year:"numeric"});
}
function fmtDateShort(iso){
  const d = new Date(iso+"T00:00:00");
  return d.toLocaleDateString("id-ID",{day:"2-digit", month:"short", year:"numeric"});
}
function fmtMonthKey(iso){ return iso.slice(0,7); }
function monthLabel(key){
  const [y,m] = key.split("-");
  const names = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  return names[parseInt(m,10)-1] + " " + y.slice(2);
}
function memberById(id){ return DB.members.find(m=>m.id===id); }
function colorOf(adminId){
  if(adminId === "UANG RIBA") return RIBA_COLOR;
  const m = memberById(adminId);
  return m ? m.color : "#999";
}
function nameOf(adminId){
  if(adminId === "UANG RIBA") return "Uang Riba";
  const m = memberById(adminId);
  return m ? m.nama : adminId;
}
function uid(prefix){ return prefix + Math.random().toString(36).slice(2,9); }
// Dicek lewat JS (bukan cuma CSS media-query) supaya tombol ekspor pasti
// tidak muncul dobel di HP, apapun engine preview yang dipakai.
function isDesktopWidth(){ return window.innerWidth > 760; }
function initials(name){
  const words = String(name).trim().split(/\s+/).filter(Boolean);
  if(words.length>=2) return (words[0][0]+words[1][0]).toUpperCase();
  const w = words[0]||"";
  if(w.length>=2) return (w[0]+w[w.length-1]).toUpperCase(); // huruf awal+akhir -> lebih unik antar nama
  return w.toUpperCase();
}
function shadeColor(hex, percent){
  hex = String(hex).replace('#','');
  if(hex.length===3) hex = hex.split('').map(c=>c+c).join('');
  const num = parseInt(hex,16);
  let r = (num>>16)+percent, g=((num>>8)&0x00FF)+percent, b=(num&0x0000FF)+percent;
  r = Math.max(Math.min(255,r),0); g=Math.max(Math.min(255,g),0); b=Math.max(Math.min(255,b),0);
  return "#"+(0x1000000+r*0x10000+g*0x100+Math.round(b)).toString(16).slice(1);
}
function avatarBg(color){
  return `linear-gradient(135deg, ${color} 0%, ${shadeColor(color,-32)} 100%)`;
}
function avatarHtml(adminId, size){
  const cls = size==="sm" ? "avatar sm" : "avatar";
  return `<span class="${cls}" style="background:${avatarBg(colorOf(adminId))}">${initials(nameOf(adminId))}</span>`;
}
function escapeHtml(s){ return String(s??"").replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

function totals(list){
  const masuk = list.reduce((s,t)=>s+Number(t.btb||0),0);
  const keluar = list.reduce((s,t)=>s+Number(t.bkb||0),0);
  return { masuk, keluar, saldo: masuk - keluar };
}
/* ---------------- PENGAJUAN PEMBELIAN ---------------- */
function activeMembers(){ return DB.members.filter(m=>m.status==="active"); }

function splitAmount(nominal, n){
  // bagi rata, sisa pembulatan dibebankan ke admin pertama-pertama agar totalnya pas
  const base = Math.floor(nominal/n);
  const remainder = nominal - base*n;
  return Array.from({length:n}, (_,i)=> base + (i<remainder ? 1 : 0));
}

function requestStatusMeta(status){
  if(status==="approved") return {label:"Disetujui", cls:"approved"};
  if(status==="rejected") return {label:"Ditolak", cls:"rejected"};
  return {label:"Menunggu", cls:"pending"};
}

/* ---------------- SALDO PRIBADI ADMIN (untuk validasi pengajuan) ---------------- */
// Saldo pribadi = total kas masuk (setoran) dikurangi total kas keluar (pengeluaran)
// yang tercatat atas nama admin tsb di buku kas (DB.tx).
function memberSaldo(adminId){
  let bal = 0;
  DB.tx.forEach(t=>{ if(t.admin===adminId) bal += Number(t.btb||0) - Number(t.bkb||0); });
  return bal;
}
// Dana yang sudah "ditahan" oleh pengajuan LAIN yang masih menunggu (pending),
// supaya satu admin tidak bisa dipakai dananya dobel oleh dua pengajuan sekaligus.
function memberPendingHold(adminId, excludeReqId){
  let hold = 0;
  DB.requests.forEach(r=>{
    if(r.status!=="pending" || (excludeReqId && r.id===excludeReqId)) return;
    const idx = r.admins.indexOf(adminId);
    if(idx===-1) return;
    hold += splitAmount(r.nominal, r.admins.length)[idx];
  });
  return hold;
}
function memberAvailableSaldo(adminId, excludeReqId){
  return memberSaldo(adminId) - memberPendingHold(adminId, excludeReqId);
}
const ANGKA_KATA_ID = ["nol","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh"];
function terbilangID(n){ return ANGKA_KATA_ID[n] || String(n); }
function joinNamesID(names){
  if(names.length===0) return "";
  if(names.length===1) return names[0];
  if(names.length===2) return `${names[0]} dan ${names[1]}`;
  return `${names.slice(0,-1).join(", ")}, dan ${names[names.length-1]}`;
}
// Validasi sumber dana SOLO — mengembalikan {ok, note}
function computeSoloValidation(){
  const d = state.pengajuan;
  const nominal = Number(d.nominal)||0;
  if(!d.soloAdmin || nominal<=0) return {ok:true, note:null}; // belum cukup data buat dicek, biarkan submit klik yang validasi field wajib
  const m = memberById(d.soloAdmin);
  const nama = m ? m.nama : "Admin ini";
  const available = memberAvailableSaldo(d.soloAdmin, d.editingReqId);
  if(available < nominal){
    return {ok:false, note:`Saldo ${nama} tidak cukup (tersedia ${rupiah(available)}, dibutuhkan ${rupiah(nominal)}). Pilih admin lain atau minta ${nama} setor kas dahulu.`};
  }
  return {ok:true, note:null};
}
// Validasi sumber dana PATUNGAN — mengembalikan {ok, note}
function computePatunganValidation(){
  const d = state.pengajuan;
  const nominal = Number(d.nominal)||0;
  const actives = activeMembers();
  const set = d.patunganSet || new Set(actives.map(m=>m.id));
  const ids = actives.filter(m=>set.has(m.id)).map(m=>m.id);
  if(ids.length===0 || nominal<=0) return {ok:true, note:null};
  const shares = splitAmount(nominal, ids.length);
  const insufficient = [];
  ids.forEach((id,i)=>{
    const avail = memberAvailableSaldo(id, d.editingReqId);
    if(avail < shares[i]) insufficient.push({ id, nama:nameOf(id), available:avail });
  });
  if(insufficient.length>0){
    const daftar = insufficient.map(x=>`${x.nama} ${rupiah(x.available)}`).join(", ");
    const hubungi = joinNamesID(insufficient.map(x=>x.nama));
    const subjek = insufficient.length===1 ? "1 orang admin" : `${terbilangID(insufficient.length)} (${insufficient.length}) orang admin`;
    return {ok:false, note:`Saldo ${subjek} ${daftar} tidak cukup untuk melakukan patungan ini. Hubungi ${hubungi} untuk setoran kas segera.`};
  }
  return {ok:true, note:null};
}
function computePengajuanValidation(){
  return state.pengajuan.mode==="solo" ? computeSoloValidation() : computePatunganValidation();
}
// Perbarui kartu peringatan saldo + status tombol kirim TANPA render ulang seluruh
// halaman, supaya fokus ketik di kolom Nominal tidak hilang (papan ketik tidak tertutup).
function updatePengajuanValidation(){
  const v = computePengajuanValidation();
  const noteEl = document.getElementById("pgSaldoNote");
  const btn = document.getElementById("pgSubmit");
  if(noteEl){
    if(v.note){
      noteEl.innerHTML = `${icon('alert')}<span>${escapeHtml(v.note)}</span>`;
      noteEl.classList.add("show");
    } else {
      noteEl.innerHTML = "";
      noteEl.classList.remove("show");
    }
  }
  if(btn) btn.disabled = !v.ok;
  return v;
}

function pendingRequestCount(){ return DB.requests.filter(r=>r.status==="pending").length; }

function approveRequest(id){
  const req = DB.requests.find(r=>r.id===id);
  if(!req || req.status!=="pending") return;
  const amounts = splitAmount(req.nominal, req.admins.length);
  const today = new Date().toISOString().slice(0,10);
  req.admins.forEach((adminId, i)=>{
    DB.tx.push({
      id: uid("tx"), tgl: today, admin: adminId, shift:"Non Shift",
      btb:0, bkb: amounts[i],
      ket: `Pengajuan disetujui: ${req.keterangan}${req.admins.length>1 ? ' (patungan)' : ''}`,
      kat: "pinjaman",
    });
  });
  saveTx(DB.tx);
  req.status = "approved";
  req.decidedAt = today;
  saveRequests(DB.requests);
  toast("Pengajuan disetujui & tercatat di kas keluar");
}
function rejectRequest(id){
  const req = DB.requests.find(r=>r.id===id);
  if(!req || req.status!=="pending") return;
  const alasan = window.prompt("Alasan penolakan (opsional):","") || "";
  req.status = "rejected";
  req.decidedAt = new Date().toISOString().slice(0,10);
  req.catatan = alasan;
  saveRequests(DB.requests);
  toast("Pengajuan ditolak");
}

/* ---------------- PERINGKAT SETORAN (KAS MASUK) PER ANGGOTA ---------------- */
function depositRanking(){
  const map = {};
  DB.tx.forEach(t=>{
    if(t.kat==="kas" && t.admin!=="UANG RIBA"){
      if(!map[t.admin]) map[t.admin] = { total:0, count:0 };
      map[t.admin].total += Number(t.btb||0);
      map[t.admin].count += 1;
    }
  });
  const total = Object.values(map).reduce((s,x)=>s+x.total,0) || 1;
  return DB.members
    .filter(m=>map[m.id])
    .map(m=>({ id:m.id, total:map[m.id].total, count:map[m.id].count, pct: map[m.id].total/total*100 }))
    .sort((a,b)=>b.total-a.total);
}

/* ---------------- EKSPOR EXCEL & PDF ---------------- */
function exportRowsPlain(list){
  return list.map((t,i)=>{
    const isIn = t.btb>0;
    return {
      No: i+1,
      Tanggal: fmtDate(t.tgl),
      Nama: nameOf(t.admin),
      Shift: t.shift||"Non Shift",
      Jenis: isIn ? "Kas Masuk" : "Kas Keluar",
      Jumlah: isIn ? t.btb : t.bkb,
      Keterangan: t.ket || ""
    };
  });
}
function exportExcel(list){
  if(!window.XLSX){ toast("Pustaka Excel belum siap, coba lagi sebentar","err"); return; }
  const rows = exportRowsPlain(list);
  const ws = XLSX.utils.json_to_sheet(rows);
  ws['!cols'] = [{wch:5},{wch:16},{wch:14},{wch:11},{wch:11},{wch:13},{wch:32}];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Transaksi Kas");
  XLSX.writeFile(wb, `JHT-KAS-Transaksi-${new Date().toISOString().slice(0,10)}.xlsx`);
  toast("Excel berhasil diunduh");
}
function exportPdf(list){
  if(!window.jspdf){ toast("Pustaka PDF belum siap, coba lagi sebentar","err"); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation:"landscape" });
  doc.setFontSize(14);
  doc.text("JHT KAS Adm PRG — Tabel Transaksi", 14, 16);
  doc.setFontSize(9);
  doc.text(`Diunduh: ${new Date().toLocaleString("id-ID")}`, 14, 22);
  const rows = exportRowsPlain(list);
  doc.autoTable({
    startY: 27,
    head: [["No","Tanggal","Nama","Shift","Jenis","Jumlah","Keterangan"]],
    body: rows.map(r=>[r.No, r.Tanggal, r.Nama, r.Shift, r.Jenis, rupiah(r.Jumlah), r.Keterangan]),
    styles:{ fontSize:8, cellPadding:2.5 },
    headStyles:{ fillColor:[240,169,58], textColor:[36,26,6] },
    alternateRowStyles:{ fillColor:[245,245,242] },
  });
  doc.save(`JHT-KAS-Transaksi-${new Date().toISOString().slice(0,10)}.pdf`);
  toast("PDF berhasil diunduh");
}

/* ---------------- TOAST ---------------- */
function toast(msg, isErr){
  let stack = document.querySelector(".toast-stack");
  if(!stack){ stack = document.createElement("div"); stack.className="toast-stack"; document.body.appendChild(stack); }
  const el = document.createElement("div");
  el.className = "toast" + (isErr ? " err" : "");
  el.textContent = msg;
  stack.appendChild(el);
  setTimeout(()=>{ el.style.transition="opacity .3s,transform .3s"; el.style.opacity="0"; el.style.transform="translateX(20px)"; setTimeout(()=>el.remove(),300); }, 2600);
}

/* ---------------- THEME ---------------- */
function applyTheme(){
  const t = localStorage.getItem(LS_KEYS.theme) || "dark";
  document.documentElement.setAttribute("data-theme", t);
}
function toggleTheme(){
  const cur = document.documentElement.getAttribute("data-theme");
  const next = cur === "dark" ? "light" : "dark";
  localStorage.setItem(LS_KEYS.theme, next);
  document.documentElement.setAttribute("data-theme", next);
}

/* ============================================================
   ICON helper
============================================================ */
function icon(name, cls){ return `<svg width="16" height="16" class="${cls||''}"><use href="#ic-${name}"/></svg>`; }

/* ============================================================
   ROUTER
============================================================ */
window.addEventListener("hashchange", ()=>{
  state.route = location.hash.replace("#","") || "/";
  render();
});

function goto(route){ location.hash = route; }

function render(){
  const root = document.getElementById("app");
  if(state.route === "/admin"){
    if(!isAuthed()){ goto("/login"); return; }
    root.innerHTML = renderAdmin();
    bindAdmin();
  } else if(state.route === "/login"){
    if(isAuthed()){ goto("/admin"); return; }
    root.innerHTML = renderLogin();
    bindLogin();
  } else if(state.route === "/pengajuan"){
    root.innerHTML = renderPengajuanPage();
    bindPengajuanPage();
  } else if(state.route === "/riwayat"){
    root.innerHTML = renderRiwayatPage();
    bindSimplePage();
  } else if(state.route === "/aset"){
    root.innerHTML = renderAsetPage();
    bindSimplePage();
  } else {
    root.innerHTML = renderGuest();
    bindGuest();
  }
}

/* ============================================================
   TOPBAR (shared antara guest & bisa dipakai ulang)
============================================================ */
function topbar(){
  const theme = document.documentElement.getAttribute("data-theme")||"dark";
  const pendingCount = pendingRequestCount();
  return `
  <div class="topbar">
    <div class="topbar-inner">
      <a class="brand" href="#/">
        <div class="brand-mark">JK</div>
        <div class="brand-text"><b>JHT KAS Adm PRG</b><span>Buku kas admin gudang</span></div>
      </a>
      <div class="topbar-actions">
        <button class="icon-btn" id="themeBtn" title="Ganti tema">${icon(theme==='dark'?'sun':'moon')}</button>
        <button class="btn btn-primary" id="loginBtn">${icon('lock')}<span>Masuk Admin</span></button>
      </div>
      <button class="icon-btn hamburger-btn" id="hamburgerBtn" title="Menu">${icon('menu')}${pendingCount>0?`<span class="menu-dot"></span>`:""}</button>
    </div>
    <div class="mobile-menu-panel" id="mobileMenuPanel">
      <button class="mm-item" id="mmHome"><span class="mm-ico-wrap">${icon('home')}</span><span>Home</span></button>
      <button class="mm-item" id="themeBtnMob"><span class="mm-ico-wrap">${icon(theme==='dark'?'sun':'moon')}</span><span>Ganti Tema</span></button>
      <button class="mm-item" id="loginBtnMob"><span class="mm-ico-wrap">${icon('lock')}</span><span>Masuk Admin</span></button>
      <div class="mm-sep"></div>
      <div class="mm-label">Tautan Cepat</div>
      <button class="mm-item" id="mmJadwal"><span class="mm-ico-wrap">${icon('calendar')}</span><span>Jadwal Admin GDNG PRG</span><span class="mm-ext">${icon('external')}</span></button>
      <button class="mm-item" id="mmRekapLama"><span class="mm-ico-wrap">${icon('sheet')}</span><span>Data Rekap Lama (Spreadsheet)</span><span class="mm-ext">${icon('external')}</span></button>
      <button class="mm-item" id="mmRitase"><span class="mm-ico-wrap">${icon('report')}</span><span>Uang Ritase TUA</span><span class="mm-ext">${icon('external')}</span></button>
      <div class="mm-sep"></div>
      <div class="mm-label">Pengajuan Pembelian</div>
      <button class="mm-item" id="mmPengajuan"><span class="mm-ico-wrap">${icon('plus-circle')}</span><span>Ajukan Pembelian</span></button>
      <button class="mm-item" id="mmRiwayat"><span class="mm-ico-wrap">${icon('inbox')}</span><span>Riwayat Pengajuan</span>${pendingCount>0?`<span class="mm-badge">${pendingCount}</span>`:""}</button>
      <button class="mm-item" id="mmAset"><span class="mm-ico-wrap">${icon('box')}</span><span>Aset Barang/Jasa Milik Pribadi Admin</span></button>
      <div class="mm-sep"></div>
      <div class="mm-label">Unduh Data</div>
      <button class="mm-item" id="mmExportExcel"><span class="mm-ico-wrap">${icon('file-excel')}</span><span>Unduh Excel</span></button>
      <button class="mm-item" id="mmExportPdf"><span class="mm-ico-wrap">${icon('file-pdf')}</span><span>Unduh PDF</span></button>
      <div class="mm-sep"></div>
      <div class="mm-label">Hiburan</div>
      <button class="mm-item mm-expandable" id="mmGameToggle" aria-expanded="false"><span class="mm-ico-wrap">${icon('gamepad')}</span><span>Game</span><span class="mm-chev">${icon('chevron-right')}</span></button>
      <div class="mm-submenu" id="mmGameSubmenu">
        <button class="mm-item" data-game="catur"><span class="mm-ico-wrap">♟️</span><span>Catur</span></button>
        <button class="mm-item" data-game="ular"><span class="mm-ico-wrap">🐍</span><span>Ular Tangga</span></button>
        <button class="mm-item" data-game="monopoli"><span class="mm-ico-wrap">🎲</span><span>Monopoly</span></button>
      </div>
      <div class="mm-footer">Website Developer <a href="https://benyoriki.com/" target="_blank" rel="noopener">benyoriki.com</a></div>
    </div>
  </div>`;
}

/* ============================================================
   HERO — animasi grafik candlestick (dekoratif & ringan)
   Catatan: data acak untuk estetika, bukan data pasar riil.
============================================================ */
let heroChartData = null;
let heroChartTimer = null;

function genCandle(prevClose){
  const vol = prevClose * (0.006 + Math.random()*0.01);
  const open = prevClose;
  const dir = Math.random() > 0.46 ? 1 : -1;
  const close = Math.max(1, open + dir * vol * (0.4 + Math.random()*0.9));
  const high = Math.max(open,close) + vol*Math.random()*0.5;
  const low = Math.max(0.5, Math.min(open,close) - vol*Math.random()*0.5);
  return {open, close, high, low};
}
function initHeroChartData(){
  const n = 36;
  let price = 100;
  const arr = [];
  for(let i=0;i<n;i++){ const c = genCandle(price); arr.push(c); price = c.close; }
  return arr;
}
function initHeroChart(){
  const svg = document.getElementById("heroChartSvg");
  if(!svg) return;
  if(heroChartTimer){ clearInterval(heroChartTimer); heroChartTimer = null; }
  heroChartData = initHeroChartData();
  drawHeroChart();
  heroChartTimer = setInterval(()=>{
    if(!document.getElementById("heroChartSvg")){ clearInterval(heroChartTimer); heroChartTimer = null; return; }
    const last = heroChartData[heroChartData.length-1];
    heroChartData.push(genCandle(last.close));
    if(heroChartData.length>36) heroChartData.shift();
    drawHeroChart();
  }, 1500);
}
function drawHeroChart(){
  const svg = document.getElementById("heroChartSvg");
  if(!svg || !heroChartData) return;
  const W = 600, H = 130;
  const n = heroChartData.length;
  const cw = W/n;
  const highs = heroChartData.map(c=>c.high), lows = heroChartData.map(c=>c.low);
  const max = Math.max(...highs), min = Math.min(...lows);
  const pad = (max-min)*0.1 || 1;
  const top = max+pad, bottom = min-pad;
  const scaleY = v => H - ((v-bottom)/(top-bottom))*H;

  let bars = "";
  heroChartData.forEach((c,i)=>{
    const x = i*cw;
    const up = c.close >= c.open;
    const color = up ? "var(--forest)" : "var(--rust)";
    const bodyTop = scaleY(Math.max(c.open,c.close));
    const bodyBot = scaleY(Math.min(c.open,c.close));
    const bodyH = Math.max(bodyBot-bodyTop, 1.4);
    const wickX = x+cw/2;
    bars += `<line x1="${wickX.toFixed(2)}" y1="${scaleY(c.high).toFixed(2)}" x2="${wickX.toFixed(2)}" y2="${scaleY(c.low).toFixed(2)}" stroke="${color}" stroke-width="1" opacity=".8"/>`;
    bars += `<rect x="${(x+cw*0.18).toFixed(2)}" y="${bodyTop.toFixed(2)}" width="${(cw*0.64).toFixed(2)}" height="${bodyH.toFixed(2)}" fill="${color}" rx="1"/>`;
  });
  const linePts = heroChartData.map((c,i)=> `${(i*cw+cw/2).toFixed(2)},${scaleY(c.close).toFixed(2)}`);
  const lastX = (n-1)*cw + cw/2;
  const lastY = scaleY(heroChartData[n-1].close);
  const areaPts = `0,${H} ${linePts.join(" ")} ${W},${H}`;

  svg.innerHTML = `
    <defs>
      <linearGradient id="heroAreaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--amber)" stop-opacity=".28"/>
        <stop offset="100%" stop-color="var(--amber)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <line x1="0" y1="${(H*0.25).toFixed(1)}" x2="${W}" y2="${(H*0.25).toFixed(1)}" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,4"/>
    <line x1="0" y1="${(H*0.5).toFixed(1)}" x2="${W}" y2="${(H*0.5).toFixed(1)}" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,4"/>
    <line x1="0" y1="${(H*0.75).toFixed(1)}" x2="${W}" y2="${(H*0.75).toFixed(1)}" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,4"/>
    <polygon points="${areaPts}" fill="url(#heroAreaGrad)" stroke="none"/>
    <polyline points="${linePts.join(" ")}" fill="none" stroke="var(--amber)" stroke-width="1.3" opacity=".6"/>
    ${bars}
    <circle class="hero-live-ring" cx="${lastX.toFixed(2)}" cy="${lastY.toFixed(2)}" r="7" fill="none" stroke="var(--amber)" stroke-width="1.5"/>
    <circle cx="${lastX.toFixed(2)}" cy="${lastY.toFixed(2)}" r="3" fill="var(--amber)"/>
  `;

  const last = heroChartData[heroChartData.length-1];
  const prev = heroChartData[heroChartData.length-2] || last;
  const up = last.close >= prev.close;
  const chg = prev.close ? ((last.close-prev.close)/prev.close*100) : 0;
  const valEl = document.getElementById("heroChartVal");
  const chgEl = document.getElementById("heroChartChg");
  if(valEl){ valEl.textContent = last.close.toFixed(2); valEl.style.color = up ? "var(--forest)" : "var(--rust)"; }
  if(chgEl){ chgEl.textContent = `${up?'▲':'▼'} ${Math.abs(chg).toFixed(2)}%`; chgEl.style.color = up ? "var(--forest)" : "var(--rust)"; }
  const hiEl = document.getElementById("heroChartHi");
  const loEl = document.getElementById("heroChartLo");
  if(hiEl) hiEl.textContent = max.toFixed(2);
  if(loEl) loEl.textContent = min.toFixed(2);
}

/* ============================================================
   GUEST VIEW
============================================================ */
function renderGuest(){
  const t = totals(DB.tx);
  const ranking = depositRanking();
  const maxTotal = Math.max(...ranking.map(r=>r.total), 1);

  return `
  ${topbar()}
  <div class="container">
    <div class="hero">
      <div class="hero-top">
        <div>
          <div class="hero-eyebrow">Transparansi Kas · ${DB.members.length} Anggota</div>
          <h1>Rekap Kas Admin Gudang</h1>
          <p class="hero-sub">Semua kontribusi, pengeluaran, dan histori anggota tercatat terbuka di sini. Tampilan tamu bersifat lihat-saja.</p>
          <div class="hero-chart" id="heroChart">
            <svg class="hero-chart-svg" id="heroChartSvg" viewBox="0 0 600 130" preserveAspectRatio="none"></svg>
            <div class="hero-chart-tag">
              <span class="hct-dot"></span><span>KAS-IDX</span>
            </div>
            <div class="hero-chart-price" id="heroChartPrice">
              <span class="hcp-val mono" id="heroChartVal">0</span>
              <span class="hcp-chg mono" id="heroChartChg">+0.00%</span>
            </div>
            <div class="hero-chart-range">
              <span>H <b class="mono" id="heroChartHi">0</b></span>
              <span>L <b class="mono" id="heroChartLo">0</b></span>
            </div>
          </div>
        </div>
        <div class="hero-stamp">Terbuka<br>untuk<br>semua</div>
      </div>

      ${excelPanelHtml(false)}

      <div class="saldo-strip reveal">
        <div class="saldo-col in">
          <span class="saldo-label">Kas Masuk</span>
          <span class="saldo-fig mono">${rupiah(t.masuk)}</span>
        </div>
        <span class="saldo-op">−</span>
        <div class="saldo-col out">
          <span class="saldo-label">Kas Keluar</span>
          <span class="saldo-fig mono">${rupiah(t.keluar)}</span>
        </div>
        <span class="saldo-op">=</span>
        <div class="saldo-col final">
          <span class="saldo-label">Saldo Akhir</span>
          <span class="saldo-fig mono">${rupiah(t.saldo)}</span>
        </div>
      </div>

      <div class="panel" style="margin-top:16px;">
        <div class="panel-head"><h3>🏆 Peringkat Setoran Anggota</h3><span class="hint">urut dari yang paling rajin setor</span></div>
        <div class="rank-list">
          ${ranking.length ? ranking.map((r,i)=>{
            const m = memberById(r.id);
            const widthPct = Math.max(4, (r.total/maxTotal*100));
            const isOff = m && m.status==='off';
            return `
            <div class="rank-row ${isOff?'off-member':''}" data-member="${r.id}" style="--i:${i};--m-color:${colorOf(r.id)};--target-width:${widthPct}%;">
              <span class="rank-no ${i<3?'top'+(i+1):''}">${i+1}</span>
              ${avatarHtml(r.id)}
              <span class="rank-name">${nameOf(r.id)}${isOff ? '<span class="off-tag">nonaktif</span>' : ''}</span>
              <div class="rank-figures">
                <span class="rank-amt">${rupiah(r.total)}</span>
                <span class="rank-pct">${r.pct.toFixed(1)}%</span>
              </div>
              <div class="rank-bar-track"><div class="rank-bar-fill"></div></div>
            </div>
          `;}).join("") : `<div class="empty-row">Belum ada setoran tercatat.</div>`}
        </div>
      </div>
    </div>
  </div>
  <footer class="site-footer">JHT KAS Adm PRG — mode uji, data tersimpan di penyimpanan lokal perangkat ini.</footer>
  `;
}

/* ============================================================
   TABEL TRANSAKSI ALA-EXCEL — dipakai tampilan tamu (lihat saja)
   maupun admin (dengan kolom aksi). Native <table> dipilih supaya
   render konsisten di semua perangkat (tanpa flex bersarang).
============================================================ */
function getFilteredTxList(withActions){
  const typeFilter = withActions ? state.adminTxFilter : state.guestTxFilter;
  // Urutan kronologis (No 1 = transaksi paling lama, seperti buku kas asli) —
  // transaksi terbaru otomatis berada di baris paling bawah.
  let list = [...DB.tx].sort((a,b)=> a.tgl.localeCompare(b.tgl) || a.id.localeCompare(b.id));
  if(typeFilter==="masuk") list = list.filter(t=>t.btb>0);
  else if(typeFilter==="keluar") list = list.filter(t=>t.bkb>0);
  return filterList(list);
}

function excelPanelHtml(withActions){
  const list = getFilteredTxList(withActions);
  const typeFilter = withActions ? state.adminTxFilter : state.guestTxFilter;
  const filterIdPrefix = withActions ? "a" : "g";
  const ROW_H = 46, HEAD_H = 44;
  const maxH = state.viewRows==="all" ? null : (HEAD_H + Number(state.viewRows)*ROW_H);
  const collapsible = !withActions;
  const isOpen = !collapsible || state.guestFilterOpen;

  const filterBlock = `
      <div class="sheet-tabs" id="${filterIdPrefix}TypeFilter" style="margin-bottom:10px;">
        <button class="sheet-tab ${typeFilter==='all'?'active':''}" data-type="all">Semua</button>
        <button class="sheet-tab ${typeFilter==='masuk'?'active':''}" data-type="masuk">Kas Masuk</button>
        <button class="sheet-tab ${typeFilter==='keluar'?'active':''}" data-type="keluar">Kas Keluar</button>
      </div>
      <div class="filters">
        <div class="search-wrap">${icon('search')}<input type="text" id="${filterIdPrefix}Text" placeholder="Cari keterangan / admin..." value="${escapeHtml(state.filterText)}"></div>
        <select id="${filterIdPrefix}Admin"><option value="">Semua admin</option>${adminOptions()}</select>
        <select id="${filterIdPrefix}Month"><option value="">Semua bulan</option>${monthOptions()}</select>
      </div>
      <div class="rows-toggle" id="${filterIdPrefix}RowsFilter">
        <span class="rows-toggle-label">Tampilkan:</span>
        <button class="sheet-tab ${String(state.viewRows)==='5'?'active':''}" data-rows="5">5 Data</button>
        <button class="sheet-tab ${String(state.viewRows)==='15'?'active':''}" data-rows="15">15 Data</button>
        <button class="sheet-tab ${state.viewRows==='all'?'active':''}" data-rows="all">Semua</button>
      </div>
  `;

  return `
    <div class="panel panel-ledger">
      <div class="panel-head ${collapsible ? 'panel-head-toggle' : ''}" ${collapsible ? `id="ledgerToggle" role="button" tabindex="0" aria-expanded="${isOpen}"` : ""}>
        <h3>📋 Tabel Transaksi</h3>
        ${collapsible ? `<span class="panel-head-hint">${isOpen?'Sembunyikan filter':'Tampilkan filter'}<span class="panel-head-chev">${icon('chevron-right')}</span></span>` : ""}
      </div>
      ${isDesktopWidth() ? `
      <div class="export-row">
        <button class="btn btn-sm export-btn" id="${filterIdPrefix}ExportExcel">${icon('file-excel')}<span>Excel</span></button>
        <button class="btn btn-sm export-btn" id="${filterIdPrefix}ExportPdf">${icon('file-pdf')}<span>PDF</span></button>
      </div>` : ``}
      ${collapsible ? `<div class="ledger-filter-collapse ${isOpen?'open':''}" id="ledgerFilterCollapse">${filterBlock}</div>` : filterBlock}
      ${excelTableHtml(list, withActions, maxH)}
    </div>
  `;
}

function excelTableHtml(list, withActions, maxHeightPx){
  if(!list.length) return `<div class="empty-row">Belum ada transaksi yang cocok.</div>`;
  const capStyle = maxHeightPx===undefined ? "" : (maxHeightPx===null ? `max-height:none;` : `max-height:${maxHeightPx}px;`);
  return `
  <div class="excel-wrap" style="${capStyle}">
    <table class="excel">
      <thead>
        <tr>
          <th class="col-no">No</th>
          <th>Tanggal</th>
          <th>Nama</th>
          <th>Shift</th>
          <th style="text-align:right;">Kas Masuk / Keluar</th>
          <th>Keterangan</th>
          ${withActions ? `<th class="col-no">Aksi</th>` : ""}
        </tr>
      </thead>
      <tbody>
        ${list.map((t,i)=>{
          const isIn = t.btb>0;
          const amount = isIn ? t.btb : t.bkb;
          return `
          <tr>
            <td class="col-no" style="border-left:3px solid ${colorOf(t.admin)};">${i+1}</td>
            <td>${fmtDateShort(t.tgl)}</td>
            <td class="col-name"><span class="avatar-mini" style="background:${avatarBg(colorOf(t.admin))}">${initials(nameOf(t.admin))}</span>${nameOf(t.admin)}</td>
            <td><span class="tx-shift-chip">${t.shift||"Non Shift"}</span></td>
            <td class="col-amt"><span class="amt-pill ${isIn?'in':'out'}">${isIn?'↑':'↓'} ${rupiah(amount)}</span></td>
            <td class="col-ket">${escapeHtml(t.ket) || "—"}</td>
            ${withActions ? `<td class="col-no"><button class="icon-btn sm" data-edit="${t.id}" title="Ubah">${icon('edit')}</button><button class="icon-btn sm" style="color:var(--rust);" data-del="${t.id}" title="Hapus">${icon('trash')}</button></td>` : ""}
          </tr>`;
        }).join("")}
      </tbody>
    </table>
  </div>`;
}

function adminOptions(){
  const ids = [...DB.members.map(m=>m.id), "UANG RIBA"];
  return ids.map(id=>`<option value="${id}">${nameOf(id)}</option>`).join("");
}
function monthOptions(){
  const keys = [...new Set(DB.tx.map(t=>fmtMonthKey(t.tgl)))].sort();
  return keys.map(k=>`<option value="${k}">${monthLabel(k)}</option>`).join("");
}

function filterList(list){
  return list.filter(t=>{
    if(state.filterAdmin && t.admin !== state.filterAdmin) return false;
    if(state.filterMonth && fmtMonthKey(t.tgl) !== state.filterMonth) return false;
    if(state.filterText){
      const q = state.filterText.toLowerCase();
      if(!(t.ket||"").toLowerCase().includes(q) && !nameOf(t.admin).toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

function closeMobileMenu(){ document.getElementById("mobileMenuPanel")?.classList.remove("open"); }

function bindTopbarCommon(){
  document.getElementById("themeBtn")?.addEventListener("click", ()=>{ toggleTheme(); render(); });
  document.getElementById("loginBtn")?.addEventListener("click", ()=> goto("/login"));
  document.getElementById("themeBtnMob")?.addEventListener("click", ()=>{ toggleTheme(); render(); });
  document.getElementById("loginBtnMob")?.addEventListener("click", ()=> goto("/login"));
  document.getElementById("mmHome")?.addEventListener("click", ()=>{ closeMobileMenu(); goto("/"); });
  document.getElementById("mmJadwal")?.addEventListener("click", ()=>{ closeMobileMenu(); window.open("https://web189.github.io/Jadwal-Admin/","_blank","noopener"); });
  document.getElementById("mmRekapLama")?.addEventListener("click", ()=>{ closeMobileMenu(); window.open("https://docs.google.com/spreadsheets/d/18V_4io2MWv-dRpOp44gwLrfl_ZzLAoKbpB5OPECaA0c/edit?usp=drivesdk","_blank","noopener"); });
  document.getElementById("mmRitase")?.addEventListener("click", ()=>{ closeMobileMenu(); window.open("https://web189.github.io/UangRitase/","_blank","noopener"); });
  document.getElementById("mmExportExcel")?.addEventListener("click", ()=>{ exportExcel(getFilteredTxList(false)); closeMobileMenu(); });
  document.getElementById("mmExportPdf")?.addEventListener("click", ()=>{ exportPdf(getFilteredTxList(false)); closeMobileMenu(); });
  document.getElementById("mmPengajuan")?.addEventListener("click", ()=>{ closeMobileMenu(); goto("/pengajuan"); });
  document.getElementById("mmRiwayat")?.addEventListener("click", ()=>{ closeMobileMenu(); goto("/riwayat"); });
  document.getElementById("mmAset")?.addEventListener("click", ()=>{ closeMobileMenu(); goto("/aset"); });
  document.getElementById("mmGameToggle")?.addEventListener("click", (e)=>{
    e.stopPropagation();
    const sub = document.getElementById("mmGameSubmenu");
    const btn = document.getElementById("mmGameToggle");
    const open = sub.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true":"false");
  });
  document.querySelectorAll("#mmGameSubmenu [data-game]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ closeMobileMenu(); openGameCenter(btn.dataset.game); });
  });
  document.getElementById("hamburgerBtn")?.addEventListener("click", (e)=>{
    e.stopPropagation();
    document.getElementById("mobileMenuPanel")?.classList.toggle("open");
  });
}

/* Klik di luar panel menu -> tutup otomatis */
document.addEventListener("click", (e)=>{
  const panel = document.getElementById("mobileMenuPanel");
  if(panel && panel.classList.contains("open") && !panel.contains(e.target) && e.target.id!=="hamburgerBtn" && !e.target.closest("#hamburgerBtn")){
    closeMobileMenu();
  }
});

function bindGuest(){
  bindTopbarCommon();
  initHeroChart();
  document.getElementById("ledgerToggle")?.addEventListener("click", ()=>{
    state.guestFilterOpen = !state.guestFilterOpen;
    render();
  });
  document.getElementById("ledgerToggle")?.addEventListener("keydown", (e)=>{
    if(e.key==="Enter" || e.key===" "){
      e.preventDefault();
      state.guestFilterOpen = !state.guestFilterOpen;
      render();
    }
  });
  document.querySelectorAll("#gTypeFilter .sheet-tab").forEach(btn=>{
    btn.addEventListener("click", ()=>{ state.guestTxFilter = btn.dataset.type; render(); });
  });
  document.getElementById("gText")?.addEventListener("input", e=>{ state.filterText = e.target.value; render(); });
  document.getElementById("gAdmin")?.addEventListener("change", e=>{ state.filterAdmin = e.target.value; render(); });
  document.getElementById("gMonth")?.addEventListener("change", e=>{ state.filterMonth = e.target.value; render(); });
  document.querySelectorAll("#gRowsFilter [data-rows]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ state.viewRows = btn.dataset.rows==="all" ? "all" : Number(btn.dataset.rows); render(); });
  });
  document.getElementById("gExportExcel")?.addEventListener("click", ()=> exportExcel(getFilteredTxList(false)));
  document.getElementById("gExportPdf")?.addEventListener("click", ()=> exportPdf(getFilteredTxList(false)));

  document.querySelectorAll("[data-member]").forEach(row=>{
    row.addEventListener("click", ()=>{
      state.filterAdmin = row.dataset.member;
      state.guestTxFilter = "masuk";
      render();
      setTimeout(()=>document.querySelector(".panel-ledger")?.scrollIntoView({behavior:"smooth", block:"start"}), 60);
    });
  });

  scrollExcelTablesToLatest();
}

/* Buka tampilan tabel langsung menunjukkan transaksi TERBARU
   (baris paling bawah, karena penomoran kronologis dari atas). */
function scrollExcelTablesToLatest(){
  requestAnimationFrame(()=>{
    document.querySelectorAll(".excel-wrap").forEach(el=>{ el.scrollTop = el.scrollHeight; });
  });
}

/* ============================================================
   LOGIN VIEW
============================================================ */
/* ============================================================
   HALAMAN: PENGAJUAN PEMBELIAN (siapa saja bisa mengajukan)
============================================================ */
function renderPengajuanPage(){
  const d = state.pengajuan;
  const actives = activeMembers();
  const checkedSet = d.patunganSet || new Set(actives.map(m=>m.id));
  const initialValidation = computePengajuanValidation();

  return `
  ${topbar()}
  <div class="container">
    <div class="hero">
      <button class="back-link" id="backHome2">&larr; Kembali ke beranda</button>
      <div class="hero-eyebrow">Formulir Terbuka · Bisa Diisi Siapa Saja</div>
      <h1>Ajukan Pembelian Barang/Jasa</h1>
      <p class="hero-sub">Isi kebutuhan barang/jasa yang mau dibeli pakai kas. Pengajuan akan masuk ke dashboard admin untuk disetujui atau ditolak.</p>

      <div class="panel" style="max-width:560px;">
        <div class="field">
          <label>Keterangan Barang/Jasa</label>
          <textarea id="pgKet" rows="3" placeholder="mis. Beli tinta printer 1 botol">${escapeHtml(d.ket)}</textarea>
        </div>
        <div class="field">
          <label>Nominal (Rp)</label>
          <input type="number" inputmode="numeric" id="pgNominal" value="${d.nominal||""}" placeholder="mis. 25000">
        </div>

        <div class="field">
          <label>Sumber Dana</label>
          <div class="sheet-tabs" id="pgModeTabs" style="width:100%;">
            <button class="sheet-tab ${d.mode==='solo'?'active':''}" data-mode="solo" style="flex:1;">Solo (1 Admin)</button>
            <button class="sheet-tab ${d.mode==='patungan'?'active':''}" data-mode="patungan" style="flex:1;">Patungan</button>
          </div>
        </div>

        ${d.mode==='solo' ? `
        <div class="field">
          <label>Pilih Admin (saldo orang tsb harus mencukupi)</label>
          <select id="pgSoloAdmin">
            <option value="">— pilih admin —</option>
            ${actives.map(m=>`<option value="${m.id}" ${d.soloAdmin===m.id?'selected':''}>${m.nama} — saldo ${rupiah(memberAvailableSaldo(m.id))}</option>`).join("")}
          </select>
        </div>
        ` : `
        <div class="field">
          <label>Pilih Admin yang Patungan</label>
          <div class="check-list">
            ${actives.map(m=>`
              <label class="check-row">
                <input type="checkbox" data-patungan="${m.id}" ${checkedSet.has(m.id)?'checked':''}>
                ${avatarHtml(m.id,"sm")}<span>${m.nama}</span>
                <span class="check-row-saldo mono">${rupiah(memberAvailableSaldo(m.id))}</span>
              </label>
            `).join("")}
          </div>
          <p class="field-hint">Nominal akan dibagi rata ke semua admin yang dicentang.</p>
        </div>
        `}

        <div class="field">
          <label>Nama Pemohon <span style="font-weight:400;color:var(--ink-faint);">(opsional)</span></label>
          <input type="text" id="pgPemohon" value="${escapeHtml(d.pemohon)}" placeholder="Nama kamu">
        </div>

        <div class="pg-saldo-note ${initialValidation.note?'show':''}" id="pgSaldoNote">${initialValidation.note?`${icon('alert')}<span>${escapeHtml(initialValidation.note)}</span>`:''}</div>

        <div class="modal-actions" style="justify-content:flex-start;">
          <button class="btn btn-primary" id="pgSubmit" ${initialValidation.ok?'':'disabled'}>${icon('plus-circle')}<span>Kirim Pengajuan</span></button>
          <button class="btn" id="pgCancel">Batal</button>
        </div>
      </div>
    </div>
  </div>
  <footer class="site-footer">JHT KAS Adm PRG — mode uji, data tersimpan di penyimpanan lokal perangkat ini.</footer>
  `;
}

function resetPengajuanDraft(){
  state.pengajuan = { mode:"solo", soloAdmin:"", patunganSet:null, ket:"", nominal:"", pemohon:"", editingReqId:null };
}

function bindPengajuanPage(){
  bindTopbarCommon();
  document.getElementById("backHome2")?.addEventListener("click", ()=> goto("/"));

  document.getElementById("pgKet")?.addEventListener("input", e=> state.pengajuan.ket = e.target.value);
  document.getElementById("pgNominal")?.addEventListener("input", e=>{
    state.pengajuan.nominal = e.target.value;
    updatePengajuanValidation();
  });
  document.getElementById("pgPemohon")?.addEventListener("input", e=> state.pengajuan.pemohon = e.target.value);
  document.getElementById("pgSoloAdmin")?.addEventListener("change", e=>{
    state.pengajuan.soloAdmin = e.target.value;
    updatePengajuanValidation();
  });

  document.querySelectorAll("#pgModeTabs [data-mode]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ state.pengajuan.mode = btn.dataset.mode; render(); });
  });
  document.querySelectorAll("[data-patungan]").forEach(cb=>{
    cb.addEventListener("change", ()=>{
      if(!state.pengajuan.patunganSet) state.pengajuan.patunganSet = new Set(activeMembers().map(m=>m.id));
      const id = cb.dataset.patungan;
      if(cb.checked) state.pengajuan.patunganSet.add(id); else state.pengajuan.patunganSet.delete(id);
      updatePengajuanValidation();
    });
  });

  document.getElementById("pgCancel")?.addEventListener("click", ()=>{ resetPengajuanDraft(); goto("/"); });
  document.getElementById("pgSubmit")?.addEventListener("click", ()=>{
    const d = state.pengajuan;
    const ket = (document.getElementById("pgKet").value||"").trim();
    const nominal = Number(document.getElementById("pgNominal").value)||0;
    if(!ket){ toast("Keterangan barang/jasa wajib diisi","err"); return; }
    if(nominal<=0){ toast("Nominal harus lebih dari 0","err"); return; }
    let admins = [];
    if(d.mode==="solo"){
      if(!d.soloAdmin){ toast("Pilih admin untuk sumber dana","err"); return; }
      admins = [d.soloAdmin];
    } else {
      const set = d.patunganSet || new Set(activeMembers().map(m=>m.id));
      admins = activeMembers().filter(m=>set.has(m.id)).map(m=>m.id);
      if(admins.length===0){ toast("Pilih minimal 1 admin untuk patungan","err"); return; }
    }
    // Validasi saldo final (jaga-jaga kalau tombol sempat ter-enable dari state lama)
    const finalCheck = computePengajuanValidation();
    if(!finalCheck.ok){
      toast(finalCheck.note || "Saldo tidak cukup untuk pengajuan ini","err");
      updatePengajuanValidation();
      return;
    }
    DB.requests.push({
      id: uid("req"), tgl: new Date().toISOString().slice(0,10),
      keterangan: ket, nominal, mode: d.mode, admins,
      pemohon: (document.getElementById("pgPemohon").value||"").trim() || "Tamu",
      status:"pending", decidedAt:null,
    });
    saveRequests(DB.requests);
    resetPengajuanDraft();
    toast("Pengajuan terkirim, menunggu persetujuan admin");
    goto("/riwayat");
  });

  updatePengajuanValidation();
}

/* ============================================================
   HALAMAN: RIWAYAT PENGAJUAN
============================================================ */
function renderRiwayatPage(){
  const list = [...DB.requests].sort((a,b)=> b.tgl.localeCompare(a.tgl) || b.id.localeCompare(a.id));
  return `
  ${topbar()}
  <div class="container">
    <div class="hero">
      <button class="back-link" id="backHome2">&larr; Kembali ke beranda</button>
      <div class="hero-eyebrow">Transparansi Pengajuan</div>
      <h1>Riwayat Pengajuan Pembelian</h1>
      <p class="hero-sub">Semua pengajuan pembelian—baik yang disetujui, ditolak, maupun masih menunggu—tercatat terbuka di sini.</p>

      <div class="panel">
        <div class="req-list">
          ${list.length ? list.map(reqCardHtml).join("") : `<div class="empty-row">Belum ada pengajuan.</div>`}
        </div>
      </div>
      <div style="margin-top:16px;">
        <button class="btn btn-primary" id="goPengajuanBtn">${icon('plus-circle')}<span>Ajukan Pembelian Baru</span></button>
      </div>
    </div>
  </div>
  <footer class="site-footer">JHT KAS Adm PRG — mode uji, data tersimpan di penyimpanan lokal perangkat ini.</footer>
  `;
}

function reqCardHtml(r, withActions){
  const meta = requestStatusMeta(r.status);
  const adminNames = r.admins.map(nameOf).join(", ");
  return `
    <div class="req-card">
      <div class="req-top">
        <span class="stamp ${meta.cls}">${meta.label}</span>
        <span class="req-amt mono">${rupiah(r.nominal)}</span>
      </div>
      <div class="req-ket">${escapeHtml(r.keterangan)}</div>
      <div class="req-meta">
        <span>📅 ${fmtDateShort(r.tgl)}</span>
        <span>👤 ${escapeHtml(r.pemohon||"Tamu")}</span>
        <span>${r.mode==='solo' ? '💰 Solo' : '🤝 Patungan'}: ${adminNames}</span>
      </div>
      ${r.status!=="pending" ? `<div class="req-meta" style="margin-top:4px;">${r.status==='approved'?'✅':'❌'} Diputuskan ${r.decidedAt?fmtDateShort(r.decidedAt):''}${r.catatan?` · "${escapeHtml(r.catatan)}"`:''}</div>` : ""}
      ${withActions && r.status==="pending" ? `
        <div class="req-actions">
          <button class="btn btn-sm" style="color:var(--forest);border-color:var(--forest);" data-acc="${r.id}">${icon('check')}<span>ACC</span></button>
          <button class="btn btn-sm btn-danger" data-tolak="${r.id}">${icon('close')}<span>Tolak</span></button>
        </div>` : ""}
    </div>
  `;
}

/* ============================================================
   HALAMAN: ASET BARANG/JASA (hasil pengajuan yang disetujui)
============================================================ */
function renderAsetPage(){
  const approved = DB.requests.filter(r=>r.status==="approved").sort((a,b)=> b.decidedAt.localeCompare(a.decidedAt));
  const totalNilai = approved.reduce((s,r)=>s+r.nominal,0);
  return `
  ${topbar()}
  <div class="container">
    <div class="hero">
      <button class="back-link" id="backHome2">&larr; Kembali ke beranda</button>
      <div class="hero-eyebrow">Hasil Pengeluaran Kas</div>
      <h1>Aset Barang/Jasa Milik Pribadi Admin</h1>
      <p class="hero-sub">Daftar barang/jasa yang sudah dibeli menggunakan saldo kas pribadi admin, hasil dari pengajuan yang disetujui.</p>

      <div class="stat-card accent reveal" style="max-width:280px;margin-bottom:18px;">
        <div class="label">Total Nilai Aset</div>
        <div class="value mono">${rupiah(totalNilai)}</div>
      </div>

      <div class="panel">
        <div class="req-list">
          ${approved.length ? approved.map(r=>`
            <div class="req-card">
              <div class="req-top">
                <span class="stamp approved">Aset</span>
                <span class="req-amt mono">${rupiah(r.nominal)}</span>
              </div>
              <div class="req-ket">${escapeHtml(r.keterangan)}</div>
              <div class="req-meta">
                <span>📅 Disetujui ${fmtDateShort(r.decidedAt)}</span>
                <span>${r.mode==='solo' ? '💰 Dana dari' : '🤝 Patungan'}: ${r.admins.map(nameOf).join(", ")}</span>
              </div>
            </div>
          `).join("") : `<div class="empty-row">Belum ada aset tercatat.</div>`}
        </div>
      </div>
    </div>
  </div>
  <footer class="site-footer">JHT KAS Adm PRG — mode uji, data tersimpan di penyimpanan lokal perangkat ini.</footer>
  `;
}

function bindSimplePage(){
  bindTopbarCommon();
  document.getElementById("backHome2")?.addEventListener("click", ()=> goto("/"));
  document.getElementById("goPengajuanBtn")?.addEventListener("click", ()=> goto("/pengajuan"));
}

function renderLogin(){
  return `
  <div class="login-screen">
    <div class="login-card">
      <button class="back-link" id="backHome">&larr; Kembali ke tampilan tamu</button>
      <div class="login-brand">
        <div class="brand-mark" style="width:46px;height:46px;font-size:15px;">JK</div>
        <h2 style="font-size:17px;">Masuk sebagai Admin</h2>
        <span class="stamp active" style="font-size:9px;">Akses Terbatas</span>
      </div>
      <div class="field">
        <label>Username</label>
        <input type="text" id="loginUser" placeholder="admin" autocomplete="username">
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" id="loginPass" placeholder="••••••••" autocomplete="current-password">
      </div>
      <div class="login-error" id="loginErr"></div>
      <button class="btn btn-primary" id="loginSubmit" style="width:100%;justify-content:center;">${icon('shield')}<span>Masuk</span></button>
      <p class="login-hint">Mode uji — akun default <b>admin / admin123</b>.<br>Ganti kredensial ini sebelum dipakai produksi sungguhan.</p>
    </div>
  </div>`;
}
function bindLogin(){
  document.getElementById("backHome").addEventListener("click", ()=>goto("/"));
  const submit = ()=>{
    const u = document.getElementById("loginUser").value.trim();
    const p = document.getElementById("loginPass").value;
    const cred = JSON.parse(localStorage.getItem(LS_KEYS.cred));
    if(u === cred.user && p === cred.pass){
      localStorage.setItem(LS_KEYS.auth, "1");
      goto("/admin");
    } else {
      document.getElementById("loginErr").textContent = "Username atau password salah.";
    }
  };
  document.getElementById("loginSubmit").addEventListener("click", submit);
  document.getElementById("loginPass").addEventListener("keydown", e=>{ if(e.key==="Enter") submit(); });
}

/* ============================================================
   ADMIN VIEW
============================================================ */
const ADMIN_NAV = [
  { id:"dashboard", label:"Dashboard", icon:"grid" },
  { id:"transaksi", label:"Transaksi", icon:"book" },
  { id:"pengajuan", label:"Pengajuan", icon:"inbox" },
  { id:"anggota", label:"Anggota", icon:"users" },
  { id:"histori", label:"Histori", icon:"history" },
  { id:"laporan", label:"Laporan", icon:"report" },
];

function renderAdmin(){
  const theme = document.documentElement.getAttribute("data-theme")||"dark";
  return `
  <div class="admin-topbar-mobile">
    <div class="brand-mark" style="width:32px;height:32px;font-size:11px;">JK</div>
    <div class="brand-text"><b>JHT KAS Adm</b></div>
    <div style="margin-left:auto;display:flex;gap:6px;">
      <button class="icon-btn" id="mAdminExportExcel" style="color:var(--forest);" title="Unduh Excel">${icon('file-excel')}</button>
      <button class="icon-btn" id="mAdminExportPdf" style="color:var(--rust);" title="Unduh PDF">${icon('file-pdf')}</button>
      <button class="icon-btn" id="themeBtnM" title="Ganti tema">${icon(theme==='dark'?'sun':'moon')}</button>
      <button class="icon-btn" id="viewGuestBtnM" title="Tampilan tamu">${icon('grid')}</button>
      <button class="icon-btn" id="logoutBtnM" style="color:var(--rust);" title="Keluar">${icon('logout')}</button>
    </div>
  </div>
  <div class="admin-tabs-mobile">
    ${ADMIN_NAV.map(n=>`<button class="pill-tab ${state.adminSection===n.id?'active':''}" data-sec="${n.id}">${icon(n.icon)}<span>${n.label}</span>${n.id==='pengajuan'&&pendingRequestCount()>0?`<span class="mm-badge">${pendingRequestCount()}</span>`:''}</button>`).join("")}
  </div>
  <div class="admin-shell">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-mark">JK</div>
        <div class="brand-text"><b>JHT KAS</b><span>Admin</span></div>
      </div>
      ${ADMIN_NAV.map(n=>`
        <button class="nav-item ${state.adminSection===n.id?'active':''}" data-sec="${n.id}">
          ${icon(n.icon)}<span>${n.label}</span>${n.id==='pengajuan'&&pendingRequestCount()>0?`<span class="mm-badge">${pendingRequestCount()}</span>`:''}
        </button>
      `).join("")}
      <div class="nav-sep"></div>
      <div class="nav-foot">
        <button class="icon-btn" id="themeBtnA" title="Ganti tema">${icon(theme==='dark'?'sun':'moon')}</button>
        <button class="nav-item" id="viewGuestBtn">${icon('grid')}<span>Lihat Tampilan Tamu</span></button>
        <button class="nav-item" id="logoutBtn" style="color:var(--rust);">${icon('logout')}<span>Keluar</span></button>
      </div>
    </aside>
    <main class="admin-main">
      <div id="adminContent"></div>
    </main>
  </div>
  <div class="modal-overlay" id="modalOverlay"><div class="modal" id="modalBody"></div></div>
  `;
}

function adminContentHtml(){
  switch(state.adminSection){
    case "transaksi": return secTransaksi();
    case "pengajuan": return secPengajuan();
    case "anggota": return secAnggota();
    case "histori": return secHistori();
    case "laporan": return secLaporan();
    default: return secDashboard();
  }
}

function secPengajuan(){
  const all = [...DB.requests].sort((a,b)=> b.tgl.localeCompare(a.tgl) || b.id.localeCompare(a.id));
  const pending = all.filter(r=>r.status==="pending");
  const decided = all.filter(r=>r.status!=="pending");
  return `
    <div class="admin-topline">
      <div><h2>Pengajuan Pembelian</h2><div class="sub">${pending.length} menunggu persetujuan · ${decided.length} sudah diputuskan</div></div>
    </div>
    <div class="panel" style="margin-bottom:16px;">
      <div class="panel-head"><h3>⏳ Menunggu Persetujuan</h3></div>
      <div class="req-list">
        ${pending.length ? pending.map(r=>reqCardHtml(r,true)).join("") : `<div class="empty-row">Tidak ada pengajuan yang menunggu.</div>`}
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Riwayat Keputusan</h3></div>
      <div class="req-list">
        ${decided.length ? decided.map(r=>reqCardHtml(r,false)).join("") : `<div class="empty-row">Belum ada riwayat.</div>`}
      </div>
    </div>
  `;
}

function secDashboard(){
  const t = totals(DB.tx);
  const activeCount = DB.members.filter(m=>m.status==="active").length;
  const recent = [...DB.tx].sort((a,b)=>b.tgl.localeCompare(a.tgl)).slice(0,6);
  const ranking = depositRanking().slice(0,5);

  const months = [...new Set(DB.tx.map(x=>fmtMonthKey(x.tgl)))].sort().slice(-6);
  const perMonth = months.map(k=>{
    const list = DB.tx.filter(x=>fmtMonthKey(x.tgl)===k);
    return { k, ...totals(list) };
  });
  const maxVal = Math.max(...perMonth.map(m=>Math.max(m.masuk,m.keluar)),1);

  return `
    <div class="admin-topline">
      <div><h2>Dashboard</h2><div class="sub">Ringkasan kondisi kas hari ini</div></div>
      <button class="btn btn-primary" id="quickAddBtn">${icon('plus')}<span>Tambah Transaksi</span></button>
    </div>
    ${pendingRequestCount()>0 ? `
    <div class="alert-banner" id="goPengajuanAlertBtn">
      ${icon('inbox')}
      <span><b>${pendingRequestCount()} pengajuan pembelian</b> menunggu persetujuan kamu.</span>
      <span class="alert-cta">Lihat &rarr;</span>
    </div>` : ""}
    <div class="stat-grid">
      <div class="stat-card accent reveal"><div class="label">Saldo Kas</div><div class="value mono">${rupiah(t.saldo)}</div></div>
      <div class="stat-card reveal"><div class="label">Total Masuk</div><div class="value mono">${rupiah(t.masuk)}</div></div>
      <div class="stat-card reveal"><div class="label">Total Keluar</div><div class="value mono">${rupiah(t.keluar)}</div></div>
      <div class="stat-card reveal"><div class="label">Anggota Aktif</div><div class="value mono">${activeCount}/${DB.members.length}</div></div>
    </div>
    <div class="split">
      <div class="panel">
        <div class="panel-head"><h3>Arus Kas 6 Bulan Terakhir</h3><span class="hint"><span style="color:var(--forest);">●</span> Masuk &nbsp; <span style="color:var(--rust);">●</span> Keluar</span></div>
        <div class="mini-bar-wrap">
          ${perMonth.map(m=>`
            <div style="flex:1;display:flex;gap:3px;align-items:flex-end;height:100%;">
              <div class="mini-bar" title="Masuk ${rupiah(m.masuk)}" style="height:${Math.max(2,(m.masuk/maxVal*100))}%;background:var(--forest);"></div>
              <div class="mini-bar" title="Keluar ${rupiah(m.keluar)}" style="height:${Math.max(2,(m.keluar/maxVal*100))}%;background:var(--rust);"></div>
            </div>
          `).join("")}
        </div>
        <div class="mini-bar-labels">${perMonth.map(m=>`<span>${monthLabel(m.k)}</span>`).join("")}</div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>🏆 Peringkat Setoran</h3><span class="hint"><a href="javascript:void(0)" id="goAnggotaBtn" style="color:var(--ink-soft);text-decoration:underline;">lihat semua</a></span></div>
        <div class="rank-list">
          ${ranking.map((r,i)=>{
            const m = memberById(r.id);
            const isOff = m && m.status==='off';
            return `
            <div class="rank-row ${isOff?'off-member':''}" style="cursor:default;">
              <span class="rank-no ${i<3?'top'+(i+1):''}">${i+1}</span>
              ${avatarHtml(r.id)}
              <span class="rank-name">${nameOf(r.id)}${isOff ? '<span class="off-tag">nonaktif</span>' : ''}</span>
              <div class="rank-figures">
                <span class="rank-amt">${rupiah(r.total)}</span>
                <span class="rank-pct">${r.pct.toFixed(1)}%</span>
              </div>
            </div>
          `;}).join("") || `<div class="empty-row">Belum ada data.</div>`}
        </div>
      </div>
    </div>
    <div class="panel" style="margin-top:14px;">
        <div class="panel-head"><h3>Aktivitas Terbaru</h3></div>
        ${excelTableHtml(recent, false)}
    </div>
  `;
}

function secTransaksi(){
  return `
    <div class="admin-topline">
      <div><h2>Transaksi</h2><div class="sub">Kelola semua data kas masuk &amp; keluar</div></div>
      <button class="btn btn-primary" id="addTxBtn">${icon('plus')}<span>Tambah Transaksi</span></button>
    </div>
    ${excelPanelHtml(true)}
  `;
}

function secAnggota(){
  return `
    <div class="admin-topline">
      <div><h2>Anggota</h2><div class="sub">${DB.members.length} anggota terdaftar</div></div>
      <button class="btn btn-primary" id="addMemberBtn">${icon('plus')}<span>Tambah Anggota</span></button>
    </div>
    <div class="card-grid">
      ${DB.members.map((m,i)=>{
        const myTx = DB.tx.filter(t=>t.admin===m.id);
        const tot = totals(myTx);
        return `
        <div class="member-card" style="--m-color:${m.color};--i:${i};">
          <div class="member-head">
            ${avatarHtml(m.id)}
            <div class="member-head-text">
              <span class="mname">${m.nama}</span>
              <span class="mrole">Sejak ${fmtDate(m.sejak)}</span>
            </div>
          </div>
          <div class="mtotal mono">${rupiah(tot.masuk)}</div>
          <div class="mlabel">total kontribusi masuk</div>
          <span class="stamp ${m.status}">${m.status==='active'?'Aktif':'Nonaktif'}</span>
          <div class="member-actions">
            <button class="btn btn-sm" data-edit-member="${m.id}">${icon('edit')}Edit</button>
            <button class="btn btn-sm ${m.status==='active'?'btn-danger':''}" data-toggle-status="${m.id}">${m.status==='active' ? 'Nonaktifkan' : 'Aktifkan'}</button>
          </div>
        </div>`;
      }).join("")}
    </div>
  `;
}

function secHistori(){
  const offMembers = DB.members.filter(m=>m.status==="off");
  return `
    <div class="admin-topline">
      <div><h2>Histori Anggota Nonaktif</h2><div class="sub">Data tetap tersimpan walau anggota sudah off</div></div>
    </div>
    ${offMembers.length===0 ? `<div class="panel"><p style="color:var(--ink-soft);">Belum ada anggota yang dinonaktifkan.</p></div>` : offMembers.map(m=>{
      const myTx = DB.tx.filter(t=>t.admin===m.id).sort((a,b)=>b.tgl.localeCompare(a.tgl));
      const tot = totals(myTx);
      return `
      <div class="panel" style="margin-bottom:16px;">
        <div class="panel-head">
          <h3><span class="avatar-mini" style="background:${avatarBg(colorOf(m.id))};width:26px;height:26px;line-height:26px;font-size:11px;">${initials(m.nama)}</span>${m.nama} <span class="stamp off" style="font-size:9px;">Nonaktif sejak ${m.offSejak?fmtDate(m.offSejak):'-'}</span></h3>
          <span class="hint mono">Total masuk ${rupiah(tot.masuk)} · keluar ${rupiah(tot.keluar)}</span>
        </div>
        ${m.catatan ? `<p style="font-size:12.5px;color:var(--ink-soft);margin-bottom:12px;">${escapeHtml(m.catatan)}</p>` : ""}
        ${excelTableHtml(myTx, false)}
      </div>`;
    }).join("")}
  `;
}

function secLaporan(){
  const months = [...new Set(DB.tx.map(x=>fmtMonthKey(x.tgl)))].sort();
  const rows = months.map(k=>{
    const list = DB.tx.filter(x=>fmtMonthKey(x.tgl)===k);
    return { k, ...totals(list) };
  });
  return `
    <div class="admin-topline"><div><h2>Laporan Bulanan</h2><div class="sub">Rekap masuk/keluar per bulan</div></div></div>
    <div class="panel">
      <div style="overflow-x:auto;">
      <table class="ledger">
        <thead><tr><th>Bulan</th><th>Masuk</th><th>Keluar</th><th>Saldo Bulan</th></tr></thead>
        <tbody>${rows.map(r=>`
          <tr><td data-label="Bulan">${monthLabel(r.k)}</td>
          <td data-label="Masuk" class="mono">${rupiah(r.masuk)}</td>
          <td data-label="Keluar" class="mono">${rupiah(r.keluar)}</td>
          <td data-label="Saldo" class="mono" style="font-weight:700;">${rupiah(r.saldo)}</td></tr>
        `).join("")}</tbody>
      </table>
      </div>
    </div>
  `;
}

/* ---------------- MODALS ---------------- */
function openModal(html){
  document.getElementById("modalBody").innerHTML = html;
  document.getElementById("modalOverlay").classList.add("open");
}
function closeModal(){
  document.getElementById("modalOverlay").classList.remove("open");
}

function txFormModal(existing){
  const isEdit = !!existing;
  const ids = [...DB.members.map(m=>m.id), "UANG RIBA"];
  const jenis = existing ? (existing.bkb>0 ? "keluar" : "masuk") : "masuk";
  const jumlah = existing ? (existing.bkb>0 ? existing.bkb : existing.btb) : 0;
  return `
    <div class="modal-head"><h3>${isEdit?'Ubah':'Tambah'} Transaksi</h3><button class="icon-btn" id="modalClose">&times;</button></div>
    <div class="field"><label>Tanggal</label><input type="date" id="txTgl" value="${existing?.tgl || new Date().toISOString().slice(0,10)}"></div>
    <div class="form-row2">
      <div class="field"><label>Admin</label><select id="txAdmin">${ids.map(id=>`<option value="${id}" ${existing?.admin===id?'selected':''}>${nameOf(id)}</option>`).join("")}</select></div>
      <div class="field"><label>Shift</label><select id="txShift">${["Non Shift","Shift 1","Shift 2","Shift 3"].map(s=>`<option ${(existing?.shift||"Non Shift")===s?'selected':''}>${s}</option>`).join("")}</select></div>
    </div>
    <div class="form-row2">
      <div class="field"><label>Jenis</label><select id="txJenis">
        <option value="masuk" ${jenis==='masuk'?'selected':''}>Kas Masuk</option>
        <option value="keluar" ${jenis==='keluar'?'selected':''}>Kas Keluar</option>
      </select></div>
      <div class="field"><label>Jumlah (Rp)</label><input type="number" id="txJumlah" value="${jumlah||0}"></div>
    </div>
    <div class="field"><label>Keterangan</label><input type="text" id="txKet" placeholder="mis. Beli pulpen 4 box (kosongkan jika tidak ada)" value="${existing?escapeHtml(existing.ket):''}"></div>
    <div class="modal-actions">
      <button class="btn" id="modalClose2">Batal</button>
      <button class="btn btn-primary" id="txSave">${icon('plus')}<span>${isEdit?'Simpan Perubahan':'Simpan Transaksi'}</span></button>
    </div>
  `;
}

function memberFormModal(existing){
  const isEdit = !!existing;
  return `
    <div class="modal-head"><h3>${isEdit?'Ubah':'Tambah'} Anggota</h3><button class="icon-btn" id="modalClose">&times;</button></div>
    <div class="field"><label>Nama</label><input type="text" id="mNama" value="${existing?escapeHtml(existing.nama):''}" placeholder="mis. Sinta"></div>
    <div class="field"><label>Warna Tab</label>
      <div class="color-picker" id="colorPicker">
        ${COLOR_CHOICES.map(c=>`<div class="color-swatch ${existing?.color===c?'selected':''}" style="background:${c}" data-color="${c}"></div>`).join("")}
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn" id="modalClose2">Batal</button>
      <button class="btn btn-primary" id="memberSave">${icon('plus')}<span>${isEdit?'Simpan Perubahan':'Simpan Anggota'}</span></button>
    </div>
  `;
}

/* ---------------- BIND ADMIN ---------------- */
function refreshAdminContent(){
  document.getElementById("adminContent").innerHTML = adminContentHtml();
  bindAdminContentEvents();
}

function bindAdmin(){
  document.getElementById("themeBtnA").addEventListener("click", ()=>{ toggleTheme(); render(); });
  document.getElementById("viewGuestBtn").addEventListener("click", ()=> goto("/"));
  document.getElementById("themeBtnM")?.addEventListener("click", ()=>{ toggleTheme(); render(); });
  document.getElementById("mAdminExportExcel")?.addEventListener("click", ()=> exportExcel(getFilteredTxList(true)));
  document.getElementById("mAdminExportPdf")?.addEventListener("click", ()=> exportPdf(getFilteredTxList(true)));
  document.getElementById("viewGuestBtnM")?.addEventListener("click", ()=> goto("/"));
  const doLogout = ()=>{
    localStorage.removeItem(LS_KEYS.auth);
    toast("Berhasil keluar");
    goto("/");
  };
  document.getElementById("logoutBtn").addEventListener("click", doLogout);
  document.getElementById("logoutBtnM")?.addEventListener("click", doLogout);
  document.querySelectorAll("[data-sec]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ state.adminSection = btn.dataset.sec; state.filterText=""; state.filterAdmin=""; state.filterMonth=""; refreshAdminContent(); syncNavActive(); });
  });
  document.getElementById("modalOverlay").addEventListener("click", e=>{ if(e.target.id==="modalOverlay") closeModal(); });
  refreshAdminContent();
}

function syncNavActive(){
  document.querySelectorAll("[data-sec]").forEach(b=>b.classList.toggle("active", b.dataset.sec===state.adminSection));
}

function bindAdminContentEvents(){
  // dashboard quick add
  document.getElementById("quickAddBtn")?.addEventListener("click", ()=>{ openModal(txFormModal(null)); bindTxForm(null); });
  document.getElementById("goPengajuanAlertBtn")?.addEventListener("click", ()=>{ state.adminSection="pengajuan"; refreshAdminContent(); syncNavActive(); });
  document.getElementById("goAnggotaBtn")?.addEventListener("click", ()=>{ state.adminSection="anggota"; refreshAdminContent(); syncNavActive(); });
  document.getElementById("addTxBtn")?.addEventListener("click", ()=>{ openModal(txFormModal(null)); bindTxForm(null); });
  document.getElementById("addMemberBtn")?.addEventListener("click", ()=>{ openModal(memberFormModal(null)); bindMemberForm(null); });

  // pengajuan pembelian: ACC / Tolak
  document.querySelectorAll("[data-acc]").forEach(b=>{
    b.addEventListener("click", ()=>{
      if(confirm("Setujui pengajuan ini? Nominal akan otomatis tercatat sebagai kas keluar.")){
        approveRequest(b.dataset.acc);
        refreshAdminContent();
      }
    });
  });
  document.querySelectorAll("[data-tolak]").forEach(b=>{
    b.addEventListener("click", ()=>{
      rejectRequest(b.dataset.tolak);
      refreshAdminContent();
    });
  });

  // filters (transaksi section)
  document.getElementById("aText")?.addEventListener("input", e=>{ state.filterText=e.target.value; refreshAdminContent(); });
  document.getElementById("aAdmin")?.addEventListener("change", e=>{ state.filterAdmin=e.target.value; refreshAdminContent(); });
  document.getElementById("aMonth")?.addEventListener("change", e=>{ state.filterMonth=e.target.value; refreshAdminContent(); });
  document.querySelectorAll("#aTypeFilter .sheet-tab").forEach(btn=>{
    btn.addEventListener("click", ()=>{ state.adminTxFilter = btn.dataset.type; refreshAdminContent(); });
  });
  document.querySelectorAll("#aRowsFilter [data-rows]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ state.viewRows = btn.dataset.rows==="all" ? "all" : Number(btn.dataset.rows); refreshAdminContent(); });
  });
  document.getElementById("aExportExcel")?.addEventListener("click", ()=> exportExcel(getFilteredTxList(true)));
  document.getElementById("aExportPdf")?.addEventListener("click", ()=> exportPdf(getFilteredTxList(true)));
  scrollExcelTablesToLatest();

  // edit / delete transaksi
  document.querySelectorAll("[data-edit]").forEach(b=>{
    b.addEventListener("click", ()=>{
      const tx = DB.tx.find(t=>t.id===b.dataset.edit);
      openModal(txFormModal(tx)); bindTxForm(tx);
    });
  });
  document.querySelectorAll("[data-del]").forEach(b=>{
    b.addEventListener("click", ()=>{
      if(confirm("Hapus transaksi ini?")){
        DB.tx = DB.tx.filter(t=>t.id!==b.dataset.del);
        saveTx(DB.tx);
        toast("Transaksi dihapus");
        refreshAdminContent();
      }
    });
  });

  // anggota
  document.querySelectorAll("[data-edit-member]").forEach(b=>{
    b.addEventListener("click", ()=>{
      const m = memberById(b.dataset.editMember);
      openModal(memberFormModal(m)); bindMemberForm(m);
    });
  });
  document.querySelectorAll("[data-toggle-status]").forEach(b=>{
    b.addEventListener("click", ()=>{
      const m = memberById(b.dataset.toggleStatus);
      if(m.status==="active"){
        if(confirm(`Nonaktifkan ${m.nama}? Histori transaksi tetap tersimpan.`)){
          m.status = "off"; m.offSejak = new Date().toISOString().slice(0,10);
          saveMembers(DB.members); toast(`${m.nama} dinonaktifkan`); refreshAdminContent();
        }
      } else {
        m.status = "active"; delete m.offSejak;
        saveMembers(DB.members); toast(`${m.nama} diaktifkan kembali`); refreshAdminContent();
      }
    });
  });
}

function bindTxForm(existing){
  const close = ()=>closeModal();
  document.getElementById("modalClose").addEventListener("click", close);
  document.getElementById("modalClose2").addEventListener("click", close);
  document.getElementById("txSave").addEventListener("click", ()=>{
    const tgl = document.getElementById("txTgl").value;
    const admin = document.getElementById("txAdmin").value;
    const shift = document.getElementById("txShift").value;
    const jenis = document.getElementById("txJenis").value;
    const jumlah = Number(document.getElementById("txJumlah").value)||0;
    const ket = document.getElementById("txKet").value.trim();
    if(!tgl){ toast("Tanggal wajib diisi","err"); return; }
    if(jumlah<=0){ toast("Jumlah harus lebih dari 0","err"); return; }
    const btb = jenis==="masuk" ? jumlah : 0;
    const bkb = jenis==="keluar" ? jumlah : 0;
    const kat = jenis==="keluar" ? "pinjaman" : "kas";
    if(existing){
      Object.assign(existing, {tgl,admin,shift,btb,bkb,ket,kat});
      toast("Transaksi diperbarui");
    } else {
      DB.tx.push({ id: uid("tx"), tgl, admin, shift, btb, bkb, ket, kat });
      toast("Transaksi ditambahkan");
    }
    saveTx(DB.tx);
    closeModal();
    refreshAdminContent();
  });
}

function bindMemberForm(existing){
  let selectedColor = existing?.color || COLOR_CHOICES[0];
  const close = ()=>closeModal();
  document.getElementById("modalClose").addEventListener("click", close);
  document.getElementById("modalClose2").addEventListener("click", close);
  document.querySelectorAll("#colorPicker .color-swatch").forEach(sw=>{
    sw.addEventListener("click", ()=>{
      selectedColor = sw.dataset.color;
      document.querySelectorAll("#colorPicker .color-swatch").forEach(s=>s.classList.remove("selected"));
      sw.classList.add("selected");
    });
  });
  document.getElementById("memberSave").addEventListener("click", ()=>{
    const nama = document.getElementById("mNama").value.trim();
    if(!nama){ toast("Nama wajib diisi","err"); return; }
    if(existing){
      existing.nama = nama; existing.color = selectedColor;
      toast("Anggota diperbarui");
    } else {
      const id = nama.toUpperCase().replace(/\s+/g,"_");
      if(DB.members.some(m=>m.id===id)){ toast("Anggota dengan nama itu sudah ada","err"); return; }
      DB.members.push({ id, nama, color:selectedColor, status:"active", sejak:new Date().toISOString().slice(0,10) });
      toast("Anggota ditambahkan");
    }
    saveMembers(DB.members);
    closeModal();
    refreshAdminContent();
  });
}

/* ============================================================
   GAME CENTER — Catur (bebas), Ular Tangga, Monopoly (ringkas)
============================================================ */
const GAME_COLORS = ["#B34632","#2C5A88","#3D7A5D","#F0A93A"];

function showGameOverlay(){ document.getElementById("gameModalOverlay")?.classList.add("open"); }
function closeGameModal(){ document.getElementById("gameModalOverlay")?.classList.remove("open"); }
function bindGameClose(){ document.getElementById("gameCloseBtn")?.addEventListener("click", closeGameModal); }
document.getElementById("gameModalOverlay")?.addEventListener("click", (e)=>{
  if(e.target.id==="gameModalOverlay") closeGameModal();
});
document.addEventListener("keydown", (e)=>{ if(e.key==="Escape") closeGameModal(); });

function openGameCenter(type){
  if(type==="catur") openChess();
  else if(type==="ular") openLadder();
  else if(type==="monopoli") openMonopoly();
}

/* ---- dadu (dipakai Ular Tangga & Monopoly) ---- */
const DICE_PATTERNS = { 1:[4], 2:[0,8], 3:[0,4,8], 4:[0,2,6,8], 5:[0,2,4,6,8], 6:[0,2,3,5,6,8] };
function diceDots(n){
  const on = new Set(DICE_PATTERNS[n]||[4]);
  let html = "";
  for(let i=0;i<9;i++) html += `<i class="${on.has(i)?'on':''}"></i>`;
  return html;
}

/* ---- setup pemain (dipakai Ular Tangga & Monopoly) ---- */
function playerSetupRowHtml(i){
  return `<div class="player-setup-row"><span class="player-dot" style="background:${GAME_COLORS[i]}"></span><input type="text" placeholder="Nama pemain ${i+1}" maxlength="14"></div>`;
}
function renderPlayerSetup({title, emoji, sub, onStart}){
  document.getElementById("gameModalBody").innerHTML = `
    <div class="game-head"><h3>${emoji} ${title}</h3><button class="icon-btn" id="gameCloseBtn">${icon('close')}</button></div>
    <div class="game-sub">${sub}</div>
    <div id="playerSetupRows">${[0,1].map(i=>playerSetupRowHtml(i)).join("")}</div>
    <button class="btn btn-sm" id="addPlayerBtn" style="margin-bottom:14px;">${icon('plus')}<span>Tambah Pemain</span></button>
    <button class="btn btn-primary" id="startGameBtn" style="width:100%;justify-content:center;">${icon('check')}<span>Mulai Main</span></button>
  `;
  bindGameClose();
  const rows = ()=>document.getElementById("playerSetupRows");
  document.getElementById("addPlayerBtn").addEventListener("click", ()=>{
    if(rows().children.length>=4) return;
    rows().insertAdjacentHTML("beforeend", playerSetupRowHtml(rows().children.length));
    if(rows().children.length>=4) document.getElementById("addPlayerBtn").classList.add("hidden");
  });
  document.getElementById("startGameBtn").addEventListener("click", ()=>{
    const names = [...rows().querySelectorAll("input")].map((inp,i)=> inp.value.trim() || `Pemain ${i+1}`);
    onStart(names.map((n,i)=>({ name:n, color:GAME_COLORS[i] })));
  });
}

/* ---------------- CATUR (mode bebas, tanpa validasi aturan) ---------------- */
let chessBoard=null, chessSel=null, chessTurn='w';
const CHESS_UNICODE = { w:{K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙'}, b:{K:'♚',Q:'♛',R:'♜',B:'♝',N:'♞',P:'♟'} };
function initChessBoard(){
  const back = ['R','N','B','Q','K','B','N','R'];
  const b = Array.from({length:8},()=>Array(8).fill(null));
  for(let c=0;c<8;c++){
    b[0][c] = {t:back[c], color:'b'};
    b[1][c] = {t:'P', color:'b'};
    b[6][c] = {t:'P', color:'w'};
    b[7][c] = {t:back[c], color:'w'};
  }
  return b;
}
function openChess(){
  chessBoard = initChessBoard(); chessSel = null; chessTurn = 'w';
  showGameOverlay();
  renderChessModal();
}
function renderChessModal(){
  document.getElementById("gameModalBody").innerHTML = `
    <div class="game-head"><h3>♟️ Catur</h3><button class="icon-btn" id="gameCloseBtn">${icon('close')}</button></div>
    <div class="game-sub">Mode bebas — pilih bidak lalu ketuk kotak tujuan. Cocok untuk main santai berdua di satu perangkat.</div>
    <div class="game-toolbar">
      <span class="game-turn-badge"><span class="game-turn-dot" style="background:${chessTurn==='w'?'#f4f4f4':'#222'};border:1px solid var(--border);"></span>Giliran: ${chessTurn==='w'?'Putih':'Hitam'}</span>
      <button class="btn btn-sm" id="chessResetBtn">${icon('history')}<span>Ulang</span></button>
    </div>
    <div class="chess-board" id="chessBoardEl"></div>
  `;
  bindGameClose();
  const boardEl = document.getElementById("chessBoardEl");
  boardEl.innerHTML = chessBoard.map((row,r)=>row.map((cell,c)=>{
    const light = (r+c)%2===0;
    const isSel = chessSel && chessSel.r===r && chessSel.c===c;
    const piece = cell ? CHESS_UNICODE[cell.color][cell.t] : "";
    return `<div class="chess-cell ${light?'light':'dark'} ${isSel?'sel':''}" data-r="${r}" data-c="${c}">${piece}</div>`;
  }).join("")).join("");
  boardEl.querySelectorAll(".chess-cell").forEach(cellEl=>{
    cellEl.addEventListener("click", ()=>{
      const r = +cellEl.dataset.r, c = +cellEl.dataset.c;
      const cell = chessBoard[r][c];
      if(chessSel){
        const from = chessBoard[chessSel.r][chessSel.c];
        if(from && !(chessSel.r===r && chessSel.c===c)){
          chessBoard[r][c] = from;
          chessBoard[chessSel.r][chessSel.c] = null;
          chessTurn = chessTurn==='w' ? 'b' : 'w';
        }
        chessSel = null;
      } else if(cell){
        chessSel = {r,c};
      }
      renderChessModal();
    });
  });
  document.getElementById("chessResetBtn").addEventListener("click", openChess);
}

/* ---------------- ULAR TANGGA ---------------- */
let ladderPlayers=null, ladderTurnIdx=0, ladderWinner=null, ladderLastRoll=1;
const LADDER_LADDERS = {4:14,9:31,20:38,28:84,40:59,51:67,63:81,71:91};
const LADDER_SNAKES  = {17:7,54:34,62:19,64:60,87:24,93:73,95:75,99:78};
function openLadder(){
  showGameOverlay();
  renderPlayerSetup({
    title:"Ular Tangga", emoji:"🐍",
    sub:"Atur nama pemain (2–4 orang), lalu lempar dadu bergantian sampai ada yang tiba di kotak 100.",
    onStart:(players)=>{
      ladderPlayers = players.map(p=>({...p,pos:1}));
      ladderTurnIdx = 0; ladderWinner = null; ladderLastRoll = 1;
      renderLadderBoard();
    }
  });
}
function ladderCellNumber(r,c){
  const boardRow = 10-r;
  const ltr = boardRow % 2 === 1;
  return ltr ? (boardRow-1)*10 + c + 1 : (boardRow-1)*10 + (10-c);
}
function renderLadderBoard(){
  let cells = "";
  for(let r=0;r<10;r++){
    for(let c=0;c<10;c++){
      const num = ladderCellNumber(r,c);
      let cls = "", tag = "";
      if(LADDER_LADDERS[num]){ cls="ladder"; tag=`↑${LADDER_LADDERS[num]}`; }
      if(LADDER_SNAKES[num]){ cls="snake"; tag=`↓${LADDER_SNAKES[num]}`; }
      const tokens = ladderPlayers.filter(p=>p.pos===num).map(p=>`<span class="game-token" style="background:${p.color}"></span>`).join("");
      cells += `<div class="ladder-cell ${cls}"><span>${num}</span>${tag?`<span class="lc-tag">${tag}</span>`:""}<span class="ladder-tokens">${tokens}</span></div>`;
    }
  }
  const current = ladderPlayers[ladderTurnIdx];
  document.getElementById("gameModalBody").innerHTML = `
    <div class="game-head"><h3>🐍 Ular Tangga</h3><button class="icon-btn" id="gameCloseBtn">${icon('close')}</button></div>
    <div class="game-toolbar">
      ${ladderWinner
        ? `<span class="game-turn-badge"><span class="game-turn-dot" style="background:${ladderWinner.color}"></span>${ladderWinner.name} menang! 🎉</span>`
        : `<span class="game-turn-badge"><span class="game-turn-dot" style="background:${current.color}"></span>Giliran: ${current.name}</span>`}
      <button class="btn btn-sm" id="ladderResetBtn">${icon('history')}<span>Main Ulang</span></button>
    </div>
    <div class="ladder-board" id="ladderBoardEl">${cells}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-top:14px;">
      <div class="dice-face" id="ladderDiceFace">${diceDots(ladderLastRoll)}</div>
      <button class="btn btn-primary" id="ladderRollBtn" ${ladderWinner?'disabled':''} style="flex:1;justify-content:center;">${icon('dice')}<span>Lempar Dadu</span></button>
    </div>
    <div class="game-legend">
      <span>🪜 Tangga = naik</span>
      <span>🐍 Ular = turun</span>
    </div>
  `;
  bindGameClose();
  document.getElementById("ladderResetBtn").addEventListener("click", openLadder);
  document.getElementById("ladderRollBtn")?.addEventListener("click", rollLadderDice);
}
function rollLadderDice(){
  const btn = document.getElementById("ladderRollBtn");
  const face = document.getElementById("ladderDiceFace");
  btn.disabled = true;
  face.classList.add("rolling");
  let ticks = 0;
  const spin = setInterval(()=>{
    face.innerHTML = diceDots(1+Math.floor(Math.random()*6));
    ticks++;
    if(ticks>6){
      clearInterval(spin);
      const roll = 1+Math.floor(Math.random()*6);
      ladderLastRoll = roll;
      applyLadderMove(roll);
    }
  }, 90);
}
function applyLadderMove(roll){
  const p = ladderPlayers[ladderTurnIdx];
  let next = p.pos + roll;
  if(next > 100) next = p.pos;
  else {
    if(LADDER_LADDERS[next]) next = LADDER_LADDERS[next];
    else if(LADDER_SNAKES[next]) next = LADDER_SNAKES[next];
  }
  p.pos = next;
  if(p.pos >= 100){ p.pos = 100; ladderWinner = p; }
  else { ladderTurnIdx = (ladderTurnIdx+1) % ladderPlayers.length; }
  renderLadderBoard();
}

/* ---------------- MONOPOLY (versi ringkas: papan + dadu, tanpa uang) ---------------- */
let monoPlayers=null, monoTurnIdx=0, monoLastRoll=1, monoLanded=null;
const MONO_NAMES = [
  "MULAI","Jl. Melati","Kotak Dana Umum","Jl. Mawar","Pajak Penghasilan","Stasiun Gambir","Jl. Kenanga","PARKIR BEBAS",
  "Jl. Anggrek","Kesempatan","Jl. Tulip","Jl. Kamboja","Stasiun Senen","Jl. Cempaka","MASUK PENJARA",
  "Jl. Dahlia","Kotak Dana Umum","Jl. Flamboyan","Jl. Teratai","Stasiun Kota","Jl. Sakura","PENJARA / KUNJUNGAN",
  "Jl. Lily","Kesempatan","Jl. Bougenville","Pajak Mewah","Jl. Aster","Jl. Edelweiss"
];
function openMonopoly(){
  showGameOverlay();
  renderPlayerSetup({
    title:"Monopoly", emoji:"🎲",
    sub:"Versi ringkas: jalan keliling papan, lempar dadu bergantian, lihat properti yang disinggahi.",
    onStart:(players)=>{
      monoPlayers = players.map(p=>({...p,pos:0}));
      monoTurnIdx = 0; monoLastRoll = 1; monoLanded = null;
      renderMonoBoard();
    }
  });
}
function monoCellPos(i){
  if(i<=7) return {row:8, col:i+1};
  if(i<=14) return {row:8-(i-7), col:8};
  if(i<=21) return {row:1, col:8-(i-14)};
  return {row:(i-22)+2, col:1};
}
function renderMonoBoard(){
  let cellsHtml = "";
  for(let i=0;i<28;i++){
    const {row,col} = monoCellPos(i);
    const isCorner = [0,7,14,21].includes(i);
    const tokens = monoPlayers.filter(p=>p.pos===i).map(p=>`<span class="game-token" style="background:${p.color}"></span>`).join("");
    cellsHtml += `<div class="mono-cell ${isCorner?'corner':''}" style="grid-row:${row};grid-column:${col};"><span>${MONO_NAMES[i]}</span><span class="ladder-tokens" style="position:absolute;bottom:1px;left:1px;">${tokens}</span></div>`;
  }
  const current = monoPlayers[monoTurnIdx];
  document.getElementById("gameModalBody").innerHTML = `
    <div class="game-head"><h3>🎲 Monopoly</h3><button class="icon-btn" id="gameCloseBtn">${icon('close')}</button></div>
    <div class="game-toolbar">
      <span class="game-turn-badge"><span class="game-turn-dot" style="background:${current.color}"></span>Giliran: ${current.name}</span>
      <button class="btn btn-sm" id="monoResetBtn">${icon('history')}<span>Main Ulang</span></button>
    </div>
    <div class="mono-board" id="monoBoardEl">
      ${cellsHtml}
      <div class="mono-center">
        <b>MONOPOLY</b>
        <div class="dice-face" id="monoDiceFace">${diceDots(monoLastRoll)}</div>
        <button class="btn btn-primary btn-sm" id="monoRollBtn">${icon('dice')}<span>Lempar Dadu</span></button>
        ${monoLanded?`<div style="font-size:11.5px;text-align:center;color:var(--ink-soft);max-width:150px;">${monoLanded}</div>`:""}
      </div>
    </div>
  `;
  bindGameClose();
  document.getElementById("monoResetBtn").addEventListener("click", openMonopoly);
  document.getElementById("monoRollBtn").addEventListener("click", rollMonoDice);
}
function rollMonoDice(){
  const btn = document.getElementById("monoRollBtn");
  const face = document.getElementById("monoDiceFace");
  btn.disabled = true;
  face.classList.add("rolling");
  let ticks = 0;
  const spin = setInterval(()=>{
    face.innerHTML = diceDots(1+Math.floor(Math.random()*6));
    ticks++;
    if(ticks>6){
      clearInterval(spin);
      const roll = 1+Math.floor(Math.random()*6);
      monoLastRoll = roll;
      const p = monoPlayers[monoTurnIdx];
      p.pos = (p.pos + roll) % 28;
      monoLanded = `${p.name} mendarat di "${MONO_NAMES[p.pos]}"`;
      monoTurnIdx = (monoTurnIdx+1) % monoPlayers.length;
      renderMonoBoard();
    }
  }, 90);
}

/* ============================================================
   INIT
============================================================ */
applyTheme();
render();

let _resizeTimer = null;
let _lastWidth = window.innerWidth;
window.addEventListener("resize", ()=>{
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(()=>{
    const w = window.innerWidth;
    // Di HP, membuka papan ketik virtual memicu event "resize" karena tinggi
    // viewport mengecil — TANPA perubahan lebar. Re-render penuh saat itu akan
    // menghancurkan elemen <input>/<textarea> yang sedang fokus dan otomatis
    // menutup papan ketik. Maka re-render hanya dijalankan jika LEBAR berubah.
    if(w === _lastWidth) return;
    _lastWidth = w;
    const active = document.activeElement;
    const isEditing = active && ["INPUT","TEXTAREA","SELECT"].includes(active.tagName);
    if(isEditing) return; // jangan ganggu saat user sedang mengetik
    render();
  }, 200);
});

/* ============================================================
   FIREBASE CONFIG & DATA LAYER — JHT KAS Adm PRG
   Menggantikan localStorage sebagai sumber data agar semua
   orang (tamu & admin), di HP/browser manapun, melihat data
   yang sama secara real-time.

   Cara pakai: file ini di-load SEBELUM script.js (lihat index.html).
   Semua fungsi diekspos lewat window.FJHT.
============================================================ */

// Konfigurasi proyek Firebase (dari Firebase Console punya kamu)
const firebaseConfig = {
  apiKey: "AIzaSyCV04Nk2tG-Inmn1Fj8ricgw3Kzc3pgFyo",
  authDomain: "kasjht.firebaseapp.com",
  projectId: "kasjht",
  storageBucket: "kasjht.firebasestorage.app",
  messagingSenderId: "343785979339",
  appId: "1:343785979339:web:aa26685e9831f3c0e9ca4e"
};

firebase.initializeApp(firebaseConfig);
const _db = firebase.firestore();
const _auth = firebase.auth();

// Aktifkan cache offline (opsional tapi enak: app tetap kebaca meski koneksi putus2)
_db.enablePersistence({ synchronizeTabs: true }).catch(()=>{ /* aman diabaikan, mis. banyak tab / browser lama */ });

/* ------------------------------------------------------------
   LAPISAN OFFLINE-FIRST
   - Setiap data yang sukses dimuat disalin ke "snapshot" lokal.
   - Kalau saat boot internet putus / lambat / cache Firestore kosong,
     app memakai snapshot itu (bukan layar "Gagal terhubung").
   - Begitu internet kembali, listener real-time Firestore otomatis
     menimpa snapshot dengan data terbaru dan layar ikut diperbarui.
   - Perubahan yang dibuat saat offline diantre Firestore (IndexedDB)
     dan dikirim otomatis begitu tersambung; statusnya dikabarkan lewat
     event window "kas-sync" (dipakai pwa.js untuk menampilkan pill).
------------------------------------------------------------ */
const SNAP_KEY = "kasjht:snapshot:v1";
const SYNC_KEY = "kasjht:lastsync";
const LOAD_TIMEOUT_ONLINE_MS = 7000;
const LOAD_TIMEOUT_OFFLINE_MS = 2500;

function _readSnap(){
  try{
    const s = JSON.parse(localStorage.getItem(SNAP_KEY) || "null");
    if(s && s.data && s.data.members && s.data.tx && s.data.requests && s.data.arisan) return s;
  }catch(e){}
  return null;
}
function _writeSnap(data){
  try{ localStorage.setItem(SNAP_KEY, JSON.stringify({ t: Date.now(), data })); }catch(e){ /* kuota penuh / mode privat: abaikan */ }
}
let _lastSyncWrite = 0;
function _markSynced(){
  const now = Date.now();
  FJHT.lastSync = now;
  if(now - _lastSyncWrite > 30000){
    _lastSyncWrite = now;
    try{ localStorage.setItem(SYNC_KEY, String(now)); }catch(e){}
  }
}
function _withTimeout(p, ms){
  return new Promise((resolve, reject)=>{
    const t = setTimeout(()=>reject(new Error("timeout")), ms);
    p.then(v=>{ clearTimeout(t); resolve(v); }, e=>{ clearTimeout(t); reject(e); });
  });
}
function _emit(name, detail){
  try{ window.dispatchEvent(new CustomEvent(name, { detail })); }catch(e){}
}

/* ------------------------------------------------------------
   MODEL PENYIMPANAN
   Karena app ini selalu menulis ULANG seluruh array (members/tx/
   requests) setiap kali ada perubahan (bukan per-baris), data
   disimpan sebagai SATU dokumen per koleksi di:
     kas/members   -> { list: [...] }
     kas/transaksi -> { list: [...] }
     kas/requests  -> { list: [...] }
   Ini paling cocok dengan struktur kode yang sudah ada dan
   paling murah (1 read/write per sinkronisasi, bukan N).
------------------------------------------------------------ */
const DOC_MEMBERS  = _db.collection("kas").doc("members");
const DOC_TX        = _db.collection("kas").doc("transaksi");
const DOC_REQUESTS  = _db.collection("kas").doc("requests");
const DOC_ARISAN    = _db.collection("kas").doc("arisan");

function _adminEmail(username){
  // Username "admin" pada form login dipetakan ke email Firebase Auth ini.
  // Login utama saat ini: benyoriki@gmail.com (buat user ini di Firebase
  // Console -> Authentication -> Add user, dengan password yang sama).
  const MAP = { admin: "benyoriki@gmail.com" };
  if (MAP[username]) return MAP[username];
  return username.includes("@") ? username : null;
}

const FJHT = {
  auth: _auth,

  /** Ambil data awal (sekali saja, untuk boot pertama kali). */
  async loadAll(){
    const [mSnap, tSnap, rSnap, arSnap] = await Promise.all([
      DOC_MEMBERS.get(), DOC_TX.get(), DOC_REQUESTS.get(), DOC_ARISAN.get()
    ]);
    return {
      members: mSnap.exists ? (mSnap.data().list || null) : null,
      tx: tSnap.exists ? (tSnap.data().list || null) : null,
      requests: rSnap.exists ? (rSnap.data().list || null) : null,
      arisan: arSnap.exists ? (arSnap.data().list || null) : null,
    };
  },

  /** Isi Firestore dengan data awal HANYA jika koleksi masih kosong. */
  async migrateSeedIfEmpty(seedMembers, seedTx, seedRequests, seedArisan){
    const current = await this.loadAll();
    const tasks = [];
    if(!current.members) tasks.push(DOC_MEMBERS.set({ list: seedMembers }));
    if(!current.tx) tasks.push(DOC_TX.set({ list: seedTx }));
    if(!current.requests) tasks.push(DOC_REQUESTS.set({ list: seedRequests }));
    if(!current.arisan) tasks.push(DOC_ARISAN.set({ list: seedArisan || [] }));
    if(tasks.length) await Promise.all(tasks);
    return {
      members: current.members || seedMembers,
      tx: current.tx || seedTx,
      requests: current.requests || seedRequests,
      arisan: current.arisan || (seedArisan || []),
    };
  },

  saveMembers(list){ return DOC_MEMBERS.set({ list }); },
  saveTx(list){ return DOC_TX.set({ list }); },
  saveRequests(list){ return DOC_REQUESTS.set({ list }); },
  saveArisan(list){ return DOC_ARISAN.set({ list }); },

  /** Dengarkan perubahan real-time (dari perangkat lain) dan panggil onChange({members,tx,requests,arisan}).
   *  Juga menyimpan snapshot lokal & mencatat waktu sinkron terakhir dengan server. */
  subscribe(onChange){
    const cache = { members: null, tx: null, requests: null, arisan: null };
    const lastJson = {};
    const fire = ()=>{
      if(cache.members && cache.tx && cache.requests && cache.arisan){
        _writeSnap(cache);
        onChange({ ...cache });
      }
    };
    const listen = (docRef, key)=>{
      docRef.onSnapshot({ includeMetadataChanges: true }, s=>{
        if(!s.metadata.fromCache) _markSynced();
        if(!s.exists) return;
        const list = s.data().list || [];
        const j = JSON.stringify(list);
        if(lastJson[key] === j) return;          // cuma metadata berubah, data sama: jangan render ulang
        lastJson[key] = j;
        cache[key] = list;
        fire();
      }, ()=>{ /* error listener (mis. izin): app tetap jalan dari data yang ada */ });
    };
    listen(DOC_MEMBERS, "members");
    listen(DOC_TX, "tx");
    listen(DOC_REQUESTS, "requests");
    listen(DOC_ARISAN, "arisan");
  },

  /** Promise yang selesai saat semua perubahan lokal sudah diterima server. */
  flushed(){ return _db.waitForPendingWrites(); },
  lastSync: null,
  usingSnapshot: false,

  /** Login admin: username "admin" dipetakan ke email Firebase Auth. */
  async signInAdmin(username, password){
    const email = _adminEmail(username.trim());
    if(!email) throw new Error("Username tidak dikenali");
    await _auth.signInWithEmailAndPassword(email, password);
  },
  signOutAdmin(){ return _auth.signOut(); },
  isAdmin(){ return !!_auth.currentUser; },
  /** Tunggu Firebase Auth selesai memuat status login (penting saat refresh halaman). */
  waitForAuthReady(){
    return new Promise(resolve=>{
      const unsub = _auth.onAuthStateChanged(user=>{ unsub(); resolve(user); });
    });
  },
};

/* --- loadAll: tahan banting terhadap offline / koneksi lambat --- */
const _origLoadAll = FJHT.loadAll.bind(FJHT);
FJHT.loadAll = async function(){
  try{
    const ms = (navigator.onLine === false) ? LOAD_TIMEOUT_OFFLINE_MS : LOAD_TIMEOUT_ONLINE_MS;
    const d = await _withTimeout(_origLoadAll(), ms);
    if(d.members && d.tx && d.requests && d.arisan){ _writeSnap(d); FJHT.usingSnapshot = false; }
    return d;
  }catch(err){
    const snap = _readSnap();
    if(snap){
      FJHT.usingSnapshot = true;
      FJHT.lastSync = parseInt(localStorage.getItem(SYNC_KEY) || "0", 10) || snap.t;
      _emit("kas-offline-data", { t: snap.t });
      return snap.data;
    }
    throw err;
  }
};

/* --- lacak penulisan yang belum diterima server (untuk pill "menyinkronkan…") --- */
let _pending = 0;
function _track(p){
  _pending++; _emit("kas-sync", { pending: _pending });
  const done = ()=>{ _pending = Math.max(0, _pending - 1); _emit("kas-sync", { pending: _pending }); };
  p.then(done, done);
  return p;
}
["saveMembers","saveTx","saveRequests","saveArisan"].forEach(k=>{
  const orig = FJHT[k].bind(FJHT);
  FJHT[k] = function(list){ return _track(orig(list)); };
});

window.FJHT = FJHT;

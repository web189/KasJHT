/* ============================================================
   Arisan Tanteh Susi — lapisan data Firebase (MANDIRI)
   Situs ini TIDAK memuat kode / data JHT KAS sama sekali — cuma
   nyambung ke satu dokumen yang sama-sama dipakai: kas/arisan.
   Pakai Firebase Modular SDK (bukan compat) supaya jauh lebih
   ringan: cuma app+firestore+auth yang benar-benar dipakai yang
   di-download browser.
============================================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc, onSnapshot, enableIndexedDbPersistence,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Proyek Firebase yang SAMA dengan JHT KAS (satu sumber data, dua situs
// terpisah). Kalau kamu memindahkan proyek Firebase, cukup ganti di sini —
// tidak menyentuh kode JHT KAS sama sekali, dan sebaliknya.
const firebaseConfig = {
  apiKey: "AIzaSyCV04Nk2tG-Inmn1Fj8ricgw3Kzc3pgFyo",
  authDomain: "kasjht.firebaseapp.com",
  projectId: "kasjht",
  storageBucket: "kasjht.firebasestorage.app",
  messagingSenderId: "343785979339",
  appId: "1:343785979339:web:aa26685e9831f3c0e9ca4e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
enableIndexedDbPersistence(db).catch(() => {/* aman diabaikan (banyak tab / browser lama) */});

const ARISAN_DOC = doc(db, "kas", "arisan");

// Username "admin" pada form login dipetakan ke email Firebase Auth ini —
// akun yang sama dipakai admin JHT KAS, supaya satu login berlaku di kedua
// dashboard.
function adminEmail(username) {
  const MAP = { admin: "benyoriki@gmail.com" };
  const u = username.trim();
  if (MAP[u]) return MAP[u];
  return u.includes("@") ? u : null;
}

export const Arisan = {
  auth,

  /** Ambil daftar batch sekali saja (dipakai kalau onSnapshot belum sempat jalan). */
  async getList() {
    const snap = await getDoc(ARISAN_DOC);
    return snap.exists() ? (snap.data().list || []) : [];
  },

  /** Simpan seluruh daftar batch (pola tulis-ulang-semua, sama seperti situs JHT KAS). */
  saveList(list) {
    return setDoc(ARISAN_DOC, { list });
  },

  /** Langganan real-time — semua tab (tamu & admin, HP & PC) otomatis lihat data yang sama. */
  subscribe(onChange, onError) {
    return onSnapshot(
      ARISAN_DOC,
      (snap) => onChange(snap.exists() ? (snap.data().list || []) : []),
      (err) => onError && onError(err)
    );
  },

  async signIn(username, password) {
    const email = adminEmail(username);
    if (!email) throw new Error("Username tidak dikenali");
    await signInWithEmailAndPassword(auth, email, password);
  },
  signOutAdmin() { return signOut(auth); },
  isAdmin() { return !!auth.currentUser; },
  waitForAuthReady() {
    return new Promise((resolve) => {
      const unsub = onAuthStateChanged(auth, (user) => { unsub(); resolve(user); });
    });
  },
  onAuthChange(cb) { return onAuthStateChanged(auth, cb); },
};

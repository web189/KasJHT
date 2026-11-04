/* ============================================================
   pwa.js — mendaftarkan service worker + tombol "Pasang Aplikasi"
   (mirip WhatsApp Web: bisa dipasang jadi aplikasi di komputer).
   Dipasang lewat:  <script src="pwa.js" data-app-name="..." data-accent="#..." defer></script>
   ============================================================ */
(function () {
  'use strict';

  var tag = document.querySelector('script[src*="pwa.js"]');
  var APP_NAME = (tag && tag.getAttribute('data-app-name')) || document.title || 'Aplikasi';
  var ACCENT = (tag && tag.getAttribute('data-accent')) || '#2f7dff';
  var KEY = 'pwaInstallDismissed:' + location.pathname;
  var SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;

  /* ---- 1. Offline + pembaruan otomatis + status sinkron ----
     Alur:
     - Dibuka sekali saat online -> seluruh aplikasi (+ data terakhir) tersimpan, bisa dibuka offline.
     - Saat tersambung kembali / tab dibuka lagi / tiap 15 menit, service worker membandingkan
       isi file dengan versi tersimpan. Ada yang berubah -> aplikasi memuat ulang dirinya sendiri
       (ditunda dulu bila pengguna sedang mengetik / membuka dialog supaya isian tidak hilang).
     - Perubahan data yang dibuat saat offline diantre Firestore & dikirim otomatis begitu online;
       statusnya tampil sebagai pill di atas layar.
     Tidak perlu lagi mengubah version.json untuk merilis update (tetap boleh, untuk memaksa). */
  var VER_KEY = 'kasjht:ver', RELOAD_AT_KEY = 'kasjht:reloadAt', READY_KEY = 'kasjht:offlineReady', SYNC_KEY = 'kasjht:lastsync';
  var swReg = null, lastCheck = 0, updateReady = false, pendingWrites = 0;
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function sstore(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function sload(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }

  function injectNetCss() {
    if (document.getElementById('pwaNetCss')) return;
    var st = document.createElement('style'); st.id = 'pwaNetCss';
    st.textContent =
      '.pwa-pill{position:fixed;left:50%;top:calc(10px + env(safe-area-inset-top,0px));z-index:2147483000;max-width:calc(100vw - 24px);' +
      'display:flex;align-items:center;gap:10px;padding:9px 16px;border-radius:999px;font:600 13px/1.3 "Figtree","Segoe UI",Arial,sans-serif;' +
      'color:#F8F0E8;background:#291A1F;border:1px solid #3B262C;box-shadow:0 14px 30px -12px rgba(0,0,0,.8);' +
      '-webkit-transform:translateX(-50%);transform:translateX(-50%)}' +
      '.pwa-pill i{width:9px;height:9px;border-radius:50%;background:#F2B84B;flex:none}' +
      '.pwa-pill.on i{background:#5BD9A4}.pwa-pill.off i{background:#FF8070}' +
      '.pwa-pill.busy i{animation:pwaPulse 1s ease-in-out infinite}' +
      '@keyframes pwaPulse{0%,100%{opacity:1}50%{opacity:.25}}' +
      '.pwa-pill button{border:0;border-radius:999px;padding:6px 13px;font:700 12.5px "Figtree","Segoe UI",Arial,sans-serif;cursor:pointer;background:#F2B84B;color:#2B1700}';
    document.head.appendChild(st);
  }
  var pill = null, pillTimer = null;
  function hidePill() {
    if (pillTimer) { clearTimeout(pillTimer); pillTimer = null; }
    if (pill && pill.parentNode) pill.parentNode.removeChild(pill);
    pill = null;
  }
  function showPill(kind, text, btn, ms) {
    injectNetCss();
    if (pillTimer) { clearTimeout(pillTimer); pillTimer = null; }
    if (!pill) { pill = document.createElement('div'); pill.setAttribute('role', 'status'); pill.setAttribute('aria-live', 'polite'); document.body.appendChild(pill); }
    pill.className = 'pwa-pill ' + kind;
    pill.innerHTML = '<i></i><span></span>';
    pill.lastChild.textContent = text;
    if (btn) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = btn.label; b.onclick = btn.fn;
      pill.appendChild(b);
    }
    if (ms) pillTimer = setTimeout(function () { hidePill(); settle(); }, ms);
  }
  /* Pesan sementara (hilang sendiri). Tidak menimpa pill "Versi baru siap". */
  function flash(kind, text, ms) { if (updateReady) return; showPill(kind, text, null, ms); }
  /* Kembali ke status yang sedang berlaku: ada perubahan belum terkirim -> tetap tampil */
  function settle() {
    if (updateReady) return;
    if (pendingWrites > 0) {
      var off = navigator.onLine === false;
      showPill(off ? 'off busy' : 'busy', off ? 'Offline — perubahan akan dikirim otomatis saat tersambung' : 'Menyinkronkan perubahan…', null, 0);
    } else if (pill && !pillTimer) hidePill();
  }

  function lastSyncText() {
    var t = (window.FJHT && window.FJHT.lastSync) || parseInt(load(SYNC_KEY) || '0', 10);
    if (!t) return '';
    try { return ' (data per ' + new Date(t).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) + ')'; }
    catch (e) { return ''; }
  }

  function userBusy() {
    var ae = document.activeElement, t = ae && ae.tagName;
    if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return true;
    if (document.querySelector('.modal-overlay.open')) return true;
    /* ada isian yang sudah terisi (draft pengajuan, pencarian, dst.) -> jangan hapus */
    var f = document.querySelectorAll('#app input:not([type=checkbox]):not([type=radio]):not([type=hidden]), #app textarea');
    for (var i = 0; i < f.length; i++) if (f[i].value && f[i].offsetParent !== null) return true;
    return false;
  }
  function doReload() {
    sstore(RELOAD_AT_KEY, String(Date.now()));
    location.reload();
  }
  var applying = false;
  function applyUpdate() {
    if (applying) return;
    var last = parseInt(sload(RELOAD_AT_KEY) || '0', 10);
    if (Date.now() - last < 60000) return;                    /* cegah reload beruntun */
    if (userBusy()) {
      updateReady = true;
      showPill('', 'Versi baru siap', { label: 'Perbarui', fn: doReload }, 0);
      return;
    }
    applying = true; updateReady = true;
    if (document.hidden) { doReload(); return; }
    showPill('busy', 'Versi baru ditemukan — memperbarui…', null, 0);
    setTimeout(doReload, 1200);
  }
  /* Update yang tertunda karena pengguna sedang mengetik: coba lagi saat sudah tidak sibuk */
  setInterval(function () {
    if (updateReady && !applying && !userBusy()) { updateReady = false; applyUpdate(); }
  }, 20000);

  /* Cadangan bila SW belum aktif / tidak didukung: bandingkan version.json */
  function checkVersionJson() {
    if (!window.fetch) return;
    fetch('version.json?t=' + Date.now(), { cache: 'no-store' }).then(function (r) {
      return r.ok ? r.json() : null;
    }).then(function (j) {
      var v = j && j.v; if (!v) return;
      var cur = load(VER_KEY);
      store(VER_KEY, v);
      if (cur && cur !== v) applyUpdate();
    }).catch(function () {});
  }

  function checkUpdate(force) {
    if (navigator.onLine === false) return;
    var now = Date.now();
    if (!force && now - lastCheck < 60000) return;
    lastCheck = now;
    if (swReg && swReg.update) swReg.update().catch(function () {});          /* cek sw.js itu sendiri */
    var ctl = navigator.serviceWorker && navigator.serviceWorker.controller;
    if (ctl) ctl.postMessage({ type: 'CHECK_UPDATE' });                        /* cek isi semua file */
    else checkVersionJson();
  }

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    var hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (hadController) applyUpdate();                       /* sw.js baru mengambil alih -> pakai kode baru */
      hadController = true;
    });
    navigator.serviceWorker.addEventListener('message', function (e) {
      var d = e.data || {};
      if (d.type === 'KAS_UPDATED') applyUpdate();
      else if (d.type === 'KAS_READY' && !load(READY_KEY)) {
        store(READY_KEY, '1');
        flash('on', 'Aplikasi tersimpan — siap dipakai tanpa internet', 4000);
      }
    });
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(function (reg) {
        swReg = reg;
        checkUpdate(true);
        /* pembaruan berkala di latar belakang (Chrome terpasang sebagai aplikasi) */
        try {
          if (reg.periodicSync && navigator.permissions) {
            navigator.permissions.query({ name: 'periodic-background-sync' }).then(function (p) {
              if (p.state === 'granted') reg.periodicSync.register('kas-update', { minInterval: 12 * 60 * 60 * 1000 });
            }).catch(function () {});
          }
        } catch (e) {}
      }).catch(function (err) {
        if (window.console) console.warn('[PWA] service worker gagal didaftarkan:', err);
      });
      /* minta browser jangan menghapus data offline saat penyimpanan menipis */
      try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {}); } catch (e) {}
    });
  } else {
    window.addEventListener('load', function () { setTimeout(checkVersionJson, 1500); });
  }

  /* Status sinkron data: perubahan yang tertunda (dari app + yang tersisa dari sesi sebelumnya) */
  window.addEventListener('kas-sync', function (e) {
    var was = pendingWrites;
    pendingWrites = (e.detail && e.detail.pending) || 0;
    if (was > 0 && pendingWrites === 0) flash('on', 'Semua perubahan sudah tersinkron ✓', 3000);
    else settle();
  });
  function watchLeftoverWrites() {
    var F = window.FJHT; if (!F || !F.flushed) return;
    var t = setTimeout(function () { if (!pendingWrites) { pendingWrites = 1; settle(); } }, 1500);
    F.flushed().then(function () {
      clearTimeout(t);
      if (pendingWrites === 1) { pendingWrites = 0; flash('on', 'Semua perubahan sudah tersinkron ✓', 3000); }
    }, function () { clearTimeout(t); });
  }

  window.addEventListener('online', function () {
    flash('on', 'Tersambung kembali — memeriksa pembaruan…', 2600);
    setTimeout(function () { checkUpdate(true); }, 600);
    watchLeftoverWrites();
  });
  window.addEventListener('offline', function () {
    flash('off', 'Mode offline — memakai data tersimpan' + lastSyncText(), 4500);
  });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) checkUpdate(false); });
  setInterval(function () { checkUpdate(false); }, 15 * 60 * 1000);
  window.addEventListener('load', function () {
    if (navigator.onLine === false) setTimeout(function () { flash('off', 'Mode offline — memakai data tersimpan' + lastSyncText(), 4500); }, 1200);
    setTimeout(watchLeftoverWrites, 2500);
  });

  /* ---- 2. Tombol pasang ---- */
  var deferred = null;

  function isStandalone() {
    try {
      return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
             window.navigator.standalone === true;
    } catch (e) { return false; }
  }
  function snoozed() {
    try { var t = parseInt(localStorage.getItem(KEY) || '0', 10); return t && (Date.now() - t) < SNOOZE_MS; }
    catch (e) { return false; }
  }
  function snooze() { try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {} }
  function textOn(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex); if (!m) return '#fff';
    var n = parseInt(m[1], 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? '#06121f' : '#ffffff';
  }

  /* ---- Tombol pasang aplikasi: ikon download melayang (HP & PC) ---- */
  var ICON = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5v11"/><path d="M7.5 10.5l4.5 4.5 4.5-4.5"/><path d="M5 15.5v1.5a3 3 0 003 3h8a3 3 0 003-3v-1.5"/></svg>';
  var UA = navigator.userAgent || '';
  var isIOS = /iphone|ipad|ipod/i.test(UA) && !window.MSStream;
  var isAndroid = /android/i.test(UA);

  function injectCss() {
    if (document.getElementById('pwaFabCss')) return;
    var st = document.createElement('style'); st.id = 'pwaFabCss';
    st.textContent =
      '.pwa-dl{flex:none;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;margin-left:auto;margin-right:2px;padding:0;cursor:pointer;' +
      'border-radius:14px;color:#F2B84B;background:rgba(242,184,75,.14);border:1.5px solid rgba(242,184,75,.65);-webkit-tap-highlight-color:transparent}' +
      '.pwa-dl:hover{background:rgba(242,184,75,.26)}.pwa-dl:active{transform:scale(.94)}' +
      ':root[data-theme="light"] .pwa-dl{color:#8A5500;background:rgba(224,160,34,.16);border-color:rgba(138,85,0,.55)}' +
      '.pwa-dl svg{display:block}' +
      '@media (min-width:761px){.pwa-dl{width:auto;padding:0 16px 0 13px;gap:8px;font:700 13.5px "Figtree","Segoe UI",Arial,sans-serif;margin-right:0}}' +
      '.pwa-dl span{display:none}@media (min-width:761px){.pwa-dl span{display:inline}}' +
      '.pwa-ov{position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147483001;display:flex;align-items:flex-end;justify-content:center;background:rgba(10,4,6,.72)}' +
      '@media (min-width:761px){.pwa-ov{align-items:center}}' +
      '.pwa-sheet{width:100%;max-width:440px;box-sizing:border-box;padding:22px 20px calc(22px + env(safe-area-inset-bottom,0px));border-radius:26px 26px 0 0;' +
      'background:#1E1417;color:#F8F0E8;border:1px solid #3B262C;font:500 14.5px/1.55 "Figtree","Segoe UI",Arial,sans-serif;box-shadow:0 -20px 50px -20px rgba(0,0,0,.8)}' +
      '@media (min-width:761px){.pwa-sheet{border-radius:26px}}' +
      '.pwa-sheet h3{margin:0 0 4px;font:800 21px/1.2 "Bricolage Grotesque","Segoe UI",Arial,sans-serif;letter-spacing:-.02em}' +
      '.pwa-sheet p{margin:0 0 12px;color:#CFC0B7}' +
      '.pwa-sheet ol{margin:0 0 14px;padding-left:22px}.pwa-sheet li{margin:6px 0}' +
      '.pwa-sheet .pwa-note{padding:10px 12px;border-radius:12px;background:rgba(242,184,75,.12);border:1px solid rgba(242,184,75,.35);color:#FFD98A;font-size:13px;margin-bottom:14px}' +
      '.pwa-sheet button{width:100%;border:0;border-radius:14px;padding:13px;font:700 15px "Figtree","Segoe UI",Arial,sans-serif;cursor:pointer;background:linear-gradient(180deg,#F8C866,#E8A52B);color:#2B1700}';
    document.head.appendChild(st);
  }

  function steps() {
    if (isIOS) return ['Buka situs ini di <b>Safari</b>.', 'Ketuk tombol <b>Bagikan</b> (kotak dengan panah ke atas).', 'Pilih <b>Tambah ke Layar Utama</b>, lalu ketuk <b>Tambah</b>.'];
    if (isAndroid) return ['Buka situs ini di <b>Chrome</b>.', 'Ketuk menu <b>⋮</b> di pojok kanan atas.', 'Pilih <b>Pasang aplikasi</b> (atau <b>Tambahkan ke layar utama</b>).'];
    return ['Buka situs ini di <b>Chrome</b> atau <b>Edge</b>.', 'Klik ikon <b>Pasang</b> (monitor dengan panah) di ujung kanan kolom alamat.', 'Atau buka menu <b>⋮</b> lalu pilih <b>Pasang Kas JHT</b>.'];
  }
  function sheet() {
    if (document.querySelector('.pwa-ov')) return;
    injectCss();
    var ov = document.createElement('div'); ov.className = 'pwa-ov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'Pasang aplikasi');
    var li = steps(), h = '';
    for (var i = 0; i < li.length; i++) h += '<li>' + li[i] + '</li>';
    ov.innerHTML = '<div class="pwa-sheet"><h3>Pasang ' + APP_NAME + '</h3><p>Buka seperti aplikasi, lebih cepat, dan tetap bisa dipakai saat offline.</p>' +
      '<ol>' + h + '</ol>' +
      '<div class="pwa-note">Jika Anda membuka dari editor atau aplikasi lain, salin alamat situs lalu buka di Chrome/Edge agar tombol pasang aktif.</div>' +
      '<button type="button">Mengerti</button></div>';
    function close() { if (ov.parentNode) ov.parentNode.removeChild(ov); }
    ov.onclick = function (e) { if (e.target === ov) close(); };
    ov.getElementsByTagName('button')[0].onclick = close;
    document.body.appendChild(ov);
  }

  /* Ikon download di header (HP & PC). Selalu tampil selama belum terpasang. */
  var btn = null;
  function onDl() { if (!window.pwaInstall()) sheet(); }
  function placeBtn() {
    if (isStandalone()) { removeBtn(); return; }
    var anchor = document.getElementById('hamburgerBtn') || document.getElementById('adminHamburgerBtn');
    if (!anchor || !anchor.parentNode) return;
    var host = anchor.parentNode;
    var desktopActions = host.querySelector('.topbar-actions');
    var wantsBefore = (window.matchMedia && window.matchMedia('(min-width:761px)').matches && desktopActions) ? desktopActions : anchor;
    if (btn && btn.parentNode === host && btn.nextSibling === wantsBefore) return;
    if (!btn) {
      injectCss();
      btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'pwa-dl';
      btn.setAttribute('aria-label', 'Pasang aplikasi ' + APP_NAME);
      btn.title = 'Pasang aplikasi';
      btn.innerHTML = ICON + '<span>Pasang Aplikasi</span>';
      btn.onclick = onDl;
    }
    host.insertBefore(btn, wantsBefore);
  }
  function removeBtn() { if (btn && btn.parentNode) btn.parentNode.removeChild(btn); btn = null; }
  var placeQueued = false;
  function queuePlace() {
    if (placeQueued) return; placeQueued = true;
    (window.requestAnimationFrame || setTimeout)(function () { placeQueued = false; placeBtn(); });
  }
  function startBtn() {
    placeBtn();
    var app = document.getElementById('app');
    if (window.MutationObserver && app) new MutationObserver(queuePlace).observe(app, { childList: true, subtree: true });
    window.addEventListener('resize', queuePlace);
    window.addEventListener('hashchange', queuePlace);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startBtn); else startBtn();

  /* bisa dipanggil dari tombol buatan sendiri di situs: onclick="pwaInstall()" */
  window.pwaInstall = function () {
    if (!deferred) return false;
    var p = deferred; deferred = null;
    p.prompt();
    if (p.userChoice && p.userChoice.then) p.userChoice.then(function (c) { if (c && c.outcome !== 'accepted') snooze(); });
    return true;
  };

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferred = e;
    window.dispatchEvent(new CustomEvent('pwa-installable'));
    queuePlace();
  });
  window.addEventListener('appinstalled', function () { deferred = null; removeBtn(); });
})();

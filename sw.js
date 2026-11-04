/* ============================================================
   Service Worker — Kas JHT  (v2: offline-first + auto-update cerdas)

   1) Bisa di-"Install" seperti aplikasi & dibuka TANPA internet.
   2) Daftar file inti dibaca otomatis dari index.html — tidak perlu lagi
      menyalin daftar file / angka ?v= secara manual.
   3) PEMBARUAN OTOMATIS TANPA LANGKAH MANUAL: saat online, SW membandingkan
      isi file (hash SHA-1) dengan yang tersimpan. Ada file berubah → disimpan
      & halaman diberi tahu untuk memuat ulang. Cukup upload file baru ke
      hosting; tidak wajib mengubah version.json / CACHE_VERSION.
   4) TIDAK menyentuh Firebase/API — data realtime tetap langsung ke server.

   Strategi cache:
   - Halaman, JS, CSS, JSON situs sendiri : jaringan dulu (timeout), cache = cadangan
   - Gambar & font situs sendiri          : cache dulu, diperbarui di latar
   - Pustaka CDN (Firebase SDK, Font Awesome, xlsx, jsPDF, Google Fonts) : cache dulu

   Pesan SW -> halaman : {type:'KAS_UPDATED', files:[...]}  |  {type:'KAS_READY'}
   Pesan halaman -> SW : {type:'CHECK_UPDATE'} | {type:'SKIP_WAITING'} | {type:'PURGE'}
   ============================================================ */
'use strict';

/* Naikkan angka ini HANYA jika ingin memaksa semua perangkat membuang cache lama sepenuhnya. */
var CACHE_VERSION = '2026-11-07.2';
var APP_CACHE = 'kas-jht-app-' + CACHE_VERSION;
var CDN_CACHE = 'kas-jht-cdn-' + CACHE_VERSION;

/* File yang selalu disimpan (selain yang otomatis terbaca dari index.html) */
var STATIC_ASSETS = [
  './',
  './index.html',
  './version.json',
  './favicon.ico',
  './assets/favicon-32.png',
  './assets/piggy.png',
  './assets/piggy-sm.png',
  './assets/fonts/bricolage-grotesque-latin-700-normal.woff2',
  './assets/fonts/bricolage-grotesque-latin-800-normal.woff2',
  './assets/fonts/figtree-latin-400-normal.woff2',
  './assets/fonts/figtree-latin-500-normal.woff2',
  './assets/fonts/figtree-latin-600-normal.woff2',
  './assets/fonts/figtree-latin-700-normal.woff2'
];

/* Pustaka CDN: SDK Firebase + pustaka ekspor yang dimuat belakangan (agar Excel/PDF juga jalan offline) */
var CDN_ASSETS = [
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore-compat.js',
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth-compat.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js'
];

/* Bagian situs lain di bawah folder yang sama — TIDAK boleh disentuh service worker ini */
var BYPASS_PATHS = ['/arisan-tanteh-susi/'];

var NETWORK_TIMEOUT_MS = 4500;
var INDEX_URL = new URL('./', self.location).href;
var ASSET_EXT = /\.(css|js|json|png|jpe?g|ico|svg|woff2?|webmanifest)$/i;
var DIFF_EXT = /\.(html|css|js|json|webmanifest)$/i;   /* file yang dibandingkan isinya saat cek update */

/* ---------- util ---------- */
function isCdn(url) {
  if (url.hostname === 'cdnjs.cloudflare.com') return true;
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') return true;
  if (url.hostname === 'www.gstatic.com' && url.pathname.indexOf('/firebasejs/') === 0) return true;
  return false;
}
function isBypassed(url) {
  for (var i = 0; i < BYPASS_PATHS.length; i++) if (url.pathname.indexOf(BYPASS_PATHS[i]) !== -1) return true;
  return false;
}
function uniq(arr) {
  var seen = {}, out = [];
  arr.forEach(function (x) { if (!seen[x]) { seen[x] = 1; out.push(x); } });
  return out;
}

/* Baca semua <script src>, <link href> lokal dari index.html -> daftar URL absolut */
function extractAssets(html) {
  var out = [], re = /(?:src|href)\s*=\s*["']([^"'#][^"']*)["']/gi, m;
  while ((m = re.exec(html))) {
    var u;
    try { u = new URL(m[1], INDEX_URL); } catch (e) { continue; }
    if (u.origin !== self.location.origin) continue;
    if (isBypassed(u) || /\/sw\.js$/.test(u.pathname)) continue;
    if (!ASSET_EXT.test(u.pathname)) continue;
    out.push(u.href);
  }
  return out;
}

function absolute(list) {
  return list.map(function (u) { return new URL(u, self.location).href; });
}

function digest(buf) {
  return crypto.subtle.digest('SHA-1', buf).then(function (h) {
    var a = new Uint8Array(h), s = '';
    for (var i = 0; i < a.length; i++) s += (a[i] < 16 ? '0' : '') + a[i].toString(16);
    return s;
  });
}

function broadcast(msg) {
  return self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (cs) {
    cs.forEach(function (c) { c.postMessage(msg); });
  });
}

function fetchWithTimeout(req, ms) {
  if (!ms) return fetch(req);
  return new Promise(function (resolve, reject) {
    var done = false;
    var t = setTimeout(function () { if (!done) { done = true; reject(new Error('timeout')); } }, ms);
    fetch(req).then(function (res) {
      if (!done) { done = true; clearTimeout(t); resolve(res); }
    }, function (err) {
      if (!done) { done = true; clearTimeout(t); reject(err); }
    });
  });
}

/* ---------- install: simpan semua file inti ---------- */
function precacheAll(reload) {
  return Promise.all([caches.open(APP_CACHE), caches.open(CDN_CACHE)]).then(function (cs) {
    var appCache = cs[0], cdnCache = cs[1];
    /* 1) baca index.html terbaru supaya daftar file ikut versi terbaru */
    return fetch(new Request(INDEX_URL + 'index.html', { cache: 'reload' })).then(function (r) {
      return r.ok ? r.text() : '';
    }).catch(function () { return ''; }).then(function (html) {
      var local = uniq(absolute(STATIC_ASSETS).concat(html ? extractAssets(html) : []));
      var cdn = CDN_ASSETS;
      /* add satu-satu: kalau 1 file gagal, pemasangan tidak ikut batal */
      var jobs = local.map(function (u) {
        var add = function () { return appCache.add(new Request(u, { cache: 'reload' })).catch(function () {}); };
        if (reload) return add();
        return appCache.match(u).then(function (hit) { if (!hit) return add(); });   /* hanya yang belum tersimpan */
      }).concat(cdn.map(function (u) {
        return cdnCache.match(u).then(function (hit) {
          if (hit) return;                                   /* CDN berversi di URL: cukup sekali */
          return cdnCache.add(new Request(u)).catch(function () {});
        });
      }));
      return Promise.all(jobs);
    });
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(precacheAll(true).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        var mine = k.indexOf('kas-jht-') === 0;
        if (mine && k !== APP_CACHE && k !== CDN_CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
      .then(function () { return broadcast({ type: 'KAS_READY', v: CACHE_VERSION }); })
  );
});

/* ---------- cek update cerdas: bandingkan isi file, simpan yang berubah ---------- */
var checking = null;
function checkForUpdate() {
  if (checking) return checking;
  checking = (function () {
    return caches.open(APP_CACHE).then(function (cache) {
      return fetch(new Request(INDEX_URL + 'index.html', { cache: 'no-cache' })).then(function (idxRes) {
        if (!idxRes || !idxRes.ok) return [];
        return idxRes.clone().text().then(function (html) {
          var urls = uniq(absolute(STATIC_ASSETS).concat(extractAssets(html))).filter(function (u) {
            var p = new URL(u).pathname;
            return DIFF_EXT.test(p) || /\/$/.test(p);
          });
          var changed = [];
          var jobs = urls.map(function (u) {
            var path = new URL(u).pathname;
            var isIndex = /\/$/.test(path) || /\/index\.html$/.test(path);
            var freshP = isIndex ? Promise.resolve(idxRes.clone()) :
              fetch(new Request(u, { cache: 'no-cache' }));
            return freshP.then(function (fresh) {
              if (!fresh || !fresh.ok) return;
              return cache.match(u).then(function (old) {
                var a = fresh.clone().arrayBuffer();
                var b = old ? old.clone().arrayBuffer() : Promise.resolve(null);
                return Promise.all([a, b]).then(function (bufs) {
                  var same = bufs[1] && bufs[0].byteLength === bufs[1].byteLength;
                  var hashes = same ? Promise.all([digest(bufs[0]), digest(bufs[1])]) : Promise.resolve(null);
                  return hashes.then(function (h) {
                    if (h && h[0] === h[1]) return;                 /* sama persis */
                    changed.push(path.replace(/^.*\//, '') || 'index.html');
                    return cache.put(u, fresh.clone());
                  });
                });
              });
            }).catch(function () {});
          });
          return Promise.all(jobs).then(function () {
            /* kunci "./" dan "./index.html" dijaga selalu sama */
            if (changed.length) {
              return Promise.all([
                cache.put(INDEX_URL, idxRes.clone()),
                cache.put(INDEX_URL + 'index.html', idxRes.clone())
              ]).catch(function () {}).then(function () { return uniq(changed); });
            }
            return [];
          });
        });
      });
    }).then(function (changed) {
      /* file baru dari index.html yang belum pernah tersimpan (mis. gambar/font) ikut disimpan */
      return precacheAll(false).then(function () { return changed; });
    });
  })().then(function (changed) {
    checking = null;
    if (changed.length) return broadcast({ type: 'KAS_UPDATED', files: changed });
  }, function () { checking = null; });   /* offline / gagal: diam saja */
  return checking;
}

self.addEventListener('message', function (e) {
  var d = e.data, type = (d && d.type) || d;
  if (type === 'SKIP_WAITING') self.skipWaiting();
  else if (type === 'CHECK_UPDATE') e.waitUntil(checkForUpdate());
  else if (type === 'PURGE') {
    e.waitUntil(caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k.indexOf('kas-jht-') === 0; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return precacheAll(true); }));
  }
});

/* Chrome terpasang (PWA) bisa membangunkan SW berkala untuk menyiapkan versi baru di latar */
self.addEventListener('periodicsync', function (e) {
  if (e.tag === 'kas-update') e.waitUntil(checkForUpdate());
});

/* ---------- respons offline & strategi fetch ---------- */
function offlineResponse() {
  var html = '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>Tidak ada koneksi</title><body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;' +
    'background:#150E10;color:#F8F0E8;font-family:Segoe UI,Arial,sans-serif;text-align:center;padding:24px">' +
    '<div><h2 style="margin:0 0 8px">Sedang offline</h2>' +
    '<p style="margin:0 0 18px;color:#CFC0B7">Halaman ini belum tersimpan. Buka sekali saat online, setelah itu bisa dibuka tanpa internet.</p>' +
    '<button onclick="location.reload()" style="padding:11px 24px;border:0;border-radius:14px;background:#F2B84B;color:#2B1700;font-weight:700;font-size:15px;cursor:pointer">Coba lagi</button></div>';
  return new Response(html, { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

function networkFirst(event, isNav) {
  var req = event.request;
  return caches.open(APP_CACHE).then(function (cache) {
    return cache.match(req).then(function (cached) {
      var fresh = new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' });
      return fetchWithTimeout(fresh, cached ? NETWORK_TIMEOUT_MS : 0).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          event.waitUntil(cache.put(req, res.clone()).catch(function () {}));
        }
        return res;
      }).catch(function () {
        if (cached) return cached;
        return cache.match(req, { ignoreSearch: true }).then(function (loose) {
          if (loose) return loose;
          if (isNav) {
            return cache.match(INDEX_URL).then(function (idx) {
              return idx || cache.match(INDEX_URL + 'index.html').then(function (i2) { return i2 || offlineResponse(); });
            });
          }
          return Response.error();
        });
      });
    });
  });
}

function staleWhileRevalidate(event, cacheName) {
  var req = event.request;
  return caches.open(cacheName).then(function (cache) {
    return cache.match(req).then(function (cached) {
      var net = fetch(req).then(function (res) {
        if (res && (res.status === 200 || res.type === 'opaque')) {
          event.waitUntil(cache.put(req, res.clone()).catch(function () {}));
        }
        return res;
      }).catch(function () { return cached || Response.error(); });
      return cached || net;
    });
  });
}

function cacheFirst(event, cacheName) {
  var req = event.request;
  return caches.open(cacheName).then(function (cache) {
    return cache.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req).then(function (res) {
        if (res && (res.status === 200 || res.type === 'opaque')) {
          event.waitUntil(cache.put(req, res.clone()).catch(function () {}));
        }
        return res;
      });
    });
  });
}

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  if (req.headers.has('range')) return;            /* audio/video streaming: biarkan */

  var url;
  try { url = new URL(req.url); } catch (e) { return; }

  if (url.origin === self.location.origin) {
    if (isBypassed(url)) return;
    if (/\/sw\.js$/.test(url.pathname)) return;

    if (req.mode === 'navigate') {
      event.respondWith(networkFirst(event, true));
    } else if (req.destination === 'image' || req.destination === 'font') {
      event.respondWith(staleWhileRevalidate(event, APP_CACHE));
    } else {
      event.respondWith(networkFirst(event, false));
    }
    return;
  }

  if (isCdn(url)) {
    if (url.hostname === 'fonts.googleapis.com') event.respondWith(staleWhileRevalidate(event, CDN_CACHE));
    else event.respondWith(cacheFirst(event, CDN_CACHE));
  }
  /* selain itu (Firestore, Realtime DB, Auth, dsb.) → tidak dicegat sama sekali */
});

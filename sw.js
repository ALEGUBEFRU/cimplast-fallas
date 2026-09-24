// Cimplast CMMS · service worker
// Estrategia "red primero": siempre intenta bajar la versión nueva (así un
// datos.js o un HTML actualizado llega enseguida) y solo usa la copia guardada
// si no hay señal. Nunca intercepta la API de Apps Script ni otros dominios.
const CACHE = 'cimplast-v1';
// Cloudflare Pages redirige /x.html → /x (308): no se precachean rutas .html
// y nunca se guardan respuestas redirigidas (el navegador las rechaza offline).
const BASE = ['./', 'datos.js', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok && !res.redirected) { const copia = res.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || Response.error()))
  );
});

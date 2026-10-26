// sw-novedades.js — permite abrir la app Novedades sin señal. Guarda solo los archivos de la app, nunca los datos.
// Convive con el sw.js del CMMS (raíz del sitio): usa caches con prefijo "novedades-app-" y solo borra las suyas.
// Cloudflare redirige /x.html → /x: no se precachea index.html ni se guardan respuestas redirigidas.
const PREFIJO = "novedades-app-";
const VERSION = PREFIJO + "v4";
const ARCHIVOS = ["./", "manifest.json", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).catch(() => {}).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => (k.startsWith(PREFIJO) || k.startsWith("novedades-v")) && k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return; // los datos van directo a Google
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok && !r.redirected) { const c = r.clone(); caches.open(VERSION).then(x => x.put(e.request, c)); }
      return r;
    }).catch(() => caches.match(e.request).then(r => r || (e.request.mode === "navigate" ? caches.match("./") : Response.error())))
  );
});

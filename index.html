/* service-worker.js — UPDATE FIX (GitHub Pages cache issue) */
const CACHE_VER = "ms-cache-2026-02-08-01";
const CORE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./service-worker.js"
];

// Install: cache core
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VER).then((cache) => cache.addAll(CORE)).catch(()=>{})
  );
});

// Activate: delete old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_VER ? caches.delete(k) : null)))
    ).then(()=>self.clients.claim())
  );
});

// Fetch: network-first for html, cache-first for assets
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only same-origin
  if (url.origin !== location.origin) return;

  // Network-first for HTML (si update u muuqdo)
  const isHTML = req.headers.get("accept")?.includes("text/html") || url.pathname.endsWith(".html") || url.pathname === "/" || url.pathname.endsWith("/");

  if (isHTML) {
    event.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VER).then((c) => c.put(req, copy)).catch(()=>{});
        return res;
      }).catch(() => caches.match(req).then((m) => m || caches.match("./index.html")))
    );
    return;
  }

  // Assets: cache-first
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE_VER).then((c) => c.put(req, copy)).catch(()=>{});
        return res;
      });
    })
  );
});

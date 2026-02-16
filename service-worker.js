
========================
1) service-worker.js  (file cusub)
========================
/* Masculine Security — Service Worker (safe update)
   - HTML: always fresh (no stuck old version)
   - Assets: cache-first (fast)
*/
const CACHE = "ms-dienstplan-vFINAL-2026-02-16";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./version.txt",
  "./logo.png"
];

// Install: pre-cache core
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).catch(()=>{})
  );
});

// Activate: remove old caches
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE ? caches.delete(k) : Promise.resolve())));
    await self.clients.claim();
  })());
});

// Fetch strategy:
// - HTML/navigation: network-first (so updates show immediately)
// - Other files: cache-first
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // only handle GET
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // same-origin only
  if (url.origin !== location.origin) return;

  const isHTML =
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html") ||
    url.pathname.endsWith(".html") ||
    url.pathname === "/" ||
    url.pathname.endsWith("/");

  if (isHTML) {
    // Network-first for HTML
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req, { cache: "no-store" });
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        const cached = await caches.match(req);
        return cached || caches.match("./index.html");
      }
    })());
    return;
  }

  // Cache-first for assets
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;

    const fresh = await fetch(req);
    const cache = await caches.open(CACHE);
    cache.put(req, fresh.clone());
    return fresh;
  })());
});


========================
2) version.txt  (file cusub/ama update)
========================
vFINAL-2026-02-16


========================
3) manifest.json  (hubi inuu jiro)
========================
{
  "name": "Masculine Security — Dienstplan",
  "short_name": "Dienstplan",
  "start_url": "./",
  "display": "standalone",
  "background_color": "#071225",
  "theme_color": "#0b4ea2",
  "icons": [
    { "src": "logo.png", "sizes": "192x192", "type": "image/png" },
    { "src": "logo.png", "sizes": "512x512", "type": "image/png" }
  ]
}


========================
4) index.html  (ku dar gudaha <head> ama dhamaadka <body>)
========================
<script>
  // Service Worker register
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const reg = await navigator.serviceWorker.register("./service-worker.js");
        // Force update check
        reg.update().catch(()=>{});
      } catch (e) {
        console.log("SW register failed", e);
      }
    });
  }
</script>


========================
5) (MUHIIM) GitHub Pages update kadib: cache nadiifi 10 sec
========================
- Fur site-ka
- Ctrl + Shift + R (hard refresh)
- Haddii wali old version: browser settings → Site data → Clear

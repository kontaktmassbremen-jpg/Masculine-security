const CACHE = "ms-mini-office-v4";

const FILES = [
  "/masculine/",
  "/masculine/index.html",
  "/masculine/style.css",
  "/masculine/manifest.json",
  "/masculine/icon-192.png",
  "/masculine/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

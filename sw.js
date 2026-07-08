const CACHE_NAME = "ps4-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/auto.html",
  "/offline.html",
  "/exploit/exploit.js",
  "/exploit/loader.js",
  "/exploit/rop.js",
  "/exploit/syscalls.js",
  "/payloads/goldhen.bin"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

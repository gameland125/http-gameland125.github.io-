const CACHE_NAME = 'gameland-v1';
const ASSETS = ['./', './index.html', './style.css', './main.js', './manifest.webmanifest'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS))));
self.addEventListener('fetch', e => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

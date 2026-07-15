const CACHE_NAME = 'gameland-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './main.js',
    './index.js',
    './HENs.js',
    './manifest.webmanifest'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});

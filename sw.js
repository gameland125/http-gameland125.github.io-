self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('ps4-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/auto.html',
                '/offline.html',
                '/payloads/goldhen.bin'
            ]);
        })
    );
});

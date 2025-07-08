// Nama cache
const CACHE_NAME = 'my-pwa-cache-v1';

// Daftar file yang akan di-cache
const urlsToCache = [
    '/',
    'index.html',
    'manifest.json'
];

// Event: Install
// Saat service worker di-install, buka cache dan tambahkan file-file di atas
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Event: Fetch
// Saat ada request (misal load halaman), cek apakah ada di cache.
// Jika ada, ambil dari cache. Jika tidak, ambil dari network.
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response from cache
                if (response) {
                    return response;
                }
                // Not in cache - fetch from network
                return fetch(event.request);
            })
    );
});
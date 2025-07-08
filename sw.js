// Nama cache
const CACHE_NAME = 'my-pwa-cache-v8';
// Daftar file yang akan di-cache (aset inti aplikasi)
const urlsToCache = [
    '/',
    '/index.html'
];

// Event 'install': Saat Service Worker pertama kali diinstall
self.addEventListener('install', event => {
    // Menunggu sampai proses caching selesai
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache dibuka');
                return cache.addAll(urlsToCache);
            })
    );
});

// Event 'fetch': Saat aplikasi meminta resource (file, gambar, data)
self.addEventListener('fetch', event => {
    event.respondWith(
        // Cek apakah request ada di dalam cache
        caches.match(event.request)
            .then(response => {
                // Jika ada di cache, kembalikan dari cache
                if (response) {
                    return response;
                }
                // Jika tidak ada, fetch dari network
                return fetch(event.request);
            })
    );
});

// Ganti nama cache ini setiap kali Anda mengubah file yang di-cache
const CACHE_NAME = 'my-pwa-cache-v3'; 

const urlsToCache = [
    '/', // Ini adalah alias untuk index.html
    'index.html',
    'manifest.json'
];

// Event: Install
// Saat service worker di-install, simpan file-file di atas ke cache.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache and caching files');
                return cache.addAll(urlsToCache);
            })
    );
});

// Event: Activate
// Bagian ini akan membersihkan cache lama yang tidak digunakan lagi.
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Jika nama cache tidak sama dengan yang baru, hapus.
                    if (cacheName !== CACHE_NAME) {
                        console.log('Clearing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


// Event: Fetch
// Saat ada request, coba ambil dari cache dulu. Kalau tidak ada, baru ambil dari network.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Jika ada di cache, kembalikan dari cache
                if (response) {
                    return response;
                }
                // Jika tidak ada, ambil dari network
                return fetch(event.request);
            })
    );
});

// Nama cache yang unik untuk memastikan pembaruan
const CACHE_NAME = 'pwa-tugas-cache-v6';

// Daftar lengkap file yang akan di-cache
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'icon.png'
];

// Event install: Buka cache dan tambahkan semua file di atas
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event activate: Hapus cache lama yang tidak digunakan lagi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Event fetch: Ambil dari cache jika ada, jika tidak ambil dari network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Jika ada di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak ada, ambil dari network
        return fetch(event.request);
      })
  );
});

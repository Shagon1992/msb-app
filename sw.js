const CACHE_NAME = 'msb-pwa-cache';

// Proses Install
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Paksa Service Worker baru langsung aktif
});

// Proses Aktif
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Ambil kendali halaman segera
});

// Strategi: Network First (Cek Internet Dulu, Baru Cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Jika berhasil ambil dari internet, simpan salinannya ke cache
        // (Hanya simpan jika request-nya berhasil / status 200)
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Jika tidak ada internet (offline), ambil dari cache
        return caches.match(event.request);
      })
  );
});
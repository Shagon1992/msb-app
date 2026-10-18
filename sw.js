const CACHE_NAME = 'msb-pwa-v1';

// Proses Install
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Paksa SW baru langsung aktif
});

// Proses Aktif
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Ambil kendali halaman segera
});

// Fetch Handler (Syarat wajib Chrome Android)
self.addEventListener('fetch', (event) => {
  // Biarkan kosong atau berikan logika cache dasar.
  // Yang penting handler ini ada.
});
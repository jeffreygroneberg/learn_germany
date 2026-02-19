const CACHE_NAME = 'lerne-bundeslaender-v12';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/de.svg',
  './assets/icon-180.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/flags/DEBW.svg',
  './assets/flags/DEBY.svg',
  './assets/flags/DEBE.svg',
  './assets/flags/DEBB.svg',
  './assets/flags/DEHB.svg',
  './assets/flags/DEHH.svg',
  './assets/flags/DEHE.svg',
  './assets/flags/DEMV.svg',
  './assets/flags/DENI.svg',
  './assets/flags/DENW.svg',
  './assets/flags/DERP.svg',
  './assets/flags/DESL.svg',
  './assets/flags/DESN.svg',
  './assets/flags/DEST.svg',
  './assets/flags/DESH.svg',
  './assets/flags/DETH.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

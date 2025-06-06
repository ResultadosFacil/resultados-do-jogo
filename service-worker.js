const CACHE_NAME = 'ResultadosdoJogo.cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon192.png',
    '/icons/icon512.png',
    '/icons/favicon16.png',
    '/icons/favicon32.png',
    '/icons/favicon180.png',
    '/icons/icon-bh.webp',
    '/icons/icon-br.webp',
    '/icons/icon-ce.webp',
    '/icons/icon-df.webp',
    '/icons/icon-go.webp',
    '/icons/icon-mg.webp',
    '/icons/icon-pb.webp',
    '/icons/icon-pe.webp',
    '/icons/icon-pr.webp',
    '/icons/icon-rio.webp',
    '/icons/icon-rs.webp',
    '/icons/icon-sj.webp',
    '/icons/icon-sp.webp',
    '/cards/acertosclub.webp',
    '/cards/aguiaoficial.webp',
    '/icons/share.png',
    '/compartilhamento.jpg',
    '/compartilhar.js',
    '/container.js',
    '/cookies.js',
    '/footer.js',
    '/menu-horizontal.js',
    '/script.js',
    '/dates.js',
    '/menu-simples-links.js',
    '/banner.js',
    '/banner-federal.js',
    '/dowp-container.js',
    '/styles.css',
    '/footer.css',
    '/menu-horizontal.css',
];

// Instala o Service Worker e adiciona os recursos ao cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(error => console.error('Cache installation failed:', error))
    );
    self.skipWaiting();
});

// Intercepta as requisições e serve os recursos do cache quando disponíveis
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(() => {
                    // Opcional: Retornar uma página offline personalizada
                    return caches.match('/index.html');
                });
            })
    );
});

// Atualiza o Service Worker e remove caches antigos
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

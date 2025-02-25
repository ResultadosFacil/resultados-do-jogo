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
    
'/icons/icon-bh.png',
'/icons/icon-br.png',
'/icons/icon-ce.png',
'/icons/icon-df.png',
'/icons/icon-go.png',
'/icons/icon-mg.png',
'/icons/icon-pb.png',
'/icons/icon-pe.png',
'/icons/icon-pr.png',
'/icons/icon-rio.png',
'/icons/icon-rs.png',
'/icons/icon-sj.png',
'/icons/icon-sp.png',
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
'/banner-federal.js'
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
    );
    self.skipWaiting(); // Garante que a nova versão do SW seja ativada imediatamente
});

// Intercepta as requisições e serve os recursos do cache quando disponíveis
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna o recurso do cache se encontrado
                if (response) {
                    return response;
                }
                // Caso contrário, busca na rede
                return fetch(event.request);
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
    self.clients.claim(); // Garante que o novo SW assuma o controle imediatamente
});

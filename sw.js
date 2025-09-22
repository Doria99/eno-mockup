/**
 * Service Worker per Osteria del Chianti
 *
 * Questo file implementa il Service Worker che abilita le funzionalità offline
 * e migliora le performance del sito web. Utilizza una strategia di caching
 * "Cache First con Network Fallback" per garantire che il sito funzioni anche
 * senza connessione internet.
 *
 * Funzionalità implementate:
 * - Caching delle risorse statiche durante l'installazione
 * - Pulizia delle vecchie cache durante l'attivazione
 * - Gestione delle richieste di rete con priorità alla cache
 * - Aggiornamento della cache quando le risorse cambiano
 *
 * @author Osteria del Chianti Dev Team
 * @version 1.0.0
 */

// Nome della cache e risorse da memorizzare
const CACHE_NAME = 'osteria-del-chianti-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/menu.html',
  '/chi-siamo.html',
  '/contatti.html',
  '/prenota.html',
  '/styles.css',
  '/script.js',
  '/i18n.js',
  '/manifest.json',
  '/locales/it.json',
  '/locales/en.json',
  '/images/logo.svg',
  '/images/bistecca.jpg',
  '/images/pappardelle.jpg',
  '/images/cantucci.jpg',
  '/images/tavolata.jpg'
];

// Installazione del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Attivazione e pulizia delle vecchie cache
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Strategia Cache First con Network Fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - restituisci la risposta dalla cache
        if (response) {
          return response;
        }

        // Clona la richiesta
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Controlla se abbiamo ricevuto una risposta valida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clona la risposta
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});
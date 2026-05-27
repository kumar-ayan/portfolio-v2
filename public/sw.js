// ========================================
// Service Worker — Offline Support
// Strategy:
//   - Shell assets (HTML, JS, CSS): Network-first, fall back to cache
//   - Static assets (_next/static): Cache-first (they're immutably hashed)
//   - Fonts: Cache-first (stale-while-revalidate)
//   - API routes: Network-only (never cache dynamic data)
// ========================================

const CACHE_VERSION = 'v1';
const SHELL_CACHE  = `shell-${CACHE_VERSION}`;
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const FONT_CACHE   = `fonts-${CACHE_VERSION}`;

const SHELL_ASSETS = ['/', '/manifest.json'];

// ---- Install: pre-cache shell ----
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

// ---- Activate: purge old caches ----
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => ![SHELL_CACHE, STATIC_CACHE, FONT_CACHE].includes(k))
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ---- Fetch: routing strategies ----
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Never intercept non-GET or cross-origin requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // API routes — network only
  if (url.pathname.startsWith('/api/')) return;

  // Next.js hashed static assets — cache first (immutable)
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Google Fonts — cache first
  if (url.hostname.includes('fonts.gstatic.com') || url.hostname.includes('fonts.googleapis.com')) {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // HTML navigation & everything else — network first, fall back to cache
  event.respondWith(networkFirst(request, SHELL_CACHE));
});

// ---- Strategy helpers ----

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Offline fallback — return cached home page for navigations
    if (request.mode === 'navigate') {
      return caches.match('/');
    }
    return new Response('Offline', { status: 503 });
  }
}

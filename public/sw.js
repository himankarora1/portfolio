// Service Worker for Himank Arora Portfolio
// Offline support + caching. Never cache Range/206 responses (breaks video).

const CACHE_NAME = 'himank-portfolio-v1.1.0';
const RUNTIME_CACHE = 'himank-runtime-v1.1.0';

// Keep precache minimal — hashed CRA assets change every deploy
const PRECACHE_ASSETS = [
  '/',
  '/favicon.ico',
  '/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.all(
          PRECACHE_ASSETS.map((url) =>
            cache.add(new Request(url, { cache: 'reload' })).catch(() => {
              /* ignore missing optional assets */
            })
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              return caches.delete(cacheName);
            }
            return undefined;
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // Let the browser handle APIs, cross-origin Google APIs, media, and Range requests
  if (
    url.pathname.startsWith('/api/') ||
    url.hostname.includes('googleapis.com') ||
    isMediaRequest(request, url) ||
    request.headers.has('range')
  ) {
    return;
  }

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);

  try {
    if (request.mode === 'navigate') {
      return await handleNavigationRequest(request);
    }

    // Never serve HTML fallbacks for scripts/styles — avoids "Unexpected token '<'"
    if (isScriptOrStyle(url)) {
      return await networkOnlyNoPartialCache(request);
    }

    if (isStaticAsset(url)) {
      return await cacheFirstSafe(request, CACHE_NAME);
    }

    if (isExternalResource(url)) {
      return await staleWhileRevalidateSafe(request);
    }

    return await networkFirstSafe(request);
  } catch (error) {
    console.error('Fetch handler error:', error);
    return handleFetchError(request);
  }
}

async function handleNavigationRequest(request) {
  try {
    const networkResponse = await fetch(request);
    await safeCachePut(CACHE_NAME, request, networkResponse.clone());
    return networkResponse;
  } catch {
    const cached = (await caches.match('/')) || (await caches.match(request));
    if (cached) return cached;
    return new Response(createOfflinePage(), {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

async function networkOnlyNoPartialCache(request) {
  const networkResponse = await fetch(request);
  // Cache only complete hashed assets
  if (networkResponse.status === 200) {
    await safeCachePut(CACHE_NAME, request, networkResponse.clone());
  }
  return networkResponse;
}

async function cacheFirstSafe(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const networkResponse = await fetch(request);
  await safeCachePut(cacheName, request, networkResponse.clone());
  return networkResponse;
}

async function staleWhileRevalidateSafe(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then(async (response) => {
      await safeCachePut(RUNTIME_CACHE, request, response.clone());
      return response;
    })
    .catch(() => null);

  if (cached) {
    networkPromise.catch(() => {});
    return cached;
  }

  const networkResponse = await networkPromise;
  if (networkResponse) return networkResponse;
  throw new Error('Network and cache miss');
}

async function networkFirstSafe(request) {
  try {
    const networkResponse = await fetch(request);
    await safeCachePut(RUNTIME_CACHE, request, networkResponse.clone());
    return networkResponse;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw new Error('Network and cache miss');
  }
}

/** Only store complete opaque-safe responses (never 206 Partial Content). */
async function safeCachePut(cacheName, request, response) {
  if (!response || response.status !== 200) return;
  if (response.type === 'opaque') return;
  // Extra guard — Cache API rejects 206
  if (response.status === 206) return;

  try {
    const cache = await caches.open(cacheName);
    await cache.put(request, response);
  } catch (error) {
    // Ignore quota / partial-response / unsupported put errors
    console.warn('Cache put skipped:', error?.message || error);
  }
}

async function handleFetchError(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  if (request.mode === 'navigate') {
    return new Response(createOfflinePage(), {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  if (request.destination === 'image') {
    return createImagePlaceholder();
  }

  return new Response('Offline - Content not available', {
    status: 503,
    headers: { 'Content-Type': 'text/plain' },
  });
}

function isMediaRequest(request, url) {
  const path = url.pathname.toLowerCase();
  return (
    request.destination === 'video' ||
    request.destination === 'audio' ||
    path.startsWith('/videos/') ||
    path.endsWith('.mp4') ||
    path.endsWith('.webm') ||
    path.endsWith('.ogg') ||
    path.endsWith('.mp3') ||
    path.endsWith('.wav') ||
    path.endsWith('.m4a')
  );
}

function isScriptOrStyle(url) {
  return (
    url.pathname.startsWith('/static/js/') ||
    url.pathname.startsWith('/static/css/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css')
  );
}

function isStaticAsset(url) {
  return (
    url.pathname.startsWith('/static/') ||
    url.pathname.startsWith('/images/') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.woff2')
  );
}

function isExternalResource(url) {
  return (
    url.hostname !== self.location.hostname &&
    (url.hostname.includes('fonts.gstatic.com') ||
      url.hostname.includes('i.ytimg.com') ||
      url.hostname.includes('fonts.googleapis.com'))
  );
}

function createOfflinePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Offline - Himank Arora Portfolio</title>
  <style>
    body{font-family:system-ui,sans-serif;margin:0;padding:2rem;background:#0f172a;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center}
    h1{color:#fbbf24}
    button{background:#fff;color:#000;border:0;padding:.75rem 1.5rem;border-radius:.5rem;font-weight:600;cursor:pointer}
  </style>
</head>
<body>
  <div>
    <h1>You're Offline</h1>
    <p>Check your connection and try again.</p>
    <button onclick="location.reload()">Try Again</button>
  </div>
</body>
</html>`;
}

function createImagePlaceholder() {
  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#374151"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="sans-serif" font-size="16">Image unavailable offline</text>
  </svg>`;
  return new Response(svg, {
    status: 200,
    headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-cache' },
  });
}

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data?.type === 'GET_CACHE_INFO' && event.ports?.[0]) {
    caches.keys().then((cacheNames) => {
      event.ports[0].postMessage({
        type: 'CACHE_INFO',
        caches: cacheNames,
        version: CACHE_NAME,
      });
    });
  }
});

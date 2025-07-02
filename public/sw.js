// Service Worker for Himank Arora Portfolio
// Provides offline support and caching for better mobile experience

const CACHE_NAME = 'himank-portfolio-v1.0.0';
const RUNTIME_CACHE = 'himank-runtime-v1.0.0';

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/tech',
  '/artist',
  '/artist/about',
  '/artist/work',
  '/artist/contact',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/images/mewithguitar.jpg',
  '/images/itsrhiney.jpg',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
];

// Assets to cache at runtime
const RUNTIME_CACHE_URLS = [
  'https://fonts.gstatic.com',
  'https://i.ytimg.com',
  'https://www.youtube.com'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching precache assets');
        return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, {
          cache: 'reload'
        })));
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Skip API calls and YouTube API
  if (url.pathname.startsWith('/api/') || 
      url.hostname.includes('googleapis.com')) {
    return;
  }

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Handle navigation requests (pages)
    if (request.mode === 'navigate') {
      return await handleNavigationRequest(request);
    }
    
    // Handle static assets
    if (isStaticAsset(url)) {
      return await handleStaticAssetRequest(request);
    }
    
    // Handle external resources (fonts, images, etc.)
    if (isExternalResource(url)) {
      return await handleExternalResourceRequest(request);
    }
    
    // Default: try network first, fallback to cache
    return await networkFirst(request);
    
  } catch (error) {
    console.error('Fetch handler error:', error);
    return await handleFetchError(request);
  }
}

// Handle navigation requests (SPA routing)
async function handleNavigationRequest(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cached index.html for SPA routing
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match('/');
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Ultimate fallback
    return new Response(
      createOfflinePage(),
      {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}

// Handle static assets (JS, CSS, images)
async function handleStaticAssetRequest(request) {
  // Try cache first for static assets
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Fallback to network and cache response
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return placeholder for failed asset requests
    if (request.destination === 'image') {
      return createImagePlaceholder();
    }
    
    throw error;
  }
}

// Handle external resources
async function handleExternalResourceRequest(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Serve from cache and update in background
    fetch(request)
      .then(response => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
      })
      .catch(() => {
        // Silently fail background updates
      });
    
    return cachedResponse;
  }
  
  // Try network and cache response
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Only cache successful responses
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    throw error;
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Handle fetch errors
async function handleFetchError(request) {
  const url = new URL(request.url);
  
  // Try to serve any cached version
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Provide appropriate fallbacks
  if (request.mode === 'navigate') {
    return new Response(
      createOfflinePage(),
      {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
  
  if (request.destination === 'image') {
    return createImagePlaceholder();
  }
  
  // Return offline response
  return new Response(
    'Offline - Content not available',
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    }
  );
}

// Utility functions
function isStaticAsset(url) {
  return url.pathname.startsWith('/static/') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.ico') ||
         url.pathname.endsWith('.png') ||
         url.pathname.endsWith('.jpg') ||
         url.pathname.endsWith('.jpeg') ||
         url.pathname.endsWith('.svg') ||
         url.pathname.endsWith('.webp');
}

function isExternalResource(url) {
  return url.hostname !== self.location.hostname &&
         (url.hostname.includes('fonts.gstatic.com') ||
          url.hostname.includes('i.ytimg.com') ||
          url.hostname.includes('fonts.googleapis.com'));
}

// Create offline page HTML
function createOfflinePage() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Himank Arora Portfolio</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          margin: 0;
          padding: 2rem;
          background: linear-gradient(135deg, #0f172a 0%, #1f2937 100%);
          color: white;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .container {
          max-width: 500px;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #ec4899;
        }
        p {
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          color: #d1d5db;
        }
        .retry-btn {
          background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
          border: none;
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .retry-btn:hover {
          transform: scale(1.05);
        }
        .offline-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.7;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="offline-icon">📱</div>
        <h1>You're Offline</h1>
        <p>
          It looks like you're not connected to the internet. 
          Some content may not be available right now.
        </p>
        <p>
          Check your connection and try again.
        </p>
        <button class="retry-btn" onclick="window.location.reload()">
          Try Again
        </button>
      </div>
    </body>
    </html>
  `;
}

// Create image placeholder
function createImagePlaceholder() {
  // Simple SVG placeholder
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#374151"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="sans-serif" font-size="16">
        Image unavailable offline
      </text>
    </svg>
  `;
  
  return new Response(svg, {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache'
    }
  });
}

// Message handling for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    // Send cache information back to the client
    caches.keys().then(cacheNames => {
      event.ports[0].postMessage({
        type: 'CACHE_INFO',
        caches: cacheNames,
        version: CACHE_NAME
      });
    });
  }
});

// Background sync for better offline experience
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform background sync tasks
      console.log('Background sync triggered')
    );
  }
});

console.log('Service Worker script loaded successfully');
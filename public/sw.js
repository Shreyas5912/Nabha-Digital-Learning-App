/**
 * Service Worker for Nabha Digital Learning Platform
 * Optimized for offline functionality and poor connectivity
 */

const CACHE_NAME = 'nabha-digital-learning-v1'
const OFFLINE_CACHE = 'nabha-offline-content'
const API_CACHE = 'nabha-api-cache'

// Cache sizes optimized for low-end devices
const CACHE_LIMITS = {
  static: 50, // MB
  offline: 100, // MB
  api: 25 // MB
}

// URLs to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/logo.svg'
]

// API endpoints that can be cached
const CACHEABLE_API_ENDPOINTS = [
  '/api/courses',
  '/api/lessons',
  '/api/progress'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_CACHE_URLS)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== OFFLINE_CACHE && cacheName !== API_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch event - handle requests with offline support
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(event.request))
    return
  }
  
  // Handle static assets
  event.respondWith(handleStaticRequest(event.request))
})

// Handle API requests with caching and offline fallback
async function handleApiRequest(request) {
  try {
    // Try network first for API requests
    const networkResponse = await fetch(request)
    
    // Cache successful GET requests
    if (request.method === 'GET' && networkResponse.ok) {
      const cache = await caches.open(API_CACHE)
      await cache.put(request, networkResponse.clone())
      
      // Enforce cache size limit
      await enforceCacheLimit(API_CACHE, CACHE_LIMITS.api)
    }
    
    return networkResponse
  } catch (error) {
    console.log('Service Worker: Network request failed, trying cache:', error)
    
    // Try cache fallback
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline response for API requests
    return new Response(
      JSON.stringify({
        error: 'offline',
        message: 'You are currently offline. Please check your internet connection.',
        timestamp: Date.now()
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

// Handle static asset requests
async function handleStaticRequest(request) {
  try {
    // Try network first with timeout
    const networkResponse = await Promise.race([
      fetch(request),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Network timeout')), 5000)
      )
    ])
    
    // Cache static assets
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME)
      await cache.put(request, networkResponse.clone())
      
      // Enforce cache size limit
      await enforceCacheLimit(CACHE_NAME, CACHE_LIMITS.static)
    }
    
    return networkResponse
  } catch (error) {
    console.log('Service Worker: Network request failed, trying cache:', error)
    
    // Try cache fallback
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Try offline cache
    const offlineResponse = await caches.match(request)
    if (offlineResponse) {
      return offlineResponse
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/')
    }
    
    // Return empty response for other failed requests
    return new Response('', {
      status: 404,
      statusText: 'Not Found'
    })
  }
}

// Enforce cache size limits
async function enforceCacheLimit(cacheName, maxSizeMB) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()
  
  let totalSize = 0
  const itemsToDelete = []
  
  // Calculate total size
  for (const request of keys) {
    try {
      const response = await cache.match(request)
      if (response) {
        const contentLength = response.headers.get('content-length')
        const size = contentLength ? parseInt(contentLength) : 0
        totalSize += size
        
        // Mark items for deletion if we're over the limit
        if (totalSize > maxSizeMB * 1024 * 1024) {
          itemsToDelete.push(request)
        }
      }
    } catch (error) {
      console.error('Error calculating cache size:', error)
    }
  }
  
  // Delete oldest items if over limit
  if (itemsToDelete.length > 0) {
    console.log(`Service Worker: Cache size limit exceeded, deleting ${itemsToDelete.length} items`)
    for (const request of itemsToDelete) {
      await cache.delete(request)
    }
  }
}

// Handle offline content downloads
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'DOWNLOAD_OFFLINE_CONTENT') {
    handleOfflineDownload(event.data.payload)
  }
})

// Handle offline content downloads
async function handleOfflineDownload(payload) {
  const { contentId, contentUrl, contentType } = payload
  
  try {
    console.log('Service Worker: Downloading offline content:', contentId)
    
    // Fetch the content
    const response = await fetch(contentUrl)
    if (!response.ok) {
      throw new Error(`Failed to download content: ${response.status}`)
    }
    
    // Store in offline cache
    const offlineCache = await caches.open(OFFLINE_CACHE)
    await offlineCache.put(contentUrl, response)
    
    // Enforce cache size limit
    await enforceCacheLimit(OFFLINE_CACHE, CACHE_LIMITS.offline)
    
    // Notify success
    event.ports[0].postMessage({
      type: 'DOWNLOAD_COMPLETE',
      payload: { contentId, success: true }
    })
    
    console.log('Service Worker: Offline content downloaded successfully:', contentId)
  } catch (error) {
    console.error('Service Worker: Failed to download offline content:', error)
    
    // Notify failure
    event.ports[0].postMessage({
      type: 'DOWNLOAD_COMPLETE',
      payload: { contentId, success: false, error: error.message }
    })
  }
}

// Sync data when coming back online
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Sync event triggered:', event.tag)
  
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgressData())
  }
})

// Sync progress data with server
async function syncProgressData() {
  try {
    // Get stored progress data from IndexedDB
    const progressData = await getStoredProgressData()
    
    if (progressData.length > 0) {
      console.log('Service Worker: Syncing progress data:', progressData.length, 'items')
      
      // Send to server
      const response = await fetch('/api/progress/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ progress: progressData })
      })
      
      if (response.ok) {
        // Clear stored data after successful sync
        await clearStoredProgressData()
        console.log('Service Worker: Progress data synced successfully')
      } else {
        console.error('Service Worker: Failed to sync progress data:', response.status)
      }
    }
  } catch (error) {
    console.error('Service Worker: Error syncing progress data:', error)
  }
}

// Helper functions for IndexedDB operations
async function getStoredProgressData() {
  return new Promise((resolve) => {
    const request = indexedDB.open('NabhaOfflineDB', 1)
    
    request.onerror = () => {
      console.error('Service Worker: Failed to open IndexedDB')
      resolve([])
    }
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['progress'], 'readonly')
      const store = transaction.objectStore('progress')
      const getAll = store.getAll()
      
      getAll.onsuccess = () => {
        resolve(getAll.result)
      }
      
      getAll.onerror = () => {
        console.error('Service Worker: Failed to get progress data')
        resolve([])
      }
    }
    
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('progress')) {
        db.createObjectStore('progress', { keyPath: 'id' })
      }
    }
  })
}

async function clearStoredProgressData() {
  return new Promise((resolve) => {
    const request = indexedDB.open('NabhaOfflineDB', 1)
    
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction(['progress'], 'readwrite')
      const store = transaction.objectStore('progress')
      const clear = store.clear()
      
      clear.onsuccess = () => {
        resolve(true)
      }
      
      clear.onerror = () => {
        console.error('Service Worker: Failed to clear progress data')
        resolve(false)
      }
    }
    
    request.onerror = () => {
      console.error('Service Worker: Failed to open IndexedDB for clearing')
      resolve(false)
    }
  })
}

// Push notification support
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received')
  
  const options = {
    body: event.data?.text() || 'New update from Nabha Digital Learning',
    icon: '/logo.svg',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      url: '/'
    }
  }
  
  event.waitUntil(
    self.registration.showNotification('Nabha Digital Learning', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked')
  
  event.notification.close()
  
  if (event.notification.data?.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    )
  }
})

console.log('Service Worker: Loaded successfully')
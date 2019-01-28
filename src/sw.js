CACHE_NAME = 'Ku-nya-cache-v1'

self.addEventListener('install', event => {
  event.waitUntil(
    (async function() {
      const cache = await caches.open(CACHE_NAME)
    })(),
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    (async function() {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames
          .filter(cacheName => {
            return false
          })
          .map(cacheName => {
            caches.delete(cacheName)
          }),
      )
    })(),
  )
})

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  const requestURL = new URL(event.request.url)
  if (requestURL.hostname === 'i.pximg.net') {
    return event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          return (
            response ||
            fetch(event.request).then(response => {
              if (response.status === 0 || response.status === 200) {
                cache.put(event.request, response.clone())
              }
              return response
            })
          )
        })
      }),
    )
  }
})

console.log('startup')

CACHE_NAME = 'Ku-nya-cache-v1'

self.addEventListener('install', event => {
  console.log('install')
  event.waitUntil(
    (async function() {
      const cache = await caches.open(CACHE_NAME)
      console.log('open cache')
    })(),
  )
})

self.addEventListener('activate', event => {
  console.log('activate')
  event.waitUntil(
    (async function() {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames
          .filter(cacheName => {
            return false
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
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
          // if (response) console.log('hit cache')
          return (
            response ||
            fetch(event.request).then(response => {
              //cache.put(event.request, response.clone());
              cache.add(event.request)
              console.log('put cache')
              return response
            })
          )
        })
      }),
    )
  }
})

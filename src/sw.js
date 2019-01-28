CACHE_NAME = 'Ku-nya-cache-v1'

self.addEventListener('install', () => {})

self.addEventListener('activate', event => {
  event.waitUntil(
    (async function() {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames
          .filter(cacheName => {
            return true
          })
          .map(cacheName => {
            caches.delete(cacheName)
          }),
      )
    })(),
  )
})

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

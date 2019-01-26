console.log('startup')

self.addEventListener('install', event => {
  console.log('install')
})

self.addEventListener('activate', event => {
  console.log('activate')
})

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  console.log('Caught a fetch!')
  // event.respondWith(new Response("Hello world!"));
})

var cacheName = 'matchtwo-v1';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        'index.html',
        'js/app.js',
        'css/style.css'
      ]);
    })
  );
});

self.addEventListener('activate', function(e) {

});

self.addEventListener('fetch', function(e) {
  if(e.request.method === 'POST') return;
  
  e.respondWith(
    checkCache(e.request)
  )
  
});

function checkCache(request) {
  return caches.match(request).then(function(response) {
    return response || networkFetch(request);
  }).catch(function(err) {
    console.log('You seem to be offline', err);
  })
}

// gets response from network and adds to cache, then serves network response to browser
function networkFetch(request) {
  if(request.mode === 'no-cors') {
    return fetch(request, { mode: 'no-cors' }).then( function(response) {
      return caches.open(cacheName).then( function(cache) {
        cache.put(request, response.clone());
        return response;
      }).catch( function(err) { console.log('Error fetching from Network', err); })
    })  
  } else {
    return fetch(request).then( function(response) {
      return caches.open(cacheName).then( function(cache) {
        cache.put(request, response.clone());
        return response;
      }).catch( function(err) { console.log('Error fetching from Network', err); })
    })
  }
}
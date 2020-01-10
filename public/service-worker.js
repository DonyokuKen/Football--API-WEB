importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/article.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/script.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
    { url: '/pages/standings.html', revision: '1' },
    
]);


    workbox.routing.registerRoute(
      new RegExp('/pages/'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'pages',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          })
        ]
      })
    );


  workbox.routing.registerRoute(
    new RegExp('^https://api.football-data.org/v2/'),
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        })
      ]
    })
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    new RegExp('/article.html'),
    workbox.strategies.networkFirst({
        networkTimeoutSeconds: 5,     // 3 detik
        cacheName: 'timelines'
    })
  );

  workbox.routing.registerRoute(
    new RegExp('/article.html'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'articles'
    })
  );
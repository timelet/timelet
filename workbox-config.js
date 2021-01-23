module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{js,json,css,png,html,txt}"
  ],
  "swDest": "build/sw.js",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets'
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          // cache fonts for 7 days
          maxAgeSeconds: 60 * 60 * 24 * 7,
          maxEntries: 30
        }
      }
    }
  ]
};

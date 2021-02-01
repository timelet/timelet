import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";

declare const self: {
  __WB_MANIFEST: any;
};

const SERVICE_WORKER_NAME = "Timelet Service Worker";
const SERVICE_WORKER_VERSION = import.meta.env.SNOWPACK_PUBLIC_PACKAGE_VERSION;
const DEBUG_MODE = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
const DAY_IN_SECONDS = 24 * 60 * 60;
const MONTH_IN_SECONDS = DAY_IN_SECONDS * 30;
const YEAR_IN_SECONDS = DAY_IN_SECONDS * 365;


if (DEBUG_MODE) {
  console.debug(`Service worker version ${SERVICE_WORKER_VERSION} loading...`);
}


// ------------------------------------------------------------------------------------------
// Precaching configuration
// ------------------------------------------------------------------------------------------
cleanupOutdatedCaches();

// Make sure that all the assets passed in the array below are fetched and cached
// The empty array below is replaced at build time with the full list of assets to cache
// This is done by workbox-build-inject.js for the production build
// eslint-disable-next-line no-underscore-dangle
const assetsToCache = self.__WB_MANIFEST;
// To customize the assets afterwards:
// assetsToCache = [...assetsToCache, ???];

if (DEBUG_MODE) {
  console.trace(`${SERVICE_WORKER_NAME}:: Assets that will be cached: `, assetsToCache);
}

precacheAndRoute(assetsToCache);

// ------------------------------------------------------------------------------------------
// Routes
// ------------------------------------------------------------------------------------------

// Default page handler for offline usage,
// where the browser does not how to handle deep links
// it's a SPA, so each path that is a navigation should default to index.html
const defaultRouteHandler = createHandlerBoundToURL("/index.html");
const defaultNavigationRoute = new NavigationRoute(defaultRouteHandler, {
  // allowlist: [],
  // denylist: [],
});
registerRoute(defaultNavigationRoute);

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  }),
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: YEAR_IN_SECONDS,
        maxEntries: 30,
        purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
      }),
    ],
  }),
);

// Make JS/CSS fast by returning assets from the cache
// But make sure they're updating in the background for next use
registerRoute(/\.(?:js|css)$/, new StaleWhileRevalidate({ cacheName: 'style-script-cache'}));

// Cache images
// But clean up after a while
registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 250,
        maxAgeSeconds: MONTH_IN_SECONDS,
        purgeOnQuotaError: true, // Automatically cleanup if quota is exceeded.
      }),
    ],
  }),
);

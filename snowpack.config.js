const package = require('./package.json');
process.env.SNOWPACK_PUBLIC_PACKAGE_VERSION = package.version;
process.env.SNOWPACK_PUBLIC_SERVICE_WORKER = 'sw.js';

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: {url: '/', static: true},
    src: {url: '/dist'},
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    [
      '@snowpack/plugin-webpack',
      {
        extendConfig: (config) => {
          const { glob } = require("glob");
          const { InjectManifest } = require('workbox-webpack-plugin');
          const additionalManifestEntries = [
            ...glob.sync("*.*", {cwd: './build'}),
            ...glob.sync("icons/*", {cwd: './build'})
          ].map((e) => ({ url: e, revision: process.env.SNOWPACK_PUBLIC_PACKAGE_VERSION}));

          config.plugins.push(
            new InjectManifest({
              "additionalManifestEntries": additionalManifestEntries,
              "swSrc": "./dist/serviceWorker.js",
              "swDest": process.env.SNOWPACK_PUBLIC_SERVICE_WORKER
            })
        );
          return config;
        },
      },
    ]
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    polyfillNode: true
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};

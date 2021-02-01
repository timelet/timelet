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
          const { InjectManifest } = require('workbox-webpack-plugin');
          config.plugins.push(
            new InjectManifest({
              "globDirectory": "build/",
              "globPatterns": [
                "**/*.{js,json,css,png,html,txt}"
              ],
              "globIgnores": [
                "_snowpack/**",
                "dist/**"
              ],
              "swSrc": "src/serviceWorkerSetup.js",
              "swDest": "build/sw.js"
            })
        );
          return config;
        },
      },
    ],
    [
      '@snowpack/plugin-build-script',
      {
        input: ['serviceWorkerSetup.ts'],
        output: ['.ts'],
        cmd: 'tsc --project tsconfig.sw.json'
      }
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

const package = require('./package.json');
process.env.SNOWPACK_PUBLIC_PACKAGE_VERSION = package.version;
process.env.SNOWPACK_PUBLIC_SERVICE_WORKER = 'sw.js';

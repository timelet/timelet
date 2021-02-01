module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{js,json,css,png,html,txt}"
  ],
  "globIgnores": [
    "_snowpack/**",
    "dist/**"
  ],
  "swSrc": "build/serviceWorkerSetup.js",
  "swDest": "build/sw.js"
};

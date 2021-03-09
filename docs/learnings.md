# Learnings

This document contains the lessons learned. The following icons categorize the outcome:

- ✅ clean and good solution
- ⚠ work-around
- ⛔ unable to solve

## Material UI

- Custom styles from emotion styled are not applied due to the lower specificity. <br> ✅ It's possible to control the inject order to fix this issue: https://material-ui.com/guides/interoperability/#controlling-priority-3
- Select component doesn't work together with `react-hook-form` <br> ✅ There are different solutions for this problem: https://dev.to/raduan/4-ways-to-use-material-ui-select-with-react-hook-form-41b2

## Snowpack

- Environment variables don't work like they do in Webpack. <br> ✅ It's possible to define your own environment variables in the config `snowpack.config.js`: https://www.snowpack.dev/#environment-variables
- File references in NPM packages are not followed. <br> ⚠ The files can be mounted to the public directory: https://github.com/snowpackjs/snowpack/discussions/1573#discussioncomment-295818

## Workbox

- An error is thrown while running workbox: `node_modules/workbox-core/types.d.ts(14,12): error TS2304: Cannot find name 'ExtendableEvent'.` <br> ✅ For compilation the WebWorker library needs to be configured: https://github.com/GoogleChrome/workbox/issues/2172#issuecomment-518614955
- Workbox offers a webpack plugin, which caches all emitted assets. Unfortunately the copied files from the `public` folder are not included, because Snowpack copies them. <br> ⚠ It's possible to add some additional manifest entries manually. This is not ideal, because the selection probably needs to be upgraded when new files are added and collisions can be created.

## Misc

- In Docker containers the UI tests can run in an unsandboxed Chrome. Pupeteer needs to be configured accordingly <br> ✅ This can be done via [web-test-runner.config.js](../web-test-runner.config.js).

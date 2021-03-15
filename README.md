<img src='assets/images/timelet-128.png' align='right' alt='Timelet logo'>

# timelet

Minimal portable time tracking ⏱

- Offline first progressive web application (PWA)
- Privacy concerned
- Open source and free

## Contribute

1. Checkout the [open issues](https://github.com/timelet/timelet/issues), if you don't know what to improve
1. Create a fork, change some code and make sure it works and is properly formatted
1. Send a pull request

## Getting started

As a **user** you can install the app via our [website](https://timelet.org).

For **developers** the easiest way to get started is:

- Make sure you have [Docker](https://docs.docker.com/get-docker/) up and running
- Get [Visual Studio Code](https://code.visualstudio.com/) with [Remote Containers](https://code.visualstudio.com/docs/remote/containers) ready
- Open the project in the Remote Container and run `yarn start`
- A build can be created with `yarn build`. For testing purposes a local server can be started in the `build` directory with `python3 -m http.server`, if Python 3 is installed.
- Lint the code with `yarn check:types`, `yarn check:format` and `yarn check:lint`.
- Run tests with `yarn test`

### Internationalization

Messages can be extracted for translation and compiled again for usage.

1. Extract messages with `yarn i18n:extract --out-file assets/i18n/en.json`.
1. Compile messages with `yarn i18n:compile assets/i18n/*.en.json --ast --out-file src/i18n/en.json`.

## Resources

- Check our [learning here](./docs/learnings.md).

A list of articles and tutorials, which helped to develop this application.

- [Example: Workbox service worker with TypeScript](https://gist.github.com/dsebastien/12c47fdb6517cfdab9473297f4472d22)

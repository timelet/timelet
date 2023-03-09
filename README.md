<img src='assets/images/timelet-128.png' align='right' alt='Timelet logo'>

# timelet

Distributed collaborative offline-first time tracking ⏱

- Offline first progressive web application (PWA)
- Optional collabration
- Privacy concerned
- Open source and free

## Contribute

1. Checkout the [open issues](https://github.com/timelet/timelet/issues), if you don't know what to improve
1. Create a fork, change some code and make sure it works, is properly formatted and tested
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

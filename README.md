# timelet

<img src='assets/brand/timelet-128.png' align='right' alt='Timelet logo'>

Distributed collaborative offline-first time tracking tool

- Offline first
- Bring your own storage
- Complete control of your data
- Privacy concerned
- Plugable collaboration features
- Open source, free and easy to use

## Contribute

1. Checkout the [open issues](https://github.com/timelet/timelet/issues), if you don't know what to improve
1. Create a fork, change some code and make sure it works, is properly formatted and tested
1. Send a pull request

## Usage

As a **user** you can install the app via our [website](https://timelet.org).

For **developers** the easiest way to get started is:

1. Make sure you have [Docker](https://docs.docker.com/get-docker/) up and running
1. Get [Visual Studio Code](https://code.visualstudio.com/) with [Remote Containers](https://code.visualstudio.com/docs/remote/containers) ready
1. Open the project in the Remote Container and run `pnpm start`
1. A build can be created with `pnpm build`. For testing purposes a local server can be started in the `build` directory with `python3 -m http.server`, if Python 3 is installed.
1. Lint the code with `pnpm check:types`, `pnpm check:format` and `pnpm check:lint`.
1. Run tests with `pnpm test`

## Structure

All parts of the project live inside this monorepo.

- Apps
  - [`app`](./apps/app/): This is the projects core.
  - [`web`](./apps/web/): This is the projects website.
- Packages
  - [`ui`](./packages/ui/): Common UI components are represented inside this package.

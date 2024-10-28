# Contributing to Open Prices Frontend

## Installation

If you don't already have Node.js install, we recommend using [`nvm`](https://github.com/nvm-sh/nvm) to manage different node versions.

We use the [yarn](https://yarnpkg.com/getting-started/install) for package management.

## Run the project

1. Install/update packages with command `yarn`
2. Run in development mode with `yarn dev`

    After this you should be able to access the website at <http://localhost:5173/>.

3. Run the back-end on your device. To do so, get and run the code of the server here: <https://github.com/openfoodfacts/open-prices>.
4. You can start your first contribution :tada:

## Build

```sh
yarn build
```

## Lint

```sh
yarn lint
```

There is also a pre-commit configuration set up with [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged).

## Tests

```sh
yarn test
```

## Update packages

```sh
// 1) list packages to update
yarn upgrade-interactive --latest
// 2) update package.json by bumping all non-major updgrades
// 3) update packages
yarn install
```

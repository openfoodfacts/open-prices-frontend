# Contributing to Open Prices Frontend

## Help with translating

The translation for all openfoodfacts GitHub repositories, including this one, is done in a Crowdin project: <https://crowdin.com/project/openfoodfacts>

In Crowdin, after selecting the target language, add `open-prices-frontend` as a filter to check the translations that only belong to this GitHub repository.

## Help with developing

### Installation

If you don't already have Node.js install, we recommend using [`nvm`](https://github.com/nvm-sh/nvm) to manage different node versions.

We use the [yarn](https://yarnpkg.com/getting-started/install) for package management.

### Run the project

1. Install/update packages with command `yarn`
2. Run in development mode with `yarn dev`

   After this you should be able to access the website at <http://localhost:5173/>.

3. Run the back-end on your device. To do so, get and run the code of the server here: <https://github.com/openfoodfacts/open-prices>.
4. You can start your first contribution :tada:

### Build

```sh
yarn build
```

The build script sets `NODE_OPTIONS=--max-old-space-size=8192` to give Vite/Rollup enough heap for production bundling. This frontend includes a large generated locale data set under `src/data`, and the default Node.js heap limit can otherwise fail with `JavaScript heap out of memory` during build.

### Lint & format

We use [ESLint](https://eslint.org/) for linting and [Prettier](https://prettier.io/) for formatting.

```sh
yarn lint          # or yarn lint:fix
yarn format        # or yarn format:check
```

There is also a pre-commit configuration set up with [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/lint-staged/lint-staged).

### Git blame

Formatting-only commits (such as the Prettier reformat) are listed in `.git-blame-ignore-revs`. GitHub skips them automatically; to skip them locally as well, run once:

```sh
git config blame.ignoreRevsFile .git-blame-ignore-revs
```

### Tests

```sh
yarn test:run
```

### Update packages

```sh
# select packages to update (will also update package.json)
yarn upgrade-interactive --latest
# alternative: update package.json manually, then run
yarn install
# make a branch & commit
git checkout -b <username>/packages-update-YYYY-MM-DD
git commit -am "chore(deps): Update packages"
```

### Testing the optional Tapirscan scanner

Select Tapirscan in the existing barcode scanner preference. It uses a dedicated
worker and only EAN-13, EAN-8, UPC-A and UPC-E; Auto retains its existing choice.
Run `yarn cy:run --browser chrome --spec tests/e2e/tapirscan.cy.js` against the dev
server for permission-denial and early-close tests.

The integration uses the published Tapirscan 1.5.0 package from `yarn.lock`.
Install dependencies with `yarn install --frozen-lockfile`, then run `yarn build`.
Camera lifecycle tests simulate permission events; testing on a physical phone
is still needed.

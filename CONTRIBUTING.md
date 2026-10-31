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

To test an unreleased scanner, build a local Tapirscan checkout, then install its
npm tarball in a disposable frontend checkout:

```sh
# Tapirscan checkout (pinned toolchain required)
python3 scripts/build_wasm.py
npm ci --prefix bindings/javascript
npm run build --prefix bindings/javascript
(cd bindings/javascript && npm pack)
# Open Prices checkout
# Replace the path below with the tarball printed by npm pack.
yarn add file:/path/to/tapirscan/bindings/javascript/tapirscan-1.5.0.tgz
yarn build
```

Record the source commit and tarball SHA-256: development artifacts can share a
version number with a published package. Do not commit the local `file:` override
or its lockfile changes. This integration was also checked against development
commit `980a415b271d58738c6475bba26e56d351f3115c`; separate public-worker smoke
checks decoded Telepen, MicroPDF417 and rMQR. These formats remain outside the
product scanner's retail selection. Camera tests use simulated permission events;
physical-phone camera validation remains necessary.

# Changelog

## [1.155.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.154.2...v1.155.0) (2026-02-06)


### Features

* **Country List:** add filtering & ordering (client-side) ([#2010](https://github.com/openfoodfacts/open-prices-frontend/issues/2010)) ([00f035e](https://github.com/openfoodfacts/open-prices-frontend/commit/00f035e090c00634cb61bd3d507babc615e46d3d))
* **Experiments:** show the new Location Compare page. 2 sections Explore & Contribute ([#2019](https://github.com/openfoodfacts/open-prices-frontend/issues/2019)) ([a0dfbe6](https://github.com/openfoodfacts/open-prices-frontend/commit/a0dfbe6551380d8c627e4937d501161dda315808))
* **Location Detail:** new url with OSM type & id (will redirect to OP id) ([#1982](https://github.com/openfoodfacts/open-prices-frontend/issues/1982)) ([729fbcf](https://github.com/openfoodfacts/open-prices-frontend/commit/729fbcfc678f4dbc5c3ad24ac062a19df36219f4))
* **Locations:** new page to compare prices of 2 stores ([#2013](https://github.com/openfoodfacts/open-prices-frontend/issues/2013)) ([ed68953](https://github.com/openfoodfacts/open-prices-frontend/commit/ed689532fb62309f1ad71965bed9b8be26d03aaf))


### Bug Fixes

* **CI:** fix linting config for data JSON files ([#2016](https://github.com/openfoodfacts/open-prices-frontend/issues/2016)) ([561bbc2](https://github.com/openfoodfacts/open-prices-frontend/commit/561bbc2215c20325caacfb2a45fea3602f6f7b90))
* Fix title formatting in br.json locale ([3795c57](https://github.com/openfoodfacts/open-prices-frontend/commit/3795c57659b461d2168fbbabb0b5e933e4a2dcaa))
* **Locations:** fix api call in new OSM type/id endpoint, following [#1982](https://github.com/openfoodfacts/open-prices-frontend/issues/1982) & [#1990](https://github.com/openfoodfacts/open-prices-frontend/issues/1990) ([9b33778](https://github.com/openfoodfacts/open-prices-frontend/commit/9b33778fe85a2d8db8bbd3baf75eba9e8c39a7be))


### Technical

* **Country Card:** show the price_count chip ([#2008](https://github.com/openfoodfacts/open-prices-frontend/issues/2008)) ([865c1a6](https://github.com/openfoodfacts/open-prices-frontend/commit/865c1a6cf595b5ac2f6e0aae6eec2ca0d4eb300c))
* **l10n:** New Crowdin translations to review and merge ([#1993](https://github.com/openfoodfacts/open-prices-frontend/issues/1993)) ([0684e34](https://github.com/openfoodfacts/open-prices-frontend/commit/0684e3438466a851911472031d65e63236121f7d))
* **l10n:** New Crowdin translations to review and merge ([#2017](https://github.com/openfoodfacts/open-prices-frontend/issues/2017)) ([cf1d49f](https://github.com/openfoodfacts/open-prices-frontend/commit/cf1d49f0f5d161bf849fb2c0b6452ca777fea918))
* **Locations:** use the new backend API to fetch the list of countries ([#2007](https://github.com/openfoodfacts/open-prices-frontend/issues/2007)) ([ec21fca](https://github.com/openfoodfacts/open-prices-frontend/commit/ec21fcab4613433defc2b6873dc1200ec76c398f))
* **Stats:** add link to new Country list page ([#2009](https://github.com/openfoodfacts/open-prices-frontend/issues/2009)) ([95cb7b4](https://github.com/openfoodfacts/open-prices-frontend/commit/95cb7b4ee76679a8543a405b56a0e9ac60155161))

## [1.154.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.154.1...v1.154.2) (2026-01-19)


### Bug Fixes

* **Locations:** smarter retrieval of location country code (geo.js) ([#1995](https://github.com/openfoodfacts/open-prices-frontend/issues/1995)) ([c207786](https://github.com/openfoodfacts/open-prices-frontend/commit/c207786bba6e31a49f07b2b9a60dfdd82e7013c2))

## [1.154.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.154.0...v1.154.1) (2026-01-19)


### Bug Fixes

* **l10n:** fix weird br translation ([8b8cb56](https://github.com/openfoodfacts/open-prices-frontend/commit/8b8cb5662c287a2adde24a90f5ce56a26c8c65b1))

## [1.154.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.153.2...v1.154.0) (2026-01-19)


### Features

* **Locations:** simple country list page ([#1986](https://github.com/openfoodfacts/open-prices-frontend/issues/1986)) ([5273e99](https://github.com/openfoodfacts/open-prices-frontend/commit/5273e99e143fd84a53bb848b0a65bd327925e540))


### Technical

* **API:** split api.js into 3 files (openPrices, openFoodFacts, openStreetMap) ([#1990](https://github.com/openfoodfacts/open-prices-frontend/issues/1990)) ([0b3ed10](https://github.com/openfoodfacts/open-prices-frontend/commit/0b3ed1076c3c95111675013a6d7d675808ce1262))
* **Challenge:** add a button to see all the prices ([#1980](https://github.com/openfoodfacts/open-prices-frontend/issues/1980)) ([5439271](https://github.com/openfoodfacts/open-prices-frontend/commit/54392719ae467d87f419f404e0e662e77d978da1))
* **Country Card:** use existing CountryCityChip. simplify stuff ([#1988](https://github.com/openfoodfacts/open-prices-frontend/issues/1988)) ([2d06ac7](https://github.com/openfoodfacts/open-prices-frontend/commit/2d06ac76956398cc021d925ca5d890161a5fb907))
* **Country List:** improve breadcrumbs ([#1987](https://github.com/openfoodfacts/open-prices-frontend/issues/1987)) ([13295d1](https://github.com/openfoodfacts/open-prices-frontend/commit/13295d1d650d6d7b17a260bfa7d6aacacb4843d8))
* **l10n:** New Crowdin translations to review and merge ([#1969](https://github.com/openfoodfacts/open-prices-frontend/issues/1969)) ([2c57c85](https://github.com/openfoodfacts/open-prices-frontend/commit/2c57c85f307412e681ea13eb118d6422d23af082))
* **Locations:** generate country emoji from unicode instead of JSON ([#1989](https://github.com/openfoodfacts/open-prices-frontend/issues/1989)) ([a7c1bd5](https://github.com/openfoodfacts/open-prices-frontend/commit/a7c1bd5dcd2c875ecf6fec9fb2603c61619439f8))
* **Locations:** new script to generate countries JSON from the OFF taxonomy ([#1985](https://github.com/openfoodfacts/open-prices-frontend/issues/1985)) ([6a4e1c1](https://github.com/openfoodfacts/open-prices-frontend/commit/6a4e1c19c0eedb0d8dece826256fa5bc94491483))

## [1.153.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.153.1...v1.153.2) (2026-01-16)


### Bug Fixes

* **Proof Detail:** make the proof footer chips cliquable again ([6570c94](https://github.com/openfoodfacts/open-prices-frontend/commit/6570c9441a30e875f46e22e8b80f92ff9b051004))
* **Receipt Assistant:** load max 100 predicted receipt items (instead of max 25) ([#1979](https://github.com/openfoodfacts/open-prices-frontend/issues/1979)) ([9d58939](https://github.com/openfoodfacts/open-prices-frontend/commit/9d5893922150cbcdfb2b090a2e6ffa80452ac789))
* **StatsLastUpdatedAlert:** forgot import in ChallengeDetail page. ref [#1976](https://github.com/openfoodfacts/open-prices-frontend/issues/1976) ([a41d7f3](https://github.com/openfoodfacts/open-prices-frontend/commit/a41d7f35cff7a87f38fdeba5b09f4474f05e39e1))


### Technical

* **Stats:** move the 'last updated' sentence in a dedicated (alert) component ([#1976](https://github.com/openfoodfacts/open-prices-frontend/issues/1976)) ([5219163](https://github.com/openfoodfacts/open-prices-frontend/commit/52191631d4f91b55dace429749cc8a2e67be07fc))

## [1.153.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.153.0...v1.153.1) (2026-01-14)


### Bug Fixes

* **Receipt Assistant:** fix price creation following last PR [#1966](https://github.com/openfoodfacts/open-prices-frontend/issues/1966) ([a21c11b](https://github.com/openfoodfacts/open-prices-frontend/commit/a21c11b2d8afe1b51b1d4f08e44ec5e5fda797a5))

## [1.153.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.152.0...v1.153.0) (2026-01-14)


### Features

* **PriceAddValidate:** Add user country filter ([#1967](https://github.com/openfoodfacts/open-prices-frontend/issues/1967)) ([ebe3d9a](https://github.com/openfoodfacts/open-prices-frontend/commit/ebe3d9ac0e9e8ab62c481a3dff04445749986bbc))
* **Proof Upload:** improve receipt assistant (schema v2) ([#1966](https://github.com/openfoodfacts/open-prices-frontend/issues/1966)) ([2f1f554](https://github.com/openfoodfacts/open-prices-frontend/commit/2f1f554bc4c867697f3fe702b99dfa867c2ebb60))


### Technical

* **Alerts:** new DeprecatedAlert dedicated component ([#1963](https://github.com/openfoodfacts/open-prices-frontend/issues/1963)) ([4c3b7ab](https://github.com/openfoodfacts/open-prices-frontend/commit/4c3b7ab77e4275081bdc04e9b755513ef50d228c))
* **FilterMenu:** replace circle with checkbox (multiselect is possible) ([#1968](https://github.com/openfoodfacts/open-prices-frontend/issues/1968)) ([3cb3b92](https://github.com/openfoodfacts/open-prices-frontend/commit/3cb3b925dd40fd1ee14a7897e8c1425e0e73e47b))
* **l10n:** New Crowdin translations to review and merge ([#1962](https://github.com/openfoodfacts/open-prices-frontend/issues/1962)) ([72338a3](https://github.com/openfoodfacts/open-prices-frontend/commit/72338a3d819cb509ba09f2e41f45814576c868c6))

## [1.152.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.151.0...v1.152.0) (2026-01-04)


### Features

* **Proof Upload:** if receipt, add an action step + default to the Receipt Assistant ([#1827](https://github.com/openfoodfacts/open-prices-frontend/issues/1827)) ([53bdc65](https://github.com/openfoodfacts/open-prices-frontend/commit/53bdc651855a9d84e98014aa96f7499332e39c06))


### Bug Fixes

* **i18n:** remove unused translation added in [#1961](https://github.com/openfoodfacts/open-prices-frontend/issues/1961) ([63a6a3f](https://github.com/openfoodfacts/open-prices-frontend/commit/63a6a3f41d88fce8565f643ee38e4f0eaebaa651))


### Technical

* **deps:** bump toshimaru/auto-author-assign from 2.1.1 to 3.0.1 ([#1954](https://github.com/openfoodfacts/open-prices-frontend/issues/1954)) ([3812a29](https://github.com/openfoodfacts/open-prices-frontend/commit/3812a29e5d55f0d29fdf25a2144fee1490a778be))
* **l10n:** New Crowdin translations to review and merge ([#1956](https://github.com/openfoodfacts/open-prices-frontend/issues/1956)) ([facb812](https://github.com/openfoodfacts/open-prices-frontend/commit/facb812ca2329a313d8ddbe1ebfd0e5d42a32637))
* **Product Detail:** if product missing, new promo banner to talk about the CreateOffProduct experiment ([#1959](https://github.com/openfoodfacts/open-prices-frontend/issues/1959)) ([27b1a20](https://github.com/openfoodfacts/open-prices-frontend/commit/27b1a20c8968302bd83610f3f7cbeeff9ddcae13))
* **Product Detail:** move Product & Category not found alerts to dedicated components ([#1957](https://github.com/openfoodfacts/open-prices-frontend/issues/1957)) ([0585939](https://github.com/openfoodfacts/open-prices-frontend/commit/058593997530d95a241294a223b9459723be5b3d))
* **Proof Upload:** in action step, change the default action to primary color ([#1961](https://github.com/openfoodfacts/open-prices-frontend/issues/1961)) ([141a951](https://github.com/openfoodfacts/open-prices-frontend/commit/141a9517b71960d62af1a9b60e5b5858db8c42fb))
* **Steppers:** move each step in a template tag. Don't show 'action' step as complete ([#1960](https://github.com/openfoodfacts/open-prices-frontend/issues/1960)) ([d4b8096](https://github.com/openfoodfacts/open-prices-frontend/commit/d4b8096e3d2053afac07ece9dc8429376f0b67c7))
* Update runner to use ubuntu-latest ([790469e](https://github.com/openfoodfacts/open-prices-frontend/commit/790469e79ad7dd3148962d28ebb74adc839da8b4))

## [1.151.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.150.5...v1.151.0) (2025-12-29)


### Features

* **Prices:** allow editing a price's product ([#1947](https://github.com/openfoodfacts/open-prices-frontend/issues/1947)) ([f9b8f8e](https://github.com/openfoodfacts/open-prices-frontend/commit/f9b8f8e089580f5c773f7086c9f75b64857ab4b2))


### Bug Fixes

* **Alerts:** use 'color' instead of 'type' to set to primary color (following [#1943](https://github.com/openfoodfacts/open-prices-frontend/issues/1943)) ([201b50e](https://github.com/openfoodfacts/open-prices-frontend/commit/201b50edf7a6791175f0e779003956fdfa88b9d8))
* **Banners:** fix banner action button position (following [#1929](https://github.com/openfoodfacts/open-prices-frontend/issues/1929)) ([35af34c](https://github.com/openfoodfacts/open-prices-frontend/commit/35af34c6a7facd0224663c0cf7ebb395f4816aad))
* **Location Card:** fix display of DetailsRow & FooterRow on non-OP locations (following [#1940](https://github.com/openfoodfacts/open-prices-frontend/issues/1940)) ([3fda626](https://github.com/openfoodfacts/open-prices-frontend/commit/3fda62613e95f448bbabf5ed47be91009caa5620))


### Technical

* **Challenges:** dedicated component for the 'new idea form' alert ([#1949](https://github.com/openfoodfacts/open-prices-frontend/issues/1949)) ([b89bdb4](https://github.com/openfoodfacts/open-prices-frontend/commit/b89bdb42714d6ad07b7fa1027af38da8b45935e7))
* **l10n:** New Crowdin translations to review and merge ([#1951](https://github.com/openfoodfacts/open-prices-frontend/issues/1951)) ([6b853a4](https://github.com/openfoodfacts/open-prices-frontend/commit/6b853a42cced39bba3daeab4c0db6fbde8f14f69))
* **Reuses:** dedicated component for the 'new reuse form' alert ([#1950](https://github.com/openfoodfacts/open-prices-frontend/issues/1950)) ([ddf1754](https://github.com/openfoodfacts/open-prices-frontend/commit/ddf1754bebbdcaa1b24ef336545633944965d51c))

## [1.150.5](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.150.4...v1.150.5) (2025-12-28)


### Bug Fixes

* **Challenge:** fix challenge banner action button position (following [#1929](https://github.com/openfoodfacts/open-prices-frontend/issues/1929)) ([fb55440](https://github.com/openfoodfacts/open-prices-frontend/commit/fb55440195ce69cbb01e2c9dbfca559e02846b7c))
* **Community:** improve list display by using ul/li (following [#1032](https://github.com/openfoodfacts/open-prices-frontend/issues/1032)) ([d142d46](https://github.com/openfoodfacts/open-prices-frontend/commit/d142d467c6d6394f419ff5ce05f943a905f01323))
* **Contribute:** improve list display by using ul/li (following [#1520](https://github.com/openfoodfacts/open-prices-frontend/issues/1520)) ([3c30d61](https://github.com/openfoodfacts/open-prices-frontend/commit/3c30d610af8c9719312a74eddab1b8175eddc76c))


### Technical

* **AI:** move all alerts inside a dedicated component ([#1945](https://github.com/openfoodfacts/open-prices-frontend/issues/1945)) ([65361c3](https://github.com/openfoodfacts/open-prices-frontend/commit/65361c3930e99447472bcf3adafa9aac0f5b8832))
* **Display Menu:** rename internal functions ([#1937](https://github.com/openfoodfacts/open-prices-frontend/issues/1937)) ([9370f24](https://github.com/openfoodfacts/open-prices-frontend/commit/9370f243187859743daedff2872895517a53c063))
* **l10n:** New Crowdin translations to review and merge ([#1944](https://github.com/openfoodfacts/open-prices-frontend/issues/1944)) ([db51f91](https://github.com/openfoodfacts/open-prices-frontend/commit/db51f9158cfbd23f9260abee9410df26e6fa3715))
* **Location Detail:** better manage 404 error ([#1940](https://github.com/openfoodfacts/open-prices-frontend/issues/1940)) ([657014e](https://github.com/openfoodfacts/open-prices-frontend/commit/657014ecc8da5459092161ad61f51359553c7aa4))
* **Order Menu:** rename internal functions ([#1935](https://github.com/openfoodfacts/open-prices-frontend/issues/1935)) ([6b63591](https://github.com/openfoodfacts/open-prices-frontend/commit/6b63591ccded0c88b56df83c3614afb7156a63bb))
* **Proof Detail:** better manage 404 error ([#1939](https://github.com/openfoodfacts/open-prices-frontend/issues/1939)) ([b02353d](https://github.com/openfoodfacts/open-prices-frontend/commit/b02353d9c61914fb0fd6eeb75a12750f2a925ab3))
* **UI:** always hide filter/order/display menus if data is loading ([#1938](https://github.com/openfoodfacts/open-prices-frontend/issues/1938)) ([01ae365](https://github.com/openfoodfacts/open-prices-frontend/commit/01ae365c72604be8daa90397f845c8b299252177))
* **UI:** replace alert info (blue) color with primary (brown) ([#1943](https://github.com/openfoodfacts/open-prices-frontend/issues/1943)) ([c1e2ac1](https://github.com/openfoodfacts/open-prices-frontend/commit/c1e2ac1e414d73ebbf63d47d3547f426f1e8908a))
* **User Detail:** better manage 404 error ([#1942](https://github.com/openfoodfacts/open-prices-frontend/issues/1942)) ([d7d7b66](https://github.com/openfoodfacts/open-prices-frontend/commit/d7d7b6629f8adf690ad8a7686825db2f7afd3050))

## [1.150.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.150.3...v1.150.4) (2025-12-23)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1920](https://github.com/openfoodfacts/open-prices-frontend/issues/1920)) ([6f0b6ac](https://github.com/openfoodfacts/open-prices-frontend/commit/6f0b6ac0039eb40730575bccb81b8e9d23d0e699))
* **Product Card:** only display ProductSourceChip if the product has a source (avoids duplicate message) ([#1930](https://github.com/openfoodfacts/open-prices-frontend/issues/1930)) ([093a6d9](https://github.com/openfoodfacts/open-prices-frontend/commit/093a6d91bf021abe62b4f193816830062a86e794))
* **Proof Upload:** add a help text on the date field ([#1924](https://github.com/openfoodfacts/open-prices-frontend/issues/1924)) ([7d4e8cd](https://github.com/openfoodfacts/open-prices-frontend/commit/7d4e8cd54962667541d23cb644a4059f5512d8fa))
* **Proof upload:** add form label for location & picture(s) input ([#1919](https://github.com/openfoodfacts/open-prices-frontend/issues/1919)) ([f4700ab](https://github.com/openfoodfacts/open-prices-frontend/commit/f4700ab5e4f1c55468b94c215bbad11cc4ea3096))
* **Proof Upload:** move receipt privacy warning at the top ([#1932](https://github.com/openfoodfacts/open-prices-frontend/issues/1932)) ([d63081e](https://github.com/openfoodfacts/open-prices-frontend/commit/d63081e42130902f73bff8a3c9c710ff5a40c261))

## [1.150.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.150.2...v1.150.3) (2025-12-21)


### Technical

* **Challenge:** homogenize banner with other banners. Fully clickable ([#1929](https://github.com/openfoodfacts/open-prices-frontend/issues/1929)) ([6c7122f](https://github.com/openfoodfacts/open-prices-frontend/commit/6c7122f73ba7cf5329a1024787a9df866cf8e29d))
* **Moderation:** move all alert inside a dedicated component. Make them compact ([#1925](https://github.com/openfoodfacts/open-prices-frontend/issues/1925)) ([36700a0](https://github.com/openfoodfacts/open-prices-frontend/commit/36700a0f124f67d39c4dfc6589e3f8404044aa98))
* **UI:** make alert & banner look similar and more compact ([#1928](https://github.com/openfoodfacts/open-prices-frontend/issues/1928)) ([7c87aa6](https://github.com/openfoodfacts/open-prices-frontend/commit/7c87aa6434e699d4a8636cc6157c2be542eb911e))
* **UI:** make alert compact everywhere ([#1927](https://github.com/openfoodfacts/open-prices-frontend/issues/1927)) ([599c73d](https://github.com/openfoodfacts/open-prices-frontend/commit/599c73de21436db3e5a0fd7147dca33905ac843f))
* **UI:** make alert compact everywhere (extra commit after [#1927](https://github.com/openfoodfacts/open-prices-frontend/issues/1927)) ([7d6ba6e](https://github.com/openfoodfacts/open-prices-frontend/commit/7d6ba6eb635ec5bdd3b5fc4a41365ec73f26cf4e))

## [1.150.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.150.1...v1.150.2) (2025-12-20)


### Technical

* **Proof upload:** homogenize spacing between form items. Remove useless margin classes ([#1918](https://github.com/openfoodfacts/open-prices-frontend/issues/1918)) ([04cf038](https://github.com/openfoodfacts/open-prices-frontend/commit/04cf03832e2efcfe5f31a9737688d5edaac7b18d))
* **Proof upload:** move 2 alerts in their own components ([#1922](https://github.com/openfoodfacts/open-prices-frontend/issues/1922)) ([e60062a](https://github.com/openfoodfacts/open-prices-frontend/commit/e60062acd9bb18574d80a37ee2810470f2f2fa59))
* **Proof upload:** move the existing alert (or banner) above the form ([#1921](https://github.com/openfoodfacts/open-prices-frontend/issues/1921)) ([a8db382](https://github.com/openfoodfacts/open-prices-frontend/commit/a8db3824b2908a2ada0f04e2618d034f21d880b7))

## [1.150.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.150.0...v1.150.1) (2025-12-19)


### Technical

* **Cards:** avoid having chips that touch each other ([#1915](https://github.com/openfoodfacts/open-prices-frontend/issues/1915)) ([4d392a7](https://github.com/openfoodfacts/open-prices-frontend/commit/4d392a71c75a97e4c660462b18f04bb5450181f3))
* **deps:** Update packages (vue v3.5.26 & vuetify v3.11.4) ([#1917](https://github.com/openfoodfacts/open-prices-frontend/issues/1917)) ([bc2c3cb](https://github.com/openfoodfacts/open-prices-frontend/commit/bc2c3cbf5d99e0e0a26ef4bbaadb089d63328521))
* **l10n:** New Crowdin translations to review and merge ([#1907](https://github.com/openfoodfacts/open-prices-frontend/issues/1907)) ([8a1570c](https://github.com/openfoodfacts/open-prices-frontend/commit/8a1570cb481f9106b9a592162912ee925d297438))
* **Stats:** clarify some stats cards (more space per source, add flavor icon) ([#1905](https://github.com/openfoodfacts/open-prices-frontend/issues/1905)) ([98f16e2](https://github.com/openfoodfacts/open-prices-frontend/commit/98f16e23eebb1537c7cd84914c64b4a638319279))

## [1.150.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.149.1...v1.150.0) (2025-12-07)


### Features

* **Proof Upload:** make the PriceTagMultiple uploader the default ([#1641](https://github.com/openfoodfacts/open-prices-frontend/issues/1641)) ([02bfd20](https://github.com/openfoodfacts/open-prices-frontend/commit/02bfd20c5e9abe9a64993b94251c99b9ff39570e))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1894](https://github.com/openfoodfacts/open-prices-frontend/issues/1894)) ([c629471](https://github.com/openfoodfacts/open-prices-frontend/commit/c629471bad0ffb407d0a1c56e206c38b0cf7c1eb))
* **Proof Upload:** show uploaded & remaining count in the progress bar ([#1904](https://github.com/openfoodfacts/open-prices-frontend/issues/1904)) ([ed5e495](https://github.com/openfoodfacts/open-prices-frontend/commit/ed5e4952885d755474c3627fbf3ac05b12a062f1))

## [1.149.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.149.0...v1.149.1) (2025-12-06)


### Bug Fixes

* **Location Card:** fix selecting location from search results (following [#1891](https://github.com/openfoodfacts/open-prices-frontend/issues/1891)) ([ec311c1](https://github.com/openfoodfacts/open-prices-frontend/commit/ec311c157f185d9eda72484b2dfff34a1d3f2ea5))


### Technical

* **deps:** bump actions/checkout from 5 to 6 ([#1898](https://github.com/openfoodfacts/open-prices-frontend/issues/1898)) ([4456b68](https://github.com/openfoodfacts/open-prices-frontend/commit/4456b68cd252bf59c241b44f41f8c69d90337fd0))
* **deps:** bump vue-i18n from 9.14.1 to 9.14.5 ([#1900](https://github.com/openfoodfacts/open-prices-frontend/issues/1900)) ([41cf42a](https://github.com/openfoodfacts/open-prices-frontend/commit/41cf42acbcc8359c249bc349b1b75a08b1935d94))
* **Price Tags:** display image from server image_path instead of on-the-fly cropping ([#1899](https://github.com/openfoodfacts/open-prices-frontend/issues/1899)) ([a7528a5](https://github.com/openfoodfacts/open-prices-frontend/commit/a7528a5d01550c6d02d4c9001be5dc2ba6e62b50))
* **User Card:** new UserFooterRow component ([#1897](https://github.com/openfoodfacts/open-prices-frontend/issues/1897)) ([285cbc9](https://github.com/openfoodfacts/open-prices-frontend/commit/285cbc99a605da15a5b45cd26c686c5146c68a94))
* **User Card:** revamp in the same style as Location & Product cards ([#1895](https://github.com/openfoodfacts/open-prices-frontend/issues/1895)) ([fa3d8b6](https://github.com/openfoodfacts/open-prices-frontend/commit/fa3d8b64d8cf702e3c15b88504509f2bd9fc6b44))

## [1.149.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.148.0...v1.149.0) (2025-11-30)


### Features

* **Locations:** fetch shop logos from openfoodfacts/brand-images ([#1881](https://github.com/openfoodfacts/open-prices-frontend/issues/1881)) ([0726ec7](https://github.com/openfoodfacts/open-prices-frontend/commit/0726ec771e8d2985cc9d120e177ce3766950e94f))


### Bug Fixes

* **CreateOffProduct:** allow passing unit in the quantity field (mobile) ([#1882](https://github.com/openfoodfacts/open-prices-frontend/issues/1882)) ([b3636c9](https://github.com/openfoodfacts/open-prices-frontend/commit/b3636c96368630d2ccb845fd74e2a79f72611a38))
* **Location Card:** fix location selection following [#1889](https://github.com/openfoodfacts/open-prices-frontend/issues/1889) ([bc00d1d](https://github.com/openfoodfacts/open-prices-frontend/commit/bc00d1d135196864ca10857469a2fd23c52c91de))


### Technical

* add basic Copilot instructions (Vue, JS) ([#1886](https://github.com/openfoodfacts/open-prices-frontend/issues/1886)) ([d4a1a6d](https://github.com/openfoodfacts/open-prices-frontend/commit/d4a1a6d1052544c175a102c95f64258eea1f9efa))
* **Cards:** homogenize padding & layout between Product, Price & Location cards. Avoid using v-container ([#1893](https://github.com/openfoodfacts/open-prices-frontend/issues/1893)) ([dcbf2d4](https://github.com/openfoodfacts/open-prices-frontend/commit/dcbf2d4683d6cfa7ff5a07c318d6927d8d41a12c))
* **l10n:** New Crowdin translations to review and merge ([#1875](https://github.com/openfoodfacts/open-prices-frontend/issues/1875)) ([eadaa16](https://github.com/openfoodfacts/open-prices-frontend/commit/eadaa16edc3fa7b5f26dc7673c63ed2c29ce0520))
* **Location Card:** new LocationDetailsRow component. improve card title ([#1887](https://github.com/openfoodfacts/open-prices-frontend/issues/1887)) ([a87f7ba](https://github.com/openfoodfacts/open-prices-frontend/commit/a87f7ba8109c7a4c4c679c1bdc1fb417b37249f2))
* **Location Card:** new LocationFooterRow component ([#1885](https://github.com/openfoodfacts/open-prices-frontend/issues/1885)) ([bbc775c](https://github.com/openfoodfacts/open-prices-frontend/commit/bbc775ceb5e2b0eeb3fc96eb05d269a4c96f552a))
* **Location Card:** new UserCountChip component ([#1883](https://github.com/openfoodfacts/open-prices-frontend/issues/1883)) ([54cf9d1](https://github.com/openfoodfacts/open-prices-frontend/commit/54cf9d1a10926a4c41cfe66e9a42accd70005f1c))
* **Location Card:** remove old unused LocationCard & LocationRecentChip ([#1890](https://github.com/openfoodfacts/open-prices-frontend/issues/1890)) ([3169644](https://github.com/openfoodfacts/open-prices-frontend/commit/31696448de622ee67f34500aa2236d858e5bb5ba))
* **Location Card:** rename LocationSearchResultCard to LocationCard ([#1891](https://github.com/openfoodfacts/open-prices-frontend/issues/1891)) ([85510bc](https://github.com/openfoodfacts/open-prices-frontend/commit/85510bc85c80dd1756c66ef4dd6024e39d0fc200))
* **Location Card:** use the LocationSearchResultCard everywhere ([#1889](https://github.com/openfoodfacts/open-prices-frontend/issues/1889)) ([b5cef58](https://github.com/openfoodfacts/open-prices-frontend/commit/b5cef582d4eb67861cd4d9d03756205dfc6b585d))

## [1.148.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.147.2...v1.148.0) (2025-11-27)


### Features

* **Proofs:** allow editing a proof's location ([#1879](https://github.com/openfoodfacts/open-prices-frontend/issues/1879)) ([a746df0](https://github.com/openfoodfacts/open-prices-frontend/commit/a746df0b1f5da3fd47f740b24a06eea169ce9c2f))


### Bug Fixes

* **Cards:** avoid line jump for cards with top-right edit action ([#1880](https://github.com/openfoodfacts/open-prices-frontend/issues/1880)) ([80735a3](https://github.com/openfoodfacts/open-prices-frontend/commit/80735a31e2158b36ec650c156888ea7784795443))


### Technical

* **Price input:** simplify using recent methods moved to price_utils (in [#1876](https://github.com/openfoodfacts/open-prices-frontend/issues/1876)) ([#1878](https://github.com/openfoodfacts/open-prices-frontend/issues/1878)) ([74b48df](https://github.com/openfoodfacts/open-prices-frontend/commit/74b48df58bbf243f8d6079ca4ddf64adea501b5c))
* **Prices:** new PriceDiscountChip component ([#1876](https://github.com/openfoodfacts/open-prices-frontend/issues/1876)) ([e053fad](https://github.com/openfoodfacts/open-prices-frontend/commit/e053fad4ed45a642b2258dd63204f79c1c0a3674))
* **Receipt Assistant:** more small UI improvements ([#1862](https://github.com/openfoodfacts/open-prices-frontend/issues/1862)) ([fae33c0](https://github.com/openfoodfacts/open-prices-frontend/commit/fae33c086510493df7cbe2572640901e5dcb7273))

## [1.147.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.147.1...v1.147.2) (2025-11-23)


### Bug Fixes

* **Icons:** move to root public folder to avoid 404 ([#1874](https://github.com/openfoodfacts/open-prices-frontend/issues/1874)) ([0997490](https://github.com/openfoodfacts/open-prices-frontend/commit/09974909f1406286af610af2e9ea371e999830d5))


### Technical

* cleanup public/img folder. Add common icons ([#1872](https://github.com/openfoodfacts/open-prices-frontend/issues/1872)) ([0d6d7c8](https://github.com/openfoodfacts/open-prices-frontend/commit/0d6d7c8880fc9320c1dfc08b8fde1cdcaae971a8))
* **l10n:** New Crowdin translations to review and merge ([#1863](https://github.com/openfoodfacts/open-prices-frontend/issues/1863)) ([fa2cf43](https://github.com/openfoodfacts/open-prices-frontend/commit/fa2cf430f6ca59e9d31206a2fa335314a58d58b2))
* **Location input:** merge LocationSearchResultCard & Location selection together ([#1871](https://github.com/openfoodfacts/open-prices-frontend/issues/1871)) ([bc4a5bb](https://github.com/openfoodfacts/open-prices-frontend/commit/bc4a5bbbbfb01d6695650a5531838ef4da691f76))
* **Location Selector:** new LocationSearchResultCard component ([#1867](https://github.com/openfoodfacts/open-prices-frontend/issues/1867)) ([24f17eb](https://github.com/openfoodfacts/open-prices-frontend/commit/24f17ebf956731d1ea85b89672f67c0b171e2fdc))
* **Location Selector:** use LocationSearchResultCard to display the recent list ([#1870](https://github.com/openfoodfacts/open-prices-frontend/issues/1870)) ([0a9ddf7](https://github.com/openfoodfacts/open-prices-frontend/commit/0a9ddf75f4822600bbab8ad33406e9e6e33a1bad))
* **Locations:** new CountryCityChip component ([#1869](https://github.com/openfoodfacts/open-prices-frontend/issues/1869)) ([beeae33](https://github.com/openfoodfacts/open-prices-frontend/commit/beeae33be7c7518063d2b1a077f610e648916eff))
* **Price Table:** add translations. Use existing sub components ([#1859](https://github.com/openfoodfacts/open-prices-frontend/issues/1859)) ([d648f2f](https://github.com/openfoodfacts/open-prices-frontend/commit/d648f2f33ca1720ff50008a45187b06693f59c17))
* **PriceCategoryDetailsRow:** add option to display the price's category_tag chip before the origins & labels ([#1860](https://github.com/openfoodfacts/open-prices-frontend/issues/1860)) ([e4e64be](https://github.com/openfoodfacts/open-prices-frontend/commit/e4e64be599ffb96e58fb6bd62ff6880760f7295b))
* **PriceInputRow:** better manage formFilled event. Include price_per missing error message. refactoor with ProductInputRow ([#1866](https://github.com/openfoodfacts/open-prices-frontend/issues/1866)) ([2737b0c](https://github.com/openfoodfacts/open-prices-frontend/commit/2737b0c4e93098061037bec4362f7c59ef5a1af4))
* **PriceInputRow:** new pricePerQuantity method. refactor with PricePriceRow ([#1865](https://github.com/openfoodfacts/open-prices-frontend/issues/1865)) ([cfee7eb](https://github.com/openfoodfacts/open-prices-frontend/commit/cfee7eb3f53de1932bb3b63670c469299fc3e57f))
* **PriceQuantityPurchasedChip:** remove hard-coded margin-left class ([#1864](https://github.com/openfoodfacts/open-prices-frontend/issues/1864)) ([c530d6e](https://github.com/openfoodfacts/open-prices-frontend/commit/c530d6ecf13048c277e8172f29a2e5a747a250bc))
* **ProductCard:** for fallback (default) image, use local icon instead of fetching it from an external URL ([#1873](https://github.com/openfoodfacts/open-prices-frontend/issues/1873)) ([1d03a9b](https://github.com/openfoodfacts/open-prices-frontend/commit/1d03a9b6f08db19fb01b67c194bcd85244318d9a))

## [1.147.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.147.0...v1.147.1) (2025-11-23)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1851](https://github.com/openfoodfacts/open-prices-frontend/issues/1851)) ([9cd65a1](https://github.com/openfoodfacts/open-prices-frontend/commit/9cd65a185e93ced17736f41cab09019aa941c903))
* **Price Validation Assistant:** remove from experiments. change URL (with redirection) ([#1848](https://github.com/openfoodfacts/open-prices-frontend/issues/1848)) ([5cf5d6e](https://github.com/openfoodfacts/open-prices-frontend/commit/5cf5d6e100628fd884c528032f56b4cc88c83d2f))
* **Price:** simplify origins_tags & labels_tags Array management ([#1853](https://github.com/openfoodfacts/open-prices-frontend/issues/1853)) ([562e658](https://github.com/openfoodfacts/open-prices-frontend/commit/562e65840ff3156be694b75dc215d2db87053c73))
* **Receipt Assistant:** move error message to new status column ([#1793](https://github.com/openfoodfacts/open-prices-frontend/issues/1793)) ([ba9bd45](https://github.com/openfoodfacts/open-prices-frontend/commit/ba9bd4552ba934965a4490aa08ccd68d2e49d7f9))
* **Receipt Assistant:** refactor and simplify item management. show category origin & label ([#1852](https://github.com/openfoodfacts/open-prices-frontend/issues/1852)) ([ba2eb2f](https://github.com/openfoodfacts/open-prices-frontend/commit/ba2eb2f1d3139f426aaa198627bc20145222da98))
* **Receipt Assistant:** various adjustements (mobile grid layout, shorter labels) ([#1849](https://github.com/openfoodfacts/open-prices-frontend/issues/1849)) ([7d72970](https://github.com/openfoodfacts/open-prices-frontend/commit/7d72970f7a621affbd327f43e8787b5d31b95dfd))

## [1.147.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.146.1...v1.147.0) (2025-11-22)


### Features

* **Moderation:** allow moderators to edit flag status ([#1846](https://github.com/openfoodfacts/open-prices-frontend/issues/1846)) ([6b4bd2d](https://github.com/openfoodfacts/open-prices-frontend/commit/6b4bd2d8ce67a574caf712078bfc17db51ff88f8))
* **Moderation:** new page to view all flags (only for moderators) ([#1844](https://github.com/openfoodfacts/open-prices-frontend/issues/1844)) ([92a4581](https://github.com/openfoodfacts/open-prices-frontend/commit/92a4581e463aaeb132ce5967e156b749290d3dfe))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1845](https://github.com/openfoodfacts/open-prices-frontend/issues/1845)) ([1b19254](https://github.com/openfoodfacts/open-prices-frontend/commit/1b19254e48467199edd8ace5d201faace384937d))

## [1.146.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.146.0...v1.146.1) (2025-11-17)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1841](https://github.com/openfoodfacts/open-prices-frontend/issues/1841)) ([6db226f](https://github.com/openfoodfacts/open-prices-frontend/commit/6db226f8a79ab2f07cbea88e56e0e379d941b09a))
* **Location selector:** when searching my OSM id, remove the osm type filtering ([#1842](https://github.com/openfoodfacts/open-prices-frontend/issues/1842)) ([8a10eb7](https://github.com/openfoodfacts/open-prices-frontend/commit/8a10eb7df2553649d5ce37aab009a78739ab39a9))
* **Proof Price Tag Assistant:** only newly created labels can be deleted ([#1839](https://github.com/openfoodfacts/open-prices-frontend/issues/1839)) ([c67df57](https://github.com/openfoodfacts/open-prices-frontend/commit/c67df57037a307dc7ac56ad109fadba3f8dccedc))
* **Proof Price Tag Assistant:** replace ContributionAssistantLabelList with ContributionAssistantLabelCard component ([#1837](https://github.com/openfoodfacts/open-prices-frontend/issues/1837)) ([1ef1636](https://github.com/openfoodfacts/open-prices-frontend/commit/1ef1636327a5b4409054c20c8cf71f2416eee7f9))
* **Proof Price Tag Assistant:** show canvas label in card footer. refactor stuff ([#1840](https://github.com/openfoodfacts/open-prices-frontend/issues/1840)) ([0deb6cb](https://github.com/openfoodfacts/open-prices-frontend/commit/0deb6cb7191a52df532b0715f4da58bc3a3c8672))

## [1.146.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.145.1...v1.146.0) (2025-11-16)


### Features

* **Moderation:** allow logged-in users to flag prices ([#1823](https://github.com/openfoodfacts/open-prices-frontend/issues/1823)) ([ad0ce53](https://github.com/openfoodfacts/open-prices-frontend/commit/ad0ce5386cb02a030fb621c6d0d9dd89a6509aec))
* **Moderation:** allow logged-in users to flag proofs ([#1825](https://github.com/openfoodfacts/open-prices-frontend/issues/1825)) ([fb9d8bf](https://github.com/openfoodfacts/open-prices-frontend/commit/fb9d8bf2413390d2466617a458498498abddeb70))


### Technical

* **Dialogs:** cleaner UI (remove space & divider) for edit, delete & flag dialogs (price & proof) ([#1835](https://github.com/openfoodfacts/open-prices-frontend/issues/1835)) ([eb333eb](https://github.com/openfoodfacts/open-prices-frontend/commit/eb333ebb755eb8c0dff10d60dc2fb7da8a82069e))
* **Forms:** homogenize all input labels to text-body-2 ([#1834](https://github.com/openfoodfacts/open-prices-frontend/issues/1834)) ([7bb317f](https://github.com/openfoodfacts/open-prices-frontend/commit/7bb317fe82f2a4c95cb383d841cc9c6ba084316f))
* **l10n:** New Crowdin translations to review and merge ([#1831](https://github.com/openfoodfacts/open-prices-frontend/issues/1831)) ([edd878b](https://github.com/openfoodfacts/open-prices-frontend/commit/edd878b5aacac41c95bf17390f03bf783b156fa4))
* **Moderation:** add extra flag reason options ([#1833](https://github.com/openfoodfacts/open-prices-frontend/issues/1833)) ([f8da9be](https://github.com/openfoodfacts/open-prices-frontend/commit/f8da9be731c652f53bdb9277c45500ce516b8b6f))
* **Price input:** remove unused/old currency selector ([#1836](https://github.com/openfoodfacts/open-prices-frontend/issues/1836)) ([65ae611](https://github.com/openfoodfacts/open-prices-frontend/commit/65ae6111c3f05fe1d992c60747e04098164e137e))

## [1.145.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.145.0...v1.145.1) (2025-11-15)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1810](https://github.com/openfoodfacts/open-prices-frontend/issues/1810)) ([1a195f0](https://github.com/openfoodfacts/open-prices-frontend/commit/1a195f0be1c91aa7b807f73ef083086b0c98e6ef))
* **Price Validation Assistant:** make the 'fix' mode the default + remove the button ([#1822](https://github.com/openfoodfacts/open-prices-frontend/issues/1822)) ([38a007f](https://github.com/openfoodfacts/open-prices-frontend/commit/38a007f3e064cd8354854786e636dd8df21ea562))
* **Receipt Assistant:** improve the display of the price input field ([#1819](https://github.com/openfoodfacts/open-prices-frontend/issues/1819)) ([4adb673](https://github.com/openfoodfacts/open-prices-frontend/commit/4adb673be610d0b556976cd4054f42cdb5e1f498))
* **Receipt Assistant:** improve the display of the product input field: button + card (same as [#1818](https://github.com/openfoodfacts/open-prices-frontend/issues/1818)) ([#1821](https://github.com/openfoodfacts/open-prices-frontend/issues/1821)) ([41e8b3a](https://github.com/openfoodfacts/open-prices-frontend/commit/41e8b3a028a664d9ca94713cb169c71ad4678da9))

## [1.145.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.144.2...v1.145.0) (2025-11-08)


### Features

* **Product input:** merge ProductCard & Product selection together ([#1818](https://github.com/openfoodfacts/open-prices-frontend/issues/1818)) ([a9bc073](https://github.com/openfoodfacts/open-prices-frontend/commit/a9bc07385cdcca55c00751eed1ef0db17048ca5d))


### Technical

* **Cards:** extra cleanup following [#1816](https://github.com/openfoodfacts/open-prices-frontend/issues/1816) (remove useless v-if) ([ad61222](https://github.com/openfoodfacts/open-prices-frontend/commit/ad612226ff7f1fa8256b1996cac3c14f468dce45))
* **Cards:** move ActionMenuButton components inside v-row above ([#1816](https://github.com/openfoodfacts/open-prices-frontend/issues/1816)) ([60d95f0](https://github.com/openfoodfacts/open-prices-frontend/commit/60d95f0c150254ae69f04bee45b1b040a9f9f16b))
* **Forms:** use the default font-family for price & proof button inputs ([#1808](https://github.com/openfoodfacts/open-prices-frontend/issues/1808)) ([7c6c7ed](https://github.com/openfoodfacts/open-prices-frontend/commit/7c6c7ed1f916730c92b7a179192bc4ac701c44d8))
* **LocationCard:** move ActionMenuButton components inside v-row above + invert details & stats rows + add prepend-icon in ActionMenu ([#1817](https://github.com/openfoodfacts/open-prices-frontend/issues/1817)) ([d614dd6](https://github.com/openfoodfacts/open-prices-frontend/commit/d614dd66bd6fb6156a3099cdd0c4d507b920707a))
* **Products:** move ProductActionMenuButton inside ProductDetailsRow ([#1814](https://github.com/openfoodfacts/open-prices-frontend/issues/1814)) ([ba630d4](https://github.com/openfoodfacts/open-prices-frontend/commit/ba630d42c4085e9ecc92b5389271b2fe9a54c197))
* **Products:** rename (and transform) PriceCategoryDetails into PriceCategoryDetailsRow ([#1815](https://github.com/openfoodfacts/open-prices-frontend/issues/1815)) ([e749542](https://github.com/openfoodfacts/open-prices-frontend/commit/e749542c76b8a09c9e36ce16aeec248a9600fb0d))
* **Products:** rename (and transform) ProductDetails into ProductDetailsRow ([#1813](https://github.com/openfoodfacts/open-prices-frontend/issues/1813)) ([fc42a8b](https://github.com/openfoodfacts/open-prices-frontend/commit/fc42a8b5a1f1b5500a9e5e43cc26bbd53a151002))
* **Proofs:** simple ProofCompactCard component ([#1812](https://github.com/openfoodfacts/open-prices-frontend/issues/1812)) ([45ea702](https://github.com/openfoodfacts/open-prices-frontend/commit/45ea702173236f58876ce31212a7392ffe0da3b3))

## [1.144.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.144.1...v1.144.2) (2025-11-07)


### Bug Fixes

* **Accessibility:** Install eslint-plugin-vuejs-accessibility & fix errors ([#1803](https://github.com/openfoodfacts/open-prices-frontend/issues/1803)) ([7acd5c1](https://github.com/openfoodfacts/open-prices-frontend/commit/7acd5c1232e69eb91e4dcbebf8a9815f4c877c80))
* **OFF Add Link:** use user country_code instead of language_code for URL prefix ([#1804](https://github.com/openfoodfacts/open-prices-frontend/issues/1804)) ([327c6d2](https://github.com/openfoodfacts/open-prices-frontend/commit/327c6d28cdec52ab134303a9b188aecb39861331))


### Technical

* **Forms:** transform look & feel of buttons (full width, normal text) ([#1807](https://github.com/openfoodfacts/open-prices-frontend/issues/1807)) ([98bbb82](https://github.com/openfoodfacts/open-prices-frontend/commit/98bbb82ea2def2902ced57ced521eb6e7ac532ac))
* **Github Actions:** Replace ubuntu-latest with ubuntu-slim in simple workflow runners ([#1799](https://github.com/openfoodfacts/open-prices-frontend/issues/1799)) ([6c9fbc1](https://github.com/openfoodfacts/open-prices-frontend/commit/6c9fbc1b6161dfd869ce9ea509a044f5896e87d4))
* **l10n:** New Crowdin translations to review and merge ([#1801](https://github.com/openfoodfacts/open-prices-frontend/issues/1801)) ([241713a](https://github.com/openfoodfacts/open-prices-frontend/commit/241713afe4f438b22fc1dbef142c6af7fadaf645))

## [1.144.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.144.0...v1.144.1) (2025-11-01)


### Technical

* **deps:** bump actions/setup-node from 4 to 6 ([#1798](https://github.com/openfoodfacts/open-prices-frontend/issues/1798)) ([01144ed](https://github.com/openfoodfacts/open-prices-frontend/commit/01144edddd18978810b03f59815f8dd1e37a95d8))
* **deps:** bump vue from 3.5.21 to 3.5.22 ([#1708](https://github.com/openfoodfacts/open-prices-frontend/issues/1708)) ([ac41790](https://github.com/openfoodfacts/open-prices-frontend/commit/ac4179079919cd8818b8fc997056a527b3f9ca4b))
* **deps:** bump vuetify from 3.10.2 to 3.10.3 ([#1711](https://github.com/openfoodfacts/open-prices-frontend/issues/1711)) ([95f3cd0](https://github.com/openfoodfacts/open-prices-frontend/commit/95f3cd04dec3ce7a70c881ec8dd3bedc593b79bc))
* **l10n:** New Crowdin translations to review and merge ([#1792](https://github.com/openfoodfacts/open-prices-frontend/issues/1792)) ([3233333](https://github.com/openfoodfacts/open-prices-frontend/commit/32333336450526a75fa44d64a5cab77fa81b6976))
* **Receipt Assistant:** display 'quantity' using existing component ([#1796](https://github.com/openfoodfacts/open-prices-frontend/issues/1796)) ([40a3479](https://github.com/openfoodfacts/open-prices-frontend/commit/40a34795643b833f5b488c53d3c59f93754a60b2))
* **Receipt Assistant:** reduce padding. adapt grid on mobile ([#1794](https://github.com/openfoodfacts/open-prices-frontend/issues/1794)) ([a5e94d8](https://github.com/openfoodfacts/open-prices-frontend/commit/a5e94d86fbbe466ba94983773d902f16c8220471))
* **Receipt Assistant:** simplify some wordings ([#1797](https://github.com/openfoodfacts/open-prices-frontend/issues/1797)) ([9d445c7](https://github.com/openfoodfacts/open-prices-frontend/commit/9d445c74607290d0bf47aad13633adfbed87c26f))

## [1.144.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.143.2...v1.144.0) (2025-10-30)


### Features

* **Price edit:** allow moderators to edit & delete prices they don't own ([#1784](https://github.com/openfoodfacts/open-prices-frontend/issues/1784)) ([83a5bc7](https://github.com/openfoodfacts/open-prices-frontend/commit/83a5bc7746ba1d6adc057a9856925ff165dd8020))
* **Proof edit:** allow moderators to edit & delete proofs they don't own ([#1785](https://github.com/openfoodfacts/open-prices-frontend/issues/1785)) ([d77706b](https://github.com/openfoodfacts/open-prices-frontend/commit/d77706b5fd32e105704440370e419557fb60ec5e))


### Bug Fixes

* **Price form:** add missing comma-to-dot formatting ([#1787](https://github.com/openfoodfacts/open-prices-frontend/issues/1787)) ([53617f9](https://github.com/openfoodfacts/open-prices-frontend/commit/53617f979b85af510964cee56c49e0769ee46580))
* **Price form:** avoid trim() error when called on non-string ([#1791](https://github.com/openfoodfacts/open-prices-frontend/issues/1791)) ([599eace](https://github.com/openfoodfacts/open-prices-frontend/commit/599eaceaaea80c0204886a8a379ff0510a3d0e4a))
* **Receipt Assistant:** only display table when API calls are done. Don't allow clicking other steps ([#1790](https://github.com/openfoodfacts/open-prices-frontend/issues/1790)) ([587f4e6](https://github.com/openfoodfacts/open-prices-frontend/commit/587f4e62adee9e06e793d533fc6bc5bc1c5f623d))
* **Vuetify:** update theme toggling (since v3.10) ([#1789](https://github.com/openfoodfacts/open-prices-frontend/issues/1789)) ([119901b](https://github.com/openfoodfacts/open-prices-frontend/commit/119901b05d93657658402a572d257a5d723c78c5))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1788](https://github.com/openfoodfacts/open-prices-frontend/issues/1788)) ([0593b58](https://github.com/openfoodfacts/open-prices-frontend/commit/0593b58604a4838e532d8276967146e2a99a268e))
* **Users:** if moderator, show the info in the user's dashboard ([#1783](https://github.com/openfoodfacts/open-prices-frontend/issues/1783)) ([97ec3d9](https://github.com/openfoodfacts/open-prices-frontend/commit/97ec3d9cf6d62260319d157643e14476d3be943a))

## [1.143.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.143.1...v1.143.2) (2025-10-26)


### Technical

* **Proof upload:** chain promises instead of compressing/uploading at the same time (v2) ([#1782](https://github.com/openfoodfacts/open-prices-frontend/issues/1782)) ([1070c00](https://github.com/openfoodfacts/open-prices-frontend/commit/1070c00ab536bc393863dd9317195e691d17dd32))
* **Release Please:** upgrade to v4 (from v3) ([#1780](https://github.com/openfoodfacts/open-prices-frontend/issues/1780)) ([0da7527](https://github.com/openfoodfacts/open-prices-frontend/commit/0da75274c1d3fb91ad52b247792738d8c7991446))

## [1.143.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.143.0...v1.143.1) (2025-10-26)


### Bug Fixes

* **Challenge:** Forgot to update the new link of proof add price-tags ([#1773](https://github.com/openfoodfacts/open-prices-frontend/issues/1773)) ([ec4c86b](https://github.com/openfoodfacts/open-prices-frontend/commit/ec4c86b7285d121586dca3119be23cb28f4a1450))


### Technical

* **Authentication:** on POST error, slightly improve the alerts (clearer messages) ([#1775](https://github.com/openfoodfacts/open-prices-frontend/issues/1775)) ([c750db2](https://github.com/openfoodfacts/open-prices-frontend/commit/c750db24db1c7746e79ba21224eaeb74ff844410))
* **l10n:** New Crowdin translations to review and merge ([#1778](https://github.com/openfoodfacts/open-prices-frontend/issues/1778)) ([d64200e](https://github.com/openfoodfacts/open-prices-frontend/commit/d64200e496a9997afe45ba395570d2bf6efee6f2))
* **Linting:** Disable 'no-irregular-whitespace' rule for .json files ([#1777](https://github.com/openfoodfacts/open-prices-frontend/issues/1777)) ([97a8e73](https://github.com/openfoodfacts/open-prices-frontend/commit/97a8e73385ae1cbadad6abcd21c33d3d3e97c110))
* **Proof upload:** chain promises instead of compressing/uploading at the same time ([#1776](https://github.com/openfoodfacts/open-prices-frontend/issues/1776)) ([9e2b0f5](https://github.com/openfoodfacts/open-prices-frontend/commit/9e2b0f564f012a9ec921abee358e41f0574fecae))
* **Tests:** Disable them as they are not up to date (and failing) ([#1779](https://github.com/openfoodfacts/open-prices-frontend/issues/1779)) ([49dfdbc](https://github.com/openfoodfacts/open-prices-frontend/commit/49dfdbcd19ef265f2d7ffa405f855d26cca4b9ea))

## [1.143.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.142.0...v1.143.0) (2025-10-25)


### Features

* **CreateOffProduct:** Brands support ([#1769](https://github.com/openfoodfacts/open-prices-frontend/issues/1769)) ([3150a9f](https://github.com/openfoodfacts/open-prices-frontend/commit/3150a9fb29070b929457df529ecd39246ce44c4c))
* **CreateProduct:** Add link in price action menu + show link to page in /experiments ([#1770](https://github.com/openfoodfacts/open-prices-frontend/issues/1770)) ([b6c0924](https://github.com/openfoodfacts/open-prices-frontend/commit/b6c09245f2f2685c7f61367697e41bdd7acdf168))


### Bug Fixes

* **Price Validation Assistant:** always display the product's barcode ([#1772](https://github.com/openfoodfacts/open-prices-frontend/issues/1772)) ([024f456](https://github.com/openfoodfacts/open-prices-frontend/commit/024f45689b5d4cb2a9a48c014ced04c17f0b7be2))


### Technical

* **CreateOffProduct:** Remove 'Assistant' form title ([#1761](https://github.com/openfoodfacts/open-prices-frontend/issues/1761)) ([065db04](https://github.com/openfoodfacts/open-prices-frontend/commit/065db04207f5c2feddf11292d3e2850a006e3867))
* **CreateProduct:** Always display list of suggested missing products ([#1771](https://github.com/openfoodfacts/open-prices-frontend/issues/1771)) ([0ca5d03](https://github.com/openfoodfacts/open-prices-frontend/commit/0ca5d030703b65bd82637e27aa26d98edf962b1e))
* **l10n:** New Crowdin translations to review and merge ([#1760](https://github.com/openfoodfacts/open-prices-frontend/issues/1760)) ([1b13958](https://github.com/openfoodfacts/open-prices-frontend/commit/1b13958fe8b59f778de47cb15bb28faade20079f))
* **Login:** store newly returned user is_moderator info ([#1768](https://github.com/openfoodfacts/open-prices-frontend/issues/1768)) ([3efd334](https://github.com/openfoodfacts/open-prices-frontend/commit/3efd334579ffca3c8089c98c78a9bb39e0b87949))
* **Proof upload:** rename multiple price tag upload (url, breadcrumbs) ([#1765](https://github.com/openfoodfacts/open-prices-frontend/issues/1765)) ([f9fb802](https://github.com/openfoodfacts/open-prices-frontend/commit/f9fb802eb9d2b703bcc7f22459230cce65dab596))
* **Proof upload:** rename multiple price tag upload (url, breadcrumbs) (extra commit). ref [#1765](https://github.com/openfoodfacts/open-prices-frontend/issues/1765) ([1bce448](https://github.com/openfoodfacts/open-prices-frontend/commit/1bce4484e2b97d0aa7fadad95bfc984472d27611))
* **Style:** v-img: move height & width outside of style and in their own properties ([de1a978](https://github.com/openfoodfacts/open-prices-frontend/commit/de1a978c7c11aed91922bedaac77415073636365))
* **User Dashboard:** add default home tab (next to consumption & community) ([#1762](https://github.com/openfoodfacts/open-prices-frontend/issues/1762)) ([a3bf023](https://github.com/openfoodfacts/open-prices-frontend/commit/a3bf02300ff548f7f9c05c23870ddd6f95ab8645))

## [1.142.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.141.3...v1.142.0) (2025-10-19)


### Features

* **CreateOffProduct:** better language support ([#1758](https://github.com/openfoodfacts/open-prices-frontend/issues/1758)) ([7c6707a](https://github.com/openfoodfacts/open-prices-frontend/commit/7c6707a72bf9cc3ea54677a0374b747208d455e8))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1757](https://github.com/openfoodfacts/open-prices-frontend/issues/1757)) ([df87072](https://github.com/openfoodfacts/open-prices-frontend/commit/df870729de31a7f1ee42faca608f720f5067c2ad))

## [1.141.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.141.2...v1.141.3) (2025-10-16)


### Bug Fixes

* **Challenges:** fix challenge timeline position ([9f84d44](https://github.com/openfoodfacts/open-prices-frontend/commit/9f84d44fa6ec49141039ec3da1230b3bcfaa4d82))
* **Challenges:** if 2 ongoing challenges, show latest first ([#1756](https://github.com/openfoodfacts/open-prices-frontend/issues/1756)) ([8bfab4d](https://github.com/openfoodfacts/open-prices-frontend/commit/8bfab4ded63f9c7c7ac8f54ffdba7a1b944443a1))


### Technical

* **Challenges:** banner to nudge users to share new ideas ([#1753](https://github.com/openfoodfacts/open-prices-frontend/issues/1753)) ([fc71184](https://github.com/openfoodfacts/open-prices-frontend/commit/fc71184ee29b180e801a6310b85183bdec4c4589))
* **l10n:** New Crowdin translations to review and merge ([#1752](https://github.com/openfoodfacts/open-prices-frontend/issues/1752)) ([df5058c](https://github.com/openfoodfacts/open-prices-frontend/commit/df5058c55ea22033f07906e3c21cf40b8630d0df))
* small javascript optimizations ([#1755](https://github.com/openfoodfacts/open-prices-frontend/issues/1755)) ([f89f382](https://github.com/openfoodfacts/open-prices-frontend/commit/f89f382453175c32144e3246cb912c293fd07531))

## [1.141.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.141.1...v1.141.2) (2025-10-12)


### Technical

* **CreateOffProduct:** UI improvements ([#1749](https://github.com/openfoodfacts/open-prices-frontend/issues/1749)) ([c7f3621](https://github.com/openfoodfacts/open-prices-frontend/commit/c7f362118cb93a30eaa09c43334fcc9ed2b21d41))
* **l10n:** New Crowdin translations to review and merge ([#1747](https://github.com/openfoodfacts/open-prices-frontend/issues/1747)) ([63447c7](https://github.com/openfoodfacts/open-prices-frontend/commit/63447c74029c1d2bc1b5bea4a6ffb0240fad4010))

## [1.141.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.141.0...v1.141.1) (2025-10-08)


### Bug Fixes

* **ProofPriceTagAssistant:** no longer truncate wide proofs in canvas ([#1744](https://github.com/openfoodfacts/open-prices-frontend/issues/1744)) ([b278a16](https://github.com/openfoodfacts/open-prices-frontend/commit/b278a163320ea7dd9a62ec9019b664018a143c17))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1743](https://github.com/openfoodfacts/open-prices-frontend/issues/1743)) ([f203549](https://github.com/openfoodfacts/open-prices-frontend/commit/f203549021ee0fa899f5baa297ae5ec0e9afae9f))
* **Location selector:** Help message displayed when 0 results (OpenStreetMap) ([#1746](https://github.com/openfoodfacts/open-prices-frontend/issues/1746)) ([30981ef](https://github.com/openfoodfacts/open-prices-frontend/commit/30981ef17f4b8072cd167c7eedb3ffc703bc25dc))

## [1.141.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.140.6...v1.141.0) (2025-10-06)


### Features

* **Experiment:** Add product to product opener using prices information ([#1685](https://github.com/openfoodfacts/open-prices-frontend/issues/1685)) ([8b6f009](https://github.com/openfoodfacts/open-prices-frontend/commit/8b6f00933b15a965446a8392e7f58f9cfda2e2fe))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1730](https://github.com/openfoodfacts/open-prices-frontend/issues/1730)) ([1f1858f](https://github.com/openfoodfacts/open-prices-frontend/commit/1f1858f08fd7a5ea294e4c99789103a2a00b8a8b))
* **Price Table:** simplify header generation depending on source ([#1740](https://github.com/openfoodfacts/open-prices-frontend/issues/1740)) ([434ff63](https://github.com/openfoodfacts/open-prices-frontend/commit/434ff6314aba4b028e81172b42e8407d471a3705))
* **User detail:** add price display toggle (list or table) ([#1742](https://github.com/openfoodfacts/open-prices-frontend/issues/1742)) ([5ca09f9](https://github.com/openfoodfacts/open-prices-frontend/commit/5ca09f96fb11433768ab87ceaee681143839a4a1))

## [1.140.6](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.140.5...v1.140.6) (2025-10-05)


### Bug Fixes

* **Display Menu:** fix forgot to rename some variables following [#1731](https://github.com/openfoodfacts/open-prices-frontend/issues/1731) ([63ea64d](https://github.com/openfoodfacts/open-prices-frontend/commit/63ea64df9e044c54ae9b5b12a3d765e435930c9c))


### Technical

* **Dashboard:** Price list: add price display toggle (list, table or map) ([#1734](https://github.com/openfoodfacts/open-prices-frontend/issues/1734)) ([110fdb0](https://github.com/openfoodfacts/open-prices-frontend/commit/110fdb00c14acf5da663c0de2d7b8e54c110bbd2))
* **Dashboard:** Proof list: add price display toggle (list or map) ([#1736](https://github.com/openfoodfacts/open-prices-frontend/issues/1736)) ([bd66be7](https://github.com/openfoodfacts/open-prices-frontend/commit/bd66be72487dcf670d08aa32e67f86271baeef6f))
* **Dashboard:** Proof list: add the new table view in the display choices ([#1738](https://github.com/openfoodfacts/open-prices-frontend/issues/1738)) ([40c2b65](https://github.com/openfoodfacts/open-prices-frontend/commit/40c2b658604acf4830afed3fac6834f60af544aa))
* **Date detail:** add price display toggle (list, table or map) ([#1733](https://github.com/openfoodfacts/open-prices-frontend/issues/1733)) ([ef6b618](https://github.com/openfoodfacts/open-prices-frontend/commit/ef6b618037fe8c6099ddf553638f0d5ae8df128b))
* **Display Menu:** new ProofTable component ([#1737](https://github.com/openfoodfacts/open-prices-frontend/issues/1737)) ([2915052](https://github.com/openfoodfacts/open-prices-frontend/commit/29150525ce54f41e2fdbecf665aab077e7162d6f))
* **Display Menu:** new prop to explicitly set the display options ([#1731](https://github.com/openfoodfacts/open-prices-frontend/issues/1731)) ([ef3ad30](https://github.com/openfoodfacts/open-prices-frontend/commit/ef3ad30a9cec2d531a2c24487d250e9c5cdf9562))
* **Location detail:** add price display toggle (list or table) ([#1729](https://github.com/openfoodfacts/open-prices-frontend/issues/1729)) ([62e8c14](https://github.com/openfoodfacts/open-prices-frontend/commit/62e8c14e2fd1eba12233c7d66e5312dc44a24f66))

## [1.140.5](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.140.4...v1.140.5) (2025-10-04)


### Bug Fixes

* **FilterMenu:** on Product detail page, hide the type filter ([#1721](https://github.com/openfoodfacts/open-prices-frontend/issues/1721)) ([01989fa](https://github.com/openfoodfacts/open-prices-frontend/commit/01989faa81ef6a22e4efab362b985c8928adbd8f))
* **Price table:** fix location column sort (v1: by id) ([#1725](https://github.com/openfoodfacts/open-prices-frontend/issues/1725)) ([e0eb40e](https://github.com/openfoodfacts/open-prices-frontend/commit/e0eb40ec8891654e1117af60f6f44c36e285da0c))
* **Settings:** call setLastCurrencyUsed when the user uploads a proof (instead of creates a price) ([#1728](https://github.com/openfoodfacts/open-prices-frontend/issues/1728)) ([533e9fc](https://github.com/openfoodfacts/open-prices-frontend/commit/533e9fcb3cbdaa6c5df3755ac9d8a7d331f2ce38))
* **Tables:** display all items available ([#1722](https://github.com/openfoodfacts/open-prices-frontend/issues/1722)) ([89c11a6](https://github.com/openfoodfacts/open-prices-frontend/commit/89c11a6aff871b0b125781ee0ff1d5dfea5c59d0))


### Technical

* **deps:** bump actions/labeler from 5 to 6 ([#1718](https://github.com/openfoodfacts/open-prices-frontend/issues/1718)) ([03cf5a7](https://github.com/openfoodfacts/open-prices-frontend/commit/03cf5a7024a220204ad86081d0b31be4bf92ffc9))
* **l10n:** New Crowdin translations to review and merge ([#1706](https://github.com/openfoodfacts/open-prices-frontend/issues/1706)) ([a3bc06c](https://github.com/openfoodfacts/open-prices-frontend/commit/a3bc06c2cc5bd62a5e3157d4945e1b610870eb26))
* **Utils:** new date.oneMonthAgoDate method ([#1726](https://github.com/openfoodfacts/open-prices-frontend/issues/1726)) ([b7115a4](https://github.com/openfoodfacts/open-prices-frontend/commit/b7115a435c897f777c4d9d8b71bbe8a4220d0091))

## [1.140.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.140.3...v1.140.4) (2025-09-28)


### Bug Fixes

* **ProofPriceTagAssistant:** Properly wait when new boxes are drawn on old proofs ([#1704](https://github.com/openfoodfacts/open-prices-frontend/issues/1704)) ([f8d7f18](https://github.com/openfoodfacts/open-prices-frontend/commit/f8d7f18eb43b1db7a5aad73ebf2a9e292ac835ce))

## [1.140.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.140.2...v1.140.3) (2025-09-26)


### Bug Fixes

* **Products:** fix URL to add a new barcode in OxF ([#1700](https://github.com/openfoodfacts/open-prices-frontend/issues/1700)) ([b9f299e](https://github.com/openfoodfacts/open-prices-frontend/commit/b9f299ed87413986709b89c9699649651dec06a5))


### Technical

* **FilterMenu:** allow having multiple filters at the same time ([#1703](https://github.com/openfoodfacts/open-prices-frontend/issues/1703)) ([c85cae7](https://github.com/openfoodfacts/open-prices-frontend/commit/c85cae7402e82f5fb0a75867e96335fc94b4d224))
* **l10n:** New Crowdin translations to review and merge ([#1699](https://github.com/openfoodfacts/open-prices-frontend/issues/1699)) ([306e9cc](https://github.com/openfoodfacts/open-prices-frontend/commit/306e9cce6c0e9c65662257878c4123bd0d83b023))
* **Price Validation Assistant:** new filter to show only predictions with products that exists ([#1702](https://github.com/openfoodfacts/open-prices-frontend/issues/1702)) ([20933ee](https://github.com/openfoodfacts/open-prices-frontend/commit/20933ee645456bfd5b00a60d4d94f6c199545e14))

## [1.140.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.140.1...v1.140.2) (2025-09-25)


### Bug Fixes

* **Barcode scanner:** remove whitespaces with trim() ([#1693](https://github.com/openfoodfacts/open-prices-frontend/issues/1693)) ([135721c](https://github.com/openfoodfacts/open-prices-frontend/commit/135721cdf1f4efd8b8976c54e757ad5152cae9a0))
* **Proof Price Tag Assistant:** restrict to PRICE_TAG proofs ([#1696](https://github.com/openfoodfacts/open-prices-frontend/issues/1696)) ([697a722](https://github.com/openfoodfacts/open-prices-frontend/commit/697a7223d0be753b5dfc26bce79ef3ea3fa3043b))
* **ProofPriceTagAssistant:** fixed manual boxes addition + increase the time to fetch predicted price tags ([#1691](https://github.com/openfoodfacts/open-prices-frontend/issues/1691)) ([af8e536](https://github.com/openfoodfacts/open-prices-frontend/commit/af8e5361957e2e9a5cfcfd913e57217e4fc88daa))


### Documentation

* **README:** Add more info on Open Prices API & reuse ([#1688](https://github.com/openfoodfacts/open-prices-frontend/issues/1688)) ([cd31994](https://github.com/openfoodfacts/open-prices-frontend/commit/cd31994567e34f2c039c4564e8f6c415828f544a))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1684](https://github.com/openfoodfacts/open-prices-frontend/issues/1684)) ([2eec14f](https://github.com/openfoodfacts/open-prices-frontend/commit/2eec14f9e6e659f8474b4395c7c019eaad52a466))
* **Price List:** when ordering by -date, add an extra -created ordering to avoid reordering on refresh ([#1697](https://github.com/openfoodfacts/open-prices-frontend/issues/1697)) ([884fccb](https://github.com/openfoodfacts/open-prices-frontend/commit/884fccb4b5a73abaa4cbf879a33aa6fd16f80c40))
* **Proof List:** when ordering by -date, add an extra -created ordering to avoid reordering on refresh ([#1698](https://github.com/openfoodfacts/open-prices-frontend/issues/1698)) ([ff97c6d](https://github.com/openfoodfacts/open-prices-frontend/commit/ff97c6d0896cb1069250e4bbd4caa3c1695ab700))
* **Receipt Assistant:** avoid calling the proof API twice ([#1695](https://github.com/openfoodfacts/open-prices-frontend/issues/1695)) ([3e31c65](https://github.com/openfoodfacts/open-prices-frontend/commit/3e31c6556cc755fb8f8ac5717dd3844cea9332f6))

## [1.140.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.140.0...v1.140.1) (2025-09-21)


### Technical

* **Challenges:** improve display of ranking stats ([#1677](https://github.com/openfoodfacts/open-prices-frontend/issues/1677)) ([d479e83](https://github.com/openfoodfacts/open-prices-frontend/commit/d479e836a39f3e1f90cdb12212617cc09640794d))
* **l10n:** New Crowdin translations to review and merge ([#1676](https://github.com/openfoodfacts/open-prices-frontend/issues/1676)) ([2ceb975](https://github.com/openfoodfacts/open-prices-frontend/commit/2ceb975deabb1663a004272f968ca5fe96d99d93))
* **Locations:** small improvements in geo utils (new withCountry param) ([#1682](https://github.com/openfoodfacts/open-prices-frontend/issues/1682)) ([82cb02e](https://github.com/openfoodfacts/open-prices-frontend/commit/82cb02eaf36f47ce5bca0b7b258d00e02e98902c))
* **Products:** allow to hide price count chip in card ([#1683](https://github.com/openfoodfacts/open-prices-frontend/issues/1683)) ([0f08074](https://github.com/openfoodfacts/open-prices-frontend/commit/0f0807434ebc2cfc4abcbfe0eec6223eebc7436d))
* **User card:** new CurrencyCountChip, CountryCountChip & ChallengeCountChip components ([#1681](https://github.com/openfoodfacts/open-prices-frontend/issues/1681)) ([6f46cc3](https://github.com/openfoodfacts/open-prices-frontend/commit/6f46cc3b2eb9328af51a6045d533e86b00b15d88))
* **User card:** show all stats (even if 0 or 1) ([#1678](https://github.com/openfoodfacts/open-prices-frontend/issues/1678)) ([dd477a2](https://github.com/openfoodfacts/open-prices-frontend/commit/dd477a2411a5466998a90405b30793a3eb002a44))
* **User card:** show new challenge_count stat ([#1680](https://github.com/openfoodfacts/open-prices-frontend/issues/1680)) ([e923629](https://github.com/openfoodfacts/open-prices-frontend/commit/e923629a784d6cfc0f5513f78d980441cf04dd71))

## [1.140.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.139.0...v1.140.0) (2025-09-19)


### Features

* **Challenges:** display details stats & rankings in a new section ([#1674](https://github.com/openfoodfacts/open-prices-frontend/issues/1674)) ([dab398f](https://github.com/openfoodfacts/open-prices-frontend/commit/dab398f4e4883b536ac7efa5253046b51959dcf1))


### Bug Fixes

* **l10n:** update `WhatOFFAnswer` to reflect 4 million product milestone ([#1670](https://github.com/openfoodfacts/open-prices-frontend/issues/1670)) ([8e61334](https://github.com/openfoodfacts/open-prices-frontend/commit/8e61334bbc8947db0aab0a1ecf9f43295877e047))


### Documentation

* Design promo in README ([#1502](https://github.com/openfoodfacts/open-prices-frontend/issues/1502)) ([3e64421](https://github.com/openfoodfacts/open-prices-frontend/commit/3e64421d54fccf0d3b7b3aaca520b0a6b9933999))


### Technical

* Add file patterns for various assistant components ([28f64df](https://github.com/openfoodfacts/open-prices-frontend/commit/28f64df6a53610268237a1184a47fe0c15c2e330))
* Add labeler configuration for ChallengeCard.vue ([4c7dc4f](https://github.com/openfoodfacts/open-prices-frontend/commit/4c7dc4f633ccf41eec0bfc0c5cf8c700a9b0787b))
* **Challenges:** ChallengeCard: display the number of locations if used as a filter ([#1671](https://github.com/openfoodfacts/open-prices-frontend/issues/1671)) ([6e64040](https://github.com/openfoodfacts/open-prices-frontend/commit/6e64040a81a6fe090f69fadc846ea7ef735939fc))
* **Challenges:** display count stats in the ChallengeCard ([#1666](https://github.com/openfoodfacts/open-prices-frontend/issues/1666)) ([5fc1d56](https://github.com/openfoodfacts/open-prices-frontend/commit/5fc1d565471447982f06675fb4845a65fb621f85))
* **Challenges:** some small improvements on the list & detail pages ([#1672](https://github.com/openfoodfacts/open-prices-frontend/issues/1672)) ([26c6b7b](https://github.com/openfoodfacts/open-prices-frontend/commit/26c6b7bc49d98e6476190dd1fd300c1102306d4f))
* **deps:** Update packages ([#1675](https://github.com/openfoodfacts/open-prices-frontend/issues/1675)) ([dd7e163](https://github.com/openfoodfacts/open-prices-frontend/commit/dd7e1636c9881e109cbcf4e57a3a41c0a02de950))
* **l10n:** New Crowdin translations to review and merge ([#1665](https://github.com/openfoodfacts/open-prices-frontend/issues/1665)) ([d3ffcbd](https://github.com/openfoodfacts/open-prices-frontend/commit/d3ffcbd5687d83c3a4c3aac73652a8ee62c2d577))
* remove when possible &lt;br&gt; (move h2 inside v-col) ([#1673](https://github.com/openfoodfacts/open-prices-frontend/issues/1673)) ([b401be7](https://github.com/openfoodfacts/open-prices-frontend/commit/b401be7664caa7229cb5be535f5761cfed02f3c8))

## [1.139.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.138.1...v1.139.0) (2025-09-14)


### Features

* **ReceiptAssitant:** suggest product codes based on product names ([#1650](https://github.com/openfoodfacts/open-prices-frontend/issues/1650)) ([22c6d05](https://github.com/openfoodfacts/open-prices-frontend/commit/22c6d050feb2ca510fc1ed1e8830885ac7681b0e))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1662](https://github.com/openfoodfacts/open-prices-frontend/issues/1662)) ([f15d073](https://github.com/openfoodfacts/open-prices-frontend/commit/f15d073d69d3087aadcdc167b4fb4b01e50aad41))
* **Receipt Assistant:** Increase the time to fetch predicted prices (from 15s to 50s) ([#1664](https://github.com/openfoodfacts/open-prices-frontend/issues/1664)) ([0f92a7d](https://github.com/openfoodfacts/open-prices-frontend/commit/0f92a7d7a64ced4edb752d3c8ebda4b9f4867e15))

## [1.138.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.138.0...v1.138.1) (2025-09-03)


### Bug Fixes

* **PriceTagAssistant:** properly mark drawn price tags as Manual instead of Automatic ([#1638](https://github.com/openfoodfacts/open-prices-frontend/issues/1638)) ([c9d90d8](https://github.com/openfoodfacts/open-prices-frontend/commit/c9d90d826ab4f1da4d09b2920e777df80b7cd209))
* **ReceiptAssistant:** fix editing price and product in place & new item addition ([#1643](https://github.com/openfoodfacts/open-prices-frontend/issues/1643)) ([9d4c8d5](https://github.com/openfoodfacts/open-prices-frontend/commit/9d4c8d59b8d8cd414d70c7e892f4928f7fc58184))
* typo ([515295f](https://github.com/openfoodfacts/open-prices-frontend/commit/515295fb2b9eb78e08cd59ff59aae58244bf03a8))


### Documentation

* README promo for design team and files ([#1523](https://github.com/openfoodfacts/open-prices-frontend/issues/1523)) ([5bc7ee0](https://github.com/openfoodfacts/open-prices-frontend/commit/5bc7ee0ec80f4ed991049cf80276e4d9bd66b4cf))
* Update README.md ([cf5cd74](https://github.com/openfoodfacts/open-prices-frontend/commit/cf5cd7448c7c23327b5ef23a83ec79f8c4ef02a4))


### Technical

* **deps:** bump actions/checkout from 4 to 5 ([#1660](https://github.com/openfoodfacts/open-prices-frontend/issues/1660)) ([a0e4688](https://github.com/openfoodfacts/open-prices-frontend/commit/a0e4688ef1ca875460a20695e97c807756bee5b8))
* **deps:** bump amannn/action-semantic-pull-request from 5 to 6 ([#1659](https://github.com/openfoodfacts/open-prices-frontend/issues/1659)) ([c225525](https://github.com/openfoodfacts/open-prices-frontend/commit/c22552577100382575e7a8856b6834ae48b28b6f))
* **Experiments:** remove single price & proof upload. add "not maintained anymore" banner. ([#1642](https://github.com/openfoodfacts/open-prices-frontend/issues/1642)) ([8b0442a](https://github.com/openfoodfacts/open-prices-frontend/commit/8b0442a5cd9a7e58b24a02863a78534c82640288))
* **l10n:** New Crowdin translations to review and merge ([#1622](https://github.com/openfoodfacts/open-prices-frontend/issues/1622)) ([2d760fd](https://github.com/openfoodfacts/open-prices-frontend/commit/2d760fdec2e3224147733628366dc4e1ec7b2df0))

## [1.138.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.137.0...v1.138.0) (2025-07-26)


### Features

* **Price tags:** support schema v2 of price tag extraction in the Validation assistant & Contribution assistant ([#1606](https://github.com/openfoodfacts/open-prices-frontend/issues/1606)) ([e8664bb](https://github.com/openfoodfacts/open-prices-frontend/commit/e8664bb17a0e79c5fbc5475ef3761660463c9a6b))
* **PriceTags:** UI support for new 'no barcode' status (5) ([#1591](https://github.com/openfoodfacts/open-prices-frontend/issues/1591)) ([9980d99](https://github.com/openfoodfacts/open-prices-frontend/commit/9980d995d7583fe45f7b64a0c038e27f31d37ad8))


### Bug Fixes

* fix error in type for price tag assistant ([#1609](https://github.com/openfoodfacts/open-prices-frontend/issues/1609)) ([73675c5](https://github.com/openfoodfacts/open-prices-frontend/commit/73675c5f9053ea77df48fc337ab902681d0676cf))
* fix wrong type for price in validation assistant ([#1608](https://github.com/openfoodfacts/open-prices-frontend/issues/1608)) ([a894284](https://github.com/openfoodfacts/open-prices-frontend/commit/a894284a7e442c5da69c6b0c29a44e534d773985))
* **l10n:** Cleanup unused translations ([c1e5c89](https://github.com/openfoodfacts/open-prices-frontend/commit/c1e5c89fd28d714e2409086a5d2e3dcb94814816))
* **Price Tag Assistant:** PriceTag prediction must have a product or category to be added ([#1620](https://github.com/openfoodfacts/open-prices-frontend/issues/1620)) ([35c90db](https://github.com/openfoodfacts/open-prices-frontend/commit/35c90dbd7ff97413599eb9c5c34f16eceb015909))
* **Price Validation:** show clear error when product or category or price is missing + disable confirm button ([#1621](https://github.com/openfoodfacts/open-prices-frontend/issues/1621)) ([0419205](https://github.com/openfoodfacts/open-prices-frontend/commit/041920593f5033be4e19834bfbc521d4a587f62e))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1614](https://github.com/openfoodfacts/open-prices-frontend/issues/1614)) ([c220992](https://github.com/openfoodfacts/open-prices-frontend/commit/c220992b6b6911f09a4969623b996736a16674d4))
* **l10n:** New Crowdin translations to review and merge ([#1618](https://github.com/openfoodfacts/open-prices-frontend/issues/1618)) ([3209158](https://github.com/openfoodfacts/open-prices-frontend/commit/3209158a374990122f0a1f6a1af31cec40fe947e))
* **Utils:** move barcode stuff to a dedicated file ([#1612](https://github.com/openfoodfacts/open-prices-frontend/issues/1612)) ([17fc5a1](https://github.com/openfoodfacts/open-prices-frontend/commit/17fc5a163f2b4745d307911bb0ed6d97fba9cc27))
* **Utils:** move date stuff to a dedicated file ([#1613](https://github.com/openfoodfacts/open-prices-frontend/issues/1613)) ([efc04ca](https://github.com/openfoodfacts/open-prices-frontend/commit/efc04ca551d37d63da128876dd00104ed333f57f))
* **Utils:** move geo stuff to a dedicated file ([#1610](https://github.com/openfoodfacts/open-prices-frontend/issues/1610)) ([f682dfc](https://github.com/openfoodfacts/open-prices-frontend/commit/f682dfc1a5bb06db371d87b12d0c9ff4643b2dd2))
* **Utils:** move price stuff to a dedicated file ([#1615](https://github.com/openfoodfacts/open-prices-frontend/issues/1615)) ([04bb74a](https://github.com/openfoodfacts/open-prices-frontend/commit/04bb74acf300fa8173942dd7e5fdf0a662fb8ac8))
* **Utils:** move price tag handling in the proof utils ([#1619](https://github.com/openfoodfacts/open-prices-frontend/issues/1619)) ([a3590c6](https://github.com/openfoodfacts/open-prices-frontend/commit/a3590c6e7556be102ba6349809509f28253c3b1d))
* **Utils:** move proof image logic to the new utils ([#1617](https://github.com/openfoodfacts/open-prices-frontend/issues/1617)) ([b61a8f5](https://github.com/openfoodfacts/open-prices-frontend/commit/b61a8f593450cf61522a5215f887d780bd28d4f8))
* **Utils:** move proof stuff to a dedicated file ([#1616](https://github.com/openfoodfacts/open-prices-frontend/issues/1616)) ([67b8a37](https://github.com/openfoodfacts/open-prices-frontend/commit/67b8a37c44cae265c1b03e7d024c7a5a6180ff86))

## [1.137.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.136.7...v1.137.0) (2025-07-24)


### Features

* **Proof Upload:** add an action to 'Add prices' if the user does not want to use the community validation ([#1601](https://github.com/openfoodfacts/open-prices-frontend/issues/1601)) ([b1a0be9](https://github.com/openfoodfacts/open-prices-frontend/commit/b1a0be9dfba1819b88e03d6ad6be5cd566225424))


### Technical

* **Contribution Assistant:** rename to ProofPriceTagAssistant to clarify ([#1597](https://github.com/openfoodfacts/open-prices-frontend/issues/1597)) ([7fd9802](https://github.com/openfoodfacts/open-prices-frontend/commit/7fd98024b694cc6b75d1faa784560c03bb92b99f))
* **Header:** add a local/staging text in a bottom red banner ([#1604](https://github.com/openfoodfacts/open-prices-frontend/issues/1604)) ([08a6af1](https://github.com/openfoodfacts/open-prices-frontend/commit/08a6af1d726a880aa10d75d1fe38f160f076be44))
* **l10n:** New Crowdin translations to review and merge ([#1600](https://github.com/openfoodfacts/open-prices-frontend/issues/1600)) ([da8efc5](https://github.com/openfoodfacts/open-prices-frontend/commit/da8efc5dfd326c51b76aed989e6a296b58c5e76b))
* **l10n:** New Crowdin translations to review and merge ([#1605](https://github.com/openfoodfacts/open-prices-frontend/issues/1605)) ([c9e1a8b](https://github.com/openfoodfacts/open-prices-frontend/commit/c9e1a8be975edb5a146f3ff988c0da8b6b53115d))
* **Price add:** move the initWithProofId logic to the PriceAddMultiple view ([#1602](https://github.com/openfoodfacts/open-prices-frontend/issues/1602)) ([50a2848](https://github.com/openfoodfacts/open-prices-frontend/commit/50a28480a54afb0cb530b6963a4b94a549292dc2))
* **Proof Upload:** rename ProofAddMultiple component to ProofPriceTagAddMultiple to clarify ([#1598](https://github.com/openfoodfacts/open-prices-frontend/issues/1598)) ([750aa4d](https://github.com/openfoodfacts/open-prices-frontend/commit/750aa4dcec0fb2911864174cb5f46710196d6b76))

## [1.136.7](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.136.6...v1.136.7) (2025-07-22)


### Bug Fixes

* **Receipt Assistant:** align action buttons to the right ([0625f85](https://github.com/openfoodfacts/open-prices-frontend/commit/0625f85cc512b2cb12acca76c1cdc22cddd914eb))
* **Receipt Assistant:** match price input look & feel to other input fields ([#1594](https://github.com/openfoodfacts/open-prices-frontend/issues/1594)) ([194f49e](https://github.com/openfoodfacts/open-prices-frontend/commit/194f49ee0e7a4b5a4bbcc81e0b7661201a6ca0e3))
* **Receipt Assistant:** reduce product form field height. set minimum price form field width ([#1596](https://github.com/openfoodfacts/open-prices-frontend/issues/1596)) ([28d5df8](https://github.com/openfoodfacts/open-prices-frontend/commit/28d5df81c46fd24533ee22128e1c131a83868c5e))

## [1.136.6](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.136.5...v1.136.6) (2025-07-21)


### Technical

* **ContributionAssistant:** only fetch pricetags with predictions ([#1592](https://github.com/openfoodfacts/open-prices-frontend/issues/1592)) ([6f50512](https://github.com/openfoodfacts/open-prices-frontend/commit/6f50512fa06718fcd7ec153bf98b2b78bc8cffda))
* **l10n:** New Crowdin translations to review and merge ([#1586](https://github.com/openfoodfacts/open-prices-frontend/issues/1586)) ([da0a151](https://github.com/openfoodfacts/open-prices-frontend/commit/da0a15102bfa1da54dd4cb28038ac79e001ad02c))

## [1.136.5](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.136.4...v1.136.5) (2025-07-17)


### Bug Fixes

* **Stats:** remove reference to challenge_count being hardcoded. ref [#1339](https://github.com/openfoodfacts/open-prices-frontend/issues/1339) ([137f7e6](https://github.com/openfoodfacts/open-prices-frontend/commit/137f7e6afcca7e138bbcb5a12dfd674e5524736f))


### Technical

* **Cards:** add a right arrow when "simple" cards are clickable ([#1588](https://github.com/openfoodfacts/open-prices-frontend/issues/1588)) ([a372b66](https://github.com/openfoodfacts/open-prices-frontend/commit/a372b661c78fe67034d4ce2dbe8dc9bef091f3bc))
* **Stats:** in the Challenge count card, add a link to the challenge page. ref [#1339](https://github.com/openfoodfacts/open-prices-frontend/issues/1339) ([de7333d](https://github.com/openfoodfacts/open-prices-frontend/commit/de7333d4144bf983aefbfc1b9a6997d899ab4e1b))

## [1.136.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.136.3...v1.136.4) (2025-07-10)


### Bug Fixes

* **Receipt Assistant:** fix edition of product_name. fix remembering discount info ([#1585](https://github.com/openfoodfacts/open-prices-frontend/issues/1585)) ([12bc21d](https://github.com/openfoodfacts/open-prices-frontend/commit/12bc21d1c3570561d04475dea4202effa4e346aa))


### Technical

* **Steppers:** last step (Actions): show actions as cards instead of buttons ([#1583](https://github.com/openfoodfacts/open-prices-frontend/issues/1583)) ([3d56207](https://github.com/openfoodfacts/open-prices-frontend/commit/3d56207bc59fb1a215d1caf938b5b6074dbc4e9c))

## [1.136.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.136.2...v1.136.3) (2025-07-07)


### Bug Fixes

* **Receipt Assistant:** fix init the assistant with a proof_id ([#1577](https://github.com/openfoodfacts/open-prices-frontend/issues/1577)) ([166cb48](https://github.com/openfoodfacts/open-prices-frontend/commit/166cb48e159b3ec115633b168f056821aae2372f))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1573](https://github.com/openfoodfacts/open-prices-frontend/issues/1573)) ([50e89f7](https://github.com/openfoodfacts/open-prices-frontend/commit/50e89f7e54e239f3a232e4140396b18520ba7301))
* **Proof detail:** if the user is the receipt owner, display the quantity column ([#1580](https://github.com/openfoodfacts/open-prices-frontend/issues/1580)) ([765d24f](https://github.com/openfoodfacts/open-prices-frontend/commit/765d24f3fd9c153faab8f02cc140b092b9bba787))
* **Receipt Assistant:** display the quantity column ([#1581](https://github.com/openfoodfacts/open-prices-frontend/issues/1581)) ([f490768](https://github.com/openfoodfacts/open-prices-frontend/commit/f4907681648f42bbbb6545b7f0735d8f6cb9ba21))
* **Receipt Assistant:** in the proof action menu, change the link to point to the right assistant ([#1579](https://github.com/openfoodfacts/open-prices-frontend/issues/1579)) ([1e48c29](https://github.com/openfoodfacts/open-prices-frontend/commit/1e48c29868b55867beb5835f9b07989520b4748e))
* **Receipt Assistant:** Take into account receipt_quantity in price total calculation ([#1582](https://github.com/openfoodfacts/open-prices-frontend/issues/1582)) ([703a1bf](https://github.com/openfoodfacts/open-prices-frontend/commit/703a1bfb8da886368bbf003c8df21e30622de6ac))

## [1.136.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.136.1...v1.136.2) (2025-06-28)


### Bug Fixes

* **PriceAddMultiple:** always consider proof_type in Proof upload card ([#1571](https://github.com/openfoodfacts/open-prices-frontend/issues/1571)) ([3f1201f](https://github.com/openfoodfacts/open-prices-frontend/commit/3f1201fd0d0b0eddf54e3d49cf2f6fa0f69010b6))
* **PriceAddMultiple:** fixed picture delete button ([#1572](https://github.com/openfoodfacts/open-prices-frontend/issues/1572)) ([99564e4](https://github.com/openfoodfacts/open-prices-frontend/commit/99564e4c101fbc69a8c23587e1e63dd989e7435d))


### Technical

* **Steppers:** last step (Actions): seperate success alert & action card ([#1568](https://github.com/openfoodfacts/open-prices-frontend/issues/1568)) ([e27aca0](https://github.com/openfoodfacts/open-prices-frontend/commit/e27aca0071d5bb01b59bf495a5b3f82ff56ef92e))

## [1.136.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.136.0...v1.136.1) (2025-06-22)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1565](https://github.com/openfoodfacts/open-prices-frontend/issues/1565)) ([ca2cb5f](https://github.com/openfoodfacts/open-prices-frontend/commit/ca2cb5fa801fc348512205dde30393baa78f0132))
* **Price upload:** PriceAlreadyUploadedCard: add count chip after title (instead of in the title) ([649ff64](https://github.com/openfoodfacts/open-prices-frontend/commit/649ff649fcf6ddb36517fb72f205ef1f2d36bd70))
* **Price upload:** PriceAlreadyUploadedCard: remove overlay ([337e01f](https://github.com/openfoodfacts/open-prices-frontend/commit/337e01ff3cc77c55ef807aaf26423826ff6b8820))
* **Proof card:** prepend with image icon ([e954b75](https://github.com/openfoodfacts/open-prices-frontend/commit/e954b7552530e731da8bcd5f2af8f7f72a3ae651))
* **Steppers:** rename last step to 'Actions' (instead of 'Done') ([a01de5a](https://github.com/openfoodfacts/open-prices-frontend/commit/a01de5abf3ea920e448ed26315528196ec586b52))

## [1.136.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.135.0...v1.136.0) (2025-06-17)


### Features

* new Contribute page ([#1520](https://github.com/openfoodfacts/open-prices-frontend/issues/1520)) ([044b88e](https://github.com/openfoodfacts/open-prices-frontend/commit/044b88e4bc7dc89bcbe6790e7dd113318f000cac))


### Technical

* **Proof upload:** allow setting the proof_type on init ([#1563](https://github.com/openfoodfacts/open-prices-frontend/issues/1563)) ([1787cec](https://github.com/openfoodfacts/open-prices-frontend/commit/1787ceccc6bc87951054822ed9a73b8d1a4f5db5))

## [1.135.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.134.3...v1.135.0) (2025-06-17)


### Features

* **Proof upload:** Add a callout-promo to the multiple price tag proof upload ([#1562](https://github.com/openfoodfacts/open-prices-frontend/issues/1562)) ([ebd64f2](https://github.com/openfoodfacts/open-prices-frontend/commit/ebd64f2283a30a5376f80fdda1794e3d5142280e))
* **Receipt Assistant:** Add a callout-promo in the ProofUploadCard ([#1560](https://github.com/openfoodfacts/open-prices-frontend/issues/1560)) ([6cab0f2](https://github.com/openfoodfacts/open-prices-frontend/commit/6cab0f25a777a8dc8c6c445729d7ebed742d91a3))


### Technical

* **Challenges:** new section to list upcoming challenges ([#1561](https://github.com/openfoodfacts/open-prices-frontend/issues/1561)) ([d789c8a](https://github.com/openfoodfacts/open-prices-frontend/commit/d789c8a67f620c94d8d8ca938788ff21bd2d288c))
* **l10n:** New Crowdin translations to review and merge ([#1546](https://github.com/openfoodfacts/open-prices-frontend/issues/1546)) ([1dccd00](https://github.com/openfoodfacts/open-prices-frontend/commit/1dccd007115ecd60c6e68dac8217f1e33f9d3dab))
* **Proof upload:** move down the multiple price tag upload warning alert. ref [#1175](https://github.com/openfoodfacts/open-prices-frontend/issues/1175) ([2883cc5](https://github.com/openfoodfacts/open-prices-frontend/commit/2883cc5a9e1ae0fc4838bd1b2247bec6f187135a))
* **Receipt Assistant:** move to new promo-callout to a dedicated component. ref [#1560](https://github.com/openfoodfacts/open-prices-frontend/issues/1560) ([ed2f5ea](https://github.com/openfoodfacts/open-prices-frontend/commit/ed2f5ea4aff829a26807af26a1254d787607327d))

## [1.134.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.134.2...v1.134.3) (2025-06-05)


### Technical

* **Receipt Assistant:** init receipt_quantity to 1 ([58c8ec9](https://github.com/openfoodfacts/open-prices-frontend/commit/58c8ec937188a5ddfa1a0af336efb31358d21466))
* **Receipt Assistant:** quick cleanup & typo fix ([6b02e3e](https://github.com/openfoodfacts/open-prices-frontend/commit/6b02e3ed7fbd900a9e6be1ab5420c7999135146e))
* **Receipt Quantity:** new PriceQuantityPurchasedChip component ([#1558](https://github.com/openfoodfacts/open-prices-frontend/issues/1558)) ([ca0fc13](https://github.com/openfoodfacts/open-prices-frontend/commit/ca0fc139a44363e882ce7b740f25aa093066f21c))

## [1.134.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.134.1...v1.134.2) (2025-05-18)


### Technical

* **Proof form:** simplify a bit the ProofTypeInputRow code ([de144b5](https://github.com/openfoodfacts/open-prices-frontend/commit/de144b559d082890d6b73ac949956162292c774d))
* **Receipt Assistant:** hide progress bar when all prices have been uploaded. mimick other workflows. ref [#1507](https://github.com/openfoodfacts/open-prices-frontend/issues/1507) ([f3c0f34](https://github.com/openfoodfacts/open-prices-frontend/commit/f3c0f34b998c4771ab1f8d4536908156347c7282))
* **Receipt Assistant:** in the product edit modal, allow scanning the barcode. ref [#1507](https://github.com/openfoodfacts/open-prices-frontend/issues/1507) ([c3fbd4f](https://github.com/openfoodfacts/open-prices-frontend/commit/c3fbd4f59e898299d6a2ef480c9e7845aef71714))
* **Receipt Assistant:** UserRecentProofsDialog: show only receipt proofs. ref [#1507](https://github.com/openfoodfacts/open-prices-frontend/issues/1507) ([abf1fc2](https://github.com/openfoodfacts/open-prices-frontend/commit/abf1fc2ae847012c8d5e30887f921e29b13ebc3f))

## [1.134.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.134.0...v1.134.1) (2025-05-08)


### Bug Fixes

* **Challenges:** card links: use 'to' instead of 'click' ([1419327](https://github.com/openfoodfacts/open-prices-frontend/commit/1419327f819c4092722171bda2f3e997362006c0))
* **Products:** fix missing hasProductSource in ProductCard. ref [#1547](https://github.com/openfoodfacts/open-prices-frontend/issues/1547) ([5541cc5](https://github.com/openfoodfacts/open-prices-frontend/commit/5541cc5e32e836c7c5310dad02a572599fc706f8))


### Technical

* **Products:** move product default image url to constants ([0baa690](https://github.com/openfoodfacts/open-prices-frontend/commit/0baa69021cc88f27d08796f31e146e48d1092a78))
* **URLs:** use 'to' instead of 'click' when possible ([42af6c1](https://github.com/openfoodfacts/open-prices-frontend/commit/42af6c1e88e93eef9b8faf52c2d5449884e6b15d))

## [1.134.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.133.1...v1.134.0) (2025-05-06)


### Features

* **Barcode Scanner:** use openfoodfacts-webcomponents (and allow user to switch back to html5-qrcode) ([#1545](https://github.com/openfoodfacts/open-prices-frontend/issues/1545)) ([6e94b98](https://github.com/openfoodfacts/open-prices-frontend/commit/6e94b98b981295ea38bb5c3350eda27585d93699))


### Bug Fixes

* **Products:** better manage non-en category tags ([#1549](https://github.com/openfoodfacts/open-prices-frontend/issues/1549)) ([e33733d](https://github.com/openfoodfacts/open-prices-frontend/commit/e33733da94047f467baf747dcbd824189c681f67))


### Technical

* **Products:** new PriceCategoryDetails component ([#1548](https://github.com/openfoodfacts/open-prices-frontend/issues/1548)) ([21a3495](https://github.com/openfoodfacts/open-prices-frontend/commit/21a349553002aad886d48c72e679ccbcb3638586))
* **Products:** new ProductDetails component ([#1547](https://github.com/openfoodfacts/open-prices-frontend/issues/1547)) ([1b8c67c](https://github.com/openfoodfacts/open-prices-frontend/commit/1b8c67cada2b8cb709ed5a7d3ebf3885844b443c))
* **Proof detail:** add display toggle. allow displaying prices by list or table ([#1543](https://github.com/openfoodfacts/open-prices-frontend/issues/1543)) ([39a6a17](https://github.com/openfoodfacts/open-prices-frontend/commit/39a6a1735bd1d6ea6840051e9c2c582f7765a46d))
* **Receipt Assistant:** move table actions into row with spacer. ref [#1507](https://github.com/openfoodfacts/open-prices-frontend/issues/1507) ([aebf792](https://github.com/openfoodfacts/open-prices-frontend/commit/aebf7926ffc9b1797c5acc1b3912d5500893a8e4))
* **Receipt Assistant:** show price count & price total below table ([#1542](https://github.com/openfoodfacts/open-prices-frontend/issues/1542)) ([d8b2382](https://github.com/openfoodfacts/open-prices-frontend/commit/d8b238214344e5d9324b7428a7785d7d15a70517))

## [1.133.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.133.0...v1.133.1) (2025-05-02)


### Bug Fixes

* **Price input:** additional checks if the currency is not provided ([1d46c56](https://github.com/openfoodfacts/open-prices-frontend/commit/1d46c56ac248f8ab420b6e8ef2bcff0a378ef4c8))


### Technical

* **Challenges:** only use tag__contains as filter param. ref [#1527](https://github.com/openfoodfacts/open-prices-frontend/issues/1527) ([0821774](https://github.com/openfoodfacts/open-prices-frontend/commit/08217745a3c779e0a2a2c551a035eca010ff374c))
* **Receipt Assistant:** in price edit dialog, hide the proof details. ref [#1507](https://github.com/openfoodfacts/open-prices-frontend/issues/1507) ([55418d9](https://github.com/openfoodfacts/open-prices-frontend/commit/55418d92460e32e22eb6c57fe43f7b2b4429f546))
* **Receipt Assistant:** in price edit dialog, show the quantity_bought field. ref [#1507](https://github.com/openfoodfacts/open-prices-frontend/issues/1507) ([5f52b29](https://github.com/openfoodfacts/open-prices-frontend/commit/5f52b2991097ac5e184141c366237e43d8ca55dd))

## [1.133.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.132.1...v1.133.0) (2025-05-01)


### Features

* **Challenges:** new page to list all of the challenge's prices ([#1538](https://github.com/openfoodfacts/open-prices-frontend/issues/1538)) ([050ada6](https://github.com/openfoodfacts/open-prices-frontend/commit/050ada66025ab3d273a9e1dea04dd5a0032ec866))
* **Challenges:** new page to list all of the challenge's proofs ([#1537](https://github.com/openfoodfacts/open-prices-frontend/issues/1537)) ([bb2cef3](https://github.com/openfoodfacts/open-prices-frontend/commit/bb2cef3ad665467f4931d42ff7124f5b468966bd))


### Technical

* **Challenges:** make total proof & price stat counts clickable ([#1539](https://github.com/openfoodfacts/open-prices-frontend/issues/1539)) ([ca3bed2](https://github.com/openfoodfacts/open-prices-frontend/commit/ca3bed21387a0daa07b6892c015af49c775f3eff))
* **l10n:** New Crowdin translations to review and merge ([#1525](https://github.com/openfoodfacts/open-prices-frontend/issues/1525)) ([387949e](https://github.com/openfoodfacts/open-prices-frontend/commit/387949e066fc7b4a3a03221647c1ae6575c83dc4))
* **Prices:** make views listing prices more generic ([0063a1a](https://github.com/openfoodfacts/open-prices-frontend/commit/0063a1a41ff3afde026c282c96e902488d53d899))
* **Proofs:** make LocationProofList, UserDashboardProofList & UserProofList views more generic ([58dec76](https://github.com/openfoodfacts/open-prices-frontend/commit/58dec7696f6da06c0efa70d62d7826379551c9cd))

## [1.132.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.132.0...v1.132.1) (2025-04-30)


### Technical

* **Challenge:** use new tags api param ([#1527](https://github.com/openfoodfacts/open-prices-frontend/issues/1527)) ([59a65cc](https://github.com/openfoodfacts/open-prices-frontend/commit/59a65ccfd44859e33ecc5d59e3efb0b871cf2b48))

## [1.132.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.131.2...v1.132.0) (2025-04-25)


### Features

* **Prices:** new table view ([#1522](https://github.com/openfoodfacts/open-prices-frontend/issues/1522)) ([98ba0aa](https://github.com/openfoodfacts/open-prices-frontend/commit/98ba0aa1670abb6b5fb5a0162c65178415d2a350))
* **Settings:** allow users to set a default price list display ([#1524](https://github.com/openfoodfacts/open-prices-frontend/issues/1524)) ([79bade6](https://github.com/openfoodfacts/open-prices-frontend/commit/79bade65d0f20ce2b9646ada4ba8020627141ae9))


### Technical

* **Display Menu dropdown:** seperate price & location behavior ([768e6f8](https://github.com/openfoodfacts/open-prices-frontend/commit/768e6f86d32630d5822f56e069ea9a2b5fdd4308))
* **l10n:** New Crowdin translations to review and merge ([#1521](https://github.com/openfoodfacts/open-prices-frontend/issues/1521)) ([1be011f](https://github.com/openfoodfacts/open-prices-frontend/commit/1be011f3907d4bdd00d756c8fba152cb6ac20b86))
* **Reuse card:** small improvement in layout and CTA look & feel ([8c7b7ed](https://github.com/openfoodfacts/open-prices-frontend/commit/8c7b7ed14b95dd5461b34b3682afe80fa46202fa))

## [1.131.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.131.1...v1.131.2) (2025-04-23)


### Bug Fixes

* **OFF Link:** use the user country_code instead of language_code for the URL prefix ([#1518](https://github.com/openfoodfacts/open-prices-frontend/issues/1518)) ([37bbe6f](https://github.com/openfoodfacts/open-prices-frontend/commit/37bbe6f27494767072bb9d2bf919ed9fec777fa1))
* **Price Validation Assistant:** fix filter refresh and duplication ([#1516](https://github.com/openfoodfacts/open-prices-frontend/issues/1516)) ([f0cccbb](https://github.com/openfoodfacts/open-prices-frontend/commit/f0cccbbf7f28e3a1f8d6456c79cb15700509a356))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1510](https://github.com/openfoodfacts/open-prices-frontend/issues/1510)) ([2b5bbf7](https://github.com/openfoodfacts/open-prices-frontend/commit/2b5bbf7ea1dc0c4d8d7b78b07800a4863c18c1d1))

## [1.131.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.131.0...v1.131.1) (2025-04-18)


### Bug Fixes

* **Receipt Assistant:** store predictions in a dedicated variable. fix error not displaying. ref [#1507](https://github.com/openfoodfacts/open-prices-frontend/issues/1507) ([843cda6](https://github.com/openfoodfacts/open-prices-frontend/commit/843cda6b7f93b1fa69e36c5110ec9635e6fa2a45))

## [1.131.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.130.2...v1.131.0) (2025-04-18)


### Features

* **Challenge:** Add support for multiple product categories ([#1513](https://github.com/openfoodfacts/open-prices-frontend/issues/1513)) ([68c6c7e](https://github.com/openfoodfacts/open-prices-frontend/commit/68c6c7e3c9fdf473602b566e67734459adcf4c8a))


### Bug Fixes

* **Proof Upload:** only show 'Delivery costs' field if an online location is selected ([#1508](https://github.com/openfoodfacts/open-prices-frontend/issues/1508)) ([18f6386](https://github.com/openfoodfacts/open-prices-frontend/commit/18f6386001b4f34c1621597b837a7da9d8412909))

## [1.130.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.130.1...v1.130.2) (2025-04-13)


### Bug Fixes

* **Price add:** Allow 'quantity bought' field to have 3 decimals ([#1499](https://github.com/openfoodfacts/open-prices-frontend/issues/1499)) ([d13162d](https://github.com/openfoodfacts/open-prices-frontend/commit/d13162df8319a1bd69b8fb04045ffb87fa430323))
* **Receipt Assistant:** fix step 2 label (Prices instead of Labels). ref [#1507](https://github.com/openfoodfacts/open-prices-frontend/issues/1507) ([09a04ae](https://github.com/openfoodfacts/open-prices-frontend/commit/09a04aebdaa2df885a9e78753fe017367db9c316))
* **Receipt Assistant:** fix top padding due to v-if in v-col. ref [#1507](https://github.com/openfoodfacts/open-prices-frontend/issues/1507) ([536432d](https://github.com/openfoodfacts/open-prices-frontend/commit/536432dc73261245064972789483c5a5b6ab2b17))
* **Receipt Assistant:** mobile: hide 'sort by' header. ref [#1507](https://github.com/openfoodfacts/open-prices-frontend/issues/1507) ([0a4c67a](https://github.com/openfoodfacts/open-prices-frontend/commit/0a4c67ace22b849bdb11431b6317ba591e2c7c89))
* **Receipt Assistant:** show green border around proof card. ref [#1507](https://github.com/openfoodfacts/open-prices-frontend/issues/1507) ([f96b813](https://github.com/openfoodfacts/open-prices-frontend/commit/f96b81345002eed9bf6021bd68cf19400f1be241))
* **Receipt Assistant:** show proof card immediately after upload. ref [#1507](https://github.com/openfoodfacts/open-prices-frontend/issues/1507) ([da6c903](https://github.com/openfoodfacts/open-prices-frontend/commit/da6c903a1d08b78d66863f51291940e233d8e5d5))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1495](https://github.com/openfoodfacts/open-prices-frontend/issues/1495)) ([7530982](https://github.com/openfoodfacts/open-prices-frontend/commit/7530982f89fab15b89e1cf0bbd3c6c29244dee32))
* **Proof upload:** seperate validation toggle and AI info ([#1506](https://github.com/openfoodfacts/open-prices-frontend/issues/1506)) ([0aff907](https://github.com/openfoodfacts/open-prices-frontend/commit/0aff907a3f64855e092f5fe1461d8b908f303e84))
* **Receipt Assistant:** show a readonly toggle indicating that AI will run on the image ([#1501](https://github.com/openfoodfacts/open-prices-frontend/issues/1501)) ([dfd7709](https://github.com/openfoodfacts/open-prices-frontend/commit/dfd7709ffa85e5c0b4baf957ec84b87d0d19aad2))

## [1.130.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.130.0...v1.130.1) (2025-04-05)


### Bug Fixes

* **Receipt Assistant:** fix CTA user dashboard url. ref [#1491](https://github.com/openfoodfacts/open-prices-frontend/issues/1491) ([4a4ab92](https://github.com/openfoodfacts/open-prices-frontend/commit/4a4ab920d86eafaa85c3c990872df6f17ef2a9f8))


### Technical

* **Crops:** improve perfomances ([#1494](https://github.com/openfoodfacts/open-prices-frontend/issues/1494)) ([55b6b46](https://github.com/openfoodfacts/open-prices-frontend/commit/55b6b467ce74e4a1b452a423fc7e5c53f394b846))
* **l10n:** New Crowdin translations to review and merge ([#1492](https://github.com/openfoodfacts/open-prices-frontend/issues/1492)) ([5484de1](https://github.com/openfoodfacts/open-prices-frontend/commit/5484de1a5b575338e53328dbbd40a2bde21adccb))

## [1.130.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.129.0...v1.130.0) (2025-04-02)


### Features

* **Experiments:** Receipt Assistant ([#1394](https://github.com/openfoodfacts/open-prices-frontend/issues/1394)) ([47d8c02](https://github.com/openfoodfacts/open-prices-frontend/commit/47d8c02147497a777efdcf501a5a6aca03117580))


### Technical

* **Experiments:** remove Multiple proof add & Challenge (not experiments anymore) ([9e40ed9](https://github.com/openfoodfacts/open-prices-frontend/commit/9e40ed97d5dd0a83623f75787912b452576bf790))
* **l10n:** New Crowdin translations to review and merge ([#1473](https://github.com/openfoodfacts/open-prices-frontend/issues/1473)) ([947af16](https://github.com/openfoodfacts/open-prices-frontend/commit/947af16245ecb33f9015e7e63bdb8f5940f8b847))
* **User Dashboard:** point some CTAs directly to the correct tab. Use 'to' instead of 'click' ([#1491](https://github.com/openfoodfacts/open-prices-frontend/issues/1491)) ([580feb0](https://github.com/openfoodfacts/open-prices-frontend/commit/580feb0607201595f6d0c93b7549c9c2c2cb97a2))

## [1.129.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.128.0...v1.129.0) (2025-03-23)


### Features

* **User Dashboard:** add a new filter by kind (prices & proofs) (consumption or community) ([#1471](https://github.com/openfoodfacts/open-prices-frontend/issues/1471)) ([a54d2a8](https://github.com/openfoodfacts/open-prices-frontend/commit/a54d2a895a72326b1e74d500d33808d5e07c380e))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1470](https://github.com/openfoodfacts/open-prices-frontend/issues/1470)) ([c243ffe](https://github.com/openfoodfacts/open-prices-frontend/commit/c243ffe95ef22fdebcd1617d55c5c9dd9d739fea))

## [1.128.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.127.0...v1.128.0) (2025-03-23)


### Features

* **Challenges:** read from api, add challenges list page ([#1459](https://github.com/openfoodfacts/open-prices-frontend/issues/1459)) ([f07b029](https://github.com/openfoodfacts/open-prices-frontend/commit/f07b0294dd61567f7fca43475a36c1749eaf4966))
* **Reuses:** add 2 new reuses by Albert :rocket:  ([#1467](https://github.com/openfoodfacts/open-prices-frontend/issues/1467)) ([de58f84](https://github.com/openfoodfacts/open-prices-frontend/commit/de58f84b420031748019ffc1338c661310c3e724))


### Bug Fixes

* **Stats:** change price_type_group to price_kind (community & consumption) ([#1468](https://github.com/openfoodfacts/open-prices-frontend/issues/1468)) ([4e6a3a7](https://github.com/openfoodfacts/open-prices-frontend/commit/4e6a3a7f74f7a85c1154955c1223b487d32e1a9f))


### Technical

* **Challenges:** challenge card ([#1463](https://github.com/openfoodfacts/open-prices-frontend/issues/1463)) ([0703f55](https://github.com/openfoodfacts/open-prices-frontend/commit/0703f55bb86eea4cc79bfcfd99b2f163a2ee7268))
* **Challenges:** Remove status filter + cleanup ([#1466](https://github.com/openfoodfacts/open-prices-frontend/issues/1466)) ([5803726](https://github.com/openfoodfacts/open-prices-frontend/commit/5803726d794ca202fcbcce44cc316ca9516ddeba))
* **l10n:** New Crowdin translations to review and merge ([#1460](https://github.com/openfoodfacts/open-prices-frontend/issues/1460)) ([05bc89a](https://github.com/openfoodfacts/open-prices-frontend/commit/05bc89a2600d383c87720a943a85dd8302b062db))
* **l10n:** New Crowdin translations to review and merge ([#1464](https://github.com/openfoodfacts/open-prices-frontend/issues/1464)) ([a2141ca](https://github.com/openfoodfacts/open-prices-frontend/commit/a2141ca5bc7b878f77037a27cedcdec432119da9))
* **User Dashboard:** fetch price & proof data using the new `kind` filter ([#1469](https://github.com/openfoodfacts/open-prices-frontend/issues/1469)) ([2ae1c82](https://github.com/openfoodfacts/open-prices-frontend/commit/2ae1c8218f6d0697e5f897d8f3fee51282f6f2ff))

## [1.127.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.126.0...v1.127.0) (2025-03-21)


### Features

* **User Dashboard:** start splitting data between consumption & community ([#1402](https://github.com/openfoodfacts/open-prices-frontend/issues/1402)) ([ea4dbb0](https://github.com/openfoodfacts/open-prices-frontend/commit/ea4dbb0b84cad5b5101aae5fbbe493c26a7b5fbd))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1457](https://github.com/openfoodfacts/open-prices-frontend/issues/1457)) ([ab68715](https://github.com/openfoodfacts/open-prices-frontend/commit/ab68715912694f406edc2b5e160767f7791140e2))

## [1.126.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.125.2...v1.126.0) (2025-03-20)


### Features

* **Prices:** allow editing receipt quantity field ([#1453](https://github.com/openfoodfacts/open-prices-frontend/issues/1453)) ([6d91efa](https://github.com/openfoodfacts/open-prices-frontend/commit/6d91efaa51912c8f7e26bff7f6face1403902667))
* **Prices:** display a suffix next to the receipt quantity field (kg) ([#1455](https://github.com/openfoodfacts/open-prices-frontend/issues/1455)) ([e4b8b96](https://github.com/openfoodfacts/open-prices-frontend/commit/e4b8b968d83545a6b80dc23d1f788ea03dfd61a7))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1451](https://github.com/openfoodfacts/open-prices-frontend/issues/1451)) ([b801d6c](https://github.com/openfoodfacts/open-prices-frontend/commit/b801d6cffa429f9f505e8eda46fa772aaff5b04f))

## [1.125.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.125.1...v1.125.2) (2025-03-14)


### Bug Fixes

* **Proofs:** hide GDPR_REQUEST from ProofUploadCard type choices ([d365ebd](https://github.com/openfoodfacts/open-prices-frontend/commit/d365ebdb6cd8cce42fe6c5556ba7467a789b7f93))

## [1.125.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.125.0...v1.125.1) (2025-03-12)


### Bug Fixes

* **Proofs:** hide the comment field on the multiple proof upload page. ref [#1446](https://github.com/openfoodfacts/open-prices-frontend/issues/1446) ([3ec2024](https://github.com/openfoodfacts/open-prices-frontend/commit/3ec2024cf06f70e6c102c4084ef54a688cd2d3fa))
* **Proofs:** move up the comment field above the consumption toggle. ref [#1446](https://github.com/openfoodfacts/open-prices-frontend/issues/1446) ([2493be8](https://github.com/openfoodfacts/open-prices-frontend/commit/2493be870be4177134d97410f1c6222959d9b2e3))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1449](https://github.com/openfoodfacts/open-prices-frontend/issues/1449)) ([93f7ab3](https://github.com/openfoodfacts/open-prices-frontend/commit/93f7ab371f2f94a8bde88ff87b79a3752e6ec0a2))
* **Proofs:** add GDPR_REQUEST to the type filter ([84c2f80](https://github.com/openfoodfacts/open-prices-frontend/commit/84c2f80033e849abf4a16aab43914de24de6181e))
* **Proofs:** move the ready_for_price_tag_validation field to the ProofMetadataInputRow. ref [#1373](https://github.com/openfoodfacts/open-prices-frontend/issues/1373) ([b879d7e](https://github.com/openfoodfacts/open-prices-frontend/commit/b879d7e2efc357e9551e2d154335bbb15a4f0d46))

## [1.125.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.124.1...v1.125.0) (2025-03-12)


### Features

* **Prices:** display the new owner_comment field (form, chip, history) ([#1448](https://github.com/openfoodfacts/open-prices-frontend/issues/1448)) ([c6b2c71](https://github.com/openfoodfacts/open-prices-frontend/commit/c6b2c7192322f36ccc7377bf3dd179adefa994f8))
* **Proofs:** display the new owner_comment field (form, chip, history) ([#1446](https://github.com/openfoodfacts/open-prices-frontend/issues/1446)) ([9ed2c7f](https://github.com/openfoodfacts/open-prices-frontend/commit/9ed2c7f287e0425765832c81acba4fc21be01133))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1445](https://github.com/openfoodfacts/open-prices-frontend/issues/1445)) ([c8fdf51](https://github.com/openfoodfacts/open-prices-frontend/commit/c8fdf51b2fa6dea4811862550a1cf76cb4d1b5d2))

## [1.124.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.124.0...v1.124.1) (2025-03-09)


### Technical

* **Forms:** add a red asterisk next to the required field labels ([#1443](https://github.com/openfoodfacts/open-prices-frontend/issues/1443)) ([1c304fd](https://github.com/openfoodfacts/open-prices-frontend/commit/1c304fd222b716b9b9b08bf5cb11f142e683bfd1))
* **Price add:** change look & feel of input select fields ([#1444](https://github.com/openfoodfacts/open-prices-frontend/issues/1444)) ([b391117](https://github.com/openfoodfacts/open-prices-frontend/commit/b3911172e5909643d3f8214863cbb9d5920c61c0))
* **Price add:** change look & feel of input text fields ([#1441](https://github.com/openfoodfacts/open-prices-frontend/issues/1441)) ([ce166c4](https://github.com/openfoodfacts/open-prices-frontend/commit/ce166c463397bfa19c8ab50ac28d08a5ac9ba12e))
* simplify row & col in ProductInputRow & PriceInputRow ([4ccb34a](https://github.com/openfoodfacts/open-prices-frontend/commit/4ccb34a248f6a22ed510d00825bd715b9e4a7eec))

## [1.124.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.123.1...v1.124.0) (2025-03-09)


### Features

* **Proofs:** display the new owner_consumption field (form, chip) ([#1435](https://github.com/openfoodfacts/open-prices-frontend/issues/1435)) ([89a5b07](https://github.com/openfoodfacts/open-prices-frontend/commit/89a5b0710700ab545916b9bd76e2cb04df9268eb))


### Technical

* **Forms:** add green color to v-switch (Proof, Price & Settings) ([#1438](https://github.com/openfoodfacts/open-prices-frontend/issues/1438)) ([447a06b](https://github.com/openfoodfacts/open-prices-frontend/commit/447a06bc6c63249baee8d30820eff9a9828d45ee))
* **Forms:** replace v-checkbox with v-switch (Proof & Price) ([#1437](https://github.com/openfoodfacts/open-prices-frontend/issues/1437)) ([26ad4b9](https://github.com/openfoodfacts/open-prices-frontend/commit/26ad4b9fa346980afdbc331bc1f1db9bf39d4629))
* **l10n:** New Crowdin translations to review and merge ([#1440](https://github.com/openfoodfacts/open-prices-frontend/issues/1440)) ([68f18a6](https://github.com/openfoodfacts/open-prices-frontend/commit/68f18a66ec29f5be84a06d7a56caf35076cdbf48))
* **Proofs:** move up the location field above the image(s) ([#1439](https://github.com/openfoodfacts/open-prices-frontend/issues/1439)) ([7747015](https://github.com/openfoodfacts/open-prices-frontend/commit/7747015656ff1b9082aeb55d6e8558e99929943b))

## [1.123.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.123.0...v1.123.1) (2025-03-08)


### Technical

* **Challenge:** display Home banner only if ongoing challenge ([#1434](https://github.com/openfoodfacts/open-prices-frontend/issues/1434)) ([d50ebda](https://github.com/openfoodfacts/open-prices-frontend/commit/d50ebda75bbb15f3003fd66bcc6671402e282593))
* **Challenge:** move the configuration to a dedicated JSON file ([#1433](https://github.com/openfoodfacts/open-prices-frontend/issues/1433)) ([e143e26](https://github.com/openfoodfacts/open-prices-frontend/commit/e143e268845874e750c441fff1dbcc4b79cf97ea))
* **Community:** add links to daily jsonl.gz dumps. ref [#1064](https://github.com/openfoodfacts/open-prices-frontend/issues/1064) ([cd91846](https://github.com/openfoodfacts/open-prices-frontend/commit/cd918462c4e8b768672aea1cbd958b28f4d45fd5))
* **l10n:** New Crowdin translations to review and merge ([#1429](https://github.com/openfoodfacts/open-prices-frontend/issues/1429)) ([c216bef](https://github.com/openfoodfacts/open-prices-frontend/commit/c216bef6dd6f51fa6dd1d0d17fa4da87fb7718d8))

## [1.123.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.122.4...v1.123.0) (2025-03-04)


### Features

* **Proofs:** Display the new receipt_online_delivery_costs field in the form ([#1427](https://github.com/openfoodfacts/open-prices-frontend/issues/1427)) ([18ceba8](https://github.com/openfoodfacts/open-prices-frontend/commit/18ceba87c34369052444af5d78f3737a835e022e))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1426](https://github.com/openfoodfacts/open-prices-frontend/issues/1426)) ([b1e85af](https://github.com/openfoodfacts/open-prices-frontend/commit/b1e85af638247739ed6f85fa7a8995dff5a9089f))

## [1.122.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.122.3...v1.122.4) (2025-03-03)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1399](https://github.com/openfoodfacts/open-prices-frontend/issues/1399)) ([4ca5d5a](https://github.com/openfoodfacts/open-prices-frontend/commit/4ca5d5a4f508e48e408fa900711fc0676d53aea9))
* **l10n:** New Crowdin translations to review and merge ([#1425](https://github.com/openfoodfacts/open-prices-frontend/issues/1425)) ([a0133a2](https://github.com/openfoodfacts/open-prices-frontend/commit/a0133a2fa7c8ec17b549dd23ae1fe9c951855dc8))
* rename main branch from 'master' to 'main' ([#1421](https://github.com/openfoodfacts/open-prices-frontend/issues/1421)) ([e759b39](https://github.com/openfoodfacts/open-prices-frontend/commit/e759b3983f9d579d0196fbb8e30dd7a41f25645d))
* **Stats:** new unique country stats (in Misc) ([#1423](https://github.com/openfoodfacts/open-prices-frontend/issues/1423)) ([384a658](https://github.com/openfoodfacts/open-prices-frontend/commit/384a658ed3d48026861d350a8271d591b18267b4))
* **Stats:** new unique year count stat (in Misc) ([#1424](https://github.com/openfoodfacts/open-prices-frontend/issues/1424)) ([9eeb208](https://github.com/openfoodfacts/open-prices-frontend/commit/9eeb2085888ad740507ff7a596d2de635efb5316))

## [1.122.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.122.2...v1.122.3) (2025-03-01)


### Bug Fixes

* **Search:** avoid product disappearing when clicking on the search icon ([6ca59f5](https://github.com/openfoodfacts/open-prices-frontend/commit/6ca59f5b4098c40c8afab852b4ecb2f6a014bc40))
* **Search:** don't run a search if the field is empty ([9a00798](https://github.com/openfoodfacts/open-prices-frontend/commit/9a0079823001e250e8e656ee5d316da4e1fce2b4))


### Technical

* **Stats:** new Misc section. Show prices & proofs count per source ([#1403](https://github.com/openfoodfacts/open-prices-frontend/issues/1403)) ([b19a0fd](https://github.com/openfoodfacts/open-prices-frontend/commit/b19a0fd4d5c43043e9f8703a066f84bb9ef64ddc))

## [1.122.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.122.1...v1.122.2) (2025-02-25)


### Technical

* **History:** show the price & proof source info ([#1395](https://github.com/openfoodfacts/open-prices-frontend/issues/1395)) ([49b6295](https://github.com/openfoodfacts/open-prices-frontend/commit/49b6295f3eaa662fda8a8694d7ce7d2760a3356f))
* **l10n:** New Crowdin translations to review and merge ([#1398](https://github.com/openfoodfacts/open-prices-frontend/issues/1398)) ([46c79c0](https://github.com/openfoodfacts/open-prices-frontend/commit/46c79c083c8b2d6a561e05dcd3c69dd5a469f6cd))
* **Stats:** new community & consumption price counts ([#1397](https://github.com/openfoodfacts/open-prices-frontend/issues/1397)) ([a7b092d](https://github.com/openfoodfacts/open-prices-frontend/commit/a7b092d90966a25366230ff6605aa7a6b5ed2a97))

## [1.122.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.122.0...v1.122.1) (2025-02-24)


### Bug Fixes

* **Community:** fix URLs to Slack & data.gouv. ref [#1064](https://github.com/openfoodfacts/open-prices-frontend/issues/1064) ([3b87310](https://github.com/openfoodfacts/open-prices-frontend/commit/3b87310b942e2fbb9fcbad22743435f039daa7d9))
* **Stats:** switch Product stats order. ref [#1389](https://github.com/openfoodfacts/open-prices-frontend/issues/1389) ([6efb840](https://github.com/openfoodfacts/open-prices-frontend/commit/6efb84052963dca7f9ebc89db78d4d3b46aa1a9f))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1390](https://github.com/openfoodfacts/open-prices-frontend/issues/1390)) ([933fc43](https://github.com/openfoodfacts/open-prices-frontend/commit/933fc439ac56eef1aed804a9340566075297955c))
* **Prices:** Add new discount_type 'Second hand'. ref [#1386](https://github.com/openfoodfacts/open-prices-frontend/issues/1386) ([b13cf06](https://github.com/openfoodfacts/open-prices-frontend/commit/b13cf06e8047dc2e0ded45578bd2e32cfd2bd48a))
* **Stats:** Add the new price with_discount count ([#1392](https://github.com/openfoodfacts/open-prices-frontend/issues/1392)) ([a5914e6](https://github.com/openfoodfacts/open-prices-frontend/commit/a5914e6f8a06001c65fbdd7c6960e3cd428a7e96))

## [1.122.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.121.0...v1.122.0) (2025-02-22)


### Features

* **Stats:** display price count per product source (OxF flavors) ([#1389](https://github.com/openfoodfacts/open-prices-frontend/issues/1389)) ([af3ddfa](https://github.com/openfoodfacts/open-prices-frontend/commit/af3ddfa4a3880b649530d6ff3112d69e20bc23fb))


### Bug Fixes

* **Challenge:** fix timeline wording for first day. ref [#1384](https://github.com/openfoodfacts/open-prices-frontend/issues/1384) ([f501e21](https://github.com/openfoodfacts/open-prices-frontend/commit/f501e210391c141b26f17426bf70cda31c863f7d))
* **Challenge:** improve start & end date queries. ref [#1384](https://github.com/openfoodfacts/open-prices-frontend/issues/1384) ([d98734c](https://github.com/openfoodfacts/open-prices-frontend/commit/d98734cbbf1c278dcd68d9b227913a95865de4d4))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1383](https://github.com/openfoodfacts/open-prices-frontend/issues/1383)) ([98fcd43](https://github.com/openfoodfacts/open-prices-frontend/commit/98fcd43b4e5dd03dec82c88b3a5ccafbdedadc35))

## [1.121.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.120.0...v1.121.0) (2025-02-20)


### Features

* **Prices:** Show the new discount_type field in the Price form ([#1386](https://github.com/openfoodfacts/open-prices-frontend/issues/1386)) ([038a984](https://github.com/openfoodfacts/open-prices-frontend/commit/038a9844c0e3b508ad937d5118b25a83aa6b7a7f))


### Bug Fixes

* **Challenge:** Timeline: fix off-by-one end date error ([#1384](https://github.com/openfoodfacts/open-prices-frontend/issues/1384)) ([fd0f326](https://github.com/openfoodfacts/open-prices-frontend/commit/fd0f32678a376c129fab136265ff7546e4881d1c))


### Technical

* fix deploy proxy host ([#1387](https://github.com/openfoodfacts/open-prices-frontend/issues/1387)) ([9d9e14d](https://github.com/openfoodfacts/open-prices-frontend/commit/9d9e14dc229b3669cb6eea967f5fcd371ea49b9a))

## [1.120.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.119.0...v1.120.0) (2025-02-16)


### Features

* **Barcode search:** allow wildcard search thanks to search-a-licious ([#1382](https://github.com/openfoodfacts/open-prices-frontend/issues/1382)) ([ce780ff](https://github.com/openfoodfacts/open-prices-frontend/commit/ce780ff5cd50d7874c930f6db1a75ad71f082bce))
* **Reuses:** add prixdle.com ([#1379](https://github.com/openfoodfacts/open-prices-frontend/issues/1379)) ([8cde17a](https://github.com/openfoodfacts/open-prices-frontend/commit/8cde17ad6548bc827f7ab0189e0de2b070af84a4))


### Technical

* **API:** reorganize a bit the api.js file ([58fa023](https://github.com/openfoodfacts/open-prices-frontend/commit/58fa023844d96ba9347fa7d4ebd7e04b738cfd31))
* compress images in the public folder ([#1381](https://github.com/openfoodfacts/open-prices-frontend/issues/1381)) ([8b14173](https://github.com/openfoodfacts/open-prices-frontend/commit/8b1417396d9d22a7e61ee24ca240b4887102db56))
* **ContributionAssistant:** display correct values for existing prices ([#1377](https://github.com/openfoodfacts/open-prices-frontend/issues/1377)) ([975e77c](https://github.com/openfoodfacts/open-prices-frontend/commit/975e77c515f501ee9b9c5007e1a667ac9d164465))
* **l10n:** New Crowdin translations to review and merge ([#1372](https://github.com/openfoodfacts/open-prices-frontend/issues/1372)) ([2705366](https://github.com/openfoodfacts/open-prices-frontend/commit/2705366595cf0607bd6d26fca34e7f2bff7f4058))

## [1.119.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.118.0...v1.119.0) (2025-02-12)


### Features

* **Proof upload:** allow to opt-out from price tag validation ([#1373](https://github.com/openfoodfacts/open-prices-frontend/issues/1373)) ([0a40d2e](https://github.com/openfoodfacts/open-prices-frontend/commit/0a40d2ed60f73b6b531ffbf12d646838927270e6))


### Bug Fixes

* **Proof upload:** small adjustement on the ready_for_price_tag_validation checkbox label. ref [#1373](https://github.com/openfoodfacts/open-prices-frontend/issues/1373) ([077b709](https://github.com/openfoodfacts/open-prices-frontend/commit/077b7097b7b42fb7d5d436dfa5f5d8ba936afe1a))

## [1.118.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.117.0...v1.118.0) (2025-02-09)


### Features

* **CA:** Allow edit of error'd price tags ([#1366](https://github.com/openfoodfacts/open-prices-frontend/issues/1366)) ([fde7b60](https://github.com/openfoodfacts/open-prices-frontend/commit/fde7b600b02a1b77cdd5c12789a9bb7fdf8c63c0))
* **LocationMap:** Display tooltips as cards and allow selection ([#1368](https://github.com/openfoodfacts/open-prices-frontend/issues/1368)) ([d256659](https://github.com/openfoodfacts/open-prices-frontend/commit/d25665985b999bf955fc085bdecb996c91e6285b))


### Bug Fixes

* **User Card:** fix missing currency count chip margin. ref [#1352](https://github.com/openfoodfacts/open-prices-frontend/issues/1352) ([25674cb](https://github.com/openfoodfacts/open-prices-frontend/commit/25674cbe4ce0961ac0da2c240514a648f065fd0b))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1367](https://github.com/openfoodfacts/open-prices-frontend/issues/1367)) ([f3c87e5](https://github.com/openfoodfacts/open-prices-frontend/commit/f3c87e5e3e1c65bb41fd417389e1995570622640))
* **l10n:** New Crowdin translations to review and merge ([#1370](https://github.com/openfoodfacts/open-prices-frontend/issues/1370)) ([ef2f758](https://github.com/openfoodfacts/open-prices-frontend/commit/ef2f75878da955a878088d5ab6ad6f89ac7035d9))
* **Location count chip:** use component in UserCard ([b91fdba](https://github.com/openfoodfacts/open-prices-frontend/commit/b91fdba8066a469121fbc20f5c9ce905b377c2a2))
* **Price count chip:** set margin in parent components instead ([88f53d0](https://github.com/openfoodfacts/open-prices-frontend/commit/88f53d0958080c78ad8ed9802fde440a2fd88942))
* **Product count chip:** set margin in parent components instead ([ad23063](https://github.com/openfoodfacts/open-prices-frontend/commit/ad23063eb04077b6eb7f21f3e02c884e4e1ab4f2))
* **Product count chip:** use component in LocationCard & UserCard ([83df050](https://github.com/openfoodfacts/open-prices-frontend/commit/83df05033e708968c916651ef156867b5106d194))
* **Products:** hide source chip if product does not have an id. ref [#1365](https://github.com/openfoodfacts/open-prices-frontend/issues/1365) ([b3dfa39](https://github.com/openfoodfacts/open-prices-frontend/commit/b3dfa39e84b2c893413f35336d9798340ba6586d))
* **Proofs:** add Share button in action menu ([a4fe65b](https://github.com/openfoodfacts/open-prices-frontend/commit/a4fe65b6165cb1825da9537488ea945159990876))
* **Proofs:** new ProofCountChip component ([#1371](https://github.com/openfoodfacts/open-prices-frontend/issues/1371)) ([88e074b](https://github.com/openfoodfacts/open-prices-frontend/commit/88e074bbe49321772990562d39185f14e1dcebd7))

## [1.117.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.116.4...v1.117.0) (2025-02-08)


### Features

* **Products:** new ProductSourceChip to display the product's source (OxF) ([#1363](https://github.com/openfoodfacts/open-prices-frontend/issues/1363)) ([e06623c](https://github.com/openfoodfacts/open-prices-frontend/commit/e06623c88a60c8c02b806b9bbc8e2f75d81d9f84))
* **Settings:** user setting to display product source ([#1365](https://github.com/openfoodfacts/open-prices-frontend/issues/1365)) ([99b3ba6](https://github.com/openfoodfacts/open-prices-frontend/commit/99b3ba62eae3c4d4aeb9bce93ba9679864301cfe))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1361](https://github.com/openfoodfacts/open-prices-frontend/issues/1361)) ([e4ab35b](https://github.com/openfoodfacts/open-prices-frontend/commit/e4ab35b069f2d5d23ab9175e85dc6f23bebe31f0))
* **Products:** show error message if product source unknown. ref [#1365](https://github.com/openfoodfacts/open-prices-frontend/issues/1365) ([46bedd0](https://github.com/openfoodfacts/open-prices-frontend/commit/46bedd06a919c1c5ad5fe5326994fb0920f5f2a1))

## [1.116.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.116.3...v1.116.4) (2025-02-04)


### Bug Fixes

* **Price tags:** fix bug in error actions. ref [#1359](https://github.com/openfoodfacts/open-prices-frontend/issues/1359) ([c89639c](https://github.com/openfoodfacts/open-prices-frontend/commit/c89639c5ce013ff62aa28d81c9b97a02b0d4dc12))

## [1.116.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.116.2...v1.116.3) (2025-02-04)


### Technical

* **ContributionAssistant:** Add support for new Not A Price option on canvas ([#1359](https://github.com/openfoodfacts/open-prices-frontend/issues/1359)) ([4275f2e](https://github.com/openfoodfacts/open-prices-frontend/commit/4275f2e46328a368864376253d27643ba06039c6))
* **l10n:** New Crowdin translations to review and merge ([#1358](https://github.com/openfoodfacts/open-prices-frontend/issues/1358)) ([2ffa8b4](https://github.com/openfoodfacts/open-prices-frontend/commit/2ffa8b47d5e64c8795807ee7822c3a6f2e5643e2))

## [1.116.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.116.1...v1.116.2) (2025-02-03)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1354](https://github.com/openfoodfacts/open-prices-frontend/issues/1354)) ([dcf9398](https://github.com/openfoodfacts/open-prices-frontend/commit/dcf939811744d08e12ab86d53ed5ffb473ad4818))
* **Price tag:** add a new error choice 'Not a price' ([#1357](https://github.com/openfoodfacts/open-prices-frontend/issues/1357)) ([6e57e0a](https://github.com/openfoodfacts/open-prices-frontend/commit/6e57e0ae7d0bc4b0f02d3e44b7ee5cc8cd525e75))
* **Product:** new warning if the barcode is too long (&gt; 13 characters) ([#1355](https://github.com/openfoodfacts/open-prices-frontend/issues/1355)) ([f3add84](https://github.com/openfoodfacts/open-prices-frontend/commit/f3add84da38e60746d09d9a7588ffb3617733c49))

## [1.116.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.116.0...v1.116.1) (2025-02-02)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1353](https://github.com/openfoodfacts/open-prices-frontend/issues/1353)) ([48d7aec](https://github.com/openfoodfacts/open-prices-frontend/commit/48d7aecbcd7d849e194c8dfe0ec5908ae45c1aa3))
* **Price validation:** only show Price tags with a prediction ([#1349](https://github.com/openfoodfacts/open-prices-frontend/issues/1349)) ([19a358a](https://github.com/openfoodfacts/open-prices-frontend/commit/19a358a17750723a7547abfd2379be083e3f67a5))
* **Stats:** Add the currency_count & country_count stats ([#1351](https://github.com/openfoodfacts/open-prices-frontend/issues/1351)) ([a14e72b](https://github.com/openfoodfacts/open-prices-frontend/commit/a14e72bcf5711b02aa8d3513542a01f718e14400))
* **User card:** Add the currency_count & country_count stats ([#1352](https://github.com/openfoodfacts/open-prices-frontend/issues/1352)) ([b7475b1](https://github.com/openfoodfacts/open-prices-frontend/commit/b7475b103b45c811fc371dd3e01f1772f71faa25))

## [1.116.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.115.1...v1.116.0) (2025-02-02)


### Features

* **Prices:** allow editing raw product category, origin, label & price_per fields ([#1245](https://github.com/openfoodfacts/open-prices-frontend/issues/1245)) ([987a955](https://github.com/openfoodfacts/open-prices-frontend/commit/987a95528e8e7a2e883b0346a863677a678e2894))


### Bug Fixes

* **Stats:** fix display of challenge_count. ref [#1339](https://github.com/openfoodfacts/open-prices-frontend/issues/1339) ([ab65286](https://github.com/openfoodfacts/open-prices-frontend/commit/ab652868f27f87572f3ed4a5b40a7dcf4a1d021c))


### Technical

* **Action menus:** add a hideActionMenuButton prop in all the cards with actions ([#1347](https://github.com/openfoodfacts/open-prices-frontend/issues/1347)) ([e0ca142](https://github.com/openfoodfacts/open-prices-frontend/commit/e0ca142f511d654cab56364911d5f772d0892fee))
* **l10n:** New Crowdin translations to review and merge ([#1344](https://github.com/openfoodfacts/open-prices-frontend/issues/1344)) ([73d443d](https://github.com/openfoodfacts/open-prices-frontend/commit/73d443de3e93a73c5e1cb59462d9e971af668af4))
* **l10n:** New Crowdin translations to review and merge ([#1348](https://github.com/openfoodfacts/open-prices-frontend/issues/1348)) ([08a419b](https://github.com/openfoodfacts/open-prices-frontend/commit/08a419bbb95bae99f74f15c78d0ff27f7821f524))
* **Price validation:** rename the CTA from Upload to Confirm. ref [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([40f7679](https://github.com/openfoodfacts/open-prices-frontend/commit/40f76794a622f176aefb73c99c9594485101b932))

## [1.115.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.115.0...v1.115.1) (2025-01-26)


### Bug Fixes

* **Location detail:** show error message if location not found ([8fac32a](https://github.com/openfoodfacts/open-prices-frontend/commit/8fac32aee6baf8e28836b23ab48eb522a902e802))
* **Price detail:** show error message if price not found. ref [#797](https://github.com/openfoodfacts/open-prices-frontend/issues/797) ([a8a6d5b](https://github.com/openfoodfacts/open-prices-frontend/commit/a8a6d5b5d5c065f2fe4f2fc9dbce0e11a431122d))
* **Stats:** fix display of price_tag_status_linked_to_price_count. ref [#1339](https://github.com/openfoodfacts/open-prices-frontend/issues/1339) ([7faa901](https://github.com/openfoodfacts/open-prices-frontend/commit/7faa9011471cbefc8ef4c745f6df2e7cbfc28f80))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1343](https://github.com/openfoodfacts/open-prices-frontend/issues/1343)) ([ca31bf6](https://github.com/openfoodfacts/open-prices-frontend/commit/ca31bf682f4a98d721617f5039cbd34858938182))
* **Proof add:** change look & feel of input fields ([#1329](https://github.com/openfoodfacts/open-prices-frontend/issues/1329)) ([dfb66c5](https://github.com/openfoodfacts/open-prices-frontend/commit/dfb66c5360d758ca371925ed9d8f43620e018883))
* **Proof add:** Currency field: add basic help icon + tooltip ([#1342](https://github.com/openfoodfacts/open-prices-frontend/issues/1342)) ([bebcda0](https://github.com/openfoodfacts/open-prices-frontend/commit/bebcda0dbf3172ea6512ca4293828c5eea22ec6d))
* **Proof add:** smaller label icons. reduce padding between input fields. ref [#1329](https://github.com/openfoodfacts/open-prices-frontend/issues/1329) ([e64df41](https://github.com/openfoodfacts/open-prices-frontend/commit/e64df4197ccd3670d25e1bb22399d489b28050e6))

## [1.115.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.114.7...v1.115.0) (2025-01-26)


### Features

* **ContributionAssistant:** also display errored price tags ([#1337](https://github.com/openfoodfacts/open-prices-frontend/issues/1337)) ([ac7458a](https://github.com/openfoodfacts/open-prices-frontend/commit/ac7458a8b93f36c8e55cea1d2269da688e8c996a))
* **Stats:** new Experiments section, with challenges & prices with price tag count ([#1339](https://github.com/openfoodfacts/open-prices-frontend/issues/1339)) ([b388b7a](https://github.com/openfoodfacts/open-prices-frontend/commit/b388b7aa97ed466a5ecbf29f6ddc1d24d6e06307))


### Bug Fixes

* **Location card:** avoid overlap between chips and action menu ([8da9746](https://github.com/openfoodfacts/open-prices-frontend/commit/8da97469aa419a3148924c0e908a1bbcb87a61f7))
* **User card:** avoid overlap between chips and action menu ([931825f](https://github.com/openfoodfacts/open-prices-frontend/commit/931825f8edf194ad7a22a60dc8c9cd449ecc38b9))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1330](https://github.com/openfoodfacts/open-prices-frontend/issues/1330)) ([ffa8dad](https://github.com/openfoodfacts/open-prices-frontend/commit/ffa8dad48ad2ef01785813193dc58f5a845c4b4e))
* **Locations:** proofs: replace the action menu with the existing chip cliquable. ref [#1255](https://github.com/openfoodfacts/open-prices-frontend/issues/1255) ([1bffcd5](https://github.com/openfoodfacts/open-prices-frontend/commit/1bffcd50e5af7caa8b6649b8083bf36e3203412a))
* **User detail:** fetch full user object from backend ([#1340](https://github.com/openfoodfacts/open-prices-frontend/issues/1340)) ([5abd51c](https://github.com/openfoodfacts/open-prices-frontend/commit/5abd51c779fe57adfd6cb9cd9844fd87046475a5))

## [1.114.7](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.114.6...v1.114.7) (2025-01-26)


### Bug Fixes

* **CurrentChallenge:** fix button icon in Experiments page ([417e0b4](https://github.com/openfoodfacts/open-prices-frontend/commit/417e0b40cc0b543ff3eb82781b354038917d938e))


### Technical

* **Challenge:** Repeat proof upload warning on challenge page ([#1332](https://github.com/openfoodfacts/open-prices-frontend/issues/1332)) ([7546554](https://github.com/openfoodfacts/open-prices-frontend/commit/754655401d97ef33abedcf3abd8415833e01001b))
* **Contribution assistant:** improve the label card delete & chips display ([#1335](https://github.com/openfoodfacts/open-prices-frontend/issues/1335)) ([7d861e4](https://github.com/openfoodfacts/open-prices-frontend/commit/7d861e4a37c2f475545f9466941d373029850d21))
* **ContributionAssistant:** Avoid wait on auto detection for old proofs ([#1331](https://github.com/openfoodfacts/open-prices-frontend/issues/1331)) ([a7d6a5a](https://github.com/openfoodfacts/open-prices-frontend/commit/a7d6a5a9c73eaf20d49501515d2abda232331d0a))
* **Proof upload:** allow deleting the picture(s) selected ([#1334](https://github.com/openfoodfacts/open-prices-frontend/issues/1334)) ([518d5a6](https://github.com/openfoodfacts/open-prices-frontend/commit/518d5a604f2cb46f8664d2a195f8b5470dcf3559))

## [1.114.6](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.114.5...v1.114.6) (2025-01-25)


### Technical

* **CommunityChallenge:** reorganise a bit the 2 instruction cards (move stats at the bottom, add divider below title) ([#1327](https://github.com/openfoodfacts/open-prices-frontend/issues/1327)) ([dda6247](https://github.com/openfoodfacts/open-prices-frontend/commit/dda6247218d2669166acff863d5739ea424dfa3e))
* **CurrentChallenge:** simplify the url to /challenge. Add to the sidebar ([#1325](https://github.com/openfoodfacts/open-prices-frontend/issues/1325)) ([9a9c3fb](https://github.com/openfoodfacts/open-prices-frontend/commit/9a9c3fb57ac8be6faad431cd5bb03418f81282be))
* **l10n:** New Crowdin translations to review and merge ([#1324](https://github.com/openfoodfacts/open-prices-frontend/issues/1324)) ([349d026](https://github.com/openfoodfacts/open-prices-frontend/commit/349d026942bcfa1be6236aa93a8aecd0c46c84a0))

## [1.114.5](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.114.4...v1.114.5) (2025-01-25)


### Technical

* **Category chip:** make it cliquable ([909cc38](https://github.com/openfoodfacts/open-prices-frontend/commit/909cc384652069b88b442b649de296956378c158))
* **CurrentChallenge:** display category tag ([#1323](https://github.com/openfoodfacts/open-prices-frontend/issues/1323)) ([a659b9a](https://github.com/openfoodfacts/open-prices-frontend/commit/a659b9aa703091c90aa2b0f3ce1f92fa27a5cdc7))
* **CurrentChallenge:** Update end date ([#1320](https://github.com/openfoodfacts/open-prices-frontend/issues/1320)) ([c414cea](https://github.com/openfoodfacts/open-prices-frontend/commit/c414cea6ac4a3c959cb69beafacbe41efeff7567))
* **l10n:** New Crowdin translations to review and merge ([#1319](https://github.com/openfoodfacts/open-prices-frontend/issues/1319)) ([f111e45](https://github.com/openfoodfacts/open-prices-frontend/commit/f111e456ec8a4c6bbec74e7593c317be48c1ae93))

## [1.114.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.114.3...v1.114.4) (2025-01-22)


### Bug Fixes

* **Price validation:** fix mode when clicking on 'Fix' button. ref [#1312](https://github.com/openfoodfacts/open-prices-frontend/issues/1312) ([6ffb723](https://github.com/openfoodfacts/open-prices-frontend/commit/6ffb723aea62decc24a4b8bd387caf8fb379b488))

## [1.114.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.114.2...v1.114.3) (2025-01-22)


### Bug Fixes

* **Price validation:** fix origin & category display for raw products ([#1316](https://github.com/openfoodfacts/open-prices-frontend/issues/1316)) ([7e3ef43](https://github.com/openfoodfacts/open-prices-frontend/commit/7e3ef43f7345a9cd8ae16c44d8486dc1cb207495))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1311](https://github.com/openfoodfacts/open-prices-frontend/issues/1311)) ([d13bed7](https://github.com/openfoodfacts/open-prices-frontend/commit/d13bed757733a0d8e4acb1c637fa05ba14809228))

## [1.114.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.114.1...v1.114.2) (2025-01-22)


### Bug Fixes

* **Price validation:** fix price form display setting reset after price creation or dismiss. ref [#1312](https://github.com/openfoodfacts/open-prices-frontend/issues/1312) ([f546b1b](https://github.com/openfoodfacts/open-prices-frontend/commit/f546b1b6b8acae5534f8ae89ff3b9abd5cbfc86a))


### Technical

* **Price validation:** add a new settings to display the price edit form by default ([#1312](https://github.com/openfoodfacts/open-prices-frontend/issues/1312)) ([2bc26d7](https://github.com/openfoodfacts/open-prices-frontend/commit/2bc26d789c1449e3562149d2533c359f5271b7a3))

## [1.114.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.114.0...v1.114.1) (2025-01-21)


### Bug Fixes

* **Price tag:** fix price tag vertical responsiveness ([#1307](https://github.com/openfoodfacts/open-prices-frontend/issues/1307)) ([54899cf](https://github.com/openfoodfacts/open-prices-frontend/commit/54899cfb7e3b266d2e8a97c52dabc4b45f55f022))
* **Price tag:** reset to 'Display' mode after each action (price create or dismiss). ref [#1292](https://github.com/openfoodfacts/open-prices-frontend/issues/1292) ([e10435f](https://github.com/openfoodfacts/open-prices-frontend/commit/e10435f47f62b72e5d0df7487c10b8e780a61f32))
* **Price Validation Assistant:** fix filter on proof owned toggle. ref [#1219](https://github.com/openfoodfacts/open-prices-frontend/issues/1219) ([02e5976](https://github.com/openfoodfacts/open-prices-frontend/commit/02e59762e301b03e72fd5dbe9c0d22757922cd89))
* **Proof footer:** give more space if action menu hidden ([ec7f366](https://github.com/openfoodfacts/open-prices-frontend/commit/ec7f366ba25b18002ba4325996eb014322bb0d48))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1305](https://github.com/openfoodfacts/open-prices-frontend/issues/1305)) ([65468ae](https://github.com/openfoodfacts/open-prices-frontend/commit/65468ae1d3cc304759c675f9b5173698bab6d7af))
* **Price tag:** when creating or dismissing the price tag, show an overlay + loader ([#1309](https://github.com/openfoodfacts/open-prices-frontend/issues/1309)) ([9a67163](https://github.com/openfoodfacts/open-prices-frontend/commit/9a67163bd97ae8ce97641833ce87be6d1db51b9a))

## [1.114.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.113.2...v1.114.0) (2025-01-20)


### Features

* **Challenge:** show simple banner on the home page ([#1304](https://github.com/openfoodfacts/open-prices-frontend/issues/1304)) ([ddd86df](https://github.com/openfoodfacts/open-prices-frontend/commit/ddd86df928ac7b0c3ed553a06b875368cbac7db7))
* **Price Validation Assistant:** open price validation to all proofs (not just owned) ([#1219](https://github.com/openfoodfacts/open-prices-frontend/issues/1219)) ([53290db](https://github.com/openfoodfacts/open-prices-frontend/commit/53290dbe2837af2c39098f06ff79bf8b11d7b3a6))


### Technical

* **Challenge:** extra UI tweaks ([#1301](https://github.com/openfoodfacts/open-prices-frontend/issues/1301)) ([0d11304](https://github.com/openfoodfacts/open-prices-frontend/commit/0d113047e1624929e9d2ac0cbd9ad37dce6c4e70))
* **l10n:** New Crowdin translations to review and merge ([#1300](https://github.com/openfoodfacts/open-prices-frontend/issues/1300)) ([c169ff8](https://github.com/openfoodfacts/open-prices-frontend/commit/c169ff85f901af4eb3c1544b2dd44b1c74de9306))
* **l10n:** New Crowdin translations to review and merge ([#1302](https://github.com/openfoodfacts/open-prices-frontend/issues/1302)) ([d761160](https://github.com/openfoodfacts/open-prices-frontend/commit/d761160aa3db17000b0c34bfc9429fc43237c226))
* **Price Validation Assistant:** reduce even more the number of price tags loaded. ref [#1227](https://github.com/openfoodfacts/open-prices-frontend/issues/1227) ([25e5d41](https://github.com/openfoodfacts/open-prices-frontend/commit/25e5d41bdd1f9daa09c43a26f5fd7996774291e7))
* **Proofs:** wording: replace 'Image' with 'Picture' ([#1303](https://github.com/openfoodfacts/open-prices-frontend/issues/1303)) ([20adbb9](https://github.com/openfoodfacts/open-prices-frontend/commit/20adbb9f7446af2091818951ef8f43729409a5af))

## [1.113.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.113.1...v1.113.2) (2025-01-20)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1293](https://github.com/openfoodfacts/open-prices-frontend/issues/1293)) ([5ec56c2](https://github.com/openfoodfacts/open-prices-frontend/commit/5ec56c2db36301d45e6b510010b8f909594b3fdf))
* **l10n:** New Crowdin translations to review and merge ([#1298](https://github.com/openfoodfacts/open-prices-frontend/issues/1298)) ([59ff577](https://github.com/openfoodfacts/open-prices-frontend/commit/59ff577215cac0f5df3ec663080ef52b1da3e444))
* **Price Validation:** add link in drawer. rename to 'Validate prices'. remove emoji ([#1297](https://github.com/openfoodfacts/open-prices-frontend/issues/1297)) ([5933d03](https://github.com/openfoodfacts/open-prices-frontend/commit/5933d0304467b6bf30773c07260b3b9368a46c58))
* **Product input row:** new PriceCategoryChip to display the category_tag localized ([#1296](https://github.com/openfoodfacts/open-prices-frontend/issues/1296)) ([16a6711](https://github.com/openfoodfacts/open-prices-frontend/commit/16a6711fad1a50686fefc4120ded60f2936a8d71))
* **Product missing:** remove warning icon to scare less users ([#1295](https://github.com/openfoodfacts/open-prices-frontend/issues/1295)) ([dfbc4a2](https://github.com/openfoodfacts/open-prices-frontend/commit/dfbc4a2cfe28fd3704125b7ce20942dffa5d7d84))

## [1.113.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.113.0...v1.113.1) (2025-01-20)


### Bug Fixes

* **Price tag:** if barcode detected, then clear the category_tag to avoid confusions ([#1289](https://github.com/openfoodfacts/open-prices-frontend/issues/1289)) ([d4808e5](https://github.com/openfoodfacts/open-prices-frontend/commit/d4808e5929f908a3fd3e6585575e7439c406e1c0))


### Technical

* **Challenge:** improved UI following feedback ([#1284](https://github.com/openfoodfacts/open-prices-frontend/issues/1284)) ([cfbf8c2](https://github.com/openfoodfacts/open-prices-frontend/commit/cfbf8c2e399f49b2a4e68c9402786e5bfe0fc8ba))
* **l10n:** New Crowdin translations to review and merge ([#1286](https://github.com/openfoodfacts/open-prices-frontend/issues/1286)) ([f565bab](https://github.com/openfoodfacts/open-prices-frontend/commit/f565bab6ef8002b9688a617467a4d7c4a8e643cf))
* **Price input row:** new 'mode' prop to display the data in readonly ([#1290](https://github.com/openfoodfacts/open-prices-frontend/issues/1290)) ([4da6529](https://github.com/openfoodfacts/open-prices-frontend/commit/4da6529229dcd08945f6c3b522f3aa9fca0fe82e))
* **Price tag:** move Error & Unreadable buttons under 1 menu ([#1288](https://github.com/openfoodfacts/open-prices-frontend/issues/1288)) ([351e8b1](https://github.com/openfoodfacts/open-prices-frontend/commit/351e8b1c286dc9e331191bdb3b47d90b7a3329e9))
* **Price tag:** move Fix button to toggle Product & Price modes ([#1292](https://github.com/openfoodfacts/open-prices-frontend/issues/1292)) ([e70a519](https://github.com/openfoodfacts/open-prices-frontend/commit/e70a5199d838d17aaa1daacd7d89669898fea786))
* **Price tag:** replace the 'mode' prop with 'hideUploadAction' ([d1cca78](https://github.com/openfoodfacts/open-prices-frontend/commit/d1cca78d957fa77bf6039b4bd3110c1a22ffb5c5))
* **Product input row:** new 'mode' prop to display the data in readonly ([#1291](https://github.com/openfoodfacts/open-prices-frontend/issues/1291)) ([eac7904](https://github.com/openfoodfacts/open-prices-frontend/commit/eac7904dfe191bd13ecbc82a9cfb3b58cb79bc7e))
* **Proof chip:** new withLabel prop to display the label next to the icon ([#1287](https://github.com/openfoodfacts/open-prices-frontend/issues/1287)) ([8972709](https://github.com/openfoodfacts/open-prices-frontend/commit/89727093c0b3ebda9614b445038622c111539014))

## [1.113.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.112.4...v1.113.0) (2025-01-19)


### Features

* **Challenge:** Match btn style with multiple proof upload ([#1281](https://github.com/openfoodfacts/open-prices-frontend/issues/1281)) ([67c4f28](https://github.com/openfoodfacts/open-prices-frontend/commit/67c4f28e5698af827728e1374b085c7cd6cfc356))
* **SignIn:** proper redirect when sign-in is required ([#1280](https://github.com/openfoodfacts/open-prices-frontend/issues/1280)) ([1e9ff57](https://github.com/openfoodfacts/open-prices-frontend/commit/1e9ff5788ee704aaed5593f672254066851bd4e3))


### Bug Fixes

* **Theme:** also change Sign in CTA button color to new primary. ref [#1269](https://github.com/openfoodfacts/open-prices-frontend/issues/1269) ([e111ab0](https://github.com/openfoodfacts/open-prices-frontend/commit/e111ab0aa77b5d44d6552995bf6bcb13a5feaf47))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1283](https://github.com/openfoodfacts/open-prices-frontend/issues/1283)) ([2ae5ca0](https://github.com/openfoodfacts/open-prices-frontend/commit/2ae5ca0670de35eb35fda6eac05c661ef4e1a2e9))

## [1.112.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.112.3...v1.112.4) (2025-01-18)


### Bug Fixes

* **Theme:** also change progress-linear bar colors. ref [#1269](https://github.com/openfoodfacts/open-prices-frontend/issues/1269) ([8c5bbb7](https://github.com/openfoodfacts/open-prices-frontend/commit/8c5bbb79d71aba72c773da9e38edffbf6da77042))


### Technical

* **Action menus:** rename to 'Add prices' in most cases. closes [#1229](https://github.com/openfoodfacts/open-prices-frontend/issues/1229) ([ef8fce2](https://github.com/openfoodfacts/open-prices-frontend/commit/ef8fce265c5806055ccdb0b6df000145403b5d31))
* **Proof upload:** hide CTA after upload started. improve CTA wording for multiple. ref [#1249](https://github.com/openfoodfacts/open-prices-frontend/issues/1249) ([7ed712d](https://github.com/openfoodfacts/open-prices-frontend/commit/7ed712daf16ec1554e79a223e313a477949d7f85))

## [1.112.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.112.2...v1.112.3) (2025-01-18)


### Bug Fixes

* **Price add:** Allow 'quantity bought' field to be decimal ([#1276](https://github.com/openfoodfacts/open-prices-frontend/issues/1276)) ([d823949](https://github.com/openfoodfacts/open-prices-frontend/commit/d823949deaa437959ddc832c355ce56ae733c15a))
* **Theme:** also change 'Price add link' button in menus. ref [#1269](https://github.com/openfoodfacts/open-prices-frontend/issues/1269) ([b1b01c2](https://github.com/openfoodfacts/open-prices-frontend/commit/b1b01c24237a3b977e3fe89b0ce73dab80eab8bf))


### Technical

* **Contribution assistant:** replace tabs with a stepper ([#1275](https://github.com/openfoodfacts/open-prices-frontend/issues/1275)) ([354fb15](https://github.com/openfoodfacts/open-prices-frontend/commit/354fb1523f734e6330734e8ee76a6f048062b780))
* **l10n:** New Crowdin translations to review and merge ([#1273](https://github.com/openfoodfacts/open-prices-frontend/issues/1273)) ([d77cf4c](https://github.com/openfoodfacts/open-prices-frontend/commit/d77cf4c87f3865ea27bdfa84d77791beb9062f4d))
* **l10n:** New Crowdin translations to review and merge ([#1278](https://github.com/openfoodfacts/open-prices-frontend/issues/1278)) ([b353301](https://github.com/openfoodfacts/open-prices-frontend/commit/b3533019b2b0ad041aeb590cf087b1ade4f01f9e))

## [1.112.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.112.1...v1.112.2) (2025-01-15)


### Bug Fixes

* **Price add multiple:** fix hide ProofCard close button in the top-right. ref [#1254](https://github.com/openfoodfacts/open-prices-frontend/issues/1254) ([d2a94d5](https://github.com/openfoodfacts/open-prices-frontend/commit/d2a94d5fde7969020af6d80b2f3c58e01c56a3c1))


### Technical

* **Contribution assistant:** button block on mobile. Small fixes. ref [#1271](https://github.com/openfoodfacts/open-prices-frontend/issues/1271) ([ae34c0a](https://github.com/openfoodfacts/open-prices-frontend/commit/ae34c0a787c9bf657c040899431ffa6c91b0a131))
* **User dashboard:** remove unused UserSettings page. ref [#950](https://github.com/openfoodfacts/open-prices-frontend/issues/950) ([c78bb03](https://github.com/openfoodfacts/open-prices-frontend/commit/c78bb03b4f265b3ff392b313855faf3d49183795))
* **User dashboard:** Use 'My dashboard' wording instead of 'Dashboard' ([dea64ba](https://github.com/openfoodfacts/open-prices-frontend/commit/dea64bacd9cadf234f0839be28a7de2b9c64799c))

## [1.112.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.112.0...v1.112.1) (2025-01-15)


### Bug Fixes

* **Mobile:** fix typo. Also have 'Latest prices' as primary & block on mobile. ref [#1271](https://github.com/openfoodfacts/open-prices-frontend/issues/1271) ([e5483ed](https://github.com/openfoodfacts/open-prices-frontend/commit/e5483ed69d6ed2c2bb0a3de70ac455b983a134f2))

## [1.112.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.111.2...v1.112.0) (2025-01-15)


### Features

* **Challenge Page:** A page for community challenges ([#935](https://github.com/openfoodfacts/open-prices-frontend/issues/935)) ([04626fa](https://github.com/openfoodfacts/open-prices-frontend/commit/04626fa428b298acf6194626f83a0a232d935adf))
* **Mobile:** have full-width (block) CTAs on mobile ([#1271](https://github.com/openfoodfacts/open-prices-frontend/issues/1271)) ([945e54f](https://github.com/openfoodfacts/open-prices-frontend/commit/945e54f561552706e37c4d645f033ab6dacc1f18))
* **Theme:** change most CTA button colors to primary (instead of success) ([#1269](https://github.com/openfoodfacts/open-prices-frontend/issues/1269)) ([5c088b5](https://github.com/openfoodfacts/open-prices-frontend/commit/5c088b50d3f56388da571952825593f2d4bc7346))
* **Theme:** match primary color with OFF colors ([#1268](https://github.com/openfoodfacts/open-prices-frontend/issues/1268)) ([b4f3974](https://github.com/openfoodfacts/open-prices-frontend/commit/b4f3974a395fb96c8eb3ada7a03b752c003a6e42))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1265](https://github.com/openfoodfacts/open-prices-frontend/issues/1265)) ([ea54ddf](https://github.com/openfoodfacts/open-prices-frontend/commit/ea54ddf0fdc762b02852e9104268763a3198ee2c))

## [1.111.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.111.1...v1.111.2) (2025-01-13)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1258](https://github.com/openfoodfacts/open-prices-frontend/issues/1258)) ([a1788ba](https://github.com/openfoodfacts/open-prices-frontend/commit/a1788ba430fcf653905fdef9cb870656eba8ae9a))
* **Price card:** Move the proof chip to the left (first) ([#1264](https://github.com/openfoodfacts/open-prices-frontend/issues/1264)) ([dd71190](https://github.com/openfoodfacts/open-prices-frontend/commit/dd71190d157bb456b0aa8ab68774a747aec45a45))
* **Proof upload:** better display selected images (row & cols) ([#1262](https://github.com/openfoodfacts/open-prices-frontend/issues/1262)) ([42323b5](https://github.com/openfoodfacts/open-prices-frontend/commit/42323b5c196ab09a968dafafcdf3b531427d8cf1))
* **Proof upload:** better display selected location ([#1263](https://github.com/openfoodfacts/open-prices-frontend/issues/1263)) ([642d6e7](https://github.com/openfoodfacts/open-prices-frontend/commit/642d6e703b7735207486fe862db519f7938a7018))
* **Proof upload:** move up the receipt warning message above the form button ([7fd82ba](https://github.com/openfoodfacts/open-prices-frontend/commit/7fd82ba8b28a3fa32b3f57dd1d644acc4422a59e))

## [1.111.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.111.0...v1.111.1) (2025-01-12)


### Bug Fixes

* **Price add multiple:** re-show the proof card header title after upload. ref [#1254](https://github.com/openfoodfacts/open-prices-frontend/issues/1254) ([46ad9cf](https://github.com/openfoodfacts/open-prices-frontend/commit/46ad9cf198f14a758b6e470ff2430ceff9581209))


### Technical

* **Price add multiple:** Done step: add success icon & border color. ref [#1254](https://github.com/openfoodfacts/open-prices-frontend/issues/1254) ([aa030f7](https://github.com/openfoodfacts/open-prices-frontend/commit/aa030f7beeda474cf50a7d3a6168e28ce7e72a2a))
* **Proof add multiple:** Done step: add success icon & border color. ref [#1248](https://github.com/openfoodfacts/open-prices-frontend/issues/1248) ([e5f084f](https://github.com/openfoodfacts/open-prices-frontend/commit/e5f084fc95437756a8af5cb61d3cf17105f81d95))
* **Proof upload:** add progress bar after clicking on Upload ([#1260](https://github.com/openfoodfacts/open-prices-frontend/issues/1260)) ([3af4fce](https://github.com/openfoodfacts/open-prices-frontend/commit/3af4fce934499416d26f3bd394fbcbcf43b1117e))

## [1.111.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.110.0...v1.111.0) (2025-01-11)


### Features

* **Locations:** new page to list all of the location's proofs ([#1255](https://github.com/openfoodfacts/open-prices-frontend/issues/1255)) ([4318a66](https://github.com/openfoodfacts/open-prices-frontend/commit/4318a66cbc14acc08b3bb77edbfabd7b32b0beb3))
* **Price add multiple:** add a stepper at the top to guide users + add explicit CTAs at the end ([#1254](https://github.com/openfoodfacts/open-prices-frontend/issues/1254)) ([da5b191](https://github.com/openfoodfacts/open-prices-frontend/commit/da5b1917ae552e5cfe3b4a017838c38724f57e09))
* **Users:** new page to list all of the user's proofs ([#1256](https://github.com/openfoodfacts/open-prices-frontend/issues/1256)) ([69f63b6](https://github.com/openfoodfacts/open-prices-frontend/commit/69f63b6e5df5c14ffb5f307187f958fd635c57bc))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1253](https://github.com/openfoodfacts/open-prices-frontend/issues/1253)) ([b2982f1](https://github.com/openfoodfacts/open-prices-frontend/commit/b2982f1850be2611490fb2d3a77b6c3868bb5d7a))
* **l10n:** New Crowdin translations to review and merge ([#1257](https://github.com/openfoodfacts/open-prices-frontend/issues/1257)) ([d02cf72](https://github.com/openfoodfacts/open-prices-frontend/commit/d02cf72a8253646418e40dcadd27dee6017fab06))
* **Locations:** Action menu: add link to proofs page. ref [#1255](https://github.com/openfoodfacts/open-prices-frontend/issues/1255) ([f0d61cf](https://github.com/openfoodfacts/open-prices-frontend/commit/f0d61cf8b4f592689e504a0942b42b71ffae712a))
* **Users:** Action menu: add link to proofs page. ref [#1256](https://github.com/openfoodfacts/open-prices-frontend/issues/1256) ([79cbba9](https://github.com/openfoodfacts/open-prices-frontend/commit/79cbba95724b1a72b6e629f06ca722a6152ec80c))

## [1.110.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.109.3...v1.110.0) (2025-01-11)


### Features

* **Proof add:** add explicit CTAs at the end ([#1248](https://github.com/openfoodfacts/open-prices-frontend/issues/1248)) ([41c6ca6](https://github.com/openfoodfacts/open-prices-frontend/commit/41c6ca63b18dfecc65b7ec21faa0a4bc8fc02d24))
* **Proof upload:** add a stepper at the top to guide users ([#1249](https://github.com/openfoodfacts/open-prices-frontend/issues/1249)) ([1436970](https://github.com/openfoodfacts/open-prices-frontend/commit/1436970198c4b066c0c8ae51dec0c697418cd5da))


### Bug Fixes

* **Price add:** set origin_tag to unknown if empty. ref [#1247](https://github.com/openfoodfacts/open-prices-frontend/issues/1247) ([df3144c](https://github.com/openfoodfacts/open-prices-frontend/commit/df3144cd4085e124ccd669542875f69b2e730959))


### Technical

* **Breadcrumbs:** homogenize display and padding (better) ([#1243](https://github.com/openfoodfacts/open-prices-frontend/issues/1243)) ([9426bc8](https://github.com/openfoodfacts/open-prices-frontend/commit/9426bc8fd235f17a2426faf29accebc4a7f7650b))
* **l10n:** New Crowdin translations to review and merge ([#1233](https://github.com/openfoodfacts/open-prices-frontend/issues/1233)) ([4fe898d](https://github.com/openfoodfacts/open-prices-frontend/commit/4fe898d8fec7367b9299ff41e671b6f0cf28ba42))
* **Price add:** better cleanup payload before calling the API ([#1247](https://github.com/openfoodfacts/open-prices-frontend/issues/1247)) ([2eb0cf7](https://github.com/openfoodfacts/open-prices-frontend/commit/2eb0cf7a491d4a388caf1a2982b7f908fa97509c))
* **Proof upload card:** allow hiding the header. ref [#1168](https://github.com/openfoodfacts/open-prices-frontend/issues/1168) ([797b181](https://github.com/openfoodfacts/open-prices-frontend/commit/797b181820ac15f9a4f446e02f18b765913c6a2b))
* **Proof upload:** display the proof uploaded count at the end. ref [#1248](https://github.com/openfoodfacts/open-prices-frontend/issues/1248) ([462ca00](https://github.com/openfoodfacts/open-prices-frontend/commit/462ca00237df24b1eb0f194a420d70274bceaede))
* **Proof upload:** Stepper: when on the last step, change the icon to a check. ref [#1249](https://github.com/openfoodfacts/open-prices-frontend/issues/1249) ([2a8f7a6](https://github.com/openfoodfacts/open-prices-frontend/commit/2a8f7a66de055909d3699c3b95231a2ca1d7a892))

## [1.109.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.109.2...v1.109.3) (2025-01-06)


### Bug Fixes

* **Price Validation Assistant:** avoid duplicate prices tags during pagination ([#1238](https://github.com/openfoodfacts/open-prices-frontend/issues/1238)) ([0499fc1](https://github.com/openfoodfacts/open-prices-frontend/commit/0499fc17ee4cb92b6c79087338955701e0b3f074))
* **Price Validation Assistant:** only show price tags with a prediction ([#1240](https://github.com/openfoodfacts/open-prices-frontend/issues/1240)) ([3d871a0](https://github.com/openfoodfacts/open-prices-frontend/commit/3d871a05c6d3f678f02bf2c6795c3e6ededb9cc8))

## [1.109.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.109.1...v1.109.2) (2025-01-06)


### Bug Fixes

* **Assistants:** additional cleanup rule for Carrefour wrongly detected barcodes. ref [#1204](https://github.com/openfoodfacts/open-prices-frontend/issues/1204) ([d4f308c](https://github.com/openfoodfacts/open-prices-frontend/commit/d4f308cb21c78dadcfed12615c8c89511162a517))
* **Assistants:** stop removing barcode leading zeros after all. ref [#1204](https://github.com/openfoodfacts/open-prices-frontend/issues/1204) ([7a7e48f](https://github.com/openfoodfacts/open-prices-frontend/commit/7a7e48f06dfe42f4e1519fd0b7768b18b474b2c6))


### Technical

* **Price add:** switch all proof & price fields to density comfortable (slightly smaller) ([#1237](https://github.com/openfoodfacts/open-prices-frontend/issues/1237)) ([d73d38e](https://github.com/openfoodfacts/open-prices-frontend/commit/d73d38e2ac2acdef9459db60a648a69e5848d021))
* **Sidebar:** hide top products, locations & contributors ([#1236](https://github.com/openfoodfacts/open-prices-frontend/issues/1236)) ([51afd10](https://github.com/openfoodfacts/open-prices-frontend/commit/51afd103f4c05ec662dd19e449cd028eb788177d))

## [1.109.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.109.0...v1.109.1) (2025-01-04)


### Bug Fixes

* **Proof add multiple:** show done button only when ALL proofs have been uploaded ([#1232](https://github.com/openfoodfacts/open-prices-frontend/issues/1232)) ([7d7e41a](https://github.com/openfoodfacts/open-prices-frontend/commit/7d7e41a4cbe4f438b0c66bed5ed899efa56523ec))


### Technical

* **Contribution Assistant:** simplify proof upload step (use only ProofUploadCard). ref [#1044](https://github.com/openfoodfacts/open-prices-frontend/issues/1044) ([95f8d39](https://github.com/openfoodfacts/open-prices-frontend/commit/95f8d393a5d646795883db6fcab43fe7eb840a32))
* **l10n:** New Crowdin translations to review and merge ([#1230](https://github.com/openfoodfacts/open-prices-frontend/issues/1230)) ([e05eb46](https://github.com/openfoodfacts/open-prices-frontend/commit/e05eb4684dc7bf7d425c2c4d2c8295547b4d3924))

## [1.109.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.108.1...v1.109.0) (2025-01-04)


### Features

* **Proof add multiple:** rename to 'Add proofs', promote to sidebar ([#1228](https://github.com/openfoodfacts/open-prices-frontend/issues/1228)) ([95942be](https://github.com/openfoodfacts/open-prices-frontend/commit/95942bebb3e0e7c019eef3654c0af976c12b5543))


### Bug Fixes

* **Contribution Assistant:** next proof suggestion: fix again show only ready proofs owned. ref [#1166](https://github.com/openfoodfacts/open-prices-frontend/issues/1166) ([c3bccd5](https://github.com/openfoodfacts/open-prices-frontend/commit/c3bccd56a03f03429d74050fb0c6d334bc862931))
* **Contribution Assistant:** next proof suggestion: fix again show only ready proofs without prices. ref [#1166](https://github.com/openfoodfacts/open-prices-frontend/issues/1166) ([75143b4](https://github.com/openfoodfacts/open-prices-frontend/commit/75143b4ca5b95875e901260f174f5b147efb35e1))
* **Price Validation Assistant:** fix missing translation. ref [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([2a57e7a](https://github.com/openfoodfacts/open-prices-frontend/commit/2a57e7af4b7932ca8d0dc409a8c4ecbb8d752639))


### Technical

* **Contribution assistant:** new hideProofDetails prop to show or hide the price tag proof details. ref [#1044](https://github.com/openfoodfacts/open-prices-frontend/issues/1044) ([793fa90](https://github.com/openfoodfacts/open-prices-frontend/commit/793fa9089a711e8feed0cd9ad53d5a11493badd6))
* **Experiments:** move down single price & proof workflows ([e004d23](https://github.com/openfoodfacts/open-prices-frontend/commit/e004d23076b8aa8f2b610e5586894e16b897d2c1))
* **l10n:** New Crowdin translations to review and merge ([#1213](https://github.com/openfoodfacts/open-prices-frontend/issues/1213)) ([498d28c](https://github.com/openfoodfacts/open-prices-frontend/commit/498d28cf8d14f361fd7df2e0ef2271fd54b88ce8))
* **Location selector:** better display recent locations (1 per line) ([9e56fc7](https://github.com/openfoodfacts/open-prices-frontend/commit/9e56fc7b873cf8db95d9f3bf09b58f8ff2beb27a))
* **Price add:** use 'Add prices' wording everywhere (sidebar, header, breadcrumbs). ref [#1085](https://github.com/openfoodfacts/open-prices-frontend/issues/1085) ([0cafc7a](https://github.com/openfoodfacts/open-prices-frontend/commit/0cafc7a109c58fb047791f3593a9d6168171b5b8))
* **Price Validation Assistant:** load less prices, but more often ([#1227](https://github.com/openfoodfacts/open-prices-frontend/issues/1227)) ([620a875](https://github.com/openfoodfacts/open-prices-frontend/commit/620a875c3c4a1f807eb3fbeddb008cf79ae43bb1))
* **Price Validation Assistant:** rename PriceValidator to PriceValidation ([153df4f](https://github.com/openfoodfacts/open-prices-frontend/commit/153df4f51f703f55aec41fec200ae883440e19e9))
* **Proof card:** re-add the type input (set to PRICE_TAG) to be more explicit. ref [#983](https://github.com/openfoodfacts/open-prices-frontend/issues/983) ([bd53763](https://github.com/openfoodfacts/open-prices-frontend/commit/bd5376311b0dabb203cbebd818b0e13b5c349367))
* **Proof upload:** change card title if single or multiple mode. ref [#983](https://github.com/openfoodfacts/open-prices-frontend/issues/983) ([d87c8cb](https://github.com/openfoodfacts/open-prices-frontend/commit/d87c8cbfe49299ea15ba3210fc9b35e23f90cb31))
* **User recent proofs:** load only 5 on small screens to speed up ([992626f](https://github.com/openfoodfacts/open-prices-frontend/commit/992626f7f6fe9b09bf42724920bf677cf844a4fe))

## [1.108.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.108.0...v1.108.1) (2025-01-03)


### Technical

* **Action menus:** move menu icon to constants ([62901f3](https://github.com/openfoodfacts/open-prices-frontend/commit/62901f3321383cc111b28e4bc3d02e79d4c47f9a))
* **Contribution Assistant:** add proof footer details below canvas image ([#1223](https://github.com/openfoodfacts/open-prices-frontend/issues/1223)) ([dfe2c45](https://github.com/openfoodfacts/open-prices-frontend/commit/dfe2c45c12920778ca6bbc6a376619f6f6cddd58))
* **Contribution Assistant:** cleanup: small improvements for prices already added ([#1224](https://github.com/openfoodfacts/open-prices-frontend/issues/1224)) ([5c05171](https://github.com/openfoodfacts/open-prices-frontend/commit/5c051718aafc31825296b9920237f9ad915d0e76))
* **Contribution Assistant:** make labels linked to prices readonly ([#1222](https://github.com/openfoodfacts/open-prices-frontend/issues/1222)) ([e954562](https://github.com/openfoodfacts/open-prices-frontend/commit/e954562ce65952f8e177668237328857252f9366))
* **Price add:** more compact chips for Proof.type, Price.type & Price.price_per fields. ref [#1085](https://github.com/openfoodfacts/open-prices-frontend/issues/1085) ([4cca8ee](https://github.com/openfoodfacts/open-prices-frontend/commit/4cca8ee54f42c316e8914c0008624114c5d8ce74))
* **Price card:** Add action to proof detail page ([#1220](https://github.com/openfoodfacts/open-prices-frontend/issues/1220)) ([dd65951](https://github.com/openfoodfacts/open-prices-frontend/commit/dd659512a8188a42b5047af76ae625cc789719d6))

## [1.108.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.107.1...v1.108.0) (2025-01-01)


### Features

* **l10n:** translate label list in price add form depending on user locale ([#1216](https://github.com/openfoodfacts/open-prices-frontend/issues/1216)) ([15b6a1a](https://github.com/openfoodfacts/open-prices-frontend/commit/15b6a1a93613d172ef166e48a1a0014e6336c026))
* script to filter and generate labels (with translations) ([#1215](https://github.com/openfoodfacts/open-prices-frontend/issues/1215)) ([56c4f04](https://github.com/openfoodfacts/open-prices-frontend/commit/56c4f0460759117d85374389bf30618d1533dc1a))


### Bug Fixes

* **Contribution Assistant:** next proof suggestion: show only ready proofs without prices. ref [#1166](https://github.com/openfoodfacts/open-prices-frontend/issues/1166) ([a7db0ef](https://github.com/openfoodfacts/open-prices-frontend/commit/a7db0efdaf8068c7c3a09b7961e91049516a5b6f))


### Technical

* **Price label chip:** translate chip content depending on user locale ([#1217](https://github.com/openfoodfacts/open-prices-frontend/issues/1217)) ([e03c01b](https://github.com/openfoodfacts/open-prices-frontend/commit/e03c01bd9c0fe4834d91570f7fee81b3b20ec210))
* **Price origin chip:** translate chip content depending on user locale ([#1218](https://github.com/openfoodfacts/open-prices-frontend/issues/1218)) ([f900588](https://github.com/openfoodfacts/open-prices-frontend/commit/f900588e21c367d4260ae30f55021d298057d078))

## [1.107.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.107.0...v1.107.1) (2024-12-31)


### Bug Fixes

* **Infinite scroll:** fix again load prices on the ProductDetail page. ref [#1205](https://github.com/openfoodfacts/open-prices-frontend/issues/1205) ([cab5742](https://github.com/openfoodfacts/open-prices-frontend/commit/cab574288a347dd1fdddf623fc38c985746d0bb1))

## [1.107.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.106.7...v1.107.0) (2024-12-31)


### Features

* **User recent proofs:** Add proof filters in dialog header ([#1208](https://github.com/openfoodfacts/open-prices-frontend/issues/1208)) ([19406f6](https://github.com/openfoodfacts/open-prices-frontend/commit/19406f6b989acb97c39e6f9a19ab928848360197))


### Bug Fixes

* **Proof dialog:** full height & width on mobile. ref [#1193](https://github.com/openfoodfacts/open-prices-frontend/issues/1193) & [#1210](https://github.com/openfoodfacts/open-prices-frontend/issues/1210) ([1bd5cf1](https://github.com/openfoodfacts/open-prices-frontend/commit/1bd5cf19035f9cb662d9ecede3b3eeac8896628f))


### Technical

* **Dialogs:** homogenize the dialog title & close icon setup ([#1211](https://github.com/openfoodfacts/open-prices-frontend/issues/1211)) ([76e0f36](https://github.com/openfoodfacts/open-prices-frontend/commit/76e0f36b48c17f3b1f05c741b1a91b68dc6c263c))
* **Proofs:** new ProofDialog component ([#1210](https://github.com/openfoodfacts/open-prices-frontend/issues/1210)) ([300d4bb](https://github.com/openfoodfacts/open-prices-frontend/commit/300d4bb34a9d13296b00149df3e8c68571dc98a8))

## [1.106.7](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.106.6...v1.106.7) (2024-12-31)


### Bug Fixes

* **Infinite scroll:** fix load prices on the ProductDetail page. closes [#1205](https://github.com/openfoodfacts/open-prices-frontend/issues/1205) ([85f76a4](https://github.com/openfoodfacts/open-prices-frontend/commit/85f76a405e5f87787bcf305bcd9e38a43fcc6a70))


### Technical

* **Proof card:** display PriceCountChip in green from the first price. closes [#1187](https://github.com/openfoodfacts/open-prices-frontend/issues/1187) ([aaf69e6](https://github.com/openfoodfacts/open-prices-frontend/commit/aaf69e6ae598d6aa37a2abc174526f70ce94dfe0))

## [1.106.6](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.106.5...v1.106.6) (2024-12-31)


### Bug Fixes

* **Barcode scanner:** fix clearable action ([6e8d774](https://github.com/openfoodfacts/open-prices-frontend/commit/6e8d7743c2f2d3322cb6703bab204db86e64d104))
* **Infinite scroll:** fix infinite loading when no data to display ([7e3a046](https://github.com/openfoodfacts/open-prices-frontend/commit/7e3a0468b095858beb6d8099d33d51a6d179f2fc))


### Technical

* **Assistants:** barcode pre-cleaning rules to improve matching ([#1204](https://github.com/openfoodfacts/open-prices-frontend/issues/1204)) ([7729c15](https://github.com/openfoodfacts/open-prices-frontend/commit/7729c155bc279a8ed78bc360eca8881865b87a75))
* **l10n:** New Crowdin translations to review and merge ([#1199](https://github.com/openfoodfacts/open-prices-frontend/issues/1199)) ([e4d26d8](https://github.com/openfoodfacts/open-prices-frontend/commit/e4d26d882462b1cabb679eaf8935c68c288fba86))

## [1.106.5](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.106.4...v1.106.5) (2024-12-30)


### Technical

* **Barcode scanner:** display price tag cropped image if available ([#1195](https://github.com/openfoodfacts/open-prices-frontend/issues/1195)) ([f3ea4aa](https://github.com/openfoodfacts/open-prices-frontend/commit/f3ea4aa80a92b94b2477a9d37bd1fa1ce62c3c54))
* **l10n:** New Crowdin translations to review and merge ([#1182](https://github.com/openfoodfacts/open-prices-frontend/issues/1182)) ([decaaaf](https://github.com/openfoodfacts/open-prices-frontend/commit/decaaaf288bb9c62ddc30709c7055896e0c62bc0))
* **Proofs:** add action menu to open with the contribution asssitant ([#1198](https://github.com/openfoodfacts/open-prices-frontend/issues/1198)) ([8544586](https://github.com/openfoodfacts/open-prices-frontend/commit/854458620ae46a5e536ffdb653a3fd9e70c4fe81))
* **Proofs:** display the proof action menu to everyone ([#1197](https://github.com/openfoodfacts/open-prices-frontend/issues/1197)) ([3c61f24](https://github.com/openfoodfacts/open-prices-frontend/commit/3c61f2475bab94b787571d7742f3841b84816a95))

## [1.106.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.106.3...v1.106.4) (2024-12-30)


### Technical

* **API:** send the page url on every POST via the app_page param ([#1192](https://github.com/openfoodfacts/open-prices-frontend/issues/1192)) ([0882a34](https://github.com/openfoodfacts/open-prices-frontend/commit/0882a340d5fc8102a299e4fe9183780c11344440))
* **ContributionAssistant:** More pricetags integrations ([#1188](https://github.com/openfoodfacts/open-prices-frontend/issues/1188)) ([236e9a4](https://github.com/openfoodfacts/open-prices-frontend/commit/236e9a4c2f4ff1e4fe0c7ed322706835b5eab46b))
* **Dialogs:** full height & width on mobile ([#1193](https://github.com/openfoodfacts/open-prices-frontend/issues/1193)) ([3b5f6a9](https://github.com/openfoodfacts/open-prices-frontend/commit/3b5f6a9efc6bb2abd1e3d2326398e6f7015a2c38))
* **Price tags:** add icons next to Error & Unreadable actions ([#1190](https://github.com/openfoodfacts/open-prices-frontend/issues/1190)) ([252c74b](https://github.com/openfoodfacts/open-prices-frontend/commit/252c74bec38c3034add31c70254fb0f8423b4dcd))

## [1.106.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.106.2...v1.106.3) (2024-12-27)


### Technical

* **Home:** on mobile, load only the 5 latest prices (instead of loading 25 and slicing) ([4273a2e](https://github.com/openfoodfacts/open-prices-frontend/commit/4273a2e8615bd0b7459dfb5703ca7ffdcc3d49a0))
* **Price validator assistant:** on mobile, load by batchs of 5 price tags (speed up). ref [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([8b774e6](https://github.com/openfoodfacts/open-prices-frontend/commit/8b774e6e140227fdffda4a3db79467f6a3044e67))
* **Product card:** always display product barcode in Assistant pages to help validation. ref [#1044](https://github.com/openfoodfacts/open-prices-frontend/issues/1044) & [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([0664d49](https://github.com/openfoodfacts/open-prices-frontend/commit/0664d49629cbf756f1656a01a1670e1ab6ea6c9d))

## [1.106.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.106.1...v1.106.2) (2024-12-27)


### Bug Fixes

* **Contribution Assistant:** fix init with proof_ids typo. ref [#1166](https://github.com/openfoodfacts/open-prices-frontend/issues/1166) ([012b83f](https://github.com/openfoodfacts/open-prices-frontend/commit/012b83ff4a07433df436b6a5f4e36c4e21e9927c))
* **User dashboard:** fix again user prices today display. ref [#1179](https://github.com/openfoodfacts/open-prices-frontend/issues/1179) ([673d4b4](https://github.com/openfoodfacts/open-prices-frontend/commit/673d4b408b1bd8c655bbb272ac2da56bcbe8df46))

## [1.106.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.106.0...v1.106.1) (2024-12-27)


### Bug Fixes

* **User dashboard:** fix fetch user prices today. ref [#1179](https://github.com/openfoodfacts/open-prices-frontend/issues/1179) ([2d98203](https://github.com/openfoodfacts/open-prices-frontend/commit/2d982031846798926777c49e65e820bc468923a2))

## [1.106.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.105.1...v1.106.0) (2024-12-27)


### Features

* **User dashboard:** show today price & proof stats if any ([#1179](https://github.com/openfoodfacts/open-prices-frontend/issues/1179)) ([fd2bea9](https://github.com/openfoodfacts/open-prices-frontend/commit/fd2bea982cb6bbed74dfb52ee1669ea6bfdc0d54))


### Bug Fixes

* **Price add:** fix again price per kg strange values. ref [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([4c72125](https://github.com/openfoodfacts/open-prices-frontend/commit/4c7212528383e76e9a0071668a96f40ac53531b1))
* **Proofs:** fix ProofTypeChip display (typo in code). ref [#1142](https://github.com/openfoodfacts/open-prices-frontend/issues/1142) ([4e953fd](https://github.com/openfoodfacts/open-prices-frontend/commit/4e953fdc553fffb6cb6ec583837dade63c684ee3))


### Documentation

* add section & link to translation platform (crowdin) ([#1180](https://github.com/openfoodfacts/open-prices-frontend/issues/1180)) ([d20fec1](https://github.com/openfoodfacts/open-prices-frontend/commit/d20fec1a6ec4fa2a60a75a047877f38eaba50df1))


### Technical

* add matomo to the metrics project ([#1055](https://github.com/openfoodfacts/open-prices-frontend/issues/1055)) ([45404b0](https://github.com/openfoodfacts/open-prices-frontend/commit/45404b07418fa7ad5a7ad1e9f9c6d940d3977a54))
* **l10n:** New Crowdin translations to review and merge ([#1173](https://github.com/openfoodfacts/open-prices-frontend/issues/1173)) ([f8fc909](https://github.com/openfoodfacts/open-prices-frontend/commit/f8fc90978538c006a3cf8b0b3549621e77cc4af1))
* **l10n:** New Crowdin translations to review and merge ([#1181](https://github.com/openfoodfacts/open-prices-frontend/issues/1181)) ([df4d3e6](https://github.com/openfoodfacts/open-prices-frontend/commit/df4d3e6e1aedad326366b22090e9f936112a0f8b))
* **Multiple proof add:** skip type input. Add warning message ([#1175](https://github.com/openfoodfacts/open-prices-frontend/issues/1175)) ([1dc75c9](https://github.com/openfoodfacts/open-prices-frontend/commit/1dc75c9154ed5285db8c075eac2c47365470d663))
* **Price Validation Assistant:** filter only on proofs ready (uploaded via Proof add pages) ([#1177](https://github.com/openfoodfacts/open-prices-frontend/issues/1177)) ([ff4b406](https://github.com/openfoodfacts/open-prices-frontend/commit/ff4b406fe165133e40f33d08fb2ea262e7731bea))
* release-please config: add missing revert, perf, build & ci ([c8bfa40](https://github.com/openfoodfacts/open-prices-frontend/commit/c8bfa4083e85836f4886a13a161d5801cde68859))
* release-please config: fix typo. ref [#1183](https://github.com/openfoodfacts/open-prices-frontend/issues/1183) ([79df43d](https://github.com/openfoodfacts/open-prices-frontend/commit/79df43d0df7b96486a3203d60f20ecc05f7cb1fc))
* release-please config: new section for Documentation ([96f6423](https://github.com/openfoodfacts/open-prices-frontend/commit/96f642321343bfeb9cc39a2a9072d627d9ff626c))

## [1.105.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.105.0...v1.105.1) (2024-12-26)


### Bug Fixes

* **Assistants:** match price currency with proof currency ([6e3ff25](https://github.com/openfoodfacts/open-prices-frontend/commit/6e3ff25ee841e316a4bda989e26984a09674149c))
* **Barcode Scanner:** hide input stepper on the right. ref [#1085](https://github.com/openfoodfacts/open-prices-frontend/issues/1085) ([a164702](https://github.com/openfoodfacts/open-prices-frontend/commit/a1647024ccc233c2388a3f3a167f1e401c57a28d))
* **Price add:** fix price per kg strange values. ref [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([cc8d633](https://github.com/openfoodfacts/open-prices-frontend/commit/cc8d633165e8fec667e4cd05e3e185fdc7ab828d))

## [1.105.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.104.0...v1.105.0) (2024-12-25)


### Features

* **Currency detail:** New currency detail page ([#1170](https://github.com/openfoodfacts/open-prices-frontend/issues/1170)) ([206b81f](https://github.com/openfoodfacts/open-prices-frontend/commit/206b81ffc90f8f92d4b49734d27f4c0ebd7c63ad))


### Bug Fixes

* **Contribution Assistant:** fix typos following recent changes. ref [#1166](https://github.com/openfoodfacts/open-prices-frontend/issues/1166) ([80d5e81](https://github.com/openfoodfacts/open-prices-frontend/commit/80d5e813185b98af695ce018eb3b5be81448ab46))
* **Contribution Assistant:** hide nextProof if no proof_ids param. ref [#1166](https://github.com/openfoodfacts/open-prices-frontend/issues/1166) ([d00fb04](https://github.com/openfoodfacts/open-prices-frontend/commit/d00fb04d49f751483b22bd7bb94f734d09126dc9))


### Technical

* **Barcode scanner:** new prop to allow hiding the scan tab. Use in CA & PV Assistants. ref [#1044](https://github.com/openfoodfacts/open-prices-frontend/issues/1044) & [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([3b7d9f9](https://github.com/openfoodfacts/open-prices-frontend/commit/3b7d9f960018dcc0d3ea547904b36150cfab41ff))
* **Contribution Assistant:** better display label footer chip & CTA. ref [#1044](https://github.com/openfoodfacts/open-prices-frontend/issues/1044) ([126d601](https://github.com/openfoodfacts/open-prices-frontend/commit/126d601c665a63881e044728e8e8b6eadadd5284))
* **Contribution Assistant:** hide detected barcode alert to gain some vertical space. ref [#1044](https://github.com/openfoodfacts/open-prices-frontend/issues/1044) ([758d4ea](https://github.com/openfoodfacts/open-prices-frontend/commit/758d4ea166cba00427553de9c54a61473b675e4b))
* **Contribution Assistant:** hide price card header to gain some space. ref [#1044](https://github.com/openfoodfacts/open-prices-frontend/issues/1044) ([5ccaad4](https://github.com/openfoodfacts/open-prices-frontend/commit/5ccaad44750ad9a2bb34870b8891a3c461627661))
* **ContributionAssistant:** Full integration with price tag data ([#1166](https://github.com/openfoodfacts/open-prices-frontend/issues/1166)) ([54a1035](https://github.com/openfoodfacts/open-prices-frontend/commit/54a1035b8f14bd739239386a1ff1c6e33ee33ea1))
* **Currency detail:** new CurrencyCard with share link ([#1172](https://github.com/openfoodfacts/open-prices-frontend/issues/1172)) ([f70b22e](https://github.com/openfoodfacts/open-prices-frontend/commit/f70b22e7d300785bb913831c5f3ed66ec97bb62a))
* **l10n:** New Crowdin translations to review and merge ([#1161](https://github.com/openfoodfacts/open-prices-frontend/issues/1161)) ([cd231ea](https://github.com/openfoodfacts/open-prices-frontend/commit/cd231ea52bf777f22495a8e918709ae0d3952115))
* **Price card:** always show price created in the footer ([b90600e](https://github.com/openfoodfacts/open-prices-frontend/commit/b90600e025e34f087d519d89138e5151ab97ae0a))
* **Price tag:** hide product_name form field behind prop. ref [#1078](https://github.com/openfoodfacts/open-prices-frontend/issues/1078), [#1155](https://github.com/openfoodfacts/open-prices-frontend/issues/1155), [#1159](https://github.com/openfoodfacts/open-prices-frontend/issues/1159) ([988bb74](https://github.com/openfoodfacts/open-prices-frontend/commit/988bb748b81fd56207d62862b2b7a0ab880151c6))
* **Proof upload:** homogenise wording between different UIs. Use 'image' instead of 'proof' ([#1167](https://github.com/openfoodfacts/open-prices-frontend/issues/1167)) ([4211881](https://github.com/openfoodfacts/open-prices-frontend/commit/421188175b7eaf8e56db5f791fa72e4a044aeab2))
* **Proof upload:** rename & upgrade ProofInputRow to ProofUploadCard ([#1168](https://github.com/openfoodfacts/open-prices-frontend/issues/1168)) ([924b76c](https://github.com/openfoodfacts/open-prices-frontend/commit/924b76cdb70ac973a94791c85490ff361c70d9b3))

## [1.104.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.103.0...v1.104.0) (2024-12-22)


### Features

* **Price Validator Assistant:** add support for product name gemini detection ([#1159](https://github.com/openfoodfacts/open-prices-frontend/issues/1159)) ([4897a9e](https://github.com/openfoodfacts/open-prices-frontend/commit/4897a9e09fef69f77305eb26c290d33fbdff6419))


### Bug Fixes

* **Gemini:** fix endpoint url following a change in the backend. ref [#1044](https://github.com/openfoodfacts/open-prices-frontend/issues/1044) ([495a821](https://github.com/openfoodfacts/open-prices-frontend/commit/495a8219b465f1aa1841b04f038422721c715bf4))


### Technical

* **Price Validation Assistant:** display the ProofChip in the ProofFooter ([#1158](https://github.com/openfoodfacts/open-prices-frontend/issues/1158)) ([5257040](https://github.com/openfoodfacts/open-prices-frontend/commit/5257040198683ae09dbf2df4d01eb98320243b77))

## [1.103.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.102.1...v1.103.0) (2024-12-22)


### Features

* **ContributionAssistant:** add support for product name gemini detection ([#1155](https://github.com/openfoodfacts/open-prices-frontend/issues/1155)) ([abb5a19](https://github.com/openfoodfacts/open-prices-frontend/commit/abb5a1953321982a744f9404e724ab9f30b015bb))


### Bug Fixes

* **Price add:** Fix price_per border color when selected. ref [#1085](https://github.com/openfoodfacts/open-prices-frontend/issues/1085) & [#1134](https://github.com/openfoodfacts/open-prices-frontend/issues/1134) ([969dd0f](https://github.com/openfoodfacts/open-prices-frontend/commit/969dd0f4f2409e051c95a5f9d3a2c9c75f2d26de))


### Technical

* **Breadcrumbs:** make them a bit smaller (h5 to h6). ref [#908](https://github.com/openfoodfacts/open-prices-frontend/issues/908) ([954c858](https://github.com/openfoodfacts/open-prices-frontend/commit/954c858bd35771644a54e8ec59265a4b0ceae4b6))
* **l10n:** New Crowdin translations to review and merge ([#1154](https://github.com/openfoodfacts/open-prices-frontend/issues/1154)) ([d560456](https://github.com/openfoodfacts/open-prices-frontend/commit/d56045693558395bec77b7358ffe09c306094f65))
* **Price list:** new order option by price descending ([1f73aa5](https://github.com/openfoodfacts/open-prices-frontend/commit/1f73aa5e53f7bd2ab9b6e2ab308cd10cbe1bd54b))
* **Price Validator Assistant:** add load more on scroll. ref [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([b802ef6](https://github.com/openfoodfacts/open-prices-frontend/commit/b802ef6a02b34e4dc1c72ebc66e3a6689d41daa4))
* **Price Validator Assistant:** order by proof creation date (latest first). ref [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([5e1af96](https://github.com/openfoodfacts/open-prices-frontend/commit/5e1af9652dbbc394a7a5c40011dc1437258e3283))
* **Price Validator Assistant:** re-show the proof price_count in the footer. ref [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([f21a6d0](https://github.com/openfoodfacts/open-prices-frontend/commit/f21a6d008472abcc8abb71d59e29a1acd8f958f2))

## [1.102.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.102.0...v1.102.1) (2024-12-19)


### Bug Fixes

* **Price add:** fix a bug where proofs could be uploaded without locations. ref [#1085](https://github.com/openfoodfacts/open-prices-frontend/issues/1085) ([be2b1e3](https://github.com/openfoodfacts/open-prices-frontend/commit/be2b1e3d8e51d400f705a7db60176ff20559603f))
* **Price Validator Assistant:** re-crop image on change to update the images displayed. ref [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([6924466](https://github.com/openfoodfacts/open-prices-frontend/commit/6924466189a2cc530436c209690b742ef5bba854))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1151](https://github.com/openfoodfacts/open-prices-frontend/issues/1151)) ([1fb7292](https://github.com/openfoodfacts/open-prices-frontend/commit/1fb7292f8b0d524f1bf416fa640c024fdcbc1e76))
* **Price Validator Assistant:** gain some vertical px space (hide some proof info, compact alert). ref [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([05dd2cc](https://github.com/openfoodfacts/open-prices-frontend/commit/05dd2cc1dc60f6795808664dde99d49553f56e4b))
* **Price Validator Assistant:** only load 10 price tags. ref [#1137](https://github.com/openfoodfacts/open-prices-frontend/issues/1137) ([1a05446](https://github.com/openfoodfacts/open-prices-frontend/commit/1a054461474d7ad0c6d201ee3cafc12e94e97529))
* **ProofFooterRow:** allow hiding type & price_count info ([42f972c](https://github.com/openfoodfacts/open-prices-frontend/commit/42f972c4b4d68f76b6d7c5526b8601bf85176c0a))

## [1.102.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.101.1...v1.102.0) (2024-12-19)


### Features

* new Price Validator Assistant page ([#1145](https://github.com/openfoodfacts/open-prices-frontend/issues/1145)) ([2568db7](https://github.com/openfoodfacts/open-prices-frontend/commit/2568db746a3e87531cd4c6f7920af50012823ba2))


### Bug Fixes

* **Price Validation Assistant:** fix image display ([#1152](https://github.com/openfoodfacts/open-prices-frontend/issues/1152)) ([54005fc](https://github.com/openfoodfacts/open-prices-frontend/commit/54005fc7f3bbc7f0ef3d1b642057163613fc876c))
* update categories ([#1149](https://github.com/openfoodfacts/open-prices-frontend/issues/1149)) ([696496a](https://github.com/openfoodfacts/open-prices-frontend/commit/696496a37fc12ed4f68f707562da5cd2ac3adbd2))

## [1.101.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.101.0...v1.101.1) (2024-12-19)


### Technical

* **Changelog:** fix wording in last release. ref [#1138](https://github.com/openfoodfacts/open-prices-frontend/issues/1138) ([b9f0ebb](https://github.com/openfoodfacts/open-prices-frontend/commit/b9f0ebb9c5f3bdcfb594988561a992491b2901ab))
* **l10n:** New Crowdin translations to review and merge ([#1147](https://github.com/openfoodfacts/open-prices-frontend/issues/1147)) ([44682ec](https://github.com/openfoodfacts/open-prices-frontend/commit/44682ecb3a837bea386fc9a5a989cf06539515df))

## [1.101.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.100.2...v1.101.0) (2024-12-19)


### Features

* **Settings:** new Location selector default mode settings (recent, physical or online) ([#1143](https://github.com/openfoodfacts/open-prices-frontend/issues/1143)) ([14c89c5](https://github.com/openfoodfacts/open-prices-frontend/commit/14c89c530756818e58fef4d4aa280fdaf8e21631))


### Technical

* **Filter menu:** add new price filter by type (Barcode or Category) ([906ae20](https://github.com/openfoodfacts/open-prices-frontend/commit/906ae20b0a74fbeff21b4b8a717a57f6852b1792))
* **l10n:** New Crowdin translations to review and merge ([#1135](https://github.com/openfoodfacts/open-prices-frontend/issues/1135)) ([b70f33a](https://github.com/openfoodfacts/open-prices-frontend/commit/b70f33a1b3c23f29cb18725e9db274022b158f74))
* **l10n:** New Crowdin translations to review and merge ([#1144](https://github.com/openfoodfacts/open-prices-frontend/issues/1144)) ([7ff3359](https://github.com/openfoodfacts/open-prices-frontend/commit/7ff3359f919aa7fad94d56262815e9aeed9abf35))
* **Price add:** re-add padding between price & discount field (need space for hint per kg). ref [#1109](https://github.com/openfoodfacts/open-prices-frontend/issues/1109) ([f6b8296](https://github.com/openfoodfacts/open-prices-frontend/commit/f6b8296f4977761607be5884c4f831bb1c7b768d))
* **Proof list:** add filter by type & price_count ([#1136](https://github.com/openfoodfacts/open-prices-frontend/issues/1136)) ([f135927](https://github.com/openfoodfacts/open-prices-frontend/commit/f135927b114c3c3975f8b853da00ffc4605554f7))
* **Price list:** add filter by type & show_last_month ([#1140](https://github.com/openfoodfacts/open-prices-frontend/issues/1140)) ([3a9859b](https://github.com/openfoodfacts/open-prices-frontend/commit/3a9859bbc415ca114ff986056a84310fa0bd13b6))
* **Prices:** new PriceTypeChip component. improve ProofTypeChip ([#1142](https://github.com/openfoodfacts/open-prices-frontend/issues/1142)) ([a1b3af3](https://github.com/openfoodfacts/open-prices-frontend/commit/a1b3af33ea693aae460427080f7d74f898b06f1f))
* **User dashboard:** Prices: add new filter by type (Barcode or Category) ([#1139](https://github.com/openfoodfacts/open-prices-frontend/issues/1139)) ([ea3f287](https://github.com/openfoodfacts/open-prices-frontend/commit/ea3f28706532d109a252caa36d78c6208f318fce))

## [1.100.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.100.1...v1.100.2) (2024-12-15)


### Technical

* **Barcode scanner:** fix dialog height & width. Make search fields clearable ([6859c59](https://github.com/openfoodfacts/open-prices-frontend/commit/6859c59786adb0a8e1d214e8ee936dce3ff51f4b))
* **l10n:** New Crowdin translations to review and merge ([#1130](https://github.com/openfoodfacts/open-prices-frontend/issues/1130)) ([f1b0a7a](https://github.com/openfoodfacts/open-prices-frontend/commit/f1b0a7af6031d129357d2a43c80852d60a06d779))
* **l10n:** New Crowdin translations to review and merge ([#1133](https://github.com/openfoodfacts/open-prices-frontend/issues/1133)) ([0cb91ab](https://github.com/openfoodfacts/open-prices-frontend/commit/0cb91abbe0cf56a1fffa5f20bccffdeda89f364d))
* **Location selector:** fix dialog height & width. Make search fields clearable ([b790f48](https://github.com/openfoodfacts/open-prices-frontend/commit/b790f482fb8bd9fbebb7c4f65a8825eeb794560d))
* **Price add:** Match price_per selection style with other toggles. ref [#1085](https://github.com/openfoodfacts/open-prices-frontend/issues/1085) & [#1134](https://github.com/openfoodfacts/open-prices-frontend/issues/1134) ([9241ed1](https://github.com/openfoodfacts/open-prices-frontend/commit/9241ed14ce5f1a5d77f5ccf70d76223cf640786d))
* **Price add:** move price_per selector in PriceInputRow ([#1134](https://github.com/openfoodfacts/open-prices-frontend/issues/1134)) ([5a474ff](https://github.com/openfoodfacts/open-prices-frontend/commit/5a474ff52ed479b3c8abc1b244773e86f714b33d))
* **Price add:** remove Proof date & currency labels. ref [#1085](https://github.com/openfoodfacts/open-prices-frontend/issues/1085) ([cd7feb6](https://github.com/openfoodfacts/open-prices-frontend/commit/cd7feb6332704c31358934f5c764f6883dc91e54))
* **PriceInputRow:** move everything under a single v-row ([15f62c2](https://github.com/openfoodfacts/open-prices-frontend/commit/15f62c2f918531a0e4bb6e9c2db9dc514db6493c))
* **Recent proof dialog:** fix dialog height & width ([35ad522](https://github.com/openfoodfacts/open-prices-frontend/commit/35ad52266e41695ad81e0a796f48f986edc5d588))
* rename AddPriceX components to PriceAddX ([623cc0f](https://github.com/openfoodfacts/open-prices-frontend/commit/623cc0f3b8cb2ce489b9b194b69cfde7f10b5af0))

## [1.100.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.100.0...v1.100.1) (2024-12-15)


### Bug Fixes

* **Price add:** Only display new quantity bought field for receipt proofs. ref [#1128](https://github.com/openfoodfacts/open-prices-frontend/issues/1128) ([213e7a9](https://github.com/openfoodfacts/open-prices-frontend/commit/213e7a99e4b99d6d2d24f6ab28324f272fca5eed))


### Technical

* **ContributionAssistant:** var names, translations, avoid async ([#1129](https://github.com/openfoodfacts/open-prices-frontend/issues/1129)) ([bf6db1a](https://github.com/openfoodfacts/open-prices-frontend/commit/bf6db1ab809e72fa8bc9308c1c9465865b841ced))
* **Price add:** move new price add clear button at the bottom right. ref [#1085](https://github.com/openfoodfacts/open-prices-frontend/issues/1085) ([f2557cf](https://github.com/openfoodfacts/open-prices-frontend/commit/f2557cf382bb07864d27d59684d4df269b092baf))

## [1.100.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.99.0...v1.100.0) (2024-12-14)


### Features

* **Price add:** simple "quantity bought" field (only for receipt proofs) ([#1128](https://github.com/openfoodfacts/open-prices-frontend/issues/1128)) ([84eab3e](https://github.com/openfoodfacts/open-prices-frontend/commit/84eab3e075d126298646f19705daed67f15121e0))


### Bug Fixes

* **Price add:** gain some additional space by hiding an empty row. ref [#1109](https://github.com/openfoodfacts/open-prices-frontend/issues/1109) ([a44ab07](https://github.com/openfoodfacts/open-prices-frontend/commit/a44ab0740ff62a18b6855d82fabdde646686bfd5))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1122](https://github.com/openfoodfacts/open-prices-frontend/issues/1122)) ([ea36d91](https://github.com/openfoodfacts/open-prices-frontend/commit/ea36d9199810551345c4e974bc5a86cd0fec444b))
* **Multiple proof add:** show proof thumbnail image after upload (to reduce RAM). ref [#983](https://github.com/openfoodfacts/open-prices-frontend/issues/983) ([1d8cf1c](https://github.com/openfoodfacts/open-prices-frontend/commit/1d8cf1c1ad3149c3b15bbb97f8366d074150f31d))
* **Price add:** avoid raising validation error for optional fields. More compact display for receipt-only fields. ref [#974](https://github.com/openfoodfacts/open-prices-frontend/issues/974) ([ca865b1](https://github.com/openfoodfacts/open-prices-frontend/commit/ca865b1f7b9bd636f0f9ffc8285cf926b4ca248f))
* **Proof add:** already uploaded prices: fix price count chip in footer. ref [#1076](https://github.com/openfoodfacts/open-prices-frontend/issues/1076) ([2d28567](https://github.com/openfoodfacts/open-prices-frontend/commit/2d285673e93c7c2231cea41234e2dff11aee891b))
* **Proof add:** receipt-specific fields: add icon, add currency suffix. ref [#976](https://github.com/openfoodfacts/open-prices-frontend/issues/976) ([9b6dde6](https://github.com/openfoodfacts/open-prices-frontend/commit/9b6dde6a025355c8a4e0a9e9a00d20d07e3c5e17))
* use border classes instead of inline style ([4f958dc](https://github.com/openfoodfacts/open-prices-frontend/commit/4f958dc400ba30ddece1cc2336f433de8e99b15c))

## [1.99.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.98.2...v1.99.0) (2024-12-13)


### Features

* **ContributionAssistant:** Add support for automatic label detection ([b14ba63](https://github.com/openfoodfacts/open-prices-frontend/commit/b14ba63d10dc903d6462a7027e23cceb2d0720d8))

## [1.98.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.98.1...v1.98.2) (2024-12-12)


### Bug Fixes

* **Price add:** fix again barcode type prefill feature (typo). ref [#1108](https://github.com/openfoodfacts/open-prices-frontend/issues/1108) ([0cee626](https://github.com/openfoodfacts/open-prices-frontend/commit/0cee62600ff1097883ebf35114fd768459119a44))
* **Price add:** on barcode manual submit, blur form to hide keyboard. ref [#1108](https://github.com/openfoodfacts/open-prices-frontend/issues/1108) ([1faa429](https://github.com/openfoodfacts/open-prices-frontend/commit/1faa42950784ba1e0cd6552b562709d7303a7af6))


### Technical

* **Latest prices:** show loaded count chip ([738505d](https://github.com/openfoodfacts/open-prices-frontend/commit/738505d1d2422c8d8408cd0a123abffe85c7289e))
* **Latest proofs:** show loaded count chip. ref [#1120](https://github.com/openfoodfacts/open-prices-frontend/issues/1120) ([9accc4b](https://github.com/openfoodfacts/open-prices-frontend/commit/9accc4b71bc8c13698f56d83532d18173faf5806))
* **Location selector:** add a min height to avoid height differences on tab change. ref [#1095](https://github.com/openfoodfacts/open-prices-frontend/issues/1095) ([a6e2217](https://github.com/openfoodfacts/open-prices-frontend/commit/a6e221782206c4adcd9f25ee5001fa0dad42a102))
* **Sign in:** add HTML autocomplete info ([91970c5](https://github.com/openfoodfacts/open-prices-frontend/commit/91970c5d1855db4c6772159a4b79672a472ec18d))

## [1.98.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.98.0...v1.98.1) (2024-12-12)


### Technical

* **Latest proofs:** display thumb images. allow users to click on location & date chips. ref [#1118](https://github.com/openfoodfacts/open-prices-frontend/issues/1118) ([2ca6fec](https://github.com/openfoodfacts/open-prices-frontend/commit/2ca6fec56c86c641b910b7f1a2cad98ee7b0303c))
* **Stats:** add a link to the new /proofs page. ref [#1118](https://github.com/openfoodfacts/open-prices-frontend/issues/1118) ([04b52d4](https://github.com/openfoodfacts/open-prices-frontend/commit/04b52d4ab9c9adf1b1aa1e35b6a203139c93d154))

## [1.98.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.97.0...v1.98.0) (2024-12-12)


### Features

* **Proofs:** new /proofs to list recently uploaded proofs ([#1118](https://github.com/openfoodfacts/open-prices-frontend/issues/1118)) ([330b457](https://github.com/openfoodfacts/open-prices-frontend/commit/330b457bbb14ef196b25087d2200a2fb99caa357))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1117](https://github.com/openfoodfacts/open-prices-frontend/issues/1117)) ([33008f3](https://github.com/openfoodfacts/open-prices-frontend/commit/33008f3236d6dd8d92fb1ef9a690658f16bd0f85))
* **Latest proofs:** access page from drawer. ref [#1120](https://github.com/openfoodfacts/open-prices-frontend/issues/1120) ([6ce9c42](https://github.com/openfoodfacts/open-prices-frontend/commit/6ce9c42f75e2c6a1bbe4e9cc1729e2336884c5cd))

## [1.97.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.96.6...v1.97.0) (2024-12-11)


### Features

* **Settings:** new Barcode scanner default mode settings (scan or type) ([#1111](https://github.com/openfoodfacts/open-prices-frontend/issues/1111)) ([faf86ce](https://github.com/openfoodfacts/open-prices-frontend/commit/faf86ce62729f71bcc81dbd63f75beec0ea5397a))
* **User Dashboard:** My prices: add filter & order menus ([#1114](https://github.com/openfoodfacts/open-prices-frontend/issues/1114)) ([701efd3](https://github.com/openfoodfacts/open-prices-frontend/commit/701efd37e06b313c20115ff66afbe3e5f52996be))


### Bug Fixes

* **Price add:** fix barcode scanner dialog exit issues. ref [#1108](https://github.com/openfoodfacts/open-prices-frontend/issues/1108) ([307f49a](https://github.com/openfoodfacts/open-prices-frontend/commit/307f49a8c6a6ee47b623b401af8fe1800e32c36f))
* **Price add:** fix barcode type prefill feature (typo). ref [#1108](https://github.com/openfoodfacts/open-prices-frontend/issues/1108) ([8af89a7](https://github.com/openfoodfacts/open-prices-frontend/commit/8af89a7183d6a8cd3059f12bdfc4a8aa072717a3))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1113](https://github.com/openfoodfacts/open-prices-frontend/issues/1113)) ([78f2af2](https://github.com/openfoodfacts/open-prices-frontend/commit/78f2af27e3754fca77a680e19f4b2cf06b11e3cc))

## [1.96.6](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.96.5...v1.96.6) (2024-12-10)


### Bug Fixes

* **ContributionAssistant:** fix barcode or category selection. closes [#1104](https://github.com/openfoodfacts/open-prices-frontend/issues/1104) ([9bb39b2](https://github.com/openfoodfacts/open-prices-frontend/commit/9bb39b28ed6d6cb813af7284b02819f3236f43f9))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1106](https://github.com/openfoodfacts/open-prices-frontend/issues/1106)) ([e36ced8](https://github.com/openfoodfacts/open-prices-frontend/commit/e36ced885f197b61fa0a80cb11be8ae7d022e369))
* **Price add:** gain some space near the product & price checkboxes ([#1109](https://github.com/openfoodfacts/open-prices-frontend/issues/1109)) ([56b9bf2](https://github.com/openfoodfacts/open-prices-frontend/commit/56b9bf2d21cb788cefee387545bd0bde00af3397))
* **Price add:** On barcode manual input, show result confirmation before send ([#1108](https://github.com/openfoodfacts/open-prices-frontend/issues/1108)) ([82dadf9](https://github.com/openfoodfacts/open-prices-frontend/commit/82dadf9d595b53f5a6d90fe2b81f4d007b081e61))

## [1.96.5](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.96.4...v1.96.5) (2024-12-08)


### Bug Fixes

* **Price add:** fix init Product type (via store). ref [#1099](https://github.com/openfoodfacts/open-prices-frontend/issues/1099) ([675130d](https://github.com/openfoodfacts/open-prices-frontend/commit/675130d5048a3a8cfdd0bfd7bddb9c7f8444812d))
* **Price add:** Proof image: hide recent proof on some pages. ref [#1093](https://github.com/openfoodfacts/open-prices-frontend/issues/1093) ([bf01fc7](https://github.com/openfoodfacts/open-prices-frontend/commit/bf01fc7c36b02a48c88c6abd2317d95eb052264d))


### Technical

* change proof type icon depending on type ([dc5e3ba](https://github.com/openfoodfacts/open-prices-frontend/commit/dc5e3ba0e981d6e1b1eab8de94d05d38794f18e9))
* **l10n:** New Crowdin translations to review and merge ([#1100](https://github.com/openfoodfacts/open-prices-frontend/issues/1100)) ([ddeb1e8](https://github.com/openfoodfacts/open-prices-frontend/commit/ddeb1e8712ecbf19f3c62ad9edc692e480806821))
* **l10n:** New Crowdin translations to review and merge ([#1103](https://github.com/openfoodfacts/open-prices-frontend/issues/1103)) ([27d94a8](https://github.com/openfoodfacts/open-prices-frontend/commit/27d94a883e086b61e6bd49117ca588246c9a62f6))
* **Price add:** new Product form input (single button) ([#1102](https://github.com/openfoodfacts/open-prices-frontend/issues/1102)) ([79d4d26](https://github.com/openfoodfacts/open-prices-frontend/commit/79d4d262bf7e427c87e04be2861e19d680c78cc6))
* set dropdown menu titles uppercase ([6a5e77b](https://github.com/openfoodfacts/open-prices-frontend/commit/6a5e77b1cd3f31452b5cc7fa57be1c07fdfb2fdc))

## [1.96.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.96.3...v1.96.4) (2024-12-08)


### Bug Fixes

* **ContributionAssistant:** remove labels_tags param when sending barcodes ([#1067](https://github.com/openfoodfacts/open-prices-frontend/issues/1067)) ([a58d965](https://github.com/openfoodfacts/open-prices-frontend/commit/a58d965f066f6215f206cb5eb4e9838512695c82))
* **ContributionAssitant:** strip whitespaces from gemini detected barcodes ([#1089](https://github.com/openfoodfacts/open-prices-frontend/issues/1089)) ([e8256a0](https://github.com/openfoodfacts/open-prices-frontend/commit/e8256a03377d5bdc8d5ee1779a26675e38d5666e))
* **l10n:** adjust some translations (locations) ([de47841](https://github.com/openfoodfacts/open-prices-frontend/commit/de4784137d1169d5eadd2dee6b5f95582484ba44))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1088](https://github.com/openfoodfacts/open-prices-frontend/issues/1088)) ([d764e2e](https://github.com/openfoodfacts/open-prices-frontend/commit/d764e2efc6f4ad3307daced60e9ea13f924a653d))
* **l10n:** New Crowdin translations to review and merge ([#1097](https://github.com/openfoodfacts/open-prices-frontend/issues/1097)) ([b468a2a](https://github.com/openfoodfacts/open-prices-frontend/commit/b468a2a05405198f59adc1052cbdcf9f2372e0ed))
* **Price add:** new PRICE_TYPE_LIST constants. rename mode to type. send type field on create ([eeff608](https://github.com/openfoodfacts/open-prices-frontend/commit/eeff608b69a4f9db462ff68b7e38b20b50371305))
* **Price add:** new Product type form input (improved chips) ([#1099](https://github.com/openfoodfacts/open-prices-frontend/issues/1099)) ([2f811f6](https://github.com/openfoodfacts/open-prices-frontend/commit/2f811f69d162cd5e75cc6445aa8a2d8f6d32ba76))
* **Price add:** new Proof image input form (single button) ([#1093](https://github.com/openfoodfacts/open-prices-frontend/issues/1093)) ([90b7adc](https://github.com/openfoodfacts/open-prices-frontend/commit/90b7adca988bed5cba0b1cf0f3d73d389eaf257c))
* **Price add:** new Proof location input (single button) ([#1095](https://github.com/openfoodfacts/open-prices-frontend/issues/1095)) ([5ba2210](https://github.com/openfoodfacts/open-prices-frontend/commit/5ba221017ea7482a6dba0953d1cc4c7572212f32))
* **Price add:** new Proof type form input (revert back to chips) ([#1098](https://github.com/openfoodfacts/open-prices-frontend/issues/1098)) ([4ea4c8a](https://github.com/openfoodfacts/open-prices-frontend/commit/4ea4c8a408e766dee5dae5b4efea260cc7daad1f))
* **Price add:** new Proof type form input (single button) ([#1096](https://github.com/openfoodfacts/open-prices-frontend/issues/1096)) ([4f6c392](https://github.com/openfoodfacts/open-prices-frontend/commit/4f6c392261066ededacba2bc5943f4a41bf65dd1))
* **Price add:** small refactoring and fixes following recent Price add changes ([da0c4b2](https://github.com/openfoodfacts/open-prices-frontend/commit/da0c4b28f5313232980b7f1d18c3f1ea03299ba2))

## [1.96.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.96.2...v1.96.3) (2024-12-04)


### Technical

* **l10n:** add new pluralization translations. Start cleaning unused translations ([#1079](https://github.com/openfoodfacts/open-prices-frontend/issues/1079)) ([04c384b](https://github.com/openfoodfacts/open-prices-frontend/commit/04c384b98c0ea4be12d3018311142bf80b6a73eb))
* **l10n:** New Crowdin translations to review and merge ([#1081](https://github.com/openfoodfacts/open-prices-frontend/issues/1081)) ([e00fa3e](https://github.com/openfoodfacts/open-prices-frontend/commit/e00fa3e0e8ef4cfc3c39f0633e5910da39640b49))
* **Sign in:** improve UI (columns, spacing, password visibility toggle) ([#1087](https://github.com/openfoodfacts/open-prices-frontend/issues/1087)) ([8bbb135](https://github.com/openfoodfacts/open-prices-frontend/commit/8bbb135d03b2bb7cd2d1bc11974d79cf687f07bc))

## [1.96.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.96.1...v1.96.2) (2024-12-02)


### Bug Fixes

* **Price add:** show PriceAlreadyUploadedListCard footer only for receipts. ref [#1074](https://github.com/openfoodfacts/open-prices-frontend/issues/1074) ([93585fa](https://github.com/openfoodfacts/open-prices-frontend/commit/93585fac1c6fe9309adba947a1244abcc6d51a07))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1066](https://github.com/openfoodfacts/open-prices-frontend/issues/1066)) ([f5578e9](https://github.com/openfoodfacts/open-prices-frontend/commit/f5578e9cc1b5cdd95c77c5f9e3e7ab8cd160ec50))
* **Price add:** new PriceAlreadyUploadedListCard component ([382cbff](https://github.com/openfoodfacts/open-prices-frontend/commit/382cbff21d364b7aa109749c2f9674287d0e127e))
* **Price add:** show count & sum of already added prices (receipts) ([#1074](https://github.com/openfoodfacts/open-prices-frontend/issues/1074)) ([9be00ed](https://github.com/openfoodfacts/open-prices-frontend/commit/9be00ed747c0e8ab1bbea1215961cb659b908c3c))
* **Price add:** show receipt personal data in already added prices footer ([#1076](https://github.com/openfoodfacts/open-prices-frontend/issues/1076)) ([4c8c337](https://github.com/openfoodfacts/open-prices-frontend/commit/4c8c33774d6678a4951fe845698406687db4780e))
* **Proof card:** new components for receipt price_count & price_total ([#1075](https://github.com/openfoodfacts/open-prices-frontend/issues/1075)) ([ad3618a](https://github.com/openfoodfacts/open-prices-frontend/commit/ad3618aa4e857b29ad7185d631b8e38d04e26fd2))

## [1.96.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.96.0...v1.96.1) (2024-12-01)


### Technical

* **UI:** gain some vertical space above submit button ([#1070](https://github.com/openfoodfacts/open-prices-frontend/issues/1070)) ([eff962a](https://github.com/openfoodfacts/open-prices-frontend/commit/eff962af99d7721187fb112ef09c6d7eb12834eb))
* **UI:** On new price, scroll UI to the form ([#1072](https://github.com/openfoodfacts/open-prices-frontend/issues/1072)) ([50bd742](https://github.com/openfoodfacts/open-prices-frontend/commit/50bd742f000360e914b08c9858269a17ce0583ff))
* **UI:** right-align all submit buttons. change color of Done buttons ([#1068](https://github.com/openfoodfacts/open-prices-frontend/issues/1068)) ([492b628](https://github.com/openfoodfacts/open-prices-frontend/commit/492b6286adb74ed58eb6bc33f09a19857127e19f))

## [1.96.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.95.3...v1.96.0) (2024-11-29)


### Features

* **Community:** super quick /community page ([#1064](https://github.com/openfoodfacts/open-prices-frontend/issues/1064)) ([f78ca82](https://github.com/openfoodfacts/open-prices-frontend/commit/f78ca8237e8c43be2d4bda795c3ae10dc977820d))


### Bug Fixes

* add missing categories ([#1062](https://github.com/openfoodfacts/open-prices-frontend/issues/1062)) ([cd9d6e2](https://github.com/openfoodfacts/open-prices-frontend/commit/cd9d6e2c36a33a943f422244fd317655df21d07c))

## [1.95.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.95.2...v1.95.3) (2024-11-28)


### Bug Fixes

* add new categories ([#1059](https://github.com/openfoodfacts/open-prices-frontend/issues/1059)) ([f1fb7b4](https://github.com/openfoodfacts/open-prices-frontend/commit/f1fb7b4ed71cc1277f31b034ba9d9613fc8d83e5))
* add new categories ([#1061](https://github.com/openfoodfacts/open-prices-frontend/issues/1061)) ([3bc3028](https://github.com/openfoodfacts/open-prices-frontend/commit/3bc30288b147e6472f0e521bd0926e389a288512))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1058](https://github.com/openfoodfacts/open-prices-frontend/issues/1058)) ([ca7b4a8](https://github.com/openfoodfacts/open-prices-frontend/commit/ca7b4a842f6e992e1bd84664be62bbe2a615eae8))

## [1.95.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.95.1...v1.95.2) (2024-11-27)


### Bug Fixes

* **Contribution assistant:** fix bug when selecting an image. ref [#1043](https://github.com/openfoodfacts/open-prices-frontend/issues/1043) ([4ae7a71](https://github.com/openfoodfacts/open-prices-frontend/commit/4ae7a71656e1f78595395853882c3682839bb24d))
* **l10n:** fix typo ([b5af21d](https://github.com/openfoodfacts/open-prices-frontend/commit/b5af21d8c465b170cc3a21169cb292204bdecdd9))
* **Proofs:** fix multiple upload workflow. ref [#983](https://github.com/openfoodfacts/open-prices-frontend/issues/983) ([d9ab916](https://github.com/openfoodfacts/open-prices-frontend/commit/d9ab916fc86ae2db9521caa74cb90067b067af62))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1054](https://github.com/openfoodfacts/open-prices-frontend/issues/1054)) ([21b7175](https://github.com/openfoodfacts/open-prices-frontend/commit/21b717589f3a7a67f2eb663d272c8ed12a638cdf))

## [1.95.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.95.0...v1.95.1) (2024-11-26)


### Bug Fixes

* **Proofs:** fix selecting existing proof, following [#1043](https://github.com/openfoodfacts/open-prices-frontend/issues/1043) ([40301dc](https://github.com/openfoodfacts/open-prices-frontend/commit/40301dc00b4a094b6ff0b9bccdb36d63bc0c1807))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1050](https://github.com/openfoodfacts/open-prices-frontend/issues/1050)) ([1fa0106](https://github.com/openfoodfacts/open-prices-frontend/commit/1fa010695c63b4c78964bf9ee541d24b63b46f2a))

## [1.95.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.94.1...v1.95.0) (2024-11-25)


### Features

* **Proofs:** new experimental page to upload multiple images ([#1043](https://github.com/openfoodfacts/open-prices-frontend/issues/1043)) ([0fe705c](https://github.com/openfoodfacts/open-prices-frontend/commit/0fe705c70ede83e54b039d0ede30ef3609011919))


### Bug Fixes

* **Stats:** display all location & proof count to have logical numbers (v2) ([223d18e](https://github.com/openfoodfacts/open-prices-frontend/commit/223d18e2e3f0d01eb8511eb92043e5bae71efe91))
* update categories ([#1049](https://github.com/openfoodfacts/open-prices-frontend/issues/1049)) ([5ff1c83](https://github.com/openfoodfacts/open-prices-frontend/commit/5ff1c83cf4e6fecfcdcc7df09f949d1b2fcaac59))


### Technical

* **ContributionAssistant:** More UX tweaks following feedback ([#1039](https://github.com/openfoodfacts/open-prices-frontend/issues/1039)) ([f25f6c7](https://github.com/openfoodfacts/open-prices-frontend/commit/f25f6c7a176bc7f42ce8d113499696db99450b36))
* **ContributionAssistant:** use barcode mode when codes look credible ([#1042](https://github.com/openfoodfacts/open-prices-frontend/issues/1042)) ([496149a](https://github.com/openfoodfacts/open-prices-frontend/commit/496149ab2754efc3c610d6dd1925273afd847e71))
* **l10n:** New Crowdin translations to review and merge ([#1036](https://github.com/openfoodfacts/open-prices-frontend/issues/1036)) ([478f1fd](https://github.com/openfoodfacts/open-prices-frontend/commit/478f1fdc345e5d26339fde71661e40714fcc07e7))
* **l10n:** New Crowdin translations to review and merge ([#1046](https://github.com/openfoodfacts/open-prices-frontend/issues/1046)) ([942466a](https://github.com/openfoodfacts/open-prices-frontend/commit/942466a1aca461cddfa52ca61f2cd0464aad8e38))
* **ProductCard:** new prop to hide categories & labels chip ([#1038](https://github.com/openfoodfacts/open-prices-frontend/issues/1038)) ([91dc7e6](https://github.com/openfoodfacts/open-prices-frontend/commit/91dc7e6a5e0d33103c7634319639b63615a6eb11))

## [1.94.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.94.0...v1.94.1) (2024-11-13)


### Technical

* **ContributionAssistant:** small fixes and adjustements following feedback. ref [#1025](https://github.com/openfoodfacts/open-prices-frontend/issues/1025) ([a2ae48d](https://github.com/openfoodfacts/open-prices-frontend/commit/a2ae48d6890770706a60f7923c9b804152bdb8e9))
* **Footer:** invert action buttons & OFF links ([e755d8b](https://github.com/openfoodfacts/open-prices-frontend/commit/e755d8bf07a271c338d48e38848999f57a160d5a))

## [1.94.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.93.0...v1.94.0) (2024-11-13)


### Features

* **ContributionAssistant:** new experiment, a contribution assistant using gemini ([#1025](https://github.com/openfoodfacts/open-prices-frontend/issues/1025)) ([cdeec76](https://github.com/openfoodfacts/open-prices-frontend/commit/cdeec76ba430344428d619335efd9e4647c61ddc))
* new page to list known reuses ([#1032](https://github.com/openfoodfacts/open-prices-frontend/issues/1032)) ([c8627e9](https://github.com/openfoodfacts/open-prices-frontend/commit/c8627e9217414baa04ad01de128bf6eb4333e85e))


### Bug Fixes

* **Reuses page:** add images to repo. Add tags. Add alert to push new reuses. ref [#1032](https://github.com/openfoodfacts/open-prices-frontend/issues/1032) ([f578ec5](https://github.com/openfoodfacts/open-prices-frontend/commit/f578ec50737d9fde426d55aa8520c9c20a234f15))
* **Reuses page:** forgot to commit the image urls. ref [#1032](https://github.com/openfoodfacts/open-prices-frontend/issues/1032) ([a059c04](https://github.com/openfoodfacts/open-prices-frontend/commit/a059c04e3fa3412a6efa7dfbd5981fadf6aef0cc))


### Technical

* **API:** always filter input data fields before POST ([#1034](https://github.com/openfoodfacts/open-prices-frontend/issues/1034)) ([b8927ed](https://github.com/openfoodfacts/open-prices-frontend/commit/b8927ed10e0de7652f03ee33559275dafb3e348f))
* **API:** send the page url on every POST ([#1035](https://github.com/openfoodfacts/open-prices-frontend/issues/1035)) ([faa9a43](https://github.com/openfoodfacts/open-prices-frontend/commit/faa9a430b35a528993af33c2c00ddf0618461719))
* **l10n:** New Crowdin translations to review and merge ([#1031](https://github.com/openfoodfacts/open-prices-frontend/issues/1031)) ([249aca9](https://github.com/openfoodfacts/open-prices-frontend/commit/249aca9afb4e48700b6faa6c255b0e5bb8b24782))

## [1.93.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.92.2...v1.93.0) (2024-11-11)


### Features

* new /experiments page ([#1023](https://github.com/openfoodfacts/open-prices-frontend/issues/1023)) ([f6d665c](https://github.com/openfoodfacts/open-prices-frontend/commit/f6d665ca4de17992e71e8d664c2515a3711b2a24))


### Bug Fixes

* **Experiments:** fix AddPriceSingle & ProofAddSingle forms. ref [#1022](https://github.com/openfoodfacts/open-prices-frontend/issues/1022) ([9d10f27](https://github.com/openfoodfacts/open-prices-frontend/commit/9d10f274f7e7e2ff41637a630832d7b77d76645b))


### Technical

* add breadcrumbs to all remaining pages ([#1026](https://github.com/openfoodfacts/open-prices-frontend/issues/1026)) ([831db75](https://github.com/openfoodfacts/open-prices-frontend/commit/831db75d1203d7b871db334663c6c08d60f819a8))
* **Experiments:** add to Drawer. New settings to toggle from drawer ([#1029](https://github.com/openfoodfacts/open-prices-frontend/issues/1029)) ([a0dc39b](https://github.com/openfoodfacts/open-prices-frontend/commit/a0dc39b6ffe94c7c7ae855974404331dc04e5833))
* **l10n:** New Crowdin translations to review and merge ([#1021](https://github.com/openfoodfacts/open-prices-frontend/issues/1021)) ([cfab09c](https://github.com/openfoodfacts/open-prices-frontend/commit/cfab09cff5e2158e24065d274f628ac482484662))
* **l10n:** New Crowdin translations to review and merge ([#1028](https://github.com/openfoodfacts/open-prices-frontend/issues/1028)) ([656b452](https://github.com/openfoodfacts/open-prices-frontend/commit/656b4525b6bee05023edf86ed45e2ebc2ee50487))
* **Proof add:** add option to hide image preview ([3ece9a0](https://github.com/openfoodfacts/open-prices-frontend/commit/3ece9a0d0240a0c4af7c67ab86046bb1002a4968))
* **Settings:** Move some settings to a new 'Developer mode' section ([#1030](https://github.com/openfoodfacts/open-prices-frontend/issues/1030)) ([b757fd4](https://github.com/openfoodfacts/open-prices-frontend/commit/b757fd4e51c5b250f1446d7f985411bdfc44b02a))
* **Settings:** use switch for Dark mode (instead of btn) ([#1027](https://github.com/openfoodfacts/open-prices-frontend/issues/1027)) ([4e8d8a7](https://github.com/openfoodfacts/open-prices-frontend/commit/4e8d8a7578bc9da42fe5c0cf32810b93c82bd030))

## [1.92.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.92.1...v1.92.2) (2024-11-09)


### Bug Fixes

* **Location selector:** fix physical search submit. ref [#1012](https://github.com/openfoodfacts/open-prices-frontend/issues/1012) ([04308ae](https://github.com/openfoodfacts/open-prices-frontend/commit/04308ae6dd679d514ed41267dab3d369bcbfd5d2))

## [1.92.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.92.0...v1.92.1) (2024-11-09)


### Bug Fixes

* **Price add:** fix show newly added prices. ref [#1015](https://github.com/openfoodfacts/open-prices-frontend/issues/1015) ([550d9b5](https://github.com/openfoodfacts/open-prices-frontend/commit/550d9b510f9ad0da4ce8094efd775ebd3b7827dd))

## [1.92.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.91.2...v1.92.0) (2024-11-08)


### Features

* **Location selector:** allow adding new online locations ([#1012](https://github.com/openfoodfacts/open-prices-frontend/issues/1012)) ([e6c76fa](https://github.com/openfoodfacts/open-prices-frontend/commit/e6c76fadd15ae0e08f7e0b96848b0eead7b64f14))


### Bug Fixes

* remove dangling semicolons. fix prop errors ([c391b67](https://github.com/openfoodfacts/open-prices-frontend/commit/c391b67d291021a466b53a879c13145240be6875))
* **Stats:** display all location & proof count to have logical numbers ([1f7c03d](https://github.com/openfoodfacts/open-prices-frontend/commit/1f7c03d7191e5eaa1e0f0c2b790146768df65aff))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#1016](https://github.com/openfoodfacts/open-prices-frontend/issues/1016)) ([8194bb2](https://github.com/openfoodfacts/open-prices-frontend/commit/8194bb2b0792e4515f1be48aaa044f826a6bf155))
* **l10n:** New Crowdin translations to review and merge ([#1017](https://github.com/openfoodfacts/open-prices-frontend/issues/1017)) ([5177204](https://github.com/openfoodfacts/open-prices-frontend/commit/5177204551bad4f9fdcba77d205788825e1f8f38))
* **l10n:** New Crowdin translations to review and merge ([#1018](https://github.com/openfoodfacts/open-prices-frontend/issues/1018)) ([cdceaf0](https://github.com/openfoodfacts/open-prices-frontend/commit/cdceaf0b77a16b5eb4df2fe03c971f0e9aedf171))
* **l10n:** New Crowdin translations to review and merge ([#997](https://github.com/openfoodfacts/open-prices-frontend/issues/997)) ([a6fb19d](https://github.com/openfoodfacts/open-prices-frontend/commit/a6fb19d082cee873b5f2f6901bcc9ee6643fbb06))
* **Location selector:** Add tabs to choose between OSM & Recent ([#1010](https://github.com/openfoodfacts/open-prices-frontend/issues/1010)) ([7c0b99b](https://github.com/openfoodfacts/open-prices-frontend/commit/7c0b99b4d0f130db407fbb084c8178093b65fd65))
* **Location selector:** improve ONLINE location input. Keep only URL domain. ref [#1012](https://github.com/openfoodfacts/open-prices-frontend/issues/1012) ([15d449f](https://github.com/openfoodfacts/open-prices-frontend/commit/15d449f0066effa3d784369ca6b5dae0c87cb5a1))
* **Location selector:** new LocationRecentChip component ([#1013](https://github.com/openfoodfacts/open-prices-frontend/issues/1013)) ([aa328e2](https://github.com/openfoodfacts/open-prices-frontend/commit/aa328e26e1ebe5a4e239353bb3df32feaf5c7e14))
* **Location selector:** use v-tabs instead of v-btn-toggle. Change wording. ref [#1010](https://github.com/openfoodfacts/open-prices-frontend/issues/1010) ([8823745](https://github.com/openfoodfacts/open-prices-frontend/commit/882374546a11cf187f1ce30c44ab574ad714839b))
* **Price add:** small UI changes ([#1015](https://github.com/openfoodfacts/open-prices-frontend/issues/1015)) ([b270e5f](https://github.com/openfoodfacts/open-prices-frontend/commit/b270e5f6ad96fe4f70d9e8f0ec4ace979923006b))

## [1.91.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.91.1...v1.91.2) (2024-10-28)


### Technical

* **deps:** Update packages ([#998](https://github.com/openfoodfacts/open-prices-frontend/issues/998)) ([20cd275](https://github.com/openfoodfacts/open-prices-frontend/commit/20cd27571e722fbc7c554e390478b263a70d85f9))
* **l10n:** New Crowdin translations to review and merge ([#995](https://github.com/openfoodfacts/open-prices-frontend/issues/995)) ([5ad39aa](https://github.com/openfoodfacts/open-prices-frontend/commit/5ad39aa7aec27bf7aa4832471af69d2552b78843))

## [1.91.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.91.0...v1.91.1) (2024-10-27)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#990](https://github.com/openfoodfacts/open-prices-frontend/issues/990)) ([56f2c3f](https://github.com/openfoodfacts/open-prices-frontend/commit/56f2c3f8bc58054df2983f788612fe11ffc25f33))
* **Location search:** add search hint, improve map zoom for single result ([#992](https://github.com/openfoodfacts/open-prices-frontend/issues/992)) ([bfb1dbb](https://github.com/openfoodfacts/open-prices-frontend/commit/bfb1dbbf073239a7d274b89370ec491081748997))
* **Stats:** add links inside StatCard instead of dedicated buttons ([#994](https://github.com/openfoodfacts/open-prices-frontend/issues/994)) ([b34a8da](https://github.com/openfoodfacts/open-prices-frontend/commit/b34a8da671a13d81b4ce670b37310d15e5e33eaf))

## [1.91.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.90.0...v1.91.0) (2024-10-27)


### Features

* **Header:** hide old User settings, move Sign Out to drawer ([#989](https://github.com/openfoodfacts/open-prices-frontend/issues/989)) ([4e56086](https://github.com/openfoodfacts/open-prices-frontend/commit/4e56086266cff59a35045c77d30e2c2bd8f2011d))
* **Settings page:** new Settings page easily accessible ([#950](https://github.com/openfoodfacts/open-prices-frontend/issues/950)) ([0a8c24e](https://github.com/openfoodfacts/open-prices-frontend/commit/0a8c24ee5863fc3630dd3f5908097e3874363592))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#980](https://github.com/openfoodfacts/open-prices-frontend/issues/980)) ([4706f54](https://github.com/openfoodfacts/open-prices-frontend/commit/4706f5451158a08e4a3d13fa78f0b24d1c7b0c59))

## [1.90.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.89.1...v1.90.0) (2024-10-26)


### Features

* **Proofs:** allow editing proofs with existing prices. ref [#689](https://github.com/openfoodfacts/open-prices-frontend/issues/689) ([1dafd62](https://github.com/openfoodfacts/open-prices-frontend/commit/1dafd62f9eb4a6796ab31883837ee24be4a1060a))


### Technical

* **Dialogs:** change dialog action button style (fill instead of outline) ([ee37c37](https://github.com/openfoodfacts/open-prices-frontend/commit/ee37c37f3971410c2b9ceafdfa110876ba5c6ad0))
* **User card:** remove settings from action menu. closes [#986](https://github.com/openfoodfacts/open-prices-frontend/issues/986) ([d1470e3](https://github.com/openfoodfacts/open-prices-frontend/commit/d1470e3c030120255fe7d2d18cbe656d47515dd5))

## [1.89.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.89.0...v1.89.1) (2024-10-24)


### Bug Fixes

* **Chart:** display price chart in full width. ref [#302](https://github.com/openfoodfacts/open-prices-frontend/issues/302) ([b0ae8c2](https://github.com/openfoodfacts/open-prices-frontend/commit/b0ae8c230f63e6bf8a448c433216f3d9976d36d3))
* fix price filter by last 30 days. ref [#358](https://github.com/openfoodfacts/open-prices-frontend/issues/358). closes [#981](https://github.com/openfoodfacts/open-prices-frontend/issues/981) ([f627c17](https://github.com/openfoodfacts/open-prices-frontend/commit/f627c1771105f930bb178cfdbde6c01d4818b214))

## [1.89.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.88.3...v1.89.0) (2024-10-22)


### Features

* **Header:** show local or staging suffix if not in prod. ref [#876](https://github.com/openfoodfacts/open-prices-frontend/issues/876) ([bc02bb0](https://github.com/openfoodfacts/open-prices-frontend/commit/bc02bb031d3ba695f717204924bae13d2611da93))
* **Proof add:** add new consumption-related fields to the form ([#976](https://github.com/openfoodfacts/open-prices-frontend/issues/976)) ([c50b188](https://github.com/openfoodfacts/open-prices-frontend/commit/c50b1889a20cec23f65dc33d6be2e146800e0206))
* **Proof card:** show new consumption-related fields in the footer ([#977](https://github.com/openfoodfacts/open-prices-frontend/issues/977)) ([e0ee131](https://github.com/openfoodfacts/open-prices-frontend/commit/e0ee1312e65226a4b7eb0be624c4f37c79115786))


### Bug Fixes

* fix barcode scanner dialog width ([7ec6a3e](https://github.com/openfoodfacts/open-prices-frontend/commit/7ec6a3e5cfb71a204309d4567e52bbb232ba3a53))
* **Price add:** send price location_id to fix server error. ref [#965](https://github.com/openfoodfacts/open-prices-frontend/issues/965) ([d9850b7](https://github.com/openfoodfacts/open-prices-frontend/commit/d9850b7bf97bb525ad0dae8f8419b1c7444f1d33))
* **Stats:** fix accidently removed proof receipt count. ref [#967](https://github.com/openfoodfacts/open-prices-frontend/issues/967) ([499130e](https://github.com/openfoodfacts/open-prices-frontend/commit/499130eeb7dda0e615deed8e3f10a502978d9b01))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#972](https://github.com/openfoodfacts/open-prices-frontend/issues/972)) ([c09e053](https://github.com/openfoodfacts/open-prices-frontend/commit/c09e0539540860090e75da0fe8d4133285cb3a16))
* **Locations:** use constants instead of hard-coded OSM/ONLINE variables. ref [#965](https://github.com/openfoodfacts/open-prices-frontend/issues/965) ([72114ca](https://github.com/openfoodfacts/open-prices-frontend/commit/72114ca604107e4c77d694314e9c8baec235be42))
* **Price add:** show red asterisk next to required field labels ([#978](https://github.com/openfoodfacts/open-prices-frontend/issues/978)) ([83c6cf5](https://github.com/openfoodfacts/open-prices-frontend/commit/83c6cf5a7e25e4c06ab0d131644dd4da4dd49319))
* **Proof add:** rename ProofDateCurrencyInputRow to ProofMetadataInputRow ([#973](https://github.com/openfoodfacts/open-prices-frontend/issues/973)) ([8085baf](https://github.com/openfoodfacts/open-prices-frontend/commit/8085baf69b1ea64d6c2c5ff7f10fd8d77fcb4f79))
* **Proofs:** use type constants instead of hard-coded PRICE_TAG/RECEIPT ([24461af](https://github.com/openfoodfacts/open-prices-frontend/commit/24461af12de2de9d62648f1b06f535ccb0c44f56))
* **Stats:** add links to latest prices. and top products, locations & contributors. ref [#50](https://github.com/openfoodfacts/open-prices-frontend/issues/50) ([07fa5d8](https://github.com/openfoodfacts/open-prices-frontend/commit/07fa5d847df5f3a9b9700a598ec390dc729bcdf9))

## [1.88.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.88.2...v1.88.3) (2024-10-20)


### Bug Fixes

* **Location list:** fix filtering on page load (if url params). ref [#964](https://github.com/openfoodfacts/open-prices-frontend/issues/964) ([042226b](https://github.com/openfoodfacts/open-prices-frontend/commit/042226b9656899945f4a556e22b0ef3b682c6313))


### Technical

* **User dashboard:** after success message display, replace url param. ref [#878](https://github.com/openfoodfacts/open-prices-frontend/issues/878) ([e92516a](https://github.com/openfoodfacts/open-prices-frontend/commit/e92516a547a5a75cd191c8f686deecd5ae77c8a9))

## [1.88.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.88.1...v1.88.2) (2024-10-20)


### Bug Fixes

* **Location card:** fix link to online location website. ref [#966](https://github.com/openfoodfacts/open-prices-frontend/issues/966) ([cb86050](https://github.com/openfoodfacts/open-prices-frontend/commit/cb8605037094c41014951b69977b77edc8df5d8d))


### Technical

* homogenize v-dialogs ([4dfc48e](https://github.com/openfoodfacts/open-prices-frontend/commit/4dfc48ef76534ddcd8a2fb953a3554ab538eae0c))
* **l10n:** New Crowdin translations to review and merge ([#969](https://github.com/openfoodfacts/open-prices-frontend/issues/969)) ([83e6fa1](https://github.com/openfoodfacts/open-prices-frontend/commit/83e6fa103afcbe6872f9d8dab1447c837449007c))
* **Locations:** move some logic to utils & constants. ref [#965](https://github.com/openfoodfacts/open-prices-frontend/issues/965) ([b690706](https://github.com/openfoodfacts/open-prices-frontend/commit/b690706de1969d16039cf9770a6a65b7e4a0c578))
* **Stats page:** fix recent stat displaty. use OSM name for location stat. ref [#967](https://github.com/openfoodfacts/open-prices-frontend/issues/967) ([3d42bf6](https://github.com/openfoodfacts/open-prices-frontend/commit/3d42bf6d8d2d898134e6c765507f1a27a5adb5f9))
* use green color for success buttons ([cec0adc](https://github.com/openfoodfacts/open-prices-frontend/commit/cec0adc063b32415b681dd60b28e03d1e6b26735))

## [1.88.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.88.0...v1.88.1) (2024-10-19)


### Bug Fixes

* **CI:** fix typo in labeler config. ref [#237](https://github.com/openfoodfacts/open-prices-frontend/issues/237) ([3bec224](https://github.com/openfoodfacts/open-prices-frontend/commit/3bec224b652223d896af3f7c7a44e2c951314acc))
* **Price add:** fix redirect after single price add. ref [#941](https://github.com/openfoodfacts/open-prices-frontend/issues/941) ([4238571](https://github.com/openfoodfacts/open-prices-frontend/commit/4238571b1defc4b77d906631610d81656c62791b))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#968](https://github.com/openfoodfacts/open-prices-frontend/issues/968)) ([c3c9fc0](https://github.com/openfoodfacts/open-prices-frontend/commit/c3c9fc08aa8e86dcf861bfd2b8306fea6f96d7d5))
* **Location card:** manage ONLINE locations (title, hide OSM metadata, actions) ([#966](https://github.com/openfoodfacts/open-prices-frontend/issues/966)) ([7d0ca91](https://github.com/openfoodfacts/open-prices-frontend/commit/7d0ca91512ac558e01b7aee76b8f72c9308412b2))
* **Location list:** new filter by location type ([#964](https://github.com/openfoodfacts/open-prices-frontend/issues/964)) ([ee7a50b](https://github.com/openfoodfacts/open-prices-frontend/commit/ee7a50bfdb8745766184b3cb25aabd9cd705a30f))
* **Price add:** allow adding prices to proofs with existing ONLINE location. ref [#965](https://github.com/openfoodfacts/open-prices-frontend/issues/965) ([819ca45](https://github.com/openfoodfacts/open-prices-frontend/commit/819ca45702cc10ace5e5bd754ffe30300bddaea0))
* **Stats page:** add extra count by location & proof type ([#967](https://github.com/openfoodfacts/open-prices-frontend/issues/967)) ([8eb9b63](https://github.com/openfoodfacts/open-prices-frontend/commit/8eb9b6302a0f85e6dc5b69b7e537426280875788))

## [1.88.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.87.1...v1.88.0) (2024-10-17)


### Features

* **SignIn:** parse and use username from access_token on signin, allows usage of emails to login ([#956](https://github.com/openfoodfacts/open-prices-frontend/issues/956)) ([e4ca52d](https://github.com/openfoodfacts/open-prices-frontend/commit/e4ca52d58d3be80b92e952160bb039e2977609dd))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#954](https://github.com/openfoodfacts/open-prices-frontend/issues/954)) ([d7f0718](https://github.com/openfoodfacts/open-prices-frontend/commit/d7f0718690541c8932987091634426218ba19030))
* **Proof card:** hide by default the proof owner chip ([#959](https://github.com/openfoodfacts/open-prices-frontend/issues/959)) ([3cbef3f](https://github.com/openfoodfacts/open-prices-frontend/commit/3cbef3fca2e4d25f89b4e31178698543886698d4))
* **Proof detail:** add history section at the bottom ([#960](https://github.com/openfoodfacts/open-prices-frontend/issues/960)) ([b71b4b6](https://github.com/openfoodfacts/open-prices-frontend/commit/b71b4b690d9dc43e23225c328d8098e5ad61f836))
* **ProofCard:** Only show proof thumb image in User Dashboard Proof List ([#955](https://github.com/openfoodfacts/open-prices-frontend/issues/955)) ([64824b8](https://github.com/openfoodfacts/open-prices-frontend/commit/64824b873fcf620d48a8907a61d9bf5747f3fe7c))

## [1.87.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.87.0...v1.87.1) (2024-10-09)


### Bug Fixes

* **Price add:** Always set the default price currency as the proof currency. closes [#946](https://github.com/openfoodfacts/open-prices-frontend/issues/946) ([a7a9fb3](https://github.com/openfoodfacts/open-prices-frontend/commit/a7a9fb357e270f998c530fcb15db27972ba0e4f0))
* **User dashboard:** if 0 prices, hide filters & show more buttons. ref [#878](https://github.com/openfoodfacts/open-prices-frontend/issues/878) ([e354100](https://github.com/openfoodfacts/open-prices-frontend/commit/e3541009f73a54882bb9f44e5c08e0521a213719))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#942](https://github.com/openfoodfacts/open-prices-frontend/issues/942)) ([5b44d17](https://github.com/openfoodfacts/open-prices-frontend/commit/5b44d1778104edb8c738df8acf8440526469c738))
* **Price add:** Improve barcode manual input by prefilling with current code ([#949](https://github.com/openfoodfacts/open-prices-frontend/issues/949)) ([a10c514](https://github.com/openfoodfacts/open-prices-frontend/commit/a10c514e0f783b62ddce6a931a2c88dab40e197e))
* **Price add:** move proof_id & code init to ProductInputRow component. ref [#584](https://github.com/openfoodfacts/open-prices-frontend/issues/584) & [#168](https://github.com/openfoodfacts/open-prices-frontend/issues/168) ([8042b82](https://github.com/openfoodfacts/open-prices-frontend/commit/8042b82acbe353e832fe237fbf544a9f11ce05b9))
* **User dashboard:** My proofs: add filter by type ([#944](https://github.com/openfoodfacts/open-prices-frontend/issues/944)) ([74a40fd](https://github.com/openfoodfacts/open-prices-frontend/commit/74a40fd90ce4cfb3076b9372c9dbf8ac19b2e0ee))

## [1.87.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.86.0...v1.87.0) (2024-10-07)


### Features

* **User dashboard:** improve look & feel ([#939](https://github.com/openfoodfacts/open-prices-frontend/issues/939)) ([63ff257](https://github.com/openfoodfacts/open-prices-frontend/commit/63ff257548e090b324032ce6d71bd36778013b36))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#938](https://github.com/openfoodfacts/open-prices-frontend/issues/938)) ([256b0f8](https://github.com/openfoodfacts/open-prices-frontend/commit/256b0f8613762c8e5374f6e1945196dfa860924f))
* **Price add:** On price add done, redirect to User Dashboard ([#941](https://github.com/openfoodfacts/open-prices-frontend/issues/941)) ([bb9d2ff](https://github.com/openfoodfacts/open-prices-frontend/commit/bb9d2ffbe5b02d1e76c03683a5644e8f1b5a9291))
* **Proof add:** on Proof add success, redirect to dashboard. ref [#878](https://github.com/openfoodfacts/open-prices-frontend/issues/878) ([ffe8c13](https://github.com/openfoodfacts/open-prices-frontend/commit/ffe8c13ce5219ce5660f843075568983f6dd9516))
* **Sign in:** on Sign in success, redirect to dashboard. ref [#878](https://github.com/openfoodfacts/open-prices-frontend/issues/878) ([8816898](https://github.com/openfoodfacts/open-prices-frontend/commit/8816898baafff10faf233d5c27742072d3daafee))
* **User settings:** on User settings save, redirect to dashboard. ref [#878](https://github.com/openfoodfacts/open-prices-frontend/issues/878) ([5d4e815](https://github.com/openfoodfacts/open-prices-frontend/commit/5d4e815dba9ef89c654c8d953230788df48160ea))

## [1.86.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.85.0...v1.86.0) (2024-10-06)


### Features

* **Add prices:** add proof type choice directly in the form ([#932](https://github.com/openfoodfacts/open-prices-frontend/issues/932)) ([104b0a7](https://github.com/openfoodfacts/open-prices-frontend/commit/104b0a78e9d2b185a3fc818734d26b18b1a4e614))
* **App:** Dark mode support  ([#921](https://github.com/openfoodfacts/open-prices-frontend/issues/921)) ([9a28f1d](https://github.com/openfoodfacts/open-prices-frontend/commit/9a28f1d94f5954419049fbeba541601baa48c9f1))


### Bug Fixes

* **Add prices:** fix set proof type on recent proof selected. ref [#933](https://github.com/openfoodfacts/open-prices-frontend/issues/933) ([0a9f6e6](https://github.com/openfoodfacts/open-prices-frontend/commit/0a9f6e6b55833e26046610dab3f7ebfdd4a6ca9f))


### Technical

* **Add prices:** new ProofImageInputRow component ([#936](https://github.com/openfoodfacts/open-prices-frontend/issues/936)) ([5b209a5](https://github.com/openfoodfacts/open-prices-frontend/commit/5b209a5d3325d23ed55c3da2f13a3b4158779f00))
* **l10n:** New Crowdin translations to review and merge ([#929](https://github.com/openfoodfacts/open-prices-frontend/issues/929)) ([eb31d5b](https://github.com/openfoodfacts/open-prices-frontend/commit/eb31d5bc80f839361974a8cbef5bcb2a03e140da))

## [1.85.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.84.4...v1.85.0) (2024-10-04)


### Features

* **Dashboard:** first basic breadcrumb for user dashboard pages ([#927](https://github.com/openfoodfacts/open-prices-frontend/issues/927)) ([58065a8](https://github.com/openfoodfacts/open-prices-frontend/commit/58065a8ff55df76a8dd27e04623c5b7b43348412))


### Bug Fixes

* **Stats:** fix stat counts. ref [#922](https://github.com/openfoodfacts/open-prices-frontend/issues/922) ([f76277a](https://github.com/openfoodfacts/open-prices-frontend/commit/f76277a00c99064d1eef4eafe7a6183d14248a7d))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#928](https://github.com/openfoodfacts/open-prices-frontend/issues/928)) ([01d7c51](https://github.com/openfoodfacts/open-prices-frontend/commit/01d7c51e247f558b99bab97997f0ab9a9fa04657))

## [1.84.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.84.3...v1.84.4) (2024-10-04)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#920](https://github.com/openfoodfacts/open-prices-frontend/issues/920)) ([66203c4](https://github.com/openfoodfacts/open-prices-frontend/commit/66203c436352093ed63e058149f2b03ca5f499e6))
* **Proofs:** show image_thumb instead of (full) file image ([#924](https://github.com/openfoodfacts/open-prices-frontend/issues/924)) ([de4359e](https://github.com/openfoodfacts/open-prices-frontend/commit/de4359e6235f96b6948a143e50250582ad9fb6bb))
* **Stats:** remove some totals, add new count per proof type ([#922](https://github.com/openfoodfacts/open-prices-frontend/issues/922)) ([933a77e](https://github.com/openfoodfacts/open-prices-frontend/commit/933a77efefb67d8409bb16f43badde8a9fb30ee1))

## [1.84.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.84.2...v1.84.3) (2024-10-03)


### Bug Fixes

* **Home:** fix app tagline. ref [#909](https://github.com/openfoodfacts/open-prices-frontend/issues/909) ([5162c7f](https://github.com/openfoodfacts/open-prices-frontend/commit/5162c7f0c6ffe986acfdf6f35c942357c9d39897))


### Technical

* **deps:** Update packages ([#916](https://github.com/openfoodfacts/open-prices-frontend/issues/916)) ([9829df4](https://github.com/openfoodfacts/open-prices-frontend/commit/9829df474ac3113207832dc6b5530879d02cc3b3))

## [1.84.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.84.1...v1.84.2) (2024-10-03)


### Technical

* homogenize app tagline (food and product) ([#909](https://github.com/openfoodfacts/open-prices-frontend/issues/909)) ([aabd05e](https://github.com/openfoodfacts/open-prices-frontend/commit/aabd05e2292bd9f5dcbdb16c87e0cf75ae63956e))
* **l10n:** New Crowdin translations to review and merge ([#903](https://github.com/openfoodfacts/open-prices-frontend/issues/903)) ([36627ae](https://github.com/openfoodfacts/open-prices-frontend/commit/36627aecacd3560cbc4b9a958e24eaa411c50134))
* restart nginx after front-end code deployment ([33f677f](https://github.com/openfoodfacts/open-prices-frontend/commit/33f677f55ce3e36869f0f7fb35dd6f574222dd27))

## [1.84.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.84.0...v1.84.1) (2024-10-01)


### Bug Fixes

* **CI:** fix typo in yarn build staging & prod. ref [#906](https://github.com/openfoodfacts/open-prices-frontend/issues/906) ([011d5a1](https://github.com/openfoodfacts/open-prices-frontend/commit/011d5a1e25419824670fc1956a7098225058a064))
* kill the landing page ([#906](https://github.com/openfoodfacts/open-prices-frontend/issues/906)) ([02199aa](https://github.com/openfoodfacts/open-prices-frontend/commit/02199aa6aec9afd206527a72a92efdc38edce01c))
* kill the landing page (remove remaining /app) ([#910](https://github.com/openfoodfacts/open-prices-frontend/issues/910)) ([fa8e162](https://github.com/openfoodfacts/open-prices-frontend/commit/fa8e162eb1da8874a72f872dedc85b5d1c5af30c))


### Technical

* **Dashboard:** fix Proof count. Cleanup Price & Proof headers ([#907](https://github.com/openfoodfacts/open-prices-frontend/issues/907)) ([fe0c712](https://github.com/openfoodfacts/open-prices-frontend/commit/fe0c7122e47f989f99c607f4293bd7781ff10cc7))
* **Product list:** add filter to hide products without prices ([#904](https://github.com/openfoodfacts/open-prices-frontend/issues/904)) ([03bcec7](https://github.com/openfoodfacts/open-prices-frontend/commit/03bcec7946a26651f01b2b3113f13803cc42fcd7))

## [1.84.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.83.0...v1.84.0) (2024-09-30)


### Features

* **About:** new /about page ([#874](https://github.com/openfoodfacts/open-prices-frontend/issues/874)) ([020fc79](https://github.com/openfoodfacts/open-prices-frontend/commit/020fc79ca68988003f12d6619111771fdf908375))


### Bug Fixes

* **Price add:** load existing prices chronologically. ref [#718](https://github.com/openfoodfacts/open-prices-frontend/issues/718) ([769fa5e](https://github.com/openfoodfacts/open-prices-frontend/commit/769fa5eaf93291da13a19a8ae379ce35fd198bd2))
* **utils:** relative time display ([#880](https://github.com/openfoodfacts/open-prices-frontend/issues/880)) ([c787dea](https://github.com/openfoodfacts/open-prices-frontend/commit/c787dea1c3edd5e9a4ca03e4267f21d56a9aa095))


### Technical

* **Footer:** update link to new About page. ref [#364](https://github.com/openfoodfacts/open-prices-frontend/issues/364) ([e734a5f](https://github.com/openfoodfacts/open-prices-frontend/commit/e734a5f22186c5b1fb84bc44dae2d6bebba02f56))
* **l10n:** New Crowdin translations to review and merge ([#875](https://github.com/openfoodfacts/open-prices-frontend/issues/875)) ([dccd574](https://github.com/openfoodfacts/open-prices-frontend/commit/dccd5749a39c8ee17d541bf70b53296877e65ce1))
* **l10n:** New Crowdin translations to review and merge ([#884](https://github.com/openfoodfacts/open-prices-frontend/issues/884)) ([0d6ef2d](https://github.com/openfoodfacts/open-prices-frontend/commit/0d6ef2d03b0932758753dfafaf6b4ffa3e17d53b))
* **router:** Add redirect for future users coming from /app ([#882](https://github.com/openfoodfacts/open-prices-frontend/issues/882)) ([c2b92c9](https://github.com/openfoodfacts/open-prices-frontend/commit/c2b92c98d18fb010c1eb46dba2e92a07f68b42cc))

## [1.83.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.82.0...v1.83.0) (2024-09-29)


### Features

* **Home:** reorganize home page sections. move buttons to header ([#865](https://github.com/openfoodfacts/open-prices-frontend/issues/865)) ([aa973b0](https://github.com/openfoodfacts/open-prices-frontend/commit/aa973b0e1fa865d8d933814cbacd3db2cf6b9828))


### Bug Fixes

* **CI:** fix again restriction labeling of Translations. ref [#237](https://github.com/openfoodfacts/open-prices-frontend/issues/237) ([ac8258b](https://github.com/openfoodfacts/open-prices-frontend/commit/ac8258bac09b7b4178f301984c7feab95e111bcc))
* **CI:** restrict labeling of Translations. ref [#237](https://github.com/openfoodfacts/open-prices-frontend/issues/237) ([2e60cd7](https://github.com/openfoodfacts/open-prices-frontend/commit/2e60cd749e73d07c2f69d09a5230c467ae30e9d2))
* **Footer:** reduce height, fix bottom padding, add inside padding. ref [#843](https://github.com/openfoodfacts/open-prices-frontend/issues/843) ([6d05367](https://github.com/openfoodfacts/open-prices-frontend/commit/6d0536748591f1264e8872b10831d73e46589c0c))


### Technical

* **drawer:** add link to Dashboard. ref [#866](https://github.com/openfoodfacts/open-prices-frontend/issues/866) ([902827c](https://github.com/openfoodfacts/open-prices-frontend/commit/902827c92ff013a028841cdb613d8719e5de44c6))
* **drawer:** add link to stats page ([#867](https://github.com/openfoodfacts/open-prices-frontend/issues/867)) ([eafb4e2](https://github.com/openfoodfacts/open-prices-frontend/commit/eafb4e2e70706a6cd63386430808e32ef9de3c8c))
* **drawer:** move up 'Add a price' (above Search & Latest prices). ref [#866](https://github.com/openfoodfacts/open-prices-frontend/issues/866) ([152df71](https://github.com/openfoodfacts/open-prices-frontend/commit/152df719d73ea20ef9dc5c52209f71dacc4d4ba8))
* **Home:** load 25 latest prices (but show only 5 on small screens). ref [#865](https://github.com/openfoodfacts/open-prices-frontend/issues/865) ([588c97a](https://github.com/openfoodfacts/open-prices-frontend/commit/588c97a9f6ed14fe73bd39b0f0d5351973758071))
* **Home:** show 4 columns of latest prices on xl screens. ref [#843](https://github.com/openfoodfacts/open-prices-frontend/issues/843) ([c3d04ed](https://github.com/openfoodfacts/open-prices-frontend/commit/c3d04ed4a2ee4489a6972613fbcd8295036ee81c))
* **Home:** show latest price created date. ref [#843](https://github.com/openfoodfacts/open-prices-frontend/issues/843) & [#806](https://github.com/openfoodfacts/open-prices-frontend/issues/806) ([b1b2337](https://github.com/openfoodfacts/open-prices-frontend/commit/b1b233727846274a01eddcae1ac5e15cf244b625))
* **l10n:** New Crowdin translations to review and merge ([#864](https://github.com/openfoodfacts/open-prices-frontend/issues/864)) ([19a4832](https://github.com/openfoodfacts/open-prices-frontend/commit/19a4832716d8894e85ad2ae3792649beb8b95750))
* **l10n:** New Crowdin translations to review and merge ([#870](https://github.com/openfoodfacts/open-prices-frontend/issues/870)) ([930f15b](https://github.com/openfoodfacts/open-prices-frontend/commit/930f15b25a37ab6676d1ea2e0e3857f4a69638d7))
* **l10n:** New Crowdin translations to review and merge ([#873](https://github.com/openfoodfacts/open-prices-frontend/issues/873)) ([b801f2c](https://github.com/openfoodfacts/open-prices-frontend/commit/b801f2c6c0179ee3cc8e88159db19143b48a5af9))
* **Price card:** allow toggling price owner, date & created fields. ref [#806](https://github.com/openfoodfacts/open-prices-frontend/issues/806) ([ee44680](https://github.com/openfoodfacts/open-prices-frontend/commit/ee4468019fc222af6c96dcb3bc523578500c9bfe))
* show 4 columns on xl screens ([#872](https://github.com/openfoodfacts/open-prices-frontend/issues/872)) ([8c9bfbc](https://github.com/openfoodfacts/open-prices-frontend/commit/8c9bfbc67657ee62f8debe534ba92b60fe4a4cfd))
* **Stats:** change StatCard density to compact. ref [#871](https://github.com/openfoodfacts/open-prices-frontend/issues/871) ([0df1724](https://github.com/openfoodfacts/open-prices-frontend/commit/0df1724756f6f848d8541973998922c86934dd46))
* **Stats:** new StatCard component. Use in stats page ([#871](https://github.com/openfoodfacts/open-prices-frontend/issues/871)) ([55ffabe](https://github.com/openfoodfacts/open-prices-frontend/commit/55ffabe1bcf961112c58376a9a270357592f62d4))

## [1.82.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.81.0...v1.82.0) (2024-09-28)


### Features

* **locations:** new order menu by counts ([#857](https://github.com/openfoodfacts/open-prices-frontend/issues/857)) ([1e310ce](https://github.com/openfoodfacts/open-prices-frontend/commit/1e310ce45502022d3ed37cdf90906aa3ce995cb3))
* **locations:** show user, product & proof counts ([#853](https://github.com/openfoodfacts/open-prices-frontend/issues/853)) ([65d3fe9](https://github.com/openfoodfacts/open-prices-frontend/commit/65d3fe903f63ee3375cdf1890ba4587fd4b4448e))
* **users:** new order menu by counts ([#856](https://github.com/openfoodfacts/open-prices-frontend/issues/856)) ([5d2bde1](https://github.com/openfoodfacts/open-prices-frontend/commit/5d2bde14632ccb6b0620e729a3342c7d817b6f6e))


### Bug Fixes

* **Brand detail:** properly refresh the list when choosing another brand ([#858](https://github.com/openfoodfacts/open-prices-frontend/issues/858)) ([cb00fb8](https://github.com/openfoodfacts/open-prices-frontend/commit/cb00fb81f559b4f97db772be58f730a4d7995878))
* **Category detail:** properly refresh the list when choosing another category ([#844](https://github.com/openfoodfacts/open-prices-frontend/issues/844)) ([105d828](https://github.com/openfoodfacts/open-prices-frontend/commit/105d828f2d8dedb0b6fe036e5df4db55d66a4587))


### Technical

* homogeize detail page init with route params. fixes. ref [#844](https://github.com/openfoodfacts/open-prices-frontend/issues/844), [#858](https://github.com/openfoodfacts/open-prices-frontend/issues/858), [#856](https://github.com/openfoodfacts/open-prices-frontend/issues/856) ([a65ae6b](https://github.com/openfoodfacts/open-prices-frontend/commit/a65ae6b3690e47a61dae09409a87b554c1017594))
* **l10n:** New Crowdin translations to review and merge ([#855](https://github.com/openfoodfacts/open-prices-frontend/issues/855)) ([0ca0b9b](https://github.com/openfoodfacts/open-prices-frontend/commit/0ca0b9b797027d4d8dae3fd9a7898671689e991f))
* **l10n:** New Crowdin translations to review and merge ([#859](https://github.com/openfoodfacts/open-prices-frontend/issues/859)) ([09dcffc](https://github.com/openfoodfacts/open-prices-frontend/commit/09dcffcc723371724a3022a1bbf61d5f5773b220))
* **l10n:** New Crowdin translations to review and merge ([#861](https://github.com/openfoodfacts/open-prices-frontend/issues/861)) ([031d5d8](https://github.com/openfoodfacts/open-prices-frontend/commit/031d5d8257d7224d8b8ea09350a5424d17a94113))
* **l10n:** New Crowdin translations to review and merge ([#863](https://github.com/openfoodfacts/open-prices-frontend/issues/863)) ([e687fa8](https://github.com/openfoodfacts/open-prices-frontend/commit/e687fa83db2e703360439da81696790cce9acdcc))
* **stats:** Use new /stats endpoint. Show last updated date ([#862](https://github.com/openfoodfacts/open-prices-frontend/issues/862)) ([255d9f4](https://github.com/openfoodfacts/open-prices-frontend/commit/255d9f4a8713e2aa7770e62b1b4cbbdd3bc922f0))

## [1.81.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.80.0...v1.81.0) (2024-09-27)


### Features

* **dashboard:** replace load more with infinite scroll ([#851](https://github.com/openfoodfacts/open-prices-frontend/issues/851)) ([f481219](https://github.com/openfoodfacts/open-prices-frontend/commit/f4812199e84fd3097eff09a4bd33fadba8290edc))
* **detail pages:** replace load more with infinite scroll ([#850](https://github.com/openfoodfacts/open-prices-frontend/issues/850)) ([9e91cf3](https://github.com/openfoodfacts/open-prices-frontend/commit/9e91cf39ce097c834472ca40cf0405aadcd23a8e))
* **label card:** new label card with action menu ([#849](https://github.com/openfoodfacts/open-prices-frontend/issues/849)) ([e7b53f6](https://github.com/openfoodfacts/open-prices-frontend/commit/e7b53f68e46e127cef70735b1634c94f6f3631b7))
* **label detail:** new label detail page ([#848](https://github.com/openfoodfacts/open-prices-frontend/issues/848)) ([3dbbc25](https://github.com/openfoodfacts/open-prices-frontend/commit/3dbbc25260f9ae50f8c712e164b0a39bb3a066bf))


### Bug Fixes

* fix infinite scroll when reaching the end ([#852](https://github.com/openfoodfacts/open-prices-frontend/issues/852)) ([0574533](https://github.com/openfoodfacts/open-prices-frontend/commit/0574533f7bfff1d225731211d8f6a28506c874e5))


### Technical

* **api:** bump API's default page_size to 25 (instead of 20). ref [#828](https://github.com/openfoodfacts/open-prices-frontend/issues/828) ([1d5fac1](https://github.com/openfoodfacts/open-prices-frontend/commit/1d5fac1281bb181759101a5c4dee7ed3a879d406))
* **l10n:** New Crowdin translations to review and merge ([#837](https://github.com/openfoodfacts/open-prices-frontend/issues/837)) ([f4a294d](https://github.com/openfoodfacts/open-prices-frontend/commit/f4a294d9dbb145ffcd1c9c6e8833ea38ff045b95))

## [1.80.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.79.1...v1.80.0) (2024-09-22)


### Features

* **prices:** move owner & created info to a new History section ([#806](https://github.com/openfoodfacts/open-prices-frontend/issues/806)) ([d3ba635](https://github.com/openfoodfacts/open-prices-frontend/commit/d3ba6350f20da56fab66fbe9b471b3f914a5d404))


### Bug Fixes

* fix component error ([cb00067](https://github.com/openfoodfacts/open-prices-frontend/commit/cb0006743c48cef98d9c29889fc8ee1e57d54cfe))
* **locations:** Photon: show housenumber in location results. ref [#517](https://github.com/openfoodfacts/open-prices-frontend/issues/517) ([31a957b](https://github.com/openfoodfacts/open-prices-frontend/commit/31a957b85bee9e99d8418e385f149dfa75f81bf6))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#830](https://github.com/openfoodfacts/open-prices-frontend/issues/830)) ([6411966](https://github.com/openfoodfacts/open-prices-frontend/commit/64119669adac3b98a2230b2025b6b06c09dbe863))

## [1.79.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.79.0...v1.79.1) (2024-09-21)


### Bug Fixes

* **location search:** fix Photon filtered search typo. ref [#808](https://github.com/openfoodfacts/open-prices-frontend/issues/808) ([3992290](https://github.com/openfoodfacts/open-prices-frontend/commit/3992290bfa53cfa16aa200282a350dc9488fe89b))

## [1.79.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.78.2...v1.79.0) (2024-09-20)


### Features

* **list pages:** replace load more with infinite scroll ([#833](https://github.com/openfoodfacts/open-prices-frontend/issues/833)) ([8f7a8e9](https://github.com/openfoodfacts/open-prices-frontend/commit/8f7a8e978b0466c6f7a4c0a0ad2b274188ed7262))
* **prices:** replace Load More with infinite scroll ([#832](https://github.com/openfoodfacts/open-prices-frontend/issues/832)) ([390a5b1](https://github.com/openfoodfacts/open-prices-frontend/commit/390a5b1e64fbfe775d29535f8ec62481e67e96f6))


### Technical

* **api:** bump back down API's default page_size to 20. ref [#828](https://github.com/openfoodfacts/open-prices-frontend/issues/828) ([f4fdf8b](https://github.com/openfoodfacts/open-prices-frontend/commit/f4fdf8b3001c9e7b6c967de7fcbabd0c0f7a50da))
* **location search:** Photon: restrict via API URL on shop & amenity ([#808](https://github.com/openfoodfacts/open-prices-frontend/issues/808)) ([dfe1a98](https://github.com/openfoodfacts/open-prices-frontend/commit/dfe1a9885d9b4927fdfdadc5537f3953279340ff))
* **prices:** hide progress-circular next to title. ref [#832](https://github.com/openfoodfacts/open-prices-frontend/issues/832) ([0ccfa4b](https://github.com/openfoodfacts/open-prices-frontend/commit/0ccfa4b4db55374cf5c59c9773b5604f8706097f))

## [1.78.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.78.1...v1.78.2) (2024-09-18)


### Technical

* **api:** bump default page_size to 100 ([#828](https://github.com/openfoodfacts/open-prices-frontend/issues/828)) ([b7632a8](https://github.com/openfoodfacts/open-prices-frontend/commit/b7632a854a92502ba0efb51f189cba14fe101c01))
* **graph:** add points, tooltip, autosize. ref [#818](https://github.com/openfoodfacts/open-prices-frontend/issues/818) ([667cf6d](https://github.com/openfoodfacts/open-prices-frontend/commit/667cf6d6b0b47861b3d41c1d8905902f2730ddd5))
* **l10n:** New Crowdin translations to review and merge ([#825](https://github.com/openfoodfacts/open-prices-frontend/issues/825)) ([3203875](https://github.com/openfoodfacts/open-prices-frontend/commit/3203875c6c33471347763d0c0c2c323233448482))

## [1.78.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.78.0...v1.78.1) (2024-09-17)


### Bug Fixes

* **prices:** fix barcode display again in ProductCard. closes [#823](https://github.com/openfoodfacts/open-prices-frontend/issues/823) ([26b214d](https://github.com/openfoodfacts/open-prices-frontend/commit/26b214d3c6c529ca7608e5a12d0ecd47a830443a))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#817](https://github.com/openfoodfacts/open-prices-frontend/issues/817)) ([3d1786c](https://github.com/openfoodfacts/open-prices-frontend/commit/3d1786c6e03a8db3b74372d6a8d0a250742485a7))

## [1.78.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.77.0...v1.78.0) (2024-09-16)


### Features

* **products:** basic price graph ([#818](https://github.com/openfoodfacts/open-prices-frontend/issues/818)) ([add9ca2](https://github.com/openfoodfacts/open-prices-frontend/commit/add9ca2fceaba345aac742d545e4de03559bc243))

## [1.77.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.76.0...v1.77.0) (2024-09-15)


### Features

* **locations:** add filter by price_count ([#814](https://github.com/openfoodfacts/open-prices-frontend/issues/814)) ([e4aff8a](https://github.com/openfoodfacts/open-prices-frontend/commit/e4aff8a104e559e3529f0fb9ac9012ce4d792e5d))
* **users:** add filter by price_count ([#815](https://github.com/openfoodfacts/open-prices-frontend/issues/815)) ([c94046a](https://github.com/openfoodfacts/open-prices-frontend/commit/c94046a4feb08b319a6a56d68bc48db6d423e5df))


### Bug Fixes

* **locations:** fix OSM id chip margin ([9eb9d71](https://github.com/openfoodfacts/open-prices-frontend/commit/9eb9d712eda47f0a5a33bbbeba568803e9c6be3c))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#812](https://github.com/openfoodfacts/open-prices-frontend/issues/812)) ([862bc84](https://github.com/openfoodfacts/open-prices-frontend/commit/862bc843615ef19f343ec63d75f3951f3d1bf1e8))
* **l10n:** New Crowdin translations to review and merge ([#816](https://github.com/openfoodfacts/open-prices-frontend/issues/816)) ([e126927](https://github.com/openfoodfacts/open-prices-frontend/commit/e1269272b0ae94ba6c860c1f7236a74cd64c448a))

## [1.76.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.75.2...v1.76.0) (2024-09-12)


### Features

* **users:** show location, product & proof counts ([#809](https://github.com/openfoodfacts/open-prices-frontend/issues/809)) ([62cb542](https://github.com/openfoodfacts/open-prices-frontend/commit/62cb542b6548bddfc267446a6faaad2735658224))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#807](https://github.com/openfoodfacts/open-prices-frontend/issues/807)) ([dbb6ea9](https://github.com/openfoodfacts/open-prices-frontend/commit/dbb6ea9e42878e16dc3d26f411ae2995f211fa38))
* **l10n:** New Crowdin translations to review and merge ([#811](https://github.com/openfoodfacts/open-prices-frontend/issues/811)) ([2fd84fd](https://github.com/openfoodfacts/open-prices-frontend/commit/2fd84fd4a4228b5b3442d9e27ed21eecfe36b969))

## [1.75.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.75.1...v1.75.2) (2024-09-08)


### Bug Fixes

* **products:** only show barcode on price add ([ad1bc2e](https://github.com/openfoodfacts/open-prices-frontend/commit/ad1bc2ebc601582d7167643dd87ddce904c59bce))
* show PriceCard only if price (to avoid errors on price.product) ([6d83ad1](https://github.com/openfoodfacts/open-prices-frontend/commit/6d83ad101e8855e774236eb2ccacc4ff676a0521))

## [1.75.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.75.0...v1.75.1) (2024-09-07)


### Bug Fixes

* show ProductCard, PriceCard & ProofCard only if object. Avoids errors ([42d4cb5](https://github.com/openfoodfacts/open-prices-frontend/commit/42d4cb58274fb951493d63af46a04941ae2e1f8a))


### Technical

* *ActionMenu: Add menu title ([0b75dcd](https://github.com/openfoodfacts/open-prices-frontend/commit/0b75dcd4b0ed185827244de2a125834a37e251be))
* *ActionMenus: remove dividers ([990c24a](https://github.com/openfoodfacts/open-prices-frontend/commit/990c24a3bcb4862c21e8a427e2a4e26799cd500d))
* **l10n:** New Crowdin translations to review and merge ([#785](https://github.com/openfoodfacts/open-prices-frontend/issues/785)) ([9fd1093](https://github.com/openfoodfacts/open-prices-frontend/commit/9fd1093ab62c32f4d247461c4975c9490a916540))
* **l10n:** New Crowdin translations to review and merge ([#803](https://github.com/openfoodfacts/open-prices-frontend/issues/803)) ([1e2c1f0](https://github.com/openfoodfacts/open-prices-frontend/commit/1e2c1f052740b1c05597235db6a4cc40fb229107))
* **price add:** always show barcode of already added products ([24d4296](https://github.com/openfoodfacts/open-prices-frontend/commit/24d429616d944d79fdc4d036ea6fdea854d150c5))
* **products:** ProductActionMenu: add action to details page ([760ecf9](https://github.com/openfoodfacts/open-prices-frontend/commit/760ecf9b3b945f2956b842776f8bc035a4a038a0))
* **products:** ProductActionMenu: Add menu title ([6ac53b2](https://github.com/openfoodfacts/open-prices-frontend/commit/6ac53b207f8f756eb71d5c62bdf318bc6cef0bd8))
* **proofs:** add a Proof Action to the details page ([#801](https://github.com/openfoodfacts/open-prices-frontend/issues/801)) ([d4b8e0a](https://github.com/openfoodfacts/open-prices-frontend/commit/d4b8e0a0b667db38050caffa9a25966a1fbf575a))
* **proofs:** ProofActionMenu: Add menu title ([14f2a63](https://github.com/openfoodfacts/open-prices-frontend/commit/14f2a6317222bd2f86e9e2b8b3d477cb1ba9a45e))

## [1.75.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.74.4...v1.75.0) (2024-09-06)


### Features

* **prices:** new Price detail page ([#797](https://github.com/openfoodfacts/open-prices-frontend/issues/797)) ([5b9de39](https://github.com/openfoodfacts/open-prices-frontend/commit/5b9de390a7a3a7de7a391f07cdeef6b3eec48bd8))


### Technical

* fix deployment ([#800](https://github.com/openfoodfacts/open-prices-frontend/issues/800)) ([946f1d9](https://github.com/openfoodfacts/open-prices-frontend/commit/946f1d9a4aab304537fe5654ac106de4717c6e76))
* homogenise getShareLinkUrl. Add missing data-name ([5a51628](https://github.com/openfoodfacts/open-prices-frontend/commit/5a516284261c5acd1e1b352730cb2148c061c414))

## [1.74.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.74.3...v1.74.4) (2024-08-23)


### Bug Fixes

* Update labeler.yml ([bcee5f4](https://github.com/openfoodfacts/open-prices-frontend/commit/bcee5f47e7fb4845554ae15814bb832f38418f3f))


### Technical

* **deps:** Update packages (vuetify v3.7.0) ([#782](https://github.com/openfoodfacts/open-prices-frontend/issues/782)) ([6f998ba](https://github.com/openfoodfacts/open-prices-frontend/commit/6f998baa1c1a709b3ab6374aeb68d67d69424168))
* update categories ([#783](https://github.com/openfoodfacts/open-prices-frontend/issues/783)) ([1ccb55c](https://github.com/openfoodfacts/open-prices-frontend/commit/1ccb55cd01f558ed13009b19a768b71ef0c8f316))

## [1.74.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.74.2...v1.74.3) (2024-08-22)


### Bug Fixes

* **Map:** fix window sliding on swipe. ref [#695](https://github.com/openfoodfacts/open-prices-frontend/issues/695) [#774](https://github.com/openfoodfacts/open-prices-frontend/issues/774) [#773](https://github.com/openfoodfacts/open-prices-frontend/issues/773) ([24c12fa](https://github.com/openfoodfacts/open-prices-frontend/commit/24c12fae4ec0818adde4b90a5eb353258d0cf8e1))

## [1.74.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.74.1...v1.74.2) (2024-08-22)


### Bug Fixes

* **City detail:** fix load more button action. ref [#771](https://github.com/openfoodfacts/open-prices-frontend/issues/771) ([f80e418](https://github.com/openfoodfacts/open-prices-frontend/commit/f80e4189b5559d135462175592f1f7d365e4512f))


### Technical

* **deps:** Update packages ([#779](https://github.com/openfoodfacts/open-prices-frontend/issues/779)) ([b13ee4e](https://github.com/openfoodfacts/open-prices-frontend/commit/b13ee4edd42379aefb2cbc2b0c1d5ed06a59e51d))

## [1.74.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.74.0...v1.74.1) (2024-08-22)


### Technical

* **City detail:** add map display option ([#773](https://github.com/openfoodfacts/open-prices-frontend/issues/773)) ([c1113db](https://github.com/openfoodfacts/open-prices-frontend/commit/c1113db965b430d5eb54028b797ff81c3085e2c6))
* **Country detail:** add map display option ([#774](https://github.com/openfoodfacts/open-prices-frontend/issues/774)) ([5797a00](https://github.com/openfoodfacts/open-prices-frontend/commit/5797a00f7ed8a2655e9514247d81fcf6dadaf142))
* **deps:** revert bump GoogleCloudPlatform/release-please-action from 3.7.13 to 4.1.3 ([#776](https://github.com/openfoodfacts/open-prices-frontend/issues/776)) ([cc411ad](https://github.com/openfoodfacts/open-prices-frontend/commit/cc411ad92d068709cb1596fb85212b63c7c8fff1))
* **l10n:** New Crowdin translations to review and merge ([#775](https://github.com/openfoodfacts/open-prices-frontend/issues/775)) ([844e7e9](https://github.com/openfoodfacts/open-prices-frontend/commit/844e7e94fea39f1067b805f744ffbd63c11cf9e7))

## [1.74.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.73.1...v1.74.0) (2024-08-22)


### Features

* **City detail:** new basic City detail page ([#771](https://github.com/openfoodfacts/open-prices-frontend/issues/771)) ([4dbf004](https://github.com/openfoodfacts/open-prices-frontend/commit/4dbf004477f798a457866504bc9034fe98e7f859))
* **Country detail:** new basic Country detail page ([#766](https://github.com/openfoodfacts/open-prices-frontend/issues/766)) ([4d8c1cd](https://github.com/openfoodfacts/open-prices-frontend/commit/4d8c1cd3a7f654259eba3b27940989b51b386a35))
* **Location card:** display Country & City if available ([#772](https://github.com/openfoodfacts/open-prices-frontend/issues/772)) ([ec269fe](https://github.com/openfoodfacts/open-prices-frontend/commit/ec269fee2c8277d7787f2a98a5df622df729b641))

## [1.73.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.73.0...v1.73.1) (2024-08-21)


### Bug Fixes

* **deps:** revert Update packages ([#767](https://github.com/openfoodfacts/open-prices-frontend/issues/767)) ([46117a6](https://github.com/openfoodfacts/open-prices-frontend/commit/46117a65ae049a9407e53a78e5f012547fa2f060))

## [1.73.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.72.0...v1.73.0) (2024-08-21)


### Features

* new LoadedCountChip component ([#728](https://github.com/openfoodfacts/open-prices-frontend/issues/728)) ([3186882](https://github.com/openfoodfacts/open-prices-frontend/commit/3186882b60ea750ae32f3bcf760bd108da9c7332))
* **Price add:** display hint with price per unit ([#729](https://github.com/openfoodfacts/open-prices-frontend/issues/729)) ([9212104](https://github.com/openfoodfacts/open-prices-frontend/commit/9212104e507e626200c417bd73a2902f7184bb39))
* **Price add:** if an existing product is found, show a warning ([#733](https://github.com/openfoodfacts/open-prices-frontend/issues/733)) ([514831f](https://github.com/openfoodfacts/open-prices-frontend/commit/514831f2e770670f98c649a0df87daf0757ed101))


### Bug Fixes

* **Price add:** hide Product card actions. ref [#698](https://github.com/openfoodfacts/open-prices-frontend/issues/698) ([58f359f](https://github.com/openfoodfacts/open-prices-frontend/commit/58f359f5514d10ee1db5d7c0f6b3308fee0f3735))

## [1.72.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.71.0...v1.72.0) (2024-08-18)


### Features

* **Dashboard:** New filtering menu to hide proofs with prices ([#723](https://github.com/openfoodfacts/open-prices-frontend/issues/723)) ([53310db](https://github.com/openfoodfacts/open-prices-frontend/commit/53310db4692f64c64c624de9147695ebadc13728))
* **Dashboard:** New ordering menu to choose between price_count, date & created ([#721](https://github.com/openfoodfacts/open-prices-frontend/issues/721)) ([91f511a](https://github.com/openfoodfacts/open-prices-frontend/commit/91f511ab92a2fbed99de852d4477ff6d93569d90))
* **Price card:** new action to view product OFF page ([#724](https://github.com/openfoodfacts/open-prices-frontend/issues/724)) ([2f8528b](https://github.com/openfoodfacts/open-prices-frontend/commit/2f8528bdabf1f95e3ba0112b3c7463d420cf877e))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#717](https://github.com/openfoodfacts/open-prices-frontend/issues/717)) ([4113b1c](https://github.com/openfoodfacts/open-prices-frontend/commit/4113b1c5f5e183a5fcf878dd9d7a02a9b237a58a))

## [1.71.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.70.3...v1.71.0) (2024-08-18)


### Features

* **Price add:** When selecting an existing proof, fetch its existing prices ([#718](https://github.com/openfoodfacts/open-prices-frontend/issues/718)) ([571b8db](https://github.com/openfoodfacts/open-prices-frontend/commit/571b8dbf05870970f66d9f4601c48117b8bb293b))


### Technical

* **Product detail:** display loaded & total price count ([b682160](https://github.com/openfoodfacts/open-prices-frontend/commit/b682160ed259318538197158807e6708b5c26837))

## [1.70.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.70.2...v1.70.3) (2024-08-17)


### Bug Fixes

* **Product detail:** improve spacing, error messages when product not found ([5c3b8de](https://github.com/openfoodfacts/open-prices-frontend/commit/5c3b8de9c5e5cd0486b90d3b3dc80a85edf94105))


### Technical

* add disabled prop to Link components ([aaef501](https://github.com/openfoodfacts/open-prices-frontend/commit/aaef5012edbb03d5e726665aae6e235007ee218e))
* **Brand Card:** new action menu with OFF & Share links ([#713](https://github.com/openfoodfacts/open-prices-frontend/issues/713)) ([ddef561](https://github.com/openfoodfacts/open-prices-frontend/commit/ddef56193d1defe6cee1d64902d92dc660ae7397))
* **Brand detail:** new BrandCard component ([#712](https://github.com/openfoodfacts/open-prices-frontend/issues/712)) ([dc4e0c8](https://github.com/openfoodfacts/open-prices-frontend/commit/dc4e0c82e00be4e38991ee8fb1414f8c608516aa))
* **Category Card:** new action menu with OFF & Share links ([#711](https://github.com/openfoodfacts/open-prices-frontend/issues/711)) ([3beedda](https://github.com/openfoodfacts/open-prices-frontend/commit/3beedda766a4a100b1f2eedac6f1967a430fe1b8))
* **Date Card:** new action menu with Share link ([#715](https://github.com/openfoodfacts/open-prices-frontend/issues/715)) ([cab3da2](https://github.com/openfoodfacts/open-prices-frontend/commit/cab3da2ff6b88b11e58a60f07544f52ba391fd45))
* **Date detail:** new DateCard component ([#714](https://github.com/openfoodfacts/open-prices-frontend/issues/714)) ([48c83f6](https://github.com/openfoodfacts/open-prices-frontend/commit/48c83f6aeb3586dc06ec9e63228865c54bc51669))
* new ProductCountChip component ([#716](https://github.com/openfoodfacts/open-prices-frontend/issues/716)) ([fabdf44](https://github.com/openfoodfacts/open-prices-frontend/commit/fabdf443e6def6480f4c586184a3c70216ab4661))
* **ShareLink:** remove v-sheet to avoid linebreak ([3cfb7b6](https://github.com/openfoodfacts/open-prices-frontend/commit/3cfb7b6d30397f8e83781f0c56f1d8572c8017d0))

## [1.70.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.70.1...v1.70.2) (2024-08-16)


### Bug Fixes

* **PriceAdd:** fix href bug. ref [#700](https://github.com/openfoodfacts/open-prices-frontend/issues/700) ([36e84fd](https://github.com/openfoodfacts/open-prices-frontend/commit/36e84fdb752ff470b25f6e2c22dbeaa15711df40))


### Technical

* reduce Filter, Order & Display menu buttons on small screens ([bc0d87b](https://github.com/openfoodfacts/open-prices-frontend/commit/bc0d87b71b56c01725d4d112f0afb8b2aa1d5e25))

## [1.70.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.70.0...v1.70.1) (2024-08-16)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#699](https://github.com/openfoodfacts/open-prices-frontend/issues/699)) ([2109488](https://github.com/openfoodfacts/open-prices-frontend/commit/2109488ce3102ebbb707dd0561ba3297bd523a66))
* **Location card:** move Share action to menu ([#705](https://github.com/openfoodfacts/open-prices-frontend/issues/705)) ([ea0e2b8](https://github.com/openfoodfacts/open-prices-frontend/commit/ea0e2b88aa211ef2981f278e1eb3b4e65696fd55))
* **Product card:** move PriceAdd action to menu ([#700](https://github.com/openfoodfacts/open-prices-frontend/issues/700)) ([5dec6b7](https://github.com/openfoodfacts/open-prices-frontend/commit/5dec6b71e2e5dde9ff869db20a793cf1c6babe0e))
* **Product card:** move Share action to menu ([#704](https://github.com/openfoodfacts/open-prices-frontend/issues/704)) ([2823199](https://github.com/openfoodfacts/open-prices-frontend/commit/28231997b6821106dee41f236e10033184138e42))
* **Proof card:** move PriceAdd action to menu ([#702](https://github.com/openfoodfacts/open-prices-frontend/issues/702)) ([04896b3](https://github.com/openfoodfacts/open-prices-frontend/commit/04896b3ed50563ad71822f72a4308628faf03514))
* **Share button:** rename ShareButton to ShareLink ([#703](https://github.com/openfoodfacts/open-prices-frontend/issues/703)) ([44d402c](https://github.com/openfoodfacts/open-prices-frontend/commit/44d402c6f2a9273148778c0bb9f7f0adaec63531))
* **User card:** move Share action to menu ([#706](https://github.com/openfoodfacts/open-prices-frontend/issues/706)) ([7e8df3c](https://github.com/openfoodfacts/open-prices-frontend/commit/7e8df3c5df9aa52d3796a0544d84586f11dbe716))

## [1.70.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.69.1...v1.70.0) (2024-08-14)


### Features

* **Product detail:** new display toggle between list & map ([#695](https://github.com/openfoodfacts/open-prices-frontend/issues/695)) ([1c22c58](https://github.com/openfoodfacts/open-prices-frontend/commit/1c22c5864a2bcc3a3eb07df0e4cb53642d8a6aa7))


### Bug Fixes

* **Product detail:** avoid window bottom crop in tabs, reduce x padding. ref [#695](https://github.com/openfoodfacts/open-prices-frontend/issues/695) ([8202a72](https://github.com/openfoodfacts/open-prices-frontend/commit/8202a72a872bc25444940203b6d8fbcd5e109b11))
* **Product detail:** if product missing or without name, show barcode instead of Unknown Product. ref [#418](https://github.com/openfoodfacts/open-prices-frontend/issues/418) ([d84ad85](https://github.com/openfoodfacts/open-prices-frontend/commit/d84ad85223c65351dda70baaf5fbc34318961ea7))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#690](https://github.com/openfoodfacts/open-prices-frontend/issues/690)) ([9592475](https://github.com/openfoodfacts/open-prices-frontend/commit/9592475058a986c941faaf19a22a2015e5b0a9c7))
* **Location card:** new action menu with OSM link ([#697](https://github.com/openfoodfacts/open-prices-frontend/issues/697)) ([6d7735d](https://github.com/openfoodfacts/open-prices-frontend/commit/6d7735d552eb34502f1032b84dc01cf0c6d96ecf))
* **Location search:** new LeafletMap component ([#694](https://github.com/openfoodfacts/open-prices-frontend/issues/694)) ([3100634](https://github.com/openfoodfacts/open-prices-frontend/commit/3100634e5488bd4c534c18d12712ec0c4c4b7c71))
* **Price card:** change style of RelativeDateTimeChip ([#692](https://github.com/openfoodfacts/open-prices-frontend/issues/692)) ([56939b6](https://github.com/openfoodfacts/open-prices-frontend/commit/56939b6e166bab3727f169ce2b6fca9b09648c5a))
* **Product card:** new action menu with OFF link ([#698](https://github.com/openfoodfacts/open-prices-frontend/issues/698)) ([f8ce7f3](https://github.com/openfoodfacts/open-prices-frontend/commit/f8ce7f3a6e7b2e9a7a812017c8b8a35e103ff4b4))
* **User card:** new action menu with OFF link ([#696](https://github.com/openfoodfacts/open-prices-frontend/issues/696)) ([9d1208f](https://github.com/openfoodfacts/open-prices-frontend/commit/9d1208f8c1b96187201cc72ddf3d1e2581409106))

## [1.69.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.69.0...v1.69.1) (2024-07-18)


### Technical

* **Price card:** move price date to footer ([#687](https://github.com/openfoodfacts/open-prices-frontend/issues/687)) ([c5ba3b0](https://github.com/openfoodfacts/open-prices-frontend/commit/c5ba3b002b8166915e78d4f59a7234cc2141fe49))

## [1.69.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.68.0...v1.69.0) (2024-07-16)


### Features

* **price add:** show price add button in header (for logged in users) ([#686](https://github.com/openfoodfacts/open-prices-frontend/issues/686)) ([2c4e447](https://github.com/openfoodfacts/open-prices-frontend/commit/2c4e4479fc977034a5049e9db181b8104b5c29b4))


### Bug Fixes

* small fixes ([c8949b5](https://github.com/openfoodfacts/open-prices-frontend/commit/c8949b583753f262d2366e303a63f57911aa4f76))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#683](https://github.com/openfoodfacts/open-prices-frontend/issues/683)) ([dbfbc61](https://github.com/openfoodfacts/open-prices-frontend/commit/dbfbc61b11aad47aa318d47c95b12dfb122cc62d))
* **price add:** redirect to latest prices on success ([6847e56](https://github.com/openfoodfacts/open-prices-frontend/commit/6847e56cace1469c152b8585cad50658c9872c35))

## [1.68.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.67.5...v1.68.0) (2024-07-08)


### Features

* **Date detail:** add chips to navigate to year & month ([#682](https://github.com/openfoodfacts/open-prices-frontend/issues/682)) ([d7465c5](https://github.com/openfoodfacts/open-prices-frontend/commit/d7465c58ce9230134d7f787d4a0adf23d1bd0878))
* **Date detail:** new page with prices for a given date ([#675](https://github.com/openfoodfacts/open-prices-frontend/issues/675)) ([dc275e7](https://github.com/openfoodfacts/open-prices-frontend/commit/dc275e7d68f4ccf3dc9cc2c3593e6ee4c51770c1))
* **proof card:** show user (owner) chip ([ebb1ac7](https://github.com/openfoodfacts/open-prices-frontend/commit/ebb1ac73f9af0367d5938ab5a1169e39292644cc))
* **proof edit:** allow editing a proof type ([#681](https://github.com/openfoodfacts/open-prices-frontend/issues/681)) ([d057eb3](https://github.com/openfoodfacts/open-prices-frontend/commit/d057eb324c1be75200d42a7bae9be37f7af5e17b))


### Technical

* **Date detail:** improve price page for a given month & year ([#680](https://github.com/openfoodfacts/open-prices-frontend/issues/680)) ([67fe303](https://github.com/openfoodfacts/open-prices-frontend/commit/67fe30352f75941f6ce171e38395cebbac09add4))
* **l10n:** New Crowdin translations to review and merge ([#677](https://github.com/openfoodfacts/open-prices-frontend/issues/677)) ([018f78b](https://github.com/openfoodfacts/open-prices-frontend/commit/018f78b07c408b4d2d62a02e31eda20749976d0e))
* rename ProofFooter to ProofFooterRow ([fdfd2f0](https://github.com/openfoodfacts/open-prices-frontend/commit/fdfd2f0f024d98e8d608414bad888a2dfd42bc72))

## [1.67.5](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.67.4...v1.67.5) (2024-07-03)


### Bug Fixes

* **price add:** set price location when selecting existing proof with location. ref [#648](https://github.com/openfoodfacts/open-prices-frontend/issues/648) ([ea96ad3](https://github.com/openfoodfacts/open-prices-frontend/commit/ea96ad3cc8820f44ca08edc1789cb531eb3e0265))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#670](https://github.com/openfoodfacts/open-prices-frontend/issues/670)) ([69ed7ba](https://github.com/openfoodfacts/open-prices-frontend/commit/69ed7ba0af0cabaf8e7cc3e122dd1cc2a136bdb3))
* **price add:** reorganise a bit the price add workflow ([#673](https://github.com/openfoodfacts/open-prices-frontend/issues/673)) ([7d0a8d2](https://github.com/openfoodfacts/open-prices-frontend/commit/7d0a8d24d89fabfea47e358b538b7084c76342ff))

## [1.67.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.67.3...v1.67.4) (2024-06-27)


### Bug Fixes

* remove console logs ([075ffae](https://github.com/openfoodfacts/open-prices-frontend/commit/075ffaee889637f3affad05edb44caa5017e8a75))


### Technical

* **API:** on create/update, only send needed fields (price, proof) ([#668](https://github.com/openfoodfacts/open-prices-frontend/issues/668)) ([d189704](https://github.com/openfoodfacts/open-prices-frontend/commit/d189704fb1b182f489bc6cf28d2c785892b90e76))
* **l10n:** New Crowdin translations to review and merge ([#667](https://github.com/openfoodfacts/open-prices-frontend/issues/667)) ([4c04207](https://github.com/openfoodfacts/open-prices-frontend/commit/4c04207eb33849016222d9bcef837e1cedcde76b))

## [1.67.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.67.2...v1.67.3) (2024-06-25)


### Bug Fixes

* **proof card:** fill in location data from price if missing from proof ([#666](https://github.com/openfoodfacts/open-prices-frontend/issues/666)) ([6748ce0](https://github.com/openfoodfacts/open-prices-frontend/commit/6748ce0c148032bc16f45fd94d1baf9b69070c0e))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#663](https://github.com/openfoodfacts/open-prices-frontend/issues/663)) ([05df9f3](https://github.com/openfoodfacts/open-prices-frontend/commit/05df9f3e258e8a070df22afdf04aac94aba507fd))
* **price card:** rename components for clarification ([#664](https://github.com/openfoodfacts/open-prices-frontend/issues/664)) ([f81dfb3](https://github.com/openfoodfacts/open-prices-frontend/commit/f81dfb32743fe54ccc342ebee7f528375f115ee4))

## [1.67.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.67.1...v1.67.2) (2024-06-24)


### Bug Fixes

* **proof card:** fix display of proof location after upload. ref [#657](https://github.com/openfoodfacts/open-prices-frontend/issues/657) ([e5510ef](https://github.com/openfoodfacts/open-prices-frontend/commit/e5510ef407ac176b7ff22681b78ab6d1cbeed853))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#661](https://github.com/openfoodfacts/open-prices-frontend/issues/661)) ([c163059](https://github.com/openfoodfacts/open-prices-frontend/commit/c16305992d489c5c1fe343107e875430aa14c1c7))

## [1.67.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.67.0...v1.67.1) (2024-06-24)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#658](https://github.com/openfoodfacts/open-prices-frontend/issues/658)) ([69b4e68](https://github.com/openfoodfacts/open-prices-frontend/commit/69b4e689a35a0a26532210bce089dd707da09a44))
* **l10n:** New Crowdin translations to review and merge ([#660](https://github.com/openfoodfacts/open-prices-frontend/issues/660)) ([9067d75](https://github.com/openfoodfacts/open-prices-frontend/commit/9067d757ced6937b5ab642c7721c3594b776c67d))
* **proof card:** if currency missing, show chip with error & tooltip ([#654](https://github.com/openfoodfacts/open-prices-frontend/issues/654)) ([502e5d9](https://github.com/openfoodfacts/open-prices-frontend/commit/502e5d9579b362f433e66a2a918d4bd90a6106cd))
* **proof card:** if date missing, show chip with error & tooltip ([#656](https://github.com/openfoodfacts/open-prices-frontend/issues/656)) ([932a930](https://github.com/openfoodfacts/open-prices-frontend/commit/932a930cb77b51f278ebee4c224073a0e2069e90))
* **proof card:** if location missing, show chip with error & tooltip ([#657](https://github.com/openfoodfacts/open-prices-frontend/issues/657)) ([7e27d62](https://github.com/openfoodfacts/open-prices-frontend/commit/7e27d6276002621764f759b4199ee2ed543c8fd7))
* **proof edit:** allow editing proof currency. additional cleanup ([#659](https://github.com/openfoodfacts/open-prices-frontend/issues/659)) ([5dc5d67](https://github.com/openfoodfacts/open-prices-frontend/commit/5dc5d67e0471da2ca37a30059635f3e6ccfe9e06))

## [1.67.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.66.0...v1.67.0) (2024-06-24)


### Features

* **price add:** hide single price add workflow ([#635](https://github.com/openfoodfacts/open-prices-frontend/issues/635)) ([677ced7](https://github.com/openfoodfacts/open-prices-frontend/commit/677ced770f343077ccffa618f81bff68bddd5869))
* **price add:** move date & currency to the proof section ([#645](https://github.com/openfoodfacts/open-prices-frontend/issues/645)) ([ee0366d](https://github.com/openfoodfacts/open-prices-frontend/commit/ee0366d97caa8d8cc98713c4adbe68a70ce5b6b7))
* **price add:** move location to the proof section ([#648](https://github.com/openfoodfacts/open-prices-frontend/issues/648)) ([67a3d62](https://github.com/openfoodfacts/open-prices-frontend/commit/67a3d62c47f5b8f645cfd7bc49294a4ff33a4d29))


### Bug Fixes

* **proof edit:** forgot to disable button if user cannot edit. ref [#650](https://github.com/openfoodfacts/open-prices-frontend/issues/650) ([7701ec7](https://github.com/openfoodfacts/open-prices-frontend/commit/7701ec7f2e58753046a57ee76b7c589a08ef3aaa))


### Technical

* add tooltips and helps ([#649](https://github.com/openfoodfacts/open-prices-frontend/issues/649)) ([fc8960c](https://github.com/openfoodfacts/open-prices-frontend/commit/fc8960ce1f0dcd5b0eee11fb65e2fec56e57900e))
* **l10n:** New Crowdin translations to review and merge ([#642](https://github.com/openfoodfacts/open-prices-frontend/issues/642)) ([c035a18](https://github.com/openfoodfacts/open-prices-frontend/commit/c035a184f4e83d86c35cc2803766fbfa6a2030f9))
* **l10n:** New Crowdin translations to review and merge ([#651](https://github.com/openfoodfacts/open-prices-frontend/issues/651)) ([6fbcd18](https://github.com/openfoodfacts/open-prices-frontend/commit/6fbcd182060824283d8b5714cff845f0bff7ce05))
* **price add:** new LocationInputRow component ([#647](https://github.com/openfoodfacts/open-prices-frontend/issues/647)) ([8dfe038](https://github.com/openfoodfacts/open-prices-frontend/commit/8dfe038cfd8cee29bc779b249220637d479437cc))
* **price add:** when coming from the proof detail page, direct users to multiple add form ([#637](https://github.com/openfoodfacts/open-prices-frontend/issues/637)) ([8a9c674](https://github.com/openfoodfacts/open-prices-frontend/commit/8a9c674c366e515d29fb81e91dd0e2029083f98d))
* **price edit:** hide/disable price date & currency changes ([#650](https://github.com/openfoodfacts/open-prices-frontend/issues/650)) ([b184fb0](https://github.com/openfoodfacts/open-prices-frontend/commit/b184fb0a3b05abc103ffd6e3f2e37c0200cc9bbd))
* **proof edit:** cleanup is_public. Allow editing date if no prices ([#652](https://github.com/openfoodfacts/open-prices-frontend/issues/652)) ([5358ade](https://github.com/openfoodfacts/open-prices-frontend/commit/5358ade199a6e598144228e93a656b76e81263fd))
* **proof store:** disable proof store because of inconsistencies ([#653](https://github.com/openfoodfacts/open-prices-frontend/issues/653)) ([2e85f57](https://github.com/openfoodfacts/open-prices-frontend/commit/2e85f57e0438f412dfdb49e6efbe1d71c90e17b5))

## [1.66.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.65.1...v1.66.0) (2024-06-21)


### Features

* **proof add:** new page to add a proof ([#639](https://github.com/openfoodfacts/open-prices-frontend/issues/639)) ([f9086a0](https://github.com/openfoodfacts/open-prices-frontend/commit/f9086a0df131220835ef11f119f7e9f95918cf0c))
* **proof card:** display date & currency in the footer ([#640](https://github.com/openfoodfacts/open-prices-frontend/issues/640)) ([25b7b82](https://github.com/openfoodfacts/open-prices-frontend/commit/25b7b82d8865c8e97d2b72325cf395e8293a17d3))


### Bug Fixes

* **API:** Forgot to send app_name on proof POST. ref [#588](https://github.com/openfoodfacts/open-prices-frontend/issues/588) ([b221f64](https://github.com/openfoodfacts/open-prices-frontend/commit/b221f6433f481888a94988ccd2f18c7e24d74545))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#625](https://github.com/openfoodfacts/open-prices-frontend/issues/625)) ([697cb12](https://github.com/openfoodfacts/open-prices-frontend/commit/697cb1246dec91f7defc87f42e414a8302379b37))
* **l10n:** New Crowdin translations to review and merge ([#641](https://github.com/openfoodfacts/open-prices-frontend/issues/641)) ([6d98f4b](https://github.com/openfoodfacts/open-prices-frontend/commit/6d98f4b10c70d5dfac552f3fae4723deaba1069c))
* **price add:** new ProofInputRow component ([#632](https://github.com/openfoodfacts/open-prices-frontend/issues/632)) ([dd6622b](https://github.com/openfoodfacts/open-prices-frontend/commit/dd6622be0c79114612ce6497e73d57a7b1a6bbc4))
* **price add:** prefix routes with /prices ([#638](https://github.com/openfoodfacts/open-prices-frontend/issues/638)) ([8355f56](https://github.com/openfoodfacts/open-prices-frontend/commit/8355f5617c80022928ff479ae8c28b3c31026dc3))
* **proof add:** forgot to commit currency field. ref [#639](https://github.com/openfoodfacts/open-prices-frontend/issues/639) ([cd2be26](https://github.com/openfoodfacts/open-prices-frontend/commit/cd2be2698b7f10aa16928529f1b3342f46551625))
* **proof:** On existing proof selected, init with proof date ([#631](https://github.com/openfoodfacts/open-prices-frontend/issues/631)) ([6898814](https://github.com/openfoodfacts/open-prices-frontend/commit/689881492b1953df1abaae95eb53b98a3635204c))

## [1.65.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.65.0...v1.65.1) (2024-06-10)


### Bug Fixes

* **product:** fix barcode invalid warning message. ref [#622](https://github.com/openfoodfacts/open-prices-frontend/issues/622) ([958e668](https://github.com/openfoodfacts/open-prices-frontend/commit/958e66821534bf3e92ee1b4f821b6e163fa99120))

## [1.65.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.64.0...v1.65.0) (2024-06-09)


### Features

* **product:** new warning if the barcode is not valid ([#622](https://github.com/openfoodfacts/open-prices-frontend/issues/622)) ([10f96e7](https://github.com/openfoodfacts/open-prices-frontend/commit/10f96e7916d54ca8159e37fdb2e0665acba4e1b0))


### Bug Fixes

* **price add:** fix set product code or category from url (with ProductInputRow component). ref [#611](https://github.com/openfoodfacts/open-prices-frontend/issues/611) ([460a34f](https://github.com/openfoodfacts/open-prices-frontend/commit/460a34fb068cb8d39a3da1a24c9f30865a7d3265))
* **product:** fix display of quantity if missing. ref [#412](https://github.com/openfoodfacts/open-prices-frontend/issues/412) ([2563c50](https://github.com/openfoodfacts/open-prices-frontend/commit/2563c50c3f9fa47df50b57e5c204969b7d986ac4))
* **product:** hide empty product brands. ref [#422](https://github.com/openfoodfacts/open-prices-frontend/issues/422) ([2a5f83f](https://github.com/openfoodfacts/open-prices-frontend/commit/2a5f83f1e987452857987231457e1855c849a12d))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#618](https://github.com/openfoodfacts/open-prices-frontend/issues/618)) ([507b016](https://github.com/openfoodfacts/open-prices-frontend/commit/507b01622e7c22773a55ce3124581438f4a967f6))
* **l10n:** New Crowdin translations to review and merge ([#621](https://github.com/openfoodfacts/open-prices-frontend/issues/621)) ([39d452c](https://github.com/openfoodfacts/open-prices-frontend/commit/39d452ce82abcd797acdc293b0a0093088b5bd78))
* **l10n:** New Crowdin translations to review and merge ([#624](https://github.com/openfoodfacts/open-prices-frontend/issues/624)) ([5d93a71](https://github.com/openfoodfacts/open-prices-frontend/commit/5d93a71eb2eba671200def3dc35083fb765f5421))
* **price add:** change the ui of the discount toggle (switch instead of checkbox) ([#623](https://github.com/openfoodfacts/open-prices-frontend/issues/623)) ([059c5d1](https://github.com/openfoodfacts/open-prices-frontend/commit/059c5d15a7d736b1c681082f993d3c9cbcba0637))
* **price:** always show prices with 2 decimals ([#620](https://github.com/openfoodfacts/open-prices-frontend/issues/620)) ([77a6bcd](https://github.com/openfoodfacts/open-prices-frontend/commit/77a6bcd192384f674b072dbfd49ea57ca976dcf1))

## [1.64.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.63.0...v1.64.0) (2024-06-07)


### Features

* **location search:** if the user searches by ID, then do a lookup with Nominatim ([#617](https://github.com/openfoodfacts/open-prices-frontend/issues/617)) ([8f8368a](https://github.com/openfoodfacts/open-prices-frontend/commit/8f8368a6a172b3cf43f032ad42d4fe6711c7bf3a))
* **settings:** user setting to display raw product category tag ([#612](https://github.com/openfoodfacts/open-prices-frontend/issues/612)) ([7a4e367](https://github.com/openfoodfacts/open-prices-frontend/commit/7a4e367d4480b7d2c6352275254ff9f645b4c552))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#608](https://github.com/openfoodfacts/open-prices-frontend/issues/608)) ([c2ae7d6](https://github.com/openfoodfacts/open-prices-frontend/commit/c2ae7d6e04af9a9ccee8d621de519f0c2e528cdd))
* **l10n:** New Crowdin translations to review and merge ([#615](https://github.com/openfoodfacts/open-prices-frontend/issues/615)) ([4b7b6d4](https://github.com/openfoodfacts/open-prices-frontend/commit/4b7b6d459267d726b345a06f74284ec11e0153f2))
* **price add:** make product origin optional ([#614](https://github.com/openfoodfacts/open-prices-frontend/issues/614)) ([59ee584](https://github.com/openfoodfacts/open-prices-frontend/commit/59ee5848efdcf32103f1c9a491ed9b3e45d66b29))
* **product:** add new categories (pastries) ([#616](https://github.com/openfoodfacts/open-prices-frontend/issues/616)) ([17d0b2f](https://github.com/openfoodfacts/open-prices-frontend/commit/17d0b2fcd5286d826ff28c7161f031fdd4a90e71))

## [1.63.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.62.0...v1.63.0) (2024-06-06)


### Features

* **proof:** fetch and insert proof data to 'add single price' page when using 'add the price' button ([#584](https://github.com/openfoodfacts/open-prices-frontend/issues/584)) ([004cef2](https://github.com/openfoodfacts/open-prices-frontend/commit/004cef2b0c50cc6cdc5d3a4bd060bf6e30fad11b))


### Technical

* **price add multiple:** small improvements on the form ([#610](https://github.com/openfoodfacts/open-prices-frontend/issues/610)) ([ccc4fad](https://github.com/openfoodfacts/open-prices-frontend/commit/ccc4fad74411ebc969b50241394c9f91c5da0357))
* **price add:** new ProductInputRow component ([#611](https://github.com/openfoodfacts/open-prices-frontend/issues/611)) ([d8c628c](https://github.com/openfoodfacts/open-prices-frontend/commit/d8c628cf93e5b9aeb67303e294a940c3ed7a3b88))
* **product:** add new categories (breads, viennoiseries, eggs) ([#609](https://github.com/openfoodfacts/open-prices-frontend/issues/609)) ([25913c1](https://github.com/openfoodfacts/open-prices-frontend/commit/25913c1cc50626ee592e99b4a3801cd7bff46847))

## [1.62.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.61.0...v1.62.0) (2024-06-04)


### Features

* **API:** send the app_name param in every API call ([#588](https://github.com/openfoodfacts/open-prices-frontend/issues/588)) ([5a6af2f](https://github.com/openfoodfacts/open-prices-frontend/commit/5a6af2fc8d8f06c059b83c25e4fd37b64b072710))


### Bug Fixes

* **API:** don't send Content-Type in headers when posting formdata. ref [#588](https://github.com/openfoodfacts/open-prices-frontend/issues/588) ([98fb2e3](https://github.com/openfoodfacts/open-prices-frontend/commit/98fb2e3199848db21184ecfc9d43e9dd263c51b6))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#603](https://github.com/openfoodfacts/open-prices-frontend/issues/603)) ([e2b9755](https://github.com/openfoodfacts/open-prices-frontend/commit/e2b9755caaaab85b0df1561246df2fdb18c37a48))

## [1.61.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.60.0...v1.61.0) (2024-05-31)


### Features

* user setting to display location OSM ID ([#600](https://github.com/openfoodfacts/open-prices-frontend/issues/600)) ([a3ec3ec](https://github.com/openfoodfacts/open-prices-frontend/commit/a3ec3ecc753d2f3a26a940bd52ef6ecfdd361da6))


### Bug Fixes

* **location:** improve location search result filtering and display ([#597](https://github.com/openfoodfacts/open-prices-frontend/issues/597)) ([40403c6](https://github.com/openfoodfacts/open-prices-frontend/commit/40403c6043856826139db9866fb1a6f4bf9e324c))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#593](https://github.com/openfoodfacts/open-prices-frontend/issues/593)) ([8e5a160](https://github.com/openfoodfacts/open-prices-frontend/commit/8e5a1608a6cfa5914ff47dcfb9d97c9f585105ad))
* **location:** new LocationOSMIDChip component ([#601](https://github.com/openfoodfacts/open-prices-frontend/issues/601)) ([48e6246](https://github.com/openfoodfacts/open-prices-frontend/commit/48e6246b95b58adeb08382be87c2dd4716f13e88))
* **location:** new LocationOSMTagChip component ([#602](https://github.com/openfoodfacts/open-prices-frontend/issues/602)) ([b0872ca](https://github.com/openfoodfacts/open-prices-frontend/commit/b0872ca3fd3698ddd09841514f938c8381da5629))

## [1.60.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.59.0...v1.60.0) (2024-05-27)


### Features

* **proof:** recent proof dialog: add load more button, filter list depending on receipt or price tag ([#589](https://github.com/openfoodfacts/open-prices-frontend/issues/589)) ([c9fd2f4](https://github.com/openfoodfacts/open-prices-frontend/commit/c9fd2f41949d1712de1d3c4a671d21097ffeb94d))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#581](https://github.com/openfoodfacts/open-prices-frontend/issues/581)) ([4068748](https://github.com/openfoodfacts/open-prices-frontend/commit/4068748fd2e645454f1a52494c08110b68d0cb14))
* **Search page:** Many small improvements on the search form ([#582](https://github.com/openfoodfacts/open-prices-frontend/issues/582)) ([e320975](https://github.com/openfoodfacts/open-prices-frontend/commit/e32097524cbf8f964bf12bad97a86143065c634c))
* setup linting with ESLint & fix files ([#586](https://github.com/openfoodfacts/open-prices-frontend/issues/586)) ([ac4463c](https://github.com/openfoodfacts/open-prices-frontend/commit/ac4463c229630b3f48c69eaf409bdb4c6aec1da1))
* setup pre-commit with linting ([#590](https://github.com/openfoodfacts/open-prices-frontend/issues/590)) ([74900fc](https://github.com/openfoodfacts/open-prices-frontend/commit/74900fcd3a20370730937c419eea1f93b68e3f30))

## [1.59.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.58.2...v1.59.0) (2024-05-22)


### Features

* **Location:** display osm_tag in a new chip ([#579](https://github.com/openfoodfacts/open-prices-frontend/issues/579)) ([5f40587](https://github.com/openfoodfacts/open-prices-frontend/commit/5f4058700b9bd6801086bf5fe11124c258fd7040))


### Bug Fixes

* **Product detail:** avoid 'Unknown product' message displayed for raw categories ([#577](https://github.com/openfoodfacts/open-prices-frontend/issues/577)) ([1f148be](https://github.com/openfoodfacts/open-prices-frontend/commit/1f148beac939df36eb06cf6648123e26dedfd8c2))


### Technical

* **Location:** get country emoji from country_code instead of country ([#580](https://github.com/openfoodfacts/open-prices-frontend/issues/580)) ([ba3c075](https://github.com/openfoodfacts/open-prices-frontend/commit/ba3c075438f79b96ef1d475233f33fb5bca29694))

## [1.58.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.58.1...v1.58.2) (2024-05-22)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#565](https://github.com/openfoodfacts/open-prices-frontend/issues/565)) ([a73297f](https://github.com/openfoodfacts/open-prices-frontend/commit/a73297f7a00459e7a1b6f1d3d7f2ed45ea821ef4))
* **l10n:** New Crowdin translations to review and merge ([#575](https://github.com/openfoodfacts/open-prices-frontend/issues/575)) ([7f924db](https://github.com/openfoodfacts/open-prices-frontend/commit/7f924dba44c5f61d652ecc10c4095756ef63bcbf))
* setup E2E tests with Cypress ([#572](https://github.com/openfoodfacts/open-prices-frontend/issues/572)) ([c4f6a47](https://github.com/openfoodfacts/open-prices-frontend/commit/c4f6a47b2610a2cc2e5c76f5a13f63f959e7035f))

## [1.58.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.58.0...v1.58.1) (2024-04-28)


### Bug Fixes

* **header:** change username to lowercase. ref [#452](https://github.com/openfoodfacts/open-prices-frontend/issues/452) ([e52c398](https://github.com/openfoodfacts/open-prices-frontend/commit/e52c398b6d329ab8b37c1dd9cd9e50549376260b))
* **header:** make only header title clickable. closes [#553](https://github.com/openfoodfacts/open-prices-frontend/issues/553) ([7bc8c39](https://github.com/openfoodfacts/open-prices-frontend/commit/7bc8c3945c31f7a1ea9e5db2c732fe085a988767))
* **location:** fix Photon location type display. ref [#517](https://github.com/openfoodfacts/open-prices-frontend/issues/517) ([c2277e1](https://github.com/openfoodfacts/open-prices-frontend/commit/c2277e192227cd8ad96c840a431c3dfc14bc704e))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#561](https://github.com/openfoodfacts/open-prices-frontend/issues/561)) ([f0eeef7](https://github.com/openfoodfacts/open-prices-frontend/commit/f0eeef76812623416a508b20f0bb43507eae3ef3))
* **l10n:** New Crowdin translations to review and merge ([#564](https://github.com/openfoodfacts/open-prices-frontend/issues/564)) ([40ddfca](https://github.com/openfoodfacts/open-prices-frontend/commit/40ddfca2e510a8e73c94422505afb26f3a777ed5))

## [1.58.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.57.2...v1.58.0) (2024-04-25)


### Features

* **price:** allow editing price date ([#555](https://github.com/openfoodfacts/open-prices-frontend/issues/555)) ([322ec71](https://github.com/openfoodfacts/open-prices-frontend/commit/322ec717025b5557d8bdc8a2514a2d69f413f096))
* **proof:** add the price CTA button in the proof detail page ([#557](https://github.com/openfoodfacts/open-prices-frontend/issues/557)) ([dface48](https://github.com/openfoodfacts/open-prices-frontend/commit/dface48d55e6e6180c715d47323e55631c0681b4))
* user setting to display product barcode ([#559](https://github.com/openfoodfacts/open-prices-frontend/issues/559)) ([21ea977](https://github.com/openfoodfacts/open-prices-frontend/commit/21ea977f8eb187b980147776e378dab87e1c9a68))


### Bug Fixes

* accept comma as decimal separator in prices ([#551](https://github.com/openfoodfacts/open-prices-frontend/issues/551)) ([#554](https://github.com/openfoodfacts/open-prices-frontend/issues/554)) ([c4f5e91](https://github.com/openfoodfacts/open-prices-frontend/commit/c4f5e91223d5602b8570159c89f5a5fea841b772))
* fix revert display of product missing label on add. ref [#474](https://github.com/openfoodfacts/open-prices-frontend/issues/474) ([d725355](https://github.com/openfoodfacts/open-prices-frontend/commit/d725355194822d74b67c84e4f7f02655c4754b43))
* turn remaining barcode links into buttons. ref [#352](https://github.com/openfoodfacts/open-prices-frontend/issues/352) ([13b98e9](https://github.com/openfoodfacts/open-prices-frontend/commit/13b98e9a6527da3c8802494957933ef166b51094))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#550](https://github.com/openfoodfacts/open-prices-frontend/issues/550)) ([f0fcbf7](https://github.com/openfoodfacts/open-prices-frontend/commit/f0fcbf716dd067c1e705a7d833856d32658c9f2d))
* **l10n:** New Crowdin translations to review and merge ([#558](https://github.com/openfoodfacts/open-prices-frontend/issues/558)) ([d00968d](https://github.com/openfoodfacts/open-prices-frontend/commit/d00968da8fd10afb8d00fa03668784acf05df4e3))
* **l10n:** New Crowdin translations to review and merge ([#560](https://github.com/openfoodfacts/open-prices-frontend/issues/560)) ([40075b5](https://github.com/openfoodfacts/open-prices-frontend/commit/40075b5e99cd07ab162564b2fbe1f91ff659aab1))

## [1.57.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.57.1...v1.57.2) (2024-04-19)


### Bug Fixes

* fix display of price category & label. ref [#474](https://github.com/openfoodfacts/open-prices-frontend/issues/474) ([07c2f8f](https://github.com/openfoodfacts/open-prices-frontend/commit/07c2f8fd4c2996932f02def41d3484d263eef6cc))
* **price:** fix display and translation of price category name ([#549](https://github.com/openfoodfacts/open-prices-frontend/issues/549)) ([d4c8330](https://github.com/openfoodfacts/open-prices-frontend/commit/d4c8330b8b2b3154aeb3f7cc04f11b57fb78b9e0))
* product name in last PR. ref [#549](https://github.com/openfoodfacts/open-prices-frontend/issues/549) ([b468a19](https://github.com/openfoodfacts/open-prices-frontend/commit/b468a190880dd2368333da30eec572d1c82b0f4d))


### Technical

* Simplified category filtering script and added candies category ([#543](https://github.com/openfoodfacts/open-prices-frontend/issues/543)) ([dd03eda](https://github.com/openfoodfacts/open-prices-frontend/commit/dd03eda00d10e1061c9f5810729fe694a9a1a854))

## [1.57.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.57.0...v1.57.1) (2024-04-18)


### Bug Fixes

* **product detail:** fix display and translation of price category name ([#545](https://github.com/openfoodfacts/open-prices-frontend/issues/545)) ([aff5cb7](https://github.com/openfoodfacts/open-prices-frontend/commit/aff5cb7d59d9a6b539dfd3849a4c1ee75f147c52))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#524](https://github.com/openfoodfacts/open-prices-frontend/issues/524)) ([f9b387b](https://github.com/openfoodfacts/open-prices-frontend/commit/f9b387bb4ad7dd019cca83d28db5aadfa2448038))

## [1.57.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.56.0...v1.57.0) (2024-04-15)


### Features

* when a product is not found, improve CTA to add the product to OFF ([#522](https://github.com/openfoodfacts/open-prices-frontend/issues/522)) ([36a4d90](https://github.com/openfoodfacts/open-prices-frontend/commit/36a4d9086e76879b721b499c8df1b43588e7f496))


### Bug Fixes

* **price add:** fix proof preview url. closes [#525](https://github.com/openfoodfacts/open-prices-frontend/issues/525) ([03b7194](https://github.com/openfoodfacts/open-prices-frontend/commit/03b7194d0c1d050f7f6478400e1686e36f51a008))

## [1.56.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.55.1...v1.56.0) (2024-04-12)


### Features

* improve price card (condense, show product price count) ([#523](https://github.com/openfoodfacts/open-prices-frontend/issues/523)) ([b3d206c](https://github.com/openfoodfacts/open-prices-frontend/commit/b3d206ccf373348acfa3cb95ebea616480380211))


### Bug Fixes

* hide product missing message on price categories. ref [#474](https://github.com/openfoodfacts/open-prices-frontend/issues/474) ([e22484e](https://github.com/openfoodfacts/open-prices-frontend/commit/e22484e77fb9fb5a36ae7b1de5368fd33e71252a))


### Technical

* new ProductPriceAddButton component ([#521](https://github.com/openfoodfacts/open-prices-frontend/issues/521)) ([258c0fe](https://github.com/openfoodfacts/open-prices-frontend/commit/258c0fe3416b71689c48c3a201e7bc926a2bcdba))
* rename PriceFooter to PriceFooterRow ([c6ed008](https://github.com/openfoodfacts/open-prices-frontend/commit/c6ed00856f7b617cb4297f595ca9ee1cb1991f2f))
* rename PricePrice to PricePriceRow ([13a3797](https://github.com/openfoodfacts/open-prices-frontend/commit/13a379781d8abd151e6e74bb4d0e2bac52c8c263))
* show share button label on bigger screens. ref [#199](https://github.com/openfoodfacts/open-prices-frontend/issues/199) ([f86c2a0](https://github.com/openfoodfacts/open-prices-frontend/commit/f86c2a068589660af9213dbefc9bf9c8479c1757))

## [1.55.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.55.0...v1.55.1) (2024-04-10)


### Bug Fixes

* forgot some recent component renaming ([a8d8331](https://github.com/openfoodfacts/open-prices-frontend/commit/a8d833189ebcfffea164ee03dcf3493136ff0e91))

## [1.55.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.54.1...v1.55.0) (2024-04-10)


### Features

* **location:** repace Nominatim with Photon ([#517](https://github.com/openfoodfacts/open-prices-frontend/issues/517)) ([7ebb44c](https://github.com/openfoodfacts/open-prices-frontend/commit/7ebb44ca6dec72b432ba6f39c66f621604eebea6))


### Technical

* rename dialog components (Location, Barcode) ([c9d4587](https://github.com/openfoodfacts/open-prices-frontend/commit/c9d458756c556e0e2a095edfdf11ae56472073b1))

## [1.54.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.54.0...v1.54.1) (2024-04-08)


### Bug Fixes

* **price card:** add NZ country name for flag. ref [#80](https://github.com/openfoodfacts/open-prices-frontend/issues/80) ([a19e61d](https://github.com/openfoodfacts/open-prices-frontend/commit/a19e61dc1d6eb843b45388a36eef22cd0ccabed2))
* **products:** fix source filter untoggle action. ref [#510](https://github.com/openfoodfacts/open-prices-frontend/issues/510) ([7792891](https://github.com/openfoodfacts/open-prices-frontend/commit/779289138f586c11ff16b194d500549f6d4b9762))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#514](https://github.com/openfoodfacts/open-prices-frontend/issues/514)) ([71f3bd0](https://github.com/openfoodfacts/open-prices-frontend/commit/71f3bd06a131c21543aa5559f58e47af3441b574))

## [1.54.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.53.1...v1.54.0) (2024-04-04)


### Features

* **products:** add new filter by source ([#510](https://github.com/openfoodfacts/open-prices-frontend/issues/510)) ([c2d13af](https://github.com/openfoodfacts/open-prices-frontend/commit/c2d13af35e6550372991fbbd820a94e2b53398fe))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#511](https://github.com/openfoodfacts/open-prices-frontend/issues/511)) ([6c2b2dc](https://github.com/openfoodfacts/open-prices-frontend/commit/6c2b2dc1970e2e9fc4abc519e998c3d8a3921964))
* **l10n:** New Crowdin translations to review and merge ([#513](https://github.com/openfoodfacts/open-prices-frontend/issues/513)) ([8b96c7a](https://github.com/openfoodfacts/open-prices-frontend/commit/8b96c7a01e87b2a4f18ba7d50a028ad58d927a72))

## [1.53.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.53.0...v1.53.1) (2024-04-03)


### Technical

* **Footer:** change source button style. add link. ref [#503](https://github.com/openfoodfacts/open-prices-frontend/issues/503) ([fb42d7e](https://github.com/openfoodfacts/open-prices-frontend/commit/fb42d7e83aacbe945f752173367ba485d40b4b99))
* **l10n:** New Crowdin translations to review and merge ([#507](https://github.com/openfoodfacts/open-prices-frontend/issues/507)) ([e42aeba](https://github.com/openfoodfacts/open-prices-frontend/commit/e42aeba9115e10f2d5b4085a8e0a2f9d9b9c0119))
* **l10n:** New Crowdin translations to review and merge ([#509](https://github.com/openfoodfacts/open-prices-frontend/issues/509)) ([8ca06e7](https://github.com/openfoodfacts/open-prices-frontend/commit/8ca06e77f0cf6469d12681bbca1028439b7ee5ce))

## [1.53.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.52.4...v1.53.0) (2024-04-03)


### Features

* **Footer:** display the list of 4 sources (OFF, OBF, OPF, OPFF) ([#503](https://github.com/openfoodfacts/open-prices-frontend/issues/503)) ([b2e9c4e](https://github.com/openfoodfacts/open-prices-frontend/commit/b2e9c4e310f7e10e206f90087d496ac63b52e27c))


### Technical

* change OFF link url depending on product source ([#504](https://github.com/openfoodfacts/open-prices-frontend/issues/504)) ([8d92777](https://github.com/openfoodfacts/open-prices-frontend/commit/8d92777c53862c49155e9b80c1d3ed57a1d2338b))
* disable allowing a user to set a receipt as private ([#506](https://github.com/openfoodfacts/open-prices-frontend/issues/506)) ([a0e2490](https://github.com/openfoodfacts/open-prices-frontend/commit/a0e2490afc7421709564fc71ca51a9ae940dc940))
* **Footer:** update icons, use list. ref [#503](https://github.com/openfoodfacts/open-prices-frontend/issues/503) ([61989ad](https://github.com/openfoodfacts/open-prices-frontend/commit/61989adce56a411bd34c9f2c4a666b44f245fd6c))
* improve drawer icons of top pages ([09dee6c](https://github.com/openfoodfacts/open-prices-frontend/commit/09dee6c01b13102b62c57320b3ff882bacdb1930))
* **l10n:** New Crowdin translations to review and merge ([#500](https://github.com/openfoodfacts/open-prices-frontend/issues/500)) ([26ecf98](https://github.com/openfoodfacts/open-prices-frontend/commit/26ecf98d33bddeeee845504b4f536aae37071891))

## [1.52.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.52.3...v1.52.4) (2024-04-01)


### Bug Fixes

* **l10n:** fix missing translation token. closes [#497](https://github.com/openfoodfacts/open-prices-frontend/issues/497) ([b70c3c8](https://github.com/openfoodfacts/open-prices-frontend/commit/b70c3c8b63f99b6d093c80120146f9e0162a78da))


### Technical

* **products:** show kg/L if quantity &gt; 1000 ([#499](https://github.com/openfoodfacts/open-prices-frontend/issues/499)) ([5aaa528](https://github.com/openfoodfacts/open-prices-frontend/commit/5aaa5287f1c82e489ac63ac496c27d38f3d13121))

## [1.52.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.52.2...v1.52.3) (2024-04-01)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#492](https://github.com/openfoodfacts/open-prices-frontend/issues/492)) ([9ff52f8](https://github.com/openfoodfacts/open-prices-frontend/commit/9ff52f8eda51a7d8ff301c3510130d40179fd6f7))
* **l10n:** New Crowdin translations to review and merge ([#494](https://github.com/openfoodfacts/open-prices-frontend/issues/494)) ([e9fd612](https://github.com/openfoodfacts/open-prices-frontend/commit/e9fd61287cb2b866b68b215b941e3eebe5720861))
* **l10n:** New Crowdin translations to review and merge ([#496](https://github.com/openfoodfacts/open-prices-frontend/issues/496)) ([7438977](https://github.com/openfoodfacts/open-prices-frontend/commit/74389770151e94da2e957a8cb3c120b011824d73))
* new PriceInputRow component ([#495](https://github.com/openfoodfacts/open-prices-frontend/issues/495)) ([7e3d266](https://github.com/openfoodfacts/open-prices-frontend/commit/7e3d266ba4b0a1c404eafcbdede1ebaf83fbe257))

## [1.52.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.52.1...v1.52.2) (2024-03-31)


### Bug Fixes

* **Sign In:** set username to lowercase ([#491](https://github.com/openfoodfacts/open-prices-frontend/issues/491)) ([1f43210](https://github.com/openfoodfacts/open-prices-frontend/commit/1f4321015a793695969943e8f08085a2105642a6))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#486](https://github.com/openfoodfacts/open-prices-frontend/issues/486)) ([73f2975](https://github.com/openfoodfacts/open-prices-frontend/commit/73f297507ff530d9a01544c83833e93f357d8000))
* move FilterMenu & OrderMenu on the same line ([#485](https://github.com/openfoodfacts/open-prices-frontend/issues/485)) ([c5b2747](https://github.com/openfoodfacts/open-prices-frontend/commit/c5b27477ce561a37340a03bdb7fc836f63422500))
* new LocationCard component ([#490](https://github.com/openfoodfacts/open-prices-frontend/issues/490)) ([5c25493](https://github.com/openfoodfacts/open-prices-frontend/commit/5c2549322b96a59a050eef60c1333adb4bb3dbb8))
* new UserCard component ([#489](https://github.com/openfoodfacts/open-prices-frontend/issues/489)) ([fd93dde](https://github.com/openfoodfacts/open-prices-frontend/commit/fd93dde688500e99a787b5cb92f13a85584f62b8))

## [1.52.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.52.0...v1.52.1) (2024-03-31)


### Bug Fixes

* fix console warnings following [#474](https://github.com/openfoodfacts/open-prices-frontend/issues/474) ([0fabf1a](https://github.com/openfoodfacts/open-prices-frontend/commit/0fabf1a6e017b8012583ecb456a53bb3c335428f))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#480](https://github.com/openfoodfacts/open-prices-frontend/issues/480)) ([719169b](https://github.com/openfoodfacts/open-prices-frontend/commit/719169b38da0c78a534f6297a4a8b140c1d87bb5))
* **l10n:** New Crowdin translations to review and merge ([#484](https://github.com/openfoodfacts/open-prices-frontend/issues/484)) ([35735d1](https://github.com/openfoodfacts/open-prices-frontend/commit/35735d1c85795952942d28a0f06f0fe7c89b6813))
* move missing error messages in alerts ([#476](https://github.com/openfoodfacts/open-prices-frontend/issues/476)) ([1249268](https://github.com/openfoodfacts/open-prices-frontend/commit/12492689012683ef1c8c58e5194fc7c852874661))
* new OpenStreetMapLink component ([#478](https://github.com/openfoodfacts/open-prices-frontend/issues/478)) ([2f3c430](https://github.com/openfoodfacts/open-prices-frontend/commit/2f3c4304c189ee95dffe30a30317fd13034a294a))
* new ProductFilterMenu component ([#479](https://github.com/openfoodfacts/open-prices-frontend/issues/479)) ([8dad122](https://github.com/openfoodfacts/open-prices-frontend/commit/8dad1225758a74fc6a79f8c8a7c2cc728f8295eb))
* new ProductOrderMenu component ([#481](https://github.com/openfoodfacts/open-prices-frontend/issues/481)) ([979341f](https://github.com/openfoodfacts/open-prices-frontend/commit/979341f1b65aa2a29e5beae1addfbd409a994274))
* show product missing data in italic. improve wording ([427e97f](https://github.com/openfoodfacts/open-prices-frontend/commit/427e97f3e3edc5351cb6d9656be10694b1d4207b))
* use FilterMenu in price list pages ([#482](https://github.com/openfoodfacts/open-prices-frontend/issues/482)) ([5fc1180](https://github.com/openfoodfacts/open-prices-frontend/commit/5fc118054dc7beb4dbb09e1d5107617941bfbcf4))
* use OrderMenu in price list pages ([#483](https://github.com/openfoodfacts/open-prices-frontend/issues/483)) ([8c80469](https://github.com/openfoodfacts/open-prices-frontend/commit/8c8046975e147044bc6395592e7c080861f0bbc6))

## [1.52.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.51.1...v1.52.0) (2024-03-30)


### Features

* show an error chip if the product is missing ([#474](https://github.com/openfoodfacts/open-prices-frontend/issues/474)) ([ef02b07](https://github.com/openfoodfacts/open-prices-frontend/commit/ef02b07ab1853c03dce67852c523055eb8a577df))

## [1.51.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.51.0...v1.51.1) (2024-03-27)


### Bug Fixes

* scrolling on some components ([6f39836](https://github.com/openfoodfacts/open-prices-frontend/commit/6f39836e48af3655cbaf420d4309313b45062739))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#470](https://github.com/openfoodfacts/open-prices-frontend/issues/470)) ([2ed4902](https://github.com/openfoodfacts/open-prices-frontend/commit/2ed49026bbd58bd21e7e4df3cd02ece58596723d))
* **l10n:** New Crowdin translations to review and merge ([#472](https://github.com/openfoodfacts/open-prices-frontend/issues/472)) ([21c5549](https://github.com/openfoodfacts/open-prices-frontend/commit/21c554922ddc1d147854e80e6d66f54c337690af))

## [1.51.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.50.2...v1.51.0) (2024-03-20)


### Features

* Add price proof private in Add Price ([#405](https://github.com/openfoodfacts/open-prices-frontend/issues/405)) ([3da8a21](https://github.com/openfoodfacts/open-prices-frontend/commit/3da8a21e7de029aec667bc38edd13cc06920741d))
* **proofs:** display the proof receipt privacy status in the proof footer ([#468](https://github.com/openfoodfacts/open-prices-frontend/issues/468)) ([f1ca0fe](https://github.com/openfoodfacts/open-prices-frontend/commit/f1ca0feba5ac94bbca4129637d6c95a15983f4d3))
* **proofs:** new action menu if user is owner (edit & delete) ([#462](https://github.com/openfoodfacts/open-prices-frontend/issues/462)) ([15aa82d](https://github.com/openfoodfacts/open-prices-frontend/commit/15aa82d1db408130f8407df646f32314af0f258e))
* **user:** add share button on dashboard ([#469](https://github.com/openfoodfacts/open-prices-frontend/issues/469)) ([7386b95](https://github.com/openfoodfacts/open-prices-frontend/commit/7386b9591f57cb1106a9aec80a6b109f83289a72))


### Bug Fixes

* focus location search input. ref [#15](https://github.com/openfoodfacts/open-prices-frontend/issues/15) ([1528349](https://github.com/openfoodfacts/open-prices-frontend/commit/1528349f4f6ab760e6c34ffe0eff181cb91892bb))
* **proofs:** cleanup post proof privacy recent changes ([#466](https://github.com/openfoodfacts/open-prices-frontend/issues/466)) ([a12ead6](https://github.com/openfoodfacts/open-prices-frontend/commit/a12ead612df5aaf24b903a018fe09482a2287753))
* **proofs:** fix some stuff after merging the proof private toggle. ref [#405](https://github.com/openfoodfacts/open-prices-frontend/issues/405) ([954190b](https://github.com/openfoodfacts/open-prices-frontend/commit/954190b0d3b66b47823372b23424e8a5d3aec32f))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#457](https://github.com/openfoodfacts/open-prices-frontend/issues/457)) ([9e37b4d](https://github.com/openfoodfacts/open-prices-frontend/commit/9e37b4d9042954393ac6d60dfb15c0900f02c75c))
* **l10n:** New Crowdin translations to review and merge ([#461](https://github.com/openfoodfacts/open-prices-frontend/issues/461)) ([cea0261](https://github.com/openfoodfacts/open-prices-frontend/commit/cea0261c9778455dde84ffc90c32ea42ae509b81))
* **l10n:** New Crowdin translations to review and merge ([#463](https://github.com/openfoodfacts/open-prices-frontend/issues/463)) ([53da805](https://github.com/openfoodfacts/open-prices-frontend/commit/53da8050370d344d2f53f0dbff697bb5b7e359f4))
* **l10n:** New Crowdin translations to review and merge ([#465](https://github.com/openfoodfacts/open-prices-frontend/issues/465)) ([d110ba3](https://github.com/openfoodfacts/open-prices-frontend/commit/d110ba35825b8bb76725eec03d7840146ad116a2))
* **proof:** new ProofTypeChip component ([#464](https://github.com/openfoodfacts/open-prices-frontend/issues/464)) ([851e380](https://github.com/openfoodfacts/open-prices-frontend/commit/851e380639b5fe9db513968fb4e96416beebad5a))

## [1.50.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.50.1...v1.50.2) (2024-03-16)


### Bug Fixes

* always close v-menus if user scrolls. ref [#446](https://github.com/openfoodfacts/open-prices-frontend/issues/446) & other ([ee35e98](https://github.com/openfoodfacts/open-prices-frontend/commit/ee35e98adb654456f0aafc3e7651669506fdc52f))
* **header:** fix menu display. ref [#451](https://github.com/openfoodfacts/open-prices-frontend/issues/451) & [#452](https://github.com/openfoodfacts/open-prices-frontend/issues/452) ([d6091cd](https://github.com/openfoodfacts/open-prices-frontend/commit/d6091cd54a115d17b534402db8aedffa59e8cf1a))

## [1.50.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.50.0...v1.50.1) (2024-03-16)


### Bug Fixes

* remove errors on Proof card emits ([#455](https://github.com/openfoodfacts/open-prices-frontend/issues/455)) ([3cdd81c](https://github.com/openfoodfacts/open-prices-frontend/commit/3cdd81c3cadc53a919569b192667dc3551de3695))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#453](https://github.com/openfoodfacts/open-prices-frontend/issues/453)) ([44aab94](https://github.com/openfoodfacts/open-prices-frontend/commit/44aab94604942ed89ff46482867835f73bbe94f5))

## [1.50.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.49.0...v1.50.0) (2024-03-16)


### Features

* **l10n:** change OFF url depending on user locale ([#445](https://github.com/openfoodfacts/open-prices-frontend/issues/445)) ([49af006](https://github.com/openfoodfacts/open-prices-frontend/commit/49af006d971ed5acf1a6c471c778c151da0e760e))
* new dialog to set RECEIPT as private ([#404](https://github.com/openfoodfacts/open-prices-frontend/issues/404)) ([92fbe8d](https://github.com/openfoodfacts/open-prices-frontend/commit/92fbe8d4937842aadcde5c7eb316240b708e2ac8))
* **price:** basic edit form if user is owner ([#446](https://github.com/openfoodfacts/open-prices-frontend/issues/446)) ([1da6e90](https://github.com/openfoodfacts/open-prices-frontend/commit/1da6e9023086c983f03f8b595daec6bc2cd6dde1))
* **price:** new action menu if user is owner (to delete, and soon edit) ([#442](https://github.com/openfoodfacts/open-prices-frontend/issues/442)) ([0e40e0c](https://github.com/openfoodfacts/open-prices-frontend/commit/0e40e0c279f1259805f373812e977ce3e4893c93))


### Bug Fixes

* proof edit button sliding ([#439](https://github.com/openfoodfacts/open-prices-frontend/issues/439)) ([d0656f8](https://github.com/openfoodfacts/open-prices-frontend/commit/d0656f817d8ff495f2825f9b5d408b686672dfee))


### Technical

* **header:** show 'Sign in' text on larger screens ([#451](https://github.com/openfoodfacts/open-prices-frontend/issues/451)) ([a224a67](https://github.com/openfoodfacts/open-prices-frontend/commit/a224a67f4ed98eb2e837235b3b7001cdbc0713b5))
* **header:** show Username text on larger screens ([#452](https://github.com/openfoodfacts/open-prices-frontend/issues/452)) ([9e00e8b](https://github.com/openfoodfacts/open-prices-frontend/commit/9e00e8b067e792f803efd7198d39a9183668839f))
* improve OpenFoodFacts link component ([#435](https://github.com/openfoodfacts/open-prices-frontend/issues/435)) ([f59d977](https://github.com/openfoodfacts/open-prices-frontend/commit/f59d9775166732424917fa5ac0306db7260ac807))
* **l10n:** New Crowdin translations to review and merge ([#433](https://github.com/openfoodfacts/open-prices-frontend/issues/433)) ([a4d92ae](https://github.com/openfoodfacts/open-prices-frontend/commit/a4d92ae94104f3c66175ccdc61b63d24d15eea7f))
* **l10n:** New Crowdin translations to review and merge ([#443](https://github.com/openfoodfacts/open-prices-frontend/issues/443)) ([d797dea](https://github.com/openfoodfacts/open-prices-frontend/commit/d797deac27f0eaead15ea0985bc06707c898050b))
* **l10n:** New Crowdin translations to review and merge ([#450](https://github.com/openfoodfacts/open-prices-frontend/issues/450)) ([dca57f3](https://github.com/openfoodfacts/open-prices-frontend/commit/dca57f36bb7695c5f64cc085be083630831e68b6))
* **price:** new PriceDeleteConfirmationDialog component ([#434](https://github.com/openfoodfacts/open-prices-frontend/issues/434)) ([9c9f5ef](https://github.com/openfoodfacts/open-prices-frontend/commit/9c9f5eff0b68d6c8e6838aef24354258258952f6))
* **price:** new PriceLocationChip component ([#440](https://github.com/openfoodfacts/open-prices-frontend/issues/440)) ([b4ca17e](https://github.com/openfoodfacts/open-prices-frontend/commit/b4ca17ea19fe49fced5543cd8eebc6cf520085ce))
* **price:** new PriceOwnerChip component ([#441](https://github.com/openfoodfacts/open-prices-frontend/issues/441)) ([25dbd25](https://github.com/openfoodfacts/open-prices-frontend/commit/25dbd252f62277575056ff54120fbeb1eba17f96))

## [1.49.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.48.0...v1.49.0) (2024-03-13)


### Features

* allow using multiple currencies in Add Prices form ([#397](https://github.com/openfoodfacts/open-prices-frontend/issues/397)) ([e852b02](https://github.com/openfoodfacts/open-prices-frontend/commit/e852b02a595258f10851c58333283898cca47ee2))
* **settings:** allow selecting multiple "favorite" currencies ([#406](https://github.com/openfoodfacts/open-prices-frontend/issues/406)) ([33b4cbb](https://github.com/openfoodfacts/open-prices-frontend/commit/33b4cbb57b90e2b999e613afe4ec965f7aacd325))


### Bug Fixes

* **store:** wrong name for favorite_currencies ([#431](https://github.com/openfoodfacts/open-prices-frontend/issues/431)) ([103f449](https://github.com/openfoodfacts/open-prices-frontend/commit/103f4496dce103e4ab35f1717f4ff9d0577bd5c4))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#428](https://github.com/openfoodfacts/open-prices-frontend/issues/428)) ([66e0e5e](https://github.com/openfoodfacts/open-prices-frontend/commit/66e0e5ee906a1819f798a89e9a0f569e1ef42b27))
* **l10n:** New Crowdin translations to review and merge ([#430](https://github.com/openfoodfacts/open-prices-frontend/issues/430)) ([88b1914](https://github.com/openfoodfacts/open-prices-frontend/commit/88b19140afb6d9af920d22ebf83ba1548ca6b2b0))

## [1.48.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.47.0...v1.48.0) (2024-03-09)


### Features

* new ordering choice by price (lowest first) ([#408](https://github.com/openfoodfacts/open-prices-frontend/issues/408)) ([591a062](https://github.com/openfoodfacts/open-prices-frontend/commit/591a062d320544a03c9ee6c87b529d6e9fe869ca))
* **product:** if brand missing, show warning color & tooltip ([#422](https://github.com/openfoodfacts/open-prices-frontend/issues/422)) ([1b9a30a](https://github.com/openfoodfacts/open-prices-frontend/commit/1b9a30ab7c97235f5b5461c4b42181efadc43123))
* **product:** if categories missing, show warning color & tooltip ([#417](https://github.com/openfoodfacts/open-prices-frontend/issues/417)) ([5527b29](https://github.com/openfoodfacts/open-prices-frontend/commit/5527b2954004ae8c3a74c11774a8ea590a1a8d7f))
* **product:** if quantity missing, show warning color & tooltip ([#412](https://github.com/openfoodfacts/open-prices-frontend/issues/412)) ([d4ce6ce](https://github.com/openfoodfacts/open-prices-frontend/commit/d4ce6ce3700f2713b33ffae5c4a0f4c14f691fc6))
* **product:** if too many brands, show count & dialog ([#424](https://github.com/openfoodfacts/open-prices-frontend/issues/424)) ([4a8326c](https://github.com/openfoodfacts/open-prices-frontend/commit/4a8326c002ad77d85c02be3d64c9807f2982d779))


### Bug Fixes

* **i10n:** language dropdown and locale load at mount ([#419](https://github.com/openfoodfacts/open-prices-frontend/issues/419)) ([6244e22](https://github.com/openfoodfacts/open-prices-frontend/commit/6244e22206baf5b9c937bde63b44f0f91b2bb148))
* improve page display when the user changes the price or product order ([#414](https://github.com/openfoodfacts/open-prices-frontend/issues/414)) ([c0468bb](https://github.com/openfoodfacts/open-prices-frontend/commit/c0468bb59306e91fd7860508c7dd4fd5c07b6e57))
* **l10n:** fix missing translation. ref [#410](https://github.com/openfoodfacts/open-prices-frontend/issues/410) ([b592e31](https://github.com/openfoodfacts/open-prices-frontend/commit/b592e318facf8b48be1c48f6ddce5fa6c322324e))
* remove unused code. ref [#358](https://github.com/openfoodfacts/open-prices-frontend/issues/358) ([6c6ae53](https://github.com/openfoodfacts/open-prices-frontend/commit/6c6ae5325c008d6d9258c9b86796157c6e5c5a8b))


### Technical

* **l10n:** allow translation of filtering options ([#411](https://github.com/openfoodfacts/open-prices-frontend/issues/411)) ([c013a76](https://github.com/openfoodfacts/open-prices-frontend/commit/c013a76fb121a27b0767d127b5d40d762487acc9))
* **l10n:** allow translation of price ordering options ([#409](https://github.com/openfoodfacts/open-prices-frontend/issues/409)) ([6ef5de6](https://github.com/openfoodfacts/open-prices-frontend/commit/6ef5de65e92d1f284410ebd2b5c6b445468bfd60))
* **l10n:** allow translation of product ordering options ([#410](https://github.com/openfoodfacts/open-prices-frontend/issues/410)) ([4ea4387](https://github.com/openfoodfacts/open-prices-frontend/commit/4ea43877e4dda4c4d0749aa57adaa114bffc7998))
* **l10n:** New Crowdin translations to review and merge ([#393](https://github.com/openfoodfacts/open-prices-frontend/issues/393)) ([3ade61d](https://github.com/openfoodfacts/open-prices-frontend/commit/3ade61d4b3ee76872c39c3b0ff168bcef440a420))
* **l10n:** New Crowdin translations to review and merge ([#420](https://github.com/openfoodfacts/open-prices-frontend/issues/420)) ([d807337](https://github.com/openfoodfacts/open-prices-frontend/commit/d80733727a2f99be9d1f6ea873d96989f7a86c32))
* **prices:** move label to own component ([#427](https://github.com/openfoodfacts/open-prices-frontend/issues/427)) ([cc87203](https://github.com/openfoodfacts/open-prices-frontend/commit/cc8720306ab90aeb9a65f4062a29843aec65dd2e))
* **prices:** move origin to own chip ([#426](https://github.com/openfoodfacts/open-prices-frontend/issues/426)) ([70c46b0](https://github.com/openfoodfacts/open-prices-frontend/commit/70c46b09d4f028ee1c2addf254228fb62baff478))
* **product:** hide product code ([#423](https://github.com/openfoodfacts/open-prices-frontend/issues/423)) ([bdc2b52](https://github.com/openfoodfacts/open-prices-frontend/commit/bdc2b520706d312d03845f1f720c09803a8f122d))
* **product:** if labels missing, don't show dialog ([#421](https://github.com/openfoodfacts/open-prices-frontend/issues/421)) ([9bc58a5](https://github.com/openfoodfacts/open-prices-frontend/commit/9bc58a59e713dc65ecf5805639377c286c484333))
* **product:** if product missing, hide categories & labels ([#425](https://github.com/openfoodfacts/open-prices-frontend/issues/425)) ([5c2eee1](https://github.com/openfoodfacts/open-prices-frontend/commit/5c2eee1337b50390f6451bd93d3141dae7993e4f))
* **product:** new ProductCategoriesChip & ProductLabelsChip ([#416](https://github.com/openfoodfacts/open-prices-frontend/issues/416)) ([df1fbf4](https://github.com/openfoodfacts/open-prices-frontend/commit/df1fbf4da8a1eea426c1d8e800816b6e7ca88d7c))

## [1.47.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.46.1...v1.47.0) (2024-03-06)


### Features

* add update PATCH proof in api ([#401](https://github.com/openfoodfacts/open-prices-frontend/issues/401)) ([7c9143d](https://github.com/openfoodfacts/open-prices-frontend/commit/7c9143d9b8bf640ab5c93d7edd0f36e9824edca8))
* **api:** new updatePrice method ([#403](https://github.com/openfoodfacts/open-prices-frontend/issues/403)) ([f701df8](https://github.com/openfoodfacts/open-prices-frontend/commit/f701df818ff6a2c7a45d45965bb5f771ea132c26))
* **category detail:** new category detail page ([#400](https://github.com/openfoodfacts/open-prices-frontend/issues/400)) ([1eb0324](https://github.com/openfoodfacts/open-prices-frontend/commit/1eb0324e61f8e2b2140c85ab849a7d71a3f85667))
* **products:** display popup with product labels ([#396](https://github.com/openfoodfacts/open-prices-frontend/issues/396)) ([148d607](https://github.com/openfoodfacts/open-prices-frontend/commit/148d6073b217cf6d015c16c692e0c377c20debe9))


### Bug Fixes

* fix scanner crashing when camera not allowed by user. closes [#309](https://github.com/openfoodfacts/open-prices-frontend/issues/309) ([7c8c086](https://github.com/openfoodfacts/open-prices-frontend/commit/7c8c08665f15e627709116233acf530d0fc6eb89))


### Technical

* cleanup language settings and language selector ([#337](https://github.com/openfoodfacts/open-prices-frontend/issues/337)) ([396c808](https://github.com/openfoodfacts/open-prices-frontend/commit/396c8082f10b13d55e700fdb2027797cc8904532))
* use ProofCard everywhere ([#395](https://github.com/openfoodfacts/open-prices-frontend/issues/395)) ([e589322](https://github.com/openfoodfacts/open-prices-frontend/commit/e589322bcc7fd9fe65c6a9aaa0ed2410e9df6266))

## [1.46.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.46.0...v1.46.1) (2024-02-28)


### Bug Fixes

* fix link in OFF button. ref [#389](https://github.com/openfoodfacts/open-prices-frontend/issues/389) ([b19afb2](https://github.com/openfoodfacts/open-prices-frontend/commit/b19afb2bb44d3fc3aaacde297f31024e8da4e073))
* reduce size of text warning messages ([ad050e4](https://github.com/openfoodfacts/open-prices-frontend/commit/ad050e4dbc937c9f422e3eb49ade5320152a3d7d))
* use v-card-actions in v-dialogs to allow scroll ([86942a5](https://github.com/openfoodfacts/open-prices-frontend/commit/86942a5407a31f374ec50620980f3682ef6055ba))
* use v-dialog scrollable props ([e83a9cd](https://github.com/openfoodfacts/open-prices-frontend/commit/e83a9cd153da934746f225360834647067b20801))

## [1.46.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.45.0...v1.46.0) (2024-02-28)


### Features

* **api:** new getProofById ([#383](https://github.com/openfoodfacts/open-prices-frontend/issues/383)) ([518e84d](https://github.com/openfoodfacts/open-prices-frontend/commit/518e84d256d51fe8036ec9bbbd20dc9e147ca0ee))
* new proof detail page ([#375](https://github.com/openfoodfacts/open-prices-frontend/issues/375)) ([4f11bea](https://github.com/openfoodfacts/open-prices-frontend/commit/4f11bea3d0f01d8d2bfe030e113b2580dbea4aab))
* Settings country dependencies ([#310](https://github.com/openfoodfacts/open-prices-frontend/issues/310)) ([c52f046](https://github.com/openfoodfacts/open-prices-frontend/commit/c52f046df9f8a61dc43400d5b2898489416750eb))


### Bug Fixes

* delete proof display ([#378](https://github.com/openfoodfacts/open-prices-frontend/issues/378)) ([bc16444](https://github.com/openfoodfacts/open-prices-frontend/commit/bc16444dd7df3d0b787e7baee5a127c264ff56c6))
* **price create form:** fix form init when coming from category ([#388](https://github.com/openfoodfacts/open-prices-frontend/issues/388)) ([00d4ffa](https://github.com/openfoodfacts/open-prices-frontend/commit/00d4ffa59e0d1f0d8b586cf4b2777485b40ff2dd))
* **product:** fix add OFF button if product not found ([#389](https://github.com/openfoodfacts/open-prices-frontend/issues/389)) ([f7c7258](https://github.com/openfoodfacts/open-prices-frontend/commit/f7c7258a5ad7d3653cddca790378c4222e970591))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#385](https://github.com/openfoodfacts/open-prices-frontend/issues/385)) ([23be362](https://github.com/openfoodfacts/open-prices-frontend/commit/23be362495b57aba9ff974c3179e3095602a6940))
* **l10n:** New Crowdin translations to review and merge ([#387](https://github.com/openfoodfacts/open-prices-frontend/issues/387)) ([30fe0a7](https://github.com/openfoodfacts/open-prices-frontend/commit/30fe0a7b4fc0a1703738db2f61b1b96dd19fe3d9))
* **l10n:** New Crowdin translations to review and merge ([#391](https://github.com/openfoodfacts/open-prices-frontend/issues/391)) ([7a9ae17](https://github.com/openfoodfacts/open-prices-frontend/commit/7a9ae172edbb909817b93b9d6d48027f07079a76))

## [1.45.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.44.0...v1.45.0) (2024-02-26)


### Features

* **price create form:** allow user to select a recent proof ([#376](https://github.com/openfoodfacts/open-prices-frontend/issues/376)) ([483be18](https://github.com/openfoodfacts/open-prices-frontend/commit/483be1873d68b369d708933a5c289466d43fe328))


### Bug Fixes

* **price create form:** turn 'Select from device gallery' link into button ([#381](https://github.com/openfoodfacts/open-prices-frontend/issues/381)) ([8474c1f](https://github.com/openfoodfacts/open-prices-frontend/commit/8474c1fac2980c972e8b546afc45068d81019dd3))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#377](https://github.com/openfoodfacts/open-prices-frontend/issues/377)) ([7674455](https://github.com/openfoodfacts/open-prices-frontend/commit/7674455bb1c634158c54ec259d2ccb2456a75ac5))

## [1.44.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.43.0...v1.44.0) (2024-02-24)


### Features

* **products:** display categories & labels count ([#367](https://github.com/openfoodfacts/open-prices-frontend/issues/367)) ([648b8f2](https://github.com/openfoodfacts/open-prices-frontend/commit/648b8f269de050d46de13304512f037051670d2b))
* **products:** display popup with product categories ([#369](https://github.com/openfoodfacts/open-prices-frontend/issues/369)) ([69aa514](https://github.com/openfoodfacts/open-prices-frontend/commit/69aa5141168bd3acb54a70c8ca5ca9f4c28c9028))


### Bug Fixes

* fix typo in product quantity for ml. ref [#311](https://github.com/openfoodfacts/open-prices-frontend/issues/311) & [#314](https://github.com/openfoodfacts/open-prices-frontend/issues/314) ([d9ca758](https://github.com/openfoodfacts/open-prices-frontend/commit/d9ca758f135bffdc35c2f176da526c8de8e13a98))
* force numeric keyboard for barcode & price inputs ([#373](https://github.com/openfoodfacts/open-prices-frontend/issues/373)) ([38c6a10](https://github.com/openfoodfacts/open-prices-frontend/commit/38c6a10e39924d8188bd0d778f330b0de7efeff4))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#362](https://github.com/openfoodfacts/open-prices-frontend/issues/362)) ([d3b515b](https://github.com/openfoodfacts/open-prices-frontend/commit/d3b515be477c43d30afbd68b4a6f6fadb10245ad))
* **l10n:** New Crowdin translations to review and merge ([#374](https://github.com/openfoodfacts/open-prices-frontend/issues/374)) ([aade212](https://github.com/openfoodfacts/open-prices-frontend/commit/aade2127ffc82b8e7987e48a6e1801f7586b8ec4))

## [1.43.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.42.0...v1.43.0) (2024-02-20)


### Features

* add price filter ([#358](https://github.com/openfoodfacts/open-prices-frontend/issues/358)) ([1d5163d](https://github.com/openfoodfacts/open-prices-frontend/commit/1d5163d8d617f173aae6378ac3cbfbfb3cd10833))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#356](https://github.com/openfoodfacts/open-prices-frontend/issues/356)) ([7124366](https://github.com/openfoodfacts/open-prices-frontend/commit/71243662ed522b344f9f7771d2ade5a3dd622d27))

## [1.42.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.41.0...v1.42.0) (2024-02-17)


### Features

* update URL when usering filter & order_by queries ([#344](https://github.com/openfoodfacts/open-prices-frontend/issues/344)) ([4a5b9f8](https://github.com/openfoodfacts/open-prices-frontend/commit/4a5b9f8f7ead0723b3c9d09f8140030eab7bdba2))


### Bug Fixes

* fix Lighthouse errors (PWA config) ([#348](https://github.com/openfoodfacts/open-prices-frontend/issues/348)) ([d9e31c5](https://github.com/openfoodfacts/open-prices-frontend/commit/d9e31c5c93ec81880f724c292f9c4686dc95edba))
* **l10n:** fix languages with multiple entries in name and native ([#345](https://github.com/openfoodfacts/open-prices-frontend/issues/345)) ([cf165db](https://github.com/openfoodfacts/open-prices-frontend/commit/cf165db5f94dbcd44f3f9408d5a4deafab8c62ef))
* show tooltip on click (discount, date) ([#346](https://github.com/openfoodfacts/open-prices-frontend/issues/346)) ([ae424fe](https://github.com/openfoodfacts/open-prices-frontend/commit/ae424fed8995643a1bfaf6bc3eebbf1e0adaeb5d))
* Turn 2 links into real buttons (Type a barcode & Select from gallery) ([#352](https://github.com/openfoodfacts/open-prices-frontend/issues/352)) ([f29ad24](https://github.com/openfoodfacts/open-prices-frontend/commit/f29ad247cba8461303f93263dc1b5cf33568338e))
* typos in dynamic import (ref [#349](https://github.com/openfoodfacts/open-prices-frontend/issues/349)) ([#355](https://github.com/openfoodfacts/open-prices-frontend/issues/355)) ([b72eb34](https://github.com/openfoodfacts/open-prices-frontend/commit/b72eb34d0cbc0ea28349d637bdc1a95126eaaf37))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#347](https://github.com/openfoodfacts/open-prices-frontend/issues/347)) ([9db2818](https://github.com/openfoodfacts/open-prices-frontend/commit/9db28182c38a9d9771606c2fb8c63bbdfd037822))
* **l10n:** New Crowdin translations to review and merge ([#354](https://github.com/openfoodfacts/open-prices-frontend/issues/354)) ([7e95e63](https://github.com/openfoodfacts/open-prices-frontend/commit/7e95e636e9b9fe08ea7f59f5b137a4bc19ea5cd0))

## [1.41.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.40.0...v1.41.0) (2024-02-16)


### Features

* add a country selector in the user settings ([#297](https://github.com/openfoodfacts/open-prices-frontend/issues/297)) ([82a9f35](https://github.com/openfoodfacts/open-prices-frontend/commit/82a9f35ece9a14d1619907ff3753716f7217ee35))
* add GDPR proof type ([#341](https://github.com/openfoodfacts/open-prices-frontend/issues/341)) ([93b04a8](https://github.com/openfoodfacts/open-prices-frontend/commit/93b04a8a77421ae989a06ca3bc8c6b11bd6cace5))


### Bug Fixes

* **l10n:** improve language script ([#342](https://github.com/openfoodfacts/open-prices-frontend/issues/342)) ([b65c011](https://github.com/openfoodfacts/open-prices-frontend/commit/b65c011ef690be5751781b6757e1075207fd6def))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#334](https://github.com/openfoodfacts/open-prices-frontend/issues/334)) ([7031a53](https://github.com/openfoodfacts/open-prices-frontend/commit/7031a531ee0859007705788b7534c83b6e46393b))
* **l10n:** script to generate languages ([#338](https://github.com/openfoodfacts/open-prices-frontend/issues/338)) ([e182a5c](https://github.com/openfoodfacts/open-prices-frontend/commit/e182a5cf0897041bdb5c1802e6ad424d98274d08))

## [1.40.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.39.0...v1.40.0) (2024-02-12)


### Features

* **l10n:** translate origin list in price add form depending on user locale ([#322](https://github.com/openfoodfacts/open-prices-frontend/issues/322)) ([1bd4355](https://github.com/openfoodfacts/open-prices-frontend/commit/1bd4355bb36eda02111f425be02ff5a5ed211696))
* script to filter and generate origins (with translations) ([#321](https://github.com/openfoodfacts/open-prices-frontend/issues/321)) ([94c326c](https://github.com/openfoodfacts/open-prices-frontend/commit/94c326cb853ced803c7956a921ced091fe3e324b))


### Bug Fixes

* fix import exifreader in price multiple form. ref [#320](https://github.com/openfoodfacts/open-prices-frontend/issues/320) ([a68c114](https://github.com/openfoodfacts/open-prices-frontend/commit/a68c114f769cc4545566a8970790bce89fff8d83))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#332](https://github.com/openfoodfacts/open-prices-frontend/issues/332)) ([ee7fc41](https://github.com/openfoodfacts/open-prices-frontend/commit/ee7fc41b465b66ae90ea11f39a4b5fbc6c7123dc))

## [1.39.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.38.0...v1.39.0) (2024-02-11)


### Features

* display kg / L depending on product_quantity_unit ([#311](https://github.com/openfoodfacts/open-prices-frontend/issues/311)) ([fff1cf7](https://github.com/openfoodfacts/open-prices-frontend/commit/fff1cf75ce838b47c73aa8c7b631401a26d04325))
* display product quantity (g or mL) depending on product_quantity_unit ([#314](https://github.com/openfoodfacts/open-prices-frontend/issues/314)) ([2365e66](https://github.com/openfoodfacts/open-prices-frontend/commit/2365e66bc4ed5f30b756fbc7eb035070fb1f9a8f))
* header background color (same as OFF) ([#316](https://github.com/openfoodfacts/open-prices-frontend/issues/316)) ([911ca77](https://github.com/openfoodfacts/open-prices-frontend/commit/911ca77a593d72e20478a925260a42672e62c560))
* read gallery image exif date (and update if not today) ([#320](https://github.com/openfoodfacts/open-prices-frontend/issues/320)) ([1393cf1](https://github.com/openfoodfacts/open-prices-frontend/commit/1393cf12f13891f15b64a18fe1ad1e730cce3745))


### Bug Fixes

* **price add form:** clarify that gallery won't open existing proofs ([#328](https://github.com/openfoodfacts/open-prices-frontend/issues/328)) ([1441060](https://github.com/openfoodfacts/open-prices-frontend/commit/14410603f2a85bc5a15721791ae27d32c6a931f6))
* price value must be positive ([#319](https://github.com/openfoodfacts/open-prices-frontend/issues/319)) ([eeb7ebf](https://github.com/openfoodfacts/open-prices-frontend/commit/eeb7ebf0f1593f20fa7b7c3b8adc0cc5aa125fcc))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#308](https://github.com/openfoodfacts/open-prices-frontend/issues/308)) ([3c91ad0](https://github.com/openfoodfacts/open-prices-frontend/commit/3c91ad05a98af4f71eac3eb8d2f8673d56785841))
* **l10n:** New Crowdin translations to review and merge ([#315](https://github.com/openfoodfacts/open-prices-frontend/issues/315)) ([0396d54](https://github.com/openfoodfacts/open-prices-frontend/commit/0396d54440df98bc1ae7553995c92f3b5e307dc5))
* **l10n:** New Crowdin translations to review and merge ([#317](https://github.com/openfoodfacts/open-prices-frontend/issues/317)) ([0126110](https://github.com/openfoodfacts/open-prices-frontend/commit/0126110f14e9fe691b914ddf75987596823cf297))
* **l10n:** New Crowdin translations to review and merge ([#324](https://github.com/openfoodfacts/open-prices-frontend/issues/324)) ([670172d](https://github.com/openfoodfacts/open-prices-frontend/commit/670172d749567d9089abf5f462ec7744163444a3))

## [1.38.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.37.0...v1.38.0) (2024-02-08)


### Features

* allow users to delete its own proofs ([#304](https://github.com/openfoodfacts/open-prices-frontend/issues/304)) ([0e73489](https://github.com/openfoodfacts/open-prices-frontend/commit/0e7348954df881daf0067b68bf7ad7ac0e298f05))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#289](https://github.com/openfoodfacts/open-prices-frontend/issues/289)) ([366ddf2](https://github.com/openfoodfacts/open-prices-frontend/commit/366ddf23f75eab6ee2111d824a4ac9302ef313e0))
* **l10n:** New Crowdin translations to review and merge ([#292](https://github.com/openfoodfacts/open-prices-frontend/issues/292)) ([006111a](https://github.com/openfoodfacts/open-prices-frontend/commit/006111a043180c22e09cd1fa6a8be3cf706e2972))
* **l10n:** New Crowdin translations to review and merge ([#306](https://github.com/openfoodfacts/open-prices-frontend/issues/306)) ([23d48fb](https://github.com/openfoodfacts/open-prices-frontend/commit/23d48fb343d2d425fe5ef3e73f4e35563c4cc498))
* locale cleanup (update language list) ([#296](https://github.com/openfoodfacts/open-prices-frontend/issues/296)) ([7fd7e7d](https://github.com/openfoodfacts/open-prices-frontend/commit/7fd7e7d3a7a2cdc4e3d8f7a1901b28bb9208bfb5))
* remove additional raw categories (canned, frozen) ([#305](https://github.com/openfoodfacts/open-prices-frontend/issues/305)) ([97ded3b](https://github.com/openfoodfacts/open-prices-frontend/commit/97ded3b411bce01a73af3a8e68d3d269a9e34d0d))

## [1.37.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.36.1...v1.37.0) (2024-02-06)


### Features

* allow user to delete its own prices ([#287](https://github.com/openfoodfacts/open-prices-frontend/issues/287)) ([cdedf89](https://github.com/openfoodfacts/open-prices-frontend/commit/cdedf897504a592fc154d874c6c4342d527f1faf))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#284](https://github.com/openfoodfacts/open-prices-frontend/issues/284)) ([a547f87](https://github.com/openfoodfacts/open-prices-frontend/commit/a547f87dac970d53bf009c3a70dbe5255615a04e))
* **l10n:** New Crowdin translations to review and merge ([#288](https://github.com/openfoodfacts/open-prices-frontend/issues/288)) ([7d80bb5](https://github.com/openfoodfacts/open-prices-frontend/commit/7d80bb54cdb7f7f1e52874b9a148fe9ce0ec9700))

## [1.36.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.36.0...v1.36.1) (2024-02-05)


### Bug Fixes

* fix category list translation selection. ref [#275](https://github.com/openfoodfacts/open-prices-frontend/issues/275) ([0f59566](https://github.com/openfoodfacts/open-prices-frontend/commit/0f5956676d42bc197d3a4a31550683fb013b1bc4))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#282](https://github.com/openfoodfacts/open-prices-frontend/issues/282)) ([41ce5ce](https://github.com/openfoodfacts/open-prices-frontend/commit/41ce5ce603e507d101a697787090d9de2e59b676))

## [1.36.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.35.0...v1.36.0) (2024-02-04)


### Features

* add price_count to ProofCard (create new PriceCountChip component) ([#279](https://github.com/openfoodfacts/open-prices-frontend/issues/279)) ([a6f5276](https://github.com/openfoodfacts/open-prices-frontend/commit/a6f527616e3a984f3ec51d3cc30fd5c97b24f5e3))
* **l10n:** translate category list in price add form depending on user locale ([#275](https://github.com/openfoodfacts/open-prices-frontend/issues/275)) ([f821b75](https://github.com/openfoodfacts/open-prices-frontend/commit/f821b75967d66b3808b847a20067fc27721fb8c6))
* **proof card:** better display proofs ([#281](https://github.com/openfoodfacts/open-prices-frontend/issues/281)) ([04c554d](https://github.com/openfoodfacts/open-prices-frontend/commit/04c554d0f5f58c579c7a667007260feabfc469b7))
* script to filter and generate raw categories (with translations) ([#273](https://github.com/openfoodfacts/open-prices-frontend/issues/273)) ([7bed8b9](https://github.com/openfoodfacts/open-prices-frontend/commit/7bed8b9e7d7d7ce7a0759fdb1cd07ef738e49c85))


### Bug Fixes

* fix get category name ([#276](https://github.com/openfoodfacts/open-prices-frontend/issues/276)) ([57cd661](https://github.com/openfoodfacts/open-prices-frontend/commit/57cd661f0602a940184df7c5e36388f37f3124fa))
* **location selector:** filter out additional place types ([#268](https://github.com/openfoodfacts/open-prices-frontend/issues/268)) ([fcf9417](https://github.com/openfoodfacts/open-prices-frontend/commit/fcf94172ae6c05799edfcd710d1716fe4f348a13))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#270](https://github.com/openfoodfacts/open-prices-frontend/issues/270)) ([15bdfdc](https://github.com/openfoodfacts/open-prices-frontend/commit/15bdfdc743955f66ebf6ab77fb976b54357d1344))
* **l10n:** New Crowdin translations to review and merge ([#280](https://github.com/openfoodfacts/open-prices-frontend/issues/280)) ([f3eb581](https://github.com/openfoodfacts/open-prices-frontend/commit/f3eb58136ca9db0bb4f89501cb2714cf535ac965))

## [1.35.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.34.2...v1.35.0) (2024-02-01)


### Features

* add category price per unit toggle ([#266](https://github.com/openfoodfacts/open-prices-frontend/issues/266)) ([02c97c0](https://github.com/openfoodfacts/open-prices-frontend/commit/02c97c03e155ba49d799904b42d28b21099d5641))


### Technical

* **l10n:** fr and it translations ([#260](https://github.com/openfoodfacts/open-prices-frontend/issues/260)) ([8db68ed](https://github.com/openfoodfacts/open-prices-frontend/commit/8db68ed214b03d999cb95facf0df9739fdae6fb6))
* **l10n:** New Crowdin translations to review and merge ([#259](https://github.com/openfoodfacts/open-prices-frontend/issues/259)) ([038b9f5](https://github.com/openfoodfacts/open-prices-frontend/commit/038b9f5a373697ae50bb4c8e561edcc7f745ea79))
* **l10n:** New Crowdin translations to review and merge ([#264](https://github.com/openfoodfacts/open-prices-frontend/issues/264)) ([0d0368d](https://github.com/openfoodfacts/open-prices-frontend/commit/0d0368d16d2ea294d74e70494098b04c3d031c6d))
* **l10n:** New Crowdin translations to review and merge ([#269](https://github.com/openfoodfacts/open-prices-frontend/issues/269)) ([061f511](https://github.com/openfoodfacts/open-prices-frontend/commit/061f511c986cc429bfe3e175806b04a5fc5fde87))

## [1.34.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.34.1...v1.34.2) (2024-01-28)


### Bug Fixes

* **l10n:** fix japanese translation formatting error ([d48cefc](https://github.com/openfoodfacts/open-prices-frontend/commit/d48cefc8099d81fc4eeb5d6c4323765b6b506dd1))
* **l10n:** fix translation keys in Stats page ([8bea154](https://github.com/openfoodfacts/open-prices-frontend/commit/8bea154ae04b50d98b5d2cb78cb459917da8dee6))


### Technical

* improve setup instructions ([#246](https://github.com/openfoodfacts/open-prices-frontend/issues/246)) ([351b48c](https://github.com/openfoodfacts/open-prices-frontend/commit/351b48c5cf5135bfc4c21ae309e4a4dbe93f6c4a))
* **l10n:** New Crowdin translations to review and merge ([#254](https://github.com/openfoodfacts/open-prices-frontend/issues/254)) ([4c113b8](https://github.com/openfoodfacts/open-prices-frontend/commit/4c113b88886114a90ca95e4ab9a48de5b992049c))
* **l10n:** New Crowdin translations to review and merge ([#257](https://github.com/openfoodfacts/open-prices-frontend/issues/257)) ([866fe10](https://github.com/openfoodfacts/open-prices-frontend/commit/866fe1081c468ac3d4bbaadb23354281be8e8d76))
* new OpenFoodFacts button component ([#258](https://github.com/openfoodfacts/open-prices-frontend/issues/258)) ([b8a55f9](https://github.com/openfoodfacts/open-prices-frontend/commit/b8a55f910f8dffb19b0b8353c7452d503966d1b2))

## [1.34.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.34.0...v1.34.1) (2024-01-27)


### Technical

* **l10n:** New Crowdin translations to review and merge ([#247](https://github.com/openfoodfacts/open-prices-frontend/issues/247)) ([6d69cbd](https://github.com/openfoodfacts/open-prices-frontend/commit/6d69cbd000d724a2be490e8f174a6dac4a41811b))
* **l10n:** New Crowdin translations to review and merge ([#251](https://github.com/openfoodfacts/open-prices-frontend/issues/251)) ([616569a](https://github.com/openfoodfacts/open-prices-frontend/commit/616569a41acce6509a73a302d456005adff48480))
* **l10n:** New Crowdin translations to review and merge ([#252](https://github.com/openfoodfacts/open-prices-frontend/issues/252)) ([2de2916](https://github.com/openfoodfacts/open-prices-frontend/commit/2de2916623c3a8442750ca30c0f9882b420a378f))
* **l10n:** translation cleanup ([#250](https://github.com/openfoodfacts/open-prices-frontend/issues/250)) ([958f1b5](https://github.com/openfoodfacts/open-prices-frontend/commit/958f1b5d827af52eae91ba813f4df98d46696a36))

## [1.34.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.33.1...v1.34.0) (2024-01-27)


### Features

* **dashboard:** move prices to seperate page ([#244](https://github.com/openfoodfacts/open-prices-frontend/issues/244)) ([9711825](https://github.com/openfoodfacts/open-prices-frontend/commit/9711825640f1773b993708c7d781ed71e129ce17))
* **dashboard:** new page with user proofs ([#245](https://github.com/openfoodfacts/open-prices-frontend/issues/245)) ([c73b9d4](https://github.com/openfoodfacts/open-prices-frontend/commit/c73b9d42db48c64de8bbb842cc49333bca62cdec))
* **i18n:** Add new languages ([#241](https://github.com/openfoodfacts/open-prices-frontend/issues/241)) ([6c8f7f4](https://github.com/openfoodfacts/open-prices-frontend/commit/6c8f7f494c543ffa57887038efb005a4abde5d2f))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#240](https://github.com/openfoodfacts/open-prices-frontend/issues/240)) ([345a2b8](https://github.com/openfoodfacts/open-prices-frontend/commit/345a2b8555d0798c72c9570822c14202d85bd594))

## [1.33.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.33.0...v1.33.1) (2024-01-26)


### Bug Fixes

* reduce page header sizes ([#238](https://github.com/openfoodfacts/open-prices-frontend/issues/238)) ([5efeb73](https://github.com/openfoodfacts/open-prices-frontend/commit/5efeb733c56db6108f49317488b17d712c708535))

## [1.33.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.32.3...v1.33.0) (2024-01-26)


### Features

* **l10n:** create constants for app & OFF names ([#232](https://github.com/openfoodfacts/open-prices-frontend/issues/232)) ([ea71096](https://github.com/openfoodfacts/open-prices-frontend/commit/ea7109696a9658c213a419b0392c90125c132192))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#231](https://github.com/openfoodfacts/open-prices-frontend/issues/231)) ([2647bc1](https://github.com/openfoodfacts/open-prices-frontend/commit/2647bc1037e5cccd9bef023abd7c774fecff428c))
* **l10n:** New Crowdin translations to review and merge ([#235](https://github.com/openfoodfacts/open-prices-frontend/issues/235)) ([f227a2e](https://github.com/openfoodfacts/open-prices-frontend/commit/f227a2e8945589cf8d5eb8f4e0fdcb3b45400163))

## [1.32.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.32.2...v1.32.3) (2024-01-26)


### Bug Fixes

* **l10n:** router sign in translation ([f49c997](https://github.com/openfoodfacts/open-prices-frontend/commit/f49c997349646fc08cb83394d996094714fdceee))
* **stats:** fix home prices created today ([f48c4ce](https://github.com/openfoodfacts/open-prices-frontend/commit/f48c4cecb9fb8bb4b675685851392f7aab9ec15f))

## [1.32.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.32.1...v1.32.2) (2024-01-26)


### Bug Fixes

* Matomo url. ref [#100](https://github.com/openfoodfacts/open-prices-frontend/issues/100) ([521e3e0](https://github.com/openfoodfacts/open-prices-frontend/commit/521e3e03fea3080847c3f5c65cdb882f7b5a2e0f))
* **multiple create form:** rename proof to receipt ([12fb8b0](https://github.com/openfoodfacts/open-prices-frontend/commit/12fb8b0853fd0a429cf3683703ccd5b0520ef746))
* **PWA:** fix manifest prod config. ref [#193](https://github.com/openfoodfacts/open-prices-frontend/issues/193) ([192d286](https://github.com/openfoodfacts/open-prices-frontend/commit/192d286d231c859bced4def4f2137a15ebc9cd39))

## [1.32.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.32.0...v1.32.1) (2024-01-26)


### Bug Fixes

* fix Matomo script position. ref [#100](https://github.com/openfoodfacts/open-prices-frontend/issues/100) ([660faa3](https://github.com/openfoodfacts/open-prices-frontend/commit/660faa3e87566b36a609a1e8bfd16bfcf9ab63f4))
* install Matomo using vue-matomo instead. ref [#100](https://github.com/openfoodfacts/open-prices-frontend/issues/100) ([ea70610](https://github.com/openfoodfacts/open-prices-frontend/commit/ea7061038a5114eae953d3054fc4ef2f1b4bf1c0))
* **l10n:** add message about needing translations ([30caf64](https://github.com/openfoodfacts/open-prices-frontend/commit/30caf6449dbda3adf0da6e241bf4c4ddab6f190b))
* **PWA:** fix manifest config. ref [#193](https://github.com/openfoodfacts/open-prices-frontend/issues/193) ([5dbe3b9](https://github.com/openfoodfacts/open-prices-frontend/commit/5dbe3b9b1ab0dd89ee160d85b65482b8a475e118))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#226](https://github.com/openfoodfacts/open-prices-frontend/issues/226)) ([51fc3ab](https://github.com/openfoodfacts/open-prices-frontend/commit/51fc3ab970d8ceee4e64cb47d04d3ca650deeb08))

## [1.32.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.31.0...v1.32.0) (2024-01-25)


### Features

* add Matomo analytics. ref [#100](https://github.com/openfoodfacts/open-prices-frontend/issues/100) ([e4c7fd2](https://github.com/openfoodfacts/open-prices-frontend/commit/e4c7fd279be27db744d48afbd64b42df2f4449b6))


### Bug Fixes

* **home:** make 'Add a price' drawer menu blue. Fix home button height alignement ([e558cb5](https://github.com/openfoodfacts/open-prices-frontend/commit/e558cb5d3159f44a275fe22712882eb630d3e1c9))
* **multiple price form:** disable Done button until at least 1 product is uploaded. closes [#222](https://github.com/openfoodfacts/open-prices-frontend/issues/222) ([7220da0](https://github.com/openfoodfacts/open-prices-frontend/commit/7220da0865ab7441fb3a83f242ea35a8cb033bfc))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#219](https://github.com/openfoodfacts/open-prices-frontend/issues/219)) ([94da0a4](https://github.com/openfoodfacts/open-prices-frontend/commit/94da0a4bc92c782e198c2f8c7be687be6332ea09))
* **l10n:** New Crowdin translations to review and merge ([#221](https://github.com/openfoodfacts/open-prices-frontend/issues/221)) ([6daa8c2](https://github.com/openfoodfacts/open-prices-frontend/commit/6daa8c2d832712fc6f32668c4e9c05a58b6f6ff5))

## [1.31.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.30.4...v1.31.0) (2024-01-25)


### Features

* improve price discount (full_price not mandatory anymore) ([#218](https://github.com/openfoodfacts/open-prices-frontend/issues/218)) ([1c6d1d7](https://github.com/openfoodfacts/open-prices-frontend/commit/1c6d1d783343ad59e6b029873adc884e7ee6796b))


### Bug Fixes

* **location selector:** additional filtering on places returned ([7482f47](https://github.com/openfoodfacts/open-prices-frontend/commit/7482f475606b7e77c755984d1f2cfe9c25dd7ff5))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#216](https://github.com/openfoodfacts/open-prices-frontend/issues/216)) ([7e87e4b](https://github.com/openfoodfacts/open-prices-frontend/commit/7e87e4bae90ae6b3e8ed007b61ba8fe33eb65278))

## [1.30.4](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.30.3...v1.30.4) (2024-01-25)


### Bug Fixes

* **location selector:** hide administrative & city results. ([87a631b](https://github.com/openfoodfacts/open-prices-frontend/commit/87a631b1dc0adbd1c63f8c9d170e0c682f727d76))
* **location selector:** improve warning message. Add 'shop' ([0c78993](https://github.com/openfoodfacts/open-prices-frontend/commit/0c789933c9c4922f160f4fd383726f920fcef7ef))
* **price card:** add extra country flags ([8e962b8](https://github.com/openfoodfacts/open-prices-frontend/commit/8e962b8f72e17c099f45a6e826ecf7d91f85f569))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#214](https://github.com/openfoodfacts/open-prices-frontend/issues/214)) ([59e0fcd](https://github.com/openfoodfacts/open-prices-frontend/commit/59e0fcd833d5c925d95a5c981157b6a0c207e8d8))

## [1.30.3](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.30.2...v1.30.3) (2024-01-24)


### Bug Fixes

* **l10n:** move crowdin PRs to refactor instead of feat. ref [#159](https://github.com/openfoodfacts/open-prices-frontend/issues/159) ([20a44f4](https://github.com/openfoodfacts/open-prices-frontend/commit/20a44f45cfb63e56fc4c12b7d4ca5abb7b6134e9))
* **l10n:** New Crowdin translations to review and merge ([#209](https://github.com/openfoodfacts/open-prices-frontend/issues/209)) ([bd9ede0](https://github.com/openfoodfacts/open-prices-frontend/commit/bd9ede0b6c34e1dc49a3cd363d3db01d7c6b9cce))
* **location selector:** add help message if struggling to find location. ref [#212](https://github.com/openfoodfacts/open-prices-frontend/issues/212) ([376baeb](https://github.com/openfoodfacts/open-prices-frontend/commit/376baebdd40abf47e11942df4f7b4ab2d69fd1ad))
* **multiple create mode:** add warning message for receipts. ref [#212](https://github.com/openfoodfacts/open-prices-frontend/issues/212) ([2ee5b75](https://github.com/openfoodfacts/open-prices-frontend/commit/2ee5b757272990d778eceb371109efb890fef2c6))


### Technical

* **l10n:** New Crowdin translations to review and merge ([#211](https://github.com/openfoodfacts/open-prices-frontend/issues/211)) ([550c496](https://github.com/openfoodfacts/open-prices-frontend/commit/550c496e182ca0913bdb0d30fa75f353d736089b))
* **l10n:** New Crowdin translations to review and merge ([#213](https://github.com/openfoodfacts/open-prices-frontend/issues/213)) ([eaf7dc2](https://github.com/openfoodfacts/open-prices-frontend/commit/eaf7dc283c27bddf504506236baea29225e7359b))

## [1.30.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.30.1...v1.30.2) (2024-01-24)


### Bug Fixes

* **l10n:** rename en Top product title ([9eaffce](https://github.com/openfoodfacts/open-prices-frontend/commit/9eaffcea3cc05d5ca2970ccc08e5608d2a8ca4b3))

## [1.30.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.30.0...v1.30.1) (2024-01-24)


### Bug Fixes

* **price card:** reduce price footer chip padding ([4d88ae8](https://github.com/openfoodfacts/open-prices-frontend/commit/4d88ae81c39beff56240a89e5773c5a69a1e7782))

## [1.30.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.29.1...v1.30.0) (2024-01-24)


### Features

* **price card:** allow displaying price proofs (if is public) ([#205](https://github.com/openfoodfacts/open-prices-frontend/issues/205)) ([7758e6f](https://github.com/openfoodfacts/open-prices-frontend/commit/7758e6f186835b0dc2fe7cb474b2c9492dbc369a))


### Bug Fixes

* **l10n:** New Crowdin translations to review and merge ([#191](https://github.com/openfoodfacts/open-prices-frontend/issues/191)) ([53912ce](https://github.com/openfoodfacts/open-prices-frontend/commit/53912ce0445ad7dae5f29f8e7c36b5fee36c6572))
* **l10n:** New Crowdin translations to review and merge ([#204](https://github.com/openfoodfacts/open-prices-frontend/issues/204)) ([f5e4ebe](https://github.com/openfoodfacts/open-prices-frontend/commit/f5e4ebe99eebc78e0a373066dfb8013cd66131e2))

## [1.29.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.29.0...v1.29.1) (2024-01-24)


### Bug Fixes

* **share:** fix share url again. ref [#200](https://github.com/openfoodfacts/open-prices-frontend/issues/200) ([f467d68](https://github.com/openfoodfacts/open-prices-frontend/commit/f467d68ef2883d608eb971022ad3d31fc1dcd069))

## [1.29.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.28.1...v1.29.0) (2024-01-24)


### Features

* **home:** show action buttons as cards ([28d9b78](https://github.com/openfoodfacts/open-prices-frontend/commit/28d9b7825fc9bbdc7776b9d6381dae398ad01056))
* **home:** show sign in message if user anonymous ([4e49d4f](https://github.com/openfoodfacts/open-prices-frontend/commit/4e49d4faa262588d17feb4a507a7ea263ee14b56))
* **share:** add new button to other detail pages ([#201](https://github.com/openfoodfacts/open-prices-frontend/issues/201)) ([d991460](https://github.com/openfoodfacts/open-prices-frontend/commit/d9914604e7cb282e71ff5fd9f6b700af1897f14a))
* **share:** move button to dedicated component. fix url ([#200](https://github.com/openfoodfacts/open-prices-frontend/issues/200)) ([9f33984](https://github.com/openfoodfacts/open-prices-frontend/commit/9f33984abc19772dc73ab0aaf4bb66d13f2422ed))
* **share:** simple share button on Product Detail ([#199](https://github.com/openfoodfacts/open-prices-frontend/issues/199)) ([2df86eb](https://github.com/openfoodfacts/open-prices-frontend/commit/2df86eb36973c660be96167cf5531eda65511d3f))
* show today new price count on home page ([c163e34](https://github.com/openfoodfacts/open-prices-frontend/commit/c163e348249a303862abd97091b5da7d41e099cf))


### Bug Fixes

* **multiple price form:** cosmetic fixes ([cd235d1](https://github.com/openfoodfacts/open-prices-frontend/commit/cd235d11385ab0bf333c5e56d6a75c85243734df))


### Technical

* update gitignore ([#198](https://github.com/openfoodfacts/open-prices-frontend/issues/198)) ([dc79e02](https://github.com/openfoodfacts/open-prices-frontend/commit/dc79e02025f541acc84c4e17732e27a8d27b9620))

## [1.28.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.28.0...v1.28.1) (2024-01-23)


### Bug Fixes

* **multiple create form:** show new price form immediately after upload ([e5e89c9](https://github.com/openfoodfacts/open-prices-frontend/commit/e5e89c9b19e1b230c969a4e07175bb5c06ea8e9b))
* **price card:** fix price per kilo display. broken in [#195](https://github.com/openfoodfacts/open-prices-frontend/issues/195) ([27af696](https://github.com/openfoodfacts/open-prices-frontend/commit/27af69663aab9d8042d9965486db31756623ee29))
* **search:** fix button display and drawer order. ref [#195](https://github.com/openfoodfacts/open-prices-frontend/issues/195) ([a02953f](https://github.com/openfoodfacts/open-prices-frontend/commit/a02953f70be91e75acda9e76c11d26886b9c2ffa))

## [1.28.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.27.1...v1.28.0) (2024-01-23)


### Features

* **PWA:** improve manifest configuration ([#193](https://github.com/openfoodfacts/open-prices-frontend/issues/193)) ([f64990f](https://github.com/openfoodfacts/open-prices-frontend/commit/f64990f36893acc704db595341b346bdfafd05d2))
* **search:** basic product search page by barcode ([#195](https://github.com/openfoodfacts/open-prices-frontend/issues/195)) ([f8f6b70](https://github.com/openfoodfacts/open-prices-frontend/commit/f8f6b70c7bb5989a3abeae97e9b12a9cd7feef07))

## [1.27.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.27.0...v1.27.1) (2024-01-22)


### Bug Fixes

* **price card:** fix price parsing ([3204df8](https://github.com/openfoodfacts/open-prices-frontend/commit/3204df8cd224711505c8e487bd0f8cf749fa2afd))

## [1.27.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.26.0...v1.27.0) (2024-01-22)


### Features

* **l10n:** New Crowdin translations to review and merge ([#189](https://github.com/openfoodfacts/open-prices-frontend/issues/189)) ([61383c8](https://github.com/openfoodfacts/open-prices-frontend/commit/61383c81f11cb76a006ae8bdc9685e0132fbc1d8))
* **price create form:** add green check marks next to filled in cards ([a337052](https://github.com/openfoodfacts/open-prices-frontend/commit/a3370525f71ec646d8c770c431ab4d6ede9807ee))
* **price create form:** manual barcode: focus input, show number keyboard ([e547914](https://github.com/openfoodfacts/open-prices-frontend/commit/e547914f057fb979c49e21daa7f94c673f1db6a0))


### Bug Fixes

* **multiple create form:** fix display price currency ([87af5c1](https://github.com/openfoodfacts/open-prices-frontend/commit/87af5c1ffaf83a48ddaf339442f548ccd657ba86))

## [1.26.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.25.0...v1.26.0) (2024-01-22)


### Features

* **l10n:** New Crowdin translations to review and merge ([#184](https://github.com/openfoodfacts/open-prices-frontend/issues/184)) ([00a96c5](https://github.com/openfoodfacts/open-prices-frontend/commit/00a96c502cd8b84d3c76a62647d67c90904bd072))
* **multiple create form:** disable proof & location steps when first price uploaded ([7db5e26](https://github.com/openfoodfacts/open-prices-frontend/commit/7db5e2661e0135fd1fd6d8bdb14d8c644eb5b6ae))
* **multiple create form:** seperate Receipt & Price tag modes ([#188](https://github.com/openfoodfacts/open-prices-frontend/issues/188)) ([b2c6113](https://github.com/openfoodfacts/open-prices-frontend/commit/b2c611352abfd254786cec9b5c168878e060accb))
* **price create form:** make location selected chip greener ([ec175cc](https://github.com/openfoodfacts/open-prices-frontend/commit/ec175cc06be11d62c04dc1588d6b8e2331ac3b0f))


### Bug Fixes

* add new categories ([#187](https://github.com/openfoodfacts/open-prices-frontend/issues/187)) ([e65d00e](https://github.com/openfoodfacts/open-prices-frontend/commit/e65d00e181634fca04d22fcdb34d6485dba26627))
* **l10n:** revert crowdin commit naming. ref [#174](https://github.com/openfoodfacts/open-prices-frontend/issues/174) ([16e2c8e](https://github.com/openfoodfacts/open-prices-frontend/commit/16e2c8e9efcb56981f9c8d1c5e483f79c002a247))
* **multiple create form:** improve button colors ([ccf6207](https://github.com/openfoodfacts/open-prices-frontend/commit/ccf62073b06474ce9b103596bf5db2a625346940))
* **multiple create form:** improve proof icons. ref [#188](https://github.com/openfoodfacts/open-prices-frontend/issues/188) ([83dc790](https://github.com/openfoodfacts/open-prices-frontend/commit/83dc79090df0019ed901219fd9c398bff994ba65))

## [1.25.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.24.2...v1.25.0) (2024-01-21)


### Features

* **batch create form:** first simple batch mode to add multiple prices from a single proof ([#182](https://github.com/openfoodfacts/open-prices-frontend/issues/182)) ([5847d1d](https://github.com/openfoodfacts/open-prices-frontend/commit/5847d1d7fb7dff5b29678ceda54069d4389614c3))
* **l10n:** New Crowdin translations to review and merge ([#180](https://github.com/openfoodfacts/open-prices-frontend/issues/180)) ([750a0ab](https://github.com/openfoodfacts/open-prices-frontend/commit/750a0ab5acf6dfdd1c09e1fd7b3d31df63d21a33))

## [1.24.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.24.1...v1.24.2) (2024-01-18)


### Bug Fixes

* **l10n:** avoid mixing capital letters in titles (en) ([8c539c6](https://github.com/openfoodfacts/open-prices-frontend/commit/8c539c6bbddc1082e5357b53dd257c8efea421af))
* **l10n:** New Crowdin translations to review and merge ([#176](https://github.com/openfoodfacts/open-prices-frontend/issues/176)) ([0d2439b](https://github.com/openfoodfacts/open-prices-frontend/commit/0d2439be69b451850c96f2d7717d29c86e2eabb1))
* **price create form:** tentative fix to show camera directly again. ref [#170](https://github.com/openfoodfacts/open-prices-frontend/issues/170) ([33cf753](https://github.com/openfoodfacts/open-prices-frontend/commit/33cf75362bb4ffd311f43d1cc813211b1d9e930c))

## [1.24.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.24.0...v1.24.1) (2024-01-18)


### Bug Fixes

* **l10n:** fix missing translation keys in LocationList & UserList ([6e5dcbe](https://github.com/openfoodfacts/open-prices-frontend/commit/6e5dcbe5704865da82c3f532095df9ce3b73008d))

## [1.24.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.23.0...v1.24.0) (2024-01-18)


### Features

* **l10n:** New Crowdin translations to review and merge ([#166](https://github.com/openfoodfacts/open-prices-frontend/issues/166)) ([289cfaf](https://github.com/openfoodfacts/open-prices-frontend/commit/289cfaf8063de60767a21a566bd15ffa96b1dcce))
* **l10n:** New Crowdin translations to review and merge ([#175](https://github.com/openfoodfacts/open-prices-frontend/issues/175)) ([d8e7c15](https://github.com/openfoodfacts/open-prices-frontend/commit/d8e7c1548279fba1bd6f452301e7e1898571eb0f))
* **price card:** show discount tag with tooltip ([#173](https://github.com/openfoodfacts/open-prices-frontend/issues/173)) ([7e4e8e3](https://github.com/openfoodfacts/open-prices-frontend/commit/7e4e8e3c0d78cf2c6fa4b07e958326cd99a17b54))
* **price create form:** allow uploading heic images. ref [#170](https://github.com/openfoodfacts/open-prices-frontend/issues/170) ([b61c133](https://github.com/openfoodfacts/open-prices-frontend/commit/b61c1336e2c3760ef226750bbf501cbe75a599f8))
* **price create form:** init form with code param from product detail CTA ([#168](https://github.com/openfoodfacts/open-prices-frontend/issues/168)) ([55c6c87](https://github.com/openfoodfacts/open-prices-frontend/commit/55c6c8757ba6188930d95f9741c510e89356576d))
* **price create form:** manage discounted prices ([#171](https://github.com/openfoodfacts/open-prices-frontend/issues/171)) ([c7ba641](https://github.com/openfoodfacts/open-prices-frontend/commit/c7ba641e488dc57654d779324e698e27e8b3b709))


### Bug Fixes

* **i18n:** fix i18n template labels. ref [#154](https://github.com/openfoodfacts/open-prices-frontend/issues/154) ([b5d4282](https://github.com/openfoodfacts/open-prices-frontend/commit/b5d4282cebe574f6d973d076489c51196d92a25d))
* **l10n:** change config to simplify PR from crowdin ([#174](https://github.com/openfoodfacts/open-prices-frontend/issues/174)) ([4813986](https://github.com/openfoodfacts/open-prices-frontend/commit/48139862f1591d2b11b3691a8956819f86711d8a))
* **price create form:** fix product init from code param (hide error msg). ref [#168](https://github.com/openfoodfacts/open-prices-frontend/issues/168) ([d4a356e](https://github.com/openfoodfacts/open-prices-frontend/commit/d4a356e315911428b681e3ee0b5873267352fd96))

## [1.23.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.22.0...v1.23.0) (2024-01-17)


### Features

* **price create form:** allow typing the barcode manually ([#164](https://github.com/openfoodfacts/open-prices-frontend/issues/164)) ([04ec270](https://github.com/openfoodfacts/open-prices-frontend/commit/04ec270264326eb6cdd8d566988450246c95e46f))
* **price create form:** allow uploading proof image from gallery ([#162](https://github.com/openfoodfacts/open-prices-frontend/issues/162)) ([b81f649](https://github.com/openfoodfacts/open-prices-frontend/commit/b81f6493d657decf7fcfaad83b6517b1612639a6))


### Bug Fixes

* typo in proof from gallery action. ref [#162](https://github.com/openfoodfacts/open-prices-frontend/issues/162) ([88d7591](https://github.com/openfoodfacts/open-prices-frontend/commit/88d759131a35975763031678462aed36a7df156b))

## [1.22.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.21.0...v1.22.0) (2024-01-17)


### Features

* **i18n:** add i18n configuration (French translation + language selector in user settings) ([#154](https://github.com/openfoodfacts/open-prices-frontend/issues/154)) ([fe3f54d](https://github.com/openfoodfacts/open-prices-frontend/commit/fe3f54de2902393ffd45e4c036318e2fbb30aea0))
* **i18n:** add languages de nl it pt and update es fr ([#160](https://github.com/openfoodfacts/open-prices-frontend/issues/160)) ([07f4a26](https://github.com/openfoodfacts/open-prices-frontend/commit/07f4a2606bd50265b6b5e8fd4c4c2bfcbf7987ce))
* **i18n:** Crowdin config ([#159](https://github.com/openfoodfacts/open-prices-frontend/issues/159)) ([c560680](https://github.com/openfoodfacts/open-prices-frontend/commit/c560680efbd9480424083a832b9f33af9e2c1581))
* **l10n:** init Crowdin ([#161](https://github.com/openfoodfacts/open-prices-frontend/issues/161)) ([9a0c8cd](https://github.com/openfoodfacts/open-prices-frontend/commit/9a0c8cdfe456f50058f1a2351f7d68e4712a2505))
* **l10n:** New Crowdin translations to review and merge ([#163](https://github.com/openfoodfacts/open-prices-frontend/issues/163)) ([4bb66e9](https://github.com/openfoodfacts/open-prices-frontend/commit/4bb66e9efa303a18f376dfac37988c7bff701144))
* new api to get the proofs ([#155](https://github.com/openfoodfacts/open-prices-frontend/issues/155)) ([8d1cdea](https://github.com/openfoodfacts/open-prices-frontend/commit/8d1cdea4f3cc2cdb5fe95c603dbe9fa9b3ab1268))


### Bug Fixes

* fix 'category not found' message showing up in ProductDetail ([484f092](https://github.com/openfoodfacts/open-prices-frontend/commit/484f0923e598aca167ecd9e38afce4148f7439da))
* fix goToProduct category from PriceCard. closes [#158](https://github.com/openfoodfacts/open-prices-frontend/issues/158) ([0e0fbd4](https://github.com/openfoodfacts/open-prices-frontend/commit/0e0fbd4cbc956c6711d0c2956d443ec542a38efc))
* **l10n:** fix crowdin pr naming ([151f11a](https://github.com/openfoodfacts/open-prices-frontend/commit/151f11ad630a4fcb10b36517dca29370303470cb))

## [1.21.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.20.0...v1.21.0) (2024-01-15)


### Features

* add loading action to Load more buttons ([3423eda](https://github.com/openfoodfacts/open-prices-frontend/commit/3423edaeca5d6178285bea9f494ae1af78bc1846))
* final change on product & price labels ([71b650b](https://github.com/openfoodfacts/open-prices-frontend/commit/71b650bdf52a94c432edb959c059fb235d43981b))
* improve again product & price counts. add spacing ([a5fa91e](https://github.com/openfoodfacts/open-prices-frontend/commit/a5fa91e4338999a13079fb661f3faf8c5f2ad945))
* **stats:** new user total stats ([#151](https://github.com/openfoodfacts/open-prices-frontend/issues/151)) ([1d8731c](https://github.com/openfoodfacts/open-prices-frontend/commit/1d8731ce33b152c1867b766888078d10998ffd9e))

## [1.20.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.19.0...v1.20.0) (2024-01-14)


### Features

* improve price & product count chip labels ([704c056](https://github.com/openfoodfacts/open-prices-frontend/commit/704c0563c232c8d9edeed80f13fa8c1a2198aeeb))
* new api to get the user list ([#148](https://github.com/openfoodfacts/open-prices-frontend/issues/148)) ([6c473c6](https://github.com/openfoodfacts/open-prices-frontend/commit/6c473c6c0ca4e764e28044013a308c3824108b47))
* **user list:** new user list page ordered by price_count ([#150](https://github.com/openfoodfacts/open-prices-frontend/issues/150)) ([825e444](https://github.com/openfoodfacts/open-prices-frontend/commit/825e4443835675586ce5b5116c6b5dc2b5b7dcd2))


### Bug Fixes

* **user list:** fix link to user detail page. ref [#150](https://github.com/openfoodfacts/open-prices-frontend/issues/150) ([0347d54](https://github.com/openfoodfacts/open-prices-frontend/commit/0347d5444b8e72989df132770bef366dc288fa1f))

## [1.19.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.18.0...v1.19.0) (2024-01-14)


### Features

* **product detail:** add CTA to add a price ([cc1e9fa](https://github.com/openfoodfacts/open-prices-frontend/commit/cc1e9fa096bee8978efd8f0dd750f6c1e8b16068))


### Bug Fixes

* **brand detail:** fix reset list on order change. ref [#142](https://github.com/openfoodfacts/open-prices-frontend/issues/142) ([ec9fd9a](https://github.com/openfoodfacts/open-prices-frontend/commit/ec9fd9ab004f801ff89c47b9a9f3da8f7b2a3cdb))

## [1.18.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.17.0...v1.18.0) (2024-01-14)


### Features

* **location list:** new location list page ordered by price_count ([#145](https://github.com/openfoodfacts/open-prices-frontend/issues/145)) ([96aa72c](https://github.com/openfoodfacts/open-prices-frontend/commit/96aa72cbf475dc38cadf3d77fdeb82273e5e499e))

## [1.17.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.16.2...v1.17.0) (2024-01-14)


### Features

* **brand detail:** add order & filter buttons ([#142](https://github.com/openfoodfacts/open-prices-frontend/issues/142)) ([120851f](https://github.com/openfoodfacts/open-prices-frontend/commit/120851f6e60454a0e5d70e0898336c384b4ff8c5))
* **brand detail:** move product count to chip ([6fa885f](https://github.com/openfoodfacts/open-prices-frontend/commit/6fa885f28d5c5849a48e731c4f054975e7fd6b03))
* **location detail:** move price count to chip ([0ad9d5a](https://github.com/openfoodfacts/open-prices-frontend/commit/0ad9d5a3069ba2527f4f94648e24c623b588a401))
* new api to get the location list ([#138](https://github.com/openfoodfacts/open-prices-frontend/issues/138)) ([130c3b1](https://github.com/openfoodfacts/open-prices-frontend/commit/130c3b1d84db22fd19242f885623a62fd8a9c096))
* **stats:** new location total stat ([#140](https://github.com/openfoodfacts/open-prices-frontend/issues/140)) ([05af0b2](https://github.com/openfoodfacts/open-prices-frontend/commit/05af0b2b1e7e844136b7ce06ecce355b1588f027))
* **user detail:** move price count to chip ([8418a77](https://github.com/openfoodfacts/open-prices-frontend/commit/8418a7726e066280e4f1db8af6132f69a17b85ac))


### Bug Fixes

* **brand detail:** fix brand product filter. ref [#142](https://github.com/openfoodfacts/open-prices-frontend/issues/142) ([59d062f](https://github.com/openfoodfacts/open-prices-frontend/commit/59d062fd95ce81addcd51cb33acf69133b5834ec))

## [1.16.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.16.1...v1.16.2) (2024-01-12)


### Bug Fixes

* **stats:** typo again in product total. ref [#134](https://github.com/openfoodfacts/open-prices-frontend/issues/134) ([b721b80](https://github.com/openfoodfacts/open-prices-frontend/commit/b721b802de813a6e6dec8f773b1694874985ff78))

## [1.16.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.16.0...v1.16.1) (2024-01-12)


### Bug Fixes

* **stats:** typo in product total. ref [#134](https://github.com/openfoodfacts/open-prices-frontend/issues/134) ([ab44506](https://github.com/openfoodfacts/open-prices-frontend/commit/ab44506015c62fa729839c22626dae1a5d713727))

## [1.16.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.15.0...v1.16.0) (2024-01-12)


### Features

* **stats:** new stats on products (total & with prices) ([#134](https://github.com/openfoodfacts/open-prices-frontend/issues/134)) ([ffaafa2](https://github.com/openfoodfacts/open-prices-frontend/commit/ffaafa2834790fc1f202497c393aead5b50cd034))
* **stats:** show number of products with at least 1 price. ref [#50](https://github.com/openfoodfacts/open-prices-frontend/issues/50) ([231f158](https://github.com/openfoodfacts/open-prices-frontend/commit/231f1585178e6e536813e5234b50d155b8cfc6d6))

## [1.15.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.14.0...v1.15.0) (2024-01-12)


### Features

* **price create form:** on barcode scan, fetch product details from OP (instead of OFF) ([#132](https://github.com/openfoodfacts/open-prices-frontend/issues/132)) ([4b7b60e](https://github.com/openfoodfacts/open-prices-frontend/commit/4b7b60e7ec4b0a3089d59fa00ac8a034763d3298))
* **product card:** new ProductCard, seperate with PriceCard ([#131](https://github.com/openfoodfacts/open-prices-frontend/issues/131)) ([3460119](https://github.com/openfoodfacts/open-prices-frontend/commit/34601196ec7df493e6208e02c1b7218740ed71d3))
* **product list:** add filter to hide products with prices ([#130](https://github.com/openfoodfacts/open-prices-frontend/issues/130)) ([ba861aa](https://github.com/openfoodfacts/open-prices-frontend/commit/ba861aad01bda3d4055243fe3645bb577e3a5841))
* **product list:** add order button to toggle between scan & price count ([#128](https://github.com/openfoodfacts/open-prices-frontend/issues/128)) ([b251029](https://github.com/openfoodfacts/open-prices-frontend/commit/b2510293f2eb06bc966379cf5b407bc8ced5344a))

## [1.14.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.13.0...v1.14.0) (2024-01-12)


### Features

* **price card:** clicking on image goes to product page ([ed4a6a2](https://github.com/openfoodfacts/open-prices-frontend/commit/ed4a6a28616bbf5adb61e2dc410be7cd2798173b))
* **price card:** option to hide product code ([eb5d6e3](https://github.com/openfoodfacts/open-prices-frontend/commit/eb5d6e3e83fc60f7cc3d0b93452cfb95805b91e2))
* **price card:** show product price_count ([#127](https://github.com/openfoodfacts/open-prices-frontend/issues/127)) ([c9e35df](https://github.com/openfoodfacts/open-prices-frontend/commit/c9e35dff4807454b1704b9a7ee8a3efb97514a26))


### Bug Fixes

* **product detail:** avoid eror message flickr before loading ([78f7092](https://github.com/openfoodfacts/open-prices-frontend/commit/78f7092e7fe3ed5919d8a2ae81c5e645e861b9ba))
* **product list:** fix broken link to product detail. ref [#113](https://github.com/openfoodfacts/open-prices-frontend/issues/113) ([096097b](https://github.com/openfoodfacts/open-prices-frontend/commit/096097b36487e26692e95c385971d022b59b92f6))

## [1.13.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.12.0...v1.13.0) (2024-01-10)


### Features

* **brand detail:** new Brand detail page ([#116](https://github.com/openfoodfacts/open-prices-frontend/issues/116)) ([000c305](https://github.com/openfoodfacts/open-prices-frontend/commit/000c30527009396113a746ead0d9470f2975df65))
* **product list:** new product list page ordered by popularity (unique_scans_n) ([#113](https://github.com/openfoodfacts/open-prices-frontend/issues/113)) ([f090b32](https://github.com/openfoodfacts/open-prices-frontend/commit/f090b32b12dbef0eca0b1f2231da00942745c30a))

## [1.12.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.11.0...v1.12.0) (2024-01-09)


### Features

* new api to get the product list ([#114](https://github.com/openfoodfacts/open-prices-frontend/issues/114)) ([4504f4e](https://github.com/openfoodfacts/open-prices-frontend/commit/4504f4e255d2e653df6654cf2bfe8143553dac77))
* **price create form:** hide currency selector ([#122](https://github.com/openfoodfacts/open-prices-frontend/issues/122)) ([fa53702](https://github.com/openfoodfacts/open-prices-frontend/commit/fa5370239f98582450aa5a56371220c60611e024))
* **price create form:** improve location selector (remove button, location name, fixes) ([#119](https://github.com/openfoodfacts/open-prices-frontend/issues/119)) ([26522b2](https://github.com/openfoodfacts/open-prices-frontend/commit/26522b2b1c50312a7bfd9a3ecd8c8575906c09b4))
* **user settings:** new user settings page ([#121](https://github.com/openfoodfacts/open-prices-frontend/issues/121)) ([7abadd6](https://github.com/openfoodfacts/open-prices-frontend/commit/7abadd6c5cb0b33d5209e52516ad92ebdd90c368))


### Bug Fixes

* **price create form:** remove card subtitles ([d19a1dc](https://github.com/openfoodfacts/open-prices-frontend/commit/d19a1dce741b39664f8b77fe529c3191367bc9d7))

## [1.11.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.10.0...v1.11.0) (2024-01-07)


### Features

* **price create form:** init location with last recent ([#111](https://github.com/openfoodfacts/open-prices-frontend/issues/111)) ([e660b7d](https://github.com/openfoodfacts/open-prices-frontend/commit/e660b7db831ce6561760d94d0ae10484122e025c))


### Bug Fixes

* **price card:** split product brands into seperate labels ([#109](https://github.com/openfoodfacts/open-prices-frontend/issues/109)) ([187a549](https://github.com/openfoodfacts/open-prices-frontend/commit/187a5491d521a8bc667c409ee19bc07afad3fa4b))

## [1.10.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.9.1...v1.10.0) (2024-01-07)


### Features

* **price create form:** move product scanning first ([#102](https://github.com/openfoodfacts/open-prices-frontend/issues/102)) ([38535f6](https://github.com/openfoodfacts/open-prices-frontend/commit/38535f63efa7d99ac6b6b7475528e14eb6570ed1))
* **product page:** change url (code instead of id) ([#108](https://github.com/openfoodfacts/open-prices-frontend/issues/108)) ([23534f2](https://github.com/openfoodfacts/open-prices-frontend/commit/23534f20a4d55f5f189470f36d1d65f05bb37b59))


### Bug Fixes

* **price card:** improve created date info (further weeks, remove ago, tooltip) ([#107](https://github.com/openfoodfacts/open-prices-frontend/issues/107)) ([a83d24b](https://github.com/openfoodfacts/open-prices-frontend/commit/a83d24b9e24010bdd863e6b2fe09ba6ca2d4b14b))
* **price card:** make bottom labels smaller ([#105](https://github.com/openfoodfacts/open-prices-frontend/issues/105)) ([ffb26a6](https://github.com/openfoodfacts/open-prices-frontend/commit/ffb26a6e2878a7d1242908e30489cd84ec5f5659))
* **price card:** show location flag at the end ([#106](https://github.com/openfoodfacts/open-prices-frontend/issues/106)) ([1fc9c79](https://github.com/openfoodfacts/open-prices-frontend/commit/1fc9c797daeebc500a75000fece2a8f79ffd8ee1))

## [1.9.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.9.0...v1.9.1) (2024-01-03)


### Technical

* update categories ([#96](https://github.com/openfoodfacts/open-prices-frontend/issues/96)) ([129d852](https://github.com/openfoodfacts/open-prices-frontend/commit/129d852bb29c01ab10c24b40589f08696f1e189d))

## [1.9.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.8.0...v1.9.0) (2023-12-31)


### Features

* add favicon & metatags ([#92](https://github.com/openfoodfacts/open-prices-frontend/issues/92)) ([011f8b3](https://github.com/openfoodfacts/open-prices-frontend/commit/011f8b3b0ea32561861aa9f11b7b2115dba3cc19))
* add PWA manifest.json config ([#93](https://github.com/openfoodfacts/open-prices-frontend/issues/93)) ([c01c7cb](https://github.com/openfoodfacts/open-prices-frontend/commit/c01c7cbde188d1c1e0b39d9a5b914352d1c10ab1))
* fetch latest prices by batches of 10 + load more button ([#89](https://github.com/openfoodfacts/open-prices-frontend/issues/89)) ([4c1581f](https://github.com/openfoodfacts/open-prices-frontend/commit/4c1581f0714e18561f4c7b61bf9f61bedbc12aa5))
* **product detail:** manage category tags ([#91](https://github.com/openfoodfacts/open-prices-frontend/issues/91)) ([682c3ea](https://github.com/openfoodfacts/open-prices-frontend/commit/682c3ead29512c5c3adb377751deaee75efcba58))


### Bug Fixes

* PWA config for preprod & prod. ref [#93](https://github.com/openfoodfacts/open-prices-frontend/issues/93) ([f4c4984](https://github.com/openfoodfacts/open-prices-frontend/commit/f4c4984c0a9dbc01b035d723def17422a25acc15))

## [1.8.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.7.0...v1.8.0) (2023-12-29)


### Features

* **price card:** add label tags ([#83](https://github.com/openfoodfacts/open-prices-frontend/issues/83)) ([0b9c1f0](https://github.com/openfoodfacts/open-prices-frontend/commit/0b9c1f0c5a955b32ce5ef1cb2312abc2b1485642))
* **price card:** add origin tag info ([#86](https://github.com/openfoodfacts/open-prices-frontend/issues/86)) ([8e8f359](https://github.com/openfoodfacts/open-prices-frontend/commit/8e8f3596382de05f25e84666352e14b0a1213bd8))
* **price create form:** add label organic ([#82](https://github.com/openfoodfacts/open-prices-frontend/issues/82)) ([e6c520a](https://github.com/openfoodfacts/open-prices-frontend/commit/e6c520ace4be5eb875e388997130030f4e21dd30))
* **price create form:** add origin field ([#85](https://github.com/openfoodfacts/open-prices-frontend/issues/85)) ([6c87093](https://github.com/openfoodfacts/open-prices-frontend/commit/6c870937039d0b418b5ccb602dc1405edff0e7be))

## [1.7.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.6.0...v1.7.0) (2023-12-29)


### Features

* **location detail:** add country flag ([#81](https://github.com/openfoodfacts/open-prices-frontend/issues/81)) ([62c9bb7](https://github.com/openfoodfacts/open-prices-frontend/commit/62c9bb7752f829499e1d917ce1858081fc6fc19e))
* **price card:** improve look & feel ([#77](https://github.com/openfoodfacts/open-prices-frontend/issues/77)) ([3151439](https://github.com/openfoodfacts/open-prices-frontend/commit/31514392bd1a6af5044474ffd69b5a7c6c1ac5a9))
* **price card:** show location country flag ([#80](https://github.com/openfoodfacts/open-prices-frontend/issues/80)) ([d2f6b31](https://github.com/openfoodfacts/open-prices-frontend/commit/d2f6b31db696ce5b528743680a92268135539589))
* **price create form:** add support for raw categories ([#74](https://github.com/openfoodfacts/open-prices-frontend/issues/74)) ([af1d357](https://github.com/openfoodfacts/open-prices-frontend/commit/af1d3577cfe07dec93bd9af45f256b2f757ffc0f))
* **price create form:** homogenize proof/product/location add buttons ([61d3a0e](https://github.com/openfoodfacts/open-prices-frontend/commit/61d3a0eb15e813403e20c4565d1dd25a0867b06c))
* **price create form:** improve location selector search box, better display results, filter out parkings ([d845f52](https://github.com/openfoodfacts/open-prices-frontend/commit/d845f52412c8290998ee3f0aff1f5eee40475439))
* **price create form:** make price card readonly, improve mode chips ([0c783f8](https://github.com/openfoodfacts/open-prices-frontend/commit/0c783f8ad99a673e52e7e15c8c8ee3d027a1021f))
* **user detail:** new basic User detail page ([#78](https://github.com/openfoodfacts/open-prices-frontend/issues/78)) ([021a655](https://github.com/openfoodfacts/open-prices-frontend/commit/021a655d1567d4b3aaa6c101cfb026a1ca4c48c9))

## [1.6.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.5.0...v1.6.0) (2023-12-26)


### Features

* **price create form:** improve wording and layout. hide barcode field in non-dev ([88107db](https://github.com/openfoodfacts/open-prices-frontend/commit/88107db03a047fe5a649a5e586754bc4a82a2bfe))
* **price create form:** on barcode scan, fetch product details from OFF ([#73](https://github.com/openfoodfacts/open-prices-frontend/issues/73)) ([923adeb](https://github.com/openfoodfacts/open-prices-frontend/commit/923adeb960639ae9f12dc2800a5c2e0fae89dccf))

## [1.5.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.4.0...v1.5.0) (2023-12-26)


### Features

* clicking on header goes to home page ([764357a](https://github.com/openfoodfacts/open-prices-frontend/commit/764357af575bf263ba47b2438f68aa4eb95aa9ec))
* **price create form:** change proof upload icons (camera) ([137cec0](https://github.com/openfoodfacts/open-prices-frontend/commit/137cec0308fc0ebfec63d312e782a8d8ea2f7f5d))


### Bug Fixes

* rename Last to Latest (prices) ([8632b8e](https://github.com/openfoodfacts/open-prices-frontend/commit/8632b8e33ace1982a479d41820594962d2740e3f))


### Technical

* continue replacing current localStorage usage with new store ([#71](https://github.com/openfoodfacts/open-prices-frontend/issues/71)) ([2bbdd3c](https://github.com/openfoodfacts/open-prices-frontend/commit/2bbdd3cfacdb0747f2aef84655bb0dd67e511f67))
* move router config to router.js ([8aa6c05](https://github.com/openfoodfacts/open-prices-frontend/commit/8aa6c0543bf2d5891e4a5c23ee9371e853e5d4e2))
* persist store to localstorage ([#70](https://github.com/openfoodfacts/open-prices-frontend/issues/70)) ([9b44534](https://github.com/openfoodfacts/open-prices-frontend/commit/9b44534f5c3b4bff560860cf3d0f9c44de876ae3))
* replace cookie storage with a store (pinia) ([#69](https://github.com/openfoodfacts/open-prices-frontend/issues/69)) ([39ffc25](https://github.com/openfoodfacts/open-prices-frontend/commit/39ffc25090e82ec817cc5cf93b8202e41e45e585))

## [1.4.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.3.1...v1.4.0) (2023-12-25)


### Features

* **user page:** new basic Dashboard ([#63](https://github.com/openfoodfacts/open-prices-frontend/issues/63)) ([fe6d730](https://github.com/openfoodfacts/open-prices-frontend/commit/fe6d7305e8757c5e832c6693b5751a1446063451))

## [1.3.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.3.0...v1.3.1) (2023-12-24)


### Bug Fixes

* **location detail:** show error message if not found in OSM. ref [#60](https://github.com/openfoodfacts/open-prices-frontend/issues/60) ([3e3fb1e](https://github.com/openfoodfacts/open-prices-frontend/commit/3e3fb1e5ad6826489d326989a918e44d0f8d8069))
* **price create form:** move selected location to the top of recent history. ref [#52](https://github.com/openfoodfacts/open-prices-frontend/issues/52) ([e6465eb](https://github.com/openfoodfacts/open-prices-frontend/commit/e6465ebd88e805eae084524436f36b0f549ef882))
* **product detail:** avoid error in title. ref [#55](https://github.com/openfoodfacts/open-prices-frontend/issues/55) ([fcc0230](https://github.com/openfoodfacts/open-prices-frontend/commit/fcc0230991d2fdb1c18cd99960cef2e64c5c9008))
* **product detail:** hide link to OFF if not found. ref [#55](https://github.com/openfoodfacts/open-prices-frontend/issues/55) ([240e21a](https://github.com/openfoodfacts/open-prices-frontend/commit/240e21a36d218c68bdf70f7cf5abd431ffae9d9b))

## [1.3.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.2.0...v1.3.0) (2023-12-23)


### Features

* improve location data coming from Nominatim ([#58](https://github.com/openfoodfacts/open-prices-frontend/issues/58)) ([a13ea91](https://github.com/openfoodfacts/open-prices-frontend/commit/a13ea91e66c93ac3ab205dce48078ea8190609cd))
* **location detail:** new basic Location detail page ([#60](https://github.com/openfoodfacts/open-prices-frontend/issues/60)) ([d4186f5](https://github.com/openfoodfacts/open-prices-frontend/commit/d4186f5ce33e4e722cfd87dabfb157ce14a64277))
* **price create form:** add leaflet map to location selector ([#57](https://github.com/openfoodfacts/open-prices-frontend/issues/57)) ([1f5a9ff](https://github.com/openfoodfacts/open-prices-frontend/commit/1f5a9ff6671141fae1c9bb3f1c4d412d157a6f83))
* **price create form:** use camera directly for proof image ([1040f33](https://github.com/openfoodfacts/open-prices-frontend/commit/1040f33afba7f6d6c8e773b2712f399b779b7c67))
* **product detail:** add link to openfoodfacts ([8f56874](https://github.com/openfoodfacts/open-prices-frontend/commit/8f56874e3726823a0b1d580dfe31d13c00a3185a))


### Bug Fixes

* **product detail:** link to OFF. ref [#55](https://github.com/openfoodfacts/open-prices-frontend/issues/55) ([afffdfd](https://github.com/openfoodfacts/open-prices-frontend/commit/afffdfd534407f296da2aabef47881e8104f50d1))

## [1.2.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.1.0...v1.2.0) (2023-12-23)


### Features

* improve localstorage interactions ([#53](https://github.com/openfoodfacts/open-prices-frontend/issues/53)) ([40cd628](https://github.com/openfoodfacts/open-prices-frontend/commit/40cd62854769f08daba9e4f9f79c56a3249ad90e))
* price create form: convert proof image to webp before upload ([#44](https://github.com/openfoodfacts/open-prices-frontend/issues/44)) ([9beeeb9](https://github.com/openfoodfacts/open-prices-frontend/commit/9beeeb952f6d89e905a166de5a9ce1e41a1e8abe))
* price create form: improve a bit the proof upload (responsive, overflow, icon) ([#49](https://github.com/openfoodfacts/open-prices-frontend/issues/49)) ([83e54df](https://github.com/openfoodfacts/open-prices-frontend/commit/83e54df25d670b1d54eef8eb395f05501ef4bb43))
* **price create form:** 3 steps, green border on step filled ([#51](https://github.com/openfoodfacts/open-prices-frontend/issues/51)) ([1947ff8](https://github.com/openfoodfacts/open-prices-frontend/commit/1947ff855ce56cb95acd5abe6dc400f67b148ecf))
* **price create form:** currency autocomplete ([#46](https://github.com/openfoodfacts/open-prices-frontend/issues/46)) ([ffe54ef](https://github.com/openfoodfacts/open-prices-frontend/commit/ffe54efbc75b94d566062639628ae29c60f54809))
* **price create form:** simplify location selector ([#52](https://github.com/openfoodfacts/open-prices-frontend/issues/52)) ([21c9fdb](https://github.com/openfoodfacts/open-prices-frontend/commit/21c9fdb3efa9e9a7ea623c459c864f5d0216022c))
* **price create form:** store last currency used in localstorage ([#47](https://github.com/openfoodfacts/open-prices-frontend/issues/47)) ([2b05eb1](https://github.com/openfoodfacts/open-prices-frontend/commit/2b05eb1890f2e1e3c248df1fbf8bbcd416e6eac5))
* **price list:** better display price with currency ([#45](https://github.com/openfoodfacts/open-prices-frontend/issues/45)) ([60ba8e4](https://github.com/openfoodfacts/open-prices-frontend/commit/60ba8e4dee5041881af115c817c945fab04f01a2))
* **price list:** order by last created ([48f7d12](https://github.com/openfoodfacts/open-prices-frontend/commit/48f7d128c6f4ce6fad435e36830d8a3d702587f2))
* **product detail:** new basic Product detail page ([#55](https://github.com/openfoodfacts/open-prices-frontend/issues/55)) ([b435610](https://github.com/openfoodfacts/open-prices-frontend/commit/b43561095ff4fe446adab0b0f1bc8b8c5c258dea))
* **stats:** super basic stats page ([#54](https://github.com/openfoodfacts/open-prices-frontend/issues/54)) ([0d61870](https://github.com/openfoodfacts/open-prices-frontend/commit/0d618707483a1325a134defb81e94cfce747aa01))


### Bug Fixes

* **home:** replace link with button ([74686a1](https://github.com/openfoodfacts/open-prices-frontend/commit/74686a1f7bdccca0d9fb3979648227fc88f7dd9a))
* price create form: send proof image name ([#43](https://github.com/openfoodfacts/open-prices-frontend/issues/43)) ([5dd98a2](https://github.com/openfoodfacts/open-prices-frontend/commit/5dd98a29a0a3ba12f6e9212cf2adfab342f598e8))
* recent location localstorage default value ([18dd9d1](https://github.com/openfoodfacts/open-prices-frontend/commit/18dd9d1e13b50a746c569b7c7db7050d5e4d3fa0))

## [1.1.0](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.0.2...v1.1.0) (2023-12-20)


### Features

* compress proof image before upload ([#41](https://github.com/openfoodfacts/open-prices-frontend/issues/41)) ([0d08220](https://github.com/openfoodfacts/open-prices-frontend/commit/0d08220a6c212caf1c465772edc40bf46a2f5669))
* send proof type on proof upload ([#42](https://github.com/openfoodfacts/open-prices-frontend/issues/42)) ([a56eccb](https://github.com/openfoodfacts/open-prices-frontend/commit/a56eccb7349f553e3bedecc6a1258bfc8647724b))
* simple list of last added prices ([#26](https://github.com/openfoodfacts/open-prices-frontend/issues/26)) ([101ed5e](https://github.com/openfoodfacts/open-prices-frontend/commit/101ed5ea59dca988ac8eaad2ece50b51447bbbe9))

## [1.0.2](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.0.1...v1.0.2) (2023-12-18)


### Bug Fixes

* fix output directory for prod deployment ([fbd22e7](https://github.com/openfoodfacts/open-prices-frontend/commit/fbd22e792c5fe88be3b52eb591561e2863f12764))

## [1.0.1](https://github.com/openfoodfacts/open-prices-frontend/compare/v1.0.0...v1.0.1) (2023-12-18)


### Technical

* fix yarn build-prod command ([c7aef94](https://github.com/openfoodfacts/open-prices-frontend/commit/c7aef9467c09d506b2c99fca6c485b6c74363453))

## 1.0.0 (2023-12-18)


### Features

* add a footer ([#20](https://github.com/openfoodfacts/open-prices-frontend/issues/20)) ([40bcecf](https://github.com/openfoodfacts/open-prices-frontend/commit/40bcecf50973080b8b56071adcfe19296bb29510))
* add titles. fix errors ([9a1eb7b](https://github.com/openfoodfacts/open-prices-frontend/commit/9a1eb7b8702f19b7fd77aad6c1a0de7c1f639ac9))
* Basic prices create form ([#13](https://github.com/openfoodfacts/open-prices-frontend/issues/13)) ([dd36973](https://github.com/openfoodfacts/open-prices-frontend/commit/dd369732d22558ea122499a0cd51fe41924bb458))
* Cleanup template ([#8](https://github.com/openfoodfacts/open-prices-frontend/issues/8)) ([d7a8851](https://github.com/openfoodfacts/open-prices-frontend/commit/d7a8851033a8362e8fba5545309e0d12d04649e5))
* code cleanup ([0cc6a57](https://github.com/openfoodfacts/open-prices-frontend/commit/0cc6a579b513802e4810ecbeeef39db82c49b076))
* improve barcode dialog (close icon, scan config). ref [#16](https://github.com/openfoodfacts/open-prices-frontend/issues/16) ([5f3746d](https://github.com/openfoodfacts/open-prices-frontend/commit/5f3746de9453a1e68f2c959523b4b76339a56e3a))
* improve location dialog (close icon). ref [#15](https://github.com/openfoodfacts/open-prices-frontend/issues/15) ([08b51ad](https://github.com/openfoodfacts/open-prices-frontend/commit/08b51add34a601fb30e8270eeb512f6c44bb48e8))
* make cookies reactive ([#9](https://github.com/openfoodfacts/open-prices-frontend/issues/9)) ([18d1a70](https://github.com/openfoodfacts/open-prices-frontend/commit/18d1a70fe85f5d2df110f0620ad3bb76898a3ebe))
* make navigation drawer dynamic (requiresAuth). ref [#12](https://github.com/openfoodfacts/open-prices-frontend/issues/12) ([27e8294](https://github.com/openfoodfacts/open-prices-frontend/commit/27e82942382d12b102edbb5e360c9cefc7b2636c))
* move header to own template ([#7](https://github.com/openfoodfacts/open-prices-frontend/issues/7)) ([d2c75a2](https://github.com/openfoodfacts/open-prices-frontend/commit/d2c75a230e6be59e15f483c0bee27f6233151e7f))
* price create form: add barcode scanner ([#16](https://github.com/openfoodfacts/open-prices-frontend/issues/16)) ([b5cc7fa](https://github.com/openfoodfacts/open-prices-frontend/commit/b5cc7fae1aa183010da02ef8ba31e75e488b3864))
* price create form: add location selector ([#15](https://github.com/openfoodfacts/open-prices-frontend/issues/15)) ([70e0f57](https://github.com/openfoodfacts/open-prices-frontend/commit/70e0f57a4b7918d3e345e4b0840a9001e22d2500))
* price create form: add simple proof image uploader ([#24](https://github.com/openfoodfacts/open-prices-frontend/issues/24)) ([582a494](https://github.com/openfoodfacts/open-prices-frontend/commit/582a49425451803101f05eec54ef2c66a4e4b7b7))
* replace Tailwind with Vuetify ([#12](https://github.com/openfoodfacts/open-prices-frontend/issues/12)) ([a271fc0](https://github.com/openfoodfacts/open-prices-frontend/commit/a271fc02c0d243128e26acc45a084ea21bbf6131))
* show success messages ([#23](https://github.com/openfoodfacts/open-prices-frontend/issues/23)) ([d61d713](https://github.com/openfoodfacts/open-prices-frontend/commit/d61d71340d380f563fe10c87ef6dd9579d5d7745))
* Sign in workflow (form, checkauth, store cookie, sign out) ([#4](https://github.com/openfoodfacts/open-prices-frontend/issues/4)) ([7776f4c](https://github.com/openfoodfacts/open-prices-frontend/commit/7776f4c68ab4e91e85e78824167ec96b1f8bbb62))
* small improvements on price create form ([#14](https://github.com/openfoodfacts/open-prices-frontend/issues/14)) ([2353abd](https://github.com/openfoodfacts/open-prices-frontend/commit/2353abd7b674991d49d2a14caac1df14e11c314e))


### Bug Fixes

* fix prod and staging build ([1ad4221](https://github.com/openfoodfacts/open-prices-frontend/commit/1ad42212a1f93239ec773dab0d477c989e51a815))
* readme ([#6](https://github.com/openfoodfacts/open-prices-frontend/issues/6)) ([bf9067d](https://github.com/openfoodfacts/open-prices-frontend/commit/bf9067d1afd7559f89c9bf651639bc426539a439))


### Technical

* add deployment config ([#21](https://github.com/openfoodfacts/open-prices-frontend/issues/21)) ([d51ccdb](https://github.com/openfoodfacts/open-prices-frontend/commit/d51ccdb03885603edee6e67ac373b2cc575dd192))
* add Github action for release-please ([358a683](https://github.com/openfoodfacts/open-prices-frontend/commit/358a6831378e124ded70bf0c061dcdee392c5684))
* add github action to build for prod ([106b29a](https://github.com/openfoodfacts/open-prices-frontend/commit/106b29ae6f5eb36d693edc8496aba5ca030442fa))

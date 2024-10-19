# Changelog

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

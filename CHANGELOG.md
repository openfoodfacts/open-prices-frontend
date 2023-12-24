# Changelog

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

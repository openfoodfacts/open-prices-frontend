# Changelog

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

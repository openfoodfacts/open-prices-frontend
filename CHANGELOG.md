# Changelog

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

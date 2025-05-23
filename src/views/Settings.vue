<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card :title="$t('Common.Display')" prepend-icon="mdi-laptop">
        <v-divider />
        <v-card-text>
          <!-- Theme -->
          <h3 class="mb-1">
            {{ $t('Common.Theme') }}
          </h3>
          <v-switch
            v-model="appStore.user.preferedTheme"
            color="primary"
            false-value="light"
            true-value="dark"
            density="compact"
            hide-details="auto"
          >
            <template #prepend>
              <v-icon :icon="getThemeInfo('light').icon" />
              <v-label>
                {{ getThemeInfo('light').label }}
              </v-label>
            </template>
            <template #label>
              <v-label style="padding-inline-end:10px">
                {{ getThemeInfo('dark').label }}
              </v-label>
              <v-icon :icon="getThemeInfo('dark').icon" />
            </template>
          </v-switch>
          <!-- Country -->
          <h3 class="mt-4 mb-1">
            {{ $t('Common.Country') }}
          </h3>
          <v-autocomplete
            v-model="appStore.user.country"
            :label="$t('Common.Country')"
            :items="countryList"
            item-title="native"
            item-value="code"
            hide-details="auto"
          />
          <!-- Language -->
          <h3 class="mt-4 mb-1">
            {{ $t('Common.Language') }}
          </h3>
          <v-autocomplete
            v-model="appStore.user.language"
            :label="$t('Common.Language')"
            :items="languageList"
            item-title="native"
            item-value="code"
            hide-details="auto"
          />
          <p class="mt-1">
            <a :href="OFF_CROWDIN_URL" target="_blank">
              {{ $t('UserSettings.TranslationHelp') }}
              <v-icon size="small" icon="mdi-open-in-new" />
            </a>
          </p>
          <!-- Price list display -->
          <h3 class="mt-4 mb-1">
            {{ $t('UserSettings.PriceListDisplay') }}
          </h3>
          <v-select
            v-model="appStore.user.price_list_display_default_mode"
            :label="$t('UserSettings.DefaultMode')"
            :items="priceListDisplayList"
            :item-title="item => $t('Common.' + item.value)"
            :item-value="item => item.key"
            hide-details="auto"
          />
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Prices -->
    <v-col cols="12" sm="6">
      <v-card :title="$t('UserSettings.AddingPrices')" prepend-icon="mdi-tag-multiple-outline">
        <v-divider />
        <v-card-text>
          <h3 class="mb-1">
            {{ $t('UserSettings.FavoriteCurrencies') }}
          </h3>
          <v-autocomplete
            v-model="appStore.user.favorite_currencies"
            :label="$t('UserSettings.CurrencyLabel')"
            :items="currencyList"
            :rules="[v => !!(v && v.length) || $t('UserSettings.CurrencyRequired')]"
            chips
            closable-chips
            multiple
            hide-details="auto"
          />
          <!-- Location selector -->
          <h3 class="mt-4 mb-1">
            {{ $t('UserSettings.LocationFinder') }}
          </h3>
          <v-select
            v-model="appStore.user.location_finder_default_mode"
            :label="$t('UserSettings.DefaultMode')"
            :items="locationSelectorDisplayList"
            :item-title="item => $t('Common.' + item.value)"
            :item-value="item => item.key"
            hide-details="auto"
          />
          <!-- Barcode scanner -->
          <h3 class="mt-4 mb-1">
            {{ $t('UserSettings.BarcodeScanner') }}
          </h3>
          <v-select
            v-model="appStore.user.barcode_scanner_default_mode"
            :label="$t('UserSettings.DefaultMode')"
            :items="productSelectorDisplayList"
            :item-title="item => $t('Common.' + item.valueSmallScreen)"
            :item-value="item => item.key"
            hide-details="auto"
          />
          <v-select
            v-model="appStore.user.barcode_scanner_library"
            :label="$t('UserSettings.BarcodeScannerLibrary')"
            :items="barcodeScannerDisplayList"
            :item-title="item => item.value"
            :item-value="item => item.key"
            hide-details="auto"
          />
          <!-- Price Validation -->
          <h3 class="mt-4 mb-1">
            {{ $t('UserSettings.PriceValidation') }}
          </h3>
          <v-select
            v-model="appStore.user.price_form_default_mode"
            :label="$t('UserSettings.DefaultMode')"
            :items="priceFormDisplayList"
            :item-title="item => $t('Common.' + item.value)"
            :item-value="item => item.key"
            hide-details="auto"
          />
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6">
      <v-card :title="$t('Common.DeveloperMode')" prepend-icon="mdi-test-tube">
        <v-divider />
        <v-card-text>
          <!-- Side menu -->
          <h3 class="mb-1">
            {{ $t('Common.SideMenu') }}
          </h3>
          <v-switch
            v-model="appStore.user.drawer_display_experiments"
            color="success"
            :label="$t('UserSettings.SideMenuExperimentsDisplay')"
            density="compact"
            hide-details="auto"
          />
          <!-- Products -->
          <h3 class="mt-4 mb-1">
            {{ $t('Common.Products') }}
          </h3>
          <v-switch
            v-model="appStore.user.product_display_barcode"
            class="mb-4"
            color="success"
            :label="$t('UserSettings.ProductDisplayBarcode')"
            :hint="$t('Common.ExampleWithColonAndValue', { value: '1234567890123' })"
            density="compact"
            persistent-hint
            hide-details="auto"
          />
          <v-switch
            v-model="appStore.user.product_display_category_tag"
            class="mb-4"
            color="success"
            :label="$t('UserSettings.ProductDisplayCategoryTag')"
            :hint="$t('Common.ExampleWithColonAndValue', { value: 'en:oranges' })"
            density="compact"
            persistent-hint
            hide-details="auto"
          />
          <v-switch
            v-model="appStore.user.product_display_source"
            color="success"
            :label="$t('UserSettings.ProductDisplaySource')"
            :hint="$t('Common.ExampleWithColonAndValue', { value: 'OBF' })"
            density="compact"
            persistent-hint
            hide-details="auto"
          />
          <!-- Locations -->
          <h3 class="mt-4 mb-1">
            {{ $t('Common.Locations') }}
          </h3>
          <v-switch
            v-model="appStore.user.location_display_osm_id"
            color="success"
            :label="$t('UserSettings.LocationDisplayOSMID')"
            :hint="$t('Common.ExampleWithColonAndValue', { value: 'N652825274' })"
            density="compact"
            persistent-hint
            hide-details="auto"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useTheme } from 'vuetify'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import countryList from '../i18n/data/countries.json'
import languageList from '../i18n/data/languages.json'
import localeManager from '../i18n/localeManager.js'
import constants from '../constants'

export default {
  data() {
    return {
      OFF_CROWDIN_URL: constants.OFF_CROWDIN_URL,
      theme: useTheme(),
      countryList,
      languageList,
      // currencyList,
      priceListDisplayList: constants.PRICE_DISPLAY_LIST,
      locationSelectorDisplayList: constants.LOCATION_SELECTOR_DISPLAY_LIST,
      productSelectorDisplayList: constants.PRODUCT_SELECTOR_DISPLAY_LIST,
      barcodeScannerDisplayList: constants.BARCODE_SCANNER_DISPLAY_LIST,
      priceFormDisplayList: constants.PRICE_FORM_DISPLAY_LIST
    }
  },
  computed: {
    ...mapStores(useAppStore),
    currencyList() {
      return [...new Set(this.countryList
        .map(country => country.currency)
        .flat()
        .filter(currency => currency !== null && currency.length !== 0))]
      }
  },
  watch: {
    'appStore.user.language': function (newLanguage, oldLanguage) {  // eslint-disable-line no-unused-vars
      localeManager.changeLanguage(newLanguage)
    },
    'appStore.user.preferedTheme': function (newTheme, oldTheme) {  // eslint-disable-line no-unused-vars
      this.theme.global.name = newTheme
    }
  },
  methods: {
    getThemeInfo(themeName) {
      if (themeName === 'light') {
        return {
          icon: constants.THEME_LIGHT_ICON,
          label: this.$t('Common.ThemeLight')
        }
      }
      return {
        icon: constants.THEME_DARK_ICON,
        label: this.$t('Common.ThemeDark')
      }
    }
  },
}
</script>

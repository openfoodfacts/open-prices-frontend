<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card :title="$t('UserSettings.DisplayTitle')" prepend-icon="mdi-laptop">
        <v-divider />
        <v-card-text>
          <v-btn :prepend-icon="preferedThemeInfo.icon" @click="swapTheme">
            {{ $t(preferedThemeInfo.label) }}
          </v-btn>
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
            color="success"
            :label="$t('UserSettings.ProductDisplayCategoryTag')"
            :hint="$t('Common.ExampleWithColonAndValue', { value: 'en:oranges' })"
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

    <!-- Prices -->
    <v-col cols="12" sm="6">
      <v-card :title="$t('Common.Prices')" prepend-icon="mdi-tag-multiple-outline">
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

export default {
  data() {
    return {
      theme: useTheme(),
      countryList,
      languageList,
      // currencyList,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    preferedThemeInfo() {
      if (this.theme.global.name === 'light') {
        return {
          icon: 'mdi-white-balance-sunny',
          label: 'Theme.LightMode' 
        }
      }
      return {
        icon: 'mdi-moon-waning-crescent',
        label: 'Theme.DarkMode' 
      }
    },
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
    }
  },
  methods: {
    swapTheme() {
      const newTheme = this.theme.global.name === 'light' ? 'dark' : 'light'
      this.appStore.user.preferedTheme = newTheme
      this.theme.global.name = newTheme
    }
  }
}
</script>

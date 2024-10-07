<template>
  <h1 class="text-h5 mb-1">
    {{ $t('UserSettings.Title') }}
  </h1>

  <v-form @submit.prevent="updateSettings">
    <v-row>
      <!-- Display -->
      <v-col cols="12" sm="6">
        <v-card :title="$t('UserSettings.DisplayTitle')" prepend-icon="mdi-laptop">
          <v-divider />
          <!-- Country -->
          <v-card-text>
            <h3 class="mb-1">
              {{ $t('Common.Country') }}
            </h3>
            <v-autocomplete
              v-model="userSettingsForm.selectedCountry"
              :label="$t('Common.Country')"
              :items="countryList"
              item-title="native"
              item-value="code"
            />
            <!-- Language -->
            <h3 class="mb-1">
              {{ $t('Common.Language') }}
            </h3>
            <v-autocomplete
              v-model="userSettingsForm.selectedLanguage"
              :label="$t('Common.Language')"
              :items="languageList"
              item-title="native"
              item-value="code"
              hide-details="auto"
            />
            <p class="mt-1">
              <i18n-t v-if="languageTranslationCompletion < 80" keypath="UserSettings.TranslationCompletion" tag="span">
                <template #completion>
                  {{ languageTranslationCompletion }}
                </template>
              </i18n-t>
              <span v-if="languageTranslationCompletion < 80">&nbsp;</span>
              <a href="https://translate.openfoodfacts.org" target="_blank">
                {{ $t('UserSettings.TranslationHelp') }}
                <v-icon size="small" icon="mdi-open-in-new" />
              </a>
            </p>
            <!-- Products -->
            <h3 class="mt-4 mb-1">
              {{ $t('Common.Products') }}
            </h3>
            <v-checkbox
              v-model="appStore.user.product_display_barcode"
              class="mb-4"
              :label="$t('UserSettings.ProductDisplayBarcode')"
              :hint="$t('Common.ExampleWithColon') + ' 1234567890123'"
              density="compact"
              persistent-hint
              hide-details="auto"
            />
            <v-checkbox
              v-model="appStore.user.product_display_category_tag"
              :label="$t('UserSettings.ProductDisplayCategoryTag')"
              :hint="$t('Common.ExampleWithColon') + ' en:oranges'"
              density="compact"
              persistent-hint
              hide-details="auto"
            />
            <!-- Locations -->
            <h3 class="mt-4 mb-1">
              {{ $t('Common.Locations') }}
            </h3>
            <v-checkbox
              v-model="appStore.user.location_display_osm_id"
              :label="$t('UserSettings.LocationDisplayOSMID')"
              :hint="$t('Common.ExampleWithColon') + ' W398056954'"
              density="compact"
              persistent-hint
              hide-details="auto"
            />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Prices -->
      <v-col cols="12" sm="6">
        <v-card :title="$t('UserSettings.AddingPrices')" prepend-icon="mdi-tag-plus-outline">
          <v-divider />
          <v-card-text>
            <h3 class="mb-1">
              {{ $t('UserSettings.FavoriteCurrencies') }}
            </h3>
            <v-autocomplete
              v-model="userSettingsForm.selectedCurrencies"
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

    <v-row>
      <v-col>
        <v-btn type="submit" :color="formFilled ? 'success' : ''" :disabled="!formFilled">
          {{ $t('UserSettings.Save') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import localeManager from '../i18n/localeManager.js'
import languageData from '../i18n/data/languages.json'
import countryData from '../i18n/data/countries.json'

export default {
  data() {
    return {
      userSettingsForm: {
        selectedCountry: null, // see initUserSettingsForm
        selectedLanguage: null, // see initUserSettingsForm
        selectedCurrencies: null, // see initUserSettingsForm
      },
      currencyList: [],
      languageList: [],
      languageListCode: [],
      languageTranslationCompletion: null,
      countryList: countryData, // can be used to further filter the country list if needed
    }
  },
  computed: {
    ...mapStores(useAppStore),
    formFilled() {
      return Object.values(this.userSettingsForm).every(x => {
        if (x && Array.isArray(x)) {
          return x.length > 0
        }
        return !!x
      })
    },
  },
  watch: {
    'userSettingsForm.selectedLanguage': async function () {
      if (this.userSettingsForm.selectedLanguage !== null) {
        this.languageTranslationCompletion = await localeManager.calculateTranslationCompletion(this.userSettingsForm.selectedLanguage)
      }
    },
    'userSettingsForm.selectedCountry': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        const selectedCountry = this.countryList.find(country => country.code === newValue)
        // Update the language list to show the previously selected language first then the selected country languages and the rest of the languages
        let newLanguageList = this.languageList.slice()
        let newCurrencyList = this.currencyList.slice()
        if (selectedCountry) {
          const currentLanguage = this.languageList.find(lang => lang.code === this.userSettingsForm.selectedLanguage)
          // get the languages of the selected country minus the selected language (if it exists in the country languages list)
          const countryLanguagesList = selectedCountry.languages.map(code => {
            const language = languageData.find(lang => lang.code === code || lang.code === `${code}_${selectedCountry.code}`)
            return language ? language : null
          }).filter(language => language !== null && language.code !== currentLanguage.code)
          // Update the language list to show the current selected language first then the selected country languages and the rest of the languages
          newLanguageList = [
            ...[currentLanguage],
            ...countryLanguagesList,
            ...newLanguageList.filter(language => !selectedCountry.languages.includes(language.code) && language.code !== currentLanguage.code &&
              !countryLanguagesList.includes(language))
          ].filter(Boolean) // Remove any null or undefined values 
          this.languageList = newLanguageList

          // get the currencies of the selected country minus the already selected currencies (if they exists in the country currencies list)
          const countryCurrenciesList = selectedCountry.currency.filter(currency => !this.userSettingsForm.selectedCurrencies.includes(currency))
          // Update the currency list to show the current selected currencies first then the selected country currencies and the rest of the currencies
          newCurrencyList = [
            ...this.userSettingsForm.selectedCurrencies,
            ...countryCurrenciesList,
            ...newCurrencyList.filter(currency => !selectedCountry.currency.includes(currency) && !this.userSettingsForm.selectedCurrencies.includes(currency))
          ].filter(Boolean) // Remove any null or undefined values
          this.currencyList = newCurrencyList
        }
      }
    }
  },
  async mounted() {
    this.languageListCode = await localeManager.getLocales()
    this.languageList = this.languageListCode.map(code => {
        const language = languageData.find(lang => lang.code === code)
        return language ? language : null
    }).filter(language => language !== null)
    this.currencyList = [...new Set(this.countryList
      .map(country => country.currency)
      .flat()
      .filter(currency => currency !== null && currency.length !== 0))]
    this.initUserSettingsForm()
  },
  methods: {
    initUserSettingsForm() {
      this.userSettingsForm.selectedLanguage = this.languageList.find(lang => lang.code === localeManager.guessDefaultLocale()).code
      this.userSettingsForm.selectedCountry = countryData.find(country => country.code === this.appStore.user.country).code
      this.userSettingsForm.selectedCurrencies = this.appStore.getUserFavoriteCurrencies
    },
    async updateSettings() {
      await localeManager.changeLanguage(this.userSettingsForm.selectedLanguage)
      this.appStore.setLanguage(this.userSettingsForm.selectedLanguage)
      this.appStore.setCountry(this.userSettingsForm.selectedCountry)
      this.appStore.setFavoriteCurrencies(this.userSettingsForm.selectedCurrencies)
      this.done()
    },
    done() {
      this.$router.push({ path: '/dashboard', query: { settingsSuccess: 'true' } })
    }
  }
}
</script>

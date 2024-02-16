<template>
  <h1 class="text-h5 mb-1">
    {{ $t('UserSettings.Title') }}
  </h1>

  <v-form @submit.prevent="updateSettings">
    <v-row>
      <v-col cols="12" sm="6">
        <v-card :title="$t('UserSettings.ChangeLanguage')" prepend-icon="mdi-earth">
          <v-divider></v-divider>
          <v-card-text>
            <v-autocomplete
              v-model="userSettingsForm.selectedCountry"
              :label="$t('UserSettings.CountryLabel')"
              :items="countryList"
              item-title="native"
              item-value="code"
            >
            </v-autocomplete>
            <v-autocomplete
              v-model="userSettingsForm.selectedLanguage"
              :label="$t('UserSettings.LanguageLabel')"
              :items="languageList"
              item-title="native"
              return-object
              hide-details="auto"
            ></v-autocomplete>

            <br />
            <p>
              <i18n-t v-if="this.languageTranslationCompletion < 80" keypath="UserSettings.TranslationCompletion" tag="span">
                <template #completion>{{ this.languageTranslationCompletion }}</template>
              </i18n-t>
              <span v-if="this.languageTranslationCompletion < 80">&nbsp;</span>
              <a href="https://translate.openfoodfacts.org" target="_blank">
                {{ $t('UserSettings.TranslationHelp') }}
                <v-icon size="small" icon="mdi-open-in-new"></v-icon>
              </a>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card :title="$t('UserSettings.AddingPrices')" prepend-icon="mdi-tag-plus-outline">
          <v-divider></v-divider>
          <v-card-text>
            <h3 class="mb-1">{{ $t('UserSettings.DefaultCurrency') }}</h3>
            <v-autocomplete
              v-model="userSettingsForm.currency"
              :label="$t('UserSettings.CurrencyLabel')"
              :items="currencyList"
              hide-details="auto"
            ></v-autocomplete>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn type="submit" :color="formFilled ? 'success' : ''" :disabled="!formFilled">{{ $t('UserSettings.Save') }}</v-btn>
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
        currency: null,  // see initUserSettingsForm
      },
      currencyList: [],
      languageList: [],
      languageListCode: [],
      languageTranslationCompletion: null,
      countryList: countryData, // can be used to further filter the country list if needed
    }
  },
  watch:{
    'userSettingsForm.selectedLanguage': async function () {
      if (this.userSettingsForm.selectedLanguage !== null) {
        this.languageTranslationCompletion = await localeManager.calculateTranslationCompletion(this.userSettingsForm.selectedLanguage.code)
      }
    },
    'userSettingsForm.selectedCountry': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        const selectedCountry = this.countryList.find(country => country.code === newValue)
        // Update the currency list to the first currency of the selected country if it exists or USD otherwise
        if (selectedCountry && selectedCountry.currency && selectedCountry.currency.length > 0) {
          this.userSettingsForm.currency = selectedCountry.currency[0]
        } else {
          this.userSettingsForm.currency = 'USD'
        }
        // Update the language list to show the previously selected language first then the selected country languages and the rest of the languages
        let newLanguageList = this.languageList.slice()
        if (selectedCountry) {
          // get the languages of the selected country minus the selected language (if it exists in the country languages list)
          const countryLanguagesList = selectedCountry.languages.map(code => {
            const language = languageData.find(lang => lang.code === code || lang.code === `${code}_${selectedCountry.code}`)
            return language ? language : null
          }).filter(language => language !== null && language.code !== this.userSettingsForm.selectedLanguage.code)
          // Update the language list to show the current selected language first then the selected country languages and the rest of the languages
          newLanguageList = [
            ...[this.userSettingsForm.selectedLanguage],
            ...countryLanguagesList,
            ...newLanguageList.filter(language => !selectedCountry.languages.includes(language.code) && language.code !== this.userSettingsForm.selectedLanguage.code &&
              !countryLanguagesList.includes(language))
          ].filter(Boolean); // Remove any null or undefined values 
          this.languageList = newLanguageList
        }
      }
    }
  },
  computed: {
    ...mapStores(useAppStore),
    formFilled() {
      return Object.values(this.userSettingsForm).every(x => !!x)
    },
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
      this.userSettingsForm.currency = this.appStore.user.last_currency_used
      this.userSettingsForm.selectedLanguage = this.languageList.find(lang => lang.code === localeManager.guessDefaultLocale()) || this.languageList.find(lang => lang.code === 'en')
      this.userSettingsForm.selectedCountry = countryData.find(country => country.code === this.appStore.user.country).code  
    },
    async updateSettings() {
      await localeManager.changeLanguage(this.userSettingsForm.selectedLanguage.code)
      this.appStore.setLanguage(this.userSettingsForm.selectedLanguage.code)
      this.appStore.setCountry(this.userSettingsForm.selectedCountry)
      this.appStore.setLastCurrencyUsed(this.userSettingsForm.currency)
      this.$router.push({ path: '/', query: { settingsSuccess: 'true' } })
    }
  }
}
</script>

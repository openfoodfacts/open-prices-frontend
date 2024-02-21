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
            ></v-autocomplete>
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
    <v-col cols="12" sm="6">
        <v-card :title="$t('Change Mode')" prepend-icon="mdi-brightness-4">
          <v-divider></v-divider>
          <v-card-text>
            <v-radio-group v-model="userSettingsForm.darkMode">
              <v-radio label="Dark Mode" value="dark"></v-radio>
              <v-radio label="Light Mode" value="light"></v-radio>
            </v-radio-group>
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
import constants from '../constants'
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
        darkMode: null,
      },
      currencyList: constants.CURRENCY_LIST,
      languageList: [],
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
    'userSettingsForm.darkMode': function (newDarkMode, oldDarkMode) {
      if (newDarkMode !== oldDarkMode) {
        if (newDarkMode === 'dark') {
          this.appStore.setDarkMode(true);
        } else if (newDarkMode === 'light') {
          this.appStore.setDarkMode(false);
        } else {
          const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
          this.appStore.setDarkMode(systemDarkMode);
        }
      }
    },

  },
  computed: {
    ...mapStores(useAppStore),
    formFilled() {
      return Object.values(this.userSettingsForm).every(x => !!x)
    },
  },
  async mounted() {
    const languageListCode = await localeManager.getLocales()
    this.languageList = languageListCode.map(code => {
        const language = languageData.find(lang => lang.code === code)
        return language ? language : null
    }).filter(language => language !== null)
    this.initUserSettingsForm()
  },
  methods: {
    initUserSettingsForm() {
      this.userSettingsForm.currency = this.appStore.user.last_currency_used
      this.userSettingsForm.selectedLanguage = this.languageList.find(lang => lang.code === localeManager.guessDefaultLocale()) || this.languageList.find(lang => lang.code === 'en')
      this.userSettingsForm.selectedCountry = countryData.find(country => country.code === this.appStore.user.country).code  
      this.userSettingsForm.darkMode = 'system'
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

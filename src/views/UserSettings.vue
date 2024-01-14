<template>
<div v-if="countriesData">
  <h1 class="mb-1">
    Settings
  </h1>

  <v-form @submit.prevent="updateSettings">
    <v-row>
      <v-col cols="12" sm="6">
        <v-card title="Change language" prepend-icon="mdi-earth">
          <v-divider></v-divider>
          <v-card-text>
            <v-autocomplete
              v-model="userSettingsForm.selectedCountry"
              label="Country"
              :items="countriesData"
              item-title="name"
              item-value="name"
            >
            </v-autocomplete>
          </v-card-text>
          <v-card-text>
            <v-autocomplete
              v-model="userSettingsForm.selectedLanguage"
              label="Language"
              :items="countryLanguages"
            >
            </v-autocomplete>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card title="Adding prices" prepend-icon="mdi-tag-plus-outline">
          <v-divider></v-divider>
          <v-card-text>
            <h3 class="mb-1">Default currency</h3>
            <v-autocomplete
              v-model="userSettingsForm.currency"
              label="Currency"
              :items="currencyList"
            ></v-autocomplete>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn type="submit" :color="formFilled ? 'success' : ''" :disabled="!formFilled">Save</v-btn>
      </v-col>
    </v-row>
  </v-form>
</div>
<v-snackbar
    v-model="localeNotSupported"
    color="error"
    :timeout="5000"
  >Locale not yet supported, language will be defaulted to English</v-snackbar>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import localeManager from "../i18n/localeManager.js"


export default {
  data() {
    return {
      userSettingsForm: {
        selectedCountry: null,
        selectedLanguageCode: ['en'],
        selectedLanguage: ['English'], // Default language
        currency: null,  // see initUserSettingsForm
      },
      currencyList: constants.CURRENCY_LIST,
      countriesData: null,
      languagesData: null,
      countryLanguages: null,
      localeNotSupported: false,
    }
  },
  watch: {
    'userSettingsForm.selectedCountry': function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.updateLanguages();
      }
    },
    'userSettingsForm.selectedLanguage': function () {
      console.log("selected language: ", this.userSettingsForm.selectedLanguage)

      this.userSettingsForm.selectedLanguageCode = this.languagesData.find(lang => lang.name === this.userSettingsForm.selectedLanguage.split(' ')[0]).code
      console.log("selected language code: ", this.userSettingsForm.selectedLanguageCode)
      if (!localeManager.isLocaleSupported(this.userSettingsForm.selectedLanguageCode)) {
        this.userSettingsForm.selectedLanguageCode = 'en'
        this.localeNotSupported = true;
        setTimeout(() => {
          this.localeNotSupported = false;
        }, 5000);

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
    this.initUserSettingsForm()
    try {
    const { default: countriesData } = await import('@/i18n/data/countries.json');
    const { default: languagesData } = await import('@/i18n/data/languages.json');
    this.countriesData = countriesData;
    this.languagesData = languagesData;
    this.countryLanguages = ['en'];
  } catch (error) {
    console.error('Error loading countries and languages:', error);
  }
  },
  methods: {
    updateLanguages() {
      const selectedCountry = this.userSettingsForm.selectedCountry;
      const selectedCountryObject = this.countriesData.find(c => c.name === selectedCountry);

      const countryLanguagesCode = [...new Set(['en', ...Array.from(selectedCountryObject.languages)])];
      this.countryLanguages = countryLanguagesCode.map(code => {
        const language = this.languagesData.find(lang => lang.code === code);
        return language ? `${language.name} - ${language.native}` : null;
      }).filter(language => language !== null);
      this.userSettingsForm.selectedLanguageCode = countryLanguagesCode[1] || countryLanguagesCode[0];
      this.userSettingsForm.selectedLanguage = this.countryLanguages[1] || this.countryLanguages[0];

    },
    initUserSettingsForm() {
      this.userSettingsForm.currency = this.appStore.user.last_currency_used
    },
    async updateSettings() {
      await localeManager.changeLanguage(this.userSettingsForm.selectedLanguageCode);
      this.appStore.setLastCurrencyUsed(this.userSettingsForm.currency)
      this.$router.push({ path: '/', query: { settingsSuccess: 'true' } })
    }
  }
}
</script>

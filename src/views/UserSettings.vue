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
              v-model="userSettingsForm.selectedLanguage"
              :label="$t('UserSettings.LanguageLabel')"
              :items="languageList"
              item-title="name"
              return-object
              hide-details="auto"
            ></v-autocomplete>

            <br />
            <p>
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
import constants from '../constants'
import localeManager from "../i18n/localeManager.js"


export default {
  data() {
    return {
      userSettingsForm: {
        selectedLanguage: null, // see initUserSettingsForm
        currency: null,  // see initUserSettingsForm
      },
      currencyList: constants.CURRENCY_LIST,
      languageList: constants.LANGUAGE_LIST,
    }
  },

  computed: {
    ...mapStores(useAppStore),
    formFilled() {
      return Object.values(this.userSettingsForm).every(x => !!x)
    },
  },
  mounted() {
    this.initUserSettingsForm()
  },
  methods: {
    initUserSettingsForm() {
      this.userSettingsForm.currency = this.appStore.user.last_currency_used
      this.userSettingsForm.selectedLanguage = constants.LANGUAGE_LIST.find(lang => lang.code === localeManager.guessDefaultLocale()) || constants.LANGUAGE_LIST[0]
    },
    async updateSettings() {
      console.log(this.userSettingsForm.selectedLanguage)
      await localeManager.changeLanguage(this.userSettingsForm.selectedLanguage.code)
      this.appStore.setLanguage(this.userSettingsForm.selectedLanguage)
      this.appStore.setLastCurrencyUsed(this.userSettingsForm.currency)
      this.$router.push({ path: '/', query: { settingsSuccess: 'true' } })
    }
  }
}
</script>

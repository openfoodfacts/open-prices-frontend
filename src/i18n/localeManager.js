import i18n from "@/i18n"
import { nextTick } from "vue"
import constants from "../constants"

const localeManager = {
  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE
  },

  get supportedLocales() {
    return constants.LANGUAGE_LIST
  },

  get currentLocale() {
    return i18n.global.locale.value
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale
  },

  async changeLanguage(newLocale) {
    await localeManager.loadLocaleMessages(newLocale)
    localeManager.currentLocale = newLocale
    document.querySelector("html").setAttribute("lang", newLocale)
    localStorage.setItem("user-locale", newLocale)

  },

  async loadLocaleMessages(locale) {
    if(!i18n.global.availableLocales.includes(locale)) {
      const messages = await import(`@/i18n/locales/${locale}.json`)
      i18n.global.setLocaleMessage(locale, messages.default)
    }
    
    return nextTick()
  },

  isLocaleSupported(locale) {
    return localeManager.supportedLocales.some(lang => lang.code === locale)
  },

  getUserLocale() {
    const locale = window.navigator.language ||
      window.navigator.userLanguage ||
      localeManager.defaultLocale

    return {
      locale: locale,
      localeNoRegion: locale.split('-')[0]
    }
  },

  getPersistedLocale() {
    const persistedLocale = localStorage.getItem("user-locale")

    if(localeManager.isLocaleSupported(persistedLocale)) {
      return persistedLocale
    } else {
      return null
    }
  },

  guessDefaultLocale() {
    const userPersistedLocale = localeManager.getPersistedLocale()
    if(userPersistedLocale) {
      return userPersistedLocale
    }

    const userPreferredLocale = localeManager.getUserLocale()

    if (localeManager.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale
    }

    if (localeManager.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
      return userPreferredLocale.localeNoRegion
    }
    
    return localeManager.defaultLocale
  }

}

export default localeManager
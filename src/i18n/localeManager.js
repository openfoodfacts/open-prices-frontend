import i18n from '@/i18n'
import { nextTick } from 'vue'
import languageData from '@/i18n/data/languages.json'
import { useAppStore } from '@/store'

const localeManager = {
  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE
  },

  get supportedLocales() {
    return languageData
  },

  get currentLocale() {
    return i18n.global.locale.value
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale
  },

  /**
   * Changes the current language to the specified locale.
   * @param {string} locale - The locale to change to.
   * @returns {Promise<void>} A promise that resolves when the language has been changed.
   */
  async changeLanguage(newLocale) {
    await localeManager.loadLocaleMessages(newLocale)
    localeManager.currentLocale = newLocale
    document.querySelector('html').setAttribute('lang', newLocale)
    const store = useAppStore()
    store.setLanguage(newLocale)
  },

  /**
   * Loads the locale messages for the specified locale.
   * @param {string} locale - The locale to load messages for.
   * @returns {Promise<Object>} A promise that resolves to the loaded locale messages.
   */
  async loadLocaleMessages(locale) {
    if(!i18n.global.availableLocales.includes(locale)) {
      const messages = await import(`@/i18n/locales/${locale}.json`)
      i18n.global.setLocaleMessage(locale, messages.default)
    }
    
    return nextTick()
  },
  /**
   * Checks if a given locale is supported.
   * @param {string} locale - The locale to check.
   * @returns {boolean} True if the locale is supported, false otherwise.
   */
  isLocaleSupported(locale) {
    return localeManager.supportedLocales.some(lang => lang.code === locale)
  },

  /**
   * Gets the user's preferred locale from the browser settings.
   * @returns {Object} An object containing the full locale string and the locale without the region code.
   */
  getUserLocale() {
    const locale = window.navigator.language ||
      window.navigator.userLanguage ||
      localeManager.defaultLocale

    return {
      locale: locale,
      localeNoRegion: locale.split('-')[0]
    }
  },

  /**
   * Retrieves the user's locale from local storage.
   * @returns {string|null} The persisted locale if it is supported, or null otherwise.
   */
  getPersistedLocale() {
    const store = useAppStore()
    const persistedLocale = store.getUserLanguage

    if(localeManager.isLocaleSupported(persistedLocale)) {
      return persistedLocale
    } else {
      return null
    }
  },

  /**
   * Guesses the default locale based on the user's settings and supported locales.
   * @returns {string} The guessed default locale.
   */
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
  },
  /**
   * Fetches the available locales.
   * @returns {Promise<Array<string>>} A promise that resolves to an array of available locales.
   */
  async getLocales() {
    try {
      const localesContext = import.meta.glob('./locales/*.json')
      const locales = Object.keys(localesContext).map(key => {
        const localeCode = key.replace('./locales/', '').replace('.json', '')
        return localeCode;
      })
  
      return locales;
    } catch (error) {
      console.error('Error fetching locales:', error)
    }
  },
  /**
   * Calculates the translation completion for a given locale by comparing with the reference locale (en).
   * Flattens the JSON files to a single-level object with dot-separated keys.
   * Then loops through the keys and compares the values (they are by default in English, i.e. not translated).
   * Also checks if there are missing keys in the translation file.
   * @param {string} locale - The locale to calculate translation completion for.
   * @returns {Promise<number>} A promise that resolves to the translation completion percentage.
   */
  async calculateTranslationCompletion(locale) {
    const enJson = await import(`@/i18n/locales/en.json`)
    const localeJson = await import(`@/i18n/locales/${locale}.json`)

    /**
     * Flattens a nested object into a single-level object with dot-separated keys.
     * @param {Object} obj - The object to flatten.
     * @param {string} [prefix=''] - The prefix to use for the keys of the flattened object.
     * @returns {Object} The flattened object.
     */ 
    const flattenObject = (obj, prefix = '') => {
      return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '.' : ''
        if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k))
        else acc[pre + k] = obj[k]
        return acc
      }, {})
    }
  
    const enFlat = flattenObject(enJson.default)
    const localeFlat = flattenObject(localeJson.default)
  
    const enKeys = Object.keys(enFlat)
    const localeKeys = Object.keys(localeFlat)
    let identicalValues = 0
    let missingKeys = 0
    for (let i = 0; i < enKeys.length; i++) {
      if(!localeKeys.includes(enKeys[i])) {
        missingKeys++
      } else {
        const enValue = String(enFlat[enKeys[i]]).trim()
        const localeValue = String(localeFlat[enKeys[i]]).trim()
        if (enValue === localeValue) {
          identicalValues++
        }
      }
    }
    if(locale === 'en') {
      return 100
    }
    return Math.round(((enKeys.length - (identicalValues + missingKeys)) / enKeys.length) * 100)
  }
}

export default localeManager

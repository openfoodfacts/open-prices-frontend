import i18n from '@/i18n'
import { nextTick } from 'vue'
import constants from '../constants'

const localeManager = {
  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE
  },

  //NOTE: Not used anymore, but keeping it here for reference
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
    document.querySelector('html').setAttribute('lang', newLocale)
    localStorage.setItem('user-locale', newLocale)

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
    const persistedLocale = localStorage.getItem('user-locale')

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
  },

  async getLocales() {
    try {
      const localesContext = import.meta.globEager('./locales/*.json')
      const locales = Object.keys(localesContext).map(key => {
        const localeCode = key.replace('./locales/', '').replace('.json', '')
        return localeCode;
      })
  
      return locales;
    } catch (error) {
      console.error('Error fetching locales:', error);
    }
  },
  async calculateTranslationCompletion(locale) {
    const enJson = await import(`@/i18n/locales/en.json`)
    const localeJson = await import(`@/i18n/locales/${locale}.json`)
    
    const flattenObject = (obj, prefix = '') => {
      return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k));
        else acc[pre + k] = obj[k];
        return acc;
      }, {});
    }
  
    const enFlat = flattenObject(enJson.default);
    const localeFlat = flattenObject(localeJson.default);
  
    const enKeys = Object.keys(enFlat)
    const localeKeys = Object.keys(localeFlat)
    const enValues = Object.values(enFlat)
    const localeValues = Object.values(localeFlat)
    let identicalValues = 0
    let missingKeys = 0
    console.log('enKeys.length', enKeys.length)
    console.log('enValues.length', enValues.length)
    console.log('localeKeys.length', localeKeys.length)
    console.log('localeValues.length', localeValues.length)
    for (let i = 0; i < enKeys.length; i++) {
      if(!localeKeys.includes(enKeys[i])) {
        console.log('missing key', enKeys[i])
        missingKeys++
      } else {
        const enValue = String(enFlat[enKeys[i]]).trim();
        const localeValue = String(localeFlat[enKeys[i]]).trim();
        if (enValue === localeValue) {
          identicalValues++
        }
      }
    }
    if(locale === 'en') {
      return 100
    }
    console.log('identicalValues', identicalValues)
    console.log('missingKeys', missingKeys)
    return Math.round(((enKeys.length - (identicalValues + missingKeys)) / enKeys.length) * 100)
  }
}

export default localeManager

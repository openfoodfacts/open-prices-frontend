import { defineStore } from 'pinia'
import utils from './utils.js'

const getDefaultDarkModeValue = () => {
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDarkMode;
};

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      username: null,
      token: null,
      last_product_mode_used: 'barcode',
      last_currency_used: 'EUR',  // TODO: init with user locale ?
      recent_locations: [],
      language: localStorage.getItem('user-locale') || import.meta.env.VITE_DEFAULT_LOCALE,  // 'en'
      country: import.meta.env.VITE_DEFAULT_COUNTRY,  // 'FR',
      darkMode: getDefaultDarkModeValue(),
    },
  }),
  getters: {
    getRecentLocations: (state) => {
      return (limit=null) => {
        if (limit && state.user.recent_locations.length && state.user.recent_locations.length > limit) {
          return state.user.recent_locations.slice(0, limit)
        }
        return state.user.recent_locations
      }
    },
    getUserLanguage: (state) => {
      // manage edge-case where some user languages were stored as objects instead of strings
      if (typeof state.user.language === 'object') {
        return state.user.language.code
      }
      return state.user.language
    },
    getUserCountry: (state) => {
      return state.user.country
    },
    getDarkMode: (state) => {
      return state.user.darkMode;
    },
  },
  actions: {
    signIn(username, token) {
      this.user.username = username
      this.user.token = token
    },
    signOut() {
      this.user.username = null
      this.user.token = null
    },
    setLastCurrencyUsed(currency) {
      this.user.last_currency_used = currency
    },
    addRecentLocation(location) {
      this.user.recent_locations = utils.addObjectToArray(this.user.recent_locations, location, true)
    },
    removeRecentLocation(location) {
      this.user.recent_locations = utils.removeObjectFromArray(this.user.recent_locations, location)
    },
    clearRecentLocations() {
      this.user.recent_locations = []
    },
    setLanguage(language) {
      this.user.language = language
    },
    setCountry(country) {
      this.user.country = country
    },
    setDarkMode(isDark) {
      this.user.darkMode = isDark;
    }
  },
  // pinia-plugin-persistedstate
  persist: {
    storage: localStorage
  }
})

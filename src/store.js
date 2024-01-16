import { defineStore } from 'pinia'
import utils from './utils.js'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      username: null,
      token: null,
      last_product_mode_used: 'barcode',
      last_currency_used: 'EUR',  // TODO: init with user locale ?
      recent_locations: [],
      language: localStorage.getItem('user-locale') || 'en', // Default to 'en' if not set
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
  },
  // pinia-plugin-persistedstate
  persist: {
    storage: localStorage
  }
})

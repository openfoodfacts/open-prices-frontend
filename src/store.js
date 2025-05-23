import { defineStore } from 'pinia'
import constants from './constants'
import utils from './utils.js'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      username: null,
      token: null,
      last_product_type_used: constants.PRICE_TYPE_PRODUCT,  // or 'BARCODE'
      last_currency_used: import.meta.env.VITE_DEFAULT_CURRENCY,  // 'EUR'
      recent_locations: [],
      language: import.meta.env.VITE_DEFAULT_LOCALE, // 'en'
      country: import.meta.env.VITE_DEFAULT_COUNTRY,  // 'FR',
      favorite_currencies: [import.meta.env.VITE_DEFAULT_CURRENCY], // ['EUR']
      proofs: [],
      proofTotal: null,
      product_display_barcode: false,
      product_display_category_tag: false,
      product_display_source: false,
      location_display_osm_id: false,
      drawer_display_experiments: true,
      preferedTheme: null,
      price_list_display_default_mode: constants.PRICE_DISPLAY_LIST[0].key,
      location_finder_default_mode: constants.LOCATION_SELECTOR_DISPLAY_LIST[1].key,
      barcode_scanner_default_mode: constants.PRODUCT_SELECTOR_DISPLAY_LIST[0].key,
      barcode_scanner_library: constants.BARCODE_SCANNER_DISPLAY_LIST[0].key,
      price_form_default_mode: constants.PRICE_FORM_DISPLAY_LIST[0].key
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
      return state.user.language
    },
    getUserCountry: (state) => {
      return state.user.country
    },
    getUserProofTotal: (state) => {
      return state.user.proofTotal
    },
    getUserFavoriteCurrencies: (state) => {
      return state.user.favorite_currencies
    },
    getUserLastCurrencyUsed: (state) => {
      return state.user.last_currency_used
    },
    getUserPreferedTheme: (state) => {
      return state.user.preferedTheme
    }
  },
  actions: {
    signIn(token) {
      this.user.username = utils.getOFFUsernameFromAuthToken(token)
      this.user.token = token
    },
    signOut() {
      this.user.username = null
      this.user.token = null
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
    setFavoriteCurrencies(currencies) {
      this.user.favorite_currencies = currencies
    },
    setLastCurrencyUsed(currency) {
      this.user.last_currency_used = currency
    },
    setProofTotal(proofTotal) {
      this.user.proofTotal = proofTotal
    },
    addProof(proof) {
      if (!this.user.proofs.some(existingProof => existingProof.id === proof.id)) {
        this.user.proofs.push(proof)
      }
    },
    updateProof(proofId, params) {
      const proof = this.user.proofs.find(proof => proof.id === proofId)
      Object.assign(proof, params)
    },
    removeProof(proofId) {
      this.user.proofs = this.user.proofs.filter(proof => proof.id !== proofId)
      this.user.proofTotal -= 1
    },
    setPreferedTheme(theme) {
      this.user.preferedTheme = theme
    }
  },
  // pinia-plugin-persistedstate
  persist: {
    storage: localStorage
  }
})

import { useCookies } from '@vueuse/integrations/useCookies'

const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search'
const NOMINATIM_RESULT_TYPE_EXCLUDE_LIST = ['fuel', 'gas', 'casino']
const USERNAME_LOCAL_STORAGE_KEY = 'username'
const TOKEN_LOCAL_STORAGE_KEY = 'access_token'
const RECENT_LOCATIONS_LOCAL_STORAGE_KEY = 'recent_locations'
const LAST_CURRENCY_USED_LOCAL_STORAGE_KEY = 'last_currency_used'


function getOrCreateLocalStorageItem(itemKey, defaultValue='') {
  if (!localStorage.getItem(itemKey)) {
      localStorage.setItem(itemKey, JSON.stringify(defaultValue))
  }
  return localStorage.getItem(itemKey)
}

function clearLocalStorageItem(itemKey, defaultValue='') {
  return localStorage.setItem(itemKey, JSON.stringify(defaultValue))
}

function getParsedLocalStorageItem(itemKey, defaultValue='') {
  let item = getOrCreateLocalStorageItem(itemKey, defaultValue)
  return JSON.parse(item)
}

function setValueToLocalStorageItem(itemKey, value) {
  return localStorage.setItem(itemKey, JSON.stringify(value))
}

function addObjectToLocalStorageItemArray(itemKey, obj, unshift=false, avoidDuplicates=true) {
  let itemJSON = getParsedLocalStorageItem(itemKey, [])
  // look for duplicate
  var duplicateItem = itemJSON.findIndex(item => JSON.stringify(item) === JSON.stringify(obj))
  if (avoidDuplicates && duplicateItem >= 0) {
    itemJSON.splice(duplicateItem, 1)
  }
  // add obj to array
  if (unshift) {
    itemJSON.unshift(obj)
  } else {
    itemJSON.push(obj)
  }
  return localStorage.setItem(itemKey, JSON.stringify(itemJSON))
}


export default {
  signIn(username, password) {
    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    return fetch(`${import.meta.env.VITE_OPEN_PRICES_API_URL}/auth`, {
      method: 'POST',
      body: formData,
    })
    .then((response) => response.json())
  },

  setAuth(username, token) {
    setValueToLocalStorageItem(USERNAME_LOCAL_STORAGE_KEY, username)
    setValueToLocalStorageItem(TOKEN_LOCAL_STORAGE_KEY, token)
  },

  signOut() {
    clearLocalStorageItem(USERNAME_LOCAL_STORAGE_KEY, null)
    clearLocalStorageItem(TOKEN_LOCAL_STORAGE_KEY, null)
  },

  getUsername() {
    return getParsedLocalStorageItem(USERNAME_LOCAL_STORAGE_KEY, null)
  },

  getToken() {
    return getParsedLocalStorageItem(TOKEN_LOCAL_STORAGE_KEY, null)
  },

  createProof(proofImage) {
    let formData = new FormData()
    formData.append('file', proofImage, proofImage.name)
    formData.append('type', 'PRICE_TAG')
    return fetch(`${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.getToken()}`
      },
      body: formData,
    })
    .then((response) => response.json())
  },

  createPrice(priceData) {
    return fetch(`${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      },
      body: JSON.stringify(priceData),
    })
    .then((response) => response.json())
  },

  getPrices(params = {}) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices?${new URLSearchParams(params)}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
  },

  getProductById(productId) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/products/${productId}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
  },

  getLocationById(locationId) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/locations/${locationId}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
  },

  openstreetmapNominatimSearch(q) {
    return fetch(`${NOMINATIM_SEARCH_URL}?q=${q}&addressdetails=1&format=json&limit=10`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => data.filter(l => !NOMINATIM_RESULT_TYPE_EXCLUDE_LIST.includes(l.type)))
  },

  getRecentLocations(limit=null) {
    let recentLocations = getParsedLocalStorageItem(RECENT_LOCATIONS_LOCAL_STORAGE_KEY, [])
    if (limit && recentLocations.length && recentLocations.length > limit) {
      return recentLocations.slice(0, limit)
    }
    return recentLocations
  },

  addRecentLocation(location) {
    return addObjectToLocalStorageItemArray(RECENT_LOCATIONS_LOCAL_STORAGE_KEY, location, true)
  },

  clearRecentLocations() {
    clearLocalStorageItem(RECENT_LOCATIONS_LOCAL_STORAGE_KEY, [])
  },

  getLastCurrencyUsed() {
    return getParsedLocalStorageItem(LAST_CURRENCY_USED_LOCAL_STORAGE_KEY, 'EUR')  // TODO: init with user locale?
  },

  setLastCurrencyUsed(currency) {
    return setValueToLocalStorageItem(LAST_CURRENCY_USED_LOCAL_STORAGE_KEY, currency)
  },
}

import { useCookies } from '@vueuse/integrations/useCookies'

const USERNAME_COOKIE_KEY = 'username'
const TOKEN_COOKIE_KEY = 'access_token'
const RECENT_LOCATIONS_LOCAL_STORAGE_KEY = 'recent_locations'


function getOrCreateLocalStorageItem(itemKey, defaultValue=[]) {
  if (!localStorage.getItem(itemKey)) {
      localStorage.setItem(itemKey, JSON.stringify(defaultValue));
  }
  return localStorage.getItem(itemKey);
}

function clearLocalStorageItem(itemKey, defaultValue=[]) {
  return localStorage.setItem(itemKey, JSON.stringify(defaultValue));
}

function getParsedLocalStorageItem(itemKey) {
  let item = getOrCreateLocalStorageItem(itemKey);
  return JSON.parse(item);
}

function addObjectToLocalStorageItemList(itemKey, obj, avoidDuplicates=true) {
  let itemJSON = getParsedLocalStorageItem(itemKey);
  var existingItem = itemJSON.find(item => JSON.stringify(item) === JSON.stringify(obj));
  if (avoidDuplicates && existingItem) {
      return;
  }
  itemJSON[itemJSON.length] = obj;
  return localStorage.setItem(itemKey, JSON.stringify(itemJSON));
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

  signOut() {
    useCookies().remove(USERNAME_COOKIE_KEY)
    useCookies().remove(TOKEN_COOKIE_KEY)
  },

  setUsernameCookie(username) {
    useCookies().set(USERNAME_COOKIE_KEY, username)
  },

  setTokenCookie(token) {
    useCookies().set(TOKEN_COOKIE_KEY, token)
  },

  getUsername() {
    return useCookies().get(USERNAME_COOKIE_KEY)
  },

  getToken() {
    return useCookies().get(TOKEN_COOKIE_KEY)
  },

  createProof(proofImage) {
    let formData = new FormData()
    formData.append('file', proofImage)
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

  getPrices() {
    return fetch(`${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      },
    })
    .then((response) => response.json())
  },

  openstreetmapNominatimSearch(q) {
    return fetch(`https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=5`, {
      method: 'GET',
    })
    .then((response) => response.json())
  },

  getRecentLocations() {
    return getParsedLocalStorageItem(RECENT_LOCATIONS_LOCAL_STORAGE_KEY)
  },

  addRecentLocation(location) {
    return addObjectToLocalStorageItemList(RECENT_LOCATIONS_LOCAL_STORAGE_KEY, location)
  },

  clearRecentLocations() {
    clearLocalStorageItem(RECENT_LOCATIONS_LOCAL_STORAGE_KEY)
  }
}

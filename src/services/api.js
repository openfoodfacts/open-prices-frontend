import { useAppStore } from '../store'

const OPENFOODFACTS_PRODUCT_URL = 'https://world.openfoodfacts.org/api/v2/product'
const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search'
const NOMINATIM_RESULT_TYPE_EXCLUDE_LIST = ['fuel', 'gas', 'casino', 'parking', 'parking_space']

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

  getUsers(params = {}) {
    const defaultParams = {page: 1, size: 10}  // order_by default ?
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/users?${new URLSearchParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
  },

  createProof(proofImage) {
    const store = useAppStore()
    let formData = new FormData()
    formData.append('file', proofImage, proofImage.name)
    formData.append('type', 'PRICE_TAG')
    return fetch(`${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${store.user.token}`
      },
      body: formData,
    })
    .then((response) => response.json())
  },

  // will return only the user's proofs
  getProofs(params = {}) {
    const store = useAppStore()
    const defaultParams = {page: 1, size: 10, order_by: '-created'}
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs?${new URLSearchParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.user.token}`
      },
    })
    .then((response) => response.json())
  },

  createPrice(priceData) {
    const store = useAppStore()
    store.user.last_product_mode_used = priceData.product_code ? 'barcode' : 'category'
    return fetch(`${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.user.token}`
      },
      body: JSON.stringify(priceData),
    })
    .then((response) => response.json())
  },

  getPrices(params = {}) {
    const defaultParams = {page: 1, size: 10, order_by: '-created'}
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices?${new URLSearchParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
  },

  getProducts(params = {}) {
    const defaultParams = {page: 1, size: 10}  // order_by default ?
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/products?${new URLSearchParams({...defaultParams, ...params})}`
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

  getProductByCode(productCode) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/products/code/${productCode}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
  },

  getLocations(params = {}) {
    const defaultParams = {page: 1, size: 10}  // order_by default ?
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/locations?${new URLSearchParams({...defaultParams, ...params})}`
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

  openfoodfactsProductSearch(code) {
    return fetch(`${OPENFOODFACTS_PRODUCT_URL}/${code}.json`, {
      method: 'GET',
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

  updateStats() {
    const store = useAppStore()
    this.loading = true
    // TODO: use Promise
    // price stats
    this.getPrices({ size: 1 })
      .then((data) => {
        store.price_total = data.total
      })
    this.getPrices({ product_id__isnull: true, size: 1 })
      .then((data) => {
        store.price_without_product_total = data.total
      })
    // product stats
    this.getProducts({ size: 1 })
      .then((data) => {
        store.product_total = data.total
      })
    this.getProducts({ price_count__gte: 1, size: 1 })
      .then((data) => {
        store.product_with_price_total = data.total
      })
    // location stats
    this.getLocations({ size: 1 })
      .then((data) => {
        store.location_total = data.total
      })
    this.getLocations({ price_count__gte: 1, size: 1 })
    .then((data) => {
      store.location_with_price_total = data.total
    })
    // user stats
    this.getUsers({ size: 1 })
      .then((data) => {
        store.user_total = data.total
      })
    this.getUsers({ price_count__gte: 1, size: 1 })
    .then((data) => {
      store.user_with_price_total = data.total
    })
    // update last_updated
    this.last_updated = new Date()
    this.loading = false
  }
}

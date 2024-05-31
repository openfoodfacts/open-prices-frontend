import { useAppStore } from '../store'
import constants from '../constants'

const OPENFOODFACTS_PRODUCT_URL = 'https://world.openfoodfacts.org/api/v2/product'


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

  createProof(proofImage, type='PRICE_TAG') {
    const store = useAppStore()
    let formData = new FormData()
    formData.append('file', proofImage, proofImage.name)
    formData.append('type', type)
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

  // will return only the user's proof
  getProofById(proofId) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/${proofId}`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.user.token}`
      },
    })
    .then((response) => response.json())
  },

  updateProof(proofId, params = {}) {
    const store = useAppStore()
    return fetch(`${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/${proofId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${store.user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    .then((response) => response.json())
  },

  deleteProof(proofId) {
    const store = useAppStore()
    return fetch(`${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/${proofId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${store.user.token}`
      },
    })
    // .then((response) => response.json())
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

  updatePrice(priceId, params = {}) {
    const store = useAppStore()
    return fetch(`${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices/${priceId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${store.user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    .then((response) => response.json())
  },

  deletePrice(priceId) {
    const store = useAppStore()
    return fetch(`${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices/${priceId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${store.user.token}`
      },
    })
    // .then((response) => response.json())
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
    return fetch(`${constants.OSM_NOMINATIM_SEARCH_URL}?q=${q}&addressdetails=1&format=json&limit=10`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => data.filter(l => !constants.NOMINATIM_RESULT_TYPE_EXCLUDE_LIST.includes(l.type)))
  },
  openstreetmapPhotonSearch(q) {
    return fetch(`${constants.OSM_PHOTON_SEARCH_URL}?q=${q}&limit=10`, {
      method: 'GET',
    })
    .then((response) => response.json())
    .then(data => data.features)
    .then((data) => data.filter(l => !constants.NOMINATIM_RESULT_TYPE_EXCLUDE_LIST.includes(l.properties.osm_value)))
  },
  openstreetmapSearch(q, source='nominatim') {
    if (source === 'photon') {
      return this.openstreetmapPhotonSearch(q)
    } else {
      // default to nominatim
      return this.openstreetmapNominatimSearch(q)
    }
  }
}

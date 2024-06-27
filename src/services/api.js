import { useAppStore } from '../store'
import constants from '../constants'


const PRICE_UPDATE_FIELDS = ['price', 'price_is_discounted', 'price_without_discount', 'price_per', 'currency', 'date']
const PRICE_CREATE_FIELDS = PRICE_UPDATE_FIELDS.concat(['product_code', 'product_name', 'category_tag', 'labels_tags', 'origins_tags', 'location_osm_id', 'location_osm_type', 'proof_id'])
const PROOF_UPDATE_FIELDS = ['type', 'date', 'currency']

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}

const DEFAULT_PARAMS = {
  'app_name': constants.APP_USER_AGENT
}

function buildURLParams(params = {}) {
  return new URLSearchParams({...DEFAULT_PARAMS, ...params})
}

function filterBodyWithAllowedKeys(data, allowedKeys) {
  const filteredData = {}
  for (const key in data) {
    if (allowedKeys.includes(key)) {
      filteredData[key] = data[key]
    }
  }
  console.log(data, filteredData)
  return filteredData
}


export default {
  signIn(username, password) {
    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/auth?${buildURLParams()}`
    return fetch(url, {
      method: 'POST',
      body: formData,
      headers: {}
    })
    .then((response) => response.json())
  },

  getUsers(params = {}) {
    const defaultParams = {page: 1, size: 10}  // order_by default ?
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/users?${buildURLParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: DEFAULT_HEADERS
    })
    .then((response) => response.json())
  },

  createProof(proofImage, type='PRICE_TAG', location_osm_id=null, location_osm_type=null, date=null, currency=null) {
    const store = useAppStore()
    let formData = new FormData()
    formData.append('file', proofImage, proofImage.name)
    formData.append('type', type)
    formData.append('location_osm_id', location_osm_id ? location_osm_id : '')
    formData.append('location_osm_type', location_osm_type ? location_osm_type : '')
    formData.append('date', date ? date : '')
    formData.append('currency', currency ? currency : '')
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/upload?${buildURLParams()}`
    return fetch(url, {
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
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs?${buildURLParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: Object.assign({}, DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`
      }),
    })
    .then((response) => response.json())
  },

  // will return only the user's proof
  getProofById(proofId) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/${proofId}?${buildURLParams()}`
    return fetch(url, {
      method: 'GET',
      headers: Object.assign({}, DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`
      }),
    })
    .then((response) => response.json())
  },

  updateProof(proofId, data = {}) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/${proofId}?${buildURLParams()}`
    return fetch(url, {
      method: 'PATCH',
      headers: Object.assign({}, DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(filterBodyWithAllowedKeys(data, PROOF_UPDATE_FIELDS)),
    })
    .then((response) => response.json())
  },

  deleteProof(proofId) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/${proofId}?${buildURLParams()}`
    return fetch(url, {
      method: 'DELETE',
      headers: Object.assign({}, DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`
      }),
    })
    // .then((response) => response.json())
  },

  createPrice(data) {
    const store = useAppStore()
    store.user.last_product_mode_used = data.product_code ? 'barcode' : 'category'
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices?${buildURLParams()}`
    return fetch(url, {
      method: 'POST',
      headers: Object.assign({}, DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(filterBodyWithAllowedKeys(data, PRICE_CREATE_FIELDS)),
    })
    .then((response) => response.json())
  },

  getPrices(params = {}) {
    const defaultParams = {page: 1, size: 10, order_by: '-created'}
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices?${buildURLParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  updatePrice(priceId, data = {}) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices/${priceId}?${buildURLParams()}`
    return fetch(url, {
      method: 'PATCH',
      headers: Object.assign({}, DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(filterBodyWithAllowedKeys(data, PRICE_UPDATE_FIELDS)),
    })
    .then((response) => response.json())
  },

  deletePrice(priceId) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices/${priceId}?${buildURLParams()}`
    return fetch(url, {
      method: 'DELETE',
      headers: Object.assign({}, DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`
      }),
    })
    // .then((response) => response.json())
  },

  getProducts(params = {}) {
    const defaultParams = {page: 1, size: 10}  // order_by default ?
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/products?${buildURLParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  getProductById(productId) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/products/${productId}?${buildURLParams()}`
    return fetch(url, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  getProductByCode(productCode) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/products/code/${productCode}?${buildURLParams()}`
    return fetch(url, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  getLocations(params = {}) {
    const defaultParams = {page: 1, size: 10}  // order_by default ?
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/locations?${buildURLParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  getLocationById(locationId) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/locations/${locationId}?${buildURLParams()}`
    return fetch(url, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  openfoodfactsProductSearch(code) {
    return fetch(`${constants.OFF_API_URL}/${code}.json`, {
      method: 'GET',
      headers: DEFAULT_HEADERS
    })
    .then((response) => response.json())
  },

  openstreetmapNominatimSearch(q) {
    return fetch(`${constants.OSM_NOMINATIM_SEARCH_URL}?q=${q}&addressdetails=1&format=json&limit=10`, {
      method: 'GET',
      headers: DEFAULT_HEADERS
    })
    .then((response) => response.json())
    .then((data) => data.filter(l => !constants.NOMINATIM_RESULT_TYPE_EXCLUDE_LIST.includes(l.type)))
  },
  openstreetmapNominatimLookup(id) {
    return fetch(`${constants.OSM_NOMINATIM_LOOKUP_URL}?osm_ids=N${id},W${id},R${id}&addressdetails=1&format=json`, {
      method: 'GET',
      headers: DEFAULT_HEADERS
    })
    .then((response) => response.json())
    .then((data) => data.filter(l => !constants.NOMINATIM_RESULT_TYPE_EXCLUDE_LIST.includes(l.type)))
  },
  openstreetmapPhotonSearch(q) {
    return fetch(`${constants.OSM_PHOTON_SEARCH_URL}?q=${q}&limit=10`, {
      method: 'GET',
      headers: DEFAULT_HEADERS
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

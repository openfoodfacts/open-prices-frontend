import { useAppStore } from '../store'
import constants from '../constants'


const PRICE_UPDATE_FIELDS = ['price', 'price_is_discounted', 'price_without_discount', 'price_per', 'currency', 'receipt_quantity', 'date']
const PRICE_CREATE_FIELDS = PRICE_UPDATE_FIELDS.concat(['type', 'product_code', 'product_name', 'category_tag', 'labels_tags', 'origins_tags', 'location_id', 'location_osm_id', 'location_osm_type', 'proof_id'])
const PROOF_UPDATE_FIELDS = ['type', 'date', 'currency', 'receipt_price_count', 'receipt_price_total']
const PROOF_CREATE_FIELDS = PROOF_UPDATE_FIELDS.concat(['location_id', 'location_osm_id', 'location_osm_type'])  // 'file'
const LOCATION_ONLINE_CREATE_FIELDS = ['type', 'website_url']
const LOCATION_SEARCH_LIMIT = 10

const OP_DEFAULT_PAGE_SIZE = 25  // 100 slows down the app
const OP_DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}
const OP_DEFAULT_PARAMS = {
  'app_name': constants.APP_USER_AGENT
  // 'app_version'  // hack to store price/proof create source
}

function buildURLParams(params = {}) {
  return new URLSearchParams({...OP_DEFAULT_PARAMS, ...params})
}

function filterBodyWithAllowedKeys(data, allowedKeys) {
  const filteredData = {}
  for (const key in data) {
    if (allowedKeys.includes(key)) {
      filteredData[key] = data[key]
    }
  }
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
    const defaultParams = {page: 1, size: OP_DEFAULT_PAGE_SIZE}  // order_by default ?
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/users?${buildURLParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
    })
    .then((response) => response.json())
  },

  // can only fetch the user's own data
  getUserById(userId) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/users/${userId}?${buildURLParams()}`
    return fetch(url, {
      method: 'GET',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`
      }),
    })
    .then((response) => response.json())
  },
  createProof(image, inputData, source = null) {
    const data = filterBodyWithAllowedKeys(inputData, PROOF_CREATE_FIELDS)
    const store = useAppStore()
    let formData = new FormData()
    formData.append('file', image, image.name)
    formData.append('type', data.type)
    if (data.location_id) {
      formData.append('location_id', data.location_id ? data.location_id : '')
    }
    if (data.location_osm_id && data.location_osm_type) {
      formData.append('location_osm_id', data.location_osm_id ? data.location_osm_id : '')
      formData.append('location_osm_type', data.location_osm_type ? data.location_osm_type : '')
    }
    formData.append('date', data.date ? data.date : '')
    formData.append('currency', data.currency ? data.currency : '')
    if (data.type === constants.PROOF_TYPE_RECEIPT) {
      if (data.receipt_price_count) {
        formData.append('receipt_price_count', data.receipt_price_count)
      }
      if (data.receipt_price_total) {
        formData.append('receipt_price_total', data.receipt_price_total)
      }
    }
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/upload?${buildURLParams({'app_version': source})}`
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
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
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
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`
      }),
    })
    .then((response) => response.json())
  },

  updateProof(proofId, inputData = {}) {
    const data = filterBodyWithAllowedKeys(inputData, PROOF_UPDATE_FIELDS)
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/${proofId}?${buildURLParams()}`
    return fetch(url, {
      method: 'PATCH',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
  },

  deleteProof(proofId) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/${proofId}?${buildURLParams()}`
    return fetch(url, {
      method: 'DELETE',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`
      }),
    })
    // .then((response) => response.json())
  },

  createPrice(inputData, source = null) {
    const data = filterBodyWithAllowedKeys(inputData, PRICE_CREATE_FIELDS)
    const store = useAppStore()
    store.user.last_product_product_used = data.product_code ? constants.PRICE_TYPE_PRODUCT : constants.PRICE_TYPE_CATEGORY
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices?${buildURLParams({'app_version': source})}`
    return fetch(url, {
      method: 'POST',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
  },

  getPrices(params = {}) {
    const defaultParams = {page: 1, size: OP_DEFAULT_PAGE_SIZE, order_by: '-created'}
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices?${buildURLParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  getPriceById(priceId) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices/${priceId}?${buildURLParams()}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  updatePrice(priceId, inputData = {}) {
    const data = filterBodyWithAllowedKeys(inputData, PRICE_UPDATE_FIELDS)
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices/${priceId}?${buildURLParams()}`
    return fetch(url, {
      method: 'PATCH',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
  },

  deletePrice(priceId) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices/${priceId}?${buildURLParams()}`
    return fetch(url, {
      method: 'DELETE',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`
      }),
    })
    // .then((response) => response.json())
  },

  getProducts(params = {}) {
    const defaultParams = {page: 1, size: OP_DEFAULT_PAGE_SIZE}  // order_by default ?
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/products?${buildURLParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  getProductById(productId) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/products/${productId}?${buildURLParams()}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  getProductByCode(productCode) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/products/code/${productCode}?${buildURLParams()}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  createLocationOnline(inputData) {
    const data = filterBodyWithAllowedKeys(inputData, LOCATION_ONLINE_CREATE_FIELDS)
    const store = useAppStore()
    data.type = constants.LOCATION_TYPE_ONLINE
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/locations?${buildURLParams()}`
    return fetch(url, {
      method: 'POST',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
  },

  getLocations(params = {}) {
    const defaultParams = {page: 1, size: OP_DEFAULT_PAGE_SIZE}  // order_by default ?
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/locations?${buildURLParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  getLocationById(locationId) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/locations/${locationId}?${buildURLParams()}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  getStats() {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/stats?${buildURLParams()}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  openfoodfactsProductSearch(code) {
    const url = `${constants.OFF_API_URL}/${code}.json`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
    })
    .then((response) => response.json())
  },

  openstreetmapNominatimSearch(q) {
    const url = `${constants.OSM_NOMINATIM_SEARCH_URL}?q=${q}&addressdetails=1&format=json&limit=${LOCATION_SEARCH_LIMIT}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
    })
    .then((response) => response.json())
    .then((data) => data.filter(l => !constants.NOMINATIM_RESULT_TYPE_EXCLUDE_LIST.includes(l.type)))
  },
  openstreetmapNominatimLookup(id) {
    const url = `${constants.OSM_NOMINATIM_LOOKUP_URL}?osm_ids=N${id},W${id},R${id}&addressdetails=1&format=json`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
    })
    .then((response) => response.json())
    .then((data) => data.filter(l => !constants.NOMINATIM_RESULT_TYPE_EXCLUDE_LIST.includes(l.type)))
  },
  // Photon: restrict the search to shop & amenity
  openstreetmapPhotonSearch(q, restrictToShop=true) {
    let url = `${constants.OSM_PHOTON_SEARCH_URL}?q=${q}&limit=${LOCATION_SEARCH_LIMIT}`
    if (restrictToShop) {
      url += '&osm_tag=shop&osm_tag=amenity'
    }
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
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
  },
  processWithGemini(labels) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/process_with_gemini`
    const formData = new FormData()

    labels.forEach((label) => {
      formData.append('files', label.blob)
    });

    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${store.user.token}`,
      },
      body: formData,
    })
    .then((response) => response.json())
  },
  getPriceTags(params = {}) {
    const defaultParams = {page: 1, size: OP_DEFAULT_PAGE_SIZE}  // order_by default ?
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/price-tags?${buildURLParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },
  updatePriceTag(priceTagId, inputData = {}) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/price-tags/${priceTagId}?${buildURLParams()}`
    return fetch(url, {
      method: 'PATCH',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(inputData),
    })
    .then((response) => response.json())
  }
}

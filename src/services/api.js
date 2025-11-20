import { useAppStore } from '../store'
import constants from '../constants'


const PRICE_UPDATE_FIELDS = ['type', 'category_tag', 'labels_tags', 'origins_tags', 'price', 'price_is_discounted', 'price_without_discount', 'discount_type', 'price_per', 'currency', 'receipt_quantity', 'owner_comment', 'date']
const PRICE_CREATE_FIELDS = PRICE_UPDATE_FIELDS.concat(['product_code', 'product_name', 'location_id', 'location_osm_id', 'location_osm_type', 'proof_id'])
const PROOF_UPDATE_FIELDS = ['type', 'date', 'currency', 'receipt_price_count', 'receipt_price_total', 'receipt_online_delivery_costs', 'owner_consumption', 'owner_comment', 'ready_for_price_tag_validation']
const PROOF_CREATE_FIELDS = PROOF_UPDATE_FIELDS.concat(['location_id', 'location_osm_id', 'location_osm_type'])  // 'file'
const LOCATION_ONLINE_CREATE_FIELDS = ['type', 'website_url']
const LOCATION_SEARCH_LIMIT = 10

const OP_DEFAULT_PAGE_SIZE = 25  // 100 slows down the app
const OP_DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}
const OP_DEFAULT_PARAMS = {
  'app_name': constants.APP_USER_AGENT,
  // 'app_version'
  // 'app_platform'
  // 'app_page'  // filled with the page url
}

function buildURLParams(params = {}) {
  // first merge with OP default params
  const allParams = {...OP_DEFAULT_PARAMS, ...params}
  // flatten params to allow multiple entries for the same key
  const flattenAllParams = Object.entries(allParams).flatMap(([key, values]) => Array.isArray(values) ? values.map((value) => [key, value]) : [[key, values]])
  // build search params
  return new URLSearchParams(flattenAllParams)
}

function filterBodyWithAllowedKeys(data, allowedKeys) {
  let filteredData = {}
  for (const key in data) {
    if (allowedKeys.includes(key)) {
      filteredData[key] = data[key]
    }
  }
  return filteredData
}

function extraPriceCreateOrUpdateFiltering(data) {
  let filteredData = {...data}
  // product-only rules
  if (filteredData.type == constants.PRICE_TYPE_PRODUCT) {
    delete filteredData.price_per
    delete filteredData.category_tag
    delete filteredData.origins_tags
    delete filteredData.labels_tags
  }
  // category-only rules
  else if (filteredData.type == constants.PRICE_TYPE_CATEGORY) {
    delete filteredData.product_code
    delete filteredData.product
    if (filteredData.origins_tags.length) {
      if (typeof filteredData.origins_tags === 'string') {
        filteredData.origins_tags = [filteredData.origins_tags]
      }
    } else {
      filteredData.origins_tags = ['en:unknown']
    }
    if (filteredData.labels_tags) {
      if (filteredData.labels_tags.length == 0) {
        filteredData.labels_tags = null
      }
      else if (typeof filteredData.labels_tags === 'string') {
        filteredData.labels_tags = [filteredData.labels_tags]
      }
    }
  }
  // generic rules
  if (!filteredData.price_is_discounted) {
    filteredData.price_without_discount = null
    filteredData.discount_type = null
  }
  return filteredData
}


export default {
  /**
   * OPEN PRICES API
  */ 

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
    const store = useAppStore()
    // build body
    const data = filterBodyWithAllowedKeys(inputData, PROOF_CREATE_FIELDS)
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
      if (data.receipt_online_delivery_costs) {
        formData.append('receipt_online_delivery_costs', data.receipt_online_delivery_costs)
      }
      if (data.owner_consumption === true || data.owner_consumption === false) {
        formData.append('owner_consumption', data.owner_consumption)
      }
      if (data.owner_comment) {
        formData.append('owner_comment', data.owner_comment)
      }
    }
    else if (data.type === constants.PROOF_TYPE_PRICE_TAG) {
      if (data.ready_for_price_tag_validation) {
        formData.append('ready_for_price_tag_validation', data.ready_for_price_tag_validation)
      }
    }
    // update store
    if (data.currency) {
      store.setLastCurrencyUsed(data.currency)
    }
    // API call
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/upload?${buildURLParams({'app_page': source})}`
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
    const store = useAppStore()
    // build body
    const data = filterBodyWithAllowedKeys(inputData, PROOF_UPDATE_FIELDS)
    // API call
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
    const store = useAppStore()
    // build body
    let data = filterBodyWithAllowedKeys(inputData, PRICE_CREATE_FIELDS)
    data = extraPriceCreateOrUpdateFiltering(data)
    // update store
    store.user.last_product_product_used = data.product_code ? constants.PRICE_TYPE_PRODUCT : constants.PRICE_TYPE_CATEGORY
    // API call
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices?${buildURLParams({'app_page': source})}`
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
    const store = useAppStore()
    // build body
    let data = filterBodyWithAllowedKeys(inputData, PRICE_UPDATE_FIELDS)
    data = extraPriceCreateOrUpdateFiltering(data)
    // API call
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

  processWithGemini(labels) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/proofs/process-with-gemini`
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
    const defaultParams = {page: 1, size: 10}  // order_by default ?
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
  },

  createPriceTag(inputData) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/price-tags?${buildURLParams()}`
    return fetch(url, {
      method: 'POST',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(inputData),
    })
    .then((response) => response.json())
  },

  getReceiptItems(params = {}) {
    const defaultParams = {page: 1, size: OP_DEFAULT_PAGE_SIZE}
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/receipt-items?${buildURLParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  updateReceiptItem(receiptItemId, inputData = {}) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/receipt-items/${receiptItemId}?${buildURLParams()}`
    return fetch(url, {
      method: 'PATCH',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(inputData),
    })
    .then((response) => response.json())
  },

  createReceiptItem(inputData) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/receipt-items?${buildURLParams()}`
    return fetch(url, {
      method: 'POST',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(inputData),
    })
    .then((response) => response.json())
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

  updateOffProduct(productCode, inputData = {}) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/products/code/${productCode}/off-update?${buildURLParams()}`
    return fetch(url, {
      method: 'PATCH',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`
      }),
      body: JSON.stringify(inputData),
    })
    .then((response) => response.json())
  },

  updateOffProductImage(productCode, inputData = {}) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/products/code/${productCode}/off-upload-image?${buildURLParams()}`
    return fetch(url, {
      method: 'PATCH',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`
      }),
      body: JSON.stringify(inputData),
    })
    .then((response) => response.json())
  },

  createLocationOnline(inputData) {
    const store = useAppStore()
    const data = filterBodyWithAllowedKeys(inputData, LOCATION_ONLINE_CREATE_FIELDS)
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

  getFlags(params = {}) {
    const store = useAppStore()
    const defaultParams = {page: 1, size: OP_DEFAULT_PAGE_SIZE}  // order_by default ?
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/flags?${buildURLParams({...defaultParams, ...params})}`
    return fetch(url, {
      method: 'GET',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
    })
    .then((response) => response.json())
  },

  createFlag(objectType, objectId, inputData) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/${objectType}s/${objectId}/flag?${buildURLParams()}`
    return fetch(url, {
      method: 'POST',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(inputData),
    })
    .then((response) => response.json())
  },

  updateFlag(flagId, inputData = {}) {
    const store = useAppStore()
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/flags/${flagId}?${buildURLParams()}`
    return fetch(url, {
      method: 'PATCH',
      headers: Object.assign({}, OP_DEFAULT_HEADERS, {
        'Authorization': `Bearer ${store.user.token}`,
      }),
      body: JSON.stringify(inputData),
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

  getPriceStats(params = {}) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices/stats?${buildURLParams({...params})}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  getChallenges(params = {}) {
    const url = `${import.meta.env.VITE_OPEN_PRICES_API_URL}/challenges?${buildURLParams({...params})}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS,
    })
    .then((response) => response.json())
  },

  /**
   * OPEN FOOD FACTS API
  */ 

  openfoodfactsProductSearch(code) {
    const url = `${constants.OFF_API_URL}/${code}.json`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
    })
    .then((response) => response.json())
  },

  searchaliciousProductSearch(code) {
    const url = `${constants.OFF_SEARCHALICIOUS_API_URL}/search?q=code:${code}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
    })
    .then((response) => response.json())
  },


  /**
   * OPENSTREETMAP API
  */ 

  /**
   * Nominatim search by query
   * @param q: search query
   */
  openstreetmapNominatimSearch(q) {
    const url = `${constants.OSM_NOMINATIM_SEARCH_URL}?q=${q}&addressdetails=1&format=json&limit=${LOCATION_SEARCH_LIMIT}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
    })
    .then((response) => response.json())
    .then((data) => data.filter(l => !constants.NOMINATIM_RESULT_TYPE_EXCLUDE_LIST.includes(l.type)))
  },
 /**
   * Nominatim lookup by OSM ID
   * @param id: OSM ID (without prefix)
   */
  openstreetmapNominatimLookup(id) {
    const url = `${constants.OSM_NOMINATIM_LOOKUP_URL}?osm_ids=N${id},W${id},R${id}&addressdetails=1&format=json`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
    })
    .then((response) => response.json())
  },
  /**
   * Photon search by query
   * @param restrictToShop: restrict the search to shop & amenity
   * @param filterResultsOnProperties: filter out results based on their properties.osm_value
   */
  openstreetmapPhotonSearch(q, restrictToShop=true, filterResultsOnProperties=true) {
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
    .then((data) => data.filter(l => filterResultsOnProperties ? !constants.NOMINATIM_RESULT_TYPE_EXCLUDE_LIST.includes(l.properties.osm_value) : true))
  },
  /**
   * OpenStreetMap search by query
   * @param source: 'nominatim' (default) or 'photon'
   */
  openstreetmapSearch(q, source='nominatim') {
    if (source === 'photon') {
      return this.openstreetmapPhotonSearch(q)
    } else {
      // default to nominatim
      return this.openstreetmapNominatimSearch(q)
    }
  },
}

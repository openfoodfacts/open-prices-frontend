import constants from '../constants.js'


const OP_DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}

function getFlavorBaseUrl(flavor = 'off') {
  if (flavor === 'obf') return constants.OBF_URL
  if (flavor === 'opff') return constants.OPFF_URL
  if (flavor === 'opf') return constants.OPF_URL
  return constants.OFF_URL
}

export default {
  openfoodfactsProductSearch(code) {
    const url = `${constants.OFF_API_URL}/${code}.json`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
    })
    .then((response) => response.json())
  },

  getProductByCode(code, flavor = 'off') {
    const baseUrl = getFlavorBaseUrl(flavor)
    const url = `${baseUrl}/api/v2/product/${code}.json`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
    })
    .then((response) => response.json())
  },

  getTaxonomySuggestions(tagtype, term, flavor = 'off') {
    if (!term || term.trim().length < 2) {
      return Promise.resolve([])
    }
    const baseUrl = getFlavorBaseUrl(flavor)
    const url = `${baseUrl}/cgi/suggest.pl?tagtype=${encodeURIComponent(tagtype)}&term=${encodeURIComponent(term.trim())}`
    return fetch(url, {
      method: 'GET'
    })
    .then((response) => response.json())
    .catch(() => [])
  },

  searchaliciousProductSearch(code) {
    const url = `${constants.OFF_SEARCHALICIOUS_API_URL}/search?q=code:${code}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
    })
    .then((response) => response.json())
  },
}

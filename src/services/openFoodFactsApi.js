import constants from '../constants'


const OP_DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
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

  searchaliciousProductSearch(code) {
    const url = `${constants.OFF_SEARCHALICIOUS_API_URL}/search?q=code:${code}`
    return fetch(url, {
      method: 'GET',
      headers: OP_DEFAULT_HEADERS
    })
    .then((response) => response.json())
  },
}

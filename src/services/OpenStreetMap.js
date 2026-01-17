import constants from '../constants'
const OP_DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}
const LOCATION_SEARCH_LIMIT = 10
export default {
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
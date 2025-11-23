import CountriesWithEmoji from '../data/countries-with-emoji.json'
import constants from '../constants'


function getCountryEmojiFromName(countryString) {
  const country = CountriesWithEmoji.find(c => c.name === countryString || (c.name_original && c.name_original.length && c.name_original.includes(countryString)))
  return country ? country.emoji : null
}

function getCountryEmojiFromCode(countryCode) {
  const country = CountriesWithEmoji.find(c => c.code === countryCode)
  return country ? country.emoji : null
}

function getLocationName(locationObject) {
  // Photon
  if (locationObject.properties) {
    return locationObject.properties.name
  }
  // Nominatim or OP
  return locationObject.name || locationObject.osm_name || ''
}

function getLocationRoad(locationObject) {
  // Nominatim
  if (locationObject.address) {
    let locationRoad = locationObject.address.house_number ? `${locationObject.address.house_number}, ` : ''
    locationRoad += locationObject.address.road || ''
    return locationRoad
  }
  // Photon
  else if (locationObject.properties) {
    let locationRoad = locationObject.properties.housenumber ? `${locationObject.properties.housenumber}, ` : ''
    locationRoad += locationObject.properties.street || ''
    return locationRoad
  }
  // OP
  return ''
}

function getLocationCity(locationObject) {
  // Nominatim
  if (locationObject.address) {
    return locationObject.address.village || locationObject.address.town || locationObject.address.city || locationObject.address.municipality
  }
  // Photon
  else if (locationObject.properties) {
    return locationObject.properties.village || locationObject.properties.town || locationObject.properties.city || locationObject.properties.municipality
  }
  // OP
  return locationObject.osm_address_city || ''
}

function getLocationCountry(locationObject) {
  // Nominatim
  if (locationObject.address) {
    return locationObject.address.country || ''
  }
  // Photon
  else if (locationObject.properties) {
    return locationObject.properties.country || ''
  }
  // OP
  return locationObject.osm_address_country || ''
}

/**
 * input: {"geometry":{"coordinates":[2.3548062,48.8301752],"type":"Point"},"type":"Feature","properties":{"osm_id":11112946989,"country":"France","city":"Paris","countrycode":"FR","postcode":"75013","locality":"Quartier de la Maison-Blanche","type":"house","osm_type":"N","osm_key":"shop","housenumber":"30","street":"Avenue d'Italie","district":"Paris","osm_value":"department_store","name":"HEMA","state":"Ile-de-France"}}
 * output: HEMA ; 30, Avenue d'Italie, Paris
 */
function getLocationOSMTitle(locationObject, withName=true, withRoad=false, withCity=true, withCountry=false, withEmoji=false) {
  let locationTitle = ''
  if (withName) {
    locationTitle += `${getLocationName(locationObject)}`
  }
  if (withRoad && (locationObject.address || locationObject.properties)) {
    locationTitle += locationTitle ? ', ' : ''
    locationTitle += getLocationRoad(locationObject)
  }
  if (withCity) {
    locationTitle += locationTitle ? ', ' : ''
    locationTitle += getLocationCity(locationObject)
  }
  if (withCountry) {
    locationTitle += locationTitle ? ', ' : ''
    locationTitle += getLocationCountry(locationObject)
  }
  if (withEmoji) {
    // locationTitle += ` ${getCountryEmojiFromName(locationObject.osm_address_country) || ''}`
    locationTitle += ` ${getCountryEmojiFromCode(locationObject.osm_address_country_code) || ''}`
  }
  if (!locationTitle) {
    locationTitle = locationObject.id
  }
  return locationTitle
}

function getLocationID(locationObject) {
  // Photon
  if (locationObject.properties) {
    return locationObject.properties.osm_id
  }
  // Nominatim or OP
  return locationObject.osm_id
}

function getLocationType(locationObject) {
  if (locationObject.properties) {
    const OSM_TYPE_MAPPING = {"N": "Node", "W": "Way", "R": "Relation"}
    return OSM_TYPE_MAPPING[locationObject.properties.osm_type].toUpperCase()
  }
  // Nominatim or OP
  return locationObject.osm_type.toUpperCase()
}

function buildLocationUniqueId(locationId, locationType) {
  // examples: N12345, W12345, R12345
  if (locationId && locationType) {
    return `${locationType[0]}${locationId.toString()}`
  }
  return null
}

function getLocationUniqueID(locationObject) {
  return buildLocationUniqueId(getLocationID(locationObject), getLocationType(locationObject))
}

function getLocationTag(locationObject) {
  // examples: shop:supermarket, shop:convenience, shop:bakery, shop:doityourself
  // Photon
  if (locationObject.properties) {
    return `${locationObject.properties.osm_key}:${locationObject.properties.osm_value}`
  }
  // Nominatim
  else if (locationObject.address) {
    return `${locationObject.class}:${locationObject.type}`
  }
  // OP
  return `${locationObject.osm_tag_key}:${locationObject.osm_tag_value}`
}

function getLocationLatLng(locationObject) {
  // Nominatim
  if (locationObject.lat && locationObject.lon) {
    return [locationObject.lat, locationObject.lon]
  }
  // Photon
  else if (locationObject.geometry && locationObject.geometry.coordinates) {
    return [locationObject.geometry.coordinates[1], locationObject.geometry.coordinates[0]]
  }
  // OP
  return [locationObject.osm_lat, locationObject.osm_lon]
}

function getMapBounds(results) {
  if (results.length > 0) {
    // Nominatim
    if (results[0].lat && results[0].lon) {
      return results.map(l => [l.lat, l.lon])
    }
    // Photon
    else if (results[0].geometry && results[0].geometry.coordinates) {
      return results.map(l => [l.geometry.coordinates[1], l.geometry.coordinates[0]])
    }
    // OP
    return results.map(l => [l.osm_lat, l.osm_lon])
  }
  return null
}

function getMapCenter(results) {
  if (results.length > 0) {
    // Nominatim
    if (results[0].lat && results[0].lon) {
      return [results[0].lat, results[0].lon]
    }
    // Photon
    else if (results[0].geometry && results[0].geometry.coordinates) {
      return [results[0].geometry.coordinates[1], results[0].geometry.coordinates[0]]
    }
    // OP
    return [results[0].osm_lat, results[0].osm_lon]
  }
  return [45, 5]
}

// OP location
function getLocationONLINETitle(locationObject) {
  return locationObject.website_url
}

function getLocationIcon(locationObject) {
  // Photon location
  if (locationObject.properties) {
    return constants.LOCATION_TYPE_OSM_ICON
  }
  // Nominatim location
  else if (locationObject.address) {
    return constants.LOCATION_TYPE_OSM_ICON
  }
  // OP location
  else if (locationObject.type) {
    return constants[`LOCATION_TYPE_${locationObject.type}_ICON`] || constants.LOCATION_UNKNOWN_ICON
  }
  return constants.LOCATION_UNKNOWN_ICON
}


export default {
  getCountryEmojiFromName,
  getCountryEmojiFromCode,
  getLocationName,
  getLocationRoad,
  getLocationCity,
  getLocationOSMTitle,
  getLocationID,
  getLocationType,
  buildLocationUniqueId,
  getLocationUniqueID,
  getLocationTag,
  getLocationLatLng,
  getMapBounds,
  getMapCenter,
  getLocationONLINETitle,
  getLocationIcon
}

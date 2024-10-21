import CategoryTags from './data/category-tags.json'
import CountriesWithEmoji from './data/countries-with-emoji.json'
import constants from './constants'


function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, wait)
  }
}

function getDocumentScrollPercentage() {
  return (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100
}


function isNumber(value) {
  // return /^\d+$/.test(value)
  return !isNaN(parseFloat(value)) && isFinite(value)
}

/**
 * https://stackoverflow.com/a/67933747/4293684
 */
function isValidBarcode(value) {
  // We only allow correct length barcodes
  if (!value.match(/^(\d{8}|\d{12,14})$/)) {
    return false;
  }

  const paddedValue = value.padStart(14, '0');

  let result = 0;
  for (let i = 0; i < paddedValue.length - 1; i += 1) {
    result += parseInt(paddedValue.charAt(i), 10) * ((i % 2 === 0) ? 3 : 1);
  }

  return ((10 - (result % 10)) % 10) === parseInt(paddedValue.charAt(13), 10);
}

function addObjectToArray(arr, obj, unshift=false, avoidDuplicates=true) {
  // look for duplicate
  let duplicateItemIndex = arr.findIndex(item => JSON.stringify(item) === JSON.stringify(obj))
  if (avoidDuplicates && duplicateItemIndex >= 0) {
    arr.splice(duplicateItemIndex, 1)
  }
  // add obj to array
  if (unshift) {
    arr.unshift(obj)
  } else {
    arr.push(obj)
  }
  return arr
}

function removeObjectFromArray(arr, obj) {
  let itemIndex = arr.findIndex(item => JSON.stringify(item) === JSON.stringify(obj))
  arr.splice(itemIndex, 1)
  return arr
}

/**
 * fr: 4,00 €
 * en-US: €4.00
 */
function prettyPrice(price, currency) {
  return price.toLocaleString(navigator.language, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

/**
 * output: '2023-12-25'
 */
function currentDate() {
  return new Date().toISOString().substring(0, 10)
}

/**
 * output: '2023-12-25T00:00:00.000Z'
 */
function currentStartOfDay() {
  let today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  return today.toISOString()
}

/**
 * input: '2023-12-25'
 * output: '12/25/2023'
 */
function prettyDate(dateString) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(navigator.language, {dateStyle: 'short'}).format(date)
}

/**
 * input: '2023-12-25T17:08:19.021410+01:00'
 * output: '12/25/2023, 8:19AM'
 */
function prettyDateTime(dateTimeString) {
  const date = new Date(dateTimeString)
  return new Intl.DateTimeFormat(navigator.language, {dateStyle: 'short', timeStyle: 'short'}).format(date)
}

/**
 * input: '2023-12-25T17:08:19.021410+01:00'
 * output: 'December 25, 2023, 8:19:02 CEST'
 */
function offDateTime(dateTimeString) {
  const date = new Date(dateTimeString)
  return new Intl.DateTimeFormat(navigator.language, {dateStyle: 'long', timeStyle: 'medium'}).format(date)
}

/**
 * https://johnresig.com/blog/javascript-pretty-date/
 * input: '2023-12-25T17:08:19.021410+01:00'
 * output: '5 hours ago', 'Yesterday', '2 days ago'...
 * changes: add short (replace 'days' with 'd', remove 'Yesterday') & shortest (remove 'ago'), extend days & weeks
 */
function prettyRelativeDateTime(dateTimeString, size=null) {
  var date = new Date(dateTimeString || ''),
      diff = (((new Date()).getTime() - date.getTime()) / 1000),
      day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff) || day_diff < 0) return;

  if (size == 'shortest') {
    return day_diff == 0 && (
      diff < 60 && "just now" || diff < 120 && "1m" || diff < 3600 && Math.floor(diff / 60) + "m" || diff < 7200 && "1h" || diff < 86400 && Math.floor(diff / 3600) + "h") || day_diff < 10 && day_diff + "d" || Math.ceil(day_diff / 7) + "w";
  }
  if (size == 'short') {
    return day_diff == 0 && (
      diff < 60 && "just now" || diff < 120 && "1m ago" || diff < 3600 && Math.floor(diff / 60) + "m ago" || diff < 7200 && "1h ago" || diff < 86400 && Math.floor(diff / 3600) + "h ago") || day_diff < 10 && day_diff + "d ago" || Math.ceil(day_diff / 7) + "w ago";
  }
  return day_diff == 0 && (
  diff < 60 && "just now" || diff < 120 && "1 minute ago" || diff < 3600 && Math.floor(diff / 60) + " minutes ago" || diff < 7200 && "1 hour ago" || diff < 86400 && Math.floor(diff / 3600) + " hours ago") || day_diff == 1 && "Yesterday" || day_diff < 10 && day_diff + " days ago" || Math.ceil(day_diff / 7) + " weeks ago";
}

function dateType(dateString) {
  if (dateString) {
    if (dateString.match(constants.DATE_FULL_REGEX_MATCH)) {
      return 'DAY'
    } else {
      // YYYY-MM
      const matches = dateString.match(constants.DATE_YEAR_MONTH_REGEX_MATCH)
      if (matches) {
        return 'MONTH'
      // YYYY
      } else if (dateString.match(constants.DATE_YEAR_REGEX_MATCH)) {
        return 'YEAR'
      } else {
        return null
      }
    }
  }
  return null
}

/**
 * OFF auth token format: 'username__uuid'
 */
function getOFFUsernameFromAuthToken(token) {
  return token.split("__")[0]
}

function getCategoryName(categoryId) {
  let category = CategoryTags.find(ct => ct.id === categoryId)
  return category ? category.name : categoryId
}

function getLocaleCategoryTags(locale) {
  return import(`./data/categories/${locale}.json`)
}

function getLocaleCategoryTag(locale, categoryId) {
  return getLocaleCategoryTags(locale).then((module) => {
    let category = module.default.find(ct => ct.id === categoryId)
    return category ? category : { 'id': categoryId, 'name': categoryId, 'status': 'unknown' }
  })
}

function getLocaleCategoryTagName(locale, categoryId) {
  return getLocaleCategoryTags(locale).then((module) => {
    let category = module.default.find(ct => ct.id === categoryId)
    return category ? category.name : categoryId
  })
}

function getLocaleOriginTags(locale) {
  return import(`./data/origins/${locale}.json`)
}

function getCountryEmojiFromName(countryString) {
  const country = CountriesWithEmoji.find(c => c.name === countryString || (c.name_original && c.name_original.length && c.name_original.indexOf(countryString) > -1))
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

/**
 * input: {"geometry":{"coordinates":[2.3548062,48.8301752],"type":"Point"},"type":"Feature","properties":{"osm_id":11112946989,"country":"France","city":"Paris","countrycode":"FR","postcode":"75013","locality":"Quartier de la Maison-Blanche","type":"house","osm_type":"N","osm_key":"shop","housenumber":"30","street":"Avenue d'Italie","district":"Paris","osm_value":"department_store","name":"HEMA","state":"Ile-de-France"}}
 * output: HEMA ; 30, Avenue d'Italie, Paris
 */
function getLocationOSMTitle(locationObject, withName=true, withRoad=false, withCity=true, withEmoji=false) {
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
  results [45, 5]
}

// OP location
function getLocationONLINETitle(locationObject) {
  return locationObject.website_url
}

// OP location
function getLocationIcon(locationObject) {
  if (locationObject) {
    if (locationObject.type === constants.LOCATION_TYPE_OSM) {
      return constants.LOCATION_TYPE_OSM_ICON
    } else if (locationObject.type === constants.LOCATION_TYPE_ONLINE) {
      return constants.LOCATION_TYPE_ONLINE_ICON
    }
  }
  return constants.LOCATION_UNKNOWN_ICON
}


export default {
  debounce,
  getDocumentScrollPercentage,
  isNumber,
  isValidBarcode,
  addObjectToArray,
  removeObjectFromArray,
  currentStartOfDay,
  prettyPrice,
  currentDate,
  prettyDate,
  prettyDateTime,
  offDateTime,
  prettyRelativeDateTime,
  dateType,
  getOFFUsernameFromAuthToken,
  getCategoryName,
  getLocaleCategoryTags,
  getLocaleCategoryTag,
  getLocaleCategoryTagName,
  getLocaleOriginTags,
  getCountryEmojiFromName,
  getCountryEmojiFromCode,
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
  getLocationIcon,
}

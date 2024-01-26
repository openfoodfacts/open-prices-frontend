import CategoryTags from './data/category-tags.json'
import CountriesWithEmoji from './data/countries-with-emoji.json'


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
 * https://johnresig.com/blog/javascript-pretty-date/
 * input: '2023-12-25T17:08:19.021410+01:00'
 * output: '5 hours ago', 'Yesterday', '2 days ago'...
 * changes: add short (replace 'days' with 'd', remove 'Yesterday') & shortest (remove 'ago'), extend days & weeks
 */
function prettyRelativeDateTime(dateTimeString, size=null) {
  var date = new Date((dateTimeString || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
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

function getCategory(categoryId) {
  return CategoryTags.find(ct => ct.id === categoryId)
}

function getCountryEmojiFromName(countryString) {
  const country = CountriesWithEmoji.find(c => c.name === countryString || (c.name_original && c.name_original.length && c.name_original.indexOf(countryString) > -1))
  return country ? country.emoji : null
}

function getLocationName(locationObject) {
  // Nominatim or OP
  return locationObject.osm_name || locationObject.name
}

function getLocationRoad(locationObject) {
  // Nominatim
  if (locationObject.address) {
    let locationRoad = locationObject.address.house_number ? `${locationObject.address.house_number} ` : ''
    locationRoad += locationObject.address.road || ''
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
  // OP
  return locationObject.osm_address_city || ''
}

function getLocationTitle(locationObject, withName=true, withRoad=false, withCity=true, withEmoji=false) {
  let locationTitle = ''
  if (withName) {
    locationTitle += `${getLocationName(locationObject)}`
  }
  if (withRoad && locationObject.address) {
    locationTitle += locationTitle ? ', ' : ''
    locationTitle += getLocationRoad(locationObject)
  }
  if (withCity) {
    locationTitle += locationTitle ? ', ' : ''
    locationTitle += getLocationCity(locationObject)
  }
  if (withEmoji) {
    locationTitle += ` ${getCountryEmojiFromName(locationObject.osm_address_country) || ''}`
  }
  return locationTitle
}


export default {
  addObjectToArray,
  removeObjectFromArray,
  currentStartOfDay,
  currentDate,
  prettyDate,
  prettyDateTime,
  prettyRelativeDateTime,
  getCategory,
  getCountryEmojiFromName,
  getLocationTitle,
}

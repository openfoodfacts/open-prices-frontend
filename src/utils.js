import CategoryTags from './data/category-tags.json'
import constants from './constants'


function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId)
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
 * https://stackoverflow.com/a/65528838
 * - valid: https://www.example.com, https://example.com, http://example.com, https://wwww.example.com/coucou
 * - invalid: www.example.com, example.com, coucou
 */
function isURL(value) {
  try {
    new URL(value)
    return true
  } catch (error) {  // eslint-disable-line no-unused-vars
    return false
  }
}

function getURLOrigin(value) {
  try {
    return new URL(value).origin
  } catch (error) {  // eslint-disable-line no-unused-vars
    return null
  }
}

/**
 * https://stackoverflow.com/a/67933747/4293684
 */
function isBarcodeValid(value) {
  // We only allow correct length barcodes
  if (!value.match(/^(\d{8}|\d{12,14})$/)) {
    return false;
  }

  const paddedValue = value.padStart(14, '0')

  let result = 0;
  for (let i = 0; i < paddedValue.length - 1; i += 1) {
    result += parseInt(paddedValue.charAt(i), 10) * ((i % 2 === 0) ? 3 : 1)
  }

  return ((10 - (result % 10)) % 10) === parseInt(paddedValue.charAt(13), 10)
}

function isBarcodeTooLong(value) {
  return value.length > 13
}

function cleanBarcode(value) {
  // keep only digits (remove letters, spaces, special characters)
  value = value.replace(/\D/g, '')
  // special case: 19 or 22 digits could be Carrefour
  // 182492/3119789831280 -> 1824923119789831280 -> 3119789831280
  // 182492/3119789831280/051 -> 1824923119789831280051 -> 3119789831280
  if ((value.length === 19) || (value.length === 22)) {
    value = value.substring(6, 6+13)
  }
  // remove leading zeros? no
  // https://openfoodfacts.github.io/openfoodfacts-server/api/ref-barcode-normalization/
  // value = value.replace(/^0+/, '')
  return value
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

function priceSum(priceList) {
  return priceList.reduce((acc, price) => {
    return acc + parseFloat(price.price) * (price.receipt_quantity ? parseFloat(price.receipt_quantity) : 1)
  }, 0)
}

/**
 * output: '2023-12-25'
 */
function currentDate() {
  return new Date().toISOString().substring(0, 10)
}

/**
 * output: '2023-12-25T17:08:19.021410+01:00'
 */
function currentDateTime() {
  return new Date().toISOString()
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
 * output: '2023-12-25T00:00:00.000Z'
 */
function dateStartOfDay(dateString) {
  let date = new Date(dateString)
  date.setUTCHours(0, 0, 0, 0)
  return date.toISOString()
}

/**
 * input: '2023-12-25'
 * output: '2023-12-25T23:59:59.999Z'
 */
function dateEndOfDay(dateString) {
  let date = new Date(dateString)
  date.setUTCHours(23, 59, 59, 999)
  return date.toISOString()
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
      day_diff = Math.floor(diff / 86400)

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

/**
 * input: '2023-12-25', '2023-12-31'
 * output: true if date (or today) is between start and end dates
 */
function isBetweenTwoDates(startDateString, endDateString, date=currentDateTime()) {
  const startDate = dateStartOfDay(startDateString)
  const endDate = dateEndOfDay(endDateString)
  return (startDate <= date) && (date <= endDate)
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

function getLocaleLabelTags(locale) {
  return import(`./data/labels/${locale}.json`)
}

function getLocaleLabelTagName(locale, labelId) {
  return getLocaleLabelTags(locale).then((module) => {
    let label = module.default.find(ct => ct.id === labelId)
    return label ? label.name : labelId
  })
}

function getPriceTypeIcon(priceType) {
  return constants[`PRICE_TYPE_${priceType}_ICON`] || constants.PRICE_ICON
}

function getProofTypeIcon(proofType) {
  return constants[`PROOF_TYPE_${proofType}_ICON`] || constants.PROOF_ICON
}

export default {
  debounce,
  getDocumentScrollPercentage,
  isNumber,
  isURL,
  getURLOrigin,
  isBarcodeValid,
  isBarcodeTooLong,
  cleanBarcode,
  addObjectToArray,
  removeObjectFromArray,
  prettyPrice,
  priceSum,
  currentDate,
  currentDateTime,
  currentStartOfDay,
  dateStartOfDay,
  dateEndOfDay,
  prettyDate,
  prettyDateTime,
  offDateTime,
  prettyRelativeDateTime,
  isBetweenTwoDates,
  dateType,
  getOFFUsernameFromAuthToken,
  getCategoryName,
  getLocaleCategoryTags,
  getLocaleCategoryTag,
  getLocaleCategoryTagName,
  getLocaleOriginTags,
  getLocaleLabelTags,
  getLocaleLabelTagName,
  getPriceTypeIcon,
  getProofTypeIcon,
}

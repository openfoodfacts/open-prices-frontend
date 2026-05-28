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
 * Remove all non-digit characters from a string
 */
function numericOnly(value) {
  return value.replace(/\D/g, '')
}

/**
 * Remove all non-digit and non-wildcard characters from a string (wildcard = *)
 */
function numericAndWildcardOnly(value) {
  return value.replace(/[^0-9*]/g, '')
}

function toArray(value) {
  if (Array.isArray(value)) {
    return value
  } else if (value) {
    return [value]
  } else {
    return []
  }
}

function slugify(value) {
  return value.toString().toLowerCase()
    .normalize('NFD')               // Decompose accented characters
    .replace(/\p{Diacritic}/gu, '') // Remove diacritics (accents)
    .replace(/'/g, '')              // Remove apostrophes like Django
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')        // Remove all non-word chars
    .replace(/--+/g, '-')           // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text
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

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}

function replaceCommaWithDot(value) {
  if (typeof value === 'string') {
    return value.replace(',', '.')
  }
  return value
}

function replaceStringWithList(value) {
  if (value === null) {
    return []
  }
  if (typeof value === 'string') {
    return value ? [value] : []
  }
  return value
}

/**
 * OFF auth token format: 'username__uuid'
 */
function getOFFUsernameFromAuthToken(token) {
  return token.split("__")[0]
}


export default {
  debounce,
  getDocumentScrollPercentage,
  isNumber,
  numericOnly,
  numericAndWildcardOnly,
  toArray,
  slugify,
  isURL,
  getURLOrigin,
  addObjectToArray,
  removeObjectFromArray,
  toTitleCase,
  replaceCommaWithDot,
  replaceStringWithList,
  getOFFUsernameFromAuthToken,
}

import CategoryTags from './data/category-tags.json'


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

function toArray(value) {
  if (Array.isArray(value)) {
    return value
  } else if (value) {
    return [value]
  } else {
    return []
  }
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

export default {
  debounce,
  getDocumentScrollPercentage,
  isNumber,
  toArray,
  isURL,
  getURLOrigin,
  addObjectToArray,
  removeObjectFromArray,
  getOFFUsernameFromAuthToken,
  getCategoryName,
  getLocaleCategoryTags,
  getLocaleCategoryTag,
  getLocaleCategoryTagName,
  getLocaleOriginTags,
  getLocaleLabelTags,
  getLocaleLabelTagName,
  toTitleCase,
  replaceCommaWithDot,
  replaceStringWithList
}

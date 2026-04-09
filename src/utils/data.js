/**
 * Categories per locale
 */
function getLocaleCategoryTags(locale) {
  return import(`@/data/categories/${locale}.json`)
}

/**
 * Input: locale & categoryId (e.g. "fr" & "en:croissants")
 * Output: category object (e.g. {"id": "en:croissants", "name": "Croissants"})
 */
function getLocaleCategoryTag(locale, categoryId) {
  return getLocaleCategoryTags(locale).then((module) => {
    let category = module.default.find(ct => ct.id === categoryId)
    return category ? category : { 'id': categoryId, 'name': categoryId, 'status': 'unknown' }
  })
}

/**
 * Input: locale & categoryId (e.g. "fr" & "en:croissants")
 * Output: category name (e.g. "Croissants")
 */
function getLocaleCategoryTagName(locale, categoryId) {
  return getLocaleCategoryTags(locale).then((module) => {
    let category = module.default.find(ct => ct.id === categoryId)
    return category ? category.name : categoryId
  })
}

/**
 * Origins per locale
 */
function getLocaleOriginTags(locale) {
  return import(`@/data/origins/${locale}.json`)
}

/**
 * Labels per locale
 */
function getLocaleLabelTags(locale) {
  return import(`@/data/labels/${locale}.json`)
}

/**
 * Input: locale & labelId (e.g. "fr" & "en:organic")
 * Output: label name (e.g. "Bio")
 */
function getLocaleLabelTagName(locale, labelId) {
  return getLocaleLabelTags(locale).then((module) => {
    let label = module.default.find(ct => ct.id === labelId)
    return label ? label.name : labelId
  })
}

/**
 * Countries per locale
 */
function getLocaleCountryTags(locale) {
  return import(`@/data/countries/${locale}.json`)
}

export default {
  getLocaleCategoryTags,
  getLocaleCategoryTag,
  getLocaleCategoryTagName,
  getLocaleOriginTags,
  getLocaleLabelTags,
  getLocaleLabelTagName,
  getLocaleCountryTags,
}

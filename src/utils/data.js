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
 * Input: locale & originId (e.g. "fr" & "en:france")
 * Output: origin object (e.g. {"id": "en:france", "name": "France"})
 */
function getLocaleOriginTag(locale, originId) {
  return getLocaleOriginTags(locale).then((module) => {
    let origin = module.default.find(ot => ot.id === originId)
    return origin ? origin : { 'id': originId, 'name': originId, 'status': 'unknown' }
  })
}

/**
 * Labels per locale
 */
function getLocaleLabelTags(locale) {
  return import(`@/data/labels/${locale}.json`)
}

/**
 * Input: locale & labelId (e.g. "fr" & "en:organic")
 * Output: label object (e.g. {"id": "en:organic", "name": "Bio"})
 */
function getLocaleLabelTag(locale, labelId) {
  return getLocaleLabelTags(locale).then((module) => {
    let label = module.default.find(ct => ct.id === labelId)
    return label ? label : { 'id': labelId, 'name': labelId, 'status': 'unknown' }
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
  getLocaleOriginTag,
  getLocaleLabelTags,
  getLocaleLabelTag,
  getLocaleCountryTags,
}

import constants from '../constants'
import barcode_utils from './barcode.js'

function getImageFullUrl(imagePath) {
  return `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${imagePath}`
}

function getProofImageFullUrl(proof, thumb=false) {
  if (thumb) {
    // return constants.PROOF_TYPE_PRICE_TAG_IMAGE_THUMB_URL
    // return constants.PROOF_TYPE_RECEIPT_IMAGE_THUMB_URL
    return getImageFullUrl(proof.image_thumb_path)
  }
  // return constants.PROOF_TYPE_PRICE_TAG_IMAGE_URL
  // return constants.PROOF_TYPE_RECEIPT_IMAGE_URL
  return getImageFullUrl(proof.file_path)
}

function getProofTypeIcon(proofType) {
  return constants[`PROOF_TYPE_${proofType}_ICON`] || constants.PROOF_ICON
}

/**
 * Format the price tag prediction depending on the version
 * Needed as input for the ContributionAssistantPriceFormCard
 */
function handlePriceTag(priceTag) {
  const priceTagPrediction = priceTag['predictions'][0]
  const label = priceTagPrediction['data']
  const barcodeString = label.barcode ? barcode_utils.cleanBarcode(label.barcode.toString()) : ''

  // The first schema was not versioned, so if the field is missing,
  // we assume it's schema version 1.0
  const schemaVersion = priceTagPrediction.schema_version || '1.0'

  // fields that are common to all schema versions are initialized here
  let productPriceForm = {
    id: priceTag.id,
    // type  // 'PRODUCT' or 'CATEGORY'
    // category_tag
    // labels_tags
    origins_tags: ![null, '', 'unknown', 'other'].includes(label.origin) ? [label.origin] : [],
    // price
    // price_per
    // price_is_discounted
    // price_without_discount
    // discount_type
    currency: priceTag['proof'].currency, // || this.appStore.getUserLastCurrencyUsed,
    proof: priceTag['proof'],
    proofImage: priceTag['proof'].file_path,
    croppedImage: null,
    product_code: barcodeString,
    detected_product_code: barcodeString,
    product_name: label.product_name,
    bounding_box: priceTag.bounding_box,
    status: priceTag.status,  // specific to the ProofPriceTagAssistant (vs the PriceValidationAssistant)
    price_id: priceTag.price_id,  // specific to the ProofPriceTagAssistant (vs the PriceValidationAssistant)
    loading: false
  }

  if (schemaVersion === '1.0') {
    // For schema version 1.0
    const priceType = barcodeString.length >= 8 ? constants.PRICE_TYPE_PRODUCT : constants.PRICE_TYPE_CATEGORY
    productPriceForm.type = priceType
    // we only populate category_tag and labels_tags if the price type is category
    productPriceForm.category_tag = (priceType === constants.PRICE_TYPE_CATEGORY && ![null, '', 'unknown', 'other'].includes(label.product)) ? label.product : null
    productPriceForm.labels_tags = (priceType === constants.PRICE_TYPE_CATEGORY && label.organic) ? [constants.PRODUCT_CATEGORY_LABEL_ORGANIC] : []
    productPriceForm.price = label.price.toString()
    productPriceForm.price_per = label.unit
    // price_is_discounted is not supported in schema version 1.0
    productPriceForm.price_is_discounted = false
  } else {
    // version 2.0 and above
    const priceType = label.type
    // The selected price is a price constructed by all price information available in the label,
    // including the discount price if available.
    const selectedPrice = label.selected_price || {}
    productPriceForm.type = priceType
    // we only populate category_tag and labels_tags if the price type is category
    productPriceForm.category_tag = (priceType === constants.PRICE_TYPE_CATEGORY && ![null, '', 'unknown', 'other'].includes(label.category)) ? label.category : null
    productPriceForm.labels_tags = (priceType === constants.PRICE_TYPE_CATEGORY && label.organic) ? [constants.PRODUCT_CATEGORY_LABEL_ORGANIC] : []
    productPriceForm.price = selectedPrice.price ? selectedPrice.price.toString() : ""
    productPriceForm.price_per = selectedPrice.price_per || null
    // in schema 2.0, we detect discount information (price, type)
    productPriceForm.price_is_discounted = selectedPrice ? selectedPrice.price_is_discounted : false
    productPriceForm.price_without_discount = selectedPrice.price_without_discount ? selectedPrice.price_without_discount.toString() : ""
    productPriceForm.discount_type = selectedPrice.discount_type || ""

    // Add similar barcodes if available
    if (label.similar_barcodes && label.similar_barcodes.length) {
      productPriceForm.similar_barcodes = label.similar_barcodes
    }
  }

  return productPriceForm
}

export default {
  getImageFullUrl,
  getProofImageFullUrl,
  getProofTypeIcon,
  handlePriceTag
}

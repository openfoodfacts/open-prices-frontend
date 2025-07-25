import constants from '../constants'

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

export default {
  getImageFullUrl,
  getProofImageFullUrl,
  getProofTypeIcon
}

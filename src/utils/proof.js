import constants from '../constants'

function getImageFullUrl(imagePath) {
  return `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${imagePath}`
}

function getProofImageFullUrl(proof, thumb=false) {
  if (thumb) {
    // return 'https://prices.openfoodfacts.org/img/0002/qU59gK8PQw.400.webp'  // PRICE_TAG
    // return 'https://prices.openfoodfacts.net/img/0001/lZGFga9ZOT.400.webp'  // RECEIPT
    return getImageFullUrl(proof.image_thumb_path)
  }
  // return 'https://prices.openfoodfacts.org/img/0002/qU59gK8PQw.webp'  // PRICE_TAG
  // return 'https://prices.openfoodfacts.net/img/0001/lZGFga9ZOT.webp'  // RECEIPT
  return getImageFullUrl(proof.file_path)  // proof.image_thumb_path
}

function getProofTypeIcon(proofType) {
  return constants[`PROOF_TYPE_${proofType}_ICON`] || constants.PROOF_ICON
}

export default {
  getImageFullUrl,
  getProofImageFullUrl,
  getProofTypeIcon
}

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

export default {
    isBarcodeValid,
    isBarcodeTooLong,
    cleanBarcode
}

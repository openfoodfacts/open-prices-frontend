import constants from '../constants'

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

function getPriceTypeIcon(priceType) {
  return constants[`PRICE_TYPE_${priceType}_ICON`] || constants.PRICE_ICON
}

export default {
  prettyPrice,
  priceSum,
  getPriceTypeIcon
}

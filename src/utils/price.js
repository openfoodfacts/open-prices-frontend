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

/**
 * Quantity should be in grams or milliliters.
 *
 * Examples:
 * - price: 2.5 €, quantity: 500 ml => 5 €/L
 * - price: 3 €, quantity: 250 g => 12 €/kg
 */
function pricePerQuantity(price, quantity) {
  if (!quantity || quantity === 0) {
    return price
  }
  return (price / quantity) * 1000
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
  pricePerQuantity,
  priceSum,
  getPriceTypeIcon
}

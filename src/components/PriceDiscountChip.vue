<template>
  <v-chip variant="outlined" size="small" color="error" density="comfortable">
    {{ $t('PriceCard.Discount') }}
    <v-tooltip v-if="price.price_without_discount" activator="parent" open-on-click location="top">
      {{ $t('PriceCard.FullPrice') }} {{ getPriceValueDisplay(price.price_without_discount) }}
    </v-tooltip>
  </v-chip>
</template>

<script>
import constants from '../constants'
import price_utils from '../utils/price.js'

export default {
  props: {
    price: {
      type: Object,
      required: true
    },
    productQuantity: {
      type: Number,
      default: null
    },
    productQuantityUnit: {
      type: String,
      default: constants.PRODUCT_QUANTITY_UNIT_G
    },
  },
  methods: {
    getPriceValue(priceValue, priceCurrency) {
      return price_utils.prettyPrice(priceValue, priceCurrency)
    },
    getPricePerUnit(price) {
      if (this.price.category_tag) {
        return price_utils.priceCategoryPerUnit(price, this.price.currency, this.price.price_per)
      }
      if (this.productQuantity) {
        return price_utils.priceProductPerUnit(price, this.price.currency, this.productQuantity, this.productQuantityUnit)
      }
    },
    getPriceValueDisplay(price) {
      price = parseFloat(price)
      if (this.price.category_tag) {
        return this.getPricePerUnit(price)
      }
      return this.getPriceValue(price, this.price.currency)
    },
  }
}
</script>

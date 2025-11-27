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
  computed: {
    categoryTag() {
      return this.price.category_tag
    },
    hasCategoryTag() {
      return !!this.categoryTag
    },
  },
  methods: {
    getPriceValue(priceValue, priceCurrency) {
      return price_utils.prettyPrice(priceValue, priceCurrency)
    },
    getPricePerQuantity(price, quantity) {
      return price_utils.pricePerQuantity(price, quantity)
    },
    getPricePerUnit(price) {
      price = parseFloat(price)
      if (this.hasCategoryTag) {
        if (this.price.price_per === 'UNIT') {
          return this.$t('PriceCard.PriceValueDisplayUnit', [this.getPriceValue(price, this.price.currency)])
        }
        // default to 'KILOGRAM'
        return this.$t('PriceCard.PriceValueDisplayKilogram', [this.getPriceValue(price, this.price.currency)])
      }
      if (this.hasProductQuantity) {
        const pricePerQuantity = this.getPricePerQuantity(price, this.productQuantity)
        if (this.productQuantityUnit === constants.PRODUCT_QUANTITY_UNIT_ML) {
          return this.$t('PriceCard.PriceValueDisplayLitre', [this.getPriceValue(pricePerQuantity, this.price.currency)])
        }
        return this.$t('PriceCard.PriceValueDisplayKilogram', [this.getPriceValue(pricePerQuantity, this.price.currency)])
      }
    },
    getPriceValueDisplay(price) {
      price = parseFloat(price)
      if (this.hasCategoryTag) {
        return this.getPricePerUnit(price)
      }
      return this.getPriceValue(price, this.price.currency)
    },
  }
}
</script>

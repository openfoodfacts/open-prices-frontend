<template>
  <p>
    <span class="mr-1">{{ getPriceValueDisplay(priceValue) }}</span>
    <span v-if="hasProductQuantity" class="mr-1">({{ getPricePerKilo() }})</span>
    <span v-if="priceWithoutDiscountValue">
      <v-chip class="mr-1" color="red" variant="outlined" size="small" density="comfortable">
        {{ $t('PriceCard.Discount') }}
        <v-tooltip activator="parent" location="top">{{ $t('PriceCard.FullPrice') }} {{ getPriceValueDisplay(priceWithoutDiscountValue) }}</v-tooltip>
      </v-chip>
    </span>
    <i18n-t v-if="!hidePriceDate" keypath="PriceCard.PriceDate" tag="span">
      <template v-slot:date>
        <i>{{ getDateFormatted(price.date) }}</i>
      </template>
    </i18n-t>
  </p>
</template>

<script>
import utils from '../utils.js'

export default {
  props: {
    'price': null,
    'productQuantity': null,
    'hidePriceDate': false
  },
  data() {
    return {}
  },
  computed: {
    categoryTag() {
      return this.price.category_tag
    },
    hasCategoryTag() {
      return !!this.categoryTag
    },
    hasProductQuantity() {
      !!this.productQuantity
    },
    priceValue() {
      return parseFloat(this.price.price)
    },
    priceWithoutDiscountValue() {
      return parseFloat(this.price.price_without_discount)
    },
    priceCurrency() {
      return this.price.currency
    },
  },
  methods: {
    getPriceValue(priceValue, priceCurrency) {
      return priceValue.toLocaleString(navigator.language, {
        style: 'currency',
        currency: priceCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
    },
    getPriceValueDisplay(price) {
      if (this.hasCategoryTag) {
        return this.$t('PriceCard.PriceValueDisplay', [this.getPriceValue(price, this.priceCurrency)])
      }
      return this.getPriceValue(price, this.priceCurrency)
    },
    getPricePerKilo() {
      const productQuantity = this.price.product.product_quantity
      let pricePerKilo = (this.priceValue / productQuantity) * 1000
      return this.$t('PriceCard.PriceValueDisplay', [this.getPriceValue(pricePerKilo, this.priceCurrency)])
    },
    getDateFormatted(dateString) {
      return utils.prettyDate(dateString)
    },
  }
}
</script>

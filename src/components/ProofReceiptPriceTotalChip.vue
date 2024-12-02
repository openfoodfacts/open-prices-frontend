<template>
  <v-chip label size="small" variant="flat" density="comfortable" :title="$t('Common.ReceiptPriceTotal')">
    {{ getPriceValueDisplay(count) }}
  </v-chip>
</template>

<script>
import utils from '../utils.js'

export default {
  props: {
    count: {
      type: Number,
      default: null
    },
    currency: {
      type: String,
      default: null
    }
  },
  methods: {
    getPriceValue(priceValue, priceCurrency) {
      return utils.prettyPrice(priceValue, priceCurrency)
    },
    getPriceValueDisplay(price) {
      price = parseFloat(price)
      return this.getPriceValue(price, this.currency)
    },
  }
}
</script>

<template>
  <v-chip label size="small" :variant="totalCount ? 'flat' : 'tonal'" density="comfortable" :title="$t('Common.ReceiptPriceTotal')">
    <span v-if="uploadedCount && totalCount">
      {{ getPriceValueDisplay(uploadedCount) }}&nbsp;/&nbsp;{{ getPriceValueDisplay(totalCount) }}
    </span>
    <span v-else-if="uploadedCount">
      {{ getPriceValueDisplay(uploadedCount) }}
    </span>
    <span v-else>
      {{ getPriceValueDisplay(totalCount) }}
    </span>
  </v-chip>
</template>

<script>
import price_utils from '../utils/price.js'

export default {
  props: {
    uploadedCount: {
      type: Number,
      default: null
    },
    totalCount: {
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
      return price_utils.prettyPrice(priceValue, priceCurrency)
    },
    getPriceValueDisplay(price) {
      price = parseFloat(price)
      return this.getPriceValue(price, this.currency)
    },
  }
}
</script>

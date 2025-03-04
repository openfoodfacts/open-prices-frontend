<template>
  <v-chip label size="small" :prepend-icon="LOCATION_TYPE_ONLINE_ICON" variant="flat" density="comfortable" :title="$t('Common.ReceiptOnlineDeliveryCosts')">
    {{ getPriceValueDisplay(price) }}
  </v-chip>
</template>

<script>
import constants from '../constants'
import utils from '../utils.js'

export default {
  props: {
    price: {
      type: Number,
      default: null
    },
    currency: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      LOCATION_TYPE_ONLINE_ICON: constants.LOCATION_TYPE_ONLINE_ICON,
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

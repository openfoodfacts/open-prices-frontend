<template>
  <v-chip label size="small" :prepend-icon="getPriceTypeIcon" density="comfortable">
    {{ getPriceTypeName }}
  </v-chip>
</template>

<script>
import price_utils from '../utils/price.js'

export default {
  props: {
    priceType: {
      type: String,
      default: null
    },
  },
  computed: {
    getPriceTypeIcon() {
      return price_utils.getPriceTypeIcon(this.priceType)
    },
    getPriceTypeName() {
      return this.$t(`Common.${this.priceType}`)
    }
  }
}
</script>

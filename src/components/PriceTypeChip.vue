<template>
  <v-chip label size="small" :prepend-icon="getPriceTypeIcon" density="comfortable">
    {{ getPriceTypeName }}
  </v-chip>
</template>

<script>
import utils from '../utils.js'

export default {
  props: {
    priceType: {
      type: String,
      default: null
    },
  },
  computed: {
    getPriceTypeIcon() {
      return utils.getPriceTypeIcon(this.priceType)
    },
    getPriceTypeName() {
      return this.$t(`Common.${this.priceType}`)
    }
  }
}
</script>

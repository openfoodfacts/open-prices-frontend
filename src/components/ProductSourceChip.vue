<template>
  <v-chip
    :style="style"
    label
    size="small"
    density="comfortable"
  >
    <v-icon :icon="getProductSourceIcon" />
  </v-chip>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    product: {
      type: Object,
      default: null
    },
    style: {
      type: String,
      default: 'padding-left:5px;padding-right:5px;'
    },
  },
  computed: {
    getProductSourceIcon() {
      if (this.product.source) {
        return constants[`${this.product.source.toUpperCase()}_ICON`]
      }
      return null
    },
  }
}
</script>

<template>
  <v-chip
    v-if="hasProduct && hasProductSource"
    :style="style"
    label
    size="small"
    density="comfortable"
  >
    <v-icon :icon="getProductSourceIcon" />
    <v-tooltip activator="parent" open-on-click location="top">
      {{ getProductSourceName }}
    </v-tooltip>
  </v-chip>
  <v-chip v-else-if="hasProduct" label size="small" density="comfortable" color="error" data-name="product-source-missing-chip">
    {{ $t('Common.UnknownSource') }}
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
    hasProduct() {
      return !!this.product.id
    },
    hasProductSource() {
      return !!this.product.source
    },
    getProductSourceIcon() {
      if (this.hasProductSource) {
        return constants[`${this.product.source.toUpperCase()}_ICON`]
      }
      return null
    },
    getProductSourceName() {
      if (this.hasProductSource) {
        return constants[`${this.product.source.toUpperCase()}_NAME`]
      }
      return null
    },
  }
}
</script>

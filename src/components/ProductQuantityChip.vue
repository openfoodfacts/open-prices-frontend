<template>
  <v-chip v-if="productQuantity" label size="small" density="comfortable">
    {{ productQuantityWithUnitDisplay }}
  </v-chip>
  <v-chip v-else label size="small" density="comfortable" prepend-icon="mdi-help" color="warning">
    {{ productQuantityUnitDisplay }}
    <v-tooltip activator="parent" open-on-click location="top">{{ $t('ProductCard.ProductQuantityMissing') }}</v-tooltip>
  </v-chip>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    productQuantity: Number,
    productQuantityUnit: String,
  },
  computed: {
    productQuantityUnitDisplay() {
      // to manage case where productQuantityUnit is null
      return this.productQuantityUnit || constants.PRODUCT_QUANTITY_UNIT_G
    },
    productQuantityWithUnitDisplay() {
      if (this.productQuantityUnitDisplay === constants.PRODUCT_QUANTITY_UNIT_ML) {
        return this.$t('ProductCard.ProductQuantityMililitre', [this.productQuantity])
      }
      return this.$t('ProductCard.ProductQuantityGram', [this.productQuantity])
    },
  }
}
</script>

<template>
  <v-chip label size="small" density="comfortable">
    {{ productQuantityWithUnitDisplay }}
  </v-chip>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    productQuantity: null,
    productQuantityUnit: constants.PRODUCT_QUANTITY_UNIT_G
  },
  computed: {
    productQuantityWithUnitDisplay() {
      if (this.productQuantityUnit === constants.PRODUCT_QUANTITY_UNIT_ML) {
        return this.$t('ProductCard.ProductQuantityMililitre', [this.productQuantity])
      }
      return this.$t('ProductCard.ProductQuantityGram', [this.productQuantity])
    }
  }
}
</script>

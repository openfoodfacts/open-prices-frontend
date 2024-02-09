<template>
  <v-chip label size="small" density="comfortable">
    {{ productQuantityWithUnitDisplay }}
  </v-chip>
</template>

<script>
export default {
  props: {
    productQuantity: null,
    productQuantityUnit: 'g'  // 'mL'
  },
  computed: {
    productQuantityWithUnitDisplay() {
      if (this.productQuantityUnit === 'mL') {
        return this.$t('ProductCard.ProductQuantityMililitre', [this.productQuantity])
      }
      return this.$t('ProductCard.ProductQuantityGram', [this.productQuantity])
    }
  }
}
</script>

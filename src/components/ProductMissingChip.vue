<template>
  <v-chip
    label
    size="small"
    density="comfortable"
    color="error"
    data-name="product-missing-chip"
    :to="productCode ? `/create-product?product_code=${productCode}` : null"
    :prepend-icon="productCode ? 'mdi-plus-circle-outline' : null"
  >
    {{ $t('Common.UnknownProduct') }}
  </v-chip>
</template>

<script>
export default {
  props: {
    productCode: {
      type: String,
      default: null,
    }
  }
}
</script>

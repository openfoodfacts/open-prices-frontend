<template>
  <v-chip label size="small" density="comfortable">
    {{ $t('ProductCard.ProductQuantity', [productQuantity]) }}
  </v-chip>
</template>

<script>
export default {
  props: {
    productQuantity: null,
    productQuantityUnit: null
  },
  computed: {

  }
}
</script>

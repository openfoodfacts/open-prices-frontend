<template>
  <v-chip label size="small" density="comfortable" prepend-icon="mdi-help" color="warning" data-name="product-barcode-too-long-chip">
    {{ $t('ProductCard.BarcodeLength', { length: barcode.length }) }}
  </v-chip>
</template>

<script>
export default {
  props: {
    barcode: {
      type: String,
      required: true
    }
  }
}
</script>

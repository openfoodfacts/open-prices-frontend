<template>
  <v-chip class="ml-1" variant="outlined" size="small" density="comfortable">
    x{{ priceQuantityPurchased }}
  </v-chip>
</template>

<script>
export default {
  props: {
    priceQuantityPurchased: {
      type: Number,
      required: true
    }
  }
}
</script>

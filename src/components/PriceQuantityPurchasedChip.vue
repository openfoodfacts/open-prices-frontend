<template>
  <v-chip variant="outlined" size="small" density="comfortable">
    {{ prefix }}{{ priceQuantityPurchased }}
  </v-chip>
</template>

<script>
export default {
  props: {
    priceQuantityPurchased: {
      type: Number,
      required: true
    }
  },
  computed: {
    prefix() {
      return 'x'
    }
  }
}
</script>

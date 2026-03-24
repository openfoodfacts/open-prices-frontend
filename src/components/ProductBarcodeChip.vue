<template>
  <v-chip label size="small" density="comfortable">
    {{ product.code }}
  </v-chip>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null
    }
  }
}
</script>

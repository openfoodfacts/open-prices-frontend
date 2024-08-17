<template>
  <v-chip label size="small" density="comfortable" class="mr-1">
    <v-icon start icon="mdi-food-outline" />
    <span v-if="withLabel" id="product-count">{{ $t('Common.ProductCount', { count: count }) }}</span>
    <span v-else id="product-count">{{ count }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: null
    },
    withLabel: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<template>
  <v-chip label size="small" density="comfortable" :color="getColor()" class="mr-1">
    <v-icon start icon="mdi-tag-outline" />
    <span v-if="withLabel" id="price-count">{{ $t('Common.PriceCount', { count: count }) }}</span>
    <span v-else id="price-count">{{ count }}</span>
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
  },
  methods: {
    getColor() {
      if (this.count === 0) {
        return 'error'
      }
      if (this.count === 1) {
        return 'warning'
      }
      if (this.count > 1) {
        return 'success'
      }
    },
  }
}
</script>

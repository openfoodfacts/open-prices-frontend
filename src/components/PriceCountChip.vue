<template>
  <v-chip label size="small" density="comfortable" :color="getColor()" class="mr-1">
    <v-icon start icon="mdi-tag-outline"></v-icon>
    <span v-if="withLabel">{{ $t('PriceCountChip.PriceCount', { count: count }) }}</span>
    <span v-if="!withLabel">{{ count }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    'count': null,
    'withLabel': false
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

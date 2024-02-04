<template>
  <v-chip label size="small" density="comfortable" :color="getColor(item)" class="mr-1">
    <v-icon start icon="mdi-tag-outline"></v-icon>
    {{ $t('LocationList.LocationPriceCount', { count: item.price_count }) }}
  </v-chip>
</template>

<script>
export default {
  props: {
    'item': null
  },
  methods: {
    getColor(item) {
      if (item.price_count === 0) {
        return 'error'
      }
      if (item.price_count === 1) {
        return 'warning'
      }
      if (item.price_count > 1) {
        return 'success'
      }
    },
  }
}
</script>

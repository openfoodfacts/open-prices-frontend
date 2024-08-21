<template>
  <v-chip label size="small" density="comfortable" class="mr-1">
    <v-icon start icon="mdi-map-marker-outline" />
    <span v-if="withLabel" id="location-count">{{ $t('Common.LocationCount', { count: count }) }}</span>
    <span v-else id="location-count">{{ count }}</span>
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

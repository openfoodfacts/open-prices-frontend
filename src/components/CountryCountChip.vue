<template>
  <v-chip label size="small" density="comfortable">
    <v-icon start icon="mdi-map-outline" />
    <span v-if="withLabel" id="country-count">{{ $t('Common.CountryCount', { count: count }) }}</span>
    <span v-else id="country-count">{{ count }}</span>
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

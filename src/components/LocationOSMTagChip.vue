<template>
  <v-chip label size="small" density="comfortable" title="OpenStreetMap tag">
    {{ getLocationTag(location) }}
  </v-chip>
</template>

<script>
import geo_utils from '../utils/geo.js'

export default {
  props: {
    location: {
      type: Object,
      default: null
    }
  },
  methods: {
    getLocationTag(location) {
      return geo_utils.getLocationTag(location)
    },
  }
}
</script>

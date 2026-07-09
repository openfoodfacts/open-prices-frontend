<template>
  <v-chip label size="small" density="comfortable" title="OpenStreetMap ID">
    {{ getLocationOSMUniqueId(location) }}
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
    getLocationOSMUniqueId(location) {
      return geo_utils.getLocationOSMUniqueId(location)
    },
  }
}
</script>

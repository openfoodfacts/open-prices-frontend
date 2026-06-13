<template>
  <v-chip label size="small" density="comfortable" title="OpenStreetMap tag">
    {{ getLocationOSMTag(location) }}
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
    getLocationOSMTag(location) {
      return geo_utils.getLocationOSMTag(location)
    },
  }
}
</script>

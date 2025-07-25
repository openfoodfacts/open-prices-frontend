<template>
  <v-chip label size="small" density="comfortable" title="OpenStreetMap ID">
    {{ getLocationUniqueID(location) }}
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
    getLocationUniqueID(location) {
      return geo_utils.getLocationUniqueID(location)
    },
  }
}
</script>

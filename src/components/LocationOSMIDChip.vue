<template>
  <v-chip label size="small" density="comfortable" title="OpenStreetMap ID">
    {{ getLocationOSMID(location) }}
  </v-chip>
</template>

<script>
import utils from '../utils.js'

export default {
  props: {
    location: {
      type: Object,
      default: null
    }
  },
  methods: {
    getLocationOSMID(location) {
      return utils.getLocationOSMID(location)
    },
  }
}
</script>

<template>
  <v-chip label size="small" density="comfortable" title="OpenStreetMap ID">
    {{ getLocationUniqueID(location) }}
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
    getLocationUniqueID(location) {
      return utils.getLocationUniqueID(location)
    },
  }
}
</script>

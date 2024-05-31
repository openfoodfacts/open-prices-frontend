<template>
  <v-chip label size="small" density="comfortable" title="OpenStreetMap tag">
    {{ getLocationTag(location) }}
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
    getLocationTag(location) {
      return utils.getLocationTag(location)
    },
  }
}
</script>

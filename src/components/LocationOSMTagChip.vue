<template>
  <v-chip label size="small" density="comfortable" title="OpenStreetMap tag">
    {{ getLocationCategory(location) }}
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
    getLocationCategory(location) {
      return utils.getLocationCategory(location)
    },
  }
}
</script>

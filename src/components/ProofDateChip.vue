<template>
  <v-chip label size="small" density="comfortable">
    <v-icon start icon="mdi-camera" />
    {{ getDateFormatted(proof.date) }}
  </v-chip>
</template>

<script>
import utils from '../utils.js'

export default {
  props: {
    proof: {
      type: Object,
      default: null
    },
  },
  methods: {
    getDateFormatted(dateString) {
      return utils.prettyDate(dateString)
    },
  }
}
</script>

<template>
  <v-chip label variant="text" size="small" density="comfortable">
    <v-icon start icon="mdi-clock-outline" />
    {{ getRelativeDateTimeFormatted(dateTime) }}
    <v-tooltip activator="parent" open-on-click location="top">
      {{ getDateTimeFormatted(dateTime) }}
    </v-tooltip>
  </v-chip>
</template>

<script>
import utils from '../utils.js'

export default {
  props: {
    dateTime: {
      type: String,
      default: null
    },
  },
  methods: {
    getDateTimeFormatted(dateTimeString) {
      return utils.prettyDateTime(dateTimeString)
    },
    getRelativeDateTimeFormatted(dateTimeString) {
      return utils.prettyRelativeDateTime(dateTimeString, 'shortest')
    },
  }
}
</script>

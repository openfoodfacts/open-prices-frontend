<template>
  <v-chip label size="small" density="comfortable">
    <v-icon start icon="mdi-clock-outline"></v-icon>
    {{ getRelativeDateTimeFormatted(dateTime) }}
    <v-tooltip activator="parent" location="top">{{ getDateTimeFormatted(dateTime) }}</v-tooltip>
  </v-chip>
</template>

<script>
import utils from '../utils.js'

export default {
  props: {
    'dateTime': null
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

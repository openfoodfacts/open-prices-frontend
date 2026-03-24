<template>
  <v-alert
    color="primary"
    variant="outlined"
    density="compact"
    icon="mdi-information"
  >
    <i18n-t keypath="Stats.LastUpdated" tag="span" :title="getRelativeDateTimeFormatted(lastUpdated)">
      <template #date>
        {{ getDateTimeFormatted(lastUpdated) }}
      </template>
    </i18n-t>
  </v-alert>
</template>

<script>
import date_utils from '../utils/date.js'

export default {
  props: {
    lastUpdated: {
      type: String,
      required: true
    }
  },
  methods: {
    getDateTimeFormatted(dateTimeString) {
      return date_utils.offDateTime(dateTimeString)
    },
    getRelativeDateTimeFormatted(dateTimeString) {
      return date_utils.prettyRelativeDateTime(dateTimeString, 'short')
    },
  }
}
</script>

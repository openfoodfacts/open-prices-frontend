<template>
  <v-chip label size="small" density="comfortable" :color="dateMissingAndShowError ? 'error' : 'default'" :to="getDateUrl">
    <v-icon :start="withLabel" :icon="DATE_ICON" />
    <span v-if="date" :title="date">
      <span v-if="withLabel">{{ getDateFormatted(date) }}</span>
    </span>
    <span v-else-if="dateMissingAndShowError">
      <i v-if="withLabel" class="text-lowercase">{{ $t('Common.Date') }}</i>
    </span>
    <v-tooltip v-if="dateMissingAndShowError" activator="parent" open-on-click location="top">
      {{ $t('Common.DateMissing') }}
    </v-tooltip>
  </v-chip>
</template>

<script>
import constants from '../constants'
import date_utils from '../utils/date.js'

export default {
  props: {
    date: {
      type: String,
      default: null
    },
    showErrorIfDateMissing: {
      type: Boolean,
      default: false
    },
    withLabel: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      DATE_ICON: constants.DATE_ICON,
    }
  },
  computed: {
    dateMissingAndShowError() {
      return !this.date && this.showErrorIfDateMissing
    },
    dateShort() {
      return date_utils.dateShort(this.date)
    },
    getDateUrl() {
      return this.date && !this.readonly ? `/dates/${this.dateShort}` : null
    }
  },
  methods: {
    getDateFormatted(dateString) {
      return date_utils.prettyDate(dateString)
    },
  }
}
</script>

<style scoped>
</style>

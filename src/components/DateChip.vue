<template>
  <v-chip label size="small" :prepend-icon="DATE_ICON" density="comfortable" :color="dateMissingAndShowError ? 'error' : 'default'" @click="goToDate()">
    <span v-if="date">{{ getDateFormatted(date) }}</span>
    <span v-else-if="dateMissingAndShowError">
      <i class="text-lowercase">{{ $t('Common.Date') }}</i>
      <v-tooltip activator="parent" open-on-click location="top">
        {{ $t('Common.DateMissing') }}
      </v-tooltip>
    </span>
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
    }
  },
  methods: {
    getDateFormatted(dateString) {
      return date_utils.prettyDate(dateString)
    },
    goToDate() {
      if (this.readonly || !this.date) {
        return
      }
      this.$router.push({ path: `/dates/${this.date}` })
    },
  }
}
</script>

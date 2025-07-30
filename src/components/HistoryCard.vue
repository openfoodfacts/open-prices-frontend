<template>
  <v-card :title="$t('Common.History')" data-name="history-card">
    <v-card-text>
      <span>{{ getDateTimeFormatted(price.created) }} ({{ getRelativeDateTimeFormatted(price.created) }})</span>
      <span> - </span>
      <a :href="getUserDetailUrl">{{ price.owner }}</a>
      <span> ({{ price.source }})</span>
      <span v-if="price.owner_comment">
        <span> - </span>
        <span>{{ price.owner_comment }}</span>
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
import date_utils from '../utils/date.js'

export default {
  props: {
    price: {
      type: Object,
      required: true
    }
  },
  computed: {
    getUserDetailUrl() {
      return `/users/${this.price.owner}`
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

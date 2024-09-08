<template>
  <v-card :title="$t('Common.History')" data-name="history-card">
    <v-card-text>
      {{ getDateTimeFormatted(price.created) }} ({{ getRelativeDateTimeFormatted(price.created) }})
      <span>- </span>
      <a :href="getUserDetailUrl">{{ price.owner }}</a>
    </v-card-text>
  </v-card>
</template>

<script>
import utils from '../utils.js'

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
      return utils.offDateTime(dateTimeString)
    },
    getRelativeDateTimeFormatted(dateTimeString) {
      return utils.prettyRelativeDateTime(dateTimeString, 'short')
    },
  }
}
</script>

<template>
  <v-card :title="getTitle" data-name="history-card">
    <v-card-text class="ml-4">
      <ul>
        <!-- object creation -->
        <li>
          <span>{{ getDateTimeFormatted(object.created) }} ({{ getRelativeDateTimeFormatted(object.created) }})</span>
          <span> - </span>
          <a :href="getUserDetailUrl">{{ object.owner }}</a>
          <span> ({{ object.source }})</span>
          <span v-if="object.owner_comment">
            <span> - </span>
            <span>{{ object.owner_comment }}</span>
          </span>
        </li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
import date_utils from '../utils/date.js'

export default {
  props: {
    object: {
      type: Object,  // Price or Proof
      required: true
    },
    kind: {
      type: String,
      default: null,
      examples: ['price', 'proof']
    }
  },
  computed: {
    getTitle() {
      if (this.kind === 'price') {
        return this.$t('Common.HistoryPrice')
      } else if (this.kind === 'proof') {
        return this.$t('Common.HistoryProof')
      } else {
        return this.$t('Common.History')
      }
    },
    getUserDetailUrl() {
      return `/users/${this.object.owner}`
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

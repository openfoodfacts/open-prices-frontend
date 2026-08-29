<template>
  <v-card :title="getTitle" data-name="history-card">
    <v-card-text class="ml-4">
      <ul>
        <!-- history entries -->
        <li v-for="history in historyList" :key="history.history_id">
          <span>{{ getDateTimeFormatted(history.history_date) }} ({{ getRelativeDateTimeFormatted(history.history_date) }})</span>
          <span> - </span>
          <router-link :to="getUserDetailUrl">{{ history.history_user_id }}</router-link>
          <span v-if="history.history_change_reason">
            <span> - </span>
            <span>{{ history.history_change_reason }}</span>
          </span>
          <router-link :to="getUserDetailUrl">{{ history.history_user_id }}</router-link>
          <ul v-if="history.changes" class="ml-4">
            <li v-for="change in history.changes" :key="change.field">
              <span>{{ change.field }}: </span>
              <span class="text-decoration-line-through">{{ change.old }}</span>
              <span> → </span>
              <span>{{ change.new }}</span>
            </li>
          </ul>
        </li>
        <!-- object creation -->
        <li>
          <span>{{ getDateTimeFormatted(object.created) }} ({{ getRelativeDateTimeFormatted(object.created) }})</span>
          <span> - </span>
          <router-link :to="getUserDetailUrl">{{ object.owner }}</router-link>
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
import openPricesApi from '../services/openPricesApi'
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
  data() {
    return {
      historyList: []
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
  mounted() {
    this.getObjectHistory()
  },
  methods: {
    getObjectHistory() {
      // only fetch history if the object has actually been updated
      if (this.object.created == this.object.updated) return
      openPricesApi.getHistory(this.kind, this.object.id)
        .then(data => {
          // filter out the object creation entry
          this.historyList = data.filter(entry => entry.history_type !== '+')
        })
        .catch(error => {
          console.error('Error fetching full history:', error)
        })
    },
    getDateTimeFormatted(dateTimeString) {
      return date_utils.offDateTime(dateTimeString)
    },
    getRelativeDateTimeFormatted(dateTimeString) {
      return date_utils.prettyRelativeDateTime(dateTimeString, 'short')
    },
  }
}
</script>

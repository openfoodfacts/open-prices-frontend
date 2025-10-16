<template>
  <v-timeline direction="horizontal" truncate-line="both">
    <v-timeline-item dot-color="success">
      <div class="text-h6">
        {{ $t('Common.Start') }}
      </div>
      <p>{{ getDateFormatted(challenge.start_date) }}</p>
    </v-timeline-item>
    <v-timeline-item dot-color="error">
      <template #opposite>
        <div class="text-h6">
          {{ $t('Common.End') }}
        </div>
        <p>{{ getDateFormatted(challenge.end_date) }}</p>
      </template>
    </v-timeline-item>
  </v-timeline>
  <v-progress-linear
    style="width: 50%; margin-left: 25%; top: -85px; margin-top: -25px"
    color="success"
    height="25"
    :model-value="progress"
    striped
  >
    <strong>{{ daysLeftText }}</strong>
  </v-progress-linear>
</template>

<script>
import date_utils from '../utils/date.js'

export default {
  props: {
    challenge: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    nbDays() {
      return Math.round((new Date(this.challenge.end_date) - new Date(this.challenge.start_date)) / (1000 * 60 * 60 * 24)) + 1
    },
    todayIndex() {
      let today = new Date()
      today.setHours(0, 0, 0, 0)
      return Math.round((today - new Date(this.challenge.start_date)) / (1000 * 60 * 60 * 24))
    },
    daysLeftText() {
      const daysLeft = this.nbDays - this.todayIndex
      if (daysLeft > this.nbDays) return "Not started"
      if (daysLeft === this.nbDays) return "First day"
      if (daysLeft === 1) return "Last day"
      if (daysLeft <= 0) return "Challenge over"
      return `${daysLeft - 1} day${daysLeft - 1 > 1 ? 's' : ''} left`
    },
    progress() {
      return Math.min(100, this.todayIndex * 100 / this.nbDays)
    }
  },
  methods: {
    getDateFormatted(dateString) {
      return date_utils.prettyDate(dateString)
    },
  }
}
</script>

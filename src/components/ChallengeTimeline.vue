<template>
  <v-timeline direction="horizontal" truncate-line="both">
    <v-timeline-item dot-color="success">
      <div class="text-h6">
        {{ $t('Common.Start') }}
      </div>
      <p>{{ getDateFormatted(challenge.startDate) }}</p>
    </v-timeline-item>
    <v-timeline-item dot-color="error">
      <template #opposite>
        <div class="text-h6">
          {{ $t('Common.End') }}
        </div>
        <p>{{ getDateFormatted(challenge.endDate) }}</p>
      </template>
    </v-timeline-item>
  </v-timeline>
  <v-progress-linear
    style="width: 50%; margin-left: 25%; top: -30px; margin-top: -25px"
    color="success"
    height="25"
    :model-value="progress"
    striped
  >
    <strong>{{ daysLeftText }}</strong>
  </v-progress-linear>
</template>

<script>
import utils from '../utils.js'

export default {
  props: {
    challenge: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    nbDays() {
      return Math.round((new Date(this.challenge.endDate) - new Date(this.challenge.startDate)) / (1000 * 60 * 60 * 24))
    },
    todayIndex() {
      let today = new Date()
      today.setHours(0, 0, 0, 0)
      return Math.round((today - new Date(this.challenge.startDate)) / (1000 * 60 * 60 * 24))
    },
    daysLeftText() {
      const daysLeft = this.nbDays - this.todayIndex
      if (daysLeft <= 0) return "Challenge over"
      if (daysLeft >= this.nbDays) return "Not started"
      return `${daysLeft} days left`
    },
    progress() {
      return Math.min(100, this.todayIndex * 100 / this.nbDays)
    }
  },
  methods: {
    getDateFormatted(dateString) {
      return utils.prettyDate(dateString)
    },
  }
}
</script>

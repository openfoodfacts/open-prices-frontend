<template>
  <v-timeline direction="horizontal" truncate-line="both">
    <v-timeline-item dot-color="success">
      <div class="text-h6">
        Start
      </div>
      <template #opposite>
        {{ challenge.startDate }}
      </template>
    </v-timeline-item>
    <v-timeline-item dot-color="error">
      <template #opposite>
        <div class="text-h6">
          End
        </div>
      </template>
      {{ challenge.endDate }}
    </v-timeline-item>
  </v-timeline>
  <v-progress-linear
    color="info"
    height="25"
    :model-value="progress"
    striped
    style="width: 50%; margin-left: 25%; top: -55px; margin-top: -25px"
  >
    <strong>{{ daysLeftText }}</strong>
  </v-progress-linear>
</template>
  
<script>
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
      return Math.round((new Date() - new Date(this.challenge.startDate)) / (1000 * 60 * 60 * 24))
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
  }
}
</script>
  
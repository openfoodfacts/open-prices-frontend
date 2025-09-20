<template>
  <v-chip label size="small" density="comfortable">
    <v-icon start icon="mdi-trophy-variant" />
    <span v-if="withLabel" id="challenge-count">{{ $t('Common.ChallengeCount', { count: count }) }}</span>
    <span v-else id="challenge-count">{{ count }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: null
    },
    withLabel: {
      type: Boolean,
      default: false
    },
  }
}
</script>

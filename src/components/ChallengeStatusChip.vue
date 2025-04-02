<template>
  <v-chip label size="small" density="comfortable" data-name="challenge-status-chip">
    {{ $t('Challenge.ChallengeStatuses.' + challengeStatus) }}
  </v-chip>
</template>


<script>
export default {
  props: {
    challengeStatus: {
      type: String,
      default: null
    },
  },
}
</script>
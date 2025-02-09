<template>
  <v-chip label size="small" density="comfortable">
    <v-icon start :icon="PROOF_ICON" />
    <span v-if="withLabel" id="proof-count">{{ $t('Common.ProofCount', { count: count }) }}</span>
    <span v-else id="proof-count">{{ count }}</span>
  </v-chip>
</template>

<script>
import constants from '../constants'

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
  },
  data() {
    return {
      PROOF_ICON: constants.PROOF_ICON
    }
  }
}
</script>

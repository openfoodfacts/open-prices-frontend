<template>
  <v-chip label size="small" density="comfortable" :text="reasonDisplay" />
</template>

<script>
import constants from '../constants'

export default {
  props: {
    reason: {
      type: String,
      default: null
    },
  },
  computed: {
    reasonDisplay() {
      return this.$t('Common.' + constants.MODERATION_FLAG_REASON_LIST.find(s => s.key === this.reason).value)
    },
  }
}
</script>

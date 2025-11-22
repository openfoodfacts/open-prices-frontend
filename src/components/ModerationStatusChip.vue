<template>
  <v-chip label size="small" density="comfortable" :text="statusDisplay" :color="statusColor" />
</template>

<script>
import constants from '../constants'

export default {
  props: {
    status: {
      type: String,
      default: null
    },
  },
  computed: {
    statusDisplay() {
      return this.$t('Common.' + constants.MODERATION_FLAG_STATUS_LIST.find(s => s.key === this.status).value)
    },
    statusColor() {
      return constants.MODERATION_FLAG_STATUS_LIST.find(s => s.key === this.status).color
    }
  }
}
</script>

<template>
  <v-chip label size="small" density="comfortable">
    <v-icon start :icon="BADGE_ICON" />
    <span v-if="withLabel" id="badge-count">{{ $t('Common.BadgeCount', { count: count }) }}</span>
    <span v-else id="badge-count">{{ count }}</span>
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
      BADGE_ICON: constants.BADGE_ICON,
    }
  }
}
</script>

<template>
  <v-chip label size="small" variant="flat" density="comfortable" :title="comment">
    <v-icon :icon="USER_COMMENT_ICON" />
  </v-chip>
</template>

<script>
import constants from '../constants.js'

export default {
  props: {
    comment: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      USER_COMMENT_ICON: constants.USER_COMMENT_ICON,
    }
  },
}
</script>

<template>
  <v-chip label size="small" density="comfortable" :to="getUserUrl">
    <v-icon start :icon="USER_ICON" />
    {{ username }}
  </v-chip>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    username: {
      type: String,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      USER_ICON: constants.USER_ICON
    }
  },
  computed: {
    getUserUrl() {
      return this.username && !this.readonly ? `/users/${this.username}` : null
    }
  }
}
</script>

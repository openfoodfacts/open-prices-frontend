<template>
  <v-chip label size="small" density="comfortable" @click="goToUser()">
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
  methods: {
    goToUser() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/users/${this.username}` })
    },
  }
}
</script>

<template>
  <v-chip label size="small" density="comfortable" @click="goToUser()">
    <v-icon start icon="mdi-account" />
    {{ username }}
  </v-chip>
</template>

<script>
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

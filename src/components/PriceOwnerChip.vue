<template>
  <v-chip label size="small" density="comfortable" @click="goToUser()">
    <v-icon start icon="mdi-account"></v-icon>
    {{ price.owner }}
  </v-chip>
</template>

<script>
export default {
  props: {
    'price': null,
    'readonly': false
  },
  methods: {
    goToUser() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/users/${this.price.owner}` })
    },
  }
}
</script>

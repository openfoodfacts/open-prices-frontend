<template>
  <v-chip label size="small" density="comfortable" @click="goToUser()">
    <v-icon start icon="mdi-account" />
    {{ price.owner }}
  </v-chip>
</template>

<script>
export default {
  props: {
    price: {
      type: Object,
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
      this.$router.push({ path: `/users/${this.price.owner}` })
    },
  }
}
</script>

<template>
  <v-chip label size="small" density="comfortable" @click="goToCategory()">
    {{ category.id }}
  </v-chip>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: null,
      example: { 'id': 'en:croissants', 'name': 'Croissants' }
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    goToCategory() {
      if (this.readonly || !this.category) {
        return
      }
      this.$router.push({ path: `/categories/${this.category.id}` })
    },
  }
}
</script>

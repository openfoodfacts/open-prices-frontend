<template>
  <v-chip label size="small" density="comfortable" :to="getBrandUrl">
    {{ brand }}
  </v-chip>
</template>

<script>
export default {
  props: {
    brand: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getBrandUrl() {
      return this.brand && !this.readonly ? `/brands/${this.brand}` : null
    }
  }
}
</script>

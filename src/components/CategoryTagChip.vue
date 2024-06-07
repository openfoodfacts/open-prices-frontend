<template>
  <v-chip label size="small" density="comfortable">
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
    }
  }
}
</script>

<template>
  <v-chip label size="small" density="comfortable" class="mr-1">
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

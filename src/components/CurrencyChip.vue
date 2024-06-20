<template>
  <v-chip label size="small" density="comfortable">
    <v-icon start icon="mdi-cash" />
    {{ proof.currency }}
  </v-chip>
</template>

<script>
export default {
  props: {
    proof: {
      type: Object,
      default: null
    },
  },
}
</script>

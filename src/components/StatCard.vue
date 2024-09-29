<template>
  <v-card
    :title="value"
    :subtitle="subtitle"
    variant="tonal"
    density="compact"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    subtitle: {
      type: String,
      default: ''
    },
  }
}
</script>

<template>
  <v-card
    :title="value"
    :subtitle="subtitle"
    variant="tonal"
    density="compact"
    :to="to ? to : null"
  >
    <template v-if="prependIcon" #prepend>
      <v-icon>{{ prependIcon }}</v-icon>
    </template>
    <template v-if="to" #append>
      <v-icon>mdi-arrow-right</v-icon>
    </template>
  </v-card>
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
    prependIcon: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  }
}
</script>

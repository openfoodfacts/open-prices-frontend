<template>
  <v-card :title="country" prepend-icon="mdi-map-marker-outline" data-name="country-card">
    <v-card-text>
      <LocationCountChip :count="locationCount" :withLabel="true" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    LocationCountChip: defineAsyncComponent(() => import('../components/LocationCountChip.vue'))
  },
  props: {
    country: {
      type: String,
      default: null
    },
    locationCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

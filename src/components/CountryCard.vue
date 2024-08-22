<template>
  <v-card :title="getTitle" prepend-icon="mdi-map-marker-outline" data-name="country-card">
    <v-card-text>
      <LocationCountChip :count="locationCount" :withLabel="true" />
      <v-chip
        v-if="countryUrl"
        label size="small" density="comfortable" class="mr-1" @click="$router.push(countryUrl)"
      >
        {{ country }}
      </v-chip>
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
    city: {
      type: String,
      default: null
    },
    locationCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getTitle() {
      return this.city ? `${this.city}, ${this.country}` : this.country
    },
    countryUrl() {
      return this.city ? `/countries/${this.country}` : null
    }
  }
}
</script>

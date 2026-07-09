<template>
  <v-card :title="getCityCountryTitle" prepend-icon="mdi-map-marker-outline" data-name="country-card">
    <v-card-text>
      <span class="chip-group">
        <PriceCountChip v-if="showPriceCountChip" :count="priceCount" :withLabel="true" />
        <LocationCountChip v-if="showLocationCountChip" :count="locationCount" :withLabel="true" />
        <CountryCityChip v-if="city" type="country" :country="country" />
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    LocationCountChip: defineAsyncComponent(() => import('../components/LocationCountChip.vue')),
    CountryCityChip: defineAsyncComponent(() => import('../components/CountryCityChip.vue')),
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
    priceCount: {
      type: Number,
      default: null
    },
    locationCount: {
      type: Number,
      default: null
    },
  },
  computed: {
    getCityCountryTitle() {
      return this.city ? `${this.city}, ${this.country}` : this.country
    },
    showPriceCountChip() {
      return this.priceCount !== null && this.priceCount !== undefined
    },
    showLocationCountChip() {
      return this.locationCount !== null && this.locationCount !== undefined
    },
  }
}
</script>

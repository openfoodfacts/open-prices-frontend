<template>
  <v-card :title="getCityCountryTitle" :prepend-icon="LOCATION_TYPE_OSM_ICON" data-name="country-card">
    <v-card-text>
      <span class="chip-group">
        <PriceCountChip v-if="showPriceCountChip" :count="priceCount" :withLabel="true" />
        <CountChip v-if="showLocationCountChip" kind="location" :count="locationCount" :withLabel="true" />
        <CountryCityChip v-if="city" type="country" :country="country" />
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    CountChip: defineAsyncComponent(() => import('../components/CountChip.vue')),
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
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
  data() {
    return {
      LOCATION_TYPE_OSM_ICON: constants.LOCATION_TYPE_OSM_ICON,
    }
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

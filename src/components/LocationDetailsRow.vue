<template>
  <v-row class="mt-0">
    <v-col cols="12">
      <LocationOSMTagChip class="mr-1" :location="location" />
      <LocationOSMIDChip v-if="showLocationOSMID" :location="location" />
      <template v-if="!hideCountryCity">
        <CountryCityChip v-if="hasLocationCity" class="mr-1" :location="location" type="city" />
        <CountryCityChip v-if="hasLocationCountry" :location="location" type="country" />
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'

export default {
  components: {
    LocationOSMTagChip: defineAsyncComponent(() => import('../components/LocationOSMTagChip.vue')),
    LocationOSMIDChip: defineAsyncComponent(() => import('../components/LocationOSMIDChip.vue')),
    CountryCityChip: defineAsyncComponent(() => import('../components/CountryCityChip.vue')),
  },
  props: {
    location: {
      type: [Object, null],
      required: true
    },
    hideLocationOSMID: {
      type: Boolean,
      default: false
    },
    hideCountryCity: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapStores(useAppStore),
    showLocationOSMID() {
      return !this.hideLocationOSMID && this.appStore.user.username && this.appStore.user.location_display_osm_id
    },
    hasLocationCity() {
      return this.location && this.location.osm_address_city
    },
    hasLocationCountry() {
      return this.location && this.location.osm_address_country
    },
  }
}
</script>

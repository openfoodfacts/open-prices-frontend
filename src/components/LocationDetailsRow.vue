<template>
  <v-row>
    <v-col cols="12" class="pt-2 pb-2">
      <span class="chip-group">
        <LocationOSMTagChip :location="location" />
        <LocationOSMIDChip v-if="showLocationOSMID" :location="location" />
        <template v-if="!hideCountryCity">
          <CountryCityChip v-if="hasLocationCity" type="city" :country="location.osm_address_country" :city="location.osm_address_city" />
          <CountryCityChip v-if="hasLocationCountry" type="country" :country="location.osm_address_country" />
        </template>
      </span>
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
      type: Object,
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

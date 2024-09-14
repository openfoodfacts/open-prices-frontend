<template>
  <v-card
    :title="getLocationTitle(location)"
    :subtitle="location ? location.osm_display_name : ''"
    :prepend-icon="location ? 'mdi-map-marker-outline' : 'mdi-map-marker-remove-variant'"
    data-name="location-card"
    @click="goToLocation(location)"
  >
    <v-card-text v-if="location">
      <PriceCountChip :count="location.price_count" :withLabel="true" />
      <LocationOSMTagChip class="mr-1" :location="location" />
      <LocationOSMIDChip v-if="showLocationOSMID" class="mr-1" :location="location" />
      <v-chip
        v-if="!hideCountryCity && locationCountryCityUrl"
        label size="small" density="comfortable" class="mr-1" :to="locationCountryCityUrl"
      >
        {{ location.osm_address_city }}
      </v-chip>
      <v-chip
        v-if="!hideCountryCity && locationCountryUrl"
        label size="small" density="comfortable" class="mr-1" :to="locationCountryUrl"
      >
        {{ location.osm_address_country }}
      </v-chip>
      <LocationActionMenuButton :location="location" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import utils from '../utils.js'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    LocationOSMTagChip: defineAsyncComponent(() => import('../components/LocationOSMTagChip.vue')),
    LocationOSMIDChip: defineAsyncComponent(() => import('../components/LocationOSMIDChip.vue')),
    LocationActionMenuButton: defineAsyncComponent(() => import('../components/LocationActionMenuButton.vue')),
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
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapStores(useAppStore),
    showLocationOSMID() {
      return !this.hideLocationOSMID && this.appStore.user.username && this.appStore.user.location_display_osm_id
    },
    locationCountryUrl() {
      return this.location && this.location.osm_address_country ? `/countries/${this.location.osm_address_country}` : null
    },
    locationCountryCityUrl() {
      return this.locationCountryUrl && this.location.osm_address_city ? `${this.locationCountryUrl}/cities/${this.location.osm_address_city}` : null
    }
  },
  methods: {
    getLocationTitle(location) {
      if (location) {
        return utils.getLocationTitle(location, true, false, true, true)
      }
      return this.$route.params.id
    },
    goToLocation(location) {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/locations/${location.id}` })
    },
  }
}
</script>

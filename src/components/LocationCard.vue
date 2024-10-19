<template>
  <v-card
    :title="getLocationTitle"
    :subtitle="getLocationSubtitle"
    :prepend-icon="getLocationIcon"
    data-name="location-card"
    @click="goToLocation(location)"
  >
    <v-card-text v-if="location">
      <PriceCountChip :count="location.price_count" :withLabel="true" />
      <v-chip label size="small" density="comfortable" class="mr-1">
        <v-icon start icon="mdi-account" />
        <span id="user-count">{{ $t('Common.UserCount', { count: location.user_count }) }}</span>
      </v-chip>
      <v-chip label size="small" density="comfortable" class="mr-1">
        <v-icon start icon="mdi-database-outline" />
        <span id="product-count">{{ $t('Common.ProductCount', { count: location.product_count }) }}</span>
      </v-chip>
      <v-chip label size="small" density="comfortable">
        <v-icon start icon="mdi-image" />
        <span id="proof-count">{{ $t('Common.ProofCount', { count: location.proof_count }) }}</span>
      </v-chip>
      <v-sheet v-if="isTypeOSM">
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
      </v-sheet>
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
    isTypeOSM() {
      return this.location && this.location.type === 'OSM'
    },
    getLocationTitle() {
      if (this.location) {
        if (this.location.type === 'OSM') {
          return utils.getLocationTitle(this.location, true, false, true, true)
        } else if (this.location.type === 'ONLINE') {
          return this.location.website_url
        }
      }
      return this.$route.params.id
    },
    getLocationSubtitle() {
      return this.location && this.isTypeOSM ? this.location.osm_display_name : ''
    },
    getLocationIcon() {
      if (this.location) {
        if (this.location.type === 'OSM') {
          return 'mdi-map-marker-outline'
        } else if (this.location.type === 'ONLINE') {
          return 'mdi-web'
        }
      }
      return 'mdi-map-marker-remove-variant'
    },
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
    goToLocation(location) {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/locations/${location.id}` })
    },
  }
}
</script>

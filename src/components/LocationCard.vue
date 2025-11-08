<template>
  <v-card
    :title="getLocationTitle"
    :subtitle="getLocationSubtitle"
    :prepend-icon="getLocationIcon"
    data-name="location-card"
    @click="goToLocation(location)"
  >
    <v-card-text v-if="location">
      <v-row v-if="isTypeOSM" class="mt-0">
        <v-col cols="12">
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
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col :cols="hideActionMenuButton ? '12' : '11'">
          <PriceCountChip class="mr-1" :count="location.price_count" :withLabel="true" />
          <v-chip label size="small" density="comfortable" class="mr-1">
            <v-icon start icon="mdi-account" />
            <span id="user-count">{{ $t('Common.UserCount', { count: location.user_count }) }}</span>
          </v-chip>
          <ProductCountChip class="mr-1" :count="location.product_count" :withLabel="true" />
          <ProofCountChip class="mr-1" :count="location.proof_count" :withLabel="true" :to="getLocationProofListUrl" />
        </v-col>
        <v-col v-if="!hideActionMenuButton" cols="1">
          <LocationActionMenuButton :location="location" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import geo_utils from '../utils/geo.js'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    ProductCountChip: defineAsyncComponent(() => import('../components/ProductCountChip.vue')),
    ProofCountChip: defineAsyncComponent(() => import('../components/ProofCountChip.vue')),
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
    hideActionMenuButton: {
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
      return this.location && this.location.type === constants.LOCATION_TYPE_OSM
    },
    getLocationTitle() {
      if (this.location) {
        if (this.location.type === constants.LOCATION_TYPE_OSM) {
          return geo_utils.getLocationOSMTitle(this.location, true, false, true, false, true)
        } else if (this.location.type === constants.LOCATION_TYPE_ONLINE) {
          return geo_utils.getLocationONLINETitle(this.location)
        }
      }
      return this.$route.params.id
    },
    getLocationSubtitle() {
      return this.location && this.isTypeOSM ? this.location.osm_display_name : ''
    },
    getLocationIcon() {
      return geo_utils.getLocationIcon(this.location)
    },
    showLocationOSMID() {
      return !this.hideLocationOSMID && this.appStore.user.username && this.appStore.user.location_display_osm_id
    },
    getLocationProofListUrl() {
      return `/locations/${this.location.id}/proofs`
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

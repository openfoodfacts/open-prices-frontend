<template>
  <v-card :title="getLocationTitle" :subtitle="getLocationSubtitle" :prepend-icon="getLocationIcon" :class="isSelected ? 'border-success' : ''" data-name="location-card" @click="goToLocation(location)">
    <v-card-text v-if="location">
      <v-row v-if="isTypeOSM">
        <v-col cols="12">
          <LocationOSMTagChip class="mr-1" :location="location" />
          <LocationOSMIDChip v-if="showLocationOSMID" class="mr-1" :location="location" />
          <template v-if="!hideCountryCity">
            <CountryCityChip v-if="hasLocationCity" class="mr-1" :location="location" type="city" />
            <CountryCityChip v-if="hasLocationCountry" :location="location" type="country" />
          </template>
        </v-col>
      </v-row>
      <v-row v-if="!hideLocationStats" :class="isTypeOSM ? 'mt-0' : ''">
        <v-col :cols="hideActionMenuButton ? '12' : '11'">
          <PriceCountChip class="mr-1" :count="location.price_count" :withLabel="true" />
          <v-chip label size="small" density="comfortable" class="mr-1">
            <v-icon start icon="mdi-account" />
            <span id="user-count">{{ $t('Common.UserCount', { count: location.user_count }) }}</span>
          </v-chip>
          <ProductCountChip class="mr-1" :count="location.product_count" :withLabel="true" />
          <ProofCountChip :count="location.proof_count" :withLabel="true" :to="getLocationProofListUrl" />
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
    CountryCityChip: defineAsyncComponent(() => import('../components/CountryCityChip.vue')),
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
    hideLocationStats: {
      type: Boolean,
      default: false
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false
    },
    isSelected: {
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
        if (this.location.type === constants.LOCATION_TYPE_OSM || this.location.properties) {
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
    hasLocationCity() {
      return this.location && this.location.osm_address_city
    },
    hasLocationCountry() {
      return this.location && this.location.osm_address_country
    },
    getLocationProofListUrl() {
      return `/locations/${this.location.id}/proofs`
    },
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

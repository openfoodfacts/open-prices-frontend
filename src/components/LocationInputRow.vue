<template>
  <v-row>
    <v-col>
      <LocationCard v-if="selectedLocation" :location="selectedLocation" :isSelected="true" :hideLocationFooterRow="true" :readonly="true" elevation="1" @editLocation="showLocationSelectorDialog" />
      <v-btn v-else class="text-body-2" block spaced="end" :prepend-icon="LOCATION_TYPE_OSM_ICON" :class="selectedLocation ? 'border-success' : 'border-error'" @click="showLocationSelectorDialog">
        {{ $t('Common.LocationFindShop') }}
      </v-btn>

      <LocationSelectorDialog
        v-if="locationSelectorDialog"
        v-model="locationSelectorDialog"
        @location="setLocationData($event)"
        @close="locationSelectorDialog = false"
      />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import geo_utils from '../utils/geo.js'

export default {
  components: {
    LocationCard: defineAsyncComponent(() => import('./LocationCard.vue')),
    LocationSelectorDialog: defineAsyncComponent(() => import('../components/LocationSelectorDialog.vue')),
  },
  props: {
    locationForm: {
      type: Object,
      default: () => ({
        location_id: null,
        location_osm_id: null,
        location_osm_type: null
      })
    },
    existingLocation: {
      type: Object,
      default: null
    },
  },
  emits: ['location'],
  data() {
    return {
      selectedLocation: null,
      locationSelectorDialog: false,
      loading: false,
      LOCATION_TYPE_OSM_ICON: constants.LOCATION_TYPE_OSM_ICON,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    recentLocations() {
      return this.appStore.getRecentLocations(this.maxRecentLocations)
    },
    locationFormFilled() {
      let keysOSM = ['location_osm_id', 'location_osm_type']
      let keysONLINE = ['location_id']
      return Object.keys(this.locationForm).filter(k => keysOSM.includes(k)).every(k => !!this.locationForm[k]) || Object.keys(this.locationForm).filter(k => keysONLINE.includes(k)).every(k => !!this.locationForm[k])
    },
    getLocationTitle() {
      if (this.selectedLocation.type === 'ONLINE') return this.selectedLocation.website_url
      return geo_utils.getLocationOSMTitle(this.selectedLocation, true, true, false, true)
    },
  },
  mounted() {
    this.initLocationForm()
  },
  methods: {
    initLocationForm() {
      if (this.existingLocation) {
        this.selectedLocation = this.existingLocation
      }
    },
    showLocationSelectorDialog() {
      this.locationSelectorDialog = true
    },
    setLocationData(location) {
      this.selectedLocation = location
      this.appStore.addRecentLocation(location)
      // update locationForm
      if (location.id && location.type === 'ONLINE') {
        this.locationForm.location_id = location.id
        this.locationForm.location_osm_id = null
        this.locationForm.location_osm_type = null
      } else {
        this.locationForm.location_id = null
        this.locationForm.location_osm_id = geo_utils.getLocationID(location)
        this.locationForm.location_osm_type = geo_utils.getLocationType(location)
      }
      this.$emit('location', this.selectedLocation)
    },
  }
}
</script>

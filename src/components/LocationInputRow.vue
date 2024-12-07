<template>
  <v-row>
    <v-col cols="12">
      <v-btn class="mb-2" size="small" :prepend-icon="LOCATION_TYPE_OSM_ICON" :style="selectedLocation ? 'border: 1px solid #4CAF50' : 'border: 1px solid #F44336'" @click="locationSelectorDialog = true">
        <span v-if="selectedLocation">{{ $t('Common.LocationSelected') }}</span>
        <span v-else>{{ $t('Common.LocationFindShop') }}</span>
      </v-btn>
      <p v-if="selectedLocation">
        <i>{{ getLocationTitle }}</i>
      </p>
    </v-col>
  </v-row>

  <LocationSelectorDialog
    v-if="locationSelectorDialog"
    v-model="locationSelectorDialog"
    @location="setLocationData($event)"
    @close="locationSelectorDialog = false"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import utils from '../utils.js'
import constants from '../constants'

export default {
  components: {
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
  },
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
      return utils.getLocationOSMTitle(this.selectedLocation, true, true, true)
    },
  },
  mounted() {
    // this.initLocationForm()
  },
  methods: {
    initLocationForm() {
      if (this.recentLocations.length) {
        this.setLocationData(this.recentLocations[0])
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
        this.locationForm.location_osm_id = utils.getLocationID(location)
        this.locationForm.location_osm_type = utils.getLocationType(location)
      }
    },
  }
}
</script>

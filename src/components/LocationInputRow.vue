<template>
  <v-row>
    <v-col cols="12">
      <h3 class="mb-1">
        {{ $t('AddPriceSingle.WhereWhen.Location') }}
      </h3>
      <v-chip
        v-for="location in recentLocations"
        :key="getLocationUniqueID(location)"
        class="mb-2"
        :style="isSelectedLocation(location) ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
        @click="setLocationData(location)"
      >
        <v-icon start :icon="isSelectedLocation(location) ? 'mdi-check-circle-outline' : 'mdi-history'" :color="isSelectedLocation(location) ? 'green' : ''" />
        {{ getLocationTitle(location, true, true, true) }}
      </v-chip>
      <br v-if="recentLocations.length">
      <v-btn class="mb-2" size="small" prepend-icon="mdi-magnify" @click="locationSelectorDialog = true">
        {{ $t('AddPriceSingle.WhereWhen.Find') }}
      </v-btn>
      <p v-if="!locationFormFilled" class="text-red mb-2">
        <i>{{ $t('AddPriceSingle.WhereWhen.SelectLocation') }}</i>
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

export default {
  components: {
    LocationSelectorDialog: defineAsyncComponent(() => import('../components/LocationSelectorDialog.vue')),
  },
  props: {
    locationForm: {
      type: Object,
      default: () => ({ location_osm_id: null, location_osm_type: null })
    },
    maxRecentLocations: {
      type: Number,
      default: 3
    }
  },
  emits: ['location'],
  data() {
    return {
      locationSelectorDialog: false,
      locationObject: null,
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    recentLocations() {
      return this.appStore.getRecentLocations(this.maxRecentLocations)
    },
    locationFormFilled() {
      let keys = ['location_osm_id', 'location_osm_type']
      return Object.keys(this.locationForm).filter(k => keys.includes(k)).every(k => !!this.locationForm[k])
    },
  },
  watch: {
    locationObject(newLocationObject, oldLocationObject) {  // eslint-disable-line no-unused-vars
      this.$emit('location', newLocationObject)
    }
  },
  mounted() {
    this.initLocationForm()
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
    getLocationTitle(location, withName=true, withRoad=false, withCity=true) {
      return utils.getLocationOSMTitle(location, withName, withRoad, withCity)
    },
    getLocationUniqueID(location) {
      return utils.getLocationUniqueID(location)
    },
    setLocationData(location) {
      this.appStore.addRecentLocation(location)
      // update locationForm
      this.locationForm.location_osm_id = utils.getLocationID(location)
      this.locationForm.location_osm_type = utils.getLocationType(location)
      // set locationObject
      this.locationObject = location
    },
    isSelectedLocation(location) {
      return utils.buildLocationUniqueId(this.locationForm.location_osm_id, this.locationForm.location_osm_type) === utils.getLocationUniqueID(location)
    },
  }
}
</script>

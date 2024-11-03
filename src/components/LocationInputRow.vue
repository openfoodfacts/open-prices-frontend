<template>
  <v-row>
    <v-col cols="12">
      <h3 class="required mb-1">
        {{ $t('AddPriceSingle.WhereWhen.Location') }}
      </h3>
      <LocationRecentChip v-for="(location, index) in recentLocations" :key="index" :location="location" :currentLocation="locationForm" @click="setLocationData(location)" />
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
    LocationRecentChip: defineAsyncComponent(() => import('../components/LocationRecentChip.vue')),
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
    maxRecentLocations: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      locationSelectorDialog: false,
      loading: false,
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
    setLocationData(location) {
      console.log(location)
      this.appStore.addRecentLocation(location)
      // update locationForm
      if (location.id && location.type === 'ONLINE') {
        console.log('in ONLINE')
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

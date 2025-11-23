<template>
  <v-card>
    <v-card-text>
      <h4>{{ getLocationTitle }}</h4>
      <p>{{ getLocationSubtitle }}</p>
      <template v-if="!isTypeONLINE">
        <LocationOSMTagChip class="mr-1" :location="location" />
        <LocationOSMIDChip v-if="showLocationOSMID" :location="location" />
      </template>
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
    LocationOSMTagChip: defineAsyncComponent(() => import('../components/LocationOSMTagChip.vue')),
    LocationOSMIDChip: defineAsyncComponent(() => import('../components/LocationOSMIDChip.vue')),
  },
  props: {
    location: {
      type: [Object, null],
      required: true
    }
  },
  computed: {
    ...mapStores(useAppStore),
    isTypeONLINE() {
      return this.location && this.location.type === constants.LOCATION_TYPE_ONLINE
    },
    getLocationTitle() {
      if (this.isTypeONLINE) {
        return geo_utils.getLocationONLINETitle(this.location)
      }
      return geo_utils.getLocationOSMTitle(this.location, true, false, false)
    },
    getLocationSubtitle() {
      if (this.isTypeONLINE) {
        return ''
      }
      return geo_utils.getLocationOSMTitle(this.location, false, true, true)
    },
    showLocationOSMID() {
      return this.appStore.user.username && this.appStore.user.location_display_osm_id
    },
  },
}
</script>

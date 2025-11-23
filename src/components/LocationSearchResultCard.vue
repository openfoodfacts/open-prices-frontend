<template>
  <v-card>
    <v-card-text>
      <h4>{{ getLocationTitle(location, true, false, false) }}</h4>
      {{ getLocationTitle(location, false, true, true) }}<br>
      <LocationOSMTagChip class="mr-1" :location="location" />
      <LocationOSMIDChip v-if="showLocationOSMID" :location="location" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
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
    showLocationOSMID() {
      return this.appStore.user.username && this.appStore.user.location_display_osm_id
    },
  },
  methods: {
    getLocationTitle(location, withName = true, withRoad = false, withCity = true) {
      return geo_utils.getLocationOSMTitle(location, withName, withRoad, withCity)
    },
  }
}
</script>

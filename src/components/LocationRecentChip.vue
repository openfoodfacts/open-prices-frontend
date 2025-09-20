<template>
  <v-chip
    :key="getLocationUniqueID"
    class="mb-2"
    :class="isSelectedLocation ? 'border-success' : 'border-transparent'"
    :closable="withRemoveAction"
    close-icon="mdi-delete"
  >
    <v-icon start :icon="isSelectedLocation ? 'mdi-check-circle-outline' : 'mdi-history'" :color="isSelectedLocation ? 'green' : ''" />
    {{ getLocationTitle }}
  </v-chip>
</template>

<script>
import geo_utils from '../utils/geo.js'

export default {
  props: {
    location: {
      type: Object,
      required: true
    },
    currentLocation: {
      type: Object,
      default: () => ({
        location_id: null,
        location_osm_id: null,
        location_osm_type: null
      })
    },
    withRemoveAction: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getLocationTitle() {
      if (this.location.type === 'ONLINE') return this.location.website_url
      return geo_utils.getLocationOSMTitle(this.location, true, true, false, true)
    },
    getLocationUniqueID() {
      if (this.location.id) return this.location.id
      return geo_utils.getLocationUniqueID(this.location)
    },
    isSelectedLocation() {
      if (!this.currentLocation) return false
      if (this.currentLocation.location_id) return this.getLocationUniqueID === this.currentLocation.location_id
      return this.getLocationUniqueID === geo_utils.buildLocationUniqueId(this.currentLocation.location_osm_id, this.currentLocation.location_osm_type)
    },
  },
}
</script>

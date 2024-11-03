<template>
  <v-chip
    :key="getLocationUniqueID"
    class="mb-2"
    :style="isSelectedLocation ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
    :closable="withRemoveAction"
    close-icon="mdi-delete"
  >
    <v-icon start :icon="isSelectedLocation ? 'mdi-check-circle-outline' : 'mdi-history'" :color="isSelectedLocation ? 'green' : ''" />
    {{ getLocationTitle }}
  </v-chip>
</template>

<script>
import utils from '../utils.js'

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
      return utils.getLocationOSMTitle(this.location, true, true, true)
    },
    getLocationUniqueID() {
      if (this.location.id) return this.location.id
      return utils.getLocationUniqueID(this.location)
    },
    isSelectedLocation() {
      if (!this.currentLocation) return false
      if (this.currentLocation.location_id) return this.getLocationUniqueID === this.currentLocation.location_id
      return this.getLocationUniqueID === utils.buildLocationUniqueId(this.currentLocation.location_osm_id, this.currentLocation.location_osm_type)
    },
  },
}
</script>

<template>
  <l-map ref="map" v-model:zoom="mapZoom" :center="mapCenter" :use-global-leaflet="false" @ready="initMap">
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />
    <l-marker v-for="location in locations" :key="getLocationUniqueID(location)" :lat-lng="getLocationLatLng(location)">
      <l-popup>
        <h4>{{ getLocationTitle(location, true, false, false) }}</h4>
        {{ getLocationTitle(location, false, true, true) }}<br>
        <v-chip label size="small" density="comfortable">
          {{ getLocationTag(location) }}
        </v-chip>
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import utils from '../utils.js'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  props: {
    locations: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      map: null,
      mapZoom: 5,
      mapCenter: [45, 5],
      mapBounds: null,
    }
  },
  mounted() {
    if (this.locations.length) {
      if (this.locations.length > 1) {
        this.mapBounds = utils.getMapBounds(this.locations)
      } else {
        this.mapCenter = utils.getMapCenter(this.locations)
        // this.mapZoom = 12
        this.mapBounds = null
      }
    }
  },
  methods: {
    initMap() {  // TODO: improve map setup
      this.map = this.$refs.map.leafletObject
      if (this.mapBounds) {
        this.map.fitBounds(this.mapBounds)
      }
    },
    getLocationTitle(location, withName=true, withRoad=false, withCity=true) {
      return utils.getLocationTitle(location, withName, withRoad, withCity)
    },
    getLocationUniqueID(location) {
      return utils.getLocationUniqueID(location)
    },
    getLocationTag(location) {
      return utils.getLocationTag(location)
    },
    getLocationLatLng(location) {
      return utils.getLocationLatLng(location)
    },
  }
}
</script>

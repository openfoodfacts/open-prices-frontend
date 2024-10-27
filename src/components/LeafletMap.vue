<template>
  <l-map ref="map" v-model:zoom="mapZoom" :center="mapCenter" :use-global-leaflet="false" @ready="initMap">
    <l-tile-layer :url="tiles" layer-type="base" name="OpenStreetMap" :attribution="attribution" />
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
import { useTheme } from 'vuetify'

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
      theme: useTheme(),
      tiles: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  mounted() {
    if (this.locations.length) {
      this.mapBounds = utils.getMapBounds(this.locations)
    }
    if (this.theme.global.name === "dark") {
      this.tiles = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
      this.attribution += ', &copy; <a href="https://carto.com/attributions">CARTO</a>'
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
      return utils.getLocationOSMTitle(location, withName, withRoad, withCity)
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

<template>
  <l-map ref="map" v-model:zoom="mapZoom" :center="mapCenter" :use-global-leaflet="false" @ready="initMap">
    <l-tile-layer :url="tiles" layer-type="base" name="OpenStreetMap" :attribution="attribution" />
    <l-marker v-for="location in locations" :key="getLocationUniqueID(location)" :lat-lng="getLocationLatLng(location)">
      <l-popup>
        <v-card>
          <v-card-title>
            {{ getLocationTitle(location, true, false, false) }}
          </v-card-title>
          <v-card-subtitle>
            {{ getLocationTitle(location, false, true, true) }}<br>
          </v-card-subtitle>
          <v-card-text>
            <v-chip label size="small" density="comfortable">
              {{ getLocationTag(location) }}
            </v-chip>
          </v-card-text>
          <v-card-actions v-if="showActions">
            <v-spacer v-if="$vuetify.display.smAndUp" />
            <v-btn
              class="float-right"
              color="primary"
              variant="flat"
              :block="!$vuetify.display.smAndUp"
              @click="locationSelected(location)"
            >
              {{ $t('Common.Select') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </l-popup>
    </l-marker>
  </l-map>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import { useTheme } from 'vuetify'
import geo_utils from '../utils/geo.js'

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
    showActions: {
      type: Boolean,
      default: false
    }
  },
  emits: ['locationSelected'],
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
      this.mapBounds = geo_utils.getMapBounds(this.locations)
    }
    if (this.theme.global.name.value === "dark") {
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
      return geo_utils.getLocationOSMTitle(location, withName, withRoad, withCity)
    },
    getLocationUniqueID(location) {
      return geo_utils.getLocationUniqueID(location)
    },
    getLocationTag(location) {
      return geo_utils.getLocationTag(location)
    },
    getLocationLatLng(location) {
      return geo_utils.getLocationLatLng(location)
    },
    locationSelected(location) {
      this.$emit('locationSelected', location)
    }
  }
}
</script>

<style>
.leaflet-popup-content {
  margin: 0;
}
.leaflet-popup-content-wrapper {
  padding: 0;
}
</style>

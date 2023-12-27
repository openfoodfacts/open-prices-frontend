<template>
  <v-dialog persistent>
    <v-card>
      <v-card-title>
        Find your location
        <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-form @submit.prevent="search">
          <v-text-field
            v-model="locationSearchForm.q"
            label="Search by name and city"
            type="text"
            append-inner-icon="mdi-magnify"
            @click:append-inner="search"
            :rules="[fieldRequired]"
            :loading="loading"
            required>
          </v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text v-if="results && Array.isArray(results)">
        <h3>Results <small>{{ results.length }}</small></h3>
        <v-row>
          <v-col cols="12" sm="6">
            <div class="d-flex flex-wrap ga-2">
              <v-card
                v-for="location in results"
                elevation="1"
                width="100%"
                @click="selectLocation(location)"
              >
                <v-card-text>
                  <h4>{{ getNominatimLocationTitle(location) }}</h4>
                  {{ getNominatimLocationDetails(location, true) }}<br />
                  <v-chip label size="small" density="comfortable">{{ location.type }}</v-chip>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
          <v-col cols="12" sm="6" style="min-height:200px">
            <l-map ref="map" v-model:zoom="mapZoom" :center="mapCenter" :use-global-leaflet="false" @ready="initMap">
              <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"></l-tile-layer>
              <l-marker v-for="location in results" :lat-lng="[location.lat, location.lon]">
                <l-popup>
                  <h4>{{ getNominatimLocationTitle(location) }}</h4>
                  {{ getNominatimLocationDetails(location, true) }}<br />
                  <v-chip label size="small" density="comfortable">{{ location.type }}</v-chip>
                </l-popup>
              </l-marker>
            </l-map>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-if="results && (typeof results === 'string')">{{ results }}</v-card-text>

      <v-divider v-if="results"></v-divider>

      <v-card-text v-if="recentLocations.length">
        <h3 class="mb-1">
          Recent locations <small>{{ recentLocations.length }}</small>
        </h3>
        <div class="d-flex flex-wrap ga-2">
          <v-chip
            v-for="location in recentLocations"
            elevation="1"
            @click="selectLocation(location)">
            <v-icon start icon="mdi-history"></v-icon>
            {{ location.display_name }}
          </v-chip>
          <v-chip variant="outlined" size="small" @click="clearRecentLocations">
            Clear
          </v-chip>
        </div>
      </v-card-text>

      <v-divider v-if="recentLocations.length"></v-divider>

      <v-card-text>
        <div class="float-right">powered by <a href="https://nominatim.openstreetmap.org" target="_blank">OpenStreetMap Nominatim</a></div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      // location form
      locationSearchForm: {
        q: ''
      },
      loading: false,
      results: null,
      // map
      map: null,
      mapZoom: 5,
      mapCenter: [45, 5],
      mapBounds: null
    }
  },
  computed: {
    ...mapStores(useAppStore),
    formFilled() {
      return Object.values(this.locationSearchForm).every(x => !!x)
    },
    recentLocations() {
      return this.appStore.getRecentLocations()
    },
  },
  methods: {
    fieldRequired(v) {
      return !!v
    },
    initMap() {  // TODO: improve map setup
      this.map = this.$refs.map.leafletObject
      if (this.mapBounds) {
        this.map.fitBounds(this.mapBounds)
      }
    },
    search() {
      this.results = null
      this.loading = true
      api.openstreetmapNominatimSearch(this.locationSearchForm.q)
      .then((data) => {
        this.loading = false
        if (data.length) {
          this.results = data
          if (this.results.length > 1) {
            this.mapBounds = this.results.map(l => [l.lat, l.lon])
          } else {
            this.mapCenter = this.results.map(l => [l.lat, l.lon])[0]
            this.mapZoom = 12
            this.mapBounds = null
          }
        } else {
          this.results = 'No results found'
        }
      })
    },
    getNominatimLocationTitle(location) {
      return location.name
    },
    getNominatimLocationCity(location) {
      if (location.address) {
        return location.address.village || location.address.town || location.address.city || location.address.municipality
      }
    },
    getNominatimLocationDetails(location, withRoad=false) {
      let locationDetails = ''
      if (location.address) {
        if (withRoad) {
          locationDetails += location.address.house_number ? `${location.address.house_number} ` : ''
          locationDetails += location.address.road || ''
        }
        locationDetails += locationDetails.length ? ', ' : ''
        locationDetails += this.getNominatimLocationCity(location)
      }
      return locationDetails
    },
    clearRecentLocations() {
      this.appStore.clearRecentLocations()
    },
    selectLocation(location) {
      this.appStore.addRecentLocation(location)
      this.$emit('location', location)
      this.close()
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

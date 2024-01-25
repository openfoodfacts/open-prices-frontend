<template>
  <v-dialog persistent>
    <v-card>
      <v-card-title>
        {{ $t('LocationSelector.Title') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-form @submit.prevent="search">
          <v-text-field
            v-model="locationSearchForm.q"
            :label="$t('LocationSelector.SearchByName')"
            type="text"
            append-inner-icon="mdi-magnify"
            @click:append-inner="search"
            :rules="[fieldRequired]"
            hide-details="auto"
            :loading="loading"
            required>
          </v-text-field>
        </v-form>

        <p class="text-warning mt-2">
          <i18n-t keypath="LocationSelector.Warning" tag="i">
            <template #newline><br /></template>
          </i18n-t>
        </p>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text v-if="results && Array.isArray(results)">
        <h3>
          <i18n-t keypath="LocationSelector.Result" tag="span">
            <template v-slot:resultNumber>
              <small>{{ results.length }}</small>
            </template>
          </i18n-t>
        </h3>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card
              class="mb-2"
              width="100%"
              v-for="location in results"
              elevation="1"
              @click="selectLocation(location)">
              <v-card-text>
                <h4>{{ getNominatimLocationTitle(location, true, false, false) }}</h4>
                {{ getNominatimLocationTitle(location, false, true, true) }}<br />
                <v-chip label size="small" density="comfortable">{{ location.type }}</v-chip>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" style="min-height:200px">
            <l-map ref="map" v-model:zoom="mapZoom" :center="mapCenter" :use-global-leaflet="false" @ready="initMap">
              <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"></l-tile-layer>
              <l-marker v-for="location in results" :lat-lng="[location.lat, location.lon]">
                <l-popup>
                  <h4>{{ getNominatimLocationTitle(location, true, false, false) }}</h4>
                  {{ getNominatimLocationTitle(location, false, true, true) }}<br />
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
          <i18n-t keypath="LocationSelector.RecentLocations" tag="span">
            <template v-slot:recentLocationNumber>
              <small>{{ recentLocations.length }}</small>
            </template>
          </i18n-t>
        </h3>
        <v-chip
          class="mb-2"
          closable
          v-for="location in recentLocations"
          :key="location.display_name"
          prepend-icon="mdi-history"
          close-icon="mdi-delete"
          @click="selectLocation(location)"
          @click:close="removeRecentLocation(location)">
          {{ getNominatimLocationTitle(location, true, true, true) }}
        </v-chip>
        <br />
        <v-btn size="small" @click="clearRecentLocations">
          {{ $t('LocationSelector.Clear') }} </v-btn>
      </v-card-text>

      <v-divider v-if="recentLocations.length"></v-divider>

      <v-card-text>
        <div class="float-right">
          <i18n-t keypath="LocationSelector.OSM.text" tag="span">
            <template #url>
              <a href="https://nominatim.openstreetmap.org" target="_blank">OpenStreetMap Nominatim</a>
            </template>
          </i18n-t>
        </div>
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
import utils from '../utils.js'

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
          this.results = this.$t('LocationSelector.NoResult')
        }
      })
    },
    getNominatimLocationName(location) {
      return location.name
    },
    getNominatimLocationCity(location) {
      if (location.address) {
        return location.address.village || location.address.town || location.address.city || location.address.municipality
      }
    },
    getNominatimLocationTitle(location, withName=true, withRoad=false, withCity=true) {
      return utils.getLocationTitle(location, withName, withRoad, withCity)
    },
    selectLocation(location) {
      this.$emit('location', location)
      this.close()
    },
    removeRecentLocation(location) {
      this.appStore.removeRecentLocation(location)
    },
    clearRecentLocations() {
      this.appStore.clearRecentLocations()
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>

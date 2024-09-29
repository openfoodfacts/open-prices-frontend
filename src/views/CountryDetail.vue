<template>
  <v-row>
    <v-col cols="12" sm="6">
      <CountryCard :country="country" :locationCount="countryLocationTotal" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.TopLocations') }}
      </h2>
      <LoadedCountChip v-if="!loading" :loadedCount="countryLocationList.length" :totalCount="countryLocationTotal" />
      <DisplayMenu kind="price" :currentDisplay="currentDisplay" @update:currentDisplay="selectPriceDisplay($event)" />
    </v-col>
  </v-row>

  <v-window v-model="currentDisplay" disabled>
    <v-window-item value="list">
      <v-row class="mt-0 mb-1">
        <v-col v-for="location in countryLocationList" :key="location" cols="12" sm="6" md="4" xl="3">
          <LocationCard :location="location" :hideLocationOSMID="true" :hideCountryCity="true" height="100%" />
        </v-col>
      </v-row>
    </v-window-item>
    <v-window-item value="map">
      <v-row class="mt-0 mb-1">
        <v-col style="height:400px">
          <LeafletMap :locations="countryLocationList" />
        </v-col>
      </v-row>
    </v-window-item>
  </v-window>

  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    CountryCard: defineAsyncComponent(() => import('../components/CountryCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    DisplayMenu: defineAsyncComponent(() => import('../components/DisplayMenu.vue')),
    LocationCard: defineAsyncComponent(() => import('../components/LocationCard.vue')),
    LeafletMap: defineAsyncComponent(() => import('../components/LeafletMap.vue')),
  },
  data() {
    return {
      country: this.$route.params.country,
      // data
      countryLocationList: [],
      countryLocationTotal: null,
      countryLocationPage: 0,
      loading: false,
      // order & display
      currentOrder: '-price_count',
      currentDisplay: constants.LOCATION_DISPLAY_LIST[0].key,
    }
  },
  computed: {
    getLocationsParams() {
      let defaultParams = { osm_address_country__like: this.country, order_by: `${this.currentOrder}`, page: this.countryLocationPage }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) {
      // only called when query changes to avoid having an API call when the path changes
      // but ignore 'display' changes
      if (oldRoute.path === newRoute.path) {
        const oldRouteQueryFiltered = Object.fromEntries(Object.entries(oldRoute.query).filter(([key, value]) => key !== constants.DISPLAY_PARAM))  // eslint-disable-line no-unused-vars
        const newRouteQueryFiltered = Object.fromEntries(Object.entries(newRoute.query).filter(([key, value]) => key !== constants.DISPLAY_PARAM))  // eslint-disable-line no-unused-vars
        if (JSON.stringify(oldRouteQueryFiltered) !== JSON.stringify(newRouteQueryFiltered)) {
          this.initCountryCity()
        }
      }
    }
  },
  mounted() {
    this.currentDisplay = this.$route.query[constants.DISPLAY_PARAM] || this.currentDisplay
    this.initCountry()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initCountry() {
      this.country = this.$route.params.country
      this.countryLocationList = []
      this.countryLocationTotal = null
      this.countryLocationPage = 0
      this.getCountryLocations()
    },
    getCountryLocations() {
      if (this.countryLocationTotal && (this.countryLocationList.length >= this.countryLocationTotal)) return
      this.loading = true
      this.countryLocationPage += 1
      return api.getLocations(this.getLocationsParams)
        .then((data) => {
          this.countryLocationList.push(...data.items)
          this.countryLocationTotal = data.total
          this.loading = false
        })
    },
    selectPriceDisplay(displayKey) {
      this.currentDisplay = displayKey
      this.$router.push({ query: { ...this.$route.query, [constants.DISPLAY_PARAM]: this.currentDisplay } })
      // this.initCountryCity() will NOT be called in watch $route
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getCountryLocations()
      }
    },
  }
}
</script>

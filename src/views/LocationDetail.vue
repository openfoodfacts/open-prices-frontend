<template>
  <v-row>
    <v-col cols="12" sm="6">
      <LocationCard :location="location" readonly />
    </v-col>
  </v-row>

  <v-row v-if="!locationFound" class="mt-0">
    <v-col cols="12">
      <v-alert v-if="!loading" type="error" variant="outlined" icon="mdi-alert">
        <i>{{ $t('LocationDetail.LocationNotFound') }}</i>
      </v-alert>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.LatestPrices') }}
      </h2>
      <LoadedCountChip v-if="!loading" :loadedCount="locationPriceList.length" :totalCount="locationPriceTotal" />
      <FilterMenu v-if="!loading" kind="price" :currentFilter="currentFilter" @update:currentFilter="togglePriceFilter($event)" />
      <OrderMenu v-if="!loading" kind="price" :currentOrder="currentOrder" @update:currentOrder="selectPriceOrder($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="price in locationPriceList" :key="price" cols="12" sm="6" md="4" xl="3">
      <PriceCard :price="price" :product="price.product" :hidePriceLocation="true" elevation="1" height="100%" />
    </v-col>
  </v-row>

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
    LocationCard: defineAsyncComponent(() => import('../components/LocationCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
  },
  data() {
    return {
      locationId: this.$route.params.id,
      // data
      location: null,
      locationPriceList: [],
      locationPriceTotal: null,
      locationPricePage: 0,
      loading: false,
      // filter & order
      currentFilter: '',
      currentOrder: constants.PRICE_ORDER_LIST[1].key,
    }
  },
  computed: {
    locationFound() {
      return this.location && this.location.osm_id
    },
    getPricesParams() {
      let defaultParams = { location_id: this.locationId, order_by: this.currentOrder, page: this.locationPricePage }
      if (this.currentFilter === 'show_last_month') {
        let oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        defaultParams['date__gte'] = oneMonthAgo.toISOString().substring(0, 10)
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) {  // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initLocationPrices()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.getLocation()
    this.getLocationPrices()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initLocationPrices() {
      this.locationId = this.$route.params.id
      this.locationPriceList = []
      this.locationPriceTotal = null
      this.locationPricePage = 0
      this.getLocationPrices()
    },
    getLocation() {
      return api.getLocationById(this.locationId)
        .then((data) => {
          if (data.id) {
            this.location = data
          }
        })
    },
    getLocationPrices() {
      if (this.locationPriceTotal && (this.locationPriceList.length >= this.locationPriceTotal)) return
      this.loading = true
      this.locationPricePage += 1
      return api.getPrices(this.getPricesParams)
        .then((data) => {
          this.locationPriceList.push(...data.items)
          this.locationPriceTotal = data.total
          this.loading = false
        })
    },
    togglePriceFilter(filterKey) {
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initLocationPrices() will be called in watch $route
    },
    selectPriceOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initLocationPrices() will be called in watch $route
      }
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getLocationPrices()
      }
    },
  }
}
</script>

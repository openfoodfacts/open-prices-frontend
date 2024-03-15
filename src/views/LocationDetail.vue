<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card
        :title="getLocationTitle(location)"
        :subtitle="location ? location.osm_display_name : ''"
        :prepend-icon="location ? 'mdi-map-marker-outline' : 'mdi-map-marker-remove-variant'">
        <v-card-text>
          <PriceCountChip :count="locationPriceTotal" :withLabel="true"></PriceCountChip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mt-0" v-if="location">
    <v-col cols="12">
      <v-btn v-if="location.osm_id" size="small" append-icon="mdi-open-in-new" :href="getLocationOSMUrl(location)" target="_blank">
        OpenStreetMap
      </v-btn>
      <ShareButton v-if="location.osm_id"></ShareButton>
      <p v-if="!location.osm_id" class="text-red">
        <i>{{ $t('LocationDetail.LocationNotFound') }}</i>
      </p>
    </v-col>
  </v-row>

  <br />

  <h2 class="text-h6 mb-1">
    {{ $t('LocationDetail.LatestPrices') }}
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>

  <v-row v-if="!loading">
    <v-col>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" size="small" class="mr-2" prepend-icon="mdi-filter-variant" :active="!!priceFilter">{{ $t('Common.Filter') }}</v-btn>
        </template>
        <v-list>
          <v-list-item :slim="true" v-for="filter in priceFilterList" :key="filter.key" :prepend-icon="(priceFilter === filter.key) ? 'mdi-check-circle' : 'mdi-circle-outline'" :active="priceFilter === filter.key" @click="togglePriceFilter(filter.key)">
            {{ $t('Common.' + filter.value) }}
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" size="small" prepend-icon="mdi-arrow-down" :append-icon="getCurrentPriceOrderIcon" :active="!!priceOrder">{{ $t('Common.Order') }}</v-btn>
        </template>
        <v-list>
          <v-list-item :slim="true" v-for="order in priceOrderList" :key="order.key" :prepend-icon="order.icon" :active="priceOrder === order.key" @click="selectPriceOrder(order.key)">
            {{ $t('Common.' + order.value) }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="price in locationPriceList" :key="price">
      <PriceCard :price="price" :product="price.product" :hidePriceLocation="true" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>

  <v-row v-if="locationPriceList.length < locationPriceTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getLocationPrices">{{ $t('LocationDetail.LoadMore') }}</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'
import utils from '../utils.js'
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    'PriceCountChip': defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    'PriceCard': defineAsyncComponent(() => import('../components/PriceCard.vue')),
    'ShareButton': defineAsyncComponent(() => import('../components/ShareButton.vue')),
  },
  data() {
    return {
      location: null,
      locationPriceList: [],
      locationPriceTotal: null,
      locationPricePage: 0,
      loading: false,
      // filter & order
      priceFilter: '',
      priceFilterList: constants.PRICE_FILTER_LIST,
      priceOrder: constants.PRICE_ORDER_BY_LIST[1].key,
      priceOrderList: constants.PRICE_ORDER_BY_LIST,
    }
  },
  mounted() {
    this.priceFilter = this.$route.query[constants.FILTER_PARAM] || this.priceFilter
    this.priceOrder = this.$route.query[constants.ORDER_BY_PARAM] || this.priceOrder
    this.getLocation(),
    this.getLocationPrices()
  },
  computed: {
    locationId() {
      return this.$route.params.id
    },
    getCurrentPriceOrderIcon() {
      let currentPriceOrder = this.priceOrderList.find(o => o.key === this.priceOrder)
      return currentPriceOrder ? currentPriceOrder.icon : ''
    },
    getPricesParams() {
      let defaultParams = { location_id: this.locationId, order_by: this.priceOrder, page: this.locationPricePage }
      if (this.priceFilter === 'show_last_month') {
        let oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        defaultParams['date__gte'] = oneMonthAgo.toISOString().substring(0, 10)
      }
      return defaultParams
    },
  },
  methods: {
    initLocationPrices() {
      this.locationPriceList = []
      this.locationPriceTotal = null
      this.locationPricePage = 0
      this.getLocationPrices()
    },
    getLocation() {
      return api.getLocationById(this.$route.params.id)
        .then((data) => {
          if (data.id) {
            this.location = data
          }
        })
    },
    getLocationPrices() {
      this.loading = true
      this.locationPricePage += 1
      return api.getPrices(this.getPricesParams)
        .then((data) => {
          this.locationPriceList.push(...data.items)
          this.locationPriceTotal = data.total
          this.loading = false
        })
    },
    getLocationTitle(location) {
      if (location) {
        return utils.getLocationTitle(location, true, false, true, true)
      }
      return this.$route.params.id
    },
    getLocationOSMUrl(location) {
      return `https://www.openstreetmap.org/${location.osm_type.toLowerCase()}/${location.osm_id}`
    },
    togglePriceFilter(filterKey) {
      this.priceFilter = this.priceFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.priceFilter } })
      // this.initLocationPrices() will be called in watch $route
    },
    selectPriceOrder(orderKey) {
      if (this.priceOrder !== orderKey) {
        this.priceOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_BY_PARAM]: this.priceOrder } })
        // this.initLocationPrices() will be called in watch $route
      }
    }
  },
  watch: {
    $route (newRoute, oldRoute) {  // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initLocationPrices()
      }
    }
  }
}
</script>

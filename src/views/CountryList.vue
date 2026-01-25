<template>
  <v-row>
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-map-marker-outline">
        {{ $t('Common.CountryCount', { count: countryTotal }) }}
      </v-chip>
      <template v-if="!loading">
        <LoadedCountChip :loadedCount="countryList.length" :totalCount="countryTotal" />
        <FilterMenu kind="country" :currentFilterList="currentFilterList" @update:currentFilterList="updateFilterList($event)" />
        <OrderMenu kind="country" :currentOrder="currentOrder" @update:currentOrder="updateOrder($event)" />
      </template>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="country in countryList" :key="country" cols="12" sm="6" md="4" xl="3">
      <CountryCard :country="country.name" :priceCount="country.price_count" :locationCount="country.location_count" height="100%" @click="goToCountry(country)" />
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
import openPricesApi from '../services/openPricesApi'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    CountryCard: defineAsyncComponent(() => import('../components/CountryCard.vue')),
  },
  data() {
    return {
      // data
      countryList: [],
      countryTotal: null,
      loading: false,
      // filter & order
      currentFilterList: [],
      currentOrder: constants.LOCATION_COUNTRY_ORDER_LIST[1].key,  // price_count
    }
  },
  watch: {
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initCountryList()
      }
    }
  },
  mounted() {
    this.currentFilterList = utils.toArray(this.$route.query[constants.FILTER_PARAM]) || this.currentFilterList
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.initCountryList()
  },
  methods: {
    initCountryList() {
      this.countryList = []
      this.getCountries()
    },
    getCountries() {
      this.loading = true
      return openPricesApi.getCountries()
        .then((data) => {
          this.countryTotal = data.length  // all the countries are loaded at once
          // we filter client-side
          if (this.currentFilterList.includes('price_count_gte_1')) {
            data = data.filter(country => country.price_count > 0)
          }
          if (this.currentFilterList.includes('location_count_gte_1')) {
            data = data.filter(country => country.location_count > 0)
          }
          // we order client-side
          if (this.currentOrder === 'name') {
            data.sort((a, b) => a.name.localeCompare(b.name))
          } else if (this.currentOrder === '-price_count') {
            data.sort((a, b) => b.price_count - a.price_count)
          } else if (this.currentOrder === '-location_count') {
            data.sort((a, b) => b.location_count - a.location_count)
          }
          this.countryList = data
          this.loading = false
        })
    },
    goToCountry(country) {
      this.$router.push(`/countries/${country.osm_name}`)
    },
    updateFilterList(newFilterList) {
      this.currentFilterList = newFilterList
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilterList } })
      // this.initCountryList() will be called in watch $route
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initLocationList() will be called in watch $route
      }
    },
  }
}
</script>

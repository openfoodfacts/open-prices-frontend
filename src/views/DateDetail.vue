<template>
  <v-row>
    <v-col cols="12" sm="6">
      <DateCard :date="date" :priceCount="priceTotal" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.LatestPrices') }}
      </h2>
      <template v-if="!loading">
        <LoadedCountChip :loadedCount="priceList.length" :totalCount="priceTotal" />
        <OrderMenu kind="price" :currentOrder="currentOrder" @update:currentOrder="updateOrder($event)" />
        <DisplayMenu :show="['list', 'table', 'map']" :currentDisplay="currentDisplay" @update:currentDisplay="updateDisplay($event)" />
      </template>
    </v-col>
  </v-row>

  <v-window v-model="currentDisplay" disabled>
    <v-window-item value="list">
      <v-row class="mt-0 mb-1">
        <v-col v-for="price in priceList" :key="price" cols="12" sm="6" md="4" xl="3">
          <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
        </v-col>
      </v-row>
    </v-window-item>
    <v-window-item value="table">
      <PriceTable class="mt-3 mb-3" :priceList="priceList" source="date" />
    </v-window-item>
    <v-window-item value="map">
      <v-row class="mt-0 mb-1">
        <v-col style="height:400px">
          <LeafletMap :locations="priceLocationList" />
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
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import openPricesApi from '../services/openPricesApi'
import constants from '../constants'
import date_utils from '../utils/date.js'
import utils from '../utils.js'

export default {
  components: {
    DateCard: defineAsyncComponent(() => import('../components/DateCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    DisplayMenu: defineAsyncComponent(() => import('../components/DisplayMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    PriceTable: defineAsyncComponent(() => import('../components/PriceTable.vue')),
    LeafletMap: defineAsyncComponent(() => import('../components/LeafletMap.vue')),
  },
  data() {
    return {
      date: this.$route.params.date,
      // data
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      priceLocationList: [],
      loading: false,
      // filter, order & display
      currentOrder: constants.PRICE_ORDER_LIST[2].key,  // date
      currentDisplay: constants.DISPLAY_LIST[0].key,  // list
    }
  },
  computed: {
    ...mapStores(useAppStore),
    dateType() {
      return date_utils.dateType(this.date)
    },
    getPricesParams() {
      let defaultParams = { order_by: this.currentOrder, page: this.pricePage }
      // YYYY-MM-DD
      if (this.dateType === 'DAY') {
        defaultParams['date'] = this.date
      } else if (this.dateType === 'MONTH') {
        // YYYY-MM
        const matches = this.date.match(constants.DATE_YEAR_MONTH_REGEX_MATCH)
        defaultParams['date__year'] = matches[1]
        defaultParams['date__month'] = matches[2]
      } else if (this.dateType === 'YEAR') {
        // YYYY
        defaultParams['date__year'] = this.date
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) {
      if (oldRoute && newRoute && newRoute.name == 'date-detail' && oldRoute.fullPath != newRoute.fullPath) {
        this.initDate()
      }
    }
  },
  mounted() {
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.currentDisplay = this.$route.query[constants.DISPLAY_PARAM] || this.appStore.user.price_list_display_default_mode || this.currentDisplay
    this.initDate()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initDate() {
      this.date = this.$route.params.date
      this.priceList = []
      this.priceTotal = null
      this.pricePage = 0
      this.priceLocationList = []
      this.getPrices()
    },
    getPrices() {
      if ((this.priceTotal != null) && (this.priceList.length >= this.priceTotal)) return
      this.loading = true
      this.pricePage += 1
      return openPricesApi.getPrices(this.getPricesParams)
        .then((data) => {
          this.priceList.push(...data.items)
          this.priceTotal = data.total
          data.items.forEach((price) => {
            if (price.location) {
              utils.addObjectToArray(this.priceLocationList, price.location)
            }
          })
          this.loading = false
        })
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initDate() will be called in watch $route
      }
    },
    updateDisplay(displayKey) {
      this.currentDisplay = displayKey
      this.$router.push({ query: { ...this.$route.query, [constants.DISPLAY_PARAM]: this.currentDisplay } })
      // this.initDate() will NOT be called in watch $route
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getPrices()
      }
    },
  }
}
</script>

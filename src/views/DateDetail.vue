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
      <LoadedCountChip v-if="!loading" :loadedCount="priceList.length" :totalCount="priceTotal" />
      <OrderMenu v-if="!loading" kind="price" :currentOrder="currentOrder" @update:currentOrder="selectPriceOrder($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="price in priceList" :key="price" cols="12" sm="6" md="4" xl="3">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
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
import date_utils from '../utils/date.js'
import utils from '../utils.js'

export default {
  components: {
    DateCard: defineAsyncComponent(() => import('../components/DateCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  data() {
    return {
      date: this.$route.params.date,
      // data
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      loading: false,
      // filter & order
      currentOrder: constants.PRICE_ORDER_LIST[2].key,  // date
    }
  },
  computed: {
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
      this.getPrices()
    },
    getPrices() {
      if ((this.priceTotal != null) && (this.priceList.length >= this.priceTotal)) return
      this.loading = true
      this.pricePage += 1
      return api.getPrices(this.getPricesParams)
        .then((data) => {
          this.priceList.push(...data.items)
          this.priceTotal = data.total
          this.loading = false
        })
    },
    selectPriceOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initDate() will be called in watch $route
      }
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getPrices()
      }
    },
  }
}
</script>

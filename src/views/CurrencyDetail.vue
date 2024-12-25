<template>
  <v-row>
    <v-col cols="12" sm="6">
      <CurrencyCard :currency="currency" :priceCount="currencyPriceTotal" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.LatestPrices') }}
      </h2>
      <LoadedCountChip v-if="!loading" :loadedCount="currencyPriceList.length" :totalCount="currencyPriceTotal" />
      <OrderMenu v-if="!loading" kind="price" :currentOrder="currentOrder" @upcurrency:currentOrder="selectPriceOrder($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="price in currencyPriceList" :key="price" cols="12" sm="6" md="4" xl="3">
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
import utils from '../utils.js'

export default {
  components: {
    CurrencyCard: defineAsyncComponent(() => import('../components/CurrencyCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  data() {
    return {
      currency: this.$route.params.currency,
      // data
      currencyPriceList: [],
      currencyPriceTotal: null,
      currencyPricePage: 0,
      loading: false,
      // filter & order
      currentOrder: constants.PRICE_ORDER_LIST[2].key,  // date
    }
  },
  computed: {
    getPricesParams() {
      let defaultParams = { currency: this.currency, order_by: this.currentOrder, page: this.currencyPricePage }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) {
      if (oldRoute && newRoute && newRoute.name == 'currency-detail' && oldRoute.fullPath != newRoute.fullPath) {
        this.initCurrency()
      }
    }
  },
  mounted() {
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.initCurrency()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initCurrency() {
      this.currency = this.$route.params.currency
      this.currencyPriceList = []
      this.currencyPriceTotal = null
      this.currencyPricePage = 0
      this.getCurrencyPrices()
    },
    getCurrencyPrices() {
      if (this.currencyPriceTotal && (this.currencyPriceList.length >= this.currencyPriceTotal)) return
      this.loading = true
      this.currencyPricePage += 1
      return api.getPrices(this.getPricesParams)
        .then((data) => {
          this.currencyPriceList.push(...data.items)
          this.currencyPriceTotal = data.total
          this.loading = false
        })
    },
    selectPriceOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initCurrency() will be called in watch $route
      }
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getCurrencyPrices()
      }
    },
  }
}
</script>

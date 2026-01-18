<template>
  <v-row>
    <v-col cols="12" sm="6">
      <CurrencyCard :currency="currency" :priceCount="priceTotal" />
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
      </template>
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
import openPricesApi from '../services/openPricesApi'
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
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      loading: false,
      // filter & order
      currentOrder: constants.PRICE_ORDER_LIST[2].key,  // date
    }
  },
  computed: {
    getPricesParams() {
      let defaultParams = { currency: this.currency, order_by: this.currentOrder, page: this.pricePage }
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
      this.priceList = []
      this.priceTotal = null
      this.pricePage = 0
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
          this.loading = false
        })
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initCurrency() will be called in watch $route
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

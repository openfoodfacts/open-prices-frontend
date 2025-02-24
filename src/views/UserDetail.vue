<template>
  <v-row>
    <v-col cols="12" sm="6">
      <UserCard v-if="user" :user="user" readonly />
    </v-col>
  </v-row>

  <v-row v-if="!loading">
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.LatestPrices') }}
      </h2>
      <LoadedCountChip :loadedCount="userPriceList.length" :totalCount="userPriceTotal" />
      <FilterMenu kind="price" :currentFilter="currentFilter" @update:currentFilter="togglePriceFilter($event)" />
      <OrderMenu kind="price" :currentOrder="currentOrder" @update:currentOrder="selectPriceOrder($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="price in userPriceList" :key="price" cols="12" sm="6" md="4" xl="3">
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
    UserCard: defineAsyncComponent(() => import('../components/UserCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  data() {
    return {
      username: this.$route.params.username,
      // data
      user: null,
      userPriceList: [],
      userPriceTotal: null,
      userPricePage: 0,
      loading: false,
      // filter & order
      currentFilter: '',
      currentOrder: constants.PRICE_ORDER_LIST[2].key,  // date
    }
  },
  computed: {
    getPricesParams() {
      let defaultParams = { owner: this.username, order_by: `${this.currentOrder}`, page: this.userPricePage }
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
        this.initUserPrices()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.getUser()
    this.getUserPrices()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initUserPrices() {
      this.username = this.$route.params.username
      this.userPriceList = []
      this.userPriceTotal = null
      this.userPricePage = 0
      this.getUserPrices()
    },
    getUser() {
      return api.getUserById(this.username)
        .then((data) => {
          this.user = data
        })
    },
    getUserPrices() {
      if ((this.userPriceTotal != null) && (this.userPriceList.length >= this.userPriceTotal)) return
      this.loading = true
      this.userPricePage += 1
      return api.getPrices(this.getPricesParams)
        .then((data) => {
          this.userPriceList.push(...data.items)
          this.userPriceTotal = data.total
          this.loading = false
        })
    },
    togglePriceFilter(filterKey) {
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initUserPrices() will be called in watch $route
    },
    selectPriceOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initUserPrices() will be called in watch $route
      }
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getUserPrices()
      }
    },
  }
}
</script>

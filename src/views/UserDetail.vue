<template>
  <v-row>
    <v-col cols="12" sm="6">
      <UserCard v-if="user" :user="user" readonly />
    </v-col>
  </v-row>

  <v-row v-if="!user && !loading" class="mt-0">
    <v-col cols="12">
      <v-alert data-name="user-not-found-alert" type="error" variant="outlined" density="compact">
        {{ $t('Common.UserNotFound') }}
      </v-alert>
    </v-col>
  </v-row>

  <v-row v-if="user">
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.LatestPrices') }}
      </h2>
      <template v-if="!loading">
        <LoadedCountChip :loadedCount="priceList.length" :totalCount="priceTotal" />
        <FilterMenu kind="price" :currentFilterList="currentFilterList" @update:currentFilterList="updateFilterList($event)" />
        <OrderMenu kind="price" :currentOrder="currentOrder" @update:currentOrder="updateOrder($event)" />
        <DisplayMenu :show="['list', 'table']" :currentDisplay="currentDisplay" @update:currentDisplay="updateDisplay($event)" />
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
      <PriceTable class="mt-3 mb-3" :priceList="priceList" source="user" />
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
import api from '../services/api'
import constants from '../constants'
import date_utils from '../utils/date.js'
import utils from '../utils.js'

export default {
  components: {
    UserCard: defineAsyncComponent(() => import('../components/UserCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    DisplayMenu: defineAsyncComponent(() => import('../components/DisplayMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    PriceTable: defineAsyncComponent(() => import('../components/PriceTable.vue')),
  },
  data() {
    return {
      username: this.$route.params.username,
      // data
      user: null,
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      loading: false,
      // filter, order & display
      currentFilterList: [],
      currentOrder: constants.PRICE_ORDER_LIST[2].key,  // date
      currentDisplay: constants.DISPLAY_LIST[0].key,  // list
    }
  },
  computed: {
    ...mapStores(useAppStore),
    getPricesParams() {
      let defaultParams = { owner: this.username, order_by: `${this.currentOrder}`, page: this.pricePage }
      if (this.currentFilterList.includes('show_last_month')) {
        defaultParams['date__gte'] = date_utils.oneMonthAgoDate()
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) {  // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initPrices()
      }
    }
  },
  mounted() {
    this.currentFilterList = utils.toArray(this.$route.query[constants.FILTER_PARAM]) || this.currentFilterList
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.currentDisplay = this.$route.query[constants.DISPLAY_PARAM] || this.appStore.user.price_list_display_default_mode || this.currentDisplay
    this.getUser()
    this.getPrices()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initPrices() {
      this.username = this.$route.params.username
      this.priceList = []
      this.priceTotal = null
      this.pricePage = 0
      this.getPrices()
    },
    getUser() {
      return api.getUserById(this.username)
        .then((data) => {
          if (data.user_id) {
            this.user = data
          }
        })
    },
    getPrices() {
      if ((this.priceTotal != null) && (this.priceList.length >= this.priceTotal)) return
      this.loading = true
      this.pricePage += 1
      return api.getPrices(this.getPricesParams)
        .then((data) => {
          this.loading = false
          // user not found: the API will return an empty list
          // if (!data.items) return
          this.priceList.push(...data.items)
          this.priceTotal = data.total
        })
    },
    updateFilterList(newFilterList) {
      this.currentFilterList = newFilterList
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilterList } })
      // this.initPrices() will be called in watch $route
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initPrices() will be called in watch $route
      }
    },
    updateDisplay(displayKey) {
      this.currentDisplay = displayKey
      this.$router.push({ query: { ...this.$route.query, [constants.DISPLAY_PARAM]: this.currentDisplay } })
      // this.initPrices() will NOT be called in watch $route
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getPrices()
      }
    },
  }
}
</script>

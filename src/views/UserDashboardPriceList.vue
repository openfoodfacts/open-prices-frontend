<template>
  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-tag-multiple-outline">
        {{ $t('Common.PriceCount', { count: priceTotal }) }}
      </v-chip>
      <LoadedCountChip :loadedCount="priceList.length" :totalCount="priceTotal" />
      <FilterMenu kind="price" :currentFilterList="currentFilterList" :currentType="currentType" :currentKind="currentKind" :showKind="true" @update:currentFilterList="updateFilterList($event)" @update:currentType="togglePriceType($event)" @update:currentKind="togglePriceKind($event)" />
      <OrderMenu kind="price" :currentOrder="currentOrder" @update:currentOrder="selectPriceOrder($event)" />
      <DisplayMenu :show="['list', 'table', 'map']" :currentDisplay="currentDisplay" @update:currentDisplay="selectPriceDisplay($event)" />
    </v-col>
  </v-row>

  <v-window v-model="currentDisplay" disabled>
    <v-window-item value="list">
      <v-row class="mt-0 mb-1">
        <v-col v-for="price in priceList" :key="price" cols="12" sm="6" md="4" xl="3">
          <PriceCard :price="price" :product="price.product" :hideProductLocation="true" elevation="1" height="100%" />
        </v-col>
      </v-row>
    </v-window-item>
    <v-window-item value="table">
      <PriceTable class="mt-3 mb-3" :priceList="priceList" source="location" />
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
import api from '../services/api'
import constants from '../constants'
import date_utils from '../utils/date.js'
import utils from '../utils.js'

export default {
  components: {
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    DisplayMenu: defineAsyncComponent(() => import('../components/DisplayMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    PriceTable: defineAsyncComponent(() => import('../components/PriceTable.vue')),
    LeafletMap: defineAsyncComponent(() => import('../components/LeafletMap.vue')),
  },
  data() {
    return {
      // data
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      priceLocationList: [],
      loading: false,
      // filter, order & display
      currentFilterList: [],
      currentType: '',
      currentKind: '',
      currentOrder: constants.PRICE_ORDER_LIST[3].key,  // created first
      currentDisplay: constants.DISPLAY_LIST[0].key,  // list
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    getPricesParams() {
      let defaultParams = { owner: this.username, order_by: this.currentOrder, page: this.pricePage }
      if (this.currentFilterList.includes('show_last_month')) {
        defaultParams['date__gte'] = date_utils.oneMonthAgoDate()
      }
      if (this.currentType) {
        defaultParams[constants.TYPE_PARAM] = this.currentType
      }
      if (this.currentKind) {
        defaultParams[constants.KIND_PARAM] = this.currentKind
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
    this.currentType = this.$route.query[constants.TYPE_PARAM] || this.currentType
    this.currentKind = this.$route.query[constants.KIND_PARAM] || this.currentKind
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.currentDisplay = this.$route.query[constants.DISPLAY_PARAM] || this.appStore.user.price_list_display_default_mode || this.currentDisplay
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
      return api.getPrices(this.getPricesParams)
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
    updateFilterList(newFilterList) {
      this.currentFilterList = newFilterList
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilterList } })
      // this.initPrices() will be called in watch $route
    },
    togglePriceType(sourceKey) {
      this.currentType = (this.currentType !== sourceKey) ? sourceKey : ''
      this.$router.push({ query: { ...this.$route.query, [constants.TYPE_PARAM]: this.currentType } })
      // this.initPrices() will be called in watch $route
    },
    togglePriceKind(kindKey) {
      this.currentKind = (this.currentKind !== kindKey) ? kindKey : ''
      this.$router.push({ query: { ...this.$route.query, [constants.KIND_PARAM]: this.currentKind } })
      // this.initPrices() will be called in watch $route
    },
    selectPriceOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initPrices() will be called in watch $route
      }
    },
    selectPriceDisplay(displayKey) {
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

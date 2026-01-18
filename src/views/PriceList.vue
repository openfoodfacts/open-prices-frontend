<template>
  <v-row>
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-tag-outline">
        {{ $t('Common.PriceCount', { count: priceTotal }) }}
      </v-chip>
      <template v-if="!loading">
        <LoadedCountChip :loadedCount="priceList.length" :totalCount="priceTotal" />
        <FilterMenu kind="price" :currentFilterList="currentFilterList" :currentType="currentType" @update:currentFilterList="updateFilterList($event)" @update:currentType="togglePriceType($event)" />
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
import date_utils from '../utils/date.js'
import utils from '../utils.js'

export default {
  components: {
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  data() {
    return {
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      loading: false,
      // filter & order
      currentFilterList: [],
      currentType: '',
      currentOrder: constants.PRICE_ORDER_LIST[3].key,  // created first
    }
  },
  computed: {
    getPricesParams() {
      let defaultParams = { order_by: this.currentOrder, page: this.pricePage }
      if (this.currentFilterList.includes('show_last_month')) {
        defaultParams['date__gte'] = date_utils.oneMonthAgoDate()
      }
      if (this.currentType) {
        defaultParams[constants.TYPE_PARAM] = this.currentType
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initPrices()
      }
    }
  },
  mounted() {
    this.currentFilterList = utils.toArray(this.$route.query[constants.FILTER_PARAM]) || this.currentFilterList
    this.currentType = this.$route.query[constants.TYPE_PARAM] || this.currentType
    this.initPrices()
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
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getPrices()
      }
    },
  }
}
</script>

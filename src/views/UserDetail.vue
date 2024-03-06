<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card :title="username" prepend-icon="mdi-account">
        <v-card-text>
          <PriceCountChip :count="userPriceTotal" :withLabel="true"></PriceCountChip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col cols="12">
      <OpenFoodFactsButton type="editor" :value="username"></OpenFoodFactsButton>
      <ShareButton></ShareButton>
    </v-col>
  </v-row>

  <br />

  <h2 class="text-h6 mb-1">
    {{ $t('UserDetail.LatestPrices') }}
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
          <v-btn v-bind="props" size="small" prepend-icon="mdi-arrow-down" :append-icon="getCurrentPriceOrderIcon"  :active="!!priceOrder">{{ $t('Common.Order') }}</v-btn>
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
    <v-col cols="12" sm="6" md="4" v-for="price in userPriceList" :key="price">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>

  <v-row v-if="userPriceList.length < userPriceTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getUserPrices">{{ $t('UserDetail.LoadMore') }}</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    'PriceCountChip': defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    'PriceCard': defineAsyncComponent(() => import('../components/PriceCard.vue')),
    'OpenFoodFactsButton': defineAsyncComponent(() => import('../components/OpenFoodFactsButton.vue')),
    'ShareButton': defineAsyncComponent(() => import('../components/ShareButton.vue'))
  },
  data() {
    return {
      userPriceList: [],
      userPriceTotal: null,
      userPricePage: 0,
      loading: false,
      // filter & order
      priceFilter: '',
      priceFilterList: constants.PRICE_FILTER_LIST,
      priceOrder: constants.PRICE_ORDER_BY_LIST[1].key,
      priceOrderList: constants.PRICE_ORDER_BY_LIST,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.$route.params.username
    },
    getCurrentPriceOrderIcon() {
      let currentPriceOrder = this.priceOrderList.find(o => o.key === this.priceOrder)
      return currentPriceOrder ? currentPriceOrder.icon : ''
    },
    getPricesParams() {
      let defaultParams = { owner: this.username, order_by: `${this.priceOrder}`, page: this.userPricePage }
      if (this.priceFilter === 'show_last_month') {
        let oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        defaultParams['date__gte'] = oneMonthAgo.toISOString().substring(0, 10)
      }
      return defaultParams
    },
  },
  mounted() {
    this.priceFilter = this.$route.query[constants.FILTER_PARAM] || this.priceFilter
    this.priceOrder = this.$route.query[constants.ORDER_BY_PARAM] || this.priceOrder
    this.getUserPrices()
  },
  methods: {
    initUserPrices() {
      this.userPriceList = []
      this.userPriceTotal = null
      this.userPricePage = 0
      this.getUserPrices()
    },
    getUserPrices() {
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
      this.priceFilter = this.priceFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.priceFilter } })
      // this.initUserPrices() will be called in watch $route
    },
    selectPriceOrder(orderKey) {
      if (this.priceOrder !== orderKey) {
        this.priceOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_BY_PARAM]: this.priceOrder } })
        // this.initUserPrices() will be called in watch $route
      }
    }
  },
  watch: {
    $route (newRoute, oldRoute) {  // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initUserPrices()
      }
    }
  }
}
</script>

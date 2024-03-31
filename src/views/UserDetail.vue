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
      <OpenFoodFactsLink display="button" facet="editor" :value="username"></OpenFoodFactsLink>
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
      <FilterMenu kind="price" :currentFilter="currentFilter" @update:currentFilter="togglePriceFilter($event)"></FilterMenu>
      <OrderMenu kind="price" :currentOrder="currentOrder" @update:currentOrder="selectPriceOrder($event)"></OrderMenu>
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
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import constants from '../constants'

export default {
  components: {
    'PriceCountChip': defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    'FilterMenu': defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    'OrderMenu': defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    'PriceCard': defineAsyncComponent(() => import('../components/PriceCard.vue')),
    'OpenFoodFactsLink': defineAsyncComponent(() => import('../components/OpenFoodFactsLink.vue')),
    'ShareButton': defineAsyncComponent(() => import('../components/ShareButton.vue'))
  },
  data() {
    return {
      userPriceList: [],
      userPriceTotal: null,
      userPricePage: 0,
      loading: false,
      // filter & order
      currentFilter: '',
      currentOrder: constants.PRICE_ORDER_LIST[1].key,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.$route.params.username
    },
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
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
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

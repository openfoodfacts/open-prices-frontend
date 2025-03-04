<template>
  <v-row>
    <v-col cols="12" sm="6">
      <BrandCard :brand="brandId" :productCount="brandProductTotal" />
    </v-col>
  </v-row>

  <v-row v-if="!loading">
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.TopProducts') }}
      </h2>
      <LoadedCountChip :loadedCount="brandProductList.length" :totalCount="brandProductTotal" />
      <FilterMenu kind="product" :currentFilter="currentFilter" :hideSource="true" @update:currentFilter="toggleProductFilter($event)" />
      <OrderMenu kind="product" :currentOrder="currentOrder" @update:currentOrder="selectProductOrder($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="product in brandProductList" :key="product" cols="12" sm="6" md="4" xl="3">
      <ProductCard :product="product" elevation="1" height="100%" />
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
import constants from '../constants'
import api from '../services/api'
import utils from '../utils.js'

export default {
  components: {
    BrandCard: defineAsyncComponent(() => import('../components/BrandCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue'))
  },
  data() {
    return {
      brandId: this.$route.params.id,
      // data
      brandProductList: [],
      brandProductTotal: null,
      brandProductPage: 0,
      loading: false,
      // filter & order
      currentFilter: '',
      currentOrder: constants.PRODUCT_ORDER_LIST[0].key,  // price_count
    }
  },
  computed: {
    getProductsParams() {
      let defaultParams = { brands__like: this.brandId, order_by: `${this.currentOrder}`, page: this.brandProductPage }
      if (this.currentFilter) {
        if (this.currentFilter === 'price_count_gte_1') {
          defaultParams['price_count__gte'] = 1
        } else if (this.currentFilter === 'price_count_0') {
          defaultParams['price_count'] = 0
        }
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) {
      if (oldRoute && newRoute && newRoute.name == 'brand-detail' && oldRoute.fullPath != newRoute.fullPath) {
        this.initBrand()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.initBrand()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initBrand() {
      this.brandId = this.$route.params.id
      this.brandProductList = []
      this.brandProductTotal = null
      this.brandProductPage = 0
      this.getBrandProducts()
    },
    getBrandProducts() {
      if ((this.brandProductTotal != null) && (this.brandProductList.length >= this.brandProductTotal)) return
      this.loading = true
      this.brandProductPage += 1
      return api.getProducts(this.getProductsParams)
        .then((data) => {
          this.brandProductList.push(...data.items)
          this.brandProductTotal = data.total
          this.loading = false
        })
    },
    toggleProductFilter(filterKey) {
      this.currentFilter = (this.currentFilter !== filterKey) ? filterKey : ''
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initBrand() will be called in watch $route
    },
    selectProductOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initBrand() will be called in watch $route
      }
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getBrandProducts()
      }
    },
  }
}
</script>

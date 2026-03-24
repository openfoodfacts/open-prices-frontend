<template>
  <v-row>
    <v-col cols="12" sm="6">
      <CategoryCard v-if="category" :category="category" source="category" :productCount="categoryProductTotal" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.TopProducts') }}
      </h2>
      <template v-if="!loading">
        <LoadedCountChip :loadedCount="categoryProductList.length" :totalCount="categoryProductTotal" />
        <FilterMenu kind="product" :currentFilterList="currentFilterList" :hideSource="true" @update:currentFilterList="updateFilterList($event)" />
        <OrderMenu kind="product" :currentOrder="currentOrder" @update:currentOrder="updateOrder($event)" />
      </template>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="product in categoryProductList" :key="product" cols="12" sm="6" md="4" xl="3">
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
import openPricesApi from '../services/openPricesApi'
import utils from '../utils.js'

export default {
  components: {
    CategoryCard: defineAsyncComponent(() => import('../components/CategoryCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue'))
  },
  data() {
    return {
      categoryId: this.$route.params.id,
      // data
      category: null,  // see init
      categoryProductList: [],
      categoryProductTotal: null,
      categoryProductPage: 0,
      loading: false,
      // filter & order
      currentFilterList: [],
      currentOrder: constants.PRODUCT_ORDER_LIST[0].key,  // price_count
    }
  },
  computed: {
    getProductsParams() {
      let defaultParams = { categories_tags__contains: this.category.id, order_by: `${this.currentOrder}`, page: this.categoryProductPage }
      if (this.currentFilterList.includes('price_count_gte_1')) {
        defaultParams['price_count__gte'] = 1
      } else if (this.currentFilterList.includes('price_count_0')) {
        defaultParams['price_count'] = 0
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) {
      if (oldRoute && newRoute && newRoute.name == 'category-detail' && oldRoute.fullPath != newRoute.fullPath) {
        this.initCategory()
      }
    }
  },
  mounted() {
    this.currentFilterList = utils.toArray(this.$route.query[constants.FILTER_PARAM]) || this.currentFilterList
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.initCategory()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initCategory() {
      this.categoryId = this.$route.params.id
      this.category = {'id': this.categoryId, 'name': this.categoryId}
      this.categoryProductList = []
      this.categoryProductTotal = null
      this.categoryProductPage = 0
      this.getCategoryProducts()
    },
    getCategoryProducts() {
      if ((this.categoryProductTotal != null) && (this.categoryProductList.length >= this.categoryProductTotal)) return
      this.loading = true
      this.categoryProductPage += 1
      return openPricesApi.getProducts(this.getProductsParams)
        .then((data) => {
          this.categoryProductList.push(...data.items)
          this.categoryProductTotal = data.total
          this.loading = false
        })
    },
    updateFilterList(newFilterList) {
      this.currentFilterList = newFilterList
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilterList } })
      // this.initCategory() will be called in watch $route
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initCategory() will be called in watch $route
      }
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getCategoryProducts()
      }
    },
  }
}
</script>

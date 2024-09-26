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
      <LoadedCountChip v-if="!loading" :loadedCount="categoryProductList.length" :totalCount="categoryProductTotal" />
      <FilterMenu v-if="!loading" kind="product" :currentFilter="currentFilter" :hideSource="true" @update:currentFilter="toggleProductFilter($event)" />
      <OrderMenu v-if="!loading" kind="product" :currentOrder="currentOrder" @update:currentOrder="selectProductOrder($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="product in categoryProductList" :key="product" cols="12" sm="6" md="4">
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
    CategoryCard: defineAsyncComponent(() => import('../components/CategoryCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue'))
  },
  data() {
    return {
      categoryId: this.$route.params.id,
      // filter & order
      currentFilter: '',
      currentOrder: constants.PRODUCT_ORDER_LIST[1].key,
      // data
      category: null,  // see init
      categoryProductList: [],
      categoryProductTotal: null,
      categoryProductPage: 0,
      loading: false,
    }
  },
  computed: {
    getProductsParams() {
      let defaultParams = { categories_tags__contains: this.category.id, order_by: `${this.currentOrder}`, page: this.categoryProductPage }
      if (this.currentFilter && this.currentFilter === 'hide_price_count_gte_1') {
        defaultParams['price_count'] = 0
      }
      return defaultParams
    },
  },
  watch: {
    $route (newCategory, oldCategory) {
      if (oldCategory && newCategory && newCategory.name == 'category-detail' && oldCategory.fullPath != newCategory.fullPath) {
        this.initCategory()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
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
      this.category = {'id': this.categoryId, 'name': this.categoryId}
      this.categoryProductList = []
      this.categoryProductTotal = null
      this.categoryProductPage = 0
      this.getCategoryProducts()
    },
    getCategoryProducts() {
      this.loading = true
      this.categoryProductPage += 1
      return api.getProducts(this.getProductsParams)
        .then((data) => {
          this.categoryProductList.push(...data.items)
          this.categoryProductTotal = data.total
          this.loading = false
        })
    },
    toggleProductFilter(filterKey) {
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initCategory() will be called in watch $route
    },
    selectProductOrder(orderKey) {
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

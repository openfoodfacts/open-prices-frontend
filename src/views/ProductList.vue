<template>
  <h1 class="text-h5 mb-1">
    {{ $t('ProductList.Title') }}
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row v-if="!loading">
    <v-col>
      <v-chip class="mr-2" label variant="text" prepend-icon="mdi-food-outline">
        {{ productTotal }}<span class="d-none d-sm-inline">&nbsp;products</span>
      </v-chip>
      <FilterMenu kind="product" :currentFilter="currentFilter" @update:currentFilter="toggleProductFilter($event)"></FilterMenu>
      <ProductOrderMenu :productOrder="productOrder" @update:productOrder="selectProductOrder($event)"></ProductOrderMenu>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col cols="12" sm="6" md="4" v-for="product in productList" :key="product">
      <ProductCard :product="product" elevation="1" height="100%"></ProductCard>
    </v-col>
  </v-row>

  <v-row v-if="productList.length < productTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getProducts">{{ $t('ProductList.LoadMore') }}</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import constants from '../constants'
import api from '../services/api'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'FilterMenu': defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    'ProductOrderMenu': defineAsyncComponent(() => import('../components/ProductOrderMenu.vue')),
    'ProductCard': defineAsyncComponent(() => import('../components/ProductCard.vue')),
  },
  data() {
    return {
      // filter & order
      currentFilter: '',
      productOrder: constants.PRODUCT_ORDER_LIST[1].key,
      // data
      productList: [],
      productTotal: null,
      productPage: 0,
      loading: false,
    }
  },
  computed: {
    getProductsParams() {
      let defaultParams = { order_by: `${this.productOrder}`, page: this.productPage }
      if (this.currentFilter && this.currentFilter === 'hide_price_count_gte_1') {
        defaultParams['price_count'] = 0
      }
      return defaultParams
    },
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.productOrder = this.$route.query[constants.ORDER_PARAM] || this.productOrder
    this.initProductList()
  },
  methods: {
    initProductList() {
      this.productList = []
      this.productTotal = null
      this.productPage = 0
      this.getProducts()
    },
    getProducts() {
      this.loading = true
      this.productPage += 1
      return api.getProducts(this.getProductsParams)
        .then((data) => {
          this.productList.push(...data.items)
          this.productTotal = data.total
          this.loading = false
        })
    },
    toggleProductFilter(filterKey) {
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initProductList() will be called in watch $route
    },
    selectProductOrder(orderKey) {
      if (this.productOrder !== orderKey) {
        this.productOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.productOrder } })
        // this.initProductList() will be called in watch $route
      }
    }
  },
  watch: {
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initProductList()
      }
    }
  }
}
</script>

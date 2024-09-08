<template>
  <v-row>
    <v-col cols="12" sm="6">
      <BrandCard :brand="brandId" :productCount="brandProductTotal" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.TopProducts') }}
      </h2>
      <v-progress-circular v-if="loading" indeterminate :size="30" />
      <LoadedCountChip v-if="!loading" :loadedCount="brandProductList.length" :totalCount="brandProductTotal" />
      <FilterMenu v-if="!loading" kind="product" :currentFilter="currentFilter" :hideSource="true" @update:currentFilter="toggleProductFilter($event)" />
      <OrderMenu v-if="!loading" kind="product" :currentOrder="currentOrder" @update:currentOrder="selectProductOrder($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="product in brandProductList" :key="product" cols="12" sm="6" md="4">
      <ProductCard :product="product" elevation="1" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="brandProductList.length < brandProductTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getBrandProducts">
        {{ $t('Common.LoadMore') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import api from '../services/api'

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
      // filter & order
      currentFilter: '',
      currentOrder: constants.PRODUCT_ORDER_LIST[1].key,
      // data
      brand: null,  // see init
      brandProductList: [],
      brandProductTotal: null,
      brandProductPage: 0,
      loading: false,
    }
  },
  computed: {
    getProductsParams() {
      let defaultParams = { brands__like: this.brandId, order_by: `${this.currentOrder}`, page: this.brandProductPage }
      if (this.currentFilter && this.currentFilter === 'hide_price_count_gte_1') {
        defaultParams['price_count'] = 0
      }
      return defaultParams
    },
  },
  watch: {
    $route (newBrand, oldBrand) {
      if (oldBrand && newBrand && newBrand.name == 'brand-detail' && oldBrand.fullPath != newBrand.fullPath) {
        this.initBrand()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.initBrand()
  },
  methods: {
    initBrand() {
      this.brandProductList = []
      this.brandProductTotal = null
      this.brandProductPage = 0
      this.getBrandProducts()
    },
    getBrandProducts() {
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
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initBrand() will be called in watch $route
    },
    selectProductOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initBrand() will be called in watch $route
      }
    }
  }
}
</script>

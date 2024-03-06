<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card
        :title="brand"
        prepend-icon="mdi-factory">
        <v-card-text>
          <v-chip label size="small" density="comfortable" class="mr-1">
            <v-icon start icon="mdi-food-outline"></v-icon>
            {{ $t('BrandDetail.BrandProductTotal', { count: brandProductTotal }) }}
          </v-chip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col cols="12">
      <OpenFoodFactsButton type="brand" :value="brand"></OpenFoodFactsButton>
      <ShareButton></ShareButton>
    </v-col>
  </v-row>

  <br />

  <h2 class="text-h6 mb-1">
    {{ $t('BrandDetail.TopProducts') }}
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>

  <v-row v-if="!loading">
    <v-col>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" size="small" class="mr-2" prepend-icon="mdi-filter-variant" :active="!!productFilter">{{ $t('Common.Filter') }}</v-btn>
        </template>
        <v-list>
          <v-list-item :slim="true" v-for="filter in productFilterList" :key="filter.key" :prepend-icon="(productFilter === filter.key) ? 'mdi-check-circle' : 'mdi-circle-outline'" :active="productFilter === filter.key" @click="toggleProductFilter(filter.key)">
            {{ $t('Common.' + filter.value) }}
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" size="small" prepend-icon="mdi-arrow-down" :append-icon="getCurrentProductOrderIcon"  :active="!!productOrder">{{ $t('Common.Order') }}</v-btn>
        </template>
        <v-list>
          <v-list-item :slim="true" v-for="order in productOrderList" :key="order.key" :prepend-icon="order.icon" :active="productOrder === order.key" @click="selectProductOrder(order.key)">
            {{ $t('Common.' + order.value) }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col cols="12" sm="6" md="4" v-for="product in brandProductList" :key="product">
      <ProductCard :product="product" elevation="1" height="100%"></ProductCard>
    </v-col>
  </v-row>

  <v-row v-if="brandProductList.length < brandProductTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getBrandProducts">{{ $t('BrandDetail.LoadMore') }}</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import constants from '../constants'
import api from '../services/api'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'ProductCard': defineAsyncComponent(() => import('../components/ProductCard.vue')),
    'OpenFoodFactsButton': defineAsyncComponent(() => import('../components/OpenFoodFactsButton.vue')),
    'ShareButton': defineAsyncComponent(() => import('../components/ShareButton.vue'))
  },
  data() {
    return {
      // filter & order
      productFilter: '',
      productFilterList: constants.PRODUCT_FILTER_LIST,
      productOrder: constants.PRODUCT_ORDER_BY_LIST[1].key,
      productOrderList: constants.PRODUCT_ORDER_BY_LIST,
      // data
      brand: null,  // see init
      brandProductList: [],
      brandProductTotal: null,
      brandProductPage: 0,
      loading: false,
    }
  },
  computed: {
    getCurrentProductOrderIcon() {
      let currentProductOrder = this.productOrderList.find(o => o.key === this.productOrder)
      return currentProductOrder ? currentProductOrder.icon : ''
    },
    getProductsParams() {
      let defaultParams = { brands__like: this.brand, order_by: `${this.productOrder}`, page: this.brandProductPage }
      if (this.productFilter && this.productFilter === 'hide_price_count_gte_1') {
        defaultParams['price_count'] = 0
      }
      return defaultParams
    },
  },
  mounted() {
    this.productFilter = this.$route.query[constants.FILTER_PARAM] || this.productFilter
    this.productOrder = this.$route.query[constants.ORDER_BY_PARAM] || this.productOrder
    this.initBrand()
  },
  methods: {
    initBrand() {
      this.brand = this.$route.params.id
      this.brandProductList = []
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
      this.productFilter = this.productFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.productFilter } })
      // this.initBrand() will be called in watch $route
    },
    selectProductOrder(orderKey) {
      if (this.productOrder !== orderKey) {
        this.productOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_BY_PARAM]: this.productOrder } })
        // this.initBrand() will be called in watch $route
      }
    }
  },
  watch: {
    $route (newBrand, oldBrand) {
      if (oldBrand && newBrand && newBrand.name == 'brand-detail' && oldBrand.fullPath != newBrand.fullPath) {
        this.initBrand()
      }
    }
  }
}
</script>

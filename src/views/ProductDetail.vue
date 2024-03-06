<template>
  <v-row>
    <v-col cols="12" sm="6">
      <ProductCard v-if="!loading && !productIsCategory" :product="product"></ProductCard>
      <v-card v-if="!loading && productIsCategory" :title="getCategoryName" prepend-icon="mdi-fruit-watermelon" elevation="1"></v-card>
    </v-col>
  </v-row>

  <v-row class="mt-0" v-if="!productNotFound">
    <v-col cols="12">
      <v-btn class="mr-2" size="small" color="primary" prepend-icon="mdi-plus" :to="'/add/single?code=' + product.code">{{ $t('ProductDetail.AddPrice') }}</v-btn>
      <OpenFoodFactsButton v-if="product.code && product.source" type="product" :value="product.code"></OpenFoodFactsButton>
      <ShareButton></ShareButton>
    </v-col>
  </v-row>

  <v-row class="mt-0" v-if="productOrCategoryNotFound">
    <v-col cols="12" sm="6">
      <p v-if="productNotFound" class="text-red">
        <i>
          <i18n-t keypath="ProductDetail.ProductNotFound" tag="span">
            <template #name>{{ OFF_NAME }}</template>
          </i18n-t>
        </i>
        <OpenFoodFactsButton class="ml-2" action="add"></OpenFoodFactsButton>
      </p>
      <p v-if="categoryNotFound" class="text-red">
        <i>{{ $t('ProductDetail.CategoryNotFound') }}</i>
      </p>
    </v-col>
  </v-row>

  <br />

  <h2 class="text-h6 mb-1">
    {{ $t('ProductDetail.LatestPrices') }}
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
    <v-col cols="12" sm="6" md="4" v-for="price in productPriceList" :key="price">
      <PriceCard :price="price" :product="product" :hideProductImage="true" :hideProductTitle="true" :hideProductDetails="productIsCategory ? false : true" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>

  <v-row v-if="productPriceList.length < productPriceTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getProductPrices">{{ $t('ProductDetail.LoadMore') }}</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import constants from '../constants'
import utils from '../utils.js'
import api from '../services/api'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'ProductCard': defineAsyncComponent(() => import('../components/ProductCard.vue')),
    'PriceCard': defineAsyncComponent(() => import('../components/PriceCard.vue')),
    'OpenFoodFactsButton': defineAsyncComponent(() => import('../components/OpenFoodFactsButton.vue')),
    'ShareButton': defineAsyncComponent(() => import('../components/ShareButton.vue'))
  },
  data() {
    return {
      OFF_NAME: constants.OFF_NAME,
      productId: this.$route.params.id,  // product_code or product_category
      product: { code: this.$route.params.id },
      productPriceList: [],
      productPriceTotal: null,
      productPricePage: 0,
      loading: false,
      // share
      shareLinkCopySuccessMessage: false,
      // filter & order
      priceFilter: '',
      priceFilterList: constants.PRICE_FILTER_LIST,
      priceOrder: constants.PRICE_ORDER_BY_LIST[1].key,
      priceOrderList: constants.PRICE_ORDER_BY_LIST,
    }
  },
  mounted() {
    this.priceFilter = this.$route.query[constants.FILTER_PARAM] || this.priceFilter
    this.priceOrder = this.$route.query[constants.ORDER_BY_PARAM] || this.priceOrder
    this.getProduct(),
    this.getProductPrices()
  },
  computed: {
    productIsCategory() {
      return this.productId.startsWith('en')
    },
    getCategoryName() {
      return utils.getCategoryName(this.productId)
    },
    productNotFound() {
      return !this.productIsCategory && (!this.product.code || !this.product.source)
    },
    categoryNotFound() {
      return this.productIsCategory && (this.getCategoryName === this.productId)
    },
    productOrCategoryNotFound() {
      return !this.loading && (this.productNotFound || this.categoryNotFound)
    },
    getCurrentPriceOrderIcon() {
      let currentPriceOrder = this.priceOrderList.find(o => o.key === this.priceOrder)
      return currentPriceOrder ? currentPriceOrder.icon : ''
    },
    getPricesParams() {
      let defaultParams = { [this.productIsCategory ? 'category_tag' : 'product_code']: this.productId, order_by: `${this.priceOrder}`, page: this.productPricePage }
      if (this.priceFilter === 'show_last_month') {
        let oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        defaultParams['date__gte'] = oneMonthAgo.toISOString().substring(0, 10)
      }
      return defaultParams
    },
  },
  methods: {
    initProductPrices() {
      this.productPriceList = []
      this.productPricePage = 0
      this.getProductPrices()
    },
    getProduct() {
      if (!this.productIsCategory) {
        return api.getProductByCode(this.productId)
          .then((data) => {
            if (data.id) {
              this.product = data
            }
          })
      }
    },
    getProductPrices() {
      this.loading = true
      this.productPricePage += 1
      return api.getPrices(this.getPricesParams)
        .then((data) => {
          this.productPriceList.push(...data.items)
          this.productPriceTotal = data.total
          this.loading = false
        })
    },
    togglePriceFilter(filterKey) {
      this.priceFilter = this.priceFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.priceFilter } })
      // this.initProductPrices() will be called in watch $route
    },
    selectPriceOrder(orderKey) {
      if (this.priceOrder !== orderKey) {
        this.priceOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_BY_PARAM]: this.priceOrder } })
        // this.initProductPrices() will be called in watch $route
      }
    }
  },
  watch: {
    $route (newRoute, oldRoute) {  // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initProductPrices()
      }
    }
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6">
      <ProductCard v-if="!productIsCategory" :product="product"></ProductCard>
      <v-card v-else :title="getCategoryName" prepend-icon="mdi-fruit-watermelon" elevation="1"></v-card>
    </v-col>
  </v-row>

  <v-row class="mt-0" v-if="productOrCategoryNotFound">
    <v-col cols="12" sm="6">
      <v-alert v-if="productNotFound" type="error" variant="outlined" icon="mdi-alert">
        <i>
          <i18n-t keypath="ProductDetail.ProductNotFound" tag="span">
            <template #name>{{ OFF_NAME }}</template>
          </i18n-t>
        </i>
        <OpenFoodFactsLink class="ml-2" display="button" action="add"></OpenFoodFactsLink>
      </v-alert>
      <v-alert v-if="categoryNotFound" type="error" variant="outlined" icon="mdi-alert">
        <i>{{ $t('ProductDetail.CategoryNotFound') }}</i>
      </v-alert>
    </v-col>
  </v-row>

  <v-row class="mt-0" v-if="!productNotFound">
    <v-col cols="12">
      <v-btn class="mr-2" size="small" color="primary" prepend-icon="mdi-plus" :to="'/add/single?code=' + product.code">{{ $t('ProductDetail.AddPrice') }}</v-btn>
      <OpenFoodFactsLink v-if="product.code && product.source" display="button" facet="product" :value="product.code"></OpenFoodFactsLink>
      <ShareButton></ShareButton>
    </v-col>
  </v-row>

  <br />

  <h2 class="text-h6 mb-1">
    {{ $t('ProductDetail.LatestPrices') }}
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>

  <v-row v-if="!loading">
    <v-col>
      <FilterMenu kind="price" :currentFilter="currentFilter" @update:currentFilter="togglePriceFilter($event)"></FilterMenu>

      <v-menu scroll-strategy="close">
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
    'FilterMenu': defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    'PriceCard': defineAsyncComponent(() => import('../components/PriceCard.vue')),
    'OpenFoodFactsLink': defineAsyncComponent(() => import('../components/OpenFoodFactsLink.vue')),
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
      currentFilter: '',
      priceOrder: constants.PRICE_ORDER_LIST[1].key,
      priceOrderList: constants.PRICE_ORDER_LIST,
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.priceOrder = this.$route.query[constants.ORDER_PARAM] || this.priceOrder
    this.getProduct(),
    this.initProductPrices()
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
      if (this.currentFilter === 'show_last_month') {
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
      this.productPriceTotal = null
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
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initProductPrices() will be called in watch $route
    },
    selectPriceOrder(orderKey) {
      if (this.priceOrder !== orderKey) {
        this.priceOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.priceOrder } })
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

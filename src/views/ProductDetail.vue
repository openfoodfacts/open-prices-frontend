<template>
  <v-row>
    <v-col cols="12" sm="6">
      <ProductCard v-if="!productIsCategory" :product="product" />
      <CategoryCard v-else :category="category" :priceCount="productPriceTotal" />
    </v-col>
  </v-row>

  <v-row v-if="productOrCategoryNotFound" class="mt-0">
    <v-col cols="12" sm="6">
      <v-alert v-if="productNotFound" type="error" variant="outlined" icon="mdi-alert">
        <i>
          <i18n-t keypath="ProductDetail.ProductNotFound" tag="span">
            <template #name>{{ OFF_NAME }}</template>
          </i18n-t>
        </i>
        <br>
        <OpenFoodFactsAddMenu :product="product" />
      </v-alert>
      <v-alert v-if="categoryNotFound" type="error" variant="outlined" icon="mdi-alert">
        <i>{{ $t('ProductDetail.CategoryNotFound') }}</i>
      </v-alert>
    </v-col>
  </v-row>

  <v-row v-if="!productOrCategoryNotFound" class="mt-0">
    <v-col cols="12">
      <PriceAddButton v-if="product && product.code" class="mr-2" :productCode="product.code" />
      <PriceAddButton v-else-if="category" class="mr-2" :productCode="category.name" />
      <OpenFoodFactsLink v-if="product && product.code && product.source" display="button" :source="product.source" facet="product" :value="product.code" />
      <ShareButton />
    </v-col>
  </v-row>

  <br>

  <v-tabs v-model="tab" align-tabs="start" grow>
    <v-tab value="tab-list">
      <v-icon icon="mdi-database-outline" />
      {{ $t('Common.List') }}
    </v-tab>
    <v-tab value="tab-map">
      <v-icon icon="mdi-map-marker-outline" />
      {{ $t('Common.Map') }}
    </v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item value="tab-list">
      <v-container fluid>
        <v-row>
          <v-col>
            <h2 class="text-h6 d-inline mr-2">
              {{ $t('ProductDetail.LatestPrices') }}
            </h2>
            <v-progress-circular v-if="loading" indeterminate :size="30" />
            <FilterMenu v-if="!loading" kind="price" :currentFilter="currentFilter" @update:currentFilter="togglePriceFilter($event)" />
            <OrderMenu v-if="!loading" kind="price" :currentOrder="currentOrder" @update:currentOrder="selectPriceOrder($event)" />
          </v-col>
        </v-row>

        <v-row class="mt-0">
          <v-col v-for="price in productPriceList" :key="price" cols="12" sm="6" md="4">
            <PriceCard :price="price" :product="product" :hideProductImage="true" :hideProductTitle="true" :hideProductDetails="productIsCategory ? false : true" elevation="1" height="100%" />
          </v-col>
        </v-row>

        <v-row v-if="productPriceList.length < productPriceTotal" class="mb-2">
          <v-col align="center">
            <v-btn size="small" :loading="loading" @click="getProductPrices">
              {{ $t('ProductDetail.LoadMore') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-window-item>
    <v-window-item key="tab-map" value="tab-map" />
  </v-window>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import utils from '../utils.js'
import api from '../services/api'

export default {
  components: {
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    CategoryCard: defineAsyncComponent(() => import('../components/CategoryCard.vue')),
    PriceAddButton: defineAsyncComponent(() => import('../components/PriceAddButton.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    OpenFoodFactsLink: defineAsyncComponent(() => import('../components/OpenFoodFactsLink.vue')),
    OpenFoodFactsAddMenu: defineAsyncComponent(() => import('../components/OpenFoodFactsAddMenu.vue')),
    ShareButton: defineAsyncComponent(() => import('../components/ShareButton.vue'))
  },
  data() {
    return {
      OFF_NAME: constants.OFF_NAME,
      productId: this.$route.params.id,  // product_code or product_category
      product: null,
      category: null,
      productPriceList: [],
      productPriceTotal: 0,
      productPricePage: 0,
      loading: false,
      // share
      shareLinkCopySuccessMessage: false,
      // tabs
      tab: null,
      // filter & order
      currentFilter: '',
      currentOrder: constants.PRICE_ORDER_LIST[1].key,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    productIsCategory() {
      return this.productId.startsWith('en')
    },
    productNotFound() {
      return !this.productIsCategory && !this.product
    },
    categoryNotFound() {
      return this.productIsCategory && this.category && this.category.status
    },
    productOrCategoryNotFound() {
      return !this.loading && (this.productNotFound || this.categoryNotFound)
    },
    getPricesParams() {
      let defaultParams = { [this.productIsCategory ? 'category_tag' : 'product_code']: this.productId, order_by: `${this.currentOrder}`, page: this.productPricePage }
      if (this.currentFilter === 'show_last_month') {
        let oneMonthAgo = new Date()
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
        defaultParams['date__gte'] = oneMonthAgo.toISOString().substring(0, 10)
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) {  // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initProductPrices()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.getProduct()
    this.initProductPrices()
  },
  methods: {
    initProductPrices() {
      this.productPriceList = []
      this.productPriceTotal = 0
      this.productPricePage = 0
      this.getProductPrices()
    },
    getProduct() {
      if (this.productIsCategory) {
        utils.getLocaleCategoryTag(this.appStore.getUserLanguage, this.productId).then((category) => {
          this.category = category
        })
      } else {
        return api.getProductByCode(this.productId)
          .then((data) => {
            if (data.id) {
              this.product = data
            } else {
              this.product = { code: this.productId, price_count: this.productPriceTotal }
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
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initProductPrices() will be called in watch $route
      }
    }
  }
}
</script>

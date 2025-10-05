<template>
  <v-row>
    <v-col cols="12" sm="6">
      <ProductCard v-if="!productIsCategory" :product="product" />
      <CategoryCard v-else :category="category" source="product" :priceCount="priceTotal" />
    </v-col>
  </v-row>

  <v-row v-if="productOrCategoryNotFound" class="mt-0">
    <v-col cols="12" sm="6">
      <v-alert v-if="productNotFound" data-name="product-not-found-alert" type="error" variant="outlined">
        <p>
          <i18n-t keypath="ProductDetail.ProductNotFound" tag="i">
            <template #name>
              {{ OFF_NAME }}
            </template>
          </i18n-t>
        </p>
        <OpenFoodFactsAddMenu :productCode="productId" />
      </v-alert>
      <v-alert v-else-if="categoryNotFound" data-name="category-not-found-alert" type="error" variant="outlined">
        <i>{{ $t('ProductDetail.CategoryNotFound') }}</i>
      </v-alert>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.LatestPrices') }}
      </h2>
      <LoadedCountChip v-if="!loading" :loadedCount="priceList.length" :totalCount="priceTotal" />
      <FilterMenu kind="price" :hideType="true" :currentFilterList="currentFilterList" @update:currentFilterList="updateFilterList($event)" />
      <OrderMenu kind="price" :currentOrder="currentOrder" @update:currentOrder="selectPriceOrder($event)" />
      <DisplayMenu :show="['list', 'table', 'map', 'chart']" :currentDisplay="currentDisplay" @update:currentDisplay="selectPriceDisplay($event)" />
    </v-col>
  </v-row>

  <v-window v-model="currentDisplay" disabled>
    <v-window-item value="list">
      <v-row class="mt-0 mb-1">
        <v-col v-for="price in priceList" :key="price" cols="12" sm="6" md="4" xl="3">
          <PriceCard :price="price" :product="product" :hideProductImage="true" :hideProductTitle="true" :hideProductDetails="productIsCategory ? false : true" elevation="1" height="100%" />
        </v-col>
      </v-row>
    </v-window-item>
    <v-window-item value="table">
      <PriceTable class="mt-3 mb-3" :priceList="priceList" source="product" />
    </v-window-item>
    <v-window-item value="map">
      <v-row class="mt-0 mb-1">
        <v-col style="height:400px">
          <LeafletMap :locations="priceLocationList" />
        </v-col>
      </v-row>
    </v-window-item>
    <v-window-item value="chart">
      <v-row class="mt-0 mb-1">
        <v-col>
          <PriceChart :priceList="priceList" />
        </v-col>
      </v-row>
    </v-window-item>
  </v-window>

  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import constants from '../constants'
import date_utils from '../utils/date.js'
import utils from '../utils.js'

export default {
  components: {
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    CategoryCard: defineAsyncComponent(() => import('../components/CategoryCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    DisplayMenu: defineAsyncComponent(() => import('../components/DisplayMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    PriceTable: defineAsyncComponent(() => import('../components/PriceTable.vue')),
    LeafletMap: defineAsyncComponent(() => import('../components/LeafletMap.vue')),
    PriceChart: defineAsyncComponent(() => import('../components/PriceChart.vue')),
    OpenFoodFactsAddMenu: defineAsyncComponent(() => import('../components/OpenFoodFactsAddMenu.vue')),
  },
  data() {
    return {
      OFF_NAME: constants.OFF_NAME,
      productId: this.$route.params.id,  // product_code or product_category
      // data
      product: null,
      category: null,
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      priceLocationList: [],
      loading: false,
      // share
      shareLinkCopySuccessMessage: false,
      // filter, order & display
      currentFilterList: [],
      currentOrder: constants.PRICE_ORDER_LIST[2].key,  // date
      currentDisplay: constants.DISPLAY_LIST[0].key,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    productIsCategory() {
      return this.productId.includes(':')
    },
    productNotFound() {
      return !this.productIsCategory && this.product && !this.product.source
    },
    categoryFound() {
      return this.category && !this.category.status
    },
    categoryNotFound() {
      return this.productIsCategory && !this.categoryFound
    },
    productOrCategoryNotFound() {
      return !this.loading && (this.productNotFound || this.categoryNotFound)
    },
    getPricesParams() {
      let defaultParams = { [this.productIsCategory ? 'category_tag' : 'product_code']: this.productId, order_by: `${this.currentOrder}`, page: this.pricePage }
      if (this.currentFilterList.includes('show_last_month')) {
        defaultParams['date__gte'] = date_utils.oneMonthAgoDate()
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) {
      // only called when query changes to avoid having an API call when the path changes
      // but ignore 'display' changes
      if (oldRoute.path === newRoute.path) {
        const oldRouteQueryFiltered = Object.fromEntries(Object.entries(oldRoute.query).filter(([key, value]) => key !== constants.DISPLAY_PARAM))  // eslint-disable-line no-unused-vars
        const newRouteQueryFiltered = Object.fromEntries(Object.entries(newRoute.query).filter(([key, value]) => key !== constants.DISPLAY_PARAM))  // eslint-disable-line no-unused-vars
        if (JSON.stringify(oldRouteQueryFiltered) !== JSON.stringify(newRouteQueryFiltered)) {
          this.initPrices()
        }
      }
    }
  },
  mounted() {
    this.currentFilterList = utils.toArray(this.$route.query[constants.FILTER_PARAM]) || this.currentFilterList
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.currentDisplay = this.$route.query[constants.DISPLAY_PARAM] || this.appStore.user.price_list_display_default_mode || this.currentDisplay
    this.getProduct()
    this.initPrices()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initPrices() {
      this.productId = this.$route.params.id
      this.priceList = []
      this.priceTotal = null
      this.pricePage = 0
      this.priceLocationList = []
      this.getPrices()
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
              this.product = { code: this.productId, price_count: this.priceTotal }
            }
          })
      }
    },
    getPrices() {
      if ((this.priceTotal != null) && (this.priceList.length >= this.priceTotal)) return
      this.loading = true
      this.pricePage += 1
      return api.getPrices(this.getPricesParams)
        .then((data) => {
          this.priceList.push(...data.items)
          this.priceTotal = data.total
          data.items.forEach((price) => {
            if (price.location) {
              utils.addObjectToArray(this.priceLocationList, price.location)
            }
          })
          this.loading = false
        })
    },
    updateFilterList(newFilterList) {
      this.currentFilterList = newFilterList
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilterList } })
      // this.initPrices() will be called in watch $route
    },
    selectPriceOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initPrices() will be called in watch $route
      }
    },
    selectPriceDisplay(displayKey) {
      this.currentDisplay = displayKey
      this.$router.push({ query: { ...this.$route.query, [constants.DISPLAY_PARAM]: this.currentDisplay } })
      // this.initPrices() will NOT be called in watch $route
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getPrices()
      }
    },
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6">
      <ProductCard v-if="!productIsCategory" :product="product" />
      <CategoryCard v-else :category="category" source="product" :priceCount="priceTotal" />
    </v-col>
  </v-row>

  <!-- Product Not Found Section -->
  <v-row v-if="productOrCategoryNotFound" class="mt-4">
    <v-col cols="12" sm="8" md="6" lg="5">
      <div class="not-found-container">
        <div class="not-found-header text-center">
          <div class="icon-wrapper mb-4">
            <v-icon icon="mdi-barcode-off" size="64" color="grey-darken-2" />
          </div>

          <h3 class="text-h5 font-weight-bold mb-2">
            {{ $t('product_not_found') }}
          </h3>

          <p class="text-body-2 text-grey mb-0">
            {{ $t('barcode_not_found', { id: productId }) }}
          </p>
        </div>

        <div v-if="productNotFound" class="options-section mt-6">
          <!-- Option 1 -->
          <div class="option-card option-off">
            <div class="option-icon">
              <v-icon icon="mdi-food-apple" size="28" color="#2e7d32" />
            </div>

            <div class="option-content">
              <div class="d-flex align-center justify-space-between mb-1">
                <h4 class="text-subtitle-1 font-weight-bold mb-0">
                  {{ $t('add_to_open_food_facts') }}
                </h4>

                <v-chip size="x-small" color="success" variant="tonal" class="recommended-chip">
                  {{ $t('recommended') }}
                </v-chip>
              </div>

              <p class="text-caption text-grey-darken-1 mb-3">
                {{ $t('add_full_product_details') }}
              </p>

              <ProductNotFoundAlert :productCode="productId" />
            </div>
          </div>

          <!-- Divider -->
          <div class="divider-or">
            <span>{{ $t('or') }}</span>
          </div>

          <!-- Option 2 -->
          <div class="option-card option-prices">
            <div class="option-icon">
              <v-icon icon="mdi-chart-line" size="28" color="#f57c00" />
            </div>

            <div class="option-content">
              <div class="d-flex align-center justify-space-between mb-1">
                <h4 class="text-subtitle-1 font-weight-bold mb-0">
                  {{ $t('create_with_open_prices') }}
                </h4>

                <v-chip size="x-small" color="orange" text-color="white" class="experiment-chip">
                  {{ $t('experiment') }}
                </v-chip>
              </div>

              <p class="text-caption text-grey-darken-1 mb-3">
                {{ $t('quick_price_tracking') }}
              </p>

              <CreateOpenFoodFactsProductPromoBanner :productCode="productId" />
            </div>
          </div>
        </div>

        <CategoryNotFoundAlert 
          v-if="categoryNotFound" 
          :categoryTag="productId" 
        />
      </div>
    </v-col>
  </v-row>

  <!-- Latest Prices Section -->
  <v-row class="mt-4">
    <v-col cols="12">
      <div class="d-flex align-center flex-wrap ga-2">
        <h2 class="text-h6 mb-0 mr-2">
          {{ $t('Common.LatestPrices') }}
        </h2>

        <template v-if="!loading">
          <LoadedCountChip :loadedCount="priceList.length" :totalCount="priceTotal" />
          <FilterMenu 
            kind="price" 
            :hideType="true" 
            :currentFilterList="currentFilterList" 
            @update:currentFilterList="updateFilterList($event)" 
          />
          <OrderMenu 
            kind="price" 
            :currentOrder="currentOrder" 
            @update:currentOrder="updateOrder($event)" 
          />
          <DisplayMenu 
            :show="['list', 'table', 'map', 'chart']" 
            :currentDisplay="currentDisplay" 
            @update:currentDisplay="updateDisplay($event)" 
          />
        </template>
      </div>
    </v-col>
  </v-row>

  <!-- Price Display Section -->
  <v-window v-model="currentDisplay" disabled>
    <v-window-item value="list">
      <v-row class="mt-0 mb-1">
        <v-col 
          v-for="price in priceList" 
          :key="price.id || price" 
          cols="12" 
          sm="6" 
          md="4" 
          xl="3"
        >
          <PriceCard 
            :price="price" 
            :product="product" 
            :hideProductImage="true" 
            :hideProductTitle="true" 
            :hideProductDetailsRow="productIsCategory ? false : true" 
            elevation="1" 
            height="100%" 
          />
        </v-col>
      </v-row>

      <v-row v-if="priceList.length === 0 && !loading" class="mt-4">
        <v-col align="center">
          <p class="text-grey">
            {{ $t('no_prices_available') }}
          </p>
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

  <!-- Loading Indicator -->
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
import openPricesApi from '../services/openPricesApi'
import constants from '../constants'
import date_utils from '../utils/date.js'
import utils from '../utils.js'

export default {
  components: {
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    CategoryCard: defineAsyncComponent(() => import('../components/CategoryCard.vue')),
    ProductNotFoundAlert: defineAsyncComponent(() => import('../components/ProductNotFoundAlert.vue')),
    CategoryNotFoundAlert: defineAsyncComponent(() => import('../components/CategoryNotFoundAlert.vue')),
    CreateOpenFoodFactsProductPromoBanner: defineAsyncComponent(() => import('../components/CreateOpenFoodFactsProductPromoBanner.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    DisplayMenu: defineAsyncComponent(() => import('../components/DisplayMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    PriceTable: defineAsyncComponent(() => import('../components/PriceTable.vue')),
    LeafletMap: defineAsyncComponent(() => import('../components/LeafletMap.vue')),
    PriceChart: defineAsyncComponent(() => import('../components/PriceChart.vue')),
  },
  data() {
    return {
      productId: this.$route.params.id,
      product: null,
      category: null,
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      priceLocationList: [],
      loading: false,
      shareLinkCopySuccessMessage: false,
      currentFilterList: [],
      currentOrder: constants.PRICE_ORDER_LIST[2].key,
      currentDisplay: constants.DISPLAY_LIST[0].key,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    productIsCategory() {
      return this.productId && this.productId.includes(':')
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
      let defaultParams = { 
        [this.productIsCategory ? 'category_tag' : 'product_code']: this.productId, 
        order_by: `${this.currentOrder}`, 
        page: this.pricePage 
      }
      if (this.currentFilterList.includes('show_last_month')) {
        defaultParams['date__gte'] = date_utils.oneMonthAgoDate()
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) {
      if (oldRoute.path === newRoute.path) {
        const oldRouteQueryFiltered = Object.fromEntries(Object.entries(oldRoute.query).filter(([key]) => key !== constants.DISPLAY_PARAM))
        const newRouteQueryFiltered = Object.fromEntries(Object.entries(newRoute.query).filter(([key]) => key !== constants.DISPLAY_PARAM))
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
    return openPricesApi.getProductByCode(this.productId)
      .then((data) => {
        if (data.id) {
          this.product = data
        } else {
          // product not found: set a minimal product to display the ProductCard
          this.product = { code: this.productId, price_count: this.priceTotal }
        }
      })
  }
},
  getPrices() {
  if ((this.priceTotal != null) && (this.priceList.length >= this.priceTotal)) return
  this.loading = true
  this.pricePage += 1
  return openPricesApi.getPrices(this.getPricesParams)
    .then((data) => {
      this.loading = false
      this.priceList.push(...data.items)
      this.priceTotal = data.total
      data.items.forEach((price) => {
        if (price.location) {
          utils.addObjectToArray(this.priceLocationList, price.location)
        }
      })
    })
    .catch((error) => {
      this.loading = false
      console.error('Error fetching prices:', error)
    })
},
    updateFilterList(newFilterList) {
      this.currentFilterList = newFilterList
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilterList } })
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
      }
    },
    updateDisplay(displayKey) {
      this.currentDisplay = displayKey
      this.$router.push({ query: { ...this.$route.query, [constants.DISPLAY_PARAM]: this.currentDisplay } })
    },
    handleScroll() {
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getPrices()
      }
    },
  }
}
</script>

<style scoped>
.not-found-container {
  padding: 8px;
}

.not-found-header {
  margin-bottom: 24px;
}

.icon-wrapper {
  background: rgba(0, 0, 0, 0.04);
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.options-section {
  position: relative;
}

.option-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.option-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.option-off {
  background: linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%);
  border: 1px solid #c8e6c9;
}

.option-prices {
  background: linear-gradient(135deg, #fff3e0 0%, #ffffff 100%);
  border: 1px solid #ffe0b2;
}

.option-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.option-content {
  flex: 1;
}

.recommended-chip {
  font-weight: bold;
  letter-spacing: 0.3px;
}

.experiment-chip {
  font-weight: bold;
  letter-spacing: 0.3px;
}

.divider-or {
  text-align: center;
  position: relative;
  margin: 16px 0;
}

.divider-or::before,
.divider-or::after {
  content: '';
  position: absolute;
  top: 50%;
  width: calc(50% - 30px);
  height: 1px;
  background: #e0e0e0;
}

.divider-or::before {
  left: 0;
}

.divider-or::after {
  right: 0;
}

.divider-or span {
  background: white;
  padding: 0 12px;
  color: #9e9e9e;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  z-index: 1;
}

/* Mobile optimization */
@media (max-width: 600px) {
  .option-card {
    flex-direction: column;
    text-align: center;
  }
  
  .option-icon {
    margin: 0 auto;
  }
  
  .option-content {
    text-align: center;
  }
  
  .recommended-chip,
  .experiment-chip {
    position: absolute;
    top: 12px;
    right: 12px;
  }
}
</style>
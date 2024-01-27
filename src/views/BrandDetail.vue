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
      <v-btn size="small" append-icon="mdi-open-in-new" :href="getBrandOFFUrl()" target="_blank">
        Open Food Facts
      </v-btn>
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
          <v-btn v-bind="props" size="small" class="mr-2" prepend-icon="mdi-filter-variant" :active="!!productFilter">{{ $t('BrandDetail.Filter') }}</v-btn>
        </template>
        <v-list>
          <v-list-item :slim="true" v-for="filter in productFilterList" :key="filter.key" :prepend-icon="(productFilter === filter.key) ? 'mdi-check-circle' : 'mdi-circle-outline'" :active="productFilter === filter.key" @click="toggleProductFilter(filter.key)">
            {{ filter.value }}
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" size="small" prepend-icon="mdi-arrow-down" :append-icon="getCurrentProductOrderIcon"  :active="!!productOrder">{{ $t('BrandDetail.Order') }}</v-btn>
        </template>
        <v-list>
          <v-list-item :slim="true" v-for="order in productOrderList" :key="order.key" :prepend-icon="order.icon" :active="productOrder === order.key" @click="selectProductOrder(order.key)">
            {{ order.value }}
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
import ProductCard from '../components/ProductCard.vue'
import ShareButton from '../components/ShareButton.vue'

export default {
  components: {
    ProductCard,
    ShareButton,
  },
  data() {
    return {
      // filter & order
      productFilter: '',
      productFilterList: constants.PRODUCT_FILTER_LIST,
      productOrder: '-unique_scans_n',
      productOrderList: constants.PRODUCT_ORDER_LIST,
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
    getBrandOFFUrl() {
      return `https://world.openfoodfacts.org/brand/${this.brand}`
    },
    toggleProductFilter(filterKey) {
      this.productFilter = this.productFilter ? '' : filterKey
      this.initBrand()
    },
    selectProductOrder(orderKey) {
      if (this.productOrder !== orderKey) {
        this.productOrder = orderKey
        this.initBrand()
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

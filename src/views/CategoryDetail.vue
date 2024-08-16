<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card
        :title="category"
        prepend-icon="mdi-list-box-outline"
      >
        <v-card-text>
          <v-chip label size="small" density="comfortable" class="mr-1">
            <v-icon start icon="mdi-food-outline" />
            {{ $t('CategoryDetail.CategoryProductTotal', { count: categoryProductTotal }) }}
          </v-chip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col cols="12">
      <OpenFoodFactsLink facet="category" :value="category" display="button" />
      <ShareLink display="button" />
    </v-col>
  </v-row>

  <br>

  <v-row>
    <v-col>
      <h2 class="text-h6 d-inline mr-2">
        {{ $t('CategoryDetail.TopProducts') }}
      </h2>
      <v-progress-circular v-if="loading" indeterminate :size="30" />
      <FilterMenu v-if="!loading" kind="product" :currentFilter="currentFilter" :hideSource="true" @update:currentFilter="toggleProductFilter($event)" />
      <OrderMenu v-if="!loading" kind="product" :currentOrder="currentOrder" @update:currentOrder="selectProductOrder($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="product in categoryProductList" :key="product" cols="12" sm="6" md="4">
      <ProductCard :product="product" :hideProductBarcode="true" elevation="1" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="categoryProductList.length < categoryProductTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getCategoryProducts">
        {{ $t('CategoryDetail.LoadMore') }}
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
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    OpenFoodFactsLink: defineAsyncComponent(() => import('../components/OpenFoodFactsLink.vue')),
    ShareLink: defineAsyncComponent(() => import('../components/ShareLink.vue'))
  },
  data() {
    return {
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
      let defaultParams = { categories_tags__contains: this.category, order_by: `${this.currentOrder}`, page: this.categoryProductPage }
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
  },
  methods: {
    initCategory() {
      this.category = this.$route.params.id
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
    }
  }
}
</script>

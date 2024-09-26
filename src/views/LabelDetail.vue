<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card :title="labelId" prepend-icon="mdi-sticker-text-outline" data-name="label-card" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.TopProducts') }}
      </h2>
      <v-progress-circular v-if="loading" indeterminate :size="30" />
      <LoadedCountChip v-if="!loading" :loadedCount="labelProductList.length" :totalCount="labelProductTotal" />
      <FilterMenu v-if="!loading" kind="product" :currentFilter="currentFilter" :hideSource="true" @update:currentFilter="toggleProductFilter($event)" />
      <OrderMenu v-if="!loading" kind="product" :currentOrder="currentOrder" @update:currentOrder="selectProductOrder($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="product in labelProductList" :key="product" cols="12" sm="6" md="4">
      <ProductCard :product="product" elevation="1" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="labelProductList.length < labelProductTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getLabelProducts">
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
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue'))
  },
  data() {
    return {
      labelId: this.$route.params.id,
      // filter & order
      currentFilter: '',
      currentOrder: constants.PRODUCT_ORDER_LIST[1].key,
      // data
      label: null,  // see init
      labelProductList: [],
      labelProductTotal: null,
      labelProductPage: 0,
      loading: false,
    }
  },
  computed: {
    getProductsParams() {
      let defaultParams = { labels_tags__contains: this.label.id, order_by: `${this.currentOrder}`, page: this.labelProductPage }
      if (this.currentFilter && this.currentFilter === 'hide_price_count_gte_1') {
        defaultParams['price_count'] = 0
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) {
      if (oldRoute && newRoute && newRoute.name == 'label-detail' && oldRoute.fullPath != newRoute.fullPath) {
        this.labelId = this.$route.params.id
        this.initLabel()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.initLabel()
  },
  methods: {
    initLabel() {
      this.label = {'id': this.labelId, 'name': this.labelId}
      this.labelProductList = []
      this.labelProductTotal = null
      this.labelProductPage = 0
      this.getLabelProducts()
    },
    getLabelProducts() {
      this.loading = true
      this.labelProductPage += 1
      return api.getProducts(this.getProductsParams)
        .then((data) => {
          this.labelProductList.push(...data.items)
          this.labelProductTotal = data.total
          this.loading = false
        })
    },
    toggleProductFilter(filterKey) {
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initLabel() will be called in watch $route
    },
    selectProductOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initLabel() will be called in watch $route
      }
    }
  }
}
</script>

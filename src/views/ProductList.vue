<template>
  <h1 class="mb-1">
    Top products
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row v-if="!loading">
    <v-col>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" size="small" class="mr-2" prepend-icon="mdi-filter-variant" :active="!!productFilter">Filter</v-btn>
        </template>
        <v-list>
          <v-list-item :slim="true" v-for="filter in productFilterList" :key="filter.key" :prepend-icon="(productFilter === filter.key) ? 'mdi-check-circle' : 'mdi-circle-outline'" :active="productFilter === filter.key" @click="toggleProductFilter(filter.key)">
            {{ filter.value }}
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" size="small" prepend-icon="mdi-arrow-down" :append-icon="getCurrentProductOrderIcon"  :active="!!productOrder">Order</v-btn>
        </template>
        <v-list>
          <v-list-item :slim="true" v-for="order in productOrderList" :key="order.key" :prepend-icon="order.icon" :active="productOrder === order.key" @click="selectProductOrder(order.key)">
            {{ order.value }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="product in productList" :key="product">
      <ProductCard :product="product" elevation="1" height="100%"></ProductCard>
    </v-col>
  </v-row>

  <v-row v-if="productList.length < productTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" @click="getProducts">Load more</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'
import ProductCard from '../components/ProductCard.vue'

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      productFilter: '',
      productFilterList: [
        {key: 'hide_price_count_gte_1', value: 'Hide products with prices'},
      ],
      productOrder: '-unique_scans_n',
      productOrderList: [
        {key: '-unique_scans_n', value: 'Number of scans', icon: 'mdi-barcode-scan'},
        {key: '-price_count', value: 'Number of prices', icon: 'mdi-tag-multiple-outline'},
      ],
      productList: [],
      productTotal: null,
      productPage: 0,
      loading: false,
    }
  },
  mounted() {
    this.initProductList()
  },
  computed: {
    getCurrentProductOrderIcon() {
      let currentProductOrder = this.productOrderList.find(o => o.key === this.productOrder)
      return currentProductOrder ? currentProductOrder.icon : ''
    },
    getProductsParams() {
      let defaultParams = { page: this.productPage, order_by: `${this.productOrder}` }
      if (this.productFilter && this.productFilter === 'hide_price_count_gte_1') {
        defaultParams['price_count'] = 0
      }
      return defaultParams
    },
  },
  methods: {
    initProductList() {
      this.productList = []
      this.productPage = 0
      this.getProducts()
    },
    getProducts() {
      this.loading = true
      this.productPage += 1
      return api.getProducts(this.getProductsParams)
        .then((data) => {
          this.productList.push(...data.items)
          this.productTotal = data.total
          this.loading = false
        })
    },
    toggleProductFilter(filterKey) {
      this.productFilter = this.productFilter ? '' : filterKey
      this.initProductList()
    },
    selectProductOrder(orderKey) {
      if (this.productOrder !== orderKey) {
        this.productOrder = orderKey
        this.initProductList()
      }
    }
  }
}
</script>

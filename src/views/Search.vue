<template>
  <h1 class="text-h5 mb-1">
    {{ $t('Search.Title') }}
    <v-progress-circular v-if="loading" indeterminate :size="30" />
  </h1>

  <v-row>
    <v-col>
      <v-form @submit.prevent="search">
        <v-text-field
          ref="searchInput"
          v-model="productSearchForm.q"
          :label="$t('Search.ProductBarcode')"
          type="number"
          inputmode="numeric"
          :rules="[fieldRequired]"
          hide-details="auto"
          :loading="loading"
          required
        >
          <template #prepend-inner>
            <v-icon :icon="formFilled ? 'mdi-barcode' : 'mdi-barcode-scan'" @click="showBarcodeScannerDialog" />
          </template>
          <template #append-inner>
            <v-icon icon="mdi-magnify" @click="search" />
          </template>
        </v-text-field>
      </v-form>
    </v-col>
  </v-row>

  <p v-if="productTotal === 0" class="text-red">
    <i>{{ $t('ProductDetail.ProductNotFound') }}</i>
  </p>

  <v-row v-if="productTotal > 0" class="mt-0">
    <v-col v-for="product in productList" :key="product" cols="12" sm="6" md="4" xl="3">
      <ProductCard :product="product" :latestPrice="product.latest_price" elevation="1" height="100%" />
    </v-col>
  </v-row>

  <BarcodeScannerDialog
    v-if="barcodeScannerDialog"
    v-model="barcodeScannerDialog"
    @barcode="setProductCode($event)"
    @close="barcodeScannerDialog = false"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import api from '../services/api'

export default {
  components: {
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    BarcodeScannerDialog: defineAsyncComponent(() => import('../components/BarcodeScannerDialog.vue'))
  },
  data() {
    return {
      productSearchForm: {
        q: ''
      },
      productList: [],
      productTotal: null,
      loading: false,
      // barcode scanner
      barcodeScannerDialog: false,
    }
  },
  computed: {
    formFilled() {
      return Object.values(this.productSearchForm).every(x => !!x)
    }
  },
  watch: {
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.getProducts()
      }
    }
  },
  mounted() {
    this.productSearchForm.q = this.$route.query[constants.QUERY_PARAM] || ''
    if (this.productSearchForm.q) {
      this.getProducts()
    }
  },
  methods: {
    fieldRequired(v) {
      return !!v
    },
    showBarcodeScannerDialog() {
      this.$refs.searchInput.blur()
      this.barcodeScannerDialog = true
    },
    setProductCode(code) {
      this.productSearchForm.q = code
      this.search()
    },
    search() {
      this.$refs.searchInput.blur()
      this.productList = []
      this.productTotal = null
      this.$router.push({ query: { ...this.$route.query, [constants.QUERY_PARAM]: this.productSearchForm.q } })
    },
    getProducts() {
      this.loading = true
      return api.getProducts({ code: this.productSearchForm.q })
        .then((data) => {
          this.productList.push(...data.items)
          this.productTotal = data.total
          this.loading = false
          if (data.items.length) {
            this.getProductLatestPrices()
          }
        })
    },
    getProductLatestPrices() {
      this.productList.forEach((product) => {
        if (product.price_count && !product.latest_price) {
          this.getPrices(product)
        }
      })
    },
    getPrices(product) {
      return api.getPrices({ product_code: product.code, size: 1, order_by: '-date' })
        .then((data) => {
          if (data.items.length) {
            product.latest_price = data.items[0]
          }
        })
    }
  }
}
</script>

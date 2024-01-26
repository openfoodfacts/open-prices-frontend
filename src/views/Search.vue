<template>
  <h1 class="text-h5 mb-1">
    {{ $t('Search.Title') }}
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row>
    <v-col>
      <v-form @submit.prevent="search">
        <v-text-field
          v-model="productSearchForm.q"
          :label="$t('Search.ProductBarcode')"
          type="number"
          :prepend-inner-icon="formFilled ? 'mdi-barcode' : 'mdi-barcode-scan'"
          append-inner-icon="mdi-magnify"
          @click:prepend-inner="showBarcodeScanner"
          @click:append-inner="search"
          :rules="[fieldRequired]"
          :loading="loading"
          required>
        </v-text-field>
      </v-form>
    </v-col>
  </v-row>

  <p v-if="productTotal === 0" class="text-red">
    <i>{{ $t('ProductDetail.ProductNotFound') }}</i>
  </p>

  <v-row v-if="productTotal > 0" class="mt-0">
    <v-col cols="12" sm="6" md="4" v-for="product in productList" :key="product">
      <ProductCard :product="product" :latestPrice="product.latest_price" elevation="1" height="100%"></ProductCard>
    </v-col>
  </v-row>

  <BarcodeScanner
    v-if="barcodeScanner"
    v-model="barcodeScanner"
    @barcode="setProductCode($event)"
    @close="barcodeScanner = false"
  ></BarcodeScanner>
</template>

<script>
import api from '../services/api'
import BarcodeScanner from '../components/BarcodeScanner.vue'
import ProductCard from '../components/ProductCard.vue'

export default {
  components: {
    BarcodeScanner,
    ProductCard,
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
      barcodeScanner: false,
    }
  },
  computed: {
    formFilled() {
      return Object.values(this.productSearchForm).every(x => !!x)
    }
  },
  methods: {
    fieldRequired(v) {
      return !!v
    },
    showBarcodeScanner() {
      this.barcodeScanner = true
    },
    setProductCode(code) {
      this.productSearchForm.q = code
      this.search()
    },
    search() {
      this.productList = []
      this.productTotal = null
      this.getProducts()
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
      this.productList.forEach((product, index) => {
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

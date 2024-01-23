<template>
  <h1 class="mb-1">
    {{ $t('Search.Title') }}
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row>
    <v-col>
      <v-form @submit.prevent="search">
        <v-text-field
          v-model="productSearchForm.q"
          :label="$t('Search.SearchByProductBarcode')"
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

  <v-row class="mt-0">
    <v-col cols="12" sm="6" md="4" v-for="product in resultList" :key="product">
      <ProductCard :product="product" elevation="1" height="100%"></ProductCard>
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
      resultList: [],
      resultTotal: null,
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
      this.getProducts()
    },
    getProducts() {
      this.loading = true
      this.productPage += 1
      return api.getProducts({ code: this.productSearchForm.q })
        .then((data) => {
          this.resultList.push(...data.items)
          this.resultTotal = data.total
          this.loading = false
        })
    },
  }
}
</script>

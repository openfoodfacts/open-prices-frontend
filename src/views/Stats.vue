<template>
  <h1 class="mb-1">
    {{ $t('Stats.Title') }} <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row>
    <v-col cols="12" md="6" lg="4">
      <v-card :title="$t('Stats.Prices')" :text="priceTotal" height="100%"></v-card>
    </v-col>
    <v-col cols="12" md="6" lg="4">
      <v-card :title="$t('Stats.ProductsWithPrices')" :subtitle="'Out of ' + productTotal + ' products'" :text="productWithPriceTotal"></v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      priceTotal: null,
      productTotal: null,
      productWithPriceTotal: null,
      loading: false,
    }
  },
  mounted() {
    this.getPrices()
    this.getProducts()
    this.getProductsWithPrice()
  },
  methods: {
    getPrices() {
      this.loading = true
      return api.getPrices({ size: 1 })
        .then((data) => {
          this.priceTotal = data.total
          this.loading = false
        })
    },
    getProducts() {
      this.loading = true
      return api.getProducts({ size: 1 })
        .then((data) => {
          this.productTotal = data.total
          this.loading = false
        })
    },
    getProductsWithPrice() {
      this.loading = true
      return api.getProducts({ size: 1, price_count__gte: 1 })
        .then((data) => {
          this.productWithPriceTotal = data.total
          this.loading = false
        })
    }
  }
}
</script>

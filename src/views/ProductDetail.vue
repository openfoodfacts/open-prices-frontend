<template>
  <v-row>
    <v-col cols="12" sm="6">
      <PriceCard v-if="product" :product="product" :readonly="true" elevation="1"></PriceCard>
    </v-col>
  </v-row>

  <v-row class="mt-0" v-if="product">
    <v-col cols="12" sm="6">
      <v-btn v-if="product.code && product.source" size="small" append-icon="mdi-open-in-new" :href="getProductOFFUrl(product)" target="_blank">
        Open Food Facts
      </v-btn>
      <p v-if="!product.code || !product.source" class="text-red">
        <i>Product not found in Open Food Facts... Don't hesitate to add it :)</i>
      </p>
    </v-col>
  </v-row>

  <br />

  <h2 class="mb-1">
    Latest prices
    <small>{{ productPriceCount }}</small>
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="price in productPriceList" :key="price">
      <PriceCard :price="price" :product="product" :hideProductImage="true" :hideProductInfo="true" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'
import PriceCard from '../components/PriceCard.vue'

export default {
  components: {
    PriceCard,
  },
  data() {
    return {
      product: null,
      productPriceList: [],
      productPriceCount: null,
      loading: false,
    }
  },
  mounted() {
    this.getProduct(),
    this.getProductPrices()
  },
  methods: {
    getProduct() {
      this.loading = true
      return api.getProductById(this.$route.params.id)
        .then((data) => {
          if (data.id) {
            this.product = data
            this.loading = false
          }
        })
    },
    getProductPrices() {
      this.loading = true
      return api.getPrices({ product_id: this.$route.params.id, order_by: '-created' })
        .then((data) => {
          this.productPriceList = data.items
          this.productPriceCount = data.total
          this.loading = false
        })
    },
    getProductOFFUrl(product) {
      return `https://world.openfoodfacts.org/product/${product.code}`
    }
  }
}
</script>

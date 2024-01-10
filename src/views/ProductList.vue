<template>
  <h1 class="mb-1">
    Top products
    <span class="text-caption">by popularity</span>
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="product in productList" :key="product">
      <PriceCard :product="product" elevation="1" height="100%"></PriceCard>
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
import PriceCard from '../components/PriceCard.vue'

export default {
  components: {
    PriceCard,
  },
  data() {
    return {
      productList: [],
      productTotal: null,
      productPage: 0,
      loading: false,
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      this.loading = true
      this.productPage += 1
      return api.getProducts({ page: this.productPage, order_by: '-unique_scans_n' })
        .then((data) => {
          this.productList.push(...data.items)
          this.productTotal = data.total
          this.loading = false
        })
    }
  }
}
</script>

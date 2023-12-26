<template>
  <h1 class="mb-1">
    Latest prices
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="price in prices" :key="price">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%"></PriceCard>
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
      prices: [],
      loading: false,
    }
  },
  mounted() {
    this.getPrices()
  },
  methods: {
    getPrices() {
      this.loading = true
      return api.getPrices({ order_by: '-created' })
        .then((data) => {
          this.prices = data.items
          this.loading = false
        })
    }
  }
}
</script>

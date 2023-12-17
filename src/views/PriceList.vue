<template>
  <h1 class="mb-1">Last prices</h1>

  <div class="d-flex flex-wrap ga-3">
    <v-card v-for="p in prices" :key="p" elevation="1">
      <v-card-title>{{ p.product_code }}</v-card-title>
      <v-card-subtitle>{{ p.date }}</v-card-subtitle>
      <v-card-text>{{ p.price }} {{ p.currency }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      prices: []
    }
  },
  mounted() {
    this.getPrices()
  },
  methods: {
    getPrices() {
      return api.getPrices()
        .then((data) => {
          this.prices = data.items
        })
    }
  }
}
</script>

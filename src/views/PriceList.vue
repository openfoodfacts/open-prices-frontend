<template>
  <h1 class="mb-1">Last prices</h1>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="price in prices" :key="price">
      <PriceCard :price="price" elevation="1" height="100%"></PriceCard>
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
    }
  },
  mounted() {
    this.getPrices()
  },
  methods: {
    getPrices() {
      return api.getPrices({ order_by: '-date' })
        .then((data) => {
          this.prices = data.items
        })
    }
  }
}
</script>

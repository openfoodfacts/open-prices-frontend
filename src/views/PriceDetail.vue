<template>
  <v-row>
    <v-col cols="12" sm="6">
      <PriceCard v-if="price" :price="price" :product="price.product" />
    </v-col>
  </v-row>
  <v-row v-if="price">
    <v-col cols="12" sm="6">
      <HistoryCard :price="price" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'

export default {
  components: {
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    HistoryCard: defineAsyncComponent(() => import('../components/HistoryCard.vue')),
  },
  data() {
    return {
      priceId: this.$route.params.id,
      price: null,
      loading: false,
    }
  },
  mounted() {
    this.getPrice()
  },
  methods: {
    getPrice() {
      this.loading = true
      return api.getPriceById(this.priceId)
        .then((data) => {
          this.price = data
          this.loading = false
        })
    },
  }
}
</script>

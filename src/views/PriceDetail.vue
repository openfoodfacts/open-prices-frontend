<template>
  <v-row>
    <v-col cols="12" sm="6">
      <PriceCard v-if="price" :price="price" :product="price.product" />
      <p v-if="!loading && !price" class="text-red">
        {{ $t('Common.PriceNotFound') }}
      </p>
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
import api from '../services/OpenPrices'

export default {
  components: {
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    HistoryCard: defineAsyncComponent(() => import('../components/HistoryCard.vue')),
  },
  data() {
    return {
      priceId: this.$route.params.id,
      // data
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
          if (data.id) {
            this.price = data
          }
          this.loading = false
        })
    },
  }
}
</script>

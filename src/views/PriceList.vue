<template>
  <h1 class="mb-1">
    {{ $t('PriceList.Title') }} <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="price in priceList" :key="price">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>

  <v-row v-if="priceList.length < priceTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getPrices">{{ $t('PriceList.LoadMore') }}</v-btn>
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
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      loading: false,
    }
  },
  mounted() {
    this.getPrices()
  },
  methods: {
    getPrices() {
      this.loading = true
      this.pricePage += 1
      return api.getPrices({ page: this.pricePage })
        .then((data) => {
          this.priceList.push(...data.items)
          this.priceTotal = data.total
          this.loading = false
        })
    }
  }
}
</script>

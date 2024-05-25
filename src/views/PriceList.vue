<template>
  <h1 class="text-h5 mb-1">
    {{ $t('PriceList.Title') }}
    <v-progress-circular v-if="loading" indeterminate :size="30" />
  </h1>

  <v-row>
    <v-col v-for="price in priceList" :key="price" cols="12" sm="6" md="4">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="priceList.length < priceTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getPrices">
        {{ $t('PriceList.LoadMore') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'

export default {
  components: {
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
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

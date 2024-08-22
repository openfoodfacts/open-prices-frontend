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
        {{ $t('Common.LoadMore') }}
      </v-btn>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="signinSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('Common.SignedIn') }}
  </v-snackbar>
  <v-snackbar
    v-model="singleSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('Common.PriceCreated') }}
  </v-snackbar>
  <v-snackbar
    v-model="multipleSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('Common.Thanks') }}
  </v-snackbar>
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
      // success messages
      signinSuccessMessage: false,
      singleSuccessMessage: false,
      multipleSuccessMessage: false,
    }
  },
  mounted() {
    this.getPrices()
    if (this.$route.query.signinSuccess === 'true') {
      this.signinSuccessMessage = true
    }
    if (this.$route.query.singleSuccess === 'true') {
      this.singleSuccessMessage = true
    }
    if (this.$route.query.multipleSuccess === 'true') {
      this.multipleSuccessMessage = true
    }
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

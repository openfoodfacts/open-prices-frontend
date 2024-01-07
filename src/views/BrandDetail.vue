<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card
        :title="brand"
        prepend-icon="mdi-database-outline">
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col cols="12" sm="6">
      <v-btn size="small" append-icon="mdi-open-in-new" :href="getBrandOFFUrl()" target="_blank">
        Open Food Facts
      </v-btn>
    </v-col>
  </v-row>

  <br />

  <h2 class="mb-1">
    Top products
    <small>{{ brandProductTotal }}</small>
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="product in brandProductList" :key="product">
      <PriceCard :product="product" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>

  <v-row v-if="brandProductList.length < brandProductTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" @click="getBrandProducts">Load more</v-btn>
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
      brand: null,  // see init
      brandProductList: [],
      brandProductTotal: null,
      brandProductPage: 0,
      loading: false,
    }
  },
  mounted() {
    this.initBrand()
  },
  methods: {
    initBrand() {
      this.brand = this.$route.params.id
      this.brandProductPage = 0
      this.getBrandProducts()
    },
    getBrandProducts() {
      this.loading = true
      this.brandProductPage += 1
      return api.getProducts({ brands__like: this.brand, unique_scans_n__gte: 1, order_by: '-unique_scans_n', page: this.brandProductPage })
        .then((data) => {
          this.brandProductList.push(...data.items)
          this.brandProductTotal = data.total
          this.loading = false
        })
    },
    getBrandOFFUrl() {
      return `https://world.openfoodfacts.org/brand/${this.brand}`
    }
  },
  watch: {
    $route (newBrand, oldBrand) {
      if (oldBrand && newBrand && newBrand.name == 'brand-detail' && oldBrand.fullPath != newBrand.fullPath) {
        this.initBrand()
      }
    }
  }
}
</script>

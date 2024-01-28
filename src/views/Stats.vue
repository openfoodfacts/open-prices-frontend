<template>
  <h1 class="text-h5 mb-1">
    {{ $t('Stats.Title') }}
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row>
    <v-col cols="12" md="6" lg="4">
      <v-card :title="$t('Stats.Prices')" height="100%">
        <v-card-text>
          <p>
            {{ $t('Stats.Total') }} <strong>{{ priceTotal }}</strong>
          </p>
          <p>
            {{ $t('Stats.WithProduct') }} <v-chip label size="small" density="comfortable" class="mr-1">barcode</v-chip>
            <strong>{{ priceWithProduct }}</strong>
          </p>
          <p>
            {{ $t('Stats.WithoutProduct') }} <v-chip label size="small" density="comfortable" class="mr-1">category</v-chip>
            <strong>{{ priceWithoutProduct }}</strong>
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <v-card :title="$t('Stats.Products')" height="100%">
        <v-card-text>
          <p>
            {{ $t('Stats.Total') }} <strong>{{ productTotal }}</strong>
          </p>
          <p>
            {{ $t('Stats.WithPrice') }} <strong>{{ productWithPriceTotal }}</strong>
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <v-card :title="$t('Stats.Locations')" height="100%">
        <v-card-text>
          <p>
            {{ $t('Stats.Total') }} <strong>{{ locationTotal }}</strong>
          </p>
          <p>
            {{ $t('Stats.WithPrice') }} <strong>{{ locationWithPriceTotal }}</strong>
          </p>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" lg="4">
      <v-card :title="$t('Stats.Users')" height="100%">
        <v-card-text>
          <p>
            {{ $t('Stats.Total') }} <strong>{{ userTotal }}</strong>
          </p>
          <p>
            {{ $t('Stats.WithPrice') }} <strong>{{ userWithPriceTotal }}</strong>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      priceTotal: null,
      // priceWithProduct: null,
      priceWithoutProduct: null,
      productTotal: null,
      productWithPriceTotal: null,
      locationTotal: null,
      locationWithPriceTotal: null,  // same
      userTotal: null,
      userWithPriceTotal: null,
      loading: false,
    }
  },
  computed: {
    priceWithProduct() {
      return this.priceTotal - this.priceWithoutProduct
    }
  },
  mounted() {
    this.getPrices()
    this.getPricesWithProduct()
    this.getProducts()
    this.getProductsWithPrice()
    this.getLocations()
    this.getLocationsWithPrice()
    this.getUsers()
    this.getUsersWithPrice()
  },
  methods: {
    getPrices() {
      this.loading = true
      return api.getPrices({ size: 1 })
        .then((data) => {
          this.priceTotal = data.total
          this.loading = false
        })
    },
    getPricesWithProduct() {
      this.loading = true
      return api.getPrices({ product_id__isnull: true, size: 1 })
        .then((data) => {
          this.priceWithoutProduct = data.total
          this.loading = false
        })
    },
    getProducts() {
      this.loading = true
      return api.getProducts({ size: 1 })
        .then((data) => {
          this.productTotal = data.total
          this.loading = false
        })
    },
    getProductsWithPrice() {
      this.loading = true
      return api.getProducts({ price_count__gte: 1, size: 1 })
        .then((data) => {
          this.productWithPriceTotal = data.total
          this.loading = false
        })
    },
    getLocations() {
      this.loading = true
      return api.getLocations({ size: 1 })
        .then((data) => {
          this.locationTotal = data.total
          this.loading = false
        })
    },
    getLocationsWithPrice() {
      this.loading = true
      return api.getLocations({ price_count__gte: 1,size: 1 })
        .then((data) => {
          this.locationWithPriceTotal = data.total
          this.loading = false
        })
    },
    getUsers() {
      this.loading = true
      return api.getUsers({ size: 1 })
        .then((data) => {
          this.userTotal = data.total
          this.loading = false
        })
    },
    getUsersWithPrice() {
      this.loading = true
      return api.getUsers({ price_count__gte: 1, size: 1 })
        .then((data) => {
          this.userWithPriceTotal = data.total
          this.loading = false
        })
    }
  }
}
</script>

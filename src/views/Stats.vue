<template>
  <h1 class="mb-1">
    Stats
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row>
    <v-col cols="12" md="6" lg="4">
      <v-card title="Price count" :text="priceTotal"></v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      priceTotal: null,
      loading: false,
    }
  },
  mounted() {
    this.getPrices()
  },
  methods: {
    getPrices() {
      this.loading = true
      return api.getPrices({ size: 1 })
        .then((data) => {
          this.priceTotal = data.total
          this.loading = false
        })
    }
  }
}
</script>

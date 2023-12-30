<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card :title="username" prepend-icon="mdi-account"></v-card>
    </v-col>
  </v-row>

  <br />

  <h2 class="mb-1">
    Latest prices
    <small>{{ userPriceCount }}</small>
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="price in userPriceList" :key="price">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import PriceCard from '../components/PriceCard.vue'

export default {
  components: {
    PriceCard,
  },
  data() {
    return {
      userPriceList: [],
      userPriceCount: null,
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.$route.params.username
    },
  },
  mounted() {
    this.getUserPrices()
  },
  methods: {
    getUserPrices() {
      this.loading = true
      return api.getPrices({ owner: this.username })
        .then((data) => {
          this.userPriceList = data.items
          this.userPriceCount = data.total
          this.loading = false
        })
    },
  }
}
</script>

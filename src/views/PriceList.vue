<template>
  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-tag-outline">
        {{ $t('Common.PriceCount', { count: priceTotal }) }}
      </v-chip>
      <LoadedCountChip :loadedCount="priceList.length" :totalCount="priceTotal" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="price in priceList" :key="price" cols="12" sm="6" md="4" xl="3">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'
import utils from '../utils.js'


export default {
  components: {
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  data() {
    return {
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      loading: false,
      // scroll
      handleDebouncedScroll: null,
    }
  },
  mounted() {
    this.getPrices()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    getPrices() {
      if (this.priceTotal && (this.priceList.length >= this.priceTotal)) return
      this.loading = true
      this.pricePage += 1
      return api.getPrices({ page: this.pricePage })
        .then((data) => {
          this.priceList.push(...data.items)
          this.priceTotal = data.total
          this.loading = false
        })
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getPrices()
      }
    },
  }
}
</script>

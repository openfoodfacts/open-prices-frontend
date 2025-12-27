<template>
  <v-row>
    <v-col cols="12" sm="6">
      <ProofCard v-if="proof" :proof="proof" :hideProofHeader="true" :readonly="true" />
      <p v-if="!loading && !proof" class="text-red">
        {{ $t('Common.ProofNotFound') }}
      </p>
    </v-col>
  </v-row>

  <v-row v-if="proof">
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.Prices') }}
      </h2>
      <template v-if="!loading">
        <LoadedCountChip :loadedCount="priceList.length" :totalCount="priceTotal" />
        <DisplayMenu :show="['list', 'table']" :currentDisplay="currentDisplay" @update:currentDisplay="updateDisplay($event)" />
      </template>
    </v-col>
  </v-row>

  <v-window v-model="currentDisplay" disabled>
    <v-window-item value="list">
      <v-row class="mt-0 mb-1">
        <v-col v-for="price in priceList" :key="price" cols="12" sm="6" md="4" xl="3">
          <PriceCard :price="price" :product="price.product" :hidePriceProof="true" elevation="1" height="100%" />
        </v-col>
      </v-row>
    </v-window-item>
    <v-window-item value="table">
      <PriceTable class="mt-3 mb-3" :priceList="priceList" source="proof" :proof="proof" />
    </v-window-item>
  </v-window>

  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
    </v-col>
  </v-row>

  <v-row v-if="proof">
    <v-col cols="12" sm="6">
      <HistoryCard :price="proof" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    DisplayMenu: defineAsyncComponent(() => import('../components/DisplayMenu.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    PriceTable: defineAsyncComponent(() => import('../components/PriceTable.vue')),
    HistoryCard: defineAsyncComponent(() => import('../components/HistoryCard.vue')),
  },
  data() {
    return {
      proofId: this.$route.params.id,
      // data
      proof: null,
      priceList: [],
      priceTotal: null,
      pricePage: 0,
      loading: false,
      // display
      currentDisplay: constants.DISPLAY_LIST[0].key,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    getPricesParams() {
      let defaultParams = { proof_id: this.proofId, page: this.pricePage }
      return defaultParams
    }
  },
  watch: {
    $route (newRoute, oldRoute) {
      // only called when query changes to avoid having an API call when the path changes
      // but ignore 'display' changes
      if (oldRoute.path === newRoute.path) {
        const oldRouteQueryFiltered = Object.fromEntries(Object.entries(oldRoute.query).filter(([key, value]) => key !== constants.DISPLAY_PARAM))  // eslint-disable-line no-unused-vars
        const newRouteQueryFiltered = Object.fromEntries(Object.entries(newRoute.query).filter(([key, value]) => key !== constants.DISPLAY_PARAM))  // eslint-disable-line no-unused-vars
        if (JSON.stringify(oldRouteQueryFiltered) !== JSON.stringify(newRouteQueryFiltered)) {
          this.initPrices()
        }
      }
    }
  },
  mounted() {
    this.currentDisplay = this.$route.query[constants.DISPLAY_PARAM] || this.appStore.user.price_list_display_default_mode || this.currentDisplay
    this.getProof()
    this.getPrices()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initPrices() {
      this.proofId = this.$route.params.id
      this.priceList = []
      this.priceTotal = null
      this.pricePage = 0
      this.getPrices()
    },
    getProof() {
      return api.getProofById(this.proofId)
        .then((data) => {
          if (data.id) {
            this.proof = data
          }
        })
    },
    getPrices() {
      if ((this.priceTotal != null) && (this.priceList.length >= this.priceTotal)) return
      this.loading = true
      this.pricePage += 1
      return api.getPrices(this.getPricesParams)
        .then((data) => {
          this.priceList.push(...data.items)
          this.priceTotal = data.total
          this.loading = false
        })
    },
    updateDisplay(displayKey) {
      this.currentDisplay = displayKey
      this.$router.push({ query: { ...this.$route.query, [constants.DISPLAY_PARAM]: this.currentDisplay } })
      // this.initPrices() will NOT be called in watch $route
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getPrices()
      }
    },
  }
}
</script>

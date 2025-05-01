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
      <LoadedCountChip v-if="!loading" :loadedCount="priceList.length" :totalCount="priceTotal" />
    </v-col>
  </v-row>

  <v-row v-if="proof">
    <v-col v-for="price in priceList" :key="price" cols="12" sm="6" md="4" xl="3">
      <PriceCard :price="price" :product="price.product" :hidePriceProof="true" elevation="1" height="100%" />
    </v-col>
  </v-row>

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
import api from '../services/api'
import utils from '../utils.js'

export default {
  components: {
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
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
    }
  },
  computed: {
    getPricesParams() {
      let defaultParams = { proof_id: this.proofId, page: this.pricePage }
      return defaultParams
    }
  },
  mounted() {
    this.getProof()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    getProof() {
      return api.getProofById(this.proofId)
        .then((data) => {
          if (data.id) {
            this.proof = data
            this.getPrices()
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
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getPrices()
      }
    },
  }
}
</script>

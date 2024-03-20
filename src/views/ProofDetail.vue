<template>
  <v-row>
    <v-col cols="12" sm="6">
      <ProofCard v-if="proof" :proof="proof" :hideProofHeader="true" :readonly="true"></ProofCard>
      <p v-if="!loading && !proof" class="text-red">{{ $t('ProofDetail.ProofNotFound') }}</p>
    </v-col>
  </v-row>

  <br />

  <h2 class="text-h6 mb-1" v-if="proof">
    {{ $t('ProofDetail.Prices') }}
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>

  <v-row v-if="proof">
    <v-col cols="12" sm="6" md="4" v-for="price in proofPriceList" :key="price">
      <PriceCard :price="price" :product="price.product" :hidePriceProof="true" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>

  <v-row v-if="proof && (proofPriceList.length < proofPriceTotal)" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getProofPrices">{{ $t('ProofDetail.LoadMore') }}</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'ProofCard': defineAsyncComponent(() => import('../components/ProofCard.vue')),
    'PriceCard': defineAsyncComponent(() => import('../components/PriceCard.vue')),
  },
  data() {
    return {
      proofId: this.$route.params.id,
      proof: null,
      proofPriceList: [],
      proofPriceTotal: null,
      proofPricePage: 0,
      loading: false,
    }
  },
  mounted() {
    this.getProof()
  },
  methods: {
    getProof() {
      return api.getProofById(this.proofId)
        .then((data) => {
          if (data.id) {
            this.proof = data
            this.getProofPrices()
          }
        })
    },
    getProofPrices() {
      this.loading = true
      this.proofPricePage += 1
      return api.getPrices({ proof_id: this.proofId, page: this.proofPricePage })
        .then((data) => {
          this.proofPriceList.push(...data.items)
          this.proofPriceTotal = data.total
          this.loading = false
        })
    },
  }
}
</script>

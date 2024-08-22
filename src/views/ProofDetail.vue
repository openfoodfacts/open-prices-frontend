<template>
  <v-row>
    <v-col cols="12" sm="6">
      <ProofCard v-if="proof" :proof="proof" :hideProofHeader="true" :readonly="true" />
      <p v-if="!loading && !proof" class="text-red">
        {{ $t('ProofDetail.ProofNotFound') }}
      </p>
    </v-col>
  </v-row>

  <v-row v-if="proof">
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.Prices') }}
      </h2>
      <v-progress-circular v-if="loading" indeterminate :size="30" />
      <LoadedCountChip v-if="!loading" :loadedCount="proofPriceList.length" :totalCount="proofPriceTotal" />
    </v-col>
  </v-row>

  <v-row v-if="proof">
    <v-col v-for="price in proofPriceList" :key="price" cols="12" sm="6" md="4">
      <PriceCard :price="price" :product="price.product" :hidePriceProof="true" elevation="1" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="proof && (proofPriceList.length < proofPriceTotal)" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getProofPrices">
        {{ $t('Common.LoadMore') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'

export default {
  components: {
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
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

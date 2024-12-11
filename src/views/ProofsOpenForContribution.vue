<template>
  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-database-outline">
        {{ $t('Common.ProofCount', { count: proofTotal }) }}
      </v-chip>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="proof in proofList" :key="proof" cols="12" sm="6" md="4" xl="3">
      <ProofCard :proof="proof" :hideProofHeader="true" :hideProofActions="true" :readonly="true" elevation="1" height="100%" />
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
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
  },
  data() {
    return {
      // data
      proofList: [],
      proofTotal: null,
      proofPage: 0,
      loading: false,
      // filter & order
      currentOrder: constants.PROOF_ORDER_LIST[2].key,  // -created
    }
  },
  computed: {
    getProofsParams() {
      let defaultParams = { type: constants.PROOF_TYPE_PRICE_TAG, price_count: 0, location_id__isnull: false, order_by: this.currentOrder, page: this.proofPage }
      return defaultParams
    },
  },
  mounted() {
    this.initProofList()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initProofList() {
      this.proofList = []
      this.proofTotal = null
      this.proofPage = 0
      this.getProofs()
    },
    getProofs() {
      if (this.proofTotal && (this.proofList.length >= this.proofTotal)) return
      this.loading = true
      this.proofPage += 1
      return api.getProofs(this.getProofsParams)
        .then((data) => {
          this.proofList.push(...data.items)
          this.proofTotal = data.total
          this.loading = false
        })
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getProofs()
      }
    },
  }
}
</script>

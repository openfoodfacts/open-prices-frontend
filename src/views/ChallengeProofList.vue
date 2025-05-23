<template>
  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-image">
        {{ $t('Common.ProofCount', { count: proofTotal }) }}
      </v-chip>
      <LoadedCountChip :loadedCount="proofList.length" :totalCount="proofTotal" />
      <FilterMenu v-if="proofList.length" kind="proof" :currentFilter="currentFilter" :currentType="currentType" @update:currentFilter="toggleProofFilter($event)" @update:currentType="toggleProofType($event)" />
      <OrderMenu v-if="proofList.length" kind="proof" :currentOrder="currentOrder" @update:currentOrder="selectProofOrder($event)" />
    </v-col>
  </v-row>

  <v-row>
    <v-col v-for="proof in proofList" :key="proof" cols="12" sm="6" md="4" xl="3">
      <ProofCard :proof="proof" :hideProofHeader="true" :showImageThumb="true" height="100%" @proofUpdated="handleProofUpdated" />
    </v-col>
  </v-row>

  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
    </v-col>
  </v-row>

  <v-snackbar
    v-model="proofUpdated"
    color="success"
    :timeout="2000"
  >
    {{ $t('UserDashboard.ProofUpdated') }}
  </v-snackbar>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
  },
  data() {
    return {
      challengeId: this.$route.params.id,
      // data
      proofList: [],
      proofTotal: null,
      proofPage: 0,
      loading: false,
      proofUpdated: false,
      // filter & order
      currentFilter: '',
      currentType: '',
      currentOrder: constants.PROOF_ORDER_LIST[2].key,
    }
  },
  computed: {
    getProofsParams() {
      let defaultParams = { tags__contains: `challenge-${this.challengeId}`, order_by: this.currentOrder, page: this.proofPage }
      if (this.currentFilter && this.currentFilter === 'hide_price_count_gte_1') {
        defaultParams['price_count'] = 0
      }
      if (this.currentType) {
        defaultParams[constants.TYPE_PARAM] = this.currentType
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initProofList()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.currentType = this.$route.query[constants.TYPE_PARAM] || this.currentType
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
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
      if ((this.proofTotal != null) && (this.proofList.length >= this.proofTotal)) return
      this.loading = true
      this.proofPage += 1
      return api.getProofs(this.getProofsParams)
        .then((data) => {
          this.proofList.push(...data.items)
          this.proofTotal = data.total
          this.loading = false
        })
    },
    handleProofUpdated() {
      this.proofUpdated = true
    },
    toggleProofFilter(filterKey) {
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initProofList() will be called in watch $route
    },
    toggleProofType(sourceKey) {
      this.currentType = (this.currentType !== sourceKey) ? sourceKey : ''
      this.$router.push({ query: { ...this.$route.query, [constants.TYPE_PARAM]: this.currentType } })
      // this.initProofList() will be called in watch $route
    },
    selectProofOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initProofList() will be called in watch $route
      }
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getProofs()
      }
    },
  }
}
</script>

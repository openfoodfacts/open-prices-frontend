<template>
  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-image">
        {{ $t('UserDashboard.UserProofTotal', { count: userProofTotal }) }}
      </v-chip>
      <LoadedCountChip :loadedCount="userProofList.length" :totalCount="userProofTotal" />
      <FilterMenu kind="proof" :currentFilter="currentFilter" :currentType="currentType" @update:currentFilter="toggleProofFilter($event)" @update:currentType="toggleProofType($event)" />
      <OrderMenu kind="proof" :currentOrder="currentOrder" @update:currentOrder="selectProofOrder($event)" />
    </v-col>
  </v-row>

  <v-row>
    <v-col v-for="proof in userProofList" :key="proof" cols="12" sm="6" md="4" xl="3">
      <ProofCard :proof="proof" :hideProofHeader="true" height="100%" @proofUpdated="handleProofUpdated" />
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
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
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
      // data
      userProofList: [],
      userProofTotal: null,
      userProofPage: 0,
      loading: false,
      proofUpdated: false,
      // filter & order
      currentFilter: '',
      currentType: '',
      currentOrder: constants.PROOF_ORDER_LIST[2].key,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    getUserProofsParams() {
      let defaultParams = { owner: this.username, order_by: `${this.currentOrder}`, page: this.userProofPage }
      if (this.currentFilter && this.currentFilter === 'hide_price_count_gte_1') {
        defaultParams['price_count'] = 0
      }
      if (this.currentType) {
        defaultParams['type'] = this.currentType
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initUserProofs()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.currentType = this.$route.query[constants.TYPE_PARAM] || this.currentType
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.initUserProofs()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initUserProofs() {
      this.userProofList = []
      this.userProofTotal = null
      this.userProofPage = 0
      this.getUserProofs()
    },
    getUserProofs() {
      if (this.userProofTotal && (this.userProofList.length >= this.userProofTotal)) return
      this.loading = true
      this.userProofPage += 1
      return api.getProofs(this.getUserProofsParams)
        .then((data) => {
          this.userProofList.push(...data.items)
          this.userProofTotal = data.total
          this.loading = false
        })
    },
    handleProofUpdated() {
      this.proofUpdated = true
    },
    toggleProofFilter(filterKey) {
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initUserProofs() will be called in watch $route
    },
    toggleProofType(sourceKey) {
      this.currentType = (this.currentType !== sourceKey) ? sourceKey : ''
      this.$router.push({ query: { ...this.$route.query, [constants.TYPE_PARAM]: this.currentType } })
      // this.initProductList() will be called in watch $route
    },
    selectProofOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initUserProofs() will be called in watch $route
      }
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getUserProofs()
      }
    },
  }
}
</script>

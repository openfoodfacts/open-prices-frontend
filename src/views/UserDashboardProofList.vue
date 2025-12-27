<template>
  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-image">
        {{ $t('Common.ProofCount', { count: proofTotal }) }}
      </v-chip>
      <LoadedCountChip :loadedCount="proofList.length" :totalCount="proofTotal" />
      <FilterMenu v-if="proofList.length" kind="proof" :currentFilterList="currentFilterList" :currentType="currentType" :currentKind="currentKind" :showKind="true" @update:currentFilterList="updateFilterList($event)" @update:currentType="toggleProofType($event)" @update:currentKind="toggleProofKind($event)" />
      <OrderMenu v-if="proofList.length" kind="proof" :currentOrder="currentOrder" @update:currentOrder="updateOrder($event)" />
      <DisplayMenu :show="['list', 'table', 'map']" :currentDisplay="currentDisplay" @update:currentDisplay="selectProofDisplay($event)" />
    </v-col>
  </v-row>

  <v-window v-model="currentDisplay" disabled>
    <v-window-item value="list">
      <v-row class="mt-0 mb-1">
        <v-col v-for="proof in proofList" :key="proof" cols="12" sm="6" md="4" xl="3">
          <ProofCard :proof="proof" :hideProofHeader="true" :showImageThumb="true" height="100%" @proofUpdated="handleProofUpdated" />
        </v-col>
      </v-row>
    </v-window-item>
    <v-window-item value="table">
      <ProofTable class="mt-3 mb-3" :proofList="proofList" />
    </v-window-item>
    <v-window-item value="map">
      <v-row class="mt-0 mb-1">
        <v-col style="height:400px">
          <LeafletMap :locations="proofLocationList" />
        </v-col>
      </v-row>
    </v-window-item>
  </v-window>

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
    DisplayMenu: defineAsyncComponent(() => import('../components/DisplayMenu.vue')),
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
    ProofTable: defineAsyncComponent(() => import('../components/ProofTable.vue')),
    LeafletMap: defineAsyncComponent(() => import('../components/LeafletMap.vue')),
  },
  data() {
    return {
      // data
      proofList: [],
      proofTotal: null,
      proofPage: 0,
      proofLocationList: [],
      loading: false,
      proofUpdated: false,
      // filter, order & display
      currentFilterList: [],
      currentType: '',
      currentKind: '',
      currentOrder: constants.PROOF_ORDER_LIST[2].key,  // date
      currentDisplay: constants.DISPLAY_LIST[0].key,  // list
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    getProofsParams() {
      let defaultParams = { owner: this.username, order_by: this.currentOrder, page: this.proofPage }
      if (this.currentFilterList.includes('hide_price_count_gte_1')) {
        defaultParams['price_count'] = 0
      }
      if (this.currentType) {
        defaultParams[constants.TYPE_PARAM] = this.currentType
      }
      if (this.currentKind) {
        defaultParams[constants.KIND_PARAM] = this.currentKind
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
    this.currentFilterList = utils.toArray(this.$route.query[constants.FILTER_PARAM]) || this.currentFilterList
    this.currentType = this.$route.query[constants.TYPE_PARAM] || this.currentType
    this.currentKind = this.$route.query[constants.KIND_PARAM] || this.currentKind
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.currentDisplay = this.$route.query[constants.DISPLAY_PARAM] || this.appStore.user.price_list_display_default_mode || this.currentDisplay
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
      this.proofLocationList = []
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
          data.items.forEach((proof) => {
            if (proof.location) {
              utils.addObjectToArray(this.proofLocationList, proof.location)
            }
          })
          this.loading = false
        })
    },
    handleProofUpdated() {
      this.proofUpdated = true
    },
    updateFilterList(newFilterList) {
      this.currentFilterList = newFilterList
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilterList } })
      // this.initProofList() will be called in watch $route
    },
    toggleProofType(sourceKey) {
      this.currentType = (this.currentType !== sourceKey) ? sourceKey : ''
      this.$router.push({ query: { ...this.$route.query, [constants.TYPE_PARAM]: this.currentType } })
      // this.initProofList() will be called in watch $route
    },
    toggleProofKind(kindKey) {
      this.currentKind = (this.currentKind !== kindKey) ? kindKey : ''
      this.$router.push({ query: { ...this.$route.query, [constants.KIND_PARAM]: this.currentKind } })
      // this.initProofList() will be called in watch $route
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initProofList() will be called in watch $route
      }
    },
    selectProofDisplay(displayKey) {
      this.currentDisplay = displayKey
      this.$router.push({ query: { ...this.$route.query, [constants.DISPLAY_PARAM]: this.currentDisplay } })
      // this.initProofList() will NOT be called in watch $route
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getProofs()
      }
    },
  }
}
</script>

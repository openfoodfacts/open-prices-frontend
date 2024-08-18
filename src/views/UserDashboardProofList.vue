<template>
  <h1 class="text-h5 mb-1">
    {{ $t('UserDashboard.MyProofs') }}
  </h1>

  <v-row>
    <v-col>
      <v-chip class="mr-2" label variant="text" prepend-icon="mdi-image">
        {{ $t('UserDashboard.UserProofTotal', { count: appStore.getUserProofTotal }) }}
      </v-chip>
      <v-btn size="small" prepend-icon="mdi-arrow-left" to="/dashboard">
        {{ $t('UserDashboard.Title') }}
      </v-btn>
    </v-col>
  </v-row>

  <br>

  <h2 class="text-h6 mb-1">
    {{ $t('UserDashboard.LatestProofs') }}
    <v-progress-circular v-if="loading" indeterminate :size="30" />
    <OrderMenu v-if="!loading" kind="proof" :currentOrder="currentOrder" @update:currentOrder="selectProofOrder($event)" /> 
  </h2>

  <v-row>
    <v-col v-for="proof in userProofList" :key="proof" cols="12" sm="6" md="4">
      <ProofCard :proof="proof" :hideProofHeader="true" height="100%" @proofUpdated="handleProofUpdated" />
    </v-col>
  </v-row>

  <v-row v-if="userProofList.length < userProofTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getUserProofs">
        {{ $t('UserDashboard.LoadMore') }}
      </v-btn>
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
import constants from '../constants'
import api from '../services/api'

export default {
  components: {
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
  },
  data() {
    return {
      userProofList: [],
      userProofTotal: null,
      userProofPage: 0,
      loading: false,
      proofUpdated: false,
      // order
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
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.initUserProofs()
  },
  methods: {
    initUserProofs() {
      this.userProofList = []
      this.userProofTotal = null
      this.userProofPage = 0
      this.getUserProofs()
    },
    getUserProofs() {
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
    selectProofOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initUserProofs() will be called in watch $route
      }
    },
  }
}
</script>

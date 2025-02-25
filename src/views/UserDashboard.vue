<template>
  <v-row v-if="user">
    <v-col cols="12" sm="6">
      <UserCard :user="user" readonly />
    </v-col>
  </v-row>

  <v-tabs v-if="user" v-model="currentTab">
    <v-tab v-for="item in tabItems" :key="item.key" :value="item.key">
      <v-icon start>
        {{ item.icon }}
      </v-icon>
      {{ $t('Common.' + item.value) }}
    </v-tab>
  </v-tabs>

  <br>

  <v-tabs-window v-if="user" v-model="currentTab" disabled>
    <v-tabs-window-item value="consumption">
      <v-row v-if="displayTodayStats">
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userTodayConsumptionPriceCount" :subtitle="$t('Common.PricesToday')" />
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userTodayConsumptionProofCount" :subtitle="$t('Common.ProofsToday')" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userConsumptionPriceCount" :subtitle="$t('Common.Prices')" to="/dashboard/prices" />
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userConsumptionProofCount" :subtitle="$t('Common.Proofs')" to="/dashboard/proofs" />
        </v-col>
      </v-row>

      <br>

      <v-row>
        <v-col v-for="price in displayedPriceList" :key="price" cols="12" sm="6" md="4" xl="3">
          <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
        </v-col>
        <v-col cols="12" sm="6" md="4" xl="3" align="center">
          <br v-if="$vuetify.display.smAndUp"><!-- TODO: center vertically instead of br -->
          <br v-if="$vuetify.display.smAndUp">
          <v-btn
            v-if="userConsumptionPriceList.length"
            color="primary"
            :block="!$vuetify.display.smAndUp"
            to="/dashboard/prices"
            prepend-icon="mdi-tag-multiple-outline"
            append-icon="mdi-arrow-right"
          >
            {{ $t('UserDashboard.MyPrices') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-tabs-window-item>

    <v-tabs-window-item value="community">
      <v-row v-if="displayTodayStats">
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userTodayCommunityPriceCount" :subtitle="$t('Common.PricesToday')" />
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userTodayCommunityProofCount" :subtitle="$t('Common.ProofsToday')" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userCommunityPriceCount" :subtitle="$t('Common.Prices')" to="/dashboard/prices" />
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userCommunityProofCount" :subtitle="$t('Common.Proofs')" to="/dashboard/proofs" />
        </v-col>
      </v-row>

      <br>

      <v-row>
        <v-col v-for="price in displayedPriceList" :key="price" cols="12" sm="6" md="4" xl="3">
          <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
        </v-col>
        <v-col cols="12" sm="6" md="4" xl="3" align="center">
          <br v-if="$vuetify.display.smAndUp"><!-- TODO: center vertically instead of br -->
          <br v-if="$vuetify.display.smAndUp">
          <v-btn
            v-if="userConsumptionPriceList.length"
            color="primary"
            :block="!$vuetify.display.smAndUp"
            to="/dashboard/prices"
            prepend-icon="mdi-tag-multiple-outline"
            append-icon="mdi-arrow-right"
          >
            {{ $t('UserDashboard.MyPrices') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-tabs-window-item>
  </v-tabs-window>
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
    UserCard: defineAsyncComponent(() => import('../components/UserCard.vue')),
    StatCard: defineAsyncComponent(() => import('../components/StatCard.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  data() {
    return {
      // data
      user: null,
      userConsumptionPriceCount: null,
      userCommunityPriceCount: null,
      userTodayConsumptionPriceCount: 0,
      userTodayCommunityPriceCount: 0,
      userConsumptionProofCount: null,
      userCommunityProofCount: null,
      userTodayConsumptionProofCount: 0,
      userTodayCommunityProofCount: 0,
      userConsumptionPriceList: [],
      userCommunityPriceList: [],
      loading: false,
      // config
      currentTab: null,  // see mounted
      tabItems: constants.USER_DASHBOARD_TAB_LIST,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    displayTodayStats() {
      if (this.currentTab === 'consumption') {
        return (this.userTodayConsumptionPriceCount > 0) || (this.userTodayConsumptionProofCount > 0)
      }
      // community
      return (this.userTodayCommunityPriceCount > 0) || (this.userTodayCommunityProofCount > 0)
    },
    displayedPriceList() {
      if (this.currentTab === 'consumption') {
        return (!this.$vuetify.display.smAndUp) ? this.userConsumptionPriceList.slice(0, 5) : this.userConsumptionPriceList
      }
      // community
      return (!this.$vuetify.display.smAndUp) ? this.userCommunityPriceList.slice(0, 5) : this.userCommunityPriceList
    },
    getPriceParams() {
      let defaultParams = { owner: this.username }
      defaultParams['proof__type'] = (this.currentTab === 'consumption') ? 'RECEIPT' : 'PRICE_TAG'
      return defaultParams
    },
    getProofParams() {
      let defaultParams = { owner: this.username }
      defaultParams['type'] = (this.currentTab === 'consumption') ? 'RECEIPT' : 'PRICE_TAG'
      return defaultParams
    },
  },
  watch: {
    currentTab(newTab, oldTab) {  // eslint-disable-line no-unused-vars
      this.$router.push({ query: { [constants.TAB_PARAM]: newTab } })
    },
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initTabData()
      }
    }
  },
  mounted() {
    this.currentTab = this.$route.query[constants.TAB_PARAM] || this.currentTab
    this.getUser()
    this.initTabData()
  },
  methods: {
    getUser() {
      this.loading = true
      return api.getUserById(this.username)
        .then((data) => {
          this.user = data
          this.loading = false
        })
    },
    initTabData() {
      this.getUserPrices()
      this.getUserProofCount()
    },
    getUserPrices() {
      this.loading = true
      const params = {...this.getPriceParams, size: 25 }
      return api.getPrices(params)
        .then((data) => {
          if (this.currentTab === 'consumption') {
            this.userConsumptionPriceList = data.items
            this.userConsumptionPriceCount = data.total
          } else {
            this.userCommunityPriceList = data.items
            this.userCommunityPriceCount = data.total
          }
          this.loading = false
          // check if the user added a price today
          if (data.items.length && data.items[0].created > utils.currentStartOfDay()) {
            this.getUserPriceCount(true)
          }
        })
    },
    getUserPriceCount(today=false) {
      this.loading = true
      const params = {...this.getPriceParams, size: 1 }
      if (today) {
        params.created__gte = utils.currentStartOfDay()
      }
      return api.getPrices(params)
        .then((data) => {
          if (today) {
            if (this.currentTab === 'consumption') {
              this.userTodayConsumptionPriceCount = data.total
            } else {
              this.userTodayCommunityPriceCount = data.total
            }
          } else {
            if (this.currentTab === 'consumption') {
              this.userConsumptionPriceCount = data.total
            } else {
              this.userCommunityPriceCount = data.total
            }
          }
          this.loading = false
        })
    },
    getUserProofCount(today=false) {
      this.loading = true
      const params = {...this.getProofParams, size: 1 }
      if (today) {
        params.created__gte = utils.currentStartOfDay()
      }
      return api.getProofs(params)
        .then((data) => {
          if (today) {
            if (this.currentTab === 'consumption') {
              this.userTodayConsumptionProofCount = data.total
            } else {
              this.userTodayCommunityProofCount = data.total
            }
          } else {
            if (this.currentTab === 'consumption') {
              this.userConsumptionProofCount = data.total
            } else {
              this.userCommunityProofCount = data.total
            }
            // check if the user added a proof today
            if (data.items.length && data.items[0].created > utils.currentStartOfDay()) {
              this.getUserProofCount(true)
            }
          }
          this.loading = false
        })
    },
  }
}
</script>

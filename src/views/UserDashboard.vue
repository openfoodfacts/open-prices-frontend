<template>
  <v-row v-if="user">
    <v-col cols="12" sm="6">
      <UserCard :user="user" readonly />
    </v-col>
  </v-row>

  <v-row v-if="user && userIsModerator" class="mt-0">
    <v-col cols="12" sm="6">
      <v-alert data-name="user-moderator-alert" type="error" icon="mdi-shield-account" variant="outlined">
        {{ $t('Common.UserIsModerator') }}
      </v-alert>
    </v-col>
  </v-row>

  <v-row>
    <v-tabs v-if="user" v-model="currentTab" :grow="!$vuetify.display.smAndUp">
      <v-tab v-for="item in tabItems" :key="item.key" :value="item.key">
        <v-icon :icon="item.icon" :start="item.key !== 'all'" />
        <span v-if="item.key !== 'all'">{{ $t('Common.' + item.value) }}</span>
      </v-tab>
    </v-tabs>
  </v-row>

  <br>

  <v-tabs-window v-if="user" v-model="currentTab" disabled>
    <v-tabs-window-item value="all">
      <v-row v-if="displayTodayStats">
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userTodayPriceCount" :subtitle="$t('Common.PricesToday')" />
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userTodayProofCount" :subtitle="$t('Common.ProofsToday')" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userPriceCount" :subtitle="$t('Common.Prices')" :to="getUserDashboardPriceUrl" />
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userProofCount" :subtitle="$t('Common.Proofs')" :to="getUserDashboardProofUrl" />
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
            v-if="userPriceList.length"
            color="primary"
            :block="!$vuetify.display.smAndUp"
            :to="getUserDashboardPriceUrl"
            prepend-icon="mdi-tag-multiple-outline"
            append-icon="mdi-arrow-right"
          >
            {{ $t('UserDashboard.MyPrices') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-tabs-window-item>

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
          <StatCard :value="userConsumptionPriceCount" :subtitle="$t('Common.Prices')" :to="getUserDashboardPriceUrl" />
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userConsumptionProofCount" :subtitle="$t('Common.Proofs')" :to="getUserDashboardProofUrl" />
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
            :to="getUserDashboardPriceUrl"
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
          <StatCard :value="userCommunityPriceCount" :subtitle="$t('Common.Prices')" :to="getUserDashboardPriceUrl" />
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="userCommunityProofCount" :subtitle="$t('Common.Proofs')" :to="getUserDashboardProofUrl" />
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
            :to="getUserDashboardPriceUrl"
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
import date_utils from '../utils/date.js'

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
      userPriceCount: null,
      userTodayPriceCount: 0,
      userProofCount: null,
      userTodayProofCount: 0,
      userPriceList: [],
      userConsumptionPriceCount: null,
      userTodayConsumptionPriceCount: 0,
      userConsumptionProofCount: null,
      userTodayConsumptionProofCount: 0,
      userConsumptionPriceList: [],
      userCommunityPriceCount: null,
      userTodayCommunityPriceCount: 0,
      userCommunityProofCount: null,
      userTodayCommunityProofCount: 0,
      userCommunityPriceList: [],
      loading: false,
      // config
      currentTab: null,  // see mounted  // 'all' | 'consumption' | 'community'
      tabItems: constants.USER_DASHBOARD_TAB_LIST,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    userIsModerator() {
      return this.appStore.user.is_moderator
    },
    displayTodayStats() {
      if (this.currentTab === 'consumption') {
        return (this.userTodayConsumptionPriceCount > 0) || (this.userTodayConsumptionProofCount > 0)
      } else if (this.currentTab === 'community') {
        return (this.userTodayCommunityPriceCount > 0) || (this.userTodayCommunityProofCount > 0)
      }
      // all
      return (this.userTodayPriceCount > 0) || (this.userTodayProofCount > 0)
    },
    displayedPriceList() {
      if (this.currentTab === 'consumption') {
        return (!this.$vuetify.display.smAndUp) ? this.userConsumptionPriceList.slice(0, 5) : this.userConsumptionPriceList
      } else if (this.currentTab === 'community') {
        return (!this.$vuetify.display.smAndUp) ? this.userCommunityPriceList.slice(0, 5) : this.userCommunityPriceList
      }
      // all
      return (!this.$vuetify.display.smAndUp) ? this.userPriceList.slice(0, 5) : this.userPriceList
    },
    getPriceParams() {
      let defaultParams = { owner: this.username }
      if (this.currentTab && this.currentTab !== 'all') {
        defaultParams['kind'] = this.currentTab.toUpperCase()
      }
      return defaultParams
    },
    getProofParams() {
      let defaultParams = { owner: this.username }
      if (this.currentTab && this.currentTab !== 'all') {
        defaultParams['kind'] = this.currentTab.toUpperCase()
      }
      return defaultParams
    },
    getUserDashboardPriceUrl() {
      if (this.currentTab && this.currentTab !== 'all') {
        return `/dashboard/prices?${constants.KIND_PARAM}=${this.currentTab.toUpperCase()}`
      }
      // all
      return `/dashboard/prices`
    },
    getUserDashboardProofUrl() {
      if (this.currentTab && this.currentTab !== 'all') {
        return `/dashboard/proofs?${constants.KIND_PARAM}=${this.currentTab.toUpperCase()}`
      }
      // all
      return `/dashboard/proofs`
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
          } else if (this.currentTab === 'community') {
            this.userCommunityPriceList = data.items
            this.userCommunityPriceCount = data.total
          } else {
            this.userPriceList = data.items
            this.userPriceCount = data.total
          }
          this.loading = false
          // check if the user added a price today
          if (data.items.length && data.items[0].created > date_utils.currentStartOfDay()) {
            this.getUserPriceCount(true)
          }
        })
    },
    getUserPriceCount(today=false) {
      this.loading = true
      const params = {...this.getPriceParams, size: 1 }
      if (today) {
        params.created__gte = date_utils.currentStartOfDay()
      }
      return api.getPrices(params)
        .then((data) => {
          if (today) {
            if (this.currentTab === 'consumption') {
              this.userTodayConsumptionPriceCount = data.total
            } else if (this.currentTab === 'community') {
              this.userTodayCommunityPriceCount = data.total
            } else {
              this.userTodayPriceCount = data.total
            }
          } else {
            if (this.currentTab === 'consumption') {
              this.userConsumptionPriceCount = data.total
            } else if (this.currentTab === 'community') {
              this.userCommunityPriceCount = data.total
            } else {
              this.userPriceCount = data.total
            }
          }
          this.loading = false
        })
    },
    getUserProofCount(today=false) {
      this.loading = true
      const params = {...this.getProofParams, size: 1 }
      if (today) {
        params.created__gte = date_utils.currentStartOfDay()
      }
      return api.getProofs(params)
        .then((data) => {
          if (today) {
            if (this.currentTab === 'consumption') {
              this.userTodayConsumptionProofCount = data.total
            } else if (this.currentTab === 'community') {
              this.userTodayCommunityProofCount = data.total
            } else {
              this.userTodayProofCount = data.total
            }
          } else {
            if (this.currentTab === 'consumption') {
              this.userConsumptionProofCount = data.total
            } else if (this.currentTab === 'community') {
              this.userCommunityProofCount = data.total
            } else {
              this.userProofCount = data.total
            }
            // check if the user added a proof today
            if (data.items.length && data.items[0].created > date_utils.currentStartOfDay()) {
              this.getUserProofCount(true)
            }
          }
          this.loading = false
        })
    },
  }
}
</script>

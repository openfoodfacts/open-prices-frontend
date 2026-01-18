<template>
  <h2 class="text-h6 pb-4">
    {{ $t('Common.TaglineAlt1') }} {{ APP_HOME_ICONS }}
  </h2>

  <v-row>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="todayPriceCount" :subtitle="$t('Common.Today')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="totalPriceCount" :subtitle="$t('Common.Total')" />
    </v-col>
  </v-row>

  <br v-if="currentChallenge">

  <ChallengeCurrentPromoBanner v-if="currentChallenge" :challenge="currentChallenge" />

  <br>

  <v-row>
    <v-col v-for="price in latestPriceList" :key="price" cols="12" sm="6" md="4" xl="3">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
    </v-col>
    <v-col cols="12" sm="6" md="4" xl="3" align="center">
      <br v-if="$vuetify.display.smAndUp"><!-- TODO: center vertically instead of br -->
      <br v-if="$vuetify.display.smAndUp">
      <v-btn
        color="primary"
        :block="!$vuetify.display.smAndUp"
        to="/prices"
        prepend-icon="mdi-tag-multiple-outline"
        append-icon="mdi-arrow-right"
      >
        {{ $t('Common.LatestPrices') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import openPricesApi from '../services/openPricesApi'
import constants from '../constants'
import date_utils from '../utils/date.js'

export default {
  components: {
    StatCard: defineAsyncComponent(() => import('../components/StatCard.vue')),
    ChallengeCurrentPromoBanner: defineAsyncComponent(() => import('../components/ChallengeCurrentPromoBanner.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  data() {
    return {
      APP_NAME: constants.APP_NAME,
      APP_HOME_ICONS: constants.APP_HOME_ICONS,
      // data
      latestPriceList: [],
      todayPriceCount: null,
      totalPriceCount: null,
      loading: false,
      currentChallenge: null,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    getApiSize() {
      if (!this.$vuetify.display.smAndUp) return 5
      return 25
    }
  },
  mounted() {
    this.getPrices()
    this.getTodayPriceCount()
    this.getCurrentChallenge()
  },
  methods: {
    getCurrentChallenge() {
      openPricesApi.getChallenges({ status: 'ONGOING', order_by: '-created', size: 1 })
      .then((data) => {
        this.currentChallenge = data.items[0]
      })
    },
    getPrices() {
      this.loading = true
      return openPricesApi.getPrices({ size: this.getApiSize })
        .then((data) => {
          this.latestPriceList = data.items
          this.totalPriceCount = data.total
          this.loading = false
        })
    },
    getTodayPriceCount() {
      this.loading = true
      return openPricesApi.getPrices({ created__gte: date_utils.currentStartOfDay(), size: 1 })
        .then((data) => {
          this.todayPriceCount = data.total
          this.loading = false
        })
    },
  }
}
</script>

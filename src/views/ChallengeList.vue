<template>
  <v-row>
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-trophy-variant">
        {{ $t('Challenge.ChallengeCount', { count: challengeTotal }) }}
      </v-chip>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6">
        {{ $t('Challenge.OngoingChallenges') }}
        <LoadedCountChip :totalCount="ongoingChallenges.length" />
      </h2>
    </v-col>
  </v-row>
  <v-row class="mt-0">
    <v-col v-for="challenge in ongoingChallenges" :key="challenge" cols="12" sm="6" md="4" xl="3">
      <ChallengeCard :challenge="challenge" />
    </v-col>
    <v-col v-if="ongoingChallenges.length === 0">
      {{ $t('Challenge.NoChallengeCurrentlyOngoing') }}
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6">
        {{ $t('Challenge.UpcomingChallenges') }}
        <LoadedCountChip :totalCount="upcomingChallenges.length" />
      </h2>
    </v-col>
  </v-row>
  <v-row class="mt-0">
    <v-col v-for="challenge in upcomingChallenges" :key="challenge" cols="12" sm="6" md="4" xl="3">
      <ChallengeCard :challenge="challenge" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6">
        {{ $t('Challenge.PastChallenges') }}
        <LoadedCountChip :totalCount="pastChallenges.length" />
      </h2>
    </v-col>
  </v-row>
  <v-row class="mt-0">
    <v-col v-for="challenge in pastChallenges" :key="challenge" cols="12" sm="6" md="4" xl="3">
      <ChallengeCard :challenge="challenge" />
    </v-col>
  </v-row>

  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <ChallengeNewFormAlert />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import openPricesApi from '../services/openPricesApi'
import utils from '../utils.js'

export default {
  components: {
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    ChallengeCard: defineAsyncComponent(() => import('../components/ChallengeCard.vue')),
    ChallengeNewFormAlert: defineAsyncComponent(() => import('../components/ChallengeNewFormAlert.vue')),
  },
  data() {
    return {
      challengeList: [],
      challengeTotal: null,
      challengePage: 0,
      loading: false,
      currentOrder: 'id',
    }
  },
  computed: {
    getChallengesParams() {
      let defaultParams = { order_by: this.currentOrder, page: this.challengePage }
      return defaultParams
    },
    ongoingChallenges() {
      return this.challengeList.filter(challenge => challenge.status === "ONGOING")
    },
    upcomingChallenges() {
      return this.challengeList.filter(challenge => challenge.status === "UPCOMING")
    },
    pastChallenges() {
      return this.challengeList.filter(challenge => challenge.status === "COMPLETED")
    },
  },
  mounted() {
    this.initChallengeList()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initChallengeList() {
      this.challengeList = []
      this.challengeTotal = null
      this.challengePage = 0
      this.getChallenges()
    },
    getChallenges() {
      if ((this.challengeTotal != null) && (this.challengeList.length >= this.challengeTotal)) return
      this.loading = true
      this.challengePage += 1
      return openPricesApi.getChallenges(this.getChallengesParams)
        .then((data) => {
          this.challengeList.push(...data.items)
          this.challengeTotal = data.total
          this.loading = false
        })
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90 &&!this.loading) {
        this.getChallenges()
      }
    }
  }
}
</script>

<template>
  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-tag-outline">
        {{ $t('Challenge.ChallengeCount', { count: challengeTotal }) }}
      </v-chip>
      <LoadedCountChip :loadedCount="challengeList.length" :totalCount="challengeTotal" />
      <FilterMenu kind="challenge" :currentFilter="currentFilter" :currentType="currentType" @update:currentFilter="toggleChallengeFilter($event)" @update:currentType="toggleChallengeType($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="challenge in challengeList" :key="challenge" cols="12" sm="6" md="4" xl="3">
      <v-card :id="'challenge_' + challenge.id" :class="'border-transparent'" @click="goToChallenge(challenge)">
        <template #title>
          {{ challenge.icon }} {{ challenge.title }} {{ challenge.subtitle }}
        </template>

        <v-divider />

        <v-card-text>
          <p class="mb-2">
            {{ $t('Challenge.ChallengeStatus', { status: $t('Challenge.ChallengeStatuses.' + challenge.status) }) }}
          </p>
          <DateChip :date="challenge.start_date" />
          <DateChip :date="challenge.end_date" />
          <p v-if="challenge.categories.length">
            <CategoryTagChip v-for="category in challenge.categories" :key="category" :category="{id: category, name: category}" />
          </p>
        </v-card-text>
      </v-card>
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
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    CategoryTagChip: defineAsyncComponent(() => import('../components/CategoryTagChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue'))
  },
  data() {
    return {
      challengeList: [],
      challengeTotal: null,
      challengePage: 0,
      loading: false,
      currentFilter: '',
      currentType: '',
      currentOrder: 'id',
    }
  },
  computed: {
    getChallengesParams() {
      let defaultParams = { order_by: this.currentOrder, page: this.challengePage, status: "ONGOING" }
      if (this.currentFilter === 'show_all_status') {
        delete defaultParams['status']
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
        this.initChallengeList()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.currentType = this.$route.query[constants.TYPE_PARAM] || this.currentType
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
      return api.getChallenges(this.getChallengesParams)
        .then((data) => {
          this.challengeList.push(...data.items)
          this.challengeTotal = data.total
          this.loading = false
        })
    },
    toggleChallengeFilter(filterKey) {
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
    },
    toggleChallengeType(sourceKey) {
      this.currentType = (this.currentType !== sourceKey) ? sourceKey : ''
      this.$router.push({ query: { ...this.$route.query, [constants.TYPE_PARAM]: this.currentType } })
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getChallenges()
      }
    },
    goToChallenge(challenge) {
      this.$router.push({ path: `/challenges/${challenge.id}` })
    }
  }
}
</script>

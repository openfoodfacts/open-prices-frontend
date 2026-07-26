<template>
  <v-row>
    <v-col>
      <CountTextChip kind="badge" :count="userBadgeTotal" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="userBadge in userBadgeList" :key="userBadge.id" cols="12" sm="6" md="4" xl="3">
      <BadgeCard :badge="userBadge.badge" :achievedAt="userBadge.achieved_at" :hideBadgeFooterRow="true" height="100%" />
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
import openPricesApi from '../services/openPricesApi'
import utils from '../utils.js'

export default {
  components: {
    CountTextChip: defineAsyncComponent(() => import('../components/CountTextChip.vue')),
    BadgeCard: defineAsyncComponent(() => import('../components/BadgeCard.vue')),
  },
  data() {
    return {
      username: this.$route.params.username,
      // data
      userBadgeList: [],
      userBadgeTotal: null,
      userBadgePage: 0,
      loading: false,
    }
  },
  computed: {
    getUserBadgesParams() {
      return { page: this.userBadgePage }
    },
  },
  mounted() {
    this.getBadges()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initBadgeList() {
      this.userBadgeList = []
      this.getBadges()
    },
    getBadges() {
      if ((this.userBadgeTotal != null) && (this.userBadgeList.length >= this.userBadgeTotal)) return
      this.loading = true
      this.userBadgePage += 1
      openPricesApi.getUserBadges(this.username, this.getUserBadgesParams)
        .then((data) => {
          if (!data.items) return
          this.userBadgeList.push(...data.items)
          this.userBadgeTotal = data.total
          this.loading = false
        })
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getBadges()
      }
    },
  },
}
</script>

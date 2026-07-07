<template>
  <v-row>
    <v-col>
      <v-chip label variant="text" :prepend-icon="BADGE_ICON">
        {{ $t('Common.BadgeCount', { count: userBadgeTotal }) }}
      </v-chip>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="userBadge in userBadgeList" :key="userBadge.id" cols="12" sm="6" md="4" xl="3">
      <BadgeCard :badge="userBadge.badge" :hideBadgeFooterRow="true" height="100%" />
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
import constants from '../constants'

export default {
  components: {
    BadgeCard: defineAsyncComponent(() => import('../components/BadgeCard.vue')),
  },
  data() {
    return {
      username: this.$route.params.username,
      BADGE_ICON: constants.BADGE_ICON,
      // data
      userBadgeList: [],
      userBadgeTotal: null,
      loading: false,
    }
  },
  computed: {
    getUserBadgesParams() {
      return { }
    },
  },
  mounted() {
    this.getBadges()
  },
  methods: {
    initBadgeList() {
      this.userBadgeList = []
      this.getBadges()
    },
    getBadges() {
      if ((this.userBadgeTotal != null) && (this.userBadgeList.length >= this.userBadgeTotal)) return
      this.loading = true
      openPricesApi.getUserBadges(this.username, this.getUserBadgesParams)
        .then((data) => {
          this.userBadgeList = data
          this.userBadgeTotal = data.length
          this.loading = false
        })
    },
  },
}
</script>

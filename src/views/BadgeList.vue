<template>
  <v-row>
    <v-col>
      <v-chip label variant="text" :prepend-icon="badgeIcon">
        {{ $t('Common.BadgeCount', { count: badgeTotal }) }}
      </v-chip>
      <template v-if="!loading">
        <LoadedCountChip :loadedCount="badgeList.length" :totalCount="badgeTotal" />
      </template>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="badge in badgeList" :key="badge" cols="12" sm="6" md="4" xl="3">
      <BadgeCard :badge="badge" height="100%" />
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
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    BadgeCard: defineAsyncComponent(() => import('../components/BadgeCard.vue')),
  },
  data() {
    return {
      badgeIcon: constants.BADGE_ICON,
      // data
      badgeList: [],
      badgeTotal: null,
      badgePage: 0,
      loading: false,
    }
  },
  computed: {
    getBadgesParams() {
      return { page: this.badgePage }
    },
  },
  mounted() {
    this.getBadges()
  },
  methods: {
    initBadgeList() {
      this.badgeList = []
      this.badgePage = 0
      this.getBadges()
    },
    getBadges() {
      if ((this.badgeTotal != null) && (this.badgeList.length >= this.badgeTotal)) return
      this.loading = true
      this.badgePage += 1
      openPricesApi.getBadges(this.getBadgesParams)
        .then((data) => {
          this.badgeList.push(...data.items)
          this.badgeTotal = data.total
          this.loading = false
        })
    },
  },
}
</script>

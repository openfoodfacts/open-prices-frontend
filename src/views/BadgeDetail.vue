<template>
  <v-row>
    <v-col cols="12" sm="6">
      <BadgeCard v-if="badge" :badge="badge" readonly />
    </v-col>
  </v-row>

  <v-row v-if="badge">
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.Users') }}
      </h2>
      <template v-if="!loading">
        <LoadedCountChip :loadedCount="badgeUserList.length" :totalCount="badgeUserTotal" />
      </template>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="badgeUser in badgeUserList" :key="badgeUser.user_id" cols="12" sm="6" md="4" xl="3">
      <UserCard :user="badgeUser.user" :badgeAchievedAt="badgeUser.achieved_at" height="100%" />
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
    BadgeCard: defineAsyncComponent(() => import('../components/BadgeCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    UserCard: defineAsyncComponent(() => import('../components/UserCard.vue')),
  },
  data() {
    return {
      badgeId: this.$route.params.id,
      // data
      badge: null,
      badgeUserList: [],
      badgeUserTotal: null,
      badgeUserPage: 0,
      loading: false,
    }
  },
  computed: {
    getBadgeUsersParams() {
      return { page: this.badgeUserPage }
    },
  },
  mounted() {
    this.getBadge()
    this.getUsers()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    getBadge() {
      openPricesApi.getBadgeById(this.badgeId)
        .then((data) => {
          this.badge = data
        })
    },
    getUsers() {
      if ((this.badgeUserTotal != null) && (this.badgeUserList.length >= this.badgeUserTotal)) return
      this.loading = true
      this.badgeUserPage += 1
      openPricesApi.getBadgeUsers(this.badgeId, this.getBadgeUsersParams)
        .then((data) => {
          this.loading = false
          if (!data.items) return
          this.badgeUserList.push(...data.items)
          this.badgeUserTotal = data.total
        })
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getUsers()
      }
    },
  },
}
</script>

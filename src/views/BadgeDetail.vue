<template>
  <v-row>
    <v-col cols="12" sm="6">
      <BadgeCard :badge="badge" />
    </v-col>
  </v-row>

  <v-row v-if="badge">
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.Users') }}
      </h2>
      <template v-if="!loading">
        <LoadedCountChip :loadedCount="badgeUserList.length" :totalCount="badge.user_count" />
      </template>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="badgeUser in badgeUserList" :key="badgeUser.user_id" cols="12" sm="6" md="4" xl="3">
      <UserCard :user="badgeUser.user" height="100%" />
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
      loading: false,
    }
  },
  mounted() {
    this.getBadge()
    this.getUsers()
  },
  methods: {
    getBadge() {
      openPricesApi.getBadgeById(this.badgeId)
        .then((data) => {
          this.badge = data
        })
    },
    getUsers() {
      this.loading = true
      openPricesApi.getBadgeUsers(this.badgeId)
        .then((data) => {
          this.loading = false
          this.badgeUserList = data
        })
    },
  },
}
</script>

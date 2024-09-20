<template>
  <h1 class="text-h5 mb-1">
    {{ $t('UserList.Title') }}
  </h1>

  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-account-badge-outline">
        {{ $t('UserList.UserTotal', { count: userTotal }) }}
      </v-chip>
      <FilterMenu v-if="!loading" kind="user" :currentFilter="currentFilter" @update:currentFilter="toggleUserFilter($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="user in userList" :key="user" cols="12" sm="6" md="4">
      <UserCard :user="user" height="100%" />
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
import constants from '../constants'
import api from '../services/api'
import utils from '../utils.js'

export default {
  components: {
    UserCard: defineAsyncComponent(() => import('../components/UserCard.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
  },
  data() {
    return {
      // data
      userList: [],
      userTotal: null,
      userPage: 0,
      loading: false,
      // filter & order
      currentFilter: '',
    }
  },
  computed: {
    getUsersParams() {
      let defaultParams = { order_by: '-price_count', page: this.userPage }
      if (this.currentFilter && this.currentFilter === 'hide_price_count_gte_1') {
        defaultParams['price_count'] = 0
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initUserList()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.initUserList()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getUsers()
      }
    },
    initUserList() {
      this.userList = []
      this.userPage = 0
      this.getUsers()
    },
    getUsers() {
      this.loading = true
      this.userPage += 1
      return api.getUsers(this.getUsersParams)
        .then((data) => {
          this.userList.push(...data.items)
          this.userTotal = data.total
          this.loading = false
        })
    },
    toggleUserFilter(filterKey) {
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initUserList() will be called in watch $route
    },
  }
}
</script>

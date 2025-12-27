<template>
  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-account">
        {{ $t('UserList.UserTotal', { count: userTotal }) }}
      </v-chip>
      <FilterMenu kind="user" :currentFilterList="currentFilterList" @update:currentFilterList="updateFilterList($event)" />
      <OrderMenu kind="user" :currentOrder="currentOrder" @update:currentOrder="updateOrder($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="user in userList" :key="user" cols="12" sm="6" md="4" xl="3">
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
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
  },
  data() {
    return {
      // data
      userList: [],
      userTotal: null,
      userPage: 0,
      loading: false,
      // filter & order
      currentFilterList: [],
      currentOrder: constants.USER_ORDER_LIST[0].key,  // price_count
    }
  },
  computed: {
    getUsersParams() {
      let defaultParams = { order_by: this.currentOrder, page: this.userPage }
      if (this.currentFilterList.includes('hide_price_count_gte_1')) {
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
    this.currentFilterList = utils.toArray(this.$route.query[constants.FILTER_PARAM]) || this.currentFilterList
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    this.initUserList()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initUserList() {
      this.userList = []
      this.userPage = 0
      this.getUsers()
    },
    getUsers() {
      if ((this.userTotal != null) && (this.userList.length >= this.userTotal)) return
      this.loading = true
      this.userPage += 1
      return api.getUsers(this.getUsersParams)
        .then((data) => {
          this.userList.push(...data.items)
          this.userTotal = data.total
          this.loading = false
        })
    },
    updateFilterList(newFilterList) {
      this.currentFilterList = newFilterList
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilterList } })
      // this.initUserList() will be called in watch $route
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.initUserList() will be called in watch $route
      }
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getUsers()
      }
    },
  }
}
</script>

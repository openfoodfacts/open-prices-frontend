<template>
  <h1 class="mb-1">
    Top contributors
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row v-if="!loading">
    <v-col>
      <v-chip class="mr-2" label variant="text" prepend-icon="mdi-account-badge-outline">
        {{ userTotal }} contributors
      </v-chip>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col cols="12" sm="6" md="4" v-for="user in userList" :key="user">
      <v-card
        :title="user.user_id"
        prepend-icon="mdi-account"
        elevation="1"
        height="100%"
        @click="goToUser(user)">
        <v-card-text>
          <v-chip label size="small" density="comfortable" :color="getUserPriceCountColor(user)" class="mr-1">
            <v-icon start icon="mdi-tag-outline"></v-icon>
            {{ user.price_count }} prices
          </v-chip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row v-if="userList.length < userTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" @click="getUsers">Load more</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      // data
      userList: [],
      userTotal: null,
      userPage: 0,
      loading: false,
    }
  },
  computed: {},
  mounted() {
    this.initUserList()
  },
  methods: {
    initUserList() {
      this.userList = []
      this.userPage = 0
      this.getUsers()
    },
    getUsers() {
      this.loading = true
      this.userPage += 1
      return api.getUsers({ price_count__gte: 1, order_by: '-price_count', page: this.userPage })
        .then((data) => {
          this.userList.push(...data.items)
          this.userTotal = data.total
          this.loading = false
        })
    },
    getUserPriceCountColor(user) {
      if (user.price_count === 0) {
        return 'error'
      }
      if (user.price_count === 1) {
        return 'warning'
      }
      if (user.price_count > 1) {
        return 'success'
      }
    },
    goToUser(user) {
      this.$router.push({ path: `/users/${user.user_id}` })
    },
  }
}
</script>

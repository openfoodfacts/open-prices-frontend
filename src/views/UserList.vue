<template>
  <h1 class="text-h5 mb-1">
    {{ $t('UserList.Title') }}
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h1>

  <v-row v-if="!loading">
    <v-col>
      <v-chip class="mr-2" label variant="text" prepend-icon="mdi-account-badge-outline">
        {{ $t('UserList.UserTotal', { count: userTotal }) }}
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
          <PriceCountChip :item="user"></PriceCountChip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row v-if="userList.length < userTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getUsers">{{ $t('UserList.LoadMore') }}</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'
import PriceCountChip from '../components/PriceCountChip.vue'

export default {
  components: {
    PriceCountChip,
  },
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
    goToUser(user) {
      this.$router.push({ path: `/users/${user.user_id}` })
    },
  }
}
</script>

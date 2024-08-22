<template>
  <h1 class="text-h5 mb-1">
    {{ $t('UserList.Title') }}
    <v-progress-circular v-if="loading" indeterminate :size="30" />
  </h1>

  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-account-badge-outline">
        {{ $t('UserList.UserTotal', { count: userTotal }) }}
      </v-chip>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="user in userList" :key="user" cols="12" sm="6" md="4">
      <UserCard :user="user" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="userList.length < userTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getUsers">
        {{ $t('Common.LoadMore') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'

export default {
  components: {
    UserCard: defineAsyncComponent(() => import('../components/UserCard.vue')),
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
  }
}
</script>

<template>
  <v-row v-if="user">
    <v-col cols="12" sm="6">
      <UserCard :user="user" readonly />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('UserDashboard.MyPrices')"
        :subtitle="userPriceTotal"
        prepend-icon="mdi-tag-multiple-outline"
        height="100%"
        to="/dashboard/prices"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('UserDashboard.MyProofs')"
        :subtitle="userProofTotal"
        prepend-icon="mdi-image"
        height="100%"
        to="/dashboard/proofs"
      />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'

export default {
  components: {
    UserCard: defineAsyncComponent(() => import('../components/UserCard.vue')),
  },
  data() {
    return {
      user: null,
      userPriceTotal: null,
      userProofTotal: null,
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
  },
  mounted() {
    this.getUser()
    this.getUserPriceCount()
    this.getUserProofCount()
  },
  methods: {
    getUser() {
      this.loading = true
      return api.getUserById(this.username)
        .then((data) => {
          this.user = data
          this.loading = false
        })
    },
    getUserPriceCount() {
      this.loading = true
      return api.getPrices({ owner: this.username, size: 1 })
        .then((data) => {
          this.userPriceTotal = data.total
          this.loading = false
        })
    },
    getUserProofCount() {
      this.loading = true
      return api.getProofs({ owner: this.username, size: 1 })
        .then((data) => {
          this.userProofTotal = data.total
          this.loading = false
        })
    },
  }
}
</script>

<template>
  <v-row v-if="user">
    <v-col cols="12" sm="6">
      <UserCard :user="user" readonly />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="6" sm="4" md="3" lg="2">
      <v-card
        :title="$t('UserDashboard.MyPrices')"
        :subtitle="userPriceCount"
        prepend-icon="mdi-tag-multiple-outline"
        height="100%"
        to="/dashboard/prices"
      />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <v-card
        :title="$t('UserDashboard.MyProofs')"
        :subtitle="userProofCount"
        prepend-icon="mdi-image"
        height="100%"
        to="/dashboard/proofs"
      />
    </v-col>
  </v-row>

  <br>

  <v-row>
    <v-col v-for="price in displayedPriceList" :key="price" cols="12" sm="6" md="4" xl="3">
      <PriceCard :price="price" :product="price.product" :hidePriceCreated="false" elevation="1" height="100%" />
    </v-col>
    <v-col cols="12" sm="6" md="4" xl="3" align="center">
      <br v-if="$vuetify.display.smAndUp"><!-- TODO: center vertically instead of br -->
      <br v-if="$vuetify.display.smAndUp">
      <v-btn to="/dashboard/prices" prepend-icon="mdi-tag-multiple-outline" append-icon="mdi-arrow-right">
        {{ $t('UserDashboard.MyPrices') }}
      </v-btn>
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
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  data() {
    return {
      user: null,
      userPriceCount: null,
      userProofCount: null,
      userPriceList: [],
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    displayedPriceList() {
      if (!this.$vuetify.display.smAndUp) {
        return this.userPriceList.slice(0, 5)
      } else {
        return this.userPriceList
      }
    }
  },
  mounted() {
    this.getUser()
    this.getUserProofCount()
    this.getPrices()
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
    getUserProofCount() {
      this.loading = true
      return api.getProofs({ owner: this.username, size: 1 })
        .then((data) => {
          this.userProofCount = data.total
          this.loading = false
        })
    },
    getPrices() {
      this.loading = true
      return api.getPrices({ owner: this.username, size: 25 })
        .then((data) => {
          this.userPriceList = data.items
          this.userPriceCount = data.total
          this.loading = false
        })
    },
  }
}
</script>

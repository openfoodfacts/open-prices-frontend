<template>
  <v-row v-if="user">
    <v-col cols="12" sm="6">
      <UserCard :user="user" readonly />
    </v-col>
  </v-row>

  <v-row>
    <v-col v-if="displayTodayStats" cols="6" sm="4" md="3" lg="2">
      <StatCard :value="userTodayPriceCount" :subtitle="$t('Common.PricesToday')" />
    </v-col>
    <v-col v-if="displayTodayStats" cols="6" sm="4" md="3" lg="2">
      <StatCard :value="userTodayProofCount" :subtitle="$t('Common.ProofsToday')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="userPriceCount" :subtitle="$t('Common.Prices')" to="/dashboard/prices" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="userProofCount" :subtitle="$t('Common.Proofs')" to="/dashboard/proofs" />
    </v-col>
  </v-row>

  <br>

  <v-row>
    <v-col v-for="price in displayedPriceList" :key="price" cols="12" sm="6" md="4" xl="3">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
    </v-col>
    <v-col cols="12" sm="6" md="4" xl="3" align="center">
      <br v-if="$vuetify.display.smAndUp"><!-- TODO: center vertically instead of br -->
      <br v-if="$vuetify.display.smAndUp">
      <v-btn v-if="userPriceList.length" to="/dashboard/prices" prepend-icon="mdi-tag-multiple-outline" append-icon="mdi-arrow-right">
        {{ $t('UserDashboard.MyPrices') }}
      </v-btn>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="singleSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('Common.PriceCreated') }}
  </v-snackbar>
  <v-snackbar
    v-model="multipleSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('Common.Thanks') }}
  </v-snackbar>
  <v-snackbar
    v-model="proofSingleSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('ProofCreate.Success') }}
  </v-snackbar>
  <v-snackbar
    v-model="settingsSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('Home.SettingsUpdated') }}
  </v-snackbar>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import utils from '../utils.js'

export default {
  components: {
    UserCard: defineAsyncComponent(() => import('../components/UserCard.vue')),
    StatCard: defineAsyncComponent(() => import('../components/StatCard.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  data() {
    return {
      // data
      user: null,
      userPriceCount: null,
      userTodayPriceCount: null,
      userProofCount: null,
      userTodayProofCount: null,
      userPriceList: [],
      loading: false,
      // success messages
      singleSuccessMessage: false,
      multipleSuccessMessage: false,
      proofSingleSuccessMessage: false,
      settingsSuccessMessage: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    displayTodayStats() {
      return !!this.userTodayPriceCount || !!this.userTodayProofCount
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
    this.getUserPrices()
    this.getUserProofCount()
    // success messages
    if (Object.keys(this.$route.query).length) {
      if (this.$route.query.singleSuccess === 'true') {
        this.singleSuccessMessage = true
      }
      if (this.$route.query.multipleSuccess === 'true') {
        this.multipleSuccessMessage = true
      }
      if (this.$route.query.proofSingleSuccess === 'true') {
        this.proofSingleSuccessMessage = true
      }
      if (this.$route.query.settingsSuccess === 'true') {
        this.settingsSuccessMessage = true
      }
      this.$router.replace({ query: {} })
    }
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
    getUserPrices() {
      this.loading = true
      const params = { owner: this.username, size: 25 }
      return api.getPrices(params)
        .then((data) => {
          this.userPriceList = data.items
          this.userPriceCount = data.total
          this.loading = false
          // check if the user added a price today
          if (data.items.length && data.items[0].created > utils.currentStartOfDay()) {
            this.getUserPriceCount(true)
          }
        })
    },
    getUserPriceCount(today=false) {
      this.loading = true
      const params = { owner: this.username, size: 1 }
      if (today) {
        params.created__gte = utils.currentStartOfDay()
      }
      return api.getPrices(params)
        .then((data) => {
          if (today) {
            this.userTodayPriceCount = data.total
          } else {
            this.userPriceCount = data.total
          }
          this.loading = false
        })
    },
    getUserProofCount(today=false) {
      this.loading = true
      const params = { owner: this.username, size: 1 }
      if (today) {
        params.created__gte = utils.currentStartOfDay()
      }
      return api.getProofs(params)
        .then((data) => {
          if (today) {
            this.userTodayProofCount = data.total
          } else {
            this.userProofCount = data.total
            // check if the user added a proof today
            if (data.items.length && data.items[0].created > utils.currentStartOfDay()) {
              this.getUserProofCount(true)
            }
          }
          this.loading = false
        })
    },
  }
}
</script>

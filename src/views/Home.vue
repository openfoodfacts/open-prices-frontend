<template>
  <h1 class="text-h5 mb-1">
    {{ $t('Home.Welcome.Generic') }}
  </h1>

  <br>

  <v-row>
    <v-col sm="6" md="4" lg="3">
      <v-card :title="todayPriceCount" :subtitle="$t('Stats.PricesToday')" variant="tonal" />
    </v-col>
    <v-col sm="6" md="4" lg="3">
      <v-card :title="totalPriceCount" :subtitle="$t('Stats.PricesTotal')" variant="tonal" />
    </v-col>
  </v-row>

  <br>

  <v-row>
    <v-col v-for="price in displayedPriceList" :key="price" cols="12" sm="6" md="4">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
    </v-col>
    <v-col cols="12" sm="6" md="4" align="center" justify="center">
      <v-btn to="/prices" prepend-icon="mdi-tag-multiple-outline" append-icon="mdi-arrow-right">
        {{ $t('Home.LatestPrices') }}
      </v-btn>
    </v-col>
  </v-row>

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
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  data() {
    return {
      APP_NAME: constants.APP_NAME,
      // data
      latestPriceList: [],
      todayPriceCount: null,
      totalPriceCount: null,
      loading: false,
      // success messages
      proofSingleSuccessMessage: false,
      settingsSuccessMessage: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    displayedPriceList() {
      if (!this.$vuetify.display.smAndUp) {
        return this.latestPriceList.slice(0, 5)
      } else {
        return this.latestPriceList
      }
    }
  },
  mounted() {
    if (this.$route.query.proofSingleSuccess === 'true') {
      this.proofSingleSuccessMessage = true
    }
    if (this.$route.query.settingsSuccess === 'true') {
      this.settingsSuccessMessage = true
    }
    this.getPrices()
    this.getTodayPriceCount()
  },
  methods: {
    getPrices() {
      this.loading = true
      return api.getPrices({ size: 25 })
        .then((data) => {
          this.latestPriceList = data.items
          this.totalPriceCount = data.total
          this.loading = false
        })
    },
    getTodayPriceCount() {
      this.loading = true
      return api.getPrices({ created__gte: utils.currentStartOfDay(), size: 1 })
        .then((data) => {
          this.todayPriceCount = data.total
          this.loading = false
        })
    },
  }
}
</script>

<template>
  <h2 class="text-h6">
    {{ $t('Common.TaglineAlt1') }} 🏷🍊💲
  </h2>

  <br>

  <v-row>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="todayPriceCount" :subtitle="$t('Common.Today')" />
    </v-col>
    <v-col cols="6" sm="4" md="3" lg="2">
      <StatCard :value="totalPriceCount" :subtitle="$t('Common.Total')" />
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
      <v-btn to="/prices" prepend-icon="mdi-tag-multiple-outline" append-icon="mdi-arrow-right">
        {{ $t('Home.LatestPrices') }}
      </v-btn>
    </v-col>
  </v-row>
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
    StatCard: defineAsyncComponent(() => import('../components/StatCard.vue')),
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

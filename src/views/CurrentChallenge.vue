<template>
  <h1 class="text-h5 mb-1">
    The current Challenge is ...  {{ challenge.icon }} {{ challenge.title }}  {{ challenge.icon }}
  </h1>

  <h2 class="text-h6 mb-1">
    {{ challenge.subtitle }}
  </h2>

  <v-row>
    <v-col cols="12" lg="6">
      <blockquote class="blockquote">
        <p class="mb-2">
          {{ challenge.icon }} Join other food price enthousiast (such as {{ challenge.topContributors[0]?.user_id || "you?" }}) in gathering information about {{ challenge.title }} {{ challenge.subtitle }}.
        </p>
        <p class="mb-2">
          {{ challenge.icon }} Your goal is to go nearby stores, find corresponding products and 
          <v-btn to="/prices/add" variant="text" density="compact">
            adding prices
          </v-btn>
        </p>
        <p class="mb-2">
          {{ challenge.icon }} This challenge categories are 
          <v-chip v-for="category in challenge.categories" :key="category" density="compact" label class="mr-2 mb-2" @click="$router.push({ path: `/categories/${category}` })">
            {{ category }}
          </v-chip>
        </p>
      </blockquote>
    </v-col>
    <v-col cols="12" lg="6">
      <ChallengeTimeline :challenge="challenge" />
    </v-col>
  </v-row>
  
  <ChallengeExample :exampleId="challenge.exampleId" />

  <v-divider :thickness="2" class="border-opacity-100 mt-5 mb-3" />

  <v-row>
    <v-col cols="12" md="6">
      <h2 class="text-h6 mb-1">
        General stats
      </h2>

      <v-row>
        <v-col cols="6">
          <StatCard :value="challenge.numberOfContributions" :subtitle="'Total number of prices added'" />
        </v-col>
        <v-col cols="6">
          <StatCard :value="challenge.numberOfContributors" :subtitle="'Total number of contributors'" />
        </v-col>
      </v-row>
    </v-col>
    
    <v-col cols="12" md="6">
      <h2 v-if="username" class="text-h6 mb-1">
        Your stats
      </h2>
      <v-row v-if="username">
        <v-col cols="6">
          <StatCard :value="challenge.userContributions" :subtitle="'Prices added by you'" />
        </v-col>
        <v-col cols="6">
          <v-card :title="`${challenge.userRank == 0 ? '50+' : challenge.userRank} / ${challenge.numberOfContributors}`" :subtitle="'Your rank'" variant="tonal" density="compact" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  
  <v-row>
    <v-col cols="12" md="6">
      <ChallengeTopContributors :topContributors="challenge.topContributors" />
    </v-col>
    
    <v-col v-if="challenge.latestContributions.length" cols="12" md="6">
      <h2 class="text-h6 mb-1">
        Number of contributions per day
      </h2>
      <PriceChart :priceList="challenge.latestContributions" aggregate="count" dateField="created" />
    </v-col>
  </v-row>

  <h2 class="text-h6 mb-1">
    Most recent contributions
  </h2>
  <v-row v-if="challenge.latestContributions">
    <v-col v-for="price in challenge.latestContributions.slice(0, 10)" :key="price" cols="12" sm="6" md="4" xl="3">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import api from '../services/api.js'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'

export default {
  components: {
    StatCard: defineAsyncComponent(() => import('../components/StatCard.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    PriceChart: defineAsyncComponent(() => import('../components/PriceChart.vue')),
    ChallengeTimeline: defineAsyncComponent(() => import('../components/ChallengeTimeline.vue')),
    ChallengeExample: defineAsyncComponent(() => import('../components/ChallengeExample.vue')),
    ChallengeTopContributors: defineAsyncComponent(() => import('../components/ChallengeTopContributors.vue')),
  },
  data() {
    return {
      challenge: {
        title: "MILK",
        subtitle: "(and milk alternatives)",
        icon: "🥛",
        startDate: "2024-09-01",
        endDate: "2024-10-31",
        categories: ["en:milk-substitutes", "en:milks"],
        topContributors: [],
        numberOfContributors: 0,
        numberOfContributions: 0,
        latestContributions: [],
        userContributions: 0,
        userRank: 0,
        exampleId: 32900
      },
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
    this.getStats()
  },
  methods: {
    getStats() {
      this.loading = true
      // TODO: This should fetch only prices matching one of the product categories in this.challenge.categories
      // TODO: Also, this is both used to show a few recent contribution and to display the number of contributions per day
      //       The first requires only a size of 10, the second requires the entire data, so it probably should be another API point
      api.getPrices({ size: 200, created__gte: this.challenge.startDate, created__lte: this.challenge.endDate })
      .then((data) => {
        this.challenge.latestContributions = data.items
        this.challenge.numberOfContributions = data.total
        this.loading = false
      })

      // TODO: this should only fetch users that contributed to one of the product categories in this.challenge.categories, in the designated time range
      api.getUsers({ order_by: constants.USER_ORDER_LIST[0].key, size: 50})
      .then((data) => {
        this.challenge.topContributors = data.items
        this.challenge.numberOfContributors = data.total
        for (let i = 0; i < data.items.length; i++) {
          const user = data.items[i]
          if (this.username && this.username == user.user_id) {
            this.challenge.userRank = i
            break
          }
        }
      })
      if (this.username) {
        // TODO: This should fetch only prices matching one of the product categories in this.challenge.categories
        api.getPrices({ owner: this.username, created__gte: this.challenge.startDate, created__lte: this.challenge.endDate })
        .then((data) => {
          this.challenge.userContributions = data.total
        })
      }
      
    }
  }
}
</script>

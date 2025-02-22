<template>
  <v-row>
    <v-col cols="12" md="6">
      <p class="mb-2">
        {{ $t('Challenge.Subtitle', {challenge_title: `${challenge.icon} ${challenge.title} ${challenge.icon}`, challenge_subtitle: challenge.subtitle}) }}
      </p>
      <p v-if="challenge.categories.length">
        <CategoryTagChip v-for="category in challenge.categories" :key="category" :category="{id: category, name: category}" />
      </p>
    </v-col>
    <v-col cols="12" md="6">
      <ChallengeTimeline :challenge="challenge" />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="6">
      <ChallengeTakePicturesCard :challenge="challenge" />
    </v-col>
    <v-col cols="12" md="6">
      <ChallengeValidateCard :challenge="challenge" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="challenge.latestContributions.length">
    <v-col cols="12">
      <h2 class="text-h6">
        {{ $t('Challenge.MostRecentContributions') }}
      </h2>
    </v-col>
    <v-col v-for="price in challenge.latestContributions.slice(0, 10)" :key="price" cols="12" sm="6" md="4" xl="3">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api.js'
import utils from '../utils.js'

export default {
  components: {
    CategoryTagChip: defineAsyncComponent(() => import('../components/CategoryTagChip.vue')),
    ChallengeTimeline: defineAsyncComponent(() => import('../components/ChallengeTimeline.vue')),
    ChallengeTakePicturesCard: defineAsyncComponent(() => import('../components/ChallengeTakePicturesCard.vue')),
    ChallengeValidateCard: defineAsyncComponent(() => import('../components/ChallengeValidateCard.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
  },
  data() {
    return {
      challenge: {
        title: "Nutella",
        icon: "🌰",
        subtitle: "(and other hazelnut spreads)",
        startDate: "2025-01-20",
        endDate: "2025-02-20",
        categories: ["en:hazelnut-spreads"],
        numberOfContributions: 0,
        latestContributions: [],
        numberOfProofs: 0,
        userContributions: 0,
        userProofContributions: 0,
        exampleProofUrl: "https://prices.openfoodfacts.org/img/0029/nCWeCVnpQJ.webp"
      },
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    startDateMidnight() {
      return utils.dateStartOfDay(this.challenge.startDate)
    },
    endDateMidnight() {
      return utils.dateEndOfDay(this.challenge.endDate)
    },
    defaultParams() {
      return { created__gte: this.startDateMidnight, created__lte: this.endDateMidnight }
    }
  },
  mounted() {
    this.getStats()
    this.getLatestPrices()
  },
  methods: {
    getStats() {
      this.loading = true
      api.getPriceStats({ ...this.defaultParams, product__categories_tags__contains: this.challenge.categories[0] })
      .then((data) => {
        this.challenge.numberOfContributions = data.price__count
        this.loading = false
      })

      api.getProofs({ ...this.defaultParams, size: 1 })
      .then((data) => {
        this.challenge.numberOfProofs = data.total
      })

      if (this.username) {
        api.getPriceStats({ ...this.defaultParams, product__categories_tags__contains: this.challenge.categories[0], owner: this.username })
        .then((data) => {
          this.challenge.userContributions = data.price__count
        })
        api.getProofs({ ...this.defaultParams, owner: this.username, size: 1 })
        .then((data) => {
          this.challenge.userProofContributions = data.total
        })
      }
    },
    getLatestPrices() {
      api.getPrices({ ...this.defaultParams, product__categories_tags__contains: this.challenge.categories[0], size: 10 })
      .then((data) => {
        this.challenge.latestContributions = data.items
      })
    }
  }
}
</script>

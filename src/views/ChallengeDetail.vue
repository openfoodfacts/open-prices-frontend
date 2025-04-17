<template>
  <v-row v-if="!challenge && !loading">
    <v-col cols="12" md="6">
      {{ $t('Challenge.NoChallengeCurrentlyOngoing') }}
    </v-col>
  </v-row>
  <v-row v-if="challenge">
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

  <v-row v-if="challenge">
    <v-col cols="12" md="6">
      <ChallengeTakePicturesCard :challenge="challenge" />
    </v-col>
    <v-col cols="12" md="6">
      <ChallengeValidateCard :challenge="challenge" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="challenge?.latestContributions?.length">
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
      loading: false,
      challenge: null
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    startDateMidnight() {
      return utils.dateStartOfDay(this.challenge.start_date)
    },
    endDateMidnight() {
      return utils.dateEndOfDay(this.challenge.end_date)
    },
    defaultParams() {
      return { created__gte: this.startDateMidnight, created__lte: this.endDateMidnight }
    }
  },
  mounted() {
    this.getChallenge()
  },
  methods: {
    getChallenge() {
      this.loading = true
      let params = {}
      if (this.$route.params.id) {
        params.id = this.$route.params.id
      } else {
        // No id specified, get the current challenge
        params.status = "ONGOING"
      }
      api.getChallenges(params)
      .then((data) => {
        this.loading = false
        if (data.items.length) {
          this.challenge = data.items[0]
          this.getStats()
          this.getLatestPrices()
        }
      })
    },
    async getStats() {
      this.loading = true
      let priceCount = 0
      for (let i = 0; i < this.challenge.categories.length; i++) {
        const data = await api.getPriceStats({ ...this.defaultParams, product__categories_tags__contains: this.challenge.categories[i] })
        priceCount += data.price__count
      }
      this.challenge.numberOfContributions = priceCount

      const proofsStats = await api.getProofs({ ...this.defaultParams, size: 1 })
      this.challenge.numberOfProofs = proofsStats.total

      if (this.username) {
        let userPriceCount = 0
        for (let i = 0; i < this.challenge.categories.length; i++) {
          const data = await api.getPriceStats({ ...this.defaultParams, product__categories_tags__contains: this.challenge.categories[i], owner: this.username })
          userPriceCount += data.price__count
        }
        this.challenge.userContributions = userPriceCount
        const userProofsStats = await api.getProofs({ ...this.defaultParams, owner: this.username, size: 1 })
        this.challenge.userProofContributions = userProofsStats.total
      }
    },
    async getLatestPrices() {
      let items = []
      for (let i = 0; i < this.challenge.categories.length; i++) {
        const data = await api.getPrices({ ...this.defaultParams, product__categories_tags__contains: this.challenge.categories[i], size: 10 })
        items = items.concat(data.items)
      }
      this.challenge.latestContributions = items.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10)
    }
  }
}
</script>

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
        <CategoryTagChip v-for="category in challenge.categories" :key="category" :category="{id: category, name: category}" class="mr-1" />
      </p>
      <p v-if="challenge.locations.length">
        <LocationChip v-for="location in challenge.locations" :key="location.id" :location="location" :locationId="location.id" class="mr-1" />
      </p>
    </v-col>
    <v-col cols="12" md="6">
      <ChallengeTimeline :challenge="challenge" />
    </v-col>
  </v-row>

  <v-row v-if="challenge">
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        {{ $t('About.HowContribute') }}
      </h2>
    </v-col>
    <v-col cols="12" md="6">
      <ChallengeTakePicturesCard :challenge="challenge" />
    </v-col>
    <v-col cols="12" md="6">
      <ChallengeValidateCard :challenge="challenge" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="challenge?.latestContributions?.length">
    <v-col cols="12" class="pb-0">
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

export default {
  components: {
    CategoryTagChip: defineAsyncComponent(() => import('../components/CategoryTagChip.vue')),
    LocationChip: defineAsyncComponent(() => import('../components/LocationChip.vue')),
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
    defaultParams() {
      return { 
        tags__contains: `challenge-${this.challenge.id}`
      }
    },
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
    getStats() {
      this.loading = true
      api.getPriceStats(this.defaultParams)
      .then((data) => {
        this.challenge.numberOfContributions = data.price__count
        this.loading = false
      })

      api.getProofs({ ...this.defaultParams, size: 1 })
      .then((data) => {
        this.challenge.numberOfProofs = data.total
      })

      if (this.username) {
        api.getPriceStats({ ...this.defaultParams, owner: this.username })
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
      api.getPrices({ ...this.defaultParams, size: 10 })
      .then((data) => {
        this.challenge.latestContributions = data.items
      })
    }
  }
}
</script>

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

  <v-row v-if="challenge?.stats">
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        {{ $t('Challenge.StatsAndRankings') }}
      </h2>
    </v-col>
    <v-col>
      <v-row>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="challenge.numberOfProofs" :subtitle="$t('Common.Pictures')" :to="getChallengeProofListUrl" />
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="challenge.numberOfContributions" :subtitle="$t('Common.Prices')" :to="getChallengePriceListUrl" />
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="challenge.stats.user_count" :subtitle="$t('Common.Contributors')" />
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="challenge.stats.proof_location_count" :subtitle="$t('Common.Locations')" />
        </v-col>
        <v-col cols="6" sm="4" md="3" lg="2">
          <StatCard :value="challenge.stats.price_product_count" :subtitle="$t('Common.Products')" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <RankingTableCard class="mb-4" :title="$t('Challenge.MostPicturesAdded')" :items="challenge.stats.user_proof_count_ranking" :hideRank="true" />
          <RankingTableCard class="mb-4" :title="$t('Challenge.MostPricesAdded')" :items="challenge.stats.user_price_count_ranking" :hideRank="true" />
          <RankingTableCard :title="$t('Challenge.MostPricesFromPicturesAdded')" :items="challenge.stats.user_price_from_proof_count_ranking" :hideRank="true" />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <RankingTableCard class="mb-4" :title="$t('Common.TopLocations')" :items="challenge.stats.location_price_count_ranking" :hideRank="true" />
          <RankingTableCard class="mb-4" :title="$t('Common.TopCities')" :items="challenge.stats.location_city_price_count_ranking" :hideRank="true" />
          <RankingTableCard :title="$t('Common.TopCountries')" :items="challenge.stats.location_country_price_count_ranking" :hideRank="true" />
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <RankingTableCard :title="$t('Common.TopProducts')" :items="challenge.stats.product_price_count_ranking" :hideRank="true" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <StatsLastUpdatedAlert v-if="challenge.stats?.updated" :lastUpdated="challenge.stats.updated" />
    </v-col>
  </v-row>

  <v-row v-if="challenge?.latestContributions?.length">
    <v-col cols="12" class="pb-0">
      <h2 class="text-h6">
        {{ $t('Challenge.MostRecentContributions') }}
      </h2>
    </v-col>
    <v-col v-for="price in displayedPriceList" :key="price" cols="12" sm="6" md="4" xl="3">
      <PriceCard :price="price" :product="price.product" elevation="1" height="100%" />
    </v-col>
    <v-col cols="12" sm="6" md="4" xl="3" align="center">
      <br v-if="$vuetify.display.smAndUp"><!-- TODO: center vertically instead of br -->
      <br v-if="$vuetify.display.smAndUp">
      <v-btn
        v-if="displayedPriceList.length"
        color="primary"
        :block="!$vuetify.display.smAndUp"
        :to="getChallengePriceListUrl"
        prepend-icon="mdi-tag-multiple-outline"
        append-icon="mdi-arrow-right"
      >
        {{ $t('Common.PricesAll') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import openPricesApi from '../services/openPricesApi'

export default {
  components: {
    CategoryTagChip: defineAsyncComponent(() => import('../components/CategoryTagChip.vue')),
    LocationChip: defineAsyncComponent(() => import('../components/LocationChip.vue')),
    ChallengeTimeline: defineAsyncComponent(() => import('../components/ChallengeTimeline.vue')),
    ChallengeTakePicturesCard: defineAsyncComponent(() => import('../components/ChallengeTakePicturesCard.vue')),
    ChallengeValidateCard: defineAsyncComponent(() => import('../components/ChallengeValidateCard.vue')),
    StatCard: defineAsyncComponent(() => import('../components/StatCard.vue')),
    RankingTableCard: defineAsyncComponent(() => import('../components/RankingTableCard.vue')),
    StatsLastUpdatedAlert: defineAsyncComponent(() => import('../components/StatsLastUpdatedAlert.vue')),
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
    getChallengeProofListUrl() {
      return `/challenges/${this.challenge.id}/proofs`
    },
    getChallengePriceListUrl() {
      return `/challenges/${this.challenge.id}/prices`
    },
    displayedPriceList() {
      return this.challenge?.latestContributions.slice(0, 10) || []
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
        params.status = 'ONGOING'
        params.order_by = '-created'
      }
      openPricesApi.getChallenges(params)
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
      openPricesApi.getPriceStats(this.defaultParams)
      .then((data) => {
        this.challenge.numberOfContributions = data.price__count
        this.loading = false
      })

      openPricesApi.getProofs({ ...this.defaultParams, size: 1 })
      .then((data) => {
        this.challenge.numberOfProofs = data.total
      })

      if (this.username) {
        openPricesApi.getPriceStats({ ...this.defaultParams, owner: this.username })
        .then((data) => {
          this.challenge.userContributions = data.price__count
        })
        openPricesApi.getProofs({ ...this.defaultParams, owner: this.username, size: 1 })
        .then((data) => {
          this.challenge.userProofContributions = data.total
        })
      }
    },
    getLatestPrices() {
      openPricesApi.getPrices({ ...this.defaultParams, size: 10 })
      .then((data) => {
        this.challenge.latestContributions = data.items
      })
    },
  }
}
</script>

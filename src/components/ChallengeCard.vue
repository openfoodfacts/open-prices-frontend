<template>
  <v-card :id="'challenge_' + challenge.id" :to="getChallengeUrl">
    <template #title>
      <span :title="getChallengeTitle">{{ getChallengeTitle }}</span>
    </template>

    <v-card-text>
      <ChallengeStatusChip class="mr-1" :challengeStatus="challenge.status" />
      <DateChip class="mr-1" :date="challenge.start_date" />
      <DateChip :date="challenge.end_date" />
      <div v-if="challenge.categories.length" class="mt-1">
        <CategoryTagChip v-for="category in challenge.categories" :key="category" :category="{id: category, name: category}" class="mr-1" />
      </div>
      <div v-if="challenge.locations.length" class="mt-1">
        <LocationCountChip class="mr-1" :count="challenge.locations.length" :withLabel="true" />
      </div>
    </v-card-text>

    <v-divider v-if="challenge.status !== 'UPCOMING'" />

    <v-card-text v-if="challenge.status !== 'UPCOMING'">
      <PriceCountChip class="mr-1" :count="challenge.stats.price_count" :withLabel="true" />
      <ProofCountChip class="mr-1" :count="challenge.stats.proof_count" :withLabel="true" />
      <LocationCountChip class="mr-1" :count="challenge.stats.proof_location_count" :withLabel="true" />
      <ProductCountChip class="mr-1" :count="challenge.stats.price_product_count" :withLabel="true" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    CategoryTagChip: defineAsyncComponent(() => import('../components/CategoryTagChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
    ChallengeStatusChip: defineAsyncComponent(() => import('../components/ChallengeStatusChip.vue')),
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    ProofCountChip: defineAsyncComponent(() => import('../components/ProofCountChip.vue')),
    LocationCountChip: defineAsyncComponent(() => import('../components/LocationCountChip.vue')),
    ProductCountChip: defineAsyncComponent(() => import('../components/ProductCountChip.vue')),
  },
  props: {
    challenge: {
      type: Object,
      default: null,
      example: {
        "id":1,
        "title":"Nutella",
        "icon":"🌰",
        "subtitle":"(and other hazelnut spreads)",
        "start_date":"2022-03-11",
        "end_date":"2025-04-17",
        "categories":["en:hazelnut-spreads"],
        "example_proof_url": constants.PROOF_TYPE_PRICE_TAG_IMAGE_URL,
        "is_published":true,
        "status":"ONGOING",
        "created":"2025-03-17T21:21:58.071163Z",
        "updated":"2025-03-21T20:12:51.379142Z"
      }
    },
  },
  computed: {
    getChallengeTitle() {
      return this.challenge ? `${this.challenge.icon} ${this.challenge.title}` : ''
    },
    getChallengeUrl() {
      return this.challenge ? `/challenges/${this.challenge.id}` : ''
    }
  },
}
</script>

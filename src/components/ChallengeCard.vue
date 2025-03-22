<template>
  <v-card :id="'challenge_' + challenge.id" :class="'border-transparent'" @click="goToChallenge(challenge)">
    <template #title>
      {{ challenge.icon }} {{ challenge.title }} {{ challenge.subtitle }}
    </template>

    <v-divider />

    <v-card-text>
      <ChallengeStatusChip :challengeStatus="challenge.status" class="mr-1" />
      <DateChip :date="challenge.start_date" class="mr-1" />
      <DateChip :date="challenge.end_date" />
      <div v-if="challenge.categories.length" class="mt-1">
        <CategoryTagChip v-for="category in challenge.categories" :key="category" :category="{id: category, name: category}" class="mr-1" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    CategoryTagChip: defineAsyncComponent(() => import('../components/CategoryTagChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
    ChallengeStatusChip: defineAsyncComponent(() => import('../components/ChallengeStatusChip.vue'))
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
        "example_proof_url":"https://prices.openfoodfacts.org/img/0029/nCWeCVnpQJ.webp",
        "is_published":true,
        "status":"ONGOING",
        "created":"2025-03-17T21:21:58.071163Z",
        "updated":"2025-03-21T20:12:51.379142Z"
      }
    },
  },
  methods: {
    goToChallenge(challenge) {
      this.$router.push({ path: `/challenges/${challenge.id}` })
    }
  }
}
</script>

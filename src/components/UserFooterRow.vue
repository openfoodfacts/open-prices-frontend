<template>
  <v-row>
    <v-col :cols="hideActionMenuButton ? '12' : '11'">
      <span class="chip-group">
        <PriceCountChip :count="user.price_count" :withLabel="true" />
        <CurrencyCountChip :count="user.currency_count" :withLabel="true" />
        <LocationCountChip :count="user.location_count" :withLabel="true" />
        <CountryCountChip :count="user.location_type_osm_country_count" :withLabel="true" />
        <ProductCountChip :count="user.product_count" :withLabel="true" />
        <ProofCountChip :count="user.proof_count" :withLabel="true" :to="getUserProofListUrl" />
        <ChallengeCountChip :count="user.challenge_count" :withLabel="true" />
      </span>
    </v-col>
    <v-col v-if="!hideActionMenuButton" cols="1">
      <UserActionMenuButton :user="user" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    CurrencyCountChip: defineAsyncComponent(() => import('../components/CurrencyCountChip.vue')),
    LocationCountChip: defineAsyncComponent(() => import('../components/LocationCountChip.vue')),
    CountryCountChip: defineAsyncComponent(() => import('../components/CountryCountChip.vue')),
    ProductCountChip: defineAsyncComponent(() => import('../components/ProductCountChip.vue')),
    ProofCountChip: defineAsyncComponent(() => import('../components/ProofCountChip.vue')),
    ChallengeCountChip: defineAsyncComponent(() => import('../components/ChallengeCountChip.vue')),
    UserActionMenuButton: defineAsyncComponent(() => import('../components/UserActionMenuButton.vue'))
  },
  props: {
    user: {
      type: Object,
      default: null
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getUserProofListUrl() {
      return `/users/${this.user.user_id}/proofs`
    },
  },
}
</script>

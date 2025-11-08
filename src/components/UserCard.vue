<template>
  <v-card
    :title="user.user_id"
    prepend-icon="mdi-account"
    data-name="user-card"
    @click="goToUser(user)"
  >
    <v-card-text>
      <v-row>
        <v-col :cols="hideActionMenuButton ? '12' : '11'">
          <PriceCountChip class="mr-1" :count="user.price_count" :withLabel="true" />
          <CurrencyCountChip class="mr-1" :count="user.currency_count" :withLabel="true" />
          <LocationCountChip class="mr-1" :count="user.location_count" :withLabel="true" />
          <CountryCountChip class="mr-1" :count="user.location_type_osm_country_count" :withLabel="true" />
          <ProductCountChip class="mr-1" :count="user.product_count" :withLabel="true" />
          <ProofCountChip class="mr-1" :count="user.proof_count" :withLabel="true" :to="getUserProofListUrl" />
          <ChallengeCountChip class="mr-1" :count="user.challenge_count" :withLabel="true" />
        </v-col>
        <v-col v-if="!hideActionMenuButton" cols="1">
          <UserActionMenuButton v-if="!hideActionMenuButton" :user="user" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
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
    UserActionMenuButton: defineAsyncComponent(() => import('../components/UserActionMenuButton.vue')),
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getUserProofListUrl() {
      return `/users/${this.user.user_id}/proofs`
    }
  },
  methods: {
    goToUser(user) {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/users/${user.user_id}` })
    },
  }
}
</script>

<template>
  <v-row>
    <v-col :cols="hideActionMenuButton ? '12' : '11'">
      <span class="chip-group">
        <PriceCountChip :count="user.price_count" :withLabel="true" />
        <CountChip kind="currency" :count="user.currency_count" :withLabel="true" />
        <CountChip kind="location" :count="user.location_count" :withLabel="true" />
        <CountChip kind="country" :count="user.location_type_osm_country_count" :withLabel="true" />
        <CountChip kind="product" :count="user.product_count" :withLabel="true" />
        <CountChip kind="proof" :count="user.proof_count" :withLabel="true" :to="getUserProofListUrl" />
        <CountChip kind="challenge" :count="user.challenge_count" :withLabel="true" />
        <CountChip kind="badge" :count="user.badge_count" :withLabel="true" :to="getUserBadgeListUrl" />
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
    CountChip: defineAsyncComponent(() => import('../components/CountChip.vue')),
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
    getUserBadgeListUrl() {
      return `/users/${this.user.user_id}/badges`
    },
  }
}
</script>

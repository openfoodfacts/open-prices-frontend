<template>
  <v-card v-if="user" :id="'user_' + user.user_id" data-name="user-card">
    <v-card-text class="pa-2">
      <v-row>
        <v-col class="pr-0" style="max-width:20%;">
          <v-img :src="userImageDefault" width="100px" style="filter:invert(.9);" />
        </v-col>
        <v-col style="max-width:80%;">
          <v-row>
            <v-col @click="clickUser()">
              <h3>{{ user.user_id }}</h3>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="mt-0">
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
          <UserActionMenuButton :user="user" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

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
  data() {
    return {
      userImageDefault: constants.USER_IMAGE_DEFAULT_URL,
    }
  },
  computed: {
    getUserProofListUrl() {
      return `/users/${this.user.user_id}/proofs`
    }
  },
  methods: {
    clickUser() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/users/${this.user.user_id}` })
    },
  }
}
</script>

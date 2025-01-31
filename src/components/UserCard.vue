<template>
  <v-card
    :title="user.user_id"
    prepend-icon="mdi-account"
    data-name="user-card"
    @click="goToUser(user)"
  >
    <v-card-text>
      <v-row>
        <v-col cols="11">
          <PriceCountChip :count="user.price_count" :withLabel="true" />
          <v-chip v-if="user.location_count" label size="small" density="comfortable" class="mr-1">
            <v-icon start icon="mdi-map-marker-outline" />
            <span id="location-count">{{ $t('Common.LocationCount', { count: user.location_count }) }}</span>
          </v-chip>
          <v-chip v-if="user.product_count" label size="small" density="comfortable" class="mr-1">
            <v-icon start icon="mdi-database-outline" />
            <span id="product-count">{{ $t('Common.ProductCount', { count: user.product_count }) }}</span>
          </v-chip>
          <v-chip v-if="user.proof_count" label size="small" density="comfortable" :to="getUserProofListUrl">
            <v-icon start icon="mdi-image" />
            <span id="proof-count">{{ $t('Common.ProofCount', { count: user.proof_count }) }}</span>
          </v-chip>
        </v-col>
      </v-row>

      <UserActionMenuButton v-if="!hideActionMenuButton" :user="user" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
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

<template>
  <v-row>
    <v-col :cols="hideActionMenuButton ? '12' : '11'" class="pt-2 pb-2">
      <PriceCountChip class="mr-1" :count="location.price_count" :withLabel="true" source="location" @click="goToLocation()" />
      <UserCountChip class="mr-1" :count="location.user_count" :withLabel="true" />
      <ProductCountChip class="mr-1" :count="location.product_count" :withLabel="true" />
      <ProofCountChip :count="location.proof_count" :withLabel="true" :to="getLocationProofListUrl" />
    </v-col>
    <v-col v-if="!hideActionMenuButton" cols="1">
      <LocationActionMenuButton :location="location" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    UserCountChip: defineAsyncComponent(() => import('../components/UserCountChip.vue')),
    ProductCountChip: defineAsyncComponent(() => import('../components/ProductCountChip.vue')),
    ProofCountChip: defineAsyncComponent(() => import('../components/ProofCountChip.vue')),
    LocationActionMenuButton: defineAsyncComponent(() => import('../components/LocationActionMenuButton.vue'))
  },
  props: {
    location: {
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
    getLocationProofListUrl() {
      return `/locations/${this.location.id}/proofs`
    },
  },
  methods: {
    goToLocation() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/locations/${this.location.id}` })
    },
  }
}
</script>

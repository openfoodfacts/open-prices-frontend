<template>
  <v-row>
    <v-col :cols="hideActionMenuButton ? '12' : '11'">
      <span class="chip-group">
        <PriceCountChip :count="location.price_count" :withLabel="true" source="location" @click="goToLocation()" />
        <CountChip kind="user" :count="location.user_count" :withLabel="true" />
        <CountChip kind="product" :count="location.product_count" :withLabel="true" />
        <CountChip kind="proof" :count="location.proof_count" :withLabel="true" :to="getLocationProofListUrl" />
      </span>
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
    CountChip: defineAsyncComponent(() => import('../components/CountChip.vue')),
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
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

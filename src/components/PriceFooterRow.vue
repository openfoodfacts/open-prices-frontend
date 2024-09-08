<template>
  <v-row style="margin-top:0;">
    <v-col cols="11">
      <LocationChip v-if="!hidePriceLocation" class="mr-1" :location="price.location" :locationId="price.location_id" :readonly="readonly" />
      <DateChip class="mr-1" :date="price.date" :readonly="readonly" />
      <ProofChip v-if="price.proof && !hidePriceProof" class="mr-1" :proof="price.proof" />
    </v-col>
  </v-row>

  <PriceActionMenuButton :price="price" :hideProductActions="hideProductDetails" />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    LocationChip: defineAsyncComponent(() => import('../components/LocationChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
    ProofChip: defineAsyncComponent(() => import('../components/ProofChip.vue')),
    PriceActionMenuButton: defineAsyncComponent(() => import('../components/PriceActionMenuButton.vue')),
  },
  props: {
    price: {
      type: Object,
      default: null
    },
    hidePriceLocation: {
      type: Boolean,
      default: false
    },
    hidePriceProof: {
      type: Boolean,
      default: false
    },
    hideProductDetails: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
  }
}
</script>

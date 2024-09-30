<template>
  <v-row style="margin-top:0;">
    <v-col cols="11">
      <LocationChip v-if="!hidePriceLocation" class="mr-1" :location="price.location" :locationId="price.location_id" :readonly="readonly" />
      <UserChip v-if="!hidePriceOwner" class="mr-1" :username="price.owner" :readonly="readonly" />
      <DateChip v-if="!hidePriceDate" class="mr-1" :date="price.date" :readonly="readonly" />
      <ProofChip v-if="price.proof && !hidePriceProof" class="mr-1" :proof="price.proof" />
      <RelativeDateTimeChip v-if="!hidePriceCreated" :dateTime="price.created" />
    </v-col>
  </v-row>

  <PriceActionMenuButton :price="price" :hideProductActions="hideProductDetails" @delete="$emit('delete')" />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    LocationChip: defineAsyncComponent(() => import('../components/LocationChip.vue')),
    UserChip: defineAsyncComponent(() => import('../components/UserChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
    ProofChip: defineAsyncComponent(() => import('../components/ProofChip.vue')),
    RelativeDateTimeChip: defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
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
    hidePriceOwner: {
      type: Boolean,
      default: true
    },
    hidePriceDate: {
      type: Boolean,
      default: false
    },
    hidePriceProof: {
      type: Boolean,
      default: false
    },
    hidePriceCreated: {
      type: Boolean,
      default: true
    },
    hideProductDetails: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  emits: ['delete']
}
</script>

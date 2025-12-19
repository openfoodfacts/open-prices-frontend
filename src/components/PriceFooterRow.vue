<template>
  <v-row>
    <v-col :cols="hideActionMenuButton ? '12' : '11'">
      <span class="chip-group">
        <ProofChip v-if="price.proof && !hidePriceProof" :proof="price.proof" />
        <LocationChip v-if="!hidePriceLocation" :location="price.location" :locationId="price.location_id" :readonly="readonly" />
        <UserChip v-if="!hidePriceOwner" :username="price.owner" :readonly="readonly" />
        <DateChip v-if="!hidePriceDate" :date="price.date" :readonly="readonly" />
        <UserCommentChip v-if="price.owner_comment" :comment="price.owner_comment" />
        <RelativeDateTimeChip v-if="!hidePriceCreated" :dateTime="price.created" />
      </span>
    </v-col>
    <v-col v-if="!hideActionMenuButton" cols="1">
      <PriceActionMenuButton :price="price" :hideProductActions="hideProductDetailsRow" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ProofChip: defineAsyncComponent(() => import('../components/ProofChip.vue')),
    LocationChip: defineAsyncComponent(() => import('../components/LocationChip.vue')),
    UserChip: defineAsyncComponent(() => import('../components/UserChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
    RelativeDateTimeChip: defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
    UserCommentChip: defineAsyncComponent(() => import('../components/UserCommentChip.vue')),
    PriceActionMenuButton: defineAsyncComponent(() => import('../components/PriceActionMenuButton.vue')),
  },
  props: {
    price: {
      type: Object,
      default: null
    },
    hidePriceProof: {
      type: Boolean,
      default: false
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
    hidePriceCreated: {
      type: Boolean,
      default: true
    },
    hideProductDetailsRow: {
      type: Boolean,
      default: false
    },
    hideActionMenuButton: {
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

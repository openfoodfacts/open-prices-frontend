<template>
  <v-row style="margin-top:0;">
    <v-col :cols="userIsPriceOwner ? '11' : '12'">
      <PriceLocationChip v-if="!hidePriceLocation" class="mr-1" :price="price" :readonly="readonly" />
      <PriceOwnerChip class="mr-1" :price="price" :readonly="readonly" />
      <RelativeDateTimeChip class="mr-1" :dateTime="price.created" />
      <PriceProof v-if="price.proof && !hidePriceProof" :proof="price.proof" />
    </v-col>
  </v-row>

  <PriceActionMenuButton v-if="userIsPriceOwner" :price="price" />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'

export default {
  components: {
    PriceLocationChip: defineAsyncComponent(() => import('../components/PriceLocationChip.vue')),
    PriceOwnerChip: defineAsyncComponent(() => import('../components/PriceOwnerChip.vue')),
    RelativeDateTimeChip: defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
    PriceProof: defineAsyncComponent(() => import('../components/PriceProof.vue')),
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
    readonly: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    userIsPriceOwner() {
      return this.username && (this.price.owner === this.username)
    }
  }
}
</script>

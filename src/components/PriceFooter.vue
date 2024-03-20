<template>
  <v-row style="margin-top:0;">
    <v-col :cols="userIsPriceOwner ? '11' : '12'">
      <PriceLocationChip v-if="!hidePriceLocation" class="mr-1" :price="price" :readonly="readonly"></PriceLocationChip>
      <PriceOwnerChip class="mr-1" :price="price" :readonly="readonly"></PriceOwnerChip>
      <RelativeDateTimeChip class="mr-1" :dateTime="price.created"></RelativeDateTimeChip>
      <PriceProof v-if="price.proof && !hidePriceProof" :proof="price.proof"></PriceProof>
    </v-col>
  </v-row>

  <PriceActionMenuButton v-if="userIsPriceOwner" :price="price"></PriceActionMenuButton>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'PriceLocationChip': defineAsyncComponent(() => import('../components/PriceLocationChip.vue')),
    'PriceOwnerChip': defineAsyncComponent(() => import('../components/PriceOwnerChip.vue')),
    'RelativeDateTimeChip': defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
    'PriceProof': defineAsyncComponent(() => import('../components/PriceProof.vue')),
    'PriceActionMenuButton': defineAsyncComponent(() => import('../components/PriceActionMenuButton.vue')),
  },
  props: {
    'price': null,
    'hidePriceLocation': false,
    'hidePriceProof': false,
    'readonly': false
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

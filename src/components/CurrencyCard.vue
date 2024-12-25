<template>
  <v-card :title="currency" prepend-icon="mdi-cash" data-name="currency-card">
    <v-card-text>
      <PriceCountChip :count="priceCount" :withLabel="true" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
  },
  props: {
    currency: {
      type: String,
      default: null
    },
    priceCount: {
      type: Number,
      default: 0
    }
  },
}
</script>

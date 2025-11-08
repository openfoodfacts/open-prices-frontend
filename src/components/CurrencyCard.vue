<template>
  <v-card :title="currency" prepend-icon="mdi-cash" data-name="currency-card">
    <v-card-text>
      <v-row>
        <v-col :cols="hideActionMenuButton ? '12' : '11'">
          <PriceCountChip :count="priceCount" :withLabel="true" />
        </v-col>
        <v-col v-if="!hideActionMenuButton" cols="1">
          <CurrencyActionMenuButton :currency="currency" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    CurrencyActionMenuButton: defineAsyncComponent(() => import('../components/CurrencyActionMenuButton.vue')),
  },
  props: {
    currency: {
      type: String,
      default: null
    },
    priceCount: {
      type: Number,
      default: 0
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false
    },
  },
}
</script>

<template>
  <v-row class="mt-0">
    <v-col cols="12" class="pt-2 pb-2">
      <PriceOrigins v-if="hasPriceOrigin" class="mr-1" :priceOrigins="price.origins_tags" />
      <PriceLabels v-if="hasPriceLabels" :priceLabels="price.labels_tags" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceOrigins: defineAsyncComponent(() => import('../components/PriceOrigins.vue')),
    PriceLabels: defineAsyncComponent(() => import('../components/PriceLabels.vue')),
  },
  props: {
    price: {
      type: Object,
      default: null
    },
  },
  computed: {
    hasPriceOrigin() {
      return this.price && !!this.price.origins_tags && this.price.origins_tags.length
    },
    hasPriceLabels() {
      return this.price && !!this.price.labels_tags && this.price.labels_tags.length
    },
  }
}
</script>

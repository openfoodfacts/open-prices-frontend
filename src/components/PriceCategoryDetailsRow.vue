<template>
  <v-row>
    <v-col cols="12" class="pt-2 pb-2">
      <span class="chip-group">
        <CategoryTagChip v-if="!hideCategoryChip" :category="price.category_tag" :localize="true" />
        <PriceOrigins v-if="hasPriceOrigin" :priceOrigins="price.origins_tags" />
        <PriceLabels v-if="hasPriceLabels" :priceLabels="price.labels_tags" />
      </span>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    CategoryTagChip: defineAsyncComponent(() => import('../components/CategoryTagChip.vue')),
    PriceOrigins: defineAsyncComponent(() => import('../components/PriceOrigins.vue')),
    PriceLabels: defineAsyncComponent(() => import('../components/PriceLabels.vue')),
  },
  props: {
    price: {
      type: Object,
      default: null
    },
    hideCategoryChip: {
      type: Boolean,
      default: true
    }
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

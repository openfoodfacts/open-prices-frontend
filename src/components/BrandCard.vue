<template>
  <v-card :title="brand" prepend-icon="mdi-factory" data-name="brand-card">
    <v-card-text>
      <ProductCountChip :count="productCount" :withLabel="true" />
      <BrandActionMenuButton :brand="brand" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ProductCountChip: defineAsyncComponent(() => import('../components/ProductCountChip.vue')),
    BrandActionMenuButton: defineAsyncComponent(() => import('../components/BrandActionMenuButton.vue'))
  },
  props: {
    brand: {
      type: String,
      default: null
    },
    productCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

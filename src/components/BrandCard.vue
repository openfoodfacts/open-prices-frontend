<template>
  <v-card :title="brand" prepend-icon="mdi-factory" data-name="brand-card">
    <v-card-text>
      <v-chip label size="small" density="comfortable" class="mr-1">
        <v-icon start icon="mdi-food-outline" />
        <span id="product-count">{{ $t('BrandDetail.BrandProductTotal', { count: productCount }) }}</span>
      </v-chip>
      <BrandActionMenuButton :brand="brand" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    BrandActionMenuButton: defineAsyncComponent(() => import('../components/BrandActionMenuButton.vue')),
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

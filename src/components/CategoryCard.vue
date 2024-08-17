<template>
  <v-card v-if="category" :title="category.name" prepend-icon="mdi-fruit-watermelon" data-name="category-card">
    <v-card-text>
      <PriceCountChip :count="priceCount" />
      <CategoryTagChip v-if="categoryFound && showProductCategoryTag" :category="category" />
      <CategoryActionMenuButton :category="category" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    CategoryTagChip: defineAsyncComponent(() => import('../components/CategoryTagChip.vue')),
    CategoryActionMenuButton: defineAsyncComponent(() => import('../components/CategoryActionMenuButton.vue')),
  },
  props: {
    category: {
      type: Object,
      default: null,
      example: { 'id': 'en:croissants', 'name': 'Croissants' }
    },
    priceCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapStores(useAppStore),
    showProductCategoryTag() {
      return this.appStore.user.username && this.appStore.user.product_display_category_tag
    },
    categoryFound() {
      return this.category && !this.category.status
    }
  }
}
</script>

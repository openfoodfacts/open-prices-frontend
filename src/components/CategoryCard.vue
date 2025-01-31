<template>
  <v-card v-if="category" :title="category.name" prepend-icon="mdi-fruit-watermelon" data-name="category-card">
    <v-card-text>
      <v-row>
        <v-col cols="11">
          <ProductCountChip v-if="sourceCategory" :count="productCount" :withLabel="true" />
          <PriceCountChip v-else-if="sourceProduct" :count="priceCount" />
          <CategoryTagChip v-if="showProductCategoryTag" class="mr-1" :category="category" :readonly="true" />
        </v-col>
      </v-row>

      <CategoryActionMenuButton v-if="!hideActionMenuButton" :category="category" :source="source" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'

export default {
  components: {
    ProductCountChip: defineAsyncComponent(() => import('../components/ProductCountChip.vue')),
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
    source: {
      type: String,
      default: 'category',
      examples: ['category', 'product']
    },
    productCount: {
      type: Number,
      default: 0
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
  computed: {
    ...mapStores(useAppStore),
    categoryFound() {
      return this.category && !this.category.status
    },
    sourceCategory() {
      return this.source === 'category'
    },
    sourceProduct() {
      return this.source === 'product'
    },
    showProductCategoryTag() {
      return this.appStore.user.username && this.sourceProduct && this.appStore.user.product_display_category_tag
    }
  }
}
</script>

<template>
  <v-card v-if="category" :title="category.name" prepend-icon="mdi-fruit-watermelon" data-name="category-card">
    <v-card-text>
      <v-row>
        <v-col :cols="hideActionMenuButton ? '12' : '11'">
          <span class="chip-group">
            <ProductCountChip v-if="sourceIsCategory" :count="productCount" :withLabel="true" />
            <PriceCountChip v-else-if="sourceIsProduct" :count="priceCount" />
            <CategoryTagChip v-if="showProductCategoryTag" :category="category" :readonly="true" />
          </span>
        </v-col>
        <v-col v-if="!hideActionMenuButton" cols="1">
          <CategoryActionMenuButton :category="category" :source="source" />
        </v-col>
      </v-row>
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
    sourceIsCategory() {
      return this.source === 'category'
    },
    sourceIsProduct() {
      return this.source === 'product'
    },
    showProductCategoryTag() {
      return this.appStore.user.username && this.sourceIsProduct && this.appStore.user.product_display_category_tag
    }
  }
}
</script>

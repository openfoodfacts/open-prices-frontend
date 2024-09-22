<template>
  <v-chip v-if="productCategories && productCategories.length" label size="small" density="comfortable" @click="showProductCategoriesDialog">
    <i>{{ $t('ProductCard.CategoryTotal', { count: productCategories.length }) }}</i>
    <ProductCategoriesDialog
      v-if="productCategories.length && productCategoriesDialog"
      v-model="productCategoriesDialog"
      :categories="productCategories"
      @close="productCategoriesDialog = false"
    />
  </v-chip>
  <v-chip v-else label size="small" density="comfortable" prepend-icon="mdi-help" color="warning">
    <i>{{ $t('ProductCard.CategoriesLower') }}</i>
    <v-tooltip activator="parent" open-on-click location="top">
      {{ $t('ProductCard.CategoriesMissing') }}
    </v-tooltip>
  </v-chip>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ProductCategoriesDialog: defineAsyncComponent(() => import('../components/ProductCategoriesDialog.vue')),
  },
  props: {
    productCategories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      productCategoriesDialog: false
    }
  },
  methods: {
    showProductCategoriesDialog() {
      this.productCategoriesDialog = true
    },
  }
}
</script>

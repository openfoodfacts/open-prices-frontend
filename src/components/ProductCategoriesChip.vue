<template>
  <v-chip v-if="productCategories.length" label size="small" density="comfortable" @click="showProductCategoriesDialog">
    {{ $t('ProductCard.CategoryTotal', { count: productCategories.length }) }}
  </v-chip>
  <v-chip v-else label size="small" density="comfortable" prepend-icon="mdi-help" color="warning">
    {{ $t('ProductCard.CategoriesLower') }}
    <v-tooltip activator="parent" open-on-click location="top">{{ $t('ProductCard.ProductCategoriesMissing') }}</v-tooltip>
  </v-chip>

  <ProductCategoriesDialog
    v-if="productCategories.length && productCategoriesDialog"
    :categories="productCategories"
    v-model="productCategoriesDialog"
    @close="productCategoriesDialog = false"
  ></ProductCategoriesDialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'ProductCategoriesDialog': defineAsyncComponent(() => import('../components/ProductCategoriesDialog.vue')),
  },
  props: {
    productCategories: {
      type: Array,
      default: []
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

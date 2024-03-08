<template>
  <v-chip label size="small" density="comfortable" class="mr-1" @click="showProductCategoriesDialog">
    {{ $t('ProductCard.CategoryTotal', { count: productCategories ? productCategories.length : 0 }) }}
  </v-chip>

  <ProductCategoriesDialog
    v-if="productCategories && productCategoriesDialog"
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
    productCategories: null,
  },
  data() {
    return {
      productCategoriesDialog: false
    }
  },
  computed: {
  },
  methods: {
    showProductCategoriesDialog() {
      this.productCategoriesDialog = true
    },
  }
}
</script>

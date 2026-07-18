<template>
  <template v-if="productBrands">
    <template v-if="productBrandsList.length <= 2">
      <BrandChip v-for="brand in productBrandsList" :key="brand" :brand="brand" :readonly="readonly" />
    </template>
    <v-chip v-else label size="small" density="comfortable" @click="showProductBrandsDialog">
      <i>{{ $t('ProductCard.BrandTotal', { count: productBrandsList.length }) }}</i>
    </v-chip>
    <ProductBrandsDialog
      v-if="productBrands.length && productBrandsDialog"
      v-model="productBrandsDialog"
      :brands="productBrandsList"
      :readonly="readonly"
      @close="productBrandsDialog = false"
    />
  </template>
  <v-chip v-else label size="small" density="comfortable" prepend-icon="mdi-help" color="warning">
    <i class="text-lowercase">{{ $t('Common.Brand') }}</i>
    <v-tooltip activator="parent" open-on-click location="top">
      {{ $t('ProductCard.BrandMissing') }}
    </v-tooltip>
  </v-chip>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    BrandChip: defineAsyncComponent(() => import('../components/BrandChip.vue')),
    ProductBrandsDialog: defineAsyncComponent(() => import('../components/ProductBrandsDialog.vue')),
  },
  props: {
    productBrands: {
      type: String,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      productBrandsDialog: false
    }
  },
  computed: {
    productBrandsList() {
      return this.productBrands.split(',').filter(b => b.trim())
    }
  },
  methods: {
    showProductBrandsDialog() {
      this.productBrandsDialog = true
    },
  }
}
</script>

<template>
  <span v-if="productBrands">
    <span v-if="getProductBrandsList.length <= 2">
      <v-chip v-for="brand in getProductBrandsList" :key="brand" label size="small" density="comfortable" class="mr-1" @click="goToBrand(brand)">
        {{ brand }}
      </v-chip>
    </span>
    <v-chip v-else label size="small" density="comfortable" class="mr-1" @click="showProductBrandsDialog">
      <i>{{ $t('ProductCard.BrandTotal', { count: getProductBrandsList.length }) }}</i>
    </v-chip>
    <ProductBrandsDialog
      v-if="productBrands.length && productBrandsDialog"
      :brands="getProductBrandsList"
      v-model="productBrandsDialog"
      @close="productBrandsDialog = false">
    </ProductBrandsDialog>
  </span>
  <v-chip v-else label size="small" density="comfortable" prepend-icon="mdi-help" color="warning" class="mr-1">
    <i>{{ $t('ProductCard.BrandLower') }}</i>
    <v-tooltip activator="parent" open-on-click location="top">{{ $t('ProductCard.BrandMissing') }}</v-tooltip>
  </v-chip>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'ProductBrandsDialog': defineAsyncComponent(() => import('../components/ProductBrandsDialog.vue')),
  },
  props: {
    productBrands: String,
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
    getProductBrandsList() {
      return this.productBrands.split(',')
    }
  },
  methods: {
    goToBrand(brand) {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/brands/${brand}` })
    },
    showProductBrandsDialog() {
      this.productBrandsDialog = true
    },
  }
}
</script>
